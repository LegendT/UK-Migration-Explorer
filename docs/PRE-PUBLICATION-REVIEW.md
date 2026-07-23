# Pre-publication review, working document

Generated 23 July 2026 from the live data layer. **This is the evidence, not the review.**
Every claim made in prose is set beside what the data actually says, so the reading is
comparison rather than research.

**Scope.** What the automated checks cannot establish, which is the list already published on
`/sources-and-method/` under *What the checks do not establish*. Everything outside this
document is either checked mechanically on every build, or was verified against a primary
publication with a quoted sentence or table cell during the July 2026 verification pass.

**How to read it.** A value shown as `{{ ... }}` or `~ (x.value | number) ~` is a citation:
it is resolved from the data layer at build time and cannot go stale, so it needs no checking.
**Only the literal numbers need your eyes.** Where a literal matches something the data layer
holds, it is marked, because those are the ones a token could protect in future.

Nothing below is a finding. It is unverified prose placed next to its data.

---

## 1. Chart prose against the series it draws

The chart is drawn from the series file; the sentence describing it is typed by hand. Nothing
checks that they agree, and four false summaries have been found here before, by reading.


### 1. People claiming asylum in the UK, 2010 to 2025

`asylum.njk`, lineChart

**What the chart draws**

- People claiming asylum: 2010: 22,644 · 2011: 25,898 · 2012: 27,978 · 2013: 29,875 · 2014: 32,344 · 2015: 39,968 · 2016: 39,357 · 2017: 34,435 · 2018: 38,483 · 2019: 45,537 · 2020: 37,603 · 2021: 57,942 · 2022: 95,007 · 2023: 87,427 · 2024: 104,764 · 2025: 100,625

**Summary as written**

> 'Claims roughly doubled across the 2010s, from **22,644** [series asylumApplications@2010] in 2010 to **45,537** [series asylumApplications@2019] in 2019. They rose steeply to **95,007** [series asylumApplications@2022] in 2022, fell 8% in 2023, and reached a high of **104,764** [series asylumApplications@2024] in 2024 before easing to **100,625** [series asylumApplications@2025] in 2025.'

**Note as written**

> 'PEOPLE basis throughout: main applicants plus dependants. The applications series counts main applicants only and is roughly a fifth lower. Never splice the two. These are calendar years, so they do not line up with the year-ending-March figures elsewhere on this site.'

- [ ] Every literal above matches the data
- [ ] Every direction word (rose, fell, peaked, doubled) matches the data


### 2. Initial decisions by outcome, year ending March 2026

`asylum.njk`, barChart

**What the chart draws**

- `asylum/asylum-refusals`: **79,719** people (year ending March 2026)
- `asylum/people-granted-protection-or-other-leave-at-initial-decision`: **48,581** people (year ending March 2026)
- `asylum/asylum-withdrawals`: **16,901** people (year ending March 2026)

**Summary as written**

> 'Of ' ~ (decisions.value | number) ~ ' people receiving a first decision, ' ~ (granted.value | number) ~ ' were granted protection or other leave and ' ~ (refused.value | number) ~ ' were refused. A further ' ~ (withdrawn.value | number) ~ ' claims were withdrawn.'

**Note as written**

> 'The published grant rate of ' ~ grantRate.value ~ '% is calculated on main applicants. Recomputing it from these people-based figures gives 37.9%, which is a different measure, a worked example of why the basis has to be checked before dividing one figure by another.'

- [ ] Every literal above matches the data
- [ ] Every direction word (rose, fell, peaked, doubled) matches the data


### 3. Waiting for a first asylum decision, end of each year, 2010 to 2025

`asylum.njk`, lineChart

**What the chart draws**

