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

**Closing it also means:** refreshing `last_reviewed` on the seven pages whose content is
newer than their review stamp, rewriting the pre-launch banner in
`content/_includes/base.njk`, and recording the review in `CHANGELOG.md`.

### 2. Then, and only then: remove the robots rule

Delete `content/robots.txt` and its guard in `scripts/check-build.mjs`. Deliberate, and it
comes last. That is launch.

---

## Scoped, not built

None of this blocks launch. Each has a scope document; read it before starting.

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

## Known gaps, carried deliberately

Not tasks, but they must not be forgotten either, and each is published on the site.

- **No real screen reader has been run.** Chrome's accessibility tree is what assistive
  technology consumes and is what was read, but it is not VoiceOver or NVDA reading a page
  aloud.
- **Nobody outside this project has been asked whether they want it.** Foundation 14 keeps
  "talk to five people" open. It is a process criterion in section 17.
- **The success measures have not been chosen.** Foundation 4.2 offers three candidates and
  says they must be committed to in phase 1. Also a section 17 criterion.
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
