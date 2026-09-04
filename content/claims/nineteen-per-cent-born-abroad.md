---
id: nineteen-per-cent-born-abroad
claim: 19% of the UK population was born abroad.
short_answer: >-
  Roughly right now, but not as an exact, current, official figure. ONS's
  provisional mid-2024 estimate is close to it, but that estimate is an official
  statistic in development, ONS publishes no percentage of its own, and there is
  no 2026 count. The figures, and what each one rests on, are on this page.
direction: restrictionist
error_type: provisional estimate treated as an exact, current, official figure
correction: >-
  This page previously said no official foreign-born figure existed after the
  2021/22 Census. In May 2026 ONS published a provisional rolled-forward mid-2024
  estimate, so the check is now about precision and recency, not whether any
  figure exists.
corrected_on: 2026-07-27
last_reviewed: 2026-07-27
review_due: 2027-07-27
# 10.6 million is declared rather than recorded, decided 2 August 2026, and the reason is the
# opposite of the usual one: a record is a figure this site publishes, and this page exists to
# tell readers NOT to use this one. It comes from a separate ONS ad hoc release built on the
# Annual Population Survey, on a different population base, and it does not reconcile with the
# mid-2024 estimate. The number stays in the sentence because a reader who meets it elsewhere
# needs to recognise it; recording it would have put it in the published count beside the figure
# it contradicts. Same shape as "£8 million a day" on /costs/: a circulating number a page names
# in order to warn about it. If ONS publishes another ad hoc estimate, this sentence is rewritten
# rather than the declaration updated.
historical_literals: 10.6 million
figures:
  - population/foreign-born-share-mid-2024
  - population/foreign-born-population-mid-2024
  - population/total-uk-population
  - population/foreign-born-share-of-total-uk-population
  - population/foreign-born-population-of-the-uk
layout: claim.njk
permalink: /common-claims/nineteen-per-cent-born-abroad/
order: 5
suppressPageHeader: true
period: Mid-2024 (provisional ONS estimate)
source: Office for National Statistics
---

## What the data says

The most recent estimate of the foreign-born share is ONS's provisional figure for mid-2024:
{{population/foreign-born-population-mid-2024}} people born outside the UK, or
{{population/foreign-born-share-mid-2024}}% of the population, nearly one in five. So "roughly 19%"
is a fair description of the number itself.

Two things about that figure matter as much as its size. It is an **official statistic in
development** and provisional, which means ONS expects to revise it. And ONS publishes no
percentage at all: the {{population/foreign-born-share-mid-2024}}% is calculated by dividing the
{{population/foreign-born-population-mid-2024}} estimate by the accredited mid-2024 UK population
of {{population/total-uk-population}}. The percentage is ours, not ONS's, and both figures it is
taken from are on this page so anyone can repeat the division.

The last census-based figure is older: {{population/foreign-born-share-of-total-uk-population}}%
at the 2021/22 Census, or {{population/foreign-born-population-of-the-uk}} people. The mid-2024
estimate rolls that census baseline forward with deaths and migration.

There is no figure for 2025 or 2026. ONS has not produced a June 2025 estimate because the 2025
deaths data it needs are not yet available.

## Why the claim needs care, even though the number is about right

The "19%" figure circulates widely, usually as a settled current fact. The problem
with it is no longer that it is too high or invented. It is that it is presented as a precise,
current, official measurement when it is none of those three.

- It is **not precise**: a provisional statistic in development carries real uncertainty, and the
  percentage is a calculation ONS does not itself publish.
- It is **not current**: it describes mid-2024, not 2026, and the share has probably moved since.
- It is **not accredited**: and nor is the
  {{population/foreign-born-share-of-total-uk-population}}% from the 2021/22 Census, because no
  UK-wide foreign-born figure is. ONS accredits the England and Wales and Northern Ireland
  statistics in its census-based UK release and states that the UK ones have "just Official
  Statistics status, without accreditation".

So "about 19% in mid-2024, on a provisional ONS estimate" is a defensible statement. "19% of the
UK population is foreign-born," offered as a settled official fact, claims a precision and an
authority the figure does not have.

## Why there was a gap, and how ONS filled it

ONS discontinued its annual country-of-birth population series in October 2022, because it relied
on the Labour Force Survey, which has had known sample-size and response-rate problems since 2020.
For a time there was no later official estimate at all. ONS has since introduced a rolled-forward
method, taking the 2021/22 Census as a
baseline and updating it with deaths and migration, and used it to produce the mid-2024 estimate
published in May 2026.

One caution. A separate ONS ad hoc release, based on the Annual Population Survey, gives a much
lower foreign-born total of about 10.6 million against a different population base. It does not
reconcile with the mid-2024 population estimate. Do not use it for this figure.

## Better questions to ask

- Is this an accredited statistic, an official statistic still in development, or neither?
- What date does it describe? The latest estimate is for mid-2024, not now.
- Does ONS publish the percentage, or is it calculated from two separate figures?
- Does it count [people born abroad](/what-the-words-mean/#foreign-born), or [people without
  British citizenship](/what-the-words-mean/#foreign-national)? They are different groups and
  different numbers.

## Source notes

ONS, Long-term international migration (provisional), year ending December 2025, published 21 May
2026, which carries the mid-2024 non-UK-born estimate. The share is calculated by this project:
{{population/foreign-born-population-mid-2024}} divided by the accredited mid-2024 UK population of
{{population/total-uk-population}} (ONS mid-year population estimate) is
{{population/foreign-born-share-mid-2024}}%. ONS publishes no such percentage.

The 2021/22 Census baseline (Census 2021 for England, Wales and Northern Ireland; Census 2022 for
Scotland) gives the {{population/foreign-born-share-of-total-uk-population}}% and
{{population/foreign-born-population-of-the-uk}} figures, neither of which is accredited at UK
level.

Foreign-born and foreign-citizen are distinct measures. A person born abroad may hold British
citizenship; a person born in the UK may not. Figures for the two are not interchangeable, and the
non-British citizenship share is lower than the foreign-born share. Foreign-born population is a
[stock](/what-the-words-mean/#flow-and-stock), not a measure of current immigration.
