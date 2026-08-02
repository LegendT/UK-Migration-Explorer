# Handoff, 2 August 2026

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

17 pages build from a governed data layer of metric records in four theme files, plus **four time
series** whose points are carried in blocks: a primary array, and companion blocks nested one
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
fifth site standing. Two launch gates remain and neither is a defect: recording the review as
passed, scoped to all sixteen pages, and deleting the robots rule.

**A UX, SEO and trust review of the built site followed on 2 August 2026**, critiqued by two
independent passes. It found nothing that gates launch, and what it did find is in
`docs/BACKLOG.md` under *From the UX review*, entry 8 in the order, in that file the format and
not here. One item touches a gate: the review argues the launch `robots.txt` should be WRITTEN
rather than only deleted, with a sitemap beside it, and the gate as worded says delete.

**The sitemap half of that is built, PR #86**, so what is left of it is the `robots.txt` file
itself and the `Sitemap:` line inside it, and what that file SAYS waits on the AI-crawler
decision the backlog carries as U4. The same pull request gave every linkable section heading an
id, where two pages of seventeen had any before it. **Not every heading**, deliberately: the
transform skips the page `h1`, whose link is the URL, a heading inside a `<figcaption>`, whose
`<figure>` already carries an author-chosen id, and a derived id already taken on that page.

**That review left the site's navigation undecided, and the backlog carries a second round for
it.** Its only nav bullet is filed under *considered and cut* and concerns a horizontally
scrolling nav; in its own words the wrapping was worked out "by calculation, unrendered". The site
has no mobile navigation pattern, and a candidate one was sitting in this document's own *Sibling
projects* section the whole time. **The lesson is about the method rather than the nav**: a review
that reads markup and calculates can miss what opening the page would show, which is the same
shape as the six absent-claims it already records against itself.

**Backlog item 4 is closed, which changes what a session may assume.** Every figure written
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
correction slip inside its own PDF. **All three are now corrected, and the gap they came through is
not**: no automated check verifies that a source contains the figure citing it. The launch
readiness review verified the eight home page figures at the far end by hand, with fetched
quotes; the other reader-facing records have not been asked, and the backlog carries that as A1. `£2.1 billion` was the clearest case. It is
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

