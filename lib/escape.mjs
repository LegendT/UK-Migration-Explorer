// HTML escaping, in one place.
//
// This function was written out identically in five files until 6 August 2026: lib/charts.mjs,
// lib/citation.mjs, lib/claim-links.mjs, lib/provenance.mjs and eleventy.config.js. All five
// agreed, and nothing asserted that they did, which is this project's signature defect rather
// than a tidiness point: the same shape put the theme-file list in seven files with one of them
// enforced, and paired a record's source id with another publisher's URL because each was checked
// against the catalogue alone. Five copies of an escaper is five places for one of them to
// quietly stop escaping something.
//
// WHAT IT ESCAPES, and the omission is deliberate. `&`, `<`, `>` and `"` are enough for both
// contexts this project writes into: element text and double-quoted attribute values. `'` is not
// escaped because nothing here emits a single-quoted attribute, and adding `&#39;` would change
// the bytes of every page for no reader-visible reason. If a template ever writes a
// single-quoted attribute, this is the line to change and there is now only one of it.
//
// `&` is replaced in the same pass as the others rather than first, which is what stops it
// manufacturing entities: a single replace with one character class cannot re-read its own
// output, so `&lt;` cannot become `&amp;lt;`. eleventy.config.js records the inverse of this
// trap in its unescaping helper, where order genuinely matters.
const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

export const escape = (text) => String(text).replace(/[&<>"]/g, (character) => ENTITIES[character]);
