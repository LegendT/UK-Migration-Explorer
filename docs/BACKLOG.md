# Backlog

**The durable list of outstanding work.** Every handoff points at this file rather than
restating it, because a handoff gets rewritten each session and a rewrite is where work
quietly falls out. An item leaves this list when it is done, and it leaves by being moved to
"Completed" with a date, never by being deleted.

`scripts/validate-content.mjs` fails the build if a planning document in `docs/` is not
referenced here, so a scope can no longer be written and forgotten.

Last updated 27 July 2026.

---

## Blocking launch

### 1. The pre-publication review: conducted 27 July 2026, corrections outstanding

The review was done on 27 July 2026. It worked through the evidence template in
**`docs/PRE-PUBLICATION-REVIEW.md`**, and its findings are recorded in `verification.txt` at the
repository root, kept out of `docs/` because it uses em-dashes and pound signs the style scan
would reject.

**Its outcome is a corrections list, not an approval.** Four claim pages carry "do not publish
as written" or "substantial revision required" (2.2, 2.3, 2.6, 2.7). Five of the seven data
sections carry required corrections (2, 3, 4, 5, 7); Section 6 offers only an optional precision
tweak, and Section 1 only a vintage caution. The blocker stays open until the corrections land
and the pages pass. Do not stamp `last_reviewed`,
remove the pre-launch banner from `content/_includes/base.njk`, or record the review as passed
in `CHANGELOG.md` until then. The review happening is not the review passing.

The corrections below, 1a first. Most are per topic or page, but 1f (voice) and 1g (circulation)
cut across the others, so a page such as 2.7 also has rows there rather than only in 1h. **[you]**
marks an editorial or sourcing call only the owner makes; **[me]** marks a mechanical or factual
change that can be made against a cited source; a data-file change is flagged because it ripples
through the citation tokens. Every
changed or new figure needs a fetched source and a verbatim quote before it is written, per the
project's no-AI-claims-without-source rule.

**1a. "19% born abroad" (Part 2.6): the data has moved. [you + me, data].** ONS now publishes a
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

**1b. The "range spans zero" reasoning (Parts 2.2, 2.3): statistically invalid. [me, rebuild
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

**1c. Costs page (Section 4): mis-dated and mis-sourced. [me, data + fetch].** The £158 hotel rate
is based on the three months to June 2023, not 2024; the £20 dispersal figure is approximate
("around £20"). Both were cited in a Home Office business case in April 2024 and come from the
ICIBI inspection at paragraph 5.14, not the 2025 NAO report the chart attributes. Re-date (title:
figures cited in April 2024), re-source, mark both approximate, and add the June 2025 comparison,
£144.98 and £23.25. Two framing corrections too: "price of a bed" is too narrow (these are
accommodation costs under Home Office arrangements), and "accommodation type is the main driver"
is too absolute (volume and mix both matter; the NAO evidence is that hotels housed about 35% of
people but 76% of contract spending). Fetch and quote the ICIBI and June 2025 figures first.

**1d. Category, basis and denominator errors. [mostly me].**

- Asylum page (Section 2): withdrawals are not initial decisions, so retitle to "Initial
  decisions and withdrawals"; 16,901 counts people, not claims; and the chart omits 5,931
  administrative outcomes, so it is not an exhaustive breakdown. **[me]**
- Section 7 and Part 2.4: 88,000 is asylum only; humanitarian, 35,000 or 6%, is a separate
  category, so relabel the table row "Asylum applicants." Fix the non-EU+ definition too: it is a
  nationality grouping, not an arrival category. Also remove or source the assertion that asylum
  was "a small fraction of immigration a decade ago" (the ONS reason series shown begins in 2019),
  and refine the net-migration-by-reason limitation the reviewer quotes. **[me]**
- Part 2.1: 93,653 people were in asylum accommodation, not 97,519, which is total support
  **[me]**. Softening the verdict from "No" to "the figures do not show that" is a short-answer
  rewrite, and the eligibility qualifiers touch wording (waiting for a decision does not
  automatically mean receiving support), so both are **[you]**.

**1e. Qualifiers and precision (Sections 3, 5, 6). [me].** Section 3: the people queue did not grow
steadily (end-2014 22,898 to end-2015 22,147, a 3.28% fall), so "grew substantially," not "grew
steadily." Peaks need "among the year-end points shown": the true peaks are 944,000 net migration
in the year ending March 2023 and 175,457 people awaiting a decision in June 2023. The
net-migration revision is 285,000, or 47%, from 606,000 to 891,000 for 2022, which the current
"more than 120,000" understates rather than contradicts. Section 6 needs only an optional
precision tweak, not a correction; the reviewer notes its rounding gap is "not an error."

**1f. Voice rewrites. [you].** Every "recommended short answer" and "recommended summary" in
`verification.txt` is the reviewer's wording. Adopting each verbatim or rewording it in the
site's voice is the owner's call, page by page.

**1g. Circulation examples (Parts 2.1, 2.3, 2.7). [you].** Each fails the "claim demonstrably
circulates" criterion for want of an attributable example: 2.1 and 2.7 need one supplied or the
claim dropped; 2.3 needs an example of the stronger "far more" wording or that intensifier
removed. 2.4 already has one, British Future; 2.5 has one, the Home Affairs Committee. (2.6 is not
here: it fails selection for a different reason, covered in 1a.)

**1h. "Refused asylum" (Part 2.7). [me + you].** Delete the sentence tokenised in PR #28, "a final
grant rate 17 to 29 points above an initial rate of 39% is not almost all," because it applies a
historical uplift to the current rate, the comparison the Home Office source note says must not be
made. Further **[me]** edits: change the front-matter source to "Home Office; Ministry of
Justice/HMCTS" and disclose the mixed periods and provisional tribunal data; "final grant rate" to
"latest recorded grant rate"; "appeals heard" to "appeals determined at a hearing or on the
papers"; stop calling the 17 to 29 point rise refusals "overturned on appeal" (it includes
reconsiderations and other outcome changes); and make clear that protection or other leave is
broader than refugee recognition and that an allowed appeal does not automatically confer status.
Remove or source "cases with stronger grounds are more likely to be pursued." The short-answer
rewrite and the circulation example are **[you]**.

