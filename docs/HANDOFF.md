# Handoff, 23 July 2026

State of UK Migration Explorer, and what to do next. The 37-defect list closed on 22 July.
The design round and the accessibility round closed on 23 July. What remains before launch
is one piece of work and two decisions.

## Start here

**Both review rounds are done, on branch `design-and-a11y-rounds`, open as PR #12.** CI is
green, which now includes pa11y as a step that fails the build. Four commits:

| Commit | |
| --- | --- |
| `89c039d` | `fix: correct the layout defects the design round found` |
| `dc458f4` | `feat: measure accessibility instead of asserting it` |
| `f449a38` | `fix: correct the defects the refinement round found in the two rounds` |
| `f338375` | `fix: give every control on a page a name that tells it apart` |

**Next, in order.**

| Order | Work | |
| --- | --- | --- |
| 1 | **Merge PR #12** | Then delete `design-and-a11y-rounds` and the merged `audit-fixes`, locally and on the remote. |
| 2 | **The `docs/foundation.md` drift read** | The document still promises things the site does not do. One is known, others are likely. The last piece of work. |
| 3 | **The two decisions below**, then remove `content/robots.txt` and its guard in `scripts/check-build.mjs` | Launch. |

## What blocks launch

Two things, both decisions, both yours.

1. **The update commitment is unsigned.** `content/sources-and-method.md` proposes updating
   within fourteen days of each source release and flags it as a proposal. An unmet
   published target damages trust more than none.
2. **The pre-publication human review has not happened.** The sources page commits to it.
   Publication already has.

The robots guard exists so the site cannot become crawlable by accident. Removing it is
deliberate, and it comes last.

## What the two rounds established

Kept because it records what was verified, and more importantly what was not.

**Design.** Every text pair in both palettes clears AA, computed rather than judged; the
weakest is `--accent` on `--accent-soft` at 7.03:1 light and 6.77:1 dark. The dark scheme,
which nobody had viewed, was sound. The defects were layout, and most had one cause:
`li + li { margin-top: 0.35rem }`, written for prose lists, was landing on grid and flex
children, where a margin is added to the gap rather than replacing it. It put the first
item of every row 5.6px above its neighbours, including the nav, where it meant the
active-page underline sat higher on the home page than on any other. Charts carried
gridlines at 225,000 and 675,000, because the axis top was rounded and then quartered. A
bar near the maximum drew its own value past the end of the scale. Four of the sixteen
tables, all Markdown-authored, were not in a scrolling box at all.

**Accessibility.** pa11y over all 16 pages at WCAG2AA, 0 errors, in CI as a failing step.
That is the floor. Five things were found by hand that pa11y passed:

- **The scrolling regions were not operable by keyboard.** They now carry `tabindex="0"`,
  `role="region"` and a name taken from the page's own text. Verified with dispatched
  arrow keys, not from the markup: at 390px a chart region scrolls 0 to 160 of 177px
  hidden, a table region 0 to 53 of 53.
- **Every chart announced its summary twice.** `aria-labelledby` pointed at both the title
  and the description, so the two concatenated into the accessible name while the
  description was exposed as well.
- **Three charts on a page gave three controls with the same name.** All called "Show the
  figures behind this chart", each opening a different table. That is 2.4.6. Each now
  appends its own chart title in a visually hidden span, so the visible label is unchanged.
- **Two links on the home page shared their text and went to different places.** "What the
  words mean", in the nav to the top of the glossary and in a panel to a single term.
- **A broken ARIA reference was invisible.** An `aria-labelledby` pointing at a missing id
  produces no name while the page renders and every test passes.

Reflow passes at 200% and at 400% (a 320px viewport) on every page, with no sideways page
scroll. Every non-inline target clears 24px and the chart disclosure control is 888x44.
Focus is a 3px accent outline at 7.0:1 or better against every background it lands on, in
both palettes.

**What the rounds did not settle, stated rather than hidden:**

- **Chart text does not scale with a reader's font-size preference.** The axis is
  `font-size: 13px` inside the SVG coordinate system, so it scales with the chart's
  rendered width and with browser zoom, but not with a browser font setting. At the 32rem
  floor it renders at 8.8px. The figures are also in a real table, which is ordinary page
  text and does scale.
- **At 400% zoom a chart is 265px of a 512px drawing**, so about half is reached by
  scrolling inside the region. WCAG 1.4.10 allows this for content needing two-dimensional
  layout, and the region is named and keyboard-scrollable, but the allowance is being used
  rather than avoided.
- **A line chart's series labels still sit in the hidden strip below about 700px.** The box
  shades whichever end has more content. Removing the scroll would mean moving the labels
  out of the SVG into an HTML legend, which is a change to the chart language rather than a
  correction.
