// What a publisher's table identifier looks like, in one place.
//
// Two things read it and they have to agree. `validate-data.mjs` scans a record's own prose and
// refuses one that names a table it does not declare; `check-releases.mjs` scans the publisher's
// change history for the same shape and matches it against those declarations. If the two
// patterns drifted, a record could satisfy the first while the second read a note it could never
// have been asked to declare, which is the silent half of a matched pair going missing.
//
// Same reasoning as lib/series.mjs holding the series names: a shared vocabulary belongs
// somewhere both sides import from rather than somewhere both sides copy.

// Home Office identifiers run Asy_00a, Asy_D02, EUSS_QTR, IER_02a, Res_01, T_3, Vis_01: one to
// five letters, an underscore, one to four alphanumerics. Checked against every string value in
// data/, where it matches the twelve real tables and nothing else. Both bounds are load-bearing.
// Requiring two letters before the underscore drops T_3; allowing six after it starts matching
// field names written as prose, metric_name and source_url among them.
export const TABLE_PATTERN = /\b[A-Za-z]{1,5}_[A-Za-z0-9]{1,4}\b/g;

export function tablesIn(...texts) {
  return [...new Set(texts.filter(Boolean).join(' ').match(TABLE_PATTERN) ?? [])];
}

// Folded, because the same publisher writes its identifiers more than one way and this repository
// already holds ASY_03 beside Asy_04. It is not free: those two are different schemes, ASY_03
// being Migration Transparency Data and Asy_NN the asylum summary workbook, so a correction to an
// `Asy_03` on the watched page would raise `ASY_03`'s record. Folded anyway, because the failure
// it prevents is a correction nobody sees and the failure it risks is a person reading a note.
export const sameTable = (a, b) => String(a).toLowerCase() === String(b).toLowerCase();