**1i. "Net migration is arrivals" (Part 2.5): passes with two minor rhetorical tweaks. [you].**
The reviewer's strongest Part 2 section so far. Only the "moved by 100,000 without a single person
moving" line and one clarity edit.

Section 1 of the review, people claiming asylum, needs no edit, only a vintage caution: do not mix
the 104,764 figure in use with the older 108,138 that some sources still cite for 2024.

### 2. Then, and only then: remove the robots rule

Delete `content/robots.txt` and its guard in `scripts/check-build.mjs`. Deliberate, and it
comes last. That is launch.

---

## Scoped, not built

None of this blocks launch. Each has a scope document; read it before starting.

**This list is in recommended order. Take the first unstarted item.** The order lives here
rather than in the handoff's prompt, so that finishing something does not leave a stale
instruction somewhere else. Re-order it freely; that is a one-line edit and it is the only
place the sequence is stated.

The recommendation is item 4's reconciliation first, ahead of everything else here, because it
is the smallest piece of real work that guards against publishing two different official values
for the same measure. Note that item 4's scope document numbers that piece **part 3**, and it
is listed first below; the scope's numbering follows its own argument rather than priority.

### 3. Release notifier and evidence check

**`docs/UPDATE-AUTOMATION.md`.** Four phases. Phases 1 and 2 are each worth building alone;
phase 3 is unsafe before phase 2 exists; phase 4 needs owner sign-off.

- **Phase 2, the evidence check, first despite its number.** Any figure whose value changed, or
  which is new, must carry a quote from a fetched source containing that value. It applies to
  updates made by hand and is what makes everything after it safe.
- **Phase 1, the notifier.** Nothing detects that a release has happened. Verified endpoints
  and three traps are in the scope.
- Phase 3, the update prompt. Phase 4, rewriting what the sources page says about automation.

### 4. Citing a series point, and the four figures held twice

**`docs/SERIES-CITATIONS.md`.** Three parts, and the third is ordered first.

- **Four figures are held twice**, as a headline metric and as a series point, with nothing
  reconciling them. A quarterly update revising one and not the other would publish two
  different official values for the same measure. All four agree today; the risk is latent.
- An `at(year)` filter so chart summaries cite series points rather than typing them. Tested.
- A check refusing a series value written longhand.

### 5. The eight undrafted claims

Foundation section 8.5.3 specifies fifteen; seven are written. One of the eight,
"Local areas all carry the same pressure", **cannot be written**: it needs per-capita local
authority figures and `data/` holds none.

Two need a direction decision from the owner before drafting, because there is no "both"
label: "The asylum backlog is one number" and "Falling net migration means the asylum system
is shrinking".

### 6. `docs/UPDATING-DATA.md`

The manual runbook for the update commitment, modelled on DEBT's. Write this **before**
automating any of it: you should be able to do the job by hand before delegating it. Smaller
than it once was, because the cycle is three named releases and the validator reports which
figures are overdue.

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
  beside it. Item 4 would shrink this; it cannot remove it, because a token protects a value
  and not a claim about a value.

---

## Completed

Kept so that a future session can see what was decided and when, rather than reopening it.

- **The update commitment**, signed 23 July 2026. One month from each of the three cadenced
  releases; irregular publishers carry no promised schedule.
- **The foundation drift read**, 23 July 2026. PR #14.
- **The design and accessibility rounds**, 23 July 2026. PR #12.
- **The 37-defect audit list**, 22 July 2026.
