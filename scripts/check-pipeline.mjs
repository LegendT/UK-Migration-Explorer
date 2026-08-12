#!/usr/bin/env node
// The pipeline check. `npm run validate` and .github/workflows/validate-data.yml were two lists
// of checks and neither read the other, so a check added to one gated nothing on the other. That
// is not hypothetical: it is what happened to a check on 3 August 2026, between it being written
// and a CI step being added by hand minutes later. For those minutes the file's own claim that it
// was checked was true on a laptop and false on a pull request.
//
// The manifest below is what both lists are now measured against. It is a comparison rather than
// a shared import because neither side can import anything: package.json is JSON and a workflow
// is YAML. Generating the workflow from the manifest was the other option and it costs more than
// it saves, because CI needs what a generated file would flatten: a named step per check, one
// step that fetches the base branch first, and continue-on-error on the network checks alone.
//
// So the rule that closes the split is a declaration, not a wiring: local: true with ci: false is
// refused outright. A laptop-only check has to be an argued exception in this file, which is a
// commit someone reviews, rather than the default state of anything anyone forgets to add.
//
// Run: node scripts/check-pipeline.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const workflowPath = '.github/workflows/validate-data.yml';
const errors = [];

// local: invoked by `npm run validate`. ci: invoked by the workflow, directly or through an npm
// script it calls. gates: that CI step fails the job, rather than carrying continue-on-error.
//
// Every ci-only entry carries `why`, and the run prints it. A reason written here and nowhere else
// is a reason nobody reads; a reason written here AND in this comment is two lists, which is the
// habit this project keeps having to break. So the comment states the rule and the entries state
// the exceptions, and how many of each is whatever the run says rather than a number typed above
// it that was wrong twice in this file before it was first committed.
const CHECKS = [
  { script: 'validate-data.mjs', local: true, ci: true, gates: true },
  { script: 'validate-content.mjs', local: true, ci: true, gates: true },
  { script: 'check-pipeline.mjs', local: true, ci: true, gates: true },
  { script: 'check-build.mjs', local: false, ci: true, gates: true, why: 'runs inside `npm run build`, which needs a built site' },
  { script: 'check-evidence.mjs', local: false, ci: true, gates: true, why: 'compares against a base branch a laptop may not have fetched' },
  { script: 'check-a11y-dark.mjs', local: false, ci: true, gates: true, why: 'needs a served site, so it runs inside `npm run a11y` beside the light pass rather than in `npm run validate`' },
  { script: 'check-sources.mjs', local: false, ci: true, gates: false, why: 'network, and a transient outage must not redden a pull request' },
  { script: 'check-releases.mjs', local: false, ci: true, gates: false, why: 'network, and a newer edition is not a defect in the diff' },
];

const declared = new Map(CHECKS.map((check) => [check.script, check]));

// --- the manifest and scripts/ must name the same files -----------------------------------
// Either way round. A script nothing declares is a check that may be running nowhere; a
// declaration naming a deleted script is a claim about a file that is gone.
const onDisk = readdirSync(`${repoRoot}scripts/`).filter((name) => name.endsWith('.mjs'));
for (const name of onDisk) {
  if (!declared.has(name)) {
    errors.push(`scripts/${name} exists and CHECKS in scripts/check-pipeline.mjs does not declare it, so nothing here knows whether it runs on a laptop, in CI, or nowhere.`);
  }
}
for (const { script } of CHECKS) {
  if (!onDisk.includes(script)) errors.push(`CHECKS declares scripts/${script}, which does not exist.`);
}

// --- a check that runs locally must run in CI, and one that does not must say why ------------
for (const { script, local, ci, why } of CHECKS) {
  if (local && !ci) {
    errors.push(`CHECKS declares scripts/${script} as local: true, ci: false. A check that runs only on a laptop gates nothing on a pull request, which is the split this file exists to close.`);
  }
  if (!local && !why) {
    errors.push(`CHECKS declares scripts/${script} as ci-only and gives no "why". Staying out of \`npm run validate\` is the exception here, so it takes a reason someone can argue with.`);
  }
}

// --- what each side actually invokes -------------------------------------------------------
// Follows `npm run <name>` through package.json, so a check reached through `npm run build` counts
// as invoked. It does not follow a BARE script name passed as an argument, which is how
// start-server-and-test used to be given a11y:ci. That stopped being a harmless gap on 6 August
// 2026, when the dark-palette pass became the first script in scripts/ reachable only that way:
// the manifest declared it as running in CI and this could not see it. Rather than widen the
// parser, the invocation was made explicit, `"npm run a11y:ci"`, so the chain resolves by the one
// rule already here. a11y:serve is still a bare name and still runs no script in scripts/.
const pkg = JSON.parse(readFileSync(`${repoRoot}package.json`, 'utf8'));
const invokedBy = (command, seen = new Set()) => {
  const found = new Set([...String(command).matchAll(/node\s+scripts\/([\w.-]+\.mjs)/g)].map((m) => m[1]));
  for (const [, name] of String(command).matchAll(/npm run ([\w:-]+)/g)) {
    if (seen.has(name)) continue;
    seen.add(name);
    if (!pkg.scripts?.[name]) {
      errors.push(`a command runs \`npm run ${name}\`, and package.json has no script by that name.`);
      continue;
    }
    for (const script of invokedBy(pkg.scripts[name], seen)) found.add(script);
  }
  return found;
};

