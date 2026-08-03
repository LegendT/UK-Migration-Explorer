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

// TWO RENDERINGS PER CHART, because one SVG cannot serve both widths.
//
// SVG text is in viewBox units, so it scales with the chart. The wide chart is 760 units and
// `.chart-svg--wide` floors it at 32rem so its 17px text never renders below about 11px; inside
// a 280px column that floor is what made 45% of every chart sit off-screen at 320px, with the
// hidden strip holding the very years the summary sentence names. Scaling the same 760 units
// down to 280 would render that text at 6.3px, so the floor cannot simply be dropped.
//
// So a second, narrower rendering is emitted and CSS shows one or the other. The narrow one
// spends its width differently rather than shrinking: y labels sit INSIDE the plot above their
// gridline instead of in a 68px gutter, series are named in a legend above the plot instead of
// at the end of the line, and the bar chart puts each category name above its bar instead of in
// a 210px left gutter. All four enforced rules survive: the axis still starts at zero, the table
// is still emitted once, series still differ by stroke pattern and carry a direct text label,
// and the gridline interval is still chosen by scale().
//
// The hidden one is `display: none`, which takes it out of the accessibility tree, so a screen
// reader meets exactly one image. That is why each rendering needs its own title and desc ids:
// two elements may not share an id, and check-build refuses it.
const GEOM = {
  wide: { key: 'wide', W: 760, H: 340, pad: PAD, yInside: false, legend: false, xTarget: 8, barRow: 52, barGutter: 210, edgeAnchor: false },
  // pad.top carries three stacked things on narrow, and each needed the room: the unit line at
  // y=12, the legend at y=34, and the top gridline's own value label just above y=64. The first
  // draft put the legend at 34 with pad.top 52, and "Immigration" sat on top of "1,500,000".
  narrow: { key: 'narrow', W: 360, H: 300, pad: { top: 64, right: 10, bottom: 40, left: 2 }, yInside: true, legend: true, xTarget: 4, barRow: 66, barGutter: 0, edgeAnchor: true },
};

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

