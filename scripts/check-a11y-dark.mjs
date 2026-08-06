#!/usr/bin/env node
// The accessibility run, again, in the dark palette.
//
// `npm run a11y` reported every URL clean and had never once looked at the dark theme.
// pa11y-ci sets no colour scheme, so headless Chrome answers `prefers-color-scheme: dark` with
// no, and content/assets/style.css defines the whole dark palette behind that query. The clean
// report covered the light theme alone, and said so nowhere.
//
// The palette was measured by hand on 6 August 2026, on every page and including chart text,
// and passed at AA. That is exactly the state this project has been burned by before: a fact
// established once by a person, guarded by nothing, and quietly falsified by the next change to
// a custom property. This script is the guard.
//
// ONE LIST, which is why the URLs are not written here. `.pa11yci.json` is the only list of
// pages, and this reads it, adds the flag, and hands it back to the same runner. A second copy
// of the URLs would go stale against the first the way every duplicated list in this repository
// has, and the copy a run happened to read would win.
//
// `--force-dark-mode` is the flag, chosen by probing rather than from documentation: with it,
// `matchMedia('(prefers-color-scheme: dark)')` matches and `document.body` computes to this
// site's own dark background rather than to a browser-synthesised inversion, so what is audited
// is the stylesheet the site ships. `--enable-features=WebContentsForceDark` was probed too and
// changes nothing here, so it is not passed: that one is Chrome's auto-darkening of pages that
// have no dark theme, which would audit a rendering this site never serves.
//
// Run: node scripts/check-a11y-dark.mjs   (expects a server already up, as npm run a11y does)

import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const source = `${repoRoot}.pa11yci.json`;
const generated = `${repoRoot}.pa11yci.dark.generated.json`;

const config = JSON.parse(readFileSync(source, 'utf8'));

if (!Array.isArray(config.urls) || config.urls.length === 0) {
  console.error('.pa11yci.json holds no urls array, so this run would audit nothing and pass.');
  process.exit(1);
}

const defaults = config.defaults ?? {};
const launch = defaults.chromeLaunchConfig ?? {};
const args = [...(launch.args ?? [])];
if (!args.includes('--force-dark-mode')) args.push('--force-dark-mode');

// Concurrency is forced to 1 for this pass. It runs straight after the light one and the first
// time both ran together a page came back as `chrome-error://chromewebdata/`, which pa11y then
// audited as though it were the site: two errors reported against Chrome's own error page, on a
// URL that is clean when the pass runs alone. A load failure must not read as a content failure,
// and it must not read as a pass either. This costs about a minute and removes the flake.
writeFileSync(generated, JSON.stringify({
  ...config,
  concurrency: 1,
  defaults: { ...defaults, chromeLaunchConfig: { ...launch, args } },
}, null, 2));

try {
  const run = spawnSync('npx', ['pa11y-ci', '--config', generated], {
    cwd: repoRoot,
    stdio: 'inherit',
    encoding: 'utf8',
  });
  if (run.status !== 0) {
    console.error('');
    console.error('The dark palette failed WCAG 2.2 AA on at least one page above. The light run');
    console.error('can pass while this fails: they are different colour values behind the same');
    console.error('markup, and only this run reads the ones inside the prefers-color-scheme block.');
    process.exit(run.status ?? 1);
  }
  console.log('');
  console.log(`Dark palette: ${config.urls.length} URL(s) audited against WCAG 2.2 AA, taken from`);
  console.log('.pa11yci.json rather than from a second list here, with --force-dark-mode set so');
  console.log('the page renders its own dark custom properties rather than a browser inversion.');
  console.log('');
  console.log('Not established: anything the light run establishes, which is a separate pass over');
  console.log('the same URLs; that a chart\'s in-bar label is legible against the bar it sits on,');
  console.log('since automated contrast reads an element against its DOM ancestor and an SVG');
  console.log('knockout label has no such ancestor; or that any of it sounds right in a screen');
  console.log('reader, which no automated pass here claims.');
} finally {
  rmSync(generated, { force: true });
}
