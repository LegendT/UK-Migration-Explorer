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

## OUTSTANDING DEFECTS, fix these first

Verified 22 July 2026 by an independent pass over the working tree. Two separate things
happened in the last session and only one of them went well.

**The good half.** All 21 repairs from the audit were confirmed present in the tree. An
earlier `git checkout -- .` had reverted them and they were reapplied from memory; the
reapplication was complete. Tests and build pass, tree is clean.

**The bad half.** A blanket regex removed 292 em-dashes across 45 files. It did not corrupt
the data layer (all JSON parses, all spread operators intact, no doubled commas), but where
a dash fell at the end of a line the regex JOINED LINES, and a comma cannot carry the weight
a dash was carrying. The result is a set of comma splices, some of which change meaning.

### Meaning changed, fix properly

1. `content/costs.njk:88` chart summary: "against roughly £20 for dispersal accommodation,
   around eight times as much." The dash made "eight times" refer to the hotel rate; the
   comma now attaches it to the £20, inverting the referent. **Rewrite the sentence.**
2. `content/costs.njk:118`: "against an original estimate of about £4.5 billion, more than
   three times as much." Same problem: the multiplier now reads as an appositive on the
   original estimate.
3. `content/claims/nineteen-per-cent-born-abroad.md:25`: "from the 2021/22 Census, Census
   2021 for England, Wales and Northern Ireland, and Census 2022 for Scotland" reads as
   three censuses rather than one aside defining two.
4. `data/meta.json:15`: "The older framing, International Passenger Survey to 2019,
   administrative data from 2021, 2020 unpublishable, is out of date". "from 2021, 2020
   unpublishable" is genuinely ambiguous. This is a cross-cutting caveat rendered to readers.
5. `content/glossary.md:200`: "published on several bases at once, calendar year, year
   ending, and year to date" reads as a four-item list.

### Degraded but not wrong

6. `content/_includes/base.njk:6`: every page title is now "Title, Site name" rather than a
   separator. Site-wide and user-visible. Use a colon or a pipe.
7. `lib/charts.mjs:101,152`: every data-table caption runs title and unit together as one
   comma phrase.
8. `content/asylum.njk:123` and `content/claims/everyone-in-asylum-accommodation-arrived-recently.md:26`:
   "at the end of March 2026, accommodation, subsistence, or both" reads as a list
   continuing from the date.
9. `content/migration.njk:93-94` and `content/glossary.md:244`: table cells now contain
   comma splices ("Not counted, no move happened").
10. `content/claims/most-immigration-is-asylum.md:5-6`: the non-EU+ definition drowns in
    surrounding commas.

### Code comments corrupted by line-joining

11. `content/_data/site.js:5` and `eleventy.config.js:134` both have a stray `//` mid-comment
    where two comment lines were joined. Valid JavaScript, but the comment is garbled.

### A statistical error that survived both passes

12. `content/migration.njk`: net migration "has fallen in each of the last two years". The
    series is 891k, 848k, 331k, 171k, so it has fallen in **three** consecutive years. This
    was raised as a low-severity finding in the first audit and was not fixed either time.

### One caveat, harmless

13. `lib/charts.mjs:42`: `rightPad` is derived from the longest label but floored at 118, so
    it can never be narrower than the old fixed value. Correct behaviour, worth knowing.

### Second audit, 22 July 2026: further defects, NOT yet fixed

A separate precision-and-trust pass over the whole project. These are new, and none of them
is in the thirteen above. Two were spot-verified by hand; the rest are quoted with file and
line by the audit and should be confirmed as each is fixed.

**HIGH, false or misleading as published**

14. `content/index.njk:58-61` describes a card set that does not exist. It says "two of them
    count people"; **three** do (net migration, asylum claims, small boats). It names
    "returns, visas and citizenship" as running to March 2026; there are **no returns or
    visas cards**. Three cards fall outside both windows it names: small boats is calendar
    2025, born abroad is the 2021/22 Census, cost is FY 2024-25. VERIFIED. The paragraph
    whose entire job is period discipline is the least disciplined on the site.
15. `content/index.njk:38-39` says each figure shows "how much confidence **the publisher**
    places in it". VERIFIED false. `confidence_level` is this project's own taxonomy;
    `data/meta.json` defines `calculated` as "Derived by this project from other figures".
    The site is attributing its own editorial judgement to ONS and the Home Office.
16. `content/migration.njk:51`: emigration "remains well above its pre-pandemic level". It is
    642,000 against 605,000 in 2019, **+6.1%**. It is only "well above" against the 2012-19
    average, which the sentence does not say, and that comparison crosses the June 2021
    methodology break the same chart's note says to treat with caution.
17. `content/sources-and-method.md:73-82` states "A figure exists in one place only. Nothing
    on this site copies a value from somewhere else on this site... The rules are enforced
    automatically." All three bar charts hard-code live record values, chart summaries
    restate them, and `scripts/validate-content.mjs:402` prints the confession that chart
    figures "are not citations and are not covered". The internal handoff admits this; the
    published trust page asserts the opposite. `eleventy.config.js:74` carries the same false
    claim in a comment. **This is the most serious item in either audit: the page that asks
    readers to trust the method misdescribes the method.**
