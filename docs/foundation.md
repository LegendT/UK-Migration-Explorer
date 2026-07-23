# UK Migration Explorer

Project foundation document

Name: UK Migration Explorer. Decided 22 July 2026, superseding the working title Migration, Clearly. See section 3.

Purpose: create a calm, plain-English, data-led public explainer that separates UK migration, immigration, net migration and asylum statistics, shows what each figure does and does not mean, and helps users identify common statistical misunderstandings.

Prepared: 17 June 2026. Revised: 22 July 2026.

# 1. Executive summary

This project should not be built as a generic 'immigration dashboard'. That framing is too broad, too politically exposed and likely to become a confusing pile of figures. The stronger version is a public-service explainer that shows what UK migration and asylum statistics actually measure, why different sources disagree or appear to disagree, and how common claims misuse categories, denominators or time periods.

> The site is neutral on policy preferences, but not neutral on statistical misuse.

The MVP should focus on definitions, distinctions and a small set of well-governed figures. It should be static-first, source-first, and transparent about caveats. Local authority data and the contested fiscal-impact debate can be added later once the core trust model is stable.

Revised 22 July 2026: what the asylum system *spends* is now in the MVP, because the National Audit Office figures are audited and firm, and because cost is the claim category that actually circulates. What immigration *is worth* fiscally stays deferred, because it is contested and method-dependent. The distinction between spending and impact is what makes the first safe and the second not. See section 7.

The core editorial proposition is simple: migration is not one number, asylum is not the same as immigration, and net migration is not the number of people entering the UK.

# 2. Product thesis

UK migration debate is often driven by collapsed categories. A single headline may refer to net migration, visa grants, asylum applications, small boat arrivals, foreign-born population, hotel accommodation, work routes or removals. These are related but not interchangeable. The project should help people see those distinctions before they form opinions based on the wrong number.

The project is strongest when it works as an explanatory layer between official statistics and public debate. It should make official sources easier to understand without pretending to be a live operational system or a policy campaigning site.

## 2.1 Product promise

- Every figure is sourced.
- Every figure has a period covered and, where recorded, a publication date. Where the publication date is not yet recorded the figure says so rather than guessing; see section 9.3.
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

Name: UK Migration Explorer. Decided 22 July 2026.

The original recommendation was Migration, Clearly, on the grounds that it signals the editorial intervention. UK Migration Explorer was chosen instead for three reasons: it matches the naming pattern of the companion public finances project, it survives being spoken aloud and typed without a comma, and it describes what the site is rather than asserting a virtue the reader has not yet verified. The strapline carries the editorial position instead.

The risk in the chosen name is real and must be managed in the build: "Explorer" invites the generic-dashboard framing this document rejects in section 1. The homepage must therefore lead with the distinction between measures, not with a grid of figures.

| Option | Assessment |
| --- | --- |
| UK Migration Explorer | Chosen. Companion to the public finances project. Plain, speakable, describes the job. |
| Migration, Clearly | Best editorial signal, but the comma is friction in URLs, search and speech. |
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

None of these audiences has been asked. The table describes who the project would like to
serve, inferred from the subject matter. Talking to five real people was added to phase 1 on
the reasoning that the cheapest possible outcome of this project is discovering early that
nobody wants it. The build ran ahead of it and is now finished, so the saving that argument
promised is gone; what is left is finding out before launch whether anyone wants what has
been built, which is still worth a week. It remains outstanding, see section 14.

## 4.1 Why this exists when the Migration Observatory already does

The source landscape in section 6 doubles as a list of organisations already doing parts of
this job: the Migration Observatory publishes independent explainers with methodology
context, the House of Commons Library publishes readable politically-neutral briefings, the
Office for Statistics Regulation publishes guidance on responsible interpretation, and Full
Fact checks claims. All of them are better resourced than this project and several are more
authoritative. The document never asked what this site adds. It needs an answer, because
every reader who knows the field will ask it.

The honest answer is presentation and findability, not scholarship:

- **A governed data layer.** Every figure carries its own period, source, publication date,
  confidence level and caveat, machine-readably. The incumbents publish excellent prose in
  which the figures are embedded. Nothing here will out-research the Migration Observatory,
  but their briefings are not structured data.
- **Claim-check as a designed unit.** A card that survives being screenshotted, with the
  period and source inside its boundary.
- **Findability.** Someone searching "what is net migration" should land on a page that
  answers exactly that in plain English, not on a 40-page PDF.

This matters for where the effort goes. If the differentiator is presentation and
distribution rather than analysis, the project should be weighted towards design, search and
shareable components, and it should cite the incumbents generously rather than competing
with them.

## 4.2 Identity, funding and success

Three things every credible fact-adjacent site has, that this project had not addressed. On
this subject an anonymous corrective site is assumed to be astroturf by default, and the
assumption is reasonable.

- **Who runs it.** A named person or organisation, on an about page, before launch. Not a
  logo and a contact form.
- **Who pays for it.** A funding statement, including "nobody, this is unfunded and built in
  spare time" if that is the truth. Unfunded is a perfectly good answer. Silence is not.
- **What success looks like.** Define this before building, or the project cannot be
  evaluated and will be sustained or abandoned on feel. Three candidate measures, to be
  chosen and committed to in phase 1: cited by a named outlet or briefing within six months;
  organic search entries on definitional queries; return visits in the week after a major
  data release. Note what is deliberately not a measure: total traffic, and whether anyone
  changed their mind. The second is the thing the project would most like to claim and the
  thing it is least able to demonstrate, the evidence that correcting statistics shifts
  beliefs is weak, and the realistic audience is the persuadable middle and professionals who
  need a citation quickly, not the committed of either side.

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

### These rules are a choice, and the site must say so

Three of the five rows above are statistical precision: naming the measured quantity,
distinguishing the backlogs, separating claim status from route of arrival. Those are not
contestable and need no defence.

The other two are editorial and values-based. "Illegal migrants" is avoided because it is
loaded and imprecise, and "flooding" because it is dehumanising, both defensible, both
aligned with one side's preferred vocabulary, and neither a neutral statistical requirement.
Presenting them as though they were is the same move the site exists to criticise.

There is a specific hazard here. The project's own primary sources use the banned words: the
Home Office publishes an "Irregular migration to the UK detailed dataset (illegal entry
routes)", and the ONS reason split includes people arriving "via illegal entry". A reader who
follows a source link, the behaviour this site actively encourages, will find the site
renaming what its sources call things, without explanation. That looks like concealment even
when it is not.

Therefore:

- Publish the style guide as a page, with the reasoning, and own the values-based rules as
  choices rather than presenting all five as precision.
- Quote source dataset titles verbatim wherever they appear, including the words we would not
  choose ourselves.
- Where the underlying statistical category really is "illegal entry", say so and explain what
  it counts, rather than substituting a softer term and leaving the reader to discover the
  difference.

