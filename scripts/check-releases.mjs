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
// Reports, never gates.
//
// Run: node scripts/check-releases.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { SERIES_FILES, THEME_FILES } from '../lib/series.mjs';
import { sameTable, tablesIn } from '../lib/tables.mjs';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const read = (file) => JSON.parse(readFileSync(dataDir + file, 'utf8'));
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

// Phase 1b, the corrections watch. A correction *inside* an edition leaves the slug alone, so
// everything above reports the edition as current and is right to: the site does cite the edition
// the publisher lists. The change history on the data-tables page is where those corrections
// surface, and its notes name the exact table, for example "Updated table 'Vis_01' ... to amend
// the 'Other work visas and exemptions' figure". The records name their tables too, in
// `table_reference`, so the two lists can be matched.
//
// One page, because one page is what carries this. A `table_reference` names which table, never
// which page publishes it, so every declared table is matched against this one and a table
// published elsewhere is matched here and found nowhere: `ASY_03` is Migration Transparency Data
// and has never appeared in this history. The run says so rather than implying coverage.
const CORRECTIONS = {
  'ho-immigration-stats': {
    api: 'https://www.gov.uk/api/content/government/statistical-data-sets/immigration-system-statistics-data-tables',
  },
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

// --- the one-month commitment -------------------------------------------------------------
// /sources-and-method/ promises an update "within one month" of each cadenced release. Nothing
// measured that until 13 August 2026: this file reported a source BEHIND and never for how long,
// so the number the published promise turns on was the one number nobody had. Added as part of
// the monthly check, which had a person doing this arithmetic by hand every month.

// A publisher's timestamp is UTC and the release date it prints is London. ONS files its
// bulletins at London midnight, so 2026-05-20T23:00:00.000Z IS "Release date: 21 May 2026".
// Slicing the ISO string reports every British Summer Time release a day early, which at a
// month boundary is the difference between kept and broken.
function londonDate(iso) {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
}

// One CALENDAR month, not thirty days, because that is the word the site publishes. Clamped at
// month end, so a 31 January release is due 28 February rather than rolling into March.
function oneMonthAfter(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  const lastDayOfNextMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(d, lastDayOfNextMonth))).toISOString().slice(0, 10);
}

