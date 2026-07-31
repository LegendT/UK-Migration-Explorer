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

All seven passes are complete. Each ran independently, and every finding below was re-verified
against the repository before being written down; three claims that did not survive that check were
dropped, and one was downgraded.

| Pass | State | Findings |
| --- | --- | --- |
| Content and editorial precision | Complete | 2 blockers, 1 high, 2 medium, 3 low |
| Data layer integrity | Complete | 2 high, 3 medium, 3 low, no wrong published value |
| Documentation consistency | Complete | 3 high, 2 medium groups, plus the README's four |
| Checking apparatus, `scripts/` and `lib/` | Complete | 1 high, 4 medium, 2 low |
| Accessibility, WCAG 2.2 AA | Complete | 1 high (Level A), 1 medium, 2 low; pa11y 16/16 clean |
| Build, deploy and supply chain | Complete | 2 high, 1 medium |
| Reader-facing trust surface | Complete | 1 high, 4 medium, 3 low, 2 decisions |

### What has been applied in this branch, and what has not

**Applied: the mechanical corrections only.** A mechanical correction here means a claim with one
verifiable right answer, where applying it requires no editorial judgement. Nothing that needed a
decision, a wording choice, a publisher re-read, or a change to code or infrastructure was touched.

The built site is **byte-identical** before and after, proved by diffing `_site/`. Nothing below
changed what a reader sees.

| Applied | Where |
| --- | --- |
| Record count 71 to 75; `table_reference` 14 to 17 in two places; source URLs 44 of 49 to 43 of 48; transforms three and four to five, with the two ordering constraints stated | `README.md` |
| Catalogue twelve/eleven to thirteen/twelve; `table_reference` 14 to 17; 67 metrics to 75; three transforms to five; the routine-cycle counts and the published-figure count replaced by a pointer to the run that derives them; the warnings count and its stored all-clear replaced by the same; the risk register's "the commitment is still a proposal" corrected to signed | `docs/foundation.md` |
| Four `series_ref` metrics to five, and "all `ons-ltim`" removed, with the Home Office one named; the applications series no longer described as unprotected; nine `ons-ltim` metrics to ten | `docs/UPDATING-DATA.md`, `docs/prompts/update-from-release.md` |
| The banner justification, which described a sentence PR #54 had already corrected | `docs/PRE-PUBLICATION-REVIEW.md` |
| "Three of the four known gaps", which disagreed with both the backlog and the page | `docs/HANDOFF.md` |
| Header PR range #54 to #66, corrected to #68 | `docs/BACKLOG.md` |
| Visa and citizenship envelope notes, year ending December 2025 to March 2026 | `migration.json`, `population.json` |
| `asylum-administrative-outcomes` regraded `official` to `calculated`, with its notes opening the way its identical sibling's do | `asylum.json` |
| All four theme files' `lastUpdated`, each set to its own newest `retrieved_date` | the four theme files |
| The contract description, which omitted `id` and `source_id` | `meta.json` |
| `.history/` ignored | `.gitignore` |

**Not applied, and why.** Both blockers and every other content change need wording that is yours,
per the project's own tagging of that class. `K1` needs HC 874 re-read. `F0-3` turned out not to be
mechanical at all and this document now says so. Everything in sections B, C, D1, E and I is a code,
infrastructure or design change rather than a correction, including the `.gitignore`-adjacent ones,
and none was made.

**One thing worth knowing about how this was applied.** The script that rewrote the data files
round-tripped them through `JSON.parse` and `JSON.stringify`, which silently turned
`"value": 3.0` into `"value": 3` in `fiscal.json` and reformatted an array in `meta.json`. Neither
changed a rendered figure and both were caught by reading the diff rather than by any check, then
reverted. It is recorded here because it is this project's own lesson arriving from the other
direction: a tool that reformats what it touches will make changes nobody asked for, and reading the
diff is what catches them.

### The eight things to fix before launch

Everything else in this document can follow the launch. These cannot, in this order:

1. **The two glossary blockers, 0A and 0B.** Both are the site publishing statistical reasoning its
   own data files forbid, on the page its claim pages cite as the authority.
2. **Review the six pages the pre-publication review never opened**, finding 0. Both blockers are on
   one of them, and the decision to record the review as passed currently rests on ten pages of
   sixteen.
3. **The 76% period contradiction**, K1, which needs HC 874 re-read.
4. **The `series_ref` count in the runbook and the prompt**, J1, which will mislead the next Home
   Office update.
5. **The flows chart's methodology break**, E4, which is a Level A accessibility failure and a
   statistical caution the site's own purpose depends on.
6. **The success message that overclaims**, I1, because it is the ninth instance of the pattern the
   README warns about and it is in the check the README points at.
7. **The two confidence and edition errors in the data**, F0-1 and F0-2, both minutes of work.
8. **The four stale README counts and the three stale foundation ones**, A1 to A4 and J3 to J4, since
   the README is what a citing journalist reads first.

---

## Findings

### 0. The systemic finding: the review covered ten pages of sixteen, and both blockers are on one it never opened

**Read this before the two blockers below, because it is the reason they exist and it bears directly
on the launch decision that is still outstanding.**

`docs/BACKLOG.md:31` records what the pre-publication review of 27 July actually read.
`verification.txt` has fourteen headings, mapping to `asylum.njk`, `costs.njk`, `migration.njk` and
the seven claim pages. **Those ten** carry `last_reviewed: 2026-07-27`. The other six were
deliberately left on older dates "because the review never opened them", which was the right call and
is honestly disclosed on every page.

The six the review never opened are `index.njk`, `common-claims.njk`, **`glossary.md`**,
`sources-and-method.md`, `about.md` and `style-guide.md`.

**Both blockers this audit found are in `glossary.md`.** Two independent passes reached it
separately. That is not a coincidence about the glossary; it is what an unreviewed page looks like
when someone finally reads it.

The consequence for the decision in `docs/BACKLOG.md` item 1, step 3, recording the review as passed,
is direct. That step is currently framed as a judgement about whether the corrections were
sufficient. It is also, unavoidably, a judgement about six pages nobody assessed. The glossary is not
a minor one of the six: it is linked from the claim pages as the authority for the terms they turn
on, and it is where a reader is sent when a definition is the thing in dispute.

**Recommendation.** Before recording the review as passed, put the six unreviewed pages through the
same evidence template in `docs/PRE-PUBLICATION-REVIEW.md` that the ten went through. The glossary
first. This audit is not a substitute for that: it read the six looking for defects and found two
serious ones, which establishes that they are worth reviewing, not that they are now reviewed.

---

