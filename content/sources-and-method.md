---
id: sources-and-method
# Published vintages of the year ending December 2024 net migration estimate: what ONS said at
# the time, not what it says now. A first-published number never changes, so no record holds
# one, and citing the live estimate would destroy the sentence, whose point is that it moved.
historical_literals: 431,000; 345,000
title: Sources and method
strapline: >-
  Where every figure on this site comes from, how it is recorded, what it does not show,
  and how to tell when this site is out of date.
last_reviewed: 2026-08-19
review_due: 2027-08-19
figures:
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

It is **not** a source of original statistics. Every figure it starts from was published by
somebody else, and where our figure and theirs differ, theirs is right and ours is a bug.
**Some figures here are worked out from those rather than taken from them**, most often a
share this site calculates because no publisher prints it. Each one is graded `calculated`,
says so where it appears, and shows what was divided by what. That is the only original
arithmetic on the site, and it is labelled rather than hidden inside a number that looks
taken.

It is **not** a live system. Figures are the latest published at the time of the last
update, not a real-time count. There are no live counters on this site, deliberately.

It is **not** neutral about statistical misuse, though it takes no position on what immigration
policy should be. Where a claim misuses a definition, a denominator or a time period, we say
so, and we apply that test in every direction. The [common claims](/common-claims) page says
how claims are chosen.

---

## Where the figures come from {#sources}

Official statistics are the primary source throughout. We use independent research bodies
for context, and for periods official sources no longer cover.

{{> sources-catalogue }}

**On the Migration Observatory and Skills for Care.** These are not official statistics
producers, and figures attributed to them are marked as such. We use them where they add
methodological context, or where they hold the most reliable available figure for something
the official series no longer covers, the foreign-born population being the main example.

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
  else on this site. Pages reference the record, and so do the charts: a bar names the
  record it draws rather than carrying a number of its own. This is why you will not find
  two different figures for the same measure on different pages, a failure common enough on
  data sites to be worth designing against.
- **Prose cites records, it does not restate them.** Where a number appears in a sentence on
  this site, the build inserts it from the record. Updating a figure updates every sentence
  that quotes it, chart summaries included. **One kind of number is written out instead, and it
  is declared rather than tolerated:** a figure that was true when it was published and has
  since been superseded, where the point of the sentence is that it moved. The two earlier net
  migration estimates under *Estimates get revised* are exactly that. A record holds what a
  figure is now, so it cannot hold what a figure used to be; each frozen number is listed in
  its own page's front matter with the reason it is frozen, and the checks refuse an undeclared
  one.
- **Checks enforce these rules**, rather than a person remembering them. A figure missing its
  source, a date that does not fall within the period it claims, a range presented as a single
  number, two versions of the same measure, a chart bar with a number typed into it, or a
  current value written out longhand anywhere in a page will each stop the change being
  published.

### Confidence levels {#confidence}

Every figure is graded. The grades are this site's own judgement about how far a figure can
be relied on, not the publisher's, and one of them, "calculated", exists to mark a figure
this site derived rather than read off a release. The grades mean:

{{> confidence-levels }}

### What the checks do not establish {#limits}

Mostly they are about where a number comes from, not about whether the sentence around it
is right, and the last of these is not about numbers at all. Stated because a check trusted
for more than it does is worse than no check at all:

- **A description of a figure is not checked against the figure.** A chart summary saying a
  series rose when it fell would build cleanly, and so would one that quotes the right number
  against the wrong year. Reading, not tooling, has found the false summaries on this site.
- **Values under 100 are reported for review rather than refused.** Too many measures share
  a small value for a match to mean much, so those are flagged on every build and looked
  at, not blocked.
- **The scan for written-out figures reads one set of forms, not every form.** It sees a
  number in digits, grouped with commas, or followed by the word "million" or "billion". It
  does not see one spaced as "2 200 000", spelled as "two million", abbreviated to "bn", or
  scaled by any other word. **Since 6 August 2026 it reads one front-matter field**, the
  short answer a claim page prints as its answer, which until then was unread and was
  carrying live figures frozen as text on two pages. The rest of the front matter it still
  does not read. The rule above holds for what the scan can see; beyond that it rests on
  editing.
- **A correction made inside an edition can pass unseen.** Where a publisher revises a table
  but keeps the same release under the same address, nothing here re-reads it. One
  publisher's corrections page is watched, and the match is made against the table
  identifiers a record declares, so a note naming a corrected table by its title instead
  does not match. The other publishers this site cites announce corrections somewhere this
  site does not look. **This is the limit most likely to leave a wrong number on a page**
  rather than an unchecked one, and it is why the citation block under each page prints the
  date every source behind it was last read.
