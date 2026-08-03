# Changelog

Data updates and methodology changes. Every change to a published figure belongs here,
with the reason and the source. This file doubles as the data changelog required before
launch (foundation document, section 17).

Dates are the date of the change to this repository, not the publication date of the
underlying statistics. Each figure carries its own `published_date` and `retrieved_date`.

## Unreleased

### Twelve of the tail's seventeen figures are traced to the far end, and one of them moved, 3 August 2026

**One published value changed, and it is the first on this site to move because a trace found what
a figure actually was rather than because a publisher released a new one.** The OBR illustrative
lifetime contribution is now £297,000, down from £341,000; every other value here is unchanged.
This is batch 3 of the pass that asks whether a named source CONTAINS the figure. It covers the
seventeen reader-facing records spread across seven publishers, the batch the backlog describes as
the fewest records and the most fetches. **Twelve now carry an entry in `data/evidence/`. Five do
not, and why is the finding.** Every quote was lifted from the
fetched source by script, a located table cell with its own row and column labels or a passage
matched from an opening phrase, with an assertion per figure before the quote was built.

**`previous_value` was wrong on every backfill written before batch 1, and this corrects its
share.** The field is defined as what the record held on the base branch, with `null` reserved for
a figure that is new, and those entries used `null`: they said "new" about figures that had simply
never been evidenced. Fifteen such entries sit in the nine files this touches and all fifteen are
now set from what `main` holds. The ONS file is corrected in PR #102 instead, which is why the two
branches do not both edit it. The entries these two batches add are written the right way. No check
asked, and why it survived is in the backlog under A3.

**All twelve reproduce exactly against their source; eleven needed no decision to do so.** MoJ tables FIA_1, FIA_3 and FIA_4 give 14,748 asylum appeals
lodged in the quarter, 4,088 determined with 40% allowed, and an asylum backlog of 87,450 inside a
chamber-wide open caseload of 151,767. The NAO gives £4.9 billion of Home Office and Ministry of
Justice asylum spending in 2024-25, £3.4 billion of it on accommodation and support, and HC 874
gives the £15.3 billion ten-year contract projection against an original £4.5 billion. The
Migration Observatory gives the 16% foreign-born and 10% foreign-citizen shares. ONS gives the
mid-2024 UK population of 69,281,400. The ICIBI gives both accommodation unit costs at paragraph
5.14, in the Home Office's own words.

**Five figures could not be evidenced, and none of them is wrong.** Each is a record holding a
figure its cited source does not state: three where the source rounds, and two where the source
states millions and the record states billions. Each is now in the backlog under R2 as a decision,
with the primary table that does state the figure named beside it.

**The twelfth is the OBR figure, and tracing it changed what the site publishes.** Its notes said
the £341,000 is read off Chart 4.13 and that OBR states no single value and names no age. Both
remain true of OBR; what nothing recorded is that THIS SITE picks an age. The chart's published
data gives the average-wage migrant 340.577 at age 80 on an axis labelled "Cumulative fiscal impact
(£ thousand)", which was the old figure exactly. The age is load-bearing: the same series peaks at
£533,832 at age 66 and is -£308,275 at age 100 where the chart ends, so a figure the site labels a
LIFETIME contribution was negative on the chart's own last point and positive by a third of a
million two decades earlier.

**The age is now 82 and the figure is £297,000.** OBR's own text gives 82 as the life expectancy of
an average person in 2028, which makes it the only candidate age OBR states a reason for, and it
makes the word "lifetime" in the record's name true rather than approximate. Neither claim page
needed rewording: both describe the migrant as "a lifetime net contributor" and cite the value
rather than writing it out, which is what citations are for here. The record now carries the age,
the arithmetic and what it used to say.

**OBR's own download for that chapter is broken, and that is worth writing down.** The link for
`charts and tables: Chapter 4` returns "You do not have permission to access this download" to a
script and to a real browser alike, while chapters 2 and 3 and the whole-report packs all return
their spreadsheets. The zip of all chapters downloads and contains it, and that is what the
evidence entry cites.

**Four record corrections came out of the trace**, all against a cited source. The asylum
accommodation contracts note said "the three contracts": HC 874 states seven regional contracts
held by three suppliers, and the note conflated them. The two immigration-fee records were dated
to calendar 2024 with a note asking for the period basis to be confirmed; the briefing body gives
financial year 2024-25, so both records are re-dated and the note now records that the briefing's
own summary says "in 2024" while its body says 2024/25. The appeals-lodged record hedged its
prior-quarter comparison as "a possible peak", and reading all 76 quarters of FIA_1 shows 17,822
is the highest of them; it also now declares table FIA_1, which its evidence entry names.

**One earlier observation was re-confirmed rather than re-found.** The NAO landing page prints
£4.0 billion where the report prints £4.9 billion, which R2 already records as a reader-facing
question.

### Every evidence entry is re-read on every run, 3 August 2026

**A declaration nobody re-checks is the shape this project keeps finding, and `data/evidence/`
had it.** The check matched an entry when a figure's value moved and never asked again, so an
entry written for a figure that then sat still was never looked at a second time. Its own closing
line said as much: it "says nothing about a figure whose value did not change". That mattered
little while entries were written only as figures changed. It matters now, because the far-end
backfill will write about 69 entries for figures that are not moving, and a wrong quote in any of
them would have been invisible for as long as the figure held. PR #100.

**It now re-reads every entry that still describes a live figure**, 46 of 46 today: a quote
carrying the value, a source URL, a real fetch date, and a derivation with a quote per component
where the figure is derived. Nothing is re-fetched, so this is a claim about the entry rather than
a fresh claim about the figure.

**An entry whose figure has since been renamed, dropped or revised is skipped**, which is not a
softening but the point. These files are the audit trail that makes a figure's history
reconstructible, and a check that failed on an old entry would push someone into deleting the
trail to get a green run.

**The two probes that matter most are the ones that must not fire.** Breaking a quote, deleting a
source URL, an impossible date and breaking a component quote each fail with a precise message.
An entry whose value no longer matches its record, and an entry naming a record that does not
exist, both pass **and drop the audited count from 46 to 45**, which is what distinguishes an
entry skipped as history from one checked and wrongly passed.

### Sixteen Home Office figures are traced to the far end, 3 August 2026

**No published value changed.** Every check on this site verifies that a figure names a source;
none verifies that the source contains the figure. This is the first batch of the pass that asks
the second question by hand, covering the sixteen reader-facing records drawn from the Home
Office immigration system statistics, year ending March 2026. Each now carries an entry in
`data/evidence/` with a verbatim quote, and the quotes were extracted from the fetched sources
rather than typed, so a transcription slip could not enter them. PR #99.

**Fifteen were correct as cited**, and so were the year-on-year changes and the peaks written in
their notes: table Asy_00a gives 93,525 claims, 128,300 initial decisions, 79,719 refusals,
16,901 withdrawals, 48,581 grants, 48,758 awaiting a decision, 97,519 supported and 20,885 in
hotels, with the falls and rises the notes state, and it gives the grant rate as a decimal that
rounds to the 39% the release page states in prose and the record holds. The peaks in the notes
were read too, and both are the publisher's own words: 110,051 for the year ending September 2025
and the June 2024 record high. The two derived figures reconcile
in both directions: 20,885 plus 72,768 in other accommodation is the 93,653 this site publishes,
and adding the 3,866 on subsistence-only support returns the Home Office's own 97,519. The 5,931
administrative outcomes sum from four quarters of the Asy_D02 pivot, whose Refused, Withdrawn,
grants and Grand Total rows, summed across the same four quarterly columns, reproduce four figures
the Home Office publishes elsewhere.

**One was wrong, and it was the source rather than the number.** Small boat arrivals in calendar
year 2025, 41,472, cited the immigration system statistics data tables index page. That page lists
spreadsheets and contains no figures at all, and **that link renders on the home page**, so a
reader checking this site's headline small-boats figure met a list of files rather than the
number. The record also named the detailed dataset, which publishes quarters only. The figure is
published as a calendar-year total, in **table IER_01 of the illegal entry routes summary
tables**, and the record now cites it. The home page source line is the only rendered change on
the site, proved by diffing a build of this branch against a build of `main`.

> "IER_01: Number of detected arrivals via illegal routes to the UK, by method of entry,
> January 2018 to March 2026. Small boat arrivals, 2025: 41,472"

**That table also prints the 2022 peak, 45,774**, as a calendar-year cell. Two places in this
repository say the Home Office states no calendar-year total for small boats and derives the year
by summing quarters. The eight yearly sums derived by hand on 2 August are identical, number for
number, to the row IER_01 prints. The 2025 record is corrected here; the peak record's grade is a
sourcing decision and is left open.

**The evidence check now fires on a regrade.** It compared values alone, so moving a figure into
`calculated` or `estimated`, which asserts that it appears in no source, passed with a quote-based
entry still attached to it, and moving one out passed with only components. It now fires in either
direction at an unchanged value. This was written and reverted on 31 July because landing it turned
the branch red until `asylum-administrative-outcomes` had an entry, and that entry needed quotes
from a pivot nobody had opened. The pivot was opened first, which is the ordering that stops a
check forcing a fabricated quote.

### Every figure on the site now has a home, 2 August 2026

**The last three figures written longhand are settled, and the check that reported them now
refuses them.** Since this branch was written it had run at report level under a count that could
fall and never rise, from 38 down to zero. It is at zero, so it fails the build.

**`69.28 million` on the born-abroad claim page is cited exactly**, and renders 69,281,400. That
sentence exists to say the 18.9% is this site's own division rather than an ONS figure, and a
reader can only repeat the division if both ends are exact.

**"About 10.6 million" on the same page is declared as frozen rather than recorded**, for the
opposite of the usual reason: a record is a figure this site publishes, and that page exists to
tell readers not to use this one. It comes from a separate ONS ad hoc release on a different
population base and does not reconcile with the mid-2024 estimate. The number stays in the
sentence because a reader who meets it elsewhere needs to recognise it.

**The small boat peak, 45,774 in 2022, becomes a record.** It was deliberately left undeclared on
30 July because the number is frozen while the words "the peak was" are not. A peak record settles
both: it carries an instruction to re-derive the maximum at every release. It is summed from the
four quarters of 2022, because the Home Office publishes that dataset by quarter and states no
calendar-year total, and the same method applied to 2025 reproduces the figure the site already
publishes for that year exactly.

### Four frozen figures on the costs page are declared as history, 2 August 2026

**Nothing a reader sees changed**, and the built site is byte-identical to before, proved by diff.
This is a change to what the checks are told, not to the page.

`£1.3 billion`, `£1.7 billion`, `£4.5 billion` and `£8 million` are declared under
`historical_literals`. Each is fixed by the period or the publication it belongs to, so no release
will restate it and a record would hold a number that can never move: two are the NAO's figures for
a closed seven-month period, one is the original 2019 contract estimate, and one is the circulating
claim the section exists to examine rather than a government figure at all.

**The reason for each is written into the page's own front matter**, above the declaration, because
an exemption is permanent and nothing re-checks that it is still deserved. Anyone withdrawing one
later needs to know why it was granted.

### The hotel daily rates turn out to be the Home Office's own, 2 August 2026

