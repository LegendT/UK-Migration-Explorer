# Handoff, 5 August 2026

State of UK Migration Explorer, and how it works. **Outstanding work is not in this document.**
It is in `docs/BACKLOG.md`, which is the durable list, because a handoff gets rewritten every
session and a rewrite is where work quietly falls out. This document carries the things that
stay true between sessions: how the project works, what checks it, what has been decided, and
what earlier sessions cost.

`validate-content.mjs` fails the build if this document stops pointing at `docs/BACKLOG.md`,
or if a planning document exists that the backlog does not reference.

## Start here

1. Read `docs/BACKLOG.md`. It is ordered; **take the first item its header says a session takes,
   and the header states that rule in one sentence.** It is not always an unstarted item: one can
   have phases built and still be the first, and the header turns on a word that has been misread
   before. Which item it is, and how far it has got, is the backlog's to say and not this
   document's.

   **It was consolidated on 4 August 2026, from 2,729 lines, so read it knowing the rule that was
   applied**: a closed entry keeps what it was, what was decided, the date and the pull request,
   and its reasoning stays in that pull request; an open entry keeps everything. **So a one-line
   entry is not a thin one.** If you need why a closed thing was done the way it was, open its pull
   request rather than concluding the file lost it. Nothing was deleted from The order and nothing
   was renumbered, so an "item N" pointer from any document still resolves.

   **And no entry names which item comes next.** The header's rule is the only thing that decides.
   Derive the item by walking the list against it and checking each candidate against the
   repository, which is usually one grep. A sentence that names the next item is a defect rather
   than an instruction, and *Working practices* carries what one cost.
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

- **Launch domain, decided 4 August 2026:** https://ukmigrationexplorer.org. It is what
  `site.url` holds, so canonical links, the sitemap and every citation block already print it.
  **Whether DNS points at the Netlify deploy yet is operational state and is deliberately not
  recorded here**, on the same reasoning as the branches two paragraphs down: check it rather
  than trust this line.
- **Deploy:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Working branch:** cut a new one from `main`. This project works through PRs even solo.

Deliberately not recorded here: which branches exist, what CI last did, what is on the remote.
That is operational state, it is discoverable in seconds, and a previous version of this
section was wrong within the hour because branches were tidied after it was written.

**One exception, and it is a trap rather than a fact about the project.** This working copy is a
**shallow clone**. Inside one, `git log` stops at a boundary commit, `git merge-base` can exit 1
between branches that do share history, and the whole thing reads as a truncated project with a
detached past. It is not. **The remote history is intact and `main` contains all of it.**

This document asserted the opposite for days, at length, and called it "structural rather than
operational". It said `main`'s root commit is `126a40a` with no parent, that everything through
PR #41 was a separate history with no common ancestor, and that it survived only on the branch
`history-to-pr-41`, which therefore must not be tidied away. Every part of that is the shallow
boundary seen from inside.

Four commands settle it, and the last needs the network because that is the point:

```
git rev-parse --is-shallow-repository      # true
cat .git/shallow                           # the boundary commits, whatever they are today
git cat-file -p 126a40a | grep ^parent     # two parents, in the local object
gh api repos/LegendT/UK-Migration-Explorer/compare/history-to-pr-41...main --jq .status
                                           # "ahead": main contains that branch
```

**The tell that should have caught it earlier is in the claim itself.** The paragraph named
`126a40a` as the parentless root and called that "checkable in one command and does not go stale".
It went stale: `git rev-list --max-parents=0 main` now answers `7598c83`, because a later fetch
moved the shallow boundary. A fact that moves when nothing about the project moved is a fact about
the observer.

**So: `git fetch --unshallow` before drawing any conclusion from git history here**, and treat
every merge base, "first commit" and branch-containment claim made inside a shallow clone as
unverified. Nothing needs preserving and no branch needs guarding.

The site's pages build from a governed data layer of metric records in theme files, plus time
series whose points are carried in blocks: a primary array, and companion blocks nested one
level deeper. **Which companions exist is `COMPANION_BLOCKS` in `lib/series.mjs` and not this
sentence**, which named two of the three until 2 August 2026 and so omitted the sixteen points in
`asylumBacklogTimeseries.json`'s `alternate_basis`, which is the undercount the paragraph below
warns about. **How many records, how many points, and how many of
the records reach a reader is what the run prints**, and this paragraph carried those numbers until
2 August 2026, when it was wrong about all three. Reaching a reader
means **rendering**: a token, a chart bar's `ref`, a `| metric` summary, a dashboard card or a
caveat in `data/`. A `figures:` front-matter entry is NOT a route, because nothing renders that
list, and counting it was the error that made the sources page's Home Office row wrong. **The
definition is code, not a paragraph:** `lib/published.mjs` holds those five routes, the sources
page renders from it, and `npm run build` prints the split, so do not hand-roll a query for it.

**And if you do query the series, go through `lib/series.mjs`.** A hand-rolled query that walks
only the primary array misses the companions and under-counts by a third. That happened three times
on 2 August: once recording a decision, once "verifying" the number afterwards with a grep whose
indentation was hard-coded to the shallower nesting, and once in a reviewer's own count. The second
of those would have corrected a right number to a wrong one. Eleventy 3, no client-side JavaScript,
charts rendered as inline SVG at build time. What is on each page is in `README.md`
under *Layout*, and was duplicated here line for line until 30 July, in a project whose first
rule is one figure, one home.

**A whole-project pre-launch audit ran on 30 and 31 July 2026** and merged as PR #70, written up
in `docs/PRE-LAUNCH-AUDIT.md`. Its outcome is a findings list, on the same principle as the review
before it. It applied the mechanical half and left every editorial and sourcing call. What is
outstanding from it is in `docs/BACKLOG.md`, not here and not in the audit: that document is a
frozen findings record as of 31 July, for the same reason `verification.txt` is.

**A launch readiness review ran on 2 August 2026**, PR #75, written up in
`docs/LAUNCH-READINESS-REVIEW.md`, a frozen findings record on the same terms as the two above.
Seven review dimensions ran in parallel and every finding was adversarially verified by an
independent pass told to refute it, which killed three of forty-seven; a far-end trace verified
all eight home page figures against their live sources with verbatim quotes; and a visual pass
measured the rendered pages rather than reading their markup. Its mechanical half landed with
the PR, including two reader-facing blockers no check could see: every line chart clipped its
y-axis labels into different plausible numbers, and a label a correction had retired survived
at four sites. Everything editorial went to the backlog, which the same PR consolidated:
**`docs/BACKLOG.md` now opens with *The order***, the single numbered list of everything
outstanding, and that list is the only place the sequence is stated.

**Then five independent critiques read the whole open stack on 2 August**, one per pull request,
each briefed on this section and told to verify against the repository rather than trust the pull
request body. Nineteen findings: sixteen upheld after checking each, **three rejected on evidence**,
which is the qualification worth carrying. A second model finding the most serious defect every
time is not the same claim as every finding being right, and reporting a defect that does not exist
makes every other finding worth re-checking. Two of the sixteen were live suppressions in checks
and both are closed. **Seven were a comment or a message asserting a property the code beside it did
not have**, written while fixing instances of exactly that.

**Both glossary launch gates closed on 2 August 2026, PR #83**, on wording the owner decided. The
Grant rate entry stopped quoting the cohort range altogether, which was what removed the fifth site
of a sentence corrected at four others; the option of correcting it in place would have left the
fifth site standing.

**A UX, SEO and trust review of the built site followed on 2 August 2026**, critiqued by two
independent passes. It found nothing that gated launch under the gate set of the day, and the
owner widened that set on 4 August 2026, so it does now. What it found is in
`docs/BACKLOG.md` under *From the UX review*, entry 6 in the order, in that file the format and
not here. One item touches a gate: the review argues the launch `robots.txt` should be WRITTEN
rather than only deleted, with a sitemap beside it, and the gate as worded says delete.

**The sitemap half of that is built, PR #86.** What remains of U1, and what the file should say,
is the backlog's to state, under the launch gate and U4. The same pull request gave every linkable section heading an
id, where two pages of seventeen had any before it. **Not every heading**, deliberately: the
transform skips the page `h1`, whose link is the URL, a heading inside a `<figcaption>`, whose
`<figure>` already carries an author-chosen id, and a derived id already taken on that page.

**That review left the site's navigation undecided, and the second round for it ran on 3 August
2026, PR #98.** Its only nav bullet had been filed under *considered and cut* and concerned a
horizontally scrolling nav; in its own words the wrapping was worked out "by calculation,
unrendered". **The lesson is about the method rather than the nav**: a review that reads markup and
calculates can miss what opening the page would show, which is the same shape as the six
absent-claims it already records against itself. Rendering all 17 pages at five real device sizes
proved the point twice over. The nav wraps to five rows at 320px, not the four that was calculated.
The stylesheet's one width-dependent nav rule is dead, being character-for-character the base rule
it appears to override. And **the costliest finding was not the nav at all**: 45% of every chart is
off-screen at 320px, and what sits in the hidden strip is the data the chart's own summary sentence
describes. A comment in `style.css` says the hidden strip holds the series labels. It was written
by calculation too.

**U6'S TWO COSTLIEST FINDINGS ARE BUILT, and both were the owner's call to make.** The navigation is a
`details` disclosure below 40em, PR #109, which took the header from 55% of the first screen at
320px to 19% and put every page's `h1` above the fold for the first time; it opens from a bar icon
that becomes a cross, so the control keeps the state the browser's triangle used to show. The chart
remedy is PR #113: each chart is drawn TWICE at build time, wide and narrow, and CSS shows one,
because SVG text is in viewBox units and the 32rem floor that keeps it legible on a desktop is the
same floor that pushed 45% of every chart off a phone. **The wide rendering is byte-identical to
what it was**, checked by script rather than by box metrics, which is the check that caught the
claim being false the first time it was made.

