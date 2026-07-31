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

**One exception, because it is structural rather than operational.** `main`'s history is
truncated. Its root commit is `126a40a`, "Merge pull request #42", and that commit has no
parent, so `main` begins in the middle of the project. Everything before it, from the first
commit through PR #41, is a **separate history with no common ancestor**:
`git merge-base main history-to-pr-41` exits 1. That is the 37-defect audit, the design and
accessibility rounds, the costs page, the nine pre-publication review corrections in PRs #33
to #38 and the series citations in PR #41. The content all reached `main`; the commits did not.

It survives on the branch `history-to-pr-41`, which is the fullest copy and contains six of the
seven other pre-#42 branches. `design-and-a11y-rounds` is the seventh and is contained in
nothing else: it holds one further commit, `62d9dba`, a superseded handoff rewrite that also
touches `lib/charts.mjs`. Why the truncation happened is not known here.

The branch name is the part of this that can go stale, and naming it breaks the rule above on
purpose: a reader who does not know the history is detached will read `git log` as the whole
project and a branch list as clutter, which is how the record gets deleted by someone tidying.
If the branch is renamed or the history is grafted back on, correct this paragraph. The fact
that `main` starts at a parentless commit is checkable in one command and does not go stale:
`git rev-list --max-parents=0 main`.

17 pages build from a governed data layer of **75 metric records** in four theme files, plus
**four time series carrying 100 dated points**. `validate-data.mjs` counts both and reports
175. **46 of the 75 reach a reader**, and the other 29 are unpublished reserve. Reaching a reader
means **rendering**: a token, a chart bar's `ref`, a `| metric` summary, a dashboard card or a
caveat in `data/`. A `figures:` front-matter entry is NOT a route, because nothing renders that
list, and counting it was the error that made the sources page's Home Office row wrong. **The
definition is code, not a paragraph:** `lib/published.mjs` holds those five routes, the sources
page renders from it, and `npm run build` prints the split, so do not hand-roll a query for it
and do not trust the two numbers in this sentence over the run. Eleventy 3, no client-side JavaScript,
charts rendered as inline SVG at build time. What is on each page is in `README.md`
under *Layout*, and was duplicated here line for line until 30 July, in a project whose first
rule is one figure, one home.

**A whole-project pre-launch audit ran on 30 and 31 July 2026** and is open as PR #70, written up
in `docs/PRE-LAUNCH-AUDIT.md`. Its outcome is a findings list, on the same principle as the review
before it. It applied the mechanical half and left every editorial and sourcing call. What is
outstanding from it is in the backlog and in the audit's own actionable list, not here.

Three things from it belong in this document because they change how the project should be read.

**The review covered ten pages of sixteen, and that now has a consequence.** Both of the audit's
outstanding blockers are in `content/glossary.md`, one of the six the review never opened. Two
independent passes reached it separately. That is not a fact about the glossary; it is what an
unreviewed page looks like when someone finally reads it.

**Traceability was never checked at the far end.** Every check verifies that a figure names a source.
Nothing verifies the source contains the figure. Reading five publications during the audit found
three defects: a record citing an NAO report that does not contain its value, a phrase attributed to
the Home Office that it does not use, and a note reproducing wording the NAO formally retracted by a
correction slip inside its own PDF. The first is the one to know: `£2.1 billion` is real and official
and lives in the Home Office Annual Report and Accounts, not in the report the record names.

**The audit committed the project's own signature defect four times while auditing for it**, and
each is recorded in `docs/PRE-LAUNCH-AUDIT.md` at its own finding rather than summarised here. That
is the strongest evidence available that the pattern is structural rather than careless.

## How the project works

**One figure, one home.** Every published figure is a record in `data/` carrying `id`,
`metric_name`, `value`, `unit`, `date` (period END, never publication date), `period_label`,
`geography`, `source_name`, `source_id`, `source_url`, `published_date`, `retrieved_date`,
`notes` and `confidence_level`. Pages cite records; they never restate values.

