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

import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { COMPANION_BLOCKS, SERIES_FILES, THEME_FILES } from '../lib/series.mjs';

const execFile = promisify(execFileCallback);

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

// Hosts whose CDN refuses this script and answers a browser. Reported as uncheckable from
// 22 July 2026, on a measurement that was right about the 403 and wrong about what fixed it:
// a browser user-agent does nothing, and neither do the four fetch-metadata headers a browser
// sends, so long as the request goes out over Node's fetch. What clears the challenge is those
// headers over HTTP/1.1, which is why this shells out to curl rather than adding headers here.
// Measured 4 August 2026, both hosts, HEAD: the cited page and briefing PDF return 200 and a
// deliberately invalid path under each returns 404, so the check discriminates rather than
// always succeeding, which is the failure mode worse than always failing.
//
// A request that succeeds whatever it asks for is no check at all, so if curl is absent or
// cannot run, these go back to being reported as uncheckable rather than passing quietly.
const NEEDS_BROWSER_HEADERS = new Set([
  'commonslibrary.parliament.uk',
  'researchbriefings.files.parliament.uk',
]);

const BROWSER_HEADERS = [
  ['Sec-Fetch-Dest', 'document'],
  ['Sec-Fetch-Mode', 'navigate'],
  ['Sec-Fetch-Site', 'none'],
  ['Sec-Fetch-User', '?1'],
  ['User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'],
];

// Async, not execFileSync: these run inside a batch of six, and a blocking call would stall the
// AbortController timers of the five fetches beside it into reporting a timeout they did not have.
async function checkViaCurl(url) {
  const args = [
    '-sS', '-I', '-L', '--http1.1', '--max-time', String(TIMEOUT_MS / 1000),
    '-o', '/dev/null', '-w', '%{http_code} %{url_effective}',
    ...BROWSER_HEADERS.flatMap(([name, value]) => ['-H', `${name}: ${value}`]),
    url,
  ];
  let written;
  try {
    ({ stdout: written } = await execFile('curl', args, { encoding: 'utf8', timeout: TIMEOUT_MS * 2 }));
  } catch {
    // No curl, or it could not complete. Uncheckable is the honest answer: this host says 403
    // to everything over the route Node has, so a failure here is about the tool and not the URL.
    return { ok: true, uncheckable: true };
  }
  const [status, finalUrl] = written.trim().split(' ');
  const code = Number(status);
  // 000 is curl's own "no response", not the server's. Same reasoning as above.
  if (!code) return { ok: true, uncheckable: true };
  return { ok: code >= 200 && code < 400, status: code, finalUrl };
}

async function check(url) {
  if (NEEDS_BROWSER_HEADERS.has(new URL(url).hostname)) {
    return checkViaCurl(url);
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

console.log(uncheckable.length
  ? `${entries.length - uncheckable.length} of ${entries.length} source URLs resolve; ${uncheckable.length} need checking by hand.`
  : `All ${entries.length} source URLs resolve, and none needed checking by hand.`);
console.log('Not established: that the page still says what it said. This asks for a status code, so a');
console.log('release replaced in place, or a table corrected under the same URL, resolves exactly as');
console.log('before. check-releases.mjs is what asks that, and it is a separate run.');
