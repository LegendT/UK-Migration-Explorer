# Backlog

**The durable list of outstanding work.** Every handoff points at this file rather than
restating it, because a handoff gets rewritten each session and a rewrite is where work
quietly falls out. An item leaves this list when it is done, and it leaves by being moved to
"Completed" with a date, never by being deleted.

`scripts/validate-content.mjs` fails the build if a planning document in `docs/` is not
referenced here, so a scope can no longer be written and forgotten.

Last updated 30 July 2026.

---

## Blocking launch

### 1. The pre-publication review: corrections all landed 28 July 2026, closing steps outstanding

The review was done on 27 July 2026. It worked through the evidence template in
**`docs/PRE-PUBLICATION-REVIEW.md`**, and its findings are recorded in `verification.txt` at the
repository root, kept out of `docs/` because it uses em-dashes and pound signs the style scan
would reject.

**Its outcome was a corrections list, not an approval,** and as of 28 July 2026 every correction
on it, 1a to 1i, has landed. Four claim pages had carried "do not publish as written" or
"substantial revision required" (2.2, 2.3, 2.6, 2.7); five of the seven data sections had carried
required corrections (2, 3, 4, 5, 7).

**Of the three closing steps, two are settled and one is the owner's still.**

1. **The `last_reviewed` question. DONE (PR #54, 30 July 2026).** Settled by asking what the
   review actually read rather than which pages had been corrected. `verification.txt` has
   fourteen headings, Sections 1 to 7 and Parts 2.1 to 2.7, which map to `asylum.njk`,
   `costs.njk`, `migration.njk` and the seven claim pages. **Those ten** carry
   `last_reviewed: 2026-07-27`. The other six are deliberately left on their older dates,
   because the review never opened them and `base.njk` prints the date to a reader. An earlier
   recommendation to stamp all sixteen was wrong for exactly that reason. The claims index shows
   a per-claim date and all seven now agree, which was the reader-facing part of this. Two
   residues kept on purpose: four claim pages corrected on 28 July show 27 July, with their
   landing dates in `CHANGELOG.md` where a landing date belongs, and the claims index footer
   reads 23 July beside cards reading 27 July, which is honest rather than tidy.
2. **The pre-launch banner. Corrected rather than removed (PR #54, 30 July 2026).** It said the
   review "has not happened yet", false on every page since 27 July, so this was a live defect
   and not a launch chore. Removing it would itself have asserted step 3, which is not decided,
   so the sentence now says the review was done, its corrections landed, and it has not been
   recorded as passed. **The banner still goes at launch.**
3. **Record the review as passed in `CHANGELOG.md`. Deferred 30 July 2026, and still the
   owner's.** Worth knowing before signing: the review's own selection criteria failed 2.6 and
   2.7, and both were kept on the strength of the site's published no-attribution policy, so
   signing backs that policy over the reviewer's criterion.

The review happening is not the review passing, and neither is the corrections landing: someone
still has to decide the pages now pass.

**How the corrections were tagged.** **[you]** marked an editorial or sourcing call only the owner
makes; **[me]** marked a mechanical or factual change against a cited source. Every changed or new
figure needed a fetched source and a verbatim quote before it was written, per the project's
no-AI-claims-without-source rule. That rule earned its place again: see the handoff for the three
figures the review asserted that the sources did not carry, and the two the review got right that
looked wrong until the primary tables were opened.

**1a. DONE (PR #33, 27 July 2026). "19% born abroad" (Part 2.6): the data has moved. [you + me, data].** ONS now publishes a
foreign-born estimate through a rolled-forward census method: 13,115,000 non-UK-born in June 2024,
which against the mid-2024 population of 69,281,400 is 18.9%. It is a provisional official
statistic in development, not an accredited figure, and there is no 2025 or 2026 estimate yet, but
it means the claim's premise, that no official figure has existed since ONS discontinued the
series in 2022, is now false, and the reviewer says the claim fails in its present form and is no
longer sufficiently false to debunk. The reviewer's two options are to reframe it as debunking the stronger claim that the
figure is exact, current or accredited, or to convert it into an explanatory fact-check on the
provisional mid-2024 estimate; dropping the page is a third option that is the owner's alone:
**[you]**. Then update `population.json`, `meta.json` and `dashboard.json` with the new figures,
replace "one census run on two dates" with the three-jurisdictions wording, and remove the
now-superseded "has risen since" inference: **[me]**. This supersedes the 16% tokenised in
PR #30, which becomes 2021/22 census context rather than the headline. (2.6 fails selection not
for want of a circulation example but because it is no longer sufficiently false to debunk.)

**1b. DONE (PR #34, 27 July 2026). The "range spans zero" reasoning (Parts 2.2, 2.3): statistically invalid. [me, rebuild
you].** The plus or minus 1% of GDP figure is the magnitude of separate pre-Brexit studies, not
an uncertainty interval around one estimate, so "that range spans zero" must be deleted from both
pages. Also remove "and rising" from the £4.9 billion asylum figure, since direct support
spending actually fell from about £4.7 to £4 billion; relabel that figure an NAO estimate rather
than "audited"; and give the OBR's £341,000 figure its full conditions, an average-wage worker
arriving at 25 with no dependants and staying to 80. Rebuilding each short answer around scope
and definitions is **[you]**. Two mechanical fixes ride alongside: re-date the stale "studies
reviewed to October 2024" metadata to the June 2026 briefing on both pages, and apply the
reviewer's specific replacements ("Across academic studies" becomes "Across the pre-Brexit static
studies summarised by the Migration Observatory", and similar) **[me]**.

**1c. DONE (PR #35, 27 July 2026). Costs page (Section 4): mis-dated and mis-sourced. [me, data + fetch].** The £158 hotel rate
is based on the three months to June 2023, not 2024; the £20 dispersal figure is approximate
("around £20"). Both were cited in a Home Office business case in April 2024 and come from the
ICIBI inspection at paragraph 5.14, not the 2025 NAO report the chart attributes. Re-date (title:
figures cited in April 2024), re-source, mark both approximate, and add the June 2025 comparison,
£144.98 and £23.25. Two framing corrections too: "price of a bed" is too narrow (these are
accommodation costs under Home Office arrangements), and "accommodation type is the main driver"
is too absolute (volume and mix both matter; the NAO evidence is that hotels housed about 35% of
people but 76% of contract spending). Fetch and quote the ICIBI and June 2025 figures first.

**1d. DONE (PR #38, 28 July 2026). Category, basis and denominator errors. [mostly me].** Chart retitled
"Initial decisions and withdrawals"; 16,901 now reads as people; the three bars are no longer
presented as exhaustive, with the 5,931 administrative outcomes named and held as a record. The
88,000 bar and table row are asylum applicants only, with humanitarian named as separate at about
6%; the non-EU+ definition is now a nationality grouping; the unsourced "a small fraction of
immigration a decade ago" is removed with its reason; the net-migration-by-reason limitation says
why subtracting is invalid. Part 2.1 now carries the accommodation total, 93,653, as a `calculated`
record, and the same gap was fixed on the asylum page, where it also existed. **[you] parts taken:**
the verdict softened to "the figures do not show that", and all three eligibility sentences
qualified rather than the two the review named. The review's 35,000 for humanitarian was **not**
written: the ONS bulletin gives only the 6% share.

**1e. DONE (PR #38, 28 July 2026). Qualifiers and precision (Sections 3, 5, 6). [me].** "Grew steadily"
is now "grew substantially", with the 2014 to 2015 fall stated in the note so a later editor can
see why the word changed. The net migration peak is qualified to the calendar-year series, with
944,000 in the year ending March 2023 given in the note. The 2022 revision is now 285,000, from
606,000 to 891,000, 47% higher, replacing "more than 120,000". Section 6 was left alone as the
reviewer advised, after checking that its "rose steadily" was not the same mistake twice. It is not.

**1f. DONE (PR #38, 28 July 2026). Voice rewrites. [you].** Settled as a rule rather than page by page:
take the reviewer's substance, write it in the site's voice. The reviewer's recommended short
answers run longer than any on the site and use vocabulary it does not use elsewhere, and 1a, 1b
and 2.1 had already been done that way.

**1g. DONE (PR #38, 28 July 2026). Circulation examples (Parts 2.1, 2.3, 2.7). [you].** Resolved without
changing the site's policy, which was the point that nearly got missed: the style guide says
plainly that this site does not attribute claims to named people and accepts the "nobody actually
says that" cost. The review's finding IS that rebuttal. 2.3 therefore drops the "far more"
intensifier rather than gaining an attributed example (a good one was found, Dustmann and Frattini
on the LSE blog, and rejected as a named attribution). 2.1 and 2.7 publish the selection gap on the
page instead, after six search angles found nothing quotable. **Dropping 2.7 is not available:**
pro-migration claims sit exactly on the floor of two that `validate-content.mjs` enforces, so
removing it fails the build unless another pro-migration claim is added first.

**1h. DONE (PR #38, 28 July 2026). "Refused asylum" (Part 2.7). [me + you].** The invalid comparison is
deleted, and it existed in three places, not the one the review names: the claim page, the asylum
page, and the notes on the grant-rate record itself. Deleting it alone would have left the section
conceding the claim, so it is replaced with a refutation valid on the same table: between a fifth
and a half of each 2010 to 2020 cohort ended without a grant. All the other **[me]** edits landed,
including the front-matter source, the mixed periods, the provisional tribunal data, and a third
failure named, that protection or other leave is broader than refugee recognition. **[you] part
taken:** the short answer, in the site's voice per 1f.

**1i. DONE (PR #38, 28 July 2026). "Net migration is arrivals" (Part 2.5). [you].** Both tweaks applied.
The "without a single person's movement changing" line claimed more than a revision can support,
because new data can change which movements are identified.

Section 1 of the review, people claiming asylum, needs no edit, only a vintage caution: do not mix
the 104,764 figure in use with the older 108,138 that some sources still cite for 2024.

### 2. Then, and only then: remove the robots rule

Delete `content/robots.txt` and its guard in `scripts/check-build.mjs`. Deliberate, and it
comes last. That is launch.

---

## Scoped, not built

None of this blocks launch. Each has a scope document; read it before starting.

**This list is in recommended order. Take the first unfinished item, which is item 4**, the
release notifier, whose remaining phase 3 is no longer gated: both decisions it waited on were
taken on 30 July 2026 and are recorded under it. The order lives here rather than in the
handoff's prompt, so that finishing something does not leave a stale instruction somewhere
else. Re-order it freely; this is the only place the sequence is stated.

**Reordered 30 July 2026.** The runbook was item 6 and is now item 3, because item 4's own scope
says the job must be doable by hand before it is delegated and phase 3 is that job delegated.
The list order contradicted the scope for two days. Sections moved and renumbered rather than
annotated, per the rule below.

If you reorder, or complete something, **move the sections and renumber** rather than adding a
sentence explaining that the order is not the order. That trap was set once, on 28 July 2026,
and a fresh session following the instruction would have taken the wrong item.

### 3. `docs/UPDATING-DATA.md`: the manual runbook. DONE (PR #52, 30 July 2026)

The manual runbook for the update commitment, modelled on DEBT's, written **before** any of it
is automated: you should be able to do the job by hand before delegating it. Moved ahead of the
notifier on 30 July because item 4's own scope says so.

It is deliberately pointer-heavy. The evidence contract lives in `data/evidence/README.md` and
is not restated, because a contract kept in two files is one that drifts. What the runbook adds
that existed nowhere: that a real update touches **eight** record fields and not the four the
scope named, that the step is reconcile rather than look up, that record `notes` are re-read
every time while page prose is never touched, and a tested command that lists a source's metrics
**and its series files** together, since the series were invisible to every check until PR #47
and a list that omits them ships half a release.

### 4. Release notifier and evidence check: four phases built, phase 4 left

**`docs/UPDATE-AUTOMATION.md`.** Five phases. Phases 1, 1b, 2 and 3 are built; phase 4 is a
reader-facing trust statement and needs the owner's sign-off, so it is the only one left.

- **Phase 2, the evidence check. DONE (PR #43, 28 July 2026).** A figure whose value changed,
  or which is new, must be declared in `data/evidence/` with a quote from a fetched source
  containing that value, and CI fails without one. It applies to updates made by hand, which
  is why it went first. **The series are covered too**, which closed the largest hole left in
  it: 100 published points could move with nothing asking where they came from. Five things
  the scope had wrong or did not say, and how a series is evidenced, are recorded in it and in
  `data/evidence/README.md` rather than restated here.
- **Phase 1, the notifier. DONE (PR #46, 28 July 2026).** `check-releases.mjs` compares the
  edition each record cites, by the month and year in its URL, against the newest edition the
  publisher lists, and opens one deduplicated issue from `main` or the weekly cron. It reports
  and never gates. **What it does not do, and says so on every run:** notice that a release
  which kept its slug has changed something. Corrections between editions land on the
  data-tables page, whose change history names the exact table, and nothing reads it. That is
  the next thing worth building here, and it is what the by-hand run in the scope found. **Not
  yet exercised:** the issue itself, since no release is pending; its parts are tested, the
  whole path is not.
- **Phase 1b, the corrections watch. DONE (PR #48, 30 July 2026).** The owner ordered it ahead
  of phase 3 on 30 July. It closes the one channel through which a wrong number can sit on the
  site indefinitely: a correction *inside* an edition leaves the slug alone, so the edition
  check cannot see it and a cadence cannot infer it. 14 records and 2 series files now declare
  the publisher table they were read from, `validate-data.mjs` refuses a figure that names a
  table in its own prose and declares nothing, and `check-releases.mjs` matches the data-tables
  change history against those declarations. It raises a hit only where the figure's own
  `retrieved_date` pre-dates the correction, so it is stateless and clears itself. What building
  it found is in the scope, uncounted and not restated here, because a count restated in two
  files is what put six in one and twelve in the other for a day.
- **Phase 3, the update prompt. DONE (PR #55, 30 July 2026)**, as
  `docs/prompts/update-from-release.md`. Seven things to settle were in the scope; five were
  already mechanical and the two that were not were decided the same day. It is deliberately
  thin: it names the source, the release and the refusals, and sends the assistant to
  `docs/UPDATING-DATA.md` for the procedure rather than carrying a copy of it. **Not yet
  exercised against a real release**, and it says so; the first run should be against one that
  was going to be checked by hand anyway.

  **What building it found, and it is a defect in an older check rather than in the prompt.**
  `docs/prompts/` is the first subdirectory under `docs/`, and the rule that every planning
  document must be referenced from this file **did not descend into directories**. The document
  whose whole purpose is that a scope cannot be written and forgotten was itself invisible to the
  rule on the day it was written. The scan is now recursive and matches on the path relative to
  `docs/`, so two documents sharing a basename in different directories cannot satisfy it through
  each other. Negative-tested both ways.

  The two decisions, kept because they explain the shape of what was built:
  - **Series work: refuse it, and hand it to a person.** As scoped the procedure cannot do an
    ONS update at all: the four metrics that declare a `series_ref` are all `ons-ltim`, and
    moving them without the series fails `validate-data.mjs`. So v1 detects a `series_ref` or a
    series file in scope, stops, and **names the runbook's section by path and heading without
    restating its steps.** That constraint came from a second model: a procedure printed in two
    places is the duplication this project has been burned by twice, and the copy a session
    happens to read wins. **It costs two of the three cadenced releases, not one**, which the
    first version of this entry got wrong: the four `series_ref` metrics are all `ons-ltim`, but
    two of the four series files are `ho-immigration-stats` and move on every Home Office
    quarterly. Only the tribunals release runs to completion. That is the accepted price of not
    omitting series work silently, and if it is judged too high the answer is to grow the series
    half deliberately rather than loosen the refusal.
  - **The runbook came first, and is now built** as item 3. Phase 3 is the job it describes,
    delegated, so its own rule put it ahead. Decided and reordered on 30 July.
- Phase 4, rewriting what the sources page says about automation, needs the owner's sign-off.

### 5. The figures the data layer never recorded

**Found 30 July 2026, and the reporting half is built (PR #51).** Both literal scans in
`validate-content.mjs` match prose against the values the site *holds*, a record value or one of
the series points. A figure the site never recorded matches neither map, so it was invisible to
both **by construction**, and the success message nonetheless printed "No page writes a
comma-grouped value longhand". That is the eighth instance of this project's oldest pattern: the
check verified the declaration, the message claimed the property a reader depends on.

A third branch now reports every comma-grouped literal that no record or series point holds,
under its own heading, and the success message states the limit. **Reported, not failed**, on the
precedent the sub-100 warnings set: the only way to clear an error here is to declare the
literal, and a check whose remedy is a blanket exemption teaches authors to stuff the exemption
list. The current count is what `npm run validate` prints; it is deliberately not restated here,
because a count kept in two files is what put six in one and twelve in the other for a day.

**It carries a ratchet, because report level on its own expires.** A list nobody has to act on
sits in a green log and the next figure joins it invisibly, so the count may not grow:
`UNRECORDED_BASELINE` fails the build if it does, runs after the list prints so a failing run
still shows what it is complaining about, and says what it does not establish, that one fixed and
one added passes. Lower it as figures are recorded or declared; at zero the branch becomes an
error and the constant goes.

The list holds four different things and the check cannot tell them apart, which is why a person
reads it. **The sort below was corrected on 30 July after a second model checked it against the
sentences**, and three of the four groups moved:

- **Frozen history, correct as longhand. DONE.** Only the published vintages really qualify:
  `431,000`, `345,000` and `606,000`, because a first-published number never changes, which is
  the same logic that makes the existing `285,000` declaration right. All nine reports of them,
  across four files, are now declared under `historical_literals` with the reason beside them,
  and the baseline fell from 38 to 29. `45,774` was **not** declared: it is frozen as a number
  but sits under "the peak was", which goes stale if a later year exceeds it, so it stays in the
  report where a person will see it.
- **Current-edition figures with no record behind them**, which is a bigger group than first
  sorted. `627,000` in two places, the study and work main-applicant and dependant splits, the
  citizenship card's three, and **also `944,000`, `1,469,000`, `517,000`, `429,000`, `87,000` and
  `272,000`, which read as history and are not**: "the highest twelve-month estimate ONS
  publishes" is a claim about the *current* publication, and the year-on-year changes are
  recomputed every release under the site's own single-vintage rule. Minting a record needs a
  fetched quote per figure and is **[me]**; which deserve one rather than a rewording is **[you]**.
- **Rounded restatements of live values, which no mechanism covers.** On
  `everyone-in-asylum-accommodation-arrived-recently`, "around 100,000" sits against the series
  point `asylumApplications@2025`, which is 100,625, and "around 97,500" against
  `people-in-receipt-of-asylum-support`, which is 97,519. The sentence's whole point is that the
  two are of similar magnitude, so precision would work against it, and `historical_literals`
  would silence them as frozen when they are live. The glossary carries the same rounding: **[you]**.
- **Arithmetic against a live value, where neither remedy in the message works.** The `100,000`
  on `net-migration-is-arrivals` and in the glossary is `431,000` minus the live
  `migration/net-migration-2`. A record for it would be a fake metric, and freezing it guarantees
  it goes wrong at the next revision. This is the same shape as the `285,000` and `47%` sentence
  under the editorial decisions below, so whatever is decided there should decide these too.

**Value-keyed sorting cannot finish this job**, which is worth knowing before anyone tries.
`51,000` is the end-2019 initial-decision backlog in one file and the appeals backlog a year
before the live March 2026 figure in another. `100,000` is three different figures. And the
glossary's per-file de-duplication collapses two meanings of `100,000` into one report line, so
no per-report classification can be right there.

**What the check does not scan at all**, and this is the larger surface: a figure written in
words. "over 2.2 million visitor visas" for the year ending March 2026 appears on both the
glossary and `migration.njk`, is current-edition, and has no record. So do "69.28 million" and
"10.6 million" on the born-abroad claim, and "5.8 million", "8.2 million", "1.3 billion" and
"1.7 billion" on the costs page. None is comma-grouped, so none is errored, warned or listed.
Extending the scan to them is **[me]** and is the obvious next piece of this item.

**A separate finding from the same run, and it is a correction rather than a decision.**
Correction 1e replaced "more than 120,000" with the precise 285,000 revision on `migration.njk`
and left the old wording in `meta.json`'s third key caveat, which renders to a page. It was
written against a vintage where the 2022 estimate was 728,000, so the movement really was about
122,000; the current point is 891,000 and the movement is 285,000. The site now
describes the same revision two ways. Not false, since 285,000 is more than 120,000, but stale and
inconsistent, and it is the sibling 1e did not grep for.

### 6. The eight undrafted claims

Foundation section 8.5.3 specifies fifteen; seven are written. One of the eight,
"Local areas all carry the same pressure", **cannot be written**: it needs per-capita local
authority figures and `data/` holds none.

Two need a direction decision from the owner before drafting, because there is no "both"
label: "The asylum backlog is one number" and "Falling net migration means the asylum system
is shrinking".

**Who drafts, decided 30 July 2026.** A session drafts and proposes; the **verdict and the short
answer come to the owner before merge**. An earlier framing of this, that drafting is merely
executing the spec in 8.5.3 because it already gives claim, direction, short answer and
statistical issue for all fifteen, was wrong: the tagging history marks short-answer writing
**[you]** every time it has arisen, in 1b, 1f and 1h. The spec is a starting position, and four
of its rows were overtaken by the review on 27 July, so a drafter meets that question rather than
avoiding it.

**One thing to know before drafting for the representation floor.** Assigning a direction changes
nothing on its own. `validate-content.mjs` counts parsed files in `content/claims/`, so the split
moves only when a drafted page merges, and of the two above only the pro-migration one
("Falling net migration...") would move it off the enforced floor of two and reopen the option of
dropping claim 2.7 that correction 1g found closed.

---

## Small editorial decisions waiting on the owner

Neither blocks anything. They are here because a decision recorded only in a merged pull
request body is a decision that gets lost, and this file is the one place that cannot happen.
Both came out of PR #41 on 28 July 2026.

- **The revision sentence in `migration.njk`.** It reads "has moved by 285,000 across
  revisions, from 606,000 when first published in May 2023 to [the 2022 estimate] in the
  current series, 47% higher." The estimate is now cited, so it will update itself. The
  `285,000` and the `47%` beside it will not, and nothing will fail the build when they go
  wrong. The alternative was `meta.json`'s precedent of freezing a worked sum whole, which
  was not taken because `historical_literals` is page-scoped and declaring the estimate would
  also have un-protected the citation in the summary above it.
- **The sources page carries four more hand-maintained counts, and at least one is provably
  wrong. [me + you].** Found 30 July 2026 while checking the bullet below, which turns out to be
  one member of a class rather than a single sentence. The page publishes a release table reading
  13, 7 and 2 figures, then "The other fourteen published figures come from the National Audit
  Office, the House of Commons Library, the Migration Observatory and the Office for Budget
  Responsibility", then "The most recent full cycle took twenty-seven days", then "Two limits"
  over a list. Nothing reads any of them.

  **The named-publisher sentence is demonstrably incomplete**, and the page contradicts itself to
  a reader who scrolls: the source catalogue rendered further down the same page lists
  `Independent Chief Inspector of Borders and Immigration` and `ONS: Population estimates`, and
  both now carry published figures, the two accommodation costs on `costs.njk` from correction 1c
  and `population/total-uk-population` on the born-abroad claim from correction 1a. The
  corrections added publishers and the prose beside them was not updated.

  The counts were derived when the total was 36, which is 13 plus 7 plus 2 plus 14. A substring
  count over `content/` and the rendered `data/` prose now finds 43 records reaching a reader.
  **Do not write 43 onto the page from this note.** "Published figure" needs pinning first, since
  a ref declared in `figures:` front matter and a ref tokenised in a sentence are not obviously
  the same thing, and the site has three different counts in play. Defining it is **[you]**;
  counting against the definition, and re-deriving all four numbers, is **[me]** once it is
  defined. What the sentence should then say, on a trust page, is **[you]**.

- **The sources page says no claim carries a correction note, and three do. [me + you].** All
  three are dated 27 July 2026 and came from corrections 1a and 1b:
  `nineteen-per-cent-born-abroad`, `immigrants-pay-far-more-than-they-cost` and
  `immigrants-are-a-drain-on-public-finances`. `content/sources-and-method.md` still reads "No
  claim currently carries one." **The built site therefore contradicts itself**, and nothing
  checks it: the validator refuses a `correction` without a `corrected_on`, and has no opinion
  on a page that counts them. The correction is factual; what the sentence should say instead,
  on a trust page, is the owner's. Found 30 July 2026 by a second model reading the handoff,
  which had been repeating the same false sentence as a settled decision.
- **Three entries moved out of the handoff's decisions list, 30 July 2026**, because they were
  outstanding editorial work rather than decisions taken, and the handoff sends that here.
  - **Captions.** Four Markdown tables have none: one in the glossary, two on the sources page,
    one in the style guide. They are wrapped and named from the heading above them. A caption is
    new prose and is the owner's to write. The handoff said "two Markdown tables and the
    three-queues table"; the three-queues table has had a caption since the page was written.
    **Two things found on 30 July that bear on the decision**, after this was briefly written off
    as a non-task. There is no accessibility deficit: each of the four sits directly under a
    descriptive heading and `scrollable-regions` names the region from it. But every table the
    site hand-writes in Nunjucks carries a visible caption, four of them, so the Markdown four are
    inconsistent with the site's own practice, and an `aria-label` is invisible to a sighted
    reader. Consistency is the argument, not compliance.
  - **The small-boats card lost a line** about 90% of detected unauthorised arrivals, which
    belongs to the year-ending-March record rather than the calendar-2025 card. It is still in
    the record's notes and could be placed on the asylum page.
- **Whether `/sources-and-method/` should publish a third limit.** The bullet saying series
  values are not individually cited has gone, because they now are. Nothing replaced it, and
  there are now three candidates. A figure declared under `historical_literals` is exempted on
  trust and nothing re-checks that the exemption is still deserved. A correction inside an
  edition is caught only where the publisher's note names its table by identifier, and most
  name theirs by title. And no real screen reader has been run, which is the one gap below
  that a reader might reasonably expect an accessibility-minded site to say out loud. Adding a
  limit to a live page is an editorial call, and so is which of the three earns the space.

---

## Unmet acceptance criteria, which are not launch gates

**The distinction matters and is easy to lose.** Foundation section 17 labels only its five
*Trust criteria* as launch gates, and all five are met. The site itself declares one thing
outstanding, the review above. But three of section 17's other criteria are not met, and
calling them "gaps carried deliberately" would be a softer word than the document uses. They
are unmet acceptance criteria, and launching with them unmet is a decision rather than an
oversight.

- **"Five target users have been spoken to, and what they said is written down."** Open since
  June. Section 18 calls it the cheapest possible way to find out the whole thing is unwanted,
  and puts it at a week. Of everything on this page, it is the one most worth not skipping.
- **"Success measures are chosen and recorded."** Section 4.2 offers three candidates and says
  to commit to one in phase 1. None has been chosen, so the project cannot be evaluated and
  will be sustained or abandoned on feel.
- **The two comprehension criteria**, that a reader can explain the difference between
  immigration, emigration and net migration after reading the homepage and glossary, and can
  see that asylum is one part of a wider system. These are not failed; they are **untested**,
  and cannot be tested without the first item above.

## Known gaps, carried deliberately

Genuinely not tasks. **One of the two is published on the site; the other is not**, and that
sentence used to say all of them were. `/sources-and-method/` publishes two limits under *What
the checks do not establish*, the prose one below and the sub-100 review, and neither of the
others has ever appeared there. Whether the screen reader gap should is under the editorial
decisions above.

- **No real screen reader has been run.** Chrome's accessibility tree is what assistive
  technology consumes and is what was read, but it is not VoiceOver or NVDA reading a page
  aloud. **Not published on the site.**
- **Prose about figures is unprotected.** Nothing verifies a chart summary describes the data
  beside it. The series citations shrank this and could not remove it, because a citation
  protects a value and not a claim about a value: `at(2018)` under a sentence naming 2019
  builds cleanly. Published.

---

## Completed

Kept so that a future session can see what was decided and when, rather than reopening it.

- **The bold link in `most-immigration-is-asylum`**, 30 July 2026. PR #51. Moved off the term and onto
  descriptive text inside the same sentence, so all three list items now open with a bold term.
  It was on the editorial list because fixing it was thought to need the sentence rewritten. It
  did not: every word is unchanged and the glossary link survives. Linking all three terms
  instead was checked and is not available, because the first item's term has no glossary anchor.

- **`eu-settlement-scheme-settled-status-grants` brought onto the current release**, 28 July
  2026. PR #45. Found and fixed the same day, while re-verifying the phase 1 endpoints: it
  held 354,647 for the year ending December 2025 while every other Home Office figure cited
  the year ending March 2026. Neither existing check could see it, which is why the notifier's
  comparison is now per cited edition rather than per source. The comparability question the
  finding raised is settled by arithmetic: both editions are `EUSS_QTR` settled conclusions
  plus the automated-grants estimate, 270,235 plus 100,300 against 267,977 plus 86,670. The
  note beside the figure was stale too, at 4.4 million grants since 2018 where the release now
  says 4.5 million. No page cites this record, so nothing a reader sees changed, proved by
  diffing the built site. First real use of the evidence contract.

- **Citing a series point, and the four figures held twice**, 28 July 2026. PR #41. All three
  parts of **`docs/SERIES-CITATIONS.md`**, which is marked built and kept as the reasoning.
  The four metrics that are also series points declare `series_ref` and cannot drift from it;
  an `at(year)` filter cites a series point inside a chart summary; a series value written
  longhand fails the build. Three things the scope had wrong, and one hole found and closed
  after it, are recorded in that document rather than restated here.
- **The update commitment**, signed 23 July 2026. One month from each of the three cadenced
  releases; irregular publishers carry no promised schedule.
- **The foundation drift read**, 23 July 2026. PR #14.
- **The design and accessibility rounds**, 23 July 2026. PR #12.
- **The 37-defect audit list**, 22 July 2026.
