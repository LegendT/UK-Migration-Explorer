#!/usr/bin/env node
// The evidence check. Any figure whose value changed, and any figure that is new, must carry
// a quote from a fetched source containing that value. It compares the data layer against a
// base branch, so it sees exactly what a pull request proposes to publish. It then re-reads
// every entry on file that still describes a live figure, and every series entry that still
// describes a live block, because the comparison alone asks only about figures and blocks that
// moved and most of them do not.
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

import { COMPANION_BLOCKS, SERIES_FILES, THEME_FILES } from '../lib/series.mjs';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const evidenceDir = `${repoRoot}data/evidence/`;

// A figure a source states outright is quoted directly. A figure nobody publishes, because
// this site worked it out, cannot be: its evidence is a quote for each input and a sentence
// saying what was done to them. The derived set is small and is meant to stay that way; one of
// it is also the only range. Keep it small and explicit: an exemption that can be claimed
// freely is how this check would rot.
//
// How many are derived is NOT written here. It was, and it was wrong by one before anyone
// noticed and by two after a regrade elsewhere, because a count in a comment is a count nothing
// reads. Derive it instead:
//   node -p "JSON.stringify(['migration','asylum','population','fiscal'].flatMap(f=>require('./data/'+f+'.json').metrics).reduce((n,m)=>(n[m.confidence_level]=(n[m.confidence_level]||0)+1,n),{}))"
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
// Boundary-anchored, because a bare substring test lets one figure's digits inside another satisfy
// it: "total rose to 24.9 billion" answered for 4.9, and "1,313 applications" answered for 313. The
// guard is the same shape validate-content.mjs uses on longhand literals, and it is what makes the
// success message's "a quote containing its value" mean the value rather than its digits.
//
// The trailing side asks whether the punctuation SEPARATES or CONTINUES the number, and it used to
// reject both. `(?![\d,.])` refuses a comma or a full stop whatever follows it, so a quote ending
// "Registration grants: 71,083." failed and "71,083, and the total" failed, while the same text
// with a word after the value passed. That is the remedy this check's own message points at,
// "quote the row and column labels with the value", producing a quote the check then rejects: the
// fourth time here that a check was sound and the thing it pointed at was not.
//
// So a digit is still refused, and a comma or full stop is refused only where a digit follows it,
// which is what makes it a thousands separator or a decimal point rather than punctuation. The
// leading side is deliberately unchanged: a comma or full stop immediately before the digits is a
// separator in every real case, and loosening it would let 1,313 answer for 313 again.
//
// AND A SIGN IS REFUSED, since 6 August 2026. The lookbehind excluded a preceding digit, comma
// and full stop and said nothing about a minus, so a quote reading "-297,000", "−297,000" or
// "-£297,000" answered for a record holding a positive 297,000. This project publishes figures
// whose SIGN is the contested part: the OBR record below says in terms that the endpoint age
// "decides the sign as well as the size", so the evidence contract was weakest exactly where the
// subject is hardest. Found by probing the function, not by reading it.
//
// A minus is refused only where it is ACTING as a sign, meaning it is not itself preceded by a
// digit. That distinction is load-bearing in both directions: refusing every preceding hyphen
// would have failed a quote giving a range as "290,000-297,000" and a financial year as
// "2024-25", both of which real quotes use. One space and one currency symbol may sit between
// the sign and the digits, because "-£297,000" and "− £297,000" are how the sign is actually
// written here.
//
// NOT fixed, and pre-existing rather than introduced: a record whose own value is negative,
// quoted with the symbol inside the sign as "-£308,275", is not found, because the formatted
// form is "-308,275" and that string is not in the text. No record holds a negative value today.
const CARRIES_LOOKBEHIND = String.raw`(?<![\d,.])(?<!(?<!\d)[-−–]\s?[£$€]?)`;
const carries = (text, value) =>
  [...new Set([format(value), String(value)])].some((form) => {
    const escaped = form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`${CARRIES_LOOKBEHIND}${escaped}(?!\\d)(?![,.]\\d)`).test(String(text));
  });