**A THIRD FINDING WAS NEVER ADDRESSED, AND BOTH THIS DOCUMENT AND THE BACKLOG RECORDED U6 AS
COMPLETE.** Seven tables overflowed at 320px, worst the Sources table at 42% hidden, and it
reproduced unchanged every time it was re-measured. It survived because the paragraph introducing
that findings
list named the chart remedy as "what is left of U6", and every later sentence, here and there, was
written against that summary rather than against the list. **The lesson is not about tables.** A
findings list where each entry gets a resolution marker as it lands can be audited by reading the
list; a prose sentence that says what is left cannot, and it is the one that gets believed. Do not
write "what is left is X" above a list that can answer the question itself.

**The finding itself is closed, PR #138**, by the same two-renderings shape as the charts: a
definition list below 40em, the table above it, and the first column's floor scoped to the
rendering it belongs to. Which of the seven still scroll, and by how much, is a measurement and
belongs in the backlog under U6 rather than here. This paragraph stays for the lesson above it.

**A1'S MECHANICAL HALF IS CLOSED, PR #116.** Batch 6 took the last three reserve records, one each
from the Commons Library, Skills for Care and the MAC, and all three cited a page that is not where
their figure lives, which is the fourth batch running to find that. The MAC record's notes quoted
four figures from a covering letter that carries none of them and an annual report that carries none
of them either; they are in the salary requirements review it announces. Skills for Care publishes no
non-British share at all, so a `provisional` grade was standing on a figure no publisher states, and
it is now `calculated` from the 69% British the report does print, reconciled against the two
components it prints for the same base.

**Both of this session's pull requests were read by a fable critic, both had a defect in them, and
the worse one was a correction that was itself false.** The NHS note was rewritten to say the doctors
and nurses shares are stated against a different base, on the strength of a search for "36%" and
"30%" in a briefing that prints "36.3%" and "30.0%". The search ran, the controls ran, and neither
could ever have matched. The note it replaced was right. That is now a practice under *Building a
check, and trusting it*, and it is the third distinct way a search here has produced a false absence.

**Both changes were audited by a second model afterwards and both audits found their worst defect in
the part that had been asserted most confidently.** The nav's "a right number in a wrong sentence
throws" tested co-occurrence, not predication. The chart's "all four enforced rules survive" was
false: the narrow legend told series apart by colour alone, because every series rule in `style.css`
is element-qualified to `path` and the swatch was emitted as a `<line>`, so it matched nothing and
SVG's initial stroke is `none`. Each was asserted in four places and true in none.

**And the fix that passed every number still had to be withdrawn.** The narrow chart first put its
value labels inside the plot; the series ran through them, a glyph halo cleared the line around the
digits and not between them, and the opaque box that did work then hid the 2012 to 2014 data behind
"200,000". Every gate was green for that version. The owner found it in a screenshot. The labels are
back outside the plot in PR #114, which removes the collision by construction and costs 90 units of
width. **PR #114 merged on 3 August 2026 and this paragraph did not go with it**, having been
committed after the merge, so it is landing a session late in the pull request that carries this
sentence. That is the incident under *Changing something without breaking something else*, and the
tense matters: written as "it reached `main`" this sentence asserted its own arrival while sitting
unmerged, which is the property the bullet there tells you to check rather than assume.

**And the sibling precedent was not what this document said it was.** The *Sibling projects*
section below records that `~/Projects/DEBT` groups nav items under `<details>`. Opening it found
that DEBT's mobile collapse is a JavaScript button revealed under a `.js` class, and its
`<details>` is a sub-menu device for items declaring `children`. Without JavaScript DEBT's nav
renders flat, exactly as this one does. `<details>` can still carry a whole nav with no
JavaScript; DEBT is just not the working precedent for it.

**Traceability at the far end is now being closed record by record, and the first batch landed on
3 August 2026, PR #99.** Sixteen reader-facing Home Office records were traced to primary tables,
and the ten entries already on file for that release were re-read at the same time, so 26 records
of that release are traced rather than 16. **It found a second instance of the defect the audit
found in July**: the small-boats calendar-year figure cited the data-tables index page, which
lists spreadsheets and contains no figures at all, and that link rendered on the home page. The
figure is published as a calendar-year total in table IER_01 and the record now cites it. That
also refuted the premise of an open backlog question about its grade, and left the same false
premise standing on its sibling peak record, where the grade is the owner's.

**The evidence contract gained two teeth the same day, PR #99 and PR #100.** `check-evidence` now
fires when a grade crosses the derived boundary in either direction at an unchanged value, which
was written and reverted on 31 July because landing it needed a fetch first. And **every entry
already on file that still names a record holding exactly its value is re-read on every run**,
where before an entry was matched when its figure moved and never asked again. That mattered
because the backfill writes entries for figures that are not moving: they were being declared once
and validated by nothing. An entry whose figure has since been renamed, dropped or revised is
history and is skipped, which is what stops a check forcing the audit trail to be deleted.

**The audit's section 4, the figures the data layer never recorded, is closed, which changes what a
session may assume.** It is named rather than numbered here because *The order* has an item 4 of
its own, the decisions that change what launch publishes, and the prompt sends a fresh session to
*The order* first. Whether that item is open is the backlog's to say and changes; that the two
fours are different things does not. Every figure written
longhand anywhere on this site is now held by a record or a series point, or declared as frozen
with its reason beside it, and the branch that used to report the exceptions refuses them. There
is no baseline constant any more. A new figure typed into a page fails the build.

Three things from the audit belong in this document because they change how the project should be read.

**The review covered ten pages of sixteen, and that now has a consequence.** Both of the audit's
blockers were in `content/glossary.md`, one of the six the review never opened, and both are
closed now. Two
independent passes reached it separately. That is not a fact about the glossary; it is what an
unreviewed page looks like when someone finally reads it.

**Traceability was never checked at the far end.** Every check verifies that a figure names a source.
Nothing verifies the source contains the figure. Reading five publications during the audit found
three defects: a record citing an NAO report that does not contain its value, a phrase attributed to
the Home Office that it does not use, and a note reproducing wording the NAO formally retracted by a
correction slip inside its own PDF. **All three are now corrected, and no automated check
closes the gap they came through**: nothing verifies that a source contains the figure citing it,
and nothing can, because it is a question about the far end of a link. **What closed it instead is
a pass done by hand, and A1's [me] half finished on 3 August 2026**: every record in the data layer
now carries an entry in `data/evidence/` naming a source and quoting it, except the handful earlier
batches referred to the owner as sourcing or naming calls. Six batches, by publisher. **What is
left of A1 is those calls and nothing mechanical**, and which they are is the backlog's to say.

**Every batch found more of the same defect, including the last one**, which is the argument for
the pass rather than its by-product: a small-boats figure citing an index page holding no figures; a record naming a table
that does not carry its figure; three records rounding to what their source printed while a Home
Office table printed the figure exactly; and the OBR lifetime contribution, which was the age-80
point of a chart whose age nobody had written down. **Only that last one moved a published value**,
to age 82, the life expectancy OBR itself states.

**An entry establishes that a quoted source states the value. It does not establish that the
sentence around the figure describes it correctly**, which is the pre-publication review's job, and
`npm run validate` says so on every run. `£2.1 billion` was the clearest case. It is
real and official, it lives in the Home Office Annual Report and Accounts, and it named an NAO report
that does not contain it from this site's first research pass until 1 August 2026, while every check
passed. An earlier version of this sentence said "for over a year", which is not possible: the NAO
report it wrongly named was published in December 2025.

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
figures held both as a metric and as a series point declare `series_ref`, so a release
cannot revise one and leave the other, and `lib/series.mjs` is the single home for the series
names, so a template's `series.flows` and a record's `flows@2025` cannot come to mean
different things. **How many declare it is what the data layer says**, and this sentence carried
the number until 2 August 2026, when six more were added in one day and it read "five".
Reasoning in `docs/SERIES-CITATIONS.md`.

**Which means the same remedy costs differently depending on where the sentence lives, and that
is worth knowing before choosing it.** A Nunjucks chart note or summary can cite a series point
directly through `at()`, so replacing typed figures there is free. **A markdown page cannot cite
a series point at all**, so every figure needs a metric declaring `series_ref` first: on 2 August
one rewritten sentence on a claim page cost five new records, and the identical sentence on a
theme page cost none.

**Charts cite records too.** A bar carries `ref`, not `value`, and the shortcode throws on a
literal value or an unknown ref.

**A token renders the formatted value only.** Units are prose: `%` attaches, `£` prefixes,
`people` follows. The validator checks the author supplied them, in both syntaxes.

**A record holds a figure's VALUE and not its PRECISION**, which is a real limit of the contract
and not a detail. The Home Office prints hotel spending for 2023-24 as "£3.0 billion". A record
can only hold `3`, and `check-evidence` refuses a quote saying "3.0" as evidence for `3`, because
it cannot tell that from "3" inside "3.4" and the same guard is what stops `1,313` answering for
`313`. So a published trailing zero cannot be recorded without either losing what the publisher
chose to convey or writing a quote the source does not contain. That figure stays as prose.

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
being typed. `heading-anchors` turns `{#id}` syntax into real ids, and derives one from the
heading's own text where none is declared, skipping the `h1` and any heading inside a
`<figcaption>`. **That syntax was never available on a Nunjucks page**, which is why the theme
pages had no anchors at all: `{#` opens a Nunjucks comment, so an anchor written the markdown
way into a theme page fails the build with "expected end of comment, got end of file".
`table-captions` lifts a `{caption}`
paragraph into the `<caption>` of the table below it, and throws when a marker matches no table,
because markdown has no caption syntax and a stray marker would ship as visible text.
`scrollable-regions` then wraps any
unwrapped table and gives every scrolling box a `tabindex`, a role and a name taken from its
caption or the heading above it. Run the last before `heading-anchors` and a heading still carrying
its `{#id}` names the region, shipping raw syntax inside an `aria-label`, where nothing on the
page shows it. `check-build` caught exactly that.

## The checking apparatus, and its limits

