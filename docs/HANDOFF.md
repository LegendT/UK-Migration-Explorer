# Handoff, 28 July 2026

State of UK Migration Explorer, and how it works. **Outstanding work is not in this document.**
It is in `docs/BACKLOG.md`, which is the durable list, because a handoff gets rewritten every
session and a rewrite is where work quietly falls out. This document carries the things that
stay true between sessions: how the project works, what checks it, what has been decided, and
what earlier sessions cost.

`validate-content.mjs` fails the build if this document stops pointing at `docs/BACKLOG.md`,
or if a planning document exists that the backlog does not reference.

## Start here

1. Read `docs/BACKLOG.md`. The launch blocker is item 1: the pre-publication review, whose
   findings became corrections 1a to 1i. **All nine have landed.** What remains of item 1 is
   three closing steps that are the owner's, not a session's. Then the scoped-but-unblocked
   items, then a list of gaps carried deliberately.
2. Read the rest of this document, for how the project works and what not to repeat.
3. Read the scope, or `verification.txt`, for whatever you pick up. Do not re-derive it.

**The pre-publication review was conducted on 27 July 2026, and its corrections all landed by
28 July 2026.** The review itself is in `verification.txt` at the repository root. Its outcome
was a corrections list rather than an approval, and several claim pages had been "do not publish
as written".

**The corrections landing is not the review passing.** Someone still has to decide the pages now
pass, and then do the three things the backlog gates: settle `last_reviewed`, drop the pre-launch
banner from `content/_includes/base.njk`, and record the review as passed in `CHANGELOG.md`. The
`last_reviewed` one is not cosmetic. The practice diverged while the corrections were landing, so
three claim pages currently show a review date after their corrections and four show one before,
and the claims index puts that in front of readers. Then, last, remove the robots rule. That is
launch.

The update commitment was signed on 23 July 2026 at one month per cadenced release, which
closed the other original blocker.

## Where things stand

- **Live:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Branch:** `main`, current with origin, CI green. Start work on a new branch; this project
  works through PRs even solo.
Deliberately not recorded here: which branches exist, what CI last did, what is on the remote.
That is operational state, it is discoverable in seconds, and a previous version of this
section was wrong within the hour because branches were tidied after it was written.

16 pages build from a governed data layer of **69 metric records** in four theme files, plus
**four time series carrying 100 dated points**. `validate-data.mjs` counts both and reports
169. **A subset of those records reach a reader.** Eleventy 3, no client-side JavaScript, charts
rendered as inline SVG at build time.

| Page | |
| --- | --- |
| `/` | Hero, three distinction panels, eight headline cards, generated period list, three claim previews |
| `/what-the-words-mean/` | 23 glossary terms in five groups, anchored |
| `/migration/` | 3 charts, ONS vs Home Office table |
| `/asylum/` | 3 charts, stage table, three-queues table |
| `/costs/` | Audited spending only, nested table, per-night chart |
| `/common-claims/` | Index plus 7 claim checks, split generated from the collection |
| `/sources-and-method/` | Catalogue, contract, limits, caveats, corrections, scope |
| `/style-guide/` | Precision rules vs value judgements |
| `/about/` | Owner, funding, what the site is not |
| 7 claim pages | One layout, seven documents |

## How the project works

**One figure, one home.** Every published figure is a record in `data/` carrying `id`,
`metric_name`, `value`, `unit`, `date` (period END, never publication date), `period_label`,
`geography`, `source_name`, `source_id`, `source_url`, `published_date`, `retrieved_date`,
`notes` and `confidence_level`. Pages cite records; they never restate values.

**Citation syntax differs by file type.** Markdown uses `{{theme/metric-id}}`. Nunjucks uses
`{% figure "theme/metric-id" %}`, because `{{ }}` is Nunjucks' own expression syntax and would
be evaluated as arithmetic, silently producing `NaN`. That shipped once.

