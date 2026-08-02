import { readFileSync, readdirSync } from 'node:fs';

import { barChart, lineChart } from './lib/charts.mjs';
import { CADENCED_SOURCES, publishedCounts } from './lib/published.mjs';
import { THEME_FILES, readSeries } from './lib/series.mjs';

const read = (file) => JSON.parse(readFileSync(new URL(`./data/${file}`, import.meta.url), 'utf8'));


// One registry, keyed theme/id, matching what scripts/validate-content.mjs enforces.
const registry = new Map();
for (const file of THEME_FILES) {
  const theme = file.replace('.json', '');
  for (const metric of read(file).metrics ?? []) registry.set(`${theme}/${metric.id}`, metric);
}

const meta = read('meta.json');
const sources = read('sources.json').sources;

const escape = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// A figure renders as its formatted value and nothing else, the unit is prose, written by
// the author. See the token contract in docs/foundation.md section 15. The wrapper carries
// the metric id so a published figure can always be traced back to its record.
function renderFigure(ref) {
  const metric = registry.get(ref);
  if (!metric) throw new Error(`Unknown metric cited in content: ${ref}`);
  if (metric.value === null) throw new Error(`Metric ${ref} has no single value and cannot be rendered inline`);
  return `<span class="figure" data-metric="${escape(ref)}">${escape(metric.value.toLocaleString('en-GB'))}</span>`;
}

