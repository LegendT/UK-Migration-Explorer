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

const registry = new Map();
for (const file of THEME_FILES) {
  const theme = file.replace('.json', '');
  for (const metric of read(file).metrics ?? []) registry.set(`${theme}/${metric.id}`, metric);
}

const errors = [];
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
  // unpublishable — see the corrections policy in the foundation document.
  if (front.last_reviewed) {
    const reviewed = new Date(`${front.last_reviewed}T00:00:00Z`);
    if (Number.isNaN(reviewed.getTime())) {
      errors.push(`${file}: last_reviewed "${front.last_reviewed}" is not a valid date`);
    } else {
      const age = (Date.now() - reviewed.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
      if (age > REVIEW_MONTHS) {
        errors.push(`${file}: last reviewed ${age.toFixed(0)} months ago — unpublish or re-review`);
      }
    }
  }

  const tokens = [...prose.matchAll(/\{\{([^}]+)\}\}/g)].map((m) => m[1].trim());
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

  claims.push({ file, direction: front.direction, tokens: new Set(tokens) });
}

// The balance rule from the foundation document: no published claim set may run more than
// two-thirds in one direction. This is a hard constraint, checked here rather than trusted
// to memory, because a one-directional claim list would falsify the site's stated position.
if (claims.length) {
  for (const direction of ['restrictionist', 'pro-migration']) {
    const count = claims.filter((c) => c.direction === direction).length;
    if (count / claims.length > 2 / 3) {
      errors.push(`balance rule: ${count} of ${claims.length} claims run ${direction} — the limit is two-thirds`);
    }
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

    const tokens = [...prose.matchAll(/\{\{([^}]+)\}\}/g)].map((m) => m[1].trim());
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
    const anchors = [...prose.matchAll(/^##\s+(.+?)\s*\{#([a-z0-9-]+)\}\s*$/gm)];
    terms = anchors.length;
    const seen = new Set();
    for (const [, name, anchor] of anchors) {
      if (seen.has(anchor)) errors.push(`glossary.md: duplicate anchor #${anchor}`);
      seen.add(anchor);
    }
    for (const heading of prose.match(/^##\s+.+$/gm) ?? []) {
      if (!/\{#[a-z0-9-]+\}$/.test(heading.trim())) {
        errors.push(`glossary.md: term "${heading.replace(/^##\s+/, '')}" has no {#anchor} — claims cannot link to it`);
      }
    }

    // Internal links must resolve, or a definition silently goes nowhere.
    for (const [, anchor] of prose.matchAll(/\]\(#([a-z0-9-]+)\)/g)) {
      if (!seen.has(anchor)) errors.push(`glossary.md: links to #${anchor}, which is not a term on the page`);
    }

    // A definition that does not say what the word is NOT leaves the misreading intact,
    // which is the entire job of this page.
    const sections = prose.split(/^##\s+/m).slice(1);
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

// Report last, so that every check above has run. Reporting mid-file once silently
// discarded every glossary error, which passed a broken page as green.
if (errors.length) {
  console.error(`Content checks failed — ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

const byDirection = claims.reduce((acc, c) => ({ ...acc, [c.direction]: (acc[c.direction] ?? 0) + 1 }), {});
const cited = new Set([...claims.flatMap((c) => [...c.tokens]), ...glossaryTokens]);
console.log(`Content checks passed: ${claims.length} claims and ${terms} glossary terms, ${cited.size} live figures cited, all resolving.`);
console.log(`Claim direction split: ${Object.entries(byDirection).map(([d, n]) => `${n} ${d}`).join(', ')}.`);
