# Pre-publication review, the six pages it never opened

Generated 2 August 2026 from the live data layer, on the method of
`docs/PRE-PUBLICATION-REVIEW.md`. **This is the evidence, not the review.** Every claim made in
prose is set beside what the data actually says, so the reading is comparison rather than
research.

**Why this document exists.** The review of 27 July 2026 read ten pages of sixteen:
`asylum.njk`, `costs.njk`, `migration.njk` and the seven claim pages, which are the fourteen
headings in `verification.txt`. The six below were never opened. Recording the review as passed
is a judgement about these six as much as about the ten, and both of the launch gates sit on one
of them.

**The split is already visible to a reader.** `base.njk` prints `last_reviewed` on every page, and
the ten the review read carry **2026-07-27** while these six carry 22 or 23 July. Whether the six
dates move is the last checkbox at section 8, and it should move only if the pages were read.

**Scope.** What the automated checks cannot establish. That is a different surface here than it
was for the ten: none of these six draws a chart, and four of the six cite no record in prose at
all. What they carry instead is **prose about figures**, and **prose about this site**, and the
second kind is the reason the pass is worth running. A page that describes the checking apparatus
is the one place where a promise can outrun what the checks do, and this project's own record
says that is its signature failure.

**How to read it.** A value shown as `{{ ... }}` is a citation: it is resolved from the data
layer at build time and cannot go stale, so it needs no checking. **Only the literals and the
relationships need your eyes.** Where a literal or a relationship matches something the data
layer holds, it is marked, because those are the ones a citation could protect in future.

**Nothing below is a finding, and nothing below is a verdict.** It is unverified prose placed
next to its data. Where the backlog already holds an item about one of these pages it is named by
its letter and not restated, so that reading this cannot start a second list.

Out of scope, deliberately: `content/404.md`. It is in neither count, the review's sixteen or
this item's six, and the launch readiness review has already read it.

---

## 1. The overview page

`content/index.njk` · `/` · reviewed 2026-07-23

**It cites no record in prose.** Every figure on it comes through `data/dashboard.json`, whose
eight cards carry a `ref` and a `whatThisMeans` paragraph. The value, unit, period label, source,
publication date, check date and confidence grade are all rendered from the record. The
paragraph beside each is written by hand and is what needs reading.

The list of periods under *Before you compare these figures* is generated from the cards
themselves, so it cannot fall out of step with them. The paragraph introducing it is not.

### 1.1 The paragraph introducing the periods

> 'Some count people, one counts grants, one is a share of the population and one is money spent.'

**What the eight cards hold:** five in `people` (net migration, asylum claims, awaiting a first
decision, in asylum support, small boat arrivals), one in `grants` (citizenship grants), one in
`%` (born abroad), one in `£ billion` (asylum system cost).

### 1.2 The paragraph introducing the cards

> 'Each figure below states what it counts and over what period.'

**What a card renders:** `shortLabel`, `value`, `unit`, `period_label`, `source_name` as a link,
`published_date`, `retrieved_date`, `confidence_level`, and the hand-written `whatThisMeans`.
`metric_name`, which is the record's own statement of what the figure counts, and `notes` are not
rendered.

### 1.3 Net migration

`migration/net-migration`: **171,000** people, year ending December 2025, `provisional`.

> 'Net migration nearly halved over the year to December 2025, from a revised
> {{migration/net-migration-2}} the previous year, mainly because fewer people arrived on work
> and care visas. It is the lowest level since early 2021. These figures are provisional and ONS
> revises them as more data arrives.'

- The cited previous year is **331,000**. 171,000 against 331,000 is a fall of 48.3%.
- **'the lowest level since early 2021'** is not settleable from the series this site publishes.
  `netMigration` is calendar-year and holds **93,000 for 2020**, which is lower, and **467,000 for
  2021**. A year-ending figure for early 2021 is not in the data layer.
- The 'work and care visas' clause is backlog item **A4**.

