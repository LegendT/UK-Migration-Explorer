# Changelog

Data updates and methodology changes. Every change to a published figure belongs here,
with the reason and the source. This file doubles as the data changelog required before
launch (foundation document, section 17).

Dates are the date of the change to this repository, not the publication date of the
underlying statistics. Each figure carries its own `published_date` and `retrieved_date`.

## Unreleased

### The update prompt, and a tracking rule that did not look down, 30 July 2026

**No published figure changed.** `docs/prompts/update-from-release.md` is phase 3 of the update
automation scope: a versioned prompt that drives a by-hand update, names the refusals, and sends
the assistant to the runbook for the procedure rather than carrying a copy of it. It refuses
series work outright, which costs two of the three cadenced releases, ONS and the Home Office
quarterly, and is the accepted price of not omitting it silently. Not yet exercised against a real release, and it says so.

Building it exposed a defect in an older check. `validate-content.mjs` required every planning
document in `docs/` to be referenced from the backlog, and did not descend into directories, so
`docs/prompts/` was the first subdirectory and its contents were invisible to the rule whose whole
purpose is that a scope cannot be written and forgotten. The scan is now recursive and matches on
the path relative to `docs/`, so a nested document cannot be satisfied by a reference to a
same-named one above it, nor inherit a top-level exemption.

### The by-hand update runbook, 30 July 2026

**No published figure changed.** `docs/UPDATING-DATA.md` is the procedure for moving the site
onto a new release by hand, written before the assistant-drafted version so that the job can be
done before it is delegated. `docs/UPDATE-AUTOMATION.md` phase 3 now points at it by path and
heading instead of carrying its own four-field copy, which was wrong in four clauses.

Two things it turned up about this repository rather than about the procedure. The first draft
never mentioned this file, while `/sources-and-method/` promises readers that every change to a
published figure is recorded here with its reason and source; that omission would have made the
trust page false one update later. And the *Reference periods do not line up* table on that same
page is introduced with "At the last update", so any of the three cadenced updates falsifies a
row of it and no check reads a period label. It is now the one piece of page prose an update is
told to edit.

### A correction inside an edition is now watched for, 30 July 2026

**No published figure changed**, and the built site is byte-identical to before, proved by
diff. PRs #48 and #49.

A correction the publisher makes *inside* an edition leaves the edition slug alone, so the
release notifier reports the source as current and is right to. No publication cadence implies
one either. That was the one channel through which a wrong number could sit on this site
indefinitely, and nothing read it.

- **14 records and 2 series files now declare `table_reference`**, the publisher tables behind
  the figure, taken from the prose that already named them. `validate-data.mjs` holds the
  declaration to the prose in both directions: a table named and not declared is one the watch
  cannot see, and a declaration nothing names is a string nobody can check.
- **`check-releases.mjs` reads the Home Office data-tables change history** and matches it
  against those declarations. 16 entries, 3 naming a table identifier, 1 naming one of the
  twelve this site declares: the 1 June `Vis_01` correction. It reports a figure only where
  that figure's own `retrieved_date` pre-dates the correction, so it is stateless and clears
  itself when someone re-reads the figure. Today it reports current.
- **It reports and never gates**, like the notifier it sits inside, because a corrected table
  may not touch the row this site publishes. The last one missed by a single row.
- **What it cannot see is printed on every run**: most change-history notes name their tables
  by title rather than by identifier, a `table_reference` says which table and never which page
  publishes it, and the comparison is by whole UTC days.

A second model reviewing the branch found the defect that mattered: the series clearing key,
the envelope's `lastUpdated`, was the only date in the data layer reaching a comparison without
passing `isRealDate`, so a prose date would have sorted above every ISO one and reported every
correction to that series as already handled, for ever.

`docs/HANDOFF.md` also now records that `main`'s history is truncated: its root commit is
parentless and everything before PR #42 is a separate history, surviving on the branch
`history-to-pr-41`.

### The series files join the source catalogue, 28 July 2026

**No published figure changed**, and the built site is byte-identical to before, proved by
diff. Each of the four series files now declares a `source_id` on its envelope, the way every
metric already did, and `validate-data.mjs` requires it and checks it resolves.

It closes a hole found by critiquing the update prompt for a fault the release notifier turned
out to share: the notifier watched 71 records and none of the 100 series points, which are
replaced wholesale on release. Two of the four series have no metric declaring a `series_ref`
either, so a series file left on a superseded edition would have been invisible to every check
here. The notifier now reads them, and catching that case is one of its negative tests.

**The primary series only.** A companion block is deliberately a different vintage:
`netMigration.historical` is the discontinued series at its 2020 vintage, and reading companion
blocks would report that file behind for ever.

### The release notifier, 28 July 2026

**No published figure changed.** `scripts/check-releases.mjs` asks each watched source which
edition it has published, and compares that with the edition every record cites. Until now
nothing detected that a release had happened: the staleness check ages a figure against its
source's cadence, which is a guess, and silent staleness is the top risk in the register.

- **It compares editions, not dates.** A release is identified by the month and year in its
  URL, which the records already store. The date comparison the scope carried would have
  alerted the first time it ran and been wrong, because a Home Office page was edited on
  16 July without anything being published.
