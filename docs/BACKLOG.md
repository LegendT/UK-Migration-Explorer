# Backlog

**The durable list of outstanding work.** Every handoff points at this file rather than
restating it, because a handoff gets rewritten each session and a rewrite is where work
quietly falls out. An item leaves this list when it is done, and it leaves by being moved to
"Completed" with a date, never by being deleted.

`scripts/validate-content.mjs` fails the build if a planning document in `docs/` is not
referenced here, so a scope can no longer be written and forgotten.

Last updated 28 July 2026.

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

**Three closing steps remain, and they are the owner's.** They were deliberately gated on the
corrections landing, and that gate has now opened:

1. **Decide the `last_reviewed` question, which is not as small as it looks.** This document says
   not to stamp `last_reviewed` until the corrections land. They have. But the practice already
   diverged while they were landing: 1a and 1b bumped `last_reviewed` and `review_due` to 27 July
   on the claim pages they corrected, and 1c did not bump `costs.njk`. 1d to 1i deliberately
   bumped nothing, on the instruction above. So three claim pages now show a review date after
   their corrections and four pages show one before. The claims index displays this to readers.
   Whichever way it goes, it should go one way.
2. Remove the pre-launch banner from `content/_includes/base.njk`.
3. Record the review as passed in `CHANGELOG.md`.

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

**This list is in recommended order. Take the first unfinished item, which is item 3, where the
next step is the owner's: whether the proposed corrections watch comes before phase 3.** The
order lives here rather than in the handoff's prompt, so that finishing something does not
leave a stale instruction somewhere else. Re-order it freely; this is the only place the
sequence is stated.

If you reorder, or complete something, **move the sections and renumber** rather than adding a
sentence explaining that the order is not the order. That trap was set once, on 28 July 2026,
and a fresh session following the instruction would have taken the wrong item.

### 3. Release notifier and evidence check: phases 1 and 2 built, two phases left

**`docs/UPDATE-AUTOMATION.md`.** Four phases. Phases 1 and 2 are each worth building alone;
phase 3 is unsafe before phase 2 exists; phase 4 needs owner sign-off.

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
- **Phase 1b, the corrections watch, proposed 28 July 2026, and it may belong before phase 3.
  The order is [you].** Nothing detects a correction *inside* an edition, which is the one
  channel through which a wrong number can sit on the site indefinitely: the slug does not
  change, so the notifier cannot see it, and a cadence cannot infer it. The route is already
  fetched, and matching the data-tables change history against the tables the records name
  produces one hit in sixteen, the `Vis_01` correction the by-hand run recorded as missing a
  published figure by a single row. The scope holds the table count and the matching rule; it
  said six here and twelve there for a day, which is what restating a number in two files does.
  **The evidence check now refuses an unexplained move inside an edition**, which is this hole
  from the other side and strengthens the case for building 1b early.
- **Phase 3, the update prompt.** Seven things to settle before writing it, listed in the
  scope. **Two are blockers, and both are the same hole:** the series files appear nowhere in
  the procedure, so as scoped it cannot do an ONS update at all, because the four metrics that
  declare a `series_ref` are all `ons-ltim` and moving them without the series fails
  `validate-data.mjs`. The `source_id` query it is built on could not find the series either,
  until this PR gave them one.
- Phase 4, rewriting what the sources page says about automation, needs the owner's sign-off.

### 4. The eight undrafted claims

Foundation section 8.5.3 specifies fifteen; seven are written. One of the eight,
"Local areas all carry the same pressure", **cannot be written**: it needs per-capita local
authority figures and `data/` holds none.

Two need a direction decision from the owner before drafting, because there is no "both"
label: "The asylum backlog is one number" and "Falling net migration means the asylum system
is shrinking".

### 5. `docs/UPDATING-DATA.md`

The manual runbook for the update commitment, modelled on DEBT's. Write this **before**
automating any of it: you should be able to do the job by hand before delegating it. Smaller
than it once was, because the cycle is three named releases and the validator reports which
figures are overdue.

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
- **Whether `/sources-and-method/` should publish a third limit.** The bullet saying series
  values are not individually cited has gone, because they now are. Nothing replaced it, and
  a candidate exists: a figure declared under `historical_literals` is exempted on trust and
  nothing re-checks that the exemption is still deserved. Adding a limit to a live page is an
  editorial call.

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

Genuinely not tasks, and each is published on the site rather than only recorded here.

- **No real screen reader has been run.** Chrome's accessibility tree is what assistive
  technology consumes and is what was read, but it is not VoiceOver or NVDA reading a page
  aloud.
- **`table_reference` is unimplemented.** Home Office table identifiers survive only as prose
  inside `notes`.
- **Prose about figures is unprotected.** Nothing verifies a chart summary describes the data
  beside it. The series citations shrank this and could not remove it, because a citation
  protects a value and not a claim about a value: `at(2018)` under a sentence naming 2019
  builds cleanly.

---

## Completed

Kept so that a future session can see what was decided and when, rather than reopening it.

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
