# UK Migration Explorer

A plain-English guide to what UK migration and asylum statistics do, and do not, show.

This is not an immigration dashboard. It is a public-service explainer that separates
migration, immigration, net migration and asylum, shows what each figure counts, and
checks common claims against definitions, denominators and comparable time periods.

The site is neutral on policy preferences. It is not neutral on statistical misuse, in
either direction. The claim set corrects misuses from both sides of the debate, and the
selection criteria are published rather than assumed.

**The site is at <https://ukmigrationexplorer.org>.** That is what this repository builds, and it
is where the answers are. This file is the source.

## Start with the site

Everything a reader needs is published on the site itself, on pages built for it. This file does not
restate them, because a second copy would drift from the first.

- **Where every figure comes from, and how it is recorded**:
  [Sources and method](https://ukmigrationexplorer.org/sources-and-method/). Each figure names its
  publication, its edition, the table behind it, and the date it was last checked against that
  source. The page also states, in its own words, what its checks do not establish.
- **Who runs the site, who pays for it, and what that means for what you read**:
  [About](https://ukmigrationexplorer.org/about/).
- **How claims are chosen for checking, and which directions they correct**:
  [Common claims](https://ukmigrationexplorer.org/common-claims/).
- **Found an error?** Tell us which figure and what you think it should be:
  [open an issue](https://github.com/LegendT/UK-Migration-Explorer/issues/new). Every change to a
  published figure is recorded in [`CHANGELOG.md`](CHANGELOG.md).

**What is in this repository, for anyone reading the source.** A static site built by Eleventy 3
from a governed data layer: metric records and timeseries of dated points, charts rendered as inline
SVG at build time, and one client-side script: the cookieless Cloudflare Web Analytics beacon in
`base.njk`, which sets no cookies and which every page works without. The sections below are how it
is built, what the data layer guarantees, what each check establishes, and what none of them does.

**No figure appears in this file, deliberately.** Every figure on the site comes from a record
and the checks refuse one typed into a page; this file sits outside that scan, so a number here
would be a hand-typed copy that nothing checks. It carries none, and no live count of the
repository's own contents either: the runs print those, and every one written down here has
gone stale. Dates, pull request numbers, HTTP status codes and a count that is explicitly
historical are not figures in that sense and do appear.

## Status

Launched on 11 August 2026. **Whether it is still serving, and what it is serving, is operational
state** rather than something this line can tell you: fetch the site.

## Layout

```
eleventy.config.js      Build: citation resolution, partials, filters, the HTML transforms
content/                Eleventy input
  index.njk               Overview: three distinction panels, eight cards, generated periods
  migration.njk           Net migration, the two flows, reason splits, ONS vs Home Office
  asylum.njk              Pipeline table, three charts, three queues, support, small boats
  costs.njk               Audited spending only, nested table, cost per accommodation place
  returns.njk             What a return counts, why the categories do not nest, added 10 Aug 2026
  common-claims.njk       Index, selection criteria, the disclosed direction split
  glossary.md             Terms in five groups, each with a stable anchor. `npm run validate`
                          prints the count rather than this line carrying one
  sources-and-method.md   Catalogue, data contract, limits, caveats, corrections, scope
  style-guide.md          Precision rules separated from value judgements
  about.md                Who runs it, who pays, what it is not
  claims/                 The claim checks, citing live figures by token
  _includes/              base.njk, and claim.njk for claim pages
  _data/site.js           Name, strapline, navigation, ten items rendered as a disclosure below 40em
  assets/style.css        One stylesheet, including the print rules
  assets/favicon.svg      Inline SVG, no binary asset
  404.md                  Served by Netlify when a link into the site goes stale
  robots.txt              Call 26: admits citing retrieval agents, refuses training crawlers
  sitemap.njk             Every built page but the 404, generated from collections.all
lib/charts.mjs          Build-time SVG charts, four rules enforced in code, two renderings per chart
lib/citation.mjs        The "How to cite this" block, derived from the records each figure draws
lib/claim-links.mjs     Which claim checks a theme page links to, resolved from the claims themselves
lib/escape.mjs          HTML escaping, one definition rather than the five copies a critique found
lib/fetch-retry.mjs     A fetch that waits when a host says "later". The release check alone
lib/provenance.mjs      Each theme page's figures with their grade and checked date, from its front matter
lib/published.mjs       Which records reach a reader, and the counts /sources-and-method/ renders
lib/series.mjs          The four timeseries and the names everything else calls them by
lib/structured-data.mjs Dataset, Organization and WebSite as JSON-LD, on the two pages that carry it
lib/tables.mjs          What a publisher's table identifier looks like, for the two checks that must agree
data/                   Governed data layer, one file per theme, plus four timeseries
data/evidence/          One file per release: the quote behind every figure, re-read on every run
scripts/                Every check that is a script; `ls` counts them. pa11y is the exception
.pa11yci.json           The URL list the accessibility gate runs over, at WCAG2AA
.github/workflows/      CI on every push, plus a weekly cron for the time-based rules
CHANGELOG.md            Data and methodology changes
LICENCE                 MIT for everything but the figures in data/, which are OGL v3
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
| `sources.json` | Catalogue of the publications figures are cited from. More entries than publishers: the Home Office has its statistics collection and its annual accounts, and ONS has long-term international migration, population estimates and EMP06. Neither is counted here, deliberately, because this line named two ONS entries after EMP06 made it three. That is why a figure names its source by id and not by hostname, and why neither count is written down here |
| `meta.json` | Confidence-level definitions, cross-cutting caveats, footer note |
| `evidence/` | One file per publisher release, holding the quote behind every evidenced figure and its own README. Not read by the site; read by `check-evidence.mjs` |

**The whole of `data/` ships with the built site** and is listed with a link per file in the Reuse
section of `/sources-and-method/`, generated from the directory rather than typed. That page had
promised the files were public and linked none of them.

**Two things change shape on a narrow screen, in opposite ways.** The navigation is the same items
at every width, in one `<nav>` and one `<details>`: narrow, the `<summary>` is the control that
opens them; wide, the summary is `display: none` and the items lay out as a flat row, which is what
a phone column cannot give them the line length for. **The charts are the case that really does
render twice.** Each is drawn wide and narrow at build time and CSS shows one, because SVG text is
in viewBox units, so squeezing the wide chart into a phone column would render its labels far below
the legible floor. The hidden member of each pair is `display: none` rather than clipped, which is
the only form that takes it out of the accessibility tree, so a screen reader meets one image per
chart. **Both were measured at real device sizes rather than calculated**, and what the measuring
found is in the pull requests that took the work rather than here.

## Data contract

The data model is the trust model. Every published figure carries its own metadata:

`id` `metric_name` `value` `unit` `date` `period_label` `geography` `source_name`
`source_id` `source_url` `published_date` `retrieved_date` `notes` `confidence_level`

plus `table_reference` where the publisher names a table, and `series_ref` on a figure that is
also a series point. How many declare one is printed by `npm run validate`, not typed here: this
sentence said "four" while the data layer held five.

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
files and the timeseries, because nothing connected the two. A figure can be published both
ways, as a headline metric and as a point in a series. Each such metric declares `series_ref`,
naming its own duplicate, and `validate-data.mjs` refuses a mismatch. The declaration sits on the
metric rather than the series because `net-migration-2` pairs with the second-to-last point:
it is the revised prior-year estimate the site publishes precisely to show that revisions
happen, so a rule keyed on "the latest point" would have left it unguarded.

**One vintage per series.** ONS states you cannot append the latest estimates to a series
from an earlier release, and the Home Office revises historical asylum figures. Every
timeseries therefore draws from a single publication, and the validator rejects a series
whose points carry more than one `published_date`. Refresh the whole array each release;
never append. Mixing vintages is what made the first net migration series unpublishable.

**Which table a figure came from.** Records and series files carry `table_reference`, an array
naming the publisher tables behind the figure: `Vis_01`, `Asy_00a`, `Cit_01`, `Se_02`, `Ret_01`
and others. How many is what `npm run validate` prints, for the reason the Status section
above gives. It exists so that a correction *inside* an edition can be matched to the figures it
touches, which is the one channel through which a wrong number can sit here indefinitely, and
`check-releases.mjs` is what reads it. The validator holds it to the prose both ways. Every
table named in a record's `source_name` or `notes` must be declared, or the corrections watch
cannot see a correction to it; and every declaration must be named in the prose, or it is a
string nobody can check, matching nothing and failing nothing. A table nobody wrote down in
either place is still invisible, and both the validator and the watch say so.

## Build

```
npm test          # data contract and content checks
npm run validate  # the same, with the outstanding published_date list
npm run build     # Eleventy -> _site, then the built-site checks
npm run serve     # local dev server
npm run a11y      # build, serve, and run pa11y over every URL in .pa11yci.json
npm run check-sources   # network check that every source URL still resolves
npm run check-evidence  # every changed, new or regraded figure carries a quote (needs origin/main)
npm run check-releases  # network check: a newer edition, or a correction inside this one
```

Content files are **not** pre-processed as templates (`markdownTemplateEngine: false`).
`{{theme/metric-id}}` is this project's own citation syntax and would otherwise be parsed as
a Liquid expression, silently breaking the guarantee that no figure is hard-coded in prose.
Citations resolve in a post-render transform, and anything unresolved throws rather than
shipping `{{...}}` to a reader.

**The Eleventy transforms run on the built HTML in the order they are registered, and the order is
load-bearing. No count is written here**: `grep -c addTransform eleventy.config.js` answers it, and
this sentence said five while the file held six from 11 August 2026, having gone one short the day
`figure-currency` was added and been enumerated one short with it.
`resolve-citations` renders the tokens and block partials and throws on anything unresolved.
`figure-currency` derives the footer's date from the traces on the page, a `data-metric` ref or a
machine-readable `datetime`, and takes the earliest, so a page states when its figures were last
checked rather than carrying a typed date. `figure-currency-audit` then recomputes that date from a
second derivation, each page's own `figures:` declaration plus its dashboard cards, and throws where
the footer claims a figure was checked later than it was. Both run after `resolve-citations`, which
is what puts the refs into the HTML, and the audit runs after the transform it disagrees with.
`published-counts` renders the figure counts on `/sources-and-method/` from `lib/published.mjs`
and throws on a marker it cannot resolve. `heading-anchors` turns `{#id}` syntax into real ids,
and derives one from the heading's own text where none is declared, so every section of every
page can be linked to. It skips the `h1`, whose link is the page URL, and a heading inside a
`<figcaption>`, because the `<figure>` around it already carries an author-chosen id.
`table-captions` turns a `{caption}` paragraph sitting before a table into that table's
`<caption>`. `scrollable-regions` then wraps any unwrapped table and gives every scrolling box a
`tabindex`, a role and a name taken from its caption or the heading above it.

**A `.scroll-x` div may carry a second class**, and could not until PR #149. Every pattern here and
in `check-build.mjs` now matches `scroll-x` as a whole member of the space-separated class list
rather than as the whole attribute, and the transform writes the class attribute back rather than
rebuilding it. **The two files keep their own copy of that pattern, deliberately**: the checker
exists to disagree with the transform, and one expression imported by both would be one assumption
neither side could catch, which is how four of them went blind together.

Two orderings carry the weight. Run `scrollable-regions` before `heading-anchors` and a heading
still carrying its `{#id}` names the region, shipping raw syntax inside an `aria-label` where
nothing on the page shows it; `check-build` caught exactly that. Run it before `table-captions`
and a captioned table is named by the heading above it rather than by its own caption, which is
the text a sighted reader can see.

**Two pages carry structured data**, built by `lib/structured-data.mjs` and emitted as one
`application/ld+json` block in `<head>`: `WebSite` and `Organization` on the home page,
and a `Dataset` on `/sources-and-method/` whose `DataDownload` list is generated from the same
directory read that renders the Reuse section, so what a reader is given and what a machine is
given cannot diverge. Its description is `data/meta.json`'s own and no figure reaches the file.

**There is no `ClaimReview` and there is not going to be one.** Google withdrew it from Search
on 12 June 2025 and from Search Console reporting on 9 September 2025, and the surviving Fact
Check Explorer requires every claim to be attributed to a named origin off-site, which
`content/style-guide.md` tells readers this site does not do. `check-build.mjs` refuses a
`ClaimReview` node rather than leaving that reasoning in a comment. There is no `SearchAction`
either: site search was considered and cut, so declaring a search endpoint would describe a
feature that does not exist.

Netlify runs `npm test` before `npm run build`, so a figure missing its source, or a claim
citing a metric that no longer exists, fails the deploy rather than reaching anyone.

## The checking apparatus, and its limits

Every one of these runs in CI and every one was negative-tested. The number of them is not written here: it
was wrong in the layout block above until 4 August 2026, having said six
scripts when there were seven, and a count of our own work is the defect this file spends most
of its paragraphs on.

| Script | What it establishes |
| --- | --- |
| `validate-data.mjs` | Metadata contract, date consistency, **and since 27 August 2026 that a period label names a day that exists and that an `as at` label states the same day as the record's own `date`**, which the year-only rule beside it let "as at 31 June 2026" through on five published records, catalogued publishers, every figure linked to its catalogue entry, **a citation's `source_url` and `source_id` naming the same publisher**, a theme file's `lastUpdated` keeping up with its newest record, single-vintage series, **a metric that declares a `series_ref` agrees with the series point it names on value, unit, confidence level and year**, **every publisher table named in a figure's prose is declared in `table_reference` and every declaration is named in prose**, figures overdue against their source's cycle, a theme file's `lastUpdated` present and a real date, **every point in a series block carrying one confidence level**, `ons_marker` drawn from a fixed vocabulary, `DO NOT PUBLISH` flag fails the build. **Reports rather than fails** on a record whose `notes` restate another record's value, naming both, because nothing keeps those two in step |
| `validate-content.mjs` | Citations resolve, units present, figures declared, review and due dates, mirror claims paired, correction notes dated, representation floor, language rules, no em-dashes, no record value **or series point** written longhand in content **or in the data-file prose that reaches a page**, a `historical_literals` declaration that matches nothing in its own file. **A review date that has passed fails the build**, not merely one that was never declared, and a Nunjucks page must carry one like every other. **The language rules and the glossary-link check reach the `data/` prose that renders to a page**, which they did not until 31 July 2026. **Fails** on a figure the data layer never recorded, comma-grouped or **written with a scale word**, since 2 August 2026, having been a ratchet at report level from 38 down to zero, and **names every declared literal that does equal a live value**, because the exemption is granted on trust and the success message asserted it did not exist. **Since 13 August 2026 it also refuses `/sources-and-method/` where the publishers its prose names are not exactly those its derived count is about**, matched on the words the prose actually writes rather than on catalogue names, because a typed list beside a derived count is two homes for one fact |
| `check-evidence.mjs` | Every metric whose value changed against `origin/main`, every metric that is new, and every metric whose `confidence_level` crosses the derived boundary in either direction even at an unchanged value, is declared in `data/evidence/` with a quote from a fetched source containing that value. **And every entry already on file that still names a record holding exactly its value is re-read on every run**, so a backfilled entry is not declared once and never asked again; an entry whose figure has since been renamed, dropped or revised is history and is skipped. **And `previous_value` is asked of every claim a branch adds, whatever its figure did**, because the loop above reads that field only for a figure that moved, which is how twenty-eight entries came to declare a years-old figure new. A derived figure quotes its inputs and states the arithmetic instead. **A series is evidenced per array and per release**, because that is how it is published and replaced: its vintage, its point count and a quote holding both ends. A series that moved with no new release behind it needs a correction note saying what changed. **Series entries get both of the passes above too** (PR #147, 5 August 2026): every entry naming a block that still holds its declared vintage is re-read on every run, and `previous_vintage` is asked of every series claim a branch adds rather than only of a block that moved. Four things stop an entry being read at all and are refused only on the branch that writes them: a `file` `lib/series.mjs` does not map, a `block` it does not map, a missing `vintage`, and a block held neither by the data layer nor by the base branch. The quote match is boundary-anchored, so one figure's digits sitting inside another do not satisfy it. **And an entry may not retire itself** (PR #185, 11 August 2026): an entry audited on the base branch may stop being audited only because its record moved, so editing an entry's `value`, `ref`, `range_min` or a series entry's `vintage` or `block`, or deleting it, is refused while the record still holds what it declared. Six routes out of the audit, all probed. Gates the CI job, **not the Netlify deploy**, which runs only `npm test` and `npm run build`, so neither this nor `npm run a11y` runs there. Decided 4 August 2026: state which pipeline gates what rather than add them to the deploy, because CI already gates them and the deploy would pay for a second run |
| `check-build.mjs` | The built HTML: **every sentence in the built output that states one period beside at least one cited figure names a period some cited figure actually covers, since 27 August 2026**, read from the built page because the two it was written for wrapped across source lines and a scan of `content/` could not see either, with citation blocks excluded since the edition they name is not the figure's period, links and fragments resolve, no unrendered syntax, no `NaN`, every table inside a focusable named scrolling region, every ARIA reference resolves, no id on two elements, no two controls sharing a name, no two links sharing their text while going to different places, no link text that names nothing, **every "Cited for" name in a citation block sitting under a publication its own record names as its source**, the launch `robots.txt` state, meaning no `User-agent: *` group disallows the site, the `Sitemap:` line matches `site.url`, no agent on the file's own "# Admits:" line sits in a refusing group, and some group still refuses, which is call 26's other half and went unasserted until 11 August 2026, `sitemap.xml` holding exactly the built pages other than the 404, compared in both directions, the published-figure counts match the refs in the built HTML exactly, in both directions, comments excluded at both ends, **a link written with this site's own origin resolves like a relative one**, and **the domain the print stylesheet writes by hand matches `site.url`**. **Structured data is parsed rather than pattern-matched**: every JSON-LD block must parse, the pages that should carry one must, every URL in one that points at this site must resolve, no third origin may appear, and `ClaimReview` is refused outright |
| `check-a11y-dark.mjs` | The dark palette at WCAG2AA over the same URLs as the light run, taken from `.pa11yci.json` rather than a second list, with `--force-dark-mode` so the page renders its own custom properties rather than a browser inversion. It runs inside `npm run a11y`, beside the light pass |
| `check-sources.mjs` | Every source URL still resolves, the data-layer citations and the external links written in page prose alike. **Including the two parliamentary hosts that answer Node's `fetch` with 403 whatever headers it sends**: those go through `curl` over HTTP/1.1, which the same headers clear, and are reported as uncheckable only where `curl` cannot run (network; runs in CI with `continue-on-error`) |
| `check-pipeline.mjs` | That `npm run validate`, `.github/workflows/validate-data.yml` and `scripts/` name the same checks, measured against one manifest, including which CI steps carry `continue-on-error`. A check declared to run on a laptop and not in CI is refused, which is what stops a check being added to one list and gating nothing on the other. **And that this file's own two lists name what is on disk, both ways**: every `lib/` module has a line in the layout block above and every script has a row in this table, and neither may name a file that does not exist. Both drifted on 21 August 2026, on the day a tenth module and a ninth script were added, and were found by reading rather than by anything failing. It does not establish that a red job blocks a merge, and it deliberately does not read the second copy of this table in `docs/HANDOFF.md`, which is outside the repository and stays hand-maintained |
| `check-releases.mjs` | Three things, over three route shapes. Whether any watched source has published a newer edition than the one each record and series file cites: a GOV.UK collection compared by the month and year in the URL, an ONS bulletin at its own `/latest`, and **since 13 August 2026 a dataset republished IN PLACE**, where no URL names an edition at all and the comparison is the page's own release date against each record's `published_date`. **And how long a behind source has been outstanding**, measured from `first_published_at` of the FIRST edition the site left behind against the one calendar month `/sources-and-method/` promises; a publisher with no promised schedule is reported and never called late. And whether a table the site declares in `table_reference` was corrected *inside* the edition it cites, matched against the Home Office change history and reported only where the figure has not been re-read since. Network; reports and never gates, and opens one deduplicated issue for outstanding work from `main` or the weekly cron. **Since 19 August 2026 the issue title names outstanding work only**: sources it could not fetch share one constant title, whichever failed and however many, because that condition clears itself when the host answers, and while it was in the title a network flap opened a second issue for work already open. **And since 21 August 2026 a refused fetch opens nothing on a push at all**, only on the crons, because six of the seven issues this check had ever opened were ONS rate-limiting the runner rather than work: the workflow reads an `ISSUE-KIND` line rather than matching the title, and the fetch itself now waits on a 429, in `lib/fetch-retry.mjs` |
| `check-fetch-retry.mjs` | The retry in `lib/fetch-retry.mjs`, both directions and with no network: that 429 and 503 are retried on the declared backoff and give up saying how many times they were refused, and **that a 404, a 500 and a thrown error are answered once and never waited on**, which is the half no reading of the module establishes. Retry-After is read in delta-seconds, and one longer than the run will wait ends the attempt rather than shortening it. Gates. Not established, and it says so: that the retry clears a real ONS 429, which is address-based and cannot be reproduced off the runner |
| `npm run a11y` | pa11y at WCAG2AA over every URL listed in `.pa11yci.json`. Fails `npm run a11y`, and the CI job with it, but is not part of `npm run build` and so does not gate the Netlify deploy. Pinned rather than fetched at run time, so two runs a month apart test against the same code |

**Read this before trusting a green run.** A checker here has repeatedly passed while a real defect
shipped, and every instance had one shape: the check verified a property of the *source or the
declaration* rather than the property a reader depends on, and its success message claimed the
latter. The messages now state only what they verify. The incidents are deliberately neither
counted nor listed here.

**pa11y is a floor, not a verdict, and CI says so.** It was negative-tested before being believed,
in both directions, and it flagged none of the accessibility defects that were found by hand. That
is the point of calling it a floor.

Known limits, published on the sources page under *What the checks do not establish*:

- **Prose about figures is unprotected.** Nothing verifies that a chart summary describes the
  data it sits beside. Four false summaries were found by reading, not by tooling. Citing a
  series point fixes the value and not the sentence: `at(2018)` under a sentence naming 2019
  builds cleanly.
- **A figure below one hundred is matched only with its unit attached** and reported as a warning
  rather than a failure, because many metrics share a small value. How many surface is
  what the run prints, and it is deliberately not repeated here: a count kept in two files is
  how this project once had six in one and twelve in the other. Review them; do not
  suppress them, and re-derive them per item rather than trusting a stored note that they
  were all checked: three that a note called coincidences were live values restated
  longhand.
- **No real screen reader has been run over the pages.** The accessibility checks are an
  automated WCAG 2.2 AA audit on every page plus a reading of the accessibility tree that
  assistive technology consumes, which is not the same as someone listening to a page.

That open question about a fourth limit is **closed**, and not by publishing one. It read: a
figure the data layer never recorded is reported and never refused, so the site can carry a
number that nothing can tell you has aged. As of 2 August 2026 it is refused, so there is no
limit left to disclose.

## Content

`content/claims/` holds the claim checks and `content/glossary.md` the definitions. The
candidate set was fixed when the project was scoped; how many of them are drafted is
what `content/claims/` holds and what `npm run validate` prints as the direction split, and
neither number is written here because both move.

**Every chart and every claim card carries a "How to cite this" block**, added on 4 August 2026.
It gives the publication, its edition, its tables, the URL as its own link text so that
select-and-copy needs no script, spreadsheet URLs labelled as downloads, when the figure was
checked, and this site's anchor last, as the route rather than the source. Nothing in it is
typed by an author: it is derived from the records or the series points each figure actually
draws, so a chart cannot cite a publication its own data does not name. `lib/citation.mjs`.

**"Citation" means two things in this repository and they are unrelated.** The block above is a
citation a reader copies. The token below is how content cites the data layer.

Content never hard-codes a figure that will change. It cites the data layer by token,
`{{theme/metric-id}}`, so updating a figure in `data/` updates everywhere it is cited, and
content citing a metric that no longer exists fails the build rather than quietly publishing
a stale number.

In Nunjucks pages use `{% figure "theme/metric-id" %}` instead: those files *are*
pre-processed as templates, so the brace syntax would be evaluated as an expression and
silently produce `NaN`. Both forms call the same renderer. A chart bar carries `ref`, not
`value`, and the shortcode throws on a literal.

A token renders the **formatted value only**, grouped with commas where the value is large, and
never the unit. Units are prose: `%` attaches, `£` prefixes, `people` follows. The author writes
them and the validator confirms it, because an early draft rendered a value in billions with the
currency sign missing. Range metrics have no single value and cannot be tokenised at all.

Writing a number longhand opts out of this protection, so a literal matching a current metric
value fails the build unless declared under `historical_literals`, which is **semicolon
separated**, because the values this fires on are comma grouped. This applies to the prose
in `data/` that reaches a page as well as to content files: the card paragraphs in
`dashboard.json`, and the caveats, confidence definitions and footer note in `meta.json`.
Data files have no front matter, so they declare frozen figures in a sibling
`historical_literals` key.

**A figure written with a scale word is read as a number too**, and compared at the record's own
scale, because a record whose unit is `£ billion` holds a value in billions. It **warns** rather
than fails where it equals a record value, and the difference is the remedy rather than the
confidence: a token renders the grouped digits, so it cannot reproduce the scale-word form, and
citing it changes the wording. Where nothing holds the value it joins the report below. Still
unread: a value spaced rather than grouped, one spelled out in words, an abbreviated scale word,
a scale word below a million, and front matter. The run says so on every invocation.

**A figure the data layer never recorded fails the build**, as of 2 August 2026. It began at
report level under a ratchet whose count could fall and never rise, because erroring on day one
would have forced three dozen exemptions and a check whose only remedy is a blanket exemption
teaches authors to stuff the exemption list. The count reached zero, which is the condition the
ratchet always named for its own removal, so every figure written longhand is now either held by
a record or a series point or declared as frozen with its reason beside it.

**A series point is cited the same way, with a filter rather than a token.** A chart summary
is a Nunjucks string built with `~` concatenation, so a shortcode cannot be used inside one:
`(series.netMigration.data | at(2022) | number)` is the citation, and it throws on a year the
series does not hold. A series value written longhand fails the build on the same terms as a
record value. Where a metric and a series point are the same measure, the metric declares
`series_ref` and `validate-data.mjs` refuses to let the two drift apart.

**A markdown page cannot cite a series point at all**, which is why several of those metrics
exist: the filter above only works inside a Nunjucks string. Replacing a typed figure in a chart
note is therefore free, and replacing the same figure in a claim page costs a record apiece.

Every glossary term must say what the word does **not** mean, not merely what it means. A
definition that leaves the misreading intact has not done the job, so the validator rejects
it. Terms carry stable anchors so claims can link to them.

Three further rules the validator enforces rather than trusting to review:

- **No claim goes unreviewed for more than twelve months.** Statistics get revised; a claim
  resting on a superseded figure is worse than no claim. A weekly CI cron makes the rule fire
  without anyone pushing. There are three answers to it, not two: re-review the page, delete it,
  or add `paused: <date>` to its front matter, which renders a stub at the same address keeping
  the claim and losing the answer, the figures and the citation. The stub is what taking a claim
  down looks like on a static site, where deleting the file turns a URL built to be screenshotted
  into a generic 404. **Pausing clears the error deliberately**, because the deploy runs
  `npm test` before it builds and the state would otherwise be unreachable; the run names every
  paused claim instead.
- **At least two published claims must correct each direction.** A floor, with no ceiling. It
  replaced a two-thirds cap that blocked the correction a pro-migration reader would most
  want to see, because `direction` records whose claim is corrected and correcting a
  restrictionist claim serves pro-migration readers. A rule that prevents a correction
  measures the wrong thing. The real split is generated from the set and disclosed on the
  claims page.
- **Every claim carries `period` and `source`** as required front matter, because the card
  renders both behind a conditional and a claim that omitted them lost them silently.

## Editorial rules that constrain the build

The rules that most affect code:

- No number is shown without its definition, period and source visible without hovering.
- Flows and stocks are never mixed without saying so.
- Reference periods differ between measures, and each figure states its own. Do not compare
  across them, and do not name a period here: this line said asylum ran to March 2026 for nine
  days after the data layer moved to the year ending June 2026.
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
- **Some metric records cannot be aged at all**, because their sources publish irregularly:
  the Migration Observatory, the Commons Library, the NAO, the ICIBI and the OBR. The
  validator names them and counts them on every run rather than counting them as covered, and
  the count is deliberately not repeated here, because this one was wrong within a day of a
  record changing publisher. The
  timeseries points are not aged either: they carry a `retrieved_date`, but nothing compares
  it against a cycle, because the whole array is refreshed per release.
- **Every source URL is checked from a laptop, and until 4 August 2026 the Commons Library
  ones were not.** That host returns 403 to every request Node's `fetch` makes,
  including deliberately invalid paths and including one carrying a browser user-agent and
  the four `Sec-Fetch` headers, so this was recorded as a host that cannot be checked. The
  variable turned out to be the protocol: the same headers over HTTP/1.1 from `curl` return
  200 from the pages and the briefing PDFs, and 404 from an invalid path, so
  `scripts/check-sources.mjs` shells out to `curl` for those two hosts. Where `curl` is
  absent or cannot complete they are reported as uncheckable rather than passing quietly,
  because a request that succeeds whatever it asks for is worse than one that always fails.
- **A 403 or a 429 is reported as uncheckable, from any host.** Which hosts return one depends on
  where the run happens: obr.uk answers a laptop and refuses the GitHub runner, so CI reported two
  live OBR links as dead on every run until 4 August 2026. A page that is gone answers 404 or 410,
  and a check cannot report what it was refused.
- **Redirects are reported rather than failed**, because one usually means a newer release has
  superseded the figure. Which URLs, and how many, is what the run prints: this said one, and
  named the Home Office data tables anchor, while the run named two others, having gone stale
  the way every count typed beside a run that computes it does here.
- **A correction is only seen where the publisher is watched at all.** `check-releases.mjs`
  watches four publisher routes: two gov.uk collections, one ONS bulletin at its own `/latest`,
  and one dataset republished in place. Most of the cited sources have no corrections route of
  any kind, and the run names them and counts them on every invocation. The NAO is one of them: it
  corrected HC 874 by a slip inside the PDF on 1 July 2025, and this site carried the retracted
  wording in a record's notes until 31 July 2026 with every check green. Within the publishers
  that are watched, the records and series files that name a table declare a `table_reference`,
  which `validate-data.mjs` requires of any record naming a table in its own prose, and the change
  history is matched against them, but most of that history names its tables by title rather than by
  identifier. A correction announced that way, or one to a table nobody wrote down, is
  invisible to it.
- **Asylum work-in-progress (total casework backlog) is stale.** The last complete figure is
  from June 2024 and the breakdown was suspended; the record's own notes say so. Do not
  present it as current.
- **The main-applicant asylum applications series was not retrieved**; only the people-basis
  series exists. The two must never be spliced.
- **No real screen reader has been run.** Chrome's accessibility tree is what assistive
  technology consumes and it is what was read, but it is not VoiceOver or NVDA reading a page
  aloud.
- **No automated check verifies that a source CONTAINS the figure citing it.** Every check verifies
  that a figure names a source, which is not the same thing, and the gap produced two real defects:
  a headline figure citing an NAO report that does not carry it, and a small-boats figure citing a
  data-tables index page that carries no figures at all. **The backfill against it is done**, on
  6 August 2026: every record in the data layer carries an entry in `data/evidence/` quoting a
  fetched source, `check-evidence.mjs` re-reads every entry on every run, and every record was
  re-read against its source on 11 August 2026. **What remains unclosed is the shape, not the
  backlog**: nothing re-fetches a source, so an entry that is well formed and wrong passes for as
  long as the figure holds.
  **This bullet said the backfill was unfinished and "several more sessions" until 12 August 2026**,
  six days after it closed.
- **Print was unstyled until 31 July 2026**, so a printed page lost every chart's figures, which sit
  inside a closed disclosure, and every source link's destination. The first fix did not survive
  contact with Chrome, which hides a closed disclosure's contents beyond the reach of child display
  rules, so a printed page still lost the figures until 2 August 2026; the rule now uses the
  supported `::details-content` route and keeps the summary visible where that route does not
  exist. The mechanism was verified in a browser; the rules have still not been checked in a real
  print preview.

## Provenance

The project's foundation document and the `data/` files were produced as separate AI-assisted research
passes in June 2026, reviewed manually, and audited in July 2026. Every figure is traceable
to a named official publication with a retrieval date. The site discloses its use of AI on
`/sources-and-method/`.

Contains public sector information licensed under the Open Government Licence v3.0. See
`LICENCE`.
