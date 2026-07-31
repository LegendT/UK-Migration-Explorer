# Update automation, scoped

What can be automated about keeping this site current, what must not be, and in what order to
build it. Scoped 23 July 2026. **Four of the five phases are built:** phase 2, the evidence
check, on 28 July 2026, PR #43; phase 1, the notifier, the same day, PR #46; phase 1b, the
corrections watch, on 30 July, PR #48; and phase 3, the update prompt, the same day, PR #56.
**Phase 4 is the only one left**, and it is a reader-facing trust statement needing the owner's
sign-off rather than a build. Everything below except phase 4 is now the reasoning behind what
exists rather than a scope for what does not.

The problem it solves is named in the risk register: silent staleness is the most likely way
this project fails. The staleness check added on 23 July ages every figure against its
source's *cadence*, which is a guess. Nothing detects that a release has actually happened,
and nothing helps with the work once it has.

## The line, and where it sits

An assistant that **drafts a pull request** is not "an automated pipeline pulling numbers
straight onto the site". The first keeps the human gate; the second removes it. Every design
decision below depends on never blurring those two.

**What must not be automated, and why the project already decided this twice.** From
`content/sources-and-method.md`:

> "No figure appears here because a model asserted it."

And from the risk register:

> "Automated updates publish errors | Manual review before publication; CI validates
> structure but never publishes figures."

Both stay true under everything below. Nothing here merges, and nothing here writes a value
that a person has not seen beside the sentence it came from.

**Start from what this repository already knows.** From the working practices:

> "Research subagents must quote a fetched URL and verbatim text per figure. One returned
> eight values that appeared nowhere in its own evidence table."

That happened here, on this data, on this task. Phase 2 exists because of it, and Phase 3
must not be built before Phase 2.

## Phase 1: the release notifier

**Built 28 July 2026, PR #46**, as `scripts/check-releases.mjs` and two CI steps. What follows
is the design it was built to; *What building it found* records what it added.

Detect that a source has published a newer release than the one the site cites. The same
shape as `check-sources.mjs`, a network check that reports and never gates, though with two
detection strategies rather than one loop over a list. Worth building on its own, whether or
not anything later is.

### What building it found

- **The edition slug itself has been renamed, twice, and a prefix filter fails silently when
  it happens.** The Home Office collection holds 112 documents, of which 14 match
  `immigration-system-statistics-year-ending-`; the rest include the pre-2022
  `immigration-statistics-year-ending-` series. The tribunals collection holds the older
  singular `tribunal-statistics-quarterly-`. The filter is necessary, because an unfiltered
  maximum would let an ad hoc release with a month in its slug pose as the newest edition. So
  a run that matches **no** document reports a failure naming the rename, rather than the
  "no newer release" an empty list would otherwise mean. Negative-tested by renaming the
  prefix.
- **One normaliser covers all four URL shapes**, because each ends in a month and a year:
  a release page, the two-month tribunals form, an ONS bulletin edition and a data-table
  filename. Take the last month in the string and the two-month form works with no special
  case. The segment is extracted before it is parsed, because reading a whole asset path would
  let a hex media id supply a month and a year.
- **Two records can never be compared**, and are reported rather than counted as current. Both
  small-boats figures cite evergreen pages, the data-tables set and a rolling publication,
  which name no edition.
- **`tee` swallows the exit code.** The CI step pipes the report to a file so the issue step
  can read it, and a step without `shell: bash` runs under `bash -e` with no `pipefail`, so
  the step would have passed every week while printing a failure. Confirmed both ways.
- **Issues are opened from `main` and the cron only.** A pull request must not open issues
  about the state of the world: it did not cause it, and every open PR would race for the same
  one. Declaring `permissions:` at all drops every unlisted permission to none, so `contents:
  read` is listed beside `issues: write`.
- **Not yet exercised: the issue itself.** No release is pending, so the path from a non-zero
  exit to an open issue has been tested only in its parts, the title extraction and the
  deduplication query. It will first run for real when a release lands.
- **It ignored the series files, and that was found by critiquing Phase 3 for the same
  fault, PR #47.** It watched 71 records and none of the 100 series points, which are replaced
  wholesale on release. Two of the four series have no metric declaring a `series_ref`, so a
  file left on a superseded edition would have been invisible to every check here. The series
  now declare a `source_id`, `validate-data.mjs` requires it, and the notifier reads them.
  **The primary series only:** a companion block is deliberately a different vintage, and
  `netMigration.historical` is the discontinued series at its 2020 vintage, so reading
  companions would report that file behind for ever.

