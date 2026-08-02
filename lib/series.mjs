// The data layer's file lists and the names everything else calls them by.
//
// One home for these maps, on the same reasoning as one home per figure. `series_ref` in
// data/ names a block here, eleventy.config.js exposes the same names to templates as
// `series.*`, and both validators resolve refs through it. A second copy of the map would
// be the duplicated-fact bug this module exists to guard against, wearing a different hat.

import { readFileSync } from 'node:fs';

const read = (file) => JSON.parse(readFileSync(new URL(`../data/${file}`, import.meta.url), 'utf8'));

// The theme files, once. This list was defined identically in seven files, and only
// validate-data.mjs enforced that a new data file is registered, against its own copy: a
// fifth theme file added there and nowhere else would have shipped every figure in it past
// the evidence gate silently, because check-evidence.mjs had never heard of it.
export const THEME_FILES = ['migration.json', 'asylum.json', 'population.json', 'fiscal.json'];

export const SERIES_FILES = {
  netMigration: 'netMigrationTimeseries.json',
  flows: 'migrationFlowsTimeseries.json',
  asylumApplications: 'asylumApplicationsTimeseries.json',
  asylumBacklog: 'asylumBacklogTimeseries.json',
};

// A series file may carry companion series alongside its primary `data` array: a superseded
// vintage, the same measure on the other counting basis, or the opposing flow. Each is a
// separate series with its own note and must never be silently merged with the primary.
export const COMPANION_BLOCKS = ['historical', 'alternate_basis', 'emigration'];

export const readSeries = () =>
  Object.fromEntries(Object.entries(SERIES_FILES).map(([name, file]) => [name, read(file)]));

// Every point in every block, keyed the way a series_ref names it: "netMigration@2024" for
// a primary series, "flows.emigration@2025" for a companion.
//
// A year identifies a point only while every series is annual, which all four are. Rather
// than assume that holds, a second point in the same year throws here: the alternative is a
// ref that silently resolves to whichever point happened to be read last.
export function seriesPoints(series = readSeries()) {
  const points = new Map();
  for (const [name, file] of Object.entries(series)) {
    const blocks = [[name, file, file.unit]];
    for (const companion of COMPANION_BLOCKS) {
      if (file[companion]) blocks.push([`${name}.${companion}`, file[companion], file[companion].unit ?? file.unit]);
    }
    for (const [block, data, unit] of blocks) {
      for (const point of data.data ?? []) {
        // A point with no date is skipped rather than throwing. validate-data.mjs already queues an
        // explanatory error for it, and both validators call this AFTER collecting errors and
        // BEFORE printing them, so throwing here took the whole report down with it: the one run
        // that had something useful to say said nothing but a stack trace.
        if (typeof point.date !== 'string' || point.date.length < 4) continue;
        const year = point.date.slice(0, 4);
        const ref = `${block}@${year}`;
        if (points.has(ref)) {
          throw new Error(`${SERIES_FILES[name]}: ${block} has more than one point in ${year}, so "${ref}" names no single point. A series_ref is keyed by year and cannot address sub-annual data.`);
        }
        points.set(ref, { block, year, value: point.value, unit });
      }
    }
  }
  return points;
}
