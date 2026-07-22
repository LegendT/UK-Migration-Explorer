// Charts rendered as inline SVG at build time. No JavaScript, no dependency, no external
// request — the chart is in the HTML, so it works with scripting off and needs no exception
// to the site's content security policy.
//
// Three rules from the foundation document are enforced here rather than left to the author:
//
//   1. The y-axis always starts at zero. A truncated axis exaggerates change, and this site
//      exists to correct exactly that kind of misuse.
//   2. Every chart carries its data as a real table, so it is readable by screen readers and
//      by anyone who wants the numbers rather than the shape.
//   3. Nothing is distinguished by colour alone. Series are labelled directly at the end of
//      the line and differ in stroke pattern.

const escape = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const format = (value) => Number(value).toLocaleString('en-GB');

const W = 760;
const H = 340;
const PAD = { top: 20, right: 118, bottom: 44, left: 68 };

// Round the axis top to something a reader can hold in their head.
function niceMax(value) {
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / (magnitude / 2)) * (magnitude / 2);
}

function ticks(max, count = 4) {
  return Array.from({ length: count + 1 }, (_, i) => (max / count) * i);
}

/**
 * A line chart over years.
 * series: [{ name, points: [{ year, value }], dashed }]
 */
export function lineChart({ id, series, title, summary, unit, source, sourceUrl, note, breakAfter }) {
  const years = [...new Set(series.flatMap((s) => s.points.map((p) => p.year)))].sort();
  const max = niceMax(Math.max(...series.flatMap((s) => s.points.map((p) => p.value))));
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (year) => PAD.left + ((year - years[0]) / (years.at(-1) - years[0])) * plotW;
  const y = (value) => PAD.top + plotH - (value / max) * plotH;

  const yTicks = ticks(max).map((v) => `
    <line class="grid" x1="${PAD.left}" y1="${y(v)}" x2="${PAD.left + plotW}" y2="${y(v)}"></line>
    <text class="axis" x="${PAD.left - 10}" y="${y(v) + 4}" text-anchor="end">${format(v)}</text>`).join('');

  // Label every other year on narrow ranges, fewer on long ones, so labels never collide.
  const step = Math.ceil(years.length / 8);
  const xTicks = years.filter((_, i) => i % step === 0 || i === years.length - 1).map((year) => `
    <text class="axis" x="${x(year)}" y="${H - PAD.bottom + 22}" text-anchor="middle">${year}</text>`).join('');

  const lines = series.map((s, i) => {
    const d = s.points.map((p, j) => `${j ? 'L' : 'M'}${x(p.year).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
    const last = s.points.at(-1);
    return `
    <path class="series series-${i}${s.dashed ? ' dashed' : ''}" d="${d}"></path>
    ${s.points.map((p) => `<circle class="marker series-${i}" cx="${x(p.year).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3"></circle>`).join('')}
    <text class="series-label series-${i}" x="${x(last.year) + 8}" y="${y(last.value) + 4}">${escape(s.name)}</text>`;
  }).join('');

  // A methodology break is a fact about the data, not a footnote. It is drawn.
  const breakLine = breakAfter ? `
    <line class="break" x1="${x(breakAfter + 0.5)}" y1="${PAD.top}" x2="${x(breakAfter + 0.5)}" y2="${PAD.top + plotH}"></line>
    <text class="break-label" x="${x(breakAfter + 0.5) + 6}" y="${PAD.top + plotH - 8}">methodology change</text>` : '';

  const rows = years.map((year) => `<tr><th scope="row">${year}</th>${series
    .map((s) => {
      const point = s.points.find((p) => p.year === year);
      return `<td>${point ? format(point.value) : '<span class="nodata">not published</span>'}</td>`;
    }).join('')}</tr>`).join('');

  return `
<figure class="chart" id="${escape(id)}">
  <figcaption>
    <h3>${escape(title)}</h3>
    <p class="chart-summary">${escape(summary)}</p>
  </figcaption>
  <div class="scroll-x">
    <svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-labelledby="${escape(id)}-t ${escape(id)}-d">
      <title id="${escape(id)}-t">${escape(title)}</title>
      <desc id="${escape(id)}-d">${escape(summary)} Full figures are in the table below the chart.</desc>
      <text class="axis-title" x="${PAD.left}" y="12" text-anchor="start">${escape(unit)}</text>
      ${yTicks}
      <line class="axis-line" x1="${PAD.left}" y1="${PAD.top + plotH}" x2="${PAD.left + plotW}" y2="${PAD.top + plotH}"></line>
      ${breakLine}
      ${xTicks}
      ${lines}
    </svg>
  </div>
  ${note ? `<p class="chart-note">${note}</p>` : ''}
  <details class="chart-data">
    <summary>Show the figures behind this chart</summary>
    <div class="scroll-x">
      <table>
        <caption>${escape(title)} — ${escape(unit)}</caption>
        <thead><tr><th scope="col">Year</th>${series.map((s) => `<th scope="col">${escape(s.name)}</th>`).join('')}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </details>
  <p class="chart-source">Source: <a href="${escape(sourceUrl)}">${escape(source)}</a>. The vertical axis starts at zero.</p>
</figure>`;
}

/**
 * A horizontal bar chart for a small set of categories in one period.
 * bars: [{ name, value, note }]
 */
export function barChart({ id, bars, title, summary, unit, source, sourceUrl, note }) {
  const max = niceMax(Math.max(...bars.map((b) => b.value)));
  const rowH = 52;
  const labelW = 210;
  const height = bars.length * rowH + 46;
  const plotW = W - labelW - 90;

  const rows = bars.map((bar, i) => {
    const width = (bar.value / max) * plotW;
    const top = i * rowH + 8;
    return `
    <text class="bar-label" x="${labelW - 12}" y="${top + 26}" text-anchor="end">${escape(bar.name)}</text>
    <rect class="bar" x="${labelW}" y="${top + 8}" width="${width.toFixed(1)}" height="26" rx="2"></rect>
    <text class="bar-value" x="${labelW + width + 10}" y="${top + 26}">${format(bar.value)}</text>`;
  }).join('');

  return `
<figure class="chart" id="${escape(id)}">
  <figcaption>
    <h3>${escape(title)}</h3>
    <p class="chart-summary">${escape(summary)}</p>
  </figcaption>
  <div class="scroll-x">
    <svg viewBox="0 0 ${W} ${height}" class="chart-svg" role="img" aria-labelledby="${escape(id)}-t ${escape(id)}-d">
      <title id="${escape(id)}-t">${escape(title)}</title>
      <desc id="${escape(id)}-d">${escape(summary)} Full figures are in the table below the chart.</desc>
      ${rows}
      <line class="axis-line" x1="${labelW}" y1="${bars.length * rowH + 10}" x2="${labelW + plotW}" y2="${bars.length * rowH + 10}"></line>
      <text class="axis" x="${labelW}" y="${bars.length * rowH + 30}">0</text>
      <text class="axis" x="${labelW + plotW}" y="${bars.length * rowH + 30}" text-anchor="end">${format(max)}</text>
    </svg>
  </div>
  ${note ? `<p class="chart-note">${note}</p>` : ''}
  <details class="chart-data">
    <summary>Show the figures behind this chart</summary>
    <div class="scroll-x">
      <table>
        <caption>${escape(title)} — ${escape(unit)}</caption>
        <thead><tr><th scope="col">Category</th><th scope="col">${escape(unit)}</th><th scope="col">What it counts</th></tr></thead>
        <tbody>${bars.map((b) => `<tr><th scope="row">${escape(b.name)}</th><td>${format(b.value)}</td><td>${escape(b.note ?? '')}</td></tr>`).join('')}</tbody>
      </table>
    </div>
  </details>
  <p class="chart-source">Source: <a href="${escape(sourceUrl)}">${escape(source)}</a>. The axis starts at zero.</p>
</figure>`;
}