**Prose inside `data/` cites the same way.** A token in a data-file string resolves, because
`resolve-citations` runs on the built HTML after Nunjucks and after the partials expand. The
card paragraphs in `dashboard.json` and the caveats in `meta.json` are held to the same rule as
a content page. A data file has no front matter, so a deliberately frozen figure is declared in
a sibling `historical_literals` key.

**Series points are the exception, and it is a known gap.** Chart data comes from the four
series files, but a value from a series typed into a chart summary is not a citation and
nothing checks it. Nine such values exist. Scoped in `docs/SERIES-CITATIONS.md`.

**Charts cite records too.** A bar carries `ref`, not `value`, and the shortcode throws on a
literal value or an unknown ref.

**A token renders the formatted value only.** Units are prose: `%` attaches, `£` prefixes,
`people` follows. The validator checks the author supplied them, in both syntaxes.

**Chart rules** live in `lib/charts.mjs`. Four are enforced in code rather than left to the
author: the y-axis always starts at zero, the gridline interval is chosen from the intervals
people count in rather than by dividing the top into four, every chart carries its figures as a
real table, and no series is distinguished by colour alone.

**Three Eleventy transforms run on the built HTML, and the order is load-bearing.**
`resolve-citations` renders the tokens and block partials, and throws on anything unresolved.
`heading-anchors` turns `{#id}` syntax into real ids. `scrollable-regions` then wraps any
unwrapped table and gives every scrolling box a `tabindex`, a role and a name taken from its
caption or the heading above it. Run the last before the second and a heading still carrying
its `{#id}` names the region, shipping raw syntax inside an `aria-label`, where nothing on the
page shows it. `check-build` caught exactly that.

## The checking apparatus, and its limits

Five checks, all in CI, all negative-tested.

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, every figure linked to its catalogue entry, single-vintage series, figures overdue against their source's cycle, `DO NOT PUBLISH` flag fails the build |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value written longhand in content or in the `data/` prose that reaches a page, outstanding work tracked in the backlog |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN`, every table inside a focusable named scrolling region, every ARIA reference resolves, no two controls sharing a name, no two links sharing their text while going to different places, no link text that names nothing, robots rule under `User-agent: *` |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |
| `npm run a11y` | pa11y over all 16 URLs at WCAG2AA. Fails the build |

CI also runs a **weekly cron**, because the time-based rules, the twelve-month claim expiry and
link rot, only fire if something runs.

**Read this before trusting a green run.** Seven times in this project a checker passed while a
real defect shipped. Every one had the same shape: the check verified a property of the *source
or the declaration* rather than the property a reader depends on, and the success message
claimed the latter. The seventh was the literal check walking `content/` and not `data/`, which
left the one file whose entire job is holding references as the only file nobody scanned for
values. The messages now state only what they verify.

**pa11y is a floor, not a verdict, and CI says so.** It was negative-tested before being
believed: an isolated missing `lang` took it to 15/16 and named the rule, a failing contrast
value took it to 0/16. It passed all five of the accessibility defects found by hand.

The known gaps in coverage are published on the sources page under *What the checks do not
establish*, and listed in `docs/BACKLOG.md`.

## Working practices that earned their place

- **Look at the built page, and measure the thing you are claiming.** Run `npm run build`,
  serve `_site`, and look. Looking is not enough on its own: the pre-launch banner was reported
  as aligned on the strength of a screenshot and had not moved at all. If the claim is "these
  two edges line up", read the two numbers.
- **Render with a real layout viewport.** Headless Chrome's `--window-size` clamps the layout
  viewport to 500px, so a screenshot at `--window-size=390` is a crop of a 500px layout.
  Driving Chrome over CDP and setting `Emulation.setDeviceMetricsOverride` gives a genuine
  viewport at any width; `Emulation.setEmulatedMedia` with `prefers-color-scheme` gives the dark
  palette. Check `document.documentElement.clientWidth` before believing an overflow either way.
- **Start Chrome once and attach to it; do not spawn one per screenshot.** A script that
  launched a fresh headless Chrome per capture worked twice and then failed for the rest of the
  session, because each spawn raced the previous instance for its `--user-data-dir`. It looks
  like the CDP approach is broken when it is only the process management. Start one instance on
  a known port, connect to `/json/list`, and reuse it.
