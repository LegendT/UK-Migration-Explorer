# Handoff, 22 July 2026

State of UK Migration Explorer at the end of this session, and what to do next.

## Where things stand

The site is built, deployed and deliberately blocked from search engines.

- **Live:** https://ukmigrationexplorer.netlify.app (robots.txt disallows all crawlers)
- **Repo:** https://github.com/LegendT/UK-Migration-Explorer
- **Open PR:** #9 `audit-fixes`, CI green, **not merged**

15 pages build from a governed data layer of 166 figures. Eleventy 3, no client-side
JavaScript, charts rendered as inline SVG at build time.

| Page | |
| --- | --- |
| `/` | Hero, three distinction panels, six headline cards |
| `/what-the-words-mean/` | 23 glossary terms, anchored |
| `/migration/` | 3 charts, ONS vs Home Office table |
| `/asylum/` | 3 charts, stage table, three-queues table |
| `/costs/` | Audited spending only, nested table, per-night chart |
| `/common-claims/` | Index plus 7 claim checks (5 restrictionist, 2 pro-migration) |
| `/sources-and-method/` | Catalogue, contract, caveats, corrections, scope |
| `/style-guide/` | Precision rules vs value judgements |
| `/about/` | Owner, funding, what the site is not |

## What blocks launch

Two things, both requiring a decision rather than work:

1. **The update commitment is unsigned.** `content/sources-and-method.md` proposes updating
   within fourteen days of each source release and flags it explicitly as a proposal. An
   unmet published target damages trust more than none.
2. **The pre-publication human review has not happened.** The sources page commits to it.
   Publication already has.

When both are settled: delete `content/robots.txt` and remove the guard in
`scripts/check-build.mjs` that requires it. Both are deliberate, and the guard exists so the
site cannot become crawlable by accident.

## How the project works

**One figure, one home.** Every published figure is a record in `data/` carrying `id`,
`metric_name`, `value`, `unit`, `date` (period END, never publication date), `period_label`,
`geography`, `source_name`, `source_url`, `published_date`, `retrieved_date`, `notes` and
`confidence_level`. Pages cite records; they never restate values.

**Citation syntax differs by file type.** Markdown uses `{{theme/metric-id}}`. Nunjucks uses
`{% figure "theme/metric-id" %}`, because `{{ }}` is Nunjucks' own expression syntax and
would be evaluated as arithmetic, silently producing `NaN`. That shipped once.

**A token renders the formatted value only.** Units are prose: `%` attaches, `£` prefixes,
`people` follows. The validator checks the author supplied them.

**Charts** live in `lib/charts.mjs`. Three rules are enforced in code rather than left to the
author: the y-axis always starts at zero, every chart carries its figures as a real table,
and no series is distinguished by colour alone.

## The checking apparatus, and its limits

Four scripts, all in CI, all negative-tested:

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, single-vintage series, `DO NOT PUBLISH` flag fails the build |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review dates, representation floor, no em-dashes |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN` in text or attributes, robots rule under `User-agent: *` |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |

**Read this before trusting a green run.** Six times in this project a checker passed while
a real defect shipped. Every one had the same shape: the check verified a property of the
*source or the declaration* rather than the property a reader depends on, and the success
message claimed the latter. The messages have been rewritten to claim only what they verify.

Known remaining gaps, stated rather than hidden:

- **Chart values are literals in the page**, not citations. `migration.njk`, `asylum.njk` and
  `costs.njk` type figures directly into chart configs, so a data update will not reach them.
  Nothing checks this.
- **Prose about figures is unprotected.** The token system protects numbers; nothing verifies
  that a chart summary describes the data it sits beside. Four false summaries were found
  this way, by reading, not by tooling.
- **Sub-100 figures are matched with their unit only** (`39%`, `£4.9`), reported as a review
  warning rather than a build failure, because many metrics share a value. Nine warnings
  currently surface. Review them; do not suppress them.

## Working practices that earned their place

- **Look at the built page.** Six defects this session were invisible in the source: clipped
  chart labels, charts at two-thirds width, glossary anchors rendering as visible junk,
  `NaN` in a statistics table. Run `npm run build`, serve `_site`, and look.
- **Negative-test every new check**, and confirm the break actually applied before concluding
  the check is broken. Two "failures" this session were tests that never fired.
- **Never `git checkout -- .` to undo a test.** It reverts everything. This cost an hour.
  Snapshot to `/tmp` and restore from there.
- **Research subagents must quote a fetched URL and verbatim text per figure.** One returned
  eight values that appeared nowhere in its own evidence table. Anything unverifiable comes
  back marked UNVERIFIED and is left out.

## House style

British English. **No em-dashes** anywhere in authored copy; use a comma, colon or full stop.
En-dashes are fine in numeric ranges. This matches the sibling projects and is enforced by
`validate-content.mjs`. No emoji.

## Sibling projects

- `~/Projects/DEBT` is the UK Public Finances Explorer, Eleventy, same data-contract
  philosophy. Its `test/no-emdash.test.js`, `.pa11yci.json` and `docs/UPDATING-DATA.md` are
  worth porting.
- `~/Projects/UK Civil Society Explorer` has an `editorial-lint.test.js` that scans authored
  copy for prohibited loaded language. **This project has language rules in foundation section
  5.2 and nothing enforces them.** Best available next improvement.

## Suggested next steps

1. Merge PR #9.
2. Settle the two launch blockers, then remove robots.txt and its guard.
3. Port the editorial lint from Civil Society Explorer to enforce section 5.2.
4. Add `.pa11yci.json`; accessibility has been verified manually and by computation, never by
   tooling.
5. Write `docs/UPDATING-DATA.md`, modelled on DEBT's, so the update commitment has a runbook.
6. Move chart values from page literals to data-layer citations.
7. Eight of the fourteen claims in foundation section 8.5.3 remain undrafted.
