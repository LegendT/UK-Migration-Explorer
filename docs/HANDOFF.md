# Handoff, 23 July 2026

State of UK Migration Explorer, and what to do next. The 37-defect list closed on 22 July.
The design round, the accessibility round and the foundation drift read all closed on
23 July.

**Every review that was on the list is done.** Two reviews were never on it and are still
outstanding: a real screen reader, and asking anyone outside this project whether they want
it. Both are in "Not covered by any session so far", and the second is a process criterion in
foundation section 17.

## Start here

**The drift read is merged.** PR #14 merged as `b05c1fe`, and the documentation refresh as
`6ee9095`. CI is green on `main`, including pa11y as a step that fails the build.

It was the last review on the list, and it turned into more than a document correction: three
classes of live defect in the site, and four new mechanical checks. Both are itemised below.

**What happens next, and what is waiting on what.**

| | Work | Blocked by |
| --- | --- | --- |
| **Launch path** | The two decisions below | Nothing. Only you can take them. |
| | Then remove `content/robots.txt` and its guard in `scripts/check-build.mjs` | The decisions. Deliberate, and it comes last. |
| **Everything else** | The release notifier and the evidence check, phases 1 and 2 of `docs/UPDATE-AUTOMATION.md` | Nothing. Both are useful on their own. |
| | `docs/UPDATING-DATA.md` | The update commitment, which is decision 1. Write the manual runbook before automating any of it. |
| | The eight undrafted claims | Nothing. Two of them need a direction decision from you first. |

None of the third column waits on launch, and none of it should delay launch.

## What blocks launch

Two things, both decisions, and only you can take them.

1. **The update commitment is unsigned.** `content/sources-and-method.md` proposes updating
   within fourteen days of each source release and flags it as a proposal. An unmet published
   target damages trust more than none. This is now a more answerable question than it was:
   the routine cycle is **three source releases**, not thirty-six figures, and the validator
   ages every figure against its own source's cycle before you publish.
2. **The pre-publication human review has not happened.** The sources page commits to it.
   Publication already has. Every page carries a notice saying so.

The robots guard exists so the site cannot become crawlable by accident. Removing it is
deliberate, and it comes last.

## What the drift read established

`docs/foundation.md` is the record of intent. The site had moved and the document had not, in
eighteen places on the first pass: eleven document corrections, six decisions that were the
owner's rather than the reader's, and one live defect in the site. Applying those turned up
three more findings, two of them further defects and one a pile of validated prose that no
page rendered. Each was larger than the thing that led to it. The pattern throughout was the
one this project keeps hitting, in prose form: something verified the source or the
declaration rather than the property a reader depends on, and the text claimed the latter.

One reported finding was withdrawn. Three claim cards were said to be missing `period` and
`source`; they were not, and the check that found them had truncated each front matter above
the fields it was looking for. See "Working practices".

**Three risk-register rows named things that did not exist.** Silent staleness, the top-rated
risk, claimed the site displayed its own lateness and that the validator aged figures against
their source's update frequency. Neither existed; `updateFrequency` was a required field
compared against nothing. Quote-mining promised a share image. Abandonment promised a notice
a static site cannot publish. The column header is its own promise: "Mitigation (verifiable)".

**The withdrawn two-thirds balance rule survived in five places**, including an acceptance
criterion the published set now fails at five to two.

**Four different counts of the data layer, none right**: 66, 73, eighty, and 33 outstanding
publication dates. It is 67 metrics plus 100 dated series points, with one publication date
outstanding and documented as unrecoverable.

**Correction to the previous handoff.** It said earlier handoffs claimed 167 figures and that
"nothing in `data/` adds up to that on any reading". It does: 67 metric records plus 100
series points is exactly 167, and that is what `validate-data.mjs` counts and prints. The
figure was right and the correction was wrong.

## What the drift read changed in the site

Three classes of defect, and four new checks. The checks matter more than the fixes: each one
closes a hole a reader could have fallen through again.

- **A figure with no publication date now says so.** Foundation 2.1 promised it and nothing
  implemented it; `longDate` returns an empty string for a null, so a card would have
  rendered "Published" followed by nothing. Currently unexercised, because the only record
  without a publication date is cited on no page. Safe by accident until now.
