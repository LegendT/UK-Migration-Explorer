# Prompt for a fresh session

**Generated from `docs/HANDOFF.md`, section *Prompt for a fresh session*, which is the source of
truth.** This file exists so the prompt can be copied without opening a 700-line document. If the two
disagree, the handoff is right and this file is stale: regenerate it rather than editing it here.

Cut to about fifty lines on 31 July 2026. It deliberately recites almost nothing, because the two
times it and the handoff drifted, the prompt was the stale copy. The handoff's own section explains
which four things it still carries and why each cannot be a pointer.

Generated 31 July 2026.

---

```
Work on UK Migration Explorer at
/Users/anthonygeorge/Projects/Migration Immigration and Asylum

READ FIRST, in this order, and do not re-derive what they already settle:
  1. docs/PRE-LAUNCH-AUDIT.md, its actionable list. While the audit is
     open this is the live list of work.
  2. docs/BACKLOG.md. The durable list, and it names the launch gates
     that are mine. It becomes the live list again when the audit closes.
  3. docs/HANDOFF.md. How the project works, and what earlier sessions
     cost. Its "Working practices that earned their place" section is
     rules this project has paid for, each with the incident behind it.
     Read it before deciding a rule does not apply to what you are doing.
  4. The scope document for whatever you pick up.

If the audit's list and the backlog disagree about what is outstanding,
SAY SO rather than picking one. Two lists exist only while the audit is
open, and this project has twice watched two lists diverge.

This project has no CLAUDE.md. Your global instructions at
~/.claude/CLAUDE.md load automatically.

ONE THING RECITED HERE, because it inverts and getting it backwards does
the most damage available. Work is tagged [me] or [you] from the
SESSION's side, so the tags invert against the pronouns in this message.
Use the mapping, never the pronoun:
  [me] = a factual or mechanical change against a cited source. YOU do it.
  [you] = an editorial or sourcing call. It is MINE. Propose and stop.
Check it the first time you use it: correction 1a in the backlog marks
the owner's decision [you]. On a list mixing both, do all the [me] work
first and bring me the [you] decisions in one batch, because the
mechanical work usually determines what the editorial question is.

TASK: take the first item you are allowed to take, by the routing above,
unless I have told you otherwise in this message. Tell me which one and
what you expect to change before you start. If it is larger than a
session, propose a split. If it turns out to be wholly gated on a
decision of mine, do not stall and do not take the decision: bring it to
me and start on the next ungated item, saying which you moved to.

Everything must pass, and run these rather than assume: npm run validate,
npm run build, npm run a11y, and npm run check-evidence if a figure
changed. check-releases and check-sources are network checks that gate
nothing, so run them by hand before opening a pull request.

Branch and PR, never straight to main, and the PR body carries the
reasoning. When you finish an item, mark it done where it is listed with
its PR and a date, and move it to Completed when nothing is left. Do not
delete it.
```
