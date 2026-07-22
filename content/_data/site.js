export default {
  name: 'UK Migration Explorer',
  strapline: 'A plain-English guide to what UK migration and asylum statistics do, and do not, show.',
  url: 'https://ukmigrationexplorer.netlify.app',
  // Order matters: the distinctions come before the figures. See foundation section 8.1 —
  // "Explorer" invites the dashboard reading this site exists to reject.
  nav: [
    { href: '/', label: 'Overview' },
    { href: '/what-the-words-mean/', label: 'What the words mean' },
    { href: '/migration/', label: 'Migration' },
    { href: '/asylum/', label: 'Asylum' },
    { href: '/costs/', label: 'Costs' },
    { href: '/common-claims/', label: 'Common claims' },
    { href: '/sources-and-method/', label: 'Sources and method' },
    { href: '/style-guide/', label: 'Style guide' },
  ],
};
