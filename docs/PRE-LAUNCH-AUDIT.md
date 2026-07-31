# Pre-launch audit

**A whole-project critique, conducted on 30 July 2026 on branch `pre-launch-audit`.** It covers
code, data, content, documentation and accessibility. Its subject is the last push before launch,
so its bias is towards precision and trust rather than towards features.

**This document is a findings list, not an approval.** It follows the precedent set by the
pre-publication review of 27 July: the outcome of a review is what it found, and someone else
decides whether the site now passes. Nothing here is fixed by being written down.

**How ground truth was established.** Every number asserted below was re-derived by running the
project's own checks and reading their output, or by reading the file. Where a finding could only
be settled by re-reading a publisher, it is marked OWNER-VERIFY and is not asserted as wrong. The
commands run were `npm run validate`, `npm run build`, `npm run check-sources`, `npm run a11y`,
and direct reads of `data/`, `_site/` and the scripts.

Severity means what it costs at launch:

| Level | Meaning |
| --- | --- |
| **BLOCKER** | A reader would be misled, or a published claim about the site is false. Fix before launch. |
| **HIGH** | A defect a hostile expert reader would find, or a check that claims more than it verifies. |
| **MEDIUM** | Real, worth fixing, does not by itself justify holding the launch. |
| **LOW** | Housekeeping and polish. |
| **DECISION** | Not a defect. A call only the owner can make, surfaced so it is made deliberately. |

---

## Status

Baseline on entry, all green:

- `npm run validate`: data contract passed, 175 figures, 7 claims, 23 glossary terms, 16 pages.
  Unrecorded longhand figures 31 against a baseline of 31.
- `npm run build`: 16 pages, 273 internal links resolve, 46 of 75 records reach a reader.
- `npm run check-sources`: 43 of 48 resolve, 5 uncheckable by hand, 1 redirect.

Audit passes and their state:

| Pass | State |
| --- | --- |
| Documentation consistency | In progress |
| Checking apparatus, `scripts/` and `lib/` | In progress |
| Content and editorial precision | In progress |
| Data layer integrity | In progress |
| Accessibility, WCAG 2.2 AA | In progress |
| Build, deploy and supply chain | Complete, findings below |
| Reader-facing trust surface | Complete, findings below |

---

## Findings

### A. The README contradicts itself and the repository, in four places

The README is the first thing a citing journalist or researcher reads, and this project's own
standard is that a number kept in two files is a defect. Four of its live claims are wrong. Each
was re-derived, and none is a historical narrative about a past pull request: all four read as
present-tense statements of what the repository is.

**A1. BLOCKER. The record count is given as both 75 and 71.**

`README.md:15` says the data layer holds "**75 metric records**". `README.md:313` says
"**23 of the 71 metric records cannot be aged**". Summing the metrics arrays across the four theme
files gives 75 (migration 15, asylum 32, population 12, fiscal 16), and `npm run validate` reports
52 checked against a cadence plus 23 not covered, which is 75. The figure 71 is wrong and is the
one attached to a limitation, so it understates the site's own uncovered surface.

Fix: `README.md:313`, 71 becomes 75.

**A2. HIGH. The `table_reference` count is stale in three places.**

`README.md:136` and `README.md:324` both say "**14 records and 2 series files** carry
`table_reference`". `npm run validate` reports "17 record(s) and 2 series file(s) declare one".
`docs/foundation.md:608` says 14 as well, in a sentence that reads as current rather than as a
record of what a past change did.

This one matters more than its size. The corrections watch in `check-releases.mjs` is the only
channel that can see a correction made *inside* an edition, and its coverage is exactly the set of
declared tables. Understating that set by three understates the site's protection against the one
failure mode it names as most dangerous.

Fix: 14 becomes 17 in all three places. Better, since this count has now been stale twice: derive
it. `lib/published.mjs` is the precedent, and `validate-data.mjs` already computes the number in
order to print it.

**A3. HIGH. The source URL resolution count is wrong in both halves.**

`README.md:321` says "**44 of 49 resolve**". `npm run check-sources` reports "43 of 48 source URLs
resolve; 5 need checking by hand". Both the numerator and the denominator are wrong. The
accompanying sentence, that five cannot be checked automatically and are four Commons Library
pages plus one parliamentary research PDF, is correct and was verified against the run.

