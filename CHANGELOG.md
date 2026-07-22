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

### Fixed — net migration timeseries rebuilt after verification against ONS

The series was flagged `BLOCKED — DO NOT PUBLISH` on 22 July 2026 and has now been replaced.
What was wrong:

| Year | Held | Current basis | Discontinued basis | Note |
| --- | --- | --- | --- | --- |
| 2016 | 345,000 | 249,000 | 249,000 | Matched no ONS figure in any vintage. First publication was 248,000 |
| 2017 | 275,000 | 208,000 | 285,000 | Matched neither basis |
| 2018 | 275,000 | 276,000 | 260,000 | Matched neither basis, though within 1,000 of the current one |
| 2010 | 252,000 | not published | 256,000 | Pre-Census-revision original, superseded |
| 2015 | 329,000 | 303,000 | 332,000 | An adjusted-series value sitting among unadjusted ones |
| 2019 | 271,000 | 184,000 | 313,000 | An adjusted-series value; the two bases differ by 129,000 here |
| 2020 | omitted | 93,000 | not published | ONS does publish this on the current basis |
| 2021-2023 | 488/764/872k | 467/891/848k | not published | Superseded; 2022 had moved by over 120,000 |

Only 2011-2014, 2024 and 2025 were correct as held.

The underlying fault was structural: one array silently mixed at least three ONS vintages,
so charting it would have drawn a line no ONS publication supports.

The replacement holds two explicitly separate series. The primary is ONS's current
new-approach basis, 2012-2025 including 2020, every point from the single 21 May 2026
release, each value quoted verbatim from Table 1. The secondary is the discontinued
IPS/LTIM series 2010-2019, labelled superseded and kept only because 2010 and 2011 exist
on no other basis and readers will meet those figures in older coverage.

The comparability break is recorded at June 2021, per ONS's current guidance, not at 2020
as the old file assumed. Confidence levels now follow ONS's own markers: 2025 provisional,
2024 revised, earlier years unmarked in this vintage.

### Added — three timeseries and eight metrics

All verified against primary sources on 22 July 2026, each value carrying a quoted table
cell or sentence.

- `asylumApplicationsTimeseries.json`: applications 2010-2025, calendar years, people basis
  throughout (table Asy_00a).
- `asylumBacklogTimeseries.json`: initial decision backlog 2010-2025, end-December stock, on
  both the people and cases bases — 64,426 against 48,723 at the end of 2025, the same queue
  counted two ways.
- `migrationFlowsTimeseries.json`: long-term immigration and emigration 2012-2025, the two
  gross flows behind net migration.
- Returns, previously absent despite being a specified homepage card: enforced (9,723),
  voluntary (29,284), the combined total (39,007, calculated, since the Home Office publishes
  only a rounded 39,000), asylum-related (11,918), and refused entry at port (17,623 — held
  specifically to stop it being folded into the returns total).
- Initial decisions by outcome, previously trapped inside a prose note: decisions total
  (128,300), refusals (79,719) and withdrawals (16,901).

### Changed — figures moved to year ending March 2026

Visa, citizenship and settlement figures were being presented as latest while a newer Home
Office release existed. Entry clearance 809,407 to 778,625; sponsored study 426,471 to
409,954; work 261,112 to 252,775; Health and Care main applicants 13,286 to 10,509; family
66,610 to 62,470; citizenship 235,782 to 236,512; settlement 146,405 to 152,306.

### Investigated — Afghan resettlement total is correct

The three scheme figures sum to 38,587 against a stated total of 38,617. Neither is wrong:
the Home Office records 30 people under the programme with scheme name unknown, and states
that breakdowns exclude them while totals include them. No value changed; the explanation is
now in the metric's notes. Also recorded there: the Home Office calls the third route the
Afghanistan Response Route on its topic page and the Afghanistan Relocation Route in its own
table Res_01.

### Outstanding

- 33 figures have `published_date: null`. The validator reports the count on every run.
  Record each one the next time its source is checked rather than inferring it.
- Five Commons Library URLs cannot be checked automatically: the host returns 403 to every
  request, including deliberately invalid paths, with or without a browser user-agent.
  `scripts/check-sources.mjs` reports them as uncheckable rather than broken, because calling
  a live link dead trains the reader to ignore the checker. Verify them by hand.
- Three source URLs redirect, which usually means a newer release has superseded the figure:
  the Home Office data tables anchor, and two Skills for Care pages.
