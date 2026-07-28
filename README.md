# UK Migration Explorer

A plain-English guide to what UK migration and asylum statistics do, and do not, show.

This is not an immigration dashboard. It is a public-service explainer that separates
migration, immigration, net migration and asylum, shows what each figure counts, and
checks common claims against definitions, denominators and comparable time periods.

The site is neutral on policy preferences. It is not neutral on statistical misuse, in
either direction. The claim set corrects misuses from both sides of the debate, and the
selection criteria are published rather than assumed.

## Status

Built and not yet launched. 16 pages from a governed data layer of **71 metric records** and
four timeseries carrying 100 dated points, on Eleventy 3, with charts rendered as inline SVG
at build time and no client-side JavaScript anywhere. `validate-data.mjs` counts both and
reports 171. A subset of those records reaches a reader. The site is deployed behind a
`robots.txt` that disallows all crawlers, and every page carries a notice saying it is
unfinished.

**The pre-publication review has been conducted, and its corrections have landed.** It ran
on 27 July 2026 against the evidence assembled in `docs/PRE-PUBLICATION-REVIEW.md`, and its
outcome was a corrections list rather than an approval: four claim pages carried "do not
publish as written" or "substantial revision required". Those became corrections 1a to 1i,
all of which were completed by 28 July 2026.

**The corrections landing is not the review passing.** Someone still has to decide the pages
now pass, and then settle `last_reviewed`, drop the pre-launch banner from
`content/_includes/base.njk`, and record the review as passed in `CHANGELOG.md`. Those three
steps and the outstanding work behind them are tracked in `docs/BACKLOG.md`, which is the
durable list; this file does not restate it.

The update commitment was signed on 23 July 2026: **one month** from each of the three
cadenced releases, named on the sources page. Sources that publish irregularly carry no
promised schedule.

Removing `content/robots.txt` and its guard in `scripts/check-build.mjs` is the last step,
and it is deliberate.

## Layout

```
eleventy.config.js      Build: citation resolution, partials, filters, three HTML transforms
content/                Eleventy input
  index.njk               Overview: three distinction panels, eight cards, generated periods
  migration.njk           Net migration, the two flows, reason splits, ONS vs Home Office
  asylum.njk              Pipeline table, three charts, three queues, support, small boats
  costs.njk               Audited spending only, nested table, cost per accommodation place
  common-claims.njk       Index, selection criteria, the disclosed direction split
  glossary.md             23 terms in five groups, each with a stable anchor
  sources-and-method.md   Catalogue, data contract, limits, caveats, corrections, scope
  style-guide.md          Precision rules separated from value judgements
  about.md                Who runs it, who pays, what it is not
  claims/                 Seven claim checks, citing live figures by token
  _includes/              base.njk, and claim.njk for claim pages
  _data/site.js           Name, strapline, navigation
  assets/style.css        One stylesheet
  robots.txt              Disallows all crawlers until launch
lib/charts.mjs          Build-time SVG charts, four rules enforced in code
lib/series.mjs          The four timeseries and the names everything else calls them by
data/                   Governed data layer, one file per theme, plus four timeseries
scripts/                Four checks, all in CI, all negative-tested
docs/foundation.md      Positioning, editorial principles, IA, data governance, risk register
docs/BACKLOG.md         The durable list of outstanding work; every other doc points here
docs/HANDOFF.md         How the project works, and what earlier sessions cost
docs/PRE-PUBLICATION-REVIEW.md  The evidence template the review of 27 July 2026 worked through
docs/SERIES-CITATIONS.md        Built July 2026: citing a series point, and the figures held twice
docs/UPDATE-AUTOMATION.md       Scope: release notifier and evidence check, four phases
.pa11yci.json           pa11y over all 16 URLs at WCAG2AA
.github/workflows/      CI on every push, plus a weekly cron for the time-based rules
CHANGELOG.md            Data and methodology changes
LICENCE                 MIT for code, Open Government Licence v3.0 attribution for data
```

### Data files

