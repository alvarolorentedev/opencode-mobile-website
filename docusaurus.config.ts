import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

function httpsUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

function kofiWidgetUrl(value: string | null): string | null {
  if (!value) return null;
  const url = new URL(value);
  url.pathname = `${url.pathname.replace(/\/+$/, '')}/`;
  url.search = '?hidefeed=true&widget=true&embed=true&preview=true';
  url.hash = '';
  return url.href;
}

const githubSponsorsUrl = httpsUrl(
  process.env.GITHUB_SPONSORS_URL || 'https://github.com/sponsors/alvarolorentedev',
);
const kofiUrl = httpsUrl(
  process.env.KOFI_URL || 'https://ko-fi.com/alvarolorentedev',
);
const kofiEmbedUrl = kofiWidgetUrl(kofiUrl);

const config: Config = {
  title: 'OpenCode Mobile',
  tagline: 'A community-built mobile companion for OpenCode.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://getopencode.app',
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'alvarolorentedev',
  projectName: 'opencode-mobile',
  clientModules: ['./src/clientModules/gtag-guard.ts'],
  customFields: {
    githubSponsorsUrl,
    kofiUrl,
    kofiEmbedUrl,
  },
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/alvarolorentedev/opencode-mobile-website/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        gtag: {
          trackingID: 'G-WS6H4XMXGG',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: null,
          priority: null,
          lastmod: 'date',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/opencode-mobile-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    metadata: [
      {
        name: 'description',
        content:
          'Start tasks, monitor sessions, use the terminal, and manage OpenCode workspaces from a community-built mobile companion.',
      },
      {name: 'theme-color', content: '#131111'},
      {
        property: 'og:title',
        content: 'OpenCode Mobile — mobile companion for OpenCode',
      },
      {
        property: 'og:description',
        content:
          'Take your OpenCode sessions with you. Start tasks, use the terminal, and manage workspaces from Android or iOS.',
      },
      {property: 'og:type', content: 'website'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    navbar: {
      title: 'OpenCode Mobile',
      logo: {
        alt: 'OpenCode Mobile logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: '/#product',
          position: 'left',
          label: 'Product',
        },
        {
          href: '/#setup',
          position: 'left',
          label: 'Setup',
        },
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/download',
          position: 'left',
          label: 'Download',
        },
        {
          to: '/about',
          position: 'left',
          label: 'About',
        },
        {
          to: '/support',
          position: 'left',
          label: 'Support',
        },
        {
          href: 'https://github.com/alvarolorentedev/opencode-mobile',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://play.google.com/store/apps/details?id=app.getopencode',
          label: 'Download Android',
          position: 'right',
          className: 'navbar-download',
        },
        {
          href: 'https://testflight.apple.com/join/ddcE5Wzz',
          label: 'Join iOS beta',
          position: 'right',
          className: 'navbar-download',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Features',
              to: '/docs/features',
            },
            {
              label: 'FAQ',
              to: '/docs/faq',
            },
            {
              label: 'Remote Access',
              to: '/docs/remote-access',
            },
            {
              label: 'Changelog',
              to: '/docs/changelog',
            },
          ],
        },
        {
          title: 'More',
          items: [
              {
                label: 'GitHub',
                href: 'https://github.com/alvarolorentedev/opencode-mobile',
              },
            {
              label: 'Download',
              to: '/download',
            },
            {
              label: 'About & Maintainer',
              to: '/about',
            },
            {
              label: 'Support',
              to: '/support',
            },
            ...(githubSponsorsUrl
              ? [{label: 'Sponsor', href: githubSponsorsUrl}]
              : []),
            {
              label: 'Security',
              to: '/security',
            },
            {
              label: 'Download Android',
              href: 'https://play.google.com/store/apps/details?id=app.getopencode',
            },
            {
              label: 'Join iOS beta',
              href: 'https://testflight.apple.com/join/ddcE5Wzz',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenCode Mobile. Community-built for OpenCode.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.nightOwl,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
