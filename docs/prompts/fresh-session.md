Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

READ FIRST, in this order, and do not re-derive what they already settle:
  1. docs/BACKLOG.md, starting with The order at its top: the single
     numbered list of everything outstanding, gates marked and work
     tagged [me] or [you]. There is no second list.
  2. docs/HANDOFF.md. How the project works, and what earlier sessions
     cost. Its "Working practices that earned their place" section is
     rules this project has paid for, each with the incident behind it.
     Read it before deciding a rule does not apply to what you are doing.
  3. The scope document for whatever you pick up.

docs/PRE-LAUNCH-AUDIT.md, docs/LAUNCH-READINESS-REVIEW.md and
verification.txt are FROZEN RECORDS, not work lists. Read them for the
reasoning behind an item. Do not edit them and do not take work from
them: whatever is still outstanding is in the backlog.

Your global instructions at ~/.claude/CLAUDE.md load automatically.

ONE THING IS EXPLAINED HERE RATHER THAN POINTED AT, because it inverts
and getting it backwards does the most damage available. Everything else
below is an imperative with a date; docs/HANDOFF.md holds the incident.
Work is tagged [me] or [you] from the
SESSION's side, so the tags invert against the pronouns in this message.
Use the mapping, never the pronoun:
  [me] = a factual or mechanical change against a cited source. YOU do it.
  [you] = a call or a task that is the owner's. Propose and stop.
Check it against The order's own header in docs/BACKLOG.md, which says
in one sentence which side takes which. On a list mixing both, do all
the [me] work first and batch the [you] items for the owner,
because the mechanical work usually determines what the editorial
question is.

TASK: take the first item The order says a session takes, unless I have
told you otherwise in this message. Its header defines that in one
sentence; read it rather than assuming, because the word it turns on
has been misread before. Read every subsection an item's header names
before deciding that item is finished, against the BUILT SITE rather than
against its pull request: one closed on a sentence covering a third of its
own scope on 5 August 2026, and on 11 August item 16 would have closed with
two of its entries never shipped, because its PR had merged. A merged PR
says some of the item is done, not all of it. Closing early is worse than
leaving it open: a closed item is never read again. Reproduce the item's
premise before building what
it prescribes: a recommendation is a claim about what can be built, and one
taken on trust cost a reversal on 4 August 2026.

Tell me which item you are taking and what you expect to change before
you start. If it is larger than a session, propose a split. If it is
wholly gated on a decision of mine, do not stall and do not take the
decision: bring it to me and start the next item that is not waiting
on me, saying which.

Everything must pass, and run these rather than assume. All four, every
time:
  npm run validate
  npm run build
  npm run a11y
  npm run check-evidence
 Read what a passing run says it did NOT establish, rather than
taking silence as clearance. Before writing that anything is absent, name
every store that could hold it and sweep each: narrowing a claim until it
is true is not establishing it, and one such "fix" was refused on 10 August
2026 and then overturned by actually looking. Read a field in full before
making a claim about it; notes surveyed at [:700] produced a false statement
about this repository. Read the COUNT in a pass line against
what the build printed: a11y took its URLs from a hand-written list and
reported 17 of 17 with a new page missing from it. If a11y cannot launch
a browser,
that is usually a broken Chrome in ~/.cache/puppeteer rather than the
environment: a stub is a few hundred KB where a real one is ~300MB. Fix it
before recording accessibility as unverified; docs/HANDOFF.md has the
steps. check-releases,
check-sources and the ONLINE half of check-backlog are network checks
that gate nothing, so run them by hand before a PR. Which of them CI
runs, and which are report-only
there, is in .github/workflows/validate-data.yml and changes without this
file knowing: read the workflow rather than this sentence, and read a
step's log rather than the job's green tick.

Branch and PR, never straight to main, and the PR body carries the
reasoning. Cut the branch from main before your first EDIT of each item,
not when you are ready to commit: on 5 August 2026 a session running three
items committed two of them onto the previous item's branch, and the check
below cannot see that, because those commits are on a branch. When you
finish an item, mark it done in docs/BACKLOG.md with its PR and a date,
and move it to Completed when nothing is left. Do not delete it.
NEVER write that work is unmerged in a document the merge will publish.
"Built in the pull request that carries this line and not yet merged" is
false the moment anyone reads it on main, and it was written four times in
six days; once it left the last launch gate reading as open while its work
was already there. Name the branch, or say nothing.

Before you finish, run BOTH of these. They answer different questions and
the pass state is different for each:
  git log --oneline origin/$(git branch --show-current)..HEAD
    Silence means everything you committed is pushed. Anything printed is
    unpushed and will be lost with the working copy.
  git log --oneline origin/main..HEAD
    On an open branch this prints your own commits, and that is correct.
    It matters AFTER your pull request has merged: anything printed then
    is stranded on a dead branch, and git status, git log and the branch
    name all read clean.
