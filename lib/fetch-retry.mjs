// A fetch that waits when a host says "later", for the network checks.
//
// 429 MEANS TRY AGAIN LATER AND UNTIL 21 AUGUST 2026 `check-releases.mjs` DID NOT. Every ONS
// refusal this project has had is a rate limit on the runner's address, and it reaches the release
// check as collateral from the step before it: `check-sources.mjs` asks ONS for 55 URLs six at a
// time, and the release check runs one second later asking for two more. Measured on run
// 32461238890, which opened issue #221: the source check logged a 429 from ONS at 08:03:39 and
// both of the release check's ONS fetches were refused at 08:03:40.
//
// THE LIMIT IS MARGINAL RATHER THAN ABSOLUTE, which is the reason waiting works at all. On
// 19 August the source check took two 429s and the release check passed two seconds later, on the
// same runner against the same host. So this is a queue to join, not a door that is shut.
//
// A BROWSER USER-AGENT IS NOT THE FIX AND WAS MEASURED NOT TO BE. `check-sources.mjs` already
// sends the full browser header set and is the step that drew the first 429, and its own comment
// records obr.uk answering a laptop and refusing the runner: an address-reputation limit is not
// something a header reaches. This waits rather than dressing up as a browser.
//
// Only the refusals that mean "later" are retried. A 404 is an answer, and repeating it spends
// the budget the next source needs.
export const RETRY_STATUS = new Set([429, 503]);
export const BACKOFF_MS = [2000, 5000, 12000];
const MAX_RETRY_AFTER_MS = 30000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Delta-seconds only. Retry-After also has an HTTP-date form, and it is not read here because
// rate limiters send seconds and an unread branch is one nothing proves. A host asking for longer
// than this job should spend is answered by giving up rather than by sleeping through it, so the
// cap ENDS the attempt rather than shortening the wait: retrying earlier than asked is what got
// this address limited in the first place.
export const retryAfterMs = (header) => {
  const seconds = Number(header);
  if (!header || !Number.isFinite(seconds) || seconds < 0) return null;
  return seconds * 1000 > MAX_RETRY_AFTER_MS ? 'too long' : seconds * 1000;
};

// `fetchImpl` and `sleepImpl` are injected so this can be probed without a network or a wait.
// Nothing in the scripts passes them.
export async function get(url, { timeoutMs = 20000, retries = 3, fetchImpl = fetch, sleepImpl = sleep } = {}) {
  let last = { error: 'unreachable' };
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, { redirect: 'follow', signal: controller.signal });
      if (response.ok) return { body: await response.text() };
      last = { error: `HTTP ${response.status}` };
      if (!RETRY_STATUS.has(response.status)) return last;
      if (attempt === retries) break;
      const stated = retryAfterMs(response.headers.get('retry-after'));
      if (stated === 'too long') return { error: `${last.error}, and it asked for longer than this run will wait` };
      await sleepImpl(stated ?? BACKOFF_MS[attempt]);
    } catch (error) {
      return { error: error.name === 'AbortError' ? 'timed out' : 'unreachable' };
    } finally {
      clearTimeout(timer);
    }
  }
  // Refused with "later" every time. The wording says how many, because "HTTP 429" alone reads as
  // one unlucky request and this one was refused four times across nineteen seconds.
  return { error: `${last.error} after ${retries + 1} attempts` };
}
