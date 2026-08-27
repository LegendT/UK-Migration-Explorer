#!/usr/bin/env node
// Enforces the data contract: no figure is published without its source metadata,
// and no figure is published twice where the two copies could drift apart.
// Run: node scripts/validate-data.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { COMPANION_BLOCKS, SERIES_FILES, THEME_FILES, seriesPoints } from '../lib/series.mjs';
import { sameTable, tablesIn } from '../lib/tables.mjs';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const read = (file) => JSON.parse(readFileSync(dataDir + file, 'utf8'));

const TIMESERIES_FILES = Object.values(SERIES_FILES);
const SPECIAL_FILES = ['dashboard.json', 'sources.json', 'meta.json', ...TIMESERIES_FILES];

const METRIC_FIELDS = [
  'id', 'metric_name', 'value', 'unit', 'date', 'period_label', 'geography',
  'source_name', 'source_id', 'source_url', 'published_date', 'retrieved_date', 'notes',
  'confidence_level',
];
// Timeseries points inherit unit, geography and period basis from the series envelope.
// `retrieved_date` is here because it is the field that DATES every chart drawing the series, and
// it was the one this list omitted. `lib/citation.mjs` reads it, and throws at build time rather
// than render "Checked Invalid Date" where a point reaching a citation block has none: that catches
// absence, only on the points a citation block renders, and never staleness. So a series array
// replaced whole whose points kept the old date built green and told a reader the series was
// checked on a day nobody checked it. Added 19 August 2026, The order's item 34, after item 30's
// verify pass found it by ageing the records under a series and watching the footer hedge. Every
// point carried the field already, so this is a missing guard rather than a live defect: 100 of
// 100 on the day it landed, which is the count `npm run validate` prints for itself.
const POINT_FIELDS = ['date', 'value', 'confidence_level', 'source_name', 'source_url', 'published_date', 'retrieved_date'];
const SOURCE_FIELDS = ['id', 'name', 'publisher', 'url', 'covers', 'updateFrequency', 'confidence_level'];

// published_date is contractual but not yet recorded for every figure. Null is an
// accepted placeholder and is counted below, so the debt stays visible on every run
// instead of being silently green.
const NULLABLE = new Set(['published_date']);

const confidenceLevels = Object.keys(read('meta.json').confidenceLevels);
const errors = [];
const warnings = [];

// Publishers serve from more than one host. Map the extras onto their catalogue entry
// rather than matching loosely on domain suffix, which would let any .gov.uk or .ac.uk
// address through.
const HOST_ALIASES = {
  'researchbriefings.files.parliament.uk': 'commonslibrary.parliament.uk',
  'assets.publishing.service.gov.uk': 'www.gov.uk',
  'www.legislation.gov.uk': 'www.gov.uk',
};

const sourceById = new Map(read('sources.json').sources.map((s) => [s.id, s]));
// Wrapped per entry, because one unparseable catalogue url used to throw here at module level,
// taking the whole report with it before a single queued error printed: the same
// take-the-report-with-it failure this script documents fixing for metric URLs below.
const catalogued = new Set();
for (const s of read('sources.json').sources) {
  try { catalogued.add(new URL(s.url).hostname); } catch {
    errors.push(`sources.json ${s.id}: url is not a parseable URL, ${s.url}`);
  }
}
const resolveHost = (url) => {
  const host = new URL(url).hostname;
  return HOST_ALIASES[host] ?? host;
};

function isRealDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
}