Every one runs in CI and every one was negative-tested, with one exception named in its own row:
the half of `check-backlog.mjs` that asks whether a cited pull request is merged needs the network
and runs in no workflow, in any mode. **The number of them is deliberately not written here.**
It said seven while there were eight, and the README was wrong twice over, saying six scripts
where there were seven and seven checks where there were eight, all until 4 August 2026: a
count of our own work, in two files, going stale in the
section about checking.

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, every figure linked to its catalogue entry, a citation's `source_url` and `source_id` naming the same publisher, a theme file's `lastUpdated` keeping up with its newest record, single-vintage series, a metric declaring a `series_ref` agrees with the point it names on value, unit, confidence level and year, every point in a series block carrying one confidence level, `ons_marker` drawn from a fixed vocabulary, a theme file's `lastUpdated` present and a real date, a figure naming a publisher table in its own prose declares it in `table_reference`, figures overdue against their source's cycle, `DO NOT PUBLISH` flag fails the build. **Reports rather than fails** on a record whose `notes` restate another record's value, naming both, because nothing keeps those two in step |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value or series point written longhand in content or in the `data/` prose that reaches a page, a `historical_literals` declaration that matches nothing in its own file, every planning document in `docs/` and its subdirectories referenced from the backlog, outstanding work tracked in the backlog. **Fails** on a figure the data layer never recorded, comma-grouped or written with a scale word, since 2 August 2026, having run at report level under a ratchet from 38 down to zero, and names every declared literal that does equal a live value |
| `check-evidence.mjs` | Every metric whose value changed against `origin/main`, every metric that is new, and since 3 August 2026 every metric whose `confidence_level` crosses the derived boundary in either direction at an unchanged value, is declared in `data/evidence/` with a quote containing that value. **Also since 3 August 2026, every entry on file naming a record that still holds exactly its value is re-read on every run**, because the base-branch comparison asks only about figures that moved; an entry whose figure has since moved is history and is skipped, which is what stops a check forcing the audit trail to be deleted. **And since 4 August 2026 `previous_value` is asked of every claim a branch adds**, keyed on ref with that field and the published value, because the base-branch loop reads it only for a figure that moved and so never reached a backfill. A derived figure quotes its inputs and states the arithmetic instead. A series is evidenced **per array and per release**, carrying its vintage, its point count and a quote holding both ends; a move with no new release behind it needs a correction note, because an entry matched on vintage alone also matches every earlier state of the same edition. Gates the build. Needs the base branch fetched, and fails rather than skipping when it cannot see it |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN`, every table inside a focusable named scrolling region, every ARIA reference resolves, no id on two elements, no two controls sharing a name, no two links sharing their text while going to different places, no link text that names nothing, robots rule under `User-agent: *`, `sitemap.xml` holding exactly the built pages other than the 404, compared in both directions, and the published-figure counts match the refs in the built HTML exactly, in both directions, comments excluded at both ends, **a link written with this site's own origin resolves like a relative one**, and **the domain the print stylesheet writes by hand matches `site.url`** |
| `check-sources.mjs` | Every source URL still resolves, the data-layer citations and the external links written in page prose alike. The two parliamentary hosts that 403 every request Node's `fetch` makes go through `curl` over HTTP/1.1, where the same browser headers return 200 and an invalid path returns 404. **A 403 or a 429 from any host is reported as uncheckable rather than broken**, because a refusal is not a dead page and which hosts refuse depends on where the run happens: those two answer a laptop and refuse a GitHub runner, which is how CI came to report two live OBR links as dead on every run (network; runs in CI with `continue-on-error`) |
| `check-pipeline.mjs` | That `npm run validate`, `.github/workflows/validate-data.yml` and `scripts/` name the same checks, measured against one manifest in that script, including which CI steps carry `continue-on-error`. `local: true` with `ci: false` is refused outright. Says nothing about whether a red job blocks a merge, which is still a habit |
| `check-releases.mjs` | Two halves. Whether a watched source has published a newer edition than the one each record **and series file** cites, per cited edition rather than per source, compared on the month and year in the URL. And whether a table declared in `table_reference` was corrected **inside** the cited edition, matched against the Home Office change history and raised only where the figure's own `retrieved_date` pre-dates the correction. Network; reports and never gates, and opens one deduplicated issue from `main` or the cron. A route that matches no document, or a page that answers with no change history at all, fails loudly rather than reading as quiet |
| `check-backlog.mjs` | `docs/BACKLOG.md` itself, which directed all the work and was the one thing nothing read: paths exist, cross-references resolve, The order is contiguously numbered, every item carries a tag or says it is closed, and no item in The order writes a count of this project's own state. `npm run check-backlog` adds the network half |
| `npm run a11y` | pa11y at WCAG2AA over every URL in `.pa11yci.json`. Fails the build |

CI also runs a **weekly cron**, because the time-based rules, the twelve-month claim expiry and
link rot, only fire if something runs.

**Read this before trusting a green run.** Repeatedly in this project a checker has passed while a
real defect shipped. Every one had the same shape: the check verified a property of the *source
or the declaration* rather than the property a reader depends on, and the success message
claimed the latter. One was the literal check walking `content/` and not `data/`, which
left the one file whose entire job is holding references as the only file nobody scanned for
values. The cleanest example of the shape: the
literal scan matched prose against the values the site HOLDS, so a figure it never recorded was
invisible to it by construction, while the success message read "No page writes a comma-grouped
value longhand". Thirty-eight did. **The most expensive one reached a reader**: a headline figure
cited an NAO report that does not contain it, on the home page, for as long as the site has had
that figure, while `README.md` promised every figure was traceable to a named official
publication. Traceability was verified as a source EXISTING, never as the source CONTAINING the
number. The messages now state only what they verify.

**The count is deliberately not written here**, and `README.md` retired it first, for the reason
this document gives about every other self-count. It was eight, then nine, and a number that only
goes up is one more thing to keep correct; the argument does not rest on how many there were. The
test for whether an incident belongs in this paragraph is unchanged and worth keeping: it has to
have SHIPPED. More of the shape are caught in review every session, they are under *Building a
check, and trusting it*, and none is added here, because inflating the figure this document uses
to argue for scepticism would make it worth less.

**pa11y is a floor, not a verdict, and CI says so.** It was negative-tested before being
believed: an isolated missing `lang` took it to 15/16 and named the rule, a failing contrast
value took it to 0/16. It flagged none of the five accessibility defects found by hand,
which is the point: it is a floor.

**Known gaps are published** on the sources page under *What the checks do not establish*, and
that page is the list. Candidates for more are in `docs/BACKLOG.md`, and which, if any, earns the
space is an editorial decision there. Do not take a count or an enumeration from here: this
sentence has now miscounted the page twice in opposite directions, saying "four" against three
and then "three" against five, the second time in a session that had itself added two of them. **One candidate was withdrawn on 2 August 2026 by being fixed rather
than disclosed**: that a figure the data layer never recorded is reported and never refused. It is
refused now, so there is no limit to publish. What is left unscanned is narrower and the backlog
says what it is.

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

**One was written, tested and deliberately reverted**, and it was the most useful of the six.
Firing `check-evidence` on a regrade **into** the derived set works, and run against `main` it failed
immediately on the audit's own regrade of `asylum-administrative-outcomes`. It was reverted because
landing it turned the branch red until that record had an evidence entry, and the entry needed
verbatim quotes from a pivot nobody had opened. **The ordering is the lesson: fetch the source, write
the entry, then land the check.** The other way round forces a fabricated quote, which is the one
thing the evidence contract exists to prevent. **That is exactly what happened on 3 August 2026,
PR #99**: the Asy_D02 pivot was opened, the entry written, and the check landed in the same pull
request, widened to both directions. So this paragraph records an ordering that was followed, not a
gap that is still open.

**What the launch readiness review changed in the apparatus, 2 August 2026.** Each addition
negative-tested at the thing that decides, not only the thing that parses:

- **A citation's `source_url` and `source_id` must resolve to the same publisher host**, on
  records and on every series point against its envelope. Each half was checked against the
  catalogue alone, so a record pairing one publisher's id with another's URL passed both, and
  `check-releases.mjs` would have filed that URL's edition under the wrong publisher's watch.
  Host equality is the strongest tie available; same-host gov.uk mismatches stay invisible to
  it by construction, and the check does not claim otherwise.
- **A theme file's `lastUpdated` may not predate the newest `retrieved_date` inside it.** The
  check caught `fiscal.json` four days behind on the day it was written, the same slip the
  audit had fixed by hand the week before, which is what a fix without its check half does.
- **The `number` filter throws on null, undefined and NaN** rather than rendering an invisible
  blank: a range record's deliberate null or a typoed property in a chart summary shipped as an
  empty gap in a sentence with every check green, because a blank is not NaN and leaves no
  literal behind for any scan to find.
- **`check-sources` reads external links written in page prose**, markdown links and raw hrefs,
  recursively through `content/`. Nothing collected them while `check-build`'s closing line
  pointed at this script as the external-link answer, on a site whose trust model is "click the
  source".
- **The theme-file list has one home in `lib/series.mjs`**, imported by all seven consumers. It
  was defined identically in seven files and only `validate-data.mjs` enforced registration,
  against its own copy, so a fifth theme file would have shipped past the evidence gate silently.
- **Four scans were corrected to match what they model**: the `at()` gate accepts a quoted year
  the way the filter does, the stray-syntax scan catches a malformed anchor the transform cannot
  resolve, the chart `sourceUrl` collector accepts both quote styles, and `published-counts`
  renders an honest zero for a cadenced source instead of misdiagnosing the key as illegal.

## Working practices that earned their place

Grouped, because there are more than two dozen and a flat list gets read as far as the fifth
item. That applies inside a group as well as across them, so prefer sharpening a bullet that
is already here to adding a neighbour beside it.

### Verifying a figure

- **"I could not find it" is a claim about your search, not about the thing.** On 5 August 2026 a
  session reported that a settled piece of wording did not exist and was told to VERIFY rather than
  report. Doing that properly meant naming the stores rather than searching harder, with a control
  in each that had to return a hit before a zero was believed: `git log -S` across **all** branches;
  every pull request body, every pull request and issue comment and every issue, through `gh api`;
  all 47 dangling objects from `git fsck --lost-found`, read with `git cat-file -p`; `.history/`;
  and the stash. Every hit turned out to be either the entry that CLAIMED the wording was drafted
  or the session's own commits and intermediate blobs.

  The answer was better than the report it replaced: the phrase "drafted in the session record"
  pointed at a chat transcript in no artefact this repository can reach. **Name the stores you
  swept and the control you ran in each**, because a zero from a search that could not have
  succeeded reads exactly like a zero from one that could, and the store list is the part the owner
  can correct.

- **Open the primary table, not the summary page.** Three figures in the review corrections did
  not exist on any HTML bulletin: the 5,931 administrative outcomes, the cohort grant rates, and
  the asylum-specific appeal figures. Worse, two site figures looked *wrong* against the bulletin
  and were right: it prints 39% allowed and 61 weeks for the whole immigration chamber, while
  tables FIA_3 and T_3 give 40% and 67 weeks for asylum and protection. Believing the bulletin
  would have introduced two errors while "correcting" them. The `.ods` and `.xlsx` files are zip
  archives; unzip and parse the sheet XML directly.

  **And a superlative is a claim about a whole column, so read the column.** On 2 August 2026 the
  ONS bulletin called two figures a "peak" and both site sentences say "the highest twelve-month
  estimate ONS publishes". Those are different claims: the first is the publisher describing its
  own release, the second is a maximum. Table 1 settled it, each being the largest of 55
  year-ending periods and uniquely so, and the bulletin could not have. This is the same shape as
  the absolute negative below, in the other direction: a superlative and an absolute are both
  claims about everything you did not look at.

- **An absolute negative about a publication is a claim, and it needs a search designed to refute
  it.** "The 2025-26 annual report publishes no hotel spending figure at all" was written into a
  record, the changelog and the backlog on 1 August 2026 after a search for hotel money. It is
  false: page 218 carries a £22.9m constructive loss on a hotel contract. One disclosure defeats
  an absolute, and the substance survived only because the useful claim was narrower all along,
  that there is no hotel spending TOTAL, no per-day rate and no unit cost to update the figure
  from. Write the narrow claim, and before writing any "no X at all", spend one search actively
  trying to find an X. This is the same discipline as *Test the inference, not just the caveat*
  below, applied to your own sentence.

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

  **Do not type the quote either, generate it.** Writing evidence in bulk, download the sources
  first and have a script lift each quote out of them: the sentence from the fetched page text,
  or the cell with its row and column labels as `data/evidence/README.md` asks. Give the script a
  hard assertion per figure comparing the cell it read against the record's value, so a wrong row
  or column label throws rather than producing a plausible quote, and run every quote through a
  copy of the check's own `carries()` matcher before writing the file. Sixteen entries were built
  that way on 3 August 2026 and all sixteen passed first time; all twenty quotes were then
  re-checked by a second independent path and none had drifted.

  **Assert the LABEL, not only the value.** A generator that checks "this number appears somewhere
  in the document" accepts a wrong row silently and produces a quote that reads perfectly. Three
  quotes from the Home Office accounts were built that way later the same day and had to be rebuilt
  with the row label lifted off the page and asserted against it. Where a table prints the same
  figure in two columns, name both rather than picking one without saying so. **This matters more than it looks
  because of what the check does NOT do**: since PR #100 it re-reads every entry on file on every
  run, so a backfilled entry is checked for shape the moment it is written, but nothing re-fetches
  anything. A quote that is well formed and wrong passes for as long as the figure holds. **This
  sentence said the entry was "validated by nothing" until 3 August 2026**, which stopped being
  true earlier the same day, two sections above where it sits.

- **A source that will not fetch is rarely unfetchable, and three routes are worth trying before
  writing that down.** Cloudflare refuses a bare `curl` on Parliament's hosts and returns 200 to
  the four fetch-metadata headers a browser sends: `Sec-Fetch-Dest: document`, `-Mode: navigate`,
  `-Site: none`, `-User: ?1`, with a browser User-Agent and `--http1.1`. A publisher download that
  returns "No Access" may be one broken entry rather than a bot filter: OBR's chapter 4 refused a
  script AND a real browser while chapters 2 and 3 and every whole-report pack returned their
  spreadsheets, and the zip of all chapters contained the file. And there are two independent
  browser routes here, which fail separately: `claude-in-chrome` needs a Chrome extension and is
  not an MCP server, while the `chrome-devtools` MCP server drives its own Chrome and needs none.
  A file was reported blocked on 3 August 2026 after two failed calls on the first while the second
  had been connected all along. `claude mcp list` settles which exist.

- **A stored "all reviewed" note is a declaration, not a check, and it ages.** The README
  recorded the fourteen sub-100 warnings as reviewed and all coincidences. Checking each
  again in context found three that were not: the refused-asylum grant and appeal rates and
  the born-abroad Census share were live metric values restated longhand beside the very
  tokens that already cited them, one release from contradicting themselves. Re-derive the
  per-item property; do not trust a summary of it, least of all one that says everything is
  fine.

### Building a check, and trusting it

- **A guard asking "have I already done this?" fails OPEN if it matches an exact attribute
  value.** On 5 August 2026 the `scrollable-regions` transform wrapped a table that was already
  wrapped, because it tests for `class="scroll-x"` up to the closing quote and the wrapper had been
  given a second class for a responsive toggle. So it means "wrapped AND styled in exactly one
  way", not "wrapped". The result was a scrolling region nested inside a scrolling region: two
  boxes, the shadow affordance painted twice, and a second focusable stop for a keyboard user.
  **`npm run build` passed, its own scroll-region assertions passed, and pa11y passed 20 of 20.**
  It was found by counting `class="scroll-x"` in the built HTML and getting four where the page has
  three tables.

  **The checker was blind the same way, in two more places.** `check-build.mjs` matches
  `<div class="scroll-x"` identically in both its assertions, so a region carrying any extra class
  escapes the focusable check, the role check and the accessible-name check, all three, silently.
  Four patterns across a transform and its verifier shared one assumption, which is why neither
  could catch the other. Hardening them is open under A5; the shipped work put its class on an
  outer div instead.

  **The general rule: before adding a class, id or attribute to anything, grep the repo for that
  marker and read every pattern that matches it**, not only the one you are editing. A guard that
  fails open has no error message, and its symptom is duplicated structure that renders almost
  correctly.

- **`npm run validate` passing does not mean the site builds.** Nothing in validate renders a
  template, which its own output says. On 5 August 2026 a nunjucks comment was written inside a
  shortcode's argument object, where nunjucks parses an expression rather than template body:
  validate passed and `npm run build` failed with `unexpected token: #`. That is why the prompt
  says run all four every time rather than treating the first green as clearance.

