# UK Migration Explorer
## Pre-launch snagging list

**Status:** Pre-launch  
**Priority:** Precision, trust, provenance and accessibility  
**Launch position:** Do not launch until all **P0** and **P1** items are closed, and all **P2** items are either closed or explicitly signed off with a documented residual limitation.

---

# P0 — Launch blockers

## SNAG-01 — Global footer incorrectly describes all figures as official statistics

### Problem

The site-wide footer currently states:

> “Figures are official statistics and may be revised.”

This is not accurate for all figures published by the project.

The site's own data model distinguishes between:

- official
- provisional
- estimated
- calculated

Some published figures are explicitly project calculations or estimates rather than official published statistics.

The clearest example is the approximately **£297,000 lifetime contribution** figure derived from an OBR chart. The page correctly explains that this is not an OBR-published figure, but the global footer then implies that all figures are official statistics.

### Risk

High trust and provenance risk.

The site's general statement is stronger than the evidence permits and conflicts with the site's own confidence model.

### Recommendation

Replace the footer wording with something such as:

> Figures are sourced from official statistics and other clearly identified evidence. Some figures are calculated or estimated by this project. Official statistics may be revised.

Continue to show figure-specific confidence and methodology information where appropriate.

### Acceptance criteria

- No site-wide wording describes calculated or estimated figures as official statistics.
- Footer wording accurately reflects all four confidence categories.
- Relevant tests or content validation are updated if necessary.
- The wording is checked across every template using the shared footer.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-02 — Launch PR is targeting the wrong branch

### Problem

Launch PR #168 currently targets `item-13-reader-facing-accuracy` rather than `main`.

PR #167 containing the accuracy changes has already been merged into `main`.

### Risk

Merging the launch PR in its current state may not produce the intended production release.

### Recommendation

Retarget PR #168 to `main` and review the resulting diff before merge.

### Acceptance criteria

- PR #168 base branch is `main`.
- Diff contains only intended launch changes.
- No previously merged accuracy fixes disappear from the resulting diff.
- CI completes successfully against the corrected branch relationship.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-03 — Lifetime-contribution claim is outside the complete editorial sign-off

### Problem

The lifetime-contribution claim page has undergone substantial correction and improvement but remains explicitly outside the site's full signed pre-publication review.

Current sign-off therefore does not cover every substantive claim page.

### Risk

One of the site's most contestable fiscal claims would launch without the same documented review status as the rest of the project.

### Recommendation

Run the page through the same final evidence and editorial review as every other claim page.

Update the sign-off to cover **23 of 23 pages**.

Particular attention should be given to:

- distinction between an OBR-published figure and a project-derived figure;
- assumptions about age;
- earnings assumptions;
- dependant assumptions;
- endpoint age;
- model sensitivity;
- wording around “average migrant contribution”.

### Acceptance criteria

- Lifetime-contribution page receives documented sign-off.
- Review scope states 23/23 pages.
- Derived values remain clearly labelled as project calculations.
- No wording implies that £297,000 or £341,000 is an official OBR-published average migrant contribution.
- The source, model assumptions and limitations remain visible to readers.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-04 — Home Office 2025–26 Annual Report requires explicit supersession review

### Problem

The Home Office Annual Report and Accounts 2025–26 was published on 14 July 2026.

Some site material, particularly asylum hotel cost material, continues to use figures from the 2024–25 accounts.

This may be legitimate if the newer publication does not contain a directly comparable replacement figure, but that decision is not currently documented clearly enough.

### Risk

Readers may reasonably interpret the use of the older annual report as stale sourcing.

### Recommendation

Manually review the 2025–26 Annual Report against every figure sourced using the `ho-ara` source family.

For each affected figure, establish whether:

1. a newer directly comparable figure exists;
2. the existing figure should be replaced;
3. the existing figure remains the latest comparable published measure.

Where the older figure remains appropriate, record that decision explicitly.

Example:

> Home Office Annual Report 2025–26 checked [date]. It does not publish a directly comparable hotel-spending daily average, so the 2024–25 figure remains the latest comparable published figure.

### Acceptance criteria

- Every `ho-ara` figure has been checked against the 2025–26 report.
- Superseded figures are updated.
- Non-superseded figures have a documented justification.
- Source-check metadata records the review date.
- Any reader-facing wording that could imply the older source is simply the latest annual report is corrected.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

# P1 — Must fix before launch

## SNAG-05 — “Last reviewed” dates are internally inconsistent

### Problem

Some pages contain content added or materially revised after the date shown as “Last reviewed”.

Examples include:

- Common Claims material changed in August while showing a July review date.
- Style Guide content referring to changes made on 6 August while showing “Last reviewed 22 July 2026”.
- project metadata retaining older review dates.

