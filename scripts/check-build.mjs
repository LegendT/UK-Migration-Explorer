#!/usr/bin/env node
// Checks the BUILT site, not the source that produced it.
//
// This exists because validate-content.mjs passed a page whose every glossary link was
// dead: it verified that the markdown declared {#anchor} on each term, which was true,
// while the build silently rendered that syntax as visible text and produced no ids at
// all. Validating the source is not validating the artefact.
//
// Run after `npm run build`: node scripts/check-build.mjs

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import site from '../content/_data/site.js';
import { publishedCounts, registry } from '../lib/published.mjs';
import { BAR_FONT } from '../lib/charts.mjs';

const siteDir = fileURLToPath(new URL('../_site/', import.meta.url));
const repoRoot = fileURLToPath(new URL('../', import.meta.url));

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

// Every link this build is answerable for, as a path.
//
// A link written with this site's own origin is an internal link too, and it was not checked
// because until the citation blocks nothing wrote one but the canonical tag. The citation exists
// to hand a reader a URL they paste somewhere else, so a chart id renamed under it breaks
// precisely the thing the block is for, on a page where every other link still resolves.
//
// One function rather than a second pattern at each site, because the count printed at the end
// of this file was derived from its own copy of the relative pattern and would have gone on
// reporting the smaller number while the larger set was being checked.
const ORIGIN = new RegExp(`href="${site.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^"]*)"`, 'g');
const internalHrefs = (html) => [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1])
  .concat([...html.matchAll(ORIGIN)].map((m) => m[1] || '/'));

// Structured data is walked as parsed JSON rather than scanned as text, so a URL is found
// wherever it sits and a nested node is not missed by a pattern written for the shape the graph
// happens to have today. The KEY comes back with the value because the two kinds of URL in a
// graph are checked differently: `@id` names a node and its fragment is an identifier that no
// page has to carry, while `url`, `license` and `contentUrl` are addresses a reader or a crawler
// is being sent to and their fragments have to exist. Checking them the same way reported four
// working identifiers as dead anchors.
const jsonLdUrls = (node, key = null) => (typeof node === 'string' ? [{ key, value: node }]
  : Array.isArray(node) ? node.flatMap((child) => jsonLdUrls(child, key))
    : node && typeof node === 'object'
      ? Object.entries(node).flatMap(([k, child]) => jsonLdUrls(child, k)) : []);
const jsonLdTypes = (node) => (Array.isArray(node) ? node.flatMap(jsonLdTypes)
  : node && typeof node === 'object'
    ? [node['@type'] ?? []].flat().concat(Object.values(node).flatMap(jsonLdTypes)) : []);
const ldTypes = new Map();

