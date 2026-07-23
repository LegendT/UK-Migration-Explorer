#!/usr/bin/env node
// Checks the BUILT site, not the source that produced it.
//
// This exists because validate-content.mjs passed a page whose every glossary link was
// dead: it verified that the markdown declared {#anchor} on each term, which was true,
// while the build silently rendered that syntax as visible text and produced no ids at
// all. Validating the source is not validating the artefact.
//
// Run after `npm run build`: node scripts/check-build.mjs

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = fileURLToPath(new URL('../_site/', import.meta.url));

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const built = walk(siteDir);
const pages = built.filter((f) => f.endsWith('.html'));
const errors = [];

// Every URL the built site can serve, pages and assets alike, plus the anchors each page
// actually defines.
const served = new Set(built.map((f) => `/${relative(siteDir, f).replace(/\\/g, '/')}`));
const anchors = new Map();
for (const file of pages) {
  const url = `/${relative(siteDir, file).replace(/index\.html$/, '').replace(/\\/g, '/')}`;
  served.add(url);
  const html = readFileSync(file, 'utf8');
  anchors.set(url, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

for (const file of pages) {
  const where = relative(siteDir, file);
  const html = readFileSync(file, 'utf8');
  const url = `/${where.replace(/index\.html$/, '')}`;

  // Template or citation syntax that reached the output.
  for (const stray of html.match(/\{\{[^}]*\}\}|\{#[a-z0-9-]+\}/g) ?? []) {
    errors.push(`${where}: unrendered template syntax in output, ${stray}`);
  }

  // A template engine that consumes a citation leaves no {{ }} behind to find, it leaves
  // NaN, which reads as a number and shipped once inside a table of statistics. Checking
  // for leftover syntax is not enough; the failed result has to be checked for too.
  const text = html.replace(/<[^>]+>/g, ' ');
  for (const value of ['NaN', 'undefined', '[object Object]']) {
    const pattern = new RegExp(`\\b${value.replace(/[[\]]/g, '\\$&')}\\b`, 'g');
    const inText = (text.match(pattern) ?? []).length;
    if (inText) errors.push(`${where}: "${value}" appears ${inText} time(s) in visible text, a citation or filter failed`);
    // Chart maths fails into ATTRIBUTES, not text: a broken path renders blank while every
    // text node stays clean. Stripping tags before searching hid exactly that.
    const inAttrs = (html.match(pattern) ?? []).length - inText;
    if (inAttrs > 0) errors.push(`${where}: "${value}" appears ${inAttrs} time(s) inside attributes, chart or template maths failed`);
  }

  for (const [, d] of html.matchAll(/<path class="series[^"]*" d="([^"]*)"/g)) {
    if (!d || !/^M-?[\d.]+,-?[\d.]+/.test(d)) errors.push(`${where}: a chart series has no usable path data`);
  }

  // Same-page fragments were skipped entirely, so a dead #anchor passed as "all resolving".
  for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!(anchors.get(url) ?? new Set()).has(fragment)) {
      errors.push(`${where}: links to #${fragment}, which is not an anchor on this page`);
    }
  }

  // Internal links must resolve, both the page and the fragment.
  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    const [path, fragment] = href.split('#');
    const target = path === '' ? url : (path.endsWith('/') ? path : `${path}/`);
    if (!served.has(target) && !served.has(path)) {
      errors.push(`${where}: links to ${href}, which the build does not produce`);
      continue;
    }
    if (fragment && !(anchors.get(served.has(target) ? target : path) ?? new Set()).has(fragment)) {
      errors.push(`${where}: links to ${href}, but #${fragment} is not on that page`);
    }
  }

  // Every table and every chart sits in a box that scrolls sideways, and a box that
  // scrolls has to be reachable by keyboard and has to say what it is when focus lands
  // there. Checking the source would prove only that the transform is registered. This
  // checks the artefact: that no table reached a reader outside such a box, and that no
  // box reached one unnamed or unfocusable. Four markdown tables had no box at all.
  // match.index, not indexOf: two byte-identical tables on one page would have sent every
  // check back to the first one, and the second could then pass on the first one's wrapper.
  for (const match of html.matchAll(/<table[\s\S]*?<\/table>/g)) {
    if (!/<div class="scroll-x"[^>]*>\s*$/.test(html.slice(0, match.index))) {
      errors.push(`${where}: a table is not inside a .scroll-x region, so it cannot be scrolled below its own width`);
    }
  }
  for (const [, attrs] of html.matchAll(/<div class="scroll-x"([^>]*)>/g)) {
    if (!/tabindex="0"/.test(attrs)) errors.push(`${where}: a .scroll-x region is not focusable, so it cannot be scrolled from the keyboard`);
    if (!/role="region"/.test(attrs)) errors.push(`${where}: a .scroll-x region has no role, so focus lands on an anonymous box`);
    if (!/aria-label="[^"]+"/.test(attrs)) errors.push(`${where}: a .scroll-x region has no accessible name`);
  }

  // An aria-labelledby pointing at an id that does not exist produces no name at all, and
  // nothing on the page shows it: the chart still draws, the tests still pass, and a
  // screen reader announces "image". The reference has to be checked, not just written.
  for (const [, attribute, list] of html.matchAll(/\s(aria-labelledby|aria-describedby)="([^"]+)"/g)) {
    for (const id of list.trim().split(/\s+/)) {
      if (!(anchors.get(url) ?? new Set()).has(id)) {
        errors.push(`${where}: ${attribute} points at #${id}, which is not an id on this page`);
      }
    }
  }

  // Two controls that do different things must not answer to the same name. Three charts
  // on a page gave three disclosure controls all called "Show the figures behind this
  // chart", each opening a different table, so anyone moving between them by keyboard or
  // listing the page's controls had nothing to tell them apart. pa11y passes this: it can
  // see that a control has a name, not that the name distinguishes it from its neighbour.
  // Tags stripped, because the accessible name includes any visually hidden part.
  const accessibleName = (markup) => markup.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

  const summaries = [...html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) => accessibleName(m[1]));
  for (const [name, count] of Object.entries(summaries.reduce((n, s) => ({ ...n, [s]: (n[s] ?? 0) + 1 }), {}))) {
    if (count > 1) errors.push(`${where}: ${count} disclosure controls are all called "${name}", and each opens something different`);
  }

  // The same rule for links, with the exception the rule actually has: repeating a link is
  // fine when it goes to the same place. Repeating the text while changing the destination
  // is what leaves a reader unable to tell two links apart.
  const destinations = new Map();
  for (const [, href, label] of html.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const name = accessibleName(label);
    if (!name) continue;
    if (!destinations.has(name)) destinations.set(name, new Set());
    destinations.get(name).add(href);
  }
  for (const [name, hrefs] of destinations) {
    if (hrefs.size > 1) errors.push(`${where}: "${name}" is the text of ${hrefs.size} links that go to different places`);
  }

  // Link text that names nothing. "the claim check" was the text of a link on three separate
  // pages, each going to a different check, and it was about to become two more in the
  // glossary. The rule above cannot catch it: that one is scoped to a single page and these
  // sat one per page, so every page passed while the site as a whole gave the same phrase to
  // five destinations. 2.4.4 is judged in context and this arguably scrapes it; the standard
  // here is that a link should say where it goes when read on its own, which is how anyone
  // listing a page's links reads it.
  const OPAQUE_LINK_TEXT = new Set([
    'the claim check', 'claim check', 'click here', 'here', 'this page', 'link', 'this link',
    'read more', 'more', 'learn more', 'see more', 'details', 'continue', 'read this',
  ]);
  for (const [name] of destinations) {
    if (OPAQUE_LINK_TEXT.has(name.toLowerCase().replace(/[.,:;]+$/, '').trim())) {
      errors.push(`${where}: a link is called "${name}", which says nothing about where it goes. Name the destination instead.`);
    }
  }

  // Structural essentials that a layout change could silently drop.
  if (!/<html lang="en-GB">/.test(html)) errors.push(`${where}: missing lang on <html>`);
  if (!/<main id="main"/.test(html)) errors.push(`${where}: missing <main id="main">`);
  if (!/class="skip-link"/.test(html)) errors.push(`${where}: missing skip link`);
  const h1s = (html.match(/<h1[ >]/g) ?? []).length;
  if (h1s !== 1) errors.push(`${where}: has ${h1s} h1 elements, expected exactly 1`);

  const levels = [...html.matchAll(/<h([1-6])[ >]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      errors.push(`${where}: heading jumps from h${levels[i - 1]} to h${levels[i]}`);
      break;
    }
  }
}

