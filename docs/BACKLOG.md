# Backlog

**The durable list of outstanding work.** Every handoff points at this file rather than
restating it, because a handoff gets rewritten each session and a rewrite is where work
quietly falls out. An item leaves this list when it is done, and it leaves by being moved to
"Completed" with a date, never by being deleted.

`scripts/validate-content.mjs` fails the build if a planning document in `docs/` is not
referenced here, so a scope can no longer be written and forgotten. **Since 31 July 2026 it also
fails if any planning document other than this one carries work state**, meaning a table row
marked done, withdrawn or struck. That rule exists because the pre-launch audit built a second
list, the two diverged twice in a day, and this file was briefly edited to say the other one was
live. The resolution did not hold, so it is a build failure now.

Last updated 2 August 2026. The pull request count that sat on this line was stale and is deleted
rather than corrected, which is this project's rule for a count about its own work.

**A whole-project pre-launch audit was written up in `docs/PRE-LAUNCH-AUDIT.md`** and merged as
PR #70. It covers code, data, content, documentation and accessibility, and like the
pre-publication review before it, its outcome is a findings list rather than an approval. It applied
the mechanical half and left every editorial and sourcing call.

**It closed on 31 July 2026 and its document is frozen.** It carried its own action list for a day,
which was the mistake: two lists meant every change had to land twice, and they diverged twice.
Everything still outstanding from it is in this file, under *From the pre-launch audit* below.
`docs/PRE-LAUNCH-AUDIT.md` is now a findings record like `verification.txt`, read for reasoning and
never edited.

**The prompt for a fresh session is generated to `docs/prompts/fresh-session.md`** from the
handoff, so it can be copied without opening a long document. The handoff remains its source
of truth. It sat between the two paragraphs above until 31 July, so "It closed" read as though the
prompt had.

## The order

**The single list of everything outstanding, in the order it needs doing.** Consolidated on
2 August 2026 from the section ordering and the sentence that lived under *Scoped, not built*;
this is now the only place the sequence is stated, so that finishing something cannot leave a
stale instruction somewhere else. The lettered and numbered sections below hold the detail and
the reasoning each entry points at. Items marked **GATE** block launch; nothing else does. A
session takes the first unfinished **[me]** item or **[me]** half; **[you]** items are the
owner's, and a session brings those to him batched rather than starting them. If a session's
first act is to bring the gates rather than to take the first **[me]** item, that is the right
first act.

