// Which records reach a reader, derived rather than declared.
//
// `/sources-and-method/` publishes how many figures come from each publisher, on the page whose
// subject is how this site's figures are maintained. Those counts were typed by hand, nothing
// read them, and they were wrong: a correction on 30 July got the total right and two of the
// rows wrong, and the total agreed only because the two errors cancelled. Minting one record on
// the same day moved a row again, and again nothing said so. This module is the one home for
// the definition, so a count on the page cannot disagree with the data layer.
//
// REACHING A READER MEANS RENDERING, by one of five routes, and this list is the definition
// rather than a summary of it:
//
//   1. a {{theme/metric-id}} token in a markdown page
//   2. a {% figure "theme/metric-id" %} shortcode in a Nunjucks page
//   3. a chart bar's `ref`, or a `"ref" | metric` summary, in a Nunjucks page
//   4. a dashboard card's `ref`
//   5. a token in the `data/` prose that renders to a page
//
// A `figures:` front-matter entry is NOT a route. Nothing renders that list, and counting it is
// the error that made the Home Office row wrong: it names what a page depends on, not what a
// reader sees.
//
// WHAT THIS DOES NOT ESTABLISH. Routes 1, 2 and 5 are read from the SOURCE, not from the built
// HTML, because a transform runs while the site is still being written and cannot see the whole
// of it. A token in a page that never builds would be counted here and reach nobody. That is
// checked at the other end: check-build.mjs confirms every ref counted through those three
// routes really does appear in the output. Routes 3 and 4 render their values as plain text
// with no ref beside them, so no such confirmation is possible for those six figures, and the
// message there says so.

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(root + path, 'utf8');
const THEME_FILES = ['migration.json', 'asylum.json', 'population.json', 'fiscal.json'];
// The prose fields in data/ that render to a page. The same list validate-content.mjs scans,
// and for the same reason: prose no page shows would count figures no reader meets.
const DATA_PROSE_FILES = ['meta.json', 'dashboard.json', 'sources.json'];

// The three releases the update commitment covers, which is what the page's table lists. Every
// other publisher falls into "the other N", so this constant decides both numbers and is the
// only thing here a person chose.
export const CADENCED_SOURCES = ['ho-immigration-stats', 'ons-ltim', 'hmcts-tribunals'];

const walk = (dir) => readdirSync(root + dir, { withFileTypes: true })
  .flatMap((entry) => (entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]));

const TOKEN = /\{\{([a-z-]+\/[a-z0-9-]+)\}\}/g;

export function registry() {
  const records = new Map();
  for (const file of THEME_FILES) {
    const theme = file.replace('.json', '');
    for (const metric of JSON.parse(read(`data/${file}`)).metrics ?? []) {
      records.set(`${theme}/${metric.id}`, metric);
    }
  }
  return records;
}

// Split by where the ref was found, because check-build can confirm the token routes against
// the built output and cannot confirm the other two. Returning one merged set would hide which
// half is evidenced.
export function publishedRefs() {
  const tokens = new Set();
  const rendered = new Set();

  for (const file of walk('content').filter((f) => /\.(md|njk)$/.test(f))) {
    const body = read(file).replace(/^---\n[\s\S]*?\n---\n/, '');
    // Markdown only for {{ }}: in Nunjucks that syntax is an expression, which is why the
    // shortcode exists, and a front-matter comment mentioning one is not a citation.
    if (file.endsWith('.md')) for (const [, ref] of body.matchAll(TOKEN)) tokens.add(ref);
    for (const [, ref] of body.matchAll(/\{%\s*figure\s+["']([^"']+)["']\s*%\}/g)) tokens.add(ref);
    if (file.endsWith('.njk')) {
      for (const [, ref] of body.matchAll(/\bref:\s*["']([^"']+)["']/g)) rendered.add(ref);
      for (const [, ref] of body.matchAll(/["']([^"']+)["']\s*\|\s*metric\b/g)) rendered.add(ref);
    }
  }

  for (const file of DATA_PROSE_FILES) for (const [, ref] of read(`data/${file}`).matchAll(TOKEN)) tokens.add(ref);
  for (const card of JSON.parse(read('data/dashboard.json')).cards ?? []) if (card.ref) rendered.add(card.ref);

  return { tokens, rendered };
}

export function publishedCounts() {
  const records = registry();
  const { tokens, rendered } = publishedRefs();
  // A ref that is not a record cannot be counted, and cannot pass silently either: every check
  // that resolves citations would already have failed, so this is a guard against this module
  // drifting from them rather than against an author.
  const all = [...new Set([...tokens, ...rendered])];
  const unknown = all.filter((ref) => !records.has(ref));
  if (unknown.length) throw new Error(`published counts: ${unknown.join(', ')} reaches a reader but is not a record`);

  const bySource = new Map();
  for (const ref of all) {
    const id = records.get(ref).source_id;
    bySource.set(id, (bySource.get(id) ?? 0) + 1);
  }
  const otherSources = [...bySource.keys()].filter((id) => !CADENCED_SOURCES.includes(id));
  return {
    records: records.size,
    published: all.length,
    reserve: records.size - all.length,
    bySource,
    otherFigures: otherSources.reduce((n, id) => n + bySource.get(id), 0),
    otherPublishers: otherSources.length,
    tokenRefs: tokens,
  };
}
