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

### D. Housekeeping

**D1. LOW. `.history/` is untracked and not ignored.** It is the VS Code Local History directory,
36K today, holding copies of earlier file versions. It shows in `git status` on a clean tree, which
trains a maintainer to ignore a dirty status, and an accidental `git add -A` would commit working
drafts of content pages. Add `.history/` to `.gitignore`.

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