function checkFields(where, item, required) {
  for (const field of required) {
    const value = item[field];
    if (value === null && NULLABLE.has(field)) {
      // A documented impossibility is not debt. Some sources, a daily-updated operational
      // page, say, have no recoverable publication date for a past snapshot, and nagging
      // about it forever would train everyone to ignore the count.
      if (!item[`${field}_unavailable`]) warnings.push(`${where}: ${field} not yet recorded`);
      continue;
    }
    // Ranges deliberately hold a null value; checkValue enforces their bounds instead.
    if (field === 'value' && item.value_type === 'range') continue;
    if (value === undefined || value === null || value === '') {
      errors.push(`${where}: missing ${field}`);
    }
  }
  for (const field of ['date', 'published_date', 'retrieved_date']) {
    if (item[field] && !isRealDate(item[field])) {
      errors.push(`${where}: ${field} "${item[field]}" is not a real YYYY-MM-DD date`);
    }
  }
  if (item.source_url && !item.source_url.startsWith('https://')) {
    errors.push(`${where}: source_url is not https, ${item.source_url}`);
  }
  if (item.source_url) {
    // Wrapped, because new URL() throws on a plausible typo such as a missing scheme, and this runs
    // after the errors above are queued and before any of them print. An unparseable URL used to
    // take the whole report with it, including the "source_url is not https" error queued two lines
    // up which would have named the same defect.
    let hostname;
    try { hostname = resolveHost(item.source_url); } catch {
      errors.push(`${where}: source_url is not a parseable URL, ${item.source_url}`);
    }
    if (hostname !== undefined && !catalogued.has(hostname)) {
      errors.push(`${where}: cites ${hostname}, which is not a publisher in sources.json`);
    }
  }
  if (item.confidence_level && !confidenceLevels.includes(item.confidence_level)) {
    errors.push(`${where}: unknown confidence_level "${item.confidence_level}"`);
  }
  // The link between a figure and its catalogue entry. A hostname match cannot supply it:
  // www.gov.uk serves the Home Office, the MAC and the tribunals statistics, and several
  // figures cite an assets.publishing.service.gov.uk hash that names no publisher at all.
  if (item.source_id && !sourceById.has(item.source_id)) {
    errors.push(`${where}: source_id "${item.source_id}" is not an id in sources.json`);
  }
  checkSourceTie(where, item.source_id, item.source_url);
}

// The two halves of a citation must name the same publisher. Each was checked alone: the
// URL's host had to belong to SOME catalogue entry and the id to be SOME catalogue id, so a
// record pairing one publisher's id with another publisher's URL passed both, and
// check-releases.mjs would then compare that URL's edition against the wrong publisher's
// newest. Host equality is the strongest tie available: several gov.uk publishers share a
// host, which is what source_id exists to distinguish, so a same-host mismatch stays
// invisible here by construction and this check does not claim otherwise.
function checkSourceTie(where, sourceId, sourceUrl) {
  if (!sourceId || !sourceById.has(sourceId) || !sourceUrl) return;
  let urlHost;
  let catalogueHost;
  // Unparseable URLs are reported by the checks above; this one only compares.
  try {
    urlHost = resolveHost(sourceUrl);
    catalogueHost = resolveHost(sourceById.get(sourceId).url);
  } catch { return; }
  if (urlHost !== catalogueHost) {
    errors.push(`${where}: source_url is on ${urlHost} but source_id "${sourceId}" catalogues a publisher on ${catalogueHost}. One of the two names the wrong publisher, and the release watch would file this figure under the wrong one.`);
  }
}

// The corrections watch in check-releases.mjs matches a publisher's change history against the
// tables this site names, and it reads `table_reference`. Those identifiers lived only in prose
// until now, so this is what stops the declaration and the prose drifting apart: a record that
// names a table in its own text and declares nothing is invisible to that watch, silently.
//
// The pattern is in lib/tables.mjs, because the watch matches the publisher's change history
// against these declarations with the same one.
function checkTableReference(where, declared, ...prose) {
  if (declared !== undefined && !Array.isArray(declared)) {
    errors.push(`${where}: table_reference must be an array of table identifiers`);
    return;
  }
  const named = tablesIn(...prose);
  for (const table of named) {
    if (!(declared ?? []).some((entry) => sameTable(entry, table))) {
      errors.push(`${where}: names table ${table} in its own text but does not declare it in table_reference, so the corrections watch cannot see a correction to it`);
    }
  }
  // And the other direction, which is what makes the first one able to catch a typo. A
  // declaration nothing names in prose is a string nobody can check: `Vis_1` would match no
  // change-history entry and no error, silently. Today every declaration is also written in the
  // record's `source_name`, and that held by habit rather than by rule until this loop.
  for (const entry of declared ?? []) {
    if (!named.some((table) => sameTable(entry, table))) {
      errors.push(`${where}: declares table ${entry} but never names it in source_name or notes, so nothing can tell a real table from a typo. Write it into source_name, which is what a reader sees.`);
    }
  }
}

function checkValue(where, metric) {
  // A sign-spanning range must never be flattened to a point a card could render.
  if (metric.value_type === 'range') {
    if (typeof metric.range_min !== 'number' || typeof metric.range_max !== 'number') {
      errors.push(`${where}: value_type "range" requires numeric range_min and range_max`);
    }
    if (metric.value !== null) {
      errors.push(`${where}: value_type "range" must set value to null so no card renders a point estimate`);
    }
    return;
  }
  if (typeof metric.value !== 'number') {
    errors.push(`${where}: value must be a number, got ${typeof metric.value}`);
  }
}