- **A figure written into a chart's summary sentence cannot be traced back out of the page.**
  Every other figure here carries the id of its record in the page's own markup. That is how the
  build confirms that the figures a reader meets and the figures this site counts as published
  are the same set, and it is how each page works out the date it prints at its foot. A chart
  summary is composed as a single sentence and then handed to a screen reader as the chart's
  description, so an id cannot be attached to a number inside it without either showing the
  markup to that reader or keeping the same sentence in two versions. Neither is worth doing to
  make a check easier. Those figures are recorded, sourced and evidenced like every other one;
  what is not checked is that they reached the page, and a page whose only figures arrived that
  way would print no line at its foot saying when its figures were last checked.
- **No real screen reader has been run over these pages.** The accessibility checks here are
  an automated audit against WCAG 2.2 AA on every page, plus reading the accessibility tree
  that assistive technology actually consumes. That is not the same as someone listening to a
  page with VoiceOver or NVDA, and it is the gap on this list most likely to matter to a
  reader rather than to an editor.

---

## Caveats that apply across the whole site {#caveats}

These are the traps in UK migration statistics generally, not quirks of this site. They are
the reason two honest sources can appear to contradict each other.

{{> key-caveats }}

The two that catch people most often are worth putting in plain terms.

**People and cases are different counts.** In the year ending June 2026 there were
{{asylum/asylum-applications}} people claiming asylum and
{{asylum/asylum-applications-main-applicants}} main-applicant applications. Both are correct;
they count different things. Dividing one by the other, or comparing a figure on one basis with
a figure on the other, produces answers wrong by roughly a fifth, and the error does not show
unless you check the basis. Every figure on this site states its basis.

**Estimates get revised, sometimes heavily.** Net migration for the year ending December
2024 was first published at 431,000, then about 345,000, and now stands at
{{migration/net-migration-2}}. The estimate changed because ONS brought in new data and
methods, not because the period itself did. When you see a revision, that is usually the
statistics system working rather than failing.

---

## Reference periods do not line up {#periods}

Different measures cover different periods, because different bodies publish on different
cycles, and not every period is a twelve-month window. At the last update:

{caption}The period each family of measures covers at the last update

| Measure | Period |
| --- | --- |
| Asylum, returns, visas, settlement, citizenship | Year ending June 2026 |
| Net migration, immigration, emigration | Year ending December 2025 |
| Asylum support and the first-decision backlog | Point-in-time, 30 June 2026, one date rather than a window |
| Appeals backlog | Point-in-time, 31 March 2026, a different publisher on a different cycle |
| Foreign-born population | 2021/22 Census, with a rolled-forward estimate for mid-2024 |
| Asylum system spending | Financial year 2024-25 |

Comparing a year-ending-June figure with a year-ending-December one and calling the
difference a change is invalid. Where this site puts two figures near each other, it labels
the period on both.

---

## How often this is updated {#updates}

Most of this site is driven by three releases, and the commitment is to update within
**one month** of each of them publishing new figures:

{caption}The three releases this site promises to follow within one month

| Release | How often | Figures here |
| --- | --- | --- |
| Home Office, immigration system statistics | Quarterly | {count:ho-immigration-stats} |
| ONS, long-term international migration | Twice yearly | {count:ons-ltim} |
| Ministry of Justice, tribunals statistics | Quarterly | {count:hmcts-tribunals} |

The other {count-in-words:other-figures} published figures come from
{count-in-words:other-publishers} publishers outside those three cycles.
Some publish annually and some publish when they publish, and none of them carries a
promised update schedule here: the National Audit Office, the Migration Observatory, the
Office for Budget Responsibility, the Independent Chief Inspector of Borders and Immigration,
ONS population estimates, and the Home Office's annual report and accounts. **The count above
is derived and this list is typed, so they are two homes for one fact**: the House of Commons
Library stood here until 6 August 2026 and sources nothing a reader meets, which is what made
the list say seven where the count said six. Those are re-checked when they publish, and no
schedule is promised for them, because a schedule nobody can predict is not a commitment.

One month rather than something tighter because this is one person working unfunded, and a
target that is missed is worse than a slower one that is met. The most recent full cycle took
twenty-seven days.

Every page shows the date it was last reviewed, and every figure on the home page shows the
date it was last checked against its source. If a figure has not been checked within its
source's publishing cycle, this site is late, and you should treat the figures as superseded
rather than assume nothing has changed.

Before anything is published, an automated check ages every figure against its own source's
cycle and reports the ones that are overdue. That runs weekly whether or not anyone is
working on the site.

Updating is deliberate, and part of it is now assisted. A second weekly check watches the
publishers this site cites and opens an issue when one puts out a new edition, or corrects a
table a figure here is read from. It reads publication pages and never touches a figure.

When an update is then made, an assistant may draft it: reading the release, proposing which
records move, and opening a pull request. It cannot publish. Every figure whose value changes
must carry a quotation from the source that contains the new number, and a check refuses the
change if it does not. That catches an invented figure rather than a misread one, which is why
a person still reads the source. Merging is a person's decision, and this site's main branch
refuses a change that has not passed the checks set to block one. Some checks here report
rather than block, and this site's documentation says which.

A whole series goes back to a person on purpose, which covers two of the three regular releases
rather than one, because a series is easier to get subtly wrong than a single value.