- **Nine live record values were hard-coded in prose inside `data/`**, where the literal
  check never looked: it walked `content/` only. Seven were in `meta.json`'s caveats, which
  render on `/sources-and-method/` about 2,200 characters below the sentence promising a
  reader that a current value written longhand anywhere in a page stops the build. All nine
  now cite tokens.
- **`source_id` joins the data contract** on all 67 metrics. Nothing linked a figure to its
  catalogue entry, and a hostname cannot: `www.gov.uk` serves the Home Office, the MAC and
  the tribunals statistics, and several figures cite an `assets.publishing.service.gov.uk`
  hash that names no publisher at all.
- **Figures are aged against their source's cycle.** Reports rather than fails: a new edition
  does not make our figure wrong, it makes it worth re-checking, and a build that broke on a
  Tuesday because a quarterly release landed would be switched off inside a month. Prints on
  every run including when it finds nothing, and names the 23 figures it cannot age.
- **Link text that names nothing is refused.** "The claim check" was the text of a link on
  three pages, each going somewhere different. Every page passed the duplicate-name rule,
  because that rule is scoped to one page and these sat one per page.
- **`period` and `source` are required front matter on a claim**, because `claim.njk` renders
  both behind a conditional and a claim that omitted them lost them silently.

Also: two cards added to the home page, a "Checked" date on all eight, every claim-check link
and all three home page panels named for where they go, the dashboard fields nothing rendered
deleted, and the trading name removed from the about page.

## Where things stand

- **Live:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Branch:** `main`, current with origin, CI green. Start the next piece of work on a new
  branch; this project works through PRs even solo.

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
`{% figure "theme/metric-id" %}`, because `{{ }}` is Nunjucks' own expression syntax and
would be evaluated as arithmetic, silently producing `NaN`. That shipped once.

**Prose inside `data/` cites the same way.** A token in a data-file string resolves, because
`resolve-citations` runs on the built HTML after Nunjucks and after the partials expand. The
card paragraphs in `dashboard.json` and the caveats in `meta.json` are held to the same rule
as a content page. A data file has no front matter, so a deliberately frozen figure is
declared in a sibling `historical_literals` key.

**Charts cite records too.** A bar carries `ref`, not `value`, and the shortcode throws on a
literal value or an unknown ref.

**A token renders the formatted value only.** Units are prose: `%` attaches, `£` prefixes,
`people` follows. The validator checks the author supplied them, in both syntaxes.

**Chart rules** live in `lib/charts.mjs`. Four are enforced in code rather than left to the
author: the y-axis always starts at zero, the gridline interval is chosen from the intervals
people count in rather than by dividing the top into four, every chart carries its figures
as a real table, and no series is distinguished by colour alone.

**Three Eleventy transforms run on the built HTML, and the order is load-bearing.**
`resolve-citations` renders the tokens and block partials, and throws on anything unresolved.
`heading-anchors` turns `{#id}` syntax into real ids. `scrollable-regions` then wraps any
unwrapped table and gives every scrolling box a `tabindex`, a role and a name taken from its
caption or the heading above it. Run the last before the second and a heading still carrying
its `{#id}` names the region, shipping raw syntax inside an `aria-label`, where nothing on
the page shows it. `check-build` caught exactly that.

## The checking apparatus, and its limits

Five checks, all in CI, all negative-tested.

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, every figure linked to its catalogue entry, single-vintage series, figures overdue against their source's cycle, `DO NOT PUBLISH` flag fails the build |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value written longhand in content or in the `data/` prose that reaches a page |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN`, every table inside a focusable named scrolling region, every ARIA reference resolves, no two controls sharing a name, no two links sharing their text while going to different places, no link text that names nothing, robots rule under `User-agent: *` |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |
| `npm run a11y` | pa11y over all 16 URLs at WCAG2AA. Fails the build |

CI also runs a **weekly cron**, because the time-based rules, the twelve-month claim expiry
and link rot, only fire if something runs.

**Read this before trusting a green run.** Seven times in this project a checker passed while
a real defect shipped. Every one had the same shape: the check verified a property of the
*source or the declaration* rather than the property a reader depends on, and the success
message claimed the latter. The seventh was the literal check walking `content/` and not
`data/`, which left the one file whose entire job is holding references as the only file
nobody scanned for values. The messages now state only what they verify.