- **Read the accessibility tree, not the markup.** Chrome's tree is what assistive technology
  consumes. `Accessibility.getFullAXTree` over CDP showed the duplicated chart announcement and
  the three identically named controls; the markup for both read as correct.
- **Test the mechanism before recommending it.** A scope recommended a Nunjucks filter for
  citing series points without checking that a filter works inside a concatenated summary
  string, which was the one thing that could have sunk the approach. It does, but that was
  established afterwards.
- **Never truncate the thing you are checking for absence.** A finding that three claim cards
  were missing `period` and `source` was wrong: the check piped each front matter through
  `head -20` and those fields sit below the cut. Reporting a defect that does not exist costs
  more than missing one, because it makes every other finding worth re-checking.
- **Find things the way that can show you are wrong.** Four figures held twice were found by
  matching equal values, which by construction can only find pairs that already agree. Whether
  anything had already drifted needed a different query, and "they all agree" was not evidence
  until that query was run.
- **A denylist needs a review pass, not a sweep.** Four of seven sub-100 matches were
  coincidences. Tokenising all of them would have cited the wrong record four times.
- **A stored "all reviewed" note is a declaration, not a check, and it ages.** The README
  recorded the fourteen sub-100 warnings as reviewed and all coincidences. Checking each
  again in context found three that were not: the refused-asylum grant and appeal rates and
  the born-abroad Census share were live metric values restated longhand beside the very
  tokens that already cited them, one release from contradicting themselves. Re-derive the
  per-item property; do not trust a summary of it, least of all one that says everything is
  fine.
- **A verification subagent scoped to one figure catches the ones next to it.** Every changed
  or new figure in the review corrections was checked by a subagent required to quote a fetched
  source per value. Three times that pass overturned something the human review had asserted: a
  second ONS 2024 foreign-born figure of about 10.6 million on a different population base, which
  would not reconcile; the OBR migrant contribution and its "age 80" endpoint, which OBR does not
  print or state; and the NAO report the costs chart cited, which does not carry the per-night
  unit costs at all. Confirming the figure you asked about is not the whole job, and you do not
  merge over what the check reveals beside it.
- **Count only what can actually take focus.** Elements inside a closed `<details>` are in the
  DOM and are not focusable. Counting selectors rather than focusable elements overstated the
  tab order cost by 60%.
- **Beware a rule that reaches inside a utility class.** `.prelaunch p` outranks `.wrap`, so a
  shorthand `margin: 0` there silently undid the auto-centring `.wrap` was applied for. Set the
  longhand you mean.
- **Negative-test every new check**, and confirm the break actually applied before concluding
  anything. Two "failures" in an earlier session were tests that never fired, and one was a
  search string that did not match.
- **Never `git checkout -- .` to undo a test.** It reverts everything. This cost an hour.
  Snapshot to a scratch directory and restore from there, and chain the restore with `;` rather
  than `&&`, because a failing `grep` in the middle will otherwise skip it.
- **Do not fix by bulk substitution.** It caused an earlier round of defects, in prose and in
  CSS alike. Sentence by sentence, in view.
- **Research subagents must quote a fetched URL and verbatim text per figure.** One returned
  eight values that appeared nowhere in its own evidence table. Anything unverifiable comes back
  marked UNVERIFIED and is left out.
- **Scoping is not progress.** Four scope documents were written in one session while the site
  did not change. Each was defensible; together they were a way of feeling productive without
  shipping. Prefer building the smallest real thing.
- **Open the primary table, not the summary page.** Three figures in the review corrections did
  not exist on any HTML bulletin: the 5,931 administrative outcomes, the cohort grant rates, and
  the asylum-specific appeal figures. Worse, two site figures looked *wrong* against the bulletin
  and were right: it prints 39% allowed and 61 weeks for the whole immigration chamber, while
  tables FIA_3 and T_3 give 40% and 67 weeks for asylum and protection. Believing the bulletin
  would have introduced two errors while "correcting" them. The `.ods` and `.xlsx` files are zip
  archives; unzip and parse the sheet XML directly.
