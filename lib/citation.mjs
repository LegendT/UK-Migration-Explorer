// The citation a reader needs, which is to the publication and not to this site.
//
// The chosen success measure is citation by a named outlet within six months, and the stated
// audience is a professional who needs a citation quickly. A reader who cites this site instead
// of the Home Office or ONS has been handed the wrong thing, so the publication, its edition and
// its table come first and this site's own URL comes last, as the route rather than the source.
//
// Nothing here is typed by an author. Every line is built from the fields the record or the
// series point already holds, which is what stops a citation naming a publication the figure
// above it does not come from. The charts' visible source lines ARE typed, and on the two asylum
// line charts they name the release page while every point behind them cites a spreadsheet
// inside that release: a citation typed a second time would be a second home for a fact the data
// layer already holds, which is the defect this project has closed everywhere else.
//
// So this block introduces no field of its own, and that is what stops it ageing separately from
// the figure it sits under: correcting a record corrects its citation in the same edit, and there
// is no second place for a stale edition or a dead URL to survive in.

import { escape } from './escape.mjs';

// UTC, so a date never renders a day earlier than the record states it. The same reasoning and
// the same options as the longDate filter in eleventy.config.js; that one takes front-matter
// Date objects as well and this only ever sees ISO strings out of the data layer.
const longDate = (iso) => new Date(`${iso}T00:00:00Z`)
  .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// A URL ending in a spreadsheet extension is a download and is labelled as one, because a
// professional following it in a browser gets a file rather than a page. 68 of the 199
// source_urls in the data layer are one of these.
//
// THE UX REVIEW SAID NONE OF THEM RENDERED AND ONE DID, on the home page, where a dashboard
// card links its record's source_url and the small boat arrivals card's record is an .ods. The
// review's reasoning was that these URLs "sit on series points that emit no link", and 20 of the
// 68 sit on metric records rather than on points. Corrected here rather than carried, because
// this branch repeated it in three places before anyone opened the built page.
const DOWNLOAD = /\.(ods|xlsx|xls|csv)$/i;

// A publisher's own title can end in its own punctuation, and one on this site does: the Home
// Office page "How many people claim asylum in the UK?" rendered as "...in the UK?." A title is
// quoted as the publisher writes it, so the stop is dropped rather than the question mark.
const stop = (text) => (/[.?!]$/.test(text) ? text : `${text}.`);

/**
 * A `details` block listing the publications behind a chart or a claim, one line each.
 *
 * sources: records or series points, each with source_name, source_url, published_date and
 *          retrieved_date. table_reference is used where the record carries one. Duplicates are
 *          expected: a line chart passes every point it draws, and they share one publication.
 * url:     the permanent address of the thing being cited, including its fragment.
 * label:   what the control is for, appended out of sight so two blocks on one page differ.
 */
