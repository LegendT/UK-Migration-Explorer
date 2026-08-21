#!/usr/bin/env node
// The retry in lib/fetch-retry.mjs, probed rather than read.
//
// WHY THIS IS A CHECK AND NOT A COMMENT. The retry exists because ONS rate-limits the runner and
// refuses `check-releases.mjs` as collateral from the 55-URL burst in `check-sources.mjs` one
// second earlier. That refusal cannot be reproduced from a laptop, so the only thing anyone can
// establish here is that the LOGIC is right: it waits on the refusals that mean "later" and does
// not wait on an answer. Both halves matter and the second is the one no amount of reading
// catches. A retry that also retried a 404 would spend four requests learning what one told it,
// on the very budget the next source needs.
//
// The module takes `fetchImpl` and `sleepImpl` for this reason and nothing in the scripts passes
// them: there is no network here and no waiting, so this runs in `npm run validate` beside the
// data contract rather than being a network check that gates nothing.
//
// PROBED, AND THE PROBE WAS PROBED. On 21 August 2026, adding 404 to RETRY_STATUS turned exactly
// the three 404 assertions red and reversing that edit returned all of them green. A probe where
// everything passes on the first run has established nothing until you have seen it fail.
//
// Run: node scripts/check-fetch-retry.mjs

import assert from 'node:assert/strict';
import { get, retryAfterMs, BACKOFF_MS, RETRY_STATUS } from '../lib/fetch-retry.mjs';

const failures = [];
let ran = 0;

const check = (name, condition, detail) => {
  ran++;
  if (!condition) failures.push(`${name}: ${detail}`);
};

// A response double. `ok` is derived rather than passed, so a test cannot assert a 200 that the
// module would treat as a failure.
const res = (status, { body = 'ok', retryAfter = null } = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: (name) => (name.toLowerCase() === 'retry-after' ? retryAfter : null) },
  text: async () => body,
});

// Records what was asked and what was waited for. The counts are the assertion in most cases
// below: "it succeeded" is far weaker than "it succeeded after exactly three requests".
const harness = (sequence) => {
  const calls = [];
  const slept = [];
  let i = 0;
  return {
    calls,
    slept,
    fetchImpl: async () => {
      calls.push(1);
      const next = sequence[Math.min(i, sequence.length - 1)];
      i++;
      if (next instanceof Error) throw next;
      return next;
    },
    sleepImpl: async (ms) => { slept.push(ms); },
  };
};

// --- it waits on a refusal that means "later" ------------------------------------------------
{
  const h = harness([res(429), res(429), res(200, { body: 'landed' })]);
  const r = await get('u', h);
  check('429, 429, 200 succeeds', r.body === 'landed', JSON.stringify(r));
  check('  and asks exactly three times', h.calls.length === 3, h.calls.length);
  check('  and waits the declared backoff', JSON.stringify(h.slept) === JSON.stringify(BACKOFF_MS.slice(0, 2)), JSON.stringify(h.slept));
}
{
  const h = harness([res(503), res(200, { body: 'later' })]);
  const r = await get('u', h);
  check('503 is retried too', r.body === 'later' && h.calls.length === 2, JSON.stringify(r));
}

// --- IT DOES NOT WAIT ON AN ANSWER, which is the half a reading cannot establish ---------------
{
  const h = harness([res(404)]);
  const r = await get('u', h);
  check('404 returns at once', r.error === 'HTTP 404', JSON.stringify(r));
  check('  and asks exactly once', h.calls.length === 1, h.calls.length);
  check('  and never waits', h.slept.length === 0, JSON.stringify(h.slept));
}
{
  const h = harness([res(500)]);
  const r = await get('u', h);
  check('500 is not retried', r.error === 'HTTP 500' && h.calls.length === 1, `${JSON.stringify(r)} after ${h.calls.length}`);
}
{
  const h = harness([Object.assign(new Error('boom'), { name: 'TypeError' })]);
  const r = await get('u', h);
  check('a thrown error is not retried', r.error === 'unreachable' && h.calls.length === 1, `${JSON.stringify(r)} after ${h.calls.length}`);
}
{
  const h = harness([res(200, { body: 'x' })]);
  const r = await get('u', h);
  check('a clean 200 never waits', r.body === 'x' && h.calls.length === 1 && h.slept.length === 0, JSON.stringify(h.slept));
}

// --- it gives up, and says how many times it was refused ---------------------------------------
{
  const h = harness([res(429)]);
  const r = await get('u', h);
  check('persistent 429 gives up', /^HTTP 429 after \d+ attempts$/.test(r.error ?? ''), JSON.stringify(r));
  check('  and stops at the declared count', h.calls.length === 4 && h.slept.length === 3, `${h.calls.length} calls, ${h.slept.length} waits`);
}

// --- Retry-After is honoured, and a long one ends the attempt rather than sleeping through it ---
{
  const h = harness([res(429, { retryAfter: '7' }), res(200)]);
  await get('u', h);
  check('Retry-After: 7 waits 7000, not the backoff', JSON.stringify(h.slept) === JSON.stringify([7000]), JSON.stringify(h.slept));
}
{
  const h = harness([res(429, { retryAfter: '3600' }), res(200)]);
  const r = await get('u', h);
  check('Retry-After: 3600 gives up', /longer than this run will wait/.test(r.error ?? ''), JSON.stringify(r));
  check('  and does not retry early anyway', h.calls.length === 1 && h.slept.length === 0, `${h.calls.length} calls, ${h.slept.length} waits`);
}
check('retryAfterMs ignores an absent header', retryAfterMs(null) === null, retryAfterMs(null));
check('retryAfterMs ignores the HTTP-date form', retryAfterMs('Wed, 21 Aug 2026 09:00:00 GMT') === null, 'parsed a date it does not read');
check('retryAfterMs ignores a negative', retryAfterMs('-5') === null, retryAfterMs('-5'));
check('retryAfterMs reads delta-seconds', retryAfterMs('5') === 5000, retryAfterMs('5'));

// --- the declared set is what the assertions above assume --------------------------------------
// Without this, widening RETRY_STATUS to a status no case covers would pass in silence.
check('RETRY_STATUS is exactly 429 and 503', [...RETRY_STATUS].sort().join() === '429,503', [...RETRY_STATUS].join());

// --- report ------------------------------------------------------------------------------------
if (failures.length) {
  console.error(`Fetch retry check failed, ${failures.length} of ${ran} assertion(s):\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  console.error('\nlib/fetch-retry.mjs decides whether a network check waits or gives up. A wrong answer');
  console.error('either spends the rate budget the next source needs, or reports a source unreachable');
  console.error('that was only asked to wait.');
  process.exit(1);
}

console.log(`Fetch retry check passed: ${ran} assertions over lib/fetch-retry.mjs, no network and no waiting.`);
console.log('Both directions are asserted: 429 and 503 are retried on the declared backoff, and 404,');
console.log('500 and a thrown error are answered once and never waited on. Retry-After is read in');
console.log('delta-seconds, and one longer than this run will wait ends the attempt instead of');
console.log('shortening it, because retrying earlier than asked is what gets an address limited.');
console.log('Not established: that the retry clears a real ONS 429. That refusal is address-based,');
console.log('cannot be reproduced from a laptop, and is why `check-releases.mjs` stopped raising a');
console.log('refused fetch as a job on a push rather than relying on the wait alone. Nor that the');
console.log('caller uses this correctly: this reads the module and never `check-releases.mjs`.');
