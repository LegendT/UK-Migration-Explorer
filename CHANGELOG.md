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

### Added — the first six claim checks

`content/claims/` now holds six drafted claims, meeting the section 17 launch gate of at
least five checked against definitions and data.

Claims cite live figures by token (`{{theme/metric-id}}`) rather than hard-coded numbers,
so a figure updated in `data/` updates in every claim citing it, and a claim citing a
deleted metric fails the build rather than publishing a stale number. Historical
illustrations stay as literals, labelled, because they are arguments about the past.

`scripts/validate-content.mjs` added and wired into `npm test` and CI. It checks front
matter, that every token resolves to a real metric, that every cited figure is declared so
a data update can find the claims it affects, that no claim has gone unreviewed for more
than twelve months, and the two-thirds balance rule.

**The balance rule failed on the first run.** The five claims specified for launch ran four
to one in one direction — 80%, against a two-thirds limit written into the same document
hours earlier. A sixth claim was added rather than one of the five dropped, since each
corrects a distinct class of error and cutting one to hit a ratio would game the rule
rather than satisfy it. The set now runs four to two. Recorded in foundation section 15
rather than quietly corrected, because the failure is evidence for making the constraint
mechanical instead of trusting it to review.

### Added — the glossary

`content/glossary.md`: 23 terms in five groups, covering the eight specified in foundation
section 8.2 plus the terms needed to read this site's own figures. Cites live figures by
token on the same contract as the claims.

It grew past eight because the original list could not carry the site's caveats. Flow versus
stock and people versus cases account for most misreadings in this subject. Backlog became a
table rather than a definition, because the initial decision queue has fallen sharply while
the appeals queue has risen to a record, and one number for "the backlog" can be right about
one and wrong about the system.

`validate-claims.mjs` becomes `validate-content.mjs` and now checks the glossary too: tokens
resolve, cited figures are declared, every term has a stable anchor so claims can link to it,
internal links resolve, and every term says what the word does NOT mean — a definition that
leaves the misreading intact has not done the job.

**A bug the negative tests caught.** The first version of the glossary checks ran after the
error report and `process.exit`, so every glossary error was collected and silently
discarded: a broken page passed as green. Found only because each new check was tested
against a deliberately broken copy rather than assumed to work. Reporting now happens last,
with a comment recording why.

### Fixed — defects in the first draft of the content

Found by auditing the content against the data layer rather than re-reading it.

- **Three currency tokens had no £.** `{{fiscal/government-spending-on-the-asylum-system}}
  billion` renders as "4.9 billion", not "£4.9 billion". The token contract was never
  actually specified, which is why this was possible: a token renders the formatted value
  and nothing else, and the author supplies the unit. Now documented and checked.
- **Three live values were hard-coded longhand**, silently opting out of the staleness
  protection the token system exists to provide — including "now stands at 331,000", a
  figure that has already been revised twice and will be again.
- **No claim linked to the glossary.** The validator required every term to carry an anchor
  "so claims can link to it" while no claim linked to anything. All six now link, and the
  targets are checked.

Three new check classes, each catching a defect that had already occurred: units on tokens,
range metrics cited as points, and live values written longhand. Plus glossary link
resolution across files.

One negative test initially reported as passing because the test string did not match the
file, so the check was never exercised. Re-run correctly, it caught the defect. Worth
recording: a negative test that does not fail proves nothing until you confirm it actually
broke what it claimed to break.

### Added — sources and methodology page

`content/sources-and-method.md`, meeting the section 17 launch gate. Covers what the site
is and is not, the source catalogue, the data contract in plain terms, confidence levels,
the cross-cutting caveats, why reference periods do not line up, the update commitment,
corrections, what the site does not cover, how it was built, and reuse terms.

Structural blocks — the source catalogue, confidence levels and key caveats — render from
`sources.json` and `meta.json` via `{{> partial }}` syntax rather than being restated in
prose, so the page cannot drift from the data it describes. The validator knows the set of
renderable partials and rejects unknown ones.

