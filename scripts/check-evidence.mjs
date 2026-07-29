#!/usr/bin/env node
// The evidence check. Any figure whose value changed, and any figure that is new, must carry
// a quote from a fetched source containing that value. It compares the data layer against a
// base branch, so it sees exactly what a pull request proposes to publish.
//
// This is the mechanical half of what content/sources-and-method.md promises a reader: "No
// figure appears here because a model asserted it." A fabricated value cannot appear in a
// quote taken from a real page. Eight fabricated figures reached this repository once, from a
// research subagent that returned values appearing nowhere in its own evidence table, and a
// reviewer caught them. Nothing but a reviewer would have.
//
// New figures matter more than changed ones, and are checked on the same terms: those eight
// were new research, not an update to an existing record.
//
// Run: node scripts/check-evidence.mjs [--base=<ref>]

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { COMPANION_BLOCKS, SERIES_FILES } from '../lib/series.mjs';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const evidenceDir = `${repoRoot}data/evidence/`;
const THEME_FILES = ['migration.json', 'asylum.json', 'population.json', 'fiscal.json'];

// A figure a source states outright is quoted directly. A figure nobody publishes, because
// this site worked it out, cannot be: its evidence is a quote for each input and a sentence
// saying what was done to them. Seven of the 71 metrics are derived today, three calculated
// and four estimated, one of which is also the only range. Keep this set small and explicit.
// An exemption that can be claimed freely is how this check would rot.
const DERIVED = new Set(['calculated', 'estimated']);

const errors = [];
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const git = (...args) =>
  execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

const flag = process.argv.find((argument) => argument.startsWith('--base='));
const base = flag ? flag.slice('--base='.length) : (process.env.EVIDENCE_BASE ?? 'origin/main');

// --- the base branch has to be readable -------------------------------------------
// Fail rather than skip. A comparison against nothing finds no changed figure and would
// report that as a clean run, which is the exact shape of the seven checks in this project
// that passed while a real defect shipped.
try {
  git('rev-parse', '--verify', '--quiet', `${base}^{commit}`);
} catch {
  console.error(`Evidence check cannot run: "${base}" is not a commit this clone can see.`);
  console.error('It needs the branch a pull request would merge into, to know which values changed.');
  console.error('');
  console.error('  locally:  git fetch origin main');
  console.error('  in CI:    git fetch --depth=1 origin main, before this step');
  console.error('  or:       --base=<ref>, or EVIDENCE_BASE=<ref>');
  console.error('');
  console.error('This fails rather than passing, because a check that silently compares against');
  console.error('nothing reports every unevidenced figure as fine.');
  process.exit(1);
}

// Comparing a commit with itself finds no changed figure, which is not the same thing as
// finding none. It happens on every push to main, where the merge has already landed.
const sameCommit = git('rev-parse', 'HEAD').trim() === git('rev-parse', `${base}^{commit}`).trim();

// --- what the data layer holds now, and what it held on the base branch -------------
const metricsIn = (json, theme) => (json.metrics ?? []).map((metric) => [`${theme}/${metric.id}`, metric]);

const current = new Map();
for (const file of THEME_FILES) {
  for (const entry of metricsIn(readJson(`${repoRoot}data/${file}`), file.replace('.json', ''))) {
    current.set(...entry);
  }
}

const previous = new Map();
for (const file of THEME_FILES) {
  let text;
  // A theme file absent from the base branch is not an error. Every metric in it is new, and
  // new metrics are what this check is strictest about.
  try {
    text = git('show', `${base}:data/${file}`);
  } catch {
    continue;
  }
  for (const entry of metricsIn(JSON.parse(text), file.replace('.json', ''))) previous.set(...entry);
}

// A range holds its value as null and its bounds in range_min and range_max, so comparing
// `value` alone would miss a revision to a range entirely.
const published = (metric) => (metric.value_type === 'range' ? [metric.range_min, metric.range_max] : [metric.value]);
const shape = (metric) => JSON.stringify(published(metric));

// Formatted the way the site prints a figure, because an error message is read beside the
// page and the record. An unformatted integer in a message is how 45537 reached a built page.
// Deliberately NOT used where a message names a value to be typed into JSON: previous_value
// is written 93525, and telling someone to write 93,525 there is telling them to break the
// file. Prose about a change is formatted; a field's contents are quoted as they must be typed.
// A range is bracketed rather than joined with "to", because "changed from -1 to 1 to -1 to 2"
// is the sentence that produces.
const format = (value) => (typeof value === 'number' ? value.toLocaleString('en-GB') : String(value));
const describe = (metric) => {
  const [min, max] = published(metric).map(format);
  return metric.value_type === 'range' ? `[${min}, ${max}]` : min;
};

const isRealDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
};

