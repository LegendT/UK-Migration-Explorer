Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

THE SITE IS LIVE, at https://ukmigrationexplorer.org, since 11 August 2026.
Netlify deploys `main`, so a merge reaches readers and crawlers within minutes
and there is no staging step between the two. Check what is serving rather than
trusting this line. Two things follow. Anything you merge is published, so the
pull request is the last point at which a person sees it. And DO NOT MERGE
anything that changes what the site publishes without the owner saying so in
the conversation you are in: on 11 August 2026 an assistant read a statement of
plan as authorisation and merged the launch, four days before the owner had
said to, and the backlog then recorded a decision he had never made. A plan he
described, a goal you were given, and a stop condition demanding it are none of
them his word.

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
The tag names WHO ACTS, which is how The order's own header puts it. Use
that, never the pronoun and never the kind of work:
  [me] = the session acts. YOU do it.
  [you] = the owner acts. Propose and stop.
Usually [me] is a mechanical change against a cited source and [you] is a
judgement, but that is a description, not the test. When a [me] item turns
out to need a judgement, the tag still says you act on everything around
it: bring the judgement, do not take it, and do not retag the item.
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
against its pull request. A merged PR says some of the item is done, not
all of it. Closing early is worse than leaving it open, because a closed
item is never read again. (5 and 11 August 2026.) Reproduce the item's
premise before building what
it prescribes: a recommendation is a claim about what can be built, and one
taken on trust cost a reversal on 4 August 2026.

Say which item you are taking and what you expect to change, then start.
That is an announcement, not a request: do not wait for my reply. If it is
larger than a session, propose a split and start the first part. If it is
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
every store that could hold it and sweep each. Narrowing a claim until it
is true is not establishing it. Read a field in full before making a claim
about it: a survey printed at [:700] hid the evidence that made the claim
false. (10 August 2026.) Read the COUNT in a pass line against
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

If your item MOVES A PUBLISHED FIGURE, the record is half of it. Lift the
evidence quote from the source by script rather than typing it:
check-evidence does not fire on a figure that did not move, so a quote
written by hand is validated by nothing at the moment it is written. Then
grep the value across prose, chart summaries, other records' notes and
every page that cites it, because a citation protects the number and never
the sentence around it.

Branch and PR, never straight to main, and the PR body carries the
reasoning. NAME THE PATHS YOU COMMIT: `git add -A` while resolving a merge
swept two files the owner had left untracked before the session onto the
launch branch, where merging would have published them. Every other commit
that day named its paths, and the one that did not is the one that committed
someone else's work. No check can see this, because validate, the build and
CI all reason about files they already know about; `git status --short` at
the start tells you which strays exist, and the same list must still be
untracked at the end. (11 August 2026.)
Cut the branch from main before your first EDIT of each item,
not when you are ready to commit: on 5 August 2026 a session running three
items committed two of them onto the previous item's branch, and the check
below cannot see that, because those commits are on a branch. When you
finish an item, mark it done in docs/BACKLOG.md with its PR and a date,
and move it to Completed when nothing is left. Do not delete it.
NEVER write that work is unmerged in a document the merge will publish.
"Built in the pull request that carries this line and not yet merged" is
false the moment anyone reads it on main. Name the branch, or say nothing.
(Written four times in six days, to 11 August 2026.)

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