### 1.4 Asylum claims

`asylum/asylum-applications`: **93,525** people, year ending March 2026, `official`.

> 'This counts people, not cases. It relates to {{asylum/asylum-applications-main-applicants}}
> main-applicant applications, down 9% on the previous 12 months, but the figure remains high by
> historical standards. The single largest nationality was Pakistan (about 10%).'

- **'about 10%'** is the current value of `asylum/largest-nationality-claiming-asylum-pakistan`,
  10%, year ending March 2026, written longhand in the sentence that names it. The build's
  unit-qualified warning for this card reports the same `10%` against
  `population/non-british-share-of-uk-population` instead, which is backlog item **R3**.
- **'down 9% on the previous 12 months'**: no record holds the previous 12 months.

### 1.5 Awaiting a first decision

`asylum/asylum-backlog-people-awaiting-an-initial-decision`: **48,758** people, as at
31 March 2026, `official`.

> 'A stock, not an intake: it is the queue on one date, and it has fallen sharply from its 2023
> peak. It counts people including dependants; the same queue counted as main-applicant cases is
> about a quarter smaller. This is one of three separate queues, and the appeals queue has been
> moving the other way, so there is no single number for "the backlog".'

- **'about a quarter smaller'**: `asylum/asylum-backlog-cases-awaiting-an-initial-decision` is
  **35,744** cases on the same date, which is 26.7% smaller. The record exists and is not cited.
- **'its 2023 peak'**: the `asylumBacklog` series is an end-of-year stock and peaks at
  **160,919** people at the end of **2022**, falling to 128,786 at the end of 2023. The higher
  within-year peak the site publishes, **175,457** in June 2023, is prose on `asylum.njk` and is
  in no record or series.
- **'the appeals queue has been moving the other way'**:
  `asylum/asylum-appeals-backlog` is **87,450** cases at 31 March 2026, `provisional`. There is no
  appeals series, so a direction over time is not settleable from the data layer.

### 1.6 In asylum support

`asylum/people-in-receipt-of-asylum-support`: **97,519** people, as at 31 March 2026, `official`.

> 'Also a stock. It includes people at every stage of the system, some waiting since well before
> this year, so it is not a count of recent arrivals. It excludes unaccompanied asylum-seeking
> children, who are supported by local authorities and counted separately.'

- No literal. The exclusion is repeated word for word in the glossary at *Asylum support and
  asylum accommodation*, and both are prose rather than a recorded field.

### 1.7 Small boat arrivals

`asylum/small-boat-arrivals-calendar-year-2025`: **41,472** people, calendar year 2025,
`official`.

> 'This was the second-highest annual total on record (the peak was 45,774 in 2022) and 13%
> higher than 2024. It is a calendar-year count, so it does not line up with the year-ending-March
> figures elsewhere on this site, which give a different number for the same route.'

- **45,774** is in no record or series, and is on the build's unrecorded-figure report. It was
  deliberately left there when the frozen-history declarations were made, because it sits under
  'the peak was'.
- **'13% higher than 2024'**: no record holds 2024. 41,472 divided by 1.13 is about 36,700.
- The year-ending-March figure it points at is `asylum/small-boat-arrivals-year-ending-march-2026`,
  **39,271**, which the glossary cites.
- This record's grade and its 'finalised calendar-year total' note are backlog item **R2**.

### 1.8 Born abroad

`population/foreign-born-share-of-total-uk-population`: **16%**, 2021/22 Census, `official`.

> 'About 10.7 million people, or roughly one in six residents, were born abroad at the 2021/22
> Census, up from about 9% in 2004. ONS's provisional rolled-forward estimate put the share at
> about {{population/foreign-born-share-mid-2024}}% by mid-2024, but that is a statistic in
> development, not an accredited count.'

- **'10.7 million'** is exactly `population/foreign-born-population-of-the-uk`, 10,700,000, and is
  on the build's warning list rather than its error list because a citation would render
  '10,700,000' and change the sentence.