| File | Contents |
| --- | --- |
| `migration.json` | Net migration, immigration, emigration, reason splits, visa grants by route |
| `asylum.json` | Applications, decisions, backlog, small boats, appeals, support, resettlement |
| `population.json` | Foreign-born population, countries of birth, citizenship, settlement |
| `fiscal.json` | Asylum system costs, fiscal-impact estimates, labour market participation |
| `netMigrationTimeseries.json` | Net migration 2012-2025, current ONS basis, plus the discontinued series as history |
| `asylumApplicationsTimeseries.json` | Asylum applications 2010-2025, people basis throughout |
| `asylumBacklogTimeseries.json` | Initial decision backlog 2010-2025, on both the people and cases bases |
| `migrationFlowsTimeseries.json` | Immigration and emigration 2012-2025, the gross flows behind net migration |
| `dashboard.json` | Home page cards. References only; it holds no values and no unrendered prose |
| `sources.json` | Catalogue of publishers, thirteen entries across twelve publishers |
| `meta.json` | Confidence-level definitions, cross-cutting caveats, footer note |

## Data contract

The data model is the trust model. Every published figure carries its own metadata:

`id` `metric_name` `value` `unit` `date` `period_label` `geography` `source_name`
`source_id` `source_url` `published_date` `retrieved_date` `notes` `confidence_level`

`date` is the **end of the period covered**, never the publication date. `source_id` names
the entry in `sources.json` the figure came from, because a hostname cannot: `www.gov.uk`
serves three different publishers here, and several figures cite an
`assets.publishing.service.gov.uk` hash that names none. Confidence levels are `official`,
`provisional`, `estimated` and `calculated`, defined in `data/meta.json`. Figures that span a
range rather than a point, the net fiscal impact of immigration for instance, set
`value_type: "range"` with explicit bounds and a null `value`, so no card can render a range
as a point estimate.

**One figure, one home.** `dashboard.json` holds no values. Every card references a theme
metric by `theme/id`. Previously the same figure existed in two files, and a quarterly update
that missed one would have published two different official values for the same measure.

That was fixed between the dashboard and the theme files and left standing between the theme
files and the timeseries, because nothing connected the two. Four figures are published both
ways, as a headline metric and as a point in a series. Each now declares `series_ref`, naming
its own duplicate, and `validate-data.mjs` refuses a mismatch. The declaration sits on the
metric rather than the series because `net-migration-2` pairs with the second-to-last point:
it is the revised prior-year estimate the site publishes precisely to show that revisions
happen, so a rule keyed on "the latest point" would have left it unguarded.

**One vintage per series.** ONS states you cannot append the latest estimates to a series
from an earlier release, and the Home Office revises historical asylum figures. Every
timeseries therefore draws from a single publication, and the validator rejects a series
whose points carry more than one `published_date`. Refresh the whole array each release;
never append. Mixing vintages is what made the first net migration series unpublishable.

## Build

```
npm test          # data contract and content checks
npm run validate  # the same, with the outstanding published_date list
npm run build     # Eleventy -> _site, then the built-site checks
npm run serve     # local dev server
npm run a11y      # build, serve, and run pa11y over all 16 URLs
npm run check-sources   # network check that every source URL still resolves
npm run check-evidence  # every changed or new figure carries a quote (needs origin/main)
```

Content files are **not** pre-processed as templates (`markdownTemplateEngine: false`).
`{{theme/metric-id}}` is this project's own citation syntax and would otherwise be parsed as
a Liquid expression, silently breaking the guarantee that no figure is hard-coded in prose.
Citations resolve in a post-render transform, and anything unresolved throws rather than
shipping `{{...}}` to a reader.

**Three Eleventy transforms run on the built HTML and the order is load-bearing.**
`resolve-citations` renders the tokens and block partials and throws on anything unresolved.
`heading-anchors` turns `{#id}` syntax into real ids. `scrollable-regions` then wraps any
unwrapped table and gives every scrolling box a `tabindex`, a role and a name taken from its
caption or the heading above it. Run the last before the second and a heading still carrying
its `{#id}` names the region, shipping raw syntax inside an `aria-label` where nothing on the
page shows it. `check-build` caught exactly that.