- **Probe a check; never trust reading it.** Before wiring one in, write the strings it MUST catch
  and the strings it must IGNORE, and assert them. On 3 August 2026 `check-backlog.mjs` was written
  to catch a count of this project's own state in the backlog's live list, and **as first written it
  would have passed the exact sentence it exists to catch**: its lookbehind excluded a preceding
  digit and not a preceding letter, so "U5 records what was considered" matched with `records` as a
  verb, and its noun had to sit beside the number while the defect had two words in between. An
  outside model then found six more by probing, including an escape clause, `/\bclosed\b|\bDONE\b/i`
  over a whole item, that any item saying "the [me] half is done" satisfied. Six items said exactly
  that, so their tags were unenforced. **Take the must-ignore cases from the real file**: verbs
  sharing a noun's spelling, table identifiers, years, pull request numbers. **And give an escape
  clause the same treatment as the rule**, because ordinary prose will trigger a loose one.

- **"In `npm run validate`" and "in CI" are different claims here, and "blocks a merge" is a third.**
  `.github/workflows/validate-data.yml` invokes each script directly and never runs that npm script,
  so a check added only to `validate` ran on a laptop and gated nothing. That happened to
  `check-backlog.mjs` between it being written and a CI step being added minutes later. **The first
  two claims are now one**, checked by `scripts/check-pipeline.mjs` on 4 August 2026: the two lists
  and `scripts/` are measured against a manifest, and a check declared local and not CI is refused.
  Confirm a step from the run log rather than the file where it matters:
  `gh run view <id> --job <id> --log | grep <step name>`. **The third changed on 4 August 2026 and is now true.
  `main` is protected**: `validate` is a required status check, `enforce_admins` is on so it binds
  the owner too, and force pushes and deletions are off. Probed rather than read, a direct push
  being refused with `GH006, Required status check "validate" is expected`. So "this gates a pull
  request" in `docs/BACKLOG.md` now means what it says. **This paragraph said the opposite until the
  day the protection landed**, and `scripts/check-pipeline.mjs` printed the same false sentence on
  every run for hours after it stopped being true, which is what a claim about your own
  infrastructure does when nothing re-derives it.
  **And read the log of the two continue-on-error steps rather than the green tick**: they report and
  never gate, so a finding there survives until a person reads it, which is how CI called two live
  OBR links dead on every run for weeks.

- **A check driven by a hand-written list passes by omission, and the pass message is the tell.**
  `.pa11yci.json` holds its URLs by hand and does not follow `sitemap.xml`. On 4 August 2026 a new
  claim page was added and `npm run a11y` reported `17/17 URLs passed` with that page absent from
  the list, while `npm run build` said 18 pages in the same run and nothing compared the two. It
  repeated on the next two pages. **Read the count in the pass line against the count the build
  printed**, treat a mismatch as a failure, and update the list in the same commit as the page.
  This is the same family as the two bullets above: the check ran honestly, over the wrong set.

- **Reproduce a backlog bullet's premise before building what it prescribes.** The bullet is usually
  right that something is broken and often wrong about the remedy, and building the remedy ships a
  change that reads as a fix in the diff. Two of A3's three on 4 August 2026: "add `previous_value`
  to the audit pass" cannot work, because forbidding `null` there fails the next genuinely new
  figure the moment its own pull request merges; and "add the four `Sec-Fetch` headers" changed
  nothing, because Node's `fetch` is refused whatever headers it sends and `--http1.1` was the
  variable. Record what it turned out to be, in the bullet as well as the PR: the next bullet is
  written by the same hand.