- **'roughly one in six'** against the cited 16%: one in six is 16.7%.
- **'about 9% in 2004'** is in no record. `population/largest-country-of-birth-among-foreign-born-india`
  is also 9%, and the build's warning matches that, which is a coincidence of value.
- The grade on the card's own record is backlog item **R1**.

### 1.9 Asylum system cost

`fiscal/government-spending-on-the-asylum-system`: **£4.9 billion**, financial year 2024-25,
`official`.

> 'The NAO notes this total does not capture all costs, particularly those falling on local
> authorities, so it understates the true system-wide cost. Most of it was accommodation and
> support (£{{fiscal/home-office-spending-on-asylum-accommodation-and-support}} billion), of which
> hotels were £{{fiscal/home-office-spending-on-asylum-hotel-accommodation}} billion, that last
> figure from the Home Office's own annual accounts rather than from the NAO.'

- All three values are cited: 4.9, 3.4 and 2.1. 3.4 of 4.9 is 69%.
- The card places **2.1 inside 3.4 inside 4.9**. Backlog item **R1** records that the notes on
  the hotel record say the nesting is this site's construction and that neither publisher places
  one figure inside the other; that item names the costs page. This card is a second site of the
  same construction, and the two figures come from different publishers, which the sentence says.

### 1.10 Citizenship grants

`population/british-citizenship-grants`: **236,512** grants, year ending March 2026, `official`.

> 'Down 12% on the previous year, from 269,178. Naturalisation accounted for 165,429 of the grants
> and registration for 71,083. Applications rose 18% over the same period, so grants and demand
> are moving in opposite directions.'

- **165,429 plus 71,083 is 236,512**, exactly the cited record.
- 236,512 against 269,178 is a fall of 12.1%.
- All three literals are in no record and are on the build's unrecorded-figure report. **269,178**
  is backlog item **R2**, which records that it is not on the page the record cites.
- **'Applications rose 18%'**: no record holds applications.

### Checkboxes

- [ ] Every literal above matches the data, or is meant to be a frozen historical figure
- [ ] Every relationship claim above (peak, lowest since, a quarter smaller, most of it, moving
      the other way) holds against the data beside it
- [ ] The two paragraphs describing the card set describe the card set that exists

---

## 2. The glossary

`content/glossary.md` · `/what-the-words-mean/` · reviewed 2026-07-23 · 23 terms

**Both launch gates are on this page**, and they are the owner's. Gate 1 is the *Grant rate*
entry, gate 2 is the *Net fiscal impact* entry. What is below adds evidence to them and does not
restate them.

It cites 19 records in prose and declares two frozen historical literals, `431,000` and
`345,000`, the published vintages of the year ending December 2024 net migration estimate.

### 2.1 Grant rate, and the sentence corrected at four other sites

> 'The rate measured at final outcome, after appeals, has historically run 17 to 29 percentage
> points higher, so the initial rate understates eventual protection rates.'

PR #72 gave the publisher's 17 to 29 point range the window the publisher states it for, **2007 to
2020**, at the record and at four prose sites. **Five places carry the range. This is the one that
carries no window:**

| Where | How it reads |
| --- | --- |
| `data/asylum.json`, the record | 'for each year of claim between 2007 and 2020' |
| `content/asylum.njk` | 'For claims made between 2007 and 2020' |
| `refused-asylum-seekers-are-eventually-recognised.md`, twice | 'for claims made between 2007 and 2020', then 'covering claims made between 2007 and 2020, not a current one' |
| `content/glossary.md`, here | no window |

The sentence also says 'final outcome' where the record says the Home Office's terms are 'latest
outcome' and 'latest decision', and 'after appeals' where the publisher says appeals **and
reconsiderations**. Both are named in gate 1.