- **It compares every cited edition, not the source's newest.** A per-source answer reads as
  "current" while one figure sits a release behind, which is what happened to the EU
  Settlement Scheme figure corrected above. Replaying that case is one of the negative tests.
- **A route that matches no document fails loudly.** Both series have been renamed once
  already, `immigration-statistics-` to `immigration-system-statistics-` and
  `tribunal-statistics-` to `tribunals-statistics-`, and an empty match would otherwise read
  as "no newer release".
- **Sources with no route are named, not skipped**, with the cadence the catalogue records
  beside each, because a source nobody watches is not a source that is up to date.
- **Not established, and said on every run:** that a release which kept its slug has changed
  anything. Corrections between editions land on the data-tables page, whose change history
  names the exact table, and nothing reads that yet.

### EU Settlement Scheme settled status grants, 28 July 2026

**370,535 for the year ending March 2026**, replacing 354,647 for the year ending December
2025. The figure was a release behind: every other Home Office figure on the site had moved to
the March 2026 edition and this one had not. Found while re-verifying the release notifier's
endpoints, and neither existing check could see it, because the staleness check ages
`retrieved_date` and 17 June is well inside a quarterly window.

Source: Home Office, Immigration system statistics, year ending March 2026, settlement and
citizenship. "Of these, 71% (370,535) were settled status grants under the EUSS". Evidence in
`data/evidence/ho-immigration-stats-year-ending-march-2026.json`, the first entry written
under the contract added below.

- **The two editions count the same thing**, which the release does not state and the
  arithmetic does. Both are `EUSS_QTR` settled conclusions plus the automated-grants estimate:
  270,235 plus 100,300 for the year ending March 2026, and 267,977 plus 86,670 for the year
  ending December 2025. Recorded in the record's notes, because the published figure appears
  in the bulletin narrative and in no summary table.
- **The note beside the figure was stale too**, saying 4.4 million grants since 2018 where the
  release now says 4.5 million. Nothing checks prose about a figure, which is a published
  limit of this site.
- **No page cites this record**, so no reader saw the old value and nothing a reader sees
  changed. Proved by diffing the built site, not by reading the change.

### The evidence check, 28 July 2026

**No published figure changed.** `scripts/check-evidence.mjs` compares the data layer against
`origin/main` and requires any metric whose value moved, and any metric that is new, to be
declared in `data/evidence/` with a quote from a fetched source containing that value. CI fails
without one. It is the mechanical half of what the sources page promises a reader, that no
figure appears here because a model asserted it: a fabricated value cannot appear in a quote
taken from a real page. Eight fabricated figures reached this repository once and a reviewer
caught them. Nothing else would have.

- **A derived figure appears in no source**, which is what makes it derived, so it quotes its
  inputs and states the arithmetic instead. The exemption is keyed on `confidence_level`
  rather than a list of refs: the derived figures went from one to three in the week between
  this being scoped and being built, and a hard-coded list would have required two of them to
  quote a value nobody publishes.
- **The evidence files are committed and kept**, as the audit trail. Entries are matched, never
  validated wholesale, so an entry naming a figure since renamed stays as history rather than
  failing a build until someone deletes the trail to get a green run.
- **It fails rather than skipping when it cannot see the base branch.** A comparison against
  nothing finds no changed figure and would report that as a clean run. On a push to main,
  where the base and `HEAD` are the same commit, it says that rather than announcing that no
  figure changed.
- **Not covered: the four series files.** Their 100 points are replaced wholesale on release
  under the single-vintage rule and carry no evidence at all. The check counts the changed
  files and says so on every run.

### Citing a series point, 28 July 2026

**No published figure changed.** Twelve numbers that had been typed by hand into chart
summaries and notes are now resolved from the series files at build time. That was checked by
diffing the built site against the same build before the substitutions: byte-identical across
all 16 pages, so every one renders exactly what it replaced.

- **Four figures were held twice**, as a headline metric and as a point in a series, with
  nothing reconciling them: `migration/net-migration`, `net-migration-2`,
  `total-long-term-immigration` and `total-long-term-emigration`. All four agreed, and a
  release revising one and not the other would have published two different official values
  for the same measure. Each metric now declares a `series_ref` and `validate-data.mjs`
  refuses the mismatch. An undeclared overlap is reported for review on every run.
- **An `at(year)` filter** cites a series point inside a chart summary, where a shortcode
  cannot go. It throws on a year the series does not hold.
- **A series value written longhand now fails the build**, on the same terms as a record
  value. Three of the twelve were in chart notes rather than summaries and had never been
  counted; the scope had looked at summaries only. A fourth match, `285,000` in the
  `migration.njk` note, is the size of the 2022 revision and only coincides with the 2017
  point of the discontinued series. It is declared rather than cited, because citing it would
  have put an unrelated figure in that sentence.
- **Fixed: `historical_literals` never worked from a content page.** It was split on commas,
  so a comma-grouped value became two junk exemptions and the real one was never exempted. No
  content page had ever used it, so nothing had been silently exempted. Semicolons only.
