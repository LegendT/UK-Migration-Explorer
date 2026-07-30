#!/usr/bin/env node
// The release notifier. Nothing else detects that a source has published a newer edition than
// the one the site cites: the staleness check in validate-data.mjs ages a figure against its
// source's *cadence*, which is a guess, and silent staleness is the top risk in the register.
//
// It compares editions, not dates. A release is identified by the month and year in its URL,
// and the records already store that, so this is set membership rather than a race between two
// clocks. The date comparison this replaces would have alerted the first time it ran and been
// wrong: on 28 July the newest Home Office document read 2026-07-16 against a newest
// published_date of 2026-05-21, because a page was edited, not because anything was published.
//
// It compares every cited edition, not the source's newest. A per-source answer reads as
// "current" while one figure sits a release behind, which is exactly what happened to
// population/eu-settlement-scheme-settled-status-grants, found by hand on 28 July.
//
// Reasoning in docs/UPDATE-AUTOMATION.md, phase 1. Reports, never gates.
//
// Run: node scripts/check-releases.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { SERIES_FILES } from '../lib/series.mjs';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const read = (file) => JSON.parse(readFileSync(dataDir + file, 'utf8'));
const THEME_FILES = ['migration.json', 'asylum.json', 'population.json', 'fiscal.json'];
const TIMEOUT_MS = 20000;

// One route per watched source. `editionPrefix` matters more than it looks: the Home Office
// collection holds 112 documents including the pre-2022 `immigration-statistics-...` series,
// and the tribunals collection holds the older singular `tribunal-statistics-...`. Both were
// renamed once already, so a run that matches nothing is reported as a failure rather than as
// "no newer release", which is what an unfiltered maximum would quietly become.
const WATCHED = {
  'ho-immigration-stats': {
    api: 'https://www.gov.uk/api/content/government/collections/immigration-statistics-quarterly-release',
    editionPrefix: '/government/statistics/immigration-system-statistics-year-ending-',
  },
  'hmcts-tribunals': {
    api: 'https://www.gov.uk/api/content/government/collections/tribunals-statistics',
    editionPrefix: '/government/statistics/tribunals-statistics-quarterly-',
  },
  // ONS has no usable API. The legacy /data endpoint was decommissioned in February, the beta
  // releases endpoint 404s, and the release calendar RSS ignores its query parameter and
  // returns the ten most recent releases across all of ONS, which publishes several a day. The
  // bulletin's own /latest works, and its watch target is derived from the records below,
  // because sources.json holds the topic landing page and not the bulletin.
  'ons-ltim': { latestFromRecords: true },
};

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'];

// Four URL shapes carry an edition, and all four end in a month and a year:
//   immigration-system-statistics-year-ending-march-2026     a release page
//   tribunals-statistics-quarterly-january-to-march-2026     a release page, two months
//   yearendingdecember2025                                   an ONS bulletin edition
//   asylum-summary-mar-2026-tables.ods                       a data table, abbreviated
// The LAST month in the string is the one that dates the edition, which is what makes the
// two-month tribunals form work. Confirmed against the tables themselves: the contents sheet
// of settlement-summary-mar-2026-tables.ods reads "year ending March 2026".
function editionKey(text) {
  const pattern = new RegExp(`(${MONTHS.map((m) => m.slice(0, 3)).join('|')})[a-z]*[^a-z0-9]?((?:19|20)\\d{2})`, 'g');
  let match;
  let last = null;
  while ((match = pattern.exec(String(text).toLowerCase()))) last = match;
  if (!last) return null;
  const month = MONTHS.findIndex((m) => m.startsWith(last[1])) + 1;
  return `${last[2]}-${String(month).padStart(2, '0')}`;
}

// Where the edition sits differs by URL shape, so the segment is extracted before it is
// parsed. Reading the whole path would let a hex media id supply a month and a year.
function citedEdition(url) {
  const { hostname, pathname } = new URL(url);
  const release = /^\/government\/statistics\/([^/]+)/.exec(pathname);
  if (release) return { slug: release[1], key: editionKey(release[1]) };
  const bulletin = /\/bulletins\/[^/]+\/([^/]+)$/.exec(pathname);
  if (bulletin) return { slug: bulletin[1], key: editionKey(bulletin[1]) };
  if (hostname === 'assets.publishing.service.gov.uk') {
    const file = pathname.split('/').pop();
    return { slug: file, key: editionKey(file) };
  }
  // An evergreen page: the data-tables set, or a rolling publication. It names no edition and
  // therefore cannot be behind one.
  return { slug: null, key: null };
}

