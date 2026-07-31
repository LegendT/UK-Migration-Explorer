# Prompt for a fresh session

**This file is generated from `docs/HANDOFF.md`, section *Prompt for a fresh session*, which is the
source of truth for it.** It exists so the prompt can be copied without opening a 700-line document.
If the two disagree, the handoff is right and this file is stale: regenerate it rather than editing
it here. The handoff's own table records which rules are copied into the prompt and which are kept
only there, because the two have drifted twice and the prompt was the stale copy both times.

Generated 31 July 2026.

---

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

Read docs/BACKLOG.md first. It is the durable list of outstanding work.
Then read docs/HANDOFF.md for how the project works and what earlier
sessions cost. Then read the scope document for whatever you pick up,
and do not re-derive it.

This project has no CLAUDE.md of its own. Your global instructions at
~/.claude/CLAUDE.md load automatically.

The pre-publication review is done and its corrections landed.
verification.txt at the repo root is the review itself; it covers
Sections 1 to 7 and Parts 2.1 to 2.7, which is ten pages and not
sixteen, and that distinction settled the last_reviewed question. It
has since done more than that: a whole-project audit on 30 and 31 July
found its two worst defects on a page the review never opened, so treat
the six unreviewed pages as unreviewed rather than as fine.

That audit is open as PR #70 and written up in docs/PRE-LAUNCH-AUDIT.md.
It applied the mechanical half and left every editorial and sourcing
call. Read its actionable list before starting anything: each row says
whether a session can take it or whether it is mine. Do not re-derive
its findings, and do not trust its prose over a run.

Work is tagged [me] or [you], and the tags were written from the
SESSION's side, so they invert against the pronouns in this prompt. Use
the mapping, never the pronoun: [me] means a factual or mechanical change
against a cited source, which YOU do. [you] means an editorial or
sourcing call, which is MINE. Check it against the backlog the first time
you use it: correction 1a marks the owner's decision [you]. Getting this
backwards hands the editorial calls to you, which is the worst outcome
available here. Do the [me] parts; for a [you] part, propose and ask. On
a list that mixes both, do all the [me] work first and bring me the [you]
decisions in one batch, because the mechanical work usually determines
what the editorial question even is.

Still mine, not yours: recording the review as passed in CHANGELOG.md,
which is what is left of item 1; removing the robots rule, which comes
last and is launch; talking to five target users, which is the one open
acceptance criterion; and the audit's three launch gates, which the
backlog names at the top. Two are glossary rewrites and one re-sources a
record in a way that adds a publisher to sources.json. Do not treat any
of those as done, and do not write the glossary wording for me: propose
it and stop. The
backlog also carries editorial decisions waiting on me. Where an item is
gated on a decision of mine, that decision is written under the item, so
read it before assuming the item is yours to start.

TASK: unless I have told you otherwise in this message, work from the
actionable list in docs/PRE-LAUNCH-AUDIT.md. It is the live list while
the audit is open, its rows say Session or Owner, and the Session rows
are ordered by what launch needs. Take Session rows; bring me Owner rows
rather than starting them.

When the audit closes, that list empties into docs/BACKLOG.md and the
backlog becomes the live one again. Its rule then: take the first
UNFINISHED item, not the first unstarted one, since an item can have
phases built and still be first. Do not infer it from document order,
because the earlier items are mine or are launch; the backlog's own
preamble under "Scoped, not built" names which to take, and that sentence
is the instruction.

Read both preambles before deciding either way. Two lists exist only
while the audit is open, and this project has twice watched two lists
diverge, so if they disagree about what is outstanding, say so rather
than picking one.

Before you start, tell me which item you are taking and what you expect
to change. If it is larger than a session, say so and propose a split.
If the first unfinished item turns out to be wholly gated on decisions of
mine, do not stall and do not take them: bring me the decisions, and
start the [me] work on the next item that is not gated, saying which you
have moved to.

When you finish an item, mark it done in docs/BACKLOG.md with its PR and
a date, and move it to Completed when nothing is left of it. Do not
delete it. validate-content.mjs fails the build if a planning document
in docs/, or any subdirectory of it, is not referenced from the backlog,
or if the handoff stops pointing at it, so the list cannot quietly lose
things.

Rules this project has paid for. Each earned its place by failing first,
and the incident behind each one is in docs/HANDOFF.md under the heading
named beside it. Read those before you decide a rule does not apply to
what you are doing; the prompt states rules, the handoff is why.

- Every changed or new figure needs a fetched source and a verbatim quote
  BEFORE it is written. The quote goes in data/evidence/ and CI fails
  without it; the shape is in data/evidence/README.md. Go to the
  publisher's data tables, not its HTML bulletin. .ods and .xlsx are zip
  archives, so download and parse them rather than giving up when a fetch
  cannot read them. The Commons Library returns 403; go to the Home
  Office tables it cites. (Verifying a figure)
- Reconcile a new figure against a total the site already publishes, not
  only against its own source. Finding the number is not recognising it.
  (Verifying a figure)
- Confirming the figure you asked about is not the whole job. Do not
  merge over what a check reveals beside its target. (Verifying a figure)
