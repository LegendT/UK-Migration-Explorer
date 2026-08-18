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
// routes really does appear in the output. Route 4 and the chart-bar half of route 3 named their
// record from 18 August 2026, so those are confirmable there too. What is not is the
// `"ref" | metric` half of route 3: it interpolates a bare number into a concatenated string
// which is then escaped into a chart's SVG <desc>, so there is no element to carry an attribute
// and no way to add one without holding that sentence in two forms. The message there says so and
// counts them.

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { THEME_FILES } from './series.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(root + path, 'utf8');
// The data files holding prose that renders to a page. validate-content.mjs names the same
// three files but scans them FIELD by field, because a token in a field no template renders
// would be held to a rule it can never satisfy. This reads the whole file instead, which
// over-counts by exactly that case, and the reason that is safe rather than sloppy is the
// comparison in check-build.mjs: a ref counted here that renders nowhere fails the build by
// name. Field-accurate scanning would mean a second copy of that extractor list, and a copy
// is what this project keeps being bitten by.
const DATA_PROSE_FILES = ['meta.json', 'dashboard.json', 'sources.json'];

// The three releases the update commitment covers, which is what the page's table lists. Every
// other publisher falls into "the other N", so this constant decides both numbers and is the
// only thing here a person chose.
export const CADENCED_SOURCES = ['ho-immigration-stats', 'ons-ltim', 'hmcts-tribunals'];

const walk = (dir) => readdirSync(root + dir, { withFileTypes: true })
  .flatMap((entry) => (entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]));

// Whitespace inside the braces, because this has to match what the RENDERER accepts, not what
// the site happens to write today. resolve-citations matches {{ anything }} and trims, and
// validate-content.mjs trims too, so "{{ theme/id }}" is a working citation everywhere else. A
// stricter pattern here would drop a figure a reader can see out of the counts, and that is an
// UNDERCOUNT, the direction a one-way check cannot see. Both models reading this branch found
// it in the same place.
const TOKEN = /\{\{\s*([a-z-]+\/[a-z0-9-]+)\s*\}\}/g;

// Comments are removed before anything is matched, in both syntaxes, because a scan of text is
// not a scan of what renders. A Nunjucks comment is stripped at render, so a chart bar left
// inside one during a rework counts a figure nobody can see. An HTML comment is worse: it
// survives into the output, resolve-citations renders the figure INTO it, and the check at the
// far end then finds the ref in the built HTML and confirms it, so both ends agree on something
// no reader sees. Stripping here and in check-build.mjs is what keeps the two ends honest.
const uncommented = (body) => body.replace(/\{#[\s\S]*?#\}/g, '').replace(/<!--[\s\S]*?-->/g, '');

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
    const source = read(file);
    // A PAUSED claim renders as a stub: its answer, its figures and its citation are gone, and
    // its prose is not output at all. Every token in it is therefore a figure reaching nobody,
    // and counting them overstates what /sources-and-method/ tells a reader is published.
    //
    // Found by probing rather than by reading. Pausing one claim failed check-build with five
    // refs "counted as reaching a reader, from a token in the source, but renders on no page a
    // reader sees" -- five and not nine, because the other four also render on a theme page.
    // That check is the end where this can be caught, and it caught its own library.
    // The front matter is cut out BEFORE asking, rather than asked for with one pattern over the
    // whole file. `/^---\n[\s\S]*?^paused:/m` reads as though the `---` anchors it and it does
    // not: the lazy middle crosses the closing fence, so a page whose prose merely began a line
    // with "paused:" would have every figure on it dropped from the published counts, silently
    // and in the direction nothing notices. Probed with that exact string rather than reasoned
    // about.
    const front = /^---\n([\s\S]*?)\n---\n/.exec(source);
    if (front && /^paused:\s*\S/m.test(front[1])) continue;
    const body = uncommented(source.replace(/^---\n[\s\S]*?\n---\n/, ''));
    // Each syntax is counted only in the file type where it renders. In markdown, {{ }} is a
    // citation and {% %} is visible junk, because markdownTemplateEngine is false. In Nunjucks
    // it is the other way round. Counting a shortcode in a markdown page would count a figure
    // that ships as template syntax to a reader.
    if (file.endsWith('.md')) {
      for (const [, ref] of body.matchAll(TOKEN)) tokens.add(ref);
    } else {
      for (const [, ref] of body.matchAll(/\{%\s*figure\s+["']([^"']+)["']\s*%\}/g)) tokens.add(ref);
      for (const [, ref] of body.matchAll(/\bref:\s*["']([^"']+)["']/g)) rendered.add(ref);
      for (const [, ref] of body.matchAll(/["']([^"']+)["']\s*\|\s*metric\b/g)) rendered.add(ref);
    }
  }

  for (const file of DATA_PROSE_FILES) for (const [, ref] of uncommented(read(`data/${file}`)).matchAll(TOKEN)) tokens.add(ref);
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
  // Counted as catalogue SOURCES, not as publishers, and the page's sentence calls them
  // publishers. That is right for the list it introduces, which names sources: "ONS population
  // estimates" is one of the six and ONS is not, since ONS also publishes a cadenced release in
  // the table above. Counting distinct publishers instead would print five for a list of six.
  // What it means is that a second source from a publisher already here, another Commons
  // Library briefing series, would move this number without the publisher set changing, and the
  // prose would need rewording rather than the count correcting. Found by a second model.
  const otherSources = [...bySource.keys()].filter((id) => !CADENCED_SOURCES.includes(id));
  return {
    records: records.size,
    published: all.length,
    reserve: records.size - all.length,
    bySource,
    otherFigures: otherSources.reduce((n, id) => n + bySource.get(id), 0),
    otherPublishers: otherSources.length,
    tokenRefs: tokens,
    // The rendered half is exposed for the far-end comparison in check-build.mjs, which since
    // 18 August 2026 meets bar and card refs in the output and has to tell a published ref from
    // an unpublished one. It is NOT the set that must appear there: a `"ref" | metric` summary
    // still leaves no trace, so this is what a ref found in the output is allowed to be, not
    // what has to be found.
    renderedRefs: rendered,
  };
}
