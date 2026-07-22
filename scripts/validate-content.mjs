#!/usr/bin/env node
// Checks page content against the data layer. Claims and the glossary cite live figures by
// token ({{theme/id}}) rather than hard-coded numbers, so a figure can never go stale inside
// prose without the source updating too. This script proves every token resolves.
//
// Run: node scripts/validate-content.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const claimsDir = fileURLToPath(new URL('../content/claims/', import.meta.url));
const read = (file) => JSON.parse(readFileSync(dataDir + file, 'utf8'));

const THEME_FILES = ['migration.json', 'asylum.json', 'population.json', 'fiscal.json'];
const REQUIRED_FRONT_MATTER = ['id', 'claim', 'short_answer', 'direction', 'error_type', 'last_reviewed'];
const DIRECTIONS = ['restrictionist', 'pro-migration', 'both'];
const REVIEW_MONTHS = 12;

// Structural includes the build expands from the data layer, written {{> name }} so they
// cannot be confused with a metric token. Prose describes; these render the catalogue.
const PARTIALS = new Set(['sources-catalogue', 'confidence-levels', 'key-caveats']);

// Split {{ ... }} into metric citations and structural partials, so a partial is never
// looked up as a metric and a typo in either is caught.
function collectTokens(file, prose) {
  const metricTokens = [];
  for (const match of prose.matchAll(/\{\{([^}]+)\}\}/g)) {
    const raw = match[1].trim();
    if (raw.startsWith('>')) {
      const partial = raw.slice(1).trim();
      if (!PARTIALS.has(partial)) {
        errors.push(`${file}: uses partial {{> ${partial} }}, which the build does not know how to render`);
      }
      continue;
    }
    metricTokens.push(raw);
  }
  return metricTokens;
}

// An unclosed brace escapes every regex requiring the closing pair, so it ships as visible
// junk. Only meaningful where {{ }} is citation syntax, i.e. not in Nunjucks.
function checkUnclosed(file, prose) {
  if (file.endsWith('.njk')) return;
  for (const stray of prose.match(/\{\{(?![^}\n]*\}\})[^\n]{0,60}/g) ?? []) {
    errors.push(`${file}: unclosed citation token, ${stray.trim().slice(0, 50)}`);
  }
}

const contentPages = [];
let glossaryAnchors = new Set();
const registry = new Map();
for (const file of THEME_FILES) {
  const theme = file.replace('.json', '');
  for (const metric of read(file).metrics ?? []) registry.set(`${theme}/${metric.id}`, metric);
}

const errors = [];
const warnings = [];
const claims = [];