Fix: `README.md:321`, "44 of 49" becomes "43 of 48". The same argument as A2 applies: this is a
number a script already prints.

**A4. MEDIUM. The transform count is given as three, as four, and is actually five.**

`README.md:47` describes `eleventy.config.js` as "citation resolution, partials, filters, **four**
HTML transforms". `README.md:165` says "**Three** Eleventy transforms run on the built HTML and the
order is load-bearing." `eleventy.config.js` registers five: `resolve-citations` (line 162),
`published-counts` (188), `heading-anchors` (213), `table-captions` (230) and `scrollable-regions`
(269).

The paragraph at `README.md:165` then explains the ordering constraint using only three of them,
which leaves a reader who has to touch the pipeline without the two that were added most recently.
Ordering is load-bearing for `table-captions` too: its own comment says it must run before
`scrollable-regions` so that a captioned table is named by its caption rather than by the heading
above it. That constraint is real and is documented only in the code.

Fix: both README numbers become five, and the ordering paragraph gains `table-captions` and its
constraint.

---

### B. Two checks the README says gate the build do not gate the deploy

**B1. HIGH. `check-evidence` and `npm run a11y` gate CI, not Netlify.**

`netlify.toml:2` runs `command = "npm test && npm run build"`. `npm test` is
`validate-data.mjs && validate-content.mjs`, and `npm run build` is Eleventy plus
`check-build.mjs`. Neither `check-evidence.mjs` nor `npm run a11y` runs there. Both run only in
`.github/workflows/validate-data.yml`.

The README's checking table says of `check-evidence.mjs`: "**Gates the build**", and of
`npm run a11y`: "**Fails the build**". Netlify builds from the repository independently of GitHub
Actions, so unless the site is separately configured to block deploys on a failed check, a commit
that reaches `main` with a red CI run still deploys. The two strongest gates in the apparatus, the
one that says no figure moves without a fetched quote and the one that says no page ships with a
WCAG failure, are the two that do not stand between a change and a reader.

This is the project's own recurring pattern in its purest form, and it is in the document that
warns about the pattern: the check verifies something real, and the sentence describing it claims
the property a reader depends on.

Fix, smallest version: change the Netlify command to run them, or state in the README which
pipeline each check gates. Fix, better version: do both, and confirm in the Netlify UI that deploys
are blocked on a failed check run. `check-evidence.mjs` needs `origin/main` present, so a Netlify
run of it needs the same explicit fetch the workflow already documents at lines 41 to 47.

Note this is a claim about the repository, not about the Netlify account, which cannot be read from
here. If deploys are already gated in the Netlify UI, the finding reduces to a README precision fix
and the configuration should be written down, because nothing in the repository records it.

**B2. HIGH. The accessibility gate depends on three unpinned packages fetched at runtime.**

`package.json` declares exactly one dependency, `@11ty/eleventy`. The accessibility gate is:

```
"a11y": "npm run build && npx --yes start-server-and-test a11y:serve http://127.0.0.1:8081 a11y:ci",
"a11y:serve": "npx --yes http-server _site -p 8081 -s -c-1",
"a11y:ci": "npx --yes pa11y-ci"
```

`start-server-and-test`, `http-server` and `pa11y-ci` are none of them in `package.json` or
`package-lock.json`. `npx --yes` resolves and installs the latest published version on every run,
along with `pa11y-ci`'s own Puppeteer and Chromium download.

Three consequences. The gating check is not reproducible: two runs a month apart test against
different code. A breaking release upstream turns the accessibility gate red for a reason that has
nothing to do with the site, which is the fastest way to teach a maintainer to ignore it. And an
unpinned install in a gating pipeline is a supply-chain surface on a project that otherwise pins
everything and commits its lockfile.

Fix: add all three to `devDependencies` at pinned versions and drop `--yes` from the scripts. This
costs one `npm install` and changes no behaviour.

---

### C. The reader-facing trust surface has gaps that are cheap to close

The site's chosen success measure, recorded in `docs/BACKLOG.md`, is being **cited by a named
outlet or briefing within six months**. Citation means a link being shared, checked and reused, so
the surface a link presents is not cosmetic here. It is the measure.

**C1. MEDIUM. No canonical URL, and `site.url` is defined but never used.**

`content/_data/site.js:4` sets `url: 'https://ukmigrationexplorer.netlify.app'`. Grepping
`content/`, `eleventy.config.js`, `scripts/` and `lib/` finds no other reference to it. There is no
`<link rel="canonical">` on any page.

