#!/usr/bin/env node
// The pipeline check. `npm run validate` and .github/workflows/validate-data.yml were two lists
// of checks and neither read the other, so a check added to one gated nothing on the other. That
// is not hypothetical: it is what happened to check-backlog.mjs on 3 August 2026, between it
// being written and a CI step being added by hand minutes later. For those minutes the file's own
// claim that it was checked was true on a laptop and false on a pull request.
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
// Network checks gate nothing by this project's convention, because a transient outage must not
// turn a pull request red over a figure nobody touched. That is why three of these are ci-only:
// they need the network, so they cannot run inside an offline `validate`, and they report rather
// than block. check-evidence is the odd one: it is offline and it gates, and it is still not in
// `validate`, because it compares against a base branch a laptop may not have fetched.
const CHECKS = [
  { script: 'validate-data.mjs', local: true, ci: true, gates: true },
  { script: 'validate-content.mjs', local: true, ci: true, gates: true },
  { script: 'check-backlog.mjs', local: true, ci: true, gates: true },
  { script: 'check-pipeline.mjs', local: true, ci: true, gates: true },
  { script: 'check-build.mjs', local: false, ci: true, gates: true, why: 'runs inside `npm run build`, which needs a built site' },
  { script: 'check-evidence.mjs', local: false, ci: true, gates: true, why: 'needs the base branch fetched, which `npm run validate` cannot assume' },
  { script: 'check-sources.mjs', local: false, ci: true, gates: false, why: 'network' },
  { script: 'check-releases.mjs', local: false, ci: true, gates: false, why: 'network' },
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

// --- a check that runs locally must run in CI ----------------------------------------------
for (const { script, local, ci } of CHECKS) {
  if (local && !ci) {
    errors.push(`CHECKS declares scripts/${script} as local: true, ci: false. A check that runs only on a laptop gates nothing on a pull request, which is the split this file exists to close.`);
  }
}

// --- what each side actually invokes -------------------------------------------------------
// Follows `npm run <name>` through package.json, so a check reached through `npm run build` counts
// as invoked. It does not follow a bare script name passed as an argument, which is how
// start-server-and-test calls a11y:serve and a11y:ci; neither runs a script in scripts/, and the
// closing line below says so rather than leaving it implied.
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
    for (let j = i + 1; j < lines.length && (!lines[j].trim() || lines[j].startsWith(`${indent} `)); j += 1) {
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
console.log('Not established: that a failing job blocks a merge. main has no branch protection and no');
console.log('rulesets, so "gates" here means the job goes red, and merging red is a habit rather than a');
console.log('rule. Nor that a11y:serve and a11y:ci run what they should: they are passed as bare names to');
console.log('start-server-and-test rather than through npm run, so this does not follow them, and neither');
console.log('runs anything in scripts/. Nor that any check is correct, only that it runs on both sides.');