- Check what this project has already published, or already enforces,
  before acting on outside advice or offering me an option. (Working with
  this project's own documents and rules)
- A source NAMING a figure is not the source CONTAINING it. Every check
  here verifies the first. Reading five publications during the July 2026
  audit found a headline figure whose cited report does not contain it, a
  phrase attributed to a publisher that it does not use, and a note
  reproducing wording a publisher had formally retracted. When you touch a
  record, open its source and find the number in it. (Where things stand)
- After changing a number or a label anywhere, GREP FOR IT before
  committing. Every such change during the audit landed correctly and left
  exactly one remote reference stale: a downgraded finding still called a
  blocker elsewhere, two line numbers that moved with only one table
  following, a page count corrected everywhere but the CI step name.
  (Auditing, and auditing your own audit)
- A count about your own work rots as fast as one about the data, and the
  fix is deleting it rather than correcting it again. (Auditing, and
  auditing your own audit)
- Publish the command you ran. A fix replacing typed counts with a
  derivation shipped one that printed nothing while the document claimed
  its output; the version run and the version published differed. Copy it
  out of your terminal. (Auditing, and auditing your own audit)
- A defect reported on one page usually has siblings. Grep the reasoning,
  not just the sentence, and grep the claim rather than the page.
  (Changing something without breaking something else)
- Anything you add must pass, and run these rather than assume:
  npm run validate, npm run build, npm run a11y, and npm run
  check-evidence if a figure changed. If you add a record, LOWER
  UNRECORDED_BASELINE in validate-content.mjs to the new count; a gap
  between the count and the baseline is that many new unrecorded figures
  that could arrive without failing anything. Raising it is a decision and
  is only ever right when a SCAN widened rather than the site: say which in
  the commit, and prove no page changed by diffing the built site.
- check-releases and check-sources are network checks that gate nothing,
  so run them by hand before opening a pull request: a record citing a
  superseded edition passes every other check green.
- Citation syntax differs by file type. Markdown uses {{theme/metric-id}};
  Nunjucks uses {% figure "theme/metric-id" %}, because {{ }} is Nunjucks'
  own expression syntax and would be evaluated as arithmetic, silently
  shipping NaN. A series point can only be cited inside a chart summary,
  with the at() filter, so a Markdown page needing one needs a metric
  declaring series_ref instead. (How the project works)
- Negative-test every new check, in BOTH directions, and confirm the
  break applied by grepping for the broken text and printing the count
  before believing the result. Then confirm the CONDITION fired, not only
  that the edit landed: a probe that leaves a second path to the same
  answer tests the second path. Negative-test the MECHANISM and the REMEDY
  too, not only the check: do what the failure message tells an author to
  do, and watch it work. Where a check matches a declaration against a
  record, ask three things of the key, on BOTH sides: what it does when
  it does not change, when it is absent, and when it is present but not
  the shape you assumed. Every answer has to leave the check still asking
  for something. (Building a check, and trusting it)
- A suppression needs a test of its own, and it is where to look first.
  Any line that decides NOT to report, a continue, an exemption, a
  de-duplication guard, can silence far more than it was written for, and
  a control that calls the matcher does not call the thing reading the
  matcher's output. Test what decides, not only what parses. (Building a
  check, and trusting it)
- If you match something the site renders, match what the RENDERER
  accepts, and strip comments first. A pattern stricter than the renderer
  disagrees with it in silence, and a citation inside a comment is
  rendered into that comment, so two scans blind to different text can
  confirm each other about a figure no reader sees. Compare two sets both
  ways: one direction finds only one kind of error. (Building a check, and
  trusting it)
- Have a second model read anything whose whole purpose is refusing bad
  input, before you believe your own critique of it. It has found the
  most serious defect in every piece of work it has read here, every time
  in the part the author was surest of. Budget for it rather than
  treating it as a last look. (Building a check, and trusting it)
- State what a check does NOT establish in its own success message.
  Eight times a checker here passed while a real defect shipped, every
  time because it verified the source or the declaration rather than the
  property a reader depends on. (The checking apparatus, and its limits)
- Read the built output, not the build. Several defects here were
  invisible to every green check and visible on the page. (Looking at the
  built page)
- If a change should not alter the output, prove it by diff. Copy _site
  to a scratch directory before, diff -r after. It is a stronger claim
  than reading the change, and it localises the changes you did mean.
  (Looking at the built page)
- Never truncate the thing you are checking for absence, and prefer the
  query that could show you are wrong over the one that confirms you.
  When your count disagrees with something the project independently
  says about the same thing, the disagreement is the check. (Building a
  check, and trusting it)
- No em-dashes, ever. Enforced by validate-content.mjs.
- Do not fix by bulk substitution. Sentence by sentence, in view.
- Scoping is not progress. Build the smallest real thing. (Deciding what
  to build)

Branch FIRST, before editing anything; this project works through PRs
even solo. Check main has not moved before you rewrite the handoff or the
backlog. Do not delete a branch: main's history is truncated at a
parentless commit and everything before PR #42 survives only on
history-to-pr-41 and design-and-a11y-rounds. The handoff says which and
why.

Stop and ask about anything that needs an editorial judgement rather
than a correction.
```