- **A figure can verify to the digit and still name the wrong denominator**, which on this site is
  the error the site exists to correct. A claim page says "between a fifth and a half of each cohort
  had not ended in a grant", and still did on 4 August 2026 when this was measured. Every digit checked against `Asy_04`: the latest
  grant rate runs 50% for 2010 to 80% for 2020, so the complement is 19.9% to 50.0%, a fifth to a
  half exactly. But that rate is grants over grants-plus-refusals and excludes withdrawals,
  administrative outcomes and outcomes not yet known; against the cohort as a reader hears it the
  share runs 35% to 55%. **Recompute the rate from the primary table's own rows and check what the
  publisher divided by**, rather than checking the digits against a bulletin sentence.

- **Negative-test every new check**, and confirm the break actually applied before concluding
  anything. Six "failures" here were tests that never fired: two in an earlier session, a
  `perl` edit on 28 July whose pattern missed so a check "passed" against a file nobody had
  broken, a search string that did not match, and on 30 July a `perl` escape that left the file
  untouched while the run it "proved" exited zero. The cheap guard is to grep for the broken
  text and print the count before running anything, and it is what caught the fifth in the same
  minute it was made.

  **The same failure one level down: a SEARCH that never ran.** On 3 August 2026 three greps
  reported nothing because zsh expands `--include=*.md` before grep sees it and aborts the whole
  command, printing `no matches found` where a clean search prints nothing at all. Chained after
  `&&`, or followed by an unconditional "nothing above means clean", the two are
  indistinguishable, and two of the three were checking for stale references immediately before a
  commit. The same shape skipped an `unzip`, so a search for a figure "in the workbook" searched an
  empty directory and returned zero. **Quote the glob, and prove the search with a control**:
  searching a workbook for `5931` returned zero and so did the control `79719`, which is what
  showed that the search rather than the file was empty.

  **And a control in the same WRONG FORM comes back clean too, which is the third way.** On
  3 August 2026 a briefing was searched for `36%` and `30%` to check a record's note. Both returned
  nothing, the absence was believed, and the note was "corrected" into a false claim that reached a
  pull request. The briefing prints **"Overall, 21.3% of staff report a nationality other than
  British. For doctors this figure is 36.3%, and for nurses it is 30.0%"**: one sentence, one base,
  and a form the search was never going to match. Publishers round differently in prose and in
  tables, and this repository has already met `£520-710 million` for `£520m`, `-2900` for `2,900`
  and `10.7 million` for `10,738,000`. **Search the stem and read the hits**, `36` rather than
  `36%`, and take the control from a DIFFERENT figure you have seen with your own eyes in that same
  document. The rule above proves a search RAN; only this one proves it could have matched.

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

- **A guard may only skip work another branch has ACTUALLY done, so it must ask that branch's
  question too.** The scale-word scan skipped a figure on the premise that the unit scan above had
  already reported the sentence. That scan reports only where the value is NOT declared, and the
  guard never consulted the exemption list, so a declared value written with a scale word vanished
  from every branch at once. Two rounds of work on that guard, including one that widened it, read
  the premise as true because it is written in the comment beside it. **Write a suppression's
  premise down, then test each clause of it separately.**

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

- **A property checked on one page is a claim about that page.** A UX review on 2 August asserted
  six things absent from the site, and most were present on pages it had not opened: a per-page
  currency line in every footer, ids on every chart figure, a checked date on the claims index.
  The build prints how many pages the site has, and the scan that answers a question about all of
  them has to read all of them. This is the same error as truncating a file, one level up.

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
  more than missing one, because it makes every other finding worth re-checking. **The same rule
  reversed on 2 August 2026**: a series note was declared free of a restated marker after reading
  its last 200 characters, and the marker was earlier in it, so a PR shipped saying it had made a
  field the single home of something while a prose copy survived. Truncating to check for PRESENCE
  fails the same way, and a second model found it.

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

- **A second model has found the most serious defect in every piece of work it has read here, and every time it was in the part the author was surest of. It is also wrong about roughly one finding in six, so verify each before acting.** Of nineteen findings across five reviewers on 2 August 2026, sixteen survived checking and three did not, and one of the three was a record note called unsourced whose sentence is near-verbatim on the publisher's page. **The two readings on 31 July and 1 August are the sharpest evidence yet, because both pieces were corrections of a misattribution and both had committed one.** In the grant-rate work it found that widening a cohort window to the publisher's own 2007 had made the record attribute that range to `Asy_04`, a table titled "2010 to 2024" which cannot show a 2007 cohort: the project's signature defect, committed by the fix for it, and invisible to every check. In the hotel re-source it found four false claims, including an absolute negative ("publishes no hotel spending figure at all") defeated by a single £22.9m disclosure, a page count off by one, a correction slip described as touching a heading when it changed audited figures, and "for over a year" about a report published eight months earlier. In both it found the same structural miss: the fix had been applied at the site named and not at its siblings, leaving a false attribution in `docs/foundation.md` and `CHANGELOG.md` the first time, and the home page card still pointing at the wrong publisher the second. On 30 July it found that a commit fixing an overclaim had shipped a wider one, that a fix documented as covering both directions covered one, that a runbook instruction would have let a wrong number sit permanently by naming a date bump as the job, that a paragraph whose declared purpose was stating a cost understated it by half, and that the scale-word scan's duplicate guard, three lines written to stop one figure being reported twice, silenced any figure carrying no currency sign at all, including the "£ dropped from £4.9 billion" slip this site has already shipped once. Two self-critiques had read that guard and seen only its precision. Budget for this rather than treating it as a last check.

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

- **A search can lie a fourth way: the file is binary.** `lib/citation.mjs` was written with a
  literal NUL byte as a deduplication key's separator. Git called the file binary and printed
  `Bin 0 -> 7710 bytes`, so the central file of a pull request had **no reviewable diff at all**,
  and `grep` for a string that is in it exited 1 with no output, which reads exactly like a clean
  search. A full round of checks passed over it. Write control characters as escape sequences, and
  when a diff says `Bin` on something you wrote as text, that is the signal. It happened three
  times in one day: in the file, in the commit message describing the fix, and in the memory
  written about it.

- **Probe a check by DELETING what it guards, not only by corrupting it.** A new check compared
  the domain in the print stylesheet against `site.url`. Corrupting the domain fired correctly.
  Deleting the rule fired too, and said the wrong thing: the pattern fell through to the
  external-link rule one line below, captured its empty prefix, and reported that the domain was
  wrong rather than that the rule was gone. A real failure with a misleading diagnosis is worse
  than a plain one, and only the delete case shows it.

### Looking at the built page

- **Measure what a fix COSTS before choosing its form, not only that it worked.** On 5 August 2026,
  surfacing the confidence grade on the theme pages worked as an open list at the foot of each
  page, and the number that decided its shape was the cost: 2,891px on `/asylum/` at 320px,
  **24% of the page**, a quarter of a phone page given to reference material sitting after the
  reading. Closed inside a `details` it is 56px, 0.6%, with a 56px tap target. Both numbers went
  into the pull request so the owner could reverse it in one word, and the backlog entry keeps
  them so nobody re-derives the decision.

  This is the same shape as the in-plot label knockout, which cleared every metric it was measured
  against and hid three years of data behind a label. **A remedy that fixes what it aimed at can
  cost more than the defect**, and the only way to know is to measure the page in both states.

- **Look at the built page, and measure the thing you are claiming.** Run `npm run build`,
  serve `_site`, and look. Looking is not enough on its own: the pre-launch banner was reported
  as aligned on the strength of a screenshot and had not moved at all. If the claim is "these
  two edges line up", read the two numbers.

  **And measure what the fix COSTS, not only that the defect is gone.** On 3 August 2026 a chart
  label was rescued from the line crossing it by putting an opaque box behind the label. Every
  number held: nothing off-screen, one chart visible, text above the size floor, four gates green.
  The box was hiding three years of data. **The metrics you chose before a fix cannot see a cost the
  fix introduces**, because you picked them to describe the defect. When a remedy adds anything that
  covers, clips, collapses or truncates, name what is now behind it and go and look at that. And
  prefer withdrawing an idea to patching it twice: both patches failed, and moving the labels back
  out of the plot removed the whole class of collision at once.

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

  **The `chrome-devtools` MCP server does the same thing in one call** and needs no extension:
  `emulate` with `viewport: "320x568x2,mobile,touch"`. Its `resize_page` is the trap in a new
  wrapper. On 3 August 2026 `resize_page` to 320 reported a `clientWidth` of 485 and no overflow
  on a page that had 54 pixels of it, from one long filename in a list added that day. This
  document already carried the rule and the defect shipped anyway, in new work, on a page nobody
  thought of as wide, which is why the measurement belongs in the change and not only here.

  **And when a fix looks like it failed, suspect the cache before the fix.** The first
  re-measurement still said 54 pixels. `getComputedStyle(el).overflowWrap` said `normal` while
  `fetch('/assets/style.css', {cache:'reload'})` already contained the rule: a stale stylesheet,
  not a rule that does not apply. Comparing the computed style against the served file is what
  tells those apart, and nothing else does.

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

- **Assert that a scripted edit matched before it writes.** `assert s.count(old) == 1` before every
  replace, in Python, `sed`, `perl` or anything else. A pattern that misses returns the string
  unchanged and the script exits 0 with its success line printed. On 3 August 2026 a record's note
  was patched with a curly apostrophe against a file holding a straight one; the sentence that was
  meant to say the accounts were now its source never landed, the run was green, and the surrounding
  text still read coherently. It was found by printing the field back and grepping for a phrase only
  the new version contains, which is the check to run after any scripted edit to prose. This is the
  same shape as the unquoted `--include` glob under *Building a check, and trusting it*: a command
  that did not run reads exactly like one that ran and found nothing to do.

  **The assertion does not cover the commit message, and on 4 August 2026 that is what shipped a
  false one.** A script asserted two replacements, the second failed on a hard-wrapped line, the
  write never ran, and only half the edit landed. The assertion worked exactly as intended. The
  commit message had been drafted alongside the script and described both halves, so a working
  guard produced a lying record, pushed. Write the message from `git diff --cached`, not from what
  the script was meant to do.

- **Do not fix by bulk substitution.** It caused an earlier round of defects, in prose and in
  CSS alike. Sentence by sentence, in view. **Including renumbering:** collapsing two completed
  items in the backlog's order on 2 August was done with one regex over every line starting with
  a numeral, which silently renumbered two unrelated numbered lists in the same file and produced
  duplicate entries in both. A list is not a safe target for a pattern that cannot see which list
  it is in.