**Citation syntax differs by file type.** Markdown uses `{{theme/metric-id}}`. Nunjucks uses
`{% figure "theme/metric-id" %}`, because `{{ }}` is Nunjucks' own expression syntax and would
be evaluated as arithmetic, silently producing `NaN`. That shipped once. **Whitespace inside the
braces is accepted and trimmed**, by the renderer and by `validate-content.mjs` alike, which
matters to anything else that matches a citation by pattern: a scan stricter than the renderer
silently disagrees with it about what the site publishes, and one was.

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
five figures held both as a metric and as a series point declare `series_ref`, so a release
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

**Five Eleventy transforms run on the built HTML, and the order is load-bearing.**
`resolve-citations` renders the tokens and block partials, and throws on anything unresolved.
`published-counts` replaces `{count:source-id}` and `{count-in-words:...}` on
`/sources-and-method/` with the derived number of records that reach a reader from each
publisher, because markdown templating is off site-wide and a markdown page cannot call a
filter the way `common-claims.njk` calls `countWhere` for its direction split. That is the
marker-and-transform idiom the two below already use, and it is what stopped those counts
being typed. `heading-anchors` turns `{#id}` syntax into real ids. `table-captions` lifts a `{caption}`
paragraph into the `<caption>` of the table below it, and throws when a marker matches no table,
because markdown has no caption syntax and a stray marker would ship as visible text.
`scrollable-regions` then wraps any
unwrapped table and gives every scrolling box a `tabindex`, a role and a name taken from its
caption or the heading above it. Run the last before the second and a heading still carrying
its `{#id}` names the region, shipping raw syntax inside an `aria-label`, where nothing on the
page shows it. `check-build` caught exactly that.

## The checking apparatus, and its limits