**pa11y is a floor, not a verdict, and CI says so.** It was negative-tested before being
believed: an isolated missing `lang` took it to 15/16 and named the rule, a failing contrast
value took it to 0/16. It passed all five of the accessibility defects found by hand.

Known remaining gaps, published on the sources page under *What the checks do not establish*:

- **Prose about figures is unprotected.** Nothing verifies that a chart summary describes
  the data it sits beside. Four false summaries were found by reading, not by tooling.
- **Single years quoted from a series are read by a person.** A chart's data come from a
  series file, but "45,537 in 2019" inside a summary is not a citation.
- **Sub-100 figures are matched with their unit only** (`39%`, `£4.9`) and reported as
  warnings rather than failures, because many metrics share a value. Fourteen surface
  currently, ten in content and four in `data/`. All were reviewed and all are coincidences.
  Review them; do not suppress them.
- **23 of the 67 figures cannot be aged**, because the NAO, the Commons Library, the
  Migration Observatory and the OBR publish irregularly. The validator names them rather
  than counting them as covered.
- **The site does not display its own lateness to a reader.** A static build cannot know how
  late it is at the moment someone reads it. The ageing happens before publication instead,
  and foundation 13 says so rather than implying otherwise.

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
- **Start Chrome once and attach to it; do not spawn one per screenshot.** A script that
  launched a fresh headless Chrome per capture worked twice and then failed for the rest of
  the session, because each spawn raced the previous instance for its `--user-data-dir`. It
  looks like the CDP approach is broken when it is only the process management. Start one
  instance on a known port, connect to `/json/list`, and reuse it.
- **Read the accessibility tree, not the markup.** Chrome's tree is what assistive
  technology consumes. `Accessibility.getFullAXTree` over CDP showed the duplicated chart
  announcement and the three identically named controls; the markup for both read as correct.
- **Never truncate the thing you are checking for absence.** A finding that three claim cards
  were missing `period` and `source` was wrong: the check piped each front matter through
  `head -20` and those fields sit below the cut. Reporting a defect that does not exist costs
  more trust than missing one, because it makes every other finding worth re-checking.
- **Count only what can actually take focus.** Elements inside a closed `<details>` are in
  the DOM and are not focusable. Counting selectors rather than focusable elements
  overstated the tab order cost by 60%.
- **Beware a rule that reaches inside a utility class.** `.prelaunch p` outranks `.wrap`, so
  a shorthand `margin: 0` there silently undid the auto-centring `.wrap` was applied for.
  Set the longhand you mean.
- **Negative-test every new check**, and confirm the break actually applied before
  concluding anything. Two "failures" in an earlier session were tests that never fired, and
  one was a search string that did not match. Every check added on 23 July asserts the break
  applied before reading the result.
- **A denylist check needs a review pass, not a sweep.** Four of the sub-100 warnings look
  exactly like the three that were real citations. Tokenising all seven would have cited the
  wrong record in four places, which is worse than leaving them.
- **Never `git checkout -- .` to undo a test.** It reverts everything. This cost an hour.
  Snapshot to a scratch directory and restore from there, and chain the restore with `;`
  rather than `&&`, because a failing `grep` in the middle will otherwise skip it.
- **Do not fix by bulk substitution.** It caused an earlier round of defects, in prose and in
  CSS alike. Sentence by sentence, in view.
- **Research subagents must quote a fetched URL and verbatim text per figure.** One returned
  eight values that appeared nowhere in its own evidence table. Anything unverifiable comes
  back marked UNVERIFIED and is left out.

## House style

British English. **No em-dashes** anywhere in authored copy; use a comma, colon or full stop.
En-dashes are fine in numeric ranges. This matches the sibling projects and is enforced by
`validate-content.mjs`, which scans `content/`, `docs/`, `scripts/`, `lib/`, `data/`,
`.github/`, and the root markdown files. No emoji.

## Decisions taken rather than deferred, worth revisiting

Each is cheap to reverse.