### 0A. BLOCKER. The glossary does the one thing its own record tells it not to do

`content/glossary.md:225`, under **Grant rate**, in the site's own voice:

> **Why it matters.** The published rate is calculated on main applicants and excludes withdrawals.
> **The rate measured at final outcome, after appeals, has historically run 17 to 29 percentage
> points higher, so the initial rate understates eventual protection rates.**

The record it cites two lines above, `asylum/asylum-initial-decision-grant-rate`, says this:

> **Do not add a cohort uplift to this rate.** Home Office cohort table Asy_04 shows the latest
> recorded grant rate running 17 to 29 percentage points above the initial rate for claims made
> between 2010 and 2020, but **its note 48 says that table's initial rate "will not match the grant
> rate in the initial decisions dataset as they relate to a different cohort of initial decisions"**.
> The uplift **also covers reconsiderations and reinstated claims, not appeals alone**, and the Home
> Office calls the later figure **the latest recorded outcome rather than the final one**.

The glossary sentence contradicts its own record four times over:

1. **It performs the addition the record forbids.** "So the initial rate understates eventual
   protection rates" applies a 2010 to 2020 cohort uplift to the current rate. The record's
   instruction is three words long and unambiguous.
2. **It calls the later figure "final outcome".** The Home Office calls it the latest recorded
   outcome and does not claim finality. So does this site, on another page.
3. **It attributes the uplift to appeals.** The record says the uplift covers reconsiderations and
   reinstated claims too.
4. **It treats two cohorts as comparable** when the publisher's own note 48 states they are not.

The next paragraph makes it worse rather than hedging it: "**The common mistake.** Recomputing it
from people-based figures, which gives a different answer, or **quoting the initial rate as though it
were the final one**." That sentence tells a reader a final rate exists to be quoted.

**The site refutes itself one click away.**
`content/claims/refused-asylum-seekers-are-eventually-recognised.md:54` gets it right: "each cohort
that had ended in a grant **by its latest recorded outcome**". A hostile reader does not need
external evidence to attack the glossary; the correct version is on this site, in the data file the
glossary cites and on the claim page about this exact question.

**Why this is a blocker and not a wording fix.** The error runs in one political direction: it
inflates the implied eventual grant rate. On a site whose stated position is neutrality on policy and
non-neutrality on statistical misuse in either direction, an unforced error that leans is the most
expensive kind. And the mechanism that should have caught it did not exist: nothing checks that a
sentence describing a record agrees with that record's notes, which is the site's own largest
published limit.

**Fix.** Rebuild both paragraphs on the record's language and the claim page's. The record's notes
contain everything needed: cohort, period, latest recorded outcome, what the uplift covers, and why
it cannot be added. **The wording is the owner's**, per the project's own tagging of this class.

---

### 0B. BLOCKER. The glossary still publishes the reasoning the review ruled statistically invalid

Found independently by two passes of this audit. **Distinct from 0A** and in the same file.

`content/glossary.md:363`, under **Net fiscal impact**, in the site's own voice, present tense:

> **Why it matters.** There is no agreed figure. Across studies the estimate falls within roughly
> plus or minus 1% of GDP, **a range that spans zero**. The answer depends on method, on assumptions
> about who leaves and when, and on which collective spending is attributed to migrants.

The pre-publication review's correction 1b, recorded as DONE in `docs/BACKLOG.md:77`, says exactly
this reasoning is invalid:

> The plus or minus 1% of GDP figure is **the magnitude of separate pre-Brexit studies, not an
> uncertainty interval around one estimate**, so "that range spans zero" must be deleted from both
> pages.

The record itself agrees, in capitals. `fiscal/net-fiscal-impact-of-immigration-as-a-share-of-gdp`
carries `value: null`, `range_min: -1`, `range_max: 1`, and these notes:

> **A RANGE, NOT A POINT ESTIMATE.** Across separate pre-Brexit static studies of the migrant
> population, the net fiscal impact is small in magnitude, under 1% of GDP, positive in some studies
> and negative in others. **These are different studies of different periods, groups and methods, not
> one estimate with an uncertainty band**, so there is no single correct figure.

The correction was applied to the two pages the review named. It was not applied to the glossary,
because nobody grepped for the third site.

**Four things make this a blocker rather than a tidy-up.**

1. **It is the exact misuse the site exists to correct.** Treating the spread of separate studies'
   findings as though it were an uncertainty interval around one estimate, and then reading "spans
   zero" off it, is a textbook statistical error. It is the kind of error this site's seven claim
   pages exist to take apart.

2. **The two corrected pages link straight to it.**
   `content/claims/immigrants-are-a-drain-on-public-finances.md:34` and
   `content/claims/immigrants-pay-far-more-than-they-cost.md:84` both link
   `[net fiscal impact](/what-the-words-mean#fiscal-impact)`, which is this entry's anchor.

3. **Those two pages carry a published correction notice about this precise sentence.** Both say:
   "This page's explanation was rebuilt on 27 July 2026. It **previously** framed the evidence as a
   single range that spans zero. It now describes the separate, small-magnitude studies more
   precisely." A reader who takes the site at its word, follows the link, and finds the site still
   doing the thing it says it stopped doing, has been given a reason to distrust the correction
   notices as well as the figure. That is worse than never having corrected it.

4. **The rest of the entry is built on the same broken model.** Its next paragraph reads "**The
   common mistake.** Quoting one end of the range as the answer", which instructs the reader to
   treat it as a range. Deleting four words does not fix the entry; the paragraph needs rebuilding
   the way the two claim pages already were.

**This is the third time this project has shipped a correction that missed its siblings**, and it
already knows the lesson. `docs/BACKLOG.md:518` records it verbatim after the pre-launch banner was
corrected on every page and the identical sentence survived in `content/robots.txt`: "**grep the
claim, not the page**." Correction 1h found the same shape: "the invalid comparison is deleted, and
**it existed in three places, not the one the review names**." Correction 1b is now the third
instance, and it is still open.

**Fix.** Rebuild the "Why it matters" and "The common mistake" paragraphs of the `#fiscal-impact`
glossary entry on the framing the record's notes already carry and the two claim pages already use:
separate studies of different periods, groups and methods, small in magnitude, positive in some and
negative in others, with no single correct figure. **The wording is the owner's**, not a session's:
the project's own tagging history marks this class of rewrite [you] every time, in corrections 1b,
1f and 1h.

**Then grep, do not read.** Before closing this, search `content/` and `data/` for every other site
of the "range" framing, not only the phrase "spans zero". This finding was reached by grepping a
phrase the review said to delete and checking all three hits; the two false positives were
correction notices legitimately describing the past, and only reading each one distinguished them.

