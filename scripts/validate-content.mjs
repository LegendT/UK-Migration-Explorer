#!/usr/bin/env node
// Checks page content against the data layer. Claims and the glossary cite live figures by
// token ({{theme/id}}) rather than hard-coded numbers, so a figure can never go stale inside
// prose without the source updating too. This script proves every token resolves.
//
// Run: node scripts/validate-content.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { seriesPoints } from '../lib/series.mjs';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const claimsDir = fileURLToPath(new URL('../content/claims/', import.meta.url));
const read = (file) => JSON.parse(readFileSync(dataDir + file, 'utf8'));

const THEME_FILES = ['migration.json', 'asylum.json', 'population.json', 'fiscal.json'];
// period and source are here because claim.njk renders them behind `{% if %}`, so a claim
// that omitted them lost them from the card silently, with nothing on the page to show it.
// Foundation 8.5.4 requires both inside the card's visual boundary: a card is going to be
// screenshotted stripped of its context, and a period and a source are what make the
// screenshot answerable. All seven claims already carry them; this stops the eighth not to.
const REQUIRED_FRONT_MATTER = ['id', 'claim', 'short_answer', 'direction', 'error_type', 'last_reviewed', 'period', 'source'];
// "both" was a third label, described on the style guide and never applied to a claim.
// A label no claim carries is a promise to the reader that nothing keeps. Add it back in
// this line, and on the style guide, when a genuinely two-sided misuse needs it.
const DIRECTIONS = ['restrictionist', 'pro-migration'];
const REVIEW_MONTHS = 12;

// A review date with no due date never becomes overdue, so the twelve-month rule above has
// nothing to bite on until it has already been broken.
function checkReviewDue(file, lastReviewed, reviewDue) {
  if (!lastReviewed) return;
  if (!reviewDue) {
    errors.push(`${file}: has last_reviewed but no review_due, so nothing says when this page falls due`);
    return;
  }
  const due = new Date(`${reviewDue}T00:00:00Z`);
  if (Number.isNaN(due.getTime())) {
    errors.push(`${file}: review_due "${reviewDue}" is not a valid date`);
  } else if (due <= new Date(`${lastReviewed}T00:00:00Z`)) {
    errors.push(`${file}: review_due ${reviewDue} is not after last_reviewed ${lastReviewed}`);
  }
}

// Structural includes the build expands from the data layer, written {{> name }} so they
// cannot be confused with a metric token. Prose describes; these render the catalogue.
const PARTIALS = new Set(['sources-catalogue', 'confidence-levels', 'key-caveats']);

// Prose is matched with the front matter removed, so a line number from a scan of it is
// not a line number in the file. Reporting one that does not open the offending line is
// worse than reporting none.
const frontMatterLines = (front) => front.split('\n').length + 2;

// Semicolons only. This split accepted commas too, which cannot work: every literal the
// error-level check fires on is comma-grouped, so "285,000" was shredded into "285" and
// "000". The exemption then silently did nothing AND created two junk exemptions for
// unrelated values. Three copies of that split existed and no content page had ever used
// one, so the escape hatch the error message points at had never been exercised.
const parseLiterals = (raw) =>
  new Set(String(raw ?? '').split(';').map((literal) => literal.trim()).filter(Boolean));

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
// Kept apart from `warnings` rather than pooled with it. The two ask different questions, and
// the heading over a pooled list would have to describe both, which is how a success message
// starts claiming more than its check verifies.
const unrecorded = [];