- **No real screen reader was run.** Chrome's accessibility tree is the tree assistive
  technology consumes, and it is what was read, but it is not VoiceOver or NVDA reading a
  page aloud.

**Progressive enhancement.** All the JavaScript in this repository is build-time. The built
site contains no `<script>`, no inline handler, no `javascript:` URL and no `.js` file, on
any of the 16 pages. With the stylesheet disabled the pages stay usable: source order is
skip link, notice, header, main, footer; nothing is hidden; nothing scrolls sideways; the
heading structure carries the page. Every CSS feature used has a defined fallback, and the
separator in a claim's meta line is a real character carrying `aria-hidden` rather than
generated content, so it survives a stylesheet that never arrives and is still skipped by a
screen reader.

**The tab order, and why it was left alone.** Making the scrolling regions focusable adds a
tab stop for each. Counting only elements that can actually take focus, which excludes the
chart data tables because a closed `<details>` renders nothing, it is 5 of 33 stops on
`/asylum/` doing nothing at 1100px and 2 at 390px, and 4 of 29 on `/migration/`. The
redundant ones are a desktop phenomenon; at 390px, where the regions are needed, nearly all
of them scroll. Knowing which overflow needs measurement at runtime, so without JavaScript
the options are all focusable or none, and all focusable is the right side to be on: a
region that scrolls and is not focusable is a 2.1.1 barrier, while a region that is
focusable and does not scroll fails no success criterion. Conditional logic would have to
re-evaluate on width, zoom, font size, a user stylesheet under 1.4.12 and rotation, and
being wrong once creates a barrier that does not exist today. The named regions also earn
their place: five landmarks on the asylum page, named for the charts and tables they hold.

## Where things stand

- **Live:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Preview:** https://deploy-preview-12--ukmigrationexplorer.netlify.app
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Branch:** `design-and-a11y-rounds`, PR #12, CI green, not merged. `main` is behind it.
  `audit-fixes` is merged and can be deleted. This project works through PRs even solo.

16 pages build from a governed data layer of 67 metric records, in four theme files, plus
four time series. Earlier handoffs said 167 figures; nothing in `data/` adds up to that on
any reading, so the count above is the one that was checked. Eleventy 3, no client-side
JavaScript, charts rendered as inline SVG at build time. Every page has now been rendered
and looked at, at 390, 500 and 1100px, in both colour schemes.

| Page | |
| --- | --- |
| `/` | Hero, three distinction panels, six headline cards, generated period list |
| `/what-the-words-mean/` | 23 glossary terms, anchored |
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
`geography`, `source_name`, `source_url`, `published_date`, `retrieved_date`, `notes` and
`confidence_level`. Pages cite records; they never restate values.

**Citation syntax differs by file type.** Markdown uses `{{theme/metric-id}}`. Nunjucks uses
`{% figure "theme/metric-id" %}`, because `{{ }}` is Nunjucks' own expression syntax and
would be evaluated as arithmetic, silently producing `NaN`. That shipped once.

**Charts cite records too.** A bar carries `ref`, not `value`, and the shortcode throws on a
literal value or an unknown ref. Where a chart summary needs a figure inside a string, it
reads the record through the `metric` filter:

```njk
{% set granted = "asylum/people-granted-protection-or-other-leave-at-initial-decision" | metric %}
summary: 'Of ' ~ (decisions.value | number) ~ ' people receiving a first decision, ' ~ ...
```

**A token renders the formatted value only.** Units are prose: `%` attaches, `£` prefixes,
`people` follows. The validator checks the author supplied them, in both syntaxes.

**Chart rules** live in `lib/charts.mjs`. Four are enforced in code rather than left to the
author: the y-axis always starts at zero, the gridline interval is chosen from the intervals
people count in rather than by dividing the top into four, every chart carries its figures
as a real table, and no series is distinguished by colour alone.

**Three Eleventy transforms run on the built HTML, and the order is load-bearing.**
`resolve-citations` renders the `{{theme/id}}` tokens and block partials, and throws on
anything unresolved. `heading-anchors` turns `{#id}` syntax into real ids.
`scrollable-regions` then wraps any unwrapped table and gives every scrolling box a
`tabindex`, a role and a name taken from its caption or the heading above it. Run the last
before the second and a heading still carrying its `{#id}` names the region, shipping raw
syntax inside an `aria-label`, where nothing on the page shows it. `check-build` caught
exactly that.

## The checking apparatus, and its limits