// The same two forms validate-content.mjs matches longhand literals on, for the same reason:
// a source prints 97,120 or 97120 and both are the figure. Nothing else is accepted. A source
// that only says "13.1 million" has not stated the value, and the remedy is the data table.
const carries = (text, value) =>
  [...new Set([format(value), String(value)])].some((form) => String(text).includes(form));

// --- the evidence on file ------------------------------------------------------------
// Every entry ever written stays here; it is the audit trail that makes a figure's history
// reconstructible. So entries are matched, never validated wholesale: an entry written for a
// figure that has since been renamed or dropped is a historical record, not a defect, and a
// check that failed on it would push someone into deleting the trail to get a green run.
const entries = [];
const seriesEntries = [];
if (existsSync(evidenceDir)) {
  for (const file of readdirSync(evidenceDir).filter((name) => name.endsWith('.json'))) {
    let json;
    // Hand-written, and nothing else in the repository parses it, so a stray comma would
    // otherwise surface as a stack trace from a check whose whole job is legibility.
    try {
      json = readJson(evidenceDir + file);
    } catch (error) {
      // First line only: the parser quotes the offending text, newlines and all, and an error
      // list that one entry can wrap across five lines stops reading as a list.
      errors.push(`data/evidence/${file}: is not valid JSON, ${error.message.split('\n')[0]}`);
      continue;
    }
    // Either array, or both: a release moves records and series together, and one file per
    // release holds whichever it moved. Requiring "figures" rejected a file that correctly
    // held only a series, which is how this was found.
    const figures = Array.isArray(json.figures) ? json.figures : null;
    const series = Array.isArray(json.series) ? json.series : null;
    if ((figures ?? series) === null || !(figures?.length || series?.length)) {
      errors.push(`data/evidence/${file}: holds no "figures" or "series" array with anything in it, so nothing here can be found. See data/evidence/README.md.`);
      continue;
    }
    (figures ?? []).forEach((entry, i) => entries.push({ entry, where: `data/evidence/${file} figures[${i}]` }));
    (series ?? []).forEach((entry, i) => seriesEntries.push({ entry, where: `data/evidence/${file} series[${i}]` }));
  }
}

const declares = (entry, metric) =>
  metric.value_type === 'range'
    ? entry.range_min === metric.range_min && entry.range_max === metric.range_max
    : entry.value === metric.value;

const SHAPE = 'Shape: data/evidence/README.md.';

// The entry the author has to write, with the parts this script already knows filled in.
// Raw values, because they are going into JSON: 93525, never 93,525.
const skeleton = (ref, metric, before) => {
  const values = metric.value_type === 'range'
    ? [`"range_min": ${metric.range_min}`, `"range_max": ${metric.range_max}`]
    : [`"value": ${metric.value}`];
  const evidence = DERIVED.has(metric.confidence_level)
    ? ['"derivation": "what was done to the components"', '"components": [{ "value": 0, "source_url": "https://...", "quote": "..." }]']
    : ['"source_url": "https://..."', '"quote": "..."'];
  return `{ "ref": "${ref}", "previous_value": ${JSON.stringify(before ? (before.value ?? null) : null)}, ${values.join(', ')}, "fetched_at": "YYYY-MM-DD", ${evidence.join(', ')} }`;
};

function checkSourceUrl(where, what, url) {
  if (!url) errors.push(`${where}: no ${what}. Name the page or table the quote was taken from.`);
  else if (!String(url).startsWith('https://')) errors.push(`${where}: ${what} is not https, ${url}`);
}

