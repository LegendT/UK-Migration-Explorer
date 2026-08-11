# Pre-publication review, `/returns/`

Run 10 August 2026 against the live site, by the method of `docs/PRE-PUBLICATION-REVIEW.md`:
**this is the evidence, not the review.** Every claim the page makes in prose is set beside what
the data layer or the publication actually says. The verdict is the owner's, and merging the pull
request that carries this document is that verdict, which is the precedent the six claim pages set.

**Why this page needed one.** It was added on 10 August 2026, after the signature recorded in
`CHANGELOG.md`, so it was live and outside the review. The alternative was to name it as unreviewed
alongside the lifetime-contribution claim; the owner chose to review it, on the reasoning that one
page carrying five provisional figures on a contested subject is cheaper to read than to caveat.

---

## What the automated checks already settle, so this review skips it

**Every figure on the page is a citation, and there are no literals at all.** Eight figure
instances render from five records through the token contract; the only bare number in the page
body is a year. `validate-content.mjs` refuses a build where a current record value is written
longhand, and it refused this page once during drafting, which is how the last literal became a
token.

That empties the half of the review template that says *"only the literal numbers need your
eyes"*. What is left is the half no check reaches: the sentences around the figures.

---

## The prose, set beside the data

| The page says | What the data says | |
|---|---|---|
| enforced plus voluntary is "the two rows above, and nothing else" | 9,723 + 29,284 = 39,007, and the total record is 39,007 | agrees |
| voluntary is "about three-quarters of it" | 75.1% | agrees |
| asylum-related is "a subset already inside the total" | 11,918 of 39,007, and the record says "a subset of total returns, not an addition to them" | agrees |
| port refusals are "published outside the total and must not be added to it" | the record says "Counted SEPARATELY from the enforced-plus-voluntary returns total" | agrees |
| returns "count events, not people" | three of the five records say "Return events, not unique people" in terms | agrees |
| "every figure on this page is flagged provisional" | five of five are graded `provisional` | agrees |

## The two the data layer could not settle, and what the publication said

**"The rest involve people with no asylum claim at all."** The data layer established only that
asylum-related returns are a subset. Whether the remainder had ever claimed asylum is a question
about the publisher's category, and the publisher answers it: *"Asylum-related returns relate to
cases where there has been an asylum claim or further submission at some stage prior to the
return."* The category is drawn on whether a claim was EVER made, so its complement is people who
never made one. **The sentence is sound and was resting on nothing**; the definition is now in the
`returns-asylum-related` record so a future reader can check it without repeating this fetch.

**"Nobody publishes a reliable figure for the population without leave."** This was an absence
claimed across every publisher and checked in one, and **the first attempt to fix it was worse than
the defect**: the sentence was narrowed to the Home Office, which made it true by shrinking it
rather than by checking. The owner refused that and asked for the other acceptable sources, which
is what proving an absence in every store actually requires.

**Checking them overturned the claim.** The Migration Observatory, which this site already cites
and grades, publishes a briefing collecting exactly these estimates: a Greater London Authority
central figure for 2017, a Pew Research Center range for the same year, and a 2025 commission's
range for part of London. So estimates DO exist and a source this site accepts publishes them.
What is true is narrower and more useful: the Home Office declines to make one, in terms, and the
Migration Observatory warns the independent ones are "highly uncertain and have large margins of
error". **The most widely quoted was retracted in March 2025 and revised downwards**, which is the
kind of fact this site exists to carry.

The page now says that, quoting both, and prints no figure of its own: naming a contested estimate
would need a record and a grade, and the sentence's job is to explain why no return rate can be
computed rather than to publish a population estimate.

---

## What this review does not cover, stated so it is not assumed

- **That the five figures are correctly transcribed from the source.** They predate this page and
  were verified when the records were made; this review read the prose against them, not them
  against the publication.
- **That the page reads well aloud.** No screen reader has been run over it. That is the published
  limit and The order's item 19.
- **That "about three-quarters" is the best rounding.** It is accurate at 75.1%; whether a page
  correcting other people's roundings should round at all is an editorial question and was not put.

## Sign-off

☐ The owner has read the two findings above and accepts the page as reviewed.

Merging the pull request carrying this document is that mark. On merge, the signature in
`CHANGELOG.md` covers 23 of the 24 pages the build produces other than the 404, and
`scripts/check-build.mjs` holds that denominator against the build on every run.
