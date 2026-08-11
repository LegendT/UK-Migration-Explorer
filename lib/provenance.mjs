// Every figure on a theme page, with its grade and the date it was last checked.
//
// The confidence grade rendered on home page cards and nowhere else, so the three pages where
// most figures live showed neither a grade nor any per-figure date. A reader met a number in a
// sentence with no way to ask how far it could be relied on, on a site whose subject is that
// question. Backlog U3, released 4 August 2026 once the grade questions it was sequenced behind
// had closed.
//
// Built from the page's own `figures:` front matter rather than from the tokens in its prose.
// validate-content.mjs fails a page that writes a figure without declaring it, so the declaration
// cannot be short of what the page renders; it can be longer, deliberately, and that is the half
// that matters here. Four figures on /migration/ reach a reader through `| metric` inside a chart
// summary rather than through a `{% figure %}` token, and a list built from tokens would leave
// them out of the one block that says how far they can be relied on.
//
// A definition list rather than a table, and that is not a style preference. The Sources table on
// /sources-and-method/ overflows its column at 280px because a table cannot reflow, and the same
// shape here would put 47 rows of provenance into a horizontal scroller on the pages a phone
// reader is most likely to land on. Pairs stack.
//
// The grade is NOT linked per row. The paragraph above the list carries one link to the four
// definitions, which is how the home page introduces the same vocabulary; a link on each of
// twenty-one identical words is twenty-one routes to one page.
//
// What this does NOT do: name which publication each figure came from. That is the citation
// block's job and it is under every chart already. Whether that block should also say WHICH
// figure it was cited for was an open decision on `metric_name`, deliberately not settled by
// omission here; it was decided on 5 August 2026 and lib/citation.mjs now renders it.

import { escape } from './escape.mjs';

// UTC, so a date never renders a day earlier than the record states it, matching citation.mjs
// and the longDate filter. These are ISO strings out of the data layer and never Date objects.
const longDate = (iso) => new Date(`${iso}T00:00:00Z`)
  .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/**
 * A definition list of every figure a page declares, one row each.
 *
 * metrics: records, each with metric_name, period_label, confidence_level and retrieved_date.
 * pageUrl: only used to say which page failed, where a record is missing a field.
 */
export function provenanceList({ metrics, pageUrl }) {
  if (!metrics.length) {
    throw new Error(`The figure provenance block for ${pageUrl} was given no figures. A theme page declares its figures in front matter, so an empty list means the declaration was lost rather than that the page has none.`);
  }

  const rows = metrics.map((metric) => {
    // Asked rather than assumed, because the failure is silent and reads as data: a missing
    // retrieved_date renders "checked Invalid Date", and a missing grade renders an empty span
    // that looks like a figure whose grade failed to load rather than one that never had one.
    // validate-data.mjs requires all four on a metric record, so this fires only if that contract
    // changes, which is exactly when nobody is looking at this file.
    for (const field of ['metric_name', 'period_label', 'confidence_level', 'retrieved_date']) {
      if (!metric[field]) {
        throw new Error(`${pageUrl}: the figure provenance block needs ${field} on ${metric.id}, and the record has none. Every metric record carries all four by contract.`);
      }
    }
    return `
    <div class="provenance-row">
      <dt>${escape(metric.metric_name)}</dt>
      <dd><span class="grade">${escape(metric.confidence_level)}</span>
      <span class="provenance-period">${escape(metric.period_label)}</span>
      <span class="provenance-checked">Checked by us on ${escape(longDate(metric.retrieved_date))}</span></dd>
    </div>`;
  }).join('');

  // A disclosure rather than an open list, and that was decided by measuring it rather than by
  // taste. Open, the block is 2,891px on /asylum/ at 320px wide, which is 24% of the page: a
  // quarter of a phone page given to reference material sitting after the reading. Closed, it
  // costs a line and one tap. The site already uses this exact control for the other per-figure
  // reference block, the citation under every chart, and the summary names both things inside so
  // a reader knows what they are opening rather than meeting "Details".
  return `
  <details class="provenance-block">
    <summary>Show each figure's confidence grade and the date it was checked</summary>
    <p>Each figure on this page carries the period it covers, the date this site last checked it
    against its source, and <a href="/sources-and-method/#confidence">this site's own confidence
    grade</a>. The grade is our judgement about how far the figure can be relied on, not the
    publisher's.</p>
    <dl class="provenance">${rows}
    </dl>
  </details>`;
}