function checkEntry(ref, metric, before, entry, where) {
  const isNew = !before;
  const claimed = 'previous_value' in entry ? entry.previous_value : undefined;
  const held = before ? (before.value ?? null) : null;

  // previous_value is what the record held on the base branch, so the evidence and the diff
  // can be read against each other rather than one at a time. For a range that is null on
  // both sides; the bounds are matched above.
  if (isNew && claimed !== undefined && claimed !== null) {
    errors.push(`${where}: declares previous_value ${claimed}, but ${ref} does not exist on ${base}. A new figure has no previous value: use null.`);
  } else if (!isNew && claimed === undefined) {
    errors.push(`${where}: no previous_value. ${ref} holds ${held} on ${base}; record that, so the evidence names the change and not just the figure.`);
  } else if (!isNew && claimed !== held) {
    errors.push(`${where}: previous_value ${claimed} is not what ${ref} holds on ${base}, which is ${held}. Either the evidence was written against a different starting point, or the value moved twice.`);
  }

  if (!isRealDate(entry.fetched_at)) {
    errors.push(`${where}: fetched_at "${entry.fetched_at}" is not a real YYYY-MM-DD date. It is the day the source was read, which is what dates the quote.`);
  }

  if (DERIVED.has(metric.confidence_level)) {
    // A derived figure appears in no source, which is what makes it derived. Its inputs do.
    if (!String(entry.derivation ?? '').trim()) {
      errors.push(`${where}: ${ref} is ${metric.confidence_level}, so its value appears in no source. State the derivation: what was done to the components to get ${describe(metric)}.`);
    }
    if (!Array.isArray(entry.components) || entry.components.length === 0) {
      errors.push(`${where}: ${ref} is ${metric.confidence_level} and needs a "components" array, each with the published value it was built from and a quote carrying it. ${SHAPE}`);
      return;
    }
    entry.components.forEach((component, i) => {
      const at = `${where} components[${i}]`;
      if (typeof component.value !== 'number') {
        errors.push(`${at}: value must be a number, got ${typeof component.value}`);
        return;
      }
      checkSourceUrl(at, 'source_url', component.source_url);
      if (!component.quote) errors.push(`${at}: no quote for ${format(component.value)}`);
      else if (!carries(component.quote, component.value)) {
        errors.push(`${at}: the quote does not contain ${format(component.value)}. Quote the row and column labels with the value if it comes from a table cell rather than a sentence.`);
      }
    });
    return;
  }

  checkSourceUrl(where, 'source_url', entry.source_url);
  if (!entry.quote) {
    errors.push(`${where}: no quote. ${SHAPE}`);
    return;
  }
  for (const value of published(metric)) {
    if (!carries(entry.quote, value)) {
      errors.push(`${where}: the quote does not contain ${format(value)}, which is what ${ref} publishes. Quote the row and column labels with the value if it comes from a table cell rather than a sentence.`);
    }
  }
}

// --- every changed or new figure needs one -------------------------------------------
let changed = 0;
let derived = 0;

for (const [ref, metric] of current) {
  const before = previous.get(ref);
  if (before && shape(before) === shape(metric)) continue;
  changed += 1;
  if (DERIVED.has(metric.confidence_level)) derived += 1;

  const named = entries.filter(({ entry }) => entry.ref === ref);
  const matched = named.find(({ entry }) => declares(entry, metric));
  if (!matched) {
    const moved = before ? `changed from ${describe(before)} to ${describe(metric)}` : 'is new';
    const stale = named.length
      ? ` ${named.length} entr${named.length === 1 ? 'y names' : 'ies name'} ${ref} at a different value, which is what a figure moving again after its evidence was written looks like.`
      : '';
    errors.push(`${ref}: ${moved}, and no evidence entry declares it.${stale} Add to the "figures" array of a file in data/evidence/:\n      ${skeleton(ref, metric, before)}\n      ${SHAPE}`);
    continue;
  }
  checkEntry(ref, metric, before, matched.entry, matched.where);
}

// --- and every series that moved ---------------------------------------------------------
// A series is not a hundred independent figures. It is one array replaced whole from one
// release, because ONS states you cannot append the latest estimates to a series taken from an
// earlier one, so the evidence is per array and per release rather than per point. Requiring a
// quote for each of 100 points would be theatre nobody could perform.
//
// Until this existed, those 100 published points could change with nothing asking where they
// came from. It was the largest hole left in this contract, and the check announced it on every
// run rather than closing it.
const blocksOf = (series) => [
  ['primary', series],
  ...COMPANION_BLOCKS.filter((name) => series[name]).map((name) => [name, series[name]]),
];
const fingerprint = (block) => JSON.stringify((block?.data ?? []).map((p) => [p.date, p.value]));
// Single vintage per block is enforced by validate-data.mjs, so the first point speaks for all.
const vintageOf = (block) => (block?.data ?? [])[0]?.published_date ?? null;