Note also that section 5.1 includes "Treat people as people, not units of cost or pressure",
which is a values commitment rather than a statistical rule, and which sits awkwardly beside
a phase originally titled "Costs and pressure". The phase has been renamed. The commitment
stays, labelled as what it is.

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
| ONS population estimates | Denominators for population shares | Currently the UK total. Local authority denominators are still needed for phase 4. |
| National Audit Office | Asylum system cost and accommodation contracts | **In the MVP as of 22 July 2026**, see section 7. Audited and firm, which is what makes the costs page safe. |
| Census 2021/22 | Foreign-born population, country of birth, regional distribution | The most reliable stock figures, since the ONS survey-based series was discontinued in October 2022. |
| Office for Budget Responsibility | Fiscal impact of migration in forecasts and scenarios | Scenarios are clearly labelled as such at source, and must stay labelled here. The £341,000 figure comes from one. |
| Migration Advisory Committee | Economic and fiscal evidence on work routes | Salary thresholds, shortage occupations, commissioned reviews. |
| HMCTS / Ministry of Justice tribunals statistics | Asylum and immigration appeals | The appeals queue has a different publisher and a different cycle from the initial-decision queue, which is why the two must never be added. |
| Skills for Care | Nationality composition of the adult social care workforce | England only. Not an official statistics producer, and marked as such on the sources page. |

The first eight rows were the June 2026 list. Five publishers the site now cites were absent
from it altogether, most of them arriving with the costs and labour-market material, and the
National Audit Office was listed as deferred while its figures were being built into the MVP.
`data/sources.json` is the catalogue of record: twelve entries across eleven publishers, and
`scripts/validate-data.mjs` rejects any figure whose source host is not one of them. Update
this table from that file, not from memory.

## 6.1 Anchor facts: superseded, kept as a record

> **Do not copy these figures into any page.** They were the June 2026 scoping anchors and
> `data/` is now the only source of truth. Several are already stale or wrong on their own
> terms. This table is retained so the drift is visible, not so it can be reused.

Two of the five rows made errors this project exists to correct, which is instructive:

- **Initial decision backlog.** The row below says "49,000 **applications**". The figure is
  people. `data/asylum.json` holds both bases: 48,758 people awaiting an initial decision,
  and 35,744 cases. Confusing people with applications is claim 5 on our own list.
- **Period mixing.** The five rows below mix year-ending-December, year-ending-March,
  point-in-time and calendar-year figures with nothing marking the difference. Section 5.1
  forbids exactly this.

| Topic | June 2026 scoping anchor | Status |
| --- | --- | --- |
| Net migration | 171,000, year ending December 2025, down from 331,000 | Superseded by `migration/net-migration` |
| Asylum support | 97,519 individuals at end of March 2026, 9% lower year on year | Superseded by `asylum/people-in-receipt-of-asylum-support` |
| Returns | 39,000 in year ending March 2026, enforced and voluntary | Researched 22 July 2026. Now `asylum/returns-enforced-plus-voluntary` (39,007, the sum of the two published components) |
| Asylum applications | 82,100 applications relating to 100,600 individuals, 2025 | Superseded; note the calendar-year basis differs from the data layer's year-ending-March |
| Initial decision backlog | "49,000 applications" at end of 2025 | **Unit error, see above.** Superseded by the people and cases figures in `data/asylum.json` |

# 7. Information architecture

The first public version should be shallow and clear. Avoid creating a sprawling policy encyclopaedia at launch.

| Section | Purpose | MVP? |
| --- | --- | --- |
| Overview | Show key figures and the main distinctions. | Yes |
| What the words mean | Define core concepts before users interpret numbers. | Yes |
| Migration | Explain net migration, immigration, emigration and reasons for migration. | Yes |
| Asylum | Explain claims, decisions, grants, refusals, withdrawals and support. | Yes |
| Common claims | Correct common misunderstandings using source-led explanations. | Yes |
| What the asylum system costs | The audited spending figures only. Not the contested fiscal-impact debate. | Yes |
| Sources and method | Show source list, update process, caveats and known limitations. | Yes |
| Style guide | Separate the wording rules that are precision from the ones that are choices. | Yes |
| About and funding | Who runs this, who pays for it, how corrections work. | Yes |
| Fiscal impact | The contested question: does immigration pay for itself? | Phase 3 |
| Local picture | Local authority lookup for asylum support and related measures. | Phase 4 |
| Work, study and family routes | Deeper visa-route explainers. | Phase 5 |
| Returns and removals | Deeper enforcement and returns explainer. | Phase 5 |

Two sequencing changes from the June 2026 draft, made 22 July 2026:

**Costs move forward into the MVP; local picture moves back.** The original plan deferred all
cost material to a later phase as "politically sensitive", and put a local authority lookup
second. The research went the other way: `data/fiscal.json` holds fifteen metrics including
audited National Audit Office spending figures, while not one local authority figure exists
and no per-capita denominators have been gathered. Cost is also the claim category that
actually circulates, and refusing to address it reads as evasion rather than restraint.

The distinction that makes this safe is between **spending** and **impact**. What the asylum
system costs is audited, sourced and reasonably firm, the NAO figures. Whether immigration
pays for itself is contested, method-dependent and lands within roughly plus or minus 1% of
GDP across the literature. The first belongs in the MVP. The second needs a page that is
mostly about method, and it can wait.

Local picture moves to phase 4 and is gated on a written harm review. A local authority
lookup is a targeting tool however carefully it is worded, and this is the year of asylum
hotel protests.

## 7.1 Navigation

```
Overview
What the words mean
Migration
Asylum
Costs
Common claims
Sources and method
Style guide
About
Fiscal impact [phase 3]
Local picture [phase 4]
```

The built navigation is in `content/_data/site.js` and carries the shortened labels above.
The style guide is a nav item rather than a footer link because section 5.2 makes publishing
it a condition of the language rules, not an appendix to them.

# 8. MVP pages

## 8.1 Homepage

The homepage should immediately set expectations: migration statistics are often discussed as if they are one number, but they are not. The homepage should show a small number of figures and force clarity through caveats.

The name chosen in section 3 carries a risk the homepage has to answer: "Explorer" invites
the generic-dashboard reading. So the page must lead with the distinction between measures,
not with a grid of numbers. The hero statement does the work; the cards follow it.

- Hero statement: UK migration statistics are often discussed as if they are one number. They are not.
- Three explainer panels: migration is not the same as asylum; net migration is not arrivals; visa grants are not always arrivals. These come before the cards on the page, because "Explorer" invites the grid-of-numbers reading section 3 warns about.
- Eight key figure cards, in `data/dashboard.json`, holding references and never values: net migration, asylum claims, people awaiting a first decision, people in asylum support, small boat arrivals, foreign-born share of the population, asylum system cost, citizenship grants.
- A generated list of the period each card covers, built from the cards themselves.
- Common claims preview: the first three claim checks.

Changes to the card set, and what was decided against:

**Small boat arrivals is in.** It is the figure most visitors will arrive looking for, and
the data layer holds it on three bases (calendar year, year ending, and year to date) with
the caveat written. Omitting the number everyone is searching for, on a site whose purpose is
to reduce confusion about it, would be read as avoidance. The card carries the basis in the
card, not in a footnote, because the three bases give three different numbers.

**People awaiting a first decision and people in asylum support were added 23 July 2026.**
Both are what the asylum argument actually turns on, and both were a click away on the asylum
page while the home page showed neither. Both are stocks counted on one day, so both cards
say so: a stock read as a flow is the error behind two of the claim checks.

