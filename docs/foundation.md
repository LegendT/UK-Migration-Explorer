# UK Migration, Clearly

Project foundation document

Working title: UK Migration, Clearly. Alternative: UK Migration Explorer.

Purpose: create a calm, plain-English, data-led public explainer that separates UK migration, immigration, net migration and asylum statistics, shows what each figure does and does not mean, and helps users identify common statistical misunderstandings.

Prepared: 17 June 2026

# 1. Executive summary

This project should not be built as a generic 'immigration dashboard'. That framing is too broad, too politically exposed and likely to become a confusing pile of figures. The stronger version is a public-service explainer that shows what UK migration and asylum statistics actually measure, why different sources disagree or appear to disagree, and how common claims misuse categories, denominators or time periods.

> The site is neutral on policy preferences, but not neutral on statistical misuse.

The MVP should focus on definitions, distinctions and a small set of well-governed figures. It should be static-first, source-first, and transparent about caveats. Local authority data, cost data and more contested policy analysis can be added later once the core trust model is stable.

The core editorial proposition is simple: migration is not one number, asylum is not the same as immigration, and net migration is not the number of people entering the UK.

# 2. Product thesis

UK migration debate is often driven by collapsed categories. A single headline may refer to net migration, visa grants, asylum applications, small boat arrivals, foreign-born population, hotel accommodation, work routes or removals. These are related but not interchangeable. The project should help people see those distinctions before they form opinions based on the wrong number.

The project is strongest when it works as an explanatory layer between official statistics and public debate. It should make official sources easier to understand without pretending to be a live operational system or a policy campaigning site.

## 2.1 Product promise

- Every figure is sourced.
- Every figure has a period covered and publication date.
- Every figure explains what it counts and what it does not count.
- Every page distinguishes data from interpretation.
- Every common claim is assessed using definitions, denominators and comparable time periods.

## 2.2 Intended public value

- Reduce confusion between migration, immigration, asylum and irregular arrival routes.
- Make current UK migration and asylum statistics findable and understandable.
- Show where the data is strong, provisional, partial or not directly comparable.
- Give users a calmer alternative to partisan headlines and social media fragments.
- Support better civic discussion by making misuse of statistics easier to spot.

# 3. Recommended positioning

Recommended name: Migration, Clearly. It is short, readable and describes the job of the product. UK Migration Explorer is also acceptable and closer to the public finances project, but it sounds more like a generic dashboard. Migration, Clearly better signals the editorial intervention: the site exists to clarify.

| Option | Assessment |
| --- | --- |
| Migration, Clearly | Best editorial fit. Signals clarity and restraint. |
| UK Migration Explorer | Good companion to ukpublicfinances.org, but slightly more generic. |
| UK Migration Facts | Strong and direct, but could sound combative or fact-checker branded. |
| Asylum & Migration Monitor | More policy-facing; useful but narrower and more institutional. |
| Who Comes, Who Leaves | Good narrative phrase but too informal for a source-led data project. |

Recommended strapline: A plain-English guide to what UK migration and asylum statistics do, and do not, show.

# 4. Audience

| Audience | Need | Design implication |
| --- | --- | --- |
| Interested citizens | Understand what the figures mean without reading long statistical bulletins. | Use clear cards, glossary links and claim explainers. |
| Journalists and commentators | Check definitions, periods and source links quickly. | Expose source metadata and caveats beside each figure. |
| Civil servants and policy workers | Explain numbers accurately without over-claiming. | Use precise language and link to official datasets. |
| Local campaigners and councillors | Understand local asylum support figures in context. | Use per-capita comparisons and warnings about raw local numbers. |
| Students and researchers | Find a starting point for credible data sources. | Provide methodology notes and source catalogue. |

# 5. Editorial principles

## 5.1 Core principles

- Separate categories clearly. Migration, immigration, emigration, net migration, asylum, refugee protection, visa grants, settlement and citizenship are different things.
- Do not show a number without defining it.
- Do not mix flows and stocks without explaining the difference.
- Do not compare different time periods without making that visible.
- Do not imply a continuous person-level journey unless the dataset supports cohort tracking.
- Use neutral, precise language. Avoid inflammatory shorthand.
- Treat people as people, not units of cost or pressure.
- Show uncertainty and revision status, especially for ONS migration estimates.
- Keep interpretation labelled as interpretation.
- Prioritise source transparency over drama.

## 5.2 Language rules