// The ratchet, and the reason this check does not become wallpaper. Report level is right for
// the figures already here, because erroring on day one would force three dozen exemptions and
// that is the stuffing the rates scan exists to avoid. But report level with no ceiling asks
// nothing of anyone ever: the list would sit in a green log and the next figure would join it
// invisibly. So the count may not GROW. Lower this as figures are given records or declared;
// when it reaches zero, promote the branch to an error and delete the constant.
//
// What it does NOT establish, and the failure message says so: that the listed figures are
// right, or that the set is unchanged. Fixing one figure and adding another keeps the count
// level and passes. It stops the list growing, which is the thing that was happening silently.
// 38 when the branch was added; 29 once the nine published-vintage figures were declared, which
// is the ratchet working as intended rather than a number being edited to suit a run.
const UNRECORDED_BASELINE = 29;
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

  checkReviewDue(file, front.last_reviewed, front.review_due);

  // The corrections policy promises a DATED note on a substantively revised claim. A note
  // without its date, or a date without its note, does not keep that promise.
  if (front.correction && !front.corrected_on) errors.push(`${file}: has a correction but no corrected_on date`);
  if (front.corrected_on) {
    if (!front.correction) errors.push(`${file}: has corrected_on but no correction text to date`);
    if (Number.isNaN(new Date(`${front.corrected_on}T00:00:00Z`).getTime())) {
      errors.push(`${file}: corrected_on "${front.corrected_on}" is not a valid date`);
    }
  }

  const literals = parseLiterals(front.historical_literals);
  contentPages.push({ file, prose, literals, lineOffset: frontMatterLines(match[1]) });
  claims.push({ file, id: front.id, direction: front.direction, mirrorOf: front.mirror_of, tokens: new Set(tokens) });
}

// A claim that names a mirror must name a claim, and the mirror must point back. Recorded
// as a direction ("pro-migration") it read like a field nothing could resolve, and nothing
// did resolve it: the pairing lived only in the prose of both pages.
const claimIds = new Set(claims.map((c) => c.id));
for (const claim of claims.filter((c) => c.mirrorOf)) {
  if (!claimIds.has(claim.mirrorOf)) {
    errors.push(`${claim.file}: mirror_of "${claim.mirrorOf}" is not the id of a claim on this site`);
    continue;
  }
  const other = claims.find((c) => c.id === claim.mirrorOf);
  if (other.mirrorOf !== claim.id) {
    errors.push(`${claim.file}: names ${claim.mirrorOf} as its mirror, but that claim does not name it back`);
  }
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

// --- outstanding work has one home ------------------------------------------------
// A handoff is rewritten every session, and a rewrite is where work quietly falls out: this
// project has already lost a scope document's contents that way once, by copying them into
// the handoff and then editing the copy. docs/BACKLOG.md is the durable list, and every
// planning document has to be referenced from it, so a scope cannot be written and forgotten.
//
// foundation.md is the record of intent rather than outstanding work, and HANDOFF.md and
// BACKLOG.md are the two documents doing the tracking, so all three are exempt.
const PLANNING_EXEMPT = new Set(['foundation.md', 'HANDOFF.md', 'BACKLOG.md']);
const docsDir = fileURLToPath(new URL('../docs/', import.meta.url));

// Recursive, and it was not until 30 July 2026. `readdirSync` on its own does not descend, so a
// document one directory down escaped the rule whose entire purpose is that a planning document
// cannot be written and forgotten. It went unnoticed while `docs/` was flat, and was found the
// moment the first subdirectory was added, by the session adding it: `docs/prompts/` would have
// been invisible here on the day it was created.
//
// Matched on the path relative to docs/, not the basename, so two documents with the same name
// in different directories cannot satisfy this through each other. A top-level file's relative
// path IS its basename, so the exemptions and the existing references are unaffected.
const planningDocs = (dir, prefix = '') =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? planningDocs(`${dir}${entry.name}/`, `${prefix}${entry.name}/`)
      : entry.name.endsWith('.md') ? [`${prefix}${entry.name}`] : []);