- People: 2010: 7,240 · 2011: 8,857 · 2012: 12,816 · 2013: 18,172 · 2014: 22,898 · 2015: 22,147 · 2016: 27,857 · 2017: 29,522 · 2018: 35,855 · 2019: 51,228 · 2020: 64,895 · 2021: 100,564 · 2022: 160,919 · 2023: 128,786 · 2024: 124,802 · 2025: 64,426
- Cases (alternate_basis): 2010: 5,978 · 2011: 6,800 · 2012: 9,871 · 2013: 13,628 · 2014: 17,067 · 2015: 18,111 · 2016: 21,475 · 2017: 22,234 · 2018: 27,256 · 2019: 40,032 · 2020: 51,321 · 2021: 81,978 · 2022: 132,182 · 2023: 95,252 · 2024: 90,686 · 2025: 48,723

**Summary as written**

> 'The queue grew steadily through the 2010s, peaked at the end of 2022, and has since fallen by 60% on the people basis and 63% on the cases basis. The two lines are the same queue counted two ways.'

**Note as written**

> 'Both lines describe the same people. The upper counts people including dependants; the lower counts main-applicant cases. Quoting one and comparing it with the other is the most common error made with this figure. The within-year peak was higher than either line shows: **175,457** [not in the data layer] people in June 2023.'

- [ ] Every literal above matches the data
- [ ] Every direction word (rose, fell, peaked, doubled) matches the data


### 4. Cost of an accommodation place per night, 2024

`costs.njk`, barChart

**What the chart draws**

- `fiscal/average-cost-of-an-asylum-hotel-place-per-person-per-night`: **158** £ per night (2024)
- `fiscal/cost-of-a-dispersal-accommodation-place-per-person-per-night`: **20** £ per night (2024)

**Summary as written**

> 'A hotel place cost about £' ~ (hotelRate.value | number) ~ ' per person per night, roughly eight times the £' ~ (dispersalRate.value | number) ~ ' rate for dispersal accommodation.'

**Note as written**

> 'This is the price of a bed under a contract, not a measure of what any person costs or is worth. It is on this page because the gap between the two rates is what makes accommodation type, rather than the number of people, the main driver of the bill.'

- [ ] Every literal above matches the data
- [ ] Every direction word (rose, fell, peaked, doubled) matches the data


### 5. UK net migration, 2012 to 2025

`migration.njk`, lineChart

**What the chart draws**

- Net migration: 2012: 195,000 · 2013: 244,000 · 2014: 284,000 · 2015: 303,000 · 2016: 249,000 · 2017: 208,000 · 2018: 276,000 · 2019: 184,000 · 2020: 93,000 · 2021: 467,000 · 2022: 891,000 · 2023: 848,000 · 2024: 331,000 · 2025: 171,000

**Summary as written**

> 'Net migration rose sharply from 2021, peaked in 2022 at **891,000** [series netMigration@2022], and has fallen in each of the three years since, to ' ~ (netMigration.value | number) ~ '.'

**Note as written**

> 'ONS advises that estimates before and after June 2021 should be compared with caution, because the methods used to produce them differ. The break is marked on the chart. Every point comes from a single ONS release; figures from different releases must not be mixed, and the 2022 estimate has moved by more than **120,000** [not in the data layer] across revisions.'

- [ ] Every literal above matches the data
- [ ] Every direction word (rose, fell, peaked, doubled) matches the data


### 6. Long-term immigration and emigration, 2012 to 2025

`migration.njk`, lineChart

**What the chart draws**

- Immigration: 2012: 643,000 · 2013: 713,000 · 2014: 778,000 · 2015: 797,000 · 2016: 772,000 · 2017: 752,000 · 2018: 825,000 · 2019: 788,000 · 2020: 662,000 · 2021: 947,000 · 2022: 1,398,000 · 2023: 1,441,000 · 2024: 1,012,000 · 2025: 813,000
- Emigration (emigration): 2012: 448,000 · 2013: 469,000 · 2014: 494,000 · 2015: 494,000 · 2016: 523,000 · 2017: 544,000 · 2018: 549,000 · 2019: 605,000 · 2020: 569,000 · 2021: 480,000 · 2022: 508,000 · 2023: 593,000 · 2024: 680,000 · 2025: 642,000