| Avoid as default | Use instead | Reason |
| --- | --- | --- |
| Illegal migrants | People arriving without prior permission; irregular arrivals; small boat arrivals where route-specific | The phrase is politically loaded and not always statistically precise. |
| Migrants flooding/swamping | Numbers increased/decreased; arrivals rose/fell | Avoid dehumanising metaphors. |
| Asylum seekers entered illegally | People who claimed asylum after arriving via an irregular route | Asylum claim and route of arrival are distinct concepts. |
| Immigration is X | Net migration / visa grants / asylum applications / immigration estimate is X | Name the measured quantity. |
| Backlog | Initial decision backlog / appeals backlog / support caseload | There are several backlogs in the system. |

# 6. Source landscape

The project should use official statistics as the primary source and selected independent explainers as context. The source model should explicitly distinguish primary data, official interpretation, parliamentary summaries and independent analysis.

| Source | Use | Notes |
| --- | --- | --- |
| ONS long-term international migration | Net migration, immigration, emigration, reason for migration | Official statistics in development; estimates may be revised. |
| Home Office immigration system statistics | Visas, asylum claims, decisions, returns, support, detention, settlement, citizenship | Administrative statistics; different tables often have different units and periods. |
| Home Office data tables | Downloadable tables for build pipeline | Use table references in metadata. |
| House of Commons Library | Readable summaries and political-neutral briefing context | Good for explaining issues to non-specialists. |
| Migration Observatory | Independent explainers, methodology context and interpretive caution | Useful context, but source original figures where possible. |
| Office for Statistics Regulation | Guidance on responsible interpretation | Important for methodology and caveat design. |
| ONS population estimates | Local authority denominators | Needed for per-capita local comparisons. |
| NAO / PAC / Home Office annual reports | Cost and system-performance phase | Add later; costs are complex and politically sensitive. |

## 6.1 Current anchor facts for the first version

These figures are examples of current anchors that can shape the MVP. They should not be hard-coded permanently; they should be stored in the data layer with publication dates, retrieval dates and caveats.

| Topic | Current anchor | Source |
| --- | --- | --- |
| Net migration | ONS estimated UK long-term international net migration at 171,000 for year ending December 2025, down from 331,000 for year ending December 2024. | ONS, published 21 May 2026 |
| Asylum support | At the end of March 2026, 97,519 individuals were in receipt of asylum support, 9% lower than at the end of March 2025. | Home Office, published 21 May 2026 |
| Returns | 39,000 returns were recorded in the year ending March 2026, including enforced and voluntary returns, up 7% on the previous year. | Home Office, published 21 May 2026 |
| Asylum applications | In 2025, there were 82,100 asylum applications relating to 100,600 individuals. | House of Commons Library, updated 2 March 2026 |
| Initial decision backlog | Migration Observatory reported that the initial decision asylum backlog fell to 49,000 applications by the end of 2025. | Migration Observatory, 22 April 2026 |

# 7. Information architecture

The first public version should be shallow and clear. Avoid creating a sprawling policy encyclopaedia at launch.

| Section | Purpose | MVP? |
| --- | --- | --- |
| Overview | Show key figures and the main distinctions. | Yes |
| What the words mean | Define core concepts before users interpret numbers. | Yes |
| Migration | Explain net migration, immigration, emigration and reasons for migration. | Yes |
| Asylum | Explain claims, decisions, grants, refusals, withdrawals and support. | Yes |
| Common claims | Correct common misunderstandings using source-led explanations. | Yes |
| Sources and method | Show source list, update process, caveats and known limitations. | Yes |
| Local picture | Local authority lookup for asylum support and related measures. | Phase 2 |
| Costs | Asylum system cost, accommodation cost and spending context. | Phase 3 |
| Work, study and family routes | Deeper visa-route explainers. | Phase 3 |
| Returns and removals | Deeper enforcement and returns explainer. | Phase 3 |

## 7.1 Recommended navigation

```
Overview
What the words mean
Migration
Asylum
Common claims
Sources and method
Local picture [phase 2]
Costs [phase 3]
```

# 8. MVP pages

## 8.1 Homepage

The homepage should immediately set expectations: migration statistics are often discussed as if they are one number, but they are not. The homepage should show a small number of figures and force clarity through caveats.

- Hero statement: UK migration statistics are often discussed as if they are one number. They are not.
- Key figure cards: net migration, immigration, emigration, asylum applications, people awaiting initial asylum decision, people in asylum support, returns.
- Three explainer panels: migration is not the same as asylum; net migration is not arrivals; visa grants are not always arrivals.
- Latest data update panel: what changed in the latest release, with dates.
- Common claims preview: five short claim-check cards.

