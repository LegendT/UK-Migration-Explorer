# Handoff, 23 July 2026

State of UK Migration Explorer, and how it works. **Outstanding work is not in this document.**
It is in `docs/BACKLOG.md`, which is the durable list, because a handoff gets rewritten every
session and a rewrite is where work quietly falls out. This document carries the things that
stay true between sessions: how the project works, what checks it, what has been decided, and
what earlier sessions cost.

`validate-content.mjs` fails the build if this document stops pointing at `docs/BACKLOG.md`,
or if a planning document exists that the backlog does not reference.

## Start here

1. Read `docs/BACKLOG.md`. It has one blocking item, four scoped pieces of work and a list of
   gaps carried deliberately.
2. Read the rest of this document, for how the project works and what not to repeat.
3. Read the scope document for whatever you pick up. Do not re-derive it.

**One thing blocks launch, and it is the owner's to do**: the pre-publication human review.
Everything else is unblocked and none of it should delay launch.

The update commitment was signed on 23 July 2026 at one month per cadenced release, which
closed the other blocker.

## Where things stand

- **Live:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Branch:** `main`, current with origin, CI green. Start work on a new branch; this project
  works through PRs even solo.
- **Housekeeping:** five merged branches still exist locally and on the remote and can be
  deleted: `audit-fixes`, `handoff-rounds`, `handoff-after-rounds`, `costs-page` and
  `design-and-a11y-rounds`. The last reports as unmerged because it carries one stray commit
  whose `lib/charts.mjs` change is already on `main`; nothing is lost.

16 pages build from a governed data layer of **67 metric records** in four theme files, plus
**four time series carrying 100 dated points**. `validate-data.mjs` counts both and reports
167. **36 of those records reach a reader.** Eleventy 3, no client-side JavaScript, charts
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

One thing blocks launch and it is mine, not yours: the pre-publication
human review. docs/PRE-PUBLICATION-REVIEW.md holds the evidence for it.
Do not attempt it, and do not treat it as done. Everything else in the
backlog is unblocked.

TASK: take the next unstarted item from docs/BACKLOG.md, unless I have
told you otherwise in this message. If nothing else is specified, start
with item 4, part 3: the four figures held twice, as a headline metric
and as a series point, with nothing reconciling them. It is the smallest
piece of real work that guards against publishing two different official
values for the same measure, which is the failure foundation 9.4
describes and dashboard.json was restructured to prevent.

Before you start, tell me which item you are taking and what you expect
to change. If it is larger than a session, say so and propose a split.

When you finish an item, move it to Completed in docs/BACKLOG.md with a
date. Do not delete it. validate-content.mjs fails the build if a
planning document in docs/ is not referenced from the backlog, or if the
handoff stops pointing at it, so the list cannot quietly lose things.

Rules that bite on every item here:

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