Two sections are deliberately unresolved and marked as such on the page. The **update
commitment** proposes fourteen days from each release but needs the owner's sign-off,
because publishing a target that is not met is worse than publishing none. The **AI use**
disclosure states plainly that AI assistance was used in research, drafting and checking,
and that human review before publication is a commitment about launch rather than a
description of the research stage — the honest version, not the reassuring one.

The validator now covers standalone content pages, which were previously unvalidated: only
claims and the glossary were checked, so this page's tokens went unverified until the loop
was added. It immediately caught an undeclared figure.

### Fixed — stale source catalogue entry

`sources.json` still described Home Office visa and citizenship figures as coming from the
year ending December 2025 release, after those figures moved to year ending March 2026.

### Changed — every figure now carries a publication date

The 33 figures without one are resolved. Nine came from evidence already in the repo: they
sit on topic pages of the Home Office year ending March 2026 release or the ONS year ending
December 2025 bulletin, both published 21 May 2026 and both already recorded against
sibling metrics. The original pass matched on period label and missed these because they
carry point-in-time or cumulative periods instead.

The remaining 24 were researched against their sources, each date taken from a fetched page
and quoted. Where a source shows both a first-published and a last-updated date, the
last-updated date is recorded: a briefing first posted in 2017 and revised in 2024 is cited
for what it says now, so the earlier date would misrepresent the figure's currency.

Three findings from the pass:

- **A recorded date was wrong.** The Commons Library asylum statistics briefing was
  recorded in `source_name` as "SN01403, 29 May 2026". It was published 1 June 2026.
- **The OBR lifetime-contribution figure now cites OBR directly** rather than the Migration
  Observatory briefing that summarised it, since the primary report was located and dated
  (12 September 2024). Citing the intermediary was weaker traceability than necessary.
- **The Home Office has renamed a dataset.** "Irregular migration to the UK detailed
  dataset" became "Illegal entry routes to the UK detailed dataset" from the year ending
  December 2025 edition, and the old dedicated URL now redirects. Worth knowing before the
  next update, and worth noting given the site's own wording rules.

Three Commons Library dates were verified from Internet Archive snapshots because the live
host returns 403 to every automated request. The Commons Library revises its single
"Published" date in place, so those dates are correct as of the snapshot rather than
necessarily as of today.

One figure is deliberately left undated. The 2026 year-to-date small boats count comes from
a daily-updated operational page, where the publication date of a past snapshot cannot be
recovered. It now carries `published_date_unavailable` explaining why, and the validator
treats a documented impossibility as settled rather than as outstanding debt — a counter
that can never reach zero stops being read.

That figure remains a maintenance liability: it is approximate, it decays weekly, and it
should probably not ship at all.

### Fixed — moved source URLs

Two Skills for Care URLs redirected; both updated to their targets, verified as resolving.
The Home Office data tables redirect is left alone, since it only strips a fragment
identifier useful to a reader.

### Added — Eleventy site

Framework chosen: Eleventy 3, matching the hosting already connected on Netlify. Renders the
overview, the glossary, the claims index, six claim pages and the sources page.

**Content files are not pre-processed as templates.** `markdownTemplateEngine` is `false`,
because `{{theme/metric-id}}` is this project's citation syntax and Liquid would otherwise
consume it — silently breaking the guarantee that no figure is hard-coded in prose. Citations
resolve in a post-render transform instead, and an unresolved token or unknown partial throws
rather than shipping `{{...}}` to a reader.

Two wrinkles handled, both from markdown running first: it escapes the `>` in a partial to
`&gt;`, and it wraps a block partial in a `<p>`, which would nest a table inside a paragraph.

`netlify.toml` runs `npm test` before the build, so a figure missing its source or a claim
citing a deleted metric fails the deploy rather than reaching a reader. Also sets a strict
content security policy; the site loads no external resources at all.

### Fixed — glossary rendered six h1 elements

The five group headings used a single `#`, which became `<h1>` alongside the layout's page
title: six h1s and a broken document outline, a WCAG 1.3.1 failure. Groups are now `h2` and
terms `h3`. The validator was codifying the wrong level, so it was updated too, and it now
rejects any `#` heading in that file — the layout owns the page's only h1.