// The period a figure covers must be consistent with the date it is filed under.
// Financial and academic years are labelled by their opening year, so allow date-1.
function checkPeriod(where, metric) {
  const year = Number(metric.date?.slice(0, 4));
  if (!year || !metric.period_label) return;
  if (!metric.period_label.includes(String(year)) && !metric.period_label.includes(String(year - 1))) {
    errors.push(`${where}: date ${metric.date} does not fall in period "${metric.period_label}"`);
  }
  checkLabelDays(where, metric);
}

// The rule above asks only that the YEAR appears, which is why "as at 31 June 2026" passed it
// on five published records on 27 August 2026: the substitution that rewrote the month ran
// before the one that would have rewritten the day, and nothing looked at the day at all.
// A month name and a day are both in the label, so both are checkable.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_IN_LABEL = /\b(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})\b/g;

function checkLabelDays(where, metric) {
  const label = metric.period_label;
  for (const [, d, month, y] of label.matchAll(DAY_IN_LABEL)) {
    const day = Number(d);
    const monthIndex = MONTHS.indexOf(month);
    // Date rolls an impossible day into the next month, so a round trip catches it.
    const probe = new Date(Date.UTC(Number(y), monthIndex, day));
    if (probe.getUTCMonth() !== monthIndex || probe.getUTCDate() !== day) {
      errors.push(`${where}: period "${label}" names ${d} ${month} ${y}, which is not a real date`);
    }
  }
  // A point-in-time label states the same day the record is filed under, or one of them is wrong.
  if (/^as at /.test(label)) {
    const m = label.match(/^as at (\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})/);
    if (m) {
      const iso = `${m[3]}-${String(MONTHS.indexOf(m[2]) + 1).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`;
      if (iso !== metric.date) {
        errors.push(`${where}: period "${label}" is a point in time but date is ${metric.date}`);
      }
    }
  }
}

// --- no data file goes unvalidated ---------------------------------------------
const present = readdirSync(dataDir).filter((f) => f.endsWith('.json'));
for (const file of present) {
  if (!THEME_FILES.includes(file) && !SPECIAL_FILES.includes(file)) {
    errors.push(`${file}: unrecognised data file, add it to THEME_FILES or SPECIAL_FILES so it is validated`);
  }
}
for (const file of [...THEME_FILES, ...SPECIAL_FILES]) {
  if (!present.includes(file)) errors.push(`${file}: expected data file is missing`);
}

// --- theme metrics --------------------------------------------------------------
const registry = new Map();
let counted = 0;

for (const file of THEME_FILES) {
  const theme = file.replace('.json', '');
  // A file's own lastUpdated must keep up with the records inside it. The audit fixed one
  // that had fallen behind (F0-4) and the fix had no check half, so the same file was five
  // days behind its newest record within the week.
  //
  // What this establishes is narrow and the comment used to claim more: the date may not predate
  // the newest `retrieved_date`, which is NOT the same as keeping up with every change to the
  // file. A regrade moves no `retrieved_date`, so a file can be edited and stay green here. That
  // is deliberate rather than fixed, because "when did a record last change" is a question about
  // git and not about the data.
  //
  // The other two legs ARE closed, and both were open until 2 August 2026, in the same shape this
  // project documents for the series equivalent one screen below. ABSENT: the check was written
  // `envelope.lastUpdated && ...`, and nothing required the field on a theme file, so deleting it
  // silenced the check for ever with no error anywhere. WRONG SHAPE: the comparison is
  // lexicographic and the value never passed `isRealDate`, so `"2026-8-1"` sorts above every ISO
  // date in 2026 and permanently satisfies it. Found by a second model reading the same check the
  // handoff already records being caught this way on the series side.
  const envelope = read(file);
  if (!envelope.lastUpdated) {
    errors.push(`${file}: missing lastUpdated. Without it the staleness comparison below has nothing to compare and passes silently.`);
  } else if (!isRealDate(envelope.lastUpdated)) {
    errors.push(`${file}: lastUpdated "${envelope.lastUpdated}" is not a real YYYY-MM-DD date, and the comparison below is lexicographic, so a malformed one sorts above every real date and can never fail.`);
  }
  const newest = (envelope.metrics ?? []).map((m) => m.retrieved_date).filter(Boolean).sort().at(-1);
  if (envelope.lastUpdated && newest && envelope.lastUpdated < newest) {
    errors.push(`${file}: lastUpdated ${envelope.lastUpdated} predates its newest record's retrieved_date ${newest}. Bump it when a record in the file moves.`);
  }
  for (const [i, metric] of (read(file).metrics ?? []).entries()) {
    const where = `${file}[${i}] ${metric.metric_name ?? '(unnamed)'}`;
    checkFields(where, metric, METRIC_FIELDS);
    checkValue(where, metric);
    checkPeriod(where, metric);
    checkTableReference(where, metric.table_reference, metric.source_name, metric.notes);
    const ref = `${theme}/${metric.id}`;
    if (registry.has(ref)) errors.push(`${where}: duplicate id "${metric.id}" within ${file}`);
    registry.set(ref, metric);
    counted += 1;
  }
}