### Detection: compare editions, not dates

Both routes answer one question. **Which edition is published, and is it one the site cites?**
A release is identified by the slug in its URL, and the records' own `source_url`s already
carry that slug, so this is set membership rather than a race between two clocks. It replaces
the per-source date comparison this section carried until 28 July, which was never built and
would have alerted wrongly the first time it ran; the evidence is under *What the endpoints
said on 28 July* below.

**Compare every cited edition, not the newest one.** A source-level answer hides a single
figure left an edition behind, and there is one. Same section.

**Derive the watch target from the URLs the records cite**, not from `sources.json`. The
catalogue holds a collection page for the Home Office and the tribunals, but a topic landing
page for ONS, whose bulletin path appears only on the records. Reading the records covers
both, and covers whatever is added next without another special case.

**GOV.UK sources: a JSON content API**, verified working 23 July 2026 and again on 28 July.
Covers `ho-immigration-stats` (33 records) and `hmcts-tribunals` (3).

```
https://www.gov.uk/api/content/government/collections/immigration-statistics-quarterly-release
https://www.gov.uk/api/content/government/collections/tribunals-statistics
```

Take `links.documents[]`, each carrying `title`, `base_path` and `public_updated_at`. The
newest `base_path` names the current edition, `immigration-system-statistics-year-ending-march-2026`
and `tribunals-statistics-quarterly-january-to-march-2026` on 28 July, in the same form the
records cite. `public_updated_at` still has a job, but it is the second question, not the
first: read `details.change_history` on the release to find out what moved.

**A trap worth recording.** Do NOT use the collection's own top-level `public_updated_at`. For
the tribunals collection it reads **2019-04-05** while its newest document reads 2026-06-11.
For the Home Office collection it read 2026-05-21 on 23 July, which matched, and by 28 July
its newest document had moved to 2026-07-16 while the collection field had not. The
coincidence that made this look safe lasted five days. The field describes the curated page,
not the statistics. Read the documents array.

**ONS: no usable API, but two working HTML routes**, verified the same day and again on
28 July. Covers `ons-ltim` (9 records).

The legacy `/data` JSON endpoint returns "This legacy endpoint was decommissioned on
02/02/2026". `api.beta.ons.gov.uk/v1/releases` returns 404. The release calendar RSS at
`https://www.ons.gov.uk/releasecalendar?rss` returns 200 but **ignores the query parameter
and returns only the ten most recent releases across all of ONS**, which publishes several a
day, so a weekly poll would miss a migration release entirely. Do not build on it.

What does work, both returning 200:

```
<bulletin-path>/latest             the current edition, whichever it is
<bulletin-path>/previousreleases   every edition, newest first
```

Note the lowercase in `previousreleases`; the camel-cased variant 404s. Fetch `/latest` and
read `<link rel="canonical">`, which names the edition and nothing else. **Do not match the
page for an edition-shaped URL:** `/latest` also links to `yearendingjune2025`, a previous
edition, so a page-wide match picks a wrong slug as readily as the right one. The canonical
link read `yearendingdecember2025` on 28 July, which is the edition the records cite.

### Output and placement

A report, and a GitHub issue when something is newer, naming the source, the release, and
which figures depend on it. Query the affected figures by `source_id`, which exists for
exactly this reason.

Runs on the weekly cron that already exists, and **must not fail the build**. Use
`continue-on-error`, as `check-sources.mjs` does. It is a notifier, not a gate. Of the 71
metric records, 48 come from a source with a fixed cadence and 45 of those are covered by
the two routes above. The rest should be reported as unwatched rather than silently skipped,
on the same principle the staleness check already follows: 23 figures from five irregular
sources, and three more from `ons-population`, `skills-for-care` and `mac`, which have a
cadence but no detection route here.

**Report on every run, including when nothing is new**, and separate "checked, current" from
"could not check". A notifier that speaks only when it fires cannot be told apart from one
that has stopped working, which is the reasoning the staleness check already carries and the
reason this project counts seven checks that passed while a defect shipped.

**One issue per release, not one per week.** The cron is weekly and the condition persists
until someone acts, so the same alert would open fifty-two times and be muted. Give the issue
a deterministic title carrying the edition slug and skip when an open one already exists. The
workflow declares no `issues: write` permission today, and will need it.

