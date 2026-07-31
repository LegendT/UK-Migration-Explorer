# Backlog

**The durable list of outstanding work.** Every handoff points at this file rather than
restating it, because a handoff gets rewritten each session and a rewrite is where work
quietly falls out. An item leaves this list when it is done, and it leaves by being moved to
"Completed" with a date, never by being deleted.

`scripts/validate-content.mjs` fails the build if a planning document in `docs/` is not
referenced here, so a scope can no longer be written and forgotten.

Last updated 31 July 2026, after fifteen pull requests, #54 to #68.

**A whole-project pre-launch audit is open in `docs/PRE-LAUNCH-AUDIT.md`**, on branch
`pre-launch-audit`. It covers code, data, content, documentation and accessibility, and like the
pre-publication review before it, its outcome is a findings list rather than an approval. Its
findings are not restated here while it is open; when it closes, whatever it leaves undone moves
into the sections below and the document joins Completed.

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
figures the data layer never recorded. Item 3's only remaining phase is a reader-facing trust
statement needing the owner's sign-off rather than a build, so it is not work a session can take.
The order lives here rather than in the handoff's prompt, so that finishing something does not
leave a stale instruction somewhere else. Re-order it freely; this is the only place the
sequence is stated.

If you reorder, or complete something, **move the sections and renumber** rather than adding a
sentence explaining that the order is not the order. That trap was set once, on 28 July 2026,
and a fresh session following the instruction would have taken the wrong item.

### 3. Release notifier and evidence check: four phases built, phase 4 left

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
  check cannot see it and a cadence cannot infer it. Records and series files now declare
  the publisher table they were read from, `validate-data.mjs` refuses a figure that names a
  table in its own prose and declares nothing, and `check-releases.mjs` matches the data-tables
  change history against those declarations. It raises a hit only where the figure's own
  `retrieved_date` pre-dates the correction, so it is stateless and clears itself. What building
  it found is in the scope, uncounted and not restated here, because a count restated in two
  files is what put six in one and twelve in the other for a day.
