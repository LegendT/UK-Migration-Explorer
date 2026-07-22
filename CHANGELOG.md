# Changelog

Data updates and methodology changes. Every change to a published figure belongs here,
with the reason and the source. This file doubles as the data changelog required before
launch (foundation document, section 17).

Dates are the date of the change to this repository, not the publication date of the
underlying statistics. Each figure carries its own `published_date` and `retrieved_date`.

## Unreleased

### Changed — data contract

- Every metric now carries `id`, `geography` and `published_date` in addition to the
  previous ten fields. `id` gives templates a stable handle that survives quarterly
  updates; `geography` was previously visible only in prose, which hid the England-only
  scope of the NHS and social care workforce figures.
- `date` is now defined as the end of the period covered. Eight figures previously filed
  under their publication date have been corrected: the three National Audit Office
  spending figures (were 2025-12-10, now 2025-03-31 for financial year 2024-25), the two
  asylum accommodation cost figures, and the Skills for Care workforce share. Any chart
  sorting on `date` was placing these up to nine months late.
- `dashboard.json` no longer copies values from the theme files. Its six cards and four
  supporting denominators now hold a `ref` into the theme file that owns each figure.
  Previously the same figure existed in two places and nothing detected drift between
  them, so a quarterly update that missed the dashboard would have published two
  different official figures for the same measure.

### Fixed — figures

- Net fiscal impact of immigration is no longer stored as `value: 1`. It is a range
  spanning zero (roughly minus 1% to plus 1% of GDP, depending on method) and was
  encoded as a point estimate that any metric card would have rendered as "1% of GDP" —
  the exact misuse this project exists to prevent. It now uses `value_type: "range"` with
  explicit bounds and a null value, and the validator rejects any attempt to flatten it.
- The four dashboard supporting denominators (UK population, foreign-born population,
  immigration, emigration) were published with no source, date or confidence level, in
  breach of the project's own stated contract. Dividing two of them gave a foreign-born
  share of 15.4% against the 16% published two objects away in the same file, because
  they came from different vintages. All four now reference the fully sourced metrics
  that already existed elsewhere in the data layer.
- Net migration figures for 2021, 2022 and 2023 were graded `estimated`, which the
  project's own taxonomy reserves for pre-2021 figures on a non-comparable methodology.
  They are current published official ONS estimates and are now graded `official`.
- Unit normalised: asylum system cost was `£ billion per year` on the dashboard and
  `£ billion` in the theme file.

### Added

- `LICENCE`: MIT for code and original writing; Open Government Licence v3.0 attribution
  for the Crown copyright material the data layer reproduces. The repository was public
  with no licence at all, which is the opposite of the transparency the project claims.
- `.github/workflows/validate-data.yml`: the data contract now runs on every push and
  pull request. It was previously enforced only by remembering to run it.
- `package.json` so the check runs as `npm test`.
- This changelog.

### Outstanding

- 40 figures have `published_date: null`. The validator reports the count on every run.
  Record each one the next time its source is checked rather than inferring it.