The entry's line above says the published rate 'excludes withdrawals'. The record says it
'excludes withdrawals **and administrative outcomes**', and
`asylum/asylum-administrative-outcomes` holds 5,931 people for the same period.

**This page is hard-wrapped and the sentence straddles two lines**, so a line-based `grep` for
'17 to 29' returns the other four and not this one. Join the lines before concluding absence.

### 2.2 Net fiscal impact

> 'Across studies the estimate falls within roughly plus or minus 1% of GDP, a range that spans
> zero.'

`fiscal/net-fiscal-impact-of-immigration-as-a-share-of-gdp` holds a null value with a range of
**-1 to +1 % of GDP**, `estimated`, from the Migration Observatory briefing of June 2026. The
'1%' here is on the build's unit-qualified warning list against that record's `range_max`. Gate 2.

### 2.3 The other relationship claims, set beside the data

| As written | What the data layer holds |
| --- | --- |
| 'Those figures are of similar size and describe entirely different things' (100,625 claims in 2025 against 97,519 in support at 31 March 2026) | Both cited. They differ by 3,106, or 3.2% of the smaller |
| 'Mixing the two produces answers that are wrong by roughly a fifth' | 76,714 applications against 93,525 people is 18.0% lower |
| 'a substantial share of appeals succeed' | `asylum/asylum-appeal-success-rate` is 40% for the quarter January to March 2026, `provisional`, and is not cited here |
| 'The initial decision queue has fallen sharply while the appeals queue has risen to a record' | The initial-decision series, people basis, falls from 160,919 at end-2022 to 64,426 at end-2025. There is no appeals series, so 'to a record' is not settleable from the data layer |
| 'It includes British citizens leaving, who are a substantial part of the total' | No record holds a British-citizen share of emigration |
| 'the figure is published on three bases at once: calendar year, year ending, and year to date' | All three exist: 41,472, 39,271 and 9,000. The third is `asylum/small-boat-arrivals-2026-year-to-date`, which is unpublished reserve and whose own notes forbid publishing it unchecked. Backlog item **A1** |
| 'Refused entry at port is counted separately again' | `asylum/returns-refused-entry-at-port`, 17,623, is held and not cited here. The wider silence about returns is backlog item **R1** |
| 'the same underlying reality produces two very different numbers' | Both cited, 93,525 and 76,714 |

### 2.4 The backlog table

Three rows, all cited: 48,758 people awaiting an initial decision, 87,450 appeal cases, 224,742
total casework cases at June 2024. The third is marked **Not current** in the table itself, which
is where the staleness a reader needs is stated.

### 2.5 The wording note under *Irregular arrival*

It quotes the Home Office dataset under both titles and says which edition changed. That matches
`data/asylum.json`'s note on the same rename, and the record's `source_name` carries the current
title. The style guide's promise about this is section 6.2 below.

### Checkboxes

- [ ] Gate 1: the Grant rate entry, rebuilt on the corrected record, including the window
- [ ] Gate 2: the Net fiscal impact entry, without the retired 'spans zero' argument
- [ ] Every relationship claim in 2.3 holds against the data beside it
- [ ] The two frozen literals are still the right ones to freeze

---

## 3. The claims index

`content/common-claims.njk` · `/common-claims/` · reviewed 2026-07-23

It cites no record. Its two numbers are computed from `collections.claims` with `countWhere` and
cannot be typed wrong.

### 3.1 The selection criteria, as the page states them

> 'A claim qualifies for this page only if it demonstrably circulates, if the error in it is
> statistical rather than political, if our sources can settle it, and if we would apply the same
> test to the opposite claim.'

These are the four criteria of section 2 of `docs/PRE-PUBLICATION-REVIEW.md`. **The review failed
2.6 and 2.7 on the first of them**, and both were kept on the strength of the site's published
no-attribution policy, which is on the style guide at section 6.4 below. The backlog's gate for
recording the review as passed is where those two meet this sentence.

### 3.2 The counts and the floor