**Stateless.** The data layer already records which edition the site cites, so nothing here
needs a "last seen" file to go stale on its own.

### What the endpoints said on 28 July 2026

Five days after they were first verified, re-fetched before building anything. All four
routes still return 200. Three things changed the design and one concern was dropped.

- **The date comparison would alert today, and be wrong.** Newest document `public_updated_at`
  2026-07-16 against the newest `published_date` among Home Office figures, 2026-05-21. No
  new edition was published: the 16 July bump is the organised immigration crime ad hoc
  update that the by-hand run below had already found touches nothing the site cites. A
  notifier whose first alert is a false one does not get a second. Comparing edition slugs
  gives the right answer with no threshold to tune.
- **A per-source comparison cannot see a figure left behind.**
  `population/eu-settlement-scheme-settled-status-grants` cites the December 2025 edition
  while every other Home Office figure cites March 2026, and the source-level answer is
  "current", because a different figure is on the newest edition. The staleness check cannot
  see it either: it ages `retrieved_date`, 17 June, which is well inside the quarterly window.
  Recorded in `docs/BACKLOG.md` under *Found, not yet fixed*.
- **The ONS edition must come from the canonical link**, for the reason given above.
- **Dropped: the data-tables page needs no `sources.json` entry.** A record already cites
  `/government/statistical-data-sets/immigration-system-statistics-data-tables` under
  `ho-immigration-stats`, so watching it adds no publisher. That matters because the source
  catalogue renders on `/sources-and-method/`, and adding a row to it would have made a
  detection detail into an editorial change. Its `change_history` carried 16 entries naming
  exact tables, which is the corrections channel the by-hand run identified.

## Phase 1b: the corrections watch

**Built 30 July 2026, PR #48**, as `table_reference` on the records, a guard in
`validate-data.mjs` and a second half of `check-releases.mjs`. Proposed on 28 July and ordered
ahead of phase 3 by the owner. What follows is what the proposal said; *What building it found*
records what changed.

Phase 1 detects a new edition. It cannot detect a correction *inside* an edition, and says so
on every run, because the edition slug does not change when a table is amended. The cadence
check cannot infer one either. A correction is the one channel through which a wrong number can
sit on this site indefinitely, so closing it buys something a faster quarterly update does not.

The route is already fetched. The data-tables page carries a `details.change_history` of 16
entries whose notes name the exact table and the corrected value, for example: *"Updated table
'Vis_01' in 'Entry clearance visas summary tables, year ending March 2026' to amend the 'Other
work visas and exemptions' figure"*. The data layer already names its tables, twelve of them:
`ASY_03`, `Asy_00a`, `Asy_04`, `Asy_D02`, `EUSS_QTR`, `FIA_3`, `IER_02a`, `IER_D03`, `Res_01`,
`Ret_01`, `T_3`, `Vis_01`.

**Match case-insensitively.** `ASY_03` and `Asy_04` are the same publisher's naming written two
ways in this repository, so a case-sensitive match would miss one of them. The first count of
this list was six, because the pattern that produced it required a capital followed by two
lower-case letters and silently dropped `EUSS_QTR`, `FIA_3` and four others.

**Matching one list against the other produces exactly one hit in sixteen, and it is the right
one:** the 1 June `Vis_01` correction, which the by-hand run below found and recorded as
missing a published figure by a single row. One precise hit rather than sixteen notifications
is the difference between a watch someone reads and one they mute.

**It has a dependency the backlog already tracks.** `table_reference` is unimplemented, so a
table identifier survives only as prose inside `source_name` and `notes`, and matching them
means a pattern over prose. That works, and it is the weaker version. Implementing
`table_reference` on the records would make the match exact and is the better first step.

### What building it found

- **The clearing key was already in the data, and nothing needed to be stored.** A correction
  only matters where the figure has not been re-read since, so each hit is raised against that
  figure's own `retrieved_date`, and the alert clears itself when someone moves the date
  forward. That is why this is stateless in the same way phase 1 is. It is compared per figure
  rather than per table because three records cite `Ret_01` and each is re-checked on its own
  day. The series carry no `retrieved_date`, which is why the staleness check cannot age them
  either; the envelope's `lastUpdated` is the right date there, because a series is replaced
  whole. **What it does not establish**, and the run says so, is that anyone re-read anything:
  moving `retrieved_date` forward is a person's declaration, not a check.
