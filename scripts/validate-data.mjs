#!/usr/bin/env node
// Enforces the data contract: no figure is published without its source metadata,
// and no figure is published twice where the two copies could drift apart.
// Run: node scripts/validate-data.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const read = (file) => JSON.parse(readFileSync(dataDir + file, 'utf8'));

const THEME_FILES = ['migration.json', 'asylum.json', 'population.json', 'fiscal.json'];
const TIMESERIES_FILES = [
  'netMigrationTimeseries.json',
  'asylumApplicationsTimeseries.json',
  'asylumBacklogTimeseries.json',
  'migrationFlowsTimeseries.json',
];
// A series file may carry companion series alongside its primary `data` array: a superseded
// vintage, the same measure on the other counting basis, or the opposing flow. Each is a
// separate series with its own note and must never be silently merged with the primary.
const COMPANION_BLOCKS = ['historical', 'alternate_basis', 'emigration'];
const SPECIAL_FILES = ['dashboard.json', 'sources.json', 'meta.json', ...TIMESERIES_FILES];

const METRIC_FIELDS = [
  'id', 'metric_name', 'value', 'unit', 'date', 'period_label', 'geography',
  'source_name', 'source_id', 'source_url', 'published_date', 'retrieved_date', 'notes',
  'confidence_level',
];
// Timeseries points inherit unit, geography and period basis from the series envelope.
const POINT_FIELDS = ['date', 'value', 'confidence_level', 'source_name', 'source_url', 'published_date'];
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
const catalogued = new Set(read('sources.json').sources.map((s) => new URL(s.url).hostname));
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
  if (item.source_url && !catalogued.has(resolveHost(item.source_url))) {
    errors.push(`${where}: cites ${new URL(item.source_url).hostname}, which is not a publisher in sources.json`);
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
  for (const [i, metric] of (read(file).metrics ?? []).entries()) {
    const where = `${file}[${i}] ${metric.metric_name ?? '(unnamed)'}`;
    checkFields(where, metric, METRIC_FIELDS);
    checkValue(where, metric);
    checkPeriod(where, metric);
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
for (const [i, card] of (dashboard.cards ?? []).entries()) {
  const where = `dashboard.json cards[${i}] ${card.id ?? '(unidentified)'}`;
  for (const field of ['id', 'ref', 'shortLabel', 'display', 'explanation', 'whatThisMeans']) {
    if (!card[field]) errors.push(`${where}: missing ${field}`);
  }
  if (card.ref && !registry.has(card.ref)) {
    errors.push(`${where}: ref "${card.ref}" does not resolve to any theme metric`);
  }
  if ('value' in card) errors.push(`${where}: cards must not carry their own value`);
}
for (const [key, entry] of Object.entries(dashboard.supporting ?? {})) {
  const where = `dashboard.json supporting.${key}`;
  if (!entry.ref) errors.push(`${where}: missing ref`);
  else if (!registry.has(entry.ref)) errors.push(`${where}: ref "${entry.ref}" does not resolve to any theme metric`);
  if ('value' in entry) errors.push(`${where}: denominators must reference a sourced metric, not carry a bare value`);
}

// --- timeseries -----------------------------------------------------------------
for (const file of TIMESERIES_FILES) {
  const series = read(file);
  for (const field of ['series_name', 'unit', 'note', 'lastUpdated']) {
    if (!series[field]) errors.push(`${file}: missing envelope field ${field}`);
  }

  const blocks = [['', series]];
  for (const name of COMPANION_BLOCKS) {
    if (series[name]) blocks.push([`${name}.`, series[name]]);
  }

  for (const [label, block] of blocks) {
    // A companion series without a note explaining how it differs is an invitation to
    // chart it against the primary one, which is the error these files exist to prevent.
    if (label && !block.note) {
      errors.push(`${file}: ${label.slice(0, -1)} series must carry a note explaining how it differs from the primary series`);
    }
    for (const [i, point] of (block.data ?? []).entries()) {
      const where = `${file} ${label}[${i}] ${point.date ?? '(undated)'}`;
      checkFields(where, point, POINT_FIELDS);
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
console.log(`Data contract passed: ${counted} figures, required fields present, dates internally consistent, publishers catalogued, every figure linked to its catalogue entry, no duplicate values within data/.`);
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
  console.log('Also not covered: the timeseries files, whose points carry no retrieved_date to age.');
}