> 'The current set corrects five restrictionist claims and two pro-migration ones. That is not an
> even split and we are not going to present it as one.'

The front matter gives **5 restrictionist and 2 pro-migration**, and the build reports each meets
the enforced minimum of 2. The pro-migration side is **exactly on the floor**, which is what
closed the option of dropping claim 2.7.

### 3.3 The claim about the corrections themselves

> 'Judge the balance by reading the corrections, not counting them. The two longest and most
> pointed checks on this site both run against the pro-migration side.'

Backlog item **A4**, with a recommendation already recorded there.

### 3.4 The scope statement

The *Crime and migration* paragraph is repeated on `/sources-and-method/#not-covered`, **word for
word apart from a 'Not covered' lead**, and both pages link to the other. Nothing checks that the
two stay in step, and the two are separately reviewable, so a correction to one can leave the
other.

### Checkboxes

- [ ] The four criteria as stated still describe what is on the page, given 2.6 and 2.7
- [ ] The sentence about the two longest checks (A4)
- [ ] The two scope paragraphs still say the same thing

---

## 4. Sources and method

`content/sources-and-method.md` · `/sources-and-method/` · reviewed 2026-07-23

**This is the page that describes the apparatus**, so its prose is a set of promises rather than
a set of figures. It cites three records and renders three partials: the source catalogue from
`data/sources.json`, the confidence definitions and the nine key caveats from `data/meta.json`.
It declares the same two frozen vintages as the glossary.

### 4.1 What the page promises about citation and enforcement

| As written | What the build does |
| --- | --- |
| 'Every figure is traceable to a named publication with a date' | Every record names a source and a date. **No check verifies that the source contains the figure.** Backlog item **A1**; the handoff records three defects found by opening five publications, one of them a headline figure |
| 'Where a number appears in a sentence on this site, it is inserted from the record when the page is built' | Backlog item **A4**. The build's unrecorded-figure report currently prints 31 that are not |
| 'a current value written out longhand anywhere in a page will each stop the site being built' | A comma-grouped value a record holds is an error. A value under 100, and a value written with a scale word that a record holds, are **warnings**. A figure the data layer never recorded is **reported and not refused** |
| 'A claim unreviewed for twelve months is taken down until it has been' | `review_due` fails the build when the date passes, which stops the site publishing rather than removing a page from a published site |

### 4.2 What the page publishes as the limits of the checks

Three are published. Set beside what the build reports:

- **'Values under 100 are reported for review rather than refused.'** The run reports **17**
  matches under this heading, and they are not all under 100: two are scale-word matches at
  10.7 million, which the same branch reports because a citation there would render '10,700,000'.
- **'A description of a figure is not checked against the figure.'** Matches the build's own
  closing line.
- **'No real screen reader has been run over these pages.'** Matches, and the backlog carries
  running one as the last entry in its order.

**A fourth candidate is not published and is backlog item A6**: that a figure the data layer never
recorded is reported and never refused. It is the one that bears on 4.1's second and third rows.

### 4.3 The count about this site's own work

> 'Four false summaries were found on this site, by reading, not by tooling.'

A count about the project's own work, on a live page, and nothing re-derives it. The same count
appears in section 1 of `docs/PRE-PUBLICATION-REVIEW.md`, so it is held in two places. This
project's practice with counts about its own work has been to delete them rather than correct
them.

### 4.4 The reference-periods table

Its lead-in says 'Different measures cover different twelve-month windows', and its caption reads
'The twelve-month window each family of measures covers at the last update'. The four rows are:
year ending March 2026; year ending December 2025; point-in-time 31 March 2026; 2021/22 Census.

- **Two of the four are not twelve-month windows.** A point-in-time stock at 31 March 2026 is one
  date, and the 2021/22 Census is a census.
- **Money is not in the table.** `fiscal/government-spending-on-the-asylum-system` is on
  **financial year 2024-25**, as are the two spending records its home page card cites, and no row
  names that period.