**Returns has no card, and the June 2026 draft's list is not the set that shipped.** That list
named immigration, emigration, people awaiting a decision, people in asylum support and
returns; the first two are on the migration page as a chart, the middle two are now cards, and
returns is not. The set that ships spans the range of things this site publishes rather than
the asylum pipeline alone: a flow, two stocks, a route, a population share, money and a grant
count. Returns can be added, and if it is, two cautions apply: returns count EVENTS, not
people, so one person returned twice appears twice; and refused entry at port is counted
separately and must not be added to the total. The data layer holds the port figure
specifically so that error is visible rather than invited.

**No latest-data-update panel.** The June 2026 draft wanted one, listing what changed in the
latest release with dates. It was never built and is not being built: every page already
carries the date it was last reviewed, every card carries its own published and checked
dates, and the changelog is linked from the footer of every page. A fourth place to say the
same thing is a fourth place for it to go stale.

**Three claim previews, not five.** The layout was designed around three and the full set is
one link away.

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

**Written 22 July 2026.** The glossary now exists as `content/glossary.md`: 23 terms, in five
groups. The eight terms above are all included.

It grew beyond eight because the eight were not enough to read the site's own figures. Four
additions do most of the work, and none is optional:

- **Flow and stock**, and **people, main applicants and cases**, the two distinctions
  responsible for most misreadings on this subject, and the reason two honest sources appear
  to contradict each other.
- **Backlog** had to become a table rather than a definition. There is no such thing as the
  backlog: the initial decision queue has fallen sharply while the appeals queue has risen to
  a record, and a single number for "the backlog" can be right about one and wrong about the
  system.
- **Provisional, revised and official statistics in development**, because a reader who does
  not know what those labels mean will read a revision as manipulation.

Selection rule, stated on the page: a term earns a place if it appears in the figures this
site publishes and if misreading it produces a real error. Terms that sound technical but
change nothing about how a number should be read are deliberately excluded.

Every entry must say what the word does NOT mean, not merely what it means. A definition
that leaves the misreading intact has not done this page's job, so
`scripts/validate-content.mjs` fails any term that omits it.

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
- Figure: people in asylum support, with the stock reading spelled out. It is a paragraph on this page and a card on the home page.
- Explainer: initial decision backlog and appeals backlog are not the same thing.
- Explainer: small boat arrivals and asylum claims overlap but are not identical categories.

## 8.5 Common claims page

This should be a signature feature. It gives the project public usefulness beyond charts. It
is also the feature most likely to destroy the project's credibility, so it needs rules
before it needs content.

### 8.5.1 The problem with the original list

The June 2026 draft listed ten claims. Every one of them corrected a claim associated with
the restrictionist side of the debate. Not one corrected a misuse from the other side.

Section 1 of this document states that the site is "neutral on policy preferences, but not
neutral on statistical misuse". A claim list that only ever corrects one side does not
implement that sentence, it implements a different one, and the difference will be noticed
within a week of launch by exactly the audience most inclined to distrust the site. The risk
register scores political capture as high likelihood and high impact, and then mitigates it
with "keep policy preferences out of core pages". A one-directional claim list is not a
policy preference kept out of core pages. It is a policy preference expressed as a core page.

This is not a hypothetical fix. The research layer already contains the corrective material
for the other direction and the original list simply did not use it. `data/fiscal.json`
flags the Office for Budget Responsibility's £341,000 lifetime-contribution figure as a
stylised single-case scenario that must not be presented as typical, a figure misused
almost exclusively by the pro-migration side. The same file records that the net fiscal
impact of immigration is contested, method-dependent and lands within roughly plus or minus
1% of GDP across studies, which falsifies "immigrants are a drain on the public finances"
and "immigrants pay far more in than they take out" with equal force.

### 8.5.2 Claim selection criteria

Publish these criteria on the page. A claim qualifies only if all four hold:

1. **It circulates.** It can be shown in mainstream coverage, parliamentary debate or
   high-engagement social posts. We are not correcting claims nobody makes; that is a
   strawman and it will be called one.
2. **The error is statistical, not political.** The claim misuses a definition, a
   denominator, a time period, a unit, or the difference between a stock and a flow. "This
   policy is wrong" is not a claim we check. "This policy caused that number to fall" is,
   but only where the data can actually answer it.
3. **Our sources can settle it.** If answering requires evidence we do not have, we say the
   question is open rather than manufacturing a verdict.
4. **We would apply the same test to the opposite claim.** Write the mirror-image claim
   before publishing. If checking it would embarrass us, that tells us something.

**Representation floor.** At least two published claims must correct each direction. This is
enforced in `scripts/validate-content.mjs` before the site builds, not checked at review, so
a set that only ever corrects one side cannot ship. If we cannot find qualifying claims in
the other direction, that is evidence our sourcing is too narrow, not evidence the other side
never misuses statistics.

There is deliberately no ceiling. This replaced a two-thirds cap on 22 July 2026, after the
cap blocked "immigrants are a drain on the public finances", which is the correction a
pro-migration reader would most want to see. `direction` records whose claim is corrected,
and correcting a restrictionist claim serves pro-migration readers, so a cap on
restrictionist-labelled claims capped how much the site could serve the other side. A rule
that prevents a correction is measuring the wrong thing. The full reasoning is in the
script beside the floor. The real split is generated from the claim set and disclosed on the
claims page instead.

**What we do not cover, and why.** Crime and migration is absent from this list and from the
data layer. The statistics are genuinely difficult, nationality is inconsistently recorded,
the denominators are contested, and the honest answer is largely "the data cannot tell you
that". State this openly on the Sources and method page. Scope silence is indistinguishable
from bias.

### 8.5.3 The claim set

| Claim | Direction | Short answer | Main statistical issue |
| --- | --- | --- | --- |
| Net migration means how many people entered the UK. | Restrictionist | No. It is immigration minus emigration. | Confuses net flow with gross inflow. |
| Most immigration is asylum seekers. | Restrictionist | No. Asylum is one part of a wider migration system. | Confuses asylum with all immigration. |
| Visa grants equal arrivals. | Restrictionist | Not necessarily. | Permission is not the same as a confirmed arrival. |
| Small boat arrivals are the whole asylum system. | Restrictionist | No. The categories overlap but differ. | Confuses route of arrival with claim status. |
| The asylum backlog is one number. | Restrictionist (shared) | No. There are different queues at different stages. | Collapses initial decisions, appeals and support caseload. |
| Everyone in asylum accommodation is newly arrived. | Restrictionist | No. Support caseloads are stocks, not arrival flows. | Confuses stock and flow. |
| Immigrants pay far more in tax than they cost. | Pro-migration | Not established. Estimates sit within about plus or minus 1% of GDP either way. | States a contested, method-dependent estimate as settled fact. |
| Immigrants are a drain on the public finances. | Restrictionist | Not established. The same research that fails to show a large benefit fails to show a large cost. | States a contested, method-dependent estimate as settled fact. The mirror of the row above. |
| The average migrant contributes £341,000 over their lifetime. | Pro-migration | No. That is a stylised scenario for one illustrative case, not an average. | Presents an illustrative model output as a typical outcome. |
| Asylum hotels cost £8 million a day. | Restrictionist | Check the figure and the year before repeating it. | Uses a figure from a peak period as if it were current; conflates hotel cost with total system cost. |
| 19% of the UK population was born abroad. | Restrictionist | Not an accredited estimate. The ONS series was discontinued in 2022. | Cites a number with no current official basis. |
| A refusal means the original claim was obviously false. | Restrictionist | Not necessarily. | Ignores appeals, evidence thresholds and changed circumstances. |
| Almost all refused asylum seekers are eventually recognised as refugees. | Pro-migration | No. Appeal success raises the final grant rate substantially, but not to that. | Generalises the appeal success rate to all refusals. |
| Local areas all carry the same pressure. | Restrictionist | No. Distribution varies and needs per-capita context. | Uses raw numbers without denominators. |
| Falling net migration means the asylum system is shrinking. | Pro-migration (shared) | No. They are different systems measured differently. | Reads one series as a proxy for another. |

