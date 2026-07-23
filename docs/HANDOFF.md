# Handoff, 23 July 2026

State of UK Migration Explorer, and what to do next. The 37-defect list was closed and
merged on 22 July. What remains before launch is two review rounds and two decisions.

## Start here

**The 37 defects are fixed and on `main`.** PR #10 merged as `b749008`. `npm test` and
`npm run build` pass on the merge commit. The five commits that closed the list:

| Commit | |
| --- | --- |
| `a6463e5` | `feat: let charts cite the data layer instead of carrying values` |
| `5ed34cf` | `fix: correct false and degraded copy across the pages` |
| `b0759b8` | `fix: correct data notes and the risk register` |
| `5b3975d` | `feat: check what the sources page claims is checked` |
| `3377e7d` | `docs: rewrite the handoff for a closed defect list` |

**Next, in order. The first two are rounds of review, not lists of known defects.**

| Order | Work | Why in this order |
| --- | --- | --- |
| ~~1~~ | ~~The design and UX round~~ | **Done, 23 July.** See "Rounds 1 and 2 are done" below. |
| ~~2~~ | ~~The accessibility round~~ | **Done, 23 July.** pa11y is in CI and fails the build. |
| 1 | **The `docs/foundation.md` drift read** | The document still promises things the site does not do. One is known, others are likely. |
| 2 | **The two decisions**, then remove `content/robots.txt` and its guard in `scripts/check-build.mjs` | Launch. |

## What blocks launch

Two things now, both decisions. The two pieces of work are done.

1. **The update commitment is unsigned.** `content/sources-and-method.md` proposes updating
   within fourteen days of each source release and flags it as a proposal. An unmet
   published target damages trust more than none. **Decision.**
2. **The pre-publication human review has not happened.** The sources page commits to it.
   Publication already has. **Decision.**

~~3. The design and UX round.~~ Done, 23 July, commit `89c039d`.
~~4. The accessibility round.~~ Done, 23 July.

The robots guard exists so the site cannot become crawlable by accident. Removing it is
deliberate, and it comes last.

## Rounds 1 and 2 are done. What they found, and what they did not settle

Both rounds ran on 23 July. The sections below are kept as written, because they say what
was looked for; this section says what was found.

**Round 1.** Every text pair in both palettes clears AA, computed rather than judged:
the weakest is `--accent` on `--accent-soft` at 7.03:1 light and 6.77:1 dark. The dark
scheme, which nobody had viewed, was sound. The defects were layout, and most of them had
one cause: `li + li { margin-top: 0.35rem }`, written for prose lists, was landing on grid
and flex children, where a margin adds to the gap instead of replacing it. It put the
first item of every row 5.6px above its neighbours, including the nav, where the
active-page underline sat higher on the home page than on any other. Charts had gridlines
at 225,000 and 675,000 because the axis top was rounded and then quartered. A bar near the
maximum drew its own value past the end of the scale. Four of the sixteen tables, all
Markdown-authored, were not in a scrolling box at all. See commit `89c039d`.

**Round 2.** pa11y over all 16 pages, 0 errors, and it is in CI as a failing step. That is
the floor, not the finding. Three things were found by hand that pa11y passed:

- **The scrolling regions were not operable by keyboard.** They now carry `tabindex="0"`,
  `role="region"` and a name taken from the page's own text. Verified with dispatched
  arrow keys, not by reading the markup: at 390px a chart region scrolls 0 to 160 of
  177px hidden, a table region 0 to 53 of 53.
- **Every chart announced its summary twice.** `aria-labelledby` pointed at both the title
  and the description, so the two concatenated into the accessible name while the
  description stayed on as well. Read out of Chrome's accessibility tree, which is the
  tree assistive technology consumes. The markup looked correct.
- **A broken ARIA reference was invisible.** `check-build.mjs` now fails when
  `aria-labelledby` or `aria-describedby` points at an id that is not on the page.