---

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

**C3a. HIGH. The only way to report an error is a GitHub account.**

`content/_includes/base.njk:59` is the site's entire corrections intake:

```html
<p><strong>Found an error?</strong> Tell us which figure and what you think it should be:
  <a href="https://github.com/LegendT/UK-Migration-Explorer/issues/new">report it here</a>.
```

There is no email address, no contact form and no `mailto:` anywhere in `content/`. Grepping
`about.md`, `sources-and-method.md` and `base.njk` returns nothing.

The site publishes a corrections policy, discloses revisions on the claim pages they change, and
tells readers every figure change is recorded in a public changelog. That whole apparatus depends on
someone telling it when a figure is wrong, and the only door is a GitHub account and a working
knowledge of issue trackers.

The audience makes this worse rather than better. `docs/BACKLOG.md` records the chosen success
measure and its reasoning: the audience statement names "**professionals who need a citation
quickly**", and the measure is being cited by a named outlet or briefing. A journalist on deadline, a
Commons Library researcher, a teacher or a member of the public who spots an error will not open a
GitHub issue. The people most able to catch a subtle statistical error are close to the least likely
to use that channel.

This is not a defect in anything built. It is a gap in the trust loop the site publishes, and it is
the cheapest one on this list to close.

Fix: add one contact address to the footer and to `/about/`, beside the GitHub link rather than
instead of it. A role address rather than a personal one, if the ownership disclosure on `/about/`
makes that appropriate. If the decision is deliberately to accept a GitHub-only channel, that
belongs on `/sources-and-method/` next to the corrections policy, where a reader can see what the
policy costs them.

**C3. LOW. No favicon.** `_site/assets/` holds only `style.css`. Every browser request produces a
404 on `/favicon.ico`, and a tab with a blank document icon is a small credibility cost on a site
whose subject is rigour. An inline SVG favicon needs no new asset pipeline and no JavaScript.

**C4. LOW. The Open Government Licence link uses `http://`, in both places it appears.**

`content/_includes/base.njk:57`, which every page renders:

```html
<a href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
```

and `LICENCE:41`:

```
    http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
```

The host serves HTTPS. This is the attribution link required by the licence the site's data is used
under, so it is the one outbound link that should be beyond reproach. Two characters, in two files.

Recorded as a pair deliberately. The project's own lesson from `docs/BACKLOG.md` item 7 is "grep the
claim, not the page", after the pre-launch banner was corrected on every page and the identical
sentence survived in `content/robots.txt`. Fixing only the one a reader sees would repeat that.

**C5. MEDIUM. The site's own editorial writing is not covered by either licence clause.**