18. `content/style-guide.md:50-53` promises "We cite whichever title the edition we used
    actually carries", and `data/asylum.json` breaks it on the exact dataset used as the
    worked example: `small-boat-arrivals-calendar-year-2025` has `published_date: 2026-05-21`,
    after the rename, but keeps the old title in `source_name`.
19. `content/about.md:43` says there is "no second reader", while `docs/foundation.md:634`
    still mitigates the top-rated risk (political capture, High/High) with a second reader
    signing off the claim set, plus the two-thirds rule that has since been removed. Both
    mitigations for the highest risk are now gone and nothing replaced either.

**MEDIUM**

20. `asylum.njk:51` narrates a monotonic rise over a dip: claims fell 8% in 2023
    (95,007 to 87,427).
21. `migration.njk:51` calls 1,441,000 the immigration peak; `data/migration.json` records
    the peak as 1,469,000 in the year ending March 2023. A series maximum presented as
    the peak.
22. `dashboard.json` small-boats card (calendar 2025) carries a statistic belonging to the
    year-ending-March-2026 record. Mixes bases inside one card.
23. `dashboard.json` citizenship card asserts "second-highest annual total since 2005" and a
    top-three-nationalities share that appear nowhere in `data/`.
24. The new drain claim is thinner than its mirror: no `review_due`; `mirror_of` is a
    direction rather than a claim id and nothing reads it; it discusses the OBR lifetime
    figure without citing or declaring it; zero glossary links against the mirror's two.
25. `sources-and-method.md:143` promises every page shows when its figures were last checked.
    Pages show frontmatter `last_reviewed`, not the per-figure `retrieved_date`.
26. `sources-and-method.md:160-161` promises a dated correction note on substantively revised
    claims. No field, no template branch, no instance.
27. `refused-asylum...md:67-69` says this site checks the mirror claim "separately". No such
    claim page exists.
28. `glossary.md:318-321` states the foreign-national share with no period and no
    discontinuation caveat, breaking the site's own rule at `style-guide.md:25`.
29. `costs.njk:125-126` states fee income and the Health Surcharge in the present tense with
    no period, and the IHS record still carries "Period basis should be confirmed".
30. Language rules in foundation section 5.2 still have no enforcing linter.
31. `nineteen-per-cent...md:42-43` endorses "more than one in six" when the measured share is
    16.0%, below one in six, true only via the unlabelled inference the same page says must
    be labelled.

**LOW**

32. "About 224,742 cases" and "About 97,519 people": approximation prefixed to unit-exact
    figures.
33. `common-claims.njk:16` hard-codes the 5:2 split in prose; nothing ties it to the
    collection, so the next claim added falsifies it silently.
34. `review_due` is validated nowhere and is inconsistently present.
35. `lib/charts.mjs:96,147` interpolates `note` unescaped while title and summary are escaped.
36. The "both" direction label is defined and never used.
37. Unit checks run only on `{{ }}` tokens, so `{% figure %}` citations in the four `.njk`
    pages get no unit check.

**Not covered by this audit:** a full read of `docs/foundation.md` for further
document-versus-site drift, and a pass over the rendered output rather than the source.

### The lesson worth keeping

A bulk substitution over prose is not a mechanical operation. The em-dash was doing
grammatical work, and replacing it with a comma changed what several sentences mean. If a
rule like this is applied again, replace dash by dash with the sentence in view, or restrict
the sweep to files where the dash cannot be load-bearing.

## Prompt for a fresh session

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/HANDOFF.md first, then CLAUDE.md and docs/foundation.md.

TASK: fix everything under "OUTSTANDING DEFECTS" in the handoff.
Thirty-seven items from two audits.

Start with 14 to 19, which are false statements on live pages.
Item 17 is the most serious in the project: sources-and-method.md
tells readers "a figure exists in one place only" and "the rules
are enforced automatically", and neither is true of the charts.
Either make it true or change the page; do not leave it as is.

Items 1 to 5 changed meaning when a bulk regex replaced em-dashes
with commas. Rewrite those sentences with the sentence in view,
not by find and replace. Item 12 is a live statistical error.

Items 20 to 37 are medium and low; take them after the above.

Ground rules that matter on this project:
- No em-dashes, ever. Enforced by validate-content.mjs. Fix the
  comma splices by rewriting, not by putting dashes back.
- Never `git checkout -- .` to undo a test. It reverts everything.
  Snapshot to /tmp instead. This has cost an hour once already.
- Look at the built page before claiming anything visual works.
  Run npm run build, serve _site, open it.
- A green validator is necessary, never sufficient. Six times a
  checker passed while a real defect shipped.
- Negative-test every check you add, and confirm the break actually
  applied before concluding the check is broken.

When they are done, run npm test and npm run build, look at the
affected pages in a browser, then merge PR #9.
```

## Suggested next steps

1. Fix the thirty-seven outstanding defects above, then merge PR #9.
2. Settle the two launch blockers, then remove robots.txt and its guard.
3. Port the editorial lint from Civil Society Explorer to enforce section 5.2.
4. Add `.pa11yci.json`; accessibility has been verified manually and by computation, never by
   tooling.
5. Write `docs/UPDATING-DATA.md`, modelled on DEBT's, so the update commitment has a runbook.
6. Move chart values from page literals to data-layer citations.
7. Eight of the fourteen claims in foundation section 8.5.3 remain undrafted.