// --- dashboard holds references, never copies -----------------------------------
const dashboard = read('dashboard.json');
if (dashboard.metrics) {
  errors.push('dashboard.json: has a "metrics" array, cards must reference theme metrics by ref, not copy their values');
}
// Every field here is rendered. `display` and `explanation` were required and rendered by
// nothing, as were `lastUpdated`, `referencePeriod`, `caveat` and a `supporting` block of
// four denominators, one of which reached no reader by any route. Validated prose that no
// page shows is prose that goes stale unwatched, in the file whose whole job is to hold
// references rather than content.
for (const [i, card] of (dashboard.cards ?? []).entries()) {
  const where = `dashboard.json cards[${i}] ${card.id ?? '(unidentified)'}`;
  for (const field of ['id', 'ref', 'shortLabel', 'whatThisMeans']) {
    if (!card[field]) errors.push(`${where}: missing ${field}`);
  }
  if (card.ref && !registry.has(card.ref)) {
    errors.push(`${where}: ref "${card.ref}" does not resolve to any theme metric`);
  }
  if ('value' in card) errors.push(`${where}: cards must not carry their own value`);
}

// --- timeseries -----------------------------------------------------------------
for (const file of TIMESERIES_FILES) {
  const series = read(file);
  // source_id joins a series to the catalogue the way every metric already is. Without it the
  // series were the half of the data layer no release check could attribute to a publisher:
  // check-releases.mjs queries by source_id, and 100 points sat outside every such query.
  for (const field of ['series_name', 'unit', 'note', 'lastUpdated', 'source_id']) {
    if (!series[field]) errors.push(`${file}: missing envelope field ${field}`);
  }
  // `lastUpdated` is the corrections watch's clearing key for a whole series, the way
  // `retrieved_date` is for a metric, and it was the only date in the data layer that reached a
  // comparison without going through this. A prose date sorts ASCII-greater than every ISO one,
  // so "22 July 2026" would have cleared every correction to that series' tables for ever, and
  // the envelope's own `vintage` field beside it is already written as prose.
  if (series.lastUpdated && !isRealDate(series.lastUpdated)) {
    errors.push(`${file}: lastUpdated "${series.lastUpdated}" is not a real YYYY-MM-DD date, and the corrections watch compares it against a date`);
  }
  if (series.source_id && !sourceById.has(series.source_id)) {
    errors.push(`${file}: source_id "${series.source_id}" is not an id in sources.json`);
  }

  const blocks = [['', series]];
  for (const name of COMPANION_BLOCKS) {
    if (series[name]) blocks.push([`${name}.`, series[name]]);
  }

  // One declaration per file, on the envelope beside source_id, because every block in a series
  // file is read off the same publisher table. Both asylum series cite Asy_00a throughout,
  // companion included.
  checkTableReference(file, series.table_reference, series.note,
    ...blocks.flatMap(([, block]) => [block.note, ...(block.data ?? []).map((p) => p.source_name)]));

  for (const [label, block] of blocks) {
    // A companion series without a note explaining how it differs is an invitation to
    // chart it against the primary one, which is the error these files exist to prevent.
    if (label && !block.note) {
      errors.push(`${file}: ${label.slice(0, -1)} series must carry a note explaining how it differs from the primary series`);
    }
    for (const [i, point] of (block.data ?? []).entries()) {
      const where = `${file} ${label}[${i}] ${point.date ?? '(undated)'}`;
      checkFields(where, point, POINT_FIELDS);
      // Points carry no source_id of their own; the envelope's is the publisher they must
      // all belong to, for the same reason as on a metric above.
      checkSourceTie(where, series.source_id, point.source_url);
      if (typeof point.value !== 'number') errors.push(`${where}: value must be a number`);
      counted += 1;
    }
    if (!label && !(block.data ?? []).length) errors.push(`${file}: primary series has no data`);

    // Single vintage per series is structural, not advisory: ONS states you cannot append
    // the latest estimates to a series from earlier releases, and the Home Office revises
    // historical asylum figures. Mixing vintages is what made the first net migration
    // series unpublishable.
    const vintages = new Set((block.data ?? []).map((p) => p.published_date));
    if (vintages.size > 1) {
      errors.push(`${file}: ${label || 'primary'} series mixes ${vintages.size} vintages (${[...vintages].join(', ')}), use the full series from a single release`);
    }
  }
}