**There is no "both" direction.** `scripts/validate-content.mjs` accepts `restrictionist` and
`pro-migration` and nothing else, because a third label that no claim ever carried was a
promise to the reader that nothing kept. The style guide states the rule the two rows marked
"(shared)" above follow: a misuse common on both sides is written up under whichever version
circulates more, and named as shared in the text. The marker is for this table only and is
not a value the front matter can hold. Drafting either of those two claims means picking one
of the two labels; the assignments above are a starting position, not a finding.

Eleven of the fifteen correct a restrictionist claim. The representation floor sets no
ceiling on that, and this table is the candidate list rather than the published set, which
runs five to two. Restrictionist claims are easier for us to find because they are more
numerous in circulation, which is itself a finding worth stating on the page rather than
quietly compensating for. The claims page states it.

### 8.5.4 Claim cards will be screenshotted

Every claim card will be shared stripped of its context, by both sides. Design for that:

- The period, the source and the date must be inside the card's visual boundary, not beside
  it, so a screenshot carries them. All three are required front matter as of 23 July 2026,
  so a claim cannot ship without them: `claim.njk` renders period and source behind a
  conditional, and a claim that omitted them lost them from the card with nothing on the page
  to show it.
- Never write a short answer that reverses meaning when quoted alone. "Not necessarily" is
  safe. "No" followed by a qualifying paragraph is not.

**There is no generated share image, and there will not be one.** The June 2026 draft
required the period and source inside one. Building it means rendering an image per claim at
build time, which is a dependency, a build step and an asset on a site that ships no
client-side JavaScript, one stylesheet and no images at all. The thing people actually share
is a screenshot of the card, which already carries all three. If link previews are wanted
later, `og:title` and `og:description` from front matter that already exists is a smaller job
and a different one.

# 9. Data governance model

The data model is the trust model. The site should not treat figures as loose values inserted into copy. Every metric carries its own metadata.

This section previously specified a schema that the data layer never implemented, leaving
three competing definitions of "required" in circulation: this document, the files in
`data/`, and the validator. As of 22 July 2026 there is one. The schema below is what
`scripts/validate-data.mjs` enforces, and the validator is the authority, if this section
and the script ever disagree, the script wins and this section is the bug.

```json
{
  "id": "net-migration",
  "metric_name": "Net migration (long-term international migration)",
  "value": 171000,
  "unit": "people",
  "date": "2025-12-31",
  "period_label": "year ending December 2025",
  "geography": "United Kingdom",
  "source_name": "ONS, Long-term international migration, provisional: year ending December 2025",
  "source_url": "https://www.ons.gov.uk/...",
  "published_date": "2026-05-21",
  "retrieved_date": "2026-06-17",
  "notes": "Immigration minus emigration. NOT the number of people who entered the UK. Provisional and subject to substantial revision.",
  "confidence_level": "provisional"
}
```

## 9.1 Metric schema

| Field | Required? | Purpose |
| --- | --- | --- |
| id | Yes | Stable slug, unique within its file. Referenced as `theme/id`. Survives quarterly updates; array position does not. |
| metric_name | Yes | Human-readable metric name. |
| value | Yes | Current value. Must be a number, or `null` where `value_type` is `range`. |
| unit | Yes | People, cases, applications, grants, %, £ billion. |
| date | Yes | **The last day of the period covered**, not the publication date. |
| period_label | Yes | Human-readable period. Must contain the year in `date`, or the year before it for financial years. |
| geography | Yes | United Kingdom, England, London. |
| source_name | Yes | Publishing body and publication title, combined. |
| source_id | Yes | The `id` of the entry in `sources.json` this figure came from. Added 23 July 2026, because a hostname cannot supply it: `www.gov.uk` serves the Home Office, the Migration Advisory Committee and the tribunals statistics, and several figures cite an `assets.publishing.service.gov.uk` hash that names no publisher at all. This is what lets the validator age a figure against its own source's cadence. |
| source_url | Yes | HTTPS link, to a publisher listed in `sources.json`. |
| published_date | Yes | Publication date of the underlying statistics. May be `null` where not yet recorded; the validator counts and reports these. |
| retrieved_date | Yes | Date the figure was checked for this project. |
| notes | Yes | What the figure counts, what it does not show, and likely misreadings. |
| confidence_level | Yes | official, provisional, estimated or calculated. Defined in `data/meta.json`. |
| value_type | Where applicable | `range` for figures that span a sign or a plausible interval. Requires `range_min` and `range_max` and forbids a point `value`. |
| published_date_unavailable | Where applicable | Prose saying why a `null` `published_date` can never be filled in, for example a daily-updated operational page whose past snapshots carry no publication date. Suppresses the outstanding warning. A documented impossibility is not debt, and nagging about it forever would train everyone to ignore the count. |

### 9.2 Deliberate departures from the original schema

Four fields in the June 2026 draft were dropped rather than implemented, and the reasoning
should be recorded so they are not silently reinstated:

- **`definition` and `caveat` are merged into `notes`.** Splitting them sounds tidier, but in
  practice the caveat is usually the definition stated carefully, and two fields produced two
  half-written ones. One field that must be complete beats two that can each be thin. If the
  site later needs them rendered separately, split then, on real copy.
- **`statistical_status` is replaced by `confidence_level`.** The data layer invented a
  four-level scale, official, provisional, estimated, calculated, that is sharper than the
  original field and is already applied consistently across every figure. It is the better
  idea and it wins.
- **`source_title` is merged into `source_name`.** The two were never populated separately.
- **`review_status` is dropped.** A draft/checked/published field is only meaningful if
  something enforces the workflow. Nothing does, and a field everyone sets to "published" is
  worse than no field because it implies a check that never happened. Reinstate it alongside
  a real review process, not before.

### 9.3 Known gaps in the contract

- **`table_reference` is still unimplemented.** Home Office table identifiers survive only
  inside `notes` as prose. Section 6 requires table references in metadata. Add the field
  when the next quarterly update touches those figures.
- **`published_date` is now recorded for 66 of the 67 theme metrics**, closing what was 33
  outstanding in the June 2026 draft. Nothing was inferred to close it, because inventing a
  publication date on a project about statistical integrity is not a defensible shortcut. The
  one remaining null is a daily-updated operational page whose past snapshot has no
  recoverable publication date; it carries `published_date_unavailable` saying so, and it is
  cited on no page. The validator counts and reports any that are outstanding, and currently
  reports none.