// Control, run every time, on the precedent scripts/validate-content.mjs sets for its scale-word
// scan: a matcher that quietly stopped matching would let every entry through and read as a pass.
// Both directions, because a check that only proves it still CATCHES can be satisfied by a
// matcher that catches everything.
for (const [text, value, expected] of [
  ['reaches 297,000 at age 82', 297000, true],
  ['reaches £297,000 at 82', 297000, true],
  ['between 290,000-297,000 people', 297000, true],
  ['in 2024-25 the figure', 25, true],
  ['the total was 1,297,000', 297000, false],
  ['a net cost of -297,000', 297000, false],
  ['a net cost of −297,000', 297000, false],
  ['a net cost of -£297,000', 297000, false],
]) {
  if (carries(text, value) !== expected) {
    errors.push(`quote matching: ${JSON.stringify(text)} against ${value} should be ${expected}. The rule that a quote must contain its figure means nothing while this disagrees.`);
  }
}

// --- the evidence on file ------------------------------------------------------------
// Every entry ever written stays here; it is the audit trail that makes a figure's history
// reconstructible. So an entry written for a figure that has since been renamed, dropped or
// revised is a historical record, not a defect, and a check that failed on it would push
// someone into deleting the trail to get a green run. Entries that still describe a live
// figure are a different case and are audited on every run: see the second loop below.
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
  checkPreviousValue(ref, before, entry, where);
  checkEvidenceShape(ref, metric, entry, where);
}

// previous_value is what the record held on the base branch, so the evidence and the diff can be
// read against each other rather than one at a time. For a range that is null on both sides; the
// bounds are matched by `declares`.
//
// Split out of checkEntry because it needs no metric: it is a claim about the base branch alone,
// which is what lets the third pass below ask it of an entry whose figure did not move. That
// asymmetry is the defect it exists for. Twenty-eight backfilled entries said `null` here, and the
// only loop that read the field ran for figures that had moved, so none of them was ever asked.
function checkPreviousValue(ref, before, entry, where) {
  const isNew = !before;
  const claimed = 'previous_value' in entry ? entry.previous_value : undefined;
  const held = before ? (before.value ?? null) : null;

  if (isNew && claimed !== undefined && claimed !== null) {
    errors.push(`${where}: declares previous_value ${claimed}, but ${ref} does not exist on ${base}. A new figure has no previous value: use null.`);
  } else if (!isNew && claimed === undefined) {
    errors.push(`${where}: no previous_value. ${ref} holds ${held} on ${base}; record that, so the evidence names the change and not just the figure.`);
  } else if (!isNew && claimed !== held) {
    errors.push(`${where}: previous_value ${claimed} is not what ${ref} holds on ${base}, which is ${held}. A backfill for a figure that has not moved is not new: it takes the value the record already holds. Either the evidence was written against a different starting point, or the value moved twice.`);
  }
}

