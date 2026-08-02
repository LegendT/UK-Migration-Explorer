#!/usr/bin/env node
// Checks that every source URL still resolves. Separate from validate-data.mjs so the
// contract check stays fast and offline; this one does network I/O and is run before
// publishing, not on every commit.
//
// gov.uk statistics URLs are release-specific slugs ("...year-ending-march-2026/...")
// that churn every quarter, so link rot is silent until a reader clicks through, on a
// site whose trust model is "click the source".
//
// Run: node scripts/check-sources.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { COMPANION_BLOCKS, SERIES_FILES, THEME_FILES } from '../lib/series.mjs';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const read = (file) => JSON.parse(readFileSync(dataDir + file, 'utf8'));

const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;

// Collect every distinct URL, remembering everything that cites it.
const urls = new Map();
const cite = (url, where) => {
  if (!urls.has(url)) urls.set(url, []);
  urls.get(url).push(where);
};

for (const file of THEME_FILES) {
  for (const metric of read(file).metrics ?? []) cite(metric.source_url, `${file}: ${metric.id}`);
}
// Three timeseries and every chart sourceUrl were previously checked by nothing. The file
// and block lists come from lib/series.mjs: this script kept private copies of both, which
// is the duplicated-map bug that module exists to prevent, in the one script that gates
// nothing and so would have drifted longest unnoticed.
for (const file of Object.values(SERIES_FILES)) {
  const series = read(file);
  for (const name of ['', ...COMPANION_BLOCKS]) {
    const block = name ? series[name] : series;
    for (const point of block?.data ?? []) cite(point.source_url, `${file} ${name}${point.date}`);
  }
}

const contentDir = fileURLToPath(new URL('../content/', import.meta.url));
// Both quote styles: a chart config written with double quotes is equally valid Nunjucks,
// and the single-quote-only pattern silently dropped it from the check with no signal.
for (const file of readdirSync(contentDir).filter((f) => f.endsWith('.njk'))) {
  for (const [, , url] of readFileSync(contentDir + file, 'utf8').matchAll(/sourceUrl:\s*(['"])([^'"]+)\1/g)) {
    cite(url, `${file} chart`);
  }
}

// External links written in page prose. The data-layer URLs above are the citations, but a
// markdown page can also link a source in a sentence, and those rotted with every check
// green: nothing collected them, while check-build's closing line pointed at this script as
// the external-link answer. Markdown link syntax and raw hrefs, recursively, so the claim
// pages are included.
const walk = (dir, prefix = '') =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(`${dir}${entry.name}/`, `${prefix}${entry.name}/`)
      : (entry.name.endsWith('.md') || entry.name.endsWith('.njk')) ? [`${prefix}${entry.name}`] : []);
for (const file of walk(contentDir)) {
  const body = readFileSync(contentDir + file, 'utf8');
  for (const [, url] of body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) cite(url, `${file} prose`);
  // Both quote styles, and the double-quote-only version was the mirror image of the defect fixed
  // twenty lines above in the same pass: that one's own comment says a single-quote-only pattern
  // "silently dropped it from the check with no signal", and this scan then reintroduced the
  // blindness the other way round. Nothing in content/ writes a single-quoted href today, so it was
  // latent, and latent is what the sibling rule exists to catch. Found by a second model.
  for (const [, url] of body.matchAll(/href=["'](https?:[^"']+)["']/g)) cite(url, `${file} prose`);
}

for (const source of read('sources.json').sources) cite(source.url, `sources.json: ${source.id}`);

// Hosts whose CDN refuses automated requests outright. Verified 22 July 2026: these
// return 403 for every path, including deliberately invalid ones, with or without a
// browser user-agent. A 403 from them therefore says nothing about whether the page
// exists, so this script must report them as uncheckable rather than broken. Calling a
// live link dead trains the reader to ignore the checker, which is worse than no checker.
const BLOCKS_AUTOMATED_CHECKS = new Set([
  'commonslibrary.parliament.uk',
  'researchbriefings.files.parliament.uk',
]);

async function check(url) {
  if (BLOCKS_AUTOMATED_CHECKS.has(new URL(url).hostname)) {
    return { ok: true, uncheckable: true };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // Some publishers reject HEAD, so fall back to a GET we abandon after the headers.
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    }
    return { ok: response.ok, status: response.status, finalUrl: response.url };
  } catch (error) {
    return { ok: false, status: error.name === 'AbortError' ? 'timeout' : 'unreachable' };
  } finally {
    clearTimeout(timer);
  }
}

const entries = [...urls.entries()];
const results = [];
console.log(`Checking ${entries.length} distinct source URLs...\n`);

for (let i = 0; i < entries.length; i += CONCURRENCY) {
  const batch = entries.slice(i, i + CONCURRENCY);
  const checked = await Promise.all(batch.map(async ([url, citations]) => ({
    url, citations, ...await check(url),
  })));
  results.push(...checked);
  for (const result of checked) process.stdout.write(result.ok ? '.' : 'x');
}

const broken = results.filter((r) => !r.ok);
const uncheckable = results.filter((r) => r.uncheckable);
// A redirect is not an error, but a moved statistics release usually means a newer
// edition exists, which is a staleness signal worth seeing.
const redirected = results.filter((r) => r.ok && r.finalUrl && r.finalUrl !== r.url);

console.log('\n');
if (uncheckable.length) {
  console.log(`${uncheckable.length} URL(s) could not be checked automatically, verify by hand:`);
  for (const r of uncheckable) console.log(`  ${r.url}\n    cited by: ${r.citations.join(', ')}`);
  console.log('');
}

if (redirected.length) {
  console.log(`${redirected.length} URL(s) redirected, check whether a newer release has superseded the figure:`);
  for (const r of redirected) {
    console.log(`  ${r.url}\n    -> ${r.finalUrl}\n    cited by: ${r.citations.join(', ')}`);
  }
  console.log('');
}

if (broken.length) {
  console.error(`${broken.length} source URL(s) did not resolve:\n`);
  for (const r of broken) {
    console.error(`  [${r.status}] ${r.url}\n    cited by: ${r.citations.join(', ')}`);
  }
  process.exit(1);
}

console.log(`${entries.length - uncheckable.length} of ${entries.length} source URLs resolve; ${uncheckable.length} need checking by hand.`);