Seven checks, all in CI, all negative-tested.

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, every figure linked to its catalogue entry, a citation's `source_url` and `source_id` naming the same publisher, a theme file's `lastUpdated` keeping up with its newest record, single-vintage series, a metric declaring a `series_ref` agrees with the point it names on value, unit, confidence level and year, every point in a series block carrying one confidence level, `ons_marker` drawn from a fixed vocabulary, a theme file's `lastUpdated` present and a real date, a figure naming a publisher table in its own prose declares it in `table_reference`, figures overdue against their source's cycle, `DO NOT PUBLISH` flag fails the build. **Reports rather than fails** on a record whose `notes` restate another record's value, naming both, because nothing keeps those two in step |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value or series point written longhand in content or in the `data/` prose that reaches a page, a `historical_literals` declaration that matches nothing in its own file, every planning document in `docs/` and its subdirectories referenced from the backlog, outstanding work tracked in the backlog. **Fails** on a figure the data layer never recorded, comma-grouped or written with a scale word, since 2 August 2026, having run at report level under a ratchet from 38 down to zero, and names every declared literal that does equal a live value |
| `check-evidence.mjs` | Every metric whose value changed against `origin/main`, and every metric that is new, is declared in `data/evidence/` with a quote containing that value. A derived figure quotes its inputs and states the arithmetic instead. A series is evidenced **per array and per release**, carrying its vintage, its point count and a quote holding both ends; a move with no new release behind it needs a correction note, because an entry matched on vintage alone also matches every earlier state of the same edition. Gates the build. Needs the base branch fetched, and fails rather than skipping when it cannot see it |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN`, every table inside a focusable named scrolling region, every ARIA reference resolves, no id on two elements, no two controls sharing a name, no two links sharing their text while going to different places, no link text that names nothing, robots rule under `User-agent: *`, `sitemap.xml` holding exactly the built pages other than the 404, compared in both directions, and the published-figure counts match the refs in the built HTML exactly, in both directions, comments excluded at both ends |
| `check-sources.mjs` | Every source URL still resolves, the data-layer citations and the external links written in page prose alike (network; runs in CI with `continue-on-error`) |
| `check-releases.mjs` | Two halves. Whether a watched source has published a newer edition than the one each record **and series file** cites, per cited edition rather than per source, compared on the month and year in the URL. And whether a table declared in `table_reference` was corrected **inside** the cited edition, matched against the Home Office change history and raised only where the figure's own `retrieved_date` pre-dates the correction. Network; reports and never gates, and opens one deduplicated issue from `main` or the cron. A route that matches no document, or a page that answers with no change history at all, fails loudly rather than reading as quiet |
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

**Three known gaps are published** on the sources page under *What the checks do not establish*:
the prose one, the sub-100 review and the screen reader. Candidates for a fourth are in
`docs/BACKLOG.md`, and which, if any, earns the space is an editorial decision there. Do not take
a count from here: this sentence said "four" while the backlog listed three candidates and the
page published three limits. **One candidate was withdrawn on 2 August 2026 by being fixed rather
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

**One was written, tested and deliberately reverted**, and it is the most useful of the six.
Firing `check-evidence` on a regrade **into** the derived set works, and run against `main` it failed
immediately on the audit's own regrade of `asylum-administrative-outcomes`. It was reverted because
landing it turns the branch red until that record has an evidence entry, and the entry needs verbatim
quotes from a pivot nobody had opened. **The ordering is the lesson: fetch the source, write the
entry, then land the check.** The other way round forces a fabricated quote, which is the one thing
the evidence contract exists to prevent.

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
  The site builds 17 pages and the scan that answers a question about all of them has to read all
  of them. This is the same error as truncating a file, one level up.

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
| Which list is live, and to flag a disagreement | Two frozen records in `docs/` still READ like work lists, with findings, severities and recommendations. A session that takes work from one is doing work the backlog may already have closed, and neither document says so on the line being read |
| Which commands must pass, and branch-and-PR | Cheap to state, expensive to omit, and neither changes |

Everything else is a pointer at a heading in this document. **The table above is short by design**:
if it grows past four rows, the prompt has started reciting again and the fix is to cut it, not to
extend the table.

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
     numbered list of everything outstanding, gates marked, each entry
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

This project has no CLAUDE.md. Your global instructions at
~/.claude/CLAUDE.md load automatically.

ONE THING RECITED HERE, because it inverts and getting it backwards does
the most damage available. Work is tagged [me] or [you] from the
SESSION's side, so the tags invert against the pronouns in this message.
Use the mapping, never the pronoun:
  [me] = a factual or mechanical change against a cited source. YOU do it.
  [you] = an editorial or sourcing call. It is MINE. Propose and stop.
Check it the first time you use it: correction 1a in the backlog marks
the owner's decision [you]. On a list mixing both, do all the [me] work
first and bring me the [you] decisions in one batch, because the
mechanical work usually determines what the editorial question is.

TASK: take the first UNFINISHED [me] item or [me] half in The order,
the numbered list at the top of docs/BACKLOG.md, unless I have told you
otherwise in this message. Unfinished, not unstarted: an item can have
phases built and still be first. The earliest entries are mine or are
launch: bring those, do not take them.

Tell me which item you are taking and what you expect to change before
you start. If it is larger than a session, propose a split. If it is
wholly gated on a decision of mine, do not stall and do not take the
decision: bring it to me and start the next ungated item, saying which.

ONE DELIVERABLE PER SESSION. Audit, then fix, then critique the fix is
three. When a critique pass is mostly finding mistakes this session
introduced rather than defects in the work, stop and tell me.

Everything must pass, and run these rather than assume: npm run validate,
npm run build, npm run a11y and npm run check-evidence. All four every
time. check-evidence fires only on a changed or new VALUE, so silence
from it is information rather than a reason not to run it: re-sourcing a
figure is invisible to it. check-releases and check-sources are network
checks that gate nothing, so run them by hand before opening a PR.

Branch and PR, never straight to main, and the PR body carries the
reasoning. When you finish an item, mark it done in docs/BACKLOG.md with
its PR and a date, and move it to Completed when nothing is left. Do not
delete it.
```

