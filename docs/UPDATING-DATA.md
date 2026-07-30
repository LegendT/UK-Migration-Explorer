# Updating the data

How to move this site onto a new release **by hand**. It exists before any of it is automated,
because you should be able to do a job before you delegate it, and because the assistant-drafted
version in `docs/UPDATE-AUTOMATION.md` phase 3 is this procedure with a person still holding the
gate. If the two ever disagree, this document is right.

Written 30 July 2026. Modelled on `~/Projects/DEBT/docs/UPDATING-DATA.md`, which is shorter
because its data layer is smaller and carries no evidence contract.

**The one rule everything else serves:** no figure changes without a quote from a source you
fetched, written down before you touch the record. `check-evidence.mjs` enforces it and the
build fails without it.

## When

Three releases carry a promise of one month, signed 23 July 2026:

| Release | How often |
| --- | --- |
| Home Office, immigration system statistics | Quarterly |
| ONS, long-term international migration | Twice yearly |
| Ministry of Justice, tribunals statistics | Quarterly |

Everything else is irregular and carries no promised schedule. Three things tell you to go and
look, and only the third is a calendar:

- **`check-releases.mjs` opens an issue** naming the source, the edition and the figures that
  cite the old one. That issue is the input to this procedure.
- **The same script raises a corrections hit** when a table declared in a record's
  `table_reference` was amended *inside* the edition the site already cites. **The step is the
  comparison, and the date is only the receipt for it.** Re-read the row this site publishes. If
  the value moved, that is a full update from step 3 onwards: evidence, the fields, the
  changelog. Only then move `retrieved_date`, or for a series `lastUpdated` plus a `correction`
  field in the evidence entry.

  Getting that order backwards is the most dangerous thing on this page. `check-evidence.mjs`
  only fires when a value **changed**, so a bumped `retrieved_date` beside a value that should
  have moved and did not passes every check, **clears the alert for ever**, and silences the one
  channel through which a wrong number can sit on this site indefinitely. Nothing downstream can
  tell. The checks say as much themselves: moving the date forward is a person's declaration,
  not a check.
- **`validate-data.mjs` reports figures overdue** against their source's cadence. It is a guess
  about time, not a detection of anything, so treat it as a prompt to go and look.

## Before you touch anything

```sh
git checkout main && git pull
git checkout -b update-<source>-<edition>
```

`check-evidence.mjs` compares against `origin/main` and **fails rather than skips** when it
cannot see it. If you are working offline or on a shallow clone, fetch the base first.

## The procedure

### 1. List what the release touches

The notifier's issue already lists them. To ask the data layer directly, which also catches the
series files the issue groups separately:

```sh
node --input-type=module -e '
import {readFileSync,readdirSync} from "node:fs";
const want=process.argv[1];
for(const f of readdirSync("data").filter(f=>f.endsWith(".json"))){
  const d=JSON.parse(readFileSync("data/"+f,"utf8"));
  if(d.source_id===want) console.log("series", f, d.vintage??"");
  for(const a of Object.values(d)) if(Array.isArray(a)) for(const m of a)
    if(m?.id&&m.source_id===want) console.log("metric", f.replace(".json","")+"/"+m.id, m.value);
}' ons-ltim
```

On 30 July 2026 that prints nine `ons-ltim` metrics and two series files. Run it rather than
counting by hand: the two series were invisible to every check here until PR #47 gave them a
`source_id`, and a list that omits them is how an update passes validation and ships half a
release.

Every record carries `source_id` for exactly this. **Series files carry one too**, as of PR #47,
so a source that moves a series shows up here rather than being invisible. Note which of the four
`series_ref` metrics are in scope: `net-migration`, `net-migration-2`,
`total-long-term-immigration` and `total-long-term-emigration` are all `ons-ltim`, and moving any
of them without its series point fails `validate-data.mjs`.

