// The machine-readable half of what the site already says in prose: who publishes it, and that
// the data layer behind it is public, licensed and reusable. Backlog call 27, decided 4 August
// 2026 as Dataset plus Organization and WebSite.
//
// NO ClaimReview, and that is the decided part of the call rather than an omission. Google
// announced on 12 June 2025 that Claim Review "will no longer be supported in Google Search
// results", and on 8 September 2025 that from 9 September the type leaves Search Console rich
// result reporting, the Rich Results Test and the Search appearance filters. The markup survives
// only in Google's Fact Check Explorer, whose eligibility guidelines require a page to "clearly
// attribute the specific claim that you're assessing to a distinct origin (separate from your
// website)". content/style-guide.md tells readers the opposite: "We do not attribute claims to
// named people. Our claim checks describe propositions that circulate, not quotations." So the
// one surviving channel is closed to this site by its own published policy, which is the ground
// that does not rot if Google reverses the first one.
//
// NO SearchAction on the WebSite node either. Site search was considered and cut, so declaring a
// search endpoint would be a machine-readable claim about a feature that does not exist.
//
// Every value here is read from the data layer or from content/_data/site.js. Nothing in this
// file is a second home for anything: the strapline, the description and the file list are the
// site's own, and a figure never reaches this file at all.

const CONTEXT = 'https://schema.org';

// One identity, referenced by @id from anything that needs it. The Dataset carries the object
// inline rather than a bare reference, because a consumer reading /sources-and-method/ alone
// never sees the home page graph where the reference would resolve.
const organisation = (site) => ({
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: `${site.url}/`,
  description: site.strapline,
});

const website = (site) => ({
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: `${site.url}/`,
  name: site.name,
  description: site.strapline,
  inLanguage: 'en-GB',
  publisher: { '@id': `${site.url}/#organization` },
});

// The dataset is the data/ directory as it ships, which is what /sources-and-method/#reuse
// describes and links file by file. The distribution list is generated from the same directory
// read that renders that section, so the two cannot disagree about what is published.
//
// `license` points at that section rather than at the Open Government Licence, deliberately.
// The material is not under one licence: LICENCE clause 2 puts the figures and the quoted
// passages under OGL v3.0 and third-party terms, and names Migration Observatory and Skills for
// Care figures as not Crown copyright, while clause 1 puts the writing around them under MIT. A
// single OGL URL here would be a machine-readable overclaim on a site whose subject is exactly
// that kind of flattening.
const dataset = ({ site, description, files, modified }) => ({
  '@type': 'Dataset',
  '@id': `${site.url}/sources-and-method/#dataset`,
  name: `${site.name} data layer`,
  description,
  url: `${site.url}/sources-and-method/#reuse`,
  license: `${site.url}/sources-and-method/#reuse`,
  creator: organisation(site),
  inLanguage: 'en-GB',
  isAccessibleForFree: true,
  spatialCoverage: 'United Kingdom',
  // The newest lastUpdated any data file carries, so a reuser is told when the layer last moved
  // rather than when this page was built. Omitted rather than guessed if no file carries one.
  ...(modified ? { dateModified: modified } : {}),
  distribution: files.map(({ name }) => ({
    '@type': 'DataDownload',
    name,
    encodingFormat: 'application/json',
    contentUrl: `${site.url}/data/${name}`,
  })),
});

// Returns the script element for a page, or '' for a page that carries none. Two pages carry
// one: the home page states the identity, and /sources-and-method/ describes the data, which is
// the page that already makes both claims to a reader.
export function structuredData({ site, pageUrl, meta, files }) {
  const nodes = [];
  if (pageUrl === '/') nodes.push(website(site), organisation(site));
  if (pageUrl === '/sources-and-method/') {
    nodes.push(dataset({
      site,
      description: meta.description,
      files,
      modified: files.map((f) => f.json?.lastUpdated).filter(Boolean).sort().pop(),
    }));
  }
  if (!nodes.length) return '';

  const document = nodes.length === 1
    ? { '@context': CONTEXT, ...nodes[0] }
    : { '@context': CONTEXT, '@graph': nodes };

  // `<` escaped so a value can never close the script element early. JSON.stringify escapes
  // quotes and control characters and leaves `<` alone, and this block is written from data
  // files that are edited by hand.
  return `<script type="application/ld+json">${JSON.stringify(document).replace(/</g, '\\u003c')}</script>`;
}
