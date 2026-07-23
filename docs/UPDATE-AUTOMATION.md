# Update automation, scoped

What can be automated about keeping this site current, what must not be, and in what order to
build it. Nothing here is built. Scoped 23 July 2026.

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

### Detection, per source type

**GOV.UK sources: a JSON content API, verified working 23 July 2026.** Covers
`ho-immigration-stats` (13 published figures) and `hmcts-tribunals` (2), which is 15 of the
22 figures on a fixed cadence. `sources.json` already stores collection landing pages rather
than release-specific slugs, which is exactly what this needs.

```
https://www.gov.uk/api/content/government/collections/immigration-statistics-quarterly-release
https://www.gov.uk/api/content/government/collections/tribunals-statistics
```

Take `links.documents[]`, each carrying `title`, `base_path` and `public_updated_at`, and
compare the newest against the newest `published_date` among the figures citing that
`source_id`.

**A trap worth recording.** Do NOT use the collection's own top-level `public_updated_at`.
For the Home Office collection it happens to read 2026-05-21, which matches. For the
tribunals collection it reads **2019-04-05**, while its newest document reads 2026-06-11,
which is the date the site actually records. The collection field describes the curated page,
not the statistics. Read the documents array.

**ONS: no usable API, but two working HTML routes**, verified the same day. Covers
`ons-ltim` (7 figures).

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

Note the lowercase in `previousreleases`; the camel-cased variant 404s. Fetch `/latest`,
extract the edition slug, and compare it with the slug already in our `source_url`, which for
the current figures ends `yearendingdecember2025`.

### Output and placement

A report, and a GitHub issue when something is newer, naming the source, the release, and
which figures depend on it. Query the affected figures by `source_id`, which exists for
exactly this reason.

Runs on the weekly cron that already exists, and **must not fail the build**. Use
`continue-on-error`, as `check-sources.mjs` does. It is a notifier, not a gate. The four
irregular sources (NAO, Commons Library, Migration Observatory, OBR, 14 figures between them)
have no cadence to check against and should be reported as unwatched rather than silently
skipped, on the same principle the staleness check already follows.

## Phase 2: the evidence contract, and the check that enforces it

The safety mechanism. Build it before Phase 3, and it is worth having even if Phase 3 is
never built, because it applies equally to a human update.

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

**64 of the 67 figures are read straight off a release** (47 `official`, 17 `provisional`) and
should quote cleanly. Only three need anything else:

- **One `calculated` figure**, `asylum/returns-enforced-plus-voluntary`, which is the sum of
  two published components. Require both components to be evidenced instead, and require the
  arithmetic to be stated.
- **Two `estimated` figures**, which are interpolations or scenarios. Require a quote for
  whatever they are derived from and a sentence naming the derivation.
- **One range metric**, which has no single value. Evidence `range_min` and `range_max`.

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
| 2, evidence check | Yes. Applies to human updates too. | Nothing |
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

## One outstanding question, found while scoping

Not a hypothetical, and it should not wait for the notifier to be built.

**The Home Office release behind 13 of the site's published figures reports
`public_updated_at` of 2026-07-16.** The site records `published_date: 2026-05-21` for all of
them, which is when that edition was first published. Something changed on that page on 16
July, and nobody knows what.

It may well be nothing: an added attachment, a correction slip, a typo. It may be a revision
to a figure the site publishes. Checking it is a single visit to the release page and its
correction notice, and it is exactly the work the notifier is meant to trigger. Do it by hand
now rather than waiting for the tooling.

**A changed figure can falsify prose that no check reads.** Already a known limit, published
on the sources page. Automation makes figures change faster without making that limit
smaller, which is why Phase 3 is forbidden from editing prose.