### 9.4 One figure, one home

`dashboard.json` holds no values. Its cards and its supporting denominators reference theme
metrics by `theme/id`, and the validator rejects any card that carries its own value.

This is not tidiness. The six dashboard figures were previously verbatim copies of theme
figures, and four of them carried a different `metric_name` from the figure they duplicated,
so nothing could reconcile them automatically. The first quarterly update that revised
`asylum.json` and forgot `dashboard.json` would have published two different official values
for the same measure, on the same site, on a project whose entire proposition is statistical
integrity. Reference, never copy.

# 10. Chart and interaction principles

- Charts should explain one idea each.
- Never make users infer definitions from axis labels alone.
- Use annotations for major methodology changes, policy changes or data breaks.
- No maps, in the MVP or later. The phase 4 local picture uses a lookup. A map of asylum accommodation is a targeting tool whatever the intent.
- Do not use red/green moral coding for categories such as grants and refusals.
- Give users the table beneath important charts.
- Always allow users to see the source and period without hovering.
- Do not create pseudo-live counters. Use latest published data.

| Chart | MVP use | Caution |
| --- | --- | --- |
| Line chart | **Built, four of them.** Net migration, the two flows, applications, backlog over time | Mark revisions and breaks. The method break is drawn on the chart, not footnoted. |
| Bar chart | **Built, three of them.** Reason for immigration, initial decisions by outcome, cost per accommodation place | Plain bars, not stacked. Withdrawals sit outside the decisions total, so stacking them would assert an arithmetic that is not true. |
| Small multiples | Not used. | Reconsider if routes or regions ever need comparing side by side. |
| Sankey / flow | Not used. The asylum pipeline is a table with a stage, a figure and what it counts. | The table was the safer form: a flow diagram implies people moving between stages, and these figures are stocks and flows measured at different moments. |
| Map | Not planned. Phase 4 local picture uses a lookup, not a map. | A map of asylum accommodation is a targeting tool. See section 13. |

# 11. Technical architecture

This should be a static-first public explainer with governed data files, not a heavy application. The project should be easy to update, easy to audit and cheap to host.

| Layer | Recommendation |
| --- | --- |
| Framework | **Eleventy 3.** Chosen to match the public finances project, so one set of habits covers both. |
| Content | Markdown and Nunjucks pages with front matter. Markdown where the page is prose, Nunjucks where it carries charts, because a chart cites records through a shortcode. The two use different citation syntax; see section 15. |
| Data | JSON files committed to the repository. Not CSV: the contract in section 9 is per-figure metadata, which CSV expresses badly. |
| Charts | **None of these.** Inline SVG generated at build time by `lib/charts.mjs`. The site ships no client-side JavaScript at all, so charts work with scripting off, add no dependency and need no content security policy exception. |
| Updates | Manual data update, deliberately. The scheduled source check is built: CI runs the link checker weekly on a cron, because the time-based rules fire only if something runs. |
| Hosting | Netlify, Cloudflare Pages or GitHub Pages. |
| Accessibility | WCAG 2.2 AA target; semantic HTML; data tables for chart data. |
| Versioning | Changelog for data updates and methodology changes. |
| AI use | No AI-generated claims without human review and source traceability. |

## 11.1 Repository structure

What exists as of 23 July 2026:

```
data/                       67 governed metrics and four timeseries
  migration.json            net migration, flows, reason splits, visa grants
  asylum.json               claims, decisions, backlog, small boats, appeals, support, returns
  population.json           foreign-born population, citizenship, settlement
  fiscal.json               asylum system costs, fiscal impact, labour market
  netMigrationTimeseries.json      current ONS basis, plus discontinued series as history
  asylumApplicationsTimeseries.json
  asylumBacklogTimeseries.json     both the people and cases bases
  migrationFlowsTimeseries.json    immigration and emigration
  dashboard.json            homepage cards, references only, holds no values
  sources.json              publisher catalogue
  meta.json                 confidence definitions and cross-cutting caveats
content/                    the site's pages, 16 of them
  index.njk asylum.njk migration.njk costs.njk common-claims.njk
  glossary.md sources-and-method.md style-guide.md about.md
  claims/                   seven claim pages, one per claim
  _includes/base.njk        the only layout, plus claim.njk for claim pages
  _data/site.js             name, strapline, navigation
  assets/style.css          one stylesheet
  robots.txt                disallows all crawlers until launch
lib/charts.mjs              inline SVG charts, built at build time
eleventy.config.js          citation shortcodes, filters and the three HTML transforms
docs/foundation.md          this document
docs/HANDOFF.md             state of play between sessions
scripts/validate-data.mjs   data contract enforcement, stdlib only
scripts/validate-content.mjs page content against the data layer, and house style
scripts/check-build.mjs     the BUILT html, not the source that produced it
scripts/check-sources.mjs   network check that every source URL still resolves
.pa11yci.json               pa11y over all 16 URLs at WCAG2AA
.github/workflows/          CI: everything above runs on every push, plus a weekly cron
CHANGELOG.md                data and methodology changes
LICENCE                     MIT for code, OGL v3 attribution for data
```

**There is no `src/`.** An earlier version of this section expected `src/pages/` and
`src/components/`, listing MetricCard, SourceNote, CaveatBox, ClaimCheck and DataTable. The
build went a different way and the components exist as three kinds of thing instead: Nunjucks
partials in `_includes/`, shortcodes and filters registered in `eleventy.config.js`, and
structural blocks rendered from the data layer by the `PARTIALS` map there. The nearest thing
to a MetricCard is the loop over `dashboard.cards` in `index.njk`.

The link checker is built and has already earned its place: it found that five Commons
Library URLs cannot be verified automatically at all, because the host returns 403 to every
request including deliberately invalid ones. It reports those as uncheckable rather than
broken. Calling a live link dead would train the reader to ignore the checker, which is
worse than having none.

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

A mitigation must be something a person could do and another person could verify was done.
Several entries in the June 2026 register failed that test: "expose sources, methods and
caveats" restates the product rather than mitigating anything, and "keep policy preferences
out of core pages" addresses self-inflicted bias rather than capture, which is something
other people do to you regardless of your intent.

