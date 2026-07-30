# Evidence

One file per release, named for the source and the release, for example
`ho-immigration-stats-2026-06.json`. Files are committed and kept: they are the audit trail
that makes a figure's history reconstructible a year later, and deleting one to get a green
run is the one thing that would make this directory worthless.

`scripts/check-evidence.mjs` reads them. Any metric whose value changed against the base
branch, and any metric that is new, must be declared here, and the value must appear in the
quote. A fabricated figure cannot appear in a quote taken from a real page. **Any series block
that moved must be declared too**, in a `series` array rather than a `figures` one.

A file may hold either array or both, because a release moves records and series together and
one file covers one release.

Entries are matched, never validated wholesale. An entry for a figure that has since been
renamed or dropped stays as history and fails nothing.

## The shape

```json
{
  "figures": [
    {
      "ref": "asylum/asylum-applications",
      "previous_value": 93525,
      "value": 97120,
      "source_url": "https://assets.publishing.service.gov.uk/media/.../asylum-summary-jun-2026-tables.ods",
      "fetched_at": "2026-08-27",
      "table_reference": "Asy_D01",
      "quote": "There were 97,120 people who claimed asylum in the UK in the year ending June 2026."
    }
  ]
}
```

| Field | |
| --- | --- |
| `ref` | `theme/metric-id`, as content cites it |
| `previous_value` | what the record held on the base branch, `null` if the figure is new |
| `value` | the new value, which must equal the record's |
| `source_url` | the page or table the quote was read from, https |
| `fetched_at` | the day it was read, `YYYY-MM-DD` |
| `table_reference` | optional, and worth filling: most of this data lives in tables. One string, the table this quote was read from. **Not the record's field of the same name**, which is an array of every table that record draws on and is what the corrections watch matches. Nothing compares the two, so an entry naming a table the record does not declare is a contradiction no check will report |
| `quote` | text from the source containing the value |

**A quote is not always a sentence.** Much of this data lives in ODS tables, and several
records already name one in `source_name`. Where the figure is a spreadsheet cell, quote the
row and column labels with the value: `"Asylum applications, main applicants, year ending
June 2026: 97,120"`. The check only asks that the digits appear, in either `97,120` or
`97120`. A source that says only "around 97 thousand" has not stated the figure, and the
remedy is the data table rather than a looser check.

A range metric has no single value. Give `range_min` and `range_max` instead of `value`, and
the quote must carry both. The site's only range today is also `estimated`, so it takes the
derived path below instead.

## Derived figures

A `calculated` or `estimated` figure appears in no source, which is what makes it derived.
Quote its inputs instead, and say what was done to them.

```json
{
  "figures": [
    {
      "ref": "asylum/returns-enforced-plus-voluntary",
      "previous_value": 38102,
      "value": 39007,
      "fetched_at": "2026-08-27",
      "derivation": "9,723 enforced plus 29,284 voluntary returns, table Ret_01. The Home Office publishes no exact combined figure.",
      "components": [
        {
          "value": 9723,
          "source_url": "https://assets.publishing.service.gov.uk/media/.../returns-summary-jun-2026-tables.ods",
          "quote": "Enforced returns, year ending June 2026: 9,723"
        },
        {
          "value": 29284,
          "source_url": "https://assets.publishing.service.gov.uk/media/.../returns-summary-jun-2026-tables.ods",
          "quote": "Voluntary returns, year ending June 2026: 29,284"
        }
      ]
    }
  ]
}
```

The arithmetic is stated and read by a person; nothing recomputes it. The check establishes
that every input was quoted, not that the sum is right.

## Series

A series is not a hundred independent figures. ONS states you cannot append the latest
estimates to a series taken from an earlier release, so each array is replaced whole from one
publication and the single-vintage rule enforces that. The evidence is therefore **per array
and per release**, not per point. Requiring a quote for each of 100 points would be theatre
nobody could perform, and a check nobody can satisfy is a check that gets deleted.

```json
{
  "series": [
    {
      "file": "netMigrationTimeseries.json",
      "block": "primary",
      "previous_vintage": "2026-05-21",
      "vintage": "2026-11-26",
      "points": 14,
      "source_url": "https://www.ons.gov.uk/.../longterminternationalmigrationprovisional/...",
      "fetched_at": "2026-11-27",
      "quote": "Year ending December 2012: 195,000 ... year ending December 2025: 171,000"
    }
  ]
}
```

| Field | |
| --- | --- |
| `file` | the timeseries file name, as `lib/series.mjs` maps it |
| `block` | `primary`, or a companion: `historical`, `alternate_basis`, `emigration` |
| `previous_vintage` | the block's `published_date` on the base branch, `null` if the block is new |
| `vintage` | its `published_date` now, which is what makes it a different release |
| `points` | how many points the array holds |
| `source_url` | the release or table the array was read from, https |
| `fetched_at` | the day it was read, `YYYY-MM-DD` |
| `quote` | text carrying **both ends** of the array, the first point and the last |
| `correction` | required **only** when the array moved and the vintage did not, see below |

**Both ends, and the count.** A quote carrying only the newest point would pass while the rest
of the array came from anywhere, and a count catches an array pasted short, which quoting its
two ends cannot. Between them they establish that the author looked at the whole column they
took. They establish nothing about the points in the middle, and the check says so on every run
where a series moved.

A companion block is a separate series with its own release and its own entry. `historical` in
`netMigrationTimeseries.json` is a superseded vintage that is deliberately frozen: it does not
move, so it needs no entry until it does.

**A block registered nowhere is watched by nothing.** Companions are listed in
`lib/series.mjs`, and both this check and `validate-data.mjs` walk that list. A block under any
other key is invisible to both, so the check refuses one rather than skipping it.

### When the array moves and the vintage does not

An entry is matched on its file, its block and its vintage. That means an entry also matches
every *earlier* state of the same edition, so on its own it cannot distinguish a correction the
publisher made inside an edition from an entry written before the change and never revisited. A
fabricated middle point passed that way once.

So when a block's contents move while its `vintage` stays the same, `correction` is required and
must say what changed. Both ends have to be re-read too, because the quote is checked against
them either way. The same guard covers a block whose points carry no `published_date`: the
vintage is `null` on both sides, and without it the first entry would exempt that block for ever.

This is not a rare case dressed up as a common one. A correction inside an edition is the one
channel through which a wrong number can sit on the site indefinitely, because the URL does not
change and no publication cadence implies it.