For a site that expects to be cited, a canonical URL is what makes two routes to the same page
count as one, and what a citation tool reads. It costs one line in `base.njk` and makes the
existing dead config live.

**C2. MEDIUM. No page-level social metadata.**

There are no `og:` or `twitter:` tags. `docs/foundation.md` section 8.5.4 deliberately rejects a
**share image**, and that decision is not being reopened here: it is about a graphic asserting a
figure out of context, and it is well reasoned. `og:title`, `og:description` and `og:url` are a
different thing. Without them a shared link renders as a bare URL, and the claim pages, which the
foundation expects to be screenshotted and shared, are exactly the pages that lose most.

There is a real tension to settle rather than assume. `base.njk:6` composes a claim page's title as
`Claim checked: {{ claim }}`, where `claim` holds the false proposition. Propagating that to
`og:title` puts the misinformation in the preview card with only a two-word prefix qualifying it.
That is a known hazard in misinformation design, and it argues for an `og:title` built from the
verdict rather than from the claim, not for having none.

**DECISION for the owner:** whether to add `og:title`, `og:description` and `og:url`, and if so
whether a claim page's `og:title` should lead with the claim or with the correction.

**C3. LOW. No favicon.** `_site/assets/` holds only `style.css`. Every browser request produces a
404 on `/favicon.ico`, and a tab with a blank document icon is a small credibility cost on a site
whose subject is rigour. An inline SVG favicon needs no new asset pipeline and no JavaScript.

**C4. LOW. The Open Government Licence link uses `http://`.**

`content/_includes/base.njk:57`:

```html
<a href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
```

The host serves HTTPS. This is the attribution link required by the licence the site's data is
used under, so it is the one outbound link that should be beyond reproach. One character.

**C5. DECISION. The site is served from a `netlify.app` subdomain.**

`site.url` is `https://ukmigrationexplorer.netlify.app`. Nothing about that is technically wrong.
It is raised here only because the success measure is citation by a named outlet or briefing, and a
platform subdomain reads as provisional to exactly the audience that measure targets. This is a
launch-day decision with a cost either way, and it is the owner's.

---

### D. One figure, one home, is not enforced between a record and another record's notes

**D1. HIGH. Twenty-six record values are restated inside a different record's `notes`, and nothing
checks that the two agree.**

The README states the principle plainly: "**One figure, one home.**" It has been enforced twice, at
the two boundaries where it was found broken. `dashboard.json` was emptied of values so a card
references a theme metric rather than holding a copy. `series_ref` was added so a metric held twice,
once as a headline and once as a series point, cannot drift from itself. Both are checked by
`validate-data.mjs`.

The third boundary is unguarded. Scanning every record's `notes` for the formatted value of any
other record finds 26 restatements across 15 records. A sample, and each pair is live today:

| The note belongs to | It restates | Which is owned by |
| --- | --- | --- |
| `asylum/asylum-initial-decisions-total` | 48,581, 79,719, 16,901 | three separate records |
| `asylum/asylum-administrative-outcomes` | 48,581, 128,300, 79,719, 16,901 | four separate records |
| `asylum/returns-enforced-plus-voluntary` | 9,723, 29,284, 17,623 | three separate records |
| `asylum/people-in-asylum-accommodation` | 97,519, 20,885 | two separate records |
| `population/foreign-born-share-mid-2024` | 13,115,000, 69,281,400 | two separate records |
| `migration/total-entry-clearance-visas-granted` | 252,775, 62,470 | two separate records |

All 26 agree today, necessarily: the scan matches on equal values, so it can only see agreement.
That is the point. **What it cannot see is the moment they stop agreeing**, which is the next Home
Office quarterly. When `asylum-refusals` moves, four other records go on saying 79,719 and every
check stays green.

This is not a hypothetical shape for this project. It is the shape it has already been bitten by
twice, both recorded in `docs/BACKLOG.md`: PR #58 found 627,000 "living inside the parent record's
notes", and PR #67 found the visitor-visa figure the same way and called it "the same shape PR #58
found". Both were fixed one figure at a time. The pattern was never mechanised, and 26 instances
remain.

The current mitigation is a line in `docs/UPDATING-DATA.md` saying that record `notes` are re-read
every time. That is a human procedure standing in for a check, on a project whose own record is that
procedures are what fail and checks are what hold.