- **Both of the matching key's other answers had to be made to fire.** Absent, and unchanged.
  A record with no `retrieved_date` is reported rather than passed, because absent means nobody
  knows when it was last read. An unchanged one keeps firing while corrections land, which is
  the point. A third case was a silent pass and is now guarded: a change-history entry with no
  `public_timestamp` compares as earlier than every date, so leaving it to the comparison would
  have cleared every figure behind it. Negative-tested, all three.
- **Restricting the match by `source_id` would have skipped the two figures that need it most.**
  `small-boat-arrivals-year-ending-march-2026` reads `IER_D03` and `IER_02a` through a Commons
  Library briefing that quotes them, so its `source_id` is `commons-library`, and a correction
  to those tables is still a correction to what it publishes. Every declared table is matched
  against the watched page, whoever the record cites. What is reported separately is the other
  thing: the tribunals and Commons Library figures whose own publisher has no corrections route
  here at all.
- **An empty change history is not a clean run.** This page has carried 16 entries since 2023,
  so an empty array means the page or its content schema moved, and it is reported as
  `COULD NOT CHECK`. Negative-tested against a GOV.UK page that answers 200 and carries no
  `change_history` at all, because a 404 exercises the fetch path instead and proves nothing
  about this one.
- **The pattern lives in `lib/tables.mjs`, because two checks have to agree on it.** The guard
  scans a record's prose and the watch scans the publisher's notes, and if the two definitions
  of "a table identifier" drifted, a record could satisfy the guard while the watch read a note
  it could never have been asked to declare. Same reasoning as `lib/series.mjs`. Widening it to
  six characters either side also matches `metric_name` and `source_url` written as prose, and
  drops `T_3`.
- **The guard runs both ways, and only the second direction makes the first one able to catch a
  typo.** Every table named in prose must be declared, and every declaration must be named in
  prose. Without the second, `Vis_1` beside prose saying `Vis_01` fails on the first rule, but a
  declaration nothing names is a string nobody can check: it matches no change-history entry,
  raises no error and is silent. That every declaration was also written in `source_name` held
  by habit until the loop that requires it. It still cannot catch a table nobody wrote down
  anywhere, and both the guard and the watch say so.
- **A second model found the one that mattered, and it was in the part this session was surest
  of.** A series clears on the envelope's `lastUpdated`, which `validate-data.mjs` checked for
  presence and never for shape: it was the only date in the data layer reaching a comparison
  without passing `isRealDate`. A prose date, which is how the `vintage` field beside it is
  already written, sorts above every ISO date, so `"22 July 2026"` would have reported every
  correction to that series' tables as already re-read, for ever. Reproduced, then fixed and
  negative-tested. Absent and unchanged had been asked of both sides of that comparison;
  malformed had been asked only of the side `checkFields` already covered.
- **`table_reference` says which table, never which page publishes it.** `ASY_03` is Migration
  Transparency Data and has never appeared in the watched history, while its record sits under
  `ho-immigration-stats`, so no `source_id`-keyed disclosure can report it as uncovered. The run
  states the limit in general rather than pretending the list is exhaustive. The case fold has
  the same root: `ASY_03` and `Asy_NN` are different schemes, so a correction to an `Asy_03` on
  the watched page would raise `ASY_03`'s record. Folded anyway, because the failure it prevents
  is a correction nobody sees and the failure it risks is a person reading a note.
- **No CI change was needed**, which is the argument for the watch living inside
  `check-releases.mjs` rather than beside it. The step, the `tee`, the `continue-on-error` and
  the deduplicated issue already existed; the signature grew the corrected tables and the date,
  so a second correction landing while the first issue is open opens a second rather than
  hiding inside it.

## Phase 2: the evidence contract, and the check that enforces it

**Built 28 July 2026, PR #43**, as `scripts/check-evidence.mjs`, `data/evidence/` and a CI step
that gates. What follows is what the scope said; the block below is what building it changed.

The safety mechanism. Build it before Phase 3, and it is worth having even if Phase 3 is
never built, because it applies equally to a human update.

### Five things the scope had wrong or did not say, found by building it

- **The exemption list had doubled while this sat unbuilt, and naming figures by ref would
  have broken two of them.** The scope names one calculated figure,
  `asylum/returns-enforced-plus-voluntary`. There are now three, because the review
  corrections created two in the week between: `asylum/people-in-asylum-accommodation` in
  PR #38 and `population/foreign-born-share-mid-2024` in PR #33. A hard-coded ref list would
  have left both under the direct rule, required to quote a value that appears in no source
  and could not be made to pass honestly. The exemption is keyed on `confidence_level`, so a
  figure the site already grades as derived is exempt by that grading and by nothing else.