**Summary as written**

> 'Immigration was highest in 2023 on this calendar-year series, at **1,441,000** [series flows@2023], and has fallen since. Emigration rose steadily from **480,000** [series flows.emigration@2021] in 2021 to **680,000** [series flows.emigration@2024] in 2024, easing to ' ~ (emigrationTotal.value | number) ~ ' in 2025.'

**Note as written**

> 'Between 2023 and 2024, net migration fell by around **517,000** [not in the data layer] while immigration fell by around **429,000** [not in the data layer]. The difference is emigration rising by roughly **87,000** [not in the data layer] over the same period, more people leaving, not only fewer arriving. These are calendar years. The highest twelve-month immigration estimate ONS publishes is **1,469,000** [not in the data layer], in the year ending March 2023, a window a calendar-year series cannot show.'

- [ ] Every literal above matches the data
- [ ] Every direction word (rose, fell, peaked, doubled) matches the data


### 7. Reason for long-term immigration, non-EU+ arrivals, year ending December 2025

`migration.njk`, barChart

**What the chart draws**

- `migration/study-related-immigration`: **294,000** people (year ending December 2025)
- `migration/work-related-immigration`: **146,000** people (year ending December 2025)
- `migration/asylum-related-immigration`: **88,000** people (year ending December 2025)

**Summary as written**

> 'Study was the largest single reason at ' ~ (study.value | number) ~ ', followed by work at ' ~ (work.value | number) ~ ' and asylum and humanitarian routes at ' ~ (asylumRoute.value | number) ~ '.'

**Note as written**

> 'Work-related immigration fell by 47% from **272,000** [not in the data layer] the previous year, and ONS identifies it as the largest single contributor to the fall in net migration.'

- [ ] Every literal above matches the data
- [ ] Every direction word (rose, fell, peaked, doubled) matches the data

---

## 2. The seven claims against the selection criteria

Foundation 8.5.2. A claim qualifies only if all four hold. The fourth is the one worth being
honest about, and the second short answer below is the test of it.


### Everyone in asylum accommodation arrived recently.

`everyone-in-asylum-accommodation-arrived-recently.md` · direction **restrictionist** · misuse: stock read as flow · reviewed 2026-07-22

> No. The support figure counts everyone being supported on a single day, however long they have been in the system. It is a stock, not a flow.

- [ ] 1. It circulates, and could be shown to
- [ ] 2. The error is statistical, not political
- [ ] 3. Our sources can settle it, and the page says so where they cannot
- [ ] 4. We would apply the same test to the mirror claim
- [ ] The short answer survives being quoted with nothing around it


### Immigrants are a drain on the public finances.

`immigrants-are-a-drain-on-public-finances.md` · direction **restrictionist** · misuse: contested, method-dependent estimate stated as settled fact · reviewed 2026-07-22

> Not established. The same research that fails to show a large benefit also fails to show a large cost, the estimated effect sits within roughly plus or minus 1% of GDP either way.

- [ ] 1. It circulates, and could be shown to
- [ ] 2. The error is statistical, not political
- [ ] 3. Our sources can settle it, and the page says so where they cannot
- [ ] 4. We would apply the same test to the mirror claim
- [ ] The short answer survives being quoted with nothing around it


### Immigrants pay far more in tax than they cost.

`immigrants-pay-far-more-than-they-cost.md` · direction **pro-migration** · misuse: contested, method-dependent estimate stated as settled fact · reviewed 2026-07-22

> Not established. Across studies the net fiscal effect sits within roughly plus or minus 1% of GDP, small in either direction, and heavily dependent on who is being counted and how.

- [ ] 1. It circulates, and could be shown to
- [ ] 2. The error is statistical, not political
- [ ] 3. Our sources can settle it, and the page says so where they cannot
- [ ] 4. We would apply the same test to the mirror claim
- [ ] The short answer survives being quoted with nothing around it


### Most immigration is asylum seekers.