Do not touch a figure whose `source_id` is not the one you are updating. A release you are not
reading is not a release you can evidence.

**One deliberate exception, or you will meet an alert you cannot clear.**
`asylum/small-boat-arrivals-year-ending-march-2026` reads Home Office tables `IER_D03` and
`IER_02a` through a Commons Library briefing, so its `source_id` is `commons-library` and the
command above will not list it under `ho-immigration-stats`. The corrections watch matches every
declared table **whatever the record cites**, so a Home Office correction can raise a record this
step tells you not to touch. When that happens the record is in scope: re-read it through the
briefing that publishes it, and if the briefing has not caught up, say so and leave the value
alone rather than reading the table directly under a citation that does not point at it.

### 2. Go to the tables, not the bulletin

This is the rule that has paid for itself most often here. The HTML bulletin aggregates, and
twice a site figure looked **wrong** against it and was right: the bulletin prints 39% allowed
and 61 weeks for the whole immigration chamber, while tables `FIA_3` and `T_3` give 40% and 67
weeks for asylum and protection. Believing the bulletin would have introduced two errors while
correcting them.

`.ods` and `.xlsx` are zip archives. If a fetch cannot read one, download it and parse the sheet
XML directly rather than giving up or falling back to the bulletin.

### 3. Reconcile, do not look up

"Find the figure in the named table" is the wrong instruction and would have returned
`UNVERIFIED` for a figure that was perfectly verifiable. The EUSS settled-status total appears in
no table: it is the bulletin's own total, and the tables give 270,235 settled conclusions plus a
100,300 automated estimate that sums to it. The step is to reconcile what you find against what
is published, and to write down how they meet.

If they do not meet, stop. A changed basis is an editorial decision, not an update.

### 4. Write the evidence first

One file per release in `data/evidence/`, named for the source and the edition. **The shape,
every field, the derived-figure form and the series form are in `data/evidence/README.md`.** Read
it there; it is not repeated here, because a contract kept in two files is one that drifts.

Two things worth knowing before you open it:

- A quote is not always a sentence. Where the figure is a spreadsheet cell, quote the row and
  column labels with the value.
- `table_reference` in an evidence entry is **one string, the table this quote came from**. It is
  not the record's field of the same name, which is an array of every table that record draws on.
  If the value came from the bulletin narrative, omit it rather than guessing. Naming a table that
  does not hold the value is the defect correction 1c existed to fix.

### 5. Update the record, which is more fields than the scope thought

The field list is longer than it looks. PR #45, the only by-hand update this project has done,
changed **eight**:

| Field | |
| --- | --- |
| `value` | the new figure |
| `date` | period END, never the publication date |
| `period_label` | must agree with `date`, and the consistency check reads both |
| `source_name` | carries the edition in its text |
| `source_url` | carries the edition in its slug, and `check-releases.mjs` reads that slug |
| `published_date` | when the publisher published it |
| `retrieved_date` | when **you** read it, and what clears a corrections alert |
| `notes` | see below |

Updating four of the eight leaves a record citing the superseded edition's URL beside the new
edition's value. **That torn state is what the four-field procedure in
`docs/UPDATE-AUTOMATION.md` would produce, not what PR #45 fixed.** PR #45 fixed a record that
was consistently a release behind, old value beside old URL, which is a different and more
visible fault. The torn one has never happened here, and it is the one no reader could spot.

**A ninth that did not exist then.** `table_reference` was added in PR #48, after that update, so
it is not in the eight above. It is an **array** of every publisher table the record draws on,
and `validate-data.mjs` runs the rule **both ways**: a table named in the record's own
`source_name` or `notes` must be declared, and a declaration must be named in the prose. If a new
edition renames or splits a table, that array moves with it. Get it wrong and the corrections
watch either cannot see a correction to that table, or matches a string nobody can check.

### 6. Re-read the notes, and leave every page alone

