// Charts rendered as inline SVG at build time. No JavaScript, no dependency, no external
// request, the chart is in the HTML, so it works with scripting off and needs no exception
// to the site's content security policy.
//
// Four rules are enforced here rather than left to the author. The first three come from
// the foundation document; the fourth was added on 23 July, when the design round found
// that the axis was labelled in numbers nobody reads:
//
//   1. The y-axis always starts at zero. A truncated axis exaggerates change, and this site
//      exists to correct exactly that kind of misuse.
//   2. Every chart carries its data as a real table, so it is readable by screen readers and
//      by anyone who wants the numbers rather than the shape.
//   3. Nothing is distinguished by colour alone. Series are labelled directly at the end of
//      the line and differ in stroke pattern.
//   4. Gridlines fall on an interval a reader counts in, chosen before the axis top rather
//      than by dividing it into four. See scale() below.
//
// The control that opens the figures names its own chart. Three charts on a page meant
// three controls all called "Show the figures behind this chart", opening three different
// tables: a keyboard or screen reader user moving between them, or listing the page's
// controls, had nothing to tell them apart. The chart title is appended out of sight, so
// the visible label is unchanged and stays a substring of the accessible name.
//
// The image takes its NAME from the title and its DESCRIPTION from the summary. Pointing
// aria-labelledby at both, which is what it did, concatenated them into one name and left
// the summary as the description as well, so a screen reader read the whole summary
// sentence twice before reaching the chart. Read out of Chrome's accessibility tree, which
// is the tree assistive technology consumes; the markup alone did not show it.

const escape = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const format = (value) => Number(value).toLocaleString('en-GB');

const W = 760;
const H = 340;
const PAD = { top: 20, right: 118, bottom: 44, left: 68 };

// Series labels sit right of the last point, so the right margin must fit the longest of
// them, and the y-axis tick labels sit left of the plot, so the left margin must fit the
// widest of those. Both margins are measured from the text; PAD gives the floor, not the
// default: a short label leaves the old fixed margin in place rather than widening the
// plot, which keeps every line chart on the site the same shape.
//
// The width is estimated, not measured, because there is no layout engine at build time.
// 0.56em per character, plus clearance. The first estimate here was 7.3px per character,
// calibrated against 13px text before the chart text was raised to 17px, and the stale
// calibration clipped every y-axis label at the SVG's left edge: "1,000,000" lost its
// leading digits and read as a different, plausible, wrong number. If a chart text size
// changes in style.css, this factor is the other half of that change.
const labelWidth = (text, fontSize = 17) => Math.ceil(String(text).length * fontSize * 0.56) + 14;

// Gridlines a reader can hold in their head, which means choosing the interval first and
// letting the axis top follow from it. Rounding the top and then cutting it into four gave
// a round top and unreadable lines between: 900,000 in quarters is 225,000, 450,000,
// 675,000. Three of the four line charts on the site were labelled that way.
const STEPS = [0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5];

function scale(dataMax) {
  const magnitude = 10 ** Math.floor(Math.log10(dataMax));
  const candidates = STEPS.map((multiple) => {
    const step = multiple * magnitude;
    return { step, count: Math.ceil(dataMax / step) };
  });
  // Four to six intervals reads well over a plot this tall. Falling back to the finest
  // step that is not busier than six keeps the axis defined whatever the data does.
  const { step, count } = candidates.find((c) => c.count >= 4 && c.count <= 6)
    ?? candidates.find((c) => c.count <= 6)
    ?? candidates.at(-1);
  return { max: step * count, ticks: Array.from({ length: count + 1 }, (_, i) => i * step) };
}

/**
 * A line chart over years.
 * series: [{ name, points: [{ year, value }], dashed }]
 */