const inValidate = invokedBy(pkg.scripts?.validate ?? '');
for (const { script, local } of CHECKS) {
  if (local && !inValidate.has(script)) {
    errors.push(`CHECKS declares scripts/${script} as local, and \`npm run validate\` does not invoke it.`);
  }
  if (!local && inValidate.has(script)) {
    errors.push(`\`npm run validate\` invokes scripts/${script}, and CHECKS declares it local: false. Either add it to CI too and declare it, or take it out.`);
  }
}

// --- and what the workflow invokes, step by step -------------------------------------------
// Split on the six-space dash that opens a step, so continue-on-error can be read against the
// check that step runs rather than against the file as a whole.
//
// Only the run: blocks are read, never the whole step, and the first version of this check read
// the whole step. That file explains itself by quoting the commands it is about, in comments and
// in one step's own name, and both were being followed: the step named "Pipeline contract, that
// this file and npm run validate agree" was read as running everything `npm run validate` runs.
// Two of the eight breaks below then passed, one of them because that phantom hard step outvoted
// the continue-on-error the break had just added to the real one.
const runBlocks = (step) => {
  const lines = step.split('\n');
  const out = [];
  lines.forEach((line, i) => {
    const match = line.match(/^(\s*)run:\s*(.*)$/);
    if (!match) return;
    const [, indent, inline] = match;
    // A block scalar, run: | or run: >, carries the command on the lines below it instead.
    if (inline && !/^[|>][-+]?$/.test(inline)) {
      out.push(inline);
      return;
    }
    // A block scalar runs until a line indented no further than its key. The first line of a step
    // has had "      - " stripped by the split, so its key sits at column 8 whatever it measures
    // here; without that, a step opening `run: |` would swallow the sibling keys below it, and one
    // of those is the name that caused this function to exist.
    const width = indent.length || 8;
    for (let j = i + 1; j < lines.length; j += 1) {
      if (!lines[j].trim()) { out.push(lines[j]); continue; }
      if (lines[j].match(/^ */)[0].length <= width) break;
      out.push(lines[j]);
    }
  });
  // Shell comments inside a block scalar, for the same reason as above.
  return out.join('\n').replace(/^\s*#.*$/gm, '');
};

const workflow = readFileSync(`${repoRoot}${workflowPath}`, 'utf8');
const steps = workflow.split(/\n {6}- /).slice(1);
const inCi = new Map();
for (const step of steps) {
  const soft = /\n {8}continue-on-error:\s*true/.test(`\n${step}`);
  // Gating if ANY step running it gates. A second, softer step does not undo the first.
  for (const script of invokedBy(runBlocks(step))) inCi.set(script, (inCi.get(script) ?? false) || !soft);
}

for (const { script, ci, gates } of CHECKS) {
  if (ci && !inCi.has(script)) {
    errors.push(`CHECKS declares scripts/${script} as running in CI, and ${workflowPath} does not invoke it. A check nothing runs on a pull request gates nothing.`);
  } else if (!ci && inCi.has(script)) {
    errors.push(`${workflowPath} invokes scripts/${script}, and CHECKS declares it ci: false.`);
  } else if (ci && inCi.get(script) !== gates) {
    errors.push(inCi.get(script)
      ? `CHECKS declares scripts/${script} as gates: false, and its ${workflowPath} step has no continue-on-error, so it does fail the job.`
      : `CHECKS declares scripts/${script} as gates: true, and its ${workflowPath} step carries continue-on-error: true, so it reports and does not gate.`);
  }
}

// --- report --------------------------------------------------------------------------------
if (errors.length) {
  console.error(`Pipeline check failed, ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  console.error(`\nThe fix is to make the three agree: scripts/, \`npm run validate\`, and ${workflowPath}.`);
  console.error('Editing CHECKS to match a check that runs nowhere is how the split reopens.');
  process.exit(1);
}

const gating = CHECKS.filter((check) => check.gates);
console.log(`Pipeline check passed: ${CHECKS.length} check scripts, each declared, each where it says it is.`);
console.log(`${inValidate.size} run in \`npm run validate\`, ${inCi.size} run in ${workflowPath}, and ${gating.length} of those fail the job:`);
console.log(`  ${gating.map((check) => check.script).join(', ')}`);
console.log('Out of `npm run validate` on purpose, each with the reason it is declared with:');
for (const { script, why } of CHECKS.filter((check) => !check.local)) console.log(`  ${script}: ${why}`);
console.log('Established since 4 August 2026, and probed rather than read: a failing job DOES block a');
console.log('merge. main requires the validate check, enforce_admins is on, and a direct push is refused');
console.log('with GH006. a11y:ci IS followed as of 6 August 2026, start-server-and-test being given it');
console.log('as `npm run a11y:ci` rather than as a bare name, which is what lets the dark-palette pass');
console.log('be declared in CHECKS and seen here. Not established: that a11y:serve does what it should,');
console.log('still a bare name and still running nothing in scripts/. Nor that any check is correct,');
console.log('only that it runs on both sides.');