**Record `notes` are re-read against the release every time.** They are prose the site wrote, not
the source's, and they go stale silently. PR #45's note said "an estimated 86,670 automated
grants" beside a figure built on 100,300, and "4.4 million" where the release said 4.5 million.
Leaving them would have shipped two false statements inside the data layer.

**Page prose is never touched during an update.** A changed figure can make a chart summary wrong
and nothing checks that, which is a limit published on `/sources-and-method/`. List the affected
pages and hand that list on as a separate job.

**That list takes three queries, not one**, and the obvious single query misses the two things
most likely to be wrong:

```sh
grep -rl "theme/metric-id" content/          # figures: front matter and inline tokens
grep -n "theme/metric-id" data/dashboard.json # the home page cites cards, not front matter
grep -rn "series\." content/*.njk             # charts, which no figures: block declares
```

`content/index.njk` carries **no** `figures:` block at all: the home page draws from
`dashboard.json` card refs. And no page declares a series under `figures:` anywhere, so for a
move of `asylumApplicationsTimeseries.json` or `asylumBacklogTimeseries.json`, neither of which
is protected by a `series_ref` metric, the front-matter query returns nothing at all.

**A third kind of prose sits between the two rules above, and it renders to the most-read page.**
`dashboard.json`'s `whatThisMeans` prints on the home page, and `meta.json`'s `keyCaveats` print
as site-wide caveats. They are not record `notes` and they are not page prose. They carry longhand
figures and period-relative claims like "down 9% on the previous 12 months". **Re-read them like
notes**, because an update is exactly when they go wrong, and `npm run validate` only prints them
for review. While you are there, read the unrecorded-longhand list for your source in that same
output: it exists because current-edition figures written longhand go wrong at a release, and a
release is what you are doing.

### 7. Series, if the release moves one

A series is replaced **whole**. ONS states you cannot append the latest estimates to a series from
an earlier release, and the single-vintage rule enforces it, so do not append points.

- Replace the array. **`published_date` is on every point, not on the block**, and the vintage a
  check reads is `data[0].published_date`. Each point also carries its own `source_name` and
  `source_url`, and it is that point URL's slug the release watch attributes the series by, so a
  replaced array whose points still carry the old slug reads as behind for ever.
- Set `lastUpdated`, which is on the **file envelope**, once per file rather than per block.
  **It must be a real `YYYY-MM-DD` date.** It is the corrections watch's clearing key for a whole
  series, and
  it was the one date in the data layer reaching a comparison without passing `isRealDate`: a
  prose date, which is how the `vintage` field beside it is written, sorts above every ISO date
  and would have cleared every correction to that series for ever. Guarded since PR #48, and the
  reason the guard exists is worth knowing when you are typing the field.
- Keep the four `series_ref` metrics in step, or the build fails.
- Evidence is **per array and per release**, carrying the vintage, the point count and a quote
  holding both ends. `data/evidence/README.md` has the shape.
- **Companion blocks are separate series with their own release.** `netMigration.historical` is
  the discontinued series frozen at its 2020 vintage; it does not move and needs no entry.
- If the array moves while the vintage does not, that is a correction and needs a `correction`
  field saying what changed.

### 8. Run everything, do not assume

```sh
npm run validate
npm run build
npm run check-evidence
npm run check-releases   # network. The only check that sees a record still citing the old edition
npm run check-sources    # network. The only check that resolves the URLs you just typed
npm run a11y             # runs build again, so put it last
```

`check-evidence` gates on the work you just did. If it passes and you cannot say which quote
covers which figure, something is wrong with the evidence, not with the check.

**The two network checks are not optional here, whatever CI does with them.** CI runs
`check-sources` under `continue-on-error`, so a dead source URL you just typed ships silently.
And `check-releases` is the **only** thing that catches a record still citing the superseded
edition, which is exactly what you ship if `source_url` slipped out of the eight fields: the
other four commands all pass green on that state. The worked example below is a record in that
state, and neither of the checks that existed at the time could see it.

