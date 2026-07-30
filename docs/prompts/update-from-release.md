# Prompt: update from a release

Phase 3 of `docs/UPDATE-AUTOMATION.md`. Built 30 July 2026, after the runbook it depends on.

**This prompt is not part of the checking apparatus, and nothing here checks anything.** What
makes it safe is that three checks already refuse its worst outputs: `check-evidence.mjs` refuses
a value that appears in no quote, `check-releases.mjs` refuses to call a record current while it
cites a superseded edition, and `validate-content.mjs` refuses a record value written longhand in
prose. It is versioned because a procedure worth following is worth diffing, not because it
verifies anything.

**Where it runs: on a person's machine, with an assistant.** Not in CI. Opening a pull request
from CI needs `contents: write`, which is a far larger grant than the `issues: write` the
notifier uses, and it would move the human gate rather than keep it. An assistant that drafts a
pull request is not an automated pipeline putting numbers on the site. Everything below depends
on never blurring those two.

## Input

From the release notifier's issue, which is the whole of `release-check.txt`:

- the `source_id`, the line reading `<source_id>: BEHIND`
- the **newest published edition** slug, from `newest published edition:`
- the refs listed under each `cites ... BEHIND` line, which are the figures in scope
- the release URL

A `CORRECTED SINCE LAST READ` issue is a different and smaller job. It goes through the same
prompt, but the scope is the one table named in the entry and the figures listed under it.

## The prompt

Fill the four placeholders and paste. Do not paste it with a placeholder still in it: a run
against `<source_id>` will confidently update nothing and report success.

```
Update UK Migration Explorer onto a new release, by hand, with me reviewing.

Source id:        <source_id>
Release URL:      <release-url>
Newest edition:   <edition-slug>
Figures in scope: <refs from the issue, or "list them yourself and show me first">

Follow docs/UPDATING-DATA.md, under "The procedure", step by step. That document is
the procedure; do not work from memory and do not substitute your own order. Where
anything you believe disagrees with it, it is right and you are wrong.

Before you change a single value, show me:
  - the figures you found in scope, and how that list was derived
  - whether any of them declares a series_ref, or whether the release moves a
    series file
  - the quote you intend to write for each figure, with the URL you fetched it from

Then stop and wait for me.

Refuse rather than guess:
  - A figure you cannot find in the release comes back UNVERIFIED and its record is
    left exactly as it is. Do not reason a value out from neighbouring ones.
  - If the release has changed shape, a renamed or discontinued table, a changed
    basis, a period the record's period_label cannot express, stop and tell me. That
    is an editorial decision and it is mine.
  - If a series file or a series_ref metric is in scope, stop. See "What this
    refuses" below.

Never:
  - write a value you have not quoted from a source you fetched
  - touch a figure whose source_id is not the one above, with the one exception the
    runbook names at step 1
  - edit page prose, with the one exception the runbook names at step 9
  - merge anything

When you are done, open a DRAFT pull request with the evidence table in the body
beside the diff, so my review is a comparison and not a reading. Say in the body why
period_label or date moved, for every record where they did.
```

## What this refuses, and why that is the whole design

**Series work.** Decided 30 July 2026. If a series file is in scope, or any of the four metrics
declaring a `series_ref` is, the run stops and hands the job to a person.

The refusal names where to go and **does not restate the steps**:

> A series file is in scope, so I am stopping. The procedure for it is
> `docs/UPDATING-DATA.md`, under "7. Series, if the release moves one". I have not changed
> anything.

That wording is deliberate. A procedure printed in two places is the duplication this project has
been burned by twice, and the copy a session happens to read wins. If the refusal grew a helpful
summary of what to do, that summary would be the second copy.

**What it costs, stated rather than hidden.** The four `series_ref` metrics are all `ons-ltim`,
so this prompt cannot do an ONS update at all, and ONS is one of the three cadenced releases.
Refusing a third of the work is defensible. Omitting it silently is not, which is why the refusal
is loud and why this paragraph exists.

## Reviewing what it produces

The danger here is **automation bias, not fabrication**. Phase 2 handles fabrication
mechanically: a value that appears in no quote fails the build. The real failure mode is a tidy
evidence table inviting you to skim, and a reviewer reading less carefully because the work looks
finished.

Two mitigations, and the first is why the pull request is laid out the way it is:

- **Keep the quote and the diff side by side**, so review is comparison rather than reading.
- **Do not tighten the update commitment because drafting got faster.** Review is the bottleneck
  worth protecting. One month per cadenced release was signed on 23 July 2026 against a by-hand
  process, and the reason to keep it is that the by-hand process is still what verifies the work.

Read for the things no check covers:

| Look at | Because |
| --- | --- |
| Every `notes` field it rewrote | Notes are the site's own prose and no check reads them |
| `dashboard.json` and `meta.json` prose | It renders to the home page and carries longhand figures |
| Any `period_label` or `date` that moved | Those two are what the period-consistency check reads |
| The pages listed as citing a changed figure | A citation protects a value, never the sentence around it |
| The unrecorded-longhand list in `npm run validate` | A release is exactly when those figures go wrong |

## First run

**Not yet exercised against a real release.** Its parts rest on the runbook, which was written
against PR #45, the one by-hand update this project has done. The first real run should be
against a release that was going to be checked by hand anyway, and whoever does it should record
what the prompt got wrong here rather than in a commit message.