Reflow passes at 200% and at 400% (a 320px viewport), on every page, with no sideways page
scroll. Every non-inline target clears 24px and the chart disclosure control is 888x44.
Focus is a 3px accent outline at 7.0:1 or better against every background it lands on, in
both palettes.

**What Round 2 did not settle, stated rather than hidden:**

- **Chart text does not scale with a reader's font-size preference.** The axis is
  `font-size: 13px` inside the SVG coordinate system, so it scales with the chart's
  rendered width and with browser zoom, but not with a browser font setting. At the 32rem
  floor it renders at 8.8px. The figures are also in a real table, which is ordinary page
  text and does scale.
- **At 400% zoom a chart is 265px of a 512px drawing**, so roughly half is reached by
  scrolling inside the region. WCAG 1.4.10 allows this for content needing
  two-dimensional layout, and the region is now named and keyboard-scrollable, but the
  allowance is being used rather than avoided.
- **A line chart's series labels still sit in the hidden strip below about 700px.** The
  box now shades the end that has more content, and the labels are what the "never
  distinguished by colour alone" rule depends on. Removing the scroll entirely would mean
  moving the labels out of the SVG into an HTML legend. That is a change to the chart
  language, not a correction, so it was left.
- **No real screen reader was run.** Chrome's accessibility tree is what AT consumes, but
  it is not VoiceOver or NVDA reading a page aloud.

**Progressive enhancement, checked because the rounds added code.** All of it is
build-time. The built site contains no `<script>`, no inline handler, no `javascript:` URL
and no `.js` file, on any of the 16 pages; the 1,482 lines of JavaScript in the repository
are Eleventy config, the chart generator and the validators, and none of it reaches a
browser. The no-JavaScript property the README and foundation 12 claim is intact.

With the stylesheet disabled the pages stay usable: source order is skip link, notice,
header, main, footer; no element is hidden; nothing scrolls sideways; the heading structure
carries the page. Every CSS feature used has a defined fallback, and the separator in a
claim's meta line is a real character carrying `aria-hidden` rather than generated content,
so it survives a stylesheet that never arrives and is still skipped by a screen reader.

**The tab order, examined properly.** Round 2 made the scrolling regions focusable, which
adds a tab stop for each. Counting only elements that can actually receive focus, which
excludes the chart data tables because a closed `<details>` renders nothing:

| Page | Focusable regions | Of those, doing nothing at 1100px | at 390px |
| --- | --- | --- | --- |
| `/asylum/` | 5 of 33 stops | 5 | 2 |
| `/migration/` | 4 of 29 stops | 4 | 1 |
| `/costs/` | 2 of 23 stops | 2 | 0 |
| `/sources-and-method/` | 2 of 33 stops | 2 | 1 |

So it is two to five redundant stops per page, at desktop widths only; at 390px, where the
regions are needed, nearly all of them do scroll. Knowing which ones overflow needs
measurement at runtime, so without JavaScript the options are all focusable or none.

**All focusable is the right side to be on, and it should stay.** The failure modes are not
symmetric: a region that scrolls and is not focusable is a 2.1.1 failure, a real barrier; a
region that is focusable and does not scroll is an inefficiency that fails no success
criterion. Conditional logic would have to re-evaluate on viewport width, browser zoom,
font size, a user stylesheet under 1.4.12 and rotation, and being wrong at any moment
creates a barrier that does not exist today. The named regions also earn their place: they
give a screen reader user five landmarks on the asylum page to jump between, named for the
charts and tables they hold.

**What was actually wrong with the asylum tab order** was not the count. Three charts gave
three disclosure controls all called "Show the figures behind this chart", each opening a
different table, so anyone moving between them by keyboard, or listing the page's controls,
had nothing to tell them apart. That is 2.4.6, and pa11y passes it: it can see that a
control has a name, not that the name distinguishes it. Each control now appends its own
chart title out of sight, so the visible label is unchanged. `check-build.mjs` fails on any
two controls that share a name, and on any two links that share their text while going to
different places, which found a second one: the home page had "What the words mean" twice,
in the nav going to the top of the glossary and in a panel going to a single term.