| Risk | Likelihood | Impact | Mitigation (verifiable) |
| --- | --- | --- | --- |
| **Silent staleness** | **High** | **High** | `validate-data.mjs` ages every figure against its own source's publication cycle and reports any not re-checked within it, naming the sources it cannot check because they publish irregularly. A weekly CI cron makes that fire without anyone pushing. The update cycle is capped at four source releases, not at a figure count (section 14). Every page carries the date it was last reviewed. **The site does not display its own lateness**, and nothing detects that a release has actually happened. |
| Political capture | High | High | Published claim-selection criteria (8.5.2). A representation floor enforced in CI: at least two claims correcting each direction, so a set that only ever corrects one side fails the build. The real split is generated from the claim set and disclosed on the claims page. The style guide separates the precision rules from the value-based choices. |
| Misleading comparisons | High | High | The data contract, enforced in CI on every push, not by memory. Period and basis inside every card. |
| Quote-mining and selective citation | High | Medium | Period, source and date inside the card's visual boundary (8.5.4), all three required front matter so a claim cannot ship without them. Short answers written to survive being quoted alone. No share image, and 8.5.4 records why. |
| Data revision confusion | High | Medium | Corrections policy with a public log (section 13.1). `published_date`, `retrieved_date` and `confidence_level` on every figure. |
| Scope creep | High | High | Launch with the MVP set in section 7 only. Costs limited to audited spending; fiscal impact deferred. |
| Local targeting | **High** | High | Local picture moved to phase 4 and gated on a written harm review. No maps. Per-capita denominators mandatory. Reclassified from medium: this is the year of asylum hotel protests. |
| Cost framing becomes dehumanising | Medium | High | No cost per asylum seeker, ever. What the site does publish is system spending and the contracted price of an accommodation place per night, which is a procurement figure, labelled as one on the chart, on the costs page and in the style guide. The line is between what a bed costs to buy and what a person is worth, not between per-person arithmetic and none. |
| Automated updates publish errors | Medium | High | Manual review before publication; CI validates structure but never publishes figures. |
| Over-reliance on one source | Medium | Medium | Official sources primary, independent explainers as context. `sources.json` records the publisher of every figure. |
| Maintainer burnout or abandonment | Medium | High | A dated last-reviewed stamp on every page, and the update commitment once it is signed off. The twelve-month claim expiry fails the build, and the weekly cron makes it fire with nobody pushing. **A static site cannot announce its own abandonment**: if the project stops, nothing new is published, and that includes the notice. What a reader has instead is the review date on every page and each source's cadence in the catalogue. |
| Legal exposure from attributed claims | Low | High | Claims are stated as circulating propositions, not attributed to named individuals, unless there is a specific reason to attribute and it has been considered. See 13.2. |

**Three mitigations in this table were promises rather than descriptions, and 23 July 2026
replaced them with what is true.** Silent staleness claimed the site displayed its own
lateness and that the validator aged figures against their source's update frequency; neither
existed, and `updateFrequency` was a field nothing compared against anything. The check now
exists, which is why `source_id` was added to the contract in section 9.1: without it a
figure cannot be matched to its own catalogue entry. The lateness display was not built and
the row says so. Quote-mining promised a share image that does not exist, and abandonment
promised a notice a static site cannot publish. A mitigation that names something unbuilt is
worse than an empty cell, because the empty cell does not tell you the risk is handled.

**Two mitigations for political capture were withdrawn and this records what replaced them.**
The two-thirds balance rule was removed because it blocked a correction a pro-migration
reader would most want to see; the reasoning is in `scripts/validate-content.mjs` beside the
floor that replaced it. The second reader signing off the claim set does not exist: this is a
single-maintainer project and the about page says so. Nothing has replaced it, and the
top-rated risk is therefore mitigated by published criteria, a CI-enforced floor and
disclosure, all of which a reader can check, and by no independent judgement at all.

## 13.1 Corrections policy

Required before launch. Official statistics are revised, sometimes heavily, net migration
for year ending December 2024 moved from 431,000 to about 345,000 to 331,000 across
successive releases. A site that corrects other people's use of statistics has to be visibly
better than they are at handling its own.

- Every published figure change is recorded in `CHANGELOG.md` with the reason and the source.
- Where a revision changes the substance of a claim check, the claim page carries a dated
  correction note at the top. It is not silently edited.
- Where a revision changes only the magnitude and not the conclusion, the figure updates and
  the changelog records it.
- Every claim card shows a "last reviewed" date. A card not reviewed within twelve months is
  unpublished until it is.
- Readers can report an error, and the route to do so is on every page.

## 13.2 Attribution of claims

The claims in section 8.5 are written as propositions that circulate, not as quotations
attributed to named people. This is a deliberate trade-off and should be understood as one.

Attributing claims to named individuals or outlets makes them concrete, harder to dismiss as
strawmen, and more useful to journalists. It also creates defamation exposure, invites
sustained argument about whether the person meant precisely that, and shifts the site from
explaining statistics to litigating individuals.

Unattributed claims avoid all of that and carry one real cost: the "nobody actually says
that" rebuttal. The mitigation is criterion 1 in section 8.5.2, a claim qualifies only if it
demonstrably circulates, and holding the evidence for each claim in the project's own files
without publishing it as an accusation. Revisit this decision if the strawman rebuttal
becomes the dominant criticism after launch.

# 14. Build phases

## Phase 1: Discovery and framing, COMPLETE except where marked

Declared complete on 22 July 2026. For a solo builder this phase had become documentation
theatre: most of it already existed as this document and the files in `data/`, and keeping it
open invited an indefinite planning loop.

- ~~Create final name and strapline.~~ Done. UK Migration Explorer (section 3).
- ~~Define editorial principles and language rules.~~ Done (section 5).
- ~~Create source catalogue.~~ Done: `data/sources.json`.
- ~~Create metric inventory.~~ Done: 67 metrics across four theme files, plus four timeseries.
- ~~Create risk register.~~ Done (section 13), with corrections policy.
- ~~Glossary.~~ Done: `content/glossary.md`, 23 terms in five groups. See section 8.2 for why
  it grew past the eight in the original table.
- ~~Draft the claims.~~ Partly done: seven are written to the template in section 16.2, and
  eight of the candidates in section 8.5.3 remain undrafted. See section 15.
- ~~Homepage wireframe.~~ Superseded. The homepage was built directly and has since been
  through a design round; a wireframe for a page that exists would be drawn from the page.
- ~~Methodology page outline.~~ Done, and built: `content/sources-and-method.md`.
- **Outstanding: choose the success measures.** Section 4.2 offers three candidates and says
  they must be chosen and committed to in this phase. None has been. Section 17 makes it a
  process criterion, and it is the only one with nothing pointing at it.
- **Outstanding, and genuinely missing from the original phase: talk to five people.** A local
  journalist, a councillor, a teacher, and two people who are simply interested. Ask whether
  they would use this and what they would look for. This project has been designed for named
  audiences (section 4) none of whom has been asked. It is the cheapest possible way to find
  out that the honest answer is nobody, and the only phase-1 item that can save the whole
  build cost.

## Phase 2: MVP

Give this phase a calendar deadline and a figure cap. Five phases with no dates is not a plan
one person can be held to.

**Cap the update cycle at four source releases.** The June 2026 draft capped published
figures at 15-20 instead, and that counted the wrong thing. Updating thirteen Home Office
figures from one quarterly release is a single session: you chase the release once, re-read
its tables once, and re-check everything that came from it. Publishing four of those thirteen
instead would save almost nothing, while making the site worse. What actually predicts
staleness is the number of releases you have to chase.

The routine cycle is currently **three releases**, covering 22 of the 36 published figures:

| Release | Cadence | Published figures |
| --- | --- | --- |
| Home Office, immigration system statistics | Quarterly | 13 |
| ONS, long-term international migration | Twice yearly | 7 |
| HMCTS / Ministry of Justice, tribunals statistics | Quarterly | 2 |

The other 14 come from the National Audit Office, the Commons Library, the Migration
Observatory and the OBR, which publish irregularly and are re-checked when they do rather
than on a schedule. `scripts/validate-data.mjs` ages every figure against its own source's
cycle and names those four as the ones it cannot age.