Seven checks, all in CI, all negative-tested.

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, every figure linked to its catalogue entry, single-vintage series, a metric declaring a `series_ref` agrees with the point it names, a figure naming a publisher table in its own prose declares it in `table_reference`, figures overdue against their source's cycle, `DO NOT PUBLISH` flag fails the build |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value or series point written longhand in content or in the `data/` prose that reaches a page, a `historical_literals` declaration that matches nothing in its own file, every planning document in `docs/` and its subdirectories referenced from the backlog, outstanding work tracked in the backlog. **Reports rather than fails** on a figure the data layer never recorded, comma-grouped or written with a scale word, under a ratchet whose count may not grow |
| `check-evidence.mjs` | Every metric whose value changed against `origin/main`, and every metric that is new, is declared in `data/evidence/` with a quote containing that value. A derived figure quotes its inputs and states the arithmetic instead. A series is evidenced **per array and per release**, carrying its vintage, its point count and a quote holding both ends; a move with no new release behind it needs a correction note, because an entry matched on vintage alone also matches every earlier state of the same edition. Gates the build. Needs the base branch fetched, and fails rather than skipping when it cannot see it |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN`, every table inside a focusable named scrolling region, every ARIA reference resolves, no two controls sharing a name, no two links sharing their text while going to different places, no link text that names nothing, robots rule under `User-agent: *`, and the published-figure counts match the refs in the built HTML exactly, in both directions, comments excluded at both ends |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |
| `check-releases.mjs` | Two halves. Whether a watched source has published a newer edition than the one each record **and series file** cites, per cited edition rather than per source, compared on the month and year in the URL. And whether a table declared in `table_reference` was corrected **inside** the cited edition, matched against the Home Office change history and raised only where the figure's own `retrieved_date` pre-dates the correction. Network; reports and never gates, and opens one deduplicated issue from `main` or the cron. A route that matches no document, or a page that answers with no change history at all, fails loudly rather than reading as quiet |
| `npm run a11y` | pa11y at WCAG2AA over every URL in `.pa11yci.json`. Fails the build |

CI also runs a **weekly cron**, because the time-based rules, the twelve-month claim expiry and
link rot, only fire if something runs.

**Read this before trusting a green run.** Eight times in this project a checker passed while a
real defect shipped. Every one had the same shape: the check verified a property of the *source
or the declaration* rather than the property a reader depends on, and the success message
claimed the latter. The seventh was the literal check walking `content/` and not `data/`, which
left the one file whose entire job is holding references as the only file nobody scanned for
values. **The eighth was found on 30 July and is the cleanest example of the shape:** the
literal scan matched prose against the values the site HOLDS, so a figure it never recorded was
invisible to it by construction, while the success message read "No page writes a comma-grouped
value longhand". Thirty-eight did. The messages now state only what they verify.

**The count is eight, and more of that shape have been caught since without being added to
it**, every one of them before it merged. They are under *Building a check, and trusting it*.
Eight is the number that SHIPPED, and that is the only test for joining the list: the eighth
qualified because it sat on `main` while thirty-eight figures contradicted it. Nothing is added
for being caught in review, because inflating the one figure this document uses to argue for
scepticism would make it worth less.

That second count used to be stated, as "three", and it went stale twice inside a week, the
last time in the same edit that added two more instances four sections below it. A count of
the near-misses earns nothing, because the argument does not rest on how many there were.

**pa11y is a floor, not a verdict, and CI says so.** It was negative-tested before being
believed: an isolated missing `lang` took it to 15/16 and named the rule, a failing contrast
value took it to 0/16. It flagged none of the five accessibility defects found by hand,
which is the point: it is a floor.

**Three known gaps are published** on the sources page under *What the checks do not establish*:
the prose one, the sub-100 review and the screen reader. Three more are candidates for a fourth
and none is on the page: that a figure the data layer never recorded is reported and never
refused, that a `historical_literals` exemption is granted on trust and nothing re-checks it, and
that a correction inside an edition is seen only where the publisher names its table by
identifier. The first is the one a reader is most affected by. Which, if any, earns the space is
an editorial decision in `docs/BACKLOG.md`, where the candidates are listed. Do not take the
count from here: this sentence said "four" while the backlog listed three candidates and the page
published three limits.

**What the audit changed in the apparatus, 31 July 2026.** Five checks were hardened, each
negative-tested in both directions:

- The evidence quote match is **boundary-anchored**. It was a bare substring test, so `24.9 billion`
  answered for `4.9` and `1,313` answered for `313`.
- `review_due` **fires when the date passes**. It was validated as a declaration and read by nothing,
  so the error message's own words, "when this page falls due", described a property no code asked
  about, and every page outside `content/claims/` could pass its date green.
- A **Nunjucks page must carry `last_reviewed`**. Only markdown did, while the README promised every
  page carried one.
- The **language rules and the glossary-link check reach `data/` prose**. The literal scan had been
  extended there and these two were left behind.
- **Neither validator now discards its findings** on a dateless series point or an unparseable URL.
  Both threw on exactly the malformed input they exist to report, after collecting errors and before
  printing them, so the one run with something useful to say printed a stack trace instead.

**One was written, tested and deliberately reverted**, and it is the most useful of the six.
Firing `check-evidence` on a regrade **into** the derived set works, and run against `main` it failed
immediately on the audit's own regrade of `asylum-administrative-outcomes`. It was reverted because
landing it turns the branch red until that record has an evidence entry, and the entry needs verbatim
quotes from a pivot nobody had opened. **The ordering is the lesson: fetch the source, write the
entry, then land the check.** The other way round forces a fabricated quote, which is the one thing
the evidence contract exists to prevent.

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
  anything. Six "failures" here were tests that never fired: two in an earlier session, a
  `perl` edit on 28 July whose pattern missed so a check "passed" against a file nobody had
  broken, a search string that did not match, and on 30 July a `perl` escape that left the file
  untouched while the run it "proved" exited zero. The cheap guard is to grep for the broken
  text and print the count before running anything, and it is what caught the fifth in the same
  minute it was made.

  **The sixth is the one that guard would have missed**, and it is worth the extra sentence. The
  edit applied, the grep confirmed it, and the test still proved nothing: it spaced one of two
  citations of the same record, so the record was still counted through the other page and the
  undercount the test existed to trigger never happened. Confirm the CONDITION, not only the
  edit. A probe that leaves a second path to the same answer tests the second path.

- **A scan of text is not a scan of what renders, and a comment is where the two part.** The
  published-figure scan matched a chart bar left inside a Nunjucks comment during a rework,
  counting a figure the render strips. Worse in the other syntax: a citation inside an HTML
  comment is rendered by `resolve-citations` INTO the comment, so the check at the far end found
  the ref in the built HTML and confirmed a figure no reader can see, and both ends agreed about
  something that was not there. Strip comments at every end that compares, or the agreement
  between them means nothing.

- **A suppression is the most dangerous code in a check, and it needs a test of its own.** The
  scale-word scan's duplicate guard was three lines, written so one figure could not be reported
  twice, and it silenced every figure written with no currency sign: not an error, not a
  warning, not a line in the report. The two controls running on every invocation could not have
  caught it, because both called the matcher and neither called the thing reading its output.
  Test what DECIDES, not only what parses, and treat `continue` in a scanner as the place to
  look first.

- **Negative-test the mechanism and the remedy, not only the check.** Four have failed here
  across three sessions, and not one of them was a check. `at()` returns the raw number, so a citation missing
  `| number` shipped `45537` to the built page with `npm run validate` and `npm run build`
  both green: no literal in the source for the longhand scan to find, and an unformatted
  integer is not `NaN`. Separately, the literal check told authors to declare a frozen figure
  under `historical_literals`, and that escape hatch was split on commas, so every
  comma-grouped value it existed to exempt was shredded into two junk exemptions. Three copies
  of it, and no content page had ever used one. Third, the series evidence check printed a
  fillable skeleton carrying `"vintage": null`, and null was the one value that would have made
  that block's exemption permanent, so the remedy handed the author the hole. Fourth, the
  scale-word report told an author to declare a figure under `historical_literals`, and doing
  exactly that failed the build, because the figure wraps across two lines in the source and the
  declaration check compared raw text. A check is only as
  good as the thing it points at and the thing it sits beside.

- **A figure computed against a citation is invisible to every check here.** It matches no
  record, so the longhand scan cannot see it, and it is not frozen history, so declaring it
  would be a lie that silences it for ever. Five sites of one such sentence were found on
  30 July, the fifth only by grepping after the other four were fixed. Drop it and give the
  reader both ends.

- **Reconcile a new record against a total the site already publishes**, not just against its
  own source. Both records minted on 30 July were confirmed that way: three nationality groups
  summing exactly to a published immigration total, and four entry methods summing to a figure
  the site already carried from a different publisher. Finding the number is not recognising it.

- **When your count disagrees with something the project independently says about the same
  thing, the disagreement is the check.** A query returned 74 published figures, which was every
  record; the handoff's own "a subset of those records reaches a reader" said that was wrong, and
  it was. The corrected answer was 45, but the per-publisher rows under it were still wrong, and the
  total agreed only because a missed renderer and a counted non-renderer cancelled. Agreement on
  a total is not agreement on its parts.

- **Find things the way that can show you are wrong, and compare two sets in BOTH directions.**
  Four figures held twice were found by matching equal values, which by construction can only
  find pairs that already agree; whether anything had already drifted needed a different query,
  and "they all agree" was not evidence until that query was run. The same shape in a check: the
  published-figure scan was verified against the built output one way only, which can find an
  overcount and never an undercount, and the undercount was the reachable one, because the
  scan's pattern was stricter than the renderer's. A citation written `{{ theme/id }}` with
  spaces would have reached a reader and been counted for nobody. Match what the RENDERER
  accepts, not what the source happens to say today.

- **Never truncate the thing you are checking for absence.** A finding that three claim cards
  were missing `period` and `source` was wrong: the check piped each front matter through
  `head -20` and those fields sit below the cut. Reporting a defect that does not exist costs
  more than missing one, because it makes every other finding worth re-checking.

- **A denylist needs a review pass, not a sweep.** Four of seven sub-100 matches were
  coincidences. Tokenising all of them would have cited the wrong record four times.

- **When a check matches a declaration to a record, interrogate the key it matches on. Three
  questions, asked of BOTH sides:** what does it do when it does not change, when it is absent,
  and when it is present but not the shape you assumed. Every answer has to leave the check
  still asking for something. Each question was learned by failing it:

  - *Unchanged.* Series evidence matched on the release vintage, so one entry also covered every
    earlier state of that edition and a fabricated middle point passed while the run reported it
    as declared.
  - *Absent.* The vintage is nullable, so null matched null and the first entry would have
    exempted that block for ever. The skeleton the error message printed supplied that null.
  - *Wrong shape.* A series clears a correction on `lastUpdated`, validated for presence and
    never through `isRealDate`. A prose date sorts above every ISO date, so it would have
    cleared for ever. Found by a second model, after absent and unchanged had been asked of both
    sides and malformed only of the side already covered.
  - *The other side.* A change-history entry with no timestamp gives an empty string, which
    compares as earlier than every date and would have silently cleared every figure behind it.

- **A second model has found the most serious defect in every piece of work it has read here, six times, and every time it was in the part the author was surest of.** On 30 July it found that a commit fixing an overclaim had shipped a wider one, that a fix documented as covering both directions covered one, that a runbook instruction would have let a wrong number sit permanently by naming a date bump as the job, that a paragraph whose declared purpose was stating a cost understated it by half, and that the scale-word scan's duplicate guard, three lines written to stop one figure being reported twice, silenced any figure carrying no currency sign at all, including the "£ dropped from £4.9 billion" slip this site has already shipped once. Two self-critiques had read that guard and seen only its precision. Budget for this rather than treating it as a last check.

  **The sixth reading is recorded rather than rounded up, because it changed the argument
  slightly.** The author had found its worst finding independently an hour earlier, the first
  time that has happened, and it still returned four more beside it, two of them serious. So the
  count is of pieces read, not of defects only a second model could have reached. It has never
  read one and found nothing.

  **Why self-critique does not substitute for it.** Two rounds of critique on the series
  evidence check found real defects and missed the one a fresh reviewer reproduced in a scratch
  clone within one pass. On the corrections watch, a self-critique found six things and missed
  that the series clearing key, `lastUpdated`, was the one date in the data layer reaching a
  comparison without passing `isRealDate`, so a prose date would have sorted above every ISO one
  and cleared every correction to that series for ever. Self-critique is weakest exactly where
  the author's model of the design is the thing at fault, which is where every one of these has
  been.

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

### Auditing, and auditing your own audit

Four practices the July 2026 audit paid for, all of them by getting it wrong first.

**Test the inference, not just the caveat.** A finding was raised as a blocker on the strength of a
publisher's note saying appeals data was not loaded for a release, inferring that the site's cohort
argument was therefore biased in its own favour. Opening the table refuted it: the historical cohorts
carry uplifts of 17 to 29 percentage points, so appeal outcomes plainly are reflected. **Reading a
caveat and assuming its direction is the same move this site exists to correct in others**, and it
took a deliberate test to catch, not a re-read.

**A fix lands at its own site and goes stale one reference away.** Every severity change and every
count correction during the audit landed cleanly where it was made and left exactly one remote
reference wrong: a downgrade left a "third blocker" sentence naming the downgraded finding, two line
numbers moved and only the action table followed, a page count changed and the CI step name did not.
**After changing a number or a label, grep for it before committing.** The rule already existed for
defects, under *Changing something without breaking something else*; it applies to your own edits.

**A count about your own work rots exactly as fast as one about the data.** The audit's summary table
miscounted its own findings, its launch list was headed "five items" above six, its second-model
tally enumerated twelve under a heading saying eleven, and its publication count was wrong twice. All
four were fixed by **deleting the count**, not by correcting it. The project already knows this about
`data/`; it is not a different rule for prose.

**Publish the command you ran, and run the command you published.** A fix replacing stale counts with
a derivation shipped `node -e "...expression"`, which prints nothing, while the document claimed the
query had been run and named its output. The query had been run, with `console.log`; the version
published lacked it. **A claim about a different artefact than the one shipped** is this project's
oldest defect, committed by the fix for it, in two files. Copy the command out of your terminal.

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
   one without the other. **Three claims now carry one**, all dated 27 July 2026, from
   corrections 1a and 1b. This entry said "No claim carries one, and the sources page says so"
   until 30 July, and both halves had become false. The page's sentence was removed in PR #61,
   so the contradiction is closed; this entry asserted it was still open for ten minutes after
   it was not.

Three entries that sat here until 30 July were not decisions taken at all. They were
outstanding editorial work, which the paragraph at the top of this document sends to the
backlog, and one of them had been false since the day it was written. They are now under
*Small editorial decisions waiting on the owner* in `docs/BACKLOG.md`, which is the list the
validator guards.

## Sibling projects

- `~/Projects/DEBT` is the UK Public Finances Explorer, Eleventy, same data-contract
  philosophy. Its `.pa11yci.json` and the `tabindex`/`role`/`aria-label` pattern on scrolling
  regions were ported here. Two further ideas from it are not taken and are worth considering:
  it groups nav items under `<details>` rather than listing them flat, and it scales the root
  font size (`html { font-size: 106.25% }`) where this project scales `body`, which is why
  `--measure` and the chart's `min-width` are pinned to 16px and do not grow with the type
  scale. Its `docs/UPDATING-DATA.md` was ported on 30 July 2026 and is now
  `docs/UPDATING-DATA.md` here, longer than the original because this data layer has an evidence
  contract and four series files that DEBT's does not.
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
| checks that passed while a real defect shipped | *The checking apparatus* |
| the three questions to ask of a matching key, on both sides | *Building a check* |
| that a second model has found the worst defect in every piece it has read | *Building a check* |
| that verification.txt covers ten pages and not sixteen | `docs/BACKLOG.md`, not here |
| that branches carry history `main` does not | *Where things stand* |
| which backlog item to take, and on what wording | `docs/BACKLOG.md`, not here |
| that a source naming a figure is not the source containing it | *Where things stand* |
| that a fix goes stale one reference away | *Auditing, and auditing your own audit* |
| that a count about your own work rots like any other | *Auditing, and auditing your own audit* |

**No count was added in this update**, deliberately. The three new rows are shape rules, which can be
worded differently in two places without costing anything. The moment one of them acquires a number,
it belongs in one file and a pointer in the other.

The last row is the one that bit. The prompt and this document should both use the backlog's
word rather than inventing a third.

**The table used to be incomplete while claiming not to be**, which was the trap in it: a dozen
copied rules carried numbers it did not track. The prompt was trimmed on 30 July for exactly that
reason. It now recites no incidents, only rules, and each rule names the handoff heading where
its incident lives, so the counts live in one place and the prompt points at them. Two counts
survive in it and both are in the table. Prose that agrees in substance can diverge in wording
without costing anything; a count cannot, which is why the trim was the fix rather than more
diligence about keeping two copies aligned.

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/BACKLOG.md first. It is the durable list of outstanding work.
Then read docs/HANDOFF.md for how the project works and what earlier
sessions cost. Then read the scope document for whatever you pick up,
and do not re-derive it.

This project has no CLAUDE.md of its own. Your global instructions at
~/.claude/CLAUDE.md load automatically.

The pre-publication review is done and its corrections landed.
verification.txt at the repo root is the review itself; it covers
Sections 1 to 7 and Parts 2.1 to 2.7, which is ten pages and not
sixteen, and that distinction settled the last_reviewed question. It
has since done more than that: a whole-project audit on 30 and 31 July
found its two worst defects on a page the review never opened, so treat
the six unreviewed pages as unreviewed rather than as fine.

That audit is open as PR #70 and written up in docs/PRE-LAUNCH-AUDIT.md.
It applied the mechanical half and left every editorial and sourcing
call. Read its actionable list before starting anything: each row says
whether a session can take it or whether it is mine. Do not re-derive
its findings, and do not trust its prose over a run.

Work is tagged [me] or [you], and the tags were written from the
SESSION's side, so they invert against the pronouns in this prompt. Use
the mapping, never the pronoun: [me] means a factual or mechanical change
against a cited source, which YOU do. [you] means an editorial or
sourcing call, which is MINE. Check it against the backlog the first time
you use it: correction 1a marks the owner's decision [you]. Getting this
backwards hands the editorial calls to you, which is the worst outcome
available here. Do the [me] parts; for a [you] part, propose and ask. On
a list that mixes both, do all the [me] work first and bring me the [you]
decisions in one batch, because the mechanical work usually determines
what the editorial question even is.

Still mine, not yours: recording the review as passed in CHANGELOG.md,
which is what is left of item 1; removing the robots rule, which comes
last and is launch; talking to five target users, which is the one open
acceptance criterion; and the audit's three launch gates, which the
backlog names at the top. Two are glossary rewrites and one re-sources a
record in a way that adds a publisher to sources.json. Do not treat any
of those as done, and do not write the glossary wording for me: propose
it and stop. The
backlog also carries editorial decisions waiting on me. Where an item is
gated on a decision of mine, that decision is written under the item, so
read it before assuming the item is yours to start.

TASK: unless I have told you otherwise in this message, work from the
actionable list in docs/PRE-LAUNCH-AUDIT.md. It is the live list while
the audit is open, its rows say Session or Owner, and the Session rows
are ordered by what launch needs. Take Session rows; bring me Owner rows
rather than starting them.

When the audit closes, that list empties into docs/BACKLOG.md and the
backlog becomes the live one again. Its rule then: take the first
UNFINISHED item, not the first unstarted one, since an item can have
phases built and still be first. Do not infer it from document order,
because the earlier items are mine or are launch; the backlog's own
preamble under "Scoped, not built" names which to take, and that sentence
is the instruction.

Read both preambles before deciding either way. Two lists exist only
while the audit is open, and this project has twice watched two lists
diverge, so if they disagree about what is outstanding, say so rather
than picking one.

Before you start, tell me which item you are taking and what you expect
to change. If it is larger than a session, say so and propose a split.
If the first unfinished item turns out to be wholly gated on decisions of
mine, do not stall and do not take them: bring me the decisions, and
start the [me] work on the next item that is not gated, saying which you
have moved to.

When you finish an item, mark it done in docs/BACKLOG.md with its PR and
a date, and move it to Completed when nothing is left of it. Do not
delete it. validate-content.mjs fails the build if a planning document
in docs/, or any subdirectory of it, is not referenced from the backlog,
or if the handoff stops pointing at it, so the list cannot quietly lose
things.

Rules this project has paid for. Each earned its place by failing first,
and the incident behind each one is in docs/HANDOFF.md under the heading
named beside it. Read those before you decide a rule does not apply to
what you are doing; the prompt states rules, the handoff is why.

- Every changed or new figure needs a fetched source and a verbatim quote
  BEFORE it is written. The quote goes in data/evidence/ and CI fails
  without it; the shape is in data/evidence/README.md. Go to the
  publisher's data tables, not its HTML bulletin. .ods and .xlsx are zip
  archives, so download and parse them rather than giving up when a fetch
  cannot read them. The Commons Library returns 403; go to the Home
  Office tables it cites. (Verifying a figure)
- Reconcile a new figure against a total the site already publishes, not
  only against its own source. Finding the number is not recognising it.
  (Verifying a figure)
- Confirming the figure you asked about is not the whole job. Do not
  merge over what a check reveals beside its target. (Verifying a figure)
- Check what this project has already published, or already enforces,
  before acting on outside advice or offering me an option. (Working with
  this project's own documents and rules)
- A source NAMING a figure is not the source CONTAINING it. Every check
  here verifies the first. Reading five publications during the July 2026
  audit found a headline figure whose cited report does not contain it, a
  phrase attributed to a publisher that it does not use, and a note
  reproducing wording a publisher had formally retracted. When you touch a
  record, open its source and find the number in it. (Where things stand)
- After changing a number or a label anywhere, GREP FOR IT before
  committing. Every such change during the audit landed correctly and left
  exactly one remote reference stale: a downgraded finding still called a
  blocker elsewhere, two line numbers that moved with only one table
  following, a page count corrected everywhere but the CI step name.
  (Auditing, and auditing your own audit)
- A count about your own work rots as fast as one about the data, and the
  fix is deleting it rather than correcting it again. (Auditing, and
  auditing your own audit)
- Publish the command you ran. A fix replacing typed counts with a
  derivation shipped one that printed nothing while the document claimed
  its output; the version run and the version published differed. Copy it
  out of your terminal. (Auditing, and auditing your own audit)
- A defect reported on one page usually has siblings. Grep the reasoning,
  not just the sentence, and grep the claim rather than the page.
  (Changing something without breaking something else)
- Anything you add must pass, and run these rather than assume:
  npm run validate, npm run build, npm run a11y, and npm run
  check-evidence if a figure changed. If you add a record, LOWER
  UNRECORDED_BASELINE in validate-content.mjs to the new count; a gap
  between the count and the baseline is that many new unrecorded figures
  that could arrive without failing anything. Raising it is a decision and
  is only ever right when a SCAN widened rather than the site: say which in
  the commit, and prove no page changed by diffing the built site.
- check-releases and check-sources are network checks that gate nothing,
  so run them by hand before opening a pull request: a record citing a
  superseded edition passes every other check green.
- Citation syntax differs by file type. Markdown uses {{theme/metric-id}};
  Nunjucks uses {% figure "theme/metric-id" %}, because {{ }} is Nunjucks'
  own expression syntax and would be evaluated as arithmetic, silently
  shipping NaN. A series point can only be cited inside a chart summary,
  with the at() filter, so a Markdown page needing one needs a metric
  declaring series_ref instead. (How the project works)
- Negative-test every new check, in BOTH directions, and confirm the
  break applied by grepping for the broken text and printing the count
  before believing the result. Then confirm the CONDITION fired, not only
  that the edit landed: a probe that leaves a second path to the same
  answer tests the second path. Negative-test the MECHANISM and the REMEDY
  too, not only the check: do what the failure message tells an author to
  do, and watch it work. Where a check matches a declaration against a
  record, ask three things of the key, on BOTH sides: what it does when
  it does not change, when it is absent, and when it is present but not
  the shape you assumed. Every answer has to leave the check still asking
  for something. (Building a check, and trusting it)
- A suppression needs a test of its own, and it is where to look first.
  Any line that decides NOT to report, a continue, an exemption, a
  de-duplication guard, can silence far more than it was written for, and
  a control that calls the matcher does not call the thing reading the
  matcher's output. Test what decides, not only what parses. (Building a
  check, and trusting it)
- If you match something the site renders, match what the RENDERER
  accepts, and strip comments first. A pattern stricter than the renderer
  disagrees with it in silence, and a citation inside a comment is
  rendered into that comment, so two scans blind to different text can
  confirm each other about a figure no reader sees. Compare two sets both
  ways: one direction finds only one kind of error. (Building a check, and
  trusting it)
- Have a second model read anything whose whole purpose is refusing bad
  input, before you believe your own critique of it. It has found the
  most serious defect in every piece of work it has read here, every time
  in the part the author was surest of. Budget for it rather than
  treating it as a last look. (Building a check, and trusting it)
- State what a check does NOT establish in its own success message.
  Eight times a checker here passed while a real defect shipped, every
  time because it verified the source or the declaration rather than the
  property a reader depends on. (The checking apparatus, and its limits)
- Read the built output, not the build. Several defects here were
  invisible to every green check and visible on the page. (Looking at the
  built page)
- If a change should not alter the output, prove it by diff. Copy _site
  to a scratch directory before, diff -r after. It is a stronger claim
  than reading the change, and it localises the changes you did mean.
  (Looking at the built page)
- Never truncate the thing you are checking for absence, and prefer the
  query that could show you are wrong over the one that confirms you.
  When your count disagrees with something the project independently
  says about the same thing, the disagreement is the check. (Building a
  check, and trusting it)
- No em-dashes, ever. Enforced by validate-content.mjs.
- Do not fix by bulk substitution. Sentence by sentence, in view.
- Scoping is not progress. Build the smallest real thing. (Deciding what
  to build)

Branch FIRST, before editing anything; this project works through PRs
even solo. Check main has not moved before you rewrite the handoff or the
backlog. Do not delete a branch: main's history is truncated at a
parentless commit and everything before PR #42 survives only on
history-to-pr-41 and design-and-a11y-rounds. The handoff says which and
why.

Stop and ask about anything that needs an editorial judgement rather
than a correction.
```