1. **The second reader.** The risk register mitigated political capture, the top-rated risk,
   with a two-thirds rule that has been removed and a second reader who does not exist. It
   now records the mitigations that are real and says plainly that nothing replaced either.
   Whether to have a second reader is yours; it is already a launch blocker.
2. **The MVP cap counts source releases, not figures.** Four releases, currently three. The
   figure count follows and is recorded rather than targeted. Reverting means picking a
   figure number again and deciding which sixteen records come off the site.
3. **No share image.** Building one means rendering an image per claim on a site that ships
   no images at all. The claim card already carries period, source and date, and a
   screenshot of it is what people share. `og:title` and `og:description` from existing front
   matter is a smaller and different job if link previews are ever wanted.
4. **No abandonment notice.** A static site cannot publish a notice saying it has stopped
   being published. The twelve-month claim expiry plus the weekly cron is the real mechanism.
5. **The staleness check reports rather than fails.** A build that broke because a quarterly
   release landed would be switched off inside a month.
6. **"Both" was removed as a claim direction.** Two rows of the 8.5.3 table are marked
   "(shared)" and assigned to the side whose version circulates more, per the style guide.
   Those two assignments are a starting position, not a finding: both claims are undrafted
   and either label is one word to change.
7. **The correction note was built rather than the promise weakened.** Claims accept
   `correction` and `corrected_on`, the layout renders a dated note, and the validator
   refuses one without the other. No claim carries one, and the sources page says so.
8. **Two Markdown tables and the three-queues table still have no caption.** They are
   wrapped and named from the heading above them, which uses text already on the page. A
   caption is new prose and is yours to write.
9. **In `most-immigration-is-asylum`**, two list items open with a bold term and the third
   opens with a bold link, so the third reads as more important than its siblings. Fixing
   it means rewriting the sentence.
10. **The small-boats card lost a line** about 90% of detected unauthorised arrivals, which
    belongs to the year-ending-March record rather than the calendar-2025 card. It is still
    in the record's notes and could be placed on the asylum page.

## Not covered by any session so far

- **A real screen reader.** Chrome's accessibility tree is the tree assistive technology
  consumes, and it is what was read, but it is not VoiceOver or NVDA reading a page aloud.
- **Anyone outside this project has been asked whether they want it.** Foundation section 14
  keeps "talk to five people" open, and section 4.2's success measures have still not been
  chosen. Both are process criteria in section 17.

## After that

1. Settle the two decisions, then remove robots.txt and its guard.
2. Write `docs/UPDATING-DATA.md`, modelled on DEBT's, so the update commitment has a runbook.
   It is now a smaller document than it was: the cycle is three named releases, and the
   validator tells you which figures are overdue. Do this before automating any of it; you
   need to be able to do the job by hand before you delegate it.
3. **Update automation, scoped in `docs/UPDATE-AUTOMATION.md`.** Four phases, none built,
   none of which should delay launch. Summarised below.
4. Eight of the fifteen claims in foundation section 8.5.3 remain undrafted.

## Update automation

**Scoped in full in `docs/UPDATE-AUTOMATION.md`, 23 July. Nothing is built.** Read that file
before doing any of it; the verified endpoints, the two implementation traps and the exact
shape of the evidence contract are there and are deliberately not repeated here. An earlier
version of this section copied about forty lines of it, which is the same mistake as
`dashboard.json` copying theme values, on the same day this document was written.

What belongs here is the decision rather than the design:

- **Four phases.** A release notifier, an evidence check, an update prompt, and a rewrite of
  what the sources page says about automation. Phases 1 and 2 are each worth building alone.
  Phase 3 is unsafe before Phase 2 exists. Phase 4 needs owner sign-off, like the update
  commitment.
- **The line the whole design rests on.** An assistant that drafts a pull request is not "an
  automated pipeline pulling numbers straight onto the site". The site's two strongest
  claims, "No figure appears here because a model asserted it" and the register's "never
  publishes figures", survive every phase.
- **None of it should delay launch**, which waits on two decisions this changes neither of.
- **The named risk is automation bias, not fabrication.** Phase 2 handles fabrication
  mechanically. Do not tighten the update commitment because drafting got faster; review is
  the bottleneck worth protecting.
