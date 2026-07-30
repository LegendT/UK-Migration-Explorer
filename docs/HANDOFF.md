# Handoff, 30 July 2026

State of UK Migration Explorer, and how it works. **Outstanding work is not in this document.**
It is in `docs/BACKLOG.md`, which is the durable list, because a handoff gets rewritten every
session and a rewrite is where work quietly falls out. This document carries the things that
stay true between sessions: how the project works, what checks it, what has been decided, and
what earlier sessions cost.

`validate-content.mjs` fails the build if this document stops pointing at `docs/BACKLOG.md`,
or if a planning document exists that the backlog does not reference.

## Start here

1. Read `docs/BACKLOG.md`. It is ordered; take the first **unfinished** item, which is not
   always an unstarted one: an item can have phases built and still be the first. Which item
   that is, and how far it has got, is the backlog's to say and not this document's.
2. Read the rest of this document, for how the project works and what not to repeat.
3. Read the scope document for whatever you pick up, and do not re-derive it.
   `verification.txt` at the repository root is the pre-publication review itself. It is the
   record of a finished piece of work, not a scope for an unstarted one.

**The pre-publication review was conducted on 27 July 2026, and its nine corrections, 1a to 1i,
all landed by 28 July.** That is the whole of what this document records about it. What remains
of it, why the corrections landing is not the review passing, and what is gated behind that, are
in the backlog.

That split is deliberate and this document keeps breaking it. An earlier version restated the
review's closing steps here at length, which is precisely the duplication the paragraph at the
top forbids: two copies of an instruction drift, and the copy a session happens to read wins.
When you are tempted to record outstanding work here, put it in the backlog and link to it.

The update commitment was signed on 23 July 2026 at one month per cadenced release, which
closed the other original blocker.

## Where things stand

- **Live:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Working branch:** cut a new one from `main`. This project works through PRs even solo.

Deliberately not recorded here: which branches exist, what CI last did, what is on the remote.
That is operational state, it is discoverable in seconds, and a previous version of this
section was wrong within the hour because branches were tidied after it was written.

16 pages build from a governed data layer of **71 metric records** in four theme files, plus
**four time series carrying 100 dated points**. `validate-data.mjs` counts both and reports
171. **A subset of those records reach a reader.** Eleventy 3, no client-side JavaScript, charts
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

**Series points are cited too, with a filter rather than a token.** A chart summary is a
Nunjucks string built with `~` concatenation, so a shortcode cannot go inside one:
`(series.netMigration.data | at(2022) | number)` is the citation. It throws on a year the
series does not hold, and the `| number` is not optional, because `at` returns the raw value
and a page that omits it ships `45537`. A series value written longhand fails the build. The
four figures held both as a metric and as a series point declare `series_ref`, so a release
cannot revise one and leave the other, and `lib/series.mjs` is the single home for the series
names, so a template's `series.flows` and a record's `flows@2025` cannot come to mean
different things. Reasoning in `docs/SERIES-CITATIONS.md`.

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

