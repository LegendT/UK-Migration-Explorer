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
frozen from the consolidation of 4 August until 5 August 2026. It was the live half of The order's
item 2, carrying unticked checkboxes the owner worked, so telling a session never to edit it would
have shut the one document that item required opening. **Item 2 closed on 6 August 2026 and the
document is now a record**: every verdict is given, and its one remaining unticked box is itself a
verdict, so nothing further is expected to be marked in it. `docs/PRE-PUBLICATION-REVIEW.md` is
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
2. **CLOSED 6 August 2026 (PRs #158, #160 and #161).** The six pages the review never opened have
   been through `docs/PRE-PUBLICATION-REVIEW.md`. The evidence written in PR #76 was
   **regenerated against the live site before any verdict was given**, having gone stale under the
   pages it quoted, and the failures it found were corrected and then re-answered against the
   corrected pages rather than marked off on the promise of a fix. **The last checkbox stays
   unticked and
   that is a verdict rather than an omission**: `last_reviewed` records what a review READ, which
   is the precedent PR #54 set, and these six were not re-read, so their older dates stand and a
   reader meets them in the page footer. It is under *Completed*.
3. **CLOSED 6 August 2026 (PR #163).** The reader-facing wording batch: everything under A4 and R1,
   plus the two sources-page wording bullets at the end of *Scoped, not built* section 6. The calls
   came back on 4 August 2026 and every one is applied or needs no change. **Call 10 is decided,
   deliberately unapplied, and is carried by item 19 below**, where the real screen reader its own
   decision waits on already sits and which already named it in terms. **This entry was a gate
   whose last content depended on a non-gate**, the screen reader having been put after Launch on
   4 August 2026, so as written it could never have closed before the launch it was blocking.
   Closing it moves no work. It is under *Completed*.
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
6. **CLOSED 6 August 2026 (PR #154).** The UX review, U3 to U5, and those sections now hold
   nothing. `metric_name` in the citation block and the theme-to-claim links are built;
   `/sources-and-method/#reuse` names the MIT half and the two publishers whose figures are not
   Crown copyright, which is the question applying call 27 raised; call 28's wording is confirmed
   rather than replaced, on the owner's word; and the reader-facing `/changes/` page is decided
   against, on a measurement that is under U3. U1 was done in PR #86 and U2 closed in PR #118.
   **U4's call 26 is the one thing any of these sections still points at, and it was never this
   item's**: item 17 says what it decides is the content of the `robots.txt` that item 17 writes.
   **This entry accounted for less than its own header named on two successive days**, which is why
   U3 and U4 carry the state and this line carries only the outcome. It is under *Completed*.
7. **CLOSED 5 August 2026 (PR #138).** U6's three findings are all built: the navigation (PR #109),
   the chart remedy (PR #113) and now the seven-table finding, call 29, where the first-column
   floor is scoped to the wide rendering and the Sources catalogue is rendered twice, a definition
   list below 40em and the table above it. At 320px it goes from 42% hidden to nothing hidden.
   **The other six tables still scroll and that is the decision, not an omission**: they are 0 to
   28% at 320px, worst on the costs page, and a scroll container is defensible there. **This entry
   read "nothing but [you] is left of it" until 5 August 2026 and no [you] work was named anywhere
   under U6**, the sentence having been written while call 29 was still undecided and kept after it
   was decided as **[me]**. It is under *Completed*.
8. **CLOSED 6 August 2026 (PR #163).** A1, and its scope was full validation of all data, not only
   the reader-facing
   records. Decided 2 August 2026, and it was the largest item on this list. **Its last question is
   answered: `population/share-of-london-residents-born-abroad` keeps `official`**, and A1 below
   says why rather than this line saying it a second time. It is under *Completed*. **Calls 30 to
   35 are
   applied (PR #144, 5 August 2026)**, so every record in the data layer now carries evidence and
   the ones the batches left as **[you]** are decided and built. No published figure moved. **No
   count is written here**: `npm run build` prints what is reserve, and
   `node scripts/check-backlog.mjs` would refuse to let this line say how many lack an evidence
   entry. Those are two different numbers and this line gave one figure for both until 3 August
   2026. **The series-evidence gap under A1 is built (PR #147, 5 August 2026)**, so every series
   evidence entry naming a block that still holds its declared vintage is re-read on every run,
   and `previous_vintage` is asked of every series claim a branch adds rather than only of a block
   that moved. **The grade question the applying raised was the last thing in this item**, and it
   is answered above and under A1 below.
9. **CLOSED 6 August 2026 (PR #157).** The release notifier's last phase, which is *Scoped, not
   built* section 3's phase 4: what `/sources-and-method/` says about automation is rewritten and
   signed off, so all five phases of `docs/UPDATE-AUTOMATION.md` are built. It is under
   *Completed*.
10. **CLOSED 6 August 2026 (PR #163).** The undrafted claims, which is *Scoped, not built* section 5. **Every
    draftable one is drafted**: PRs #131, #132 and #133 with their verdicts given on 4 August 2026,
    PRs #145 and #148 on 5 August, PR #152 on 6 August, and the last of them, the lifetime
    contribution claim, in this list's own closing pull request. **Seven were draftable, not
    eight**: "Local areas all carry the same pressure" needs per-capita local authority figures and
    `data/` holds none, so this item closes with a claim from 8.5.3 unwritten and says which. That
    refusal and the written pages together account for the whole of 8.5.3, which section 5 sets
    out; nothing is trailing.
    **The last one was a wording call before it was a draft**, because 8.5.3 specifies a figure
    this site published itself and then moved, and the answer decided on 6 August was to quote the
    circulating sentence and correct it by saying that no single figure exists. **No count is
    written here, in digits or in words**: `npm run validate` prints the direction split. It is
    under *Completed*.
11. **CLOSED 4 August 2026 (PRs #121 and #124), and A3 is closed with it.** `main` is protected:
    the `validate` job is a required status check, `enforce_admins` is on so it binds the owner
    too, and force pushes and deletions are off. Probed rather than read: a direct push to `main`
    is refused with `GH006, Required status check "validate" is expected`. So every claim in this
    file that a check gates a pull request now means what it says.
12. **CLOSED 6 August 2026 (PR #159).** The review is recorded as passed in `CHANGELOG.md`. **Its
    precondition was item 2, and item 2 met it by verdict rather than by tick**: every six-page
    verdict was given, and the box left unticked is itself a verdict, so waiting on it would have
    been waiting for a mark nobody intends to make. **Its scope was decided as sixteen pages on
    2 August 2026 and was signed wider**, because claim pages published after that decision were in
    neither the review's ten nor item 2's six, and signing at sixteen would have left live pages
    outside the signature on a site whose stated objection to others is scope silence. Signing also
    backs this site's published no-attribution policy over the reviewer's own selection criteria
    2.6 and 2.7, which it failed and which were kept deliberately. It is under *Completed*.
13. **CLOSED 6 August 2026 (PR #167).** R4, the reader-facing accuracy batch from the pre-launch
    critique. **This entry read "BUILT ON `item-13-reader-facing-accuracy` AND NOT MERGED" until
    10 August 2026**, four days after the branch it names was merged into `main`. The entry was
    right about its own closing rule, that a thing is done here when it is on `main`; nothing
    reread it against `main` once that became true. Found by the pre-launch sweep of 10 August
    2026. It is under *Completed*.
14. **CLOSED 6 August 2026 (PR #167).** R5, the sourcing and provenance batch, merged by the same
    pull request and stale in the same way and for the same four days. **Two entries carrying the
    identical false sentence is the shape this file already names**, a correction landing at its
    named site and going stale one reference away, and here neither reference had a correction to
    miss: the branch merged and no hand returned to the list. It is under *Completed*.
15. **CLOSED 10 August 2026 (PR #170).** The pre-launch sweep's gate, which is R7 below. All
    five findings are applied and on `main`: the footer that called every figure an official
    statistic, appeal cases compared with people, three cards citing publishers their link did
    not reach, the `ho-ara` supersession review, and the review footer's figures sentence on
    pages with no figures. The two **[you]** calls were applied as recommended drafts, the
    footer's wording and the card's date label, and overruling either changes one string.
    **This entry read "BUILT IN THE PULL REQUEST THAT CARRIES THIS LINE AND NOT YET MERGED"
    for the rest of the day after PR #170 merged**, which is the defect it was written to
    replace: items 13 and 14 carried that same sentence for four days and this file closed them
    for it that morning. **The sentence is self-falsifying and should not be written again**, in
    any entry, because the pull request that carries it is by definition open when it is written
    and merged the moment the entry becomes true. Say which branch, or say nothing. It is under
    *Completed*.
16. **CLOSED 11 August 2026 (PRs #171 and this one).** R8, the reader-facing batch. **Most of it
    merged in PR #171 and two entries did not, and this entry did not say so**: the mirror
    claim's own sentence still named the page it did not link to, and the glossary still defined
    neither of the two charges the money pages spend. Found by checking the section bullet by
    bullet against the built site before closing the item, rather than closing it because its
    pull request had merged. **That check is the point of this line.** The three entries above it
    were closed late for saying they were unmerged when they were; this one would have been
    closed early, which is the same defect pointing the other way and the more dangerous of the
    two, because a closed item is not read again. It is under *Completed*.
17. **GATE, and deliberately last of the gates. Launch. THE REPOSITORY HALF IS DONE (PR #153,
    6 August 2026), and nothing is ahead of it any more;
    Search Console is what is left and it is [you].** The gate as originally worded said delete
    `content/robots.txt` and its guard, and **the UX review said write that file rather than only
    delete it**, which is what happened: the file admits retrieval agents that emit a linked
    citation and refuses crawlers documented as collecting training data, on call 26 under U4, with
    a `Sitemap:` line pointing at the sitemap built in PR #86. The guard in
    `scripts/check-build.mjs` was swapped rather than deleted, so it now asserts the launch state
    and would fail a build that quietly closed the site again. **The pre-launch notice went with
    it**, in the same change rather than a later one, because a page served from the commit that
    launches saying the site is not launched yet would be false on every page; removing it at
    launch was decided on 27 July 2026 (PR #54). **What is left needs the owner's own accounts and
    nothing in this repository**: verify the domain by DNS TXT record, chosen on 6 August 2026 over
    the HTML-file and meta-tag methods, and submit
    `https://ukmigrationexplorer.org/sitemap.xml`. That is how success measure 2 would be noticed.
    **[you]**.
    **This entry has twice named a gate ahead of it that had closed.** Items 13 and 14 until
    10 August 2026, then item 15 until 11 August. Both times it was written on a branch cut
    before the closing happened, so a true sentence arrived stale through a merge rather than
    through neglect, and both times the merge is where it had to be caught. **It now names no
    other item**, which is the only version of this sentence that cannot rot: what is ahead of
    Launch is whatever The order still shows open above it, and that is readable from the list
    itself.
18. **NOT A GATE, and that is a decision rather than an oversight. Talk to five target users.** A
    week, in parallel with everything above, and the one acceptance criterion foundation section
    18 says can save the whole build. The two comprehension criteria are tested by this and by
    nothing else. **[you]**.
19. **NOT A GATE, on the same decision. A real screen reader over the pages** **[you]**, then
    A5's `aria-describedby` change that is gated on it **[me]**, and R1's call 10 with it. It is
    also the published limit most worth closing.
20. **CLOSED 5 August 2026 (PR #149).** The scroll-region checks could not see a region carrying a
    second class, in all four patterns across the transform and the checker that is supposed to
    disagree with it. It is under *Completed*. It existed as an item because nothing else in this
    list pointed at it: item 4 named A5 and closed on 5 August 2026, and item 19 names one specific
    A5 change rather than the section, so the work had been written into a section the ordered list
    no longer reached. **That was the A6 orphan repeating within a day, by the hand that had just
    written up A6's**, which is why it was a numbered item rather than a sentence somewhere.
21. **CLOSED 6 August 2026 (PR #166). It was a GATE**, decided so on the reasoning of 4 August
    that a site whose subject is other people's misuse of statistics cannot launch with its own
    trust work outstanding. The costs page framed net fiscal impact the way correction 1b retired.
    Found by the docs audit of 6 August 2026, from the one item `docs/PRE-LAUNCH-AUDIT.md` still
    marks open. `content/costs.njk` rendered "Contested, method-dependent, and lands within about
    plus or minus 1% of GDP either way" on `/costs/`, which is invalid because the bound is the
    spread across separate studies rather than an uncertainty interval around one estimate, and it
    carried no scope, so it read as a current fact about a system none of those studies covers.
    **The two claim pages were fixed on 27 July 2026 and the glossary on 2 August (PR #83); this
    card was missed both times**, which made it **the fourth instance of the
    correction-missing-its-siblings shape**, whose remedy this project had already written down as
    "grep the claim, not the page". **`data/meta.json` and `data/fiscal.json` carry the phrase too
    and are NOT defects**: both attribute it to the studies, checked rather than assumed. The card
    now says there is no agreed figure, scopes it to the pre-Brexit studies, and attaches the
    magnitude to the estimated effect rather than to the studies, which a critique round caught in
    the draft. It is under *Completed*.
22. **NOT A GATE. Choose the success measures, and record which.** Found by the docs audit of
    6 August 2026. Foundation section 4.2 offers three candidates and says they must be chosen and
    committed to in phase 1: cited by a named outlet or briefing within six months; organic search
    entries on definitional queries; return visits in the week after a major data release. **None
    has been chosen.** Section 17 makes it a process criterion, alongside talking to five target
    users, and `docs/foundation.md` said of it "**it is the only one with nothing pointing at it**",
    which was true until this entry existed and is corrected there rather than left standing.
    **This list twice calls one of them "success measure 2" as though the set were adopted**, under
    item 17 and under call 26, where 4.2 offers candidates in prose and numbers nothing. **Adopting
    a numbering may not reconcile those two, and that is part of the decision**: item 17's is
    Search Console, which reports organic search entries and maps to 4.2's second candidate
    cleanly; call 26's is retrieval citation, an assistant citing the site in an answer, which is
    neither plainly that nor plainly the first candidate about a named outlet or briefing. One of
    the two may need rewording rather than numbering. **Timing
    matters and is the reason this is not a gate**: two of the three can only be read after launch,
    and the first runs a six-month clock that starts at it, so choosing them before launch is worth
    more than choosing them well after. **[you]**, and nothing is built either way.

23. **NOT A GATE. The minor findings of the pre-launch critique, which is R6 below. MERGED
    6 August 2026 (PR #167), and the code tidy with it.** **This entry read "BUILT on the same
    branch and not merged" until 10 August 2026**, the third of the three that did, and the only
    one of the three that stays open on its own account rather than on that sentence. Applied: the Migration Observatory
    grades and their evidence entries, the counts in `README.md`, `docs/foundation.md` and
    `docs/UPDATE-AUTOMATION.md`, the census entry in `data/sources.json`, the glossary
    cross-references, `content/404.md`, the provenance disclosure's target size, and both
    accessibility gaps: the page list is compared against the build in both directions and the
    dark palette is audited on every run. **The code tidy of 6 August 2026**: the HTML escaper had
    one home made for it in `lib/escape.mjs` where five files each held a copy, the withdrawn
    y-label flag is gone from `lib/charts.mjs` with the measurement that withdrew it kept and the
    three comments that outlived it corrected, the bar chart's text size is carried per rendering
    and held against `content/assets/style.css` by `scripts/check-build.mjs`, the inputs that
    produced NaN coordinates are refused with the chart named, and `eleventy.config.js` lost an
    unread global and a note describing a defect fixed the day before. **Both refactors were
    proved to change nothing**, the built site being compared byte for byte against the commit
    before them.
    **Two findings were refused rather than fixed.** The bar labels on `/costs/` were reported as
    unitless against the style guide, and `content/style-guide.md` carries no rule about units,
    its subject being contested vocabulary, while the chart's own heading states the unit. And
    two unread global registrations were reported in `eleventy.config.js` where there was one.
    **What is left is two labelling points**: the table on the most-immigration-is-asylum check
    has no caption and its scroll region falls back to a name that says nothing, and a claim is a
    heading with no "The claim" label travelling with it in heading navigation. **[me]**.
24. **NOT A GATE, and it is the one thing under R6 that is not cosmetic. An evidence entry can be
    retired from every pass by editing its own value.** `scripts/check-evidence.mjs` audits an
    entry only where the record still exists and still holds exactly what the entry declares,
    which is deliberate and is what stops the audit trail having to be deleted when a figure
    moves. The gap is the other side of it: the base-branch loop asks about figures that moved,
    so if the ENTRY moves instead, by a hand editing its `value`, the entry stops being read and
    nothing asks why. Nothing suggests it has happened; the quotes were re-read on 6 August 2026.
    **Deliberately not taken in the same session as the sign fix**, because this is the script the
    whole evidence contract rests on and the shape of the remedy is a real question: probably that
    a branch changing an entry's `value` must show the record moving with it, which is the
    machinery the base-branch comparison already has. **[me]**, as its own piece of work.

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

**Six calls, all decided 4 August 2026 and all APPLIED (PR #144, 5 August 2026).** Each was a
**[you]** call because the fix costs more than a re-source. **Every premise was reproduced against
the source before the fix was built, and two came back sharper than they were written.** Call 31's
briefing prints no decimal percentage at all, confirmed by searching the stems 80 and 74 with a
control that did hit, so it could never have contained either rate. And call 32's record is not
merely named for the wrong base: the same section of the briefing gives 20% for employee jobs and
19% for employees on one definition, so the confusion it invites is between two published figures
rather than between two definitions. What each call turned out to be is below, kept because the
next bullet here is written by the same hand:

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
  record nothing renders. **Dropping it falsified one line of
  `docs/PRE-PUBLICATION-REVIEW-SIX-PAGES.md`**, which cited the record as evidence that a figure is
  published on three bases at once, so that line was corrected in the same pull request. The
  publisher still publishes all three; the data layer no longer holds the third.

**WHAT APPLYING THEM COST, AND THE ONE THING THAT COULD NOT BE BUILT.** Call 30 re-dated the
citation and cannot re-point it: `source_url` must resolve to the publisher's own host, so the
Internet Archive address of the December edition can go in the notes and in the evidence entry and
never in the field a reader clicks. **Probed rather than assumed**, the archive URL being refused
twice by `validate-data.mjs`, as an uncatalogued publisher and as a host disagreeing with
`source_id`. So the record now cites a living page whose current edition states a different figure,
says so in its own notes, and quotes the December edition as its evidence. **That is the honest
state of citing a living page by edition, not a defect left behind**, and the alternatives were
refused by the call itself: updating to 17% moves a value, retiring it removes a record.

**The one [you] question the applying raised is ANSWERED, 6 August 2026: the grade stays
`official`.** `population/share-of-london-residents-born-abroad` holds 40 for a source that says
"More than 40%". Call 34 decided the remedy was to say so in the record, which is done, and the
name now carries "(floor)". **The grade describes where a figure came from and it came from an
official publication**; the floor is stated in the record and in the record's own name, which is
where a reader of the data layer meets it. `estimated` was the alternative and would have meant
rewriting the evidence entry into components, since a regrade across the derived boundary changes
what kind of evidence the check demands. Nothing was blocked either way and the record reaches no
reader, which is why it is recorded here and cost nothing to apply.

**The [me] gap is built (PR #147, 5 August 2026): a series evidence entry was validated by nothing
at the moment it was written.** `check-evidence` asked only a block that MOVED, so an entry for a
block sitting still was never re-read, which is the same shape as the record-level gap PR #100
closed and a smaller surface, four files rather than the whole record set. Batch 2 wrote three such
entries, so the gap was live rather than hypothetical, and their quotes were generated from the
fetched table with a per-point assertion for that reason. It is under *Completed*.

**What building it turned out to need, beyond what this bullet named**, kept because the next
bullet is written by the same hand. The re-reading pass was the half named here, and it has a
sibling the bullet did not: `previous_vintage` was read by the release loop alone, so a claim
written for a block sitting still could say anything in that field and be asked by nothing, which
is the twenty-eight-backfilled-entries defect one level over, and four blocks carry no entry yet.
Both are in that pull request, and it says so rather than letting the wider diff pass as the
bullet's own scope. **And the ordering rule held**: the entries were fetched and written in batch 2
and the check landed after them, where landing it first would have turned the branch red until
entries existed and forced the fabricated quote the evidence contract exists to prevent.

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
- **`check-build.mjs` could not see a scroll region that carries a second class. DONE (PR #149,
  5 August 2026)**, found on 5 August while applying call 29. Both of its scroll-region assertions
  matched `class="scroll-x"` with the closing quote, and the `scrollable-regions` transform in
  `eleventy.config.js` matched the same way, where it is worse than blindness: the wrapper read as
  no wrapper and the table was wrapped a second time, so a region ended up nested inside a region.
  It shipped into a build during PR #138 and was found by counting `.scroll-x` in the built page,
  with `npm run build` and pa11y both green.
  **Two things this bullet had wrong, recorded because the next bullet is written by the same
  hand.** It said the three checks go silent, and only the attribute checks do: the wrapper check
  says the opposite of the truth, reporting a correctly wrapped table as unwrapped, and it stayed
  quiet in the shipped case only because the transform had already added a second plain wrapper for
  it to find. And **a character class is not the fix**: `class="scroll-x[^"]*"` reads
  `class="scroll-xy"` as a region. The class attribute is a space-separated list, so the token has
  to be matched as a whole member of it. The five strings became eight, four that must count as a
  wrapper and four that must not, plus a whole-build probe with the toggle class put back on the
  region and a control on the old patterns that reproduced the nesting.
- **Point `aria-describedby` at the visible chart summary** instead of duplicating it into
  `<desc>`. **Gated on a real screen reader**, which this project has never run, so it is
  **[you]** first, at The order's item 19.
- **Closed here**: call 16, the contact address, applied in PR #130 as
  `corrections@ukmigrationexplorer.org` in all three places the issue tracker was the only door.
  **The mailbox must exist before launch and nothing checks that it does.** Call 17, which
  pipeline gates what, applied in PR #122. The claim-list heading level, done in PR #77.

### A6. Decisions with no build behind them

Each is one call. None blocks anything. **The three decided calls are applied (PR #136, 5 August
2026), and so is the question that applying them raised**: call 24's residue split, the 47% half
landing in PR #136 and the `date` field on the fiscal-impact record in PR #139. **Nothing is left
here.** This paragraph said a question was still open until 5 August 2026, having been written
before PR #139 and kept after it. It is the same defect The order's item 4 records against this
section, arriving a second time by the same route: a conclusion kept after what it concluded from
had changed.

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

**One call is left, and it is carried by The order's item 19 rather than by item 3, which closed
on 6 August 2026.** Call 10 waits on the real screen reader by the last clause of its own
decision, and item 19 is where that test lives. **Item 3 was a gate whose last content depended on
a non-gate**, item 19 sitting after Launch by a decision of 4 August 2026, so leaving call 10
inside it would have blocked the launch on something the same list had put after the launch.

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

Nothing is left of it but the `robots.txt` sentence, which is inside The order's item 17 and stays
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
  theme page has somewhere to send whoever meets it. It was **[me]** and it is done.
- **The `metric_name` in the citation block. APPLIED (PR #154, 6 August 2026), and the grade
  vocabulary inside a name is kept rather than stripped: it is the record's own description, and a
  citation a reader pastes elsewhere should not be tidier than the record. Fifteen entries across
  the site cite one publication for more than one figure, one of them for five, which the block was
  collapsing in silence. What follows is why it was held back, kept because it was the reasoning.**
  It was NOT released with the confidence-grade bullet, and that was deliberate. The
  block does not say which figure each publication was cited for, and the field that would say it is
  `metric_name`, which appears nowhere in the built site today and carries the grade vocabulary in
  its own text: "Foreign-born share of total UK population, mid-2024 (calculated, provisional)".
  That prints grade vocabulary inside the block a reader copies, which is a different question from
  printing a grade beside a figure, and U2 deferred it here rather than building it. **Releasing it
  as a by-product of the confidence-grade bullet would have been deciding it by omission**, so it stayed
  **[you]** until 6 August 2026 and was worth seeing rendered before deciding. The place it earns most is
  `/common-claims/nineteen-per-cent-born-abroad/`, where this site's own calculation and the
  Migration Observatory's figure sit in one citation block with nothing saying which produced the
  19%. The mechanism already resolves the records, so building it is small once it is decided.
- **Call 28, the withdrawn-claim stub. APPLIED (PR #137, 5 August 2026), and its WORDING IS NOW
  CONFIRMED rather than replaced, on the owner's word of 6 August 2026**, so what shipped is the
  settled text. This bullet records that it was a session's draft, which is what the
  confirmation was needed for.
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
  repository can reach. **What shipped was a session's draft**, and replacing the words would have been a one-line
  edit to `content/_includes/claim.njk` changing no behaviour. It was **[you]** to confirm or
  replace, and it was confirmed.
  **Pausing clears the twelve-month build error deliberately**, because Netlify runs `npm test`
  before it builds, so left firing it would fail the deploy on the very claim just taken down and
  the state would be unreachable. A printed list names every paused claim instead. Pausing stays a
  deliberate act rather than a timeout: automatic would trade a check that stops a deploy for a page
  that quietly empties itself.
- **A reader-facing `/changes/`. DECIDED NOT TO BE BUILT, 6 August 2026**, and refused on a
  measurement rather than on taste: `CHANGELOG.md` holds 151 distinct comma-grouped values, 68 of
  them held nowhere in `data/`, and `validate-content.mjs` REFUSES a longhand figure no record
  holds. So a markdown page fails outright, and a template reading the file at build time passes
  the scan while shipping those figures unguarded, which meets the rule by evading it. The
  changelog stays a file on GitHub. **This bullet said it was linked from the corrections section
  until 6 August 2026**: it is not, and never was. That section names it twice in plain text. The
  link is in `base.njk`, so it is in the footer of every page, and on `/about/` and the 404. The
  promise is kept, for a different reason than this bullet gave.
- **Theme-to-claim links. APPLIED (PR #154, 6 August 2026).** Pages declare `figures:` in front
  matter and so does every claim, so the join is computed at build time and a claim added later
  appears without anybody remembering. It renders 7 items on `/asylum/`, 4 on `/migration/` and 2
  on `/costs/`. **The numbers first proposed for this were 8, 4 and 3 from 21, 16 and 10 declared
  figures, and all six were wrong**: the parse ran over the whole file rather than its front matter
  and swallowed chart bar lists. The real declarations are 20, 15 and 9. A count put in front of
  the owner to decide on gets the treatment a published figure gets.
- **Closed here**: no visible door to the data layer, done in PR #105. The whole `data/` directory
  ships with the site and the Reuse section lists every top-level file with a link and a count,
  generated from the directory rather than typed.

### U4. Two decisions, both decided 4 August 2026. Call 27 is applied, call 26 lands with item 17

- **Call 26. AI crawlers**, and it is not binary. Allow retrieval bots that emit linked citations,
  refuse training-only bots. Retrieval citation is success measure 2's most likely route, and
  blocking keeps the option open where allowing does not. **NOT YET APPLIED, and it gates The
  order's item 17.**
- **Call 27. Structured data. APPLIED (PR #143, 5 August 2026).** The home page carries `WebSite`
  and `Organization`; `/sources-and-method/` carries a `Dataset` whose file list is generated from
  the same directory read that renders the Reuse section, so what a reader is given and what a
  machine is given cannot diverge. No new prose: the description is `data/meta.json`'s own, which
  nothing rendered until now, and its claim that every figure carries all fourteen named fields
  was checked against every metric rather than trusted.
  **The deprecation this was gated on holds, and checking it produced a better reason than it.**
  Google's post of 12 June 2025 lists Claim Review among the types that "will no longer be
  supported in Google Search results", and its update of 8 September 2025 removes it from Search
  Console reporting, the Rich Results Test and the appearance filters from the next day. The markup
  survives only in Google's Fact Check Explorer, **whose guidelines require a page to "clearly
  attribute the specific claim that you're assessing to a distinct origin (separate from your
  website)"**, where `content/style-guide.md` tells readers "We do not attribute claims to named
  people." So the surviving channel is closed to this site by this site's own published policy,
  which is the ground that does not rot if Google reverses the other one. `check-build.mjs` now
  refuses a `ClaimReview` node rather than leaving that reasoning in a comment.
  **One question it raised is APPLIED (PR #154, 6 August 2026)**, and the alternative was refused
  because it changes what the site publishes: `#reuse` now names the MIT half, what it covers, and
  the two publishers whose figures are not Crown copyright, while `LICENCE` is still served
  nowhere. What it said before, and why the alternative was weighed: `license` pointed at `/sources-and-method/#reuse`,
  which states the Open Government Licence for most figures and does not mention the MIT half or
  the two publishers whose figures are not Crown copyright, while `LICENCE` itself is not served by
  the site at all. Serving it and pointing at it is the alternative, and it changes what the site
  publishes.

### U5. Considered and cut, with the reasoning, so they are not re-proposed

- **Site search.** Nine nav items, a glossary, and a page count `npm run build` prints rather than
  this line: it read "Seventeen pages" until 6 August 2026 and the build then said 24. **The cut
  stands and the growth strengthens it**: a hand-maintained index is a second list that rots, which
  this project has been bitten by twice, and it rots faster the more pages there are.
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

**All three closing steps are settled.** The `last_reviewed` question was settled by asking
what the review actually READ rather than which pages had been corrected: ten pages carry
`2026-07-27` and the other six are deliberately left on their older dates, because the review never
opened them and a reader sees the date (PR #54). **That precedent then decided the six-page pass's
own last checkbox**, which is why item 2 closed with it unticked. The pre-launch banner was
corrected rather than removed, because removing it would itself have asserted the third step; it
still goes at launch (PR #54). **The third step was The order's item 12, recorded as passed in
`CHANGELOG.md` on 6 August 2026 (PR #159).**

**How the corrections were tagged**, and it is the mapping this project calls the highest-damage
thing to get wrong: **[you]** marked an editorial or sourcing call only the owner makes; **[me]**
marked a mechanical or factual change against a cited source.

**Then, and only then: remove the robots rule**, which is The order's item 17.

---

## Scoped, not built

**Sections 3 and 5 block launch as of 4 August 2026**, as items 9 and 10 of The order; the rest of
this heading does not. Each has a scope document; read it before starting.

### 3. Release notifier and evidence check: all five phases built

**`docs/UPDATE-AUTOMATION.md`.** Five phases. Phases 1, 1b, 2 and 3 were built in PRs #43, #46,
#48 and #56, and **phase 4, the reader-facing trust statement, was signed off and applied on
6 August 2026 (PR #157)**, closing The order's item 9. Nothing here is left to build.

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

**CLOSED 6 August 2026 with one claim from the specification deliberately unwritten.** Foundation
section 8.5.3 specifies fifteen, fourteen are written and the fifteenth is refused, so the
accounting closes rather than trailing off: **fourteen plus the refusal is the whole
specification.** Read the drafted count off `npm run validate`, which prints the direction split,
rather than off this sentence. Seven of the fourteen came from this drafting programme.
Three were drafted in PRs #131, #132 and #133 on 4 August 2026,
"Small boat arrivals are the whole asylum system" in PR #145 on 5 August, "Visa grants equal
arrivals" in PR #148 on the same day, "Asylum hotels cost £8 million a day" in PR #152 on
6 August, and the last, the lifetime contribution claim, in the pull request that closed The
order's item 10. **What cannot be written is "Local areas all carry the same pressure"**: it needs
per-capita local authority figures and `data/` holds none, so it is refused on the data layer
rather than deferred. The order they were proposed in is in PR #132.

**What the last one took, kept because it is the only one whose wording was a call before it was a
draft.** 8.5.3 specifies the claim as "The average migrant contributes £341,000 over their
lifetime", and £341,000 is a figure THIS SITE published until 3 August 2026, as the age-80 point
of an OBR chart whose age nobody had written down. Moving to age 82 moved it. So the page could
quote the circulating sentence, or the figure this site now publishes, or no figure. **Decided
6 August 2026: quote the circulating sentence and answer that no single figure exists**, because
the endpoint age is what does the arithmetic and this project's own figure having moved on that
choice is the sharpest demonstration of it available. The alternative would have corrected a
sentence nobody circulates and read as endorsing this site's own pick of age.

**Who drafts, decided 30 July 2026.** A session drafts and proposes; the **verdict and the short
answer come to the owner before merge**. The spec in 8.5.3 is a starting position rather than an
instruction: the tagging history marks short-answer writing **[you]** every time it has arisen, and
four of its rows were overtaken by the review on 27 July.

**Three things a drafter should know**, found by doing the first one:

- **`.pa11yci.json` is hand-maintained and does not follow the sitemap**, so a run passes seventeen
  of seventeen with a new page missing from it. Read the pass count against what the build printed.
- **A page can pass every check and still assert what its figures cannot show.** The small boats
  draft compared two published totals over one year and then wrote a sentence about which people
  were in the system, which those counts cannot establish; it survived `validate-content` because
  prose about figures is unprotected, and was caught by reading the built page. The remedy that
  holds is to say what the two totals are and to state plainly that a share cannot be formed from
  them.
- **A markdown claim page resolves records and not series points**, so a comparison against a series
  has to point at the chart that shows it.
- **A mirror pair is enforced in both directions.** `validate-content.mjs` requires a reciprocal
  `mirror_of`, which is how the refusal claim is wired to
  `content/claims/refused-asylum-seekers-are-eventually-recognised.md`.

**The direction split is the thing to weigh before writing more.** `validate-content.mjs` counts
parsed files in `content/claims/`, so a direction assigned to an undrafted claim changes nothing;
only a merged page moves the split. It stands at ten restrictionist to three pro-migration, PR #152
having merged, further off the enforced floor still, which reopens the option of dropping claim
2.7 that correction 1g found closed. **The one remaining claim corrects a pro-migration claim**, the
lifetime contribution one, and it needs its own figure checked first: the record it would rest on
moved from £341,000 to £297,000 in PR #129, so the claim as specified in 8.5.3 quotes a number this
site no longer publishes. **That makes its wording a call before it is a draft**, and the call is
whether the page corrects the figure as it circulates or as this site now publishes it.

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
  at a week. The order's item 18.
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

## From the pre-launch critique, 6 August 2026

**Eight review dimensions ran in parallel over the whole repository**: the data layer, the claim
pages, the other pages, the build and library code, the checking scripts, the durable documents,
accessibility and UX of the built site, and a hostile expert reading. **Every blocker and
serious finding was then put to an independent verifier told to refute it**: open the file,
reproduce the defect, and check this file and `docs/HANDOFF.md` before confirming. Fifty findings
came back and four were refuted, including one that read the appeal-rate denominator wrongly and
one that reported chart titles announced three times where the markup does not do it.

**What was run, and passed, before anything was judged**: `npm test`, `npm run validate`,
`npm run build`, `npm run a11y` at every URL, `npm run check-evidence`, `npm run check-sources`
and `npm run check-releases`. Every watched source is on the edition the site cites and every
source URL resolves. **So none of what follows is something a check was already failing on.**
That is the point of it: these are the defects that live in the space the checks do not reach,
which `scripts/validate-content.mjs` names itself: "a citation protects the value, never the
verb around it".

**Measured directly rather than inferred, and all clean**: no page overflows horizontally at
320px, on every built page; every interactive control meets WCAG 2.2's 2.5.8 target size, with
inline prose links taking the inline exception; and the dark palette's contrast passes at AA on
every page sampled, chart text included, where the in-bar knockout labels sit on light bars at
about nine to one. **The dark theme is verified and guarded by nothing**, which is R6's last
entry: `.pa11yci.json` sets no colour scheme, so the run that reports every URL clean reports it
for the light theme alone.

### R4. Reader-facing accuracy, and every one of these is on a live page

**These are the blockers.** Each is a statement a reader meets that the repository itself
contradicts, which is the failure this site exists to correct in other people.

- **The home page says the initial-decision queue peaked "at the end of 2022".** The site's own
  record `asylum-backlog-peak` in `data/asylum.json` puts the peak at June 2023, and the parent
  record's notes compute "down 72% from the June 2023 peak" from it. End-2022 is the highest
  *year-end* point, not the peak, and `content/asylum.njk` gets this right with the qualifier the
  card drops, saying outright that the within-year peak was higher than either line shows. **So
  the queue actually rose after the date the home page calls its peak**, and the sentence
  misstates the trajectory as well as the date. The sibling small-boats card on the same page
  cites its peak record properly, so this is the one card that names a date instead. In
  `data/dashboard.json`, the `whatThisMeans` of the awaiting-a-first-decision card.

- **`/sources-and-method/` states that no page shows a returns figure, and a page shows one.**
  The scope statement says the data layer holds enforced, voluntary and asylum-related returns
  and that "no page shows any of them". `content/claims/small-boat-arrivals-are-the-whole-asylum-system.md`
  renders `asylum/returns-asylum-related` in its prose and declares it in its own metric list.
  **The scope statement is the page that asks the reader to trust the site**, and a false
  statement about this site's own coverage is the exact shape it names as concealment in others.

- **"About a third of main applicants bring a dependant" is a ratio read as a share.** What the
  repository holds is in the notes of the OBR lifetime record in `data/fiscal.json`: "real-world
  dependants average about 0.3 per main applicant". That is dependants per applicant. It converts
  to a third of applicants only if nobody brings two, and no record holds the share. **It is on
  the page correcting people for reading a modelled figure as though it had averaged over
  circumstances**, in the paragraph making that correction, in
  `content/claims/average-migrant-contributes-341000-over-a-lifetime.md`.

- **The two fiscal claim pages quote the OBR lifetime figure with no endpoint age**, and one
  presents this site's own age-82 reading as a figure that is "sometimes quoted" and "sometimes
  read" by others. The record is explicit that the age is the owner's choice of 3 August 2026 and
  that OBR singles out no endpoint, and the same pages argue in terms that a figure of this shape
  is meaningless without an age attached. **Both pages therefore commit the error they exist to
  correct, and attribute the site's own construction elsewhere while doing it.**
  `content/claims/immigrants-pay-far-more-than-they-cost.md` and
  `content/claims/immigrants-are-a-drain-on-public-finances.md`.

- **`/sources-and-method/` renders "six publishers" and then names seven.** The count is derived
  and the list beside it is typed by hand: the National Audit Office, the House of Commons
  Library, the Migration Observatory, the Office for Budget Responsibility, the Independent Chief
  Inspector of Borders and Immigration, ONS population estimates, and the Home Office's annual
  report and accounts. **A derived number disagreeing with the list printed beside it, on the
  page about how this site counts things**, is the cheapest possible thing for a hostile reader
  to hold up. Decide which is wrong before changing either: one named publisher may source none
  of the figures the sentence is about.

- **The review sign-off in `CHANGELOG.md` says it covers "all 22 pages the build produces".**
  The build produces more content pages than that, and the three routes the entry names account
  for every page except one claim page, the lifetime-contribution claim, which was drafted after
  the last of the six the entry lists. **The entry's own argument is that signing narrow leaves
  live pages outside the signature "on a site whose stated objection to others is scope
  silence"**, so the arithmetic being short by one page falsifies the sentence that makes the
  case. Either the page joins a route or the entry names it as outside.

### R5. Sourcing, provenance, and one check that does not check what it says

**Serious rather than blocking**, in that no single sentence here is plainly false to a reader,
but each is a figure or a promise that will not survive being asked about.

- **A quote carrying the value with the opposite sign passes `check-evidence`.** Probed rather
  than read, with controls in both directions: the correct quote is caught and a longer number is
  ignored, and a quote reading "-297,000", "−297,000" or "-£297,000" is accepted as evidence for
  a record holding a positive 297,000. The lookbehind in `scripts/check-evidence.mjs` excludes a
  preceding digit, comma or full stop, and no sign. **This project publishes figures whose sign is
  the contested part**. The same OBR record says in terms that the age "decides the sign as well
  as the size" and runs negative at age 100, so the evidence contract is weakest exactly where
  the subject is hardest. Fix is one character class, plus a negative test in both directions.

- **Three figures reach a reader with no record behind them.** `/costs/` publishes a later Home
  Office hotel and dispersal rate with no record, grade, date or provenance entry;
  `/asylum/` states a waiting time in weeks as a current fact with no record, period or source;
  and the hotels claim's short answer freezes two current record values as literal text in front
  matter. **The scan cannot see any of them**, and `/sources-and-method/` describes that scan in
  terms stronger than it holds, the description being R5's own last entry below. The front matter
  case is the one the site's published promise says cannot happen.

- **The home page's first panel makes an unscoped reason comparison** the site elsewhere says the
  data cannot support, in `content/index.njk`. ONS reason splits are for non-EU+ arrivals, not for
  net migration by reason, and `data/migration.json` says so in its own note.

- **`/sources-and-method/` says "It is not a source of original data. Every number here was
  published by somebody else."** The same page, further down, describes figures this site
  calculates, and the data layer grades a set of records as calculated for that reason. **The
  sentence is the site's strongest trust claim and it is the one that is false.** Reword to what
  is true and already stated elsewhere: every input is published by somebody else, and where this
  site derives a figure it says so and shows the arithmetic.

- **`/sources-and-method/` overstates what the longhand-figure scan catches**, which is how the
  three unsourced figures above reached pages. The scan's own output states the limits precisely;
  the page should not claim more than that output does.

- **`content/claims/falling-net-migration-means-asylum-is-shrinking.md` says the queue fell
  "arithmetically ... from decisions being issued"** and omits the other routes out of it that
  `/asylum/` says sit outside the decisions total. On a page whose subject is what a fall does and
  does not mean, that is the same class of omission it is correcting.

- **Four documents state counts of the repository that no longer hold**, each in the sentence
  telling the reader to take the figure from the file: `docs/UPDATING-DATA.md` and
  `docs/prompts/update-from-release.md` both understate how many metrics declare a `series_ref`
  and misname which publishers they come from, which is live instruction to an assisted update;
  `docs/UPDATING-DATA.md` opens by saying `check-evidence` fails the build, which it does not and
  which `docs/HANDOFF.md` corrects in terms; and `docs/HANDOFF.md` still calls a red job blocking
  a merge "still a habit" while `main` is protected, which the same document says two hundred and
  sixty-seven lines later. **The two prompts are the highest-damage of these**, being what a fresh
  session acts on.

### R6. Minor, and none of it blocks anything

Held here rather than dropped, in one place, so the list is one list. `README.md` miscounts the
glossary terms and the ONS entries in the source catalogue and omits `lib/claim-links.mjs` from
its file-by-file layout block; `docs/foundation.md` and `docs/UPDATE-AUTOMATION.md` carry the same
shape, the latter contradicting itself in adjacent sentences about how many automation phases are
built. In the data layer, four Migration Observatory figures in `data/population.json` are graded
`official` where the identical sibling was regraded away from it on 4 August 2026 and where
`/sources-and-method/` promises in terms that they are not, and `data/sources.json` lists a census
edition as a source of foreign-born figures that no record cites. On the pages: `content/404.md`
claims the glossary defines every term the site uses and the glossary says it deliberately does
not; two glossary cross-references name a claim check without linking to it and one does not name
which; a claim page's table has no caption and its scroll region falls back to a name that says
nothing; the two bar charts on `/costs/` print bare unitless numbers, which the site's own
`content/style-guide.md` names as a failure; the figures disclosure is the one control missing the
target size the stylesheet declares; and "in the same direction" on one claim page collides with
the site's own term of art that the same page displays as a tag. In the code: `lib/charts.mjs`
carries a dead flag with three comment blocks describing a chart variant that does not exist, an
HTML-escaping helper defined in five places with nothing asserting the copies agree, a label guard
calibrated for 14px text that the narrow chart renders at 15px, and three edge cases that would
emit NaN coordinates rather than fail the build; `eleventy.config.js` registers two global data
values no template reads and states as present fact a scroll-region blindness that was fixed; and
`scripts/check-evidence.mjs` lets an entry be retired from every pass by editing its own value
field. **And the accessibility run tests one theme.** `.pa11yci.json` sets no colour scheme, so
the clean report covers the light palette; the dark palette was measured by hand for this critique
and passes, and nothing keeps it that way.

## From the pre-launch sweep, 10 August 2026

**The owner read the built site as a reader would and wrote down what he met**, in an informal
note and a formal snagging list, and both were checked against the repository one finding at a
time before anything reached this file. **Whatever survived them is here, in this file's format,
and the source documents carry no state**: that is the rule this project set after the pre-launch
audit built a second list and the two diverged twice in one day. Whether they are committed beside
`verification.txt` as records or deleted is the owner's call and changes nothing above.

**The sweep found six things the owner then gated, and R7 below holds five of them.** The sixth
was this file: items 13, 14 and 23 each said the work was built and not merged, four days after
PR #167 merged it. That one has no bullet because it is applied by the changeset that adds this
section, and a finding fixed in the same breath as it is written down does not need a line
telling a session to do it.

**What did not survive is worth recording, because a rejected finding costs a session an
afternoon if it comes back.** The snagging list asked for the lifetime-contribution page to be
signed so the review reads 23 of 23; `CHANGELOG.md` already signs at 22 of 23 and names that page
as standing outside, deliberately, and that naming was item 13's own **[you]** half, taken. It
asked for a real screen reader as a launch blocker; item 19 put that test after Launch on
4 August 2026 by a decision with reasons, and a newer document does not silently outrank an older
decision. It asked for the citation block on claim pages to be moved behind progressive
disclosure; it already is, a closed `details` sitting between the short answer and the
explanation, so the remedy and the state of the site agree already. And it read the home page's
23 July review date against the pre-launch banner's 27 July as a contradiction; they are the page's
own review and the site-wide one, two facts wearing one word, which is a labelling defect rather
than a date defect and is where R7's last entry comes from.

### R7. The gate, and every one of these is what a reader or a merge actually meets

- **The launch pull request would merge into a branch that is already history.** PR #168 has
  `item-13-reader-facing-accuracy` as its base, and PR #167 merged that branch into `main` on
  6 August 2026. GitHub retargets a stacked pull request only when its base BRANCH is deleted,
  and this one still exists, so merging #168 as it stands sends the launch changeset into merged
  history and never to `main`, with every local signal reading clean. Retarget it to `main`
  first. Checked rather than assumed: against `main` the diff is the launch changeset and nothing
  else, and it merges without conflict.

- **The site-wide footer calls every figure an official statistic.** `data/meta.json` opens its
  `footerNote` with "Figures are official statistics and may be revised", and it renders on every
  page the build produces including the 404. The same file names four confidence grades a few
  lines below, two of which exist precisely to say a figure is not that. **This is the same defect
  as R5's "not a source of original data" sentence and it is on more pages**: the site's broadest
  trust claim is stronger than its own data model permits, and the clearest case is the OBR
  lifetime figure, which the page carrying it correctly explains is not an OBR-published value.
  The snagging list's draft replacement is serviceable and the wording is **[you]**.

- **Appeal cases are compared with people on the page about not doing that.**
  `content/claims/the-asylum-backlog-is-one-number.md` ends a paragraph with "The appeals queue is
  now the larger of the two." The two figures beside it are the June 2023 peak and the end-2019
  stock, both in people; the sentence means cases. **The page renders the cases-basis figure for
  the first-decision queue earlier on itself**, so the honest comparison is available without a
  new record and the fix is to name the basis and use it. The snagging list's replacement wording
  was checked against `data/asylum.json` and is correct as written.

- **The asylum cost card cites a figure the card's own source link does not contain.**
  `data/dashboard.json` attributes the hotel component to the Home Office's own annual accounts,
  in terms, and `content/index.njk` renders one source line per card, built from the card metric
  alone, which is the NAO. A reader who follows the link meets a report that does not print it.
  **This is the far-end defect the trace of 2 August 2026 was built to catch, on the home page**,
  and it survived because the trace checks a record against its source and this is a second
  record's figure quoted inside another record's prose.

- **Five `ho-ara` records read from a superseded edition and say so nowhere a reader looks.** All
  of them cite the 2024-25 accounts; the 2025-26 edition, HC 440, published in July 2026, which
  the release check names in its unwatched column. `data/sources.json` already carries the
  decision for one of them, that the newer edition drops the hotel figure, in the source's
  `covers` field. **That leaves the rest undecided and the decided one invisible**: the two per-day
  averages, the hotel total, the health surcharge and the fee income each need the newer edition
  opened and the answer recorded per record, and where the older figure stands it needs the
  supersession note the snagging list drafts. **Whether HC 440 restates the surcharge and the fee income is the thing to establish and not a
  thing to assume**, and the recommendation that it would was withdrawn before it reached this
  file. **This entry said "nobody has opened the 2025-26 accounts" until 10 August 2026, and that
  was false**: the hotel record's own notes already carried a reading of HC 440 naming a page and
  a figure. It was missed by reading those notes truncated, which is the same defect as quoting a
  number from a truncated display.

- **The three displayed dates mean three different things and wear one vocabulary.** The
  pre-launch banner's date is the site-wide pre-publication review, a page footer's is that page's
  own `last_reviewed`, and a home page card's is the day the figure was last read against its
  source, labelled "Checked" with no agent. The owner read the first two as a contradiction, which
  is the evidence that the labels do not carry their own meaning. **And `content/_includes/base.njk`
  prints "Figures are the latest published at that date" under every page that has a review date,
  including the style guide and the 404**, where the sentence describes nothing. Naming the three
  concepts is **[me]**; what the card's label should say to a reader is **[you]**.

**What taking it found, kept because three of the six were larger than the finding said.** The
cost card was not the only card citing a publisher it does not name: the first-decision queue
quotes HMCTS appeal figures under a Home Office link and the born-abroad card quotes ONS under a
Migration Observatory one, so the remedy is a filter over every card rather than a sentence on
one. The review footer's figures sentence rendered on four pages with no figure, not two: `/about/`
and `/common-claims/` were missed by a reading that went looking for the two it already knew. And
the annual report split three ways rather than holding or moving as a block: the health surcharge
and the fee income are both superseded and are moved, with the surcharge's Consolidated Fund half
now printed as a dash so that the two-part sum the old record described no longer exists; the hotel
total and both per-day averages are NOT superseded, HC 440 printing no hotel cost figure and no
daily average in either the report or its Core Data Tables, and they carry that decision in their
notes and on `/costs/`.

**One thing was found by moving a figure rather than by looking for it.** `£3 billion` on
`/costs/` is the 2023-24 hotel spend, and it passed the longhand scan for as long as it did only
by colliding with the visa and immigration fee income record, which held a value of 3 in the same
unit for an unrelated figure. Moving that record to the newer edition failed the build on the
collision. **A collision is not coverage**, and nothing distinguishes the two while the numbers
agree; the figure is now declared with its reason.

### R8. The reader-facing batch, none of it a false statement

- **Four cards and a panel assume a definition the glossary holds and neither links.**
  `content/index.njk` writes "non-EU+ arrivals" in the first panel, which is effectively this
  site's front door, and the cards built from `data/dashboard.json` use "main-applicant
  applications", "Also a stock" and "Naturalisation" with no route to the terms. Every anchor
  exists in `content/glossary.md` already, so this is missing links rather than missing content.

- **The small boats card names a figure elsewhere on the site and does not go there.** It says the
  year-ending-March count for the same route gives a different number; `content/asylum.njk`
  renders that record. Link it.

- **The mirror claim is named and not linked.**
  `content/claims/a-refusal-means-the-claim-was-obviously-false.md` says the opposite claim "is
  checked on its own page", and the page exists.

- **A correct share reaches a reader without its denominator.**
  `content/claims/falling-net-migration-means-asylum-is-shrinking.md` gives asylum applicants as a
  share of all long-term immigration; another page gives the same numerator over non-EU+ arrivals,
  which is the only basis ONS publishes on. **Both are right and `data/migration.json` holds the
  arithmetic for both**, including the rounding interval. The prose needs the denominator named
  beside it, not a correction.

- **The glossary defines neither charge the money pages spend.** Visa and immigration fees and the
  Immigration Health Surcharge both have records in `data/fiscal.json` with worked notes, and
  `content/costs.njk` names them.

- **The migration chart marks a methodology change and never says what changed.**
  `content/migration.njk` gives the note ONS gives, that estimates either side of June 2021 differ
  in method. Neither the survey it moved from nor the administrative data it moved to appears on
  the built page; that explanation renders only on `/sources-and-method/`. A clause or a link.

- **One word on a live page.** `content/common-claims.njk` says the correction "a reader
  sympathetic to migration would most want to see", and the owner asked for "most" dropped.
  **The internal copies of that sentence are not this one and are not in scope**: it took a
  second look to find the rendered instance, the phrase being wrapped across two lines, which is
  the defect this project has already written up about grepping its own prose.

## Completed

Kept so that a future session can see what was decided and when, rather than reopening it. **The
reasoning is in the pull request each entry names**, which is durable and does not have to be
maintained here. Newest first.

- **The pre-launch sweep's gate, The order's item 15**, 10 August 2026. PR #170, closing R7.
  Five reader-facing and sourcing findings, each taken at its root rather than at the site the
  finding named: the card defect was three cards and is fixed by a filter over all of them, and
  the review-footer defect was four pages and is now derived from each page's own content with a
  check comparing the two in both directions. **HC 440 was downloaded and read**, which moved the
  health surcharge and the fee income to the newer edition and established that the hotel figures
  are not superseded. **Two entries in this file were wrong about that work and are corrected on
  11 August**: it claimed nobody had opened the 2025-26 accounts when one record's notes already
  carried a reading of it, missed by reading those notes truncated. **And this entry's own item
  said it was unmerged after it merged**, which is what items 13 and 14 had said for four days
  and what closing them that morning was supposed to have taught.

- **The reader-facing batch, The order's item 16**, 11 August 2026, closing R8. Card definition
  links, the small boats route, the denominator, the methodology clause and the one word on
  `/common-claims/` all merged in PR #171. **Two entries did not and were found by reading the
  section against the built site**: the sentence naming the mirror claim did not link to it, and
  the glossary defined neither visa and immigration fees nor the Immigration Health Surcharge,
  both of which `/costs/` spends. Both entries now cite their records rather than restating a
  value, so a release moves the glossary with the page. **The item was checked bullet by bullet
  before closing**, which is what stopped it being closed with two thirds of a section done.

- **`/returns/` went through the pre-publication review**, 10 August 2026, recorded in
  `docs/PRE-PUBLICATION-REVIEW-RETURNS.md`. The page was live and outside the signature because it
  was added after it; the owner chose reviewing it over naming it as unreviewed. **Its literals
  were already empty**, so the review read prose rather than numbers, and found two: a claim about
  the non-asylum remainder that was true and evidenced by nothing, and an absence claimed across
  every publisher and checked in one. Both are fixed. The signature now covers 23 of the 24 pages
  the build produces other than the 404, and `scripts/check-build.mjs` holds that denominator
  against the build.

- **Returns and removals are covered**, 10 August 2026, at `content/returns.njk`. **This
  supersedes call 9 under R1**, which on 4 August 2026 decided the subject was an unstated scope
  silence and closed it by DECLARING the omission on `/sources-and-method/` rather than by
  covering it. The declaration was the cheaper half and it held for six days; the owner asked for
  the page. Nothing new was sourced: the data layer already held all five records and two of them
  already reached a reader with no page explaining either, which the scope statement itself called
  the same silence as not holding them. **The page is built around the two traps the records
  document rather than around the total**: returns count events and not people, so no figure on it
  is a headcount of individuals; and the categories do not nest, port refusals being published
  outside the headline total and asylum-related returns being a subset already inside it. Both
  additions a reader is invited to make are named and refused in terms. The scope statement on
  `/sources-and-method/` is rewritten from "not yet covered" to what is now true, rather than left
  to rot into another correction that missed its siblings, which this file already records twice
  by that name and which no entry should be numbering a third time. **`.pa11yci.json` was
  updated in the same change**, that list being hand-maintained and having once reported a full
  pass with a new page absent from it.

- **Reader-facing accuracy and sourcing, The order's items 13 and 14**, 6 August 2026. PR #167,
  closing R4 and R5 together. Six statements a reader met that this repository contradicted, and
  six promises about how the site sources things: among them the home page naming the wrong date
  for the initial-decision peak, `/sources-and-method/` denying that any page shows a returns
  figure while a claim page rendered one, a ratio published as a share on the page correcting
  people for that error, and a quote carrying the opposite sign passing `scripts/check-evidence.mjs`.
  **Both entries then said they were unmerged for four days after they were merged**, and so did
  item 23, which is why this entry exists at all rather than being written when the work landed.
  The pull request that carries the work is the durable record; what the delay taught is that
  merging a branch closes nothing in this file by itself, and it is written up in `docs/HANDOFF.md`
  rather than a third time here.

- **The last drafted claim, and item 10 with it**, 6 August 2026. "The average migrant contributes
  £341,000 over their lifetime", the seventh and last draftable claim in foundation 8.5.3.
  **Its wording was a call before it was a draft**, uniquely in the set: the figure 8.5.3 specifies
  is one this site published itself until 3 August 2026, as the age-80 point of OBR chart 4.13, and
  it moved when the owner chose age 82 and wrote the age down. The page quotes the circulating
  sentence and answers that no single figure exists, because OBR states no value and singles out no
  age, and the line is positive in the person's sixties and negative by the age the chart ends.
  **This project's own figure having moved on nothing but a choice of endpoint is the demonstration
  the page rests on**, and the page says so rather than correcting a number it once carried without
  mentioning that it carried it. `341,000` is declared under `historical_literals` without a
  currency symbol, which is what the comma-grouped scan reports; the scale-word scan is the one
  that captures a leading "£", which is why the hotels claim declares "£8 million" and this
  declares a bare number. **It overlaps an existing page and is sharpened against it**:
  `/common-claims/immigrants-pay-far-more-than-they-cost/` already cites the same record and
  already says the chart describes one hypothetical individual, so this page is about the endpoint
  doing the arithmetic rather than about whether migrants pay their way, and links to it.

- **The last two gates that held only a question**, 6 August 2026, closing The order's items 3 and
  8. **Item 3 was a gate whose last content depended on a non-gate**: everything under A4 and R1
  was applied or needed no change except call 10, which is decided, deliberately unapplied, and
  waits on a real screen reader, and that test is item 19, which the same list puts after Launch.
  As written it could never have closed before the launch it was blocking. Call 10 is carried by
  item 19, which already named it. **Item 8's last question was a grade**:
  `population/share-of-london-residents-born-abroad` keeps `official`, and A1 carries the reasoning
  rather than this entry repeating it. It cost nothing to apply: the record is unpublished reserve
  and reaches no reader either way, which is why it could sit open under a gate for two days.

- **The costs page's fiscal-impact framing**, 6 August 2026. PR #166, closing The order's item 21.
  **The fourth instance of a correction shipping without its siblings**, and the first found by
  auditing documents rather than content: `docs/PRE-LAUNCH-AUDIT.md` is frozen and marks exactly one
  item still open, correction 1b's, and following it to the page showed the signpost card on
  `/costs/` still saying "lands within about plus or minus 1% of GDP either way" seven days after
  the claim pages and five after the glossary were fixed. **The bound is the spread across separate
  studies, not an interval around one estimate**, and the card carried no scope at all, so it read
  as a current fact about a system none of those studies covers. **What the audit could have got
  wrong and did not**: `data/meta.json` and `data/fiscal.json` carry the same phrase and both
  attribute it to the studies, so both are correct and neither was touched, established by reading
  them rather than by matching the phrase. **A critique round then caught the replacement
  misattributing "small in magnitude" to the studies instead of to the effect they estimate**,
  which on this subject is the same class of error as the one being fixed.

- **The review is recorded as passed**, 6 August 2026. PR #159, closing The order's item 12, the
  last of the three closing steps the review of 27 July left. **No figure moved and no page a
  reader sees changed by it**: it records a signature, which is the last thing
  `/sources-and-method/` promises and had not been given. **The scope was decided as sixteen pages
  on 2 August and signed wider**, because claim pages published since were in neither the review's
  ten nor item 2's six, and signing at sixteen would have left live pages outside the signature on
  a site whose stated objection to others is scope silence. **The entry names three routes rather
  than one word**: the review of 27 July with `verification.txt` as its evidence, the six-page pass
  with `docs/PRE-PUBLICATION-REVIEW-SIX-PAGES.md` as its evidence, and the claim pages evidenced
  and verdicted one at a time, which is a per-page method rather than a pass and is recorded
  separately for that reason. **And it says what signing backs**: the review's own selection
  criteria failed claims 2.6 and 2.7, both were kept on this site's published policy of not
  attributing claims to named people, so the signature prefers that policy to the reviewer's
  criterion and the disagreement is written down rather than absorbed.

- **The six pages the review never opened**, 6 August 2026. PRs #158, #160 and #161, closing The
  order's item 2. The evidence written in PR #76 was **regenerated against the live site** before
  any verdict was given, five of the six pages having moved under it and seven of its twenty quoted
  passages having stopped matching the page they quoted, two of them because the glossary launch
  gates closed after it was written; every regenerated quotation was lifted from the source by
  script rather than typed. The owner read it and gave every verdict, the marks being recorded by
  the session at his direction and the document saying so, because that is not the arrangement this
  gate assumes. **The substantive failures were corrected and then re-answered against the
  corrected pages**, not marked off on the promise of a fix. **Two of them turned out differently
  from how the evidence wrote them up**: the claim that the appeals queue moves the other way was
  recorded as unsettleable and was in fact supportable and merely uncited, so it is now cited in
  both places rather than removed. **The last checkbox stays unticked deliberately**, on PR #54's
  precedent that `last_reviewed` records what a review READ.

- **The release notifier's last phase**, 6 August 2026. PR #157, closing The order's item 9 and
  *Scoped, not built* section 3. What `/sources-and-method/` says about automation is rewritten and
  signed off, so all five phases of `docs/UPDATE-AUTOMATION.md` are built. It was a wording call
  with no build behind it, which is why it sat as a gate on a sentence.

- **The UX review's trust work, U3 to U5**, 6 August 2026. PR #154, closing The order's item 6.
  Three things landed and one was a decision not to build. A citation block now says which FIGURE
  each publication was cited for, which matters most where this site's own calculation sits beside
  somebody else's published figure with nothing distinguishing them; fifteen entries across the
  site turn out to cite one publication for more than one figure, one of them for five. The three
  theme pages now list the claim checks resting on a figure they declare, joined at build time from
  front matter on both sides so a claim added later appears without anybody remembering. And
  `/sources-and-method/#reuse` names the MIT half and the two non-Crown publishers, where it had
  named only the Open Government Licence. **The `/changes/` page was refused on a measurement**:
  `CHANGELOG.md` holds 151 distinct comma-grouped values, 68 held nowhere in `data/`, so the page
  either fails `validate-content.mjs` or evades it. **Call 28's wording was confirmed rather than
  replaced**, which closes a question that had no artefact behind it anywhere in this repository.
  **Two guards, and the second is the one worth keeping**: the merge is guarded against dropping a
  metric name, asking with the full stop attached because names in this data layer nest and the
  shorter of a nesting pair would otherwise pass while absent; and `check-build.mjs` now refuses a
  name printed under a publication that is not its source, which the first guard cannot see and
  which is the worse failure, since a citation exists to be pasted somewhere else.

- **"Asylum hotels cost £8 million a day"**, 6 August 2026. PR #152, the sixth drafted claim under
  The order's item 10. **A different error type from anything else in the set**: the claimed figure
  was real, was official, and is a year stale. The Home Office's accounts state both daily averages
  themselves on one page, £8.3m for 2023-24 and £5.77m for 2024-25, so the page corrects a date
  rather than a number and says so. **Its verdict was given before the merge rather than by it**,
  which is the only one of the set settled in that order. Every sentence resting on a figure was
  checked against the record field or record note it rests on, generated rather than typed, because
  `validate-content.mjs` states in its own output that a citation protects the value and never the
  verb around it.

- **The work item 6 and A6 had stopped accounting for**, 6 August 2026. PR #155. Naming a section
  is not accounting for what is in it. Item 6 named one of U3's outstanding bullets and nothing at
  all from U4, which held a question raised the day before; A6's summary said one question was open
  when both halves of it had merged. **The sweep that found this was wrong on its first pass**: it
  searched `**[you]**` where U4 prints `[you]` unadorned, so it cleared the orphan it existed to
  find. Re-run against the form the source prints, with a control.

- **The scroll-region class blindness**, 5 August 2026. PR #149. The order's item 20, and A5's
  last bullet. Four patterns across the `scrollable-regions` transform and the check that exists to
  disagree with it matched `class="scroll-x"` up to the closing quote, so a region carrying a second
  class was invisible to all four. The two failures are not one failure: the three attribute checks
  never saw such a region and said nothing, while the wrapper check reported a correctly wrapped
  table as unwrapped, and it stayed quiet on 5 August only because the transform had already added a
  second plain wrapper for it to find. **The prescribed remedy was refused**: a character class
  reads `class="scroll-xy"` as a region, so the token is matched as a whole member of the
  space-separated list instead. **And widening the match alone would have been the worse half**,
  because the naming rewrite rebuilt the class attribute and would have silently dropped the very
  class that put the region there; it now captures and writes it back. **The patterns are
  deliberately not shared between the two files**, one expression in both being one assumption
  neither side can catch, which is how four of them went blind together. Probed with the toggle
  class put back onto the region, where the control on the old patterns reproduced the nesting with
  the build still green.

- **The series-evidence gap**, 5 August 2026. PR #147. A1's last **[me]** work. A series evidence
  entry was validated by nothing at the moment it was written: `check-evidence` asked only a block
  that had MOVED, and that skip happens before any entry is matched, so the three entries batch 2
  wrote for blocks sitting still had been declared once and never read. The run audited none of
  them and now audits all three. Two passes, both mirroring the record side: every entry naming a
  block that still holds its declared vintage is re-read on every run, and `previous_vintage` is
  asked of every series claim a branch adds. **The second half is beyond what the bullet named**,
  and it is the twenty-eight-backfilled-entries defect one level over, so the pull request says so
  rather than letting the wider diff pass as the bullet's own scope. The four refusals an entry
  cannot be read past, an unmappable file or block, a missing `vintage`, and a block held neither
  now nor on the base branch, are asked only of what a branch proposes: unconditional, a rename in
  `lib/series.mjs` would orphan every entry naming the old name at once and leave rewriting the
  audit trail as the only green run. Probed in a scratch clone, fourteen strings that must fail and
  three that must not, each asserting the break applied before the run.

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