- **Citing a series point is scoped separately**, in `docs/SERIES-CITATIONS.md`. Nine values
  in chart summaries are typed by hand because the citation system covers theme metrics and
  not series points, so a chart and the sentence describing it can drift apart. Scoping it
  found something larger: **four figures are held twice**, as a headline metric and as the
  latest point of a series, with nothing reconciling them. A quarterly update that revised one
  and not the other would publish two different official values for the same measure. That is
  the failure foundation 9.4 describes, fixed between the dashboard and the theme files in
  June and left standing between the series and the theme files.
- **The check was run by hand on 23 July and the site is clean.** Three changes at the
  Home Office since the site last looked, and none touches a published figure: an organised
  immigration crime section the site does not cite, a correction to 2021 citizenship figures
  the site does not publish, and a correction to a visas table where the site's figure is a
  different row. That last one was a change of 120,906 in a table this site cites, and it
  missed by one row. Full results and the two design findings it produced are in the scope.

## Housekeeping

Five branches are merged and can be deleted, locally and on the remote: `audit-fixes`,
`handoff-rounds`, `handoff-after-rounds`, `costs-page` and `design-and-a11y-rounds`. The last
reports as unmerged because it carries one extra commit, `62d9dba`, whose `lib/charts.mjs`
change is already on `main` and whose `HANDOFF.md` version has been superseded twice. Nothing
is lost by deleting it.

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

The primary task is phases 1 and 2 of the update automation, because both are useful on their
own and neither waits on anything. An alternative prompt for the undrafted claims follows it.

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/HANDOFF.md, starting with "Start here", then
docs/UPDATE-AUTOMATION.md in full.

This project has no CLAUDE.md of its own. Your global instructions at
~/.claude/CLAUDE.md load automatically, and the project's own rules are
in the handoff under "House style" and "Working practices that earned
their place".

Two decisions block launch and both are mine. This task is neither, and
it must not delay them.

TASK: build phases 1 and 2 of docs/UPDATE-AUTOMATION.md. Phase 1 is a
release notifier. Phase 2 is an evidence check on any changed figure.
Do NOT build phase 3, the update prompt: it is unsafe before phase 2
exists and has been exercised, and the scope says so.

Build phase 2 FIRST, even though it is numbered second. It stands alone,
it applies to updates you make by hand, and it is the mechanism that
makes everything after it safe. The notifier is the easier half and can
follow.

The scope records what was verified on 23 July 2026: the endpoints, and
three traps that will each cost you an hour. Two are in the check itself,
one is in the GOV.UK response shape. Read them before writing anything.

Re-verify the endpoints rather than trusting them, since they are live
external services and this scope has a date on it, but do not re-derive
them from scratch.

Phase 2, the evidence check. Any figure whose value changed, OR which is
new, must carry a quote from a fetched source, and the check must
require the value to appear verbatim in that quote. New figures are not
an afterthought: the eight fabricated values were new research rather
than updates, so a rule watching only changes would miss the case the
check exists for.

64 of the 67 figures are read straight off a release and quote cleanly;
three need exemptions and the scope names them individually. Keep that
list explicit and short, because an exemption that can be claimed freely
is how this check rots.

This check exists because a research subagent on this project once
returned eight values that appeared nowhere in its own evidence table.
A fabricated number cannot appear in a real quotation, which is the
whole idea. Write a negative test that proves it: a changed value whose
quote does not contain the digits must fail, and confirm the break
actually applied before believing the result.

Phase 1, the notifier. It reports, it never gates. Put it on the
existing weekly cron with continue-on-error, like check-sources.mjs. The
four irregular sources have no cadence to check and must be reported as
unwatched rather than silently skipped, on the same principle the
staleness check follows. Query affected figures by source_id.

Anything you add must pass, and run these rather than assume:
npm run validate, npm run build, npm run a11y.

Neither phase touches a page, so the site should be byte-identical
afterwards. Check that rather than asserting it.

Branch first; this project works through PRs even solo.

The handoff's "Working practices that earned their place" applies in
full. The four that bite hardest here:

- No em-dashes, ever. Enforced by validate-content.mjs.
- Negative-test every new check, and confirm the break applied before
  concluding anything. Two "failures" in an earlier session were tests
  that never fired.