**No published figure value changed. One sentence did.** The costs page gave three daily spending
figures. This site's own backlog had recorded all three as its arithmetic, the annual spending
divided by 365. Reading page 75 of the Home Office Annual Report and Accounts 2024-25 showed that
two of them are the Home Office's, stated in the same sentence as the annual totals: "£2.1 billion
was spent on hotels in 2024-25, at an average of £5.77 million per day, compared to £3.0 billion
spent on hotels in 2023-24 at an average of £8.3 million per day."

Both now have records, so a later edition moves the page. The page had been saying they were the
publisher's all along, in the words "the accounts' own terms".

**The third was this site's division and is gone.** "The whole system at £4.9 billion is closer to
£13 million a day" is replaced: the system costs £4.9 billion a year, and no publisher states a
daily average for it, so any per-day figure for the whole system is somebody's division. "Roughly
40% above the current figure" goes with it, for the same reason one sentence later.

**One figure could not be recorded and stays as prose.** The accounts print the 2023-24 hotel
total as "£3.0 billion". A record holds a number, so it would hold 3, and the evidence check
refuses a quote saying "3.0" as evidence for 3, because it cannot tell that from "3" inside "3.4".
The data layer holds a figure's value and not its precision.

### A stale claim about asylum appeals is corrected, 2 August 2026

**One sentence on `/asylum/` was false and is replaced.** It said "fewer than 7,000 appeals are
decided per quarter". Asylum and protection disposals passed 7,000 in the July to September 2025
quarter and were 7,799 in January to March 2026, so the sentence had been wrong for three
quarters. It was true when written.

**Nothing on this site could have caught it.** The sentence held no figure any record or series
point holds, so every longhand scan was blind to it by construction. It was found by opening
Ministry of Justice table FIA_2 while sourcing a different number.

**The word was ambiguous as well as stale**, which is why it is not simply updated. Appeals
disposed of were 7,799 and appeals determined at a hearing or on the papers were 4,088, one on
either side of "fewer than 7,000", so "decided" was answered by two different figures. The page
now says that 14,748 asylum appeals were lodged in the quarter and 7,799 were disposed of, both
cited from records, which is the comparison that explains why the appeal queue grows while the
decision queue shrinks.

**Three more figures on that page and its accommodation claim page become records.** The June 2023
backlog peak of 175,457, which the Home Office states as a peak in its own words; the end-2019
initial-decision queue of 51,228; and the appeals backlog a year before the current one, 50,976.
The last two were both written as "about 51,000", on different pages, for two entirely different
queues.

### The net migration fall gives the reader both ends, 2 August 2026

**No figure value changed. Two sentences did, on purpose.** They stated a difference nobody could
check against a source. They now state the two figures the difference is taken from, and the reader
can subtract.

On `/migration/`, the flows chart note read "net migration fell by around 517,000 while immigration
fell by around 429,000. The difference is emigration rising by roughly 87,000". It now reads "net
migration fell from 848,000 to 331,000 while immigration fell from 1,441,000 to 1,012,000.
Emigration went the other way, from 593,000 to 680,000". The same sentence on the
net-migration-is-arrivals claim page is rewritten to match; it would otherwise have been left
saying what the other page had stopped saying.

**Why the old wording could not stay.** Each of the three was arithmetic against a live value, so
no record could hold one: a record would have been a figure no publisher states, and freezing one
would have guaranteed it went wrong at the next revision. That is the same reasoning that removed
the `100,000` and `285,000` of this shape on 30 July.

**Five new records, and only because of where the sentence sits.** A chart note in a Nunjucks page
can cite a series point directly, so the `/migration/` half needed nothing. A markdown page cannot,
so the claim page's six values needed records: `migration/net-migration-2` already held one, and
the other five are new, each declaring the series point it must agree with.

### The migration page's applicant and dependant splits get records, 2 August 2026

**No published figure value changed and no sentence changed.** The four numbers in the reason
chart's bar notes, study main applicants and dependants and the work pair, are records the page
cites rather than text it types. They render the same characters, proved by diffing against a build
of `main`; the only difference outside the sitemap is the derived publisher count on
`/sources-and-method/`, where ONS goes from 13 to 17.

All four come from Table 4b of the ONS long-term international migration release for the year
ending December 2025, and the bulletin states all four in prose as well.

**The two pairs reconcile differently.** Study main applicants and dependants sum exactly to the
study total. The work pair sums to one thousand below the work total, which is rounding rather than
a missing category: the release's cover sheet says every estimate is individually rounded to the
nearest thousand while the calculations are done on unrounded numbers. The note the page already
carried about independent rounding is therefore the publisher's explanation, not this site's
inference, and both records now say so.

**`sitemap.xml` is sorted by URL.** It was emitted in Eleventy's collection order, which is date
order, and a page with no date takes its file's modification time, so a fresh clone produced the
same sixteen URLs in a different order. Nothing was ever wrong in the file; the order was noise in
the build-to-build diff this project uses to verify that a change altered nothing else.

### Three figures on the migration page get records, 2 August 2026

**No published figure value changed and no sentence changed.** Three numbers the page typed
longhand are now records it cites, so a release moving one moves the page. The rendered text is
identical, proved by diffing against a build of `main`; the only difference anywhere is the
derived publisher count on `/sources-and-method/`, where ONS goes from 10 to 13.

**`944,000` and `1,469,000`**, the highest twelve-month net migration and immigration estimates
ONS publishes, both in the year ending March 2023, become
`migration/net-migration-peak` and `migration/total-long-term-immigration-peak`. The bulletin calls
each a peak in its own words. That is a claim about the publication, so Table 1 of the accompanying
dataset was parsed directly instead: each is the largest of its 55 year-ending periods and the
maximum is unique. Both records say in capitals that a maximum is re-derived at every release
rather than carried forward.

**`272,000`**, the work-related immigration figure the page's 47% fall is measured from, becomes
`migration/work-related-immigration-previous-year`. It takes a record for the reason
`migration/net-migration-2` does: a prior-year figure is revised by the release that publishes it,
so freezing it in prose would put a superseded number beside a current one. ONS marks this one
revised in this release.

**The 47% itself is deliberately left as prose.** ONS publishes that percentage and a reader
following the chart's own source link finds it, which is the distinction that kept "Down 12%" on
the citizenship card. It does not reproduce from the two rounded ends, which give 46%, because ONS
computes it on unrounded figures. The record says so.

**Two parent records stopped restating figures that now have a home.**
`migration/total-long-term-immigration` carried the peak in its notes and
`migration/work-related-immigration` carried the comparison year.

### A sitemap, and an anchor on every heading, 2 August 2026

**No figure changed and no sentence changed.** Every changed line in the built site is a heading
gaining an id, or one of two new tags in the head, proved by diffing the site before and after.

**Every section of every page can now be linked to.** Two pages of seventeen carried a heading id,
the glossary and the sources page, both markdown and both using this project's `{#id}` idiom. On
the three theme pages, where the finding was raised, that idiom was never available: `{#` opens a
Nunjucks comment, so an anchor written the markdown way fails the build. The `heading-anchors`
transform now derives an id from the heading's own text where none is declared, which fixes all
fourteen pages at once and means a page added later cannot arrive without anchors. A declared
`{#id}` still wins. The page `h1` is skipped, its link being the page URL, and so is a heading
inside a `<figcaption>`, because the `<figure>` around it already carries an author-chosen id and
those titles name a period that moves at every release.

**`sitemap.xml` lists every built page but the 404**, generated from Eleventy's own collections
rather than typed. It found five pages hidden from it: the overview, the three theme pages and the
claims index all carried `eleventyExcludeFromCollections`, which nothing else in the repository
reads. `robots.txt` does not point at the sitemap yet, because writing that file is the launch step
and what it says is not decided.

**Two new build checks, both negative-tested.** The sitemap is compared against the pages the build
wrote, in both directions, so a page missing from it and a URL the site does not serve are both
errors. And no id may sit on two elements, which deriving ids from text makes worth asking.

**The 404 page has its own description**, having fallen through to the site strapline and been the
only page sharing one with the home page, and both schemes now declare a `theme-color`.

### Both glossary launch gates close, 2 August 2026

**No figure value changed. Two glossary entries are rebuilt, and both were launch blockers.**

**Grant rate.** The entry applied a cohort uplift its own record says not to add, called the later
figure "final outcome" where the Home Office says "latest outcome", attributed the gap to appeals
where the publisher says "following appeals and reconsiderations", omitted administrative outcomes
from the exclusions, and quoted "17 to 29 percentage points" with no window, which made it a fifth
site of a sentence given the publisher's 2007 to 2020 window at four others in PR #72. It now
states the basis and both exclusions, says a later rate exists and is a different measure counting
a different group over a different period, and links to the refused-asylum check rather than
restating its argument. The cohort range is quoted at four sites now, each with the window.

**Net fiscal impact.** The entry still said the estimate falls within "roughly plus or minus 1% of
GDP, a range that spans zero", the framing correction 1b retired on 27 July as statistically
invalid: the bound is the magnitude of separate studies, not an uncertainty interval around one
estimate. Both claim pages it links to carry a dated correction note saying they no longer do this,
so the glossary had been contradicting them for six days. It now carries their framing.

`last_reviewed` on the glossary is deliberately unchanged. It records what a review read, not when
a page was corrected, which is the precedent PR #54 set.

### The citizenship card stops publishing a percentage nobody can check, 2 August 2026

**No published figure value changed. Two more figures get records and one derived percentage is
dropped.** The card said "Applications rose 18% over the same period". Table Cit_01 does publish
that 18% in its own percentage row, so it was not invented, but it was unreachable: the card's
source link goes to the bulletin, which carries no application figure and no 18% at all, and no
record held 18, so every scan on this site was blind to it.

The card now gives both ends and lets a reader take the difference, which is this project's
settled pattern for a figure computed against live values:
**"Applications went the other way over the same period, from 263,440 to 312,063."** Both are new
records, `population/british-citizenship-applications` and `-previous-year`, read from Cit_01 and
evidenced with the table row.

**Reconciled rather than read**: each year's naturalisation and registration application cells sum
exactly to that year's total, 218,661 plus 93,402 and 184,039 plus 79,401, which is the same
independent confirmation the grants records got.

**"Down 12%" is deliberately left alone.** It is the one percentage on the card that a reader finds
by following the record's own source link, because the bulletin states it in prose.

### The ONS confidence convention is settled, and the series_ref guard stops trusting one field, 2 August 2026

**No published figure value changed, and the built site is byte-identical, proved by diff.**

The metrics graded every ONS long-term migration figure `provisional`; the two ONS series graded
per vintage, `official` up to 2024 and `provisional` for 2025. Two internally consistent
conventions that nothing reconciled. **The grade now follows the source rather than the vintage**,
so every point on the current ONS basis is `provisional`, 42 of them across three blocks, of which
39 moved here and 3 already were. The discontinued IPS block stays `estimated`, which is the same
convention holding rather than an exception to it. That matches the eight metrics and this site's own
definition of `provisional`, which names ONS net migration as its example. The publisher's
per-vintage marker lives in `ons_marker` alone: the four prose notes carrying it in
`migrationFlowsTimeseries.json` became that field, and the file-level sentence repeating it is
deleted. **Nothing a reader sees was ever affected**: a series point's grade renders nowhere.