- **A defect named on one page usually has siblings.** The invalid cohort comparison was in three
  places, only one of which the review names, and one of those was a record's `notes`, where it
  would have instructed the next editor to reintroduce it. The support-versus-accommodation
  conflation was in two. Grep the reasoning, not just the sentence.

  **And grep in a way that can find it.** Most prose here is hard-wrapped, and PDF text keeps its
  column breaks, so a phrase routinely straddles two lines and a line-based `grep` reports it
  absent. That cost two findings in one session, both of them real: a false attribution in
  `docs/foundation.md` split as "the Home Office's own label is the latest" / "recorded outcome",
  which a second model found and a `grep` appeared to refute; and a £22.9m figure whose own line
  read only "Atrium Hotel in Hounslow, London was", the money being three lines down in the
  next column. Join the lines before concluding absence. Absence of a hit is not absence.

- **Beware a rule that reaches inside a utility class.** `.prelaunch p` outranks `.wrap`, so a
  shorthand `margin: 0` there silently undid the auto-centring `.wrap` was applied for. Set the
  longhand you mean.

- **Never `git checkout` to undo a test, on the tree or on a file.** `git checkout -- .`
  reverts everything and cost an hour. The single-file form has the same failure whenever the
  file carries the session's own uncommitted edits: it restores the last commit, not the
  pre-probe state, and on 2 August 2026 it silently took two of a session's fixes with the
  probe, recovered only because the harness reported the file changed on disk. Reverse the
  exact edit instead, or snapshot to a scratch directory first and restore from there, chaining
  the restore with `;` rather than `&&`, because a failing `grep` in the middle will otherwise
  skip it. If checkout is ever the tool, run `git diff` on the file first and confirm the probe
  is the only change in it.

- **Print the branch you are on before cutting one from it.** `git checkout -b` says nothing about
  where it started. On 2 August 2026 a session read a stated starting branch, ran `git status` for
  cleanliness, and cut a branch from a different one still checked out from earlier work, which
  made its pull request quietly stacked. It was harmless that time and only because the work
  genuinely belonged on top of the other branch. What made it invisible is that every later signal
  agreed with itself: `git fetch origin main` and `git log origin/main` both answered about `main`
  while the tree was somewhere else. `git branch --show-current` is one command and answers the
  question none of those do.

- **A deliberately stacked pull request does not retarget itself.** GitHub moves a stacked PR to
  `main` only when its base **branch is deleted**, not when the base PR merges. On 3 August 2026,
  merging #98, #99 and #100 in order, #100 still read `base=a1-far-end-trace-home-office` after
  #99 had merged; merging it there would have written into an already-merged branch, never reached
  `main`, and shown as MERGED with every check green. Read `gh pr view <n> --json baseRefName`
  before merging, `gh pr edit <n> --base main` if it is wrong, and then confirm
  `gh pr view <n> --json files` lists only that PR's own files, because a wrong base makes the diff
  look right for the wrong reason. Mergeability reads UNKNOWN for a few seconds after each merge,
  so poll rather than believing the first answer.

  **And deleting the base branch does not retarget the upper PR. It CLOSES it.** On 4 August 2026
  `gh pr merge 125 --merge --delete-branch` closed #126, whose base was the branch just deleted,
  and GitHub refused to reopen it while that branch was missing. Recovery was to push the branch
  ref back, `git branch -f <name> $(git rev-parse <merge-commit>^2)` then push, reopen, and
  retarget. That mattered because `docs/BACKLOG.md` cited #126 by number, so landing the work under
  a new number would have falsified a document. **Retarget the whole stack to `main` first**, which
  is one loop, then merge each with plain `--merge` and delete nothing until the last has landed.

  **And a commit made AFTER its pull request merged does not ship either**, which is the same
  failure with no branch to blame. On 3 August 2026 the documentation recording U6 as complete was
  committed to `fix-inplot-label-knockout` thirteen minutes after #114 had taken that branch's
  other commit into `main`. Every local signal was clean: `git status` said nothing to commit, the branch
  name was the one the work belonged to, and the commit was there in `git log`. It survived only
  because the next session ran `git merge-base --is-ancestor` before cutting a new branch, and it
  was the whole record of what the round cost. **The end of a session is where this bites**, because
  a handoff or backlog edit is naturally written last, after the code has merged. `git log
  --oneline origin/main..HEAD` before leaving a branch, and treat any answer but silence as work
  that has not shipped.

### Working with this project's own documents and rules

- **A tag in `docs/BACKLOG.md` is a claim about a source, and it ages exactly like a figure
  does.** That file classified three daily rates on the costs page as "the cited spending divided
  by 365" and tagged them editorial. Two of the three are the Home Office's own averages, printed
  in its accounts in the same sentence as the annual totals, and acting on the tag would have
  deleted two official published figures as though they were this site's arithmetic. **The page
  had been contradicting the tag all along**, in the words "in the accounts' own terms", and
  nothing surfaced that, because a backlog entry is prose and no check reads it. Open the source
  before acting on a classification, including one this project wrote itself.

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

- **Bringing a [you] decision: real options, one recommendation, and the thing itself rather than
  a description of it.** The bullet above says WHEN to ask. This is how, and it is the form the
  owner asks for and answers in a word.

  Give two or three options that are actually available, name one as the recommendation, and say
  what the others cost rather than listing them evenly. A balanced menu with no lead makes him do
  the analysis twice, and bringing the call rather than taking it is not the same as declining to
  have a view.

  **Render the alternatives from the real data instead of describing them.** The citation format
  went to him on 4 August 2026 as three questions, and came back in one line, because the three
  shapes had been generated from the records of the page they would appear on: five citation lines
  against three, in the publishers' own words, so the difference was visible rather than argued. A
  described option is a claim about what something would look like, and the difference between a
  claim and the thing is this site's entire subject. The same move settled the navigation and the
  chart remedy earlier: build the smallest real version, measure it, and show that.

  **Check the constraint before offering the choice**, per the validator bullet above; an option a
  check forbids is not an option, and offering it costs a turn and some trust.

  **When the answer comes back, record what was REFUSED and why, beside what was taken, and keep
  refused separate from deferred.** Twice an option not taken was what explained the shape of what
  was built. An unrecorded refusal is reopened by the next session being helpful, and a deferral
  recorded as a refusal is lost: of the three citation questions, one was deferred behind an open
  grade decision and is now filed under U3 where that decision lives, rather than under the item
  that raised it.

- **Check `main` has not moved before rewriting this file or the backlog.** A PR was merged
  mid-session here, so a branch cut an hour earlier carried a superseded handoff, and editing it
  would have reverted the owner's own merged work. The edit tool caught it by reporting the file
  had changed on disk. Rebase before writing the durable documents, not after.

- **A finding in this project's own review is a claim, and it can be false.** The UX review said
  no spreadsheet link renders anywhere on the site. One does, on the home page, where a dashboard
  card links its record's `source_url` and one card's record is an `.ods`. The review's reasoning
  was that those URLs sit on series points, which emit no link, and 20 of the 68 sat on metric
  records instead, measured on the day. That sentence was repeated in a code comment, a commit
  message and a pull
  request body before a second model opened the built page. **Reading a scope document is not
  verifying it**, and the same rule already written here for a backlog tag applies to a review's
  own findings.

- **Reordering a list falsifies every reference inside it that points by position or by number.**
  Renumbering *The order* on 4 August 2026 left two items pointing at the launch gate as "the gate
  above" when it had moved below them, and two documents pointing into the list by number went
  stale twice in one day, once at the renumbering and once at a later move. Grep the block for
  `above`, `below` and `item \d` after any reorder, and prefer pointing at a name over a position.

  **CLOSING an item does it too, and this rule said "after any reorder" until 5 August 2026, so it
  would not have fired.** Nothing moved and nothing was renumbered when items 4 and 7 closed, and
  two references went false anyway: this document called The order's item 4 "a different and open
  thing" while disambiguating it from the audit's section 4, and a line in U3 called a table's
  inability to reflow "the defect The order's item 7 exists to fix". Both were true when written
  and both are claims about STATE hidden inside sentences about identity. **Run the same grep after
  changing an item's state, not only after moving it**, and re-aim what you find at a name: "the
  defect call 29 fixed" cannot rot, "what item 7 exists to fix" rots the day item 7 closes.

- **Fix the generator, not the line it generated.** The same reorder was done by a script that
  rewraps each item, and one wrapped line began "390.", which GitHub renders as a nested ordered
  list swallowing the rest of the entry. Moving the word by hand did not survive: the next rewrap
  recomputed the break and put it straight back. The rule went into the wrapper, which refused to
  start a line with anything markdown reads as a list marker. **That wrapper was a session script
  and is not in this repository**, so the rule has to be re-imposed by whoever rewraps the list
  next. Nothing checks for it, which is the honest state rather than the tidy one.

- **A sentence naming which item comes next is a second list, and one falsified itself in sixteen
  minutes.** On 4 August 2026 at 13:07, item 3 of *The order* closed with "the next item a session
  takes is The order's item 10". At 13:23, item 4 was updated to record call 18 as decided and
  unapplied `[me]` work, which by the header's own rule is the item a session takes. Item 4 is the
  entry immediately below the one carrying the pointer, and six above the one it named. A later
  session followed the pointer and took item 10, skipping it.

  **It was not a race, and this bullet said it was until a second model checked the history.**
  `git merge-base --is-ancestor` puts the two commits four apart on one continuing line of work,
  same author, same file, sixteen minutes; they reached `main` through PR #128 and PR #130, and
  #128 merged first. So nothing collided. **The same person wrote a pointer and then wrote the
  thing that falsified it, two screens apart in one file, and no check saw it.** The
  branch-in-flight version was the more comfortable story and it let the practice off the hook.

  Nothing moved and nothing was renumbered, so the bullet above would not have fired: the sentence
  was simply a second copy of a rule the header already gives, and the copy a session happens to
  read wins. **Never name the next item.** Say what is left of the entry you are closing and stop.
  The backlog's header now says no entry names it, so a future session meets such a sentence as a
  defect rather than an instruction.