Netlify runs `npm test` before `npm run build`, so a figure missing its source, or a claim
citing a metric that no longer exists, fails the deploy rather than reaching anyone.

## The checking apparatus, and its limits

Six checks, all in CI, all negative-tested.

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, catalogued publishers, every figure linked to its catalogue entry, single-vintage series, **a metric that declares a `series_ref` agrees with the series point it names**, figures overdue against their source's cycle, `DO NOT PUBLISH` flag fails the build |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value **or series point** written longhand in content **or in the data-file prose that reaches a page**, and outstanding work tracked in `docs/BACKLOG.md` |
| `check-evidence.mjs` | Every metric whose value changed against `origin/main`, and every metric that is new, is declared in `data/evidence/` with a quote from a fetched source containing that value. A derived figure quotes its inputs and states the arithmetic instead. Gates the build |
| `check-build.mjs` | The built HTML: links and fragments resolve, no unrendered syntax, no `NaN`, every table inside a focusable named scrolling region, every ARIA reference resolves, no two controls sharing a name, no two links sharing their text while going to different places, no link text that names nothing, robots rule under `User-agent: *` |
| `check-sources.mjs` | Every source URL still resolves (network; runs in CI with `continue-on-error`) |
| `npm run a11y` | pa11y over all 16 URLs at WCAG2AA. Fails the build |

**Read this before trusting a green run.** Seven times in this project a checker passed while
a real defect shipped. Every one had the same shape: the check verified a property of the
*source or the declaration* rather than the property a reader depends on, and the success
message claimed the latter. The messages now state only what they verify.

**pa11y is a floor, not a verdict, and CI says so.** It was negative-tested before being
believed: an isolated missing `lang` took it to 15/16 and named the rule, a failing contrast
value took it to 0/16. It passed all five of the accessibility defects found by hand.

Known limits, published on the sources page under *What the checks do not establish*:

- **Prose about figures is unprotected.** Nothing verifies that a chart summary describes the
  data it sits beside. Four false summaries were found by reading, not by tooling. Citing a
  series point fixes the value and not the sentence: `at(2018)` under a sentence naming 2019
  builds cleanly.
- **Sub-100 figures are matched with their unit only** (`21%`, `£3`) and reported as
  warnings rather than failures, because many metrics share a value. Ten surface
  currently, each a coincidental match against an unrelated metric. Review them; do not
  suppress them, and re-derive them per item rather than trusting a stored note that they
  were all checked: three that a note called coincidences were live values restated
  longhand.

## Content

`content/claims/` holds the claim checks and `content/glossary.md` the definitions. Seven
claims are drafted; the candidate set of fifteen is specified in `docs/foundation.md`
section 8.5.3.

Content never hard-codes a figure that will change. It cites the data layer by token,
`{{theme/metric-id}}`, so updating a figure in `data/` updates everywhere it is cited, and
content citing a metric that no longer exists fails the build rather than quietly publishing
a stale number.

In Nunjucks pages use `{% figure "theme/metric-id" %}` instead: those files *are*
pre-processed as templates, so the brace syntax would be evaluated as an expression and
silently produce `NaN`. Both forms call the same renderer. A chart bar carries `ref`, not
`value`, and the shortcode throws on a literal.

A token renders the **formatted value only**, `48,758`, `4.9`, `39`, never the unit.
Units are prose: `%` attaches, `£` prefixes, `people` follows. The author writes them and
the validator confirms it, because the first draft rendered "4.9 billion" where it meant
"£4.9 billion". Range metrics have no single value and cannot be tokenised at all.

Writing a number longhand opts out of this protection, so a literal matching a current metric
value fails the build unless declared under `historical_literals`, which is **semicolon
separated**, because every value this fires on is comma grouped. This applies to the prose
in `data/` that reaches a page as well as to content files: the card paragraphs in
`dashboard.json`, and the caveats, confidence definitions and footer note in `meta.json`.
Data files have no front matter, so they declare frozen figures in a sibling
`historical_literals` key.

