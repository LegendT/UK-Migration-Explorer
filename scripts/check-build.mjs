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
    errors.push(`${where}: unrendered template syntax in output — ${stray}`);
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

if (errors.length) {
  console.error(`Build checks failed — ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

const internal = pages.reduce((n, f) => n + (readFileSync(f, 'utf8').match(/href="\/[^"]*"/g) ?? []).length, 0);
console.log(`Build checks passed: ${pages.length} pages, ${internal} internal links all resolving.`);
