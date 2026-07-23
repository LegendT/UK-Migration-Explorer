# Backlog

**The durable list of outstanding work.** Every handoff points at this file rather than
restating it, because a handoff gets rewritten each session and a rewrite is where work
quietly falls out. An item leaves this list when it is done, and it leaves by being moved to
"Completed" with a date, never by being deleted.

`scripts/validate-content.mjs` fails the build if a planning document in `docs/` is not
referenced here, so a scope can no longer be written and forgotten.

Last updated 23 July 2026.

---

## Blocking launch

### 1. The pre-publication human review

**The last launch blocker.** `content/sources-and-method.md` commits to it and publication has
already happened, behind a robots rule. Every page carries a notice saying so.

The evidence is assembled in **`docs/PRE-PUBLICATION-REVIEW.md`**: 14 chart sentences beside
the series they describe, 21 unprotected numbers marked with where they live in the data
layer, 7 claims against the four criteria in foundation 8.5.2, and the 14 unit-qualified
warnings. 54 checkboxes and a sign-off block.

Only the owner can do this. An hour or two of reading.

**Closing it also means:** stamping `last_reviewed` on every page the review covers with the
date it was done, removing the pre-launch notice from `content/_includes/base.njk` entirely,
and recording the review in `CHANGELOG.md`.

Note that `last_reviewed` was bumped to 23 July on eight pages because their content changed
that day. **That is not this review.** The stamp means the page was last edited and read in
the ordinary sense; the pre-publication review is the separate commitment the banner still
declares outstanding.

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