1. **Both glossary gates are closed (PR #83, 2 August 2026).** The Grant rate entry no longer
   quotes the cohort range at all, which removed the fifth site of a sentence corrected at four
   others, and the Net fiscal impact entry carries the framing its two linked claim pages have
   carried since correction 1b. The numbers 1 and 2 are collapsed into this one entry rather than
   left as empty rows; *The launch gates, in detail* keeps their numbering so nothing renumbers
   silently.
2. **The six pages the pre-publication review never opened**, put through
   `docs/PRE-PUBLICATION-REVIEW.md`. Recommended before signing the review as passed, because
   both glossary gates sit on one of the six and two independent passes reached it separately.
   **The [me] half is done (PR #76, 2 August 2026)**: the evidence is in
   `docs/PRE-PUBLICATION-REVIEW-SIX-PAGES.md`, which sets every figure and every claim about a
   figure on those six pages beside what the data layer holds, and leaves the checkboxes
   unticked. It carries no findings and no severities, deliberately. **The verdicts are [you]**,
   and are all that is left of this item.
3. **The reader-facing wording batch, taken in one sitting**: everything under A4 and R1
   below, plus the two sources-page wording bullets at the end of item 6. All **[you]** calls;
   applying what is decided is **[me]**. None gates launch, and every one is cheaper before
   the site has readers.
4. **The decisions that change what launch publishes**: whether `.netlify.app` is the launch
   domain, the LICENCE scope, which pipeline `check-evidence` and `a11y` gate, the contact
   route that is not a GitHub account, whether a fourth limit is published and which, whether
   the success measure goes on `/about/`, and the rest of A6. All **[you]**; the applying is
   **[me]**. The domain comes first among them, because it changes the URL anyone cites.
5. **Talk to five target users.** A week, in parallel with everything above, and the one
   acceptance criterion foundation section 18 says can save the whole build. The two
   comprehension criteria are tested by this and by nothing else. **[you]**.
6. **GATE. Record the review as passed in `CHANGELOG.md`**, after the six-page checkboxes above,
   the glossary gates behind them now being closed. **Its scope was decided on 2 August 2026: all
   sixteen pages, not the ten the review read.** Worth knowing
   before signing: the review's own selection criteria failed 2.6 and 2.7, and both were kept
   on the site's published no-attribution policy, so signing backs that policy over the
   reviewer's criterion. **[you]**.
7. **GATE, and deliberately last. Launch**: delete `content/robots.txt` and its guard in
   `scripts/check-build.mjs`. **The UX review says write that file rather than only delete it**,
   which is the one place that review touches a gate, and it is now the only part of U1 left.
   **The sitemap it wanted beside it is built** (PR #86), so what is outstanding is the file
   itself plus the `Sitemap:` line pointing at it, and **what it says is gated on U4's
   AI-crawler decision**, which is **[you]**. Then set up Search Console, which costs nothing,
   needs no JavaScript, and is how success measure 2 would be noticed. **[me]**, on the owner's
   word.
8. **The UX review, U2 to U5 below.** None of it gates launch. **U1 is done** (PR #86,
   2 August 2026) apart from the `robots.txt` half, which is in the gate above. U2 is the
   citation handover and is the one worth arguing for, U3 is five trust items, and U4
   is two **[you]** decisions that block any work on them, one of which the gate above now
   waits on. U5 records what was considered and cut, so it is not proposed again.
9. **A1, traceability at the far end**: decide the backfill scope **[you]**; fetch the sources
   and write the `data/evidence/` entries **[me]**; then land the reverted regrade check, in
   that order, fetch first, because the other way round forces a fabricated quote. And re-read
   or drop `asylum/small-boat-arrivals-2026-year-to-date`, whose own notes forbid publishing
   it unchecked. **[you]**.
10. **R2, the three source observations from the far-end trace.** **[you]** for the grades and
    scope; the fetching is **[me]**.
11. **Item 4 below, the figures the data layer never recorded.** The rule for these was set on
    30 July and item 4 states it, so this is **[me]** under that rule rather than gated on a
    per-figure call: a figure that changes when its publisher next publishes gets a record and a
    fetched quote, and only the genuinely ambiguous ones come back. **This line said the scoping
    was [you] until 2 August 2026**, which contradicted the rule four paragraphs below it and
    would have stopped a session taking work that was never gated. Several sessions, not one.
    The citizenship card's three landed as PR #78, the migration page's two ONS peaks and its
    work comparison year as PR #87, its four applicant and dependant splits as PR #89, and the
    owner's rewording of the three year-on-year falls as PR #90, and the asylum page with its
    accommodation claim page as PR #91. **Four pages are finished**: none of them now writes a
    figure the data layer does not hold. **What is left is ten figures and all of them are
    [you]**, on `costs.njk`, the born-abroad claim page and one dashboard card: three daily rates
    divided from live values, four figures the prose itself calls history, two restatements of a
    live value at a different rounding, and one peak. They are itemised under item 4 below and
    need decisions rather than sources.
12. **Item 3's last phase**: rewriting what the sources page says about automation. **[you]**
    sign-off, no build behind it.
13. **Item 5, the eight undrafted claims**: a session drafts, and the verdict and short answer
    come to the owner before merge. Only the pro-migration draft moves the direction split off
    its floor.
14. **A real screen reader over the pages** **[you]**, then A5's `aria-describedby` change
    that is gated on it **[me]**. It is also the published limit most worth closing.

If you reorder, or complete something, **move the entries and renumber** rather than adding a
sentence explaining that the order is not the order. That trap was set once, on 28 July 2026,
and a fresh session following the instruction would have taken the wrong item.

### The launch gates, in detail

**All of them are mine.** The count that stood at the head of this sentence is deleted rather
than decremented, which is this project's rule for a count about its own work:

1. **`content/glossary.md`, the Grant rate entry. DONE (PR #83, 2 August 2026)**, and under
   *Completed*, where the wording decision behind it is recorded. The number is kept so that gate 2
   is not silently renumbered.
2. **`content/glossary.md`, the Net fiscal impact entry. DONE (PR #83, 2 August 2026)**, and under
   *Completed* with gate 1. The number is kept for the same reason.
3. **`fiscal/home-office-spending-on-asylum-hotel-accommodation` cited the wrong source.
   DONE (PR #73, 1 August 2026),** and under *Completed*, where what it found is recorded. The
   number is kept so that the two gates above are not silently renumbered.

**And one that is not a gate but changes what the review's sign-off means.** Both glossary blockers
sat on a page `verification.txt` never opened. The review read ten of sixteen. **The scope of the
signature was decided on 2 August 2026: it covers all sixteen, and is given after the checkboxes in
`docs/PRE-PUBLICATION-REVIEW-SIX-PAGES.md` are worked.** The reasoning is that the promise on
`/sources-and-method/` does not distinguish ten pages from sixteen, so a signature scoped to ten
would leave a scope silence about this site's own review, which is the thing it criticises in
others. Both glossary gates were on one of the six, so resolving them was most of that work; what is
left of it is the reading.

---

## From the pre-launch audit, closed 31 July 2026

**The audit is closed and `docs/PRE-LAUNCH-AUDIT.md` is frozen.** It is the findings record, like
`verification.txt` is the review record, and it is not edited again. Everything still outstanding
from it is here, in this file's format, because this file is the one work list and the audit's
parallel one is what made a long session unmanageable: 23 of its 33 commits went to maintaining that
document rather than doing the work.

The launch gates it found are named at the top of this file. These are the rest.

### A1. Traceability was never checked at the far end

Every check verifies a figure NAMES a source. Nothing verifies the source CONTAINS it. Opening five
publications during the audit found three defects, one of them a headline figure on the home page.

- **Backfill `data/evidence/` for every reader-facing record**, or accept in writing that
  traceability is unverified for the records predating the evidence contract. Those never get asked,
  because `check-evidence.mjs` fires on a value that moved or a figure that is new and most have done
  neither. **[you]** to decide the scope; the fetching is **[me]**.
- **Fire `check-evidence.mjs` on a `confidence_level` change into the derived set.** Written and
  tested on 31 July; it correctly failed on `asylum-administrative-outcomes` and was reverted. The
  ordering matters and doing it the other way forces a fabricated quote: **fetch Asy_D02, write the
  evidence entry, then land the one-line change.** **[you]** for the fetch.
- **Re-read or drop `asylum/small-boat-arrivals-2026-year-to-date`.** Its own notes say "Do not
  publish without re-checking" and it was 43 days stale. It is unpublished reserve, so no reader sees
  it, which is why this is not a gate. **[you]**.

### A2. The corrections to the grant-rate record. DONE (PR #72, 31 July 2026)

Nothing is left of it, so it is under *Completed*, where what it found is recorded. The letter is
kept here rather than closed up, because A3 and A5 are referred to by letter from the ordering
sentence and renumbering five headings to save one line is how a reference goes stale.

### A3. Checks worth hardening, none of them urgent

All **[me]**, all small, each with its reasoning in the audit.

- **The success message. DONE (PR #77, 2 August 2026).** It claimed no page writes a live value
  longhand while four sat on `/sources-and-method/` under a `historical_literals` exemption. The
  word `UNDECLARED` is now in the sentence, and the run names every declared literal that does
  equal a live value, so the exemption cannot grow in silence. The count is not written here: it
  is what `npm run validate` prints, and the audit's four were four again on the day this landed
  only because the run was asked rather than the audit quoted.
- **Notes restating another record's value. DONE (PR #77, 2 August 2026).** `validate-data.mjs`
  now reports every one, naming both records, so an updater moving a value is told which notes to
  re-read instead of being asked to remember. Reported and never failed, because some are
  coincidence. **The count the audit gave is deliberately not repeated here**, for this project's
  own rule about counts: the run prints a different number, the scan is word-bounded where the
  audit's was not, and correcting a count in a second place is how two lists start.
- **`check-evidence.mjs` rejected a quote whose value is followed by a full stop or a comma.
  DONE (PR #82, 2 August 2026).** Found by writing one. **This bullet's own headline said "cannot
  accept a quote that ends on its value" until a second model tested the guard rather than reading
  the message**: a quote ending ON the bare value always passed, because the lookahead succeeds at
  the end of the string. The trailing guard now asks whether the punctuation SEPARATES or CONTINUES
  the number: a digit is refused, and a comma or full stop only where a digit follows it. The
  leading guard is deliberately untouched, because a comma before the digits is a thousands
  separator in every real case and loosening it would let `1,313` answer for `313` again. Ten cases
  tested against the old and new boundary side by side, and the whole check exercised in place with
  a real changed value, in both directions. The
  guard is right to exist, it is what stops `1,313` answering for `313`, and the remedy the
  message gives does work, so this fails safe and is small. But a table cell at the end of a
  sentence is the most natural quote an author writes, and the fix is to reject a following digit,
  and a comma or full stop only where digits follow it, or `"71,083, and"` stays broken too. **[me]**, with a negative test in both
  directions.
- **The `series_ref` comparison beyond `value`. DONE (PR #79, 2 August 2026).** It compares
  `value`, `unit` and `confidence_level` now, and the run names the fields rather than saying the
  two "agree". `lib/series.mjs` had dropped `confidence_level` when projecting a point, so the
  check could not have asked even if it had wanted to. **The regrade went first, deliberately**:
  landing the check against the old grades would have turned the branch red and invited whichever
  regrade made it green, which is the ordering mistake `check-evidence` already taught this
  project once. Negative-tested on all three fields and in both directions.

### A4. Reader-facing wording, all of it yours

Each is a sentence, and each is **[you]** because it is wording.

- The refused-asylum short answer says "ended without a grant" where the page's own body says "had
  not ended in a grant by its latest recorded outcome". The short answer makes the move the page
  criticises.
- The dashboard's net-migration card says the fall was "on work and care visas"; the record it cites
  is an ONS reason grouping, and `migration.json`'s own note says the two sources are not
  interchangeable.
- `/sources-and-method/` promises every number in a sentence is inserted from a record. The
  unrecorded-literal report prints 31 that are not. Qualify the promise, or finish item 4 first.
- Whether to cut "the two longest and most pointed checks on this site both run against the
  pro-migration side" from `common-claims.njk`. **Recommended: cut.** It is true by a twenty-word
  margin, "most pointed" is unfalsifiable, and the page's credibility rests on not doing that.
- Whether `most-immigration-is-asylum` should state the all-immigration share, 10.8%, beside the
  non-EU+ 14%. The smaller figure strengthens the correction and closes a denominator gap.
- **Whether `Asy_D04`'s notes 4 and 5 belong on the refused-asylum claim page as well as in the
  record.** Audit finding 0A-ter left this **[you]**, calling it a judgement about how much caveat a
  reader can carry rather than a correction, and **it existed only in the frozen audit until
  31 July 2026**, which is the way work falls out that this file exists to stop. The record half
  landed with A2, PR #72, so the reader-facing half is all that is left: the page argues from that
  table and does not tell a reader the publisher dates its outcomes to January 2026 or that appeals
  data was not loaded for the release. **Do not infer a direction from note 5**; 0A-ter withdrew a
  blocker for doing exactly that, and opening the table refuted it.

### A5. Site-level decisions and small build work

- **Add a contact route that is not a GitHub account.** The corrections policy depends on people
  reporting errors, and the only door is an issue tracker. Cheapest item on this list. **[you]** for
  the address.
- **Make `check-evidence` and `npm run a11y` gate the Netlify deploy**, or state in the README which
  pipeline each gates. They gate CI only; the README says "gates the build". **[you]**.
- **Scope the LICENCE** to cover `content/` and `lib/`, or invert it so it covers everything except
  the figures in `data/`. Neither clause currently names the site's own prose. **[you]**.
- **The claim-list heading level. DONE (PR #77, 2 August 2026).** Home page cards sit at `h3`
  under the `h2` that introduces them; the claims index keeps `h2`, where the cards sit directly
  under the page `h1`. **Nothing was parameterised**, which the wording of this bullet assumed:
  the two pages inline their own markup and a comment on the claims index says the difference is
  deliberate, so there is no component to give a level to. The style rules take both levels
  instead, so the CSS is not what decides the heading. Proved by diff: two built files changed,
  the home page and the stylesheet, and nothing else.
- Point `aria-describedby` at the visible chart summary instead of duplicating it into `<desc>`.
  **Gated on a real screen reader**, which this project has never run, so it is **[you]** first.

### A6. Decisions with no build behind them

Each is one call. None blocks anything.

- **The confidence convention. DECIDED 2 August 2026: the metrics win, and the grade follows the
  source rather than the vintage.** Every ONS LTIM series point becomes `provisional`, matching the
  eight metrics and `meta.json`'s own definition, which names ONS net migration as its example of
  `provisional`. `ons_marker` becomes the single home for the publisher's per-vintage marker and
  goes onto both ONS series; the prose that duplicates it goes. **Reasons, in the order they
  weighed:** grading the vintage would make `confidence_level` and `ons_marker` carry the same
  information in two fields, which is the one-figure-one-home problem in a different guise;
  `official` is defined as provenance, so using it to mean "not provisional" is a meaning its
  definition does not carry, and the discontinued IPS block already grades by source character at
  `estimated`; and under this convention the grade stops moving on every release. **Nothing a
  reader sees changes either way**: a point's `confidence_level` renders nowhere, the only render
  site being the dashboard card, which reads a metric. **APPLIED (PR #79, 2 August 2026)**, with
  the two bullets it gated, and the built site proved byte-identical by diff.

  **It moved 39 points, not the 26 this entry said when the decision was recorded.** The count was
  typed from a query that summed the two `data` arrays and never asked about
  `migrationFlowsTimeseries`'s `emigration` companion, which holds 14 more. It is corrected here
  rather than deleted, because unlike a count about the project's own work this one is a
  derivable fact about a finished change, and the miss is the more useful half: **a query over a
  series file that does not ask about its companion block is under-counting by a third**, and
  `lib/series.mjs` exists precisely so that nothing has to remember the companions.
- Whether `og:` tags should exist, and whether a claim page's `og:title` leads with the claim or the
  correction. Foundation 8.5.4's rejection of a share image is not reopened by this.
- Whether `.netlify.app` is the launch domain, given the success measure is citation by a named
  outlet.
- Whether `/sources-and-method/` publishes a fourth limit, and which of the three candidates.
- Whether the emigration sentence names the 2019 peak or lets the chart carry it.
- Whether the claim card's duplicated review date stays: it prints once in the card and once at the
  foot of `<main>`, and each is individually justified.
- Whether to be more precise than the NAO about the 76% being a seven-month cost share while the 35%
  is a point-in-time headcount.
- Two OWNER-VERIFY residues: whether the Asy_D02 pivot prints a year-ending total, and the `date`
  field on the fiscal-impact record plus the 47% in the work-immigration notes.

---

## From the launch readiness review, 2 August 2026

**The review is written up in `docs/LAUNCH-READINESS-REVIEW.md`**, a findings record carrying
no work state, on the same terms as the audit's. Seven review dimensions plus a far-end source
trace; 44 findings confirmed by an adversarial verification pass and three refuted by it. The
mechanical half landed with the PR that opened it, including both blockers, and all seven
checks were green after. **All eight home page figures were verified against their live
sources with verbatim quotes.** What is left is below. None of it gates launch on this
project's own definition; each item is cheaper before the site has readers.

### R1. Reader-facing wording and grading, all of it yours

Each is **[you]** because it is wording, a grade or a sourcing call.

- **The costs page presents the £2.1bn hotel figure inside the NAO's £3.4bn** ("These figures
  are nested, not parallel") while the record's own notes say the nesting is this site's
  construction and neither publisher places one figure inside the other. Say so on the page,
  or un-nest the table.
- **The Born abroad card grades a Migration Observatory briefing figure `official`**, a grade
  the sources page defines as "taken directly from an official published release". The
  underlying figure is the 2021/22 Census; the cited source is a university briefing. Regrade,
  or re-source the record to the census release it summarises.
- **Returns are an unstated scope silence.** The data layer holds five returns records,
  including the 39,007 enforced-plus-voluntary total, and no reader-facing page shows any of
  them except port refusals inside a caveat, while *What this site does not cover* does not
  name the omission. The site's own published principle is that scope silence is
  indistinguishable from bias. Surface them or declare them; the current state is the one
  option that principle rules out.
- **Every claim page h1 is the bare false claim**, so a screen reader user navigating by
  headings, or hearing the claims index read as a links list, meets the site asserting the
  sentence it corrects. The browser tab already says "Claim checked:"; whether the same
  qualifier belongs in the visible heading or the accessible name is a design call about the
  card.
- **The 404 page says the glossary "defines every term the site uses"**, and non-EU+ has no
  entry while appearing on four pages. The entry is the better fix than softening the
  sentence: the definition already exists word for word on three pages and wants one anchor.
- **The two fee records assert `period_label` "2024"** while the costs page beside them says
  the cited briefing does not state which twelve months it covers. This is the record half of
  audit finding K4, whose prose half landed with the review.
- **`docs/PRE-PUBLICATION-REVIEW.md` section 3 still instructs a reviewer** that the
  unit-qualified warnings were all reviewed as coincidences, a judgement the handoff records
  as refuted: three were live values restated longhand. It is the template future reviews work
  through, so correcting the instruction is a change to a document the owner signs.

### R2. From the far-end trace, three source observations

- `asylum/small-boat-arrivals-calendar-year-2025` is graded `official` and its notes call it a
  finalised calendar-year total, while the publisher prints the year only as four quarterly
  cells to be summed and states no calendar-year total. The site's own convention for a summed
  figure is `calculated` with the components quoted. **[you]** whether the grade or the note
  moves.
- **Two figures in the citizenship card's prose, 269,178 and 312,063. The [me] fetching half is
  DONE (PR #78, 2 August 2026), and this observation was right.** Neither is on the page the
  record cites. That page states the 12% decrease behind 269,178, and for 312,063 it states neither
  the figure nor its change: it carries no applications figure and no "18%" anywhere, which a
  second model established and this entry got wrong by generalising from the half it had checked.
  Both are in **table Cit_01 of the Home
  Office citizenship summary tables**: 269,178 is total grants for the year ending March 2025 and
  312,063 is total applications for the year ending March 2026. 269,178 now has a record and the
  card cites it. **312,063 has none deliberately**: no page publishes it, so the rule below gives
  it a note naming its table rather than a record. **The fetch found two more of the same shape**,
  the superseded year ending December 2025 values in the citizenship and settlement notes, and the
  current edition revises that period rather than reproducing them. **Both notes now say so, and
  this bullet is closed.** The settlement half was tagged **[you]** for a day only because the
  settlement tables had not been fetched: once they were, the parallel turned out to be exact and
  the change became a factual one against a cited source. **Decided 2 August 2026: a superseded
  figure keeps its sentence and gains the current edition's revised value**, because the sentence
  exists to say the old figure is no longer re-derivable and only the revised value shows that.
  `CHANGELOG.md` remains the home for what the site used to publish; the note is about the source.
- The NAO's landing page prints £4.0 billion, its direct-support figure, and the £4.9 billion
  this site cites is inside the PDF it links. A reader who follows the source link and does
  not open the report meets a different number first. Whether the record's notes should say so
  is **[you]**.

### R3. Small build work, none urgent, all [me]

- **The three metric value maps. DONE (PR #77, 2 August 2026).** They were last-write-wins where
  two records share a value form; all three now hold a list, the way the series map already did,
  and every message names every candidate. **It was live rather than latent**: the warning on the
  home page card whose own sentence says "Pakistan" named the non-British population share
  instead, because that theme file is read after the asylum one and the map kept whichever came later. Two warnings now name two records each.
  Negative-tested by giving two records one value and writing it out on a page: the error names
  both and offers both citations, where before it offered one and the choice was read order.
- **The two ONS series files' revision markers. DONE (PR #79, 2 August 2026).** A6 picked
  `ons_marker`, the machine-readable one, and the regrade made it the only home for the vintage.
  **It was in three places, not the two this bullet said**: `ons_marker` on netMigration's marked
  points, a per-point prose note "Flagged R (revised) by ONS." on the marked migrationFlows points
  in both its arrays, and a file-level sentence in that file's note naming which years are marked.
  The four prose notes became `ons_marker`, in the same position netMigration already put it, and
  the file sentence is deleted. The remaining revision prose in netMigration's note is **kept**: it
  says the November 2025 method change revised the whole pre-2024 series, which is context rather
  than a restatement of a marker.

---

## From the UX review, 2 August 2026

**A UX, SEO and trust review of the built site**, critiqued by two independent passes, with every
factual claim verified against the repository and the built output before landing here. It found
nothing that gates launch. **Six claims in the review's first draft were wrong and are recorded as
corrections rather than quietly dropped**, because the shape recurs: most of the six asserted that
something was ABSENT from the site after checking a single page, and it was present on the others.

Nothing here duplicates the backlog. That was checked in both directions, and the UX items already
tracked stay where they are, under A5, A6 and R1.

### U1. Cheap, uncontested, all [me]. DONE (PR #86, 2 August 2026), except the half that is the gate

Nothing is left of it but the `robots.txt` sentence in the first bullet, which is inside launch
gate 7 and stays there. What was built is under *Completed*, where the two things it found are
recorded.

- **No `sitemap.xml`. DONE.** `content/sitemap.njk` renders every built page but the 404 from
  `collections.all`, and `check-build.mjs` compares it against the pages the build wrote, in both
  directions. **The launch `robots.txt` still needs writing rather than only deleting**, which is a
  **divergence from the launch gate as written**: the gate says delete the file, and the line that
  points at the sitemap has to be written into it. That half is not taken here, because what
  `robots.txt` says is gated on the AI-crawler decision in U4 and because writing it is launch.
- **No heading carries an id on a theme page. DONE**, and it was 14 pages of 17 rather than the
  three the finding named. `heading-anchors` derives an id from the heading's own text where none
  is declared, so a page added later cannot arrive without one.
- **`theme-color` is absent, and the 404 description is not unique. DONE.** Two `theme-color`
  metas, one per scheme, and a `description` front-matter field the 404 uses so it no longer falls
  through to the site strapline.

### U2. The citation handover, and it is one item rather than two

The chosen success measure is citation by a named outlet within six months, and the audience
statement is professionals who need a citation quickly. **The citation such a reader needs is to
the Home Office or ONS publication, not to this site**, which is what makes this worth building
rather than a nicety.

There is no citation string anywhere on the site, and **no rendered link points at the figure ids
that already exist**. Of 180 `source_url` values, 62 are spreadsheets and 38 are dataset pages, but
**zero spreadsheet links render**, because those URLs sit on series points that emit no link.

Shape, with no JavaScript and nothing new in the data layer: a `details` block under each chart's
existing source line, rendered at build time from fields the records already hold, giving
publisher, edition, table, the spreadsheet link labelled as a download, "via UK Migration Explorer,
checked [date]" and the anchor URL. Select-and-copy needs no script once the text exists. On a
claim page it belongs inside the card boundary, so that a screenshot carries it. **[me]** to build,
**[you]** for the citation format.

### U3. Trust, in the order they are worth doing

- **The confidence grade renders only on home page cards.** The three theme pages, where most
  figures live, show neither a grade nor any per-figure date. **Sequence this after the open grade
  questions in R2 and A6**: surfacing grades more widely amplifies a wrong one.
- **There is no withdrawn-claim state.** `/sources-and-method/` promises that a claim unreviewed
  for twelve months is taken down until it has been. On a static site, deleting the file turns a
  URL built to be screenshotted into a generic 404, which reads as scrubbing. A stub at the same
  URL, saying what it said and why it is paused, is the missing state. **[you]** for the wording.
- **A reader-facing `/changes/`.** The changelog IS linked from the corrections section, so the
  promise is kept; the destination is a raw markdown file on GitHub.
- **No visible door to the data layer**, which foundation 4.1 names as the differentiator. The
  Reuse section says the data files are public and links none of them.
- **Theme-to-claim links.** Pages declare `figures:` in front matter, so which claims misuse a
  given figure is computable at build time.

### U4. Two decisions, both [you], both needed before any work

- **AI crawlers, and it is not binary.** Retrieval bots that emit linked citations serve discovery;
  pure training bots serve neither success measure. A `robots.txt` can allow one and refuse the
  other. **Blocking now keeps the option open; allowing and then blocking does not.**
- **Structured data.** `Dataset` plus `Organization` and `WebSite` are the candidates.
  **`ClaimReview` was proposed and then downgraded on a claim this session could not verify**: that
  Google deprecated fact-check rich results in June 2025 and dropped Search Console reporting that
  September, with eligibility restricted to established fact-checkers before that. If it holds, the
  channel is dead and the no-attribution tension the first draft was built around was never the
  blocker. **Confirm before acting either way.**

### U5. Considered and cut, with the reasoning, so they are not re-proposed

- **Site search.** Seventeen pages, nine nav items, a glossary. A hand-maintained index is a second
  list that rots, which this project has been bitten by twice.
- **A horizontally scrolling nav.** It has the same invisible-scroll defect the review flagged for
  chart regions two items later, and with no JavaScript there is no scroll-state styling to rescue
  it. Nine flat items wrap to about four rows at 320px by calculation, unrendered; measure before
  deciding, and the likely answer is tighter padding rather than a new pattern.
- **Converging the varying `last_reviewed` dates.** The variance is the trust model working, and
  the only honest way to converge them is to re-review the pages.
- **A per-page "every figure checked on X" line.** Figures on one page carry different checked
  dates, so X is either stale-looking or false. Every page footer already prints a review date.
- **`llms.txt`.** Nothing consumes it reliably and it is a second statement of what the site is.

---

## Blocking launch

### 1. The pre-publication review: corrections all landed 28 July 2026, closing steps outstanding

The review was done on 27 July 2026. It worked through the evidence template in
**`docs/PRE-PUBLICATION-REVIEW.md`**, and its findings are recorded in `verification.txt` at the
repository root, kept out of `docs/` because it uses em-dashes and pound signs the style scan
would reject.

**Its outcome was a corrections list, not an approval,** and as of 28 July 2026 every correction
on it, 1a to 1i, has landed. Four claim pages had carried "do not publish as written" or
"substantial revision required" (2.2, 2.3, 2.6, 2.7); five of the seven data sections had carried
required corrections (2, 3, 4, 5, 7).

**Of the three closing steps, two are settled and one is the owner's still.**

1. **The `last_reviewed` question. DONE (PR #54, 30 July 2026).** Settled by asking what the
   review actually read rather than which pages had been corrected. `verification.txt` has
   fourteen headings, Sections 1 to 7 and Parts 2.1 to 2.7, which map to `asylum.njk`,
   `costs.njk`, `migration.njk` and the seven claim pages. **Those ten** carry
   `last_reviewed: 2026-07-27`. The other six are deliberately left on their older dates,
   because the review never opened them and `base.njk` prints the date to a reader. An earlier
   recommendation to stamp all sixteen was wrong for exactly that reason. The claims index shows
   a per-claim date and all seven now agree, which was the reader-facing part of this. Two
   residues kept on purpose: four claim pages corrected on 28 July show 27 July, with their
   landing dates in `CHANGELOG.md` where a landing date belongs, and the claims index footer
   reads 23 July beside cards reading 27 July, which is honest rather than tidy.
2. **The pre-launch banner. Corrected rather than removed (PR #54, 30 July 2026).** It said the
   review "has not happened yet", false on every page since 27 July, so this was a live defect
   and not a launch chore. Removing it would itself have asserted step 3, which is not decided,
   so the sentence now says the review was done, its corrections landed, and it has not been
   recorded as passed. **The banner still goes at launch.**
3. **Record the review as passed in `CHANGELOG.md`. Deferred 30 July 2026, and still the
   owner's.** Worth knowing before signing: the review's own selection criteria failed 2.6 and
   2.7, and both were kept on the strength of the site's published no-attribution policy, so
   signing backs that policy over the reviewer's criterion.

The review happening is not the review passing, and neither is the corrections landing: someone
still has to decide the pages now pass.

**How the corrections were tagged.** **[you]** marked an editorial or sourcing call only the owner
makes; **[me]** marked a mechanical or factual change against a cited source. Every changed or new
figure needed a fetched source and a verbatim quote before it was written, per the project's
no-AI-claims-without-source rule. That rule earned its place again: see the handoff for the three
figures the review asserted that the sources did not carry, and the two the review got right that
looked wrong until the primary tables were opened.

**1a. DONE (PR #33, 27 July 2026). "19% born abroad" (Part 2.6): the data has moved. [you + me, data].** ONS now publishes a
foreign-born estimate through a rolled-forward census method: 13,115,000 non-UK-born in June 2024,
which against the mid-2024 population of 69,281,400 is 18.9%. It is a provisional official
statistic in development, not an accredited figure, and there is no 2025 or 2026 estimate yet, but
it means the claim's premise, that no official figure has existed since ONS discontinued the
series in 2022, is now false, and the reviewer says the claim fails in its present form and is no
longer sufficiently false to debunk. The reviewer's two options are to reframe it as debunking the stronger claim that the
figure is exact, current or accredited, or to convert it into an explanatory fact-check on the
provisional mid-2024 estimate; dropping the page is a third option that is the owner's alone:
**[you]**. Then update `population.json`, `meta.json` and `dashboard.json` with the new figures,
replace "one census run on two dates" with the three-jurisdictions wording, and remove the
now-superseded "has risen since" inference: **[me]**. This supersedes the 16% tokenised in
PR #30, which becomes 2021/22 census context rather than the headline. (2.6 fails selection not
for want of a circulation example but because it is no longer sufficiently false to debunk.)

**1b. DONE (PR #34, 27 July 2026). The "range spans zero" reasoning (Parts 2.2, 2.3): statistically invalid. [me, rebuild
you].** The plus or minus 1% of GDP figure is the magnitude of separate pre-Brexit studies, not
an uncertainty interval around one estimate, so "that range spans zero" must be deleted from both
pages. Also remove "and rising" from the £4.9 billion asylum figure, since direct support
spending actually fell from about £4.7 to £4 billion; relabel that figure an NAO estimate rather
than "audited"; and give the OBR's £341,000 figure its full conditions, an average-wage worker
arriving at 25 with no dependants and staying to 80. Rebuilding each short answer around scope
and definitions is **[you]**. Two mechanical fixes ride alongside: re-date the stale "studies
reviewed to October 2024" metadata to the June 2026 briefing on both pages, and apply the
reviewer's specific replacements ("Across academic studies" becomes "Across the pre-Brexit static
studies summarised by the Migration Observatory", and similar) **[me]**.

**1c. DONE (PR #35, 27 July 2026). Costs page (Section 4): mis-dated and mis-sourced. [me, data + fetch].** The £158 hotel rate
is based on the three months to June 2023, not 2024; the £20 dispersal figure is approximate
("around £20"). Both were cited in a Home Office business case in April 2024 and come from the
ICIBI inspection at paragraph 5.14, not the 2025 NAO report the chart attributes. Re-date (title:
figures cited in April 2024), re-source, mark both approximate, and add the June 2025 comparison,
£144.98 and £23.25. Two framing corrections too: "price of a bed" is too narrow (these are
accommodation costs under Home Office arrangements), and "accommodation type is the main driver"
is too absolute (volume and mix both matter; the NAO evidence is that hotels housed about 35% of
people but 76% of contract spending). Fetch and quote the ICIBI and June 2025 figures first.

**1d. DONE (PR #38, 28 July 2026). Category, basis and denominator errors. [mostly me].** Chart retitled
"Initial decisions and withdrawals"; 16,901 now reads as people; the three bars are no longer
presented as exhaustive, with the 5,931 administrative outcomes named and held as a record. The
88,000 bar and table row are asylum applicants only, with humanitarian named as separate at about
6%; the non-EU+ definition is now a nationality grouping; the unsourced "a small fraction of
immigration a decade ago" is removed with its reason; the net-migration-by-reason limitation says
why subtracting is invalid. Part 2.1 now carries the accommodation total, 93,653, as a `calculated`
record, and the same gap was fixed on the asylum page, where it also existed. **[you] parts taken:**
the verdict softened to "the figures do not show that", and all three eligibility sentences
qualified rather than the two the review named. The review's 35,000 for humanitarian was **not**
written: the ONS bulletin gives only the 6% share.

**1e. DONE (PR #38, 28 July 2026). Qualifiers and precision (Sections 3, 5, 6). [me].** "Grew steadily"
is now "grew substantially", with the 2014 to 2015 fall stated in the note so a later editor can
see why the word changed. The net migration peak is qualified to the calendar-year series, with
944,000 in the year ending March 2023 given in the note. The 2022 revision is now 285,000, from
606,000 to 891,000, 47% higher, replacing "more than 120,000". Section 6 was left alone as the
reviewer advised, after checking that its "rose steadily" was not the same mistake twice. It is not.

**1f. DONE (PR #38, 28 July 2026). Voice rewrites. [you].** Settled as a rule rather than page by page:
take the reviewer's substance, write it in the site's voice. The reviewer's recommended short
answers run longer than any on the site and use vocabulary it does not use elsewhere, and 1a, 1b
and 2.1 had already been done that way.

**1g. DONE (PR #38, 28 July 2026). Circulation examples (Parts 2.1, 2.3, 2.7). [you].** Resolved without
changing the site's policy, which was the point that nearly got missed: the style guide says
plainly that this site does not attribute claims to named people and accepts the "nobody actually
says that" cost. The review's finding IS that rebuttal. 2.3 therefore drops the "far more"
intensifier rather than gaining an attributed example (a good one was found, Dustmann and Frattini
on the LSE blog, and rejected as a named attribution). 2.1 and 2.7 publish the selection gap on the
page instead, after six search angles found nothing quotable. **Dropping 2.7 is not available:**
pro-migration claims sit exactly on the floor of two that `validate-content.mjs` enforces, so
removing it fails the build unless another pro-migration claim is added first.

**1h. DONE (PR #38, 28 July 2026). "Refused asylum" (Part 2.7). [me + you].** The invalid comparison is
deleted, and it existed in three places, not the one the review names: the claim page, the asylum
page, and the notes on the grant-rate record itself. Deleting it alone would have left the section
conceding the claim, so it is replaced with a refutation valid on the same table: between a fifth
and a half of each 2010 to 2020 cohort ended without a grant. All the other **[me]** edits landed,
including the front-matter source, the mixed periods, the provisional tribunal data, and a third
failure named, that protection or other leave is broader than refugee recognition. **[you] part
taken:** the short answer, in the site's voice per 1f.

**1i. DONE (PR #38, 28 July 2026). "Net migration is arrivals" (Part 2.5). [you].** Both tweaks applied.
The "without a single person's movement changing" line claimed more than a revision can support,
because new data can change which movements are identified.

Section 1 of the review, people claiming asylum, needs no edit, only a vintage caution: do not mix
the 104,764 figure in use with the older 108,138 that some sources still cite for 2024.

### 2. Then, and only then: remove the robots rule

Delete `content/robots.txt` and its guard in `scripts/check-build.mjs`. Deliberate, and it
comes last. That is launch.

---

## Scoped, not built

None of this blocks launch. Each has a scope document; read it before starting.

**The order lives under *The order* at the top of this file**, as the one sequence, and it
governed from here until 2 August 2026, when the sections had multiplied past what a sentence
in the middle of the file could order. This section now holds only the detail the order's
later entries point at. Read the scope document for whatever you pick up, and do not
re-derive it.

### 3. Release notifier and evidence check: four phases built, phase 4 left

**`docs/UPDATE-AUTOMATION.md`.** Five phases. Phases 1, 1b, 2 and 3 are built; phase 4 is a
reader-facing trust statement and needs the owner's sign-off, so it is the only one left.

- **Phase 2, the evidence check. DONE (PR #43, 28 July 2026).** A figure whose value changed,
  or which is new, must be declared in `data/evidence/` with a quote from a fetched source
  containing that value, and CI fails without one. It applies to updates made by hand, which
  is why it went first. **The series are covered too**, which closed the largest hole left in
  it: 100 published points could move with nothing asking where they came from. Five things
  the scope had wrong or did not say, and how a series is evidenced, are recorded in it and in
  `data/evidence/README.md` rather than restated here.
- **Phase 1, the notifier. DONE (PR #46, 28 July 2026).** `check-releases.mjs` compares the
  edition each record cites, by the month and year in its URL, against the newest edition the
  publisher lists, and opens one deduplicated issue from `main` or the weekly cron. It reports
  and never gates. **What it does not do, and says so on every run:** notice that a release
  which kept its slug has changed something. Corrections between editions land on the
  data-tables page, whose change history names the exact table, and nothing reads it. That is
  the next thing worth building here, and it is what the by-hand run in the scope found. **Not
  yet exercised:** the issue itself, since no release is pending; its parts are tested, the
  whole path is not.
- **Phase 1b, the corrections watch. DONE (PR #48, 30 July 2026).** The owner ordered it ahead
  of phase 3 on 30 July. It closes the one channel through which a wrong number can sit on the
  site indefinitely: a correction *inside* an edition leaves the slug alone, so the edition
  check cannot see it and a cadence cannot infer it. Records and series files now declare
  the publisher table they were read from, `validate-data.mjs` refuses a figure that names a
  table in its own prose and declares nothing, and `check-releases.mjs` matches the data-tables
  change history against those declarations. It raises a hit only where the figure's own
  `retrieved_date` pre-dates the correction, so it is stateless and clears itself. What building
  it found is in the scope, uncounted and not restated here, because a count restated in two
  files is what put six in one and twelve in the other for a day.
- **Phase 3, the update prompt. DONE (PR #56, 30 July 2026)**, as
  `docs/prompts/update-from-release.md`. Seven things to settle were in the scope; five were
  already mechanical and the two that were not were decided the same day. It is deliberately
  thin: it names the source, the release and the refusals, and sends the assistant to
  `docs/UPDATING-DATA.md` for the procedure rather than carrying a copy of it. **Not yet
  exercised against a real release**, and it says so; the first run should be against one that
  was going to be checked by hand anyway.

  **What building it found, and it is a defect in an older check rather than in the prompt.**
  `docs/prompts/` is the first subdirectory under `docs/`, and the rule that every planning
  document must be referenced from this file **did not descend into directories**. The document
  whose whole purpose is that a scope cannot be written and forgotten was itself invisible to the
  rule on the day it was written. The scan is now recursive and matches on the path relative to
  `docs/`, so two documents sharing a basename in different directories cannot satisfy it through
  each other. Negative-tested both ways.

  The two decisions, kept because they explain the shape of what was built:
  - **Series work: refuse it, and hand it to a person.** As scoped the procedure cannot do an
    ONS update at all: the metrics that declared a `series_ref` **when this was scoped** were all
    `ons-ltim`, and moving them without the series fails `validate-data.mjs`. There are five now
    and one is Home Office, which is recorded below; the past tense here is the fix, because this
    sentence read as current until 31 July 2026 with its own correction five lines beneath it. So v1 detects a `series_ref` or a
    series file in scope, stops, and **names the runbook's section by path and heading without
    restating its steps.** That constraint came from a second model: a procedure printed in two
    places is the duplication this project has been burned by twice, and the copy a session
    happens to read wins. **It costs two of the three cadenced releases, not one**, which the
    first version of this entry got wrong: the `series_ref` metrics that existed then were all `ons-ltim`, though a fifth has since been
    added on a Home Office series, but
    two of the four series files are `ho-immigration-stats` and move on every Home Office
    quarterly. Only the tribunals release runs to completion. That is the accepted price of not
    omitting series work silently, and if it is judged too high the answer is to grow the series
    half deliberately rather than loosen the refusal.
  - **The runbook came first, and is now built.** It is under Completed. Phase 3 is the job it describes,
    delegated, so its own rule put it ahead. Decided and reordered on 30 July.
- Phase 4, rewriting what the sources page says about automation, needs the owner's sign-off.

### 4. The figures the data layer never recorded

**Found 30 July 2026, and the reporting half is built (PR #51).** Both literal scans in
`validate-content.mjs` match prose against the values the site *holds*, a record value or one of
the series points. A figure the site never recorded matches neither map, so it was invisible to
both **by construction**, and the success message nonetheless printed "No page writes a
comma-grouped value longhand". That is the eighth instance of this project's oldest pattern: the
check verified the declaration, the message claimed the property a reader depends on.

A third branch now reports every literal that no record or series point holds, comma-grouped
since PR #51 and written with a scale word since PR #66, under its own heading, and the success
message states the limit. **Reported, not failed**, on the
precedent the sub-100 warnings set: the only way to clear an error here is to declare the
literal, and a check whose remedy is a blanket exemption teaches authors to stuff the exemption
list. The current count is what `npm run validate` prints; it is deliberately not restated here,
because a count kept in two files is what put six in one and twelve in the other for a day.

**It carries a ratchet, because report level on its own expires.** A list nobody has to act on
sits in a green log and the next figure joins it invisibly, so the count may not grow:
`UNRECORDED_BASELINE` fails the build if it does, runs after the list prints so a failing run
still shows what it is complaining about, and says what it does not establish, that one fixed and
one added passes. Lower it as figures are recorded or declared; at zero the branch becomes an
error and the constant goes.

The list holds four different things and the check cannot tell them apart, which is why a person
reads it. **The sort below was corrected on 30 July after a second model checked it against the
sentences**, and three of the four groups moved:

- **Frozen history, correct as longhand. DONE.** Only the published vintages really qualify:
  `431,000`, `345,000` and `606,000`, because a first-published number never changes, which is
  the same logic that makes the existing `285,000` declaration right. All nine reports of them,
  across four files, are now declared under `historical_literals` with the reason beside them,
  and the baseline fell from 38 to 29. `45,774` was **not** declared: it is frozen as a number
  but sits under "the peak was", which goes stale if a later year exceeds it, so it stays in the
  report where a person will see it.
- **Current-edition figures with no record behind them. Started, not finished.** `627,000` is
  DONE (PR #58, 30 July 2026): it was on two pages and existed nowhere but inside the parent
  record's notes, and it now has `migration/non-eu-plus-long-term-immigration`, read from Table 1
  of the ONS dataset rather than the bulletin. The three nationality groups reconcile exactly to
  the 813,000 total the site already publishes, which is what established the basis. The parent's
  notes no longer restate it.

  **The rule for the rest is set, 30 July 2026, so no per-figure decision is needed.** Any
  figure that changes when its publisher next publishes gets a record and a fetched quote.
  Anything else is reworded, or declared as frozen history where the prose itself says it is
  history. Bring back only what is genuinely ambiguous. Twenty-two remain and each needs its own
  source fetched, so this is several sessions rather than one.

  **The citizenship card's three. DONE (PR #78, 2 August 2026)**, on the standing rule and
  without a per-figure decision: all three change at the next Home Office quarterly, so all three
  got a record and a fetched quote from table Cit_01. `269,178` is a prior-year comparison figure
  and takes a record for the same reason `migration/net-migration-2` does, which is the precedent
  that settled it. The card's rendered text is unchanged, proved by diff: a citation renders the
  same characters the card already showed, which is what distinguishes these from the
  `10.7 million` case that cannot be cited without rewording. Baseline 31 to 28.

  **The card's two percentages, settled 2 August 2026 after a second model found the first one.**
  "Applications rose 18%" was a figure no reader could check: Cit_01 does publish that 18%, so it
  was not invented, but the card's source link goes to the bulletin, which carries no application
  figure at all, and no record held 18, so every scan here was blind to it. **DONE (PR #81)**: the
  two application totals get records and the card gives both ends instead, which is the settled
  pattern for a figure computed against live values. **"Down 12%" is left alone deliberately**, on
  the one distinction that mattered: the bulletin states it in prose, so following the card's own
  link finds it. Minting a record for a published percentage change was the option not taken, and
  the reason is worth keeping: it would hold a third figure that must stay in step with two others,
  and this project has no mechanism for that.

  **The migration page's two ONS peaks and its work comparison year. DONE (PR #87, 2 August
  2026)**, on the standing rule and without a per-figure decision: `944,000`, `1,469,000` and
  `272,000` all move at the next ONS release, so all three got a record and a fetched quote from
  Tables 1 and 4b of the year ending December 2025 dataset. **The peaks were verified as maxima,
  not read off the bulletin's word "peak"**: each is the largest of the 55 year-ending periods in
  Table 1 and the maximum is unique, which the bulletin alone could not establish. Both records
  say in capitals that a maximum is re-derived at every release rather than carried forward.
  `272,000` takes a record for the reason `net-migration-2` does, a prior-year figure being
  revised by the release that publishes it; the 47% beside it is deliberately not a record,
  because ONS publishes that percentage and a reader following the chart's own source link finds
  it, which is the distinction that kept "Down 12%" on the citizenship card. The page's rendered
  text is unchanged, proved by diffing against a build of `main`: the only difference anywhere is
  the derived ONS row on `/sources-and-method/`, 10 to 13. Baseline 28 to 25.

  **The study and work main-applicant and dependant splits. DONE (PR #89, 2 August 2026).**
  `277,000`, `17,000`, `71,000` and `74,000`, from Table 4b of the same release, and the bulletin
  states all four in prose as well. **The mechanism turned out to be the one already in use**: a
  bar's `note` is an ordinary Nunjucks string, so it takes the `~` concatenation the chart
  summaries have used since PR #41, and nothing had to be built. Baseline 25 to 21.

  **The migration page now holds no unrecorded figure that a record could fix.** What is left of
  it is the three year-on-year falls below, whose remedy is a rewording and is therefore yours.

  These **read as history and are not**: "the highest twelve-month estimate ONS publishes" is a
  claim about the *current*
  publication, and the year-on-year changes are recomputed every release under the site's own
  single-vintage rule. Minting is **[me]**, and so is deciding which deserve a record, under the
  rule three paragraphs above. **This sentence read "which deserve a record rather than a rewording
  is [you], and 627,000 was taken as the clearest case rather than as a precedent for the rest"
  until 2 August 2026**, which contradicted that rule, and the order entry for it was corrected the same day
  while this was left standing one paragraph from it. A second model found it. What survives as
  **[you]** is narrower and worth keeping: a figure whose remedy is a REWORDING rather than a
  record, because the wording is yours. `627,000` set no precedent about which figures qualify; the
  rule of 30 July does that.

  **`517,000`, `429,000` and `87,000` were that [you] case. DECIDED AND APPLIED (PR #90,
  2 August 2026): both sentences give the reader both ends.** Each was arithmetic against a live
  series value, so no record could hold one and freezing one would have guaranteed it went wrong at
  the next revision, which is the reasoning PR #55 settled for the `100,000` and `285,000` of the
  same shape. Three differences became six cited ends, on `migration.njk`'s flows chart note and in
  `content/claims/net-migration-is-arrivals.md`, which carried the same sentence and would have
  been left saying it. The wording was the owner's, from drafts in PR #87's body, and is recorded
  under *Completed* with what applying it cost.

  **One pattern worth reusing.** Both records minted on 30 July were verified by reconciling
  against a total the site already published, not by finding the number alone. That is what
  distinguishes reading a figure from recognising one.
- **Rounded restatements of live values. DONE (PR #57, 30 July 2026), and the mechanism the
  category said was missing turned out to exist.** "around 97,500" and "around 100,000" were both
  live figures rounded just enough to slip past an exact-match scan, in a sentence whose whole
  point is that the two are of similar magnitude.

  The two halves were not the same problem. `97,519` needed no decision at all: the glossary
  already cited `people-in-receipt-of-asylum-support` for the same figure and the claim page did
  not, so that half was an inconsistency between two pages. `100,625` genuinely could not be
  cited, because it is a **series point** and only a Nunjucks chart summary can cite one, which
  the validator's own message says. It now has a metric declaring
  `series_ref: asylumApplications@2025`, the established pattern for a figure held twice, so
  `validate-data.mjs` refuses any drift between the record and the point.

  **Verified against the primary table, not the bulletin.** The `.ods` was fetched and unzipped
  and `Asy_00a` read directly: row "People claiming asylum", column 2025, is 100,625, and the
  support row is 97,519 for the year ending March 2026. Evidence written before the record, and
  `check-evidence.mjs` gated on it as a new metric. Baseline 27 to 24.

  **What is left of this category is the pattern rather than a task.** A deliberately rounded
  live figure still has no home in the contract. It was avoidable here only because a record
  could be minted; where one cannot, the choice is still to cite exactly or to reword.
- **Arithmetic against a live value, where neither remedy in the message works. DONE (PR #55,
  30 July 2026), and it emptied this category.** The `100,000` on `net-migration-is-arrivals` and
  in the glossary was `431,000` minus the live `migration/net-migration-2`. A record for it would
  have been a fake metric and freezing it guaranteed it would go wrong at the next revision, so
  both were dropped, along with the `285,000` and `47%` under the editorial decisions below and
  two more sites of the same sentence. The baseline fell from 29 to 27.

  **The lesson worth keeping is the shape, not the fix.** A figure computed against a citation is
  invisible to every check here: it matches no record, so the longhand scan cannot see it, and it
  is not frozen history, so declaring it would have been a lie that silenced it for ever. If one
  appears again, dropping it and giving the reader both ends is the pattern.

**The asylum page and its accommodation claim page. DONE (PR #91, 2 August 2026)**, and this is
the one that found a live defect rather than an unrecorded figure. Five sites, four records: the
June 2023 backlog peak `175,457`, the end-2019 queue `51,228`, the appeals backlog a year earlier
`50,976`, and appeals disposed of in the quarter `7,799`. **`51,000` was two different queues
rounded to the same number**, which the paragraph below predicted and which is why value-keyed
sorting could not have done it.

**The defect: `/asylum/` said "fewer than 7,000 appeals are decided per quarter", and it had been
false for three quarters.** Asylum and protection disposals passed 7,000 in July to September 2025
and reached 7,799 here. It was true when written. Nothing could see it go stale, because the
sentence held no figure any record or series point holds, which is exactly what this whole item is
about. **The word was ambiguous as well as stale**: disposals were 7,799 and appeals determined at
a hearing or on the papers were 4,088, so "decided" was answered by two figures on either side of
the claim. The sentence now gives appeals lodged against appeals disposed of, both cited, which is
the comparison that actually explains why the queue grows.

**Value-keyed sorting cannot finish this job**, which is worth knowing before anyone tries.
`51,000` is the end-2019 initial-decision backlog in one file and the appeals backlog a year
before the live March 2026 figure in another. `100,000` is three different figures. And the
glossary's per-file de-duplication collapses two meanings of `100,000` into one report line, so
no per-report classification can be right there.

**What the check did not scan at all, the larger surface: a figure written in words. DONE
(PR #66, 30 July 2026).** `validate-content.mjs` now reads "2.2 million" and "£1.3 billion" as
numbers and asks them the same questions it asks a comma-grouped one. Records are compared at
their unit's scale, because a record of 4.9 with unit `£ billion` **is** 4.9 billion pounds, and
the series are asked too, because the report claims that neither holds the value and a claim
about both has to ask both. No page changed: the built site is byte-identical, proved by diff.

**What a second model found in it, because the shape recurs and the sentence above is where a
reader will look for it.** The three lines written to stop one figure being reported twice
asked for "£" plus the number whatever the prose said, so a figure with no currency sign,
"3 billion" of anything, was answered by a fiscal record and silenced completely: not an error,
not a warning, not even a line in the report. Two self-critiques had read that guard and seen
only its precision. **A suppression is the most dangerous three lines in any check here**, and
the two controls that ran on every invocation could not have caught it, because both called the
matcher and neither called the thing reading its output.

**`UNRECORDED_BASELINE` went UP, 22 to 33, and this is the only step up it should ever take.**
Eleven report lines became *visible*, ten distinct figures with the visitor-visa one on two
pages; none arrived. What the ratchet forbids is unchanged; the baseline is the
`UNRECORDED_BASELINE` constant, 33 at the time of that step, and it has since come down.

**Two live record values are written out in words, in `data/` prose that renders to a page.**
`dashboard.json`'s foreign-born card and `meta.json`'s key caveat on foreign-born vintages both
write "10.7 million", which is exactly `population/foreign-born-population-of-the-uk`. It is a **warning and
not an error, and the difference is the remedy rather than the confidence**: a token renders
`toLocaleString`, so citing it puts "10,700,000" on the page and the wording changes. The
comma-grouped branch can error precisely because there the citation renders what the page
already says.

**The eleven, sorted by the rule already set above, so only the last line is a question.**
- **Needs a record and a fetched quote**, because it changes at the next Home Office quarterly:
  "over 2.2 million visitor visas" for the year ending March 2026, on the glossary and
  `migration.njk`. **DONE (PR #67, 30 July 2026)**, as `migration/visitor-visas-granted`,
  **2,241,997**, read from table Vis_01 of the visas summary `.ods` rather than from a
  bulletin. Two of the eleven came down with it, one figure written on two pages, and the
  baseline went 33 to 31. **Neither rounding survived**: both pages now say 2,241,997, as
  PR #60 found with the small-boats denominator. The figure had been living inside the
  parent record's notes, which no longer restate it, the same shape PR #58 found for 627,000.
- **The site already holds the figure and the prose rounds it**: "69.28 million" on the
  born-abroad claim is `population/total-uk-population`, 69,281,400. Cite it exactly or reword,
  which is the choice the rounded-restatement category above ends on. **[you]**, with the two
  "10.7 million" warnings, which are the same question.
- **Arithmetic against a live value, three more sites of it**: "£5.8 million a day", "£8.2
  million a day" and "£13 million a day" on the costs page are the cited hotel and system
  spending divided by 365, in the same sentences as the tokens. PR #55 emptied the
  **comma-grouped** half of that category, not the category. Same remedy, drop it and give the
  reader both ends. **[you]**.
- **Frozen history on the face of the prose**, so declarable if you agree: "£1.3 billion" and
  "£1.7 billion" (NAO, HC 874, the first seven months of 2024-25), "£4.5 billion" (the original
  contract estimate) and "£8 million a day" (the circulating claim the page exists to examine).
  Deliberately **not** declared here: an exemption is permanent, nothing re-checks that it is
  still deserved, and the branch reports rather than fails so that nobody is ever forced to
  stuff the exemption list. **[you]**.
- **Genuinely ambiguous, so brought back as the rule says**: "about 10.6 million" on the
  born-abroad claim is an ONS ad hoc release on a different population base, published on no
  cadence, and the page's point is that it does **not** reconcile. A record would give a figure
  the site tells readers not to use. **[you]**.

**What it still cannot see**, and the success message now says so instead of naming this as
unscanned: a figure written "2 200 000", "two million", "£1.3bn" or "2.2 thousand", and **front
matter**. That gap has one real instance today, "about 13.1 million" in the born-abroad claim's
`short_answer`, which renders on the page and is a rounded restatement of the live mid-2024
estimate. Scanning front matter is not free: `claim:` holds the proposition being corrected and
may legitimately carry a figure the site is arguing against, so it is a decision rather than a
widening.

**A separate finding from the same run. FIXED in PR #55, and this paragraph outlived it by two
days.** Correction 1e replaced "more than 120,000" with the precise 285,000 revision on
`migration.njk` and left the old wording in `meta.json`'s net-migration methodology caveat,
which renders to a page, so the site described one revision two ways. The editorial decision
below settled it by dropping both numbers rather than freezing either, and "120,000" now appears
nowhere in `data/` or `content/`. **Left here rather than deleted, and the lesson is the
paragraph and not the defect:** a finding written under one item and fixed under another goes on
reading as outstanding, which is the same shape as the counts this project keeps finding in two
places. Fixing something means grepping this file for it too.

### 5. The eight undrafted claims

Foundation section 8.5.3 specifies fifteen; seven are written. One of the eight,
"Local areas all carry the same pressure", **cannot be written**: it needs per-capita local
authority figures and `data/` holds none.

**The two directions are decided, 30 July 2026.** They take foundation 8.5.3's own starting
positions: "The asylum backlog is one number" is **restrictionist**, and "Falling net migration
means the asylum system is shrinking" is **pro-migration**. Both are cheap to reverse, and
handoff decision 7 already recorded them as a starting position rather than a finding, so
adopting them commits nothing.

**It buys no structural payoff until a page merges**, which is worth knowing before anyone
expects one. `validate-content.mjs` counts parsed files in `content/claims/`, so a direction
assigned to an undrafted claim changes nothing at all; only the pro-migration one, once written
and merged, moves the split off the enforced floor of two and reopens the option of dropping
claim 2.7 that correction 1g found closed.

**Who drafts, decided 30 July 2026.** A session drafts and proposes; the **verdict and the short
answer come to the owner before merge**. An earlier framing of this, that drafting is merely
executing the spec in 8.5.3 because it already gives claim, direction, short answer and
statistical issue for all fifteen, was wrong: the tagging history marks short-answer writing
**[you]** every time it has arisen, in 1b, 1f and 1h. The spec is a starting position, and four
of its rows were overtaken by the review on 27 July, so a drafter meets that question rather than
avoiding it.

**One thing to know before drafting for the representation floor.** Assigning a direction changes
nothing on its own. `validate-content.mjs` counts parsed files in `content/claims/`, so the split
moves only when a drafted page merges, and of the two above only the pro-migration one
("Falling net migration...") would move it off the enforced floor of two and reopen the option of
dropping claim 2.7 that correction 1g found closed.

---

### 6. The sources page's counts have no check behind them

**Found 30 July 2026, by a second model, hours after those counts were "corrected".** The fix in
PR #61 got the total right and two of the rows wrong, and the total agreed only because the two
errors cancelled: `asylum/returns-refused-entry-at-port` renders through a `data/` caveat and was
missed, and `fiscal/net-fiscal-impact-of-immigration-as-a-share-of-gdp` renders nowhere at all
and was counted. Home Office was published as 17 and is 18; "the other sixteen" is fifteen.

**Three queries gave three answers on the same day**, 74, 45 and 39, because "reaches a reader"
was never pinned to a mechanism. It is now: a token in the built HTML, a chart bar's `ref`, a
`| metric` summary, a dashboard card, or a caveat in `data/`. A `figures:` front-matter entry is
**not** a route, because nothing renders that list.

**The work was to make it derived rather than declared. DONE (PR #68, 30 July 2026), and it
took the first of the two routes rather than the second.** `lib/published.mjs` is the one home
for the definition of reaching a reader, and the five numbers on `/sources-and-method/` now
render from it through a `published-counts` transform. **Adding a record no longer touches that
page at all.**

The scope preferred a comparison in `check-build.mjs` as the smaller change. It was not: both
routes need the same union, because the built HTML alone gives 40 of the 46, the other six
reaching a reader through a chart bar or a dashboard card, which render a value with no ref
beside it. Given the same derivation either way, generating beats comparing, and the precedent
was already in the repo: `common-claims.njk` computes its own direction split with `countWhere`
for exactly this reason, on the page whose subject is other people's numbers.

**What made this look impossible and was not.** Markdown templating is off site-wide, so
`{{theme/id}}` is a citation rather than an expression and a markdown page cannot call a
filter. The marker-and-transform idiom `{caption}` and `{#anchor}` already use is what it has
instead, and `{count:ho-immigration-stats}` is that idiom.

**What two readings of it found, and this is the part worth carrying forward.** None of it
shipped, and with two of the probes applied the branch printed "47 of 75" and passed every
check green, which is this item's own defect reintroduced by the fix for it.
- **The scan was stricter than the renderer it modelled.** `resolve-citations` accepts
  `{{ theme/id }}` with spaces; the scan did not. That figure would reach a reader and be
  counted for nobody, and the check at the far end ran **one way only**, so it could find an
  overcount and never an undercount. It now compares both ways, which is free today and is the
  direction that was reachable.
- **A comment is where a scan of text stops being a scan of what renders.** A chart bar left
  inside a Nunjucks comment during a rework was counted; a citation inside an HTML comment was
  counted AND confirmed by the far end, because `resolve-citations` renders it into the
  comment. Both ends now strip comments.
- A `{% figure %}` in a markdown page was counted, where that syntax ships as visible junk
  rather than rendering. `check-build.mjs` now catches a stray `{% %}` and a mistyped
  `{Count:...}` as unrendered syntax.

**Three things worth knowing before touching it.**
- **The source scan is a proxy for rendering, and `check-build.mjs` closes it at the far end**,
  confirming that every record the counts claim through a token really appears in the output.
  Six cannot be confirmed that way and the run says so on every build: a chart bar and a
  dashboard card leave no ref behind. Closing that would mean changing what a reader gets in
  order to make a check easier.
- **Only the three cadenced publishers can be named by a marker.** A key is otherwise refused,
  because a typo landing on a real publisher renders a plausible wrong number beside a row
  naming a different one. That is not hypothetical: the negative test for this branch did it by
  accident, and the first version of the transform accepted it.
- **"fifteen" became "15"**, which is the site's own `inWords` rule, words to ten and numerals
  above.

**What is still hand-maintained on that page**, and it is smaller than it was: the sentence
naming the irregular publishers lists them in prose while the count beside it is derived.
**The failure this bullet predicted happened on 1 August 2026 and was caught.** Adding `ho-ara`
in PR #73 moved the derived count from six to seven, and the prose would have said seven above
six names with every check green. It was caught by the comment in `lib/published.mjs` that
predicted it, not by anything that runs. Deriving the list means
either changing the wording to `sources.json`'s names, which read as catalogue entries rather
than prose, or adding a display name to seven records, which is the same hand-maintenance moved.
**[you]** if it is worth the wording.

**A second thing on that page is now slightly false, and it is wording rather than a count.** The
sentence introducing that list says those publishers "release irregularly rather than on a cycle",
and two of the seven are annual: ONS population estimates, which predates this, and the Home Office
annual accounts, which PR #73 added. Reframing it around the three-release cycle above rather than
around irregularity would fix both. **[you]**. The release table's cadence column and "the most recent
full cycle took twenty-seven days" are untouched and still nobody's to verify.

### 7. The robots.txt prose says the review has not happened

**Found 30 July 2026.** PR #54 corrected exactly this sentence in the pre-launch banner, calling
it "false on every page since 27 July", and the identical claim survived in `content/robots.txt`,
which is served publicly. It is the sibling that "a defect named on one page usually has
siblings" exists to catch, and neither the handoff nor the prompt knew that file carries prose at
all. **Corrected in PR #63 rather than left**, but the lesson belongs here: grep the claim, not
the page.

---

## Small editorial decisions waiting on the owner

Neither blocks anything. They are here because a decision recorded only in a merged pull
request body is a decision that gets lost, and this file is the one place that cannot happen.
Both came out of PR #41 on 28 July 2026.

- **The revision sentence in `migration.njk`. DONE (PR #55, 30 July 2026).** Decided by
  dropping both numbers rather than freezing them. Freezing was the worse option and the
  reason is worth keeping: `historical_literals` is page-scoped, so declaring the estimate to
  protect the sum would have un-protected the citation in the summary above it, trading one
  unprotected figure for two. The sentence now gives both ends, 606,000 and the cited current
  estimate, and lets a reader take the difference.

  **The same decision settled four more sites, because it was one defect in five places**, and
  finding the fifth is why the count in this bullet used to say four. All were arithmetic or a
  claim about arithmetic against a live value: the two `100,000` revision deltas on
  `net-migration-is-arrivals` and in the glossary, `meta.json`'s "more than 120,000", which
  renders on `/sources-and-method/` and was what correction 1e left behind, and the same
  sentence again in `netMigrationTimeseries.json`'s own note, where it would have instructed the
  next editor to reintroduce it. Proved by diff: four built pages changed and each only in the
  sentence intended.
- **The sources page's five hand-maintained counts, and the correction-note sentence.
  DONE (PR #61, 30 July 2026), and every number on it was wrong.** The owner settled the
  definition that had blocked it: a **published figure** is a record whose ref reaches a reader
  by any route, page prose, chart config, front-matter dependency or a dashboard card. That
  gives **45 of the 74 records**, with 29 held as unpublished reserve, which is the same
  "a subset of those records reaches a reader" the handoff already stated. That agreement is
  the check that mattered: a first query returned 74, matched every record, and was thrown away.

  | The page said | It now says |
  | --- | --- |
  | Home Office 13 | 17 |
  | ONS 7 | 10 |
  | Ministry of Justice 2 | 2, the only one that was right |
  | "the other fourteen" from four publishers | "the other sixteen" from six, adding ICIBI and ONS population estimates |
  | "No claim currently carries one" | removed, since three do and a count nothing reads is what caused all of the above |

  **One claim on that page is left alone deliberately.** "The most recent full cycle took
  twenty-seven days" is a statement about a past cycle that no session can verify, so it is
  neither corrected nor endorsed here. It is not the last hand-maintained number on the page:
  the release table and the "other fifteen" are hand-maintained too, and one of them was wrong
  for as long as this entry claimed the page counted itself correctly.

  **The third limit landed with it (PR #61), which is why the two were bundled.** The section
  opened "Two limits" and framed them as "about where a number comes from", and both had to
  change for an accessibility limit to fit. It now publishes that no real screen reader has been
  run over the pages, that the checks are an automated WCAG audit plus a reading of the
  accessibility tree, and that this is not the same as someone listening to a page.

- **Three entries moved out of the handoff's decisions list, 30 July 2026**, because they were
  outstanding editorial work rather than decisions taken, and the handoff sends that here.
  - **Captions. DONE (PR #59, 30 July 2026).** Markdown has no caption syntax, which is why the
    four had none while every table written by hand in Nunjucks carried one. A paragraph reading
    `{caption}Text` immediately before a table now becomes its `<caption>`, in a transform that
    throws when a marker matches no table. There was never an accessibility deficit:
    `scrollable-regions` already named those regions from the heading above. The argument was
    consistency with the site's own practice, and that an `aria-label` is invisible to a sighted
    reader. This was briefly written off as a non-task on the same day, on the accessibility
    half of that alone.

    **The first caption containing a quotation mark found a latent bug beside it.** `stripTags`
    removed tags and never decoded entities, so a region name went back out through `escape()`
    and was escaped twice, shipping the entity itself inside the `aria-label` where a screen
    reader would read it aloud. Nothing on the page shows it, which is how the `{#anchor}`
    version of the same fault survived until `check-build` caught it. Found by reading the built
    output rather than trusting a green build.
  - **The small-boats line. DONE (PR #60, 30 July 2026).** It could not simply be moved: the
    prose carried two longhand figures, and putting them on a page would have broken the promise
    on `/sources-and-method/` that a number in a sentence is inserted from a record. So the
    denominator got a record and the asylum page cites both.

    **Neither rounding survived the source.** The exact total is 43,806 and small boats are 89.6%
    of it, not "around 44,000" and "about 90%". The figure is `calculated` and says so: the Home
    Office publishes this table by quarter and by calendar year and states no year-ending-March
    total, so it is summed over 2025 Q2 to 2026 Q1 across all four methods of entry with every
    component quoted.

    **Two checks on the arithmetic, and one of them was free.** The row-level sheet reproduces
    43,806 independently of the pivot, and the small boats component comes to 39,271, which is
    exactly what this site already published for that period from the Commons Library briefing.
    That briefing returns 403 to a fetch, so this incidentally gives that figure a primary source
    it did not have.
- **Whether `/sources-and-method/` should publish a FOURTH limit.** This bullet said "a third"
  until 30 July, and one of the three candidates it listed, the screen reader, had already been
  published by PR #61 in the bullet above it. Three limits are live. Three candidates are left,
  and the last is new:
  - A figure declared under `historical_literals` is exempted on trust and nothing re-checks
    that the exemption is still deserved.
  - A correction inside an edition is caught only where the publisher's note names its table by
    identifier, and most name theirs by title.
  - **A figure the data layer never recorded is reported and never refused**, so the site can
    carry a number that nothing can tell you has aged. This is the one a reader is most
    affected by, because it is about the numbers rather than about the checking, and the scan
    that reads figures written in words made it larger rather than smaller. What the count is
    on any given day is what `npm run validate` prints.

  Adding a limit to a live page is an editorial call, and so is which of the three earns the
  space.

---

## Unmet acceptance criteria, which are not launch gates

**The distinction matters and is easy to lose.** Foundation section 17 labels only its five
*Trust criteria* as launch gates, and all five are met. The site itself declares one thing
outstanding, the review above. But three of section 17's other criteria are not met, and
calling them "gaps carried deliberately" would be a softer word than the document uses. They
are unmet acceptance criteria, and launching with them unmet is a decision rather than an
oversight.

- **"Five target users have been spoken to, and what they said is written down."** Open since
  June. Section 18 calls it the cheapest possible way to find out the whole thing is unwanted,
  and puts it at a week. Of everything on this page, it is the one most worth not skipping.
- **"Success measures are chosen and recorded." MET, 30 July 2026.** The measure is
  **candidate 1 of section 4.2: cited by a named outlet or briefing within six months.** It was
  chosen over the other two because 4.2's own audience statement names "professionals who need a
  citation quickly", so citation is the thing this site is for rather than a proxy for it.

  **A correction to the reasoning that nearly picked it for the wrong reason.** An earlier
  recommendation argued it was the only candidate measurable as the site is built, because there
  is no analytics of any kind and no client-side JavaScript. That is false: candidate 2, organic
  search entries on definitional queries, is measurable through Search Console, which verifies by
  DNS record, file or meta tag and needs no JavaScript. Only candidate 3, return visits, needs
  what the project refused. So set Search Console up at launch regardless; it costs nothing and
  it is how you would notice candidate 2 happening.

  **Open, and small:** whether the measure should be published on `/about/`, which already
  carries who runs the site and who pays for it, the other two items of section 4.2.
- **The two comprehension criteria**, that a reader can explain the difference between
  immigration, emigration and net migration after reading the homepage and glossary, and can
  see that asylum is one part of a wider system. These are not failed; they are **untested**,
  and cannot be tested without the first item above.

## Known gaps, carried deliberately

Genuinely not tasks. **Both are now published on the site**, which they were not when this
section was written and were not on 30 July either: it said one of the two was, and PR #61 had
already published the other in the same hours. `/sources-and-method/` carries three limits under
*What the checks do not establish*, the two below plus the sub-100 review. The one still unpublished
is the unrecorded-figure report, and that is the editorial decision above rather than a gap here.

- **No real screen reader has been run.** Chrome's accessibility tree is what assistive
  technology consumes and is what was read, but it is not VoiceOver or NVDA reading a page
  aloud. **Published, PR #61.**
- **Prose about figures is unprotected.** Nothing verifies a chart summary describes the data
  beside it. The series citations shrank this and could not remove it, because a citation
  protects a value and not a claim about a value: `at(2018)` under a sentence naming 2019
  builds cleanly. Published.

---

## Completed

Kept so that a future session can see what was decided and when, rather than reopening it.

- **The asylum page's four figures, and a sentence that had gone false**, 2 August 2026. PR #91.
  Part of item 4, and the first batch of it to find a defect rather than a gap.

  **`/asylum/` said "fewer than 7,000 appeals are decided per quarter" and it had been false for
  three quarters.** Asylum and protection disposals passed 7,000 in the July to September 2025
  quarter and reached 7,799 in January to March 2026. The sentence was true when it was written,
  and **nothing on this site could have noticed**: it held no figure any record or series point
  holds, so every scan was blind to it by construction, which is the property this whole item
  exists to remove. It was found by opening table FIA_2 to source a different number.

  **"Decided" was ambiguous as well as stale**, and that is the part worth carrying. Disposals were
  7,799 and appeals determined at a hearing or on the papers were 4,088, one either side of the
  claim, so the sentence was unfalsifiable until someone chose a meaning. The page now gives
  appeals lodged against appeals disposed of, both cited, which is the comparison that explains why
  the appeal queue grows while the decision queue shrinks.

  **`51,000` was two different queues rounded to the same number**, which this item's own paragraph
  on value-keyed sorting predicted: the end-2019 initial-decision backlog, 51,228, on the claim
  page, and the appeals backlog a year before the current one, 50,976, on the theme page. Both now
  render exactly.

  **The peak, `175,457`, is stated by the Home Office in its own words** on the release page, which
  is why the record cites that page rather than the summary table: Asy_00a publishes year-end
  columns only and cannot show a June figure at all. Same shape as the ONS peaks in PR #87, and the
  record carries the same instruction in capitals to re-derive it rather than carry it forward.
  The 72% fall beside it is the Home Office's own figure and stays as prose, on the rule the
  citizenship card's 12% set.

  **The end-2019 queue needed a record with `series_ref`**, because the claim page is markdown and
  cannot cite a series point, which is the cost PR #90 recorded for this remedy.

  **Baseline 15 to 10**, and every one of the ten left is a decision rather than a source.

- **The net migration fall gives the reader both ends**, 2 August 2026. PR #90. The owner's
  wording, on the last **[you]** item under *The figures the data layer never recorded*. Two
  sentences stopped stating a difference the reader cannot check and now state the two figures it
  is taken from, on `/migration/` and on the net-migration-is-arrivals claim page, which carried
  the same sentence.

  **What it cost, and it is the part worth knowing before the next one of these.** The Nunjucks
  half was free: a chart note can cite a series point through the `at()` filter, so three literals
  became six citations and no record was needed. **The markdown half needed five records.** A
  markdown page cannot cite a series point at all, which the validator's own message says, so the
  established route is a metric declaring `series_ref`, the pattern PR #57 set for `100,625`. Five
  of the six values had no record: `net-migration-2` already held 331,000. Each new record declares
  its point, so `validate-data.mjs` refuses any drift between the two, and each was quoted from
  Table 1 of the release the site already cites.

  **So the rule of thumb is that this remedy is cheap in Nunjucks and costs a record per figure in
  markdown.** That is worth weighing before choosing it again, not a reason to avoid it: the five
  records are real published figures with a source, and the alternative was a page stating
  arithmetic no reader could check.

  **Baseline 21 to 15**, the largest single step the ratchet has taken down, and the first taken by
  dropping arithmetic rather than by minting a record for it.

  **Three things changed for a reader, deliberately**, which is unusual for this item: the two
  sentences, and the derived ONS row on `/sources-and-method/`, 17 to 22.

- **The migration page's four applicant and dependant splits get records**, 2 August 2026. PR #89.
  The last of that page's unrecorded figures that a record could fix. `277,000` and `17,000` are
  study main applicants and dependants, `71,000` and `74,000` the work pair, all from Table 4b of
  the year ending December 2025 release, and the bulletin states all four in prose as well.

  **The mechanism the entry worried about did not exist.** A bar's `note` is an ordinary Nunjucks
  string, so it takes the same `~` concatenation the chart summaries have used since PR #41.
  Nothing was built and nothing was parameterised.

  **The two pairs reconcile differently, and that is the finding.** Study sums exactly to its
  category total; work sums to one thousand below it. That is not a missing category: the release's
  cover sheet says every estimate is individually rounded to the nearest thousand while the
  calculations are done on unrounded numbers, so the page's existing note about independent
  rounding is the publisher's explanation rather than this site's inference. Both records say so.

  **A defect in PR #86 was found by the diff and fixed here.** `sitemap.xml` emitted its URLs in
  `collections.all` order, which is date order, and a page with no date takes its file's mtime, so
  a fresh clone produced the same sixteen URLs in a different order. It is sorted by url now.
  Nothing was ever wrong in the file, which is exactly why it was worth fixing: proving a change by
  diffing two builds is how this project verifies almost everything, and an artefact that reorders
  itself puts noise in that signal. `check-build.mjs` compares as sets and was unaffected either
  way.

  **Nothing a reader sees changed**, proved by diffing against a build of `main`: the only
  difference outside the sitemap is the derived ONS row on `/sources-and-method/`, 13 to 17.

- **The migration page's two ONS peaks and its work comparison year get records**, 2 August 2026.
  PR #87. Part of item 4, *The figures the data layer never recorded*, which that item's own entry
  tracks. `944,000` and `1,469,000` are the highest twelve-month net migration and immigration
  estimates on the current ONS basis; `272,000` is the work-related immigration figure the page's
  47% fall is measured from.

  **What the fetch established that the bulletin could not.** The bulletin calls both figures a
  peak in its own words, which is a claim about the publication rather than a maximum anyone has
  checked. Table 1 of the accompanying dataset was parsed directly and both are the largest of its
  55 year-ending periods, uniquely: no other period reaches either. That is the difference between
  reading a figure and recognising one, and it is why both records carry an instruction in capitals
  to re-derive the maximum at every release rather than carry it forward.

  **Two reconciliations came free and are the reason the vintage is not in doubt.** Every calendar
  year the site charts appears in Table 1 as its December row and all nine agree exactly: net
  migration 848,000, 331,000 and 171,000, immigration 1,441,000, 1,012,000 and 813,000, emigration
  593,000, 680,000 and 642,000.

  **The 47% is deliberately not a record.** ONS publishes it, and a reader following the chart's
  own source link finds it stated there, which is the distinction that kept "Down 12%" on the
  citizenship card. Minting it would leave three figures that must move together with nothing to
  keep them in step. It does not reproduce from the two rounded ends, 146,000 against 272,000
  giving 46%, because ONS computes it on unrounded figures; the record says so.

  **The parent records stopped restating what now has a home.** `total-long-term-immigration`
  carried the peak in its notes and `work-related-immigration` carried the comparison year, the
  same shape PR #58 found for 627,000 and PR #67 for the visitor-visa total.

  **Nothing a reader sees changed**, proved by diffing this build against a build of `main`: the
  only difference anywhere is the derived ONS row on `/sources-and-method/`, 10 to 13, which is
  that page counting itself.

- **U1, the three cheap UX items**, 2 August 2026. PR #86. A `sitemap.xml`, an id on every
  heading, `theme-color`, and a 404 description that is not the home page's. The
  `robots.txt` half of the first bullet is not here: it is inside launch gate 7 and its
  content waits on U4.

  **The heading finding was 14 pages of 17, not the three theme pages it named.** Only the
  glossary and the sources page carried any heading id, because both are markdown and use the
  `{#id}` idiom. **That idiom was never available on the pages the finding was about**: `{#`
  opens a Nunjucks comment, so writing an anchor into a theme page heading fails the build with
  "expected end of comment, got end of file", which is what a probe returned. So
  `heading-anchors` derives an id from the heading's own text where none is declared, in one
  place, the way `scrollable-regions` and `table-captions` already close their own defects for
  every page at once. A declared `{#id}` still wins; the `h1` is skipped, its link being the
  page URL; and a heading inside a `<figcaption>` is skipped because the `<figure>` already
  carries an author-chosen id and those titles name a period that moves on every release.

  **The sitemap found something that was doing nothing and was hiding five pages.** All five
  Nunjucks pages carried `eleventyExcludeFromCollections: true`, so the overview, the three
  theme pages and the claims index were invisible to `collections.all`, which nothing else in
  the repository reads. The flag is removed from all five. **The check caught it rather than a
  reading of the template**, on its first run, which is the argument for the check: the sitemap
  is derived from Eleventy's collections and compared against the files the build actually
  wrote, so the two sides come from different places and the comparison is not the same query
  asked twice. It runs in both directions, a page missing from the sitemap and a URL the build
  does not serve, and the message names the flag as the usual cause.

  **A duplicate-id check landed with it**, because deriving ids from text makes two
  identically worded headings the reachable case. The transform skips the second; the check is
  what says so if it ever stops. The `anchors` map in `check-build.mjs` is a Set, so every
  check reading it was blind to a duplicate. Both were negative-tested, and so were both
  directions of the sitemap comparison.

  **Nothing else in the built site changed**, proved by diff: every changed line is a heading
  gaining an id or one of the two head metas.

- **Both glossary launch gates**, 2 August 2026. PR #83. The wording was the owner's and is
  recorded here because a decision that lives only in a conversation is a decision that gets lost.

  **The Grant rate entry stops quoting the cohort range at all.** It had five factual defects
  against its own record and a sixth of construction: it applied an uplift the record says do not
  add, said "final outcome" where the Home Office says "latest outcome", said "after appeals" where
  the publisher says "following appeals and reconsiderations", omitted administrative outcomes from
  the exclusions, and quoted "17 to 29 percentage points" with no window, making it a **fifth site**
  of a sentence PR #72 had given the publisher's 2007 to 2020 window at four others. The entry now
  says a later rate exists, is materially higher, counts a different group over a different period
  so the two cannot be added, and links to the claim check that argues it. **Not quoting the range
  is what closed the window defect and the fifth site together**, which is why that option was
  taken over correcting the sentence in place.

  **The Net fiscal impact entry drops "a range that spans zero"** and carries the framing its two
  linked claim pages have carried since correction 1b: separate pre-Brexit static studies, small in
  magnitude, positive in some and negative in others, not one estimate with a margin of error, and
  none covering the post-Brexit system. Three pages saying the same thing three ways is what this
  gate existed to end.

  **`last_reviewed` is deliberately not bumped on the glossary.** It records what a review read,
  not when a page was corrected, which is the precedent PR #54 set; the landing date is here and in
  `CHANGELOG.md`. Whether it moves is the last checkbox of the six-page pass.

- **The small build work: A3, A5's claim-list heading item and R3**, complete 2 August 2026,
  PRs #77, #79 and #82. Six parts. The three metric value maps stopped being last-write-wins and
  every message names every candidate record; the longhand success message gained the word
  UNDECLARED and the run now names each declared literal that does equal a live value;
  `validate-data.mjs` reports a record whose notes restate another record's value; home page claim
  cards moved to `h3`; the `series_ref` comparison went beyond `value`; and the ONS revision markers
  got one home. The last part was found by writing a quote the evidence check refused, and the
  entry above has it.

  **What this item cost, and it is the reason it took three PRs rather than one.** Two of its six
  parts were gated on the A6 confidence convention, which was **[you]**, and the gate was real:
  landing the `series_ref` comparison before the regrade would have turned the branch red and
  invited whichever regrade made it green, which is the ordering `check-evidence` already taught
  this project once. **Five of the six parts were later found to carry a defect of their own** by
  the critique pass under PR #80, four of them a comment or a message claiming a property the code
  beside it did not have.

- **The £2.1bn hotel figure, re-sourced to the publication that contains it**, 1 August 2026.
  PR #73. Pre-launch audit finding 0-ZERO, and the third of the three launch gates.

  Both publications were fetched and read rather than the audit's quotation of them trusted. The
  figure is in the **Home Office Annual Report and Accounts 2024-25, HC 1133, page 75**, confirmed
  as the printed folio. The NAO's *An analysis of the asylum system* was downloaded in full and
  contains no "2.1 billion", no "5.77", and no line where "hotel" meets "billion". **The two
  neighbouring figures are correctly sourced**, £4.9bn and £3.4bn both verbatim in the NAO report,
  so nothing cascaded.

  **What made this the owner's**, adding a publisher, is done: `ho-ara`, catalogued Annual and
  deliberately kept out of `CADENCED_SOURCES`, so the published one-month commitment still names
  three releases.

  **The trap it walked into was predicted in a code comment and not by any check.** Adding a
  seventh source moved a derived count on `/sources-and-method/` from six to seven beside a list of
  names written by hand. The page would have said seven and named six, with every check green.

  **The next annual report will not update this figure.** HC 440 gives hotel headcounts and no
  hotel spending total, per-day rate or unit cost. The record says so, and says what clears the
  annual staleness prompt, because the answer is not a new number.

  **A second model found four false claims in the first version of this work**, all of them written
  while fixing a misattribution: that HC 440 published no hotel money at all, when it carries a
  £22.9m constructive loss on one contract; that the NAO report has 57 pages, when it has 56; that
  the HC 1133 correction slip corrects "a heading", when it corrects audited exit-package figures;
  and that the record had named the wrong report "for over a year", when the report it named was
  published eight months before. It also found that the home page card still put the figure above a
  source line naming the NAO, which is the defect being fixed at the most visible point on the site.

- **The grant-rate record, corrected against the publisher's own words**, 31 July 2026. PR #72.
  Pre-launch audit item A2.

  **The sources were fetched and read rather than the audit's quotation of them trusted**, which is
  the only reason the rest of this entry exists. "Latest recorded outcome" appears nowhere in the
  bulletin; the publisher's terms are "latest outcome" and "latest decision". The record no longer
  attributes the phrase, and nor does the refused-asylum claim page, which said "Its own label for
  the later figure is the latest recorded outcome". That page's other use of the phrase, describing
  the measure rather than attributing it, is left alone: audit finding 0A-bis says that use is
  unremarkable.

  **The false attribution had two further homes that neither the audit nor this file had noticed**,
  both live and neither frozen: `docs/foundation.md`, where it instructs the next person to draft a
  claim, and `CHANGELOG.md`, which called the site's own phrase the Home Office's label. The
  changelog entry is corrected in place with a dated note rather than rewritten, because it is a
  record of what was done on its own date.

  **The publisher's 17 to 29 point range now carries the window the publisher states it for, 2007 to
  2020**, at the record and four prose sites. The audit named all four. **This file's own A2 bullet
  named two of them**, and a first version of this entry blamed the undercount on the audit, which
  is a claim about a different artefact than the one at fault and is the defect this project keeps
  finding in itself. The site's own cohort reading, a fifth to a half of each **2010 to 2020**
  cohort, is deliberately untouched: that window is this site's and is not the publisher's range.

  **What a second model found, and it is the same defect the item existed to fix.** Widening the
  window made the record attribute the 2007 range to `Asy_04`, and `Asy_04` is titled "Cohort
  analysis of asylum claims, **2010 to 2024**". It cannot show a 2007 cohort. The range belongs to
  `Asy_D04`, which covers 2007 to 2024 and which the bulletin cites under Figure 4, and `Asy_04`
  names `Asy_D04` as its own source. **Note 48 still belongs to `Asy_04`**, so the sentence had to
  be split rather than have a table name swapped. A record that names a source not containing its
  figure is this project's signature failure, and the correction for it committed it.

  The same pass found the record making the publisher draw a link it does not draw: note 46 records
  that withdrawn and administratively closed claims may later be reinstated and given a substantive
  outcome, and reading that as a third route into the later figure is **this site's inference**. It
  now says so.

  "Do not add a cohort uplift to this rate" now reads as this site's rule.

  **`Asy_D04` notes 4 and 5 are recorded, and the publisher's disagreement with itself is settled in
  the record.** Note 4 gives outcomes as at January 2026 and note 5 says appeals data was not
  available at extraction for this release; the bulletin dates the same outcomes to "the point of
  data extraction in April 2026"; `Asy_04`'s note 42 gives no date at all. **January is followed**,
  being the date the cohort table publishes for itself and the earlier of the two, so the record
  claims no more currency than the publisher's own table does. Reversing that is a one-word edit.
  Nothing is inferred from note 5, because 0A-ter withdrew a blocker for doing exactly that.

  **Value unchanged at 39%**, so there was nothing to evidence, though the bulletin confirms it and
  the 49% and 77% beside it. `retrieved_date` was deliberately **not** bumped: re-reading the
  wording is not re-reading the figure, and moving that date clears the corrections watch, which is
  the runbook defect a second model found on 30 July. `Asy_D04` is declared in `table_reference`
  now, which the validator requires once a record names a table in its own prose, and which puts
  that table under the corrections watch.

- **`docs/UPDATING-DATA.md`, the by-hand update runbook**, 30 July 2026. PR #52. Written before
  the assistant-drafted version, on the rule that you should be able to do a job before you
  delegate it. What it added that existed nowhere: a real update touches eight record fields and
  not the four the scope named, plus `table_reference` as a ninth; the step is reconcile rather
  than look up; record `notes` are re-read every time while page prose is not. Critiquing it
  against the site's own published promises found that the first draft never mentioned
  `CHANGELOG.md`, which `/sources-and-method/` promises carries every figure change.

- **The bold link in `most-immigration-is-asylum`**, 30 July 2026. PR #51. Moved off the term and onto
  descriptive text inside the same sentence, so all three list items now open with a bold term.
  It was on the editorial list because fixing it was thought to need the sentence rewritten. It
  did not: every word is unchanged and the glossary link survives. Linking all three terms
  instead was checked and is not available, because the first item's term has no glossary anchor.

- **`eu-settlement-scheme-settled-status-grants` brought onto the current release**, 28 July
  2026. PR #45. Found and fixed the same day, while re-verifying the phase 1 endpoints: it
  held 354,647 for the year ending December 2025 while every other Home Office figure cited
  the year ending March 2026. Neither existing check could see it, which is why the notifier's
  comparison is now per cited edition rather than per source. The comparability question the
  finding raised is settled by arithmetic: both editions are `EUSS_QTR` settled conclusions
  plus the automated-grants estimate, 270,235 plus 100,300 against 267,977 plus 86,670. The
  note beside the figure was stale too, at 4.4 million grants since 2018 where the release now
  says 4.5 million. No page cites this record, so nothing a reader sees changed, proved by
  diffing the built site. First real use of the evidence contract.

- **Citing a series point, and the four figures held twice**, 28 July 2026. PR #41. All three
  parts of **`docs/SERIES-CITATIONS.md`**, which is marked built and kept as the reasoning.
  The four metrics that are also series points declare `series_ref` and cannot drift from it;
  an `at(year)` filter cites a series point inside a chart summary; a series value written
  longhand fails the build. Three things the scope had wrong, and one hole found and closed
  after it, are recorded in that document rather than restated here.
- **The update commitment**, signed 23 July 2026. One month from each of the three cadenced
  releases; irregular publishers carry no promised schedule.
- **The foundation drift read**, 23 July 2026. PR #14.
- **The design and accessibility rounds**, 23 July 2026. PR #12.
- **The 37-defect audit list**, 22 July 2026.