Fix, and it is small because the scan above already exists as a working script: add a branch to
`validate-data.mjs` that reports every note restating another record's value, naming both records.
**Report rather than fail**, on the precedent the sub-100 warnings and the unrecorded-literal ratchet
already set, and for the same reason: several of the 26 are coincidence rather than restatement
(9,000 appears in two notes and is a round number, not a citation), and a check whose only remedy is
an exemption list teaches authors to stuff it. What it buys is that an updater moving a value is
told which notes now need re-reading, by name, instead of being asked to remember.

**D2. MEDIUM, LATENT. A Nunjucks page can ship with no review date, and the site promises otherwise.**

`scripts/validate-content.mjs:494`:

```js
const required = file.endsWith('.njk') ? ['title'] : ['id', 'title', 'last_reviewed'];
```

A `.md` page must carry `last_reviewed`. A `.njk` page must not. `checkReviewDue` at line 533 then
runs only `if (lastReviewed)`, so a Nunjucks page without one gets no due date and no twelve-month
expiry, and `base.njk:46` prints nothing where the review date would go. The page builds green.

`README.md:311` says "every page carries the date it was last reviewed". Five of the site's sixteen
pages are `.njk`, including the homepage, and all five happen to carry it, so the defect is latent
rather than live. It is listed because five of the site's most important pages depend on an author
remembering, the promise is published, and the fix is deleting the conditional: the four `.njk`
front matters already satisfy the stricter rule.

**D3. LOW. Every claim page prints its review date twice.**

`content/_includes/claim.njk:20` renders "Reviewed 27 July 2026" inside the claim card.
`content/_includes/base.njk:46` then renders "Last reviewed 27 July 2026. Figures are the latest
published at that date, not a live count." at the foot of `<main>`. Both appear on all seven claim
pages.

Each is deliberate on its own. The card version exists because foundation section 8.5.4 requires
period, source and date to sit inside the card's visual boundary, since claim cards get
screenshotted. The base version is the site-wide pattern and carries the qualifier the card version
lacks. Together they say the same date twice, and a screen reader user hears it twice.

**DECISION for the owner:** whether the card version should drop the date (losing it from a
screenshot, which 8.5.4 forbids) or the base version should be suppressed on claim pages (losing
the "not a live count" qualifier). A third option keeps both and accepts the repetition, which is
the status quo and is defensible.

---

### E. Accessibility findings from reading the built output

The dedicated accessibility pass is still running. One finding is recorded here because it was
found while checking chart prose, and it is in code that a previous accessibility round already
touched for the same reason.

**E1. MEDIUM. Every chart summary is announced twice by a screen reader.**

`lib/charts.mjs` renders the summary into the visible figcaption at line 114:

```html
<p class="chart-summary">${escape(summary)}</p>
```

and again into the SVG's description at line 119, which `aria-describedby` points at:

```html
<desc id="${escape(id)}-d">${escape(summary)} Full figures are in the table below the chart.</desc>
```

Both are in the accessibility tree. Reading the asylum page linearly, assistive technology
announces the summary sentence as a paragraph, then reaches the image and announces the same
sentence again as its description.

The header comment in `lib/charts.mjs` records fixing what looks like this and is not: pointing
`aria-labelledby` at both the title and the description "concatenated them into one name and left
the summary as the description as well, so a screen reader read the whole summary sentence twice
before reaching the chart". That fix separated name from description **inside the SVG**. The
duplication between the visible figcaption and the description survived it, because the two live in
different elements and the fix only looked at one.

Fix, smallest version that keeps the description non-empty: give the visible summary an id and point
`aria-describedby` at it, leaving `<desc>` to carry only the sentence directing a reader to the
table. That removes the duplication without removing either piece of information, and needs no
JavaScript.

Confirm against the running accessibility pass before acting, since `<desc>` support varies between
screen readers and the safe version may be to keep `<desc>` and shorten it rather than to point
outside the SVG.

---

### F. Verified as correct

Recorded because a review that lists only defects invites the reading that everything unlisted was
checked and failed, or was not checked at all.

**F1. Every chart summary describes its data correctly.** This is the site's largest published
limit, "prose about figures is unprotected", and the surface on which four false summaries were
previously found by reading. All seven summaries on the four pages that carry charts were re-derived
point by point against the series arrays and the records:

- *Net migration.* "Reached 891,000 in 2022, the highest point on this calendar-year series"
  matches the maximum of the array. "It has fallen in each of the three years since, to 171,000"
  holds at every step: 891,000 to 848,000 to 331,000 to 171,000.
- *Flows.* Immigration's maximum is 1,441,000 in 2023 and it falls in both later years. Emigration
  runs 480,000, 508,000, 593,000, 680,000 across 2021 to 2024 with no reversal, then 642,000 in
  2025, which is what "rose steadily... easing to" describes.
- *Asylum applications.* 22,644 to 45,537 is a factor of 2.01, so "roughly doubled" holds. The
  fall from 95,007 to 87,427 is 7.98%, so "fell 8%" holds. 104,764 is the maximum of the array.
- *Asylum backlog.* Both bases peak in 2022. The people basis falls 59.96% to 2025 and the cases
  basis 63.14%, which is what "60%" and "63%" state. "Among the year-end points shown" is doing
  real work in that sentence and is correctly placed.
- *Initial decisions.* 48,581 plus 79,719 is exactly 128,300, and the page states that the three
  bars are not every outcome, names the 5,931 administrative outcomes the chart omits, and gives
  the 39% against 37.9% basis difference as a worked example rather than burying it.
- *Costs.* £158 against £20 is a factor of 7.9, which "roughly eight times" states.

**F2. The internal link graph is sound.** 273 internal links and every same-page fragment resolve,
every internal link is root-relative, and no link carries an `aria-label` that could diverge from its
visible text.

**F3. The decisions arithmetic is documented against its own trap.** The notes on
`asylum-initial-decision-grant-rate` and `asylum-initial-decisions-total` both warn against
recomputing the published rate from the people basis, and `asylum-administrative-outcomes` records
two independent decompositions of 5,931 that agree. This is the standard the rest of the data layer
should be read against.

---

### G. Framing questions rather than defects

**G1. DECISION. The emigration sentence starts at the series trough.**

`migration.njk`, the flows chart summary: "Emigration rose steadily from **480,000 in 2021** to
680,000 in 2024, easing to 642,000 in 2025." Every number is right, verified above.

2021 is the lowest emigration point in the fourteen-year series. The two preceding points are
605,000 in 2019 and 569,000 in 2020, so emigration fell for two years and then rose, and the
sentence begins at the bottom of that fall. Starting there makes the rise the largest it can be
made to look while remaining true.

This is raised because of what the site is. `lib/charts.mjs` enforces that "the y-axis always starts
at zero. A truncated axis exaggerates change, and this site exists to correct exactly that kind of
misuse." Choosing a trough as the narrative baseline is the same manoeuvre on the time axis, and the
site enforces the rule in its charts while its prose is not held to it.

There is a fair defence: the sentence pairs emigration with immigration, whose story genuinely
starts in 2021, and the chart beside it shows all fourteen years, so nothing is hidden from a reader
who looks. That defence is real, which is why this is a question and not a finding.

**DECISION for the owner:** whether to name the 2019 peak in the sentence, or to let the chart carry
it.

---

### H. Housekeeping

**H1. LOW. `.history/` is untracked and not ignored.** It is the VS Code Local History directory,
36K today, holding copies of earlier file versions. It shows in `git status` on a clean tree, which
trains a maintainer to ignore a dirty status, and an accidental `git add -A` would commit working
drafts of content pages. **Fixed in this branch:** added to `.gitignore`.

---

## What this audit does not establish

Stated in the project's own idiom, because a review that does not say what it did not check invites
the reading that it checked everything.

- **It has not re-read a single publisher.** Every data finding is an internal-consistency finding
  against the repository. Anything needing the original bulletin, dataset or table re-opened is
  marked OWNER-VERIFY and is a question rather than a defect.
- **It has not tested the site with a real screen reader**, which the site already publishes as a
  limit. It does not close that gap.
- **It has not been read by a target user.** The unmet acceptance criterion in `docs/BACKLOG.md`,
  that five target users have been spoken to, is untouched by anything here, and no amount of
  internal review substitutes for it.
- **It cannot see the Netlify account.** Finding B1 is about what the repository configures. Whether
  deploys are additionally gated in the Netlify UI is not readable from here.
- **It is one audit.** The site's own record is that eight green checks shipped real defects, and
  that several defects were found only by a second model reading the same code. This document
  should be treated the same way.