**The `series_ref` guard compared `value` and nothing else**, which made it a live instance of the
pattern this project keeps finding, a check keyed on the one field that happens to agree.
`migration/net-migration-2` and the point it names held the same value and two different grades,
invisible to the mechanism built to stop a figure held twice drifting. It compares `value`, `unit`
and `confidence_level` now, and the run names the fields instead of saying the two "agree".
`lib/series.mjs` had been dropping `confidence_level` when projecting a point, so the check could
not have asked.

### The citizenship card's three figures get records, 2 August 2026

**No published figure value changed. Three figures the site published without a record now have
one**, so nothing on that card is a number the data layer cannot age.

`population/british-citizenship-grants-previous-year` (269,178, year ending March 2025),
`population/british-citizenship-grants-by-naturalisation` (165,429) and
`population/british-citizenship-grants-by-registration` (71,083), all read from **table Cit_01 of
the Home Office citizenship summary tables**, year ending March 2026 edition, fetched 2 August
2026. The home page card cites them instead of writing them out; the rendered text is unchanged,
because a citation renders the same characters the card already showed.

**The launch readiness review asked where 269,178 and 312,063 live, and the answer is Cit_01.**
Neither is on the bulletin page the parent record cites. That page states the 12% decrease behind
269,178 but carries no applications figure and no 18% at all, so for 312,063 it states neither the
number nor its change.
312,063 gets no record because no page publishes it; it is named in the parent record's notes with
its table instead. Two more figures in that family are on no current page either, the superseded
year ending December 2025 values, and both notes now say that the current edition revises that
period rather than reproducing what was published for it: citizenship from 235,782 to 236,239, and
settlement from 146,405 to 146,119.

**`settlement-grants` was re-read against table Se_02 of the settlement summary tables**, which
carries its value and both figures in its notes, so it declares that table and its `retrieved_date`
moves to 2 August 2026. Its value is unchanged.

**Reconciled rather than merely read**: naturalisation plus registration is 236,512 exactly, the
all-routes total the site already publishes, and the table's own "Change in the latest year" row
gives the difference between the two annual totals. The whole table row is transcribed in
`data/evidence/`, so a later reader can see which column each figure came from.

### The launch readiness review lands its mechanical half, 2 August 2026

**No published figure value changed.** A whole-project review ran ahead of launch, seven
dimensions with every finding adversarially verified, written up in
`docs/LAUNCH-READINESS-REVIEW.md` with the remainder in `docs/BACKLOG.md`. All eight home page
figures were verified against their live sources with verbatim quotes. What landed:

- **Every line chart's y-axis labels were clipped at the chart's left edge**, and the clipped
  remainders read as different, plausible numbers: 1,500,000 rendered as "500,000". The
  margins are now measured from the text, as the right margin already was, and the width
  estimate carries the calibration it was missing.
- **Three owner-approved corrections reached their unapplied siblings.** The "audited" label
  correction 1b retired for the NAO's £4.9 billion estimate survived in four reader-facing
  places and is gone; correction 1i's retired revision reasoning survived on three pages and
  is replaced with the corrected form; the PR #72 cohort correction now holds on the two pages
  that still attributed this site's reinstated-claims inference to the Home Office.
- **The asylum page's appeal rate carries its basis and period**: around 40% of asylum appeals
  determined in the quarter to March 2026, beside an annual refusal count, rather than an
  unqualified "40% of appeals".
- **Three tribunals records are regraded `official` to `provisional`**, as the publisher flags
  the quarter and as the same file already grades the returns records. Values unchanged.
- **The fiscal caveats in `data/` prose adopt correction 1b's framing**: the plus or minus 1%
  range is the pre-Brexit static studies summarised by the Migration Observatory, not "across
  studies".
- **A printed page gets its chart tables back.** Chrome hides a closed details element's
  contents beyond the reach of child display rules, and the print stylesheet then hid the
  summary too, so printing lost both. The supported `::details-content` route opens them, and
  where it does not exist the summary now stays visible.
- **The validator ties a record's `source_url` to its `source_id`**: the two were checked
  against the catalogue separately, so a record pairing one publisher's id with another's URL
  passed, and the release watch would have filed it under the wrong publisher. All 75 records
  and every series point pass; negative-tested in both directions.
- **The link check now reads page prose**, collecting external links written in sentences
  alongside the data-layer URLs, 56 distinct URLs against 50. The theme-file list has one home
  in `lib/series.mjs` instead of seven private copies, the `number` filter fails the build on
  a missing value instead of rendering an invisible blank, and a file's `lastUpdated` may no
  longer lag the newest record inside it.
- Nineteen glossary links gain the site's canonical trailing slash, the pre-launch banner
  becomes a named landmark, and the documents that had drifted from the code, the four-held-
  twice count, the three-collections claim, the series ageing sentence, agree with it again.

### The hotel figure is re-sourced to the publication that contains it, 1 August 2026

**The value did not change. The source was wrong.** £2.1 billion of spending on asylum hotels in
2024-25 was attributed to the National Audit Office's *An analysis of the asylum system*. That
report does not contain it: all 56 pages were downloaded and searched, and there is no "2.1
billion", no "5.77", and no line where "hotel" appears with "billion". The figure is real and
official and is in the **Home Office Annual Report and Accounts 2024-25, HC 1133, page 75**,
printed 17 July 2025. PR #73.

> "Asylum support spend was £4.0 billion compared to £4.7 billion in 2023-24. Of this, £2.1
> billion was spent on hotels in 2024-25, at an average of £5.77 million per day, compared to
> £3.0 billion spent on hotels in 2023-24 at an average of £8.3 million per day."

The mis-citation sat on a figure rendered in three places, including the home page, and no check
could see it, because every check here verifies that a figure names a source and none verified
that the source contains it. **The clue was inside the record's own notes**: "£5.77m per day"
appears in no NAO document.

**The two neighbouring figures were checked and are correctly sourced.** The £4.9 billion total
and the £3.4 billion accommodation and support figure are both verbatim in the NAO report, so
nothing cascaded.

**The next annual report will not update this figure.** The 2025-26 edition, HC 440, gives hotel
headcounts and no hotel spending total, no per-day rate and no unit cost. The only hotel money in
it is a £22.9 million constructive loss on a single contract. The report is annual; this figure is
not, and the record says so.

Adding the Home Office's annual accounts to the source catalogue moved a derived count on
`/sources-and-method/` from six irregular publishers to seven, where the names beside it are
written by hand. The sentence would have said seven and listed six, and the build would have
passed. The seventh name is now in the list.

### The sources page counts itself, 30 July 2026

**No published figure changed.** The five figure counts on `/sources-and-method/` are now
derived from the data layer at build time instead of being typed. Adding a record no longer
touches that page. PR #68.

Twice in three days a hand-maintained count on that page went wrong or had to be corrected by
hand: PR #61 fixed rows that had drifted, and PR #67 moved a row again by minting one record.
The page's subject is how this site's figures are maintained, which is the worst place on it to
keep a number nothing reads.

- **`lib/published.mjs` is the one home for the definition.** Reaching a reader means rendering,
  by one of five routes: a token in a markdown page, a `{% figure %}` shortcode, a chart bar's
  `ref` or a `| metric` summary, a dashboard card, or a token in the `data/` prose that renders
  to a page. A `figures:` front-matter entry is not a route.
- **A transform, not a filter, because the page is markdown.** Markdown templating is off
  site-wide so that `{{theme/id}}` is a citation rather than an expression, so a markdown page
  cannot call a filter the way the claims page calls `countWhere` for its direction split.
  `{count:ho-immigration-stats}` uses the marker-and-transform idiom `{caption}` and `{#anchor}`
  already use, and numerals go in the table while the prose sentence spells numbers to ten, as
  the site's own `inWords` rule does. "The other fifteen" now reads "The other 15".
- **The scan reads the source, and `check-build.mjs` closes it at the far end**, comparing the
  refs it counted against the refs in the built HTML **in both directions**, with comments
  stripped at both ends. Six of the 46 cannot be compared that way, because a chart bar and a
  dashboard card render a value with no ref beside it, and every passing build says so.
- **Only the three cadenced publishers can be named by a marker.** Any other key is refused: a
  typo landing on a real publisher would render a plausible wrong number beside a row naming a
  different one, which is what the first negative test for this did by accident.

**What two readings found, and the branch shipped none of it.** The scan was stricter than the
renderer it modelled: `resolve-citations` accepts `{{ theme/id }}` with spaces, the scan did
not, so a citation written that way would have reached a reader and been counted for nobody,
and the check at the far end ran one way only and could not have seen it. It counted a chart
bar left inside a Nunjucks comment during a rework, and a citation inside an HTML comment,
which `resolve-citations` renders into the comment so that both ends confirmed a figure no
reader can see. It counted a `{% figure %}` in a markdown page, where that syntax ships as
visible junk rather than rendering. With both probes applied, the pre-fix branch printed
"47 of 75" and passed every check green, which is the defect this work exists to remove,
reintroduced by the work itself.

The publisher names in the sentence under the table are still prose, so the count there is
derived and the list beside it is not. That is in the backlog rather than fixed, because
deriving it means either catalogue wording on a page that reads as prose, or six display names
maintained by hand somewhere else.

### Visitor visas become a record, 30 July 2026

**2,241,997 for the year ending March 2026**, up 4% on 2,157,064. The site published this on
two pages as "over 2.2 million" and held it nowhere but inside another record's notes, which is
the same shape as the 627,000 in PR #58. PR #67.

Source: Home Office, Immigration system statistics, year ending March 2026, visas summary
tables, **table Vis_01**, read from the `.ods` rather than from a bulletin, and quoted in
`data/evidence/ho-immigration-stats-year-ending-march-2026.json`.

- **Reconciled against a total this site already publishes**, not just against its own source.
  Vis_01's 3,040,475 total entry clearance visas, less 2,241,997 visitor and 19,853 transit,
  is exactly the 778,625 held as total entry clearance visas granted excluding visitor and
  transit, and the seven route components sum to the same number independently.
- **Neither rounding survived.** "Over 2.2 million" on the glossary and the migration page now
  read 2,241,997, as the small-boats denominator did in PR #60.
- **The parent record no longer restates it.** Its notes said "Excludes 2,241,997 Visitor and
  19,853 Transit visas"; the visitor half is now held once, where a figure belongs.
- **`/sources-and-method/` moves with it**, Home Office 18 to 19, derived from the five routes
  a ref reaches a reader by rather than incremented, and confirmed by reproducing every other
  row of that table unchanged.
- `UNRECORDED_BASELINE` falls 33 to 31, the first two of the eleven scale-word figures.

### Figures written in words are scanned, 30 July 2026

**No published figure changed**, and the built site is byte-identical to before, proved by diff.
PR #66.

Every value scan in `validate-content.mjs` matched digits and only digits, so "2.2 million" and
"£1.3 billion" reached none of them: not comma-grouped, so neither errored, warned nor listed.
That is how this site writes its largest numbers, the population, the ten-year accommodation
contracts and the daily cost figures.

- **The comparison is at the unit's scale.** A record of 4.9 with unit `£ billion` is 4.9 billion
  pounds, so "£4.9 billion" in prose is that figure and is reported once, by the existing unit
  scan, rather than twice. A record of 20 with unit `£ per night` is not, so "£20 billion" is
  still reported rather than silenced by it.