// --- a figure held twice must be declared, and the two copies must agree ----------
// Four figures are published both as a headline metric and as a point in a series. The home
// page card reads the metric; the migration chart reads the series. A release that revised
// one and not the other would publish two different official values for the same measure on
// the same site, which is the failure foundation 9.4 describes and dashboard.json was
// restructured to prevent. It was fixed between the dashboard and the theme files and left
// standing between the series and the theme files, because nothing connected the two.
//
// The declaration goes on the metric, not the series, because one of the four pairs with the
// second-to-last point: net-migration-2 is the revised prior-year estimate the site publishes
// precisely to show that revisions happen. A rule keyed on "the latest point" would have left
// the one figure whose whole purpose is being a revision unguarded.
const points = seriesPoints();

// The guard compared `value` and nothing else until 2 August 2026, which made it a live instance
// of the pattern this project keeps finding: a check keyed on the one field that happens to agree
// is permanently satisfied. `migration/net-migration-2` and `netMigration@2024` held the same
// value and two different confidence levels, and the mechanism built to stop a figure held twice
// drifting could not see it. Every field the two sides both carry is compared now.
//
// The grades agree because the convention was settled first: the grade
// follows the source, so every ONS point is `provisional` as every ONS metric already was, and
// the publisher's per-vintage marker lives in `ons_marker` alone. Landing this check without that
// decision would have turned the branch red and invited whichever regrade made it green.
const SERIES_REF_FIELDS = [
  ['value', (m) => m.value, 'The same measure for the same period would publish two different values, the card from the metric and the chart from the series.'],
  ['unit', (m) => m.unit, 'The same measure would be published in two units, so a reader comparing the card with the chart is comparing different quantities.'],
  ['confidence_level', (m) => m.confidence_level, 'The same measure would carry two grades, and the card prints its grade to a reader while the point does not, so the weaker of the two would be the invisible one.'],
  // The identity field, and comparing three attributes without it was the same mistake one level
  // up: a ref names a point by year, and nothing asked whether that year is the metric's own. Two
  // pairs in the data make it exploitable rather than theoretical, `flows.emigration` holding
  // 494,000 at both 2014 and 2015 and the historical block holding 313,000 at 2014 and 2019, so a
  // ref off by a year passes value, unit and grade together. Found by a second model.
  ['year', (m) => m.date?.slice(0, 4), 'The ref names a different year from the one the metric covers, and where two years share a value the other three comparisons agree anyway.'],
];
for (const [ref, metric] of registry) {
  if (!metric.series_ref) continue;
  const point = points.get(metric.series_ref);
  if (!point) {
    errors.push(`${ref}: series_ref "${metric.series_ref}" names no point in any series`);
    continue;
  }
  for (const [field, of, why] of SERIES_REF_FIELDS) {
    const mine = of(metric);
    const theirs = point[field];
    // Absent on BOTH sides is the answer that leaves a check asking for nothing: `undefined ===
    // undefined` passes and the pair is declared to agree about a field neither carries. Every
    // field here is required on both sides by other rules in this same run, so nothing exploits
    // it today; it is stated because the next field added to this table may not be.
    if (mine === undefined || theirs === undefined) {
      errors.push(`${ref}: series_ref "${metric.series_ref}" cannot be compared on ${field}, which is missing from ${mine === undefined ? 'the metric' : ''}${mine === undefined && theirs === undefined ? ' and ' : ''}${theirs === undefined ? 'the point' : ''}. A comparison against a missing field passes without asking anything.`);
      continue;
    }
    if (theirs === mine) continue;
    errors.push(`${ref}: ${field} ${mine} does not match series point ${metric.series_ref}, which is ${theirs}. ${why}`);
  }
}

