#!/usr/bin/env node
// The backlog check. Everything else in this repository is machine-checked; the file that
// directs all the work was maintained by hand, and it is the one that kept rotting.
//
// On 3 August 2026 an ad-hoc audit of docs/BACKLOG.md found two live defects in under a minute:
// The order said "the 27 unpublished reserve records" when there are 28 reserve records and 27
// of them lack an evidence entry, two different numbers collapsed into the sentence that tells
// the next session what its job is; and one numbered item carried no [me]/[you] tag at all,
// which is the mapping the prompt calls the highest-damage thing to get wrong. Both were
// invisible to every check in the project because no check read this file.
//
// WHAT THIS DOES NOT DO, and the list matters more than what it does:
//   - It does not know whether an item is genuinely finished. "DONE" is a claim by a person.
//   - It does not read the detail sections for stale counts. Those legitimately carry dated
//     historical measurements, and a rule that flagged them would be noise nobody reads. The
//     count rule below is scoped to The order, which is the live instruction list.
//   - It does not check PR state without --online, because npm run validate must work offline
//     and this project's convention is that network checks gate nothing.
//
// Run: node scripts/check-backlog.mjs [--online]

import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const file = 'docs/BACKLOG.md';
const raw = readFileSync(`${repoRoot}${file}`, 'utf8');
const online = process.argv.includes('--online');
const errors = [];

// The order is everything from its heading to the launch-gates heading. Scoping the count rule
// to it is deliberate: it is the live list a session acts on, and the sections below it are
// reasoning and history where a dated number is the point rather than a hazard.
const orderStart = raw.indexOf('## The order');
const orderEnd = raw.indexOf('### The launch gates');
if (orderStart < 0 || orderEnd < 0) {
  console.error(`${file}: cannot find "## The order" and "### The launch gates". This check reads`);
  console.error('the file by those two headings, so renaming one silently disables most of it.');
  process.exit(1);
}
const order = raw.slice(orderStart, orderEnd);

// --- every path it names must exist ------------------------------------------------------
// A backlog naming a file that is gone sends a session looking for it, and the entry that
// names it is usually the one describing what to do next.
const paths = [...new Set([...raw.matchAll(/`((?:docs|data|scripts|content|lib|\.github)\/[A-Za-z0-9._/-]+)`/g)]
  .map((m) => m[1]))];
for (const path of paths) {
  if (!existsSync(`${repoRoot}${path}`)) errors.push(`${file}: names \`${path}\`, which does not exist.`);
}