// Structural blocks rendered from the data layer rather than restated in prose, so a page
// describing the sources cannot drift from them.
const PARTIALS = {
  'sources-catalogue': () => `<div class="scroll-x"><table class="sources">
<caption class="visually-hidden">Sources used on this site</caption>
<thead><tr><th scope="col">Source</th><th scope="col">What it covers</th><th scope="col">Updated</th></tr></thead>
<tbody>${sources.map((s) => `<tr>
<th scope="row"><a href="${escape(s.url)}">${escape(s.name)}</a><span class="publisher">${escape(s.publisher)}</span></th>
<td>${escape(s.covers)}</td><td>${escape(s.updateFrequency)}</td></tr>`).join('')}</tbody></table></div>`,

  'confidence-levels': () => `<dl class="definitions">${Object.entries(meta.confidenceLevels)
    .map(([level, definition]) => `<dt>${escape(level)}</dt><dd>${escape(definition)}</dd>`).join('')}</dl>`,

  'key-caveats': () => `<ol class="caveats">${meta.keyCaveats.map((c) => `<li>${escape(c)}</li>`).join('')}</ol>`,
};

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory('content');
  eleventyConfig.setOutputDirectory('_site');
  eleventyConfig.setIncludesDirectory('_includes');
  eleventyConfig.setDataDirectory('_data');

  // Content files are NOT pre-processed as templates. {{theme/metric-id}} is this project's
  // own citation syntax and would otherwise be parsed as a Liquid expression, which would
  // silently break the guarantee that no figure is hard-coded in prose.
  eleventyConfig.setTemplateFormats(['md', 'njk', 'css']);
  eleventyConfig.setLiquidOptions({ strictFilters: false });
  eleventyConfig.setFrontMatterParsingOptions({ excerpt: false });

  eleventyConfig.addPassthroughCopy({ 'content/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'content/robots.txt': 'robots.txt' });

  eleventyConfig.addGlobalData('metrics', () => Object.fromEntries(registry));
  eleventyConfig.addGlobalData('meta', () => meta);
  eleventyConfig.addGlobalData('sources', () => sources);
  eleventyConfig.addGlobalData('dashboard', () => read('dashboard.json'));
  // The names come from lib/series.mjs, which is also where a metric's `series_ref` is
  // resolved. `series.flows` in a template and "flows@2025" in a data record therefore
  // cannot come to mean different things.
  eleventyConfig.addGlobalData('series', () => readSeries());

  // Line charts are built from series files. Bar charts cite records: a bar names a metric
  // and the value comes from that record, so a data update reaches the chart.
  eleventyConfig.addFilter('points', (data) =>
    data.map((point) => ({ year: Number(point.date.slice(0, 4)), value: point.value })));

  // A chart summary that names a single year of its own series cited that year by typing the
  // number, because no mechanism existed. The chart and the sentence describing it could
  // therefore drift apart in silence, and the series files are refreshed wholesale on every
  // release under the single-vintage rule, so they do move.
  //
  // A filter rather than a shortcode, because a summary is a Nunjucks string built with `~`
  // concatenation and a shortcode cannot be used inside one. It throws on a year the series
  // does not hold, exactly as the `metric` filter throws on an unknown ref: a summary quietly
  // rendering an empty string is the failure this is here to prevent.
  eleventyConfig.addFilter('at', (data, year) => {
    const point = data.find((p) => Number(p.date.slice(0, 4)) === Number(year));
    if (!point) {
      throw new Error(`No point for ${year} in this series. It holds ${data[0]?.date.slice(0, 4)} to ${data[data.length - 1]?.date.slice(0, 4)}.`);
    }
    return point.value;
  });
  // Markdown content cites figures as {{theme/id}}, which survives because markdown is not
  // pre-processed as a template. Nunjucks pages are pre-processed, so the same braces would
  // be evaluated as an expression and silently produce NaN, which shipped once. They use
  // this shortcode instead, which goes through exactly the same renderer.
  eleventyConfig.addShortcode('figure', (ref) => renderFigure(ref));
  eleventyConfig.addShortcode('lineChart', (options) => lineChart(options));

  // A bar names the metric it draws. A literal value here would be a second home for a
  // figure, outside the citation contract and invisible to a data update, which is exactly
  // what the sources page tells readers cannot happen. Refusing the literal is the only
  // version of that promise a reader can rely on.
  eleventyConfig.addShortcode('barChart', (options) => barChart({
    ...options,
    bars: options.bars.map((bar) => {
      if ('value' in bar) {
        throw new Error(`Bar "${bar.name}" in chart "${options.id}" carries a literal value. Cite a record with ref instead.`);
      }
      const metric = registry.get(bar.ref);
      if (!metric) throw new Error(`Bar "${bar.name}" in chart "${options.id}" cites ${bar.ref}, which is not a metric in the data layer`);
      if (typeof metric.value !== 'number') throw new Error(`Bar "${bar.name}" in chart "${options.id}" cites ${bar.ref}, which has no single value to draw`);
      return { ...bar, value: metric.value };
    }),
  }));

  // Resolve a dashboard card or denominator reference to the metric that owns it.
  eleventyConfig.addFilter('metric', (ref) => {
    const metric = registry.get(ref);
    if (!metric) throw new Error(`Unknown metric reference: ${ref}`);
    return metric;
  });

  // Throws rather than rendering an empty string. A range record's value is deliberately
  // null and a typoed property in a chart summary is undefined; either would otherwise ship
  // as an invisible blank in a sentence, which is the quiet failure renderFigure and the
  // `at` filter already refuse. The blank survived every check because it is not NaN and
  // leaves no literal behind for the longhand scan to find.
  //
  // `typeof value === 'number'` rather than a NaN test on the coercion, because `Number('')`,
  // `Number(false)` and `Number([])` are all 0: an empty string reached this filter, coerced, and
  // shipped a plausible "0" into a sentence, which is the same quiet failure one layer down from
  // the blank this guard was written for. Found by a second model. Numeric strings are refused
  // deliberately: everything that legitimately reaches here is a record value or a series point,
  // and both are numbers in the data layer by contract.
  eleventyConfig.addFilter('number', (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new Error(`The number filter received ${JSON.stringify(value)}. A summary citing a missing, misspelt, empty or range value must fail the build, not render a blank or a coerced zero.`);
    }
    return value.toLocaleString('en-GB');
  });

  // Front matter dates arrive as Date objects from the YAML parser; data-layer dates arrive
  // as ISO strings. Both are formatted in UTC so a date never shifts by a day.
  eleventyConfig.addFilter('longDate', (value) => {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) throw new Error(`Not a date: ${value}`);
    return date.toLocaleDateString('en-GB',
      { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  });

  eleventyConfig.addFilter('limit', (array, n) => array.slice(0, n));

  // The claims page states its own split. Typed by hand it was a number the next claim
  // added would silently falsify, on the page whose subject is other people's numbers.
  eleventyConfig.addFilter('countWhere', (items, key, value) =>
    items.filter((item) => item.data[key] === value).length);

  // A derived count still has to read like the sentence around it, which spells small
  // numbers out. Falls back to the numeral above ten, where prose would too.
  const SMALL_NUMBERS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  eleventyConfig.addFilter('inWords', (n) => SMALL_NUMBERS[n] ?? String(n));

  eleventyConfig.addCollection('claims', (api) =>
    api.getFilteredByGlob('content/claims/*.md').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)));

  // Token resolution runs on the rendered HTML, after markdown and layouts. Anything
  // unresolved throws rather than shipping a literal {{...}} to a reader.
  //
  // Two wrinkles, both from markdown running first. It escapes the ">" in a partial to
  // "&gt;", and it wraps a partial sitting on its own line in a <p>, which would nest a
  // table inside a paragraph. So block partials are unwrapped before anything else.
  const PARTIAL_TOKEN = String.raw`\{\{\s*(?:>|&gt;)\s*([a-z-]+)\s*\}\}`;

  eleventyConfig.addTransform('resolve-citations', function (content) {
    if (!(this.page.outputPath ?? '').endsWith('.html')) return content;
    const where = this.page.inputPath;

    const renderPartial = (name) => {
      if (!PARTIALS[name]) throw new Error(`Unknown partial {{> ${name} }} in ${where}`);
      return PARTIALS[name]();
    };

    return content
      .replace(new RegExp(String.raw`<p>\s*${PARTIAL_TOKEN}\s*</p>`, 'g'), (_, name) => renderPartial(name))
      .replace(new RegExp(PARTIAL_TOKEN, 'g'), (_, name) => renderPartial(name))
      .replace(/\{\{([^}]+)\}\}/g, (_, raw) => renderFigure(raw.trim()));
  });

  // Heading anchors. Markdown does not support {#id} natively, so without this the syntax
  // renders as visible junk inside the heading and every link to a definition is dead,
  // which is exactly what shipped until the built page was actually looked at.
  // The published-figure counts on /sources-and-method/ are derived here rather than typed.
  // That page is markdown, and markdownTemplateEngine is false site-wide so that {{theme/id}}
  // is a citation rather than an expression, which means a markdown page cannot call a filter
  // the way common-claims.njk calls countWhere for its direction split. The marker-and-
  // transform idiom {caption} and {#anchor} already use is what it has instead.
  //
  // Numerals in a table cell, words in prose, which is why there are two markers: a column of
  // 19 and 10 with "two" in the third row would be worse than what it replaced.
  eleventyConfig.addTransform('published-counts', function (content) {
    if (!(this.page.outputPath ?? '').endsWith('.html') || !content.includes('{count')) return content;
    const counts = publishedCounts();
    const html = content.replace(/\{count(-in-words)?:([a-z-]+)\}/g, (_, spelled, key) => {
      // Only the three cadenced publishers can be named directly, because the table that names
      // them is the update commitment and every other publisher is inside "the other N". The
      // narrow list is the guard: keyed on any source_id, a typo landing on a real publisher
      // renders a plausible wrong number beside a row naming a different one, and nothing on
      // the page or in any check would disagree. That is not hypothetical, it is what the
      // negative test for this branch did by accident.
      // A cadenced source with no published figures is a legal key whose count is zero, not
      // an illegal key: bySource holds only sources with at least one published ref, so
      // get() alone returned undefined the day a source's last figure was retired, and the
      // error below would have told the maintainer the key was not allowed, which is the
      // wrong diagnosis. The honest zero renders instead, where the commitment table shows it.
      const value = key === 'other-figures' ? counts.otherFigures
        : key === 'other-publishers' ? counts.otherPublishers
        : CADENCED_SOURCES.includes(key) ? (counts.bySource.get(key) ?? 0)
        : undefined;
      if (value === undefined) {
        throw new Error(`${this.page.inputPath}: {count:${key}} is not a key this page can ask for. Use one of ${CADENCED_SOURCES.join(', ')}, which are the releases the update commitment covers, or other-figures or other-publishers. A publisher outside that list is inside "the other N" and has no row of its own.`);
      }
      return spelled ? (SMALL_NUMBERS[value] ?? String(value)) : String(value);
    });
    if (/\{count(-in-words)?:/.test(html)) {
      throw new Error(`${this.page.inputPath}: a {count:...} marker did not resolve and would ship as visible text.`);
    }
    return html;
  });

  // A heading that declares no {#id} gets one derived from its own text. Doing it here rather
  // than by hand at each heading is the same reasoning scrollable-regions and table-captions
  // already use: a page added later cannot arrive without it, and the alternative was editing
  // fourteen pages to fix a defect the transform can close in one. Before this, two pages of
  // seventeen carried any heading id at all, so no section of a theme page could be linked to
  // by a reader composing a URL by hand, which is what the site asks journalists to do.
  //
  // And on the three theme pages, which is where the UX review found it, {#id} was never
  // available: `{#` opens a Nunjucks COMMENT, so writing an anchor the markdown way into a .njk
  // heading fails the build with "expected end of comment, got end of file". Confirmed by doing
  // it. The choice on those pages was a derived id or an id= attribute typed onto every heading.
  //
  // What it deliberately does not do, and the ceiling it has:
  //
  // The h1 is skipped. The page URL is already the link to the page.
  //
  // A heading inside a <figcaption> is skipped, because the <figure> around it already carries
  // an author-chosen id and that is the anchor a chart is linked by. Those titles also name a
  // period ("year ending March 2026"), so deriving an id from one would put a date that moves
  // on every release into a URL.
  //
  // A derived id that is already taken is not disambiguated with a suffix and the heading is
  // left without one. The single case on the site today is migration.njk's "Net migration over
  // time", whose slug is the id of the chart directly beneath it: /migration/#net-migration-
  // over-time therefore lands on the chart in the section the heading introduces, which is
  // where a reader linking to that heading wanted to go. A "-2" suffix would be a URL nobody
  // could guess and would renumber if a heading were added above it.
  //
  // The ceiling, and it is the reason {#id} still wins where it is declared: a derived id
  // changes if the heading is reworded, and nothing outside this repository can be told. A
  // link that has to survive rewording declares its own id, as the glossary and the sources
  // page do for every anchor another page links to. check-build.mjs catches the internal half,
  // because every same-page fragment and internal link is resolved against the built output.
  eleventyConfig.addTransform('heading-anchors', function (content) {
    if (!(this.page.outputPath ?? '').endsWith('.html')) return content;
    const declared = content.replace(
      /<h([1-6])>(.*?)\s*\{#([a-z0-9-]+)\}<\/h\1>/g,
      (_, level, text, id) => `<h${level} id="${id}">${text}</h${level}>`,
    );

    // Collected after the declared pass, so a hand-written anchor is never overwritten by a
    // derived one, and against every id in the document rather than only the headings': the
    // ids that collide here belong to charts and to <main>, not to other headings.
    const taken = new Set([...declared.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const captions = [...declared.matchAll(/<figcaption[\s\S]*?<\/figcaption>/g)]
      .map((m) => [m.index, m.index + m[0].length]);

    // stripTags is declared below this transform and decodes entities before stripping tags.
    // Both matter: a heading arrives here after resolve-citations, so it can hold markup, and
    // an entity left in place would put "quot" or "amp" inside a URL.
    return declared.replace(/<h([2-6])([^>]*)>([\s\S]*?)<\/h\1>/g, (whole, level, attrs, text, offset) => {
      if (/\sid=/.test(attrs)) return whole;
      if (captions.some(([from, to]) => offset >= from && offset < to)) return whole;
      const id = stripTags(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (!id || taken.has(id)) return whole;
      taken.add(id);
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    });
  });

  // Markdown has no caption syntax, so the four markdown tables on this site had none while
  // every table written by hand in Nunjucks carried one. That was an inconsistency with the
  // site's own practice rather than an accessibility failure: the transform below already
  // names their scrolling region from the heading above, but an aria-label is invisible to a
  // sighted reader and a caption is not.
  //
  // A paragraph reading {caption}Text immediately before a table becomes that table's
  // <caption>. Runs BEFORE scrollable-regions, which prefers a caption to a heading when
  // naming a region, so a captioned table is now named by its own caption.
  eleventyConfig.addTransform('table-captions', function (content) {
    if (!(this.page.outputPath ?? '').endsWith('.html')) return content;
    const html = content.replace(
      /<p>\{caption\}([\s\S]*?)<\/p>\s*(<table[^>]*>)/g,
      (_, text, open) => `${open}<caption>${text.trim()}</caption>`,
    );
    // Column headers in markdown tables ship as bare <th>. Every table written by hand and every
    // chart table carries scope; markdown-it emits none, so four tables on this site were the odd
    // ones out. Single-header-row tables infer reliably, so this is consistency rather than a 1.3.1
    // failure, and doing it here means the next markdown table cannot arrive without it.
    const scoped = html.replace(/<thead>([\s\S]*?)<\/thead>/g,
      (whole, inner) => `<thead>${inner.replace(/<th(?![^>]*\bscope=)/g, '<th scope="col"')}</thead>`);

    // A marker matching no table would ship as visible junk, which is exactly the failure
    // heading-anchors had once with {#anchor}. Throwing here is the only guard: check-build
    // scans for {{ }} and {#id} and knows nothing about this syntax.
    if (scoped.includes('{caption}')) {
      throw new Error(`${this.page.inputPath}: a {caption} marker is not immediately followed by a table, so it would ship as visible text on the page.`);
    }
    return scoped;
  });

  // Every table and every chart sits in a horizontally scrolling box. A box that scrolls
  // has to be reachable and operable by keyboard, which means it must be focusable and
  // must say what it is when focus lands on it. Doing that here rather than at each of the
  // nine places that write a .scroll-x means a table added later cannot arrive without it,
  // and it reaches the markdown tables, which had no wrapper at all: four of the sixteen
  // tables on the site could not scroll and so could not be read below about 420px.
  //
  // The name is taken from text already on the page, never invented: the table's own
  // caption where there is one, otherwise the heading the region sits under. It must run
  // AFTER heading-anchors, or a heading still carrying its {#anchor} syntax names the
  // region and ships the raw syntax inside an aria-label, where nothing on the page shows
  // it. check-build caught exactly that.
  // Entities are decoded, not just tags stripped, because the name goes straight back out
  // through escape() and would otherwise be escaped twice. A caption containing a quotation
  // mark arrives here as &quot; and shipped as &amp;quot; inside the aria-label, which a
  // screen reader reads out as the entity. Nothing on the page shows it, which is how the
  // {#anchor} version of this same fault survived until check-build caught it. Latent until
  // the first caption with a quote, an apostrophe or an ampersand, which is now on the site.
  // Numeric entities are decoded too: the five named ones cover everything markdown-it emits
  // for plain text, but a hand-authored caption can carry &#8217; or &#x2019;, and anything
  // outside the decoded set went back out through escape() double-escaped, the exact fault
  // this function exists to close.
  //
  // ORDER: numeric LAST, and it ran first until 2 August 2026 under a comment claiming the
  // opposite invariant. `&#38;` IS `&`, so decoding numerics first turned a hand-authored
  // `&#38;lt;` into `&lt;` and the named pass then turned that into `<`, manufacturing markup by
  // exactly the route "&amp; is decoded last so it cannot manufacture entities" said was closed.
  // Decoded last, `&#38;lt;` yields the literal text `&lt;`, which is what it means, and escape()
  // puts it back correctly. Found by a second model reading the comment against the code.
  //
  // A code point outside the Unicode range threw a raw RangeError with no clue which caption
  // carried it, so an unusable entity is now left as written for escape() to handle.
  const codePoint = (raw, base) => {
    const n = parseInt(raw, base);
    return n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : null;
  };
  const decodeEntities = (text) => text
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#x([0-9a-f]+);/gi, (whole, hex) => codePoint(hex, 16) ?? whole)
    .replace(/&#(\d+);/g, (whole, dec) => codePoint(dec, 10) ?? whole);
  const stripTags = (html) => decodeEntities(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();

  eleventyConfig.addTransform('scrollable-regions', function (content) {
    if (!(this.page.outputPath ?? '').endsWith('.html')) return content;

    // Wrap any table that is not already in one. A wrapper always sits immediately before
    // its table, so testing exactly that is both simpler and safer than counting divs.
    let html = content.replace(/<table[\s\S]*?<\/table>/g, (table, offset, whole) =>
      /<div class="scroll-x"[^>]*>\s*$/.test(whole.slice(0, offset))
        ? table
        : `<div class="scroll-x">${table}</div>`);

    // Name and expose each region. The inner match runs to the FIRST closing div, which is
    // correct only while a region holds nothing but a table or a chart. Assert that rather
    // than assume it: a div dropped inside one would close the match early and rewrite the
    // page's nesting, which produces no error anywhere and no visible symptom.
    html = html.replace(/<div class="scroll-x">([\s\S]*?)<\/div>/g, (whole, inner, offset) => {
      // Both ends, not just the opening one: a div dropped in AFTER the table would end the
      // match at that div's closing tag, and the captured inner would still begin with
      // <table and pass an opening-only check while the page's nesting was rewritten.
      if (!/^\s*<(table|svg)[\s>]/.test(inner) || !/<\/(table|svg)>\s*$/.test(inner)) {
        throw new Error(`A .scroll-x region in ${this.page.inputPath} holds something other than one table or one chart. This transform matches to the first closing tag and cannot nest.`);
      }
      const caption = inner.match(/<caption[^>]*>([\s\S]*?)<\/caption>/);
      const heading = [...html.slice(0, offset).matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/g)].pop();
      const name = stripTags(caption?.[1] ?? heading?.[2] ?? '');
      if (!name) throw new Error(`A scrollable region in ${this.page.inputPath} has no caption and no heading above it to name it`);
      return `<div class="scroll-x" tabindex="0" role="region" aria-label="${escape(name)}">${inner}</div>`;
    });

    return html;
  });

  return { markdownTemplateEngine: false, htmlTemplateEngine: 'njk' };
}