Seven checks, all in CI, all negative-tested.

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, every figure linked to its catalogue entry, single-vintage series, a metric declaring a `series_ref` agrees with the point it names, a figure naming a publisher table in its own prose declares it in `table_reference`, figures overdue against their source's cycle, `DO NOT PUBLISH` flag fails the build |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value or series point written longhand in content or in the `data/` prose that reaches a page, outstanding work tracked in the backlog |
| `check-evidence.mjs` | Every metric whose value changed against `origin/main`, and every metric that is new, is declared in `data/evidence/` with a quote containing that value. A derived figure quotes its inputs and states the arithmetic instead. A series is evidenced **per array and per release**, carrying its vintage, its point count and a quote holding both ends; a move with no new release behind it needs a correction note, because an entry matched on vintage alone also matches every earlier state of the same edition. Gates the build. Needs the base branch fetched, and fails rather than skipping when it cannot see it |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN`, every table inside a focusable named scrolling region, every ARIA reference resolves, no two controls sharing a name, no two links sharing their text while going to different places, no link text that names nothing, robots rule under `User-agent: *` |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |
| `check-releases.mjs` | Two halves. Whether a watched source has published a newer edition than the one each record **and series file** cites, per cited edition rather than per source, compared on the month and year in the URL. And whether a table declared in `table_reference` was corrected **inside** the cited edition, matched against the Home Office change history and raised only where the figure's own `retrieved_date` pre-dates the correction. Network; reports and never gates, and opens one deduplicated issue from `main` or the cron. A route that matches no document, or a page that answers with no change history at all, fails loudly rather than reading as quiet |
| `npm run a11y` | pa11y over all 16 URLs at WCAG2AA. Fails the build |

CI also runs a **weekly cron**, because the time-based rules, the twelve-month claim expiry and
link rot, only fire if something runs.

**Read this before trusting a green run.** Seven times in this project a checker passed while a
real defect shipped. Every one had the same shape: the check verified a property of the *source
or the declaration* rather than the property a reader depends on, and the success message
claimed the latter. The seventh was the literal check walking `content/` and not `data/`, which
left the one file whose entire job is holding references as the only file nobody scanned for
values. The messages now state only what they verify.

**The count is seven, and three more of that shape have been caught since without being added
to it**, because all three were found before they merged: the `at()` filter shipping an
unformatted figure, the `historical_literals` escape hatch that could not express what it
exempted, and a series evidence entry matched on a vintage, which also matched every earlier
state of the same edition and would have matched for ever where the vintage was null. They are
under *Building a check, and trusting it*. Seven is the number that shipped, and it is left
alone deliberately: inflating the one figure this document uses to argue for scepticism would
make it worth less.

**pa11y is a floor, not a verdict, and CI says so.** It was negative-tested before being
believed: an isolated missing `lang` took it to 15/16 and named the rule, a failing contrast
value took it to 0/16. It passed all five of the accessibility defects found by hand.

The known gaps in coverage are published on the sources page under *What the checks do not
establish*, and listed in `docs/BACKLOG.md`.

## Working practices that earned their place

Grouped, because there are more than two dozen and a flat list gets read as far as the fifth
item. That applies inside a group as well as across them, so prefer sharpening a bullet that
is already here to adding a neighbour beside it.

### Verifying a figure

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

- **Confirming the figure you asked about is not the whole job.** Every changed or new figure
  in the review corrections was checked against a fetched source, quoting it per value. Five
  times that pass overturned something the review had asserted right beside the figure in
  question: a second ONS 2024 foreign-born figure of about 10.6 million on a different
  population base, which would not reconcile; the OBR migrant contribution and its "age 80"
  endpoint, which OBR does not print or state; the NAO report the costs chart cited, which does
  not carry the per-night unit costs at all; a humanitarian immigration figure of 35,000 that
  the ONS bulletin does not give, only the 6% share; and the word "destitution", which neither
  Home Office page uses. Do not merge over what the check reveals beside its target.

- **Research subagents must quote a fetched URL and verbatim text per figure.** One returned
  eight values that appeared nowhere in its own evidence table. Anything unverifiable comes back
  marked UNVERIFIED and is left out. For anything that reaches a record this is now mechanical:
  `check-evidence.mjs` fails the build unless the quote is in `data/evidence/`.

- **A stored "all reviewed" note is a declaration, not a check, and it ages.** The README
  recorded the fourteen sub-100 warnings as reviewed and all coincidences. Checking each
  again in context found three that were not: the refused-asylum grant and appeal rates and
  the born-abroad Census share were live metric values restated longhand beside the very
  tokens that already cited them, one release from contradicting themselves. Re-derive the
  per-item property; do not trust a summary of it, least of all one that says everything is
  fine.

### Building a check, and trusting it

- **Negative-test every new check**, and confirm the break actually applied before concluding
  anything. Three "failures" here were tests that never fired: two in an earlier session, and
  a `perl` edit on 28 July whose pattern missed, so a check "passed" against a file nobody had
  broken. A fourth was a search string that did not match. The cheap guard is to grep for the
  broken text and print the count before running anything.

- **Negative-test the mechanism and the remedy, not only the check.** Three have failed here
  across two sessions, and not one of them was a check. `at()` returns the raw number, so a citation missing
  `| number` shipped `45537` to the built page with `npm run validate` and `npm run build`
  both green: no literal in the source for the longhand scan to find, and an unformatted
  integer is not `NaN`. Separately, the literal check told authors to declare a frozen figure
  under `historical_literals`, and that escape hatch was split on commas, so every
  comma-grouped value it existed to exempt was shredded into two junk exemptions. Three copies
  of it, and no content page had ever used one. Third, the series evidence check printed a
  fillable skeleton carrying `"vintage": null`, and null was the one value that would have made
  that block's exemption permanent, so the remedy handed the author the hole. A check is only as
  good as the thing it points at and the thing it sits beside.

- **Find things the way that can show you are wrong.** Four figures held twice were found by
  matching equal values, which by construction can only find pairs that already agree. Whether
  anything had already drifted needed a different query, and "they all agree" was not evidence
  until that query was run.

- **Never truncate the thing you are checking for absence.** A finding that three claim cards
  were missing `period` and `source` was wrong: the check piped each front matter through
  `head -20` and those fields sit below the cut. Reporting a defect that does not exist costs
  more than missing one, because it makes every other finding worth re-checking.

- **A denylist needs a review pass, not a sweep.** Four of seven sub-100 matches were
  coincidences. Tokenising all of them would have cited the wrong record four times.

- **When a check matches a declaration to a record, ask what the key does when it does not
  change.** Series evidence was matched on the release vintage, which meant one entry also
  matched every earlier state of the same edition: a fabricated middle point passed while the
  run reported it as declared. Where the vintage was null, and it is a nullable field, null
  matched null and the first entry would have exempted that block for ever. The skeleton the
  error message printed supplied that null itself, which is why it also appears two bullets up.
  Ask of any matching key: what happens when it is unchanged, and what happens when it is
  absent. Both answers have to be "the check still asks for something". **Ask it of both
  sides.** The corrections watch compares a record's `retrieved_date` against the date on the
  publisher's change-history entry, and an entry with no timestamp gives an empty string, which
  compares as earlier than every date and would have silently cleared every figure behind it.
  The declaration was the side that had been thought about; the record it was matched against
  was not.

- **A second model reading the same code found what a self-critique had not.** Two rounds of
  critique on the series evidence check found real defects and missed the one above, which a
  fresh reviewer reproduced in a scratch clone within one pass. Worth doing on anything whose
  whole purpose is refusing bad input, because self-critique is weakest exactly where the
  author's model of the design is the thing at fault.

### Looking at the built page

- **Look at the built page, and measure the thing you are claiming.** Run `npm run build`,
  serve `_site`, and look. Looking is not enough on its own: the pre-launch banner was reported
  as aligned on the strength of a screenshot and had not moved at all. If the claim is "these
  two edges line up", read the two numbers.

- **If a change should not alter the output, prove it by diff.** Copy `_site` to a scratch
  directory before the change and `diff -r` after. That is what established twelve series
  substitutions rendered exactly what they replaced, and it is a stronger claim than reading
  them. It also localises the changes you did mean: when one page differed, it was the one
  whose published prose the work had made false. The same reading of `git diff --stat` one level
  down caught a script that added a field to five data files and rewrote a sixth it had nothing
  to add to: a JSON round-trip is not text-preserving, and `3.0` came back as `3`. Numerically
  identical, and a line in the diff of a file the work had no business in.

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

- **Count only what can actually take focus.** Elements inside a closed `<details>` are in the
  DOM and are not focusable. Counting selectors rather than focusable elements overstated the
  tab order cost by 60%.

### Changing something without breaking something else

- **Do not fix by bulk substitution.** It caused an earlier round of defects, in prose and in
  CSS alike. Sentence by sentence, in view.

- **A defect named on one page usually has siblings.** The invalid cohort comparison was in three
  places, only one of which the review names, and one of those was a record's `notes`, where it
  would have instructed the next editor to reintroduce it. The support-versus-accommodation
  conflation was in two. Grep the reasoning, not just the sentence.

- **Beware a rule that reaches inside a utility class.** `.prelaunch p` outranks `.wrap`, so a
  shorthand `margin: 0` there silently undid the auto-centring `.wrap` was applied for. Set the
  longhand you mean.

- **Never `git checkout -- .` to undo a test.** It reverts everything. This cost an hour.
  Snapshot to a scratch directory and restore from there, and chain the restore with `;` rather
  than `&&`, because a failing `grep` in the middle will otherwise skip it.

### Working with this project's own documents and rules

- **Read the site's own published policy before adopting a reviewer's recommendation.** The
  review asked for attributable circulation examples. The style guide says, on a live page, that
  this site does not attribute claims to named people and accepts the "nobody actually says that"
  rebuttal as the cost. The review's finding *is* that rebuttal. A good example had already been
  found and would have contradicted two published pages. An external reviewer does not know what
  the site has promised its readers.

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

### Deciding what to build

- **Test the mechanism before recommending it.** A scope recommended a Nunjucks filter for
  citing series points without checking that a filter works inside a concatenated summary
  string, which was the one thing that could have sunk the approach. It does, but that was
  established afterwards.

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

**It is a compression of this document, not a second source of truth.** Where the two
disagree, this document is right and the prompt needs correcting.

They have drifted twice, and the prompt was the stale copy both times: it said a check had
overturned the review five times while the body still said three, and it said to take the
first *unstarted* backlog item after the backlog had moved to *unfinished*, which would have
sent a session to the wrong work. Saying "keep them in sync" did not prevent either, so here
is what is actually copied and has to move in both places:

| Copied into the prompt | Kept here |
| --- | --- |
| overturns of something asserted beside the figure asked about | *Verifying a figure* |
| checks that passed while a real defect shipped | *The checking apparatus* |
| negative tests that never fired | *Building a check* |
| scope documents written in one session | *Deciding what to build* |
| which backlog item to take, and on what wording | `docs/BACKLOG.md`, not here |

The last row is the one that bit. The prompt and this document should both use the backlog's
word rather than inventing a third.

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/BACKLOG.md first. It is the durable list of outstanding work.
Then read docs/HANDOFF.md for how the project works and what earlier
sessions cost. Then read the scope document for whatever you pick up,
and do not re-derive it.

This project has no CLAUDE.md of its own. Your global instructions at
~/.claude/CLAUDE.md load automatically.

The pre-publication review is done. All nine of its corrections, 1a to
1i under backlog item 1, landed in PR #38, and PR #39 reordered the
backlog and rewrote the handoff around them. verification.txt at the
repo root is the review itself. Every other completed item names its own
PR in the backlog's Completed section, so this prompt does not carry a
list that would need updating each time.

Work is tagged [me] or [you]: [me] is a factual or mechanical change you
make against a cited source; [you] is an editorial or sourcing call that
is mine. Do the [me] parts; for a [you] part, propose and ask. On a list
that mixes both, do all the [me] work first and bring me the [you]
decisions in one batch, because the mechanical work usually determines
what the editorial question even is.

Still mine, not yours, and not a session's work: the three closing steps
that are what is left of item 1, including the last_reviewed decision;
talking to five target users and choosing the success measures, both
under "Unmet acceptance criteria"; and removing the robots rule, which
comes last and is launch. Do not treat any of those as done. The backlog
also carries a short list of small editorial decisions waiting on me;
those are mine to answer, not yours to take.

TASK: take the first UNFINISHED item in docs/BACKLOG.md, unless I have
told you otherwise in this message. Unfinished, not unstarted: an item
can have phases built and still be the first one. It is in recommended
order, maintained there, so this prompt names no task and does not go
stale as items finish.

Before you start, tell me which item you are taking and what you expect
to change. If it is larger than a session, say so and propose a split.

When you finish an item, mark it done in docs/BACKLOG.md with its PR and a
date. Do not delete it. validate-content.mjs fails the build if a
planning document in docs/ is not referenced from the backlog, or if the
handoff stops pointing at it, so the list cannot quietly lose things.

Rules this project has paid for. The first two bite whenever a figure
changes; the rest bite on everything.

- Every changed or new figure needs a fetched source and a verbatim quote
  before it is written. The quote goes in data/evidence/ and CI fails
  without it; the shape is in data/evidence/README.md. Go to the
  publisher's data tables, not its HTML bulletin: the bulletin aggregates,
  and twice a site figure has looked wrong against one and been right.
  .ods and .xlsx are zip archives, so download and parse them rather than
  giving up when a fetch cannot read them.
- Confirming the figure you asked about is not the whole job. Five times
  a check here has overturned something asserted right beside it.
- Check what this project has already published, or already enforces,
  before acting on outside advice or offering me an option. A review
  recommended something the style guide had promised readers the site
  would never do, and an option I was offered turned out to be one the
  validator forbids.
- A defect reported on one page usually has siblings. Grep the reasoning,
  not just the sentence.
- Anything you add must pass, and run these rather than assume:
  npm run validate, npm run build, npm run a11y, and npm run check-evidence
  if a figure changed.
- Negative-test every new check. Confirm the break applied by grepping for
  the broken text and printing the count, before believing the result:
  three "failures" here were tests that never fired. Negative-test the
  MECHANISM and the REMEDY too, not only the check. The at() filter
  shipped an unformatted 45537 to the built page through validate and
  build alike; an escape hatch one message recommended could not express
  a single value it existed to exempt; and a skeleton another message
  printed supplied the null that would have made an exemption permanent.
  Where a check matches a declaration against a record, ask what its key
  does when it does not change and when it is absent. Both answers have
  to leave the check still asking for something.
- State what a check does NOT establish in its own success message.
  Seven times a checker here passed while a real defect shipped, every
  time because it verified the source or the declaration rather than the
  property a reader depends on.
- If a change should not alter the output, prove it by diff. Copy _site
  to a scratch directory before, diff -r after. That is a stronger claim
  than reading the change, and it localises the changes you did mean.
- No em-dashes, ever. Enforced by validate-content.mjs.
- Do not fix by bulk substitution. Sentence by sentence, in view.
- Never truncate the thing you are checking for absence, and prefer the
  query that could show you are wrong over the one that confirms you.
- Scoping is not progress. Four scope documents were written in one
  session while the site did not change. Build the smallest real thing.

Branch first; this project works through PRs even solo. Check main has
not moved before you rewrite the handoff or the backlog.

Stop and ask about anything that needs an editorial judgement rather
than a correction.
```