**Two matters of editorial judgement were left open, deliberately:**

1. **The four Markdown tables still have no caption.** They are now wrapped and named from
   the heading above them, which uses text already on the page. A caption is new prose and
   is yours to write. The same applies to the three-queues table, which appears on both the
   asylum page and the glossary with a caption on one and not the other.
2. **In `most-immigration-is-asylum`**, two list items open with a bold term and the third
   opens with a bold link, so the third reads as more important than its siblings. Fixing
   it means rewriting the sentence.

## Round 1: design and UX

**Contrast, repetition, alignment, proximity.** The site was built to a data contract and
checked for truthfulness. Its layout has never been reviewed as layout.

**This round cannot be done from the source.** Build, serve `_site`, and look at each page
at the widths readers use. A rendered page is the only evidence; a CSS file is not.

Nine of the 16 pages have never been opened in a browser: the glossary, the style guide,
about, and six of the seven claim pages. Only the drain claim was seen, and only because a
CSS fix touched it.

Where to start looking, from what was noticed while doing other work:

- **Contrast.** The palette is in `content/assets/style.css`. Only two ratios are stated in
  comments, both for `--accent` on `--paper`. Unchecked: `--ink-soft` on `--panel`, which is
  every card's supporting text and every table caption; the chart text, where `.axis` is
  13px, `.break-label` 11px and `.bar-value` 14px; and the whole dark palette under
  `prefers-color-scheme: dark`, which no one has ever viewed. Compute the ratios rather than
  judging them by eye.
- **Repetition.** Three chart pages each end a chart with a note, a data table and a source
  line, and the claim pages repeat a card, a tag row and a set of section headings. Check
  they are one pattern rather than three near-variants. The panels on the home page and the
  costs page are the same component doing two jobs.
- **Alignment.** The costs table nests two levels with `.nested` and `.nested-2` padding,
  the amount column is right-aligned by class, and the bar chart puts right-aligned labels
  against left-aligned values. The home page cards mix a large figure, a period line and a
  source block, none of which share a baseline.
- **Proximity.** The chart note currently sits between the chart and the data table that
  explains it. Card meta lines run source, date and grade together. The prelaunch banner sits
  above the header rather than with the content it qualifies.

**A warning that cost time.** Headless Chrome on this machine clamps the layout viewport to
500px, so a screenshot taken at `--window-size=390` is a 390px crop of a 500px layout, and
the overflow it appears to show is not real. Check
`document.documentElement.clientWidth` before believing a narrow rendering. Render at 500px
and at 1100px, and use a real phone or device emulation for anything narrower.

## Round 2: accessibility

**Verified by tooling, then by hand.** WCAG 2.2 AA is the standard. Accessibility here has
been designed for and reasoned about, and never once measured.

Port the sibling project's setup, which adds no permanent dependency. `~/Projects/DEBT`
carries `.pa11yci.json` and these scripts:

```json
"a11y": "npx --yes pa11y --standard WCAG2AA http://localhost:8080",
"a11y:all": "npm run build && npx --yes start-server-and-test a11y:serve http://127.0.0.1:8081 a11y:ci",
"a11y:serve": "npx --yes http-server _site -p 8081 -s -c-1",
"a11y:ci": "npx --yes pa11y-ci"
```

Its `.pa11yci.json` sets `standard: WCAG2AA`, a 30s timeout, a 1s wait and
`--no-sandbox`, then lists every URL. Copy the shape and list all 16 of this site's pages.

What tooling will not catch, and this site specifically needs checked by hand:

- **The `.scroll-x` regions.** Every table and every chart sits in a horizontally scrolling
  container. A scrollable region must be reachable and operable by keyboard, which usually
  means `tabindex="0"` and an accessible name. This is a probable real failure and it repeats
  across the site.