- **The scope's range rule contradicts its derived rule, on the only metric either applies
  to.** The one range, `fiscal/net-fiscal-impact-of-immigration-as-a-share-of-gdp`, is also
  `estimated`. Resolved by making the two orthogonal: `value_type` decides *which* values need
  evidence, so a range needs both bounds, and `confidence_level` decides *how*, quoted
  directly or through components with the arithmetic stated. Today's range takes the derived
  path, so its inputs are quoted and its bounds are not. A range that is not derived would
  need both bounds in the quote, and that path exists and is tested even though nothing uses
  it yet.
- **It fails when it cannot see the base branch, which the scope does not say.** A comparison
  against nothing finds no changed figure and would report that as a clean run, which is the
  shape of all seven checks here that passed while a real defect shipped. The message names
  the fetch to run. The same reasoning covers the other way of comparing nothing: on every
  push to main after a merge, the base and `HEAD` are the same commit, and the report says so
  rather than announcing that no figure changed.
- **Entries are matched, never validated wholesale.** The evidence files are kept, so an entry
  naming a metric since renamed or dropped is history rather than a defect. A check that
  failed on one would push someone into deleting the audit trail to get a green run.
- **Series were not covered at first, and now are.** The contract began at metrics, and the
  check counted the changed series files on every run rather than leaving the gap to be
  inferred. That was the largest hole left in it: 100 published points could move with nothing
  asking where they came from. Closing it needed a different unit of evidence rather than a
  bigger version of the same one, and what that unit is, why, and what it still does not
  establish are in `data/evidence/README.md`, which is where the contract lives and where the
  check's own error messages send an author. Not restated here.
- **One thing found while closing it belongs in this scope rather than there.** Matching an
  entry on its vintage cannot distinguish a correction the publisher made inside an edition from
  an entry written before the change, so a fabricated middle point passed. That is the same hole
  phase 1b watches, arriving from the other direction, and it was the argument for ordering 1b
  early: this check can refuse an unexplained within-edition move, but only once someone has
  noticed the edition changed at all. Since 30 July something does the noticing.

Both CI traps were real and are handled as the scope preferred: `actions/checkout@v4` still
carries no `fetch-depth`, and the step runs an explicit fetch rather than deepening every job.
**A third the scope does not name:** the command it implies, `git fetch --depth=1 origin main`,
updates `refs/remotes/origin/main` only opportunistically, when the remote's configured refspec
happens to cover it, and checkout configures a narrow one on a `pull_request` event. The
refspec is written out in full so the remote-tracking ref exists either way. Getting this wrong
fails loudly rather than silently, but it fails on every pull request.
The subdirectory claim holds, and was checked rather than
assumed: a `.json` inside `data/evidence/` does not trip `validate-data.mjs`, whose scan
filters on files ending `.json` and never sees a directory, and Eleventy reads its global data
from `content/_data`, so nothing there reaches the build.

### The contract

Any change to a figure's `value` must be accompanied by an evidence entry:

```json
{
  "ref": "asylum/asylum-applications",
  "previous_value": 93525,
  "value": 97120,
  "source_url": "https://www.gov.uk/government/statistics/...",
  "fetched_at": "2026-08-27",
  "table_reference": "Asy_D01",
  "quote": "There were 97,120 people who claimed asylum in the UK in the year ending June 2026."
}
```

**A quote is not always a sentence.** Much of this data lives in ODS tables rather than prose,
and several records already name one in `source_name`: `Asy_00a`, `Vis_01`, `Ret_01`. Where
the figure comes from a spreadsheet cell, the quote is the row and column labels with the
value, for example `"Asylum applications, main applicants, year ending June 2026: 97,120"`.
The check is unaffected, since it only asks that the value appear in the text, but the
contract has to permit this or an implementer will either invent sentences that are not in the
source or conclude the field cannot be filled.

### The check

For every metric whose `value` differs from the same metric on the base branch, **or which
does not exist on the base branch at all**, require an evidence entry, and require **the new
value to appear verbatim in `quote`**, tried in both formatted and bare forms, exactly as
`checkLiterals` already does with `toLocaleString('en-GB')` and `String(value)`. If the quote
does not contain the digits, fail.