The figure count follows from the cap rather than being the cap, and it is recorded rather
than targeted: 36 records reach a reader, out of 67 in the data layer. The unpublished
figures are not wasted; they are the reserve that makes the published ones defensible.

No longer blocked on research, and the build is done. As of 23 July 2026 the site is 16
pages, with seven charts across the migration, asylum and costs pages, each carrying an
accessible data table, a text summary, its source, and a zero-based axis. What is left is not
build work:

- ~~Build static site skeleton.~~ Done: Eleventy 3, `content/` in and `_site/` out.
- ~~Implement metric card component driven by the data contract in section 9.~~ Done: the
  loop over `dashboard.cards` in `index.njk`, which reads every value through the `metric`
  filter and can carry none of its own.
- ~~Add overview, definitions, migration, asylum, costs, common claims, sources and about
  pages.~~ Done, plus the style guide, which section 5.2 requires.
- ~~Add 4-6 core charts with underlying accessible tables.~~ Done: seven, rendered as inline
  SVG at build time. No JavaScript, so they work with scripting off, need no dependency and
  need no exception to the content security policy. Four rules are enforced in the chart
  code rather than left to whoever writes the page: the y-axis always starts at zero,
  every chart carries its figures as a real table, no series is distinguished by colour
  alone, lines differ in stroke pattern and are labelled directly, and gridlines fall on an
  interval a reader counts in rather than on the axis top divided by four.
- ~~Write the glossary and at least five claims.~~ Done: `content/glossary.md` and seven
  claims.
- ~~Write the sources and methodology page.~~ Done: `content/sources-and-method.md`.
- ~~Publish the about and funding page.~~ Done: `/about/` names the maintainer and states
  that the project is unfunded. The block is cleared.
- ~~Run the accessibility review before publishing.~~ Done 23 July: pa11y over all 16 pages
  at WCAG2AA in CI as a failing step, plus five defects found by hand that pa11y passed. What
  it does not establish is recorded in `docs/HANDOFF.md`, and no real screen reader has been
  run.
- Confirm the update commitment. The sources page proposes fourteen days from each release
  and marks it as needing sign-off; an unmet published target is worse than none.
- **Run the pre-publication human review.** The sources page commits to it and publication
  has already happened, behind a robots rule. This is a launch blocker, not a task.

## Phase 3: Fiscal impact

- The contested question, handled as a page about method rather than a page of figures.
- Present the range across studies, never a point estimate.
- Include the misuses in both directions from section 8.5.

## Phase 4: Local picture

**Gated on a written harm review before any work starts.** A local authority lookup is a
targeting tool however carefully it is worded.

- Add local authority lookup.
- Use raw number and per-10,000-residents figure. Denominators are mandatory, not optional.
- Add accommodation type where available.
- Add warnings about local data limitations.
- No maps.

## Phase 5: Deeper explainers

- Work routes.
- Study routes.
- Family routes.
- Settlement and citizenship.
- Returns and removals.
- International comparison, only if methodology is handled carefully.

# 15. Claims to build first

Superseded by section 8.5.3, which holds the full set with directions and selection criteria.

**Written and drafted as of 22 July 2026**, seven claims, in `content/claims/`:

1. Net migration is the number of people who entered the UK. *(restrictionist; net flow read as gross inflow)*
2. Most immigration is asylum seekers. *(restrictionist; category confusion)*
3. Immigrants pay far more in tax than they cost. *(pro-migration; contested estimate stated as fact)*
4. Everyone in asylum accommodation arrived recently. *(restrictionist; stock read as flow)*
5. 19% of the UK population was born abroad. *(restrictionist; figure with no current official basis)*
6. Almost all refused asylum seekers are eventually recognised as refugees. *(pro-migration; appeal success rate generalised to all refusals)*
7. Immigrants are a drain on the public finances. *(restrictionist; contested estimate stated as fact, the mirror of 3)*

Claims 3 and 7 name each other in `mirror_of`, and the validator refuses a mirror that is not
named back. That pairing previously lived only in the prose of both pages.

### Why the launch five became seven

The original list of five was written into this document on 22 July 2026, in the same
revision that introduced the two-thirds balance rule section 8.5.2 then carried. It failed
that rule immediately: four of the five ran in one direction, which is 80%.

This is worth recording rather than quietly correcting, for two reasons. The list was
drafted by someone who had written the balance rule hours earlier and still did not notice,
which is a fair measure of how easily this slips. And it was caught by
`scripts/validate-content.mjs` rather than by review, which is the argument for making the
rule mechanical: a constraint that depends on remembering will be forgotten by exactly the
person most confident they have applied it.

The sixth claim was added rather than one of the five dropped, because each of the five
corrects a genuinely distinct class of error and cutting one to hit a ratio would be
gaming the rule instead of satisfying it. The set then ran four to two.

**The rule itself did not survive the day.** Adding "immigrants are a drain on the public
finances", the seventh claim and the correction a pro-migration reader would most want to
see, would have breached the same two-thirds cap, because `direction` records whose claim is
corrected and that claim is a restrictionist one. The cap was removed and a representation
floor put in its place; the reasoning is in section 8.5.2 and in the script. The published
set now runs five to two, which clears the floor and would have failed the cap.

Both halves of that episode point the same way. The constraint caught what review missed,
which is the argument for making constraints mechanical. Then the constraint blocked a
correction, which is the argument for checking that a mechanical rule measures the thing you
meant. Neither lesson cancels the other.

The wider point generalises: restrictionist claims are easier to find because they circulate
more, so any set assembled by availability will drift one way. Section 8.5.2 says this should
be stated on the page rather than silently compensated for. It now is, on
`/common-claims/`, in a paragraph generated from the claim set rather than typed.

### How content cites figures

Claims and the glossary never hard-code a number that will change. They cite live figures
by token, `{{theme/metric-id}}`, which the build resolves from the data layer. A figure
updated in `data/` is therefore updated everywhere it is cited, and content citing a metric
that no longer exists fails the build rather than publishing a stale number.

**The token contract.** A token renders the formatted value and nothing else: `48,758`,
`4.9`, `39`. It does not render the unit. Units behave differently in prose, `%` attaches
with no space, `£` prefixes, `people` follows and is often better phrased, so the author
writes them and the validator confirms they did. Getting this wrong is not hypothetical:
the first draft rendered "was 4.9 billion" where it meant "£4.9 billion", twice.

Range metrics have no single value and must never be tokenised. The net fiscal impact of
immigration is stored as a range spanning zero precisely so that no template can render it
as a point; a token pointing at it would produce nothing at all, and the validator rejects
one.

**Historical illustrations stay literal**, because they are arguments about the past rather
than current values and must not auto-update. But writing a number longhand silently opts
out of the staleness protection, so a literal that equals a current metric value has to be
either a token or an explicit `historical_literals:` declaration. Three live values were
hard-coded in the first draft of this content and none of the checks then in place noticed.

**That check has two strengths, and the weaker one is deliberate.** A comma-grouped value or
one of 100 or more is distinctive enough to fail the build. Rates and money are mostly under
100, where too many unrelated metrics share a value for a match to mean anything, 21% is both
the NHS staff share and the asylum hotel share, so those are matched with their unit and
**reported as warnings rather than refused**. Ten warnings surface today and all ten were
reviewed on 22 July as coincidences. An error there would be silenced by stuffing
`historical_literals:`, which is worse than no check at all. Review them; do not suppress
them.