- **The charts.** Each is `role="img"` with `aria-labelledby` pointing at a title and a
  description, and each carries its figures in a `<details>` table. Check what a screen
  reader actually announces, and that the `<details>` summary is a sensible control.
- **Zoom to 200% and 400%**, which is where the 32rem minimum width on `.chart-svg` will be
  felt.
- **Focus visibility** against both palettes, and 44px targets, which the chart `<details>`
  summary was written to meet.
- **The dark palette**, which no one has viewed at all.

Once it runs, add it to CI beside the four existing scripts. An accessibility check that
lives only in someone's shell is the same category of promise as the ones this project has
spent two sessions correcting.

## Where things stand

- **Live:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Branch:** `main`, current with origin. `audit-fixes` is merged and can be deleted.
  Start the next round on a new branch; this project works through PRs even solo.

16 pages build from a governed data layer of 167 figures. Eleventy 3, no client-side
JavaScript, charts rendered as inline SVG at build time. The last column is whether anyone
has looked at the built page.

| Page | | Seen |
| --- | --- | --- |
| `/` | Hero, three distinction panels, six headline cards, generated period list | yes |
| `/what-the-words-mean/` | 23 glossary terms, anchored | **no** |
| `/migration/` | 3 charts, ONS vs Home Office table | yes |
| `/asylum/` | 3 charts, stage table, three-queues table | yes |
| `/costs/` | Audited spending only, nested table, per-night chart | yes |
| `/common-claims/` | Index plus 7 claim checks, split generated from the collection | yes |
| `/sources-and-method/` | Catalogue, contract, limits, caveats, corrections, scope | yes |
| `/style-guide/` | Precision rules vs value judgements | **no** |
| `/about/` | Owner, funding, what the site is not | **no** |
| 7 claim pages | One layout, seven documents | **1 of 7** |

## How the project works

**One figure, one home.** Every published figure is a record in `data/` carrying `id`,
`metric_name`, `value`, `unit`, `date` (period END, never publication date), `period_label`,
`geography`, `source_name`, `source_url`, `published_date`, `retrieved_date`, `notes` and
`confidence_level`. Pages cite records; they never restate values.

**Citation syntax differs by file type.** Markdown uses `{{theme/metric-id}}`. Nunjucks uses
`{% figure "theme/metric-id" %}`, because `{{ }}` is Nunjucks' own expression syntax and
would be evaluated as arithmetic, silently producing `NaN`. That shipped once.

**Charts cite records too, since 22 July.** A bar carries `ref`, not `value`, and the
shortcode throws on a literal value or an unknown ref. Where a chart summary needs a figure
inside a string, it reads the record through the `metric` filter:

```njk
{% set granted = "asylum/people-granted-protection-or-other-leave-at-initial-decision" | metric %}
summary: 'Of ' ~ (decisions.value | number) ~ ' people receiving a first decision, ' ~ ...
```

**A token renders the formatted value only.** Units are prose: `%` attaches, `£` prefixes,
`people` follows. The validator checks the author supplied them, in both syntaxes.

**Chart rules** live in `lib/charts.mjs`. Three are enforced in code rather than left to the
author: the y-axis always starts at zero, every chart carries its figures as a real table,
and no series is distinguished by colour alone.

## The checking apparatus, and its limits

