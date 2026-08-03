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

ONE THING RECITED HERE, because it inverts and getting it backwards does
the most damage available. Work is tagged [me] or [you] from the
SESSION's side, so the tags invert against the pronouns in this message.
Use the mapping, never the pronoun:
  [me] = a factual or mechanical change against a cited source. YOU do it.
  [you] = a call or a task that is the owner's. Propose and stop.
Check it against The order's own header in docs/BACKLOG.md, which says
in one sentence which side takes which. On a list mixing both, do all
the [me] work first and bring me the [you] decisions in one batch,
because the mechanical work usually determines what the editorial
question is.

TASK: take the first item The order says a session takes, unless I have
told you otherwise in this message. Its header defines that in one
sentence; read it rather than assuming, because the word it turns on
has been misread before.

Tell me which item you are taking and what you expect to change before
you start. If it is larger than a session, propose a split. If it is
wholly gated on a decision of mine, do not stall and do not take the
decision: bring it to me and start the next ungated item, saying which.

Everything must pass, and run these rather than assume: npm run validate,
npm run build, npm run a11y and npm run check-evidence. All four every
time. Read what a passing run says it did NOT establish, rather than
taking silence as clearance. check-releases, check-sources and
check-backlog are network checks that gate nothing, so run them by
hand before a PR.

Branch and PR, never straight to main, and the PR body carries the
reasoning. When you finish an item, mark it done in docs/BACKLOG.md with
its PR and a date, and move it to Completed when nothing is left. Do not
delete it.