Five checks, all in CI, all negative-tested:

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, single-vintage series, `DO NOT PUBLISH` flag fails the build |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value written longhand |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN` in text or attributes, every table inside a focusable named scrolling region, every ARIA reference resolves, no two controls sharing a name, no two links sharing their text while going to different places, robots rule under `User-agent: *` |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |
| `npm run a11y` | pa11y over all 16 URLs at WCAG2AA. Fails the build |

**Read this before trusting a green run.** Six times in this project a checker passed while
a real defect shipped. Every one had the same shape: the check verified a property of the
*source or the declaration* rather than the property a reader depends on, and the success
message claimed the latter. The messages state only what they verify.

**pa11y is a floor, not a verdict, and CI says so.** It was negative-tested before being
believed: an isolated missing `lang` took it to 15/16 and named the rule, a failing contrast
value took it to 0/16. It passed all five of the accessibility defects listed above. The
step's comment in the workflow names what it does not establish, so a green run cannot be
read as though it did.

Known remaining gaps, published on the sources page under *What the checks do not
establish*:

- **Prose about figures is unprotected.** Nothing verifies that a chart summary describes
  the data it sits beside. Four false summaries were found by reading, not by tooling.
- **Single years quoted from a series are read by a person.** A chart's data come from a
  series file, but "45,537 in 2019" inside a summary is not a citation.
- **Sub-100 figures are matched with their unit only** (`39%`, `£4.9`) and reported as
  warnings rather than failures, because many metrics share a value. Ten warnings currently
  surface. All ten were reviewed on 22 July and are coincidences. Review them; do not
  suppress them.

## Working practices that earned their place

- **Look at the built page, and measure the thing you are claiming.** Run `npm run build`,
  serve `_site`, and look. Looking is not enough on its own: the pre-launch banner was
  reported as aligned on the strength of a screenshot and had not moved at all. If the
  claim is "these two edges line up", read the two numbers.
- **Render with a real layout viewport.** Headless Chrome's `--window-size` clamps the
  layout viewport to 500px, so a screenshot at `--window-size=390` is a crop of a 500px
  layout. Driving Chrome over CDP and setting `Emulation.setDeviceMetricsOverride` gives a
  genuine viewport at any width; `Emulation.setEmulatedMedia` with `prefers-color-scheme`
  gives the dark palette. Check `document.documentElement.clientWidth` before believing an
  overflow either way.
- **Read the accessibility tree, not the markup.** Chrome's tree is what assistive
  technology consumes. `Accessibility.getFullAXTree` over CDP showed the duplicated chart
  announcement and the three identically named controls; the markup for both read as
  correct.
- **Count only what can actually take focus.** Elements inside a closed `<details>` are in
  the DOM and are not focusable. Counting selectors rather than focusable elements
  overstated the tab order cost by 60% in this session.
- **Beware a rule that reaches inside a utility class.** `.prelaunch p` outranks `.wrap`, so
  a shorthand `margin: 0` there silently undid the auto-centring `.wrap` was applied for.
  Set the longhand you mean.
- **Negative-test every new check**, and confirm the break actually applied before
  concluding anything. Two "failures" in an earlier session were tests that never fired, and
  one in this session was a search string that did not match.
- **Never `git checkout -- .` to undo a test.** It reverts everything. This cost an hour.
  Snapshot to `/tmp` and restore from there.
- **Do not fix by bulk substitution.** It caused the last round of defects, in prose and in
  CSS alike.
- **Research subagents must quote a fetched URL and verbatim text per figure.** One returned
  eight values that appeared nowhere in its own evidence table. Anything unverifiable comes
  back marked UNVERIFIED and is left out.

## House style

British English. **No em-dashes** anywhere in authored copy; use a comma, colon or full stop.
En-dashes are fine in numeric ranges. This matches the sibling projects and is enforced by
`validate-content.mjs`. No emoji.

## Decisions taken rather than deferred, worth revisiting

Each is cheap to reverse.

From closing the defect list:

1. **The second reader.** The risk register mitigated political capture, the top-rated risk,
   with a two-thirds rule that has been removed and a second reader who does not exist. It
   now records the mitigations that are real and says plainly that nothing replaced either.
   Whether to have a second reader is yours; it is already a launch blocker.
2. **The correction note was built rather than the promise weakened.** Claims accept
   `correction` and `corrected_on`, the layout renders a dated note, and the validator
   refuses one without the other. No claim carries one, and the sources page says so.
3. **"Both" was removed as a claim direction.** One line in `DIRECTIONS` restores it.
4. **Per-page figure check dates were not added.** The promise was reworded to what is true.
   Deriving the oldest `retrieved_date` from each page's declared figures would make the
   stronger version true, except on the home page, which declares none.
5. **The small-boats card lost a line** about 90% of detected unauthorised arrivals, which
   belongs to the year-ending-March record rather than the calendar-2025 card. It is still
   in the record's notes and could be placed on the asylum page.

From the two rounds:

6. **The nav takes its own row under the brand.** It needs 993px in one row against 888px
   available, so no gap or size tweak fits it and shortening a label like "What the words
   mean" is an editorial call. DEBT solves the same problem by grouping items under
   `<details>`, which would change the information architecture. The header is now three
   lines tall on desktop.
7. **The claims index and a claim page deliberately carry different fields.** The index has
   a metadata line, what kind of error and how fresh the check is; the claim page has the
   tag row, misuse type and political direction. Same component in both places invited the
   reading that they should match.
8. **A home page panel link was reworded** from "What the words mean" to "What a visa grant
   counts", because it collided with the nav link of the same text going somewhere else,
   and because its two sibling panels name what you will find rather than the page they
   live on. One line to revert.
9. **Two Markdown tables and the three-queues table still have no caption.** They are
   wrapped and named from the heading above them, which uses text already on the page. A
   caption is new prose and is yours to write. The three-queues table appears on both the
   asylum page and the glossary with a caption on one and not the other.
10. **In `most-immigration-is-asylum`**, two list items open with a bold term and the third
    opens with a bold link, so the third reads as more important than its siblings. Fixing
    it means rewriting the sentence.

## Not covered by any session so far

- **A full read of `docs/foundation.md` for document-versus-site drift.** The risk register
  row for silent staleness still claims the site displays its own lateness and that the
  validator reports figures older than their source's update frequency. Neither exists.
  Others like it are likely. The two corrected on 22 July were found by accident, not by
  reading the document. This is the next piece of work.
- **A real screen reader.** See above.

## After that

1. Settle the two decisions, then remove robots.txt and its guard.
2. Write `docs/UPDATING-DATA.md`, modelled on DEBT's, so the update commitment has a runbook.
3. Eight of the fourteen claims in foundation section 8.5.3 remain undrafted.

## Sibling projects

- `~/Projects/DEBT` is the UK Public Finances Explorer, Eleventy, same data-contract
  philosophy. Its `.pa11yci.json` and the `tabindex`/`role`/`aria-label` pattern on
  scrolling regions were ported here. Two further ideas from it are not taken and are worth
  considering: it groups nav items under `<details>` rather than listing them flat, and it
  scales the root font size (`html { font-size: 106.25% }`) where this project scales
  `body`, which is why `--measure` and the chart's `min-width` are pinned to 16px and do not
  grow with the type scale. Its `docs/UPDATING-DATA.md` is still worth porting.
- `~/Projects/UK Civil Society Explorer` has the `editorial-lint.test.js` that this
  project's language lint was modelled on.

## Prompt for a fresh session

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/HANDOFF.md, starting with "Start here". Then read CLAUDE.md.

TASK: the foundation.md drift read. It is the last piece of work
before launch; everything after it is a decision of mine.

docs/foundation.md is the design document. The site has moved and the
document has not. Read it in full against the built site and produce a
list of every place the document promises, describes or assumes
something the site does not do. One is known: the risk register row for
silent staleness claims the site displays its own lateness and that the
validator reports figures older than their source's update frequency.
Neither exists. Two more were found by accident on 22 July, which is
why the whole document now needs reading rather than sampling.

Branch first; this project works through PRs even solo. If PR #12 is
still open, merge it first, then delete design-and-a11y-rounds and the
merged audit-fixes locally and on the remote.

Report findings before changing anything. For each, quote the sentence
in foundation.md, say what the site actually does, and sort into: the
document is wrong and should be corrected, the site is wrong and should
be fixed, or this needs my judgement about which one moves. Say which
is which. I will tell you what to do.

Ground rules this project learned the hard way:
- A green validator is necessary, never sufficient. Six times a checker
  passed while a real defect shipped, each time because it verified the
  source or the declaration rather than the artefact a reader depends
  on. pa11y passed all five accessibility defects found by hand.
- Verify the artefact, and measure the thing you are claiming. Looking
  at a screenshot is not measuring. A banner was reported as aligned on
  the strength of one and had not moved at all.
- Negative-test every check you add, and confirm the break actually
  applied before concluding anything.
- Headless Chrome clamps --window-size to a 500px layout viewport. Use
  CDP Emulation.setDeviceMetricsOverride for a real one, and check
  document.documentElement.clientWidth before believing an overflow.
- No em-dashes, ever. Enforced by validate-content.mjs.
- Never `git checkout -- .` to undo a test. It reverts everything.
  Snapshot to /tmp instead.
- Do not fix by bulk substitution. That is what caused an earlier round
  of defects, in prose and in CSS alike.

Stop and ask about anything that needs an editorial judgement rather
than a correction. The document is the record of intent, so a
disagreement between it and the site is not automatically the
document's fault.
```