- The **Foreign-born population** row gives only the 2021/22 Census. The site also publishes
  `population/foreign-born-population-mid-2024` and `population/foreign-born-share-mid-2024`, both
  for mid-2024, and the home page card and the born-abroad claim both carry the later estimate.

### 4.5 The update section

- The three cadenced rows and the two counts beneath them are derived from `lib/published.mjs`
  and cannot be typed wrong.
- The **list of irregular publishers is written by hand** beside a derived count of them, and the
  sentence introducing it says they 'release irregularly rather than on a cycle' while two of the
  seven are annual. Both halves are in the backlog's entry on the sources page's counts.
- 'The most recent full cycle took twenty-seven days' is a statement about a past cycle that no
  session can verify, and the backlog says so.

### 4.6 How this site was built

> 'A verification pass in July 2026 checked them against primary publications, quoting the
> specific sentence or table cell behind each value.'

`data/evidence/` holds **four** entries. `check-evidence.mjs` fires on a value that changed
against `origin/main` and on a value that is new, so a record that has not moved has never been
asked for one. The claim above describes the July 2026 research pass rather than the evidence
contract, and backlog item **A1** is the decision about whether to backfill.

### 4.7 The rendered caveats, checked as arithmetic

- The **gross flows** caveat's worked reconciliation: **1,012,000 minus 680,000 is 332,000**
  against a published 331,000. It comes out, and the four figures are declared frozen with the
  reason beside them.
- The **people and cases** caveat: 93,525 people and 76,714 applications, both cited.
- The **foreign-born vintages** caveat: '10.7 million' longhand beside the cited 16%, the warning
  named in 1.8.
- The **fiscal impact** caveat: 'within about plus or minus 1% of GDP', the warning named in 2.2.

### Checkboxes

- [ ] Every promise in 4.1 describes what the build does
- [ ] The three published limits describe what the checks do not establish, given 4.2
- [ ] The count in 4.3
- [ ] The reference-periods table covers the periods the site publishes
- [ ] The sentence in 4.6 says what it means about the July 2026 pass

---

## 5. About

`content/about.md` · `/about/` · reviewed 2026-07-23

No figure, no citation, no literal. What it carries is commitments.

| As written | What is true today |
| --- | --- |
| 'no editorial board, no second reader' | Matches handoff decision 2: the second reader was removed and nothing replaced it |
| 'where our figure and theirs differ, theirs is right and ours is a bug' | Repeated on `/sources-and-method/#what-this-is` in the same words |
| 'Every figure on this site carries the publication it came from, the period it covers, what it counts, and when it was last verified' | Every record carries `source_name`, `period_label`, `metric_name` and `retrieved_date`. Same far-end limit as 4.1's first row |
| 'the record of every change to a published figure is public' | `CHANGELOG.md`, which `/sources-and-method/#corrections` also promises |
| 'Report an error' links to a GitHub issue | Backlog item **A5**: the corrections policy depends on people reporting errors and the only door is an issue tracker. `check-sources` reports that this URL redirects to a GitHub sign-in page, so the door is shut to a reader without an account |
| 'Most figures are Crown copyright, published under the Open Government Licence v3.0' | Of 75 records, **58 name a government body**, **5 the House of Commons Library**, and **12 the Migration Observatory or Skills for Care**. Whether that sentence is the right licence framing is part of the LICENCE scope decision |
| 'The data files and the code are public' | The LICENCE scope is backlog item **A5** |
| 'If that ever changes, this page changes first' | Nothing checks this. It is a promise about a future edit |

### Checkboxes

- [ ] Every commitment above is one the site can still keep
- [ ] The funding statement is still true on the day the site publishes

---

## 6. The style guide

`content/style-guide.md` · `/style-guide/` · reviewed 2026-07-22, the oldest date on the site

No figure, no citation, no literal. It states which of the site's wording rules are precision and
which are values, and two of its statements are checkable against the site.