**New metrics matter more than changed ones**, and an earlier draft of this scope missed
them. The eight fabricated figures were new research, not an update to existing records. A
rule that only watches changed values would not have caught the thing this check exists for.

**Two implementation traps, both of which would cost an hour.**

The previous values come from the base branch, and **CI cannot currently see it**.
`.github/workflows` uses `actions/checkout@v4` with no `fetch-depth`, which is a depth-1
shallow clone, and on a `pull_request` event `origin/main` is not fetched at all, so
`git show origin/main:data/asylum.json` fails. Either set `fetch-depth: 0` on the checkout
step, or add an explicit `git fetch --depth=1 origin main` before the check runs. Prefer the
explicit fetch: a full clone slows every job for the benefit of one.

The evidence files go in **`data/evidence/`**, one per release, named for the source and the
release, and they are **committed and kept**. They are the audit trail the corrections policy
implies, and they are what makes a figure's history reconstructible a year later. A
subdirectory rather than a loose file, because `validate-data.mjs` errors on any unrecognised
`.json` directly inside `data/`, deliberately, so that no data file goes unvalidated. A
directory is filtered out of that scan and is therefore safe.

**This is the check that would have caught the eight fabricated figures**, with no reviewer
involved, because a fabricated value cannot appear in a quote taken from a real page.

### Exemptions, and why they are small

**Most records are read straight off a release**, `official` or `provisional`, and should quote
cleanly. A small minority need something else, and that minority is what this section is about.

**The counts are deliberately not written here any more, and the reason is the third time they
went stale.** This section was scoped with "three of 67", corrected once to "64 of the 71
records (46 `official`, 18 `provisional`)", and was wrong again by 31 July 2026, both because the
data layer grew and because a regrade moved one record between the two groups. A count in a
document is a count nothing reads. Derive it:

```
node -e "['migration','asylum','population','fiscal'].flatMap(f=>require('./data/'+f+'.json').metrics).reduce((n,m)=>(n[m.confidence_level]=(n[m.confidence_level]||0)+1,n),{})"
```

- **The `calculated` figures**, each a sum or a share of published components. Require every
  component to be evidenced instead, and require the arithmetic to be stated.
- **The `estimated` figures**, which are interpolations or scenarios. Require a quote for
  whatever they are derived from and a sentence naming the derivation.
- **One of the `estimated` figures is also the only range metric**, which has no single value. A
  range evidences `range_min` and `range_max` rather than a value.

Keep the exemption list explicit and small. An exemption that can be claimed freely is how
this check would rot.

## Phase 3: the update prompt

**Built 30 July 2026, PR #56**, as `docs/prompts/update-from-release.md`. What follows is the
design it was built to, and the seven things settled first.

Only after Phase 2 exists and has been exercised. **Both were true before it was written**: the
evidence check was built on 28 July 2026 and exercised the same day on a real figure, PR #45. So
was the third condition added later: the by-hand runbook it delegates from, `docs/UPDATING-DATA.md`,
was written first, on the rule that you should be able to do a job before you delegate it.

**It is deliberately thin, and that is the design rather than an omission.** It names the source,
the release and the refusals, and sends the assistant to the runbook for the procedure. Everything
this scope once said about steps and fields now lives there.

### What building it found

- **The first subdirectory under `docs/` escaped the rule that tracks planning documents.**
  `validate-content.mjs` required every `docs/*.md` to be referenced from the backlog, and did not
  descend, so `docs/prompts/update-from-release.md` was invisible to it on the day it was created.
  The document whose whole purpose is that a scope cannot be written and forgotten was itself
  unforgettable only by luck. Now recursive, matching on the path relative to `docs/` so two
  documents sharing a basename in different directories cannot satisfy the rule through each
  other, and so a nested file cannot inherit a top-level exemption. Negative-tested three ways.
- **Nothing about the prompt is a check, and the prompt says so first.** What makes it safe is
  that three existing checks refuse its worst outputs. That claim is load-bearing enough to be
  stated at the top of the file rather than buried.

### Seven things to settle before writing it, found on 28 July

The first two are blockers, and both come from the same hole: **the series files are not in
this procedure anywhere.**