// Everything an entry must be, judged against the record as it stands now. Split out of
// checkEntry because none of it needs the base branch: checkEntry asks what CHANGED, and
// this asks whether the evidence is adequate, which is a question that can be put to an
// entry nobody has touched in months. The audit pass below is the caller that matters.
function checkEvidenceShape(ref, metric, entry, where) {
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
// And every figure whose grade CROSSES the derived boundary, because that changes which
// kind of evidence is adequate rather than what the figure says. A figure regraded into
// the derived set is claimed to appear in no source, so a quote is no longer the right
// evidence for it; one regraded out is claimed to be published, and its components are no
// longer the right evidence either. `shape` compares values alone, so neither move was
// visible here: this fired correctly on the audit's own regrade of
// asylum-administrative-outcomes on 31 July 2026 and was reverted that day, because
// landing it turned the branch red until that record had an entry and the entry needed
// quotes from a pivot nobody had opened. Asy_D02 was opened on 3 August and the entry
// written, which is the ordering that keeps a check from forcing a fabricated quote.
// The backlog scoped this to the inward direction; the outward one is the same expression
// and the same defect facing the other way, so it is covered rather than left as a sibling.
const gradeCrossed = (before, metric) =>
  DERIVED.has(before.confidence_level) !== DERIVED.has(metric.confidence_level);

let changed = 0;
let derived = 0;
let regraded = 0;
const audited = new Set();

for (const [ref, metric] of current) {
  const before = previous.get(ref);
  const moved = !before || shape(before) !== shape(metric);
  if (!moved && !gradeCrossed(before, metric)) continue;
  if (!moved) regraded += 1;
  changed += 1;
  if (DERIVED.has(metric.confidence_level)) derived += 1;

  const named = entries.filter(({ entry }) => entry.ref === ref);
  const matched = named.find(({ entry }) => declares(entry, metric));
  if (!matched) {
    // "changed from 5,931 to 5,931" is what a regrade produces otherwise, which reads as a
    // bug in the check rather than as the thing it is reporting.
    const what = !before ? 'is new'
      : shape(before) !== shape(metric) ? `changed from ${describe(before)} to ${describe(metric)}`
      : `was regraded from ${before.confidence_level} to ${metric.confidence_level}, which changes what counts as evidence for it`;
    const stale = named.length
      ? ` ${named.length} entr${named.length === 1 ? 'y names' : 'ies name'} ${ref} at a different value, which is what a figure moving again after its evidence was written looks like.`
      : '';
    errors.push(`${ref}: ${what}, and no evidence entry declares it.${stale} Add to the "figures" array of a file in data/evidence/:\n      ${skeleton(ref, metric, before)}\n      ${SHAPE}`);
    continue;
  }
  checkEntry(ref, metric, before, matched.entry, matched.where);
  audited.add(matched.entry);
}

// --- and every entry on file that still describes a live figure --------------------------
// The loop above asks only about figures that MOVED, so an entry written for a figure that
// then sat still was declared once and never asked again. That is most of them, and the
// backfill of `data/evidence/` for records predating the contract writes about 69 more: a
// bad quote in any of them would be invisible for as long as the figure holds. This run's
// own closing line said so.
//
// The rule that makes this safe is the one data/evidence/README.md already sets: entries
// are the audit trail, so an entry for a figure that has since been renamed, dropped or
// revised stays as history and fails nothing. So the key is `declares`, the same one the
// loop above matches on: an entry is audited only where its record still exists AND still
// holds exactly what the entry says. Asked of both sides, that key cannot be permanently
// satisfied. Unchanged, the entry is re-asked on every run, which is the point. Absent, the
// record is gone and the entry is history. Wrong shape, a range entry carries bounds rather
// than a value, and `declares` already reads both.
let auditedCount = 0;
for (const { entry, where } of entries) {
  const metric = current.get(entry.ref);
  if (!metric) continue;                    // renamed or dropped: history, not a defect
  if (!declares(entry, metric)) continue;   // the figure moved on: history, not a defect
  if (audited.has(entry)) continue;         // already checked above, and twice is two errors
  auditedCount += 1;
  checkEvidenceShape(entry.ref, metric, entry, where);
}

// --- and previous_value on every entry this branch ADDS, whatever its figure did ------------
// The first loop reads previous_value only for a figure that moved, and matches an entry to that
// figure on its ref AND its value, so an entry written for a figure sitting still is never
// reached. The pass above does reach it and asks nothing about the field. Between them sat the
// twenty-eight backfilled entries that said `null`, meaning new, for figures that were years old.
//
// So this asks the question of a claim rather than of a figure. An entry already on the base
// branch is history and is skipped: not because history is exempt, but because the claim was
// already merged and failing it now would push someone into editing the audit trail to get a
// green run, which is the same rule the pass above runs on. What is asked is what this branch
// proposes to add, which is the only thing a pull request can still change.
//
// The key is the claim itself, ref with previous_value and the published value, not the whole
// entry: fixing a typo in a quote must not re-open a merged previous_value, and moving an entry
// between files must not either. Editing the field, or the value it is measured against, does
// re-open it, which is the point.
const claimKey = (entry) => JSON.stringify([
  entry.ref,
  'previous_value' in entry ? entry.previous_value : '<absent>',
  entry.value ?? null,
  entry.range_min ?? null,
  entry.range_max ?? null,
]);

// The same question one level over, and the same answer to it. A series claim is its block and
// the release it declares, so editing previous_vintage, the vintage it is measured against, or
// the count re-opens it, and moving the entry between files does not.
const seriesClaimKey = (entry) => JSON.stringify([
  entry.file,
  entry.block ?? 'primary',
  'previous_vintage' in entry ? entry.previous_vintage : '<absent>',
  entry.vintage ?? null,
  entry.points ?? null,
]);

const baseClaims = new Set();
const baseSeriesClaims = new Set();
for (const file of existsSync(evidenceDir) ? readdirSync(evidenceDir).filter((name) => name.endsWith('.json')) : []) {
  let json;
  // Absent from the base branch, or unparseable there, means every claim in it is new here.
  // Neither is an error about the base: a new evidence file is the ordinary case.
  try {
    json = JSON.parse(git('show', `${base}:data/evidence/${file}`));
  } catch {
    continue;
  }
  for (const entry of json.figures ?? []) baseClaims.add(claimKey(entry));
  for (const entry of json.series ?? []) baseSeriesClaims.add(seriesClaimKey(entry));
}

let newClaims = 0;
for (const { entry, where } of entries) {
  if (audited.has(entry)) continue;             // the first loop already asked, and twice is two errors
  if (baseClaims.has(claimKey(entry))) continue; // already merged: history, and it fails nothing
  newClaims += 1;
  checkPreviousValue(entry.ref, previous.get(entry.ref), entry, where);
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
const blockIn = (file, name) => (name === 'primary' ? file : file?.[name]) ?? null;

// Read once and shared with the audit pass below, which needs the same two states: what each block
// holds now, and what it held on the base branch. Both were read inside the loop below and were
// therefore reachable by nothing else, which is why hoisting them comes first.
const seriesNow = new Map();
const seriesBefore = new Map();
for (const file of Object.values(SERIES_FILES)) {
  seriesNow.set(file, readJson(`${repoRoot}data/${file}`));
  try {
    seriesBefore.set(file, JSON.parse(git('show', `${base}:data/${file}`)));
  } catch {
    seriesBefore.set(file, null);
  }
}

// Everything a series entry must be, judged against the block as it stands NOW: the count, a real
// fetch date, an https source, and a quote carrying both ends. Split out of the loop below for the
// same reason checkEvidenceShape is split out of checkEntry: none of it needs the base branch, so
// it can be put to an entry for a block that has not moved since the entry was written. The audit
// pass below is the caller that matters, and until it existed nothing ever asked these of an entry
// a second time.
function checkSeriesShape(at, block, entry, where) {
  const points = (block.data ?? []).length;
  // The count catches an array pasted short, which quoting its two ends cannot. Stringified
  // because "declares 14 point(s), but holds 14" is what a string 14 produces otherwise.
  if (entry.points !== points) {
    errors.push(`${where}: declares ${JSON.stringify(entry.points)} point(s), but ${at} holds ${points}. A series is replaced whole, so a mismatch means the array is not the one that was read.`);
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
    return;
  }
  for (const point of ends) {
    if (!carries(entry.quote, point.value)) {
      errors.push(`${where}: the quote does not contain ${format(point.value)}, the ${point === ends[0] ? 'first' : 'last'} point of ${at} (${point.date}).`);
    }
  }
}

// previous_vintage is what the block's published_date was on the base branch, the series half of
// checkPreviousValue and split out for the same reason: it is a claim about the base branch alone,
// so the pass that reads a CLAIM rather than a block can ask it of an entry whose block sat still.
function checkPreviousVintage(at, was, entry, where) {
  const claimed = 'previous_vintage' in entry ? entry.previous_vintage : undefined;
  if (claimed === undefined) {
    errors.push(`${where}: no previous_vintage. ${at} was ${JSON.stringify(vintageOf(was))} on ${base}.`);
  } else if (claimed !== vintageOf(was)) {
    errors.push(`${where}: previous_vintage ${JSON.stringify(claimed)} is not what ${at} holds on ${base}, which is ${JSON.stringify(vintageOf(was))}.`);
  }
}

const seriesAudited = new Set();
let seriesMoved = 0;
for (const file of Object.values(SERIES_FILES)) {
  const now = seriesNow.get(file);
  const before = seriesBefore.get(file);

  // A block under a key nothing lists is invisible here and to validate-data.mjs, which walks
  // the same list: 100 points could ship with no evidence and no field validation at all.
  // Registering a companion in lib/series.mjs is what makes it visible to both, so say that.
  const known = new Set(COMPANION_BLOCKS);
  for (const [key, value] of Object.entries(now)) {
    if (key === 'data' || known.has(key)) continue;
    if (value && typeof value === 'object' && Array.isArray(value.data)) {
      errors.push(`data/${file}: holds a block under "${key}" with ${value.data.length} point(s), and lib/series.mjs does not list it as a companion, so neither this check nor validate-data.mjs can see it. Add it to COMPANION_BLOCKS, or move the data somewhere that is watched.`);
    }
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
    seriesAudited.add(entry);
    checkPreviousVintage(at, was, entry, where);

    // A block whose contents moved while its vintage did not is either a correction inside an
    // edition or an entry that predates the change. Matching on vintage cannot tell those
    // apart, so without this an entry written for the previous state of the same edition covers
    // a value it never saw, and the run reports it as declared. A fabricated middle point passed
    // that way. It also fires for a block whose points carry no published_date, where the
    // vintage is null on both sides and every later edit would match the first entry for ever.
    //
    // A correction inside an edition is the one channel through which a wrong number can sit on
    // this site indefinitely: the slug does not change and no cadence implies it.
    if (was && vintageOf(was) === vintage && !String(entry.correction ?? '').trim()) {
      errors.push(`${where}: ${at} moved while its vintage stayed ${JSON.stringify(vintage)}, so this entry cannot be evidence for the change. An entry matched on vintage also matches every earlier state of the same edition. If the publisher corrected the array inside its edition, re-read both ends and say what changed in a "correction" field. If it did not, an array moved without a release and that is the thing to explain.`);
    }

    checkSeriesShape(at, block, entry, where);
  }
}

// --- and every series entry on file that still describes a live block ----------------------
// The loop above asks only about a block that MOVED, so an entry written for a block that then sat
// still was declared once and never asked again. That is the record-level gap of 3 August 2026 one
// level over, on a smaller surface: four files rather than the whole record set, and live rather
// than hypothetical, because three entries were written that way and their quotes had to be
// generated from the fetched table with a per-point assertion for exactly this reason. A bad quote
// in any of them was invisible for as long as the block held. The run's own closing line said so.
//
// The key is file, block and vintage, the same one the loop above matches on. Asked of both sides
// it cannot be permanently satisfied, and it fails SOFT rather than open: a miss here skips an
// entry as history, where a miss above exempts a block from needing one at all.
//   Unchanged: the vintage sits still, so the entry is re-read on every run. That is the point.
//   Absent: a nullable vintage matches null with null, which here means MORE checking rather than
//     an exemption, so the null that would have made the block above exempt for ever is safe.
//     Absent on the ENTRY is not: an entry with no vintage field matches no block and would slip
//     both passes, so the field is required rather than defaulted.
//   Wrong shape: a file or block name lib/series.mjs does not map is a typo, not history. Series
//     files are a fixed list in code and companions are registered there, so unlike a record ref,
//     which is genuinely renamed, an unmappable name here is refused rather than skipped. Left to
//     skip, one mistyped character would reopen this whole gap for that entry.
//   The other side: a companion the data layer no longer holds is history and is skipped, which is
//     the same rule the record audit runs on, and the closing line still says nothing here asks
//     whether a block was deleted.
const KNOWN_BLOCKS = new Set(['primary', ...COMPANION_BLOCKS]);
let seriesAuditedCount = 0;
for (const { entry, where } of seriesEntries) {
  const name = entry.block ?? 'primary';
  // The four errors below are the ones an entry cannot be READ past, so they are asked only of an
  // entry THIS branch proposes, the rule every other pass here runs on: a merged claim is history,
  // because failing it now would push someone into editing the audit trail to get a green run.
  // That distinction earns its place here rather than on the record side, where a ref names one
  // record: these name a fixed list in code, so a rename in lib/series.mjs, of a FILE or of a
  // companion, would otherwise orphan every entry pointing at the old name in one commit and the
  // only green run available would be the one that rewrote history.
  const proposed = !baseSeriesClaims.has(seriesClaimKey(entry));
  if (!seriesNow.has(entry.file)) {
    if (proposed) errors.push(`${where}: names file ${JSON.stringify(entry.file)}, which lib/series.mjs does not map, so no block can be found for it and nothing here can read this entry. ${SHAPE}`);
    continue;
  }
  if (!KNOWN_BLOCKS.has(name)) {
    if (proposed) errors.push(`${where}: names block ${JSON.stringify(name)}, which is neither "primary" nor a companion registered in lib/series.mjs (${COMPANION_BLOCKS.join(', ')}).`);
    continue;
  }
  if (!('vintage' in entry)) {
    if (proposed) errors.push(`${where}: no vintage. It is the block's published_date, and it is what an entry is matched on, so an entry without one is evidence for no release.`);
    continue;
  }
  const block = blockIn(seriesNow.get(entry.file), name);
  if (!block) {
    // A companion the base branch HELD and the data layer no longer does is a deletion, and its
    // entry is history like any other. A block present in NEITHER has never existed, so no pass
    // reaches it: the loop above walks live blocks, this one skips it, and previous_vintage below
    // is satisfied by the null it would carry anyway. Left out, a quote for nothing sits in the
    // audit trail read by nothing, which is the shape of the gap this whole pass exists to close.
    if (proposed && !blockIn(seriesBefore.get(entry.file), name)) {
      errors.push(`${where}: names ${entry.file} ${name}, which the data layer does not hold and ${base} does not hold either, so this entry is evidence for no block at all. A companion deleted since ${base} keeps its entry as history; this one describes nothing.`);
    }
    continue;
  }
  if (vintageOf(block) !== entry.vintage) continue;        // the block moved on: history, not a defect
  if (seriesAudited.has(entry)) continue;                  // already checked above, and twice is two errors
  seriesAuditedCount += 1;
  checkSeriesShape(`${entry.file} ${name}`, block, entry, where);
}

// --- and previous_vintage on every series claim this branch ADDS ---------------------------
// The sibling of the previous_value pass above, and the same defect: the only loop that reads
// previous_vintage runs for a block that moved, so a backfill entry for a block sitting still can
// say anything there and be asked by nothing. Twenty-eight record entries said `null`, meaning
// new, for figures that were years old, and four blocks in this data layer currently carry no
// entry at all, so the next backfill is where this would have happened again.
//
// Already merged is history and is skipped, for the reason the pass above gives: failing it now
// would push someone into editing the audit trail to get a green run.
let newSeriesClaims = 0;
for (const { entry, where } of seriesEntries) {
  if (seriesAudited.has(entry)) continue;                      // the moved loop already asked
  if (baseSeriesClaims.has(seriesClaimKey(entry))) continue;   // already merged: history
  if (!seriesNow.has(entry.file) || !KNOWN_BLOCKS.has(entry.block ?? 'primary')) continue; // already reported above
  newSeriesClaims += 1;
  checkPreviousVintage(`${entry.file} ${entry.block ?? 'primary'}`, blockIn(seriesBefore.get(entry.file), entry.block ?? 'primary'), entry, where);
}

// --- report ----------------------------------------------------------------------------
if (errors.length) {
  // Deliberately NOT "failed against <base>". Two different comparisons produce these: what a
  // pull request moves, judged against the base branch, and whether an entry on file is still
  // adequate for the record it names, which the base branch has nothing to do with. Attributing
  // both to the base is this project's signature defect, a message claiming a property the code
  // beside it does not have. The errors that DO concern the base name it in their own text.
  console.error(`Evidence check failed, ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  console.error('\nNothing here is fixable by editing the check. A figure with no quote is a figure');
  console.error('nobody has seen in a source, which is the one thing this site promises never to publish.');
  process.exit(1);
}

if (changed === 0) {
  console.log(`Evidence check passed against ${base}: no metric changed value, none is new, and none was regraded across the derived boundary, so there is nothing to evidence.`);
} else {
  const why = regraded ? `${changed} metric(s) changed, new, or regraded across the derived boundary (${regraded} of them regraded at an unchanged value)` : `${changed} metric(s) changed or new`;
  console.log(`Evidence check passed against ${base}: ${why}, each declared in data/evidence/${derived ? `; ${changed - derived} carry a quote containing the value and ${derived} derived figure(s) carry a quote per component instead` : ' with a quote containing its value'}.`);
}
console.log('Not established: that the quote is on the page it names, that anyone fetched it, or that');
console.log('the URL belongs to a catalogued publisher, which validate-data.mjs requires of a record');
console.log('and nothing requires of a quote. This matches digits against text a person pasted, so it');
console.log('catches an invented figure and not a misread one, and says nothing about a figure whose');
console.log('value did not change, unless its grade crossed the derived boundary.');

if (auditedCount) {
  console.log(`\n${auditedCount} evidence entr${auditedCount === 1 ? 'y' : 'ies'} on file still name a record that holds exactly that value, and`);
  console.log('each was re-read here: a quote carrying the value, or a derivation and a quote per');
  console.log('component, a source URL and a real fetch date. That is a claim about the ENTRY, not a');
  console.log('fresh claim about the figure: it does not re-fetch anything.');
  console.log('Not established HERE: anything about an entry whose figure has since been renamed,');
  console.log('dropped or revised. Those are history by design and are skipped rather than failed,');
  console.log('because a check that failed on them would push someone into deleting the audit trail to');
  console.log('get a green run. Its previous_value is still asked if THIS branch is what added it, by');
  console.log('the pass below, which reads a claim rather than a figure and so does not need one.');
  console.log('Series entries are re-read by their own pass further down, not by this one.');
} else {
  console.log('\nNo evidence entry on file still names a record holding exactly its value, so none was');
  console.log('re-read. That is unexpected while data/evidence/ has entries, and worth looking at.');
}
if (newClaims) {
  console.log(`\n${newClaims} evidence claim(s) are new on this branch, counting an edited previous_value or`);
  console.log(`value as new, and each declares what its record held on ${base}: a figure absent there says`);
  console.log('null, and one already there takes the value it holds, which a backfill for a figure that');
  console.log('has not moved must do.');
  console.log('Not established: that a claim already merged is right. Those are read once, on the branch');
  console.log('that adds them, and are history afterwards.');
} else {
  console.log(`\nNo evidence claim is new on this branch, so previous_value was asked of none: every entry`);
  console.log(`on file states the same ref, previous_value and value it states on ${base}.`);
}
if (derived) {
  console.log(`Also not established: the arithmetic of ${derived} derived figure(s) in this diff. Each input is quoted; the sum or share is not recomputed.`);
}
if (seriesMoved) {
  console.log(`\n${seriesMoved} series block(s) moved, each declared with its vintage, its point count and`);
  console.log('both ends quoted, and a correction note where the array moved without a new release.');
  console.log('Not established: the points between those ends. A series is evidenced as one array from');
  console.log('one release, which is how it is published and how it is replaced, so a wrong value in the');
  console.log('middle of a correctly sourced array passes this.');
}
if (seriesAuditedCount) {
  console.log(`\n${seriesAuditedCount} series evidence entr${seriesAuditedCount === 1 ? 'y names a block' : 'ies name blocks'} still holding exactly the vintage`);
  console.log('declared, and each was re-read here: the point count against the array, both ends carried by');
  console.log('the quote, a source URL and a real fetch date. As above, that is a claim about the ENTRY and');
  console.log('re-fetches nothing.');
  console.log('Not established HERE: the points between those two ends, which no pass reads; or anything');
  console.log('about an entry whose block has since moved to another release, which is history by design.');
} else {
  console.log('\nNo series evidence entry on file names a block still holding its declared vintage, so none');
  console.log('was re-read. With entries in data/evidence/, that is unexpected and worth looking at.');
}
if (newSeriesClaims) {
  console.log(`\n${newSeriesClaims} series claim(s) are new on this branch and each declares what its block's`);
  console.log(`published_date was on ${base}. A block absent there says null; one already there takes the`);
  console.log('vintage it holds, which a backfill for a block that has not moved must do.');
} else {
  console.log(`\nNo series claim is new on this branch, so previous_vintage was asked of none beyond any block`);
  console.log(`that moved: every series entry states the same block, vintage and count it states on ${base}.`);
}
// Printed whether or not a series moved. A pull request that only DELETES a companion moves
// nothing, so it produces no series output at all, and the run where this limit matters most
// would otherwise be the one that never mentions it.
console.log('\nNot established about series: that a block still exists. Only blocks present now are');
console.log('compared, so deleting a companion series is not a moved series and nothing here asks.');
// Last, and set apart, because it is the one line that can make everything above vacuous.
if (sameCommit) {
  console.log(`\nOnly uncommitted changes were compared: ${base} and HEAD are the same commit. On a push`);
  console.log('to main that means this run establishes nothing about how any figure got there, because');
  console.log('the change is already in the base. The gate is the pull request.');
}
