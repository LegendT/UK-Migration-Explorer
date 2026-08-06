// The claim checks that rest on a figure from this page.
//
// Backlog U3. A theme page is where most readers land and where most figures live, and until now
// nothing on one pointed at the claim checks built on those same figures. The claims index exists
// and is in the navigation, but it is a list of fifteen sentences a reader has to match against
// what they were just reading. This is the same relationship stated from the other end.
//
// Computed from front matter on both sides rather than maintained: a theme page declares
// `figures:` and so does every claim, and validate-content.mjs will not let either be short of
// what it renders. So a claim added tomorrow appears here without anybody remembering to add it,
// which is the whole reason this is a build-time join and not a hand-kept list. This project has
// been bitten twice by a hand-kept list and once, on 5 August 2026, by a11y URLs kept in one.
//
// A paused claim is listed and said to be paused, which is what the claims index does. Dropping
// it would be the pause deleting a page from a second place, and the pause is explicitly not a
// deletion: the page keeps its address.
//
// The ceiling: this renders nothing when no claim uses any of a page's figures, rather than
// failing. A theme page with no claim behind it is a real state and not a defect. No count is
// written here of how many pages match or how many claims each finds: that is this project's own
// state, it moves with every claim added, and the build prints the pages it wrote. If a theme
// page renders nothing here, nothing is what it means.

import { escape } from './escape.mjs';

/**
 * A list of claim checks sharing at least one figure with the page.
 *
 * figures: the refs the theme page declares, as `theme/id` strings.
 * claims:  the claims collection, each with url and data.{claim, figures, error_type, paused}.
 * pageUrl: only used to say which page failed, where a claim is missing a field.
 */
export function claimLinks({ figures, claims, pageUrl }) {
  const declared = new Set(figures);
  const matching = claims.filter((claim) => (claim.data.figures ?? []).some((ref) => declared.has(ref)));
  if (!matching.length) return '';

  const items = matching.map((claim) => {
    // Asked of every claim rather than trusted, because this reads front matter from a different
    // page than the one being built and a missing field would render an empty link. `error_type`
    // and `claim` are both required by validate-content.mjs, so this fires only if that contract
    // changes underneath.
    for (const field of ['claim', 'error_type']) {
      if (!claim.data[field]) {
        throw new Error(`${pageUrl}: the claim at ${claim.url} has no ${field}, so this page cannot say what it is. validate-content.mjs requires that field, so either it stopped or this list is reading the wrong thing.`);
      }
    }
    const paused = claim.data.paused
      ? ' <span class="claim-link-paused">Paused pending re-review.</span>'
      : '';
    return `
      <li><a href="${escape(claim.url)}">${escape(claim.data.claim)}</a>
      <span class="claim-link-meta">Misuse: ${escape(claim.data.error_type)}</span>${paused}</li>`;
  }).join('');

  return `
  <h2>Claims that rest on these figures</h2>
  <p>Each of these checks uses at least one figure from this page. They are the same figures,
  read against a sentence somebody is circulating.</p>
  <ul class="claim-links">${items}
  </ul>`;
}
