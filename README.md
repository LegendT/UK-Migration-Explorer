# UK Migration Explorer

A plain-English guide to what UK migration and asylum statistics do, and do not, show.

This is not an immigration dashboard. It is a public-service explainer that separates
migration, immigration, net migration and asylum, shows what each figure counts, and
checks common claims against definitions, denominators and comparable time periods.

The site is neutral on policy preferences. It is not neutral on statistical misuse — in
either direction. The claim set corrects misuses from both sides of the debate, and the
selection criteria are published rather than assumed.

## Status

Research complete, site not yet built. The repository holds the project foundation and a
governed data layer of 66 metrics and four timeseries. No framework has been chosen.

## Layout

```
docs/foundation.md   Positioning, editorial principles, IA, data governance, risk register, build phases
data/                Governed data layer, one file per theme
scripts/             Data contract validation
CHANGELOG.md         Data and methodology changes
LICENCE              MIT for code, Open Government Licence v3.0 attribution for data
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
| `dashboard.json` | Homepage cards. Holds references, never values |
| `sources.json` | Catalogue of primary sources |
| `meta.json` | Confidence-level definitions, cross-cutting caveats, footer note |

## Data contract

The data model is the trust model. Every published figure carries its own metadata:

`id` `metric_name` `value` `unit` `date` `period_label` `geography` `source_name`
`source_url` `published_date` `retrieved_date` `notes` `confidence_level`

`date` is the **end of the period covered**, never the publication date. Confidence levels
are `official`, `provisional`, `estimated` and `calculated`, defined in `data/meta.json`.
Figures that span a range rather than a point — the net fiscal impact of immigration, for
instance — set `value_type: "range"` with explicit bounds and a null `value`, so no card
can render a range as a point estimate.

**One figure, one home.** `dashboard.json` holds no values of its own. Its cards and its
supporting denominators reference theme metrics by `theme/id`. Previously the same figure
existed in two files, and a quarterly update that missed one would have published two
different official values for the same measure.

**One vintage per series.** ONS states you cannot append the latest estimates to a series
from an earlier release, and the Home Office revises historical asylum figures. Every
timeseries therefore draws from a single publication, and the validator rejects a series
whose points carry more than one `published_date`. Refresh the whole array each release;
never append. Mixing vintages is what made the first net migration series unpublishable.

Validate before publishing anything:

```
npm test                                  # or: node scripts/validate-data.mjs
node scripts/validate-data.mjs --verbose  # also lists outstanding published_date gaps
node scripts/check-sources.mjs            # network check that every source URL resolves
```

It checks that every figure carries all thirteen fields; that dates are real calendar dates
and fall inside the period they claim; that values are numbers; that ranges are not
flattened to points; that source URLs are HTTPS and resolve to a publisher in
`sources.json`; that confidence levels are recognised; that every dashboard reference
resolves and no card carries its own value; and that no data file goes unvalidated because
someone forgot to register it. It exits non-zero on failure, and runs in CI on every push.

## Editorial rules that constrain the build

Full detail in `docs/foundation.md`. The rules that most affect code:

- No number is shown without its definition, period and source visible without hovering.
- Flows and stocks are never mixed without saying so.
- Reference periods differ between measures. Asylum data runs to March 2026; net
  migration to December 2025. Do not compare across them.
- Claim cards will be screenshotted. Period, source and date go inside the card's visual
  boundary and inside its share image, not beside it.
- Charts explain one idea each and carry an accessible data table.
- No red/green moral coding for categories such as grants and refusals.
- No pseudo-live counters. Latest published data only.
- WCAG 2.2 AA, mobile first, progressive enhancement.
- No AI-generated claims without human review and source traceability.

## Known gaps

- **33 of the 66 metrics have `published_date: null`.** Not inferred, because inventing a
  publication date on a project about statistical integrity is not a defensible shortcut.
  The validator reports the count on every run. Record each one when its source is next
  checked.
- **Five Commons Library URLs cannot be checked automatically.** The host returns 403 to
  every request, including deliberately invalid paths, with or without a browser
  user-agent, so an automated check cannot tell a live page from a dead one there.
  `scripts/check-sources.mjs` reports them as uncheckable rather than broken. Verify by hand.
- **Three source URLs redirect**, which usually means a newer release has superseded the
  figure: the Home Office data tables anchor and two Skills for Care pages.
- **`table_reference` is unimplemented.** Home Office table identifiers survive only as
  prose inside `notes`, though the newer metrics name their table in `source_name`.
- Asylum work-in-progress (total casework backlog) is stale: the last complete figure is
  roughly 224,742 cases as at June 2024. Do not present it as current.
- The main-applicant asylum applications series was not retrieved; only the people-basis
  series exists. The two must never be spliced.

## Provenance

`docs/foundation.md` and the `data/` files were produced as separate AI-assisted research
passes in June 2026, reviewed manually, and audited in July 2026. Every figure is traceable
to a named official publication with a retrieval date.

Contains public sector information licensed under the Open Government Licence v3.0. See
`LICENCE`.
