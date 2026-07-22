# UK Migration Explorer

A plain-English guide to what UK migration and asylum statistics do, and do not, show.

This is not an immigration dashboard. It is a public-service explainer that separates
migration, immigration, net migration and asylum, shows what each figure counts, and
checks common claims against definitions, denominators and comparable time periods.

The site is neutral on policy preferences. It is not neutral on statistical misuse.

## Status

Research complete, site not yet built. The repository currently holds the project
foundation and a governed data layer of 79 sourced figures. No framework has been chosen.

## Layout

```
docs/foundation.md   Project foundation: positioning, editorial principles, IA, risk register, build phases
data/                Governed data layer, one file per theme
scripts/             Data contract validation
```

### Data files

| File | Contents |
| --- | --- |
| `dashboard.json` | Six headline metrics plus supporting denominators |
| `migration.json` | Net migration, immigration, emigration, reason splits, visa grants by route |
| `asylum.json` | Applications, decisions, backlog, small boats, appeals, support, resettlement |
| `population.json` | Foreign-born population, countries of birth, citizenship, settlement |
| `fiscal.json` | Asylum system costs, fiscal-impact estimates, labour market participation |
| `netMigrationTimeseries.json` | Long-run annual net migration series, methodology break flagged |
| `sources.json` | Catalogue of primary sources |
| `meta.json` | Confidence-level definitions, cross-cutting caveats, footer note |

## Data contract

The data model is the trust model. Every published figure carries its own metadata:

`metric_name` `value` `unit` `date` `period_label` `source_name` `source_url`
`retrieved_date` `notes` `confidence_level`

Confidence levels are `official`, `provisional`, `estimated` and `calculated`, defined in
`data/meta.json`.

Validate before publishing anything:

```
node scripts/validate-data.mjs
```

It checks that every figure carries all ten fields, that dates are ISO-formatted, that
source URLs are HTTPS, that confidence levels are recognised, and that every citation
resolves to a publisher listed in `sources.json`. It exits non-zero on failure.

## Editorial rules that constrain the build

Full detail in `docs/foundation.md`. The rules that most affect code:

- No number is shown without its definition, period and source visible without hovering.
- Flows and stocks are never mixed without saying so.
- Reference periods differ between measures. Asylum data runs to March 2026; net
  migration, visas and citizenship to December 2025. Do not compare across them.
- Charts explain one idea each and carry an accessible data table.
- No red/green moral coding for categories such as grants and refusals.
- No pseudo-live counters. Latest published data only.
- WCAG 2.2 AA, mobile first, progressive enhancement.
- No AI-generated claims without human review and source traceability.

## Known gaps

- The `supporting` denominators in `dashboard.json` cite their source in prose only, with
  no `source_url` or `retrieved_date`. Give them the full contract before they reach a page.
- `docs/foundation.md` proposes a metric schema using `label` and `source_title`; the data
  files use `metric_name` and `source_name`. The data files are the contract in force.
- Asylum work-in-progress (total casework backlog) is stale: the last complete figure is
  roughly 224,742 cases as at June 2024. Do not present it as current.

## Provenance

`docs/foundation.md` and the `data/` files were produced as separate AI-assisted research
passes in June 2026 and reviewed manually. Every figure is traceable to a named official
publication with a retrieval date.