async function get(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, { redirect: 'follow', signal: controller.signal });
    if (!response.ok) return { error: `HTTP ${response.status}` };
    return { body: await response.text() };
  } catch (error) {
    return { error: error.name === 'AbortError' ? 'timed out' : 'unreachable' };
  } finally {
    clearTimeout(timer);
  }
}

async function newestFromCollection({ api, editionPrefix }) {
  const { body, error } = await get(api);
  if (error) return { error: `${error} fetching ${api}` };
  let documents;
  try {
    documents = JSON.parse(body).links?.documents ?? [];
  } catch {
    return { error: `${api} did not return JSON` };
  }
  const editions = documents
    .filter((doc) => String(doc.base_path).startsWith(editionPrefix))
    .map((doc) => ({ slug: doc.base_path.split('/').pop(), key: editionKey(doc.base_path) }))
    .filter((edition) => edition.key);
  if (!editions.length) {
    return { error: `no document under ${editionPrefix}, the series may have been renamed. ${documents.length} document(s) in the collection.` };
  }
  return editions.sort((a, b) => b.key.localeCompare(a.key))[0];
}

// The canonical link, never a match over the page: /latest also links to the previous edition,
// so a page-wide match picks a wrong slug as readily as the right one.
async function newestFromLatest(url) {
  const { body, error } = await get(url);
  if (error) return { error: `${error} fetching ${url}` };
  const canonical = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(body)?.[1];
  if (!canonical) return { error: `no canonical link on ${url}` };
  const slug = canonical.split('/').filter(Boolean).pop();
  const key = editionKey(slug);
  if (!key) return { error: `canonical link on ${url} names no edition: ${canonical}` };
  return { slug, key };
}

// --- what the site cites ----------------------------------------------------------------
const cited = new Map();
for (const file of THEME_FILES) {
  const theme = file.replace('.json', '');
  for (const metric of read(file).metrics ?? []) {
    if (!cited.has(metric.source_id)) cited.set(metric.source_id, []);
    cited.get(metric.source_id).push({ ref: `${theme}/${metric.id}`, url: metric.source_url });
  }
}

// The series files are the other half of the data layer, and the first draft of this check
// ignored them exactly as phase 3's procedure does: 100 points, replaced wholesale on release,
// watched by nothing. Two of the four have no metric declaring a `series_ref` either, so a file
// left on a superseded edition would have been invisible to every check in this repository.
//
// The PRIMARY series only. A companion block is deliberately a different vintage:
// netMigration.historical is the discontinued series at its 2020 vintage, and reading it would
// report that file behind for ever.
const unattributed = [];
for (const file of Object.values(SERIES_FILES)) {
  const series = read(file);
  const urls = [...new Set((series.data ?? []).map((point) => point.source_url).filter(Boolean))];
  if (!series.source_id || !urls.length) {
    unattributed.push(`${file}: ${series.source_id ? 'its primary series carries no source_url' : 'no source_id on the envelope'}`);
    continue;
  }
  if (!cited.has(series.source_id)) cited.set(series.source_id, []);
  for (const url of urls) cited.get(series.source_id).push({ ref: `${file} (series)`, url });
}

const sources = new Map(read('sources.json').sources.map((s) => [s.id, s]));

// --- ask each route what the current edition is -------------------------------------------
const reports = [];
for (const [id, config] of Object.entries(WATCHED)) {
  const records = cited.get(id) ?? [];
  const editions = new Map();
  const undated = [];
  for (const record of records) {
    const { slug, key } = citedEdition(record.url);
    if (!key) {
      undated.push(record);
      continue;
    }
    if (!editions.has(key)) editions.set(key, { slug, refs: [] });
    editions.get(key).refs.push(record.ref);
  }

  let newest;
  if (config.latestFromRecords) {
    // Every distinct bulletin the records cite, each watched at its own /latest.
    const targets = [...new Set(records
      .map((r) => r.url)
      .filter((url) => /\/bulletins\/[^/]+\/[^/]+$/.test(url))
      .map((url) => url.replace(/[^/]+$/, 'latest')))];
    if (!targets.length) {
      newest = { error: 'no record cites an ONS bulletin edition, so there is nothing to watch' };
    } else if (targets.length > 1) {
      // Editions are compared against one newest, so two bulletins under the same source_id
      // would measure the older one against the newer one's edition and report it behind. One
      // bulletin is cited today. Stop rather than alert wrongly the day a second is added.
      newest = { error: `${targets.length} bulletins are cited under this source, and this compares every cited edition against a single newest. Group the comparison by bulletin before trusting it: ${targets.join(', ')}` };
    } else {
      const found = await Promise.all(targets.map(newestFromLatest));
      const failed = found.find((f) => f.error);
      newest = failed ?? found.sort((a, b) => b.key.localeCompare(a.key))[0];
    }
  } else {
    newest = await newestFromCollection(config);
  }

  reports.push({ id, newest, editions, undated, records: records.length });
}