- **Fixed: a citation missing `| number` shipped an unformatted figure.** `at` returns the raw
  value, so `45537` reached the built page with `validate` and `build` both green. Found by
  critique after the work was otherwise finished, and confirmed by watching it happen. Every
  `at()` must now pass through `| number`.

**Changed, what the site says about itself.** `/sources-and-method/` listed three things the
checks do not establish. The second, that values quoted from a long-run series are not
individually cited, is no longer true and is removed. The first now carries the limit that
replaces it: a citation fixes the value and not the sentence, so a summary quoting the right
number against the wrong year still builds.

### Pre-publication review corrections, 27 to 28 July 2026

The review was conducted on 27 July 2026 and its findings became corrections 1a to 1i, all
of which have now landed. **This does not record the review as passed**; that decision, and
the closing steps behind it, are tracked in `docs/BACKLOG.md`. The review itself is in
`verification.txt` at the repository root.

**Added, figures**

- `asylum/asylum-administrative-outcomes`, 5,931 people for the year ending March 2026.
  Summed from the Home Office Asy_D02 pivot over 2025 Q2 to 2026 Q1, because the figure
  appears on no HTML bulletin. The same four quarters reproduce the published 79,719
  refusals, 16,901 withdrawals and 48,581 grants, and a grand total of 151,132, which is how
  the basis and period were confirmed rather than assumed.
- `asylum/people-in-asylum-accommodation`, 93,653 as at 31 March 2026, `confidence_level:
  calculated`. The Home Office publishes the two components and the support total, but not
  this sum.

**Fixed, category and basis errors**

- The initial-decisions chart included withdrawals under the title "Initial decisions by
  outcome". A withdrawal is not an initial decision, so it is retitled "Initial decisions and
  withdrawals". Its summary described 16,901 as claims; the figure counts people, including
  dependants. The three bars were also presented as an exhaustive breakdown and are not.
- Asylum-related immigration, 88,000, was labelled "asylum and humanitarian" on the
  migration chart and the claim table. ONS reports those as separate categories, so the
  label understated the combined figure and misstated the asylum one. Now "asylum
  applicants", with humanitarian named separately at about 6%.
- The non-EU+ definition described an arrival category. It is a nationality grouping, and
  the previous wording named the EEA rather than ONS's EU plus Norway, Iceland,
  Liechtenstein and Switzerland.
- The claim about asylum accommodation answered with the 97,519 support total. That figure
  includes 3,866 people receiving subsistence only and no accommodation. The same conflation
  existed on the asylum page and was fixed there too.

**Fixed, invalid comparisons**

- A sentence applying the historical cohort uplift to the current 39% grant rate is deleted.
  Home Office note 48 on that table states its initial rate "will not match the grant rate in
  the 'initial decisions' dataset as they relate to a different cohort of initial decisions".
  The same reasoning existed in three places, including the notes on the grant-rate record,
  where it would have instructed the next editor to reintroduce it. It is replaced with a
  refutation valid on the same table: between a fifth and a half of each 2010 to 2020 cohort
  ended without a grant.
- "The 2022 estimate has moved by more than 120,000 across revisions" understated the case.
  It has moved by 285,000, from 606,000 when first published on 25 May 2023 to 891,000, 47%
  higher.
- The net migration peak of 891,000 was unqualified. It is the highest point on the
  calendar-year series shown; the full rolling series peaks at 944,000 in the year ending
  March 2023.
- "The queue grew steadily through the 2010s" was false on the people basis, which fell from
  22,898 at the end of 2014 to 22,147 at the end of 2015.

**Changed, terminology and disclosure**

- "Final grant rate" is now "latest recorded grant rate", which is the Home Office's own
  label. "Appeals heard" is now "appeals determined at a hearing or on the papers", and the
  denominator is disclosed: of 7,799 asylum and protection appeals disposed of in the
  quarter, 52% were determined, 35% withdrawn, 6% struck out and 6% invalid or out of time.
- The refused-asylum claim's front-matter source is now "Home Office; Ministry of
  Justice/HMCTS", and the page discloses its three mixed reference periods and the
  provisional latest quarter.
- "Immigrants pay far more in tax than they cost" drops the intensifier. No attributable
  example of the stronger wording could be supplied without breaking the published rule
  against attributing claims to named people.
- Two claim pages now disclose that no published example of the claim in those exact words
  was found.

**Not changed, and deliberately**

- The review's 35,000 for humanitarian immigration is not written anywhere. The ONS bulletin
  gives only the 6% share, so the share is what the pages carry.
- The review's word "destitution" is not used. The two Home Office pages fetched put the
  test as being homeless or without money for food.
- Two figures that looked wrong against the Ministry of Justice bulletin were left alone
  after the primary tables showed they were right. The bulletin prints 39% allowed and 61
  weeks for the whole immigration chamber; tables FIA_3 and T_3 give 40% and 67 weeks for
  asylum and protection.
- `last_reviewed` is unstamped on every page, per `docs/BACKLOG.md`.

### Changed, data contract

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

### Fixed, figures

- Net fiscal impact of immigration is no longer stored as `value: 1`. It is a range
  spanning zero (roughly minus 1% to plus 1% of GDP, depending on method) and was
  encoded as a point estimate that any metric card would have rendered as "1% of GDP", the exact misuse this project exists to prevent. It now uses `value_type: "range"` with
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

