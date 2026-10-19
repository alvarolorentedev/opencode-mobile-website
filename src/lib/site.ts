export const SITE = 'https://getopencode.app';
export const PLAY_URL =
  'https://play.google.com/store/apps/details?id=app.getopencode';
export const APK_URL =
  'https://github.com/alvarolorentedev/opencode-mobile/releases/latest/download/opencode-mobile.apk';
export const TESTFLIGHT_URL = 'https://testflight.apple.com/join/ddcE5Wzz';
export const GITHUB_URL = 'https://github.com/alvarolorentedev/opencode-mobile';
export const GITHUB_WEBSITE_URL =
  'https://github.com/alvarolorentedev/opencode-mobile-website';
export const RELEASES_URL = `${GITHUB_URL}/releases`;
export const OPENCODE_URL = 'https://opencode.ai/';
export const SOCIAL_CARD = `${SITE}/img/opencode-mobile-social-card.jpg`;

export const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'OpenCode Mobile',
      description:
        'Documentation and downloads for the community-built OpenCode mobile app.',
      inLanguage: 'en',
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'OpenCode Mobile',
      url: `${SITE}/`,
      logo: `${SITE}/img/logo.png`,
      founder: { '@id': `${SITE}/#maintainer` },
      sameAs: [GITHUB_URL, GITHUB_WEBSITE_URL],
    },
    {
      '@type': 'Person',
      '@id': `${SITE}/#maintainer`,
      name: 'Alvaro Lorente',
      url: 'https://github.com/alvarolorentedev',
      sameAs: ['https://github.com/alvarolorentedev'],
    },
    {
      '@type': 'MobileApplication',
      '@id': `${SITE}/#app`,
      name: 'OpenCode Mobile',
      description:
        'A community-built mobile companion for controlling sessions on an OpenCode server.',
      operatingSystem: 'Android, iOS',
      applicationCategory: 'DeveloperApplication',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      downloadUrl: `${SITE}/download/`,
      codeRepository: GITHUB_URL,
      sameAs: [GITHUB_URL],
      author: { '@id': `${SITE}/#maintainer` },
    },
  ],
};

function articleDates(input: { lastUpdated?: Date }) {
  return input.lastUpdated
    ? { dateModified: input.lastUpdated.toISOString().slice(0, 10) }
    : {};
}

export function docsStructuredData(input: {
  title: string;
  description: string;
  url: string;
  lastUpdated?: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${input.url}#article`,
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    inLanguage: 'en',
    ...articleDates(input),
    image: SOCIAL_CARD,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#app` },
    publisher: { '@id': `${SITE}/#organization` },
    author: {
      '@type': 'Organization',
      name: 'OpenCode Mobile',
      url: `${SITE}/`,
    },
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
  };
}

export function docsHubStructuredData(input: {
  title: string;
  description: string;
  url: string;
  lastUpdated?: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${input.url}#collection`,
    name: input.title,
    description: input.description,
    url: input.url,
    inLanguage: 'en',
    ...articleDates(input),
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#app` },
    publisher: { '@id': `${SITE}/#organization` },
  };
}

export function breadcrumbStructuredData(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqStructuredData(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