// robots.txt is deliberately present until launch. If it goes missing the site becomes
// crawlable again with no other signal, so its absence is treated as a build failure until
// someone removes this check on purpose.
const robots = built.find((f) => f.endsWith('robots.txt'));
if (!robots) {
  errors.push('robots.txt: missing from the build, the site would become crawlable. Remove this check deliberately at launch.');
} else {
  // The rule must apply to the wildcard agent. A Disallow under one named bot satisfied the
  // previous check while everything else stayed allowed.
  const groups = readFileSync(robots, 'utf8').split(/\n(?=\s*User-agent:)/i)
    .map((g) => g.trim()).filter((g) => /^User-agent:/i.test(g));
  const wildcard = groups.find((g) => /^User-agent:\s*\*/im.test(g));
  if (!wildcard) errors.push('robots.txt: no "User-agent: *" group, named-bot rules do not cover other crawlers.');
  else if (!/^\s*Disallow:\s*\/\s*$/m.test(wildcard)) errors.push('robots.txt: the "User-agent: *" group does not Disallow: /, the site would be crawlable.');
  else if (/^\s*Allow:/im.test(wildcard)) errors.push('robots.txt: the "User-agent: *" group contains an Allow rule, which may re-open paths.');
}

if (errors.length) {
  console.error(`Build checks failed, ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

const internal = pages.reduce((n, f) => n + (readFileSync(f, 'utf8').match(/href="\/[^"]*"/g) ?? []).length, 0);
console.log(`Build checks passed: ${pages.length} pages; ${internal} internal links and all same-page fragments resolve; robots.txt disallows all crawlers.`);
console.log('External source URLs are not checked here, run npm run check-sources.');