`scripts/validate-content.mjs` enforces the front matter, checks every token resolves and
carries its unit symbol, rejects range metrics cited as points, catches live values written
longhand, requires each cited figure to be declared so a data update can find the content it
affects, checks that glossary links resolve to real terms, pairs every mirrored claim with
the claim that names it back, enforces the representation floor, scans page bodies for the
vocabulary section 5.2 avoids and exempts it inside quotation marks, bans the em-dash in
authored copy, and refuses any claim unreviewed for more than twelve months per the
corrections policy in section 13.1.

The language scanner runs a control on itself on every build, feeding it a sentence that must
match and a quoted one that must not. A scanner that silently stopped matching would
otherwise report a clean site, which is the exact failure this project has shipped six times.

Claims link to glossary definitions at `/what-the-words-mean#term`. The link target is
checked, so a definition cannot silently go nowhere.

# 16. Minimum content templates

## 16.1 Metric card template

What the home page card actually renders, in order. This was a specification that no card
matched; it is now a record of what ships.

```
Metric name          card's own shortLabel
Value                from the record, formatted, with the unit as prose
Unit and period      the basis and the period_label, on one line
What this means      one paragraph: what it counts, what it does not show, the caveat
Source               linked to the publication
Published date       or "Publication date not recorded", never blank
Checked date         when this site last verified the figure against its source
Confidence grade     official, provisional, estimated or calculated
```

**Two deliberate departures**, recorded here so they are not silently reinstated:

- **Change from previous comparable period is dropped.** No record holds a prior value, so
  the field means sourcing and checking a second figure for every card. It is also the single
  easiest place on this site to publish an invalid comparison, because the prior figure is
  usually on a different vintage or a revised basis. The card explanations carry the direction
  of travel in prose, where the basis can be stated.
- **"What this counts", "what this does not show" and "known caveats" are one paragraph, not
  three.** Same reasoning as merging `definition` and `caveat` into `notes` in section 9.2:
  three fields produced three thin ones. The record's fuller `notes` sit behind the card in
  the data files.

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

The catalogue entry in `data/sources.json`, which is what the sources page renders:

```
id                   referenced by every figure's source_id
name                 publication title
publisher            publishing body
url                  the collection or landing page, not a release-specific slug
covers               what this site takes from it, in a sentence
updateFrequency      the publication cycle, which the staleness check ages figures against
confidence_level     this site's grade for the source
```

The catalogue is per SOURCE. Publication date, dataset or table used, geography, period
covered and last-checked date are per FIGURE and live on the record, not here, because one
source supplies figures with different periods and different table references. The one
genuinely missing field is `table_reference` on the figure, recorded in section 9.3.

The sources page renders three of these columns, name with publisher, `covers` and
`updateFrequency`. `id` and `confidence_level` are structural, and `url` is the link.

# 17. MVP acceptance criteria

Comprehension criteria:

- A user can explain the difference between immigration, emigration and net migration after reading the homepage and glossary.
- A user can see that asylum is one part of the wider migration system.

Data criteria:

- Every headline figure shows, on the card, its source, its period and basis, its publication date, the date this site last checked it, its confidence grade, and a caveat.
- `node scripts/validate-data.mjs` passes, and CI enforces it on every push.
- No figure appears in two places. The dashboard references, it does not copy.
- No published figure has `published_date: null`. The validator reports the outstanding count; it must reach zero for the published subset before launch.
- No more than four source releases are in the routine update cycle, so the update commitment is sustainable. The published figure count follows from that and is recorded, not targeted. Currently three releases and 36 figures.

Editorial criteria:

- No chart relies on colour alone or lacks a text/table equivalent.
- No page uses inflammatory or imprecise migration language as the default vocabulary.
- The style guide is published as a page, distinguishing the precision rules from the values-based ones.
- At least five common claims checked against definitions and data, and at least two correcting each direction, enforced before the build rather than checked at review. The real split is generated from the set and disclosed on the claims page.
- The claim-selection criteria are published on the claims page.
- Every claim card carries a "last reviewed" date, and the period and source sit inside the card's visual boundary. All three are required front matter, so a claim cannot ship without them.

Trust criteria, all new and all launch gates:

- The site has a sources and methodology page.
- The site has an about page naming who runs it and who funds it, including "unfunded" if that is the answer.
- The site has a published corrections policy and a public changelog.
- The site publishes its update commitment, and every page carries the date it was last reviewed so a reader can judge it against that. The site does not display its own lateness; a static build cannot know how late it is at the moment someone reads it, and the validator does the ageing instead, before publication.
- The site states what it does not cover, and why.

Process criteria:

- The project can be updated manually without code changes beyond data files and content files.
- Five target users have been spoken to, and what they said is written down.
- Success measures are chosen and recorded.

# 18. Recommendation

Build this, but keep the first version narrow. The project will be most useful if it becomes a clarity engine, not a totalising immigration dashboard. Start with definitions, core figures, the asylum system pipeline, what the system costs, and common claims. Delay local maps and the contested fiscal-impact debate until the editorial model is tested.

The first build should answer five questions well: What is net migration? How is asylum different from wider migration? What is happening in the asylum system? What does that system cost? Which common claims misuse the data, in both directions?

Three things this document did not originally say, which the 22 July 2026 review concluded matter more than anything on the build list:

1. **The claim list must correct both directions, or the neutrality claim is false.** This is the difference between a clarity project and a well-sourced partisan one, and it is decided by editorial discipline, not by data quality.
2. **Silent staleness is the most likely way this fails.** Not political capture, not legal risk. Sixty-seven figures and four series, eleven publishers, eight cadences, one person, no deadline. Publish fewer figures and commit to a cadence in public. Neither has happened: 36 records reach a reader and the commitment is still a proposal.
3. **Nobody has been asked whether they want this.** Five conversations cost a week and could save the entire build.

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

Added 23 July 2026. These publishers were cited by live figures while this list still showed
only the ten above. `data/sources.json` is the catalogue of record; this is a reading list.

11. National Audit Office. https://www.nao.org.uk/ Asylum system cost and accommodation contracts. The costs page is built on these.

12. Office for Budget Responsibility. https://obr.uk/ Fiscal impact of migration in forecasts and scenarios, including the £341,000 illustrative case.

13. Migration Advisory Committee. https://www.gov.uk/government/organisations/migration-advisory-committee Economic and fiscal evidence on work routes.

14. HM Courts & Tribunals Service / Ministry of Justice. Tribunals statistics quarterly. https://www.gov.uk/government/collections/tribunals-statistics The appeals queue, on a different publisher and cycle from the initial-decision queue.

15. Census 2021/22. https://www.ons.gov.uk/census Foreign-born population and country of birth, since the ONS survey-based series was discontinued in October 2022.

16. ONS. Population estimates. https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates Denominators for population shares.

17. Skills for Care. State of the adult social care workforce. https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/workforceintelligence/home.aspx Nationality composition of the England social care workforce. Not an official statistics producer, and marked as such on the sources page.
