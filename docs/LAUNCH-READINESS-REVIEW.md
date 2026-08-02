# Launch readiness review, 2 August 2026

The whole-project critique run as the last push before launch. This document is the findings
record and the reasoning; **it carries no work state**. What is outstanding from it, and in
what order, is in `docs/BACKLOG.md` under *From the launch readiness review*, which is the one
list. When everything under that heading is closed, this document describes a review that
passed; until then it describes the distance.

## What ran

Seven review dimensions ran in parallel over the whole repository, each by an independent
reviewer, and **every finding was then adversarially verified by a second independent pass**
told to refute it: to open the file, reproduce the defect, and check the backlog and the
decision records before confirming. Findings that could not be reproduced, were already
tracked, or contradicted a documented decision were discarded. The dimensions: the checking
scripts, the build code, the data layer, content against the data it cites, the durable
documents, accessibility of the built site, and a hostile expert reading of the built pages.

Alongside them, a far-end traceability trace fetched the live source behind each of the eight
home page figures and searched the fetched text for the value, on the no-fabrication rule:
VERIFIED only with a verbatim quote containing the figure. This is the check whose absence let
the hotel figure name a report that does not contain it, from the first research pass until
1 August 2026, run in the direction none of the automated checks can: from the source back to
the site.

A separate visual pass rendered the built pages in a real browser at 390px and 1280px, light
and dark, and measured what the screenshots suggested rather than trusting either.

All seven checks were run before anything changed and again after: `npm test`,
`npm run validate`, `npm run build`, `npm run a11y` (17 of 17), `npm run check-evidence`,
and the two network checks by hand, `check-sources` and `check-releases`.

## What the trace established

**All eight home page figures are in their cited sources, verbatim.** Net migration 171,000;
asylum claims 93,525; awaiting a first decision 48,758; asylum support 97,519; small boat
arrivals 41,472; the 16% born-abroad share; the £4.9 billion asylum system estimate; and
236,512 citizenship grants. Each carries a fetched quote containing the value. The trace also
reproduced the small boats calendar-year total independently from the row-level dataset, and
reproduced the published 2022 peak by the same method as a control.

Three observations came back beside the verifications, recorded in the backlog for the owner:
the small boats record is graded `official` and its notes say "finalised calendar-year total"
while the publisher prints the year only as four quarterly cells that must be summed; two
figures in the citizenship card's prose (269,178 and 312,063) are not on the page the record
cites; and the NAO's own landing page prints £4.0 billion, its direct-support figure, while
the £4.9 billion the site cites is inside the PDF, so a reader who follows the link and does
not open the report meets a different number.

## What the review found

Forty-seven findings came back; the adversarial pass refuted three and confirmed forty-four:
two blockers, seventeen serious, twenty-five minor. The full evidence per finding is in the
session record, not restated here; the shapes worth naming:

- **The two blockers were both reader-facing.** Every y-axis label on the line charts was
  clipped at the chart's left edge, and the clipped remainders read as different, plausible,
  wrong numbers: 1,500,000 rendered as "500,000" on a site whose subject is people misreading
  numbers. The width estimate had been calibrated against 13px text before the chart text was
  raised to 17px. And the "audited" label that pre-publication correction 1b retired for the
  NAO's £4.9 billion estimate survived in four reader-facing places, directly contradicting
  the two corrected claim pages beside them.

- **Three owner-approved corrections had unapplied siblings.** Correction 1i retired the
  "nobody's movements changed" reasoning from one page and it survived on three others; the
  PR #72 cohort correction fixed the record and both pages still attributed this site's own
  inference to the Home Office; correction 1b's fiscal reframing had not reached the `data/`
  prose that renders to the sources page. This is the project's known shape, a fix landing at
  its named site and going stale one reference away, found again by a fresh read.

- **The checking apparatus had the project's signature defect inside it.** Nothing tied a
  record's `source_url` to its `source_id`: each was checked against the catalogue alone, so a
  record pairing one publisher's id with another publisher's URL passed, and the release watch
  would have filed it under the wrong publisher. All 75 records were consistent on the day the
  check was added, which is when to add a check. In the same family: the theme-file list was
  defined identically in seven files with only one of them enforced, external links in page
  prose were checked by nobody while the build log pointed at the script that did not check
  them, and the `number` filter rendered null as an invisible blank.

- **The print stylesheet's chart-table rule did not work in Chrome.** Chrome hides a closed
  details element's contents through an internal slot that child display rules cannot reach,
  and the site's own rule then hid the summary too, so a printed page lost the figures and the
  control that names them. The known limit "the print rules have not been checked in a real
  print preview" was doing more work than it appeared to.

- **The refuted findings earned their refutations.** One claimed a chart shortcode accepts
  literal values that the validator in fact refuses at error level; one claimed a wrapper
  variant ships unnamed regions when the far-end check catches exactly that; one asked for an
  OBR condition the fetched source does not state, which the review of 27 July had already
  established. The verification pass exists because plausible findings are not all real.

## What was fixed, and what was not

The mechanical half is applied in the PR that carries this document: the chart margins are
measured from the text and the estimator carries its calibration warning, the retired labels
and reasoning are gone from every surviving site, the appeal rate carries its basis and
quarter, the three tribunals records are graded as the publisher flags them, the source tie
and the file-freshness check are in the validator and negative-tested in both directions, the
theme-file list has one home, prose links are collected by the link check, the print rule uses
the supported pseudo-element and falls back to showing the summary, and the documents that
had drifted from the code agree with it again.

Every editorial and sourcing call is left, tagged **[you]** in the backlog, on the same
principle as both prior reviews: the mechanical work informs the editorial question and must
not take the decision. The largest of them: whether the costs page may present the hotel
figure inside the NAO total when the record says the nesting is this site's own construction,
whether the born-abroad card's `official` grade survives its Migration Observatory sourcing,
whether the returns records stay unpublished while the scope statement does not name the
omission, and what a claim page's h1 should say to a screen reader given that it is, by
design, a false sentence.

## The path to launch

The gates are the backlog's to order, and it names them at the top. In substance they are
unchanged by this review: the two glossary rewrites, recording the review as passed, then the
robots rule. This review adds no gate; it adds the **[you]** list above, none of which blocks
launch on the project's own definition, and each of which is cheaper to take before the site
has readers. The one this reviewer would take first is the returns scope silence, because it
is the only one a hostile reader can frame as concealment rather than imprecision.

What this review did not do: it did not read a page aloud with a real screen reader, which
remains the published limit it was before; it did not backfill evidence for the records
predating the evidence contract, which is backlog A1 and several sessions; and it verified
eight figures at the far end, not 46, so traceability for the rest stands exactly where the
audit left it.
