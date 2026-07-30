import { readFileSync, readdirSync } from 'node:fs';

import { barChart, lineChart } from './lib/charts.mjs';
import { CADENCED_SOURCES, publishedCounts } from './lib/published.mjs';
import { readSeries } from './lib/series.mjs';

const read = (file) => JSON.parse(readFileSync(new URL(`./data/${file}`, import.meta.url), 'utf8'));

const THEME_FILES = ['migration.json', 'asylum.json', 'population.json', 'fiscal.json'];

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

  eleventyConfig.addFilter('number', (value) =>
    value === null || value === undefined ? '' : Number(value).toLocaleString('en-GB'));

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
      const value = key === 'other-figures' ? counts.otherFigures
        : key === 'other-publishers' ? counts.otherPublishers
        : CADENCED_SOURCES.includes(key) ? counts.bySource.get(key)
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

  eleventyConfig.addTransform('heading-anchors', function (content) {
    if (!(this.page.outputPath ?? '').endsWith('.html')) return content;
    return content.replace(
      /<h([1-6])>(.*?)\s*\{#([a-z0-9-]+)\}<\/h\1>/g,
      (_, level, text, id) => `<h${level} id="${id}">${text}</h${level}>`,
    );
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
    // A marker matching no table would ship as visible junk, which is exactly the failure
    // heading-anchors had once with {#anchor}. Throwing here is the only guard: check-build
    // scans for {{ }} and {#id} and knows nothing about this syntax.
    if (html.includes('{caption}')) {
      throw new Error(`${this.page.inputPath}: a {caption} marker is not immediately followed by a table, so it would ship as visible text on the page.`);
    }
    return html;
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
  const decodeEntities = (text) => text
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
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