- **Reconcile a derived figure against published ones before writing it.** The 5,931 was summed
  from a pivot over four quarters. The same four quarters reproduce the published 79,719 refusals,
  16,901 withdrawals and 48,581 grants, and the grand total 151,132 equals the decisions total plus
  both excluded categories. That is what establishes the basis and period, not the figure alone.
- **Read the site's own published policy before adopting a reviewer's recommendation.** The
  review asked for attributable circulation examples. The style guide says, on a live page, that
  this site does not attribute claims to named people and accepts the "nobody actually says that"
  rebuttal as the cost. The review's finding *is* that rebuttal. A good example had already been
  found and would have contradicted two published pages. An external reviewer does not know what
  the site has promised its readers.
- **A defect named on one page usually has siblings.** The invalid cohort comparison was in three
  places, only one of which the review names, and one of those was a record's `notes`, where it
  would have instructed the next editor to reintroduce it. The support-versus-accommodation
  conflation was in two. Grep the reasoning, not just the sentence.
- **A validator rule can close an option without anyone noticing.** Dropping claim 2.7 looked
  available and is not: pro-migration claims sit exactly on the enforced floor of two. Check the
  constraint before offering a choice, not after it is made.
- **On a mixed list, do every [me] part first and batch the [you] decisions.** Corrections 1d to
  1i interleave mechanical and editorial work. Asking per item would have meant five
  interruptions, and several of the editorial calls turned out to depend on findings from the
  mechanical work: 2.7's short answer could only be written once the cohort correction had
  established what was still true. Do the sourced work, let it inform the questions, then ask
  once. The exception is a decision that would make the mechanical work wasted if it went the
  other way; ask that one early.
- **Check `main` has not moved before rewriting this file or the backlog.** A PR was merged
  mid-session here, so a branch cut an hour earlier carried a superseded handoff, and editing it
  would have reverted the owner's own merged work. The edit tool caught it by reporting the file
  had changed on disk. Rebase before writing the durable documents, not after.

## House style

British English. **No em-dashes** anywhere in authored copy; use a comma, colon or full stop.
En-dashes are fine in numeric ranges. This matches the sibling projects and is enforced by
`validate-content.mjs`, which scans `content/`, `docs/`, `scripts/`, `lib/`, `data/`,
`.github/`, and the root markdown files. No emoji.

## Decisions taken rather than deferred, worth revisiting

Each is cheap to reverse.

1. **The update commitment is one month per cadenced release**, signed 23 July 2026, covering
   the Home Office quarterly, ONS twice-yearly and Ministry of Justice quarterly releases.
   Irregular publishers carry no promised schedule. Tightening it later is a one-line change;
   missing it is not.
2. **The second reader.** The register mitigated political capture, the top risk, with a
   two-thirds rule that has been removed and a second reader who does not exist. It now records
   what is real and says plainly that nothing replaced either. Whether to have one is the
   owner's call.
3. **The MVP cap counts source releases, not figures.** Four releases, currently three.
4. **No share image.** The claim card already carries period, source and date, and a screenshot
   of it is what people share.
5. **No abandonment notice.** A static site cannot publish a notice saying it has stopped being
   published. The twelve-month claim expiry plus the weekly cron is the real mechanism.
6. **The staleness check reports rather than fails.** A build that broke because a quarterly
   release landed would be switched off inside a month.
7. **"Both" was removed as a claim direction.** Two rows of the 8.5.3 table are marked
   "(shared)" and assigned to the side whose version circulates more. Those two assignments are
   a starting position, not a finding.
8. **The correction note was built rather than the promise weakened.** Claims accept
   `correction` and `corrected_on`, the layout renders a dated note, and the validator refuses
   one without the other. No claim carries one, and the sources page says so.