export function lineChart({ id, series, title, summary, unit, source, sourceUrl, note, breakAfter }) {
  const years = [...new Set(series.flatMap((s) => s.points.map((p) => p.year)))].sort();
  const { max, ticks: yValues } = scale(Math.max(...series.flatMap((s) => s.points.map((p) => p.value))));
  const rightPad = Math.max(PAD.right, ...series.map((s) => labelWidth(s.name)));
  const leftPad = Math.max(PAD.left, labelWidth(format(max)));
  const plotW = W - leftPad - rightPad;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (year) => leftPad + ((year - years[0]) / (years.at(-1) - years[0])) * plotW;
  const y = (value) => PAD.top + plotH - (value / max) * plotH;

  const yTicks = yValues.map((v) => `
    <line class="grid" x1="${leftPad}" y1="${y(v)}" x2="${leftPad + plotW}" y2="${y(v)}"></line>
    <text class="axis" x="${leftPad - 10}" y="${y(v) + 4}" text-anchor="end">${format(v)}</text>`).join('');

  // Label every other year on narrow ranges, fewer on long ones, so labels never collide.
  // The last year is always labelled, so a stepped label lands next to it whenever the
  // range does not divide evenly, and the two crowd: "2024 2025". Drop the stepped one
  // when it falls within a step of the end.
  const step = Math.ceil(years.length / 8);
  const last = years.length - 1;
  const xTicks = years.filter((_, i) => i === last || (i % step === 0 && last - i >= step)).map((year) => `
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
  //
  // AND IT IS SAID, not only drawn, because the drawing reaches one kind of reader. The SVG carries
  // role="img", so its child <text> is presentational: a screen reader gets the title and the desc
  // and nothing else from inside the image, and the data table is bare year-and-value rows. Two
  // charts on this site set breakAfter; one disclosed the break in its hand-written note and the
  // other did not, so a table reader compared figures either side of a methodology change with
  // nothing telling them so. That is the misuse this site exists to correct, on the site itself.
  //
  // Setting breakAfter now emits the caution into the desc and the table as well as onto the plot,
  // so the next chart to set it cannot repeat the omission. An author's note may still add detail;
  // it is no longer what stands between a reader and the fact.
  // Deliberately names no year. breakAfter is drawn between two years, while a real methodology
  // change lands on a date inside one of them: ONS's is June 2021 against a breakAfter of 2020. A
  // generated sentence naming a year would be less precise than the author's own note and could
  // read as contradicting it. This states the fact and leaves the date to the note.
  const breakNote = breakAfter
    ? 'Figures either side of the methodology change marked on the chart are not directly comparable.'
    : '';
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
    <svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-labelledby="${escape(id)}-t" aria-describedby="${escape(id)}-d">
      <title id="${escape(id)}-t">${escape(title)}</title>
      <desc id="${escape(id)}-d">${escape(summary)}${breakNote ? ` ${escape(breakNote)}` : ''} Full figures are in the table below the chart.</desc>
      <text class="axis-title" x="${leftPad}" y="12" text-anchor="start">${escape(unit)}</text>
      ${yTicks}
      <line class="axis-line" x1="${leftPad}" y1="${PAD.top + plotH}" x2="${leftPad + plotW}" y2="${PAD.top + plotH}"></line>
      ${breakLine}
      ${xTicks}
      ${lines}
    </svg>
  </div>
  ${note ? `<p class="chart-note">${escape(note)}</p>` : ''}
  <details class="chart-data">
    <summary>Show the figures behind this chart<span class="visually-hidden">: ${escape(title)}</span></summary>
    ${breakNote ? `<p class="chart-note">${escape(breakNote)}</p>` : ''}
    <div class="scroll-x">
      <table>
        <caption>${escape(title)} (${escape(unit)})</caption>
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
  const { max } = scale(Math.max(...bars.map((b) => b.value)));
  const rowH = 52;
  // The category gutter is measured from the longest name, the way the line chart measures
  // its right margin. A fixed 210 happened to fit today's longest label and would have
  // clipped the next one added, silently and only on the left.
  const labelW = Math.max(210, ...bars.map((b) => labelWidth(b.name, 14)));
  const height = bars.length * rowH + 46;
  const plotW = W - labelW - 90;

  const rows = bars.map((bar, i) => {
    const width = (bar.value / max) * plotW;
    const top = i * rowH + 8;
    // A bar near the axis maximum pushed its own value past the end of the scale, so a
    // number sat to the right of the gridline meaning more than it. Where the bar is long
    // enough to hold the value, it goes inside; short bars keep it outside, where there
    // is room. --paper on --accent is 8.1:1 light and 9.0:1 dark.
    const valueW = labelWidth(format(bar.value), 14);
    const inside = width > valueW + 24;
    return `
    <text class="bar-label" x="${labelW - 12}" y="${top + 26}" text-anchor="end">${escape(bar.name)}</text>
    <rect class="bar" x="${labelW}" y="${top + 8}" width="${width.toFixed(1)}" height="26" rx="2"></rect>
    <text class="bar-value${inside ? ' inside' : ''}" x="${(labelW + width + (inside ? -10 : 10)).toFixed(1)}" y="${top + 26}"${inside ? ' text-anchor="end"' : ''}>${format(bar.value)}</text>`;
  }).join('');

  return `
<figure class="chart" id="${escape(id)}">
  <figcaption>
    <h3>${escape(title)}</h3>
    <p class="chart-summary">${escape(summary)}</p>
  </figcaption>
  <div class="scroll-x">
    <svg viewBox="0 0 ${W} ${height}" class="chart-svg" role="img" aria-labelledby="${escape(id)}-t" aria-describedby="${escape(id)}-d">
      <title id="${escape(id)}-t">${escape(title)}</title>
      <desc id="${escape(id)}-d">${escape(summary)} Full figures are in the table below the chart.</desc>
      ${rows}
      <line class="axis-line" x1="${labelW}" y1="${bars.length * rowH + 10}" x2="${labelW + plotW}" y2="${bars.length * rowH + 10}"></line>
      <text class="axis" x="${labelW}" y="${bars.length * rowH + 30}">0</text>
      <text class="axis" x="${labelW + plotW}" y="${bars.length * rowH + 30}" text-anchor="end">${format(max)}</text>
    </svg>
  </div>
  ${note ? `<p class="chart-note">${escape(note)}</p>` : ''}
  <details class="chart-data">
    <summary>Show the figures behind this chart<span class="visually-hidden">: ${escape(title)}</span></summary>
    <div class="scroll-x">
      <table>
        <caption>${escape(title)} (${escape(unit)})</caption>
        <thead><tr><th scope="col">Category</th><th scope="col">${escape(unit)}</th><th scope="col">What it counts</th></tr></thead>
        <tbody>${bars.map((b) => `<tr><th scope="row">${escape(b.name)}</th><td>${format(b.value)}</td><td>${escape(b.note ?? '')}</td></tr>`).join('')}</tbody>
      </table>
    </div>
  </details>
  <p class="chart-source">Source: <a href="${escape(sourceUrl)}">${escape(source)}</a>. The axis starts at zero.</p>
</figure>`;
}