Found by checking the built HTML rather than by reading the markdown, where the levels looked
perfectly reasonable.

### Fixed — defects found by looking at the built pages

None of these were visible in the source. All were found by rendering the site and looking
at it, which is the only way this class of defect surfaces.

- **Every glossary link on the site was dead, and the anchor syntax was visible as junk.**
  Markdown does not support `{#id}` natively, so `### Flow and stock {#flow-and-stock}`
  rendered as a heading with that literal text in it and produced no `id` at all. All 54
  links from the claims to definitions went nowhere. `validate-content.mjs` had checked
  that the markdown declared an anchor on every term — which was true — while the build
  silently discarded them. **Validating the source is not validating the artefact.**
- The dashboard caveat was being dumped mid-sentence into the homepage by a stray
  `truncate(0)`, which does not mean "output nothing".
- Every claim page shared one generic `h1`, "Claim check" — poor for search, browser tabs
  and heading-by-heading navigation. The claim itself is now the `h1`, placed inside its
  card under the "The claim" label so the framing travels with it and a screenshot of the
  heading can never read as this site asserting the claim.
- Claim prose ran to 99 characters per line, well past comfortable reading. The claim
  article is exempt from the page measure so the card can run full width; its prose is not.
- A CSS `margin-top` was silently overridden by a later `margin` shorthand.
- The homepage showed the last three claims rather than the first three, so the editorial
  ordering — which deliberately runs both directions early — was inverted.

`scripts/check-build.mjs` added and wired into `npm run build` and CI. It checks the output
rather than the input: every internal link and fragment resolves, no template or anchor
syntax survives into the HTML, and every page keeps its lang, skip link, single `h1` and
unbroken heading order. Verified by removing the anchor fix and confirming it reports all 54
dead links.

### Added — robots.txt disallowing all crawlers

The site went live before three of its own commitments were met: there is no about or
funding page naming who runs it, the update commitment on the sources page is unsigned, and
the human review that page promises has not happened. An anonymous corrective site on this
subject is assumed to be astroturf by default, so it should not be findable by search until
those are settled. The file explains this and says to remove it at launch.

`check-build.mjs` now fails if `robots.txt` is missing or lacks its `Disallow: /` rule, so
the site cannot quietly become crawlable again. That check is meant to be removed
deliberately at launch, not to survive it.

Note that `Disallow: /` prevents crawling rather than indexing. It is the right control for
"not ready yet". If a URL is ever discovered another way it could still be listed without
content, and the fix for that is an `X-Robots-Tag: noindex` header — which requires crawling
to be *allowed* so the header can be read. The two mechanisms conflict; use one or the other.

### Fixed — the build did not clean its output directory

Eleventy leaves `_site` in place between builds, so a deleted source file kept its stale
artefact. This briefly made a negative test pass when it should have failed: `robots.txt`
was removed from `content/` and the check still found the previous build's copy. The build
now clears `_site` first. Netlify builds from clean anyway, so this only ever misled local
verification — which is exactly where it matters most.

### Added — migration and asylum pages, with charts

Six charts across the two pages, rendered as inline SVG at build time: net migration over
time, immigration and emigration together, reason for migration, asylum claims over time,
initial decisions by outcome, and the first-decision queue on both counting bases.

No JavaScript and no charting dependency. The chart is in the HTML, so it works with
scripting off and needs no exception to the site's content security policy. Three editorial
rules are enforced in `lib/charts.mjs` rather than left to whoever writes the page: the
y-axis always starts at zero, since a truncated axis exaggerates change and this site exists
to correct that; every chart carries its figures as a real table; and no series is
distinguished by colour alone — lines differ in stroke pattern and are labelled directly at
their end. The bar chart uses one neutral colour for grants, refusals and withdrawals, since
section 10 forbids red/green moral coding of outcomes.

The methodology break at June 2021 is drawn on both ONS charts rather than left to a
footnote.

