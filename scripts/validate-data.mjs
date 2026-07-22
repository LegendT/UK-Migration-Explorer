#!/usr/bin/env node
// Enforces the data contract: no figure is published without its source metadata.
// Run: node scripts/validate-data.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const read = (file) => JSON.parse(readFileSync(dataDir + file, 'utf8'));

const METRIC_FIELDS = [
  'metric_name', 'value', 'unit', 'date', 'period_label',
  'source_name', 'source_url', 'retrieved_date', 'notes', 'confidence_level',
];
// Timeseries points inherit unit and period from the series, so carry fewer fields.
const POINT_FIELDS = ['date', 'value', 'confidence_level', 'source_name', 'source_url'];
const SOURCE_FIELDS = ['id', 'name', 'publisher', 'url', 'covers', 'updateFrequency', 'confidence_level'];
// Dashboard denominators cite their source in prose only. See "Known gaps" in the README.
const SUPPORTING_FIELDS = ['value', 'unit', 'notes'];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const confidenceLevels = Object.keys(read('meta.json').confidenceLevels);
const errors = [];

function check(where, item, required) {
  for (const field of required) {
    const value = item[field];
    if (value === undefined || value === null || value === '') {
      errors.push(`${where}: missing ${field}`);
    }
  }
  for (const field of ['date', 'retrieved_date']) {
    if (item[field] && !ISO_DATE.test(item[field])) {
      errors.push(`${where}: ${field} "${item[field]}" is not YYYY-MM-DD`);
    }
  }
  const url = item.source_url ?? item.url;
  if (url && !url.startsWith('https://')) {
    errors.push(`${where}: source URL is not https — ${url}`);
  }
  if (item.confidence_level && !confidenceLevels.includes(item.confidence_level)) {
    errors.push(`${where}: unknown confidence_level "${item.confidence_level}"`);
  }
}

const themeFiles = ['asylum.json', 'migration.json', 'population.json', 'fiscal.json'];
let counted = 0;

for (const file of [...themeFiles, 'dashboard.json']) {
  const data = read(file);
  (data.metrics ?? []).forEach((metric, i) => {
    check(`${file}[${i}] ${metric.metric_name ?? '(unnamed)'}`, metric, METRIC_FIELDS);
  });
  for (const [name, item] of Object.entries(data.supporting ?? {})) {
    check(`${file} supporting.${name}`, item, SUPPORTING_FIELDS);
  }
  counted += (data.metrics ?? []).length;
}

const series = read('netMigrationTimeseries.json');
series.data.forEach((point, i) => {
  check(`netMigrationTimeseries.json[${i}] ${point.date ?? '(undated)'}`, point, POINT_FIELDS);
});
counted += series.data.length;

read('sources.json').sources.forEach((source, i) => {
  check(`sources.json[${i}] ${source.id ?? '(unidentified)'}`, source, SOURCE_FIELDS);
});

// Every metric must cite a publisher catalogued in sources.json, so the sources page
// stays complete. Publishers serve from several hosts (commonslibrary.parliament.uk and
// researchbriefings.files.parliament.uk are both the Commons Library), so compare the
// last two labels of the hostname.
// ponytail: last-two-labels is loose under shared suffixes — any gov.uk or ac.uk host
// passes. Swap in a public-suffix check if a wrong publisher ever slips through.
const domain = (url) => new URL(url).hostname.split('.').slice(-2).join('.');
const catalogued = new Set(read('sources.json').sources.map((s) => domain(s.url)));
for (const file of [...themeFiles, 'dashboard.json']) {
  for (const metric of read(file).metrics ?? []) {
    if (metric.source_url && !catalogued.has(domain(metric.source_url))) {
      errors.push(`${file}: ${metric.metric_name} cites ${domain(metric.source_url)}, which is not in sources.json`);
    }
  }
}

if (errors.length) {
  console.error(`Data contract failed — ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

console.log(`Data contract passed: ${counted} figures, all sourced, dated and graded.`);