// --- a block's points carry one grade ------------------------------------------------
// The A6 convention says the confidence grade follows the SOURCE rather than the vintage, which
// makes "every point in a block shares a grade" the convention stated as an invariant rather than
// as prose. Without it the convention reached only the four points a `series_ref` names, and the
// other 38 were governed by a paragraph in the backlog: the next release could paste an array back
// with per-vintage grades and every check would pass. Found by a second model, which counted the
// enforcement rather than reading the intent.
//
// Blocks, not files, because the discontinued IPS series inside netMigrationTimeseries.json is a
// different source on a non-comparable methodology and is `estimated` throughout, which is the
// convention holding rather than breaking.
// `ons_marker` is checked in the same pass, because the convention that empties the grade of the
// vintage puts the whole weight of the vintage on that one field, and nothing asked anything of it:
// it is not in POINT_FIELDS, no vocabulary constrained it, and `"revsied"` passed every check on
// the site. A field promoted to the sole home of something has to be asked about, or the promotion
// moves the information somewhere less guarded than where it came from.
const ONS_MARKERS = ['provisional', 'revised'];
for (const [name, file] of Object.entries(SERIES_FILES)) {
  const raw = read(file);
  for (const [block, data] of [[name, raw], ...COMPANION_BLOCKS.filter((c) => raw[c]).map((c) => [`${name}.${c}`, raw[c]])]) {
    const grades = [...new Set((data.data ?? []).map((p) => p.confidence_level))];
    if (grades.length > 1) {
      errors.push(`${file}: block ${block} mixes confidence levels, ${grades.join(' and ')}. The grade follows the source, so a block carries one; the publisher's per-vintage marker belongs in ons_marker.`);
    }
    for (const point of data.data ?? []) {
      if (point.ons_marker !== undefined && !ONS_MARKERS.includes(point.ons_marker)) {
        errors.push(`${file}: block ${block}, ${point.date ?? '(undated)'} has ons_marker "${point.ons_marker}", which is not one of ${ONS_MARKERS.join(', ')}. It is the only home for the publisher's marker, so a typo there loses the marker silently.`);
      }
    }
  }
}

// An undeclared overlap is reported so the next duplicate announces itself rather than
// waiting for someone to run the analysis by hand. This is the query that found the four:
// same value, same year, same unit.
const undeclared = [];
for (const [ref, metric] of registry) {
  for (const [pointRef, point] of points) {
    if (pointRef === metric.series_ref) continue;
    if (point.value === metric.value && point.year === metric.date?.slice(0, 4) && point.unit === metric.unit) {
      undeclared.push(`${ref} (${metric.value} ${metric.unit}, ${point.year}) is also published as ${pointRef}`);
    }
  }
}

// --- one figure, one home: the third boundary -------------------------------------
// "One figure, one home" was enforced at two boundaries and not at the third. `dashboard.json`
// was emptied of values so a card references a metric, and `series_ref` stops a metric held twice
// drifting from its own point. Both are checked above. Nothing checked a record's `notes` for
// another record's value, and the pre-launch audit found 26 restatements across 14 records: when
// `asylum-refusals` next moves, several other notes go on saying the old figure with every check
// green. The project has already been bitten by this shape twice, in PR #58 and PR #67, and fixed
// it one figure at a time both times.
//
// Reported, never failed, on the precedent the sub-100 warnings and the unrecorded-literal report
// already set. Several matches are coincidence rather than restatement, and a check whose only
// remedy is an exemption list teaches authors to stuff it. What it buys is that an updater moving
// a value is TOLD which notes now need re-reading, by name, instead of being asked to remember.
//
// Same value forms and the same threshold as the longhand scan in validate-content.mjs, so the two
// agree about what counts as writing a figure out. Word-bounded, or 48,581 would be found inside
// 148,581 and the report would name a restatement that is not there.
//
// What it does NOT establish: that a named pair disagrees, since it matches on EQUAL values and so
// can only ever see agreement. That is the point. It also asks nothing of a note restating a series
// point, or of `range_min` and `range_max`, whose only bounds today are under the threshold anyway.
// Keyed on the VALUE and not on each written form of it, which is the difference between one
// report line per restatement and two. A value has up to two forms, "48,581" and "48581", and a
// note carrying both would have been two findings about one sentence.
const restated = [];
const owners = new Map();
for (const [ref, metric] of registry) {
  if (typeof metric.value !== 'number') continue;
  const forms = [...new Set([metric.value.toLocaleString('en-GB'), String(metric.value)])]
    .filter((form) => /\d,\d/.test(form) || Math.abs(metric.value) >= 100);
  if (!forms.length) continue;
  const entry = owners.get(metric.value) ?? { forms: new Set(), refs: [] };
  for (const form of forms) entry.forms.add(form);
  entry.refs.push(ref);
  owners.set(metric.value, entry);
}
for (const [ref, metric] of registry) {
  for (const { forms, refs } of owners.values()) {
    const others = refs.filter((owner) => owner !== ref);
    if (!others.length) continue;
    const written = [...forms].find((form) =>
      new RegExp(`(?<![\\d,.])${form.replace('.', '\\.')}(?![\\d,.])`).test(metric.notes ?? ''));
    if (!written) continue;
    // A record that holds the value ITSELF is describing its own figure, not restating someone
    // else's, and saying "which is the value of X" about that reads as an accusation it does not
    // deserve. It still belongs in the report, because when this record moves those other notes go
    // stale, but the line has to say which case it is.
    const own = refs.includes(ref) ? ', its own value, which is also held by' : ', which is the value of';
    restated.push(`${ref}: its notes write ${written}${own} ${others.join(' and ')}`);
  }
}