- **Compressing an entry keeps the conclusion and drops the enumeration, which is the wrong way
  round.** Item 4 of *The order* listed its scope as several calls "and the rest of A6", then
  closed with "so what is left of this item is the LICENCE scope". Those disagreed, because A6 held
  three decided-but-unapplied items. The consolidation kept the closing sentence, and A6 stopped
  being reachable from the ordered list at all: outstanding work that nothing pointed at. **An
  enumeration is a claim about scope and changes rarely; a conclusion is a claim about state and
  changes weekly.** Diff the two before cutting either, and after compressing any list, check that
  every subsection holding open work is still named by something in the ordered list. It was found
  by `grep -n "A6"` inside The order returning nothing, which is one command.

- **A gate does not release itself.** U3's first bullet was sequenced behind "the open grade
  questions in R2 and A6". A6's closed in PR #79 and R2's in PR #129, and neither release touched
  U3, because closing a section updates that section and nothing walks back to what was waiting on
  it. The gate then survived a consolidation, where narrowing it to "A6" turned an inherited
  vagueness into a precise false claim. **Name the condition, not the section**: "behind A6" rots
  when A6 closes, where "behind any open grade question on a published record" is checkable and
  self-clearing. When you close a decision, grep for what was waiting on it before you commit, and
  measure a gate's own reasoning rather than arguing about it: four commands established that no
  theme page rendered a grade, that the one grade change still open was on records
  `publishedRefs()` says reach nobody, and that the vocabulary already had a published definition.
  **Whether a lapsed gate releases the work is the owner's**, not yours.

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

  **On 4 August 2026 the same failure reached a decision the owner then took.** A recommendation to
  re-source a record to ONS table UK05 and grade it `calculated` could not be built: UK05 prints
  country-of-birth cells by sex and age and NO TOTALS, so numerator and denominator are sums of
  thirty-six rows, while `check-evidence` requires every component to carry a published value its
  quote contains. Building it meant writing a quote no source states. The same recommendation
  called the `estimated` route "mechanically refused" without checking, and two ICIBI records were
  already `estimated` with their source printing them. **A recommendation is a claim about what can
  be built**, so before naming an option, parse the source for the field the check demands and grep
  for a record already in the state you are proposing. Both halves were a minute's work.

- **Scoping is not progress.** Four scope documents were written in one session while the site
  did not change. Each was defensible; together they were a way of feeling productive without
  shipping. Prefer building the smallest real thing.

- **Print the groups before trusting a deduplication key.** When records are collapsed into one
  line for a reader, the key decides what disappears and nothing downstream can tell you it went.
  Keyed on `source_url` alone, the citation block on `/common-claims/nineteen-per-cent-born-abroad/`
  cited one ONS bulletin once where three records name it three different ways, so the page said a
  figure was read where it was not. Re-keying on name and URL was not the end of it: the same
  script then showed two fields still differing inside a group, tables and the checked date, each
  needing a rule rather than first-wins. Group the real data and print every field that differs
  inside a group, before writing the key.

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
3. **The MVP cap counts source releases, not figures.** Four releases.
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
  it groups nav items under `<details>`, **though not in the way this section implied until
  3 August 2026** and not as a solution to the problem this project has. DEBT's mobile collapse is
  `<button class="site-nav__toggle">` driven by `src/assets/js/nav.js` and shown only under a
  `.js` class, so without JavaScript it is hidden and DEBT's nav renders flat exactly as this one
  does; its `<details>` is a sub-menu device for nav items declaring `children`, which this site's
  flat items do not have. `<details>` and `<summary>` can carry a whole nav with no
  JavaScript and that is still worth doing. **DEBT is a precedent for grouping a hierarchy, not a
  working precedent for a no-JavaScript mobile nav**, and describing it as one for days is what a
  sibling idea recorded from memory rather than from the file looks like. It also scales the root
  font size (`html { font-size: 106.25% }`) where this project scales `body`, which is why
  `--measure` and the chart's `min-width` are pinned to 16px and do not grow with the type
  scale. Its `docs/UPDATING-DATA.md` was ported on 30 July 2026 and is now
  `docs/UPDATING-DATA.md` here, longer than the original because this data layer has an evidence
  contract and four series files that DEBT's does not.
- `~/Projects/UK Civil Society Explorer` has the `editorial-lint.test.js` that this project's
  language lint was modelled on.

## Prompt for a fresh session

Deliberately not tied to one task, so it does not go stale as items are completed. Generated to
`docs/prompts/fresh-session.md` so it can be copied without opening this document; **this section is
the source of truth and that file is a copy.** Regenerate it rather than editing it there.

**Cut to about fifty lines on 31 July 2026, from just over two hundred, and re-routed at the backlog
the same day when the audit closed and its parallel list was deleted.** The long version recited the
rules; this one points at them. That is the opposite of the previous fix, and the reasoning
changed because the evidence did.

**Why the long version existed, and why reciting was the wrong answer.** The prompt and this document
drifted twice, and the prompt was the stale copy both times: it said a check had overturned the
review five times while the body still said three, and it said to take the first *unstarted* backlog
item after the backlog had moved to *unfinished*, which would have sent a session to the wrong work.
The response was to trim it to rules-without-counts and track what was copied in a table. That
table then had to grow every time a rule was added, and the drift it existed to prevent simply moved
into it: by 31 July it listed nine copied rules, of which the prompt still carried all nine and the
table's own accuracy had become one more thing to maintain.

**So the rule now is that the prompt copies nothing that can rot.** No counts, no rule text, no
enumeration of what is mine. It carries four things and nothing else:

| In the prompt | Why it cannot be a pointer |
| --- | --- |
| What to read, in what order | It is the instruction that makes every pointer work |
| The `[me]` / `[you]` mapping | It **inverts** against the prompt's own pronouns. A session that gets it backwards does the editorial work rather than bringing it, which is the worst outcome available, and it is not discoverable by reading carefully |
| Which list is live | Two frozen records in `docs/` still READ like work lists, with findings, severities and recommendations. A session that takes work from one is doing work the backlog may already have closed, and neither document says so on the line being read. **This cell said "and to flag a disagreement" until 3 August 2026**, describing an instruction the prompt lost on 31 July when the audit's parallel list was deleted: the block resolves a disagreement by fiat instead, saying whatever is outstanding is in the backlog. A contract that overstates what it governs is the same defect as a message overstating what it checks, and an outside reader found it |
| Which commands must pass, and branch-and-PR | Cheap to state, expensive to omit, and neither changes. **The unmerged-work check joined this row on 3 August 2026 and is row four, not a fifth thing**: it is the completion half of branch-and-PR, it is a command rather than recited rule text, and it has no copy anywhere to drift against. It is here because a session's own documentation commit was stranded on a merged branch that day, and every local signal read clean |

Everything else is a pointer at a heading in this document. **The table above is short by design**:
if it grows past four rows, the prompt has started reciting again and the fix is to cut it, not to
extend the table.

**Two paragraphs were added to the copy on 4 August 2026 and cut the same day**, one on
reproducing a bullet's premise and one on reading the CI log of a continue-on-error step. Both were
rule text with a fuller copy in *Working practices*, which is the drift this section exists to stop,
and one was written into `docs/prompts/fresh-session.md` rather than the block above, which is the
copy that gets overwritten. What survives of each is one clause inside a paragraph that was already
there: the TASK paragraph and the network-checks sentence. Neither adds a row to the table.

**Two more clauses on 4 August 2026, in the same form and for the same reason**, and the same
mistake was made first: both were written into `docs/prompts/fresh-session.md` rather than into the
block below, so the source and the copy diverged until they were diffed and synced. **Diff them
before finishing**, which is four lines of Python and the only thing that proves this section's
claim about itself.

- **In TASK, that a recommendation is a claim about what can be built.** A recommendation to
  re-source a record to a table that prints no totals could not be evidenced, and the owner had
  already taken it. It is a clause on the premise sentence, not a new paragraph.
- **In the checks paragraph, to read the COUNT in a pass line against what the build printed.**
  `npm run a11y` reported seventeen of seventeen with a new page absent from `.pa11yci.json`, which
  is hand-maintained and does not follow the sitemap. It happened three times in one session.

**A second model read both against this contract the same day and cut into both clauses**, which is
the fourth time an outside reading has trimmed this block and the reason the practice is budgeted
for rather than treated as a last check. The recommendation clause carried an imperative, "test the
mechanism of any option before you recommend it", which is a second copy of a bullet under
*Deciding what to build*; the imperative is gone and the dated claim remains. The a11y clause said
a11y "takes" its URLs from a hand-written list, a live claim about `.pa11yci.json` that goes
silently false the day the list is derived from the sitemap, which the handoff's own new bullet
invites; it now says "took". **And it found a third thing that was not today's**: the same
paragraph sent a session to read a CI step log for the online half of `check-backlog`, which runs
in no workflow at all, so there is no log to read. The paragraph now separates the two that do run
as report-only steps from the one that does not run.

Both surviving clauses name a dated incident rather than reciting a rule, which is the test this
section sets: a duplicate that cannot drift costs a line, a duplicate that can drift costs a
session.

**That fix was applied on 2 August 2026, and this is the record so it is not undone by someone
being helpful.** The block carried a fifth thing, a paragraph beginning "ONE DELIVERABLE PER
SESSION" that paraphrased the rule of the same name in `~/.claude/CLAUDE.md`. It was none of the
four rows and it was not a pointer: it was recited rule text with an independent copy to drift
against, in a prompt that tells the reader fifteen lines earlier that those global instructions
load automatically. A second model found it by reading the block against this section's own
contract. Cutting it also restores the truth of the block's own words **"ONE THING RECITED HERE"**,
which had been false for as long as there were two. If it is ever missed, the answer is not to
paste it back but to ask why the global rule did not fire.

**Three more cuts on 3 August 2026, found by an outside model reading the block against this
contract, and the reasoning is here for the same reason.**

