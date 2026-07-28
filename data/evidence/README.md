# Evidence

One file per release, named for the source and the release, for example
`ho-immigration-stats-2026-06.json`. Files are committed and kept: they are the audit trail
that makes a figure's history reconstructible a year later, and deleting one to get a green
run is the one thing that would make this directory worthless.

`scripts/check-evidence.mjs` reads them. Any metric whose value changed against the base
branch, and any metric that is new, must be declared here, and the value must appear in the
quote. A fabricated figure cannot appear in a quote taken from a real page.

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
| `table_reference` | optional, and worth filling: most of this data lives in tables |
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