// The narrow chart's legend row, fixed to the top of the viewBox and below the unit line at y=12.
const LEGEND_Y = 30;

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
function linePlot({ series, unit, breakAfter }, g) {
  const years = [...new Set(series.flatMap((s) => s.points.map((p) => p.year)))].sort();
  const { max, ticks: yValues } = scale(Math.max(...series.flatMap((s) => s.points.map((p) => p.value))));
  // Narrow spends nothing on gutters: the series are named in a legend rather than at the end
  // of the line, and the y labels sit inside the plot, so both margins collapse to the padding.
  const rightPad = g.legend ? g.pad.right : Math.max(g.pad.right, ...series.map((s) => labelWidth(s.name)));
  const leftPad = g.yInside ? g.pad.left : Math.max(g.pad.left, labelWidth(format(max)));
  const plotW = g.W - leftPad - rightPad;
  const plotH = g.H - g.pad.top - g.pad.bottom;

  const x = (year) => leftPad + ((year - years[0]) / (years.at(-1) - years[0])) * plotW;
  const y = (value) => g.pad.top + plotH - (value / max) * plotH;

  // Inside the plot the label sits ABOVE its gridline, which is why it is offset up rather than
  // centred on it: on the line it would be struck through by the rule it belongs to.
  const yLabel = (v) => `
    <text class="axis${g.yInside ? ' axis-inplot' : ''}" x="${g.yInside ? leftPad + 2 : leftPad - 10}" y="${y(v) + (g.yInside ? -5 : 4)}" text-anchor="${g.yInside ? 'start' : 'end'}">${format(v)}</text>`;
  // SVG paints in document order, so a label written here is painted OVER by the series drawn
  // below it. The halo only knocks out what sits BEHIND the glyphs, which is why it rescued the
  // labels from the gridlines and left "200,000" still struck through by the net migration line.
  // Inside the plot the labels are therefore held back and emitted last, after the series.
  const yTicks = yValues.map((v) => `
    <line class="grid" x1="${leftPad}" y1="${y(v)}" x2="${leftPad + plotW}" y2="${y(v)}"></line>${g.yInside ? '' : yLabel(v)}`).join('');
  const yTicksOnTop = g.yInside ? yValues.map(yLabel).join('') : '';

  // Label every other year on narrow ranges, fewer on long ones, so labels never collide.
  // The last year is always labelled, so a stepped label lands next to it whenever the
  // range does not divide evenly, and the two crowd: "2024 2025". Drop the stepped one
  // when it falls within a step of the end.
  // The end labels are anchored to the plot edge rather than centred on their tick, but ONLY
  // where the chart has no side gutter to lose them into. Centred against the narrow chart's 2px
  // left padding, "2012" rendered as "012" and "2025" as "202", which is a wrong year rather than
  // a visibly clipped one.
  //
  // ONLY ON NARROW, and that qualification was missing for a day. Applied to the wide chart,
  // whose gutter is 68px and needs no rescuing, it shifts the first label half its own width to
  // the right and closes the gap to the second: on /asylum/ "2010" and "2012" ended up 4px apart
  // against 20 to 27px everywhere else, reading as one token "2010 2012".
  const step = Math.ceil(years.length / g.xTarget);
  const last = years.length - 1;
  const xTicks = years.filter((_, i) => i === last || (i % step === 0 && last - i >= step)).map((year) => {
    const first = year === years[0];
    const final = year === years[last];
    const anchor = !g.edgeAnchor ? 'middle' : first ? 'start' : final ? 'end' : 'middle';
    return `
    <text class="axis" x="${x(year)}" y="${g.H - g.pad.bottom + 22}" text-anchor="${anchor}">${year}</text>`;
  }).join('');

  const lines = series.map((s, i) => {
    const d = s.points.map((p, j) => `${j ? 'L' : 'M'}${x(p.year).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
    const end = s.points.at(-1);
    // The direct end-label is the wide chart's way of never distinguishing by colour alone.
    // Narrow keeps the same guarantee through the legend, which carries the stroke pattern
    // beside the name, so dropping the end-label here does not drop the rule.
    const endLabel = g.legend ? '' : `
    <text class="series-label series-${i}" x="${x(end.year) + 8}" y="${y(end.value) + 4}">${escape(s.name)}</text>`;
    return `
    <path class="series series-${i}${s.dashed ? ' dashed' : ''}" d="${d}"></path>
    ${s.points.map((p) => `<circle class="marker series-${i}" cx="${x(p.year).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3"></circle>`).join('')}${endLabel}`;
  }).join('');

  // The legend is drawn with the real series classes, so a dashed series shows a dashed swatch.
  // The narrow geometry has no measured margins, so a name longer than today's would run past
  // the viewBox edge and simply vanish: no error, no clipping artefact, nothing. That is the
  // exact defect the bar gutter's own comment records being fixed once, reintroduced one
  // geometry over, so it is refused at build time rather than left to be noticed.
  const legend = g.legend ? series.map((s, i) => {
    const above = series.slice(0, i).reduce((w, prev) => w + labelWidth(prev.name) + 20, 0);
    const swatchX = leftPad + 4 + above;
    // Measured from the top of the box, not from pad.top: the top gridline's own value label
    // sits just above pad.top, and a legend offset from the same anchor tracks it down into a
    // collision as padding grows. That is exactly what happened at -18: "Immigration" landed
    // on "1,500,000".
    return `
    <path class="series series-${i}${s.dashed ? ' dashed' : ''}" d="M${swatchX},${LEGEND_Y} L${swatchX + 26},${LEGEND_Y}"></path>
    <text class="series-label series-${i}" x="${swatchX + 28}" y="${LEGEND_Y + 5}">${escape(s.name)}</text>`;
  }).join('') : '';
  if (g.legend) {
    const width = series.reduce((w, sr) => w + labelWidth(sr.name) + 20, leftPad + 4 + 34);
    if (width > g.W) throw new Error(`Chart legend needs ${width} units in a ${g.W}-unit viewBox: ${series.map((sr) => sr.name).join(', ')}. Shorten a series name, or give the narrow geometry more width.`);
  }

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
  // The break label flips to the left of its line when it would not fit to the right. Dropping it
  // on narrow was the other option and is worse: the CSS comment beside the chart text sizes
  // records that this label is the only notice of a methodology change a sighted phone reader
  // gets, so it moves rather than goes.
  const breakX = breakAfter ? x(breakAfter + 0.5) : 0;
  const breakFits = breakX + 6 + labelWidth('methodology change', 15) <= g.W;
  const breakLine = breakAfter ? `
    <line class="break" x1="${breakX}" y1="${g.pad.top}" x2="${breakX}" y2="${g.pad.top + plotH}"></line>
    <text class="break-label" x="${breakX + (breakFits ? 6 : -6)}" y="${g.pad.top + plotH - 8}"${breakFits ? '' : ' text-anchor="end"'}>methodology change</text>` : '';

  // The legend is appended to the axis-title line rather than given a slot of its own, and that
  // is deliberate rather than cosmetic. On its own line an empty legend still emits the template's
  // indentation, so the wide SVG gained seven characters of whitespace and stopped being what it
  // was before this file grew a second geometry. Byte-equality with the previous build is the
  // cheapest possible proof that nothing on desktop moved, and it is worth this much care.
  return {
    years,
    viewBox: `0 0 ${g.W} ${g.H}`,
    body: `
      <text class="axis-title" x="${leftPad}" y="12" text-anchor="start">${escape(unit)}</text>${legend}
      ${yTicks}
      <line class="axis-line" x1="${leftPad}" y1="${g.pad.top + plotH}" x2="${leftPad + plotW}" y2="${g.pad.top + plotH}"></line>
      ${breakLine}
      ${xTicks}
      ${lines}${yTicksOnTop}`,
  };
}

export function lineChart({ id, series, title, summary, unit, source, sourceUrl, note, breakAfter }) {
  const wide = linePlot({ series, unit, breakAfter }, GEOM.wide);
  const narrow = linePlot({ series, unit, breakAfter }, GEOM.narrow);
  const breakNote = breakAfter
    ? 'Figures either side of the methodology change marked on the chart are not directly comparable.'
    : '';

  const rows = wide.years.map((year) => `<tr><th scope="row">${year}</th>${series
    .map((s) => {
      const point = s.points.find((p) => p.year === year);
      return `<td>${point ? format(point.value) : '<span class="nodata">not published</span>'}</td>`;
    }).join('')}</tr>`).join('');

  const desc = `${escape(summary)}${breakNote ? ` ${escape(breakNote)}` : ''} Full figures are in the table below the chart.`;
  const svg = (plot, g) => `
    <svg viewBox="${plot.viewBox}" class="chart-svg chart-svg--${g.key}" role="img" aria-labelledby="${escape(id)}-${g.key}-t" aria-describedby="${escape(id)}-${g.key}-d">
      <title id="${escape(id)}-${g.key}-t">${escape(title)}</title>
      <desc id="${escape(id)}-${g.key}-d">${desc}</desc>${plot.body}
    </svg>`;

  return `
<figure class="chart" id="${escape(id)}">
  <figcaption>
    <h3>${escape(title)}</h3>
    <p class="chart-summary">${escape(summary)}</p>
  </figcaption>
  <div class="scroll-x">${svg(wide, GEOM.wide)}${svg(narrow, GEOM.narrow)}
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
function barPlot({ bars }, g) {
  const { max } = scale(Math.max(...bars.map((b) => b.value)));
  const rowH = g.barRow;
  // The category gutter is measured from the longest name, the way the line chart measures
  // its right margin. A fixed 210 happened to fit today's longest label and would have
  // clipped the next one added, silently and only on the left.
  //
  // Narrow has no gutter at all: a 210px one inside a 360px viewBox leaves 60px of bar, so
  // the longest bar and the shortest would look nearly alike. The name goes above its bar
  // instead, which costs height rather than the width the comparison depends on.
  const labelW = g.barGutter ? Math.max(g.barGutter, ...bars.map((b) => labelWidth(b.name, 14))) : 0;
  const height = bars.length * rowH + 46;
  const plotW = g.W - labelW - (g.barGutter ? 90 : 12);

  const rows = bars.map((bar, i) => {
    const width = (bar.value / max) * plotW;
    const top = i * rowH + 8;
    // A bar near the axis maximum pushed its own value past the end of the scale, so a
    // number sat to the right of the gridline meaning more than it. Where the bar is long
    // enough to hold the value, it goes inside; short bars keep it outside, where there
    // is room. --paper on --accent is 8.1:1 light and 9.0:1 dark.
    const valueW = labelWidth(format(bar.value), 14);
    const inside = width > valueW + 24;
    const barTop = g.barGutter ? top + 8 : top + 24;
    // Same guard as the legend's, for the same reason: with no gutter the name sits above the
    // bar and has the whole viewBox to overrun.
    if (!g.barGutter && labelWidth(bar.name, 14) > g.W) {
      throw new Error(`Bar name "${bar.name}" needs ${labelWidth(bar.name, 14)} units in a ${g.W}-unit viewBox. Shorten it, or give the narrow geometry more width.`);
    }
    return `
    <text class="bar-label" x="${g.barGutter ? labelW - 12 : 0}" y="${g.barGutter ? top + 26 : top + 16}"${g.barGutter ? ' text-anchor="end"' : ''}>${escape(bar.name)}</text>
    <rect class="bar" x="${labelW}" y="${barTop}" width="${width.toFixed(1)}" height="26" rx="2"></rect>
    <text class="bar-value${inside ? ' inside' : ''}" x="${(labelW + width + (inside ? -10 : 10)).toFixed(1)}" y="${barTop + 18}"${inside ? ' text-anchor="end"' : ''}>${format(bar.value)}</text>`;
  }).join('');

  const axisY = bars.length * rowH + 10;
  return {
    viewBox: `0 0 ${g.W} ${height}`,
    body: `
      ${rows}
      <line class="axis-line" x1="${labelW}" y1="${axisY}" x2="${labelW + plotW}" y2="${axisY}"></line>
      <text class="axis" x="${labelW}" y="${axisY + 20}">0</text>
      <text class="axis" x="${labelW + plotW}" y="${axisY + 20}" text-anchor="end">${format(max)}</text>`,
  };
}

export function barChart({ id, bars, title, summary, unit, source, sourceUrl, note }) {
  const wide = barPlot({ bars }, GEOM.wide);
  const narrow = barPlot({ bars }, GEOM.narrow);
  const desc = `${escape(summary)} Full figures are in the table below the chart.`;
  const svg = (plot, g) => `
    <svg viewBox="${plot.viewBox}" class="chart-svg chart-svg--${g.key}" role="img" aria-labelledby="${escape(id)}-${g.key}-t" aria-describedby="${escape(id)}-${g.key}-d">
      <title id="${escape(id)}-${g.key}-t">${escape(title)}</title>
      <desc id="${escape(id)}-${g.key}-d">${desc}</desc>${plot.body}
    </svg>`;

  return `
<figure class="chart" id="${escape(id)}">
  <figcaption>
    <h3>${escape(title)}</h3>
    <p class="chart-summary">${escape(summary)}</p>
  </figcaption>
  <div class="scroll-x">${svg(wide, GEOM.wide)}${svg(narrow, GEOM.narrow)}
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