- **The sentence explaining what `check-evidence` fires on is gone.** It was rule text with an
  independent copy to drift against, and it had already drifted: it said "fires only on a changed
  or new VALUE" until the check gained two more triggers earlier the same day. Row four's own
  justification is that the commands "never change", which that sentence falsified by existing. It
  is replaced by an instruction that cannot rot, to read what a passing run says it did not
  establish rather than taking silence as clearance, which is the thing the original sentence was
  actually for and now has one home: the script's own output.
- **"The earliest entries are mine or are launch" is gone.** It was a claim about the current head
  of a list the prompt does not regenerate when that list moves, and the backlog's own header says
  the live version. The TASK instruction above it already covers the case.
- **"This project has no CLAUDE.md" is gone.** True today, silently false the day one is added, and
  the sentence after it does the work by pointing at the global file.

**Two things were left in deliberately, against the same reading, so they are not cut next time.**
The batching sentence ("do all the [me] work first and bring me the [you] decisions in one batch")
is not a fifth item: it is how a session acts on the mapping, it sits in the mapping's own
paragraph, and it cannot rot. The completion protocol at the foot ("mark it done, move it to
Completed, do not delete") duplicates the backlog's header, but it is read at the end of a session
when that header is a long way behind, and it cannot rot either. **The test is not "is this stated
elsewhere" but "can this go stale".** A duplicate that cannot drift costs a line; a duplicate that
can drift costs a session.

**A fourth cut, 3 August 2026, and this one was a live defect rather than a redundancy.** The
mapping's self-test read "correction 1a in the backlog marks the owner's decision [you]". Correction
1a is marked **DONE (PR #33, 27 July 2026)** and tagged **[you + me, data]**, so a session running
the test met a completed row with a compound tag, and learned the wrong thing or nothing at all
about the row whose own justification is that getting it backwards is the worst outcome available
and is not discoverable by reading carefully. **A self-test that names a specific item is a copy of
that item**, which is what this section says the prompt must not carry, and it rotted the way every
other copy here has. It is replaced by a structural test that cannot rot: find any item tagged
[you] and confirm it is a decision rather than a task. That is true by definition of every such
item, and it still makes the session open the file and look.

**A fifth change, 3 August 2026, and the lesson is that the previous entry rotted within the hour.**
The self-test replacing "correction 1a" read "find any item tagged [you] and confirm it is a decision
rather than a task", asserted here as true by definition. It is not: The order tags *Talk to five
target users* and *A real screen reader over the pages* [you], and both are tasks the owner performs
rather than calls he makes. A session running that test on either would have failed to confirm the
mapping and might have concluded it was inverted, which is the outcome this row exists to prevent.
**The gloss was the deeper error**: "[you] = an editorial or sourcing call" is narrower than the
backlog's own "[you] items are the owner's", so the prompt was carrying a definition that disagreed
with the file it points at. Both are fixed by pointing at The order's header, which states which
side takes which in one sentence, instead of restating it. **The TASK paragraph lost its copy of
that rule for the same reason**, and it was the third copy of a sentence this document already
records as having drifted once. An outside model found all of it by reading the block against this
contract, which is the second time that has been worth doing and the second time it found a defect
introduced by the fix before it.

**One correction and one refusal, 4 August 2026.**

The correction: the block said check-releases, check-sources and check-backlog are network checks
to run by hand. `check-backlog.mjs` has two halves and its OFFLINE half runs inside
`npm run validate`, which the same paragraph tells the session to run every time. A reader could
take the sentence to mean the backlog is not checked by the four, and it is. Only the `--online`
half is a network check. The added word cannot rot, because it names a fact about the script's own
two modes.

The refusal: a command was considered for row four and left out. A file written this session
carried a literal NUL byte, so git called it binary, the pull request's central file had no
reviewable diff, and `grep` for a string that is in it exited 1 with no output. That is the same
shape as the stranded-commit defect the `git log` command was added for, a local signal that reads
clean. It is NOT in the prompt, because a command earns row four by being cheap to state and
expensive to omit on EVERY session, and this one guards a rare accident that the diff already
announces by printing `Bin`. It is in *Building a check, and trusting it* instead, with the
incident. **The test the table applies is not "did this cost us once" but "will a session need it
every time".** Recorded here so the next reading does not add it as an oversight.

**One refusal and one vindication, 5 August 2026, and no change to the block.**

The refusal: the backlog was consolidated from 2,729 lines and the costliest thing that surfaced
was a sentence naming which item came next, false sixteen minutes after it was written, which a
session followed. A clause guarding against it was considered for the TASK paragraph and left out.
It fails both halves of this section's test. It would be a second copy of a rule *The order*'s own
header now carries, so it can drift; and the defect is structural rather than recurring, the
sentence having been deleted and forbidden at its source, so it is not something a session needs
told every time. It is a bullet under *Working practices* with its incident instead. **Recorded
here so the next reading does not add it as an oversight**, which is the same reason the NUL-byte
command is written up above.

The vindication, and it is an argument for leaving this block alone: **the prompt's frozen-records
list was right when the backlog's was wrong.** The consolidation added
`docs/PRE-PUBLICATION-REVIEW-SIX-PAGES.md` to the backlog's list of records "read for reasoning and
never edited". It is not one: it holds unticked checkboxes that item 2 exists for the owner to
work, so the instruction would have shut the one document that item requires opening. **The prompt
has never named it**, checked through the file's history rather than asserted: it named two until
the launch readiness review landed and three since, and the six-page document was never among
them. A first version of this paragraph said "always named three", which `git show` over six
revisions refutes, and it is corrected here rather than quietly because a confident claim a command
would have settled is the defect this whole document is about.

**Four refusals and no change to the block, 5 August 2026.** A session applied five backlog items
across five stacked pull requests and produced four candidates. Each was tested against this
section's contract and each failed it, so the block below is byte-identical to the 4 August
version. **Recorded so the next reading does not add them as oversights.**

- **"`npm run validate` passing does not mean the site builds."** It cost a cycle that day: a
  nunjucks comment inside a shortcode's argument object passed validate and failed the build.
  Refused because row four already says run all four every time, so the clause would add nothing a
  session that follows the prompt does not already do, and it is rule text with a fuller copy under
  *Building a check, and trusting it*.
- **The stacked-pull-request merge order.** Retarget the whole stack to `main` before merging any
  of it. Refused on "will a session need it every time": five stacked pull requests is the first
  time this project has had more than two, and the procedure already has a home under *Changing
  something without breaking something else*.
- **"Prove an absence in every store, with a control."** Refused as recited rule text; it is a new
  bullet under *Verifying a figure* with its incident.
- **"Grep for pointers by number after closing an item."** This one found a real gap, and the gap
  was in the handoff rather than in the prompt: the *Reordering a list* bullet said "after any
  reorder", and closing two items falsified two references with nothing reordered. **The bullet was
  widened; the prompt was not touched.** That is the pattern to copy. When a session's mistake
  suggests a prompt clause, check first whether an existing practice bullet simply had too narrow a
  trigger, because widening one rule beats adding a second copy of it.

**One thing to check when you change this section.** `docs/prompts/fresh-session.md` is generated
from the code block below, which is the LAST fenced block in this document and no longer the only
one: a second was added on 2 August 2026 under *Where things stand*, so anything extracting "the
code block" must take the last, not the first. If you edit the block, regenerate the file and confirm the two match; if
you edit the file, you have edited the copy and it will be overwritten.

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

READ FIRST, in this order, and do not re-derive what they already settle:
  1. docs/BACKLOG.md, starting with The order at its top: the single
     numbered list of everything outstanding, gates marked and work
     tagged [me] or [you]. There is no second list.
  2. docs/HANDOFF.md. How the project works, and what earlier sessions
     cost. Its "Working practices that earned their place" section is
     rules this project has paid for, each with the incident behind it.
     Read it before deciding a rule does not apply to what you are doing.
  3. The scope document for whatever you pick up.

docs/PRE-LAUNCH-AUDIT.md, docs/LAUNCH-READINESS-REVIEW.md and
verification.txt are FROZEN RECORDS, not work lists. Read them for the
reasoning behind an item. Do not edit them and do not take work from
them: whatever is still outstanding is in the backlog.

Your global instructions at ~/.claude/CLAUDE.md load automatically.

ONE THING RECITED HERE, because it inverts and getting it backwards does
the most damage available. Work is tagged [me] or [you] from the
SESSION's side, so the tags invert against the pronouns in this message.
Use the mapping, never the pronoun:
  [me] = a factual or mechanical change against a cited source. YOU do it.
  [you] = a call or a task that is the owner's. Propose and stop.
Check it against The order's own header in docs/BACKLOG.md, which says
in one sentence which side takes which. On a list mixing both, do all
the [me] work first and bring me the [you] decisions in one batch,
because the mechanical work usually determines what the editorial
question is.

TASK: take the first item The order says a session takes, unless I have
told you otherwise in this message. Its header defines that in one
sentence; read it rather than assuming, because the word it turns on
has been misread before. Reproduce the item's premise before building what
it prescribes: a recommendation is a claim about what can be built, and one
taken on trust cost a reversal on 4 August 2026.

Tell me which item you are taking and what you expect to change before
you start. If it is larger than a session, propose a split. If it is
wholly gated on a decision of mine, do not stall and do not take the
decision: bring it to me and start the next item that is not waiting
on me, saying which.

Everything must pass, and run these rather than assume: npm run validate,
npm run build, npm run a11y and npm run check-evidence. All four every
time. Read what a passing run says it did NOT establish, rather than
taking silence as clearance, and read the COUNT in a pass line against
what the build printed: a11y took its URLs from a hand-written list and
reported 17 of 17 with a new page missing from it. check-releases,
check-sources and the ONLINE half of check-backlog are network checks
that gate nothing, so run them by hand before a PR. The first two run in
CI as report-only steps, so read their step logs rather than the green
tick: they report and never gate. The online half of check-backlog runs
in no workflow at all.

Branch and PR, never straight to main, and the PR body carries the
reasoning. When you finish an item, mark it done in docs/BACKLOG.md with
its PR and a date, and move it to Completed when nothing is left. Do not
delete it.

Before you finish, run: git log --oneline origin/main..HEAD
Any answer but silence is work that has not shipped. A commit made after
its pull request merged is stranded on a dead branch, and git status,
git log and the branch name all read clean.
```