There is still no automated pipeline pulling numbers straight onto the site, and no figure
appears here because a model asserted it.

What this has now been through: on 18 and 19 August 2026 the whole path ran against a real
release for the first time. ONS republished the dataset behind two figures in this site's data
layer, the release check reported both as citing a superseded edition, each was re-read against
the source and updated by hand, and the change was reviewed and merged. **One part of it was
not exercised and is worth saying so:** the check was run by hand on the morning of the release
rather than raising its own issue, which it does weekly, so the step where this site is told
rather than goes looking is still proved only in its parts. What that update found, including
what it corrected in its own notes, is in the changelog.

---

## Corrections {#corrections}

A site that corrects other people's use of statistics has to be visibly better than they
are at handling its own mistakes.

- Every change to a published figure is recorded in a public changelog, with the reason and
  the source.
- Where a revision changes the substance of a claim, the claim carries a dated correction
  note at the top of the page. It is not silently edited.
- Where a revision changes a number but not the conclusion, the figure updates and the
  changelog records it.
- Every claim shows when it was last reviewed. A claim unreviewed for twelve months is
  taken down until it has been.

If something here is wrong, please say so. Tell us which figure, and what you think it should
be: [open an issue](https://github.com/LegendT/UK-Migration-Explorer/issues/new). This site
handles corrections in public, so the objection and the answer stay attached to the figure
rather than sitting in somebody's inbox. **That does mean a correction needs a GitHub
account**, which is free but is a step. Until 10 August 2026 this page offered an email address
instead and said a correction should not depend on having an account; the address was
withdrawn, and the condition it existed to avoid now applies. It is a real cost and it is
stated rather than dropped.

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

**Returns and removals.** Covered since 10 August 2026, at [returns](/returns/). This entry
previously said the subject was not covered while the data layer held the figures and two of
them already reached a reader with no page explaining either, which is the same silence as not
holding them. The page does what this entry said covering it would take: it sets out what a
return counts, that the counts are of events rather than people, and why the categories do not
nest, rather than placing a number beside the asylum figures.

**What immigration policy should be.** Never covered. That is a question about values, and
this site has no standing to answer it.

---

## How this site was built {#method}

The figures were assembled in two stages. An initial research pass in June 2026 gathered
figures and sources. A verification pass in July 2026 checked them against primary
publications, quoting the specific sentence or table cell behind each value it covered. Where a
figure has been checked that way, the quotation is recorded in `data/evidence/` and a check refuses a
changed value whose quotation does not contain it. Every figure here now has one. The backfill finished on 6 August 2026, and since then the check
re-reads every quotation on file on every run rather than only the ones a change has touched, so
an entry cannot be written once and never asked about again.

That verification found real errors, which is the point of doing it. One long-run series
had to be rebuilt entirely: it had silently mixed three different vintages of the same ONS
statistic, and one value in it matched no figure ONS had ever published. It was withdrawn
and replaced rather than patched.

**We used AI in producing this site, and it is right that you know that.** It helped with
research, drafting and checking. It is not a substitute for verification, and it is exactly why
the verification rules above exist: every figure requires a fetched source and a quoted value,
anything unverifiable is left out rather than filled in, and the automated checks exist to
catch what review misses. No figure appears here because a model asserted it.

Before this site publishes, a human reviews the figures and the claims. That is a
commitment about the launch process, not a description of the research stage.

---

## Reuse {#reuse}

Most figures here are Crown copyright, published under the Open Government Licence v3.0.

> Contains public sector information licensed under the Open Government Licence v3.0.

That covers the Office for National Statistics, the Home Office, the National Audit Office, the
Office for Budget Responsibility, the Migration Advisory Committee and HM Courts and Tribunals
Service, and the House of Commons Library under the Open Parliament Licence, whose terms are
materially equivalent for this use. **Two publishers here are not Crown copyright**: figures from
the Migration Observatory (University of Oxford) and from Skills for Care are short factual
extracts reproduced with attribution, their own terms apply, and you should check the source
before redistributing those in bulk.

If you reuse them, keep the source and period attached. A figure stripped of its period,
its basis and its source is the raw material for exactly the confusion this site exists to
reduce.

**The site's code and original writing are under the MIT Licence**, which covers the prose on
these pages, the build code, the documentation and the writing carried inside the data files: the
card paragraphs, the notes and the caveats are this project's words rather than the publishers'.
The figures themselves are not covered by it; they are under the paragraphs above. The full text
of both halves is in
[the repository's LICENCE file](https://github.com/LegendT/UK-Migration-Explorer/blob/main/LICENCE).

The underlying data files, including the source of every figure, are public.

They are here, and they are the same files this site builds from rather than an export of them.
Every figure on the site comes from one of these records, and each record carries its own source
URL, publication date, the date we last checked it and its confidence grade.

{{> data-files }}

Each file is served as JSON at the address shown. `data/evidence/` sits alongside them and holds
the quote behind every figure that has one, one file per publisher release, with
[its own README](/data/evidence/README.md) explaining the format.