try {
  const backlog = readFileSync(`${docsDir}BACKLOG.md`, 'utf8');
  for (const file of planningDocs(docsDir)) {
    if (PLANNING_EXEMPT.has(file)) continue;
    if (!backlog.includes(file)) {
      errors.push(`docs/BACKLOG.md: does not reference docs/${file}, so the work it describes can be lost in the next handoff rewrite. Add it, or move it under Completed.`);
    }
  }
  if (!readFileSync(`${docsDir}HANDOFF.md`, 'utf8').includes('BACKLOG.md')) {
    errors.push('docs/HANDOFF.md: does not point at docs/BACKLOG.md, which is where outstanding work lives.');
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  errors.push('docs/BACKLOG.md: missing. It is the durable list of outstanding work.');
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

// --- editorial lint, foundation section 5.2 ----------------------------------------
// The language rules had no enforcement, so the only thing standing between the site and
// the vocabulary it criticises was remembering. This scans the pages a reader sees, not
// docs/, because the foundation document quotes the banned terms in the rules table that
// bans them.
//
// Quoted text is exempt, and that exemption is the whole reason this can be automated
// here. The site quotes its sources verbatim as a matter of policy: the Home Office
// publishes an "Illegal entry routes" dataset, and the style guide discusses the phrases
// it avoids by name. Both are inside quotation marks. Unquoted, the same words are the
// site writing in its own voice.
//
// TWO KNOWN GAPS, stated rather than implied. Only the rules that can be matched precisely
// are here: two of the five in section 5.2 are shape rules, "Immigration is X" and a bare
// "backlog", and any pattern for them fires on the site's own teaching copy ("there is no
// such thing as the backlog"). And only page bodies are scanned, not front matter, because
// a claim's `claim:` field holds the proposition being corrected and may legitimately
// contain the wording the site avoids. Both stay a matter of review.
const BANNED_TERMS = [
  'illegal migrant', 'illegal migrants', 'illegal immigrant', 'illegal immigrants', 'illegals',
  'flooding', 'swamping', 'swamped', 'flooded',
  'entered illegally', 'arrived illegally', 'came here illegally',
];

const termPattern = (term) => new RegExp(`\\b${term.split(' ').join('[\\s-]+')}\\b`, 'gi');

// Character ranges inside double quotes, computed per line so an unclosed quote cannot
// swallow the rest of the file.
function quotedRanges(line, offset) {
  const ranges = [];
  for (const match of line.matchAll(/"[^"]*"/g)) ranges.push([offset + match.index, offset + match.index + match[0].length]);
  return ranges;
}

function scanEditorial(text) {
  const hits = [];
  const quoted = [];
  let offset = 0;
  for (const line of text.split('\n')) {
    quoted.push(...quotedRanges(line, offset));
    offset += line.length + 1;
  }
  for (const term of BANNED_TERMS) {
    for (const match of text.matchAll(termPattern(term))) {
      const start = match.index;
      const end = start + match[0].length;
      if (quoted.some(([from, to]) => start >= from && end <= to)) continue;
      hits.push({ term, match: match[0].replace(/\s+/g, ' '), line: text.slice(0, start).split('\n').length });
    }
  }
  return hits;
}

// Controls, run every time. A scanner that silently stopped matching would otherwise report
// a clean site, which is the exact failure this project has shipped six times.
for (const term of BANNED_TERMS) {
  if (!scanEditorial(`the report described ${term} in detail`).length) {
    errors.push(`editorial lint: the scanner no longer catches "${term}", so its green result means nothing`);
  }
  if (scanEditorial(`the dataset is titled "${term}" by its publisher`).length) {
    errors.push(`editorial lint: the scanner fires inside quotation marks on "${term}", which would flag quoted source titles`);
  }
}

function checkEditorial(file, prose, lineOffset) {
  for (const hit of scanEditorial(prose)) {
    errors.push(`${file}:${hit.line + lineOffset}: uses "${hit.match}" in the site's own voice. See the language rules in foundation section 5.2; quote it if a source says it.`);
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
    const literals = parseLiterals(front.match(/^historical_literals:\s*(.*)$/m)?.[1]);
    contentPages.push({ file: 'glossary.md', prose, literals, lineOffset: frontMatterLines(front) });
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

  // In .njk, {{ }} is Nunjucks' own expression syntax, so citations there take three forms:
  // {% figure %} in prose, `ref` on a chart bar, and the `metric` filter where a chart
  // summary needs the value inside a string. All three resolve through the same registry
  // and all three are held to the same contract.
  const isNunjucks = file.endsWith('.njk');
  const shortcodeRefs = [...prose.matchAll(/\{%\s*figure\s+["']([^"']+)["']\s*%\}/g)].map((m) => m[1].trim());
  const chartRefs = isNunjucks ? [
    ...[...prose.matchAll(/\bref:\s*["']([^"']+)["']/g)].map((m) => m[1].trim()),
    ...[...prose.matchAll(/["']([^"']+)["']\s*\|\s*metric\b/g)].map((m) => m[1].trim()),
  ] : [];
  const tokens = isNunjucks ? [...shortcodeRefs, ...chartRefs] : [...collectTokens(file, prose), ...shortcodeRefs];
  const declared = new Set((front.match(/^\s*-\s+(\S+\/\S+)$/gm) ?? []).map((l) => l.trim().slice(2)));
  for (const token of new Set(tokens)) {
    if (!registry.has(token)) errors.push(`${file}: cites {{${token}}}, which is not a metric in the data layer`);
    else if (!declared.has(token)) errors.push(`${file}: uses {{${token}}} but does not list it under figures:`);
  }
  for (const ref of declared) {
    if (!registry.has(ref)) errors.push(`${file}: figures: lists ${ref}, which is not a metric in the data layer`);
  }

  // `at` returns the raw number, so a citation missing `| number` renders "45537" where the
  // page means "45,537", and nothing downstream notices: the source carries no literal for
  // the scan below to catch, the value is not NaN, and the page builds. Confirmed by removing
  // one and watching an unformatted figure reach the built HTML through both gates. This is
  // to a series citation what the unit check is to a {{ }} one.
  if (isNunjucks) {
    for (const match of prose.matchAll(/\|\s*at\(\s*\d+\s*\)\s*(\|\s*[a-z]+)?/gi)) {
      if ((match[1] ?? '').replace(/\s+/g, '') !== '|number') {
        errors.push(`${file}: "${match[0].trim()}" does not pass through | number, so it would render an unformatted figure`);
      }
    }
  }

  const value = (key) => front.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1].replace(/^["']|["']$/g, '').trim();
  checkReviewDue(file, value('last_reviewed'), value('review_due'));

  const literals = parseLiterals(front.match(/^historical_literals:\s*(.*)$/m)?.[1]);
  contentPages.push({ file, prose, literals, lineOffset: frontMatterLines(front) });
  tokens.forEach((t) => glossaryTokens.add(t));
  pages += 1;
}

// --- token rendering contract ---------------------------------------------------
// A token renders the FORMATTED VALUE ONLY, "48,758", "4.9", "39". It does not render
// the unit, because units are prose: "%" attaches with no space, "£" prefixes, "people"
// follows. So the author supplies the symbol, and these checks confirm they did. Both
// currency omissions below were real: "was 4.9 billion" instead of "£4.9 billion".
// Both citation syntaxes are checked. Scanning {{ }} alone left the four .njk pages, which
// carry most of the site's money figures, with no unit check at all.
function checkUnits(file, prose) {
  const citations = [
    ...prose.matchAll(/\{\{([^}]+)\}\}/g),
    ...prose.matchAll(/\{%\s*figure\s+["']([^"']+)["']\s*%\}/g),
  ];
  for (const match of citations) {
    const ref = match[1].trim();
    if (ref.startsWith('>')) continue;
    const metric = registry.get(ref);
    if (!metric) continue;
    const before = prose.slice(Math.max(0, match.index - 2), match.index);
    const after = prose.slice(match.index + match[0].length);

    if (metric.value_type === 'range') {
      errors.push(`${file}: ${ref} is a range and has no single value, it would render empty. Describe it in prose instead.`);
    }
    if (String(metric.unit).includes('£') && !before.includes('£')) {
      errors.push(`${file}: ${ref} is in ${metric.unit} but has no £ before it`);
    }
    if (metric.unit === '%' && !after.startsWith('%')) {
      errors.push(`${file}: ${ref} is a percentage but has no % after it`);
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
// `describe` names WHICH number of the record this is, because a range has no `value` and a
// message saying "the current value of" about a bound is the overclaim this file has been
// caught making before. It travels with the ref so the message cannot drift from the map.
const registerValue = (number, unit, ref, describe) => {
  for (const form of new Set([number.toLocaleString('en-GB'), String(number)])) {
    if (/\d,\d/.test(form) || Math.abs(number) >= 100) liveValues.set(form, { ref, describe });
  }
  // Rates and money are mostly under 100, where a bare number is too common in prose to
  // match on, "39" appears in dates, counts and ordinary sentences. Matched WITH their
  // unit instead, which is unambiguous: "39%" or "£4.9" is a figure, not a coincidence.
  //
  // `startsWith` rather than equality, because the one qualified percentage unit in the data,
  // "% of GDP", was excluded by the equality test and is the unit of the only range. Its two
  // claim pages declare that record under `figures:` and then write "1% of GDP" in prose four
  // times without citing it, which no check could see. "% of GDP" is the only unit here that
  // starts with the sign without being it, so this widens the scan by exactly one record.
  if (String(unit).startsWith('%')) unitedValues.set(`${number}%`, { ref, describe });
  if (String(unit).includes('£')) unitedValues.set(`£${number}`, { ref, describe });
};

for (const [ref, metric] of registry) {
  if (typeof metric.value === 'number') {
    registerValue(metric.value, metric.unit, ref, 'the current value');
    continue;
  }
  // A range holds no single value, so `value` is present and null, and both maps were built
  // under `typeof metric.value === 'number'`. That is the third question this project learned
  // to ask of a matching key, present but not the shape you assumed, and the answer was that
  // NO bound of ANY range could be matched against prose. One record is a range today and its
  // bounds are 1 and -1, so nothing comma-grouped was hidden by it; the two claim pages built
  // on that record write "1% of GDP" in prose four times between them and cite it nowhere,
  // which is what led here. A range added later with comma-grouped bounds would have been
  // silently unprotected.
  for (const [name, bound] of [['range_min', metric.range_min], ['range_max', metric.range_max]]) {
    if (typeof bound === 'number') registerValue(bound, metric.unit, ref, `the ${name}`);
  }
}

// The series files are the other half of the data layer, and nothing scanned them. A chart
// draws its own points from the file, but a summary naming a single year in that series
// typed the number, because until the `at` filter existed there was no way to cite one. The
// series are refreshed wholesale on every release under the single-vintage rule, so they do
// move, and the sentence describing the chart could drift from the chart in silence.
//
// Three values sit at more than one point, 249,000, 313,000 and 494,000, so the message names
// every candidate rather than guessing which one the author meant.
const points = seriesPoints();
const seriesValues = new Map();
for (const [ref, point] of points) {
  for (const form of new Set([point.value.toLocaleString('en-GB'), String(point.value)])) {
    // The same threshold the metric scan uses, and for the same reason. Every point in the
    // four series today is in the thousands, so this excludes nothing; a series of small
    // values added later would otherwise fail builds on coincidence, at error level, which
    // is precisely the case the metric scan drops to a warning.
    if (/\d,\d/.test(form) || point.value >= 100) {
      seriesValues.set(form, [...(seriesValues.get(form) ?? []), ref]);
    }
  }
}
const citeSeries = (ref) => {
  const [block, year] = ref.split('@');
  return `(series.${block}.data | at(${year}) | number)`;
};

// A declaration nothing matches is dead, and dies quietly. Three ways to get one, all of them
// reachable today: writing `historical_literals: 1,000; 2,000` with a comma instead of the
// semicolon `parseLiterals` splits on, which yields one entry matching nothing; a typo, or a
// leftover after the prose it exempted was rewritten; and a data file whose sibling key holds a
// JSON string rather than an array, where `new Set("1,000")` iterates characters. None of the
// three raised anything, and because the exemption is tested BEFORE every branch in
// checkLiterals, a dead entry is also one that can never come back on its own.
//
// This is the project's own rule about a key that matches, asked of the declaring side rather
// than the record side: what it does when it is absent, unchanged, or present in the wrong
// shape. Error rather than report, because the remedy is to delete or correct the declaration,
// which is the opposite of the exemption-stuffing that keeps the branch below at report level.
//
// Takes the whole file's prose, never a single field: meta.json applies one declaration set to
// every caveat it holds, so a per-field test would fail on every field but the one that
// contains the figure.
function checkDeclarations(file, prose, allowed, declareIn) {
  for (const declared of allowed) {
    if (prose.includes(declared)) continue;
    errors.push(`${file}: declares ${declared} under ${declareIn}, and no such figure appears anywhere in its prose. Delete it or correct it. A declaration that matches nothing exempts nothing, and separating two declarations with a comma rather than a semicolon produces exactly one of these.`);
  }
}

function checkLiterals(file, prose, allowed) {
  // Only citations are removed before scanning. Stripping every {% %} tag took the chart
  // configs out with them, and the chart configs were the one place on the site where live
  // figures were still typed by hand. A check that exempts the only offender is not a check.
  const withoutTokens = prose
    .replace(/\{\{[^}]*\}\}/g, '')
    .replace(/\{%\s*figure\s+["'][^"']+["']\s*%\}/g, '');
  // Rates and money sit in a range where many unrelated metrics share a value, 21% is the
  // NHS staff share AND the asylum hotel share, so matching on value alone cannot tell a
  // stale citation from a coincidence. Reported for review rather than failing the build:
  // an error here would be silenced by stuffing historical_literals, which is worse than
  // no check at all. The comma-grouped check below stays an error; its collision rate is low.
  for (const united of new Set(withoutTokens.match(/£\d+(?:\.\d+)?|\d+(?:\.\d+)?%/g) ?? [])) {
    const match = unitedValues.get(united);
    if (match && !allowed.has(united)) {
      warnings.push(`${file}: ${united} equals ${match.describe} of ${match.ref}, check whether it should be cited`);
    }
  }

  // Where the exemption is written differs by file, and telling an author to use a separator
  // their file has no concept of is how a remedy stops being a remedy. A data file has no
  // front matter and declares frozen figures in a sibling array.
  const declareIn = file.includes('.json')
    ? 'the sibling historical_literals array'
    : 'historical_literals in the front matter, semicolon separated';

  // The decimal tail on the comma-grouped alternative is not decoration. Without it "1,234.5"
  // tokenises as "1,234" plus "5", so the report named a figure the page does not write, and
  // declaring the real value cleared nothing. The error branch had the mirror of the same bug:
  // a record holding a decimal at or above 1000 has the toLocaleString form "1,234.5", which
  // no token could ever equal, so writing it out longhand was invisible.
  const candidates = withoutTokens.match(/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b|\b\d+(?:\.\d+)?\b/g) ?? [];
  for (const literal of new Set(candidates)) {
    if (allowed.has(literal)) continue;
    const match = liveValues.get(literal);
    if (match) {
      errors.push(`${file}: writes ${literal} longhand, which is ${match.describe} of ${match.ref}, cite {{${match.ref}}} so it cannot go stale, or list it under ${declareIn} if it is deliberately frozen`);
      // Four figures are held as a metric AND as a series point. The metric message is the
      // more useful of the two, and reporting the same literal twice would read as two
      // defects. validate-data.mjs is what keeps those two copies in step.
      continue;
    }
    const matched = seriesValues.get(literal);
    // Two remedies. The `at` filter only works in a chart config, so a markdown page, which
    // has no syntax for citing a series point at all, is told what it can actually do. And a
    // value that merely COINCIDES with a point in an unrelated series has to be declared
    // rather than cited: one of the four matches this found on its first run was exactly
    // that, and citing it would have named the wrong record.
    if (matched) {
      const remedy = file.endsWith('.njk')
        ? `cite it with ${matched.map(citeSeries).join(' or ')}`
        : 'nothing here cites a series point, so reword it';
      errors.push(`${file}: writes ${literal} longhand, which is the value at ${matched.join(' and ')}. If it is that figure, ${remedy}. If it is a coincidence or deliberately frozen, list it under ${declareIn}.`);
      continue;
    }

    // A figure the data layer never recorded reaches neither branch above, and until now that
    // was silence. Both scans match prose against values the site HOLDS, so a number it never
    // held is invisible to both by construction, and the success message below said no page
    // wrote one. When this was added, every comma-grouped number on the site was in that state
    // apart from the five declared ones, one in `migration.njk` and four in `meta.json`, and
    // they included current-edition figures that go wrong at the next release. How many there
    // are now is what the run prints; a count repeated in a comment is the drift this project
    // has already paid for twice, and an earlier draft of this very comment said "37 of the 38
    // in content/", which was wrong about both the number and where they were.
    //
    // Comma-grouped only. The bare-integer half of `candidates` is years, list positions and
    // ordinary prose, where the collision rate the comment above calls low for the grouped
    // form is hopeless.
    //
    // Reported, not failed, for the reason the rates scan already gives: the only way to clear
    // an error here is to declare the literal, and a check whose remedy is a blanket exemption
    // teaches authors to stuff the exemption list. The sub-100 warnings set that precedent and
    // were reviewed rather than suppressed.
    //
    // What this does NOT establish: that a figure it names is wrong, that one it stays silent
    // about is right, or that any of them came from anywhere. It establishes only that the site
    // published a number it holds no record of, so nothing can tell you when that number ages.
    if (/^\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(literal)) {
      unrecorded.push(`${file}: writes ${literal} longhand and no record or series point holds that value, so nothing can tell you when it goes stale. Give it a record and cite it, or list it under ${declareIn} if it is a frozen historical figure.`);
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

for (const { file, prose, literals, lineOffset } of contentPages) {
  checkUnclosed(file, prose);
  checkUnits(file, prose);
  checkLiterals(file, prose, literals);
  checkDeclarations(file, prose, literals, 'historical_literals in the front matter');
  checkGlossaryLinks(file, prose, glossaryAnchors);
  checkEditorial(file, prose, lineOffset);
}

// --- prose that lives in data/ and reaches a page ----------------------------------
// Everything above walks content/. Nothing walked data/, so the one file whose entire job is
// to hold references and never values was the only file never scanned for values, and the
// caveats in meta.json render on the sources page directly below a sentence promising a
// reader that a current value written longhand cannot ship. Seven of them were current
// values.
//
// Citation tokens work here because resolve-citations runs on the built HTML, after
// Nunjucks and after the partials are expanded, so a {{theme/id}} in a data string is
// resolved exactly as one in a markdown page is. Verified in the output, both routes.
//
// Only fields a template actually renders are listed. Scanning prose no page shows would
// invite the reverse error: reading a clean scan of dead data as coverage of live copy.
const DATA_PROSE = [
  ['dashboard.json', (d) => d.cards.map((c) => [`cards ${c.id}.whatThisMeans`, c.whatThisMeans])],
  ['meta.json', (d) => [
    ...d.keyCaveats.map((c, i) => [`keyCaveats[${i}]`, c]),
    ...Object.entries(d.confidenceLevels).map(([k, v]) => [`confidenceLevels.${k}`, v]),
    ['footerNote', d.footerNote],
  ]],
  ['sources.json', (d) => d.sources.flatMap((s) => [
    [`${s.id}.covers`, s.covers],
    [`${s.id}.updateFrequency`, s.updateFrequency],
  ])],
];

let dataFields = 0;
for (const [file, extract] of DATA_PROSE) {
  const data = read(file);
  // A data file has no front matter, so a deliberately frozen figure is declared in a
  // sibling key. meta.json's last caveat is a worked reconciliation at one vintage whose
  // point is that the subtraction does not come out; citing a live record for any part of
  // it would let a revision move one number and leave the arithmetic around it wrong.
  // The shape guard is the reason this is not just `?? []`. A JSON string here is iterable, so
  // `new Set("1,012,000")` yields the eight distinct characters and every exemption dies with
  // no error raised. Present but not the shape assumed, which is the question this project
  // learned to ask third and has been bitten by twice.
  if (data.historical_literals !== undefined && !Array.isArray(data.historical_literals)) {
    errors.push(`${file}: historical_literals must be an array. A string is iterated character by character, so every exemption in it silently stops exempting anything.`);
  }
  const allowed = new Set(Array.isArray(data.historical_literals) ? data.historical_literals : []);
  const scanned = [];
  for (const [where, prose] of extract(data)) {
    if (!prose) continue;
    checkUnclosed(`${file} ${where}`, prose);
    checkUnits(`${file} ${where}`, prose);
    checkLiterals(`${file} ${where}`, prose, allowed);
    scanned.push(prose);
    dataFields += 1;
  }
  checkDeclarations(file, scanned.join('\n'), allowed, 'the sibling historical_literals array');
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
if (unrecorded.length) {
  console.log(`\n${unrecorded.length} comma-grouped figure(s) written longhand that no record or series point holds:`);
  for (const entry of unrecorded) console.log(`  ${entry}`);
  console.log('Some are frozen history and belong longhand; some are current-edition figures that go wrong at the next release. The list cannot tell them apart, which is why it is printed for review. Printing is not reviewing, and nothing here checks that anyone read it.');
}
console.log(`${cited.size} cited figures resolve to a record, chart bars and chart summaries included. No page writes longhand a comma-grouped value, or a bare value of 100 or more, that a record or one of the ${points.size} series points holds. Unit-qualified matches under 100 are the warnings above, not part of this claim.`);
console.log(`Not covered: a longhand figure the data layer never recorded, which both scans above are blind to by construction, because both match prose against values the site holds. ${unrecorded.length ? `${unrecorded.length} comma-grouped ones are listed above rather than counted as clean` : 'None comma-grouped on this run'}, and a figure written "2.2 million", space-grouped, or bare is not scanned for this at all.`);
console.log(`${dataFields} prose field(s) in data/ that render to a page are held to the same rule, cards, caveats, confidence definitions and the source catalogue.`);
console.log(`Not covered: whether a sentence describing a figure describes it correctly. A citation protects the value, never the verb around it, so a summary saying a series rose when it fell still builds. ${BANNED_TERMS.length} language rules scanned across ${contentPages.length} pages.`);
console.log(`Claim direction split: ${Object.entries(byDirection).map(([d, n]) => `${n} ${d}`).join(', ')}, each meets the minimum of ${MINIMUM_PER_DIRECTION}.`);
console.log('This counts whose claim is corrected. It is not a measure of fairness; the split is disclosed on the claims page.');

// Last, and after the list has printed, so that a run which fails on the ratchet still shows
// WHICH figures it is complaining about. Pushing this into `errors` would have exited above,
// before the block that prints them.
if (unrecorded.length > UNRECORDED_BASELINE) {
  console.error(`\nUnrecorded longhand figures have grown from ${UNRECORDED_BASELINE} to ${unrecorded.length}. Give the new one a record and cite it, or declare it. If it is genuinely a new frozen figure, raise UNRECORDED_BASELINE deliberately and say why in the commit; the constant exists to make that a decision rather than a drift.`);
  console.error('This does not establish that the other figures are right, or that the set is the same one. One fixed and one added keeps the count level and passes here.');
  process.exit(1);
}
console.log(`Unrecorded longhand figures are at the baseline of ${UNRECORDED_BASELINE} and may not grow. Lower it as they are recorded or declared; at zero the report becomes an error.`);
