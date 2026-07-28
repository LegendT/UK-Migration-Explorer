# Update automation, scoped

What can be automated about keeping this site current, what must not be, and in what order to
build it. Scoped 23 July 2026. **Phase 2, the evidence check, was built on 28 July 2026, PR #43.
Phases 1, 3 and 4 are not built.** Phase 2 below is now the reasoning behind what exists; the
rest is still a scope.

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

Detect that a source has published a newer release than the one the site cites. The same
shape as `check-sources.mjs`, a network check that reports and never gates, though with two
detection strategies rather than one loop over a list. Worth building on its own, whether or
not anything later is.

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
- **Series points are not covered, and the check says so on every run.** The contract is
  metrics. The four series files are replaced wholesale from a single release under the
  single-vintage rule, and their 100 points carry no evidence. The report counts the changed
  files rather than leaving the gap to be inferred.

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

**64 of the 71 records are read straight off a release** (46 `official`, 18 `provisional`) and
should quote cleanly. Seven need something else. The counts are corrected from the three of 67
this section was scoped with, for the reason in the block above.

- **Three `calculated` figures**, each a sum or a share of published components. Require every
  component to be evidenced instead, and require the arithmetic to be stated.
- **Four `estimated` figures**, which are interpolations or scenarios. Require a quote for
  whatever they are derived from and a sentence naming the derivation.
- **One of those four is also the only range metric**, which has no single value. A range
  evidences `range_min` and `range_max` rather than a value.

Keep the exemption list explicit and small. An exemption that can be claimed freely is how
this check would rot.

## Phase 3: the update prompt

Only after Phase 2 exists and has been exercised.

**Lives in the repository** at `docs/prompts/update-from-release.md`, versioned and
reviewable. A prompt you cannot diff is not part of the checking apparatus.

**Input:** a `source_id` and a release URL, from the notifier's issue.

**Procedure:** list the affected figures by `source_id`; fetch the release; locate each figure
in the named table; write the evidence file; update `value`, `period_label`, `date` and
`retrieved_date` on each record; run `npm run validate` and `npm run build`; open a **draft**
pull request with the evidence table in the body beside the diff.

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
| 1, notifier | Yes. Closes "nothing detects a release happened". | Nothing |
| 2, evidence check | **Built, 28 July 2026, PR #43.** Applies to human updates too. | Nothing |
| 3, prompt | No. Unsafe without 2. | 1 and 2 |
| 4, disclosure | Not applicable | 3, and owner sign-off |

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