- **A value that equals a record warns rather than fails, and the difference is the remedy
  rather than the confidence.** A token renders `toLocaleString`, so citing "10.7 million" would
  put "10,700,000" on the page. Two are live, the foreign-born card in `dashboard.json` and the
  third key caveat in `meta.json`, and both are the same record.
- **Eleven report lines the data layer never recorded became visible**, ten distinct figures
  with the visitor-visa one on two pages, so `UNRECORDED_BASELINE` rose from 22 to 33. It is the
  ratchet's only step up and the only one it should take: nothing arrived, a scan started
  looking. Three of the eleven are a daily cost divided out of a cited
  annual figure, the arithmetic-against-a-citation pattern PR #55 was recorded as having
  emptied. It emptied the comma-grouped half of it.
- **Three controls run on every invocation**, because a branch that reports rather than fails
  would otherwise print a shorter list and read as progress when its matcher broke. One probe is
  the real wrapped sentence from the costs page, where the number and the word "million" sit on
  different lines.

A second model found the defect that mattered, in the three lines written to stop one figure
being reported twice. The guard asked for "£" plus the number whatever the prose said, so a
figure carrying no currency sign at all, "3 billion" of anything, was answered by a record of
3 £ billion and silenced completely: no error, no warning, not even a line in the report. The
input that makes it serious is the £ dropped from "£4.9 billion", the slip this site has already
shipped once. Two self-critiques had read that guard and seen only its precision. The skip now
requires the prose to have written the £, and a control pins that.

What it still does not read is printed on every run: "2 200 000", "two million", "£1.3bn",
"2.2 thousand", and front matter, where one claim's short answer carries a rounded figure.

### The sources page counts itself correctly, and publishes a third limit, 30 July 2026

**No published figure changed.** What changed is what the page says about how many there are,
and every number of it was wrong.

A published figure is now defined as a record whose ref reaches a reader by any route: page
prose, a chart config, a front-matter dependency, or a dashboard card. That gives 45 of the 74
records, with 29 held as unpublished reserve.

- **Home Office 13 becomes 17, ONS 7 becomes 10**, and the Ministry of Justice figure of 2 was
  the only one that was right.
- **"The other fourteen" becomes "the other sixteen"**, from six publishers rather than four.
  The two missing were the Independent Chief Inspector of Borders and Immigration and ONS
  population estimates, both added by corrections 1c and 1a while the prose beside the source
  catalogue was left alone. A reader who scrolled saw the page contradict itself.
- **"No claim currently carries one" is removed.** Three claims carry a correction note, and a
  hand-maintained count that nothing reads is what produced every error above.

**The third limit.** The page now says that no real screen reader has been run over it: the
accessibility checks are an automated WCAG 2.2 AA audit on every page plus a reading of the
accessibility tree that assistive technology consumes, and that is not the same as someone
listening to a page. The section had opened "Two limits" and framed them as being about where a
number comes from, so both had to change before an accessibility limit could sit in it.

One number on that page is deliberately untouched: "the most recent full cycle took twenty-seven
days" is a statement about a past cycle that cannot be verified from the repository.
### Detected unauthorised arrivals become a record, 30 July 2026

**43,806 for the year ending March 2026**, a figure the site had only as prose inside another
record's notes, as "around 44,000". Small boats are 89.6% of it, where that note said "about 90%".
Neither rounding survived contact with the source.

Source: Home Office, Illegal entry routes to the UK detailed dataset, table `IER_D01`, read from
the .xlsx. **Calculated, and the record says so:** the Home Office publishes this table by quarter
and by calendar year and states no year-ending-March total, so it is summed over 2025 Q2 to
2026 Q1 across all four methods of entry, with every quarterly component quoted in
`data/evidence/ho-irregular-entry-year-ending-march-2026.json`.

- **Checked twice, and the second check was free.** The row-level `Data_IER_D01` sheet reproduces
  43,806 independently of the pivot, and the small boats component comes to 39,271, which is
  exactly what this site already publishes for that period from the Commons Library briefing. That
  briefing refuses automated fetching, so this gives that figure a primary source it did not have.
- **The page states what the figure cannot do.** Detected means detected: it cannot count anyone
  nobody found, so it is a floor and not a total.


### Non-EU+ long-term immigration becomes a record, 30 July 2026

**627,000 for the year ending December 2025**, a figure the site published on two pages while
holding it nowhere: it existed only as prose inside the notes of the record for total
immigration. The next ONS release would have made it wrong in both places with nothing to say so.

Source: ONS, Long-term international migration, provisional, year ending December 2025, Table 1
of the accompanying dataset, read from the .xlsx rather than the bulletin. "Immigration, YE Dec 25
P: All Nationalities 813,000; British 110,000; EU+ 76,000; Non-EU+ 627,000". Evidence in
`data/evidence/ons-ltim-year-ending-december-2025.json`.

- **Reconciled, not just located.** The three nationality groups sum exactly to the 813,000 total
  the site already publishes, which is what establishes the basis and the period rather than the
  figure on its own. The bulletin states the same number twice, so this is a case where the
  narrative and the table agree.
- **The parent record's notes no longer restate it.** One figure, one home applies inside the
  data layer as well as on a page, and a note repeating a value that now has a record is exactly
  the drift that rule exists to prevent.


### People claiming asylum in 2025 becomes a record, 30 July 2026

**100,625 for calendar year 2025**, a figure the site already published as "around 100,000" on
two pages without holding it anywhere. It was a live number rounded just enough to slip past the
scan that refuses a longhand record value, in a sentence whose whole point is that it is of
similar magnitude to the support figure beside it.

Source: Home Office, Immigration system statistics year ending March 2026, Asylum summary tables,
table `Asy_00a`, read from the .ods rather than the bulletin. "People claiming asylum, 2025:
100,625". Evidence in `data/evidence/ho-immigration-stats-year-ending-march-2026.json`.

- **Held twice on purpose.** It is also the 2025 point of the asylum applications series, so the
  record declares `series_ref` and `validate-data.mjs` refuses a mismatch. That was the only
  way to cite it from a Markdown page: the `at()` filter works in a chart summary and nowhere
  else, which the validator says when it refuses a series value written longhand.
- **The other half needed no record.** "around 97,500" was the support figure, which the glossary
  already cited and the claim page did not. An inconsistency between two pages rather than a gap
  in the contract.


### The update prompt, and a tracking rule that did not look down, 30 July 2026

**No published figure changed.** `docs/prompts/update-from-release.md` is phase 3 of the update
automation scope: a versioned prompt that drives a by-hand update, names the refusals, and sends
the assistant to the runbook for the procedure rather than carrying a copy of it. It refuses
series work outright, which costs two of the three cadenced releases, ONS and the Home Office
quarterly, and is the accepted price of not omitting it silently. Not yet exercised against a real release, and it says so.

Building it exposed a defect in an older check. `validate-content.mjs` required every planning
document in `docs/` to be referenced from the backlog, and did not descend into directories, so
`docs/prompts/` was the first subdirectory and its contents were invisible to the rule whose whole
purpose is that a scope cannot be written and forgotten. The scan is now recursive and matches on
the path relative to `docs/`, so a nested document cannot be satisfied by a reference to a
same-named one above it, nor inherit a top-level exemption.

### The by-hand update runbook, 30 July 2026

**No published figure changed.** `docs/UPDATING-DATA.md` is the procedure for moving the site
onto a new release by hand, written before the assistant-drafted version so that the job can be
done before it is delegated. `docs/UPDATE-AUTOMATION.md` phase 3 now points at it by path and
heading instead of carrying its own four-field copy, which was wrong in four clauses.

Two things it turned up about this repository rather than about the procedure. The first draft
never mentioned this file, while `/sources-and-method/` promises readers that every change to a
published figure is recorded here with its reason and source; that omission would have made the
trust page false one update later. And the *Reference periods do not line up* table on that same
page is introduced with "At the last update", so any of the three cadenced updates falsifies a
row of it and no check reads a period label. It is now the one piece of page prose an update is
told to edit.

### A correction inside an edition is now watched for, 30 July 2026

**No published figure changed**, and the built site is byte-identical to before, proved by
diff. PRs #48 and #49.

A correction the publisher makes *inside* an edition leaves the edition slug alone, so the
release notifier reports the source as current and is right to. No publication cadence implies
one either. That was the one channel through which a wrong number could sit on this site
indefinitely, and nothing read it.

- **14 records and 2 series files now declare `table_reference`**, the publisher tables behind
  the figure, taken from the prose that already named them. `validate-data.mjs` holds the
  declaration to the prose in both directions: a table named and not declared is one the watch
  cannot see, and a declaration nothing names is a string nobody can check.
- **`check-releases.mjs` reads the Home Office data-tables change history** and matches it
  against those declarations. 16 entries, 3 naming a table identifier, 1 naming one of the
  twelve this site declares: the 1 June `Vis_01` correction. It reports a figure only where
  that figure's own `retrieved_date` pre-dates the correction, so it is stateless and clears
  itself when someone re-reads the figure. Today it reports current.
- **It reports and never gates**, like the notifier it sits inside, because a corrected table
  may not touch the row this site publishes. The last one missed by a single row.
- **What it cannot see is printed on every run**: most change-history notes name their tables
  by title rather than by identifier, a `table_reference` says which table and never which page
  publishes it, and the comparison is by whole UTC days.

A second model reviewing the branch found the defect that mattered: the series clearing key,
the envelope's `lastUpdated`, was the only date in the data layer reaching a comparison without
passing `isRealDate`, so a prose date would have sorted above every ISO one and reported every
correction to that series as already handled, for ever.

`docs/HANDOFF.md` also now records that `main`'s history is truncated: its root commit is
parentless and everything before PR #42 is a separate history, surviving on the branch
`history-to-pr-41`.

### The series files join the source catalogue, 28 July 2026

**No published figure changed**, and the built site is byte-identical to before, proved by
diff. Each of the four series files now declares a `source_id` on its envelope, the way every
metric already did, and `validate-data.mjs` requires it and checks it resolves.

It closes a hole found by critiquing the update prompt for a fault the release notifier turned
out to share: the notifier watched 71 records and none of the 100 series points, which are
replaced wholesale on release. Two of the four series have no metric declaring a `series_ref`
either, so a series file left on a superseded edition would have been invisible to every check
here. The notifier now reads them, and catching that case is one of its negative tests.

**The primary series only.** A companion block is deliberately a different vintage:
`netMigration.historical` is the discontinued series at its 2020 vintage, and reading companion
blocks would report that file behind for ever.

### The release notifier, 28 July 2026

**No published figure changed.** `scripts/check-releases.mjs` asks each watched source which
edition it has published, and compares that with the edition every record cites. Until now
nothing detected that a release had happened: the staleness check ages a figure against its
source's cadence, which is a guess, and silent staleness is the top risk in the register.

- **It compares editions, not dates.** A release is identified by the month and year in its
  URL, which the records already store. The date comparison the scope carried would have
  alerted the first time it ran and been wrong, because a Home Office page was edited on
  16 July without anything being published.
- **It compares every cited edition, not the source's newest.** A per-source answer reads as
  "current" while one figure sits a release behind, which is what happened to the EU
  Settlement Scheme figure corrected above. Replaying that case is one of the negative tests.
