# Handoff, 22 July 2026

State of UK Migration Explorer, and what to do next. This replaces the version written
earlier the same day, when 37 defects were outstanding.

## Start here

**The 37 defects are fixed.** `npm test` and `npm run build` pass, the tree is clean, and
the affected pages were built and read in a browser. Four commits are on `audit-fixes` and
pushed:

| Commit | |
| --- | --- |
| `a6463e5` | `feat: let charts cite the data layer instead of carrying values` |
| `5ed34cf` | `fix: correct false and degraded copy across the pages` |
| `b0759b8` | `fix: correct data notes and the risk register` |
| `5b3975d` | `feat: check what the sources page claims is checked` |

They are ordered so each step builds: the chart mechanism lands before the pages that use
it, and the tightened validator lands last, once nothing violates it.

**Next, in order:**

1. **Open a pull request from `audit-fixes` to `main`.** PR #9 is **merged**, not open, and
   the earlier handoff was wrong about that. Nothing is open now, and the branch is nine
   commits ahead of `main`: the four above plus five from the previous session that never
   reached `main`, including the em-dash sweep and the handoff documents.
2. Settle the two launch blockers below, then delete `content/robots.txt` and remove the
   guard in `scripts/check-build.mjs` that requires it.
3. The improvements listed under *After the defects*.

## What blocks launch

Two things, both decisions rather than work, both unchanged:

1. **The update commitment is unsigned.** `content/sources-and-method.md` proposes updating
   within fourteen days of each source release and flags it as a proposal. An unmet
   published target damages trust more than none.
2. **The pre-publication human review has not happened.** The sources page commits to it.
   Publication already has.

The guard exists so the site cannot become crawlable by accident. Removing it is deliberate.

## Where things stand

- **Live:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Branch:** `audit-fixes`, pushed, no open PR

16 pages build from a governed data layer of 167 figures. Eleventy 3, no client-side
JavaScript, charts rendered as inline SVG at build time.

| Page | |
| --- | --- |
| `/` | Hero, three distinction panels, six headline cards, generated period list |
| `/what-the-words-mean/` | 23 glossary terms, anchored |
| `/migration/` | 3 charts, ONS vs Home Office table |
| `/asylum/` | 3 charts, stage table, three-queues table |
| `/costs/` | Audited spending only, nested table, per-night chart |
| `/common-claims/` | Index plus 7 claim checks, split generated from the collection |
| `/sources-and-method/` | Catalogue, contract, limits, caveats, corrections, scope |
| `/style-guide/` | Precision rules vs value judgements |
| `/about/` | Owner, funding, what the site is not |

## How the project works

**One figure, one home.** Every published figure is a record in `data/` carrying `id`,
`metric_name`, `value`, `unit`, `date` (period END, never publication date), `period_label`,
`geography`, `source_name`, `source_url`, `published_date`, `retrieved_date`, `notes` and
`confidence_level`. Pages cite records; they never restate values.

**Citation syntax differs by file type.** Markdown uses `{{theme/metric-id}}`. Nunjucks uses
`{% figure "theme/metric-id" %}`, because `{{ }}` is Nunjucks' own expression syntax and
would be evaluated as arithmetic, silently producing `NaN`. That shipped once.

**Charts cite records too, as of this session.** A bar carries `ref`, not `value`, and the
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
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN` in text or attributes, robots rule under `User-agent: *` |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |

**Read this before trusting a green run.** Six times in this project a checker passed while
a real defect shipped. Every one had the same shape: the check verified a property of the
*source or the declaration* rather than the property a reader depends on, and the success
message claimed the latter. The messages state only what they verify.

What changed this session:

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
  this session and are coincidences. Review them; do not suppress them.

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

## Decisions taken this session, worth revisiting

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

## Not covered

- **A full read of `docs/foundation.md` for further document-versus-site drift.** The risk
  register row for silent staleness still claims the site displays its own lateness and that
  the validator reports figures older than their source's update frequency. Neither exists.
  Others like it are likely.
- **A pass over every rendered page.** Home, migration, asylum, costs, common claims, sources
  and method, and one claim page were read in a browser this session. The style guide, about,
  glossary and the other six claim pages were not.

## After the defects

1. Open the PR and merge it.
2. Settle the two launch blockers, then remove robots.txt and its guard.
3. Add `.pa11yci.json`; accessibility has been verified manually and by computation, never by
   tooling.
4. Write `docs/UPDATING-DATA.md`, modelled on DEBT's, so the update commitment has a runbook.
5. Read `docs/foundation.md` end to end against the site and correct the drift.
6. Eight of the fourteen claims in foundation section 8.5.3 remain undrafted.

## Sibling projects

- `~/Projects/DEBT` is the UK Public Finances Explorer, Eleventy, same data-contract
  philosophy. Its `.pa11yci.json` and `docs/UPDATING-DATA.md` are worth porting.
- `~/Projects/UK Civil Society Explorer` has the `editorial-lint.test.js` this session's
  language lint was modelled on. Its quoted-source problem is the same, and its positive and
  precision controls are worth keeping in mind if the term list grows.

## Prompt for a fresh session

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/HANDOFF.md, then CLAUDE.md.

The 37-defect list is closed. The work now is:
1. Open a PR from audit-fixes to main. PR #9 is already merged
   and nothing is open; the branch is nine commits ahead.
2. Read docs/foundation.md end to end against the live site and
   list every place the document promises something the site does
   not do. The risk register's silent-staleness row is one.
   Correct the document, or build the thing, and say which.
3. Port .pa11yci.json from ~/Projects/DEBT and run it.

Ground rules this project learned the hard way:
- No em-dashes, ever. Enforced by validate-content.mjs.
- Never `git checkout -- .` to undo a test. It reverts everything.
  Snapshot to /tmp instead.
- Look at the built page. npm run build, serve _site, open it.
  Headless Chrome here clamps the viewport to 500px, so a 390px
  screenshot is a crop, not a mobile rendering.
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