It is therefore unclear whether “Last reviewed” means:

- last editorial review;
- last data review;
- last substantive page update;
- project-wide review date.

### Risk

This weakens the audit trail and may give readers a false impression about when material was checked.

### Recommendation

Define separate metadata concepts.

Prefer:

- **Page last reviewed**
- **Data checked**
- optionally **Last materially changed**

Do not display figure-specific wording such as:

> “Figures are the latest published at that date”

on pages where that statement is not meaningful, such as the Style Guide.

### Acceptance criteria

- Meaning of each displayed date is defined.
- Dates accurately represent the underlying action.
- Common Claims and Style Guide dates are corrected.
- Shared templates do not display irrelevant statistical review wording.
- A material page update cannot leave an obviously impossible review date behind.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-06 — Asylum backlog wording risks comparing people with cases

### Problem

The claim page correctly distinguishes:

- people awaiting initial decision;
- cases awaiting initial decision;
- appeal cases.

However, the sentence:

> “The appeals queue is now the larger of the two.”

appears close to figures using different units and could be interpreted as comparing **87,450 appeal cases** with **175,457 people**.

The intended comparison appears to be cases versus cases.

### Risk

A reader may misunderstand the comparison, undermining a page whose main purpose is explaining why these units must not be mixed.

### Recommendation

Replace with explicit wording:

> On a cases basis, the appeals queue is now larger: 87,450 appeal cases compared with 35,744 cases awaiting an initial decision.

### Acceptance criteria

- Comparison identifies the unit explicitly.
- No nearby wording implies comparison of people with cases.
- Any chart, summary or metadata repeating the comparison uses the same unit basis.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-07 — Complete manual accessibility sign-off is missing

### Problem

Automated accessibility coverage is strong, including:

- WCAG 2.2 AA testing;
- light and dark modes;
- keyboard-relevant checks;
- narrow viewport/reflow checks;
- accessible SVG titles and descriptions;
- chart data tables;
- table captions and scoped headers.

However, there is no current documented real assistive-technology sign-off covering the production build.

Previous manual evidence is also no longer fully represented in the repository.

### Risk

Automated tests cannot establish actual screen-reader usability, focus behaviour or comprehension.

### Recommendation

Perform and document a manual smoke test on the final production build.

Minimum test set:

1. homepage navigation;
2. desktop navigation;
3. mobile `<details>` navigation;
4. keyboard-only navigation;
5. visible focus;
6. one representative migration chart;
7. chart accessible name and description;
8. chart data-table disclosure;
9. one long Common Claims page;
10. source/provenance disclosure;
11. 400% zoom/reflow;
12. dark mode.

Assistive technology:

- VoiceOver + Safari on macOS;
- preferably also NVDA + Firefox or Chrome on Windows.

### Acceptance criteria

- No keyboard traps.
- Logical focus order.
- Focus remains clearly visible.
- Navigation can be operated without pointer input.
- Charts have meaningful accessible names and descriptions.
- Equivalent chart data can be reached and understood as HTML.
- Content remains usable at 400% zoom.
- Findings and test environment are recorded.
- Any defects found are either fixed or formally assessed before launch.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-08 — Backlog and launch governance documentation is stale

### Problem

The project backlog still describes some work as built but not merged even though PR #167 has already been merged into `main`.

The backlog is intended to act as a reliable source of launch state.

### Risk

Repository documentation can no longer be relied upon to determine what is actually complete.

This is particularly undesirable in a project whose public credibility rests partly on traceability and explicit state.

### Recommendation

Reconcile:

- `BACKLOG.md`
- handoff documentation;
- open PR state;
- merged work;
- launch gates;
- outstanding source checks.

Do this before final launch sign-off.

### Acceptance criteria

- No completed or merged work is described as pending.
- Remaining launch items correspond to actual repository state.
- Launch documentation and GitHub state agree.
- The final launch decision can be reconstructed from the repository without relying on undocumented knowledge.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

# P2 — Pre-launch quality requirements

## SNAG-09 — Define the meaning of source currency more explicitly

### Problem

A source can remain the correct source even when a newer publication from the same organisation exists, because the newer publication may not contain a directly comparable statistic.

The site's provenance model handles this conceptually but does not always expose the reasoning to readers.

### Risk

An older but valid source may look stale, or a genuinely stale source may be mistaken for one that has been deliberately retained.

### Recommendation

Where an apparently older source remains authoritative, provide a short supersession note.

This is particularly useful for:

- annual reports;
- discontinued datasets;
- changed methodologies;
- series where publication frequency differs;
- figures that are not reproduced in every edition of a publication.