### 9. Write the changelog entry, because the site promises it

`/sources-and-method/` tells readers: *"Every change to a published figure is recorded in a
public changelog, with the reason and the source."* That is a promise, not a convention, and
nothing checks it. An update that skips `CHANGELOG.md` makes the site's own trust page false.

Under `## Unreleased`, a heading naming the figure and the date, then:

- **the new value and the one it replaces**, both with their periods,
- **why it changed**, which is usually "a new edition" but was "it was a release behind" for
  PR #45,
- **the source and the quote**, and the evidence file the entry lives in,
- **anything the check could not establish**, such as a reconciliation done by arithmetic that
  the release does not state.

The convention for dates in that file is stated at the top of `CHANGELOG.md` itself, which wins
if this ever disagrees with it.

**One page prose exception, because step 6's rule would otherwise make a promise false.**
`/sources-and-method/` publishes a *Reference periods do not line up* table introduced by "At the
last update:", listing the period each family of measures covers. Any of the three cadenced
updates falsifies a row of it, and no check reads a period label. So that table is the single
piece of page prose an update **does** edit, and the changelog entry should say it was. Leaving
it is not the safe option here; it is a stale promise on the page that explains the site's
method.

**When the value did not change**, which the checks are quietest about. A new edition that prints
the same number still moves the other seven fields, or `check-releases.mjs` reports the record
behind for ever. No check demands an evidence entry, because none fired. Write one anyway, or at
least a changelog line saying the edition was read and the figure held, because this is the one
path where nothing mechanical records that a person looked.

### 10. Open a pull request, and do not merge

Put the evidence table in the body **beside the diff**, so review is comparison rather than
reading. Say why `period_label` or `date` moved, since those two are what the period-consistency
check reads.

Then stop. Review is the bottleneck worth protecting, and it is the whole reason this site can
say no figure appears here because a model asserted it.

## When to stop and ask rather than update

- A table has been renamed, discontinued, or changed basis.
- The reconciliation in step 3 does not come out.
- The release covers a period the site's `period_label` cannot express.
- The figure would need a new record, or a record would need dropping.
- Anything at all about a claim page's verdict or short answer.

Each of these is an editorial decision. An update that makes one silently is worse than an update
that does not happen.

## What this procedure does not establish

- **That anyone re-read anything.** Moving `retrieved_date` forward is a declaration by a person,
  not a check, and the corrections watch says so on every run.
- **That the prose around a figure is still true.** Citations protect values, never the verbs
  around them.
- **That the figures not in scope are current.** This procedure deliberately touches one source,
  and `check-releases.mjs` does **not** cover the rest. It watches two GOV.UK collections and one
  ONS bulletin. On 30 July 2026 the other eight cited sources, including the NAO, the Commons
  Library, the Migration Observatory, ICIBI and the OBR, are reported as **not watched** on every
  run, with no detection route at all. They are aged by cadence in `validate-data.mjs`, which is
  a guess about time. Read the "Not watched" block; it is printed for exactly this reason.
- **That a figure the edition check cannot compare is current.** Both small-boats figures cite
  evergreen pages that name no edition, so the comparison reports "cannot be compared" rather
  than passing them. Those need a hand check each cycle and nothing will remind you.

## The worked example

PR #45, 28 July 2026, `population/eu-settlement-scheme-settled-status-grants`. Found while
re-verifying the phase 1 endpoints: it held 354,647 for the year ending December 2025 while every
other Home Office figure cited the year ending March 2026. Neither existing check could see it,
which is why the notifier now compares per cited edition rather than per source.

It is worth reading as a diff. It shows all eight fields moving together, a note rewritten against
the release, a reconciliation recorded inside the note because no table carries the published
total, and an evidence entry that names no table for the same reason. No page cites that record,
so nothing a reader sees changed, and that was proved by diffing the built site rather than
asserted.