### Fixed, live figures restated in prose now cite the record

Reviewing the sub-100 unit-qualified warnings figure by figure, rather than trusting the
stored note that called all fourteen coincidences, found three live values written
longhand beside the tokens that already cited them on the same page. Each would have
drifted from its own token on the next release. They now cite the record throughout
(#28, #30).

- `refused-asylum-seekers-are-eventually-recognised`: the initial grant rate (39%) and the
  appeal success rate (40%), current Home Office and Ministry of Justice figures, were
  restated longhand in the discussion below the tokens citing them.
- `nineteen-per-cent-born-abroad`: four references to the 2021 Census foreign-born share
  (16%). Two 16% figures stay longhand by design: the "16.0%" comparison against "one in
  six is 16.7%" needs a decimal a token cannot render, and the front-matter short answer
  flows into a meta description the citation transform is not verified to reach.

The warning count fell from fourteen to eleven, and each remaining one is a coincidental
value match against an unrelated metric. The README count was corrected to match (#29, #30).

### Added

- `LICENCE`: MIT for code and original writing; Open Government Licence v3.0 attribution
  for the Crown copyright material the data layer reproduces. The repository was public
  with no licence at all, which is the opposite of the transparency the project claims.
- `.github/workflows/validate-data.yml`: the data contract now runs on every push and
  pull request. It was previously enforced only by remembering to run it.
- `package.json` so the check runs as `npm test`.
- This changelog.

### Fixed, net migration timeseries rebuilt after verification against ONS

The series was flagged `BLOCKED, DO NOT PUBLISH` on 22 July 2026 and has now been replaced.
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

### Added, three timeseries and eight metrics

All verified against primary sources on 22 July 2026, each value carrying a quoted table
cell or sentence.

- `asylumApplicationsTimeseries.json`: applications 2010-2025, calendar years, people basis
  throughout (table Asy_00a).
- `asylumBacklogTimeseries.json`: initial decision backlog 2010-2025, end-December stock, on
  both the people and cases bases, 64,426 against 48,723 at the end of 2025, the same queue
  counted two ways.
- `migrationFlowsTimeseries.json`: long-term immigration and emigration 2012-2025, the two
  gross flows behind net migration.
- Returns, previously absent despite being a specified homepage card: enforced (9,723),
  voluntary (29,284), the combined total (39,007, calculated, since the Home Office publishes
  only a rounded 39,000), asylum-related (11,918), and refused entry at port (17,623, held
  specifically to stop it being folded into the returns total).
- Initial decisions by outcome, previously trapped inside a prose note: decisions total
  (128,300), refusals (79,719) and withdrawals (16,901).

### Changed, figures moved to year ending March 2026

Visa, citizenship and settlement figures were being presented as latest while a newer Home
Office release existed. Entry clearance 809,407 to 778,625; sponsored study 426,471 to
409,954; work 261,112 to 252,775; Health and Care main applicants 13,286 to 10,509; family
66,610 to 62,470; citizenship 235,782 to 236,512; settlement 146,405 to 152,306.

### Investigated, Afghan resettlement total is correct

The three scheme figures sum to 38,587 against a stated total of 38,617. Neither is wrong:
the Home Office records 30 people under the programme with scheme name unknown, and states
that breakdowns exclude them while totals include them. No value changed; the explanation is
now in the metric's notes. Also recorded there: the Home Office calls the third route the
Afghanistan Response Route on its topic page and the Afghanistan Relocation Route in its own
table Res_01.

### Added, the first six claim checks

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
to one in one direction, 80%, against a two-thirds limit written into the same document
hours earlier. A sixth claim was added rather than one of the five dropped, since each
corrects a distinct class of error and cutting one to hit a ratio would game the rule
rather than satisfy it. The set now runs four to two. Recorded in foundation section 15
rather than quietly corrected, because the failure is evidence for making the constraint
mechanical instead of trusting it to review.

### Added, the glossary

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
internal links resolve, and every term says what the word does NOT mean, a definition that
leaves the misreading intact has not done the job.

**A bug the negative tests caught.** The first version of the glossary checks ran after the
error report and `process.exit`, so every glossary error was collected and silently
discarded: a broken page passed as green. Found only because each new check was tested
against a deliberately broken copy rather than assumed to work. Reporting now happens last,
with a comment recording why.

### Fixed, defects in the first draft of the content

Found by auditing the content against the data layer rather than re-reading it.

- **Three currency tokens had no £.** `{{fiscal/government-spending-on-the-asylum-system}}
  billion` renders as "4.9 billion", not "£4.9 billion". The token contract was never
  actually specified, which is why this was possible: a token renders the formatted value
  and nothing else, and the author supplies the unit. Now documented and checked.
- **Three live values were hard-coded longhand**, silently opting out of the staleness
  protection the token system exists to provide, including "now stands at 331,000", a
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

### Added, sources and methodology page

`content/sources-and-method.md`, meeting the section 17 launch gate. Covers what the site
is and is not, the source catalogue, the data contract in plain terms, confidence levels,
the cross-cutting caveats, why reference periods do not line up, the update commitment,
corrections, what the site does not cover, how it was built, and reuse terms.

Structural blocks, the source catalogue, confidence levels and key caveats, render from
`sources.json` and `meta.json` via `{{> partial }}` syntax rather than being restated in
prose, so the page cannot drift from the data it describes. The validator knows the set of
renderable partials and rejects unknown ones.

Two sections are deliberately unresolved and marked as such on the page. The **update
commitment** proposes fourteen days from each release but needs the owner's sign-off,
because publishing a target that is not met is worse than publishing none. The **AI use**
disclosure states plainly that AI assistance was used in research, drafting and checking,
and that human review before publication is a commitment about launch rather than a
description of the research stage, the honest version, not the reassuring one.

The validator now covers standalone content pages, which were previously unvalidated: only
claims and the glossary were checked, so this page's tokens went unverified until the loop
was added. It immediately caught an undeclared figure.

### Fixed, stale source catalogue entry

`sources.json` still described Home Office visa and citizenship figures as coming from the
year ending December 2025 release, after those figures moved to year ending March 2026.

### Changed, every figure now carries a publication date

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
treats a documented impossibility as settled rather than as outstanding debt, a counter
that can never reach zero stops being read.

That figure remains a maintenance liability: it is approximate, it decays weekly, and it
should probably not ship at all.

### Fixed, moved source URLs

Two Skills for Care URLs redirected; both updated to their targets, verified as resolving.
The Home Office data tables redirect is left alone, since it only strips a fragment
identifier useful to a reader.

### Added, Eleventy site

Framework chosen: Eleventy 3, matching the hosting already connected on Netlify. Renders the
overview, the glossary, the claims index, six claim pages and the sources page.

**Content files are not pre-processed as templates.** `markdownTemplateEngine` is `false`,
because `{{theme/metric-id}}` is this project's citation syntax and Liquid would otherwise
consume it, silently breaking the guarantee that no figure is hard-coded in prose. Citations
resolve in a post-render transform instead, and an unresolved token or unknown partial throws
rather than shipping `{{...}}` to a reader.

Two wrinkles handled, both from markdown running first: it escapes the `>` in a partial to
`&gt;`, and it wraps a block partial in a `<p>`, which would nest a table inside a paragraph.

`netlify.toml` runs `npm test` before the build, so a figure missing its source or a claim
citing a deleted metric fails the deploy rather than reaching a reader. Also sets a strict
content security policy; the site loads no external resources at all.

### Fixed, glossary rendered six h1 elements

The five group headings used a single `#`, which became `<h1>` alongside the layout's page
title: six h1s and a broken document outline, a WCAG 1.3.1 failure. Groups are now `h2` and
terms `h3`. The validator was codifying the wrong level, so it was updated too, and it now
rejects any `#` heading in that file, the layout owns the page's only h1.

Found by checking the built HTML rather than by reading the markdown, where the levels looked
perfectly reasonable.

### Fixed, defects found by looking at the built pages

None of these were visible in the source. All were found by rendering the site and looking
at it, which is the only way this class of defect surfaces.

- **Every glossary link on the site was dead, and the anchor syntax was visible as junk.**
  Markdown does not support `{#id}` natively, so `### Flow and stock {#flow-and-stock}`
  rendered as a heading with that literal text in it and produced no `id` at all. All 54
  links from the claims to definitions went nowhere. `validate-content.mjs` had checked
  that the markdown declared an anchor on every term, which was true, while the build
  silently discarded them. **Validating the source is not validating the artefact.**
- The dashboard caveat was being dumped mid-sentence into the homepage by a stray
  `truncate(0)`, which does not mean "output nothing".
- Every claim page shared one generic `h1`, "Claim check", poor for search, browser tabs
  and heading-by-heading navigation. The claim itself is now the `h1`, placed inside its
  card under the "The claim" label so the framing travels with it and a screenshot of the
  heading can never read as this site asserting the claim.
- Claim prose ran to 99 characters per line, well past comfortable reading. The claim
  article is exempt from the page measure so the card can run full width; its prose is not.
- A CSS `margin-top` was silently overridden by a later `margin` shorthand.
- The homepage showed the last three claims rather than the first three, so the editorial
  ordering, which deliberately runs both directions early, was inverted.

`scripts/check-build.mjs` added and wired into `npm run build` and CI. It checks the output
rather than the input: every internal link and fragment resolves, no template or anchor
syntax survives into the HTML, and every page keeps its lang, skip link, single `h1` and
unbroken heading order. Verified by removing the anchor fix and confirming it reports all 54
dead links.

### Added, robots.txt disallowing all crawlers

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
content, and the fix for that is an `X-Robots-Tag: noindex` header, which requires crawling
to be *allowed* so the header can be read. The two mechanisms conflict; use one or the other.

### Fixed, the build did not clean its output directory

Eleventy leaves `_site` in place between builds, so a deleted source file kept its stale
artefact. This briefly made a negative test pass when it should have failed: `robots.txt`
was removed from `content/` and the check still found the previous build's copy. The build
now clears `_site` first. Netlify builds from clean anyway, so this only ever misled local
verification, which is exactly where it matters most.

### Added, migration and asylum pages, with charts

Six charts across the two pages, rendered as inline SVG at build time: net migration over
time, immigration and emigration together, reason for migration, asylum claims over time,
initial decisions by outcome, and the first-decision queue on both counting bases.

No JavaScript and no charting dependency. The chart is in the HTML, so it works with
scripting off and needs no exception to the site's content security policy. Three editorial
rules are enforced in `lib/charts.mjs` rather than left to whoever writes the page: the
y-axis always starts at zero, since a truncated axis exaggerates change and this site exists
to correct that; every chart carries its figures as a real table; and no series is
distinguished by colour alone, lines differ in stroke pattern and are labelled directly at
their end. The bar chart uses one neutral colour for grants, refusals and withdrawals, since
section 10 forbids red/green moral coding of outcomes.

The methodology break at June 2021 is drawn on both ONS charts rather than left to a
footnote.

### Fixed, citations silently rendered as NaN in Nunjucks pages

`{{theme/metric-id}}` survives in markdown because markdown is not pre-processed as a
template. Nunjucks pages **are** pre-processed, so the same braces were evaluated as an
arithmetic expression and produced `NaN`, fifteen times across the two new pages, including
inside a table of asylum statistics.

`check-build.mjs` did not catch it. It looks for leftover `{{ }}` in the output, and there
was none: the engine had consumed the braces and left a number-shaped result behind. Looking
for unrendered syntax is not enough; the failed *result* has to be looked for too. The check
now fails on `NaN`, `undefined` or `[object Object]` appearing in visible text.

Nunjucks pages now cite through a `{% figure "theme/id" %}` shortcode, which calls exactly
the same renderer as the markdown path.

### Fixed, chart lines rendered as filled areas

`.series-0 { fill: ... }` overrode `.series { fill: none }`, same specificity, later rule
wins, so every line chart drew as a solid filled shape. Selectors are now element-qualified,
because a path, its markers and its label each need different fill behaviour.

### Added, what the asylum system costs

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
Adding it would have made the published set five restrictionist to two pro-migration, 71%,
over the two-thirds limit, and the only unused pro-migration claim substantially duplicates
one already written. The balance rule is meant to constrain editorial decisions rather than
be worked around, so the claim waits for a genuine counterpart.

### Fixed, six false statements found by a full-project audit

All verified by recomputation before and after.

- `asylum.njk` said "two are on the cases basis and three on the people basis" of a table
  with **one** cases figure and **four** people figures, wrong about the site's own most
  important caveat.
- The flows chart summary said emigration "rose steadily from 2021"; it **fell** from
  680,000 to 642,000 in the final year. The line sloped down while the caption said up, and
  the same text sits in the SVG `desc`, so screen-reader users were told the opposite.
- The citizenship card said "Down 13%"; the figure is 12.1%, and the metric's own notes say
  12%. Card text left behind when the figure moved to year ending March 2026.
- The backlog chart said "fallen by roughly half"; it is 60% on people and 63% on cases.
- The asylum claims chart said "broadly flat through the 2010s"; claims **doubled**, from
  22,644 to 45,537.
- A claim check joined a **main-applicant** rate to a **people** count as "the remainder", the exact error the site exists to correct. Now states both bases explicitly.

Also: one figure recorded a `retrieved_date` six days before its `published_date`.

### Fixed, two rendering defects

- **Series labels were clipped.** "People claiming asylum" rendered as "People claiming a":
  right padding was fixed at 118px while the label needed 148. It is now derived from the
  longest label.
- **Every chart rendered at two-thirds width.** `figure.chart` was missing from the
  measure-exemption list. That this was unintended is proved by the CSS itself, the chart's
  own children carry measure caps that are redundant if the figure is already capped.

### Changed, the checking apparatus, after an adversarial audit

The audit's finding was systemic, not incidental: **every checker verified a property of the
source or the declaration, labels agree, tokens close, text nodes are clean, rather than
the property readers depend on, and every green message claimed the latter.**

- **`DO NOT PUBLISH` now fails the build.** It printed a banner and exited 0, so a file
  flagged unfit for publication deployed and the warning scrolled past in a build log. The
  one mechanism built for "well-formed but unfit" was advisory in every automated path.
- **The content contract now covers `.njk`.** Five reader-facing pages, carrying most of
  the site's figures, were checked by nothing. Coverage went from 1 page to 7.
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
- **`check-sources` runs in CI**, it previously ran in no pipeline at all, and now covers
  all four timeseries and every chart source URL. It immediately caught a NAO URL invented
  for the costs page rather than taken from the data layer.
- **CI runs weekly on a schedule.** Time-based rules, the twelve-month claim expiry, link
  rot, could only fire when someone happened to push.
- **Every success message was rewritten to claim only what it verifies.** "All sourced,
  dated, graded and singly held" was false on three counts.

### Changed, the balance rule is replaced by a representation floor

The two-thirds cap counted card labels rather than corrective content, and the audit found
it blocking the right thing. A claim's direction records *whose claim* is corrected, and
correcting a restrictionist claim **serves** pro-migration readers. So a cap on
restrictionist-labelled claims capped how much the site could serve that side.

Concretely, it blocked adding "immigrants are a drain on the public finances", the
correction a pro-migration reader would most want to see. A rule that prevents a correction
is measuring the wrong thing.

Replaced with a floor: at least two claims correcting each direction, no ceiling. The real
split (now 5:2) is disclosed on the claims page with the reason, rather than a ratio implied
to prove balance.

### Added, trust mechanisms that were promised and absent

- **An error-reporting route on every page.** The corrections policy asked readers to report
  errors and gave them nowhere to do it. The footer now links to issues and the changelog.
- **A visible pre-launch notice.** The admission that three commitments are unmet lived only
  in `robots.txt`, addressed to crawlers, invisible to the humans who can read the site.
- **The style guide** (`/style-guide/`), referenced live from the glossary and previously
  non-existent. It separates the wording rules that are statistical precision from those
  that are value judgements, and owns the second kind as choices.
- **Period and source inside the claim card**, so a screenshot carries them, per section 8.5.4.
- `last_reviewed` on the two pages that lacked it; "non-EU+" defined at first use; a
  repository filename removed from reader-facing prose; a causal claim in a chart note
  attributed to ONS rather than asserted; the glossary's superseded dataset title corrected.

### Fixed, the foundation document had drifted from the site

A full read of `docs/foundation.md` against the built site, the records in `data/` and what
the four scripts assert. Around twenty places where the document promised, described or
assumed something the site does not do. The pattern was the one this project keeps hitting:
something verified the source or the declaration rather than the property a reader depends
on, and the text claimed the latter.

- **Three rows of the risk register named things that did not exist.** Silent staleness, the
  top-rated risk, claimed the site displayed its own lateness and that the validator aged
  figures against their source's update frequency. Neither existed. Quote-mining promised a
  share image. Abandonment promised a notice a static site cannot publish. A mitigation
  naming something unbuilt is worse than an empty cell, because the empty cell does not tell
  you the risk is handled.
- **The withdrawn two-thirds balance rule survived in five places**, including an acceptance
  criterion the published set now fails at five to two. Replaced with the representation
  floor that is actually enforced.
- **Four different counts of the data layer, none right**: 66, 73, eighty, and 33 outstanding
  publication dates. It is 67 metrics plus 100 series points, with one publication date
  outstanding and documented as unrecoverable.
- Section 14 still listed the glossary, the claims, the methodology page and the about page
  as outstanding or blocked. All four had shipped. Section 11 still offered a choice of
  framework and three charting libraries, and expected a `src/` that will never exist.
  Sections 6 and 19 were missing five publishers the site cites.
- The claim table used a "Both" direction the validator cannot accept, and omitted a seventh
  published claim.

### Added, figures are aged against their source's publication cycle

`scripts/validate-data.mjs` now reports any figure not re-checked within its own source's
cycle, which the risk register had claimed for some time that it did. `updateFrequency` was
being read as a required field and compared against nothing.

Building it needed a link from a figure to its catalogue entry, which the contract did not
have. A hostname cannot supply one: `www.gov.uk` serves the Home Office, the Migration
Advisory Committee and the tribunals statistics, and several figures cite an
`assets.publishing.service.gov.uk` hash that names no publisher at all. **`source_id` is
therefore a new required field on all 67 theme metrics**, derived from `source_name` and
asserted to resolve against `sources.json`.

The check reports rather than failing. A source publishing a new edition does not make our
figure wrong, it makes it worth re-checking, and a build that broke on a Tuesday because a
quarterly release landed would be switched off inside a month. It prints on every run
including when it finds nothing, and names the 23 figures it cannot age because their sources
publish irregularly, plus the timeseries points, which carry no `retrieved_date`.

### Changed, the MVP cap counts source releases rather than figures

The cap was 15 to 20 published figures and 36 records reach a reader, so it was either
breached or wrong. It was counting the wrong thing. Updating thirteen Home Office figures
from one quarterly release is a single session; publishing four of them instead would save
almost nothing while making the site worse. What predicts staleness is the number of releases
to chase.

The routine cycle is now capped at four releases and currently stands at three, covering 22
of the 36 published figures: Home Office quarterly, ONS twice yearly, and the Ministry of
Justice tribunals statistics quarterly. The other 14 come from sources that publish
irregularly. The figure count follows from the cap and is recorded rather than targeted.

### Fixed, live figures hard-coded in prose inside `data/`

Nine current record values were written longhand in the data files, where `checkLiterals`
never looked: it walked `content/` only. The one file whose entire job is to hold references
and never values was the only file nobody scanned for values.

Seven of the nine were in `meta.json`'s caveats, which render on `/sources-and-method/` about
2,200 characters below the sentence telling a reader that a current value written longhand
anywhere in a page stops the build. Among them the people-versus-cases pair, both backlog
figures, the OBR illustrative scenario and refused entry at port: the figures those caveats
exist to protect, frozen in prose.

All nine now cite tokens, which works because `resolve-citations` runs on the built HTML
after the partials expand. `scripts/validate-content.mjs` now holds every data-file field
that reaches a page to the same rule as a content page, and deliberately skips the fields no
template renders, because a clean scan of prose nobody sees would read as coverage of prose
everybody sees. A data file has no front matter, so a deliberately frozen figure is declared
in a sibling `historical_literals` key. There is one: the last caveat is a worked
reconciliation at a single vintage whose whole point is that the subtraction does not come
out, and citing a live record for any part of it would let one revision leave the arithmetic
around it wrong.

Three sub-100 values were genuine citations and became tokens. Four are coincidences,
reviewed and left as warnings, which is what the warn class is for.

### Changed, the home page

- **Two cards added**, people awaiting a first decision and people in asylum support, taking
  the set to eight. Both are what the asylum argument turns on and both were one click away
  while the home page showed neither. Both are stocks counted on a single day, so both cards
  say so in their first sentence.
- **A "Checked" date on every card.** The card showed when the source published a figure but
  not when this site last verified it, which is the date a reader needs to judge whether the
  site is current. It was only ever in the data files.
- **A figure with no publication date now says so** rather than rendering "Published"
  followed by nothing. The promise was made in foundation section 2.1 and nothing implemented
  it. Unexercised today, because the only record without a publication date is cited on no
  page.

### Removed, the dashboard fields nothing rendered

`lastUpdated`, `referencePeriod`, `caveat`, a `supporting` block of four denominators, and
`display` and `explanation` on every card. All six were required by the validator and
rendered by no template, and one of the denominators reached no reader by any route.
Validated prose that no page shows is prose that rots unwatched. `dashboard.json` is now
`cards`, and a card is an id, a ref, a label and one paragraph.

### Fixed, link text that named nothing

"The claim check" was the text of a link on the migration, asylum and costs pages, each going
to a different check, and the glossary said the same words twice more as plain text with no
link at all. Every page passed the duplicate-name rule, because that rule is scoped to a
single page and these sat one per page. Read across the site, five words pointed at five
destinations. The home page panels had a milder version: "See the figures" and "See why that
matters", beside a third panel whose code comment justified its own wording by claiming the
two siblings already named what you would find. They did not.

Every link to a claim check now says where it goes when read on its own, which is how anyone
listing a page's links reads them. "Whether ..." rather than the bare claim, deliberately:
claim text as link text would read as the site asserting the claim, which is the same reason
`claim.njk` keeps the claim inside a "The claim" label.

`scripts/check-build.mjs` now refuses a small denylist of phrases that describe no
destination, checked against the built HTML so it catches markdown, Nunjucks and the layouts
alike.

### Changed, required front matter on a claim

`period` and `source` join the required fields. `claim.njk` renders both behind a
conditional, so a claim that omitted them lost them from the card with nothing on the page to
show it, while foundation section 8.5.4 requires both inside the card's visual boundary. All
seven claims already carried them; this stops the eighth not to.

### Changed, the about page

"Trading as Legendary Tone" is removed. It carried a commercial implication that sat
awkwardly beside the funding statement two paragraphs below it, which says the site is
unfunded with no advertising, sponsorship or commercial relationship. The named person was
always the load-bearing part and it stays.

### Changed, the update commitment is signed

**One month** from each of the three releases that drive the site, replacing an unsigned
proposal of fourteen days from two of them. The sign-off fence is removed from the sources
page and the pre-launch banner no longer says the commitment is outstanding.

Three changes of substance rather than one. The window moved from fourteen days to one month,
because the most recent full cycle took twenty-seven days and this is one person working
unfunded: a target that is missed damages trust more than a slower one that is met. The
Ministry of Justice tribunals release was added, having been absent from the proposal while
driving the appeals queue, the appeal success rate and a claim check. And the fourteen figures
from irregular publishers are now described as carrying no promised schedule, rather than
being covered by a vague "other sources follow as their material changes", because a schedule
nobody can predict is not a commitment.

The page also now says that an automated check ages every figure against its own source's
cycle before anything is published, and that it runs weekly whether or not anyone is working
on the site. That check was built the same day and is what makes the commitment enforceable
rather than remembered.

### Outstanding

- One figure has no publication date, documented and exempted; see above.
- Five Commons Library URLs cannot be checked automatically: the host returns 403 to every
  request, including deliberately invalid paths, with or without a browser user-agent.
  `scripts/check-sources.mjs` reports them as uncheckable rather than broken, because calling
  a live link dead trains the reader to ignore the checker. Verify them by hand.
- Three source URLs redirect, which usually means a newer release has superseded the figure:
  the Home Office data tables anchor, and two Skills for Care pages.
- Eight of the fifteen claims in foundation section 8.5.3 remain undrafted. The table gained a
  fifteenth row when the seventh published claim was found to be missing from it.
- Ten unit-qualified figures in content and four in `data/` match a live metric value and
  surface as warnings on every build. All were reviewed and are coincidences: several metrics
  share a small value. Review them; do not suppress them.
- The pre-publication human review has not happened. It is the last launch blocker. Its
  evidence is assembled in `docs/PRE-PUBLICATION-REVIEW.md`.
- Three pieces of scoped, unbuilt work, tracked in `docs/BACKLOG.md`: the release notifier and
  evidence check, citing a series point and reconciling the four figures held twice, and the
  eight undrafted claims.