## 8.2 What the words mean

| Term | Plain-English definition | Common mistake |
| --- | --- | --- |
| Immigration | People moving into the UK for a long-term stay. | Treating it as the same thing as net migration. |
| Emigration | People leaving the UK for a long-term stay elsewhere. | Ignoring it when discussing net migration. |
| Net migration | Immigration minus emigration. | Treating it as the number of people who entered the UK. |
| Visa grant | Permission granted to enter or stay under a route. | Treating every grant as a person who definitely arrived. |
| Asylum application | A request for protection from someone who says they cannot safely return to their country. | Treating applications, people and decisions as the same unit. |
| Refugee | A person granted protection under refugee rules. | Calling everyone who applies for asylum a refugee before a decision. |
| Irregular arrival | Arrival without prior permission or through an unauthorised route. | Treating route of arrival as the same thing as asylum outcome. |
| Foreign-born population | People living in the UK who were born outside the UK. | Treating it as current-year immigration. |

## 8.3 Migration page

- Explain ONS long-term international migration and its revision status.
- Chart: net migration over time.
- Chart: immigration and emigration over time.
- Chart or table: broad reason for long-term immigration, where reliable.
- Explainer: why ONS estimates and Home Office visa statistics differ.
- Caveat: long-term migration is about moves of 12 months or more, not visits.

## 8.4 Asylum page

- Explain the asylum system as a pipeline, not a single number.
- Chart: asylum applications over time.
- Chart: initial decisions, split by grant, refusal and withdrawal.
- Chart: initial decision backlog over time.
- Card: people in asylum support.
- Explainer: initial decision backlog and appeals backlog are not the same thing.
- Explainer: small boat arrivals and asylum claims overlap but are not identical categories.

## 8.5 Common claims page

This should be a signature feature. It gives the project public usefulness beyond charts.

| Claim | Short answer | Main statistical issue |
| --- | --- | --- |
| Most immigration is asylum seekers. | No. Asylum is one part of a wider migration system. | Confuses asylum with all immigration. |
| Net migration means how many people entered the UK. | No. It is immigration minus emigration. | Confuses net flow with gross inflow. |
| Visa grants equal arrivals. | Not necessarily. | Permission is not the same as a confirmed arrival. |
| Small boat arrivals are the whole asylum system. | No. Many asylum claims are connected to small boats, but the categories differ. | Confuses route of arrival with claim status. |
| The asylum backlog is one number. | No. There are different queues at different stages. | Collapses initial decisions, appeals and support caseload. |
| Local areas all carry the same pressure. | No. Distribution varies and needs per-capita context. | Uses raw numbers without denominators. |
| A refusal means the original claim was obviously false. | Not necessarily. | Appeals, evidence thresholds and changed circumstances matter. |
| Everyone in asylum accommodation is newly arrived. | No. Support caseloads are stocks, not arrival flows. | Confuses stock and flow. |

# 9. Data governance model

The data model is the trust model. The site should not treat figures as loose values inserted into copy. Every metric should carry its own metadata.

```
{
  "id": "net_migration_latest",
  "label": "Net migration",
  "value": 171000,
  "unit": "people",
  "period": "Year ending December 2025",
  "geography": "United Kingdom",
  "source_name": "Office for National Statistics",
  "source_title": "Long-term international migration, provisional: year ending December 2025",
  "source_url": "https://www.ons.gov.uk/...",
  "published_date": "2026-05-21",
  "retrieved_date": "2026-06-17",
  "statistical_status": "Official statistics in development",
  "definition": "Immigration minus emigration for long-term international migration.",
  "caveat": "Net migration is not the number of people entering the UK. Estimates are provisional and may be revised.",
  "update_frequency": "Twice yearly / as published",
  "review_status": "Manual review required before publication"
}
```

## 9.1 Metric schema

| Field | Required? | Purpose |
| --- | --- | --- |
| id | Yes | Stable identifier for code and content. |
| label | Yes | Human-readable metric name. |
| value | Yes | Current value. |
| unit | Yes | People, applications, decisions, percentage, GBP etc. |
| period | Yes | Period covered by the data. |
| geography | Yes | UK, England, local authority etc. |
| source_name | Yes | Publishing body. |
| source_title | Yes | Dataset or publication title. |
| source_url | Yes | Human-readable source link. |
| published_date | Yes | Publication date. |
| retrieved_date | Yes | Date checked for the website. |
| definition | Yes | What the figure counts. |
| caveat | Yes | What it does not show or likely misreadings. |
| statistical_status | Recommended | Official, official statistics in development, administrative etc. |
| table_reference | Recommended | Home Office table ID or data table sheet. |
| review_status | Yes | Draft, checked, published, deprecated. |