`LICENCE:7` scopes the MIT clause to "**scripts/, any site source added later, README.md, and the
original editorial writing in docs/**". `LICENCE:34` scopes the OGL clause to "**the figures in
data/**".

Between them they do not name `content/`, which is every word of the sixteen pages a reader
actually reads, nor `lib/`, `eleventy.config.js`, `.github/`, `CHANGELOG.md`, nor the prose fields
inside `data/` that render to a page. That last one matters on its own terms: the card paragraphs in
`dashboard.json` and the caveats in `meta.json` are this project's writing, not Crown copyright
material, and clause 2 covers `data/` as "the figures".

"Any site source added later" can be stretched to cover `content/` and `lib/`, but a reuser should
not have to guess, and a citing outlet's legal desk will not. For a project whose success measure is
being cited, and which asks reusers to keep its source metadata attached, the licensing of its own
prose should be the clearest thing in the file.

Fix: enumerate the directories, or invert the scope so clause 1 reads "everything in this repository
except the figures in `data/`, which are covered by clause 2 below".

**C6. LOW. `LICENCE` carries two em-dashes and the house-style check cannot see it.**

`validate-content.mjs:303` sets `STYLE_DIRS = ['content', 'docs', 'scripts', 'lib', 'data',
'.github']` and `STYLE_FILES = ['README.md', 'CHANGELOG.md', 'eleventy.config.js', 'netlify.toml']`.
`LICENCE` is in neither, so its two em-dashes at lines 4 and 31 pass a check whose stated subject is
"authored copy".

`verification.txt` also has 22, and that one is deliberate and documented: `docs/BACKLOG.md:20` says
it is kept at the repository root precisely because the style scan would reject it. `LICENCE` has no
such exemption recorded, so it is an unnoticed gap in the check's scope rather than a decision.

Fix: add `LICENCE` to `STYLE_FILES` and replace the two em-dashes, or record it as exempt beside
`verification.txt` so the gap is a decision.

**C7. MEDIUM. "Launch" is discoverability, not publication, and the docs read as though it were both.**

`README.md:21` says "The site is **deployed** behind a `robots.txt` that disallows all crawlers", and
`docs/BACKLOG.md:149` frames removing that file as "**That is launch.**"

Both are accurate about what `robots.txt` does and neither says what it does not do. `Disallow: /` is
a request to well-behaved crawlers. It is not access control, it does not make a URL private, and it
does not stop a URL that someone shares from being opened, quoted or archived. The site is
published today. What has not happened is indexing.

The consequence is small in practice, and the reason it is small is a deliberate decision already
taken: every page carries the pre-launch banner, so a reader who arrives early is told what they are
reading. That is the mitigation working. The finding is that the documents describe a gate that does
not exist, on a project whose standard is that a claim must not be stronger than the mechanism
behind it.

Fix: one sentence in the README saying the site is reachable now and that the robots rule governs
indexing rather than access. `content/robots.txt` already gets this right in its own comment.

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

`npm run a11y` reports **16 of 16 URLs clean at WCAG2AA**, which is where this pass started rather
than where it finished. Everything below was found by hand against the built HTML, the stylesheet and
`lib/charts.mjs`.

The structural work is genuinely sound and was verified rather than assumed: all 21 colour pairs
computed in both themes clear their thresholds, with the worst text pair at 6.77:1 and the worst
non-text at 3.16:1; the focus indicator reaches every interactive element including the 24 scrolling
regions, at 6.77:1 worst case; exactly one h1 per page with no skipped levels anywhere; all 24 scroll
regions carry `tabindex`, `role` and a real accessible name, and the one name containing entities is
correctly single-escaped; reflow at 320px scrolls only inside the permitted table and chart
exceptions; and there is no animation to respect a motion preference against. The four findings
below are what a hand pass adds to that.

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

Test this one in a real screen reader before acting, since `<desc>` support varies and the safe
version may be to keep `<desc>` and shorten it rather than to point outside the SVG. It is the one
finding in this document that the site's own published limit, that no real screen reader has been
run, bears on directly.

---

**E2. HIGH. Printed and saved as PDF, the site breaks its own first editorial rule.**

There is no `@media print` block anywhere in `content/assets/style.css`. Grep returns zero. The
consequences are not cosmetic, because of two structural choices that are right on screen and wrong
on paper.

**Every chart's figures disappear.** `lib/charts.mjs:129` puts each chart's data table inside a
disclosure control:

```html
<details class="chart-data">
  <summary>Show the figures behind this chart<span class="visually-hidden">: ${escape(title)}</span></summary>
```

Seven charts across three pages, none carrying `open`. A `<details>` that is closed is closed when
printed, so a printed migration or asylum page carries the SVG and none of the numbers behind it. On
a monochrome printer, where the series are told apart by stroke pattern and by a label at the end of
each line, the chart alone is close to unreadable and the table that exists to fix that is not there.

**Every source link loses its destination.** Printed HTML renders link text without its URL unless
CSS puts it back. Each chart ends with `<p class="chart-source">Source: <a href="...">NAME</a>`, and
the claim pages, the glossary and the sources page are dense with them. On paper the reader gets the
publisher's name and no way to reach the publication.

Read against the site's own rules in `README.md`, this is not a polish item. The first editorial rule
listed is "**No number is shown without its definition, period and source visible without
hovering**". Print is a medium where that rule currently fails twice over, and it is a medium this
audience uses: the stated audience is professionals who need a citation quickly, and the foundation
already anticipates claim cards being screenshotted and shared out of context.

Fix, entirely in CSS, no JavaScript, roughly a dozen lines: open the chart tables for print, print
the URL after each external link, and drop the navigation, the skip link and the pre-launch banner.
Verify it in a real print preview rather than by reading the CSS, because the rule that reveals a
closed `<details>` is one browsers implement differently, and because whether a chart table should
print at all is a layout judgement rather than a correctness one.

A secondary consequence worth knowing but not worth acting on separately: in-page search behaviour
for text inside a closed `<details>` varies between browsers, so a researcher searching a page for a
figure that lives only in a chart table may or may not find it depending on what they are using.

**E3. LOW. There is no 404 page.**

`_site/` contains no `404.html`, so Netlify serves its own default. A site that expects to be linked
into from articles and briefings will accumulate broken inbound links as URLs change, and the page
those readers land on should send them to the homepage and the sources page rather than to a
platform's generic message. One markdown file with `permalink: /404.html`.

---

**E4. HIGH. A methodology break is drawn on a chart and stated nowhere a screen reader or a table
reader can find it.** WCAG 2.2 criterion 1.1.1, Level A.

`content/migration.njk` sets `breakAfter: 2020` on both of its line charts, at lines 56 and 78.
`lib/charts.mjs:100` draws it:

```js
const breakLine = breakAfter ? `
    <line class="break" .../>
    <text class="break-label" ...>methodology change</text>` : '';
```

The SVG carries `role="img"`, so its child `<text>` elements are presentational: assistive
technology gets the `<title>` and the `<desc>` and nothing else from inside the image.

The **net migration** chart is fine, because its note says so in prose: "ONS advises that estimates
before and after June 2021 should be compared with caution, because the methods used to produce them
differ. The break is marked on the chart."

The **flows** chart draws the identical break and says nothing. Stripping the SVG from that figure in
the built page and searching the remainder for "method" or "break" returns nothing: not in the
summary, not in the description, not in the data table, not in the chart note, which talks only about
the 2023 to 2024 fall. A reader using the data table, or listening to the page, compares the 2020 and
2022 immigration figures with no indication that they were produced by different methods.

The site's stated purpose is preventing exactly that comparison. `README.md` lists among the rules
constraining the build: "Flows and stocks are never mixed without saying so", and the whole
single-vintage rule exists because "Mixing vintages is what made the first net migration series
unpublishable".

Fix, and take the mechanical version rather than the note: make `lib/charts.mjs` self-insuring, so
that setting `breakAfter` appends the caution to the `<desc>` and to the data table automatically.
The defect here is one of two authors remembering, on a project whose whole method is replacing
memory with mechanism. A note added to `migration.njk` fixes this chart and leaves the next one
depending on the same memory.

**E5. MEDIUM. Chart axis text renders at about 8.8px on a phone.**

`content/assets/style.css:409` sets `.chart-svg { width: 100%; min-width: 32rem; }` against the
`viewBox="0 0 760 340"` in `lib/charts.mjs:33`. At the 32rem (512px) floor the SVG scales by
512/760, so the 13px axis labels at `style.css:413` render at about 8.8px and the 11px break label at
`style.css:429` at about 7.4px. That is the size on every viewport below roughly 700px, not only at
320px.

Not a WCAG failure: zoom works, contrast is 8.73:1 and the data table carries the values. It is
listed because the 7.4px label is currently the only notice of the methodology break a sighted phone
reader gets, which compounds E4. Fix: raise the font sizes in viewBox units so the scaled result
clears about 11px.

**E6. LOW. Two accessibility items that are consistency rather than compliance.** Column headers in
the four markdown tables ship as bare `<th>` without `scope="col"`, where every hand-written and
generated table on the site carries it; these are single-header-row tables, so association is
inferred reliably and this is not a 1.3.1 failure. And the home page's claim cards are `<h2>` under
the `<h2>` that introduces them, so they read as siblings of their own section heading while the
metric cards in the same page sit correctly at `<h3>`. No level is skipped, so again not a failure.
The first has a one-substitution fix inside the existing `table-captions` transform, which would
cover every future markdown table.

---

### F0. The data layer: what a full internal-consistency pass found

Every published figure was re-derived where the data holds enough to do so. **No published value was
found to be internally wrong**, which is the most important sentence in this section. What follows is
metadata, grading and staleness.

**F0-1. HIGH. Two theme files' envelope notes name the wrong edition, and contradict the caveat a
reader is shown.**

`data/migration.json`'s envelope note says "Visa-grant figures come from Home Office Immigration
system statistics **(year ending December 2025)**". All six visa records in that file are
`"period_label": "year ending March 2026"`.

`data/population.json`'s envelope note says "Citizenship and settlement figures come from Home Office
Immigration system statistics **(year ending December 2025)**". All three of those records are
`"year ending March 2026"`.

Both contradict `data/meta.json` keyCaveats[1], which does render to a reader and is right: "Asylum,
returns, visas, citizenship and settlement are all now on **year ending March 2026**."

The envelope notes were left behind when the records moved editions. They reach no reader, since no
template renders theme-file prose, so this is not a live reader-facing defect. It is a trap for the
next person doing an update, which is precisely who reads those notes, and `docs/UPDATING-DATA.md`
tells them to. Fix: two edits, December 2025 becomes March 2026.

**F0-2. HIGH. A figure this project summed itself is graded as taken from an official release.**

`asylum/asylum-administrative-outcomes` carries `"value": 5931` and
`"confidence_level": "official"`, with notes reading "Summed from the Asy_D02 pivot over 2025 Q2 to
2026 Q1: 3,858 + 855 + 844 + 374."

`data/meta.json` defines the four levels, and they are published to readers under
*Confidence levels*:

- `official`: "Taken directly from an official published release."
- `calculated`: "Derived by this project from other figures."

The record's own notes describe a `calculated` figure and the grade says `official`. The structurally
identical record two entries away, `detected-unauthorised-arrivals-year-ending-march-2026`, sums four
quarters from a Home Office pivot for the same reason and is correctly graded `calculated`, its notes
opening "CALCULATED, not published". Two identical operations, two different grades.

This one is reader-facing: 5,931 appears on the asylum page in the sentence explaining that the three
bars are not every outcome, and the confidence taxonomy is part of what the site asks readers to
trust. Fix: `official` becomes `calculated`, unless the Asy_D02 pivot itself prints a
year-ending-March total, in which case the notes should say so instead. **OWNER-VERIFY** which.

**F0-3. MEDIUM. The `series_ref` guard checks the value and lets everything else drift.**

`migration/net-migration-2` holds `"value": 331000`, `"confidence_level": "provisional"`,
`"series_ref": "netMigration@2024"`. The point it names in `data/netMigrationTimeseries.json` holds
`"value": 331000`, `"confidence_level": "official"`, `"ons_marker": "revised"`.

The same measure, the same value, two confidence levels. `validate-data.mjs` compares only `value`
across a `series_ref` pair, so the drift is invisible to the mechanism built to stop exactly this
kind of drift. **That half of the finding stands and is the part worth acting on.**

**A correction to this audit's own first recommendation, which was too quick.** It said the metric
was simply wrong and should be set to `official`, on the reasoning that ONS marks 2024 revised
rather than provisional. Checking the other three ONS metrics before acting showed why that was
wrong. All four, `net-migration`, `net-migration-2`, `total-long-term-immigration` and
`total-long-term-emigration`, are graded `provisional`, and `data/meta.json`'s own definition of
`provisional` names ONS net migration as its example. The series grades per ONS marker instead:
2023 and 2024 `official`, 2025 `provisional`.

So this is not a typo on one record. It is **two internally consistent conventions that nobody has
reconciled**: the metrics grade the source, the series grades the vintage. Changing the one record
would make it the only ONS metric out of step with its three siblings, and would be a decision about
which convention wins dressed up as a correction. **Left unapplied deliberately, and it is
[you].**

Fix, once the convention is chosen: settle which side is authoritative, align the other, and then
extend the `series_ref` comparison beyond `value`. That last part is worth doing regardless of the
decision, because this is a live instance of a documented pattern: a check keyed on the one field
that happens to agree is permanently satisfied.

**F0-4. MEDIUM. Every theme file's `lastUpdated` predates its own newest record.**

| File | `lastUpdated` | Newest `retrieved_date` |
| --- | --- | --- |
| `migration.json` | 2026-06-17 | 2026-07-30 |
| `asylum.json` | 2026-06-17 | 2026-07-30 |
| `fiscal.json` | 2026-06-17 | 2026-07-27 |
| `population.json` | 2026-07-27 | 2026-07-28 |

All four. The series files' `lastUpdated` is load-bearing and checked; the theme files' equivalent is
checked by nothing and is stale everywhere. Fix: set each to its file's maximum `retrieved_date`, and
have `validate-data.mjs` derive or check it, since a field nothing reads is the shape this project
keeps finding.

**F0-5. MEDIUM. A record whose own notes say "Do not publish without re-checking" is 44 days stale.**

`asylum/small-boat-arrivals-2026-year-to-date`: `"value": 9000`,
`"retrieved_date": "2026-06-17"`, `"period_label": "1 January to 31 May 2026 (provisional)"`, notes
ending "from a daily-updated operational page, so it decays weekly. **Do not publish without
re-checking.**"

**It is not published.** Grepping `content/`, `dashboard.json` and `meta.json` for its id returns
nothing, so it sits in the 29 records of unpublished reserve and no reader sees it. That is why this
is MEDIUM rather than a blocker, and it is a correction to the way the finding first presented
itself.

The risk is a loaded one rather than a live one: a record that decays weekly, sitting in reserve with
a warning label, one citation away from a page. The validator cannot age it, because it is scored
against a quarterly cadence and 44 days is inside that. Fix: re-read it before launch and update all
four fields, or drop it. Leaving it is the option that needs the argument.

**F0-6. LOW. Three smaller data findings, each verified.**

- `fiscal/net-fiscal-impact-of-immigration-as-a-share-of-gdp` sets `"date": "2026-06-23"`, identical
  to its `published_date`, on a `period_label` of "Pre-Brexit studies". The contract says `date` is
  the end of the period covered and never the publication date. **OWNER-VERIFY** what the end of the
  covered period actually is. Two other fiscal records anchor `date` to a publication date the same
  way and are more defensible, being a projection and a review, but they are the same choice made
  without a note.
- `migration/work-related-immigration` holds 146,000 with notes "Main applicants 71,000; dependants
  74,000", which sum to 145,000. Almost certainly ONS independent rounding, the pattern
  `meta.json` caveat 8 documents for the gross flows, and the sibling study record sums exactly. One
  clause in the notes would settle it. **OWNER-VERIFY** the "down 47% from 272,000" in the same
  notes, which is reachable only from unrounded figures.
- `data/meta.json`'s own contract description lists twelve fields and omits `id` and `source_id`,
  both of which `validate-data.mjs` enforces. Two words.

**F0-7. Verified clean, and worth stating.** Every internal sum and recomputed percentage in the data
layer reconciles, including the four-quarter small-boats total against both a pivot and a row-level
sheet, both decompositions of the 5,931 administrative outcomes, the three nationality groups against
the 813,000 total, and seventeen separate percentage-change claims. Every `data/evidence/` entry's
quoted value matches the record it evidences. `retrieved_date` is on or after `published_date` on
every record. All four series run gap-free, single-vintage, with the June 2021 basis break documented
rather than silent. The deliberate non-reconciliations, Afghan schemes, the 37.9% against 39% grant
rate, the rounding in the gross flows, are each explained in their own notes, which is why they are
not findings.

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

**F3a. The build output is lean and matches its own security posture.** The heaviest page is 28KB,
there is no client-side JavaScript, and there is not a single inline `style` attribute anywhere in
the built HTML, so the `style-src 'self'` content security policy in `netlify.toml` holds without an
exception. A dark theme exists via `prefers-color-scheme`; its contrast is the running accessibility
pass's subject, not this one's.

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

### I. The checking apparatus: one message claims more than its code verifies

**I1. HIGH. The ninth instance. `validate-content.mjs` prints that no page writes a live value
longhand, and four are on a published page.**

`scripts/validate-content.mjs:797`:

```js
for (const literal of new Set(candidates)) {
    if (allowed.has(literal)) continue;
    const match = liveValues.get(literal);
```

The `historical_literals` exemption is tested **before** the live-value lookup. So what the code
verifies is "no page writes an **undeclared** longhand value the data layer holds". The success
message at line 943 drops the qualifier:

> No page writes longhand a comma-grouped value, or a bare value of 100 or more, **that a record or
> one of the 100 series points holds**.

Today that is false, and not marginally. `data/meta.json` declares
`historical_literals: ["1,012,000", "680,000", "332,000", "331,000"]`, and **all four are values the
data layer currently holds**: 1,012,000 and 680,000 are the 2024 immigration and emigration points,
331,000 is both `migration/net-migration-2` and the 2024 net migration point, and 332,000 is the 2015
point. `keyCaveats[8]` writes all four longhand, and it renders on `/sources-and-method/`.

**The exemption is not the defect.** `historical_literals_reason` argues it well: the caveat is a
frozen worked reconciliation, and freezing it is right. The defect is that nothing in the code
restricts the exemption to values the data layer does *not* hold, and the message asserts the
unrestricted property anyway.

This is the project's canonical shape, in the check the README points readers at, and it is the ninth
instance rather than a new kind of thing. `README.md:190` says "Eight times in this project a checker
passed while a real defect shipped. Every one had the same shape: the check verified a property of
the *source or the declaration* rather than the property a reader depends on, and the success message
claimed the latter." That count is now nine.

Fix: qualify the sentence, and print how many declared literals currently equal a live value, so the
exemption cannot quietly grow.

**I2. MEDIUM, LATENT. The evidence quote check is an unanchored substring match.**

`scripts/check-evidence.mjs:115`:

```js
const carries = (text, value) =>
  [...new Set([format(value), String(value)])].some((form) => String(text).includes(form));
```

Every quote check routes through this. Executed against contrived input it returns true for
`carries("total rose to 24.9 billion", 4.9)` and `carries("1,313 applications", 313)`: the digits of
one figure embedded inside another satisfy the check. The run then prints that each figure is
"declared in `data/evidence/` with a quote containing its value" and that "it catches an invented
figure and not a misread one". A misread whose digits happen to embed is not caught either, and for
small values, a range bound of 1 for instance, the check is close to vacuous.

The comment at line 112 says this mirrors `validate-content.mjs:796`. That one wraps its forms in
`\b…\b`; this one does not.

Latent, because the check fires only on figures that changed against `origin/main` and nothing has.
Every future evidence entry passes through it, which is the entire point of the check. Fix:
boundary-anchor each form.

**I3. MEDIUM, LATENT. `review_due` is validated as a declaration and read by nothing.**

`scripts/validate-content.mjs:32` checks that `review_due` exists, parses, and falls after
`last_reviewed`. Nothing anywhere compares it with the current date. The twelve-month expiry at line
166 runs only inside the claims loop, so it covers the seven claim pages and nothing else.

The consequence, in the error message's own words: it says "nothing says when this page falls due",
and nothing asks. The nine non-claim pages carry `review_due` dates in 2027, and when those dates
pass every check will stay green. The weekly CI cron exists, as its comment says, so that time-based
rules "can only fire if something runs"; it runs this script, which will not notice.

`glossary.md` is weaker still: `checkReviewDue` is never called for it at all, and its
`last_reviewed` is checked for presence but never for validity.

Fix: have `checkReviewDue` report when the due date has passed, validate `last_reviewed` with the
same date check used elsewhere, and call it for the glossary.

**I4. MEDIUM, LATENT. The editorial lint does not reach the `data/` prose that renders to pages.**

`validate-content.mjs:911` applies three of the five per-page checks to the data-file prose loop.
`checkEditorial` and `checkGlossaryLinks` are not among them, so a banned term or a dead glossary link
in a `dashboard.json` card or a `meta.json` caveat ships unflagged, while the lint's own comment at
line 337 says "This scans the pages a reader sees" and card text is on a page a reader sees.

This is the same walk gap the project already fixed once for the literal scan, recurring for the
language rules: the literals were extended to `data/`, the lint was not. Nothing in `data/` trips it
today. Fix: two more calls in that loop.

**I5. MEDIUM, LATENT. A malformed record crashes both validators before their findings print.**

`lib/series.mjs:42` does `point.date.slice(0, 4)`, and `validate-data.mjs:83` calls `new URL(url)` via
`resolveHost`. Both throw on exactly the malformed input the validators exist to report, and both are
called after errors are collected and before the report block. So the one run whose queue already
holds the explanatory "missing date" or "source_url is not https" error dies with a stack trace and
loses every collected finding instead of printing it.

Fix: make `seriesPoints` skip a point with no date, and wrap the URL parse so a failure queues an
error rather than throwing.

**I6. LOW. Two smaller ones.** The em-dash scan places `STYLE_FILES` inside the per-directory loop,
so one em-dash in `README.md` reports six times; and both its `catch { continue; }` blocks swallow any
error, not just a missing directory, so an unreadable tree is silently exempted from the house-style
rule. That is the suppression shape this project treats as the first place to look.

**I7. Checked and clean.** `check-releases.mjs` came through with no defect found: its
could-not-check paths, its empty-change-history refusal, its missing-timestamp rule and its exit gate
all fail in the safe direction, and its "not established" block matches its code. No regex `lastIndex`
state bug exists anywhere in the six files, and no `RegExp` is built from data rather than a code
literal. `lib/tables.mjs` can match short snake_case tokens, but every consumer of a false match fails
loudly rather than silently.

---

### J. Documentation: the same disease, and one instance reaches a runbook

The recurring root across the documentation is the one the project names itself: a count typed where
a run should be cited. `docs/foundation.md` is the worst affected, with six stale typed counts.

**J1. HIGH. Three live documents say four metrics declare a `series_ref`. Five do, and the fifth
breaks the rule the runbook states.**

`docs/UPDATING-DATA.md:81` tells someone scoping an update to "Note which of the **four** `series_ref`
metrics are in scope", and `docs/prompts/update-from-release.md:118` says "**The four `series_ref`
metrics are all `ons-ltim`**, so this prompt cannot do an ONS update at all."

Querying the data layer directly returns five, and the fifth is not `ons-ltim`:

| Metric | Series point | Source |
| --- | --- | --- |
| `migration/net-migration` | `netMigration@2025` | ons-ltim |
| `migration/net-migration-2` | `netMigration@2024` | ons-ltim |
| `migration/total-long-term-immigration` | `flows@2025` | ons-ltim |
| `migration/total-long-term-emigration` | `flows.emigration@2025` | ons-ltim |
| **`asylum/asylum-applications-2025`** | `asylumApplications@2025` | **ho-immigration-stats** |

`npm run validate` prints "Figures held twice: 5 metric(s) declare a series_ref" on every run.
`docs/HANDOFF.md:103` and `docs/BACKLOG.md:232` both say five, so the repository already contradicts
itself.

**Why this is the highest-severity documentation finding.** `docs/UPDATING-DATA.md` step 1 is what a
person uses, under time pressure, to scope a Home Office quarterly. It tells them the `series_ref`
metrics are an ONS-only concern. A Home Office update that moves `asylumApplicationsTimeseries.json`
without `asylum/asylum-applications-2025`, or the reverse, fails `validate-data.mjs` while the runbook
insists the situation cannot arise. The build fails safe, so no wrong figure ships. What is lost is
the updater's time and their confidence in the runbook, at the moment both matter most.

Fix: four becomes five in three files, "are all `ons-ltim`" goes, and the fifth is named. Better,
and consistent with what this project does elsewhere: replace the count with the query, since
`npm run validate` already prints it.

**J2. HIGH. The runbook says the asylum applications series has no `series_ref` protecting it.**

`docs/UPDATING-DATA.md:183` says a move of `asylumApplicationsTimeseries.json` or
`asylumBacklogTimeseries.json` involves "neither of which is protected by a `series_ref` metric". The
first half stopped being true when `asylum/asylum-applications-2025` was added. Still true of the
backlog series only. Fix: "of which only the backlog series has no `series_ref` metric protecting it".

**J3. HIGH. The foundation says the update commitment is still a proposal. It was signed on 23 July,
and the same document says so.**

`docs/foundation.md:1170`: "Publish fewer figures and commit to a cadence in public. Neither has
happened: 36 records reach a reader and the commitment **is still a proposal**."

`docs/foundation.md:906` contradicts it: "Signed 23 July 2026: **one month** from each of the three
cadenced releases". So do `docs/HANDOFF.md`, `README.md`, and the signed commitment rendering on
`/sources-and-method/`. The sentence also carries two stale counts: 36 records reach a reader where
46 do, and 67 figures where there are 75.

This one matters beyond tidiness. It sits in the risk register, under the risk the document names as
the most likely way the project fails, and it reads as though the mitigation were still outstanding
when it has been taken.

**J4. MEDIUM. The rest of the stale counts, each verified against a run.**

| Location | Says | Truth | How established |
| --- | --- | --- | --- |
| `foundation.md:207` | sources catalogue is "twelve entries across eleven publishers" | 13 entries, 12 publishers | direct count; `README.md:96` is right |
| `foundation.md:862` | "three releases, covering 22 of the 36 published figures", HO 13 / ONS 7 / HMCTS 2, "the other 14" from four publishers | the built page derives HO 19, ONS 10, MoJ 2, "the other 15 from six publishers" | `npm run build` |
| `foundation.md:608` | `table_reference` "on 14 records and 2 series files" | 17 records, 2 series files | `npm run validate` |
| `foundation.md:1032` | "Ten warnings surface today and all ten were reviewed on 22 July as coincidences" | 17 warnings today | `npm run validate` |
| `foundation.md:709` | "the three HTML transforms" | five | `grep addTransform` |
| `foundation.md:688` | "67 governed metrics" | 75 | direct count |
| `BACKLOG.md:11` | "after thirteen pull requests, #54 to #66" | the file itself records #67 and #68 as done | reading the file |

`foundation.md:1032` deserves singling out. It preserves a stored note that ten warnings "were all
reviewed as coincidences", which is precisely the stored all-clear that `docs/HANDOFF.md:220` warns
against after re-checking found three of them were live values restated longhand. A document
recording the lesson also carries the mistake.

`foundation.md` mostly knows better: line 1136 explains why a count should not be restated there,
"it was restated here and went stale". Fix, throughout: delete the counts and point at the run.

**J5. MEDIUM. Two documents describe things that changed under them.**

`docs/PRE-PUBLICATION-REVIEW.md:322` instructs a sign-off to "update the pre-launch banner in
`content/_includes/base.njk`, **which currently tells every reader that this review has not
happened**". PR #54 corrected exactly that sentence; the banner now says the review was done and has
not been recorded as passed. The instruction survives, its justification does not.

`docs/HANDOFF.md:178` says "Three of the four known gaps are published… in `docs/BACKLOG.md`, where
all four are listed". BACKLOG lists three *candidates* for a fourth published limit, not a fourth
gap, and omits two that `README.md` carries. The reader-facing list is the one that matters and it is
right: `content/sources-and-method.md` publishes exactly three limits, and BACKLOG and README agree
with the page. HANDOFF's "four" is the outlier.

**J6. The runbook is otherwise sound.** Walked step by step: every command it names exists in
`package.json`, `a11y` does re-run the build so "put it last" is right, `CHANGELOG.md` has the
`## Unreleased` heading and the date convention step 9 claims, the promise step 9 quotes appears
verbatim on the sources page, the `continue-on-error` flags are where it says, and the prompt's
pointer to the runbook's section resolves to that heading exactly. Every PR number and date asserted
anywhere in the documentation, #33 to #68, checks out against `gh pr list`. Every foundation section
cross-reference resolves to the section it claims.

---

### K. Content: the remaining precision findings

Two blockers are at the top of this document. These are the rest, and two need the publisher re-read
rather than a decision here.

**K1. HIGH. The 76% hotel-cost share is given two different periods, in two public places.**

`content/costs.njk:83`, which a reader sees:

> Hotels housed about 35% of the people in asylum accommodation but accounted for about 76% of the
> cost of the accommodation contracts, £1.3 billion of an estimated £1.7 billion **in the first seven
> months of 2024-25** (National Audit Office, HC 874).

`fiscal/home-office-spending-on-asylum-hotel-accommodation` notes, and `/about/` tells readers the
data files are public:

> Hotels were about 76% of the **annual** cost of asylum accommodation contracts but housed only
> about 35% of people in asylum accommodation.

The same 76%, attached to two different periods. The arithmetic is internally consistent either way,
1.3/1.7 is 76.5% and 76% of an annualised contract total also roughly coheres, so the repository
cannot settle which HC 874 actually states. One of the two is wrong and both are published.

**OWNER-VERIFY** against HC 874, then fix whichever is wrong. Note also that £1.3 billion and
£1.7 billion exist in no record, which is finding K3.

**K2. MEDIUM. A short answer converts "had not ended in a grant" into "ended without a grant".**

`content/claims/refused-asylum-seekers-are-eventually-recognised.md:5`, the `short_answer`, which
renders on three pages:

> for claims made between 2010 and 2020, between a fifth and a half of each cohort **ended without a
> grant**.

The page's own body at line 54 is careful and correct: "each cohort that **had ended in a grant by its
latest recorded outcome**". A case that has not yet ended in a grant has not necessarily ended
without one, and the page's own source notes say more recent cohorts are not comparable because more
of their cases are still progressing.

The short answer makes exactly the move the page exists to criticise: it converts a latest-recorded
-outcome measure into a concluded one. It is also the same error family as blocker 0A, on the same
subject, which is why the glossary fix and this one should be done together.

Minimal correction: "had not ended in a grant at the latest recorded outcome". The wording is the
owner's.

**K3. MEDIUM. The sources page promises more protection than the site has.**

`content/sources-and-method.md:82` states, in the site's own voice:

> Prose cites records, it does not restate them. Where a number appears in a sentence on this site,
> **it is inserted from the record when the page is built**.

That is stronger than what holds, and the project already knows it: the unrecorded-literal report
prints 31 figures on every run for this reason. Load-bearing counterexamples, held in no record and
not declared as historical literals:

- `content/migration.njk:57`: "The highest twelve-month net migration estimate ONS publishes is
  **944,000**, in the year ending March 2023." A current-release figure, recomputed every release,
  protected by nothing. `docs/BACKLOG.md:286` already names it as reading as history and not being
  history.
- `content/costs.njk:104`: "£144.98 and £23.25 per person per night as of June 2025 (HC 580)", which
  are newer than the £158 and £20 the chart beside them carries.

This is not a new defect; it is the published promise being wider than the mechanism. **The remedy is
the promise, not the figures.** Qualify it, or finish the work in backlog item 4 first. As written, a
reader who finds one prose-only figure has caught the site overstating its own guarantee, which costs
more than the figure does.

**K4. LOW. Three small ones, each confirmed.**

- `content/glossary.md:100` and `content/sources-and-method.md:133` both say mixing people and cases
  "produces answers that are wrong by **twenty per cent or more**". On the site's own headline
  example, 93,525 people against 76,714 main-applicant applications, the difference is 16,811, which
  is 18.0% of 93,525 and 21.9% of 76,714. "Or more" is a floor and one direction breaks it. The
  series file already says "roughly a fifth lower", which is the fix.
- `data/dashboard.json`'s net-migration card says the fall is "mainly because fewer people arrived
  **on work and care visas**". The record attributes it to ONS work-related immigration, a reason
  grouping of people, and `migration.json`'s own envelope note says the ONS and visa sources "are not
  interchangeable". Naming the measured quantity is the site's first precision rule.
- `content/costs.njk:139` asserts "**In 2024** the Home Office collected around £3.0 billion", then
  says four lines later that the briefing "does not state which twelve months it covers". Drop the
  date.

**K5. Neutrality: better than the 5:2 split suggests, with one sentence to cut.**

The split disclosure was assessed rather than assumed and it is better than adequate. It is stated in
bold on `/common-claims/`, the two-per-direction floor is enforced in the build, the label choice is
defended in the style guide, and the mirrored fiscal claim pages are genuinely symmetric in
structure, length and language, with concession sections on both sides. One restrictionist claim is
graded "roughly right", so the raw count understates the site's even-handedness rather than
concealing bias.

Two asymmetries are worth naming.

`content/common-claims.njk:32` says "The two longest and most pointed checks on this site both run
against the pro-migration side." Measured on built word counts the "longest" half is true by about
twenty words, and "most pointed" is not falsifiable. The longest of the two also concedes, at
`refused-asylum-seekers-are-eventually-recognised.md:138`, that "The versions we have found are
weaker, putting it as 'many' or 'most' rather than 'almost all'", so its strongest exhibit corrects a
claim stronger than any the site located. **Recommendation: cut the sentence.** It is editorial
self-defence resting on evidence too thin to carry it, on the page whose credibility depends on not
doing that. The disclosed count stands better on its own.

`most-immigration-is-asylum` answers a claim about all immigration using a non-EU+ denominator of
14%. The all-immigration share, 88,000 against 813,000, is 10.8%, which is smaller and strengthens
the correction. Stating both would close the denominator gap the page otherwise leaves open.

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
- **It is one audit.** The site's own record is that green checks have shipped real defects nine
  times now, and that several were found only by a second model reading the same code. This document
  should be treated the same way. Two of its passes reached blocker 0B independently, which is
  evidence for that finding and not for the method: the other blocker, 0A, was found by one pass
  only, and nothing here says what a third would have found.
- **It did not re-read `verification.txt` or the CHANGELOG in full.** The corrections claimed as
  landed were spot-checked by grepping for the phrases the review said to delete, which is how
  blocker 0B was found. That method finds surviving phrases; it does not confirm that a correction
  described as done was done well.

---

## Recommendation

**Do not record the review as passed yet**, which is the decision `docs/BACKLOG.md` item 1 step 3
leaves open and which this audit bears on directly.

Not because of the count of findings. Two of them are the site publishing statistical reasoning that
its own data files explicitly forbid, on the page its claim pages cite as the authority for the terms
in dispute, and both are on a page the review never opened. The honest reading is that the review
covered ten pages well and six not at all, and that the six now have evidence of needing what the ten
got.

The rest of this document is ordinary pre-launch work and most of it is small. The site is in better
shape than the length of this list suggests: the data layer holds no wrong published value, all seven
chart summaries describe their data correctly, the accessibility bones are sound, and the checking
apparatus caught nothing here only because what it checks, it checks well. The findings cluster
almost entirely in the places nothing was watching, which is the outcome a project built this way
should expect and is the argument for the mechanical fixes in D1, F0-3 and I3 rather than for
another read.