// --- source catalogue -----------------------------------------------------------
const sourceIds = new Set();
for (const [i, source] of read('sources.json').sources.entries()) {
  const where = `sources.json[${i}] ${source.id ?? '(unidentified)'}`;
  for (const field of SOURCE_FIELDS) {
    if (!source[field]) errors.push(`${where}: missing ${field}`);
  }
  if (source.url && !source.url.startsWith('https://')) errors.push(`${where}: url is not https`);
  if (sourceIds.has(source.id)) errors.push(`${where}: duplicate source id`);
  sourceIds.add(source.id);
}

// --- staleness against each source's publication cadence -------------------------
// Silent staleness is the top-rated risk in the register, and its mitigation claimed this
// check existed. It did not: `updateFrequency` was read as a required field and compared
// against nothing.
//
// This REPORTS, it does not fail. A source publishing a new edition does not make our figure
// wrong, it makes it worth re-checking, and a build that broke on a Tuesday because a
// quarterly release landed would be switched off inside a month.
//
// The head of updateFrequency is matched exactly rather than fuzzily, so a cadence nobody
// has taught this map lands in the uncheckable list below instead of being quietly assumed.
const CADENCE_DAYS = {
  quarterly: 92,
  'twice yearly': 183,
  annual: 366,
  'annual report plus commissioned reviews': 366,
  'every 10 years': 3653,
};
const cadenceOf = (frequency) => {
  const head = String(frequency).split(' (')[0].trim().toLowerCase();
  return CADENCE_DAYS[head] ? { name: head, days: CADENCE_DAYS[head] } : null;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const overdue = [];
const noFixedCadence = new Map();

for (const [ref, metric] of registry) {
  const source = sourceById.get(metric.source_id);
  if (!source || !metric.retrieved_date) continue;
  const cadence = cadenceOf(source.updateFrequency);
  if (!cadence) {
    noFixedCadence.set(source.id, (noFixedCadence.get(source.id) ?? 0) + 1);
    continue;
  }
  const age = Math.floor((Date.now() - new Date(`${metric.retrieved_date}T00:00:00Z`).getTime()) / DAY_MS);
  if (age > cadence.days) overdue.push({ ref, age, cadence: cadence.name, source: source.name });
}

// --- blocked files ---------------------------------------------------------------
// A file can satisfy every field rule and still be unfit to publish. Surface that
// loudly rather than letting "contract passed" read as "safe to chart".
const blocked = [];
for (const file of [...THEME_FILES, ...SPECIAL_FILES]) {
  const status = read(file).status;
  if (typeof status === 'string' && status.startsWith('BLOCKED')) blocked.push(file);
}

// --- report ---------------------------------------------------------------------
if (errors.length) {
  console.error(`Data contract failed, ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

// States only what the code establishes. It previously claimed "all sourced, dated, graded
// and singly held": "sourced" was a hostname match, "dated" tolerated missing dates, and
// "singly held" was true of the data layer but not of the site.
console.log(`Data contract passed: ${counted} figures, required fields present, dates internally consistent, publishers catalogued, every figure linked to its catalogue entry, no card holding its own copy of a value.`);
console.log('This checks metadata, not whether the figures are right.');
if (blocked.length) {
  console.error(`\nDO NOT PUBLISH, ${blocked.length} file(s) are flagged as unfit for publication:\n`);
  for (const file of blocked) console.error(`  ${file}: ${read(file).status_note?.split('.')[0] ?? 'see status_note'}.`);
  console.error('\nThis fails the build deliberately. A flag that only warned would deploy, and');
  console.error('the banner would scroll past in a log nobody reads.');
  process.exit(1);
}
if (warnings.length) {
  console.log(`\nOutstanding: ${warnings.length} figure(s) without a recorded published_date.`);
  console.log('Record it next time each source is checked. Run with --verbose to list them.');
  if (process.argv.includes('--verbose')) {
    for (const warning of warnings) console.log(`  ${warning}`);
  }
}

// Figures held twice. Reported on the same reasoning as staleness below.
const declaredTwice = [...registry.values()].filter((m) => m.series_ref).length;
console.log(`\nFigures held twice: ${declaredTwice} metric(s) declare a series_ref, and each agrees with the point it names on ${SERIES_REF_FIELDS.map(([f]) => f).join(', ')}.`);
console.log('Not established: that every duplicate is declared. The overlap scan matches on equal');
console.log('values, so a pair that drifted apart before anyone declared it is invisible to both.');
if (undeclared.length) {
  console.log(`\n${undeclared.length} undeclared overlap(s) to review:`);
  for (const item of undeclared) console.log(`  ${item}`);
  console.log('If it is the same measure, add series_ref to the metric so the two cannot drift apart.');
  console.log('If two different measures happen to share a value, leave it.');
}

// Printed every run, including empty, for the reason the staleness block below gives: a check that
// speaks only when it fires cannot be told from one that has stopped working.
console.log(`\nValues restated in another record's notes: ${restated.length}. Nothing keeps these in step, so when one of the named records moves, re-read the notes listed here.`);
for (const item of restated) console.log(`  ${item}`);
console.log('Not established: that any pair disagrees. This matches on EQUAL values, so it can only');
console.log('ever see agreement, and what it cannot see is the moment they stop agreeing. Some are');
console.log('coincidence rather than restatement, which is why it reports and never fails.');

// Publisher tables. Reported rather than left silent, because the corrections watch is only as
// complete as this declaration is, and nothing else would say how far that reaches.
const tabled = [...registry.values()].filter((m) => m.table_reference?.length).length;
const seriesTabled = TIMESERIES_FILES.filter((file) => read(file).table_reference?.length).length;
console.log(`\nPublisher tables: ${tabled} record(s) and ${seriesTabled} series file(s) declare one. Every table named in prose is declared, and every declaration is named in prose, which is what lets a typo be caught.`);
console.log('Not established: that a figure which names no table has none. This reads what is');
console.log('written, so a table nobody wrote down stays undeclared and unwatched, and an ONS');
console.log('sheet called "Table 1" carries no identifier that could be declared at all. Nor that');
console.log('the declared table is the one the value came from: the evidence entry names a table');
console.log('too, and nothing compares the two.');

// Staleness. Reported every run, including when it finds nothing, because a check that only
// speaks up when it fires cannot be told apart from one that has stopped working.
const checkable = registry.size - [...noFixedCadence.values()].reduce((n, c) => n + c, 0);
if (overdue.length) {
  console.log(`\n${overdue.length} figure(s) not re-checked within their source's publication cycle:`);
  for (const item of overdue.sort((a, b) => b.age - a.age)) {
    console.log(`  ${item.ref}: last checked ${item.age} days ago, ${item.source} publishes ${item.cadence}`);
  }
  console.log('A newer edition has probably been published. Re-check the figure against it.');
} else {
  console.log(`\nStaleness: ${checkable} figure(s) checked against their source's cycle, none overdue.`);
}
if (noFixedCadence.size) {
  const names = [...noFixedCadence.entries()].map(([id, n]) => `${id} (${n})`).join(', ');
  console.log(`Not covered: ${registry.size - checkable} figure(s) from sources with no fixed cadence, ${names}.`);
  console.log('Also not covered: the timeseries files. Their points carry a retrieved_date, but nothing here ages them against a cycle; the whole array is refreshed per release instead.');
}