### Acceptance criteria

Readers and maintainers can distinguish:

- “old and stale”
from
- “older publication, but still latest comparable figure”.

Supersession decisions are documented rather than left implicit.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-10 — Review all derived figures for consistent confidence labelling

### Problem

The site correctly labels many derived figures as `calculated` or `estimated`, but the footer issue demonstrates how easy it is for surrounding language to accidentally promote a derived value into an “official” one.

### Recommendation

Run a final query over all figures with confidence:

- `estimated`
- `calculated`

For each one verify:

- wording on the page;
- caption;
- nearby explanatory prose;
- Common Claims wording;
- metadata;
- source attribution;
- footer interaction.

### Acceptance criteria

- No derived value can reasonably be mistaken for a figure directly published by the cited organisation.
- Calculations identify the underlying source values.
- Estimates identify the nature of the estimation where material.
- Confidence labels are consistent between data, template and reader-facing text.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-11 — Perform final unit-consistency audit

### Problem

Several migration and asylum datasets use similar-looking but non-equivalent units:

- people;
- cases;
- applications;
- claimants;
- grants;
- arrivals;
- detected arrivals;
- households;
- support recipients.

The asylum-backlog wording demonstrates how easily ambiguity can creep in even when the underlying data is correct.

### Recommendation

Run a final automated or manual audit specifically for unit language.

Check:

- page titles;
- headings;
- chart labels;
- table headings;
- summaries;
- callouts;
- Common Claims;
- explanatory prose;
- metadata.

### Acceptance criteria

- Every comparison uses equivalent units or explicitly explains why differing units are shown.
- Unit changes within a page are signposted.
- People and cases are never used interchangeably.
- Applications, applicants and grants are distinguished.
- Detected arrivals are not presented as all irregular migration unless explicitly qualified.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-12 — Provenance blocks interrupt the reading flow

### Problem

The extensive “How to cite this” and evidence material on Common Claims pages appears very early in the reading experience.

This provides strong transparency for researchers, but creates substantial separation between the short answer and the full explanation.

On some pages the provenance machinery risks becoming more prominent than the explanation itself.

### Risk

Moderate UX and comprehension risk.

The purpose of provenance is to increase trust. If it makes the substantive explanation harder to reach or understand, it can work against that objective.

### Recommendation

Review the placement and presentation of provenance information across all Common Claims pages before launch.

Consider progressive disclosure using native `<details>`.

For example:

> Sources for figures on this page (6)

Keep essential information immediately visible where it affects interpretation, including:

- source or publisher;
- reference period;
- confidence classification;
- important methodological limitations;
- whether a figure is calculated or estimated.

Detailed citation instructions, source lists and extended provenance information can then sit within the disclosure.

The objective is **not to hide provenance**, but to establish a clearer hierarchy:

1. what the claim says;
2. what the evidence says;
3. important qualifications;
4. full audit trail.

### Acceptance criteria

- Common Claims pages maintain complete source transparency.
- Readers can move naturally from short answer to explanation.
- Important methodological warnings remain visible without interaction.
- Calculated and estimated figures remain clearly identified.
- Full provenance remains available on the page.
- Progressive disclosure, if used, is keyboard and screen-reader accessible.
- Presentation is consistent across all claim pages.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

## SNAG-13 — Release monitoring coverage should be expanded before launch

### Problem

Automated release checking provides useful protection against stale data, but several important source families remain outside the automated monitoring system.

The Home Office Annual Report issue demonstrates the weakness this creates: a newer publication can exist without the normal release-monitoring process identifying whether published figures have been superseded.

A site promising current, attributable data should have a documented mechanism for identifying new editions of all significant recurring sources.

### Risk

Moderate-to-high ongoing trust risk.

The figures can be completely correct at launch and silently become outdated shortly afterwards if an important publication family is not monitored.

### Recommendation

Before launch:

1. identify every recurring source family used by the site;
2. classify each as:
   - automatically monitored;
   - manually monitored;
   - non-recurring/static;
3. add automated monitoring for important sources where practical;
4. document an explicit manual monitoring process for those that cannot be reliably automated;
5. include the Home Office Annual Report and Accounts in that process.

Do not turn unreliable network checks into hard deployment gates.

The current distinction between deterministic repository validation and fallible external checks is sensible.

Where automation cannot reliably determine whether a new publication supersedes a figure, it should raise a **human-review warning**, not automatically replace data.

### Acceptance criteria

- Every recurring source family has a defined release-monitoring method.
- Home Office Annual Report and Accounts is monitored.
- Sources outside automation are explicitly listed as requiring manual review.
- New-publication warnings generate a human review requirement.
- Release monitoring does not automatically assume that a newer publication contains a comparable replacement statistic.
- The monitoring process is documented in the repository.
- The process has been run successfully against the final pre-launch dataset.