- **As scoped, it cannot do an ONS update at all.** Four metrics declare a `series_ref`, and
  `validate-data.mjs` refuses a metric whose value disagrees with the series point it names.
  All four are `ons-ltim`: `net-migration`, `net-migration-2`, `total-long-term-immigration`
  and `total-long-term-emigration`. An update that moves those four records and not the series
  produces a pull request that cannot pass CI. Nothing below mentions a series file.
  **And the reach is wider than this bullet says**, which the built prompt understated too until
  a second model checked it: two of the four series files, `asylumApplicationsTimeseries.json`
  and `asylumBacklogTimeseries.json`, are `ho-immigration-stats` and are replaced whole on every
  Home Office quarterly. So the series problem covers two of the three cadenced releases, not
  one, and only the tribunals release is free of it.
- **The query it is built on could not find them either, and now can.** The series files
  carried no `source_id`, so "list the affected figures by `source_id`" reached 71 records and
  none of the 100 series points. They carry one as of PR #47 and `validate-data.mjs` requires
  it, which also let the notifier start watching them. Both watched sources move series on
  release: two files are ONS, two are Home Office, and the single-vintage rule means each is
  replaced whole rather than appended to. What remains is the decision above: this procedure
  refuses series work and hands it to a person, or grows a second half. Refusing is defensible,
  silently omitting is not.
- **The field list is half of what a real update touches.** It names `value`, `period_label`,
  `date` and `retrieved_date`. PR #45 also changed `source_name`, `source_url`,
  `published_date` and `notes`. Four of eight leaves a record citing the superseded edition's
  URL beside the new edition's value.
- **"Locate each figure in the named table" would have returned `UNVERIFIED` for a figure that
  was perfectly verifiable.** The EUSS value appears in no table: it is the bulletin's own
  total, and the tables give 270,235 settled conclusions plus a 100,300 automated estimate.
  The step is reconcile, not look up. And `table_reference` is then omitted rather than
  guessed, because naming a table that does not hold the value is the defect correction 1c
  existed to fix.
- **"Never edit prose" has to say which prose.** Page prose, plainly. But the record's own
  `notes` said "an estimated 86,670 automated grants" beside a figure now built on 100,300,
  and "4.4 million" where the release says 4.5 million. Leaving those would have shipped two
  false statements inside the data layer. Notes are re-read against the release every time;
  pages are never touched.
- **Where it runs is unpinned, and that is the line this document is built on.** It is run by a
  person with an assistant, on their machine. Not by CI: opening a pull request from CI needs
  `contents: write`, which is a far larger grant than the `issues: write` the notifier uses,
  and it moves the human gate rather than keeping it.
- **A prompt is never part of the checking apparatus.** The line below overclaims. What makes
  this safe is that three checks already refuse its worst outputs: `check-evidence.mjs` refuses
  an unquoted value, `check-releases.mjs` refuses to call a record current when it cites a
  superseded edition, and `validate-content.mjs` refuses a value written longhand in prose.
  Version the prompt because a procedure worth following is worth diffing, not because it
  checks anything.

**Lives in the repository** at `docs/prompts/update-from-release.md`, versioned and
reviewable.

**Input:** a `source_id` and a release URL, from the notifier's issue.

**Procedure: `docs/UPDATING-DATA.md`, under *The procedure*.** It is not restated here. The
runbook was written on 30 July 2026 and is the by-hand version of this same job, so a prompt that
carried its own copy would be the duplication this project has been burned by twice, and the copy
a session happens to read would win. **Where the two disagree the runbook is right.**

The paragraph that stood here until then said "list the affected figures by `source_id`; fetch
the release; locate each figure in the named table; write the evidence file; update `value`,
`period_label`, `date` and `retrieved_date` on each record; run `npm run validate` and
`npm run build`". Four of its clauses are now known wrong: `source_id` alone misses the Commons
Library record that reads Home Office tables; the step is **reconcile**, not locate, because the
EUSS figure is in no table; four fields is half of what an update touches; and those two commands
omit `check-evidence`, which gates, and `check-releases`, which is the only check that sees a
record still citing the old edition. It is quoted here rather than deleted so that anyone
returning to this scope can see the version they may have followed.

Everything else about phase 3 stays here: what it is for, where it runs, its input, and the hard
rules below. Only the steps move.

**Hard rules, all of which have a reason in this repository's history:**

- Never write a value you have not quoted. Anything not found comes back `UNVERIFIED` and the
  record is left unchanged.
- Never change `period_label` or `date` without saying why in the PR body; those two are what
  the period-consistency check reads.
- Never touch a figure whose `source_id` is not the one being updated.
- Never edit prose. A changed figure may make a chart summary wrong, and nothing checks that.
  Leave the sentences alone and list the pages that cite the figure, which is a query rather
  than a judgement: every page and claim declares its dependencies under `figures:` in front
  matter, precisely so a data update can find the content it affects.