Four scripts, all in CI, all negative-tested:

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, single-vintage series, `DO NOT PUBLISH` flag fails the build |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value written longhand |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN` in text or attributes, every table inside a focusable named scrolling region, every ARIA reference resolves, robots rule under `User-agent: *` |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |
| `npm run a11y` | pa11y over all 16 URLs at WCAG2AA. Fails the build. Negative-tested: an isolated missing `lang` took it to 15/16 and named the rule; a failing contrast value took it to 0/16 |

**Read this before trusting a green run.** Six times in this project a checker passed while
a real defect shipped. Every one had the same shape: the check verified a property of the
*source or the declaration* rather than the property a reader depends on, and the success
message claimed the latter. The messages state only what they verify.

What changed while the defect list was closed:

- **Chart configs are no longer exempt.** `checkLiterals` stripped every `{% %}` tag before
  scanning, which took the chart configs with them, and the chart configs were the one place
  live figures were still typed by hand. It now strips citations only.
- **An editorial lint** enforces the language rules in foundation 5.2, exempting quoted text
  so the site can go on quoting its sources verbatim. It carries its own controls, run every
  build, so a scanner that stopped matching cannot report a clean site.
- **`review_due`, `mirror_of` and `correction`** are validated. `mirror_of` recorded a
  direction nothing could resolve; it now names a claim that must name it back.

Known remaining gaps, stated rather than hidden, and published on the sources page under
*What the checks do not establish*:

- **Prose about figures is unprotected.** Nothing verifies that a chart summary describes
  the data it sits beside. Four false summaries were found by reading, not by tooling.
- **Single years quoted from a series are read by a person.** A chart's data come from a
  series file, but "45,537 in 2019" inside a summary is not a citation.
- **Sub-100 figures are matched with their unit only** (`39%`, `£4.9`) and reported as
  warnings rather than failures, because many metrics share a value. Ten warnings currently
  surface, one more than before because chart configs are now scanned. All ten were reviewed
  on 22 July and are coincidences. Review them; do not suppress them.

## Working practices that earned their place

- **Look at the built page.** Run `npm run build`, serve `_site`, and look. Note that
  headless Chrome on this machine clamps the layout viewport to 500px, so a screenshot taken
  at `--window-size=390` is a crop of a 500px layout, not a mobile rendering. Check
  `document.documentElement.clientWidth` before believing an overflow.
- **Negative-test every new check**, and confirm the break actually applied before concluding
  the check is broken. Two "failures" in an earlier session were tests that never fired.
- **Never `git checkout -- .` to undo a test.** It reverts everything. This cost an hour.
  Snapshot to `/tmp` and restore from there.
- **Research subagents must quote a fetched URL and verbatim text per figure.** One returned
  eight values that appeared nowhere in its own evidence table. Anything unverifiable comes
  back marked UNVERIFIED and is left out.

## House style

British English. **No em-dashes** anywhere in authored copy; use a comma, colon or full stop.
En-dashes are fine in numeric ranges. This matches the sibling projects and is enforced by
`validate-content.mjs`. No emoji.

## Decisions taken closing the defect list, worth revisiting

Five judgement calls were made rather than deferred. Each is cheap to reverse.

1. **The second reader.** The risk register mitigated political capture, the top-rated risk,
   with a two-thirds rule that has been removed and a second reader who does not exist. It
   now records the mitigations that are real (published selection criteria, the CI-enforced
   representation floor, the disclosed split, the style guide's separation of precision from
   values) and says plainly that nothing replaced either. Whether to have a second reader is
   yours; it is already a launch blocker.
2. **The correction note was built rather than the promise weakened.** Claims accept
   `correction` and `corrected_on`, the layout renders a dated note, and the validator
   refuses one without the other. No claim carries one, and the sources page says so.
3. **"Both" was removed as a claim direction.** It was described on the style guide and
   applied to nothing. One line in `DIRECTIONS` restores it.
4. **Per-page figure check dates were not added.** The sources page promised every page shows
   when its figures were last checked; pages show `last_reviewed`. The promise was reworded
   to what is true. Deriving the oldest `retrieved_date` from each page's declared figures
   would make the stronger version true, except on the home page, which declares none.
5. **The small-boats card lost a line.** "Around 90% of all detected unauthorised arrivals
   come by small boat" belongs to the year-ending-March record, not the calendar-2025 card it
   sat on. It is still in the record's notes and could be placed on the asylum page.

## Three defects found that no audit listed

The em-dash sweep had also joined three CSS selector lists, leaving selectors that matched
nothing:

- `.brand a:hover.brand a:focus-visible`
- `.claim > p.claim > h2.claim > h3...`, so claim prose ran the full card width instead of
  the reading measure, on every claim page
- `.chart-note.chart-source`, so chart notes had no measure, colour or spacing

All three are fixed. The lesson is the same one the audit drew about prose, and it extends
to any comma-separated list: a bulk substitution is not a mechanical operation. If a rule
like this is applied again, replace dash by dash with the line in view.

## Not covered by any session so far

- **Design and UX as design and UX.** Round 1 above. Nothing has ever been reviewed for
  contrast, repetition, alignment or proximity, and nine pages have not been looked at.
- **Accessibility measured rather than reasoned about.** Round 2 above.
- **A full read of `docs/foundation.md` for document-versus-site drift.** The risk register
  row for silent staleness still claims the site displays its own lateness and that the
  validator reports figures older than their source's update frequency. Neither exists.
  Others like it are likely. The two corrected on 22 July were found by accident, not by
  reading the document.

## After the rounds

1. Settle the two decisions, then remove robots.txt and its guard.
2. Write `docs/UPDATING-DATA.md`, modelled on DEBT's, so the update commitment has a runbook.
3. Eight of the fourteen claims in foundation section 8.5.3 remain undrafted.
4. Delete the merged `audit-fixes` branch, locally and on the remote.

## Sibling projects

- `~/Projects/DEBT` is the UK Public Finances Explorer, Eleventy, same data-contract
  philosophy. Its `.pa11yci.json` and `docs/UPDATING-DATA.md` are worth porting.
- `~/Projects/UK Civil Society Explorer` has the `editorial-lint.test.js` that this
  project's language lint was modelled on. Its quoted-source problem is the same, and its
  positive and precision controls are worth keeping in mind if the term list grows.

## Prompt for a fresh session

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/HANDOFF.md, starting with "Start here". It gives the work
order. Then read CLAUDE.md.

TASK: the two rounds that block launch, in this order. Branch first;
this project works through PRs even solo.

ROUND 1, design and UX: contrast, repetition, alignment, proximity.
There is no defect list for this. You produce it. Build the site,
serve _site, and look at all 16 pages at 500px and at 1100px. Nine
have never been opened in a browser: the glossary, the style guide,
about, and six of the seven claim pages. The handoff section "Round 1"
lists where to start looking and the palette values nobody has
checked, including the entire dark scheme.

Report findings before changing anything. Sort them into what is
broken, what is inconsistent, and what is a matter of taste, and say
which is which. I will tell you what to fix.

ROUND 2, accessibility: WCAG 2.2 AA, measured. Port the pa11y setup
from ~/Projects/DEBT, which needs no permanent dependency, run it
against all 16 pages, and fix what it finds. Then the things it
cannot see: the .scroll-x containers wrapping every table and chart
almost certainly fail keyboard operability, the charts need checking
with a screen reader, and 200% and 400% zoom will strain the 32rem
minimum width on the chart SVG. Add it to CI when it passes.

Ground rules this project learned the hard way:
- Design has no green checkmark. Verify by rendering the real page
  and looking at it, never by reading the CSS.
- Headless Chrome here clamps the layout viewport to 500px, so a
  screenshot at --window-size=390 is a crop of a 500px layout, not a
  mobile rendering. Check document.documentElement.clientWidth
  before believing an overflow. This cost half an hour.
- No em-dashes, ever. Enforced by validate-content.mjs.
- Never `git checkout -- .` to undo a test. It reverts everything.
  Snapshot to /tmp instead.
- A green validator is necessary, never sufficient. Six times a
  checker passed while a real defect shipped, each time because it
  verified the source rather than the artefact.
- Negative-test every check you add, and confirm the break actually
  applied before concluding the check is broken.
- Do not fix by bulk substitution. That is what caused the last
  round of defects, in prose and in CSS alike.

Stop and ask about anything that needs an editorial judgement
rather than a correction.
```