- **Phase 3, the update prompt. DONE (PR #56, 30 July 2026)**, as
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
    ONS update at all: the metrics that declared a `series_ref` **when this was scoped** were all
    `ons-ltim`, and moving them without the series fails `validate-data.mjs`. There are five now
    and one is Home Office, which is recorded below; the past tense here is the fix, because this
    sentence read as current until 31 July 2026 with its own correction five lines beneath it. So v1 detects a `series_ref` or a
    series file in scope, stops, and **names the runbook's section by path and heading without
    restating its steps.** That constraint came from a second model: a procedure printed in two
    places is the duplication this project has been burned by twice, and the copy a session
    happens to read wins. **It costs two of the three cadenced releases, not one**, which the
    first version of this entry got wrong: the `series_ref` metrics that existed then were all `ons-ltim`, though a fifth has since been
    added on a Home Office series, but
    two of the four series files are `ho-immigration-stats` and move on every Home Office
    quarterly. Only the tribunals release runs to completion. That is the accepted price of not
    omitting series work silently, and if it is judged too high the answer is to grow the series
    half deliberately rather than loosen the refusal.
  - **The runbook came first, and is now built.** It is under Completed. Phase 3 is the job it describes,
    delegated, so its own rule put it ahead. Decided and reordered on 30 July.
- Phase 4, rewriting what the sources page says about automation, needs the owner's sign-off.

### 4. The figures the data layer never recorded

**Found 30 July 2026, and the reporting half is built (PR #51).** Both literal scans in
`validate-content.mjs` match prose against the values the site *holds*, a record value or one of
the series points. A figure the site never recorded matches neither map, so it was invisible to
both **by construction**, and the success message nonetheless printed "No page writes a
comma-grouped value longhand". That is the eighth instance of this project's oldest pattern: the
check verified the declaration, the message claimed the property a reader depends on.

A third branch now reports every literal that no record or series point holds, comma-grouped
since PR #51 and written with a scale word since PR #66, under its own heading, and the success
message states the limit. **Reported, not failed**, on the
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
- **Current-edition figures with no record behind them. Started, not finished.** `627,000` is
  DONE (PR #58, 30 July 2026): it was on two pages and existed nowhere but inside the parent
  record's notes, and it now has `migration/non-eu-plus-long-term-immigration`, read from Table 1
  of the ONS dataset rather than the bulletin. The three nationality groups reconcile exactly to
  the 813,000 total the site already publishes, which is what established the basis. The parent's
  notes no longer restate it.

  **The rule for the rest is set, 30 July 2026, so no per-figure decision is needed.** Any
  figure that changes when its publisher next publishes gets a record and a fetched quote.
  Anything else is reworded, or declared as frozen history where the prose itself says it is
  history. Bring back only what is genuinely ambiguous. Twenty-two remain and each needs its own
  source fetched, so this is several sessions rather than one.

  **Still outstanding, and each needs a fetched quote:** the study and work main-applicant and
  dependant splits in the chart bar notes, the citizenship card's three, and `944,000`,
  `1,469,000`, `517,000`, `429,000`, `87,000` and `272,000`, **which read as history and are
  not**: "the highest twelve-month estimate ONS publishes" is a claim about the *current*
  publication, and the year-on-year changes are recomputed every release under the site's own
  single-vintage rule. Minting is **[me]**; which deserve a record rather than a rewording is
  **[you]**, and `627,000` was taken as the clearest case rather than as a precedent for the rest.

  **One pattern worth reusing.** Both records minted on 30 July were verified by reconciling
  against a total the site already published, not by finding the number alone. That is what
  distinguishes reading a figure from recognising one.
- **Rounded restatements of live values. DONE (PR #57, 30 July 2026), and the mechanism the
  category said was missing turned out to exist.** "around 97,500" and "around 100,000" were both
  live figures rounded just enough to slip past an exact-match scan, in a sentence whose whole
  point is that the two are of similar magnitude.

  The two halves were not the same problem. `97,519` needed no decision at all: the glossary
  already cited `people-in-receipt-of-asylum-support` for the same figure and the claim page did
  not, so that half was an inconsistency between two pages. `100,625` genuinely could not be
  cited, because it is a **series point** and only a Nunjucks chart summary can cite one, which
  the validator's own message says. It now has a metric declaring
  `series_ref: asylumApplications@2025`, the established pattern for a figure held twice, so
  `validate-data.mjs` refuses any drift between the record and the point.

  **Verified against the primary table, not the bulletin.** The `.ods` was fetched and unzipped
  and `Asy_00a` read directly: row "People claiming asylum", column 2025, is 100,625, and the
  support row is 97,519 for the year ending March 2026. Evidence written before the record, and
  `check-evidence.mjs` gated on it as a new metric. Baseline 27 to 24.

  **What is left of this category is the pattern rather than a task.** A deliberately rounded
  live figure still has no home in the contract. It was avoidable here only because a record
  could be minted; where one cannot, the choice is still to cite exactly or to reword.
- **Arithmetic against a live value, where neither remedy in the message works. DONE (PR #55,
  30 July 2026), and it emptied this category.** The `100,000` on `net-migration-is-arrivals` and
  in the glossary was `431,000` minus the live `migration/net-migration-2`. A record for it would
  have been a fake metric and freezing it guaranteed it would go wrong at the next revision, so
  both were dropped, along with the `285,000` and `47%` under the editorial decisions below and
  two more sites of the same sentence. The baseline fell from 29 to 27.

  **The lesson worth keeping is the shape, not the fix.** A figure computed against a citation is
  invisible to every check here: it matches no record, so the longhand scan cannot see it, and it
  is not frozen history, so declaring it would have been a lie that silenced it for ever. If one
  appears again, dropping it and giving the reader both ends is the pattern.

**Value-keyed sorting cannot finish this job**, which is worth knowing before anyone tries.
`51,000` is the end-2019 initial-decision backlog in one file and the appeals backlog a year
before the live March 2026 figure in another. `100,000` is three different figures. And the
glossary's per-file de-duplication collapses two meanings of `100,000` into one report line, so
no per-report classification can be right there.

**What the check did not scan at all, the larger surface: a figure written in words. DONE
(PR #66, 30 July 2026).** `validate-content.mjs` now reads "2.2 million" and "£1.3 billion" as
numbers and asks them the same questions it asks a comma-grouped one. Records are compared at
their unit's scale, because a record of 4.9 with unit `£ billion` **is** 4.9 billion pounds, and
the series are asked too, because the report claims that neither holds the value and a claim
about both has to ask both. No page changed: the built site is byte-identical, proved by diff.

**What a second model found in it, because the shape recurs and the sentence above is where a
reader will look for it.** The three lines written to stop one figure being reported twice
asked for "£" plus the number whatever the prose said, so a figure with no currency sign,
"3 billion" of anything, was answered by a fiscal record and silenced completely: not an error,
not a warning, not even a line in the report. Two self-critiques had read that guard and seen
only its precision. **A suppression is the most dangerous three lines in any check here**, and
the two controls that ran on every invocation could not have caught it, because both called the
matcher and neither called the thing reading its output.

**`UNRECORDED_BASELINE` went UP, 22 to 33, and this is the only step up it should ever take.**
Eleven report lines became *visible*, ten distinct figures with the visitor-visa one on two
pages; none arrived. What the ratchet forbids is unchanged and the count may not grow from 33.

**Two live record values are written out in words, in `data/` prose that renders to a page.**
`dashboard.json`'s foreign-born card and `meta.json`'s key caveat on foreign-born vintages both
write "10.7 million", which is exactly `population/foreign-born-population-of-the-uk`. It is a **warning and
not an error, and the difference is the remedy rather than the confidence**: a token renders
`toLocaleString`, so citing it puts "10,700,000" on the page and the wording changes. The
comma-grouped branch can error precisely because there the citation renders what the page
already says.

**The eleven, sorted by the rule already set above, so only the last line is a question.**
- **Needs a record and a fetched quote**, because it changes at the next Home Office quarterly:
  "over 2.2 million visitor visas" for the year ending March 2026, on the glossary and
  `migration.njk`. **DONE (PR #67, 30 July 2026)**, as `migration/visitor-visas-granted`,
  **2,241,997**, read from table Vis_01 of the visas summary `.ods` rather than from a
  bulletin. Two of the eleven came down with it, one figure written on two pages, and the
  baseline went 33 to 31. **Neither rounding survived**: both pages now say 2,241,997, as
  PR #60 found with the small-boats denominator. The figure had been living inside the
  parent record's notes, which no longer restate it, the same shape PR #58 found for 627,000.
- **The site already holds the figure and the prose rounds it**: "69.28 million" on the
  born-abroad claim is `population/total-uk-population`, 69,281,400. Cite it exactly or reword,
  which is the choice the rounded-restatement category above ends on. **[you]**, with the two
  "10.7 million" warnings, which are the same question.
- **Arithmetic against a live value, three more sites of it**: "£5.8 million a day", "£8.2
  million a day" and "£13 million a day" on the costs page are the cited hotel and system
  spending divided by 365, in the same sentences as the tokens. PR #55 emptied the
  **comma-grouped** half of that category, not the category. Same remedy, drop it and give the
  reader both ends. **[you]**.
- **Frozen history on the face of the prose**, so declarable if you agree: "£1.3 billion" and
  "£1.7 billion" (NAO, HC 874, the first seven months of 2024-25), "£4.5 billion" (the original
  contract estimate) and "£8 million a day" (the circulating claim the page exists to examine).
  Deliberately **not** declared here: an exemption is permanent, nothing re-checks that it is
  still deserved, and the branch reports rather than fails so that nobody is ever forced to
  stuff the exemption list. **[you]**.
- **Genuinely ambiguous, so brought back as the rule says**: "about 10.6 million" on the
  born-abroad claim is an ONS ad hoc release on a different population base, published on no
  cadence, and the page's point is that it does **not** reconcile. A record would give a figure
  the site tells readers not to use. **[you]**.

**What it still cannot see**, and the success message now says so instead of naming this as
unscanned: a figure written "2 200 000", "two million", "£1.3bn" or "2.2 thousand", and **front
matter**. That gap has one real instance today, "about 13.1 million" in the born-abroad claim's
`short_answer`, which renders on the page and is a rounded restatement of the live mid-2024
estimate. Scanning front matter is not free: `claim:` holds the proposition being corrected and
may legitimately carry a figure the site is arguing against, so it is a decision rather than a
widening.

**A separate finding from the same run. FIXED in PR #55, and this paragraph outlived it by two
days.** Correction 1e replaced "more than 120,000" with the precise 285,000 revision on
`migration.njk` and left the old wording in `meta.json`'s net-migration methodology caveat,
which renders to a page, so the site described one revision two ways. The editorial decision
below settled it by dropping both numbers rather than freezing either, and "120,000" now appears
nowhere in `data/` or `content/`. **Left here rather than deleted, and the lesson is the
paragraph and not the defect:** a finding written under one item and fixed under another goes on
reading as outstanding, which is the same shape as the counts this project keeps finding in two
places. Fixing something means grepping this file for it too.

### 5. The eight undrafted claims

Foundation section 8.5.3 specifies fifteen; seven are written. One of the eight,
"Local areas all carry the same pressure", **cannot be written**: it needs per-capita local
authority figures and `data/` holds none.

**The two directions are decided, 30 July 2026.** They take foundation 8.5.3's own starting
positions: "The asylum backlog is one number" is **restrictionist**, and "Falling net migration
means the asylum system is shrinking" is **pro-migration**. Both are cheap to reverse, and
handoff decision 7 already recorded them as a starting position rather than a finding, so
adopting them commits nothing.

**It buys no structural payoff until a page merges**, which is worth knowing before anyone
expects one. `validate-content.mjs` counts parsed files in `content/claims/`, so a direction
assigned to an undrafted claim changes nothing at all; only the pro-migration one, once written
and merged, moves the split off the enforced floor of two and reopens the option of dropping
claim 2.7 that correction 1g found closed.

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

### 6. The sources page's counts have no check behind them

**Found 30 July 2026, by a second model, hours after those counts were "corrected".** The fix in
PR #61 got the total right and two of the rows wrong, and the total agreed only because the two
errors cancelled: `asylum/returns-refused-entry-at-port` renders through a `data/` caveat and was
missed, and `fiscal/net-fiscal-impact-of-immigration-as-a-share-of-gdp` renders nowhere at all
and was counted. Home Office was published as 17 and is 18; "the other sixteen" is fifteen.

**Three queries gave three answers on the same day**, 74, 45 and 39, because "reaches a reader"
was never pinned to a mechanism. It is now: a token in the built HTML, a chart bar's `ref`, a
`| metric` summary, a dashboard card, or a caveat in `data/`. A `figures:` front-matter entry is
**not** a route, because nothing renders that list.

**The work was to make it derived rather than declared. DONE (PR #68, 30 July 2026), and it
took the first of the two routes rather than the second.** `lib/published.mjs` is the one home
for the definition of reaching a reader, and the five numbers on `/sources-and-method/` now
render from it through a `published-counts` transform. **Adding a record no longer touches that
page at all.**

The scope preferred a comparison in `check-build.mjs` as the smaller change. It was not: both
routes need the same union, because the built HTML alone gives 40 of the 46, the other six
reaching a reader through a chart bar or a dashboard card, which render a value with no ref
beside it. Given the same derivation either way, generating beats comparing, and the precedent
was already in the repo: `common-claims.njk` computes its own direction split with `countWhere`
for exactly this reason, on the page whose subject is other people's numbers.

**What made this look impossible and was not.** Markdown templating is off site-wide, so
`{{theme/id}}` is a citation rather than an expression and a markdown page cannot call a
filter. The marker-and-transform idiom `{caption}` and `{#anchor}` already use is what it has
instead, and `{count:ho-immigration-stats}` is that idiom.

**What two readings of it found, and this is the part worth carrying forward.** None of it
shipped, and with two of the probes applied the branch printed "47 of 75" and passed every
check green, which is this item's own defect reintroduced by the fix for it.
- **The scan was stricter than the renderer it modelled.** `resolve-citations` accepts
  `{{ theme/id }}` with spaces; the scan did not. That figure would reach a reader and be
  counted for nobody, and the check at the far end ran **one way only**, so it could find an
  overcount and never an undercount. It now compares both ways, which is free today and is the
  direction that was reachable.
- **A comment is where a scan of text stops being a scan of what renders.** A chart bar left
  inside a Nunjucks comment during a rework was counted; a citation inside an HTML comment was
  counted AND confirmed by the far end, because `resolve-citations` renders it into the
  comment. Both ends now strip comments.
- A `{% figure %}` in a markdown page was counted, where that syntax ships as visible junk
  rather than rendering. `check-build.mjs` now catches a stray `{% %}` and a mistyped
  `{Count:...}` as unrendered syntax.

**Three things worth knowing before touching it.**
- **The source scan is a proxy for rendering, and `check-build.mjs` closes it at the far end**,
  confirming that every record the counts claim through a token really appears in the output.
  Six cannot be confirmed that way and the run says so on every build: a chart bar and a
  dashboard card leave no ref behind. Closing that would mean changing what a reader gets in
  order to make a check easier.
- **Only the three cadenced publishers can be named by a marker.** A key is otherwise refused,
  because a typo landing on a real publisher renders a plausible wrong number beside a row
  naming a different one. That is not hypothetical: the negative test for this branch did it by
  accident, and the first version of the transform accepted it.
- **"fifteen" became "15"**, which is the site's own `inWords` rule, words to ten and numerals
  above.

**What is still hand-maintained on that page**, and it is smaller than it was: the sentence
naming the six irregular publishers lists them in prose. The count beside it is derived, so a
seventh publisher would move the number and leave the list naming six. Deriving the list means
either changing the wording to `sources.json`'s names, which read as catalogue entries rather
than prose, or adding a display name to six records, which is the same hand-maintenance moved.
**[you]** if it is worth the wording. The release table's cadence column and "the most recent
full cycle took twenty-seven days" are untouched and still nobody's to verify.

### 7. The robots.txt prose says the review has not happened

**Found 30 July 2026.** PR #54 corrected exactly this sentence in the pre-launch banner, calling
it "false on every page since 27 July", and the identical claim survived in `content/robots.txt`,
which is served publicly. It is the sibling that "a defect named on one page usually has
siblings" exists to catch, and neither the handoff nor the prompt knew that file carries prose at
all. **Corrected in PR #63 rather than left**, but the lesson belongs here: grep the claim, not
the page.

---

## Small editorial decisions waiting on the owner

Neither blocks anything. They are here because a decision recorded only in a merged pull
request body is a decision that gets lost, and this file is the one place that cannot happen.
Both came out of PR #41 on 28 July 2026.

- **The revision sentence in `migration.njk`. DONE (PR #55, 30 July 2026).** Decided by
  dropping both numbers rather than freezing them. Freezing was the worse option and the
  reason is worth keeping: `historical_literals` is page-scoped, so declaring the estimate to
  protect the sum would have un-protected the citation in the summary above it, trading one
  unprotected figure for two. The sentence now gives both ends, 606,000 and the cited current
  estimate, and lets a reader take the difference.

  **The same decision settled four more sites, because it was one defect in five places**, and
  finding the fifth is why the count in this bullet used to say four. All were arithmetic or a
  claim about arithmetic against a live value: the two `100,000` revision deltas on
  `net-migration-is-arrivals` and in the glossary, `meta.json`'s "more than 120,000", which
  renders on `/sources-and-method/` and was what correction 1e left behind, and the same
  sentence again in `netMigrationTimeseries.json`'s own note, where it would have instructed the
  next editor to reintroduce it. Proved by diff: four built pages changed and each only in the
  sentence intended.
- **The sources page's five hand-maintained counts, and the correction-note sentence.
  DONE (PR #61, 30 July 2026), and every number on it was wrong.** The owner settled the
  definition that had blocked it: a **published figure** is a record whose ref reaches a reader
  by any route, page prose, chart config, front-matter dependency or a dashboard card. That
  gives **45 of the 74 records**, with 29 held as unpublished reserve, which is the same
  "a subset of those records reaches a reader" the handoff already stated. That agreement is
  the check that mattered: a first query returned 74, matched every record, and was thrown away.

  | The page said | It now says |
  | --- | --- |
  | Home Office 13 | 17 |
  | ONS 7 | 10 |
  | Ministry of Justice 2 | 2, the only one that was right |
  | "the other fourteen" from four publishers | "the other sixteen" from six, adding ICIBI and ONS population estimates |
  | "No claim currently carries one" | removed, since three do and a count nothing reads is what caused all of the above |

  **One claim on that page is left alone deliberately.** "The most recent full cycle took
  twenty-seven days" is a statement about a past cycle that no session can verify, so it is
  neither corrected nor endorsed here. It is not the last hand-maintained number on the page:
  the release table and the "other fifteen" are hand-maintained too, and one of them was wrong
  for as long as this entry claimed the page counted itself correctly.

  **The third limit landed with it (PR #61), which is why the two were bundled.** The section
  opened "Two limits" and framed them as "about where a number comes from", and both had to
  change for an accessibility limit to fit. It now publishes that no real screen reader has been
  run over the pages, that the checks are an automated WCAG audit plus a reading of the
  accessibility tree, and that this is not the same as someone listening to a page.

- **Three entries moved out of the handoff's decisions list, 30 July 2026**, because they were
  outstanding editorial work rather than decisions taken, and the handoff sends that here.
  - **Captions. DONE (PR #59, 30 July 2026).** Markdown has no caption syntax, which is why the
    four had none while every table written by hand in Nunjucks carried one. A paragraph reading
    `{caption}Text` immediately before a table now becomes its `<caption>`, in a transform that
    throws when a marker matches no table. There was never an accessibility deficit:
    `scrollable-regions` already named those regions from the heading above. The argument was
    consistency with the site's own practice, and that an `aria-label` is invisible to a sighted
    reader. This was briefly written off as a non-task on the same day, on the accessibility
    half of that alone.

    **The first caption containing a quotation mark found a latent bug beside it.** `stripTags`
    removed tags and never decoded entities, so a region name went back out through `escape()`
    and was escaped twice, shipping the entity itself inside the `aria-label` where a screen
    reader would read it aloud. Nothing on the page shows it, which is how the `{#anchor}`
    version of the same fault survived until `check-build` caught it. Found by reading the built
    output rather than trusting a green build.
  - **The small-boats line. DONE (PR #60, 30 July 2026).** It could not simply be moved: the
    prose carried two longhand figures, and putting them on a page would have broken the promise
    on `/sources-and-method/` that a number in a sentence is inserted from a record. So the
    denominator got a record and the asylum page cites both.

    **Neither rounding survived the source.** The exact total is 43,806 and small boats are 89.6%
    of it, not "around 44,000" and "about 90%". The figure is `calculated` and says so: the Home
    Office publishes this table by quarter and by calendar year and states no year-ending-March
    total, so it is summed over 2025 Q2 to 2026 Q1 across all four methods of entry with every
    component quoted.

    **Two checks on the arithmetic, and one of them was free.** The row-level sheet reproduces
    43,806 independently of the pivot, and the small boats component comes to 39,271, which is
    exactly what this site already published for that period from the Commons Library briefing.
    That briefing returns 403 to a fetch, so this incidentally gives that figure a primary source
    it did not have.
- **Whether `/sources-and-method/` should publish a FOURTH limit.** This bullet said "a third"
  until 30 July, and one of the three candidates it listed, the screen reader, had already been
  published by PR #61 in the bullet above it. Three limits are live. Three candidates are left,
  and the last is new:
  - A figure declared under `historical_literals` is exempted on trust and nothing re-checks
    that the exemption is still deserved.
  - A correction inside an edition is caught only where the publisher's note names its table by
    identifier, and most name theirs by title.
  - **A figure the data layer never recorded is reported and never refused**, so the site can
    carry a number that nothing can tell you has aged. This is the one a reader is most
    affected by, because it is about the numbers rather than about the checking, and the scan
    that reads figures written in words made it larger rather than smaller. What the count is
    on any given day is what `npm run validate` prints.

  Adding a limit to a live page is an editorial call, and so is which of the three earns the
  space.

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
- **"Success measures are chosen and recorded." MET, 30 July 2026.** The measure is
  **candidate 1 of section 4.2: cited by a named outlet or briefing within six months.** It was
  chosen over the other two because 4.2's own audience statement names "professionals who need a
  citation quickly", so citation is the thing this site is for rather than a proxy for it.

  **A correction to the reasoning that nearly picked it for the wrong reason.** An earlier
  recommendation argued it was the only candidate measurable as the site is built, because there
  is no analytics of any kind and no client-side JavaScript. That is false: candidate 2, organic
  search entries on definitional queries, is measurable through Search Console, which verifies by
  DNS record, file or meta tag and needs no JavaScript. Only candidate 3, return visits, needs
  what the project refused. So set Search Console up at launch regardless; it costs nothing and
  it is how you would notice candidate 2 happening.

  **Open, and small:** whether the measure should be published on `/about/`, which already
  carries who runs the site and who pays for it, the other two items of section 4.2.
- **The two comprehension criteria**, that a reader can explain the difference between
  immigration, emigration and net migration after reading the homepage and glossary, and can
  see that asylum is one part of a wider system. These are not failed; they are **untested**,
  and cannot be tested without the first item above.

## Known gaps, carried deliberately

Genuinely not tasks. **Both are now published on the site**, which they were not when this
section was written and were not on 30 July either: it said one of the two was, and PR #61 had
already published the other in the same hours. `/sources-and-method/` carries three limits under
*What the checks do not establish*, the two below plus the sub-100 review. The one still unpublished
is the unrecorded-figure report, and that is the editorial decision above rather than a gap here.

- **No real screen reader has been run.** Chrome's accessibility tree is what assistive
  technology consumes and is what was read, but it is not VoiceOver or NVDA reading a page
  aloud. **Published, PR #61.**
- **Prose about figures is unprotected.** Nothing verifies a chart summary describes the data
  beside it. The series citations shrank this and could not remove it, because a citation
  protects a value and not a claim about a value: `at(2018)` under a sentence naming 2019
  builds cleanly. Published.

---

## Completed

Kept so that a future session can see what was decided and when, rather than reopening it.

- **`docs/UPDATING-DATA.md`, the by-hand update runbook**, 30 July 2026. PR #52. Written before
  the assistant-drafted version, on the rule that you should be able to do a job before you
  delegate it. What it added that existed nowhere: a real update touches eight record fields and
  not the four the scope named, plus `table_reference` as a ninth; the step is reconcile rather
  than look up; record `notes` are re-read every time while page prose is not. Critiquing it
  against the site's own published promises found that the first draft never mentioned
  `CHANGELOG.md`, which `/sources-and-method/` promises carries every figure change.

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