- **A route that matches no document fails loudly.** Both series have been renamed once
  already, `immigration-statistics-` to `immigration-system-statistics-` and
  `tribunal-statistics-` to `tribunals-statistics-`, and an empty match would otherwise read
  as "no newer release".
- **Sources with no route are named, not skipped**, with the cadence the catalogue records
  beside each, because a source nobody watches is not a source that is up to date.
- **Not established, and said on every run:** that a release which kept its slug has changed
  anything. Corrections between editions land on the data-tables page, whose change history
  names the exact table, and nothing reads that yet.

### EU Settlement Scheme settled status grants, 28 July 2026

**370,535 for the year ending March 2026**, replacing 354,647 for the year ending December
2025. The figure was a release behind: every other Home Office figure on the site had moved to
the March 2026 edition and this one had not. Found while re-verifying the release notifier's
endpoints, and neither existing check could see it, because the staleness check ages
`retrieved_date` and 17 June is well inside a quarterly window.

Source: Home Office, Immigration system statistics, year ending March 2026, settlement and
citizenship. "Of these, 71% (370,535) were settled status grants under the EUSS". Evidence in
`data/evidence/ho-immigration-stats-year-ending-march-2026.json`, the first entry written
under the contract added below.

- **The two editions count the same thing**, which the release does not state and the
  arithmetic does. Both are `EUSS_QTR` settled conclusions plus the automated-grants estimate:
  270,235 plus 100,300 for the year ending March 2026, and 267,977 plus 86,670 for the year
  ending December 2025. Recorded in the record's notes, because the published figure appears
  in the bulletin narrative and in no summary table.
- **The note beside the figure was stale too**, saying 4.4 million grants since 2018 where the
  release now says 4.5 million. Nothing checks prose about a figure, which is a published
  limit of this site.
- **No page cites this record**, so no reader saw the old value and nothing a reader sees
  changed. Proved by diffing the built site, not by reading the change.

### The evidence check, 28 July 2026

**No published figure changed.** `scripts/check-evidence.mjs` compares the data layer against
`origin/main` and requires any metric whose value moved, and any metric that is new, to be
declared in `data/evidence/` with a quote from a fetched source containing that value. CI fails
without one. It is the mechanical half of what the sources page promises a reader, that no
figure appears here because a model asserted it: a fabricated value cannot appear in a quote
taken from a real page. Eight fabricated figures reached this repository once and a reviewer
caught them. Nothing else would have.

- **A derived figure appears in no source**, which is what makes it derived, so it quotes its
  inputs and states the arithmetic instead. The exemption is keyed on `confidence_level`
  rather than a list of refs: the derived figures went from one to three in the week between
  this being scoped and being built, and a hard-coded list would have required two of them to
  quote a value nobody publishes.
- **The evidence files are committed and kept**, as the audit trail. Entries are matched, never
  validated wholesale, so an entry naming a figure since renamed stays as history rather than
  failing a build until someone deletes the trail to get a green run.
- **It fails rather than skipping when it cannot see the base branch.** A comparison against
  nothing finds no changed figure and would report that as a clean run. On a push to main,
  where the base and `HEAD` are the same commit, it says that rather than announcing that no
  figure changed.
- **Not covered: the four series files.** Their 100 points are replaced wholesale on release
  under the single-vintage rule and carry no evidence at all. The check counts the changed
  files and says so on every run.

### Citing a series point, 28 July 2026

**No published figure changed.** Twelve numbers that had been typed by hand into chart
summaries and notes are now resolved from the series files at build time. That was checked by
diffing the built site against the same build before the substitutions: byte-identical across
all 16 pages, so every one renders exactly what it replaced.

- **Four figures were held twice**, as a headline metric and as a point in a series, with
  nothing reconciling them: `migration/net-migration`, `net-migration-2`,
  `total-long-term-immigration` and `total-long-term-emigration`. All four agreed, and a
  release revising one and not the other would have published two different official values
  for the same measure. Each metric now declares a `series_ref` and `validate-data.mjs`
  refuses the mismatch. An undeclared overlap is reported for review on every run.
- **An `at(year)` filter** cites a series point inside a chart summary, where a shortcode
  cannot go. It throws on a year the series does not hold.
- **A series value written longhand now fails the build**, on the same terms as a record
  value. Three of the twelve were in chart notes rather than summaries and had never been
  counted; the scope had looked at summaries only. A fourth match, `285,000` in the
  `migration.njk` note, is the size of the 2022 revision and only coincides with the 2017
  point of the discontinued series. It is declared rather than cited, because citing it would
  have put an unrelated figure in that sentence.
- **Fixed: `historical_literals` never worked from a content page.** It was split on commas,
  so a comma-grouped value became two junk exemptions and the real one was never exempted. No
  content page had ever used it, so nothing had been silently exempted. Semicolons only.
- **Fixed: a citation missing `| number` shipped an unformatted figure.** `at` returns the raw
  value, so `45537` reached the built page with `validate` and `build` both green. Found by
  critique after the work was otherwise finished, and confirmed by watching it happen. Every
  `at()` must now pass through `| number`.

**Changed, what the site says about itself.** `/sources-and-method/` listed three things the
checks do not establish. The second, that values quoted from a long-run series are not
individually cited, is no longer true and is removed. The first now carries the limit that
replaces it: a citation fixes the value and not the sentence, so a summary quoting the right
number against the wrong year still builds.

### Pre-publication review corrections, 27 to 28 July 2026

The review was conducted on 27 July 2026 and its findings became corrections 1a to 1i, all
of which have now landed. **This does not record the review as passed**; that decision, and
the closing steps behind it, are tracked in `docs/BACKLOG.md`. The review itself is in
`verification.txt` at the repository root.

**Added, figures**

- `asylum/asylum-administrative-outcomes`, 5,931 people for the year ending March 2026.
  Summed from the Home Office Asy_D02 pivot over 2025 Q2 to 2026 Q1, because the figure
  appears on no HTML bulletin. The same four quarters reproduce the published 79,719
  refusals, 16,901 withdrawals and 48,581 grants, and a grand total of 151,132, which is how
  the basis and period were confirmed rather than assumed.
- `asylum/people-in-asylum-accommodation`, 93,653 as at 31 March 2026, `confidence_level:
  calculated`. The Home Office publishes the two components and the support total, but not
  this sum.

**Fixed, category and basis errors**

- The initial-decisions chart included withdrawals under the title "Initial decisions by
  outcome". A withdrawal is not an initial decision, so it is retitled "Initial decisions and
  withdrawals". Its summary described 16,901 as claims; the figure counts people, including
  dependants. The three bars were also presented as an exhaustive breakdown and are not.
- Asylum-related immigration, 88,000, was labelled "asylum and humanitarian" on the
  migration chart and the claim table. ONS reports those as separate categories, so the
  label understated the combined figure and misstated the asylum one. Now "asylum
  applicants", with humanitarian named separately at about 6%.
- The non-EU+ definition described an arrival category. It is a nationality grouping, and
  the previous wording named the EEA rather than ONS's EU plus Norway, Iceland,
  Liechtenstein and Switzerland.
- The claim about asylum accommodation answered with the 97,519 support total. That figure
  includes 3,866 people receiving subsistence only and no accommodation. The same conflation
  existed on the asylum page and was fixed there too.

**Fixed, invalid comparisons**

- A sentence applying the historical cohort uplift to the current 39% grant rate is deleted.
  Home Office note 48 on that table states its initial rate "will not match the grant rate in
  the 'initial decisions' dataset as they relate to a different cohort of initial decisions".
  The same reasoning existed in three places, including the notes on the grant-rate record,
  where it would have instructed the next editor to reintroduce it. It is replaced with a
  refutation valid on the same table: between a fifth and a half of each 2010 to 2020 cohort
  ended without a grant.
- "The 2022 estimate has moved by more than 120,000 across revisions" understated the case.
  It has moved by 285,000, from 606,000 when first published on 25 May 2023 to 891,000, 47%
  higher.
- The net migration peak of 891,000 was unqualified. It is the highest point on the
  calendar-year series shown; the full rolling series peaks at 944,000 in the year ending
  March 2023.
- "The queue grew steadily through the 2010s" was false on the people basis, which fell from
  22,898 at the end of 2014 to 22,147 at the end of 2015.

**Changed, terminology and disclosure**

- "Final grant rate" is now "latest recorded grant rate". **Corrected 31 July 2026, PR #72:**
  this entry called that phrase the Home Office's own label. It is not one. The publisher's
  terms are "latest outcome" and "latest decision", and searching the bulletin for "latest
  recorded outcome" returns nothing. "Appeals heard" is now "appeals determined at a hearing or on the papers", and the
  denominator is disclosed: of 7,799 asylum and protection appeals disposed of in the
  quarter, 52% were determined, 35% withdrawn, 6% struck out and 6% invalid or out of time.
- The refused-asylum claim's front-matter source is now "Home Office; Ministry of
  Justice/HMCTS", and the page discloses its three mixed reference periods and the
  provisional latest quarter.
- "Immigrants pay far more in tax than they cost" drops the intensifier. No attributable
  example of the stronger wording could be supplied without breaking the published rule
  against attributing claims to named people.
- Two claim pages now disclose that no published example of the claim in those exact words
  was found.

**Not changed, and deliberately**

- The review's 35,000 for humanitarian immigration is not written anywhere. The ONS bulletin
  gives only the 6% share, so the share is what the pages carry.
- The review's word "destitution" is not used. The two Home Office pages fetched put the
  test as being homeless or without money for food.
- Two figures that looked wrong against the Ministry of Justice bulletin were left alone
  after the primary tables showed they were right. The bulletin prints 39% allowed and 61
  weeks for the whole immigration chamber; tables FIA_3 and T_3 give 40% and 67 weeks for
  asylum and protection.
- `last_reviewed` is unstamped on every page, per `docs/BACKLOG.md`.

### Changed, data contract

- Every metric now carries `id`, `geography` and `published_date` in addition to the
  previous ten fields. `id` gives templates a stable handle that survives quarterly
  updates; `geography` was previously visible only in prose, which hid the England-only
  scope of the NHS and social care workforce figures.
- `date` is now defined as the end of the period covered. Eight figures previously filed
  under their publication date have been corrected: the three National Audit Office
  spending figures (were 2025-12-10, now 2025-03-31 for financial year 2024-25), the two
  asylum accommodation cost figures, and the Skills for Care workforce share. Any chart
  sorting on `date` was placing these up to nine months late.
- `dashboard.json` no longer copies values from the theme files. Its six cards and four
  supporting denominators now hold a `ref` into the theme file that owns each figure.
  Previously the same figure existed in two places and nothing detected drift between
  them, so a quarterly update that missed the dashboard would have published two
  different official figures for the same measure.

### Fixed, figures

- Net fiscal impact of immigration is no longer stored as `value: 1`. It is a range
  spanning zero (roughly minus 1% to plus 1% of GDP, depending on method) and was
  encoded as a point estimate that any metric card would have rendered as "1% of GDP", the exact misuse this project exists to prevent. It now uses `value_type: "range"` with
  explicit bounds and a null value, and the validator rejects any attempt to flatten it.