### Fixed — citations silently rendered as NaN in Nunjucks pages

`{{theme/metric-id}}` survives in markdown because markdown is not pre-processed as a
template. Nunjucks pages **are** pre-processed, so the same braces were evaluated as an
arithmetic expression and produced `NaN` — fifteen times across the two new pages, including
inside a table of asylum statistics.

`check-build.mjs` did not catch it. It looks for leftover `{{ }}` in the output, and there
was none: the engine had consumed the braces and left a number-shaped result behind. Looking
for unrendered syntax is not enough; the failed *result* has to be looked for too. The check
now fails on `NaN`, `undefined` or `[object Object]` appearing in visible text.

Nunjucks pages now cite through a `{% figure "theme/id" %}` shortcode, which calls exactly
the same renderer as the markdown path.

### Fixed — chart lines rendered as filled areas

`.series-0 { fill: ... }` overrode `.series { fill: none }` — same specificity, later rule
wins — so every line chart drew as a solid filled shape. Selectors are now element-qualified,
because a path, its markers and its label each need different fill behaviour.

### Added — what the asylum system costs

The MVP costs section from section 7, covering audited spending only. It opens by separating
the two questions that both get called "the cost of immigration": what the system spends,
which is audited and reasonably firm, and what migration is worth fiscally, which is
contested and deferred to a later phase.

**The spending figures are nested, not parallel**, and the page says so before showing them.
Hotel spending sits inside accommodation spending, which sits inside the total. A bar chart
would have implied three comparable items and double-counted; the table indents them instead,
so the relationship is visible before the prose explains it.

The one chart is the £158-a-night hotel place against roughly £20 for dispersal
accommodation, because that gap is what makes accommodation type rather than the number of
people the main driver of the bill. Its note states plainly that this is the price of a bed
under a contract, not a measure of what a person costs or is worth.

**On "£8 million a day".** The page works the arithmetic rather than repeating or dismissing
the claim: hotel spending of £2.1bn is roughly £5.8m a day, the previous year's £3bn was
roughly £8.2m, and the whole system at £4.9bn is closer to £13m. So the circulating figure
was approximately right for hotels in 2023-24 and is now roughly 40% above the current one.
Three defensible numbers describing different things.

The page also states what it deliberately excludes and why: immigration fee income, which is
immigration-wide rather than asylum and would compare two different populations; any cost per
person presented as a measure of worth; and the fiscal impact question.

**No claim check was added for the hotels figure**, though it is on the section 8.5.3 list.
Adding it would have made the published set five restrictionist to two pro-migration — 71%,
over the two-thirds limit — and the only unused pro-migration claim substantially duplicates
one already written. The balance rule is meant to constrain editorial decisions rather than
be worked around, so the claim waits for a genuine counterpart.

### Fixed — six false statements found by a full-project audit

All verified by recomputation before and after.

- `asylum.njk` said "two are on the cases basis and three on the people basis" of a table
  with **one** cases figure and **four** people figures — wrong about the site's own most
  important caveat.
- The flows chart summary said emigration "rose steadily from 2021"; it **fell** from
  680,000 to 642,000 in the final year. The line sloped down while the caption said up, and
  the same text sits in the SVG `desc`, so screen-reader users were told the opposite.
- The citizenship card said "Down 13%"; the figure is 12.1%, and the metric's own notes say
  12%. Card text left behind when the figure moved to year ending March 2026.
- The backlog chart said "fallen by roughly half"; it is 60% on people and 63% on cases.
- The asylum claims chart said "broadly flat through the 2010s"; claims **doubled**, from
  22,644 to 45,537.
- A claim check joined a **main-applicant** rate to a **people** count as "the remainder" —
  the exact error the site exists to correct. Now states both bases explicitly.

Also: one figure recorded a `retrieved_date` six days before its `published_date`.

### Fixed — two rendering defects

- **Series labels were clipped.** "People claiming asylum" rendered as "People claiming a":
  right padding was fixed at 118px while the label needed 148. It is now derived from the
  longest label.