// --- report --------------------------------------------------------------------------------
const behind = [];
const unchecked = [];

console.log(`Release check: ${reports.length} watched source(s), against the editions the site cites.\n`);

for (const report of reports) {
  const name = sources.get(report.id)?.name ?? report.id;
  if (report.newest.error) {
    unchecked.push(report);
    console.log(`${report.id}: COULD NOT CHECK. ${report.newest.error}`);
    console.log(`  ${report.records} citation(s) point at ${name}, and none of them was compared with anything.\n`);
    continue;
  }
  // Nothing cited an edition, so nothing was compared. Printing "current" here would be the
  // shape of every check in this project that passed while a defect shipped.
  if (!report.editions.size) {
    unchecked.push(report);
    console.log(`${report.id}: COULD NOT CHECK. Its newest edition is ${report.newest.slug}, but nothing citing it names an edition, so nothing was compared.`);
    console.log(`  ${report.records} citation(s) point at ${name}.\n`);
    continue;
  }
  const stale = [...report.editions.entries()].filter(([key]) => key < report.newest.key);
  if (stale.length) behind.push({ report, stale });
  console.log(`${report.id}: ${stale.length ? 'BEHIND' : 'current'}`);
  console.log(`  newest published edition: ${report.newest.slug} (${report.newest.key})`);
  for (const [key, { slug, refs }] of [...report.editions.entries()].sort()) {
    const mark = key < report.newest.key ? 'BEHIND' : 'current';
    console.log(`  cites ${slug} (${key}), ${mark}, in ${refs.length} citation(s)`);
    if (key < report.newest.key) for (const ref of refs) console.log(`    ${ref}`);
  }
  if (report.undated.length) {
    console.log(`  ${report.undated.length} citation(s) name a URL with no edition in it, so they cannot be compared:`);
    for (const record of report.undated) console.log(`    ${record.ref}`);
  }
  console.log('');
}

// A series that could not be attributed to a publisher is reported, never dropped. The data
// contract requires both fields, so this should stay empty; a silent `continue` here is the
// shape of the bug that left the series unwatched in the first place.
if (unattributed.length) {
  console.log(`${unattributed.length} series file(s) could not be attributed to a source and were not compared:`);
  for (const line of unattributed) console.log(`  ${line}`);
  console.log('');
}

// Named rather than skipped, on the same principle the staleness check follows. A source with
// no route here is not a source that is up to date; it is one nobody is watching.
const unwatched = [...cited.keys()].filter((id) => !WATCHED[id]).sort();
if (unwatched.length) {
  const total = unwatched.reduce((n, id) => n + cited.get(id).length, 0);
  console.log(`Not watched: ${total} citation(s) from ${unwatched.length} source(s). No route here checks these.`);
  for (const id of unwatched) {
    console.log(`  ${id} (${cited.get(id).length}): ${sources.get(id)?.updateFrequency ?? 'no cadence recorded'}`);
  }
  console.log('A cadence in that column and no route is a gap worth closing; "ongoing" is not.\n');
}

// Said on every run, including a quiet one. A notifier that speaks only when it fires cannot
// be told apart from one that has stopped working.
console.log('Not established: that a release which kept its edition slug has changed anything, or');
console.log('that a figure inside a cited edition has been revised. Corrections between editions');
console.log('land on the data-tables page, whose change history names the exact table, and this');
console.log('reads neither. It compares which edition is cited, and nothing else.');

if (!behind.length && !unchecked.length) {
  console.log('\nEvery watched source is on the edition the site cites.');
  process.exit(0);
}

// A deterministic title, so the weekly cron reuses one issue while the condition lasts and
// opens a new one when the state changes. Fifty-two identical issues is how a notifier gets
// muted.
const signature = [
  ...behind.map(({ report }) => `${report.id} ${report.newest.key}`),
  // Not "unreachable": a collection that answers 200 while matching no document is the
  // rename case, and it is the failure this title most needs to be honest about.
  ...unchecked.map((report) => `${report.id} could not be checked`),
].sort().join(', ');
console.log(`\nISSUE-TITLE: Release check: ${signature}`);
process.exit(1);