- The four dashboard supporting denominators (UK population, foreign-born population,
  immigration, emigration) were published with no source, date or confidence level, in
  breach of the project's own stated contract. Dividing two of them gave a foreign-born
  share of 15.4% against the 16% published two objects away in the same file, because
  they came from different vintages. All four now reference the fully sourced metrics
  that already existed elsewhere in the data layer.
- Net migration figures for 2021, 2022 and 2023 were graded `estimated`, which the
  project's own taxonomy reserves for pre-2021 figures on a non-comparable methodology.
  They are current published official ONS estimates and are now graded `official`.
- Unit normalised: asylum system cost was `£ billion per year` on the dashboard and
  `£ billion` in the theme file.

### Fixed, live figures restated in prose now cite the record

Reviewing the sub-100 unit-qualified warnings figure by figure, rather than trusting the
stored note that called all fourteen coincidences, found three live values written
longhand beside the tokens that already cited them on the same page. Each would have
drifted from its own token on the next release. They now cite the record throughout
(#28, #30).

- `refused-asylum-seekers-are-eventually-recognised`: the initial grant rate (39%) and the
  appeal success rate (40%), current Home Office and Ministry of Justice figures, were
  restated longhand in the discussion below the tokens citing them.
- `nineteen-per-cent-born-abroad`: four references to the 2021 Census foreign-born share
  (16%). Two 16% figures stay longhand by design: the "16.0%" comparison against "one in
  six is 16.7%" needs a decimal a token cannot render, and the front-matter short answer
  flows into a meta description the citation transform is not verified to reach.

The warning count fell from fourteen to eleven, and each remaining one is a coincidental
value match against an unrelated metric. The README count was corrected to match (#29, #30).

### Added

- `LICENCE`: MIT for code and original writing; Open Government Licence v3.0 attribution
  for the Crown copyright material the data layer reproduces. The repository was public
  with no licence at all, which is the opposite of the transparency the project claims.
- `.github/workflows/validate-data.yml`: the data contract now runs on every push and
  pull request. It was previously enforced only by remembering to run it.
- `package.json` so the check runs as `npm test`.
- This changelog.

### Fixed, net migration timeseries rebuilt after verification against ONS

The series was flagged `BLOCKED, DO NOT PUBLISH` on 22 July 2026 and has now been replaced.
What was wrong:

| Year | Held | Current basis | Discontinued basis | Note |
| --- | --- | --- | --- | --- |
| 2016 | 345,000 | 249,000 | 249,000 | Matched no ONS figure in any vintage. First publication was 248,000 |
| 2017 | 275,000 | 208,000 | 285,000 | Matched neither basis |
| 2018 | 275,000 | 276,000 | 260,000 | Matched neither basis, though within 1,000 of the current one |
| 2010 | 252,000 | not published | 256,000 | Pre-Census-revision original, superseded |
| 2015 | 329,000 | 303,000 | 332,000 | An adjusted-series value sitting among unadjusted ones |
| 2019 | 271,000 | 184,000 | 313,000 | An adjusted-series value; the two bases differ by 129,000 here |
| 2020 | omitted | 93,000 | not published | ONS does publish this on the current basis |
| 2021-2023 | 488/764/872k | 467/891/848k | not published | Superseded; 2022 had moved by over 120,000 |

Only 2011-2014, 2024 and 2025 were correct as held.

The underlying fault was structural: one array silently mixed at least three ONS vintages,
so charting it would have drawn a line no ONS publication supports.

The replacement holds two explicitly separate series. The primary is ONS's current
new-approach basis, 2012-2025 including 2020, every point from the single 21 May 2026
release, each value quoted verbatim from Table 1. The secondary is the discontinued
IPS/LTIM series 2010-2019, labelled superseded and kept only because 2010 and 2011 exist
on no other basis and readers will meet those figures in older coverage.

The comparability break is recorded at June 2021, per ONS's current guidance, not at 2020
as the old file assumed. Confidence levels now follow ONS's own markers: 2025 provisional,
2024 revised, earlier years unmarked in this vintage.

### Added, three timeseries and eight metrics

All verified against primary sources on 22 July 2026, each value carrying a quoted table
cell or sentence.

- `asylumApplicationsTimeseries.json`: applications 2010-2025, calendar years, people basis
  throughout (table Asy_00a).
- `asylumBacklogTimeseries.json`: initial decision backlog 2010-2025, end-December stock, on
  both the people and cases bases, 64,426 against 48,723 at the end of 2025, the same queue
  counted two ways.
- `migrationFlowsTimeseries.json`: long-term immigration and emigration 2012-2025, the two
  gross flows behind net migration.
- Returns, previously absent despite being a specified homepage card: enforced (9,723),
  voluntary (29,284), the combined total (39,007, calculated, since the Home Office publishes
  only a rounded 39,000), asylum-related (11,918), and refused entry at port (17,623, held
  specifically to stop it being folded into the returns total).
- Initial decisions by outcome, previously trapped inside a prose note: decisions total
  (128,300), refusals (79,719) and withdrawals (16,901).

### Changed, figures moved to year ending March 2026

Visa, citizenship and settlement figures were being presented as latest while a newer Home
Office release existed. Entry clearance 809,407 to 778,625; sponsored study 426,471 to
409,954; work 261,112 to 252,775; Health and Care main applicants 13,286 to 10,509; family
66,610 to 62,470; citizenship 235,782 to 236,512; settlement 146,405 to 152,306.

### Investigated, Afghan resettlement total is correct

The three scheme figures sum to 38,587 against a stated total of 38,617. Neither is wrong:
the Home Office records 30 people under the programme with scheme name unknown, and states
that breakdowns exclude them while totals include them. No value changed; the explanation is
now in the metric's notes. Also recorded there: the Home Office calls the third route the
Afghanistan Response Route on its topic page and the Afghanistan Relocation Route in its own
table Res_01.

### Added, the first six claim checks

`content/claims/` now holds six drafted claims, meeting the section 17 launch gate of at
least five checked against definitions and data.

Claims cite live figures by token (`{{theme/metric-id}}`) rather than hard-coded numbers,
so a figure updated in `data/` updates in every claim citing it, and a claim citing a
deleted metric fails the build rather than publishing a stale number. Historical
illustrations stay as literals, labelled, because they are arguments about the past.

`scripts/validate-content.mjs` added and wired into `npm test` and CI. It checks front
matter, that every token resolves to a real metric, that every cited figure is declared so
a data update can find the claims it affects, that no claim has gone unreviewed for more
than twelve months, and the two-thirds balance rule.

**The balance rule failed on the first run.** The five claims specified for launch ran four
to one in one direction, 80%, against a two-thirds limit written into the same document
hours earlier. A sixth claim was added rather than one of the five dropped, since each
corrects a distinct class of error and cutting one to hit a ratio would game the rule
rather than satisfy it. The set now runs four to two. Recorded in foundation section 15
rather than quietly corrected, because the failure is evidence for making the constraint
mechanical instead of trusting it to review.

### Added, the glossary

`content/glossary.md`: 23 terms in five groups, covering the eight specified in foundation
section 8.2 plus the terms needed to read this site's own figures. Cites live figures by
token on the same contract as the claims.

It grew past eight because the original list could not carry the site's caveats. Flow versus
stock and people versus cases account for most misreadings in this subject. Backlog became a
table rather than a definition, because the initial decision queue has fallen sharply while
the appeals queue has risen to a record, and one number for "the backlog" can be right about
one and wrong about the system.

`validate-claims.mjs` becomes `validate-content.mjs` and now checks the glossary too: tokens
resolve, cited figures are declared, every term has a stable anchor so claims can link to it,
internal links resolve, and every term says what the word does NOT mean, a definition that
leaves the misreading intact has not done the job.

**A bug the negative tests caught.** The first version of the glossary checks ran after the
error report and `process.exit`, so every glossary error was collected and silently
discarded: a broken page passed as green. Found only because each new check was tested
against a deliberately broken copy rather than assumed to work. Reporting now happens last,
with a comment recording why.

### Fixed, defects in the first draft of the content

Found by auditing the content against the data layer rather than re-reading it.

- **Three currency tokens had no £.** `{{fiscal/government-spending-on-the-asylum-system}}
  billion` renders as "4.9 billion", not "£4.9 billion". The token contract was never
  actually specified, which is why this was possible: a token renders the formatted value
  and nothing else, and the author supplies the unit. Now documented and checked.
- **Three live values were hard-coded longhand**, silently opting out of the staleness
  protection the token system exists to provide, including "now stands at 331,000", a
  figure that has already been revised twice and will be again.
- **No claim linked to the glossary.** The validator required every term to carry an anchor
  "so claims can link to it" while no claim linked to anything. All six now link, and the
  targets are checked.

Three new check classes, each catching a defect that had already occurred: units on tokens,
range metrics cited as points, and live values written longhand. Plus glossary link
resolution across files.

One negative test initially reported as passing because the test string did not match the
file, so the check was never exercised. Re-run correctly, it caught the defect. Worth
recording: a negative test that does not fail proves nothing until you confirm it actually
broke what it claimed to break.

### Added, sources and methodology page

`content/sources-and-method.md`, meeting the section 17 launch gate. Covers what the site
is and is not, the source catalogue, the data contract in plain terms, confidence levels,
the cross-cutting caveats, why reference periods do not line up, the update commitment,
corrections, what the site does not cover, how it was built, and reuse terms.

Structural blocks, the source catalogue, confidence levels and key caveats, render from
`sources.json` and `meta.json` via `{{> partial }}` syntax rather than being restated in
prose, so the page cannot drift from the data it describes. The validator knows the set of
renderable partials and rejects unknown ones.

Two sections are deliberately unresolved and marked as such on the page. The **update
commitment** proposes fourteen days from each release but needs the owner's sign-off,
because publishing a target that is not met is worse than publishing none. The **AI use**
disclosure states plainly that AI assistance was used in research, drafting and checking,
and that human review before publication is a commitment about launch rather than a
description of the research stage, the honest version, not the reassuring one.

The validator now covers standalone content pages, which were previously unvalidated: only
claims and the glossary were checked, so this page's tokens went unverified until the loop
was added. It immediately caught an undeclared figure.

### Fixed, stale source catalogue entry

`sources.json` still described Home Office visa and citizenship figures as coming from the
year ending December 2025 release, after those figures moved to year ending March 2026.

### Changed, every figure now carries a publication date

The 33 figures without one are resolved. Nine came from evidence already in the repo: they
sit on topic pages of the Home Office year ending March 2026 release or the ONS year ending
December 2025 bulletin, both published 21 May 2026 and both already recorded against
sibling metrics. The original pass matched on period label and missed these because they
carry point-in-time or cumulative periods instead.

The remaining 24 were researched against their sources, each date taken from a fetched page
and quoted. Where a source shows both a first-published and a last-updated date, the
last-updated date is recorded: a briefing first posted in 2017 and revised in 2024 is cited
for what it says now, so the earlier date would misrepresent the figure's currency.

Three findings from the pass:

- **A recorded date was wrong.** The Commons Library asylum statistics briefing was
  recorded in `source_name` as "SN01403, 29 May 2026". It was published 1 June 2026.
- **The OBR lifetime-contribution figure now cites OBR directly** rather than the Migration
  Observatory briefing that summarised it, since the primary report was located and dated
  (12 September 2024). Citing the intermediary was weaker traceability than necessary.
- **The Home Office has renamed a dataset.** "Irregular migration to the UK detailed
  dataset" became "Illegal entry routes to the UK detailed dataset" from the year ending
  December 2025 edition, and the old dedicated URL now redirects. Worth knowing before the
  next update, and worth noting given the site's own wording rules.

Three Commons Library dates were verified from Internet Archive snapshots because the live
host returns 403 to every automated request. The Commons Library revises its single
"Published" date in place, so those dates are correct as of the snapshot rather than
necessarily as of today.

One figure is deliberately left undated. The 2026 year-to-date small boats count comes from
a daily-updated operational page, where the publication date of a past snapshot cannot be
recovered. It now carries `published_date_unavailable` explaining why, and the validator
treats a documented impossibility as settled rather than as outstanding debt, a counter
that can never reach zero stops being read.

That figure remains a maintenance liability: it is approximate, it decays weekly, and it
should probably not ship at all.

### Fixed, moved source URLs

Two Skills for Care URLs redirected; both updated to their targets, verified as resolving.
The Home Office data tables redirect is left alone, since it only strips a fragment
identifier useful to a reader.

### Added, Eleventy site

Framework chosen: Eleventy 3, matching the hosting already connected on Netlify. Renders the
overview, the glossary, the claims index, six claim pages and the sources page.

**Content files are not pre-processed as templates.** `markdownTemplateEngine` is `false`,
because `{{theme/metric-id}}` is this project's citation syntax and Liquid would otherwise
consume it, silently breaking the guarantee that no figure is hard-coded in prose. Citations
resolve in a post-render transform instead, and an unresolved token or unknown partial throws
rather than shipping `{{...}}` to a reader.

Two wrinkles handled, both from markdown running first: it escapes the `>` in a partial to
`&gt;`, and it wraps a block partial in a `<p>`, which would nest a table inside a paragraph.

`netlify.toml` runs `npm test` before the build, so a figure missing its source or a claim
citing a deleted metric fails the deploy rather than reaching a reader. Also sets a strict
content security policy; the site loads no external resources at all.

### Fixed, glossary rendered six h1 elements

The five group headings used a single `#`, which became `<h1>` alongside the layout's page
title: six h1s and a broken document outline, a WCAG 1.3.1 failure. Groups are now `h2` and
terms `h3`. The validator was codifying the wrong level, so it was updated too, and it now
rejects any `#` heading in that file, the layout owns the page's only h1.

Found by checking the built HTML rather than by reading the markdown, where the levels looked
perfectly reasonable.

### Fixed, defects found by looking at the built pages

None of these were visible in the source. All were found by rendering the site and looking
at it, which is the only way this class of defect surfaces.

- **Every glossary link on the site was dead, and the anchor syntax was visible as junk.**
  Markdown does not support `{#id}` natively, so `### Flow and stock {#flow-and-stock}`
  rendered as a heading with that literal text in it and produced no `id` at all. All 54
  links from the claims to definitions went nowhere. `validate-content.mjs` had checked
  that the markdown declared an anchor on every term, which was true, while the build
  silently discarded them. **Validating the source is not validating the artefact.**
- The dashboard caveat was being dumped mid-sentence into the homepage by a stray
  `truncate(0)`, which does not mean "output nothing".
- Every claim page shared one generic `h1`, "Claim check", poor for search, browser tabs
  and heading-by-heading navigation. The claim itself is now the `h1`, placed inside its
  card under the "The claim" label so the framing travels with it and a screenshot of the
  heading can never read as this site asserting the claim.
- Claim prose ran to 99 characters per line, well past comfortable reading. The claim
  article is exempt from the page measure so the card can run full width; its prose is not.
- A CSS `margin-top` was silently overridden by a later `margin` shorthand.
- The homepage showed the last three claims rather than the first three, so the editorial
  ordering, which deliberately runs both directions early, was inverted.

`scripts/check-build.mjs` added and wired into `npm run build` and CI. It checks the output
rather than the input: every internal link and fragment resolves, no template or anchor
syntax survives into the HTML, and every page keeps its lang, skip link, single `h1` and
unbroken heading order. Verified by removing the anchor fix and confirming it reports all 54
dead links.

### Added, robots.txt disallowing all crawlers

The site went live before three of its own commitments were met: there is no about or
funding page naming who runs it, the update commitment on the sources page is unsigned, and
the human review that page promises has not happened. An anonymous corrective site on this
subject is assumed to be astroturf by default, so it should not be findable by search until
those are settled. The file explains this and says to remove it at launch.

`check-build.mjs` now fails if `robots.txt` is missing or lacks its `Disallow: /` rule, so
the site cannot quietly become crawlable again. That check is meant to be removed
deliberately at launch, not to survive it.

Note that `Disallow: /` prevents crawling rather than indexing. It is the right control for
"not ready yet". If a URL is ever discovered another way it could still be listed without
content, and the fix for that is an `X-Robots-Tag: noindex` header, which requires crawling
to be *allowed* so the header can be read. The two mechanisms conflict; use one or the other.

### Fixed, the build did not clean its output directory

Eleventy leaves `_site` in place between builds, so a deleted source file kept its stale
artefact. This briefly made a negative test pass when it should have failed: `robots.txt`
was removed from `content/` and the check still found the previous build's copy. The build
now clears `_site` first. Netlify builds from clean anyway, so this only ever misled local
verification, which is exactly where it matters most.

### Added, migration and asylum pages, with charts

Six charts across the two pages, rendered as inline SVG at build time: net migration over
time, immigration and emigration together, reason for migration, asylum claims over time,
initial decisions by outcome, and the first-decision queue on both counting bases.

No JavaScript and no charting dependency. The chart is in the HTML, so it works with
scripting off and needs no exception to the site's content security policy. Three editorial
rules are enforced in `lib/charts.mjs` rather than left to whoever writes the page: the
y-axis always starts at zero, since a truncated axis exaggerates change and this site exists
to correct that; every chart carries its figures as a real table; and no series is
distinguished by colour alone, lines differ in stroke pattern and are labelled directly at
their end. The bar chart uses one neutral colour for grants, refusals and withdrawals, since
section 10 forbids red/green moral coding of outcomes.

The methodology break at June 2021 is drawn on both ONS charts rather than left to a
footnote.

### Fixed, citations silently rendered as NaN in Nunjucks pages

`{{theme/metric-id}}` survives in markdown because markdown is not pre-processed as a
template. Nunjucks pages **are** pre-processed, so the same braces were evaluated as an
arithmetic expression and produced `NaN`, fifteen times across the two new pages, including
inside a table of asylum statistics.

`check-build.mjs` did not catch it. It looks for leftover `{{ }}` in the output, and there
was none: the engine had consumed the braces and left a number-shaped result behind. Looking
for unrendered syntax is not enough; the failed *result* has to be looked for too. The check
now fails on `NaN`, `undefined` or `[object Object]` appearing in visible text.

Nunjucks pages now cite through a `{% figure "theme/id" %}` shortcode, which calls exactly
the same renderer as the markdown path.

### Fixed, chart lines rendered as filled areas

`.series-0 { fill: ... }` overrode `.series { fill: none }`, same specificity, later rule
wins, so every line chart drew as a solid filled shape. Selectors are now element-qualified,
because a path, its markers and its label each need different fill behaviour.

### Added, what the asylum system costs

The MVP costs section from section 7, covering audited spending only. It opens by separating
the two questions that both get called "the cost of immigration": what the system spends,
which is audited and reasonably firm, and what migration is worth fiscally, which is
contested and deferred to a later phase.

**The spending figures are nested, not parallel**, and the page says so before showing them.
Hotel spending sits inside accommodation spending, which sits inside the total. A bar chart
would have implied three comparable items and double-counted; the table indents them instead,
so the relationship is visible before the prose explains it.

The one chart is the £158-a-night hotel place against roughly £20 for dispersal
accommodation, because that gap is what makes accommodation type rather than the number of
people the main driver of the bill. Its note states plainly that this is the price of a bed
under a contract, not a measure of what a person costs or is worth.

**On "£8 million a day".** The page works the arithmetic rather than repeating or dismissing
the claim: hotel spending of £2.1bn is roughly £5.8m a day, the previous year's £3bn was
roughly £8.2m, and the whole system at £4.9bn is closer to £13m. So the circulating figure
was approximately right for hotels in 2023-24 and is now roughly 40% above the current one.
Three defensible numbers describing different things.

The page also states what it deliberately excludes and why: immigration fee income, which is
immigration-wide rather than asylum and would compare two different populations; any cost per
person presented as a measure of worth; and the fiscal impact question.

**No claim check was added for the hotels figure**, though it is on the section 8.5.3 list.
Adding it would have made the published set five restrictionist to two pro-migration, 71%,
over the two-thirds limit, and the only unused pro-migration claim substantially duplicates
one already written. The balance rule is meant to constrain editorial decisions rather than
be worked around, so the claim waits for a genuine counterpart.

### Fixed, six false statements found by a full-project audit

All verified by recomputation before and after.

- `asylum.njk` said "two are on the cases basis and three on the people basis" of a table
  with **one** cases figure and **four** people figures, wrong about the site's own most
  important caveat.
- The flows chart summary said emigration "rose steadily from 2021"; it **fell** from
  680,000 to 642,000 in the final year. The line sloped down while the caption said up, and
  the same text sits in the SVG `desc`, so screen-reader users were told the opposite.
- The citizenship card said "Down 13%"; the figure is 12.1%, and the metric's own notes say
  12%. Card text left behind when the figure moved to year ending March 2026.
- The backlog chart said "fallen by roughly half"; it is 60% on people and 63% on cases.
- The asylum claims chart said "broadly flat through the 2010s"; claims **doubled**, from
  22,644 to 45,537.
- A claim check joined a **main-applicant** rate to a **people** count as "the remainder", the exact error the site exists to correct. Now states both bases explicitly.

Also: one figure recorded a `retrieved_date` six days before its `published_date`.

### Fixed, two rendering defects

- **Series labels were clipped.** "People claiming asylum" rendered as "People claiming a":
  right padding was fixed at 118px while the label needed 148. It is now derived from the
  longest label.
- **Every chart rendered at two-thirds width.** `figure.chart` was missing from the
  measure-exemption list. That this was unintended is proved by the CSS itself, the chart's
  own children carry measure caps that are redundant if the figure is already capped.

### Changed, the checking apparatus, after an adversarial audit

The audit's finding was systemic, not incidental: **every checker verified a property of the
source or the declaration, labels agree, tokens close, text nodes are clean, rather than
the property readers depend on, and every green message claimed the latter.**

- **`DO NOT PUBLISH` now fails the build.** It printed a banner and exited 0, so a file
  flagged unfit for publication deployed and the warning scrolled past in a build log. The
  one mechanism built for "well-formed but unfit" was advisory in every automated path.
- **The content contract now covers `.njk`.** Five reader-facing pages, carrying most of
  the site's figures, were checked by nothing. Coverage went from 1 page to 7.
- **`published_date` is now required on timeseries points.** The single-vintage rule keyed on
  a field it did not require, so removing the dates made vintage-mixing undetectable while
  the run still printed "dated".
- **Unclosed tokens are caught.** Every regex required the closing pair, so `{{ref` shipped
  as visible junk with all checks green.
- **`NaN` in attributes is caught.** The detector stripped tags before searching, so a chart
  with broken coordinates rendered blank while every text node stayed clean.
- **Same-page fragments are checked**, and a chart series with no path data fails.
- **The robots guard now requires the rule under `User-agent: *`.** A `Disallow` under one
  named bot satisfied it while everything else was allowed.
- **`check-sources` runs in CI**, it previously ran in no pipeline at all, and now covers
  all four timeseries and every chart source URL. It immediately caught a NAO URL invented
  for the costs page rather than taken from the data layer.
- **CI runs weekly on a schedule.** Time-based rules, the twelve-month claim expiry, link
  rot, could only fire when someone happened to push.
- **Every success message was rewritten to claim only what it verifies.** "All sourced,
  dated, graded and singly held" was false on three counts.

### Changed, the balance rule is replaced by a representation floor

The two-thirds cap counted card labels rather than corrective content, and the audit found
it blocking the right thing. A claim's direction records *whose claim* is corrected, and
correcting a restrictionist claim **serves** pro-migration readers. So a cap on
restrictionist-labelled claims capped how much the site could serve that side.

Concretely, it blocked adding "immigrants are a drain on the public finances", the
correction a pro-migration reader would most want to see. A rule that prevents a correction
is measuring the wrong thing.

Replaced with a floor: at least two claims correcting each direction, no ceiling. The real
split (now 5:2) is disclosed on the claims page with the reason, rather than a ratio implied
to prove balance.

### Added, trust mechanisms that were promised and absent

- **An error-reporting route on every page.** The corrections policy asked readers to report
  errors and gave them nowhere to do it. The footer now links to issues and the changelog.
- **A visible pre-launch notice.** The admission that three commitments are unmet lived only
  in `robots.txt`, addressed to crawlers, invisible to the humans who can read the site.
- **The style guide** (`/style-guide/`), referenced live from the glossary and previously
  non-existent. It separates the wording rules that are statistical precision from those
  that are value judgements, and owns the second kind as choices.
- **Period and source inside the claim card**, so a screenshot carries them, per section 8.5.4.
- `last_reviewed` on the two pages that lacked it; "non-EU+" defined at first use; a
  repository filename removed from reader-facing prose; a causal claim in a chart note
  attributed to ONS rather than asserted; the glossary's superseded dataset title corrected.

### Fixed, the foundation document had drifted from the site

A full read of `docs/foundation.md` against the built site, the records in `data/` and what
the four scripts assert. Around twenty places where the document promised, described or
assumed something the site does not do. The pattern was the one this project keeps hitting:
something verified the source or the declaration rather than the property a reader depends
on, and the text claimed the latter.

- **Three rows of the risk register named things that did not exist.** Silent staleness, the
  top-rated risk, claimed the site displayed its own lateness and that the validator aged
  figures against their source's update frequency. Neither existed. Quote-mining promised a
  share image. Abandonment promised a notice a static site cannot publish. A mitigation
  naming something unbuilt is worse than an empty cell, because the empty cell does not tell
  you the risk is handled.
- **The withdrawn two-thirds balance rule survived in five places**, including an acceptance
  criterion the published set now fails at five to two. Replaced with the representation
  floor that is actually enforced.
- **Four different counts of the data layer, none right**: 66, 73, eighty, and 33 outstanding
  publication dates. It is 67 metrics plus 100 series points, with one publication date
  outstanding and documented as unrecoverable.
- Section 14 still listed the glossary, the claims, the methodology page and the about page
  as outstanding or blocked. All four had shipped. Section 11 still offered a choice of
  framework and three charting libraries, and expected a `src/` that will never exist.
  Sections 6 and 19 were missing five publishers the site cites.
- The claim table used a "Both" direction the validator cannot accept, and omitted a seventh
  published claim.

### Added, figures are aged against their source's publication cycle

`scripts/validate-data.mjs` now reports any figure not re-checked within its own source's
cycle, which the risk register had claimed for some time that it did. `updateFrequency` was
being read as a required field and compared against nothing.

Building it needed a link from a figure to its catalogue entry, which the contract did not
have. A hostname cannot supply one: `www.gov.uk` serves the Home Office, the Migration
Advisory Committee and the tribunals statistics, and several figures cite an
`assets.publishing.service.gov.uk` hash that names no publisher at all. **`source_id` is
therefore a new required field on all 67 theme metrics**, derived from `source_name` and
asserted to resolve against `sources.json`.

The check reports rather than failing. A source publishing a new edition does not make our
figure wrong, it makes it worth re-checking, and a build that broke on a Tuesday because a
quarterly release landed would be switched off inside a month. It prints on every run
including when it finds nothing, and names the 23 figures it cannot age because their sources
publish irregularly, plus the timeseries points, which carry no `retrieved_date`.

### Changed, the MVP cap counts source releases rather than figures

The cap was 15 to 20 published figures and 36 records reach a reader, so it was either
breached or wrong. It was counting the wrong thing. Updating thirteen Home Office figures
from one quarterly release is a single session; publishing four of them instead would save
almost nothing while making the site worse. What predicts staleness is the number of releases
to chase.

The routine cycle is now capped at four releases and currently stands at three, covering 22
of the 36 published figures: Home Office quarterly, ONS twice yearly, and the Ministry of
Justice tribunals statistics quarterly. The other 14 come from sources that publish
irregularly. The figure count follows from the cap and is recorded rather than targeted.

### Fixed, live figures hard-coded in prose inside `data/`

Nine current record values were written longhand in the data files, where `checkLiterals`
never looked: it walked `content/` only. The one file whose entire job is to hold references
and never values was the only file nobody scanned for values.

Seven of the nine were in `meta.json`'s caveats, which render on `/sources-and-method/` about
2,200 characters below the sentence telling a reader that a current value written longhand
anywhere in a page stops the build. Among them the people-versus-cases pair, both backlog
figures, the OBR illustrative scenario and refused entry at port: the figures those caveats
exist to protect, frozen in prose.

All nine now cite tokens, which works because `resolve-citations` runs on the built HTML
after the partials expand. `scripts/validate-content.mjs` now holds every data-file field
that reaches a page to the same rule as a content page, and deliberately skips the fields no
template renders, because a clean scan of prose nobody sees would read as coverage of prose
everybody sees. A data file has no front matter, so a deliberately frozen figure is declared
in a sibling `historical_literals` key. There is one: the last caveat is a worked
reconciliation at a single vintage whose whole point is that the subtraction does not come
out, and citing a live record for any part of it would let one revision leave the arithmetic
around it wrong.

Three sub-100 values were genuine citations and became tokens. Four are coincidences,
reviewed and left as warnings, which is what the warn class is for.

### Changed, the home page

- **Two cards added**, people awaiting a first decision and people in asylum support, taking
  the set to eight. Both are what the asylum argument turns on and both were one click away
  while the home page showed neither. Both are stocks counted on a single day, so both cards
  say so in their first sentence.
- **A "Checked" date on every card.** The card showed when the source published a figure but
  not when this site last verified it, which is the date a reader needs to judge whether the
  site is current. It was only ever in the data files.
- **A figure with no publication date now says so** rather than rendering "Published"
  followed by nothing. The promise was made in foundation section 2.1 and nothing implemented
  it. Unexercised today, because the only record without a publication date is cited on no
  page.

### Removed, the dashboard fields nothing rendered

`lastUpdated`, `referencePeriod`, `caveat`, a `supporting` block of four denominators, and
`display` and `explanation` on every card. All six were required by the validator and
rendered by no template, and one of the denominators reached no reader by any route.
Validated prose that no page shows is prose that rots unwatched. `dashboard.json` is now
`cards`, and a card is an id, a ref, a label and one paragraph.

### Fixed, link text that named nothing

"The claim check" was the text of a link on the migration, asylum and costs pages, each going
to a different check, and the glossary said the same words twice more as plain text with no
link at all. Every page passed the duplicate-name rule, because that rule is scoped to a
single page and these sat one per page. Read across the site, five words pointed at five
destinations. The home page panels had a milder version: "See the figures" and "See why that
matters", beside a third panel whose code comment justified its own wording by claiming the
two siblings already named what you would find. They did not.

Every link to a claim check now says where it goes when read on its own, which is how anyone
listing a page's links reads them. "Whether ..." rather than the bare claim, deliberately:
claim text as link text would read as the site asserting the claim, which is the same reason
`claim.njk` keeps the claim inside a "The claim" label.

`scripts/check-build.mjs` now refuses a small denylist of phrases that describe no
destination, checked against the built HTML so it catches markdown, Nunjucks and the layouts
alike.

### Changed, required front matter on a claim

`period` and `source` join the required fields. `claim.njk` renders both behind a
conditional, so a claim that omitted them lost them from the card with nothing on the page to
show it, while foundation section 8.5.4 requires both inside the card's visual boundary. All
seven claims already carried them; this stops the eighth not to.

### Changed, the about page

"Trading as Legendary Tone" is removed. It carried a commercial implication that sat
awkwardly beside the funding statement two paragraphs below it, which says the site is
unfunded with no advertising, sponsorship or commercial relationship. The named person was
always the load-bearing part and it stays.

### Changed, the update commitment is signed

**One month** from each of the three releases that drive the site, replacing an unsigned
proposal of fourteen days from two of them. The sign-off fence is removed from the sources
page and the pre-launch banner no longer says the commitment is outstanding.

Three changes of substance rather than one. The window moved from fourteen days to one month,
because the most recent full cycle took twenty-seven days and this is one person working
unfunded: a target that is missed damages trust more than a slower one that is met. The
Ministry of Justice tribunals release was added, having been absent from the proposal while
driving the appeals queue, the appeal success rate and a claim check. And the fourteen figures
from irregular publishers are now described as carrying no promised schedule, rather than
being covered by a vague "other sources follow as their material changes", because a schedule
nobody can predict is not a commitment.

The page also now says that an automated check ages every figure against its own source's
cycle before anything is published, and that it runs weekly whether or not anyone is working
on the site. That check was built the same day and is what makes the commitment enforceable
rather than remembered.

### Outstanding

- One figure has no publication date, documented and exempted; see above.
- Five Commons Library URLs cannot be checked automatically: the host returns 403 to every
  request, including deliberately invalid paths, with or without a browser user-agent.
  `scripts/check-sources.mjs` reports them as uncheckable rather than broken, because calling
  a live link dead trains the reader to ignore the checker. Verify them by hand.
- Three source URLs redirect, which usually means a newer release has superseded the figure:
  the Home Office data tables anchor, and two Skills for Care pages.
- Eight of the fifteen claims in foundation section 8.5.3 remain undrafted. The table gained a
  fifteenth row when the seventh published claim was found to be missing from it.
- Ten unit-qualified figures in content and four in `data/` match a live metric value and
  surface as warnings on every build. All were reviewed and are coincidences: several metrics
  share a small value. Review them; do not suppress them.
- The pre-publication human review has not happened. It is the last launch blocker. Its
  evidence is assembled in `docs/PRE-PUBLICATION-REVIEW.md`.
- Three pieces of scoped, unbuilt work, tracked in `docs/BACKLOG.md`: the release notifier and
  evidence check, citing a series point and reconciling the four figures held twice, and the
  eight undrafted claims.