- **Every chart rendered at two-thirds width.** `figure.chart` was missing from the
  measure-exemption list. That this was unintended is proved by the CSS itself — the chart's
  own children carry measure caps that are redundant if the figure is already capped.

### Changed — the checking apparatus, after an adversarial audit

The audit's finding was systemic, not incidental: **every checker verified a property of the
source or the declaration — labels agree, tokens close, text nodes are clean — rather than
the property readers depend on, and every green message claimed the latter.**

- **`DO NOT PUBLISH` now fails the build.** It printed a banner and exited 0, so a file
  flagged unfit for publication deployed and the warning scrolled past in a build log. The
  one mechanism built for "well-formed but unfit" was advisory in every automated path.
- **The content contract now covers `.njk`.** Five reader-facing pages — carrying most of
  the site's figures — were checked by nothing. Coverage went from 1 page to 7.
- **`published_date` is now required on timeseries points.** The single-vintage rule keyed on
  a field it did not require, so removing the dates made vintage-mixing undetectable while
  the run still printed "dated".
- **Unclosed tokens are caught.** Every regex required the closing pair, so `{{ref` shipped
  as visible junk with all checks green.
- **`NaN` in attributes is caught.** The detector stripped tags before searching, so a chart
  with broken coordinates rendered blank while every text node stayed clean.
- **Same-page fragments are checked**, and a chart series with no path data fails.
- **The robots guard now requires the rule under `User-agent: *`.** A `Disallow` under one
  named bot satisfied it while everything else was allowed.
- **`check-sources` runs in CI** — it previously ran in no pipeline at all — and now covers
  all four timeseries and every chart source URL. It immediately caught a NAO URL invented
  for the costs page rather than taken from the data layer.
- **CI runs weekly on a schedule.** Time-based rules — the twelve-month claim expiry, link
  rot — could only fire when someone happened to push.
- **Every success message was rewritten to claim only what it verifies.** "All sourced,
  dated, graded and singly held" was false on three counts.

### Changed — the balance rule is replaced by a representation floor

The two-thirds cap counted card labels rather than corrective content, and the audit found
it blocking the right thing. A claim's direction records *whose claim* is corrected, and
correcting a restrictionist claim **serves** pro-migration readers. So a cap on
restrictionist-labelled claims capped how much the site could serve that side.

Concretely, it blocked adding "immigrants are a drain on the public finances" — the
correction a pro-migration reader would most want to see. A rule that prevents a correction
is measuring the wrong thing.

Replaced with a floor: at least two claims correcting each direction, no ceiling. The real
split (now 5:2) is disclosed on the claims page with the reason, rather than a ratio implied
to prove balance.

### Added — trust mechanisms that were promised and absent

- **An error-reporting route on every page.** The corrections policy asked readers to report
  errors and gave them nowhere to do it. The footer now links to issues and the changelog.
- **A visible pre-launch notice.** The admission that three commitments are unmet lived only
  in `robots.txt` — addressed to crawlers, invisible to the humans who can read the site.
- **The style guide** (`/style-guide/`), referenced live from the glossary and previously
  non-existent. It separates the wording rules that are statistical precision from those
  that are value judgements, and owns the second kind as choices.
- **Period and source inside the claim card**, so a screenshot carries them, per section 8.5.4.
- `last_reviewed` on the two pages that lacked it; "non-EU+" defined at first use; a
  repository filename removed from reader-facing prose; a causal claim in a chart note
  attributed to ONS rather than asserted; the glossary's superseded dataset title corrected.

### Outstanding

- One figure has no publication date, documented and exempted; see above.
- Five Commons Library URLs cannot be checked automatically: the host returns 403 to every
  request, including deliberately invalid paths, with or without a browser user-agent.
  `scripts/check-sources.mjs` reports them as uncheckable rather than broken, because calling
  a live link dead trains the reader to ignore the checker. Verify them by hand.
- Three source URLs redirect, which usually means a newer release has superseded the figure:
  the Home Office data tables anchor, and two Skills for Care pages.
- Eight of the fourteen claims in foundation section 8.5.3 remain undrafted.