9. **Two Markdown tables and the three-queues table still have no caption.** They are wrapped
   and named from the heading above them. A caption is new prose and is the owner's to write.
10. **In `most-immigration-is-asylum`**, two list items open with a bold term and the third with
    a bold link, so the third reads as more important. Fixing it means rewriting the sentence.
11. **The small-boats card lost a line** about 90% of detected unauthorised arrivals, which
    belongs to the year-ending-March record rather than the calendar-2025 card. It is still in
    the record's notes and could be placed on the asylum page.

## Sibling projects

- `~/Projects/DEBT` is the UK Public Finances Explorer, Eleventy, same data-contract
  philosophy. Its `.pa11yci.json` and the `tabindex`/`role`/`aria-label` pattern on scrolling
  regions were ported here. Two further ideas from it are not taken and are worth considering:
  it groups nav items under `<details>` rather than listing them flat, and it scales the root
  font size (`html { font-size: 106.25% }`) where this project scales `body`, which is why
  `--measure` and the chart's `min-width` are pinned to 16px and do not grow with the type
  scale. Its `docs/UPDATING-DATA.md` is still worth porting.
- `~/Projects/UK Civil Society Explorer` has the `editorial-lint.test.js` that this project's
  language lint was modelled on.

## Prompt for a fresh session

Deliberately not tied to one task, so it does not go stale as items are completed.

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/BACKLOG.md first. It is the durable list of outstanding work.
Then read docs/HANDOFF.md for how the project works and what earlier
sessions cost. Then read the scope document for whatever you pick up,
and do not re-derive it.

This project has no CLAUDE.md of its own. Your global instructions at
~/.claude/CLAUDE.md load automatically.

The pre-publication review has been done and all of its corrections,
1a to 1i under backlog item 1, have landed. verification.txt at the repo
root is the review itself. Work is tagged [me] or [you]: [me] is a
factual or mechanical correction you make against a cited source; [you]
is an editorial or sourcing call that is mine. Do the [me] parts; for a
[you] part, propose and ask.

Still mine, not yours, and not a session's work: the three closing steps
that are what is left of item 1, including the last_reviewed decision;
talking to five target users and choosing the success measures, both
under "Unmet acceptance criteria"; and removing the robots rule, which
comes last and is launch. Do not treat any of those as done.

TASK: take the first unstarted item in docs/BACKLOG.md, unless I have
told you otherwise in this message. It is in recommended order,
maintained there, so this prompt names no task and does not go stale as
items finish.

Before you start, tell me which item you are taking and what you expect
to change. If it is larger than a session, say so and propose a split.

When you finish an item, mark it done in docs/BACKLOG.md with its PR and a
date. Do not delete it. validate-content.mjs fails the build if a
planning document in docs/ is not referenced from the backlog, or if the
handoff stops pointing at it, so the list cannot quietly lose things.

Rules that bite on every item here:

- Every changed or new figure needs a fetched source and a verbatim quote
  before it is written. A verification subagent made to quote its sources
  overturned the human review three times: a foreign-born figure on the
  wrong population base, an OBR number and endpoint age OBR never states,
  and a costs source that did not carry the figures at all. Confirming the
  figure you asked about is not the whole job.
- Anything you add must pass, and run these rather than assume:
  npm run validate, npm run build, npm run a11y.
- Negative-test every new check, and confirm the break actually applied
  before believing the result. Two "failures" in an earlier session were
  tests that never fired.
- State what a check does NOT establish in its own success message.
  Seven times a checker here passed while a real defect shipped, every
  time because it verified the source or the declaration rather than the
  property a reader depends on.
- No em-dashes, ever. Enforced by validate-content.mjs.
- Do not fix by bulk substitution. Sentence by sentence, in view.
- Never truncate the thing you are checking for absence, and prefer the
  query that could show you are wrong over the one that confirms you.
- Scoping is not progress. Four scope documents were written in one
  session while the site did not change. Build the smallest real thing.

Branch first; this project works through PRs even solo.

Stop and ask about anything that needs an editorial judgement rather
than a correction.
```