for (const file of readdirSync(claimsDir).filter((f) => f.endsWith('.md'))) {
  const body = readFileSync(claimsDir + file, 'utf8');
  const match = body.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${file}: missing front matter`);
    continue;
  }

  // Deliberately not a full YAML parser: the front matter here is flat keys, and a
  // dependency for five files would be its own kind of debt.
  const front = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) front[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  const prose = match[2];

  for (const field of REQUIRED_FRONT_MATTER) {
    if (!front[field]) errors.push(`${file}: missing front matter field ${field}`);
  }
  if (front.direction && !DIRECTIONS.includes(front.direction)) {
    errors.push(`${file}: direction "${front.direction}" must be one of ${DIRECTIONS.join(', ')}`);
  }
  if (front.id && front.id !== file.replace('.md', '')) {
    errors.push(`${file}: id "${front.id}" does not match the filename`);
  }

  // Every claim carries a review date, and a claim that has gone unreviewed for a year is
  // unpublishable, see the corrections policy in the foundation document.
  if (front.last_reviewed) {
    const reviewed = new Date(`${front.last_reviewed}T00:00:00Z`);
    if (Number.isNaN(reviewed.getTime())) {
      errors.push(`${file}: last_reviewed "${front.last_reviewed}" is not a valid date`);
    } else {
      const age = (Date.now() - reviewed.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
      if (age > REVIEW_MONTHS) {
        errors.push(`${file}: last reviewed ${age.toFixed(0)} months ago, unpublish or re-review`);
      }
    }
  }

  const tokens = collectTokens(file, prose);
  for (const token of tokens) {
    if (!registry.has(token)) {
      errors.push(`${file}: cites {{${token}}}, which is not a metric in the data layer`);
    }
  }

  // A figure a claim depends on should be declared, so a data update can find every claim
  // it affects without grepping prose.
  const declared = new Set((match[1].match(/^\s*-\s+(\S+\/\S+)$/gm) ?? []).map((l) => l.trim().slice(2)));
  for (const token of new Set(tokens)) {
    if (!declared.has(token)) errors.push(`${file}: uses {{${token}}} but does not list it under figures:`);
  }
  for (const ref of declared) {
    if (!registry.has(ref)) errors.push(`${file}: figures: lists ${ref}, which is not a metric in the data layer`);
  }

  const literals = new Set((front.historical_literals ?? '').split(/[,;]\s*/).filter(Boolean));
  contentPages.push({ file, prose, literals });
  claims.push({ file, direction: front.direction, tokens: new Set(tokens) });
}

// Representation, not a ratio.
//
// The previous rule capped any direction at two-thirds of the set. It caught one real
// failure and then obstructed the right thing. `direction` records WHOSE CLAIM is corrected,
// and correcting a restrictionist claim SERVES pro-migration readers. So a cap on
// restrictionist-labelled claims capped how much the site could serve the other side, and
// it blocked "immigrants are a drain on the public finances", the correction a pro-migration
// reader would most want to see. A rule that prevents a correction measures the wrong thing.
//
// The failure mode worth preventing is a set that corrects one side and never the other, not
// an uneven split: restrictionist misuses genuinely circulate more. Hence a floor, no
// ceiling, and the real split disclosed on the page.
const MINIMUM_PER_DIRECTION = 2;

if (claims.length) {
  for (const direction of ['restrictionist', 'pro-migration']) {
    const count = claims.filter((c) => c.direction === direction).length;
    if (count < MINIMUM_PER_DIRECTION) {
      errors.push(`representation rule: only ${count} claim(s) correct ${direction} claims; at least ${MINIMUM_PER_DIRECTION} required. A set that only ever corrects one side does not implement the site's stated position.`);
    }
  }
}

// --- house style: no em-dashes ------------------------------------------------
// Matches the sibling projects' rule. The em-dash is banned in authored copy, literal or
// URL-encoded; the en-dash stays available for numeric ranges. Data files are excluded
// where they carry a source's own words, but notes and card text are ours, so data/ is
// scanned too. Anything under node_modules or _site is generated, not authored.
const STYLE_DIRS = ['content', 'docs', 'scripts', 'lib', 'data', '.github'];
const STYLE_FILES = ['README.md', 'CHANGELOG.md', 'eleventy.config.js', 'netlify.toml'];
const repoRoot = fileURLToPath(new URL('../', import.meta.url));

function walkAuthored(dir) {
  let out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.git')) continue;
    const full = `${dir}/${entry.name}`;
    out = out.concat(entry.isDirectory() ? walkAuthored(full) : [full]);
  }
  return out;
}

for (const dir of STYLE_DIRS) {
  let files = [];
  try { files = walkAuthored(repoRoot + dir); } catch { continue; }
  for (const file of [...files, ...STYLE_FILES.map((f) => repoRoot + f)]) {
    let body;
    try { body = readFileSync(file, 'utf8'); } catch { continue; }
    const lines = body.split('\n');
    lines.forEach((line, i) => {
      // Needles built at runtime: written literally, this file would match itself.
      const EM = String.fromCharCode(0x2014);
      const ENCODED = ['%E2', '%80', '%94'].join('');
      if (line.includes(EM) || line.includes(ENCODED)) {
        errors.push(`${file.replace(repoRoot, '')}:${i + 1}: em-dash in authored copy. House style bans it; use a comma, colon or full stop.`);
      }
    });
  }
}