### 6.1 The precision table

Four rows, none numeric. The third, 'People who claimed asylum after arriving by an irregular
route', is the wording the glossary's *Irregular arrival* entry uses.

### 6.2 The source-title promise

> 'The Home Office dataset behind our irregular-arrival figures was titled "Irregular migration to
> the UK detailed dataset (illegal entry routes)" and was renamed "Illegal entry routes to the UK
> detailed dataset" from the year ending December 2025 edition. We cite whichever title the
> edition we used actually carries.'

**This holds.** `asylum/small-boat-arrivals-calendar-year-2025` carries the current title in
`source_name` and records the rename in its notes, and the glossary quotes both titles.

### 6.3 The direction labels

> 'Those are the only two labels in use. A misuse common on both sides is currently written up
> under whichever version circulates more, and named as shared in the text.'

The front matter uses two labels and no third. **No claim page contains the word 'shared'**, so
the second sentence describes a practice with no live instance. The two rows marked '(shared)' are
in `docs/foundation.md`'s 8.5.3 table, 'The asylum backlog is one number' and 'Falling net
migration means the asylum system is shrinking', and both are undrafted.

### 6.4 The no-attribution policy

> 'We do not attribute claims to named people. Our claim checks describe propositions that
> circulate, not quotations. That avoids litigating individuals and it carries a real cost: the
> "nobody actually says that" rebuttal. We accept the trade and would revisit it if that rebuttal
> became the main criticism of the site.'

**This is the sentence the sign-off turns on.** Correction 1g kept claims 2.6 and 2.7 on the
strength of it against the review's first selection criterion. Recording the review as passed
backs this page over the reviewer's criterion, and this is where the page says it.

### Checkboxes

- [ ] The 'named as shared in the text' sentence, given no page does it
- [ ] The no-attribution policy, read as what signing the review endorses
- [ ] The 2026-07-22 review date, the oldest on the site

---

## 7. What this pass does not cover, stated so it is not assumed

- **The figures against their sources at the far end.** Nothing here was fetched. Every value
  quoted above comes from the data layer, so this pass can say that prose disagrees with a record
  and cannot say which of the two is right. That gap is backlog item **A1**.
- **Anything the build checks.** Citations resolving, units, dates inside their period, single
  vintages, catalogued publishers, link and ARIA integrity, the representation floor and the
  evidence contract all fail the build if broken.
- **The unit-qualified warnings as a set.** The build reports 17, of which the ones falling on
  these six pages are named at 1.4, 1.8, 2.2 and 4.7. Section 3 of `docs/PRE-PUBLICATION-REVIEW.md`
  instructs a reviewer that these were all reviewed as coincidences; the correctness of that
  instruction is backlog item **R1**, and this pass does not act on it either way.
- **Accessibility.** pa11y at WCAG 2.2 AA covers all of these pages. No real screen reader has
  been run.
- **Whether anyone wants the site.** Five conversations, still not had.

---

## 8. Sign-off

The commitment on `/sources-and-method/` is: "Before this site publishes, a human reviews the
figures and the claims." That commitment does not distinguish ten pages from sixteen.

- [ ] Section 1 complete, the overview and its 8 cards
- [ ] Section 2 complete, the glossary, including both launch gates
- [ ] Section 3 complete, the claims index
- [ ] Section 4 complete, sources and method
- [ ] Section 5 complete, about
- [ ] Section 6 complete, the style guide
- [ ] `last_reviewed` refreshed on each of the six pages this pass covered

Reviewed by: ____________________  Date: ____________

Signing this and `docs/PRE-PUBLICATION-REVIEW.md` together is what the backlog's gate for
recording the review as passed writes into `CHANGELOG.md`. The pre-launch banner in
`content/_includes/base.njk` currently says the review was done on 27 July 2026, that its
corrections have landed, and that it has not yet been recorded as passed. That is the sentence
that changes, and the banner itself still goes at launch.