const daysBetween = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / 86400000);

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
  // ONS serves a dataset file from /file with the whole path in a `uri` QUERY parameter, so
  // `pathname` is just "/file" and every branch above misses it. Reading the edition from the
  // path segment before the filename, never the filename: the shape is
  // .../datasets/<dataset>/<edition>/<file>, and the file is named for the PUBLICATION month
  // while the edition names the PERIOD. On the May 2026 spreadsheet those are 2026-05 and
  // 2025-12, so taking the filename would date the citation to the wrong thing and report a
  // current edition as behind at the next release.
  if (hostname === 'www.ons.gov.uk' && pathname === '/file') {
    const segments = (new URL(url).searchParams.get('uri') ?? '').split('/').filter(Boolean);
    const edition = segments.length > 1 ? segments[segments.length - 2] : null;
    if (edition) return { slug: edition, key: editionKey(edition) };
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

// WHAT THE COMMITMENT RUNS FROM, and the collection listing does not carry it. Its documents
// expose `public_updated_at` alone, which is when the page last CHANGED: the year-ending-March-2026
// immigration statistics were first published on 21 May 2026 and last updated on 16 July, the
// update being a note on an unrelated sub-page. Measuring from that hid 56 days of lateness, in
// the direction that flatters this site, and it is what this file did on 13 August 2026 until a
// critique caught it. `first_published_at` is on the edition's own content item, so this is one
// extra fetch, made only for a source that is actually behind.
async function firstPublished(slug) {
  const { body, error } = await get(`https://www.gov.uk/api/content/government/statistics/${slug}`);
  if (error) return null;
  try {
    return londonDate(JSON.parse(body).first_published_at);
  } catch {
    return null;
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
  // EVERY edition, not just the newest. The commitment runs from the OLDEST edition this site
  // has not taken, so a source two editions behind is late from the first one it missed, and
  // returning only the newest would have measured the deadline from the wrong release and
  // reported time still in hand on a promise already broken.
  const sorted = editions.sort((a, b) => b.key.localeCompare(a.key));
  return { ...sorted[0], editions: sorted };
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
  // ONS states the release date in JSON-LD as UTC midnight LONDON time, so this bulletin's
  // "Release date: 21 May 2026" arrives as 2026-05-20T23:00:00.000Z. Slicing the ISO string
  // would report every summer release a day early, and a day matters at a month boundary.
  //
  // One `datePublished` is on the page today and the match is not anchored to the bulletin's own
  // JSON-LD entity, so a second entity would make this read a date belonging to something else.
  // Counted rather than assumed, and refused loudly if that changes, which is cheaper than
  // parsing every block to guard a case that does not exist yet.
  const dates = [...body.matchAll(/"datePublished"\s*:\s*"([^"]+)"/g)];
  if (dates.length > 1) {
    return { error: `${url} carries ${dates.length} datePublished values, so which one is the bulletin's own release date is no longer obvious. Parse the JSON-LD blocks and take the bulletin's.` };
  }
  // Only the newest edition is knowable here: unlike the GOV.UK collection this page lists no
  // back catalogue, so a source two editions behind is measured from the newer of the two and
  // its lateness is understated. Said in the output rather than left implicit.
  return { slug, key, published: londonDate(dates[0]?.[1]), newestOnly: true };
}

// --- what the site cites ----------------------------------------------------------------
// `declared` is the corrections watch's half: which publisher table each figure was read from,
// and the day it was last read. That date is what makes the watch stateless and self-clearing.
// A correction only matters where the figure has not been re-read since, so it is compared per
// figure rather than per table, because three records cite Ret_01 and each is re-checked on its
// own day. When someone re-reads the figure and moves the date forward, the alert stops on its
// own, and there is no "last seen" file to go stale in the meantime.
//
// A missing date fires rather than passes. Absent means nobody knows when it was last read, and
// an unchanged date keeps firing while corrections land, which is the answer this project now
// demands of any key a check matches on: both cases have to leave it still asking for something.
const cited = new Map();
const declared = [];
for (const file of THEME_FILES) {
  const theme = file.replace('.json', '');
  for (const metric of read(file).metrics ?? []) {
    if (!cited.has(metric.source_id)) cited.set(metric.source_id, []);
    cited.get(metric.source_id).push({ ref: `${theme}/${metric.id}`, url: metric.source_url });
    if (metric.table_reference?.length) {
      declared.push({
        ref: `${theme}/${metric.id}`,
        sourceId: metric.source_id,
        tables: metric.table_reference,
        checked: metric.retrieved_date,
      });
    }
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
  // The series points carry no retrieved_date, which is why the staleness check cannot age them
  // either. The envelope's lastUpdated is the day the file was last refreshed, and a series is
  // replaced whole, so it is the right date for the whole array.
  if (series.table_reference?.length) {
    declared.push({
      ref: `${file} (series)`,
      sourceId: series.source_id,
      tables: series.table_reference,
      checked: series.lastUpdated,
    });
  }
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

  // The oldest edition newer than anything cited: the release whose one month ran out first.
  // Resolved here rather than at print time because it needs a fetch.
  // Keyed off the OLDEST citation that is out of date, not off the newest one. Most records move
  // together, so the newest cited edition is usually current even where one record is two behind,
  // and testing against that found nothing to be owed in every probe. What the site owes is the
  // first edition published after the oldest citation it left behind.
  let missed = null;
  if (!newest.error && editions.size) {
    const stale = [...editions.keys()].filter((key) => key < newest.key).sort();
    if (stale.length) {
      const owed = (newest.editions ?? [newest]).filter((edition) => edition.key > stale[0]);
      missed = { ...owed.sort((a, b) => a.key.localeCompare(b.key))[0] };
      missed.published = newest.newestOnly ? newest.published : await firstPublished(missed.slug);
      missed.only = Boolean(newest.newestOnly);
    }
  }

  reports.push({ id, newest, missed, editions, undated, records: records.length });
}

// --- ask each corrections route what it has amended ----------------------------------------
async function changeHistory(api) {
  const { body, error } = await get(api);
  if (error) return { error: `${error} fetching ${api}` };
  let history;
  try {
    history = JSON.parse(body).details?.change_history;
  } catch {
    return { error: `${api} did not return JSON` };
  }
  // An empty history is not "nothing has been corrected". This page has carried 16 entries since
  // 2023, so an empty one means the schema moved or the page did, and reporting it as clean would
  // be the shape of every check here that passed while a defect shipped.
  if (!Array.isArray(history) || !history.length) {
    return { error: `${api} returned no change history, so nothing was compared. The page or its content schema may have changed.` };
  }
  return { history };
}

const corrections = [];
for (const [id, config] of Object.entries(CORRECTIONS)) {
  const { history, error } = await changeHistory(config.api);
  if (error) {
    corrections.push({ id, error });
    continue;
  }
  // Most entries announce a quarterly release and name its tables by title, not by identifier.
  // Matching identifiers is what separates a correction from a release, and it is why sixteen
  // entries produce one hit rather than sixteen notifications nobody would read.
  const naming = history
    .map((entry) => ({
      date: String(entry.public_timestamp ?? '').slice(0, 10),
      note: String(entry.note ?? '').replace(/\s+/g, ' ').trim(),
      tables: tablesIn(entry.note),
    }))
    .filter((entry) => entry.tables.length);

  // Every declared table is matched, not only those whose record cites this publisher.
  // `small-boat-arrivals-year-ending-march-2026` reads IER_D03 and IER_02a through a Commons
  // Library briefing that quotes them, and a correction to those tables is a correction to what
  // the Home Office published however the site reached it. Restricting the match by source_id
  // would have skipped it.
  const matched = [];
  const outstanding = [];
  for (const entry of naming) {
    for (const table of entry.tables) {
      const citing = declared.filter((record) => record.tables.some((name) => sameTable(name, table)));
      if (!citing.length) continue;
      matched.push({ entry, table, citing });
      // An entry with no timestamp fires rather than passing. Empty compares as earlier than
      // every date, so leaving it to the comparison would silently clear every figure behind it.
      const stale = citing.filter((record) => !record.checked || !entry.date || record.checked < entry.date);
      if (stale.length) outstanding.push({ entry, table, stale });
    }
  }
  corrections.push({ id, history, naming, matched, outstanding });
}

// --- report --------------------------------------------------------------------------------
const behind = [];
const unchecked = [];

// One `today` for the whole run: two sources measured against different days would be a
// difference nobody could see in the output.
const today = londonDate(new Date().toISOString());

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
  // The commitment, measured rather than left to a person doing it by hand every month. Only a
  // BEHIND source can be late: where the site already cites the newest edition there is nothing
  // outstanding to be late for, whatever that edition's age, so being current is said first and
  // no date is discussed at all. Saying "unmeasured" about a current source implied something
  // might be outstanding when nothing is.
  if (!stale.length) {
    console.log('  the site cites the newest edition, so nothing is outstanding.');
  } else if (!report.missed?.published) {
    console.log(`  the release this site owes is ${report.missed?.slug ?? 'unresolved'}, and its publication date could not be established, so how late this is was not measured.`);
  } else {
    const { published, slug, only } = report.missed;
    const due = oneMonthAfter(published);
    const over = daysBetween(due, today);
    console.log(`  owes ${slug}, published ${published}, ${daysBetween(published, today)} day(s) ago. The commitment is one month, so it was due ${due}: `
      + (over > 0 ? `LATE BY ${over} DAY(S).` : `${-over} day(s) left.`)
      + (only ? ' This route lists no back catalogue, so an older missed edition would be later still.' : ''));
  }
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

// --- corrections inside an edition ----------------------------------------------------------
const corrected = [];
const correctionsUnchecked = [];
console.log(`Corrections inside an edition: ${corrections.length} watched page(s), against the tables the site declares.\n`);

const allTables = [...new Set(declared.flatMap((record) => record.tables))].sort();

for (const report of corrections) {
  if (report.error) {
    correctionsUnchecked.push(report.id);
    console.log(`${report.id}: COULD NOT CHECK. ${report.error}`);
    console.log(`  ${declared.length} figure(s) declare a table, and none of them was compared.\n`);
    continue;
  }
  // Nothing declared means nothing was compared, whatever the change history said.
  if (!declared.length) {
    correctionsUnchecked.push(report.id);
    console.log(`${report.id}: COULD NOT CHECK. Its change history holds ${report.history.length} entries, but no figure declares a table_reference, so nothing was compared.\n`);
    continue;
  }
  if (report.outstanding.length) corrected.push(report);
  console.log(`${report.id}: ${report.outstanding.length ? 'CORRECTED SINCE LAST READ' : 'current'}`);
  console.log(`  ${report.history.length} change history entries, ${report.naming.length} naming a table, ${report.matched.length} naming one of the ${allTables.length} this site declares: ${allTables.join(', ')}`);
  for (const { entry, table, citing } of report.matched) {
    const stale = report.outstanding.find((hit) => hit.entry === entry && hit.table === table);
    console.log(`  ${table} amended ${entry.date}, cited by ${citing.length} figure(s), ${stale ? `${stale.stale.length} not re-read since` : 'all re-read since'}`);
    if (stale) {
      for (const record of stale.stale) console.log(`    ${record.ref}, last read ${record.checked ?? 'never recorded'}`);
      console.log(`    note: ${entry.note}`);
    }
  }
  console.log('');
}

// These tables are matched against the page above like every other, but their own publisher's
// corrections channel is not read here. A tribunals table amended on the tribunals collection,
// or a Migration Transparency Data sheet amended on its own page, surfaces nowhere in this run.
const noOwnRoute = declared.filter((record) => !CORRECTIONS[record.sourceId]);
if (noOwnRoute.length) {
  console.log(`Publishers with no corrections route here: ${noOwnRoute.length} figure(s). Their tables are matched above, but a correction announced only by their own publisher is unseen.`);
  for (const record of noOwnRoute) console.log(`  ${record.ref}: ${record.tables.join(', ')} (${record.sourceId})`);
  console.log('');
}
// Said whether or not anything above fired, because a source that declares no table cannot
// appear in the list above and would otherwise read as covered. ONS numbers its sheets "Table 1",
// which is not an identifier that could be declared or matched at all.
const noCorrectionsRoute = [...cited.keys()].filter((id) => !CORRECTIONS[id]).sort();
console.log(`No corrections route at all: ${noCorrectionsRoute.length} of the ${cited.size} sources the site cites, ${noCorrectionsRoute.join(', ')}.`);
console.log('One page is watched for corrections, and it is the Home Office data tables.\n');

// Said on every run, including a quiet one. A notifier that speaks only when it fires cannot
// be told apart from one that has stopped working.
console.log('Not established, by either half: that a release which kept its edition slug has');
console.log('changed anything. The edition check compares which edition is cited and nothing else.');
console.log('The corrections watch reads one page and matches table identifiers, so it cannot see a');
console.log('correction whose note names a table by title only, one to a table nobody wrote down,');
console.log('or one published anywhere but that page: a table_reference names which table, never');
console.log('which page publishes it. It compares whole UTC days, so a correction published later');
console.log('on the day a figure was read falls on the wrong side of it. A match means the table');
console.log('moved, never that the row this site publishes did: the last one missed it by a single');
console.log('row. And it clears when retrieved_date moves forward, or lastUpdated for a series,');
console.log('which is a person saying they re-read it, not this or any check establishing so.');

if (!behind.length && !unchecked.length && !corrected.length && !correctionsUnchecked.length) {
  console.log('\nEvery watched source is on the edition the site cites, and every corrected table');
  console.log('was re-read after it was corrected.');
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
  // The tables and the count, not just the source, so that a second correction landing while the
  // first is open changes the title and opens a second issue rather than hiding inside the first.
  // The count is what carries two corrections to the same table on the same day, which the tables
  // and the date alone cannot tell apart.
  ...corrected.map((report) => {
    const tables = [...new Set(report.outstanding.map((hit) => hit.table))].sort().join('/');
    const latest = report.outstanding.map((hit) => hit.entry.date).sort().pop();
    return `${report.id} ${report.outstanding.length} correction(s) to ${tables} since ${latest}`;
  }),
  ...correctionsUnchecked.map((id) => `${id} corrections could not be checked`),
].sort().join(', ');
console.log(`\nISSUE-TITLE: Release check: ${signature}`);
process.exit(1);