`most-immigration-is-asylum.md` · direction **restrictionist** · misuse: category confusion · reviewed 2026-07-22

> No. Asylum accounted for around 14% of non-EU+ arrivals in the year ending December 2025. Non-EU+ means arrivals from outside the EU, the EEA and Switzerland. Study and work were both larger.

- [ ] 1. It circulates, and could be shown to
- [ ] 2. The error is statistical, not political
- [ ] 3. Our sources can settle it, and the page says so where they cannot
- [ ] 4. We would apply the same test to the mirror claim
- [ ] The short answer survives being quoted with nothing around it


### Net migration is the number of people who entered the UK.

`net-migration-is-arrivals.md` · direction **restrictionist** · misuse: net flow read as gross inflow · reviewed 2026-07-22

> No. Net migration is immigration minus emigration. It is a balance between two much larger numbers, not a count of arrivals.

- [ ] 1. It circulates, and could be shown to
- [ ] 2. The error is statistical, not political
- [ ] 3. Our sources can settle it, and the page says so where they cannot
- [ ] 4. We would apply the same test to the mirror claim
- [ ] The short answer survives being quoted with nothing around it


### 19% of the UK population was born abroad.

`nineteen-per-cent-born-abroad.md` · direction **restrictionist** · misuse: figure presented as official when no official figure exists · reviewed 2026-07-22

> There is no current official figure. ONS discontinued the series in 2022. The last accredited estimate was 16% at the 2021 Census, and the share has risen since.

- [ ] 1. It circulates, and could be shown to
- [ ] 2. The error is statistical, not political
- [ ] 3. Our sources can settle it, and the page says so where they cannot
- [ ] 4. We would apply the same test to the mirror claim
- [ ] The short answer survives being quoted with nothing around it


### Almost all refused asylum seekers are eventually recognised as refugees.

`refused-asylum-seekers-are-eventually-recognised.md` · direction **pro-migration** · misuse: appeal success rate generalised to all refusals · reviewed 2026-07-22

> No. Appeals do change a substantial share of refusals, and the final grant rate is materially higher than the initial one, but it is not close to all of them.

- [ ] 1. It circulates, and could be shown to
- [ ] 2. The error is statistical, not political
- [ ] 3. Our sources can settle it, and the page says so where they cannot
- [ ] 4. We would apply the same test to the mirror claim
- [ ] The short answer survives being quoted with nothing around it


---

## 3. The fourteen unit-qualified warnings

Reported by `validate-content.mjs` on every build, deliberately as warnings rather than
failures, because many metrics share a small value. All fourteen were reviewed on 22 and 23
July and judged coincidences. Confirm, do not suppress.


```
Run: npm run validate, and read the warning block.
```

- [ ] All fourteen re-confirmed as coincidence, or the real ones now cited


---

## 4. What this review does not cover, stated so it is not assumed

- **The 36 published figures against their sources.** Verified in the July 2026 pass, each
  with a quoted sentence or table cell. Not repeated here.
- **Anything the build checks.** Citations resolving, units, dates falling inside their
  period, single-vintage series, catalogued publishers, link and ARIA integrity, and the
  representation floor all fail the build if broken.
- **Accessibility.** pa11y over all 16 pages at WCAG2AA, plus five defects found by hand.
  **No real screen reader has been run**, and that remains outstanding.
- **Whether anyone wants the site.** Five conversations, foundation 14, still not had.

---

## 5. Sign-off

The commitment on `/sources-and-method/` is: "Before this site publishes, a human reviews the
figures and the claims."

- [ ] Section 1 complete, 7 charts
- [ ] Section 2 complete, 7 claims
- [ ] Section 3 complete
- [ ] `last_reviewed` refreshed on every page this review covered

Reviewed by: ____________________  Date: ____________

When this is signed, the second launch blocker is closed. Record it in `CHANGELOG.md` and
update the pre-launch banner in `content/_includes/base.njk`, which currently tells every
reader that this review has not happened.