# 10. Chart and interaction principles

- Charts should explain one idea each.
- Never make users infer definitions from axis labels alone.
- Use annotations for major methodology changes, policy changes or data breaks.
- Avoid maps in the MVP. Add local lookup later with strong context.
- Do not use red/green moral coding for categories such as grants and refusals.
- Give users the table beneath important charts.
- Always allow users to see the source and period without hovering.
- Do not create pseudo-live counters. Use latest published data.

| Chart | MVP use | Caution |
| --- | --- | --- |
| Line chart | Net migration, applications, backlog over time | Mark revisions and breaks. |
| Stacked bar | Initial decisions by outcome | Avoid too many categories. |
| Small multiples | Compare routes or regions | Needs careful labelling. |
| Sankey / flow | Asylum pipeline concept | Do not imply person-level tracking unless true. |
| Map | Phase 2 local authority lookup | Can become politically inflammatory if used without context. |

# 11. Technical architecture

This should be a static-first public explainer with governed data files, not a heavy application. The project should be easy to update, easy to audit and cheap to host.

| Layer | Recommendation |
| --- | --- |
| Framework | Eleventy or Astro. Choose the one that best matches the existing public finances project. |
| Content | Markdown pages with front matter. |
| Data | CSV/JSON files committed to the repository. |
| Charts | Observable Plot, Chart.js or a lightweight D3 wrapper. |
| Updates | Manual data update at first; optional scheduled source-check later. |
| Hosting | Netlify, Cloudflare Pages or GitHub Pages. |
| Accessibility | WCAG 2.2 AA target; semantic HTML; data tables for chart data. |
| Versioning | Changelog for data updates and methodology changes. |
| AI use | No AI-generated claims without human review and source traceability. |

## 11.1 Suggested repository structure

```
src/
  pages/
    index.md
    what-the-words-mean.md
    migration.md
    asylum.md
    common-claims.md
    sources-and-method.md
  data/
    metrics.json
    sources.json
    migration-timeseries.csv
    asylum-applications.csv
    asylum-decisions.csv
    asylum-support.csv
  components/
    MetricCard.*
    SourceNote.*
    CaveatBox.*
    ClaimCheck.*
    DataTable.*
  content/
    claims/
      net-migration-is-arrivals.md
      asylum-is-most-immigration.md
  scripts/
    validate-metadata.*
    fetch-source-checks.*
  docs/
    editorial-principles.md
    data-governance.md
    risk-register.md
```

# 12. Accessibility and usability requirements

- Use semantic headings and landmarks.
- Ensure charts have textual summaries and accessible data tables.
- Do not rely on colour alone to communicate chart meaning.
- Use plain English definitions with glossary links.
- Keep paragraphs short and scannable.
- Provide skip links and keyboard-accessible interactions.
- Use responsive tables or alternative card views on small screens.
- Make source links descriptive rather than 'click here'.
- Test with keyboard, screen reader basics, zoom at 200%, and mobile view.

# 13. Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Political capture | High | High | Keep policy preferences out of core pages; focus on definitions, source transparency and caveats. |
| Misleading comparisons | High | High | Require metric metadata and review checks before publishing. |
| Scope creep | High | High | Launch with overview, definitions, migration, asylum, claims and method only. |
| Local targeting | Medium | High | Delay maps; use local lookup with per-capita data and careful wording. |
| Data revision confusion | High | Medium | Show publication date, retrieved date, status and revision notes. |
| Cost framing becomes dehumanising | Medium | High | Add costs later as system cost, not migrant cost. |
| Automated updates publish errors | Medium | High | Use manual review before publication. |
| Over-reliance on one source | Medium | Medium | Use official sources as primary and independent explainers as context. |
| User distrust | Medium | High | Expose sources, methods, caveats and changelog. |

# 14. Build phases

## Phase 1: Discovery and framing

- Create final name and strapline.
- Define editorial principles and language rules.
- Create source catalogue.
- Create metric inventory.
- Create glossary.
- Draft first 10 common claims.
- Design low-fidelity homepage wireframe.
- Create risk register and methodology page outline.

## Phase 2: MVP

- Build static site skeleton.
- Implement metric card component with source and caveat fields.
- Add overview, definitions, migration, asylum, common claims and sources pages.
- Add 4-6 core charts with underlying accessible tables.
- Add data changelog.
- Run accessibility and content review before publishing.