**Status:** ☐ Open ☐ Fixed ☐ Verified

---

# Final pre-launch verification

Once all P0 and P1 snags are closed, and all P2 items have been closed or explicitly signed off:

## Data and evidence

☐ Re-run all data validation  
☐ Re-run source/evidence validation  
☐ Re-run release checker  
☐ Review every release-check warning manually  
☐ Confirm current ONS LTIM release  
☐ Confirm current Home Office quarterly immigration release  
☐ Confirm current MoJ tribunal release  
☐ Confirm Home Office annual-report supersession decisions  
☐ Verify every calculated figure  
☐ Verify every estimated figure  
☐ Verify every provisional figure is described as provisional  
☐ Confirm reference periods throughout  
☐ Confirm units throughout  

## Content

☐ Complete 23/23 claim-page review  
☐ Verify figure units throughout  
☐ Verify dates and reference periods  
☐ Verify confidence labels  
☐ Verify source names  
☐ Verify source links  
☐ Verify “Last reviewed” metadata  
☐ Verify “Data checked” metadata where used  
☐ Check page titles and headings  
☐ Check summary wording  
☐ Check chart captions  
☐ Check table captions  
☐ Check cross-links  
☐ Check related-claim links  
☐ Check that no calculated figure is described as official  
☐ Check that no model output is presented as an observed fact  
☐ Check all supersession notes  

## Accessibility

☐ Automated WCAG pipeline passes  
☐ Keyboard-only test passes  
☐ VoiceOver test completed  
☐ NVDA test completed where practical  
☐ 400% zoom/reflow checked  
☐ Mobile navigation checked  
☐ Desktop navigation checked  
☐ Focus visibility checked  
☐ Chart accessible names checked  
☐ Chart descriptions checked  
☐ Chart/table equivalence checked  
☐ Table headings checked  
☐ Disclosure components checked  
☐ Dark mode checked  

## UX

☐ Common Claims reading flow reviewed  
☐ Provenance does not obscure substantive explanations  
☐ Essential qualifications remain visible  
☐ Full sources remain easy to reach  
☐ Long pages remain navigable  
☐ Mobile reading flow checked  
☐ Source disclosures work without JavaScript dependencies where intended  

## Code and build

☐ Clean production build  
☐ No unexpected build warnings  
☐ No unexpected browser console errors  
☐ Generated URL inventory matches intended site  
☐ Internal links pass  
☐ External source-link checks reviewed  
☐ No missing source references  
☐ No unreferenced data entries  
☐ No orphaned pages  
☐ No duplicate or conflicting IDs  
☐ Launch PR targets `main`  
☐ Final PR diff reviewed manually  
☐ CI passes on launch PR  
☐ Production build matches reviewed commit  

## Release monitoring

☐ Every recurring source classified  
☐ Automated sources identified  
☐ Manually monitored sources identified  
☐ Static/non-recurring sources identified  
☐ Home Office Annual Report monitored  
☐ ONS LTIM monitoring confirmed  
☐ Home Office quarterly monitoring confirmed  
☐ MoJ tribunal monitoring confirmed  
☐ Human review process documented for ambiguous supersession  
☐ Final release check completed immediately before launch  

## Governance

☐ Backlog reflects actual repository state  
☐ Handoff documentation updated  
☐ Open PR state matches documentation  
☐ Corrections/change log current  
☐ Final review scope recorded  
☐ 23/23 claim-page sign-off recorded  
☐ Accessibility test evidence recorded  
☐ Source-currency review recorded  
☐ Known limitations recorded  
☐ Launch date recorded  
☐ Reviewed commit/hash recorded  
☐ Production deployment verified  

---

# Launch decision

Launch only when:

- **all P0 items are closed;**
- **all P1 items are closed;**
- **all P2 items are either closed or explicitly signed off with a documented reason for any residual limitation;**
- the final production build passes validation;
- the 23/23 editorial review is recorded;
- manual accessibility testing is recorded;
- there are no unresolved source-currency questions affecting published figures;
- all calculated and estimated figures have been checked for reader-facing attribution;
- release monitoring covers every recurring source through either an automated or documented manual process;
- repository governance documentation matches the actual launch state;
- the reviewed production build is the build that is actually deployed.

There are **no identified findings from this audit that are intentionally deferred until after launch**.

Future enhancements can still enter the normal post-launch backlog, but the known trust, provenance, accessibility, data-currency and reader-experience issues identified during this audit should be resolved as part of launch readiness.