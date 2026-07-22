---
id: sources-and-method
title: Sources and method
strapline: >-
  Where every figure on this site comes from, how it is recorded, what it does not show,
  and how to tell when this site is out of date.
last_reviewed: 2026-07-22
review_due: 2027-07-22
figures:
  - migration/net-migration
  - asylum/asylum-applications
  - asylum/asylum-applications-main-applicants
  - migration/net-migration-2
layout: base.njk
permalink: /sources-and-method/
---

This page exists so that nothing on this site has to be taken on trust. Every figure is
traceable to a named publication with a date, and the rules below describe what we do with
those figures and what we refuse to do with them.

If you find an error, we want to know. See [corrections](#corrections).

---

## What this site is, and is not {#what-this-is}

It is an explainer. It takes official statistics that are already published and tries to
make them readable without making them wrong.

It is **not** a source of original data. Every number here was published by somebody else,
and where our figure and theirs differ, theirs is right and ours is a bug.

It is **not** a live system. Figures are the latest published at the time of the last
update, not a real-time count. There are no live counters on this site, deliberately.

It is **not** neutral about statistical misuse, though it takes no position on what
immigration policy should be. Where a claim misuses a definition, a denominator or a
time period, we say so — and we apply that test in every direction. How claims are chosen
is set out on the [common claims](/common-claims) page.

---

## Where the figures come from {#sources}

Official statistics are the primary source throughout. Independent research bodies are used
for context and for periods official sources no longer cover.

{{> sources-catalogue }}

**On the Migration Observatory and Skills for Care.** These are not official statistics
producers, and figures attributed to them are marked as such. They are used where they add
methodological context, or where they hold the most reliable available figure for something
the official series no longer covers — the foreign-born population being the main example.

**On the Office for Statistics Regulation.** No figure on this site comes from OSR. Its
guidance informs how we present and caveat the figures that do.

---

## How every figure is recorded {#data-contract}

Figures on this site are not loose numbers typed into sentences. Each one is a record
carrying its own provenance, and the site is built from those records.

Every figure carries: what it counts, its value and unit, the **end date of the period it
covers**, a human-readable period label, its geography, the publishing body and
publication title, a link to the source, the publication date, the date we last checked it,
notes on what it does and does not show, and a confidence level.

Three consequences worth stating plainly:

- **A figure exists in one place only.** Nothing on this site copies a value from somewhere
  else on this site. Pages reference the record. This is why you will not find two
  different figures for the same measure on different pages — a failure common enough on
  data sites to be worth designing against.
- **Prose cites records, it does not restate them.** Where a number appears in a sentence
  on this site, it is inserted from the record when the page is built. Updating a figure
  updates every sentence that quotes it.
- **The rules are enforced automatically**, not by remembering them. A figure missing its
  source, a date that does not fall within the period it claims, a range presented as a
  single number, or two versions of the same measure will all stop the site being built.

### Confidence levels {#confidence}

Every figure is graded. The grades mean:

{{> confidence-levels }}

---

## Caveats that apply across the whole site {#caveats}

These are the traps in UK migration statistics generally, not quirks of this site. They are
the reason two honest sources can appear to contradict each other.

{{> key-caveats }}

The two that catch people most often are worth putting in plain terms.

**People and cases are different counts.** In the year ending March 2026 there were
{{asylum/asylum-applications}} people claiming asylum and
{{asylum/asylum-applications-main-applicants}} main-applicant applications. Both are
correct; they count different things. Dividing one by the other, or comparing a figure on
one basis with a figure on the other, produces answers wrong by twenty per cent or more,
invisibly. Every figure on this site states its basis.

**Estimates get revised, sometimes heavily.** Net migration for the year ending December
2024 was first published at 431,000, then about 345,000, and now stands at
{{migration/net-migration-2}}. Nobody's movements changed; the estimate did. When you see a
revision, that is usually the statistics system working rather than failing.

---

## Reference periods do not line up {#periods}

Different measures cover different twelve-month windows, because different bodies publish on
different cycles. At the last update:

| Measure | Period |
| --- | --- |
| Asylum, returns, visas, settlement, citizenship | Year ending March 2026 |
| Net migration, immigration, emigration | Year ending December 2025 |
| Asylum support, backlogs, appeals | Point-in-time, 31 March 2026 |
| Foreign-born population | 2021/22 Census |

Comparing a year-ending-March figure with a year-ending-December one and calling the
difference a change is invalid. Where this site puts two figures near each other, it labels
the period on both.

---

## How often this is updated {#updates}

> **This section needs the site owner's sign-off before publication.** The commitment below
> is a proposal, not yet a promise. Publishing a target that is not met is worse than
> publishing none.

The proposed commitment is to update within **fourteen days** of a source publishing new
figures, for the Home Office quarterly release and the ONS migration release, which between
them drive most of the site. Other sources follow as their material changes.

Every page shows when its figures were last checked. If that date is older than the
schedule implies, this site is late, and you should treat the figures as superseded rather
than assume nothing has changed.

Updating is manual and deliberate. There is no automated pipeline pulling numbers straight
onto the site, because an automated update that publishes an error is worse than a slow one
that does not.

---

## Corrections {#corrections}

A site that corrects other people's use of statistics has to be visibly better than they
are at handling its own mistakes.

- Every change to a published figure is recorded in a public changelog, with the reason and
  the source.
- Where a revision changes the substance of a claim, the claim carries a dated correction
  note. It is not silently edited.
- Where a revision changes a number but not the conclusion, the figure updates and the
  changelog records it.
- Every claim shows when it was last reviewed. A claim unreviewed for twelve months is
  taken down until it has been.

If something here is wrong, please say so. Tell us which figure, and what you think it
should be.

---

## What this site does not cover {#not-covered}

Stating this openly, because silence about scope is indistinguishable from bias.

**Crime and migration.** Not covered. The statistics are genuinely difficult: nationality
is recorded inconsistently across the criminal justice system, the right denominator is
contested because migrant and non-migrant populations differ in age and sex profile, and
the honest answer to most versions of the question is that the published data cannot settle
it. We would rather say that than publish a number we cannot stand behind.

**Local authority figures.** Not yet covered. Local data needs per-capita denominators and
careful handling, and doing it badly produces something closer to a targeting tool than an
explainer.

**What immigration policy should be.** Never covered. That is a question about values, and
this site has no standing to answer it.

---

## How this site was built {#method}

The figures were assembled in two stages. An initial research pass in June 2026 gathered
figures and sources. A verification pass in July 2026 checked them against primary
publications, quoting the specific sentence or table cell behind each value.

That verification found real errors, which is the point of doing it. One long-run series
had to be rebuilt entirely: it had silently mixed three different vintages of the same ONS
statistic, and one value in it matched no figure ONS had ever published. It was withdrawn
and replaced rather than patched.

**AI was used in producing this site, and it is right that you know that.** AI assistance
was used for research, drafting and checking. It is not a substitute for verification, and
it is exactly why the verification rules above exist: every figure requires a fetched
source and a quoted value, anything unverifiable is left out rather than filled in, and the
automated checks exist to catch what review misses. No figure appears here because a model
asserted it.

Before this site publishes, a human reviews the figures and the claims. That is a
commitment about the launch process, not a description of the research stage.

---

## Reuse {#reuse}

Most figures here are Crown copyright, published under the Open Government Licence v3.0.

> Contains public sector information licensed under the Open Government Licence v3.0.

If you reuse them, keep the source and period attached. A figure stripped of its period,
its basis and its source is the raw material for exactly the confusion this site exists to
reduce.

The site's code and original writing are openly licensed, and the underlying data files —
including the source of every figure — are public.