let seriesMoved = 0;
for (const file of Object.values(SERIES_FILES)) {
  const now = readJson(`${repoRoot}data/${file}`);
  let before = null;
  try {
    before = JSON.parse(git('show', `${base}:data/${file}`));
  } catch {
    before = null;
  }

  for (const [name, block] of blocksOf(now)) {
    const was = before && (name === 'primary' ? before : before[name]);
    const vintage = vintageOf(block);
    const points = (block.data ?? []).length;
    if (was && fingerprint(was) === fingerprint(block) && vintageOf(was) === vintage) continue;
    seriesMoved += 1;

    const at = `${file} ${name}`;

    // An empty block would be evidenced by a quote carrying nothing: `ends` is empty, so the
    // quote check never runs, and the run would still report both ends as quoted.
    // validate-data.mjs rejects an empty PRIMARY series and does not look at companions, so
    // this is the only thing standing between a companion emptied by a bad paste and a pass.
    if (points === 0) {
      errors.push(`${at}: holds no points, so there are no ends to quote and any evidence for it would be vacuous. A series is replaced whole; an empty array is a failed paste, not a release.`);
      continue;
    }

    // Filtered then matched, rather than matched in one pass, so an entry naming this block at
    // some other vintage can be named in the message. That is what a series moving again after
    // its evidence was written looks like, and the metric path says so for the same reason.
    const named = seriesEntries.filter(({ entry }) =>
      entry.file === file && (entry.block ?? 'primary') === name);
    const matched = named.find(({ entry }) => entry.vintage === vintage);
    if (!matched) {
      const stale = named.length
        ? ` ${named.length} entr${named.length === 1 ? 'y names' : 'ies name'} this block at a different vintage, which is what a series moving again after its evidence was written looks like.`
        : '';
      errors.push(`${at}: ${was ? 'moved' : 'is new'}, and no evidence entry declares it.${stale} Add to the "series" array of a file in data/evidence/:\n      { "file": "${file}", "block": "${name}", "previous_vintage": ${JSON.stringify(vintageOf(was))}, "vintage": ${JSON.stringify(vintage)}, "points": ${points}, "source_url": "https://...", "fetched_at": "YYYY-MM-DD", "quote": "..." }\n      ${SHAPE}`);
      continue;
    }

    const { entry, where } = matched;
    const claimed = 'previous_vintage' in entry ? entry.previous_vintage : undefined;
    if (claimed === undefined) {
      errors.push(`${where}: no previous_vintage. ${at} was ${JSON.stringify(vintageOf(was))} on ${base}.`);
    } else if (claimed !== vintageOf(was)) {
      errors.push(`${where}: previous_vintage ${JSON.stringify(claimed)} is not what ${at} holds on ${base}, which is ${JSON.stringify(vintageOf(was))}.`);
    }
    // The count catches an array pasted short, which quoting its two ends cannot.
    if (entry.points !== points) {
      errors.push(`${where}: declares ${entry.points} point(s), but ${at} holds ${points}. A series is replaced whole, so a mismatch means the array is not the one that was read.`);
    }
    if (!isRealDate(entry.fetched_at)) {
      errors.push(`${where}: fetched_at "${entry.fetched_at}" is not a real YYYY-MM-DD date.`);
    }
    checkSourceUrl(where, 'source_url', entry.source_url);
    // Both ends, because a release is read from a table and the two ends are what an author
    // must look at to know they took the right column and the whole of it.
    const ends = [(block.data ?? [])[0], (block.data ?? [])[points - 1]].filter(Boolean);
    if (!entry.quote) {
      errors.push(`${where}: no quote. ${SHAPE}`);
    } else {
      for (const point of ends) {
        if (!carries(entry.quote, point.value)) {
          errors.push(`${where}: the quote does not contain ${format(point.value)}, the ${point === ends[0] ? 'first' : 'last'} point of ${at} (${point.date}).`);
        }
      }
    }
  }
}

// --- report ----------------------------------------------------------------------------
if (errors.length) {
  console.error(`Evidence check failed against ${base}, ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  console.error('\nNothing here is fixable by editing the check. A figure with no quote is a figure');
  console.error('nobody has seen in a source, which is the one thing this site promises never to publish.');
  process.exit(1);
}

if (changed === 0) {
  console.log(`Evidence check passed against ${base}: no metric changed value and none is new, so there is nothing to evidence.`);
} else {
  console.log(`Evidence check passed against ${base}: ${changed} metric(s) changed or new, each declared in data/evidence/ with a quote containing its value.`);
}
console.log('Not established: that the quote is on the page it names, that anyone fetched it, or that');
console.log('the URL belongs to a catalogued publisher, which validate-data.mjs requires of a record');
console.log('and nothing requires of a quote. This matches digits against text a person pasted, so it');
console.log('catches an invented figure and not a misread one, and says nothing about figures that');
console.log('did not change.');
if (derived) {
  console.log(`Also not established: the arithmetic of ${derived} derived figure(s) in this diff. Each input is quoted; the sum or share is not recomputed.`);
}
if (seriesMoved) {
  console.log(`\n${seriesMoved} series block(s) moved, each declared with its release, its vintage, its point count and both ends quoted.`);
  console.log('Not established: the points between those ends. A series is evidenced as one array from');
  console.log('one release, which is how it is published and how it is replaced, so a wrong value in the');
  console.log('middle of a correctly sourced array passes this.');
  console.log('Nor that a block still exists. Only blocks present now are compared, so a companion series');
  console.log('deleted from a file is not a moved series and nothing here asks about it.');
}
// Last, and set apart, because it is the one line that can make everything above vacuous.
if (sameCommit) {
  console.log(`\nOnly uncommitted changes were compared: ${base} and HEAD are the same commit. On a push`);
  console.log('to main that means this run establishes nothing about how any figure got there, because');
  console.log('the change is already in the base. The gate is the pull request.');
}