export function citationBlock({ sources, url, label }) {
  // Deduplicated on the NAME AND THE URL, not the URL alone, and that distinction is the whole
  // difficulty. Records routinely share a URL while citing different things inside it: on
  // /common-claims/nineteen-per-cent-born-abroad/ three records name one ONS bulletin as
  // "(Table 3)", as "(Table 9), summed by this project" and as a calculation from that bulletin
  // and a population estimate. Keyed on the URL, the first of those answered for all three and
  // the page's citation said the figure was read where it was not.
  //
  // Two things still differ inside a single name-and-URL group, so both are merged rather than
  // taken from whichever record was read first:
  //
  //   table_reference, because /common-claims/refused-asylum-seekers-are-eventually-recognised/
  //   cites FIA_4 and FIA_3 with T_3 under one name, and dropping either names a table the page
  //   does not use while omitting one it does.
  //
  //   retrieved_date, where the EARLIEST wins. Records on
  //   /common-claims/everyone-in-asylum-accommodation-arrived-recently/ share a name and a URL
  //   and were checked on different dates; the latest would tell a reader something was verified
  //   more recently than it was. No count is written here, because how many share a name is this
  //   project's own state and moves with every record added. The first version of this line said
  //   three and the answer was five.
  const cited = new Map();
  for (const source of sources) {
    // retrieved_date is required here and nowhere else: validate-data.mjs's POINT_FIELDS does not
    // ask a series point for one, and until this block nothing rendered it, so a point without it
    // shipped "Checked Invalid Date." past the data contract, the build check and the failed-value
    // scan, none of which look for that string. Refused rather than printed.
    if (!source?.source_url || !source?.source_name || !source?.retrieved_date) {
      throw new Error(`A citation block for ${url} was given something with no source_name, source_url or retrieved_date. A record carries all three by contract; a series point is not held to retrieved_date by validate-data.mjs, and without it this block renders "Checked Invalid Date".`);
    }
    // Written as an escape, never as the byte itself. A literal NUL here made git call this
    // file binary, so the file this whole change is about had no reviewable diff, and a grep
    // for a string that is in it exited 1 with no output, which reads exactly like a clean
    // search. The runtime key is unchanged: a separator no publisher name or URL can contain.
    const key = `${source.source_name}\u0000${source.source_url}`;
    const already = cited.get(key);
    if (!already) {
      cited.set(key, {
        ...source,
        table_reference: [...(source.table_reference ?? [])],
        metric_names: source.metric_name ? [source.metric_name] : [],
      });
      continue;
    }
    for (const table of source.table_reference ?? []) {
      if (!already.table_reference.includes(table)) already.table_reference.push(table);
    }
    // metric_name merges the same way a table does and for the same reason. A publication cited
    // for two figures has to name both: on /common-claims/nineteen-per-cent-born-abroad/ one ONS
    // bulletin answers for the foreign-born population and for its mid-2024 edition, and printing
    // whichever record was read first would say the block covers one figure when it covers two.
    // Series points carry no metric_name, so a chart's block prints no such line at all.
    if (source.metric_name && !already.metric_names.includes(source.metric_name)) {
      already.metric_names.push(source.metric_name);
    }
    if (source.retrieved_date < already.retrieved_date) already.retrieved_date = source.retrieved_date;
    // published_date is the one field with no defensible merge rule. Two records naming one
    // publication cannot disagree about when it was published, so a disagreement is a data defect
    // and taking whichever was read first would print one date and hide the other.
    if (source.published_date !== already.published_date) {
      throw new Error(`A citation block for ${url} has two records citing "${source.source_name}" with different published_date values, ${already.published_date} and ${source.published_date}. One publication has one publication date, so this is a defect in the records rather than something to merge.`);
    }
  }
  if (!cited.size) {
    throw new Error(`A citation block for ${url} has no sources. An empty citation renders as a control that opens on nothing, which is worse than no control.`);
  }

  const lines = [...cited.values()].map((source) => {
    // The table is in source_name already for most records, written the way the publisher writes
    // it. Appending table_reference regardless produced "table Asy_00a. Table Asy_00a", so it is
    // added only where the name does not already say it.
    const tables = (source.table_reference ?? [])
      .filter((table) => !source.source_name.toLowerCase().includes(String(table).toLowerCase()));
    const download = DOWNLOAD.test(source.source_url);
    const name = source.source_name + (tables.length ? `, table${tables.length > 1 ? 's' : ''} ${tables.join(', ')}` : '');
    // What this publication was cited FOR. Backlog U3, deliberately not released with the grade
    // and checked date in PR #137, and decided on 5 August 2026. The block named publications and
    // left a reader to guess which figure each one produced, which is worst exactly where it
    // matters most: a page carrying this site's own calculation beside somebody else's published
    // figure. metric_name carries grade vocabulary in its own text, "(calculated, provisional)",
    // and that is kept rather than stripped: it is the record's own description of what the
    // figure is, and a citation a reader pastes elsewhere should not be tidier than the record.
    const cited_for = (source.metric_names ?? []).length
      ? `Cited for ${source.metric_names.map((m) => escape(stop(m))).join(' ')} `
      : '';
    return `
      <li>${escape(stop(name))}
      ${cited_for}${source.published_date ? `Published ${escape(longDate(source.published_date))}. ` : ''}<a href="${escape(source.source_url)}">${escape(source.source_url)}</a>${download ? ' (spreadsheet download)' : ''}.
      Checked ${escape(longDate(source.retrieved_date))}.</li>`;
  }).join('');

  // Nothing a source names may be lost on the way through the deduplication above, and a table
  // is what gets lost, because it is the field two records sharing a publication most often
  // disagree about. Asserted against the rendered text rather than against the map, so a change
  // to the key, the merge or the printing is caught by the same line, on every build.
  // Case-insensitively, because the filter above drops a table case-insensitively. Asked
  // case-sensitively, a record naming "table Asy_03" with a table_reference of "ASY_03" had its
  // table dropped from the text as a duplicate and then failed this guard for being absent: a
  // build failure on data that is correct.
  // The ceiling: a substring match, so a table whose name is contained in another table's name
  // on the same block would pass while being absent. Every table reference in this data layer is
  // a distinctive publisher code and none is a substring of another.
  const printed = lines.toLowerCase();
  for (const source of sources) {
    for (const table of source.table_reference ?? []) {
      if (!printed.includes(String(table).toLowerCase())) {
        throw new Error(`The citation block for ${url} does not name table ${table}, which ${source.source_name} is cited for. A source's tables are merged when two records share a publication; this is what says so rather than assuming it.`);
      }
    }
    // The same guard for metric_name, on the same reasoning: it is merged, so it is the field
    // that can be silently dropped, and the merge is what would drop it. Compared against the
    // rendered text rather than the map, so a change to the key, the merge or the printing all
    // fail here. Escaped before comparing, because a name containing an apostrophe renders as an
    // entity and would otherwise fail this check while being present on the page.
    //
    // stop() and not the bare name, and this is the whole difference between a guard and a
    // decoration. The table guard above names its ceiling: a value contained in another value on
    // the same block passes while being absent. Table codes never nest, so it does not bite there.
    // METRIC NAMES DO NEST, in this data layer today: "Foreign-born (non-UK born) population of
    // the UK" is a prefix of "Foreign-born (non-UK born) population of the UK, mid-2024
    // (provisional)". Asked without the full stop, dropping the shorter of that pair would pass
    // on the longer one's text. Asked with it, the longer renders "...of the UK, mid-2024
    // (provisional)." and does not contain "...of the UK.", so the drop fails here.
    if (source.metric_name && !printed.includes(escape(stop(source.metric_name)).toLowerCase())) {
      throw new Error(`The citation block for ${url} does not say it is cited for "${source.metric_name}", which ${source.source_name} is the source of. Two records sharing a publication have their metric names merged; this is what says so rather than assuming it.`);
    }
  }

  return `
  <details class="cite">
    <summary>How to cite this<span class="visually-hidden">: ${escape(label)}</span></summary>
    <ul class="cite-list">${lines}
    </ul>
    <p class="cite-via">Via UK Migration Explorer, <a href="${escape(url)}">${escape(url)}</a>.</p>
  </details>`;
}