// --- every section it cross-references must have a heading --------------------------------
// Entries point at each other constantly ("the rest of A6", "both are under R2"). A pointer at
// a section that was renamed or absorbed reads as a live instruction and leads nowhere.
const headings = new Set([...raw.matchAll(/^### ([ARU]\d+)\./gm)].map((m) => m[1]));
const referenced = [...new Set([...raw.matchAll(/(?:^|[\s(])([ARU]\d+)\b/gm)].map((m) => m[1]))];
for (const ref of referenced) {
  if (!headings.has(ref)) errors.push(`${file}: refers to section ${ref}, which has no "### ${ref}." heading.`);
}

// --- The order: numbering, tags, and no bare count of our own state -----------------------
const items = [...order.matchAll(/^(\d+)\. ([\s\S]*?)(?=^\d+\. |\nIf you reorder)/gm)]
  .map((m) => ({ n: Number(m[1]), body: m[2] }));
if (items.length === 0) errors.push(`${file}: The order has no numbered items, which cannot be right.`);
items.forEach((item, i) => {
  if (item.n !== i + 1) {
    errors.push(`${file}: The order is numbered ${item.n} at position ${i + 1}. Its own header says to renumber when something moves, so a gap means an entry was removed in place.`);
  }
  // An item carries a tag, or says it is closed. Both are self-maintaining: an exemption list
  // naming item numbers would go stale the first time the list is reordered, which is the
  // defect this file already records as having been set once.
  if (!/\[me\]|\[you\]/.test(item.body) && !/\bclosed\b|\bDONE\b/i.test(item.body)) {
    errors.push(`${file}: The order item ${item.n} carries no [me] or [you] tag and is not marked closed. That mapping is what the fresh-session prompt calls the highest-damage thing to get wrong, and an untagged item leaves a session to guess.`);
  }
});

// A count of this project's own state, written into the live list, is the defect this file
// spends whole paragraphs telling itself not to commit. Elsewhere it says so outright: a
// number in prose beside a run that computes it. Bounded to three digits and to nouns naming
// things this repository counts, so a year, a PR number and a table identifier do not match.
// Two bugs, both found by testing this expression against the defect it was written for rather
// than by reading it. The lookbehind excluded a preceding digit and not a preceding letter, so
// "U5 records what was considered" matched with `records` as a verb. And it required the noun to
// sit immediately after the number, while the defect read "the 27 unpublished reserve records":
// two words in between, so the check would have passed the sentence it exists to catch.
const OWN_STATE = /(?<![\w.,\-/#])(\d{1,3})((?:\s+[a-z]+){0,2}\s+(?:records?|figures?|entries|reserve|sources|publishers|points))\b/g;
for (const item of items) {
  for (const [, count, noun] of item.body.matchAll(OWN_STATE)) {
    errors.push(`${file}: The order item ${item.n} writes "${count}${noun}". The order is the live list, and a count of our own state belongs in what a run prints, not in prose beside it. Point at the command instead, or move the sentence into a dated measurement in the detail sections.`);
  }
}

// --- PR citations ---------------------------------------------------------------------------
const prs = [...new Set([...raw.matchAll(/PR #(\d+)/g)].map((m) => m[1]))].sort((a, b) => a - b);
let checkedPrs = 0;
// The entry recording a piece of work cites the pull request carrying that entry, so at the
// moment it is written its own PR is open by definition. Requiring MERGED of every citation
// made this check fail on every branch that used it correctly, which is a check nobody would
// keep running. This branch's own PR is exempt and named in the output, so the exemption is
// visible rather than silent, and it lapses the moment the branch is merged.
let ownPr = null;
if (online) {
  try {
    ownPr = String(JSON.parse(execFileSync('gh', ['pr', 'view', '--json', 'number'],
      { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })).number);
  } catch { ownPr = null; }
}
if (online) {
  for (const n of prs) {
    let state;
    try {
      state = JSON.parse(execFileSync('gh', ['pr', 'view', n, '--json', 'state'],
        { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })).state;
    } catch {
      errors.push(`${file}: cites PR #${n}, which \`gh pr view\` cannot find.`);
      continue;
    }
    checkedPrs += 1;
    if (state !== 'MERGED' && n !== ownPr) {
      errors.push(`${file}: cites PR #${n} as the record of work, and it is ${state} rather than MERGED. An entry marked done against an unmerged pull request describes a branch, not this project.`);
    }
  }
}

// --- report ----------------------------------------------------------------------------------
if (errors.length) {
  console.error(`Backlog check failed, ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  console.error('');
  process.exit(1);
}

console.log(`Backlog check passed: ${paths.length} path(s) named all exist, ${referenced.length} section reference(s) all resolve,`);
console.log(`The order is numbered 1 to ${items.length} with every item tagged or marked closed, and none of them`);
console.log('writes a count of this project\'s own state where a run should be pointed at instead.');
console.log('');
console.log('Not established: that any item is genuinely finished. DONE is a claim by a person and');
console.log('nothing here can check it. Only paths written in backticks are read, because matching');
console.log('bare text picks up the tail of a URL, so a path named in plain prose is unchecked.');
console.log('Nor are counts in the detail sections read, because those carry dated');
console.log('historical measurements where the number is the point.');
if (online) {
  const exempt = ownPr && prs.includes(ownPr) ? ` One, #${ownPr}, is this branch's own pull request and is exempt until it merges.` : '';
  console.log(`${checkedPrs} of ${prs.length} cited pull request(s) checked.${exempt}`);
} else {
  console.log(`Not checked: whether the ${prs.length} cited pull request(s) exist or are merged. That needs the`);
  console.log('network, so it runs only with --online, in keeping with check-releases and check-sources.');
}
