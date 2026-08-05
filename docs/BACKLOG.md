# Backlog

**The durable list of outstanding work.** Every handoff points at this file rather than
restating it, because a handoff gets rewritten each session and a rewrite is where work
quietly falls out. An item leaves this list when it is done, and it leaves by being moved to
"Completed" with a date, never by being deleted.

`scripts/validate-content.mjs` fails the build if a planning document in `docs/` is not
referenced here, and fails if any planning document other than this one carries work state,
meaning a table row marked done, withdrawn or struck. That second rule exists because the
pre-launch audit built a second list, the two diverged twice in a day, and this file was
briefly edited to say the other one was live. `scripts/check-backlog.mjs` reads this file
itself: every path it names must exist, every section cross-reference must resolve, The order
must be contiguously numbered with a tag on every item, and no item in The order may write a
count of this project's own state.

**Consolidated 4 August 2026, from 2,729 lines.** A closed entry keeps what it was, what was
decided, the date and the pull request; its reasoning is in that pull request, which is durable
and does not have to be maintained here. An open entry keeps everything. Nothing was deleted from
The order and nothing was renumbered. **The consolidation moved nothing into `docs/HANDOFF.md`**,
which matters when you go looking: working practices are that document's subject and many of these
entries taught one, but a lesson that lived only in a closed entry here is now only in that entry's
pull request. Checked, not assumed, and it is not all of them. What the consolidation itself taught
was written up there afterwards, on 5 August 2026, under *Working practices that earned their
place*.

**The frozen records, read for reasoning and never edited**: `docs/PRE-LAUNCH-AUDIT.md`,
`docs/LAUNCH-READINESS-REVIEW.md` and `verification.txt` at the repository root. The pre-launch
audit carried its own action list for a day, which was the mistake: two lists meant every change
had to land twice, and they diverged twice. Whatever is still outstanding from any of these is in
this file.

**`docs/PRE-PUBLICATION-REVIEW-SIX-PAGES.md` is NOT one of them**, and this paragraph listed it as
frozen from the consolidation of 4 August until 5 August 2026. It is the live half of The order's
item 2: it carries unticked checkboxes that the owner works, so telling a session never to edit it
would have shut the one document that item requires opening. `docs/PRE-PUBLICATION-REVIEW.md` is
not frozen either, being the evidence template a reviewer works through, and call 13 corrected its
section 3.

**The prompt for a fresh session is copied to `docs/prompts/fresh-session.md`** from the
handoff, so it can be copied without opening a long document. Nothing generates it: no script
writes that file and `check-backlog.mjs` only confirms the path exists, so diff it against the
handoff's block rather than trusting either.

## The order

**The single list of everything outstanding, in the order it needs doing.** The lettered and
numbered sections below hold the detail and the reasoning each entry points at.

**Items marked GATE block launch, and on 4 August 2026 that became almost all of them.** The
owner widened it, on the reasoning that a site whose subject is other people's misuse of
statistics cannot launch with its own trust work outstanding. **The two items that are NOT
gates are the information now, and they sit after Launch**: talking to five target users, and
running a real screen reader. Both are the owner's own time rather than work anyone is waiting
on, and both stay on this list, because an item leaves it by being completed and never by being
dropped.

A session takes the first unfinished **[me]** item or **[me]** half; **[you]** items are the
owner's, and a session brings those to him batched rather than starting them. If a session's
first act is to bring the gates rather than to take the first **[me]** item, that is the right
first act. **No entry names which item is next.** One did, and it was false within sixteen
minutes of being written: the rule in this paragraph is what decides, read against the entries
below.