**A series point is cited the same way, with a filter rather than a token.** A chart summary
is a Nunjucks string built with `~` concatenation, so a shortcode cannot be used inside one:
`(series.netMigration.data | at(2022) | number)` is the citation, and it throws on a year the
series does not hold. A series value written longhand fails the build on the same terms as a
record value. Where a metric and a series point are the same measure, the metric declares
`series_ref` and `validate-data.mjs` refuses to let the two drift apart.

Every glossary term must say what the word does **not** mean, not merely what it means. A
definition that leaves the misreading intact has not done the job, so the validator rejects
it. Terms carry stable anchors so claims can link to them.

Three further rules the validator enforces rather than trusting to review:

- **No claim goes unreviewed for more than twelve months.** Statistics get revised; a claim
  resting on a superseded figure is worse than no claim. A weekly CI cron makes the rule fire
  without anyone pushing.
- **At least two published claims must correct each direction.** A floor, with no ceiling. It
  replaced a two-thirds cap that blocked the correction a pro-migration reader would most
  want to see, because `direction` records whose claim is corrected and correcting a
  restrictionist claim serves pro-migration readers. A rule that prevents a correction
  measures the wrong thing. The real split is generated from the set and disclosed on the
  claims page.
- **Every claim carries `period` and `source`** as required front matter, because the card
  renders both behind a conditional and a claim that omitted them lost them silently.

## Editorial rules that constrain the build

Full detail in `docs/foundation.md`. The rules that most affect code:

- No number is shown without its definition, period and source visible without hovering.
- Flows and stocks are never mixed without saying so.
- Reference periods differ between measures. Asylum data runs to March 2026; net
  migration to December 2025. Do not compare across them.
- Claim cards will be screenshotted. Period, source and date go inside the card's visual
  boundary, not beside it. There is no share image and section 8.5.4 records why.
- Every link says where it goes when read on its own.
- Charts explain one idea each and carry an accessible data table.
- No red/green moral coding for categories such as grants and refusals.
- No pseudo-live counters. Latest published data only.
- WCAG 2.2 AA, mobile first, progressive enhancement.
- No AI-generated claims without human review and source traceability.

## Known gaps

- **The site does not display its own lateness to a reader.** The validator ages figures
  against their source's cycle before publication, and every page carries the date it was
  last reviewed, but a static build cannot know how late it is at the moment someone reads
  it. Foundation section 13 says so rather than implying otherwise.
- **23 of the 71 metric records cannot be aged**, because their sources publish irregularly:
  the Migration Observatory (11), the Commons Library (5), the NAO (4), the ICIBI (2) and the
  OBR (1). The validator names them on every run rather than counting them as covered. The
  timeseries points cannot be aged either, because they carry no `retrieved_date`.
- **Five source URLs cannot be checked automatically**, four Commons Library pages and one
  parliamentary research PDF. The host returns 403 to every request, including deliberately
  invalid paths, with or without a browser user-agent, so an automated check cannot tell a
  live page from a dead one there. `scripts/check-sources.mjs` reports them as uncheckable
  rather than broken. Verify by hand. 44 of 49 resolve.
- **One source URL redirects**, which usually means a newer release has superseded the
  figure: the Home Office data tables anchor.
- **`table_reference` is unimplemented.** Home Office table identifiers survive only as
  prose inside `notes`, though the newer metrics name their table in `source_name`.
- **Asylum work-in-progress (total casework backlog) is stale.** The last complete figure is
  from June 2024 and the breakdown was suspended; the record's own notes say so. Do not
  present it as current.
- **The main-applicant asylum applications series was not retrieved**; only the people-basis
  series exists. The two must never be spliced.
- **No real screen reader has been run.** Chrome's accessibility tree is what assistive
  technology consumes and it is what was read, but it is not VoiceOver or NVDA reading a page
  aloud.

## Provenance

`docs/foundation.md` and the `data/` files were produced as separate AI-assisted research
passes in June 2026, reviewed manually, and audited in July 2026. Every figure is traceable
to a named official publication with a retrieval date. The site discloses its use of AI on
`/sources-and-method/`.

Contains public sector information licensed under the Open Government Licence v3.0. See
`LICENCE`.