- Fail rather than guess if the release has changed shape. A renamed table, a discontinued
  series or a changed basis is an editorial decision, not an update.
- Never merge.

## Phase 4: tell the reader

Publishing this changes what the site says about itself, and the site's standard is that a
reader should not discover that from the repository. `content/sources-and-method.md`
currently says:

> "Updating is manual and deliberate. There is no automated pipeline pulling numbers straight
> onto the site, because an automated update that publishes an error is worse than a slow one
> that does not."

That sentence would become misleading: drafting would be assisted, review and publication
would not. It needs rewriting to say exactly that. The two stronger claims, "No figure appears
here because a model asserted it" and the register's "never publishes figures", both survive
and are worth keeping, because Phase 2 makes the first one enforceable rather than merely
promised.

**This is a reader-facing trust statement and needs the owner's sign-off**, in the same way
the update commitment does.

## Sequencing

| Phase | Worth building alone? | Depends on |
| --- | --- | --- |
| 1, notifier | **Built, 28 July 2026, PR #46.** Closes "nothing detects a release happened". | Nothing |
| 2, evidence check | **Built, 28 July 2026, PR #43.** Applies to human updates too. | Nothing |
| 1b, corrections watch | **Built, 30 July 2026, PR #48.** Closes the one channel through which a wrong number can sit here indefinitely. | Nothing. `table_reference` was built with it |
| 3, prompt | **Built, 30 July 2026, PR #56.** No, and it was not built alone: unsafe without 2, and the runbook had to exist first. | 1, 2, and `docs/UPDATING-DATA.md` |
| 4, disclosure | Not applicable. **The only phase left.** | 3, and owner sign-off |

**None of it should delay launch.** Launch waits on two decisions, and this changes neither.
The first real run of Phase 3 should be against a release that was going to be checked by
hand anyway.

## Risks

**Automation bias, not fabrication.** Phase 2 handles fabrication mechanically. The real
danger is that a tidy evidence table invites a reviewer to skim, and the failure mode is a
person reviewing less carefully because the work looks finished. Two mitigations: keep the
quote and the diff side by side so review is comparison rather than reading, and **do not
tighten the update commitment because drafting got faster**. Review is the bottleneck worth
protecting.

**Detection is not revision detection.** GOV.UK bumps `public_updated_at` for added
attachments and typo fixes as well as new editions. The notifier says "look at this", never
"this changed".

## The check, run by hand on 23 July 2026

Run against every GOV.UK page the site cites, as a dry run of Phase 1. **Three changes since
the site last checked, none of which touches a published figure.**

| Date | Change | Effect |
| --- | --- | --- |
| 2026-07-16 | Updated "What is being done to stop organised immigration crime?" following an ad hoc statistical release | None. The site cites six Home Office pages and that is not one of them. |
| 2026-06-10 | Correction to sheet `CIT_02`: the **2021** citizenship grant total is now 189,803 | None. The site's citizenship figure is year ending March 2026, and 189,803 appears nowhere in the repository. |
| 2026-06-01 | Correction to `Vis_01`: "Other work visas and exemptions" for 2025 amended from 147,778 to **26,872** | None, narrowly. The site's only `Vis_01` figure is family visas, a different row, and it is unpublished reserve. |

The third missed by one row. A correction of 120,906 landed in a table this site cites.

### Two findings from the run that change the design

**Sub-pages have no change history and inherit the parent's timestamp.** All three asylum
sub-pages report `public_updated_at: 2026-07-16` with `change_history: []`, purely because a
different part of the release moved. A notifier watching sub-page timestamps would fire on
every sub-page every time any part of the release changed, which is noise that would get it
switched off. **Watch the parent release; read its `details.change_history`.**

**The higher-value target is the data tables page, not the release.** Two of the three changes
were corrections landing on `/government/statistical-data-sets/immigration-system-statistics-data-tables`,
which carries sixteen change-history entries with notes naming the exact table and the
corrected value. Corrections between editions are precisely what a cadence-based check cannot
infer, and this is where they surface. Watch it as a first-class source, not as one URL among
many.

**A changed figure can falsify prose that no check reads.** Already a known limit, published
on the sources page. Automation makes figures change faster without making that limit
smaller, which is why Phase 3 is forbidden from editing prose.