1. **Both glossary gates are closed (PR #83, 2 August 2026).** The numbers 1 and 2 are collapsed
   into this one entry rather than left as empty rows.
2. **GATE. The six pages the pre-publication review never opened**, put through
   `docs/PRE-PUBLICATION-REVIEW.md`. **The [me] half is done (PR #76, 2 August 2026)**: the
   evidence is in `docs/PRE-PUBLICATION-REVIEW-SIX-PAGES.md`, which sets every figure and every
   claim about a figure on those six pages beside what the data layer holds, and leaves the
   checkboxes unticked. **The verdicts are [you]**, and are all that is left of this item.
3. **GATE. The reader-facing wording batch**: everything under A4 and R1 below, plus the two
   sources-page wording bullets at the end of *Scoped, not built* section 6. All **[you]**
   calls; applying what is decided is **[me]**. **The calls came back on 4 August 2026** and
   every one is applied or needs no change except call 10, which waits behind this list's item
   15 by the last clause of its own decision. **So there is no [me] work left in this item.**
4. **CLOSED 5 August 2026 (PRs #136 and #139).** The domain (PR #118), the contact address and the
   fourth published limit (calls 16 and 20, PR #130) and the pipeline question (call 17, PR #122)
   were already done. The LICENCE scope, call 18, is inverted, and A6's calls 19, 21 and 23 are
   applied with the 47% half of call 24's residue, all in PR #136. Call 24's other half, the
   `date` field on the fiscal-impact record, is applied in PR #139: it held the briefing's
   publication date where this project files `date` as the period end, and **the check that exists
   to catch that could not**, because it asks only that the date's year appear in `period_label`
   and the label named the briefing's own June 2026 publication. Both are under *Completed*.
   **This entry said the LICENCE scope was all that was left until 4 August 2026**, which orphaned
   A6, the sentence enumerating it having been dropped a version before while the conclusion it
   contradicted was kept.
5. **CLOSED 4 August 2026 (PR #129).** R2 is closed. Every source observation the far-end trace
   produced has been taken: five records re-sourced to the publisher that prints their figure,
   five regraded to say honestly what the figure is, and **one published value moved**, the OBR
   lifetime contribution, from £341,000 to £297,000 when the owner chose age 82 over an age
   nobody had chosen on record. Its last
   **[you]** question, whether `content/claims/nineteen-per-cent-born-abroad.md` should stop
   calling a now-`calculated` figure "accredited", was decided as call 25 and applied in seven
   rendered places. **The reason was stronger than a grade change**: ONS grants accreditation to
   the England and Wales and Northern Ireland statistics in its UK census-based release and
   withholds it at UK level in terms, so nothing accredited publishes a UK-wide foreign-born
   figure at all. **This entry read as open until the consolidation of 4 August 2026**, when the
   page was grepped rather than the entry believed.
6. **GATE. The UX review, U3 to U5 below.** U1 is done (PR #86) apart from the `robots.txt`
   half, which is in the launch gate at the end. U2 is closed (PR #118), built and its format
   decided. **U3's first bullet and call 28 are applied (PR #137, 5 August 2026)**: the confidence
   grade and a per-figure checked date now render on all three theme pages, and a claim can be
   taken down under the twelve-month promise without deleting its address. **What is left is one
   bullet in U3 and one call in U4, and this entry accounted only for U3 until 5 August 2026**,
   which is the shape that orphaned A6 a day earlier: a header naming U3 to U5 above a conclusion
   covering U3 alone, and the conclusion is what gets believed. A session read the item as spent
   and named the wrong next item because of it. Taking the three sections in turn:
   **U3** leaves the `metric_name` bullet, deliberately not released with the first and **[you]**;
   its other bullets carry no tag. **U4** leaves call 27, the structured data, which is **[me]** and
   whose first step is confirming the `ClaimReview` deprecation the section says it could not
   verify, because if that holds the channel is dead and the rest is not worth building. U4's other
   call, 26, is decided and unapplied but is **not applied here**: item 13 says what it decides is
   the content of the `robots.txt` that item 13 writes, so it lands there and that item is
   deliberately last. **U5** is considered-and-cut and holds no work by design.
7. **CLOSED 5 August 2026 (PR #138).** U6's three findings are all built: the navigation (PR #109),
   the chart remedy (PR #113) and now the seven-table finding, call 29, where the first-column
   floor is scoped to the wide rendering and the Sources catalogue is rendered twice, a definition
   list below 40em and the table above it. At 320px it goes from 42% hidden to nothing hidden.
   **The other six tables still scroll and that is the decision, not an omission**: they are 0 to
   28% at 320px, worst on the costs page, and a scroll container is defensible there. **This entry
   read "nothing but [you] is left of it" until 5 August 2026 and no [you] work was named anywhere
   under U6**, the sentence having been written while call 29 was still undecided and kept after it
   was decided as **[me]**. It is under *Completed*.
8. **GATE. A1, and its scope is full validation of all data**, not only the reader-facing
   records. Decided 2 August 2026, and it is the largest item on this list. **Every record in the
   data layer now carries evidence except the ones the batches left as [you]**, which are named
   under A1 below, are all decided as calls 30 to 35, and are unapplied **[me]** work. **No count
   is written here**: `npm run build` prints what is reserve, and `node scripts/check-backlog.mjs`
   would refuse to let this line say how many lack an evidence entry. Those are two different
   numbers and this line gave one figure for both until 3 August 2026.
9. **GATE. The release notifier's last phase**, which is *Scoped, not built* section 3: rewriting
   what the sources page says about automation. **[you]** sign-off, no build behind it.
10. **GATE. The undrafted claims**, which is *Scoped, not built* section 5: a session drafts
    **[me]**, and the verdict and short answer come to the owner before merge **[you]**. **Three
    are drafted and merged** (PRs #131, #132 and #133) with all three verdicts and short answers
    given on 4 August 2026. **Seven were draftable, not eight**: "Local areas all carry the same
    pressure" needs per-capita local authority figures and `data/` holds none. The order the rest
    are proposed in is in PR #132. **No count is written here, in digits or in words**: `npm run
    validate` prints the direction split, and how far the finished set would carry it is under
    section 5, which is where a dated measurement belongs. **Worth reading that before drafting
    another**, because only one of those remaining corrects a pro-migration claim and the split
    is already off the floor.
11. **CLOSED 4 August 2026 (PRs #121 and #124), and A3 is closed with it.** `main` is protected:
    the `validate` job is a required status check, `enforce_admins` is on so it binds the owner
    too, and force pushes and deletions are off. Probed rather than read: a direct push to `main`
    is refused with `GH006, Required status check "validate" is expected`. So every claim in this
    file that a check gates a pull request now means what it says.
12. **GATE. Record the review as passed in `CHANGELOG.md`**, after the six-page checkboxes above.
    **Its scope was decided on 2 August 2026: all sixteen pages, not the ten the review read.**
    Worth knowing before signing: the review's own selection criteria failed 2.6 and 2.7, and both
    were kept on the site's published no-attribution policy, so signing backs that policy over the
    reviewer's criterion. **[you]**.
13. **GATE, and deliberately last of the gates. Launch**: delete `content/robots.txt` and its
    guard in `scripts/check-build.mjs`. **The UX review says write that file rather than only
    delete it**, so what is outstanding is the file itself plus the `Sitemap:` line pointing at
    the sitemap built in PR #86, and **what it says is decided as call 26 under U4** and
    unapplied. Then set up Search Console, which costs nothing, needs no JavaScript, and is how
    success measure 2 would be noticed. **[me]**, on the owner's word.
14. **NOT A GATE, and that is a decision rather than an oversight. Talk to five target users.** A
    week, in parallel with everything above, and the one acceptance criterion foundation section
    18 says can save the whole build. The two comprehension criteria are tested by this and by
    nothing else. **[you]**.
15. **NOT A GATE, on the same decision. A real screen reader over the pages** **[you]**, then
    A5's `aria-describedby` change that is gated on it **[me]**, and R1's call 10 with it. It is
    also the published limit most worth closing.
16. **NOT A GATE. The scroll-region checks cannot see a region that carries a second class**, which
    is the last bullet under A5. **[me]**, and it exists as an item because nothing else in this
    list points at it: item 4 named A5 and closed on 5 August 2026, and item 15 names one specific
    A5 change rather than the section, so the work was written into a section the ordered list no
    longer reaches. **That is the A6 orphan repeating within a day, by the hand that had just
    written up A6's**, which is why it is a numbered item rather than a sentence somewhere. Added at
    the end, so nothing was renumbered.

If you reorder, or complete something, **move the entries and renumber** rather than adding a
sentence explaining that the order is not the order. That trap was set once, on 28 July 2026,
and a fresh session following the instruction would have taken the wrong item. A closed item
keeps its number and collapses to a line, which is why 1, 5 and 11 are still here.

### The launch gates as they stood before 4 August 2026, in detail

**All three are closed**, and what blocks launch now is The order above, which is where the
widened set is stated so that it is stated once. They were the two `content/glossary.md` entries,
Grant rate and Net fiscal impact, both done in PR #83, and the hotel accommodation record citing
the wrong source, done in PR #73. All are under *Completed*.

**And one that is not a gate but changes what the review's sign-off means.** Both glossary
blockers sat on a page `verification.txt` never opened, and the review read ten of sixteen. **The
scope of the signature was decided on 2 August 2026: it covers all sixteen**, because the promise
on `/sources-and-method/` does not distinguish ten pages from sixteen, so a signature scoped to
ten would leave a scope silence about this site's own review, which is the thing it criticises in
others.

---

## From the pre-launch audit, closed 31 July 2026

**The audit is closed and `docs/PRE-LAUNCH-AUDIT.md` is frozen**, merged as PR #70. It covers
code, data, content, documentation and accessibility, and its outcome is a findings list rather
than an approval. Everything still outstanding from it is here, in this file's format.

### A1. Traceability was never checked at the far end

Every check verifies a figure NAMES a source. Nothing verifies the source CONTAINS it. Opening
five publications during the audit found three defects, one of them a headline figure on the home
page.

**The backfill is done to the edge of the [me] work.** Six batches across PRs #99, #102, #103,
#104, #111, #112 and #116, taken by publisher because one fetch covers a publisher at once. Every
published record carries evidence, and so does every reserve record except the ones below. Four
of the six batches found a record citing a page that is not where its figure lives, and two found
records graded wrongly in opposite directions. What each batch found is in its pull request.

**What the pass had to establish per record**, kept because it is the standard for anything left:
that the named source CONTAINS the figure, and that the record's own fields are right, its period
label, its `date` as the period end, its unit, its grade and its `table_reference`. The far-end
trace is the half no check can do.

**Six calls are decided and unapplied. [me].** Each was a **[you]** call because the fix costs
more than a re-source, and each was decided on 4 August 2026:

- **Call 30. `migration/largest-nationality-for-immigration-india`**: re-date the citation to the
  18 December 2025 edition. The record holds 16% and its `published_date` is the edition stating
  17%, so it has never cited an edition containing its own figure. The December edition does and
  is recoverable from the Internet Archive. Re-dating moves no value and changes nothing a reader
  sees, where updating to 17% moves a value and retiring it removes a record.
- **Call 31. `fiscal/employment-rate-eu-born-residents` and
  `fiscal/employment-rate-uk-born-population`**: add ONS EMP06 as a catalogued publisher in
  `data/sources.json` and re-source both. Neither value is in any edition of the briefing they
  cite, which prints no decimal percentage anywhere. Both values are right: EMP06 country of birth
  rates, Oct-Dec 2025, gives 80.3937 and 74.6847. **A catalogue change plus a grade change**, the
  rounding forcing the derived path. The alternative keeps two records whose named source does not
  contain them, which is the defect this section exists for.
- **Call 32. `fiscal/migrant-share-of-uk-employees`**: rename it to the measure the source uses.
  The record is named for a foreign-born share; the briefing sentence beside the quoted figure
  defines the group by the nationality held at national insurance registration. Re-sourcing moves
  a value for no reader gain and it is unpublished reserve. The evidence entry is unaffected.
- **Call 33. The Skills for Care record**, whose id begins
  `fiscal/non-british-nationals-as-a-share-of-the-adult-social-care-wo`: rename it to the base it
  holds, on the same reasoning as call 32. It is named for the adult social care workforce and its
  31% is the narrower base; the whole workforce, including direct payment recipients, is 29%.
- **Call 34. `population/share-of-london-residents-born-abroad`**: say in the record that the
  briefing gives "More than 40%", a floor, where the record holds 40 as a point value. One word.
  The evidence entry already quotes the hedge.
- **Call 35. `asylum/small-boat-arrivals-2026-year-to-date`**: drop it. Its own notes say "Do not
  publish without re-checking"; it is reserve, it is a part-year figure, and re-checking it buys a
  record nothing renders.

**One [me] gap is named and not built: a series evidence entry is validated by nothing at the
moment it is written.** `check-evidence` asks only a block that MOVED, so an entry for a block
sitting still is never re-read, which is the same shape as the record-level gap PR #100 closed and
a smaller surface, four files rather than the whole record set. Batch 2 wrote three such entries,
so the gap is live rather than hypothetical, and their quotes were generated from the fetched
table with a per-point assertion for that reason. Still named here rather than built, because one
deliverable a session is this project's rule. **[me]**.

### A2. The corrections to the grant-rate record. DONE (PR #72, 31 July 2026)

Nothing is left of it, so it is under *Completed*. The letter is kept because sections are
referred to by letter and renumbering is how a reference goes stale.

### A3. Checks that do not do what the documents say they do. CLOSED (PRs #77, #79, #82, #106, #121 and #124)

Nothing is left of it. Seven checks were hardened or built and the branch protection behind them
turned on; all are under *Completed*, and two of the three that closed on 4 August 2026 closed
differently from how this section described them, which their pull requests record.

### A4. Reader-facing wording, all of it yours. CLOSED (PRs #122, #125, #127 and #128)

Nothing is left of it. Six calls, 1 to 6, all decided on 4 August 2026 and all applied. Two are
under *Completed* for what applying them found: call 1 recomputed the cohort denominator from
`Asy_04`'s own rows and caught a false superlative beside it, and call 5 turned out to need a
record and an evidence entry rather than a sentence.

### A5. Site-level decisions and small build work

- **Call 18, the LICENCE scope. DECIDED 4 August 2026, APPLIED (PR #136, 5 August 2026).** Inverted,
  so clause 1 covers everything except two things in `data/`: the figures, and the passages quoted
  from the publications they came from. **The second exception was not in the decision, and finding
  it is why this was not a one-line change.** Excepting only the figures swept `data/evidence/` into
  MIT, which is 16 files holding 120 verbatim quote fields from ONS, the NAO, the Migration
  Observatory and others: licensing a publisher's own paragraphs onward, where the old enumeration
  had merely failed to license them. Worse than the gap it closed, and caught by the critique round
  rather than by any check. The alternative decision was to scope it to `content/` and `lib/`.
- **`check-build.mjs` cannot see a scroll region that carries a second class. [me], found
  5 August 2026 while applying call 29, and it is The order's item 16.** Both of its scroll-region assertions match
  `class="scroll-x"` with the closing quote, so a region written `class="scroll-x anything-else"`
  escapes the focusable check, the role check and the accessible-name check, all three, in silence.
  The `scrollable-regions` transform in `eleventy.config.js` matches the same way, and there it is
  worse than blindness: the wrapper reads as no wrapper and the table is wrapped a second time, so
  a region ends up nested inside a region. **That is not hypothetical.** It shipped into a build
  during PR #138 and was found by counting `.scroll-x` in the built page, with `npm run build` and
  pa11y both green. **Nothing exploits it today**, because that pull request moved its toggle class
  onto an outer div rather than change a shared check, so this is latent rather than live. Fixing it
  is a character class in four patterns, two here and two in the transform, and the probe is the
  five strings that must and must not count as a wrapper.
- **Point `aria-describedby` at the visible chart summary** instead of duplicating it into
  `<desc>`. **Gated on a real screen reader**, which this project has never run, so it is
  **[you]** first, at The order's item 15.
- **Closed here**: call 16, the contact address, applied in PR #130 as
  `corrections@ukmigrationexplorer.org` in all three places the issue tracker was the only door.
  **The mailbox must exist before launch and nothing checks that it does.** Call 17, which
  pipeline gates what, applied in PR #122. The claim-list heading level, done in PR #77.

### A6. Decisions with no build behind them

Each is one call. None blocks anything. **The three decided calls are applied (PR #136, 5 August
2026). What is left is one question that applying them raised, and it is [you].**

- **Call 24's residue is opened, and it splits.** The 47% in the work-immigration notes is checked
  and right: ONS states it in the bulletin, in the sentence carrying this record's own figure, and
  the note's claim that it does not reproduce from the two rounded ends holds, those giving 46.3%.
  The note now also warns that the same release prints 47% as the study-related share of non-EU+
  immigration, so anyone verifying the record by searching that release for the figure lands on a
  different measure first. **The `date` field on
  `fiscal/net-fiscal-impact-of-immigration-as-a-share-of-gdp` was the open half, DECIDED and
  APPLIED 5 August 2026 (PR #139).** It held `2026-06-23`, the Migration Observatory briefing's
  publication date, where this project files `date` as the period end. The studies the record
  summarises are far older: Table 1 of the briefing runs from Dustmann and Frattini on 1995-2011 to
  Oxford Economics on FY 2016/17, read off the table itself. It is now `2017-03-31`, the newest
  study's period end, chosen because a reader asking how current the range is should be told the
  most recent evidence in it rather than the oldest. **Nothing caught it, and the reason is the
  half worth keeping**: `validate-data`'s period check asks only that the date's year appear in
  `period_label`, and the label named the briefing's own June 2026 publication, so the check was
  satisfied by the very thing that made the date wrong. **The label therefore had to lose that
  date, not just gain the span**, or a 2026 date would still have passed. Probed both ways: with
  the label as it now reads, `2026-06-23` is refused and `2017-03-31` is accepted, the check
  allowing `date-1` because a financial year is labelled by its opening year. **No rendered page
  changed**, which is narrower than saying a reader sees nothing different and is the true claim:
  diffing the whole built site before and against after, the only file that differs is the served
  `data/fiscal.json`, and the data layer ships with the site, so a reuser reading that file does
  see this. Both claim pages citing the record take their period from their own front matter. It is
  the only range record, so this sets the convention for the next.
- **The other residue was already settled**: the Asy_D02 pivot prints no year-ending total, searched
  with controls, so `asylum/asylum-administrative-outcomes` is correctly `calculated`.
- **Closed here**: call 19, `og:` tags, applied in PR #136. A claim page's `og:title` leads with the
  correction, the claim sitting in the description labelled as checked, and there is no `og:image`,
  foundation 8.5.4's refusal of a share image standing. Call 21, the emigration sentence, applied in
  PR #136, which also moved the summary quoted in `docs/PRE-PUBLICATION-REVIEW.md` section 6 so a
  reviewer's direction-word check reads the sentence the page now carries. Call 23, the NAO
  comparison, applied in PR #136 and verified in HC 874 at paragraphs 1.14 and 1.18 rather than from
  this project's own note. The confidence convention, decided 2 August 2026 and applied in PR #79, every
  ONS LTIM series point becoming `provisional` with `ons_marker` the single home for the
  publisher's per-vintage marker. The launch domain, decided 4 August 2026 and applied in PR #118.
  Call 20, the fourth published limit, applied in PR #130. Call 22, the claim card's duplicated
  review date, which stays and needed no change.

---

## From the launch readiness review, 2 August 2026

**The review is written up in `docs/LAUNCH-READINESS-REVIEW.md`**, a findings record carrying no
work state. Seven review dimensions plus a far-end source trace; 44 findings confirmed by an
adversarial verification pass and three refuted by it. The mechanical half landed with the pull
request that opened it, including both blockers. **All eight home page figures were verified
against their live sources with verbatim quotes.**

### R1. Reader-facing wording and grading, all of it yours

**One call is left, and it waits on The order's item 15 by the last clause of its own decision.**

- **Call 10. The claim page `h1`. DECIDED 4 August 2026, NOT YET APPLIED, and deliberately so.**
  Qualify the accessible name, not the visible heading: the visible bare claim is the design, and
  a screen reader user meeting the site assert it is the defect. **Worth testing under a real
  screen reader before applying**, which is what the deferral is for. Every claim page `h1` is the
  bare false claim, so a reader navigating by headings, or hearing the claims index read as a
  links list, meets the site asserting the sentence it corrects; the browser tab already says
  "Claim checked:".

**Closed here**, all decided 4 August 2026: call 7, the nested cost figures, applied in PR #125 as
a paragraph saying the nesting is this site's construction. Call 8, the Born abroad card's grade,
applied in PR #129 by a different mechanism from the one recommended, the recommendation having
been wrong about what could be evidenced; its pull request has what it took. Call 9, returns as an
unstated scope silence, declared in *What this site does not cover* rather than surfaced (PR #125).
Call 11, the non-EU+ glossary entry, added in PR #125. Call 12, the two fee records, applied in
PR #125 as the opposite edit because the premise had inverted and the records had already been
fixed in PR #104. Call 13, `docs/PRE-PUBLICATION-REVIEW.md` section 3's instruction to a reviewer,
corrected in PR #125.

### R2. From the far-end trace, source observations. CLOSED (PR #129, 4 August 2026)

Nothing is left of it. Five records were re-sourced to the publisher that prints their figure and
five regraded to say honestly what the figure is, across PRs #78, #99, #103, #104 and #129, and
**no published value moved except one**: the OBR lifetime contribution, where the owner chose age
82 over the undocumented age 80 and the figure went from £341,000 to £297,000. That is the first
value on this site to move because a far-end trace found what a figure actually was rather than
because a publisher released a new one.

**Two findings from it are constraints on future work rather than closed tasks.** The derived path
never recomputes a sum, which `data/evidence/README.md` says outright, so a rounded figure can be
evidenced by a derivation naming the rounding plus a quote per component without moving what a
reader sees. And `source_id` decides the publisher counts that `/sources-and-method/` renders from
`lib/published.mjs`, so moving a record between publishers changes that page.

### R3. Small build work. DONE (PRs #77 and #79, 2 August 2026)

Nothing is left of it. The three metric value maps stopped being last-write-wins, and the two ONS
series files' revision markers got one home in `ons_marker`. Both are under *Completed*.

---

## From the UX review, 2 August 2026

**A UX, SEO and trust review of the built site**, critiqued by two independent passes, with every
factual claim verified against the repository and the built output before landing here. It found
nothing that gated launch under the gate set of the day, and on 4 August 2026 the owner widened
that set, so U3 to U5 gate launch now. **Six claims in the review's first draft were wrong**, and
the shape recurs: most of the six asserted that something was ABSENT from the site after checking
a single page, and it was present on the others.

**U6 is not part of that review.** It is a second round, added after the first was found to have
left the site's navigation undecided and unrendered, and it is scoped by that gap rather than by
the nav.

### U1. Cheap, uncontested, all [me]. DONE (PR #86, 2 August 2026), except the half that is the gate

Nothing is left of it but the `robots.txt` sentence, which is inside The order's item 13 and stays
there: the gate says delete the file, and the line pointing at the sitemap has to be written into
it. What was built, `content/sitemap.njk`, an id on every heading, `theme-color` and a 404
description, is under *Completed*.

### U2. The citation handover. DONE (PR #118, 4 August 2026)

Nothing is left of it. A "How to cite this" block under every chart and inside every claim card,
built at build time from the records themselves, with the format decided by the owner on 4 August
2026 by keeping what was built. What it refused, and what it cost, is under *Completed* and in its
pull request. **The one option deferred rather than refused is recorded under U3**, behind the same
grade decisions its first bullet waits on.

### U3. Trust, in the order they are worth doing

- **The confidence grade renders only on home page cards. APPLIED (PR #137, 5 August 2026).** Every
  figure a theme page declares now carries its grade, its period and the date it was last checked,
  in a disclosure at the foot of the page, built from the page's own `figures:` front matter by
  `lib/provenance.mjs`. **The disclosure is the part that was a judgement rather than a build**, and
  it was measured: open, the block is 2,891px on `/asylum/` at 320px, a quarter of the page; closed
  it is 56px. Say the word and it opens. It is a definition list rather than a table, because a
  table cannot reflow, which is the defect call 29 fixed on the Sources catalogue and would have
  been shipped three more times here. What follows is why the gate was released, kept because it is the reasoning behind the
  measurement above. The three theme pages, where most figures live, show
  neither a grade nor any per-figure date. It had been sequenced behind the open grade questions in
  R2 and A6, on the reasoning that surfacing grades more widely amplifies a wrong one, and **both
  closed without this being released**: A6's confidence convention in PR #79 and R2's accreditation
  question in PR #129. **Measured before releasing it rather than argued**, 4 August 2026: no theme
  page renders a grade today, the only render site being the `grade` span on a home page card, and
  the words that look like grades on `/migration/` are ONS URLs and publication titles. Of the
  records that reach a reader, 13 carry a derived grade, `calculated` or `estimated`, and those are
  the ones a reader will ask about. **The one grade change still open, A1's call 31, is on two
  records that reach no reader**, established through `publishedRefs()` rather than read off an
  entry. `/sources-and-method/#confidence` already defines all four grades, so a grade printed on a
  theme page has somewhere to send whoever meets it. **[me]**.
- **The `metric_name` in the citation block is NOT released with it, and that is deliberate.** The
  block does not say which figure each publication was cited for, and the field that would say it is
  `metric_name`, which appears nowhere in the built site today and carries the grade vocabulary in
  its own text: "Foreign-born share of total UK population, mid-2024 (calculated, provisional)".
  That prints grade vocabulary inside the block a reader copies, which is a different question from
  printing a grade beside a figure, and U2 deferred it here rather than building it. **Releasing it
  as a by-product of the bullet above would be deciding it by omission**, so it stays **[you]**, and
  it is worth seeing rendered before deciding. The place it earns most is
  `/common-claims/nineteen-per-cent-born-abroad/`, where this site's own calculation and the
  Migration Observatory's figure sit in one citation block with nothing saying which produced the
  19%. The mechanism already resolves the records, so building it is small once it is decided.
- **Call 28, the withdrawn-claim stub. APPLIED (PR #137, 5 August 2026), with the wording open.**
  `paused: <date>` in a claim's front matter renders a stub at the same address, keeping the claim
  under its "The claim" label and losing the answer, the figures and the citation. An optional
  `paused_reason` says more where there is one. **THE SETTLED WORDING DOES NOT EXIST IN ANY
  ARTEFACT, verified 5 August 2026 and not merely looked for.** Five places, each with a control
  proving the search would have found something: `git log -S` across all branches, where the only
  hits are the entry that CLAIMS the wording was drafted and this session's own commits; every pull
  request body, every pull request and issue comment and every issue, where a known phrase was found
  as a control and the only hits are this session's PR #137 quoting the site's own promise; all 47
  dangling git objects, where the two hits are this session's own intermediate blobs; `.history/`,
  which holds two copies of `verification.txt` and no match; and the stash, which is empty. The
  phrase "drafted in the session record" refers to a chat transcript that is in no artefact this
  repository can reach. **What shipped is a session's draft**, and replacing the words is a one-line
  edit to `content/_includes/claim.njk` that changes no behaviour. **[you]** to confirm or replace.
  **Pausing clears the twelve-month build error deliberately**, because Netlify runs `npm test`
  before it builds, so left firing it would fail the deploy on the very claim just taken down and
  the state would be unreachable. A printed list names every paused claim instead. Pausing stays a
  deliberate act rather than a timeout: automatic would trade a check that stops a deploy for a page
  that quietly empties itself.
- **A reader-facing `/changes/`.** The changelog IS linked from the corrections section, so the
  promise is kept; the destination is a raw markdown file on GitHub.
- **Theme-to-claim links.** Pages declare `figures:` in front matter, so which claims misuse a
  given figure is computable at build time.
- **Closed here**: no visible door to the data layer, done in PR #105. The whole `data/` directory
  ships with the site and the Reuse section lists every top-level file with a link and a count,
  generated from the directory rather than typed.

### U4. Two decisions, both decided 4 August 2026, both unapplied

- **Call 26. AI crawlers**, and it is not binary. Allow retrieval bots that emit linked citations,
  refuse training-only bots. Retrieval citation is success measure 2's most likely route, and
  blocking keeps the option open where allowing does not. **NOT YET APPLIED, and it gates The
  order's item 13.**
- **Call 27. Structured data**: `Dataset` plus `Organization` and `WebSite`, and **confirm the
  `ClaimReview` deprecation before spending anything on it**. The claim this session could not
  verify is that Google deprecated fact-check rich results in June 2025 and dropped Search Console
  reporting that September. If it holds, the channel is dead. **NOT YET APPLIED.**

### U5. Considered and cut, with the reasoning, so they are not re-proposed

- **Site search.** Seventeen pages, nine nav items, a glossary. A hand-maintained index is a second
  list that rots, which this project has been bitten by twice.
- **A horizontally scrolling nav.** It has the same invisible-scroll defect the review flagged for
  chart regions, and with no JavaScript there is no scroll-state styling to rescue it. **The cut
  stands and its remedy guess was wrong**: the nine labels measure 819px of text and need 979px of
  line length inside a 280px box, so no padding or shorter label reaches one row, and a new pattern
  is what PR #109 built.
- **Converging the varying `last_reviewed` dates.** The variance is the trust model working, and
  the only honest way to converge them is to re-review the pages.
- **A per-page "every figure checked on X" line.** Figures on one page carry different checked
  dates, so X is either stale-looking or false. Every page footer already prints a review date.
- **`llms.txt`.** Nothing consumes it reliably and it is a second statement of what the site is.

### U6. A second round, scoped by what the first one missed

**The [me] half is done (PR #98, 3 August 2026): all 17 pages at 320x568, 360x640, 390x844,
414x896 and 768x1024, with `document.documentElement.clientWidth` checked against the requested
width before anything was believed.** Puppeteer's `setViewport` is
`Emulation.setDeviceMetricsOverride`, so the trap the handoff records does not apply, and pages
come from `.pa11yci.json` so this is not a second list of pages. The script is in PR #98's body
rather than in `scripts/`: it gates nothing and committing it would make a transitive dependency a
direct one.

**What is NOT wrong, recorded so it is not investigated again.** No page overflows the viewport
horizontally at any width, and the result is not masked, nothing in `content/assets/style.css`
setting `overflow-x: hidden` on `html` or `body`. Every nav link clears the 44px rule. Inline links
in prose are covered by WCAG 2.2's target-size inline exception. The dark palette renders correctly
with `prefers-color-scheme` emulated.

**The round found its own premise wrong twice**, which is the point of it: the nav wraps to five
rows at 320px rather than the four the first review calculated, and the stylesheet's one
width-dependent nav rule was dead, being identical to the base rule it appeared to override.

**Two findings were addressed and are under *Completed***: the header taking 55% of the first
screen at 320px, closed by the `details` disclosure in PR #109, and 45% of every chart being
off-screen at 320px, closed by the twice-rendered chart in PR #113. **One is open.**

- **Seven tables overflow at 320px, and two still at 390.** Worst is the Sources table on
  `/sources-and-method/` at 42% hidden, where the second column is sliced mid-word on every row.
  Then `/costs/` at 28% and 17%, `/style-guide/` 13%, `/migration/` 10% and 6%, `/asylum/` 7%.
  **Re-measured 3 August 2026 (PR #115) rather than carried forward, and every figure reproduces.**
  It survived because the paragraph introducing the findings called the chart remedy "what is left
  of U6" while the charts were being fixed, so nothing noticed the table finding was still there.

  **Call 29. APPLIED (PR #138, 5 August 2026).** The Sources table goes from 42% hidden to nothing
  hidden at 320px, and at 641px the table is 601px in a 601px box, so it fits the moment it
  appears. What the decision said, kept because the measurement in it is why the remedy has two
  halves rather than one, follows. Take the floor scoping as a partial
  AND restack the Sources table's rows as definition pairs below 40em. `content/assets/style.css`
  sets an unconditional 224px floor on the first column inside a 280px content box, the same shape
  as the chart floor PR #113 scoped to the wide rendering rather than deleted. **Scoping alone is
  not enough**, measured: the table goes 485px to 386px and the first column 224px to 125px, still
  106px wider than the box, so 42% hidden becomes 27% hidden and it still scrolls. The restack is
  what fixes the worst of the seven; the other six are 6 to 28%, where a scroll container is
  defensible. **The objection that a narrower column pushes the row taller is false**: the first
  data row is 366px tall before and after.

**What this pass did not establish.** It measured geometry in a rendered layout viewport and
nothing else. Whether a reader discovers a horizontal swipe on a chart is a question about
behaviour, and it is the same gap as the screen reader already published as a limit. It did not
test browser zoom or an enlarged default text size.

---

## Blocking launch

**The pre-publication review's corrections all landed 28 July 2026**, 1a to 1i, across PRs #33,
#34, #35, #38 and #54. The review was done on 27 July 2026, worked through the evidence template
in `docs/PRE-PUBLICATION-REVIEW.md`, and its findings are in `verification.txt` at the repository
root, kept out of `docs/` because it uses em-dashes and pound signs the style scan would reject.
**Its outcome was a corrections list, not an approval.** Four claim pages had carried "do not
publish as written" or "substantial revision required", and five of the seven data sections had
carried required corrections. What each correction changed is in its pull request.

**Two of the three closing steps are settled.** The `last_reviewed` question was settled by asking
what the review actually READ rather than which pages had been corrected: ten pages carry
`2026-07-27` and the other six are deliberately left on their older dates, because the review never
opened them and a reader sees the date (PR #54). The pre-launch banner was corrected rather than
removed, because removing it would itself have asserted the third step; it still goes at launch
(PR #54). **The third step is The order's item 12 and is the owner's.**

**How the corrections were tagged**, and it is the mapping this project calls the highest-damage
thing to get wrong: **[you]** marked an editorial or sourcing call only the owner makes; **[me]**
marked a mechanical or factual change against a cited source.

**Then, and only then: remove the robots rule**, which is The order's item 13.

---

## Scoped, not built

**Sections 3 and 5 block launch as of 4 August 2026**, as items 9 and 10 of The order; the rest of
this heading does not. Each has a scope document; read it before starting.

### 3. Release notifier and evidence check: four phases built, phase 4 left

**`docs/UPDATE-AUTOMATION.md`.** Five phases. Phases 1, 1b, 2 and 3 are built, in PRs #43, #46,
#48 and #56; **phase 4 is a reader-facing trust statement and needs the owner's sign-off, so it is
the only one left. [you]**.

**Three things the built phases leave behind**, kept because they bound what the next release run
can do rather than because they are tasks:

- **The notifier cannot notice a release that kept its slug and changed something.** Corrections
  between editions land on the data-tables page, whose change history names the exact table.
  Phase 1b reads that history against the tables records declare, and raises a hit only where the
  figure's own `retrieved_date` pre-dates the correction, so it is stateless and clears itself.
- **The update prompt refuses series work and hands it to a person**, and that costs two of the
  three cadenced releases rather than one, two of the four series files being
  `ho-immigration-stats`. Only the tribunals release runs to completion. That is the accepted price
  of not omitting series work silently.
- **Neither the notifier's issue nor the prompt has been exercised against a real release.** Their
  parts are tested; the whole path is not. The first run should be against a release that was going
  to be checked by hand anyway. The prompt is `docs/prompts/update-from-release.md` and it sends
  the assistant to `docs/UPDATING-DATA.md` for the procedure rather than carrying a copy of it.

### 4. The figures the data layer never recorded. CLOSED (PR #94, 2 August 2026)

Nothing is left of it. `validate-content.mjs` reads a figure written longhand, comma-grouped or
with a scale word, and refuses one that no record or series point holds. **The ratchet ran at
report level from 38 down to zero across eleven steps and the constant is deleted**, each step
under *Completed* with its pull request.

**What it cannot see, which is published on `/sources-and-method/` as a limit**: a figure written
"2 200 000", "two million", "£1.3bn" or "2.2 thousand", and front matter. That gap has one real
instance today, "about 13.1 million" in the born-abroad claim's `short_answer`. Scanning front
matter is not free: `claim:` holds the proposition being corrected and may legitimately carry a
figure the site is arguing against, so it is a decision rather than a widening.

### 5. The undrafted claims

Foundation section 8.5.3 specifies fifteen; ten are written, three of them in PRs #131, #132 and
#133 on 4 August 2026. **One of the remaining five cannot be written**: "Local areas all carry the
same pressure" needs per-capita local authority figures and `data/` holds none. **Four are left**,
and the order they are proposed in is in PR #132.

**Who drafts, decided 30 July 2026.** A session drafts and proposes; the **verdict and the short
answer come to the owner before merge**. The spec in 8.5.3 is a starting position rather than an
instruction: the tagging history marks short-answer writing **[you]** every time it has arisen, and
four of its rows were overtaken by the review on 27 July.

**Three things a drafter should know**, found by doing the first one:

- **`.pa11yci.json` is hand-maintained and does not follow the sitemap**, so a run passes seventeen
  of seventeen with a new page missing from it. Read the pass count against what the build printed.
- **A markdown claim page resolves records and not series points**, so a comparison against a series
  has to point at the chart that shows it.
- **A mirror pair is enforced in both directions.** `validate-content.mjs` requires a reciprocal
  `mirror_of`, which is how the refusal claim is wired to
  `content/claims/refused-asylum-seekers-are-eventually-recognised.md`.

**The direction split is the thing to weigh before writing more.** `validate-content.mjs` counts
parsed files in `content/claims/`, so a direction assigned to an undrafted claim changes nothing;
only a merged page moves the split. It now stands at seven restrictionist to three pro-migration,
off the enforced floor for the first time, which reopens the option of dropping claim 2.7 that
correction 1g found closed. Only one of the four remaining corrects a pro-migration claim.

### 6. The sources page's counts have no check behind them. DONE (PR #68, 30 July 2026)

The five counts on `/sources-and-method/` render from `lib/published.mjs` through a
`published-counts` transform, so **adding a record no longer touches that page at all**. What is
left is one wording call and it is closed:

- **Call 14. The irregular-publisher list stays hand-written. DECIDED 4 August 2026, NO CHANGE
  NEEDED.** Both mechanical options move the maintenance rather than remove it: deriving it means
  either wording it from `data/sources.json`'s names, which read as catalogue entries rather than
  prose, or adding a display name to seven records. **The failure this predicted happened on
  1 August 2026 and was caught** by a comment in `lib/published.mjs` rather than by anything that
  runs: adding a publisher moved the derived count from six to seven above a list naming six.
- **Call 15**, the sentence calling those publishers irregular when two are annual, was reframed
  around the three promised cycles and applied in PR #122.

**Two things on that page are still nobody's to verify**: the release table's cadence column, and
"the most recent full cycle took twenty-seven days", which is a statement about a past cycle that
no session can check.

### 7. The robots.txt prose says the review has not happened. DONE (PR #63, 30 July 2026)

**Found 30 July 2026.** PR #54 corrected exactly this sentence in the pre-launch banner and the
identical claim survived in `content/robots.txt`, which is served publicly, and neither the handoff
nor the prompt knew that file carries prose at all. **The lesson is the entry**: grep the claim,
not the page.

---

## Unmet acceptance criteria, which are still not launch gates

**The distinction matters and is easy to lose.** Foundation section 17 labels only its five *Trust
criteria* as launch gates, and all five are met. But three of section 17's other criteria are not,
and launching with them unmet is a decision rather than an oversight.

- **"Five target users have been spoken to, and what they said is written down."** Open since June.
  Section 18 calls it the cheapest possible way to find out the whole thing is unwanted, and puts it
  at a week. The order's item 14.
- **"Success measures are chosen and recorded." MET, 30 July 2026.** The measure is **candidate 1 of
  section 4.2: cited by a named outlet or briefing within six months**, chosen because 4.2's own
  audience statement names "professionals who need a citation quickly". **Candidate 2, organic search
  entries on definitional queries, is measurable too**, through Search Console, which verifies by DNS
  record, file or meta tag and needs no JavaScript; only candidate 3, return visits, needs what the
  project refused. So set Search Console up at launch regardless. **Open, and small**: whether the
  measure should be published on `/about/`.
- **The two comprehension criteria**, that a reader can explain the difference between immigration,
  emigration and net migration after reading the homepage and glossary, and can see that asylum is
  one part of a wider system. These are not failed; they are **untested**, and cannot be tested
  without the first item above.

## Known gaps, carried deliberately

Genuinely not tasks. Both are published on `/sources-and-method/` under *What the checks do not
establish*.

- **No real screen reader has been run.** Chrome's accessibility tree is what assistive technology
  consumes and is what was read, but it is not VoiceOver or NVDA reading a page aloud. Published in
  PR #61.
- **Prose about figures is unprotected.** Nothing verifies a chart summary describes the data beside
  it. The series citations shrank this and could not remove it, because a citation protects a value
  and not a claim about a value: `at(2018)` under a sentence naming 2019 builds cleanly.

---

## Completed

Kept so that a future session can see what was decided and when, rather than reopening it. **The
reasoning is in the pull request each entry names**, which is durable and does not have to be
maintained here. Newest first.

- **The seven-table overflow**, 5 August 2026. PR #138. Call 29, both halves. The Sources
  catalogue is rendered twice and the page shows one: a definition list below 40em, the table above
  it with its 224px first-column floor scoped to the rendering it belongs to. 42% hidden at 320px
  becomes nothing hidden, and the table fits its box the moment it appears. A definition list
  rather than `display: block` on the table's own rows, which strips the implicit table roles: the
  catalogue would have stopped being a table for a screen reader in order to fit a phone. **What it
  cost was a region nested inside a region**, because the toggle class was first written onto the
  `.scroll-x` div and the transform tests for that class with the closing quote, so the wrapper read
  as no wrapper and the table was wrapped twice, with the build check and pa11y both green. The
  blind spot that allowed it is open work under A5.

- **Grades on the theme pages, and a paused-claim state**, 5 August 2026. PR #137. U3's first
  bullet and call 28. Every figure a theme page declares now carries its grade, period and checked
  date, built from the page's own `figures:` front matter and kept in a disclosure because open it
  was a quarter of the page on a phone. `paused: <date>` gives a claim a stub at its own address
  instead of a 404, losing the answer, the figures and the citation. **Pausing clears the
  twelve-month build error deliberately**, because the deploy runs `npm test` first and the state
  would otherwise be unreachable. Probing it found four things reading did not: the published counts
  stayed overstated, the answer survived on the claims index and the home page, the tab still said
  "Claim checked", and `og:title` would have published the correction the pause had taken down.

- **The LICENCE scope, `og:` tags and two wording calls**, 5 August 2026. PRs #136 and #139. Calls
  18, 19, 21, 23 and both halves of 24's residue. Clause 1 is inverted to everything except the
  figures in `data/` **and the passages quoted from the publications they came from**, that second
  exception being the critique's, since excepting only the figures licensed 120 verbatim publisher
  quotes under MIT. A claim page's `og:title` leads with the correction and never the claim. The
  emigration sentence stops opening at the 2021 trough. The NAO's 76% and 35% are separated into a
  seven-month cost share and a 1 January 2025 headcount, verified in HC 874 rather than from this
  project's own note. The fiscal-impact record's `date` moves from the briefing's publication date
  to the newest study's period end.

- **The three claim drafts and their verdicts**, 4 August 2026. PRs #131, #132 and #133. "Falling
  net migration means the asylum system is shrinking" answered "No", the two series having
  demonstrably moved in opposite directions. "A refusal means the original claim was obviously
  false" answered "Not necessarily", foundation 8.5.3's own wording and the only verdict that does
  not overclaim in the direction its mirror errs, most refusals having stood in all eleven cohort
  years; it is wired as a reciprocal `mirror_of` pair. "The asylum backlog is one number" answered
  "No", leading on one queue published as both people and cases rather than on the stale total. Each
  took the recommendation, so the sentence that shipped is the one drafted.

- **The contact route and the fourth published limit**, 4 August 2026. PR #130. Calls 16 and 20.
  `corrections@ukmigrationexplorer.org` replaces the issue tracker as the only door, in the footer
  on every page, on `/about/` and in the corrections policy. **The mailbox must exist before launch
  and nothing checks that it does.** The fourth limit publishes the corrections-watch candidate,
  written from `check-releases`'s own output rather than from the summary of it, which had
  understated the gap.

- **The born-abroad source and the accreditation wording**, 4 August 2026. PRs #126 and #129. Calls
  8 and 25. **Call 8's premise did not hold and PR #126 is where it was reproduced**: there is no
  census release the briefing summarises, the briefing building the figure itself and saying so, and
  the search that killed the premise turned up ONS's "Census-based statistics UK: 2021", whose table
  UK05 puts 10,724,293 of 66,912,612 usual residents outside the four UK countries.
  **The recommendation could not be built and the reason was never tested before it was made**: ONS
  table UK05 prints country-of-birth cells by sex and age and no totals, so re-sourcing meant writing
  a quote no source states. The record keeps the source that prints its figure and is regraded
  `estimated`, on the precedent of the two ICIBI unit costs, which was in the repository and went
  unchecked. **And "accredited" was corrected in seven rendered places, one more than the six first
  reported**: ONS accredits the England and Wales and Northern Ireland statistics in its census-based
  UK release and states the UK one has "just Official Statistics status, without accreditation".

- **Call 5, the all-immigration share**, 4 August 2026. PR #128. It was not the wording change it
  looked like: no record held 10.8%, and the page's own promise is that a number in a sentence comes
  from one, so it took `migration/asylum-related-share-of-all-immigration` graded `calculated` and an
  evidence entry. **The rounding was checked as an interval rather than at a point**, both inputs
  being rounded to the nearest thousand by ONS, so the true share lies in 10.756% to 10.892%, all of
  which rounds to the published digit.

- **Call 1, the cohort denominator**, 4 August 2026. PR #127. **Recomputed from `Asy_04`'s own rows
  rather than rechecked against a bulletin sentence.** The published rate is grants over grants plus
  refusals; the cohort decomposes exactly into grants, refusals, withdrawals, administrative outcomes
  and outcome-not-yet-known, asserted per year. The page keeps the publisher's measure and now names
  what it divides by and what it leaves out. **The reproduction found a false superlative the decision
  did not name**: the body called the 2020 cohort the highest of any year and 2021 is higher. Both
  round to 80%, so no printed figure moved.

- **The decided wording batch**, 4 August 2026. PRs #122 and #125. Calls 2, 3, 4, 6, 7, 9, 11, 12,
  13, 15, 17 and 36. Call 36 softened `data/evidence/README.md`'s definition of the derived set: a
  derived figure is one this site is not simply copying, which covers reading a band off a chart as
  well as computing. **Two bullets turned out to be right about the defect and wrong about the remedy**,
  and both now say what they turned out to be: call 3's premise did not reproduce, the
  unrecorded-literal ratchet having reached zero, and call 12's had inverted, the records having been
  fixed in PR #104 so that doing what it prescribed was a no-op that would have read as a fix in the
  diff.

- **Branch protection on `main`**, 4 August 2026. PR #124. The `validate` job required,
  `enforce_admins` on, force pushes and deletions off. **Probed rather than read.**

- **Three checks that did not do what the documents said**, 4 August 2026. PR #121. `previous_value`
  is asked of every evidence entry a branch adds rather than only of a figure that moved, keyed on a
  CLAIM rather than a figure because a merged new figure is indistinguishable from a backfill when
  read from the base branch. The Commons Library URLs are checked rather than reported uncheckable,
  by shelling out to `curl` for those hosts: **the headers were not the variable, the protocol was**,
  and Node's own `fetch` returns 403 with any header set. `scripts/check-pipeline.mjs` measures
  `npm run validate` and the CI workflow against one manifest. **The first CI run of the URL route
  found an older defect**: a 403 was being reported as "did not resolve", and obr.uk answers this
  laptop and refuses the GitHub runner, so CI had been calling two live links dead on every run. A
  403 and a 429 are refusals, not answers.

- **U2, the citation handover**, 4 August 2026. PR #118. A "How to cite this" block under every
  chart and inside every claim card, giving the publication, its edition, its tables, the URL as its
  own link text so that select-and-copy needs no script, when the figure was checked, and this site's
  anchor last. **Derived from the publications each figure draws, never typed beside them**, so a
  chart cannot cite a source its own data does not name. The format was the owner's, decided by
  keeping what was built with the alternatives rendered from real data rather than described.

  **The deduplication key was wrong first**, keyed on the URL alone, so one ONS bulletin answered for
  three records that name it three ways and a claim page said a figure was read where it was not. It
  is keyed on name AND URL, with tables merged and the EARLIEST checked date winning. **A literal NUL
  byte made git treat the central file as binary and left the pull request with no reviewable diff.**

- **The mobile navigation**, 3 August 2026. PR #109. A `details` disclosure below 40em, no
  client-side JavaScript, which took the header from 55% of the first screen at 320px to 19% and put
  every page's `h1` above the fold. Wide screens were proved untouched against a build of `main`
  rather than argued to be. **The sibling precedent was not what settled it**: DEBT's collapse needs
  JavaScript, and what carries this is that the reveal idiom was already in this stylesheet's print
  block, guard and all.

- **The narrow chart rendering**, 3 August 2026. PR #113. Each chart is rendered twice at build time
  and CSS shows one, so 45% of every chart being off-screen at 320px is 0% at every size measured,
  with no page overflow and no axis text below the stylesheet's own 11px floor. **One SVG cannot
  serve both widths**: its text is in viewBox units, so scaling 760 units into 280px would render
  17px text at 6.3px. **The first narrow layout put the value labels inside the plot and was
  withdrawn (PR #114)**: the opaque box needed to knock the series out hid three years of data.
  Hiding data to rescue a label is the wrong trade on this site. A second model caught the wide
  geometry being changed where only narrow needed it.

- **The evidence backfill, six batches**, 3 and 4 August 2026. PRs #99, #102, #103, #104, #111, #112
  and #116. Every published record carries evidence, and every reserve record but the calls under
  A1. **Four batches found a record citing a page that is not where its figure lives.** Three
  findings are constraints rather than history: the evidence quotes were extracted from the fetched
  sources by script rather than typed, and each run through the check's own matcher before the file
  was written, because nothing re-checks a backfilled entry at the moment it is written; a superlative
  is a claim about a whole column and has to be tested against one; and a search must be proved with
  a control, "36%" having found nothing in a document printing "36.3%".

- **The `data/` directory gets a visible door**, 3 August 2026. PR #105. The whole directory ships
  with the site, and the Reuse section lists every top-level file with a link and a count, generated
  from the directory rather than typed. **The longest filename pushed the page 54px sideways at a
  genuine 320px viewport**, fixed by wrapping rather than by a scroll container.

- **`check-evidence` re-reads every entry on file**, 3 August 2026. PR #100. Keyed on `declares`, so
  an entry whose figure has since been renamed, dropped or revised is history and is skipped rather
  than failed. **Seven probes, and the two that matter most are the ones that must NOT fire**: an
  entry whose value no longer matches its record, and one naming no record, both pass and drop the
  audited count, which is what distinguishes skipped-as-history from checked-and-wrongly-passed. It
  also found the failure header naming a base branch for an error that has nothing to do with one.

- **`scripts/check-backlog.mjs`**, 3 August 2026. PR #106. Everything else in this repository is
  machine-checked and the file directing all the work was not, which is why it kept rotting. It found
  two live defects on the run that created it. **Two bugs in its count rule were found by testing the
  expression against the defect it was written for rather than by reading it**, and as first written
  it would have passed the sentence it exists to catch.

- **The last three unrecorded figures, and the ratchet reaching zero**, 2 August 2026. PR #94. Three
  figures, three different remedies. `69.28 million` is cited exactly, because the sentence exists to
  say the percentage is this site's own division and a reader can only repeat it if both ends are
  exact. `10.6 million` is declared **for the opposite of the usual reason**: a record is a figure
  this site publishes, and the page exists to tell readers not to use this one. `45,774` got a peak
  record, on the pattern the other peaks set, each carrying an instruction to re-derive rather than
  carry forward.

- **The costs page's four frozen figures are declared**, 2 August 2026. PR #93. `£1.3 billion`,
  `£1.7 billion`, `£4.5 billion` and `£8 million`. **The reasons live in `content/costs.njk`'s front
  matter, above the declaration**, because that is where someone deciding whether to withdraw one
  will be standing. **The cost was known before the decision**: an exemption is permanent and nothing
  re-checks it is still deserved. What makes it acceptable is that the run names every declared
  literal that DOES equal a live value.

- **The costs page's daily rates, two of which were never this site's arithmetic**, 2 August 2026.
  PR #92. The backlog had said all three were annual spending divided by 365 and tagged them
  **[you]**; page 75 of the Home Office accounts states both hotel averages itself. **The page had
  been saying so all along**, in the words "the accounts' own terms". **A tag in this file is a claim
  about a source, and it ages exactly like any other.** The third was genuine and is gone. **A record
  was attempted and abandoned**: the accounts print "£3.0 billion", a record can hold only `3`, and
  `check-evidence` correctly refuses "3.0" as evidence for `3`. **The data layer holds a figure's
  value and not its precision.**

- **The asylum page's four figures, and a sentence that had gone false**, 2 August 2026. PR #91.
  `/asylum/` said "fewer than 7,000 appeals are decided per quarter" and it had been false for three
  quarters. **Nothing on this site could have noticed**: it held no figure any record or series point
  holds. **"Decided" was ambiguous as well as stale**, disposals being 7,799 and appeals determined
  4,088, so the sentence was unfalsifiable until someone chose a meaning. **`51,000` was two
  different queues rounded to the same number**, which is why value-keyed sorting cannot finish this
  kind of job.

- **The net migration fall gives the reader both ends**, 2 August 2026. PR #90. The owner's wording.
  **This remedy is cheap in Nunjucks and costs a record per figure in markdown**: a chart note can
  cite a series point through `at()`, and a markdown page cannot cite one at all, so the route is a
  record declaring `series_ref`. Five records were needed for one sentence.

- **The migration page's records**, 2 August 2026. PRs #87 and #89. Two ONS peaks, a work comparison
  year, and four applicant and dependant splits. **The peaks were verified as maxima, not read off
  the bulletin's word "peak"**: each is the largest of Table 1's 55 year-ending periods and the
  maximum is unique, which the bulletin alone could not establish, and both records say in capitals
  that a maximum is re-derived at every release. **The 47% is deliberately not a record**, ONS
  publishing it, which is the distinction that kept "Down 12%" on the citizenship card. **A defect in
  PR #86 was found by the diff**: `sitemap.xml` emitted URLs in date order, so a fresh clone produced
  the same URLs in a different order and put noise into the diff signal this project verifies almost
  everything by.

- **U1, the three cheap UX items**, 2 August 2026. PR #86. A `content/sitemap.njk`, an id on every
  heading, `theme-color`, and a 404 description that is not the home page's. **The heading finding
  was 14 pages of 17, not the three it named**, and **the `{#id}` idiom was never available on the
  pages the finding was about**: `{#` opens a Nunjucks comment, so writing an anchor into a theme
  page heading fails the build. Ids are derived from the heading's own text instead. **The sitemap
  found five pages hidden by an `eleventyExcludeFromCollections` flag that nothing else reads**, on
  its first run, which is the argument for the check: the two sides come from different places, so
  the comparison is not the same query asked twice.

- **Both glossary launch gates**, 2 August 2026. PR #83. The wording was the owner's. **The Grant
  rate entry stops quoting the cohort range at all**, which closed a window defect and a fifth site
  of a corrected sentence together; it had five factual defects against its own record and a sixth of
  construction. **The Net fiscal impact entry drops "a range that spans zero"** and carries the
  framing its two linked claim pages have carried since correction 1b. **`last_reviewed` is
  deliberately not bumped**: it records what a review read, not when a page was corrected.

- **The small build work: A3, A5's claim-list heading item and R3**, 2 August 2026. PRs #77, #79 and
  #82. Six parts, three pull requests **because two were gated on the A6 confidence convention and
  the gate was real**: landing the `series_ref` comparison before the regrade would have turned the
  branch red and invited whichever regrade made it green. **Five of the six were later found to carry
  a defect of their own**, four of them a comment or message claiming a property the code beside it
  did not have.

- **The £2.1bn hotel figure, re-sourced to the publication that contains it**, 1 August 2026. PR #73.
  Pre-launch audit finding 0-ZERO, and the third launch gate. Both publications were fetched and read
  rather than the audit's quotation of them trusted: the figure is in the Home Office Annual Report
  and Accounts 2024-25, HC 1133, page 75, and the NAO report contains no line where "hotel" meets
  "billion". **The trap it walked into was predicted in a code comment and not by any check**: adding
  a seventh source moved a derived count on `/sources-and-method/` beside a list of names written by
  hand. **A second model found four false claims in the first version of this work**, all written
  while fixing a misattribution.

- **The grant-rate record, corrected against the publisher's own words**, 31 July 2026. PR #72.
  Pre-launch audit item A2. "Latest recorded outcome" appears nowhere in the bulletin. **The false
  attribution had two further homes neither the audit nor this file had noticed**, `docs/foundation.md`
  and `CHANGELOG.md`. **What a second model found is the same defect the item existed to fix**:
  widening the window made the record attribute a 2007 range to `Asy_04`, which is titled 2010 to
  2024 and cannot show a 2007 cohort. **A record that names a source not containing its figure is
  this project's signature failure, and the correction for it committed it.**

- **`docs/UPDATING-DATA.md`, the by-hand update runbook**, 30 July 2026. PR #52. Written before the
  assistant-drafted version, on the rule that you should be able to do a job before you delegate it.
  A real update touches nine record fields and not the four the scope named; the step is reconcile
  rather than look up; record `notes` are re-read every time while page prose is not.

- **The figures the data layer never recorded**, 30 July to 2 August 2026. PRs #51, #55, #57, #58,
  #60, #66, #67, #78 and #81, then #87 to #94. Eleven ratchet steps from 38 to zero. **The rule set
  on 30 July did the sorting**: any figure that changes when its publisher next publishes gets a
  record and a fetched quote, and anything else is reworded or declared as frozen history where the
  prose itself says it is history. **Two shapes are worth carrying**: a figure computed against a
  live value is invisible to every check here, so drop it and give the reader both ends; and
  `historical_literals` is page-scoped, so declaring one figure to protect a sum can un-protect the
  citation above it. **A suppression is the most dangerous three lines in any check here**: three
  lines written to stop one figure being reported twice silenced "3 billion" of anything completely,
  and two self-critiques had read that guard and seen only its precision.

- **The bold link in `most-immigration-is-asylum`**, 30 July 2026. PR #51. Moved off the term and
  onto descriptive text inside the same sentence. It was thought to need the sentence rewritten and
  did not: every word is unchanged.

- **The sources page's five hand-maintained counts**, 30 July 2026. PR #61, then derived in PR #68.
  Every number on the page was wrong. The owner settled the definition that had blocked it: a
  published figure is a record whose ref reaches a reader by any route. **The third published limit
  landed with it**, that no real screen reader has been run.

- **`eu-settlement-scheme-settled-status-grants` brought onto the current release**, 28 July 2026.
  PR #45. It held a year-ending-December figure while every other Home Office figure cited year
  ending March. **Neither existing check could see it**, which is why the notifier's comparison is
  per cited edition rather than per source. First real use of the evidence contract.

- **Citing a series point, and the four figures held twice**, 28 July 2026. PR #41. All three parts
  of **`docs/SERIES-CITATIONS.md`**, which is marked built and kept as the reasoning. The metrics
  that are also series points declare `series_ref` and cannot drift from it; an `at(year)` filter
  cites a series point inside a chart summary; a series value written longhand fails the build.

- **The pre-publication review's nine corrections**, 27 and 28 July 2026. PRs #33, #34, #35 and #38.
  1a to 1i. **1g resolved without changing the site's no-attribution policy**, the review's finding
  being that rebuttal; **dropping claim 2.7 was not available**, pro-migration claims then sitting
  exactly on the enforced floor of two.

- **The update commitment**, signed 23 July 2026. One month from each of the three cadenced releases;
  irregular publishers carry no promised schedule.
- **The foundation drift read**, 23 July 2026. PR #14.
- **The design and accessibility rounds**, 23 July 2026. PR #12.
- **The 37-defect audit list**, 22 July 2026.