for (const file of pages) {
  const where = relative(siteDir, file);
  const html = readFileSync(file, 'utf8');
  const url = `/${where.replace(/index\.html$/, '')}`;

  // Template or citation syntax that reached the output. {caption} and {count:} are this
  // project's own marker syntaxes, resolved by transforms rather than by an engine, and each
  // transform throws on a marker it cannot resolve. They are here too because a transform only
  // sees the files it runs on: a marker in a page that skipped it would ship as visible text,
  // and the transform that could have complained never ran.
  // The count marker is matched loosely, `{count` and anything to the next brace, because the
  // transform can only resolve what it recognises: "{count :key}" or "{Count:key}" is a typo the
  // transform passes over in silence and a reader meets as visible text. A `{% %}` tag is here
  // for the same reason, in the other direction: it is a citation that works in Nunjucks and
  // ships as junk from a markdown page, where the engine is deliberately off.
  // The anchor marker is matched loosely too, `{#` and anything to the next brace, because a
  // mistyped anchor such as {#Foo} or {# section} fails the transform's exact charset and
  // shipped as visible heading text with nothing firing: the scan was exactly as narrow as
  // the transform it backstops, so the two failed together on the same input.
  for (const stray of html.match(/\{\{[^}]*\}\}|\{ *#[^}]*\}|\{caption\}|\{ *[Cc]ount[^}]*\}|\{%[^%]*%\}/g) ?? []) {
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
  for (const href of internalHrefs(html)) {
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

  // Structured data, parsed rather than pattern-matched. Two failures are invisible everywhere
  // else: a block that does not parse is silently discarded by every consumer while the page
  // renders perfectly, and a URL inside one is invisible to the internal-link check above,
  // because that reads href attributes and this sits inside a script element. The domain moved
  // once already, on 4 August 2026, which is the incident the print-stylesheet check at the foot
  // of this file exists for; this is the same fact written in a third place.
  for (const [, block] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(block);
    } catch (error) {
      errors.push(`${where}: the JSON-LD block does not parse, ${error.message}. A consumer discards it in silence and the page looks unchanged.`);
      continue;
    }
    if (!ldTypes.has(url)) ldTypes.set(url, new Set());
    for (const type of jsonLdTypes(data)) ldTypes.get(url).add(type);
    // No third origin. Every absolute URL in a block is either the schema.org context or this
    // site at the address site.url gives, so the deploy domain, a stale domain or a typo cannot
    // ride along inside a script element where nothing else here reads. lib/structured-data.mjs
    // writes no literal URL today, which is what makes this cheap to keep true; a deliberate
    // external one, a sameAs or an external licence, widens this line rather than sneaking past.
    for (const { value } of jsonLdUrls(data).filter((u) => /^https?:\/\//.test(u.value))) {
      // The context is matched exactly rather than by prefix. Written `startsWith`, the rule
      // meant to refuse a third origin accepted https://schema.org.example.com/ as the vocabulary.
      if (!value.startsWith(`${site.url}/`) && value !== site.url && value !== 'https://schema.org') {
        errors.push(`${where}: structured data names ${value}, which is neither the schema.org context nor a URL under ${site.url}. If that origin is deliberate, widen this check.`);
      }
    }

    // Only this site's own URLs are resolved. An external one is a question about someone else's
    // server, which is check-sources' job and not this file's.
    for (const { key, value } of jsonLdUrls(data).filter((u) => u.value.startsWith(`${site.url}/`))) {
      const [path, fragment] = value.slice(site.url.length).split('#');
      const target = path.endsWith('/') ? path : `${path}/`;
      if (!served.has(target) && !served.has(path)) {
        errors.push(`${where}: structured data names ${value}, which the build does not serve.`);
        continue;
      }
      if (key !== '@id' && fragment && !(anchors.get(served.has(target) ? target : path) ?? new Set()).has(fragment)) {
        errors.push(`${where}: structured data names ${value}, but #${fragment} is not on that page.`);
      }
    }
  }

  // Every table and every chart sits in a box that scrolls sideways, and a box that
  // scrolls has to be reachable by keyboard and has to say what it is when focus lands
  // there. Checking the source would prove only that the transform is registered. This
  // checks the artefact: that no table reached a reader outside such a box, and that no
  // box reached one unnamed or unfocusable. Four markdown tables had no box at all.
  // match.index, not indexOf: two byte-identical tables on one page would have sent every
  // check back to the first one, and the second could then pass on the first one's wrapper.
  //
  // BOTH patterns below used to end the class attribute at scroll-x, `class="scroll-x"`, so a
  // region written `class="scroll-x anything-else"` was invisible to them. The two failures are
  // NOT the same failure, which is worth writing down because only one of them is silent:
  //
  //   The three attribute checks never see such a region AT ALL. It is not focusable, has no
  //   role and has no name as far as they are concerned, and they say nothing, because a region
  //   they cannot match is a region they never test.
  //
  //   The wrapper check says the OPPOSITE of the truth: it reports a correctly wrapped table as
  //   not wrapped. Probed, not reasoned: fixing the transform while leaving this check produces
  //   `a table is not inside a .scroll-x region` on the one page it applies to.
  //
  // Which is why it stayed quiet when this shipped on 5 August 2026. The transform carried the
  // same assumption, so it read the wrapper as no wrapper and added a SECOND, plain one, and
  // that plain wrapper is what this check then found. The page shipped a scrolling box inside a
  // scrolling box, with the shadow affordance painted twice and a second focusable stop for a
  // keyboard user, and this check and pa11y both passed. It was found by counting `.scroll-x` in
  // the built page and getting four where the page has three tables.
  //
  // A CHARACTER CLASS IS NOT THE FIX, which is what the backlog bullet prescribed:
  // `class="scroll-x[^"]*"` reads `class="scroll-xy"` as a scrolling region. The class attribute
  // is a space-separated list, so the token has to be matched as a whole member of it: either
  // side of scroll-x must be a quote or a space. `no-scroll-x` and `scroll-x-wide` are refused
  // by that and by nothing looser.
  //
  // Written out here rather than shared with eleventy.config.js DELIBERATELY. This check exists
  // to disagree with the transform, and one expression imported by both is one assumption that
  // cannot be caught from either side, which is precisely how four patterns went blind together.
  const SCROLL_X = 'class="(?:[^"]*\\s)?scroll-x(?:\\s[^"]*)?"';
  for (const match of html.matchAll(/<table[\s\S]*?<\/table>/g)) {
    if (!new RegExp(`<div ${SCROLL_X}[^>]*>\\s*$`).test(html.slice(0, match.index))) {
      errors.push(`${where}: a table is not inside a .scroll-x region, so it cannot be scrolled below its own width`);
    }
  }
  for (const [, attrs] of html.matchAll(new RegExp(`<div ${SCROLL_X}([^>]*)>`, 'g'))) {
    if (!/tabindex="0"/.test(attrs)) errors.push(`${where}: a .scroll-x region is not focusable, so it cannot be scrolled from the keyboard`);
    if (!/role="region"/.test(attrs)) errors.push(`${where}: a .scroll-x region has no role, so focus lands on an anonymous box`);
    if (!/aria-label="[^"]+"/.test(attrs)) errors.push(`${where}: a .scroll-x region has no accessible name`);
  }

  // Two elements answering to the same id. The anchors map above is a Set, so a duplicate is
  // invisible to every check that reads it: a fragment link resolves, an aria reference
  // resolves, and a browser silently takes the first element while the author meant the
  // second. Heading ids are derived from heading text now, so two headings worded the same
  // way on one page are the reachable case; the transform skips the second, and this is the
  // end that says so if it ever stops.
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of new Set(ids.filter((value, i) => ids.indexOf(value) !== i))) {
    errors.push(`${where}: id "${id}" is on more than one element, so a link to #${id} and any aria reference to it land on whichever comes first`);
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

// --- the structured data each page is supposed to carry ---------------------------------
// The block above checks what is there. This checks that it is there at all: a shortcode
// renamed, a head rewritten or a page url changed drops the whole block, and nothing a reader
// or a check can see changes. The same shape as the robots.txt and print-rule checks below,
// and it is the failure the sitemap check was written for one level up.
//
// ClaimReview is asserted ABSENT deliberately, and it is the only type this file forbids.
// Google withdrew it from Search on 12 June 2025 and from Search Console on 9 September 2025,
// and Fact Check Explorer, where the markup still lives, requires each claim to be attributed to
// a named origin off-site, which content/style-guide.md tells readers this site does not do. So
// adding it back is a decision to publish markup against a published policy, and this is the
// line that makes that deliberate rather than incidental. Backlog call 27.
const EXPECTED_LD = {
  '/': ['WebSite', 'Organization'],
  '/sources-and-method/': ['Dataset'],
};
for (const [url, expected] of Object.entries(EXPECTED_LD)) {
  const found = ldTypes.get(url) ?? new Set();
  for (const type of expected) {
    if (!found.has(type)) errors.push(`${url}: no ${type} in structured data. The page renders unchanged and every consumer of it loses the declaration.`);
  }
}
for (const [url, found] of ldTypes) {
  if (found.has('ClaimReview')) {
    errors.push(`${url}: publishes ClaimReview structured data. Google withdrew the rich result in June 2025 and the Search Console report that September, and the surviving Fact Check Explorer requires claims attributed to a named off-site origin, which content/style-guide.md tells readers this site does not do.`);
  }
}

// --- the published-figure counts, checked at the end they are claimed about ------------
// The counts on /sources-and-method/ are derived by lib/published.mjs, which reads the SOURCE:
// a transform runs while the site is still being written and cannot see the whole of it. So
// three of its five routes are a proxy for rendering rather than rendering itself, and a token
// in a page that never builds would be counted for a reader who never sees it.
//
// This is the end where that can be checked, and it is compared BOTH ways, on two different sets
// since 18 August 2026. Every ref counted from a TOKEN must appear in the output, which is
// equality in that direction and unchanged. Every data-metric found in the output must be a ref
// this site counts as published, which is the direction that widened: `data-metric` no longer
// comes from renderFigure alone, because a chart bar and a dashboard card now carry the record
// they draw. Comparing the output against the token set alone would now fail on every bar and
// card ref that is not also written as a token, which is three of them today. A one-way check finds only an overcount, and the
// undercount is the easier mistake: the scan's pattern has to match everything the RENDERER
// accepts, and resolve-citations takes "{{ theme/id }}" with spaces. A citation written that way
// would reach a reader and be counted for nobody, leaving the page's numbers quietly low. Both
// models that read this branch found that in the same place, which is why the direction that
// cannot be reached today is checked anyway.
//
// Comments are stripped first, for the reason lib/published.mjs strips them: resolve-citations
// renders a figure sitting inside an HTML comment, so the ref reaches this file and would
// "confirm" a figure no reader can see. Both ends have to be blind to the same text or the
// agreement between them means nothing.
//
// THAT TRADE WAS MADE ON 18 AUGUST 2026 AND THIS COMMENT SAID IT HAD NOT BEEN. A chart bar and a
// dashboard card now carry `data-metric` naming the record they draw, so their values are
// confirmable here where they were not. It changes no rendered text, no layout and no accessible
// name: the attribute is the one every token route already emits, and the built pages are
// otherwise byte-identical. What it bought is not mainly this comparison, which gained three
// refs; it is that the currency sentence is no longer decided from a marker two published routes
// never emit.
//
// What it does NOT establish, and this is the half that is still open: a `"ref" | metric` chart
// summary interpolates a bare number into a concatenated string, so seven of the counted figures
// still leave no trace to match. The obvious wrapper does not build. That string is escaped into
// the chart's SVG <desc> as its accessible description, so marking it up means either shipping
// literal tags to a screen reader or holding the same sentence in two forms, and neither is a
// change to make in order to make a check easier.
const inOutput = new Set();
for (const file of pages) {
  const visible = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  for (const [, ref] of visible.matchAll(/data-metric="([^"]+)"/g)) inOutput.add(ref);
}
// A throw here would take every error collected above with it, unreported, on a standalone
// check-build run. The counts are one more finding, not a reason to lose the others.
let counts;
try {
  counts = publishedCounts();
} catch (error) {
  errors.push(`published counts: ${error.message}`);
}
if (counts) {
  const missing = [...counts.tokenRefs].filter((ref) => !inOutput.has(ref));
  const published = new Set([...counts.tokenRefs, ...counts.renderedRefs]);
  const uncounted = [...inOutput].filter((ref) => !published.has(ref));
  if (missing.length) {
    errors.push(`published counts: ${missing.join(', ')} is counted as reaching a reader, from a token in the source, but renders on no page a reader sees. The counts on /sources-and-method/ are overstated by ${missing.length}.`);
  }
  if (uncounted.length) {
    errors.push(`published counts: ${uncounted.join(', ')} renders on a page and lib/published.mjs does not count it, so the counts on /sources-and-method/ are understated by ${uncounted.length}. The citation is probably written in a form the scan's pattern does not match but the renderer accepts.`);
  }
}

// --- the review sign-off's page count, against the pages the build actually produced --------
// CHANGELOG.md records that a human reviewed this site before publication, and says how many
// pages that signature covers out of how many the build produces. It is the last promise
// /sources-and-method/ makes, and until now the denominator was prose that nothing read.
//
// It has gone short twice. Written as "all 22 pages the build produces" when the build made 23,
// corrected on 6 August 2026; then correct at 23 until a new page on 10 August made the build 24
// and nothing said so. Both times the defect is the same shape and it is the one the entry's own
// argument is about: a signature that rounds up to "every page" is the scope silence this site
// objects to in others. Adding a page is exactly when it happens, and adding a page is exactly
// when nobody is thinking about the changelog.
//
// Only the DENOMINATOR is checked. How many pages a human actually signed is a claim about what
// a person did, which no script can verify and which this file must not appear to; the covered
// count is read out beside it so the gap is visible, and a reader is told it is unchecked.
const signoff = readFileSync(`${repoRoot}CHANGELOG.md`, 'utf8')
  .match(/signature covers (\d+) of the (\d+) pages the build produces other than the 404/);
const contentPages = pages.filter((f) => !f.endsWith('404.html')).length;
let signedCovered = null;
if (!signoff) {
  errors.push('CHANGELOG.md: the review sign-off sentence naming how many pages the signature covers is gone or reworded. It is the last promise /sources-and-method/ makes; if it moved, move this check with it.');
} else {
  signedCovered = Number(signoff[1]);
  const claimed = Number(signoff[2]);
  if (claimed !== contentPages) {
    errors.push(`CHANGELOG.md: the review sign-off says the build produces ${claimed} pages other than the 404 and it produces ${contentPages}. A page was added or removed and the signature's scope was not revisited, which is the defect the entry itself is about. Correct the count, and name any page standing outside the signature rather than absorbing it.`);
  }
  if (signedCovered > contentPages) {
    errors.push(`CHANGELOG.md: the review sign-off claims to cover ${signedCovered} pages and the build produces ${contentPages} other than the 404. A signature cannot cover more pages than exist.`);
  }
}

// --- the review footer, checked against whether the page has a figure to be true about ---
// The shared footer states "Its figures are not a live count" under a page's
// review date. It used to state it unconditionally, so it rendered under /about/,
// /common-claims/, /style-guide/ and the 404, none of which prints a figure at all: a sentence
// about figures on a page that has none is not a small imprecision on a site whose subject is
// statements that describe nothing.
//
// The template decides by testing its own rendered content, and this checks the decision at the
// end where the truth is. Compared BOTH ways, which is this project's rule for comparing two
// sets: one direction catches the sentence returning to a page with no figures, the other
// catches a page that gained figures and lost the sentence, which is the failure the first
// direction cannot see and the one a front-matter flag would have shipped.
// The matched phrase has to be one the OLD sentence did not contain, or this check passes on
// both wordings and silently stops telling them apart. "Its figures were the latest published
// at that date, not a live count" contains "not a live count", so matching that alone would
// have been satisfied by the sentence this change exists to retire. "Its figures are not"
// appears in the new sentence and in no version of the old one.
const FIGURE_CURRENCY = 'Its figures are not a live count';
let footerPages = 0;
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const where = `/${relative(siteDir, file).replace(/\\/g, '/')}`;
  const claimsFigures = html.includes(FIGURE_CURRENCY);
  const hasFigures = html.includes('data-metric="');
  if (!html.includes('This page was last reviewed on')) continue;
  footerPages += 1;
  if (claimsFigures && !hasFigures) {
    errors.push(`${where}: the review footer says "${FIGURE_CURRENCY}", and the page renders no figure. Either the page lost its figures or the condition in content/_includes/base.njk stopped being asked.`);
  }
  if (!claimsFigures && hasFigures) {
    errors.push(`${where}: the page renders a figure and the review footer does not say the figures are not a live count. The carriesAFigure filter missed a route that puts a figure on a page.`);
  }
  // The date in that sentence is derived by the figure-currency transform from the records the
  // page renders. A page it could not date keeps the word "pending", and that must fail rather
  // than ship: a footer promising a currency date and printing a placeholder is worse than the
  // welded sentence this replaced. Two pages have no citation block at all, so the token route is
  // the only thing dating them, and nothing else would notice if it stopped resolving.
  if (claimsFigures) {
    const stamped = /<time class="figure-currency" datetime="(\d{4}-\d{2}-\d{2})">/.exec(html);
    if (!stamped) {
      errors.push(`${where}: the review footer says when its figures were checked and carries no resolved date. The figure-currency transform in eleventy.config.js found no data-metric ref and no citation datetime on this page, so it left the placeholder.`);
    } else if (stamped[1] > new Date().toISOString().slice(0, 10)) {
      errors.push(`${where}: the review footer dates its figures to ${stamped[1]}, which is in the future.`);
    }
  }
}

// --- the sitemap, checked against the pages the build actually produced -----------------
// A generated list is only worth having if something asks whether it still matches. Compared
// BOTH ways, which is this project's rule for comparing two sets: one direction finds a page
// missing from the sitemap and no search engine is told the page exists, the other finds a URL
// in the sitemap that the build does not serve, which is a 404 offered to a crawler. The
// template filters on outputPath, so either could arrive from a template change alone.
//
// The base URL is imported rather than typed here. It is site.url in content/_data/site.js, the
// same value the template and every canonical link use, so this compares the sitemap against the
// build and not against a second opinion about where the site lives.
//
// 404.html is excluded on this side too. It excludes itself from collections in Eleventy, so the
// exclusion exists in two places by construction and this is the end that can see it.
let sitemapUrls = 0;
const sitemap = built.find((f) => f.endsWith('sitemap.xml'));
if (!sitemap) {
  errors.push('sitemap.xml: missing from the build, so no search engine is given the list of pages.');
} else {
  const listed = new Set([...readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const shouldList = new Set(pages.filter((f) => !f.endsWith('404.html')).map((f) =>
    `${site.url}/${relative(siteDir, f).replace(/index\.html$/, '').replace(/\\/g, '/')}`));
  sitemapUrls = listed.size;
  const unlisted = [...shouldList].filter((url) => !listed.has(url));
  const phantom = [...listed].filter((url) => !shouldList.has(url));
  if (unlisted.length) {
    errors.push(`sitemap.xml: does not list ${unlisted.join(', ')}, which the build serves. A page missing from the sitemap is a page a search engine is never told about. The usual cause is eleventyExcludeFromCollections in that page's front matter, which the sitemap template reads through collections.all and which is invisible from the page itself.`);
  }
  if (phantom.length) {
    errors.push(`sitemap.xml: lists ${phantom.join(', ')}, which the build does not serve. A crawler following that URL meets a 404.`);
  }
}

// --- the bar chart's text size, which the stylesheet and the estimator both hold -----------
// lib/charts.mjs estimates a label's width to decide the left gutter and whether a value fits
// inside its bar, and the size it estimates at must be the size the page renders. This exact
// mismatch produced a reader-facing blocker once: the estimator was calibrated against 13px text
// while the chart drew at 17px, and every y-axis label was clipped at the chart's left edge, so
// 1,500,000 rendered as "500,000". The bar chart then carried the same shape in miniature until
// 6 August 2026, measuring at 14 while the narrow rendering draws at 15.
//
// CSS cannot import anything, so the two cannot share one constant and are compared instead, on
// the same reasoning as the print stylesheet's hand-written domain below. Anchored to the
// declaration blocks rather than to their order in the file.
const stylesheet = readFileSync(`${repoRoot}content/assets/style.css`, 'utf8');
// Selectors are compared WHOLE, split out of each rule's selector list, not searched for as
// substrings. The first version matched `.bar-value` inside `.bar-value-renamed`, so renaming the
// class out from under this check left it reporting agreement with a rule that no longer styled
// anything. Found by probing the rename, not by reading the expression.
const rules = [...stylesheet.matchAll(/([^{}]+)\{([^}]*)\}/g)].map(([, selectors, body]) => ({
  selectors: selectors.split(',').map((one) => one.trim().split(/\s+/).filter(Boolean).join(' ')),
  body,
}));
const declaredSize = (selector) => {
  const match = rules.find((rule) => rule.selectors.includes(selector)
    && /font-size:\s*\d/.test(rule.body));
  const size = match && /font-size:\s*(\d+(?:\.\d+)?)px/.exec(match.body);
  return size ? Number(size[1]) : null;
};
for (const [key, expected] of Object.entries(BAR_FONT)) {
  const selector = key === 'narrow' ? '.chart-svg--narrow .bar-value' : '.bar-value';
  const rendered = declaredSize(selector);
  if (rendered === null) {
    errors.push(`content/assets/style.css: no font-size found for ${selector}, so BAR_FONT.${key} in lib/charts.mjs is checked against nothing. If the rule moved, move this check with it.`);
  } else if (rendered !== expected) {
    errors.push(`lib/charts.mjs BAR_FONT.${key} is ${expected} and content/assets/style.css renders ${selector} at ${rendered}px. The label-width estimator would measure text at the wrong size, which is how every y-axis label came to be clipped once. Change both or neither.`);
  }
}

// --- the accessibility page list, against the pages the build actually produced ---------
// `.pa11yci.json` names its URLs by hand, and until 6 August 2026 nothing compared that list
// with the build. A hand-maintained list fails by OMISSION, which is the worst direction: add a
// page, forget the list, and the run reports every URL clean while never opening the new one.
// This project has already been bitten by exactly that shape once, an accessibility pass
// reporting a full clean sweep with a live page absent from the list.
//
// Compared BOTH ways, on the same rule as the sitemap above. The other direction catches a URL
// the list still names after the page was renamed or removed: pa11y-ci fails on a 404 rather
// than passing silently, so that end is noisier, but it is the end that tells you which list is
// wrong.
//
// 404.html is INCLUDED here, unlike the sitemap, because it is a page a reader reaches and it
// carries navigation like any other. The list names it as /404.html, which is how the server
// serves it.
//
// The port is taken from whatever the list already uses rather than written here, so this
// compares paths and never disagrees with the runner about where the site is being served.
const pa11yConfigPath = `${repoRoot}.pa11yci.json`;
if (!existsSync(pa11yConfigPath)) {
  errors.push('.pa11yci.json: missing, so npm run a11y has no list of pages and would audit nothing.');
} else {
  const pa11yConfig = JSON.parse(readFileSync(pa11yConfigPath, 'utf8'));
  const listedPaths = new Set((pa11yConfig.urls ?? [])
    .map((entry) => (typeof entry === 'string' ? entry : entry.url))
    .filter(Boolean)
    .map((url) => url.replace(/^https?:\/\/[^/]+/, '') || '/'));
  const shouldAudit = new Set(pages.map((file) => {
    const rel = relative(siteDir, file).replace(/\\/g, '/');
    return rel === '404.html' ? '/404.html' : `/${rel.replace(/index\.html$/, '')}`;
  }));
  const unaudited = [...shouldAudit].filter((path) => !listedPaths.has(path));
  const phantomAudit = [...listedPaths].filter((path) => !shouldAudit.has(path));
  if (unaudited.length) {
    errors.push(`.pa11yci.json: does not list ${unaudited.join(', ')}, which the build serves. npm run a11y would report a clean sweep without ever opening ${unaudited.length === 1 ? 'that page' : 'those pages'}.`);
  }
  if (phantomAudit.length) {
    errors.push(`.pa11yci.json: lists ${phantomAudit.join(', ')}, which the build does not produce. pa11y-ci audits a 404 page under that URL, so the count it reports is not the count of this site's pages.`);
  }
}

// --- the domain, which the print stylesheet writes by hand ------------------------------
// CSS cannot read content/_data/site.js, and content/assets is copied rather than templated, so
// the print rule that appends this site's own domain to an internal link is the one place the
// domain is written twice. That is a second home for a fact, which this project refuses wherever
// it can, so the two are compared instead. It is not hypothetical: the domain moved on 4 August
// 2026, and a stale literal here would put the old address on every printed page, on the artefact
// a researcher files a citation from, with nothing on screen showing it.
// Anchored to the internal-link rule's own selector, not to the shape of its content string. The
// first version matched on the content alone, so deleting the rule fell through to the
// external-link rule one line below it, captured its empty prefix, and reported that the domain
// was wrong rather than that the rule was gone. Found by deleting it, not by reading this.
const printed = readFileSync(join(siteDir, 'assets/style.css'), 'utf8')
  .match(/main a\[href\^="\/"\]::after \{ content: " \(([^"]*)" attr\(href\)/);
const host = site.url.replace(/^https?:\/\//, '');
if (!printed) {
  errors.push('assets/style.css: the print rule that appends this site\'s domain to an internal link is gone, so a printed page gives no way to type its links back in.');
} else if (printed[1] !== host) {
  errors.push(`assets/style.css: the print rule prints "${printed[1]}" and site.url is "${host}". A printed page would send a reader to the wrong domain, and nothing on screen would show it.`);
}

// --- every "Cited for" name sits under the publication that is its source ---------------
// lib/citation.mjs guards its own merge against DROPPING a metric name. This is the other way
// the same feature goes wrong and that guard cannot see it: a name printed under the WRONG
// publication. It is the worse failure. The citation block exists to be pasted somewhere else,
// so a misattributed line hands a reader a figure credited to a source that never carried it,
// which is the error this entire site is about.
//
// At the far end, against the built HTML, for the reason every check in this file is: the map
// inside the transform can be right while what ships is not. This ran once as a sweep on
// 5 August 2026 and was reported in a pull request comment, which is the shape this project
// names in its own output, that printing is not reviewing and nothing checks anyone read it.
//
// The printed publication is source_name with `, table X` sometimes appended, so the test is
// that the line STARTS with a source_name the record carries, never that the two are equal.
// Entities are decoded first, because citation.mjs escapes & < > " on the way out and a name
// containing one would otherwise never match the record it came from.
//
// No guard on a missing source_name, and that is deliberate rather than an oversight: it is in
// validate-data.mjs's REQUIRED_FIELDS and every record carries one. A `continue` past a record
// without it would make this check quietly cover less than it says, which is the failure this
// file exists to prevent. If the contract ever changes, the crash here is the right outcome.
const unescape = (text) => text.replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&quot;/g, '"');
const metricSources = new Map();
for (const metric of registry().values()) {
  if (!metric.metric_name) continue;
  if (!metricSources.has(metric.metric_name)) metricSources.set(metric.metric_name, []);
  metricSources.get(metric.metric_name).push(metric.source_name);
}
let citedForNames = 0;
for (const file of pages) {
  const where = relative(siteDir, file);
  for (const [, item] of readFileSync(file, 'utf8').matchAll(/<li>([\s\S]*?)<\/li>/g)) {
    if (!item.includes('Cited for')) continue;
    const text = unescape(item.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
    const [publication, rest] = text.split('Cited for');
    const printed = publication.trim().replace(/\.$/, '').trim();
    for (const raw of rest.split('Published')[0].split('. ')) {
      const name = raw.trim().replace(/\.$/, '').trim();
      if (!name) continue;
      citedForNames += 1;
      const sources = metricSources.get(name);
      if (!sources) {
        errors.push(`${where}: a citation says "Cited for ${name}", which is the metric_name of no record. A name a reader can check against nothing is worse than no name at all.`);
      } else if (!sources.some((source) => printed.startsWith(source.replace(/\.$/, '')))) {
        errors.push(`${where}: a citation prints "Cited for ${name}" under "${printed}", and no record holding that metric_name names that publication as its source. A misattributed citation credits a figure to a source that never carried it.`);
      }
    }
  }
}

// robots.txt survives launch rather than being deleted, which the UX review asked for and
// backlog call 26 decided the content of. Until launch this block asserted the opposite of what
// it asserts now: that the wildcard group disallowed everything. Both versions exist for the same
// reason, that the file is the only statement of a site-wide decision and nothing else would
// notice it changing. What is checked now is the launch state: the site is crawlable, the sitemap
// is announced at the address site.url gives, and BOTH halves of call 26 hold: no admitted
// retrieval agent sits in a refusing group, and some group still refuses. It guarded the allow
// half alone until 11 August 2026, and the sentence here said so while README.md described it
// as asserting "the launch robots.txt state under call 26", which is twice what it did. Three ways past it were found by probing and are fixed below:
// a path form it could not read, a second wildcard group it never looked at, and the refuse
// half it never asked about. Each one passed while this printed that the site admits crawlers.
//
// The retrieval agents call 26 admits are NOT listed here. They are listed once, on the "# Admits:"
// comment line in content/robots.txt, and read out of it below. A copy here would be a second list
// of the same decision, which is the trap this project has fallen into twice, and the copy in the
// checker is the one that would win an argument with the published file while the reader saw the
// other. So the served artefact is the authority and this asserts it.
const robots = built.find((f) => f.endsWith('robots.txt'));
if (!robots) {
  errors.push('robots.txt: missing from the build. The Sitemap line and every call 26 refusal go with it, and nothing else in the built site states either.');
} else {
  const text = readFileSync(robots, 'utf8');
  // Groups are parsed as the spec defines them: consecutive User-agent lines share one group,
  // and a group ends at the first User-agent line that follows a directive. The previous parser
  // split before EVERY User-agent line, which was right for a file with one agent per group and
  // would read this file's refusal block as one group per agent, only the last of them carrying
  // the Disallow, and report every refusal above it as unrestricted. No count is written here:
  // the block's length is in the file and a number in this comment would be wrong the first time
  // somebody edits it, which is what happened to the version this sentence replaces.
  const groups = [];
  let group = null;
  for (const raw of text.split('\n')) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const agent = line.match(/^User-agent:\s*(\S+)/i);
    if (agent) {
      if (!group || group.directives.length) groups.push((group = { agents: [], directives: [] }));
      group.agents.push(agent[1]);
    } else if (group && !/^Sitemap:/i.test(line)) {
      // Sitemap is a non-group field in RFC 9309 and belongs to the file, not to whichever group
      // it happens to sit under. Collecting it as a directive was harmless for the two assertions
      // below, since neither reads anything but Disallow, and it broke the grouping rule this
      // parser exists to get right: a Sitemap line between a User-agent line and its first real
      // directive made `group.directives.length` truthy, so the NEXT User-agent line opened a new
      // group where the spec keeps both agents in one. An admitted agent sharing a blocking
      // group with a refused one would then be missed, which is the single thing this check is
      // here to catch. Probed in both directions rather than reasoned about.
      group.directives.push(line);
    }
  }
  // MATCHED ON THE PATH RATHER THAN ON THE WHOLE LINE, and the difference is not cosmetic. This
  // tested `/^Disallow:\s*\/\s*$/i`, one exact string, so `Disallow: /*` closed the site to every
  // wildcard-supporting crawler while this printed "admits crawlers". A path blocks everything when
  // it reduces to "/" with robots.txt wildcards taken out: "/" and "/*" both match every URL. "/$"
  // does NOT, because "$" anchors the end and so names the home page alone, and that exception is
  // the reason this is not simply a `startsWith('/')`. Probed in both directions.
  const blocksEverything = (g) => g.directives.some((d) => {
    const path = d.match(/^Disallow:\s*(\S+)\s*$/i)?.[1];
    return path !== undefined && path !== '/$' && /^\/\**\$?$/.test(path);
  });
  // EVERY wildcard group, not the first. RFC 9309 has a crawler obey the union of the groups
  // matching its name, so a second "User-agent: *" group carrying Disallow: / closes the site
  // while the first one still reads as open. `groups.find` returned that first group and this
  // reported the site crawlable. Probed by appending exactly such a group.
  const wildcardGroups = groups.filter((g) => g.agents.includes('*'));
  if (!wildcardGroups.length) {
    errors.push('robots.txt: no "User-agent: *" group. Every crawler not named in this file is then unaddressed, and what a site does with an unaddressed crawler is the crawler\'s choice rather than this site\'s.');
  } else if (wildcardGroups.some(blocksEverything)) {
    errors.push('robots.txt: a "User-agent: *" group disallows the whole site, so it is closed to search engines and to every retrieval agent. That was the pre-launch state. A crawler obeys every group naming it, so this fails on any of them, not only the first. If it is deliberate again, say so here rather than leaving this check to fail.');
  }
  // CALL 26'S REFUSE HALF, which nothing asserted until 11 August 2026: deleting the whole
  // training-crawler block passed this check and printed "admits crawlers", because every
  // assertion here read the allow half. Call 26 is a split rather than a permission, so a file
  // refusing nobody states one half of it and drops the other, and the wildcard group above then
  // admits every training crawler by omission. This asks only that some group refuses, because
  // WHICH crawlers is a dated snapshot the file itself says will go stale, and a list here would
  // be the second copy the comment above refuses to keep.
  if (!groups.some((g) => blocksEverything(g) && !g.agents.includes('*'))) {
    errors.push('robots.txt: no group refuses anything, so call 26\'s REFUSE half is gone and the open wildcard group admits every training crawler. Reversing that is a backlog change, not a deletion here.');
  }
  const sitemap = text.match(/^\s*Sitemap:\s*(\S+)\s*$/im);
  if (!sitemap) {
    errors.push('robots.txt: no Sitemap: line. The sitemap is built and listed in the site, but nothing announces it to a crawler that has not already found a page.');
  } else if (sitemap[1] !== `${site.url}/sitemap.xml`) {
    errors.push(`robots.txt: the Sitemap: line points at "${sitemap[1]}" and site.url gives "${site.url}/sitemap.xml". This file is passthrough-copied and cannot be templated, so the address is typed by hand and this is the only thing comparing it.`);
  }
  // `[^\S\n]` and not `\s`, which was the first version and was wrong: `\s` matches a newline, so
  // `\s*(.+)` on an EMPTY "# Admits:" line consumed the line break and captured the NEXT line,
  // giving one admitted agent named "#" and a passing build. Found by probing the check rather
  // than by reading it, and it is the exact failure a check written to guard a list can have.
  const admits = text.match(/^#[^\S\n]*Admits:[^\S\n]*(.*)$/im);
  if (!admits || !admits[1].trim()) {
    errors.push('robots.txt: no "# Admits:" comment line, or it names nothing. That line is the only statement of which retrieval agents call 26 lets in, and without it this check has nothing to assert and would pass on an empty set.');
  } else {
    const admitted = admits[1].split(',').map((a) => a.trim()).filter(Boolean);
    for (const g of groups.filter(blocksEverything)) {
      for (const agent of g.agents.filter((a) => admitted.includes(a))) {
        errors.push(`robots.txt: ${agent} is on the "# Admits:" line and also in a group that disallows everything, so this file states call 26 and contradicts it. Reversing the decision is a backlog change, not a line here.`);
      }
    }
  }
}

// A CITATION PROTECTS THE VALUE AND NEVER THE SENTENCE AROUND IT, which this site publishes as
// a limit. On 27 August 2026 that let two live sentences state the year ending March 2026 beside
// a figure from the year ending June 2026, and both had survived a sweep of content/ because the
// phrase wrapped across source lines: one line ended "year ending March" and the next began
// "2026.". The built page is where that wrap is gone, so this reads the output, not the source.
//
// DELIBERATELY NARROW. Only a sentence stating exactly ONE period and citing exactly ONE record
// is judged. A sentence naming two periods, or two figures, is ordinary on this site and is
// skipped rather than guessed at: a first draft that judged those too produced four false hits in
// seven, every one a card's citation block running into the next card's.
const MONTH_NAMES = 'January|February|March|April|May|June|July|August|September|October|November|December';
const STATED_PERIOD = new RegExp('(?:year ending|year to|quarter to|as at \\d{1,2}) (' + MONTH_NAMES + ') (\\d{4})', 'g');
const REF_MARKER = /\[\[([a-z]+\/[a-z0-9-]+)\]\]/g;
const periodRecords = registry();
let periodSentences = 0;

for (const file of pages) {
  const where = relative(siteDir, file);
  // A citation block names the EDITION a figure was read from, which is a different thing from
  // the period the figure covers and is legitimately "year ending March 2026" beside a 2022 peak.
  // Scanning those produced two false hits on the first run, both a card's source line.
  const marked = readFileSync(file, 'utf8')
    .replace(/<p[^>]*class="[^"]*source[^"]*"[\s\S]*?<\/p>/g, ' ')
    .replace(/<span[^>]*data-metric="([^"]+)"[^>]*>/g, ' [[$1]] ');
  const text = unescape(marked.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

  for (const sentence of text.split(/(?<=\.)\s+/)) {
    const periods = [...new Set([...sentence.matchAll(STATED_PERIOD)].map((m) => m[1] + ' ' + m[2]))];
    const refs = [...new Set([...sentence.matchAll(REF_MARKER)].map((m) => m[1]))]
      .filter((r) => periodRecords.has(r));
    if (periods.length !== 1 || refs.length === 0) continue;
    periodSentences += 1;
    // At least one cited figure must actually be from the period the sentence states. Requiring
    // ALL of them to be would fire on an ordinary sentence that names a current figure and a
    // historical peak in one breath; requiring exactly one ref, as this first did, skipped the
    // defect it was written for, because the sentence that carried it cited two.
    const covers = refs.filter((r) => periodRecords.get(r).period_label.includes(periods[0]));
    if (covers.length === 0) {
      errors.push(where + ': "' + sentence.trim().slice(0, 120) + '" states ' + periods[0]
        + ', and no figure it cites is from that period: '
        + refs.map((r) => r + ' covers "' + periodRecords.get(r).period_label + '"').join('; '));
    }
  }
}

if (errors.length) {
  console.error(`Build checks failed, ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

const internal = pages.reduce((n, f) => n + internalHrefs(readFileSync(f, 'utf8')).length, 0);
console.log(`Every "Cited for" line in the built site names a figure whose own record cites the publication it is printed under: ${citedForNames} name(s) checked. Not established: that the publication contains the figure, which is the far-end trace no check does.`);
console.log(`Build checks passed: ${pages.length} pages; ${internal} internal links and all same-page fragments resolve; no id is on two elements; no "User-agent: *" group disallows the site, robots.txt announces the sitemap at ${site.url}/sitemap.xml, no agent on its "# Admits:" line sits in a refusing group, and some group still refuses. Not established: that the agents it names are the right ones, which is a dated snapshot of other companies' documentation and is a reading, not a check.`);
console.log(`The review sign-off in CHANGELOG.md names ${contentPages} page(s) other than the 404, which is what this build produced, and says the signature covers ${signedCovered}. Not established: that a human reviewed that many, which is a claim about a person; only the denominator is checked here, and the ${contentPages - signedCovered} page(s) outside it have to be named in the entry by hand.`);
// The line below names a check that runs in eleventy.config.js rather than here, because a check
// nobody can see in a run is a check nobody maintains.
console.log(`${footerPages} page(s) carry a review footer, and on each one "${FIGURE_CURRENCY}" is present exactly where the page renders a figure, matched in both directions. The date in that sentence is compared against a second derivation from each page's own declaration by the figure-currency-audit transform in eleventy.config.js, which fails the build where the footer claims a figure was checked later than it was. Not established, there or here: that the date is not needlessly OLD, which understates this site's currency rather than overstating it, and that a page whose only figures arrive by a \`"ref" | metric\` chart summary carries the sentence at all. That question is asked above from \`data-metric\`, which every published route emits except that one; the chart-bar and dashboard-card routes were blind to it until 18 August 2026.`);
console.log(`sitemap.xml lists ${sitemapUrls} URLs, the built pages other than 404.html, matched in both directions. Not established: that the URLs resolve once deployed, which is a claim about the host rather than the build.`);
console.log(`${counts.published} of ${counts.records} records reach a reader, ${counts.reserve} are unpublished reserve, and the counts on /sources-and-method/ render from that rather than being typed.`);
console.log(`Of those, ${inOutput.size} are confirmed in the built HTML, outside comments: every ref counted from a token must appear there, and every ref appearing there must be one this site counts as published. Not established: that the other ${counts.published - inOutput.size}, reaching a reader only through a \`"ref" | metric\` chart summary, render at all. That route interpolates a bare number into a concatenated string with no element to carry an attribute, and the string is escaped into the chart's SVG <desc> as its accessible description, so tracing it means holding the same sentence in two forms rather than adding a wrapper. The chart-bar and dashboard-card routes were in this residual until 18 August 2026 and now name their record.`);
console.log(`Structured data: ${[...ldTypes].map(([url, types]) => `${url} ${[...types].sort().join(', ')}`).join('; ')}. Every block parses and every URL in one that points at this site resolves. Not established: that a consumer accepts the vocabulary, which is a claim about a schema and about Google rather than about this build.`);
console.log(`${periodSentences} sentence(s) in the built site state exactly one period beside at least one cited figure, and in each the stated period is one that some figure it cites actually covers. Not established: a sentence naming two periods, which is skipped as ordinary here; whether the OTHER figures in such a sentence belong to that period; and anything about the VERB around a figure, which stays the published limit.`);
console.log('External source URLs are not checked here, run npm run check-sources.');