## Phase 3: Local picture

- Add local authority lookup.
- Use raw number and per-10,000-residents figure.
- Add accommodation type where available.
- Add warnings about local data limitations.
- Avoid map-first design.

## Phase 4: Costs and pressure

- Add asylum system costs using Home Office, NAO and parliamentary sources.
- Separate accommodation cost, casework cost, legal/appeal cost and local authority support where possible.
- Avoid implying cost equals personal worth.
- Show uncertainty and accounting caveats.

## Phase 5: Deeper explainers

- Work routes.
- Study routes.
- Family routes.
- Settlement and citizenship.
- Returns and removals.
- International comparison, only if methodology is handled carefully.

# 15. First 10 common claims to build

1. Net migration is the number of people who entered the UK.
2. Most immigration is asylum seekers.
3. Visa grants tell us exactly how many people arrived.
4. Small boats are the whole asylum system.
5. The asylum backlog is one single queue.
6. Everyone in asylum accommodation arrived recently.
7. A refusal means the person had no valid reason to claim asylum.
8. Local areas all experience asylum support in the same way.
9. Foreign-born population tells us current immigration levels.
10. Returns figures tell us how many people were forcibly removed.

# 16. Minimum content templates

## 16.1 Metric card template

```
Metric name
Value
Period covered
Change from previous comparable period
Source
Published date
Retrieved date
What this counts
What this does not show
Known caveats
```

## 16.2 Common claim template

```
Claim
Short answer
What the data says
Why the claim is misleading or incomplete
Better question to ask
Source notes
Last reviewed
```

## 16.3 Source note template

```
Source title
Publishing body
Publication date
Dataset/table used
Geography
Period covered
Statistical status
Known limitations
URL
Last checked
```

# 17. MVP acceptance criteria

- A user can explain the difference between immigration, emigration and net migration after reading the homepage and glossary.
- A user can see that asylum is one part of the wider migration system.
- Every headline figure has source, period, publication date, retrieved date and caveat.
- No chart relies on colour alone or lacks a text/table equivalent.
- No page uses inflammatory or imprecise migration language as the default vocabulary.
- The site has a source and methodology page before launch.
- The site has at least five common claims checked against definitions and data.
- The project can be updated manually without code changes beyond data files and content files.

# 18. Recommendation

Build this, but keep the first version narrow. The project will be most useful if it becomes a clarity engine, not a totalising immigration dashboard. Start with definitions, core figures, asylum system pipeline and common claims. Delay local maps and costs until the editorial model is tested.

The first build should answer four questions well: What is net migration? How is asylum different from wider migration? What is happening in the asylum system? Which common claims misuse the data?

> The product should be boring in the best possible way: sourced, dated, caveated and hard to misuse.

# 19. Source list

1. ONS. Long-term international migration, provisional: year ending December 2025. https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/bulletins/longterminternationalmigrationprovisional/yearendingdecember2025

2. Home Office. Immigration system statistics, year ending March 2026: summary of latest statistics. https://www.gov.uk/government/statistics/immigration-system-statistics-year-ending-march-2026/summary-of-latest-statistics

3. Home Office. How many people are in the UK asylum system? year ending March 2026. https://www.gov.uk/government/statistics/immigration-system-statistics-year-ending-march-2026/how-many-people-are-in-the-uk-asylum-system

4. Home Office. How many people are returned from the UK? year ending March 2026. https://www.gov.uk/government/statistics/immigration-system-statistics-year-ending-march-2026/how-many-people-are-returned-from-the-uk

5. Home Office. Immigration system statistics data tables. https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables

6. House of Commons Library. Asylum statistics. https://commonslibrary.parliament.uk/research-briefings/sn01403/

7. Migration Observatory. Net migration to the UK. https://migrationobservatory.ox.ac.uk/resources/briefings/long-term-international-migration-flows-to-and-from-the-uk/

8. Migration Observatory. The UK's asylum backlog. https://migrationobservatory.ox.ac.uk/resources/briefings/the-uks-asylum-backlog/

9. Migration Observatory. Asylum accommodation in the UK. https://migrationobservatory.ox.ac.uk/resources/briefings/asylum-accommodation-in-the-uk/

10. Office for Statistics Regulation. What to look out for: migration and the asylum system statistics. https://osr.statisticsauthority.gov.uk/guidance/2026-what-to-look-out-for-migration-and-the-asylum-system-statistics/
