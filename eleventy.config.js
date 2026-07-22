import { readFileSync, readdirSync } from 'node:fs';

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

// A figure renders as its formatted value and nothing else — the unit is prose, written by
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

  eleventyConfig.addCollection('claims', (api) =>
    api.getFilteredByGlob('content/claims/*.md').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)));

  // Token resolution runs on the rendered HTML, after markdown and layouts. Anything
  // unresolved throws rather than shipping a literal {{...}} to a reader.
  //
  // Two wrinkles, both from markdown running first. It escapes the ">" in a partial to
  // "&gt;", and it wraps a partial sitting on its own line in a <p> — which would nest a
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
  // renders as visible junk inside the heading and every link to a definition is dead —
  // which is exactly what shipped until the built page was actually looked at.
  eleventyConfig.addTransform('heading-anchors', function (content) {
    if (!(this.page.outputPath ?? '').endsWith('.html')) return content;
    return content.replace(
      /<h([1-6])>(.*?)\s*\{#([a-z0-9-]+)\}<\/h\1>/g,
      (_, level, text, id) => `<h${level} id="${id}">${text}</h${level}>`,
    );
  });

  return { markdownTemplateEngine: false, htmlTemplateEngine: 'njk' };
}