- Never truncate the thing you are checking for absence. A finding in an
  earlier session was wrong because a check piped front matter through
  head -20 and the fields sat below the cut.
- State what a check does NOT establish in its own success message.
  Seven times a checker here passed while a real defect shipped, every
  time because it verified the source or the declaration rather than the
  property a reader depends on.

Stop and ask about anything that needs an editorial judgement rather
than a correction. Phase 4, rewriting what the sources page says about
automation, is mine to sign off and is not part of this task.
```

### Alternative task: the undrafted claims

Use this instead if the automation is not what you want next.

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/HANDOFF.md, starting with "Start here".

This project has no CLAUDE.md of its own. Your global instructions at
~/.claude/CLAUDE.md load automatically, and the project's own rules are
in the handoff under "House style" and "Working practices that earned
their place".

TASK: draft the outstanding claim checks. Eight of the fifteen in
docs/foundation.md section 8.5.3 are specified and unwritten:

  Visa grants equal arrivals
  Small boat arrivals are the whole asylum system
  The asylum backlog is one number
  The average migrant contributes £341,000 over their lifetime
  Asylum hotels cost £8 million a day
  A refusal means the original claim was obviously false
  Local areas all carry the same pressure
  Falling net migration means the asylum system is shrinking

Do NOT draft all eight in one pass. Propose an order, tell me which you
would cut and why, and draft the first two for me to read before going
further.

A claim qualifies only if all four criteria in 8.5.2 hold, and "our
sources can settle it" is the one that will bite. Check what data/ holds
before promising a check, and say the question is open if that is the
honest answer. One of the eight is already known to fail it: "Local
areas all carry the same pressure" needs per-capita local authority
figures, and data/ holds none. The only geographies in the data layer
are United Kingdom, London and England, and the local picture is phase 4
gated on a written harm review. Do not research it hoping otherwise;
either drop it or tell me what it would take.

Two of the eight need a decision from me before they can be written.
"The asylum backlog is one number" and "Falling net migration means the
asylum system is shrinking" are misuses common to both sides. There is
no "both" direction: validate-content.mjs accepts restrictionist and
pro-migration and nothing else, because a third label no claim carried
was a promise nothing kept. The 8.5.3 table marks them "(shared)" with
a suggested side, and that suggestion is a starting position rather
than a finding. Ask me before you write either.

Two exemplars, and pick the one that matches the shape:
net-migration-is-arrivals.md for a definitional claim, which most of
these are, and immigrants-are-a-drain-on-public-finances.md for one
where the honest answer is that the evidence does not settle it.

Every claim needs id, claim, short_answer, direction, error_type,
last_reviewed, review_due, period and source in front matter. period and
source are required because the card renders them behind a conditional,
so a claim without them loses them silently. Figures cited in prose must
be declared under figures:.

Mind mirror_of. Where two claims are the same misuse from opposite
directions, each names the other and the validator refuses a mirror that
is not named back; the two fiscal claims already work this way. At least
two of the eight are candidates: the £341,000 figure sits beside the
fiscal pair, and "a refusal means the claim was obviously false" is the
counterpart to "almost all refused asylum seekers are eventually
recognised", which is already drafted.

Anything you add must pass, and you should run these rather than assume:
npm run validate, npm run build, npm run a11y. Every new claim page adds
a URL to .pa11yci.json.

Watch the representation floor. The published set runs five
restrictionist to two pro-migration. The floor requires at least two in
each direction and sets no ceiling, deliberately, because a cap once
blocked the correction a pro-migration reader would most want to see.
The claims page states the real split in a sentence generated from the
set, so it cannot go stale, but read what it will say before you change
the balance.

Branch first; this project works through PRs even solo.

The handoff's "Working practices that earned their place" applies in
full. The three that bite hardest here:

- No em-dashes, ever. Enforced by validate-content.mjs.
- Do not fix by bulk substitution. Sentence by sentence, in view.
- Never truncate the thing you are checking for absence. A finding in
  an earlier session was wrong because a check piped front matter
  through head -20 and the fields it was looking for sat below the cut.

Stop and ask about anything that needs an editorial judgement rather
than a correction.
```