// --- glossary -------------------------------------------------------------------
// One page, many terms. A term is only useful if it says what the word does NOT mean, so
// that is structural here rather than a matter of style.
const glossaryPath = fileURLToPath(new URL('../content/glossary.md', import.meta.url));
let terms = 0;
const glossaryTokens = new Set();
try {
  const body = readFileSync(glossaryPath, 'utf8');
  const match = body.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    errors.push('glossary.md: missing front matter');
  } else {
    const front = match[1];
    const prose = match[2];
    for (const field of ['id', 'title', 'last_reviewed']) {
      if (!new RegExp(`^${field}:`, 'm').test(front)) errors.push(`glossary.md: missing front matter field ${field}`);
    }

    const tokens = collectTokens('glossary.md', prose);
    for (const token of new Set(tokens)) {
      glossaryTokens.add(token);
      if (!registry.has(token)) errors.push(`glossary.md: cites {{${token}}}, which is not a metric in the data layer`);
    }
    const declared = new Set((front.match(/^\s*-\s+(\S+\/\S+)$/gm) ?? []).map((l) => l.trim().slice(2)));
    for (const token of new Set(tokens)) {
      if (!declared.has(token)) errors.push(`glossary.md: uses {{${token}}} but does not list it under figures:`);
    }
    for (const ref of declared) {
      if (!registry.has(ref)) errors.push(`glossary.md: figures: lists ${ref}, which is not a metric in the data layer`);
    }

    // Every term needs a stable anchor, because claims link to definitions.
    const anchors = [...prose.matchAll(/^###\s+(.+?)\s*\{#([a-z0-9-]+)\}\s*$/gm)];
    terms = anchors.length;
    const seen = new Set();
    const literals = new Set((front.match(/^historical_literals:\s*(.*)$/m)?.[1] ?? '').split(/[,;]\s*/).filter(Boolean));
    contentPages.push({ file: 'glossary.md', prose, literals });
    for (const [, name, anchor] of anchors) {
      if (seen.has(anchor)) errors.push(`glossary.md: duplicate anchor #${anchor}`);
      seen.add(anchor);
    }
    for (const heading of prose.match(/^###\s+.+$/gm) ?? []) {
      if (!/\{#[a-z0-9-]+\}$/.test(heading.trim())) {
        errors.push(`glossary.md: term "${heading.replace(/^###\s+/, '')}" has no {#anchor}, claims cannot link to it`);
      }
    }

    // Internal links must resolve, or a definition silently goes nowhere.
    for (const [, anchor] of prose.matchAll(/\]\(#([a-z0-9-]+)\)/g)) {
      if (!seen.has(anchor)) errors.push(`glossary.md: links to #${anchor}, which is not a term on the page`);
    }
    glossaryAnchors = seen;

    // The layout supplies the page's only h1. A "# " heading in this file would render a
    // second one and break the document outline, a real WCAG 1.3.1 failure that shipped
    // once already.
    for (const heading of prose.match(/^#\s+.+$/gm) ?? []) {
      errors.push(`glossary.md: "${heading.replace(/^#\s+/, '')}" is an h1; the layout already provides the page h1. Use ## for a group.`);
    }

    // A definition that does not say what the word is NOT leaves the misreading intact,
    // which is the entire job of this page.
    const sections = prose.split(/^###\s+/m).slice(1);
    for (const section of sections) {
      const name = section.split('\n')[0].replace(/\s*\{#.*/, '');
      if (!/common mistake|does not|is not|Why it matters/i.test(section)) {
        errors.push(`glossary.md: term "${name}" defines the word but never says what it is not`);
      }
    }
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

// --- standalone pages ------------------------------------------------------------
// Everything in content/ that is not a claim and not the glossary: sources and method,
// and whatever follows. They get the same citation contract as claims, without the
// claim-specific front matter.
const contentDir = fileURLToPath(new URL('../content/', import.meta.url));
let pages = 0;
// .njk pages carry most of the site's figures and were previously unchecked entirely.
for (const file of readdirSync(contentDir).filter((f) => (f.endsWith('.md') || f.endsWith('.njk')) && f !== 'glossary.md')) {
  const body = readFileSync(contentDir + file, 'utf8');
  const match = body.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${file}: missing front matter`);
    continue;
  }
  const [, front, prose] = match;
  const required = file.endsWith('.njk') ? ['title'] : ['id', 'title', 'last_reviewed'];
  for (const field of required) {
    if (!new RegExp(`^${field}:`, 'm').test(front)) errors.push(`${file}: missing front matter field ${field}`);
  }

  // In .njk, {{ }} is Nunjucks' own expression syntax; citations there are {% figure %}.
  const isNunjucks = file.endsWith('.njk');
  const shortcodeRefs = [...prose.matchAll(/\{%\s*figure\s+["']([^"']+)["']\s*%\}/g)].map((m) => m[1].trim());
  const tokens = isNunjucks ? shortcodeRefs : [...collectTokens(file, prose), ...shortcodeRefs];
  const declared = new Set((front.match(/^\s*-\s+(\S+\/\S+)$/gm) ?? []).map((l) => l.trim().slice(2)));
  for (const token of new Set(tokens)) {
    if (!registry.has(token)) errors.push(`${file}: cites {{${token}}}, which is not a metric in the data layer`);
    else if (!declared.has(token)) errors.push(`${file}: uses {{${token}}} but does not list it under figures:`);
  }
  for (const ref of declared) {
    if (!registry.has(ref)) errors.push(`${file}: figures: lists ${ref}, which is not a metric in the data layer`);
  }

  const literals = new Set((front.match(/^historical_literals:\s*(.*)$/m)?.[1] ?? '').split(/[,;]\s*/).filter(Boolean));
  contentPages.push({ file, prose, literals });
  tokens.forEach((t) => glossaryTokens.add(t));
  pages += 1;
}

// --- token rendering contract ---------------------------------------------------
// A token renders the FORMATTED VALUE ONLY, "48,758", "4.9", "39". It does not render
// the unit, because units are prose: "%" attaches with no space, "£" prefixes, "people"
// follows. So the author supplies the symbol, and these checks confirm they did. Both
// currency omissions below were real: "was 4.9 billion" instead of "£4.9 billion".
function checkUnits(file, prose) {
  for (const match of prose.matchAll(/\{\{([^}]+)\}\}/g)) {
    if (match[1].trim().startsWith('>')) continue;
    const metric = registry.get(match[1].trim());
    if (!metric) continue;
    const before = prose.slice(Math.max(0, match.index - 2), match.index);
    const after = prose.slice(match.index + match[0].length);

    if (metric.value_type === 'range') {
      errors.push(`${file}: {{${match[1].trim()}}} is a range and has no single value, it would render empty. Describe it in prose instead.`);
    }
    if (String(metric.unit).includes('£') && !before.includes('£')) {
      errors.push(`${file}: {{${match[1].trim()}}} is in ${metric.unit} but has no £ before it`);
    }
    if (metric.unit === '%' && !after.startsWith('%')) {
      errors.push(`${file}: {{${match[1].trim()}}} is a percentage but has no % after it`);
    }
  }
}

// --- hard-coded live figures ------------------------------------------------------
// The token system exists to stop a figure going stale inside prose. Writing the number
// out longhand silently opts out of it, which is how three live values ended up
// hard-coded in the first draft of this content. Historical illustrations are legitimate
// and stay literal, but they must be declared so the choice is deliberate.
const liveValues = new Map();
const unitedValues = new Map();
for (const [ref, metric] of registry) {
  if (typeof metric.value === 'number') {
    for (const form of new Set([metric.value.toLocaleString('en-GB'), String(metric.value)])) {
      if (/\d,\d/.test(form) || Number(metric.value) >= 100) liveValues.set(form, ref);
    }
    // Rates and money are mostly under 100, where a bare number is too common in prose to
    // match on, "39" appears in dates, counts and ordinary sentences. Matched WITH their
    // unit instead, which is unambiguous: "39%" or "£4.9" is a figure, not a coincidence.
    if (metric.unit === '%') unitedValues.set(`${metric.value}%`, ref);
    if (String(metric.unit).includes('£')) unitedValues.set(`£${metric.value}`, ref);
  }
}

function checkLiterals(file, prose, allowed) {
  const withoutTokens = prose.replace(/\{\{[^}]*\}\}/g, '').replace(/\{%[\s\S]*?%\}/g, '');
  // Rates and money sit in a range where many unrelated metrics share a value, 21% is the
  // NHS staff share AND the asylum hotel share, so matching on value alone cannot tell a
  // stale citation from a coincidence. Reported for review rather than failing the build:
  // an error here would be silenced by stuffing historical_literals, which is worse than
  // no check at all. The comma-grouped check below stays an error; its collision rate is low.
  for (const united of new Set(withoutTokens.match(/£\d+(?:\.\d+)?|\d+(?:\.\d+)?%/g) ?? [])) {
    const ref = unitedValues.get(united);
    if (ref && !allowed.has(united)) {
      warnings.push(`${file}: ${united} equals the current value of ${ref}, check whether it should be cited`);
    }
  }

  const candidates = withoutTokens.match(/\b\d{1,3}(?:,\d{3})+\b|\b\d+(?:\.\d+)?\b/g) ?? [];
  for (const literal of new Set(candidates)) {
    if (allowed.has(literal)) continue;
    const ref = liveValues.get(literal);
    if (ref) {
      errors.push(`${file}: writes ${literal} longhand, which is the current value of ${ref}, cite {{${ref}}} so it cannot go stale, or list it under historical_literals if it is deliberately frozen`);
    }
  }
}

// --- glossary links ----------------------------------------------------------------
// Claims link to definitions. A link to a term that does not exist is a dead end on the
// page whose whole purpose is explaining the words.
function checkGlossaryLinks(file, prose, anchors) {
  for (const match of prose.matchAll(/\]\(\/what-the-words-mean#([a-z0-9-]+)\)/g)) {
    if (!anchors.has(match[1])) {
      errors.push(`${file}: links to glossary term #${match[1]}, which does not exist`);
    }
  }
}

for (const { file, prose, literals } of contentPages) {
  checkUnclosed(file, prose);
  checkUnits(file, prose);
  checkLiterals(file, prose, literals);
  checkGlossaryLinks(file, prose, glossaryAnchors);
}

// Report last, so that every check above has run. Reporting mid-file once silently
// discarded every glossary error, which passed a broken page as green.
if (errors.length) {
  console.error(`Content checks failed, ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

const byDirection = claims.reduce((acc, c) => ({ ...acc, [c.direction]: (acc[c.direction] ?? 0) + 1 }), {});
const cited = new Set([...claims.flatMap((c) => [...c.tokens]), ...glossaryTokens]);
console.log(`Content checks passed: ${claims.length} claims, ${terms} glossary terms, ${pages} other page(s).`);
if (warnings.length) {
  console.log(`\n${warnings.length} unit-qualified figure(s) match a live metric value and may need citing:`);
  for (const warning of warnings) console.log(`  ${warning}`);
  console.log('Many are coincidence, several metrics share a value. Review, do not suppress.');
}
console.log(`${cited.size} cited figures resolve to a record. Figures typed into chart configs are not citations and are not covered.`);
console.log(`Claim direction split: ${Object.entries(byDirection).map(([d, n]) => `${n} ${d}`).join(', ')}, each meets the minimum of ${MINIMUM_PER_DIRECTION}.`);
console.log('This counts whose claim is corrected. It is not a measure of fairness; the split is disclosed on the claims page.');
