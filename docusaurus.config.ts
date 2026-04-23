import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenCode Mobile',
  tagline: 'Review, monitor, and manage OpenCode workflows on the go.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://opencode-mobile.example.com',
  baseUrl: '/',
  organizationName: 'alvarolorentedev',
  projectName: 'opencode-mobile',
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
          editUrl: 'https://github.com/alvarolorentedev/opencode-mobile/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/opencode-mobile-social-card.svg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    metadata: [
      {
        name: 'description',
        content:
          'Inspect running tasks, review diffs and logs, and approve agent-driven changes from your phone.',
      },
      {
        name: 'keywords',
        content:
          'OpenCode Mobile, coding agents, developer workflow, mobile devtools, agent workflows',
      },
      {name: 'theme-color', content: '#0d1514'},
      {
        property: 'og:description',
        content:
          'Inspect running tasks, review diffs and logs, and approve agent-driven changes from your phone.',
      },
    ],
    navbar: {
      title: 'OpenCode Mobile',
      logo: {
        alt: 'OpenCode Mobile logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: 'https://github.com/alvarolorentedev/opencode-mobile/releases/download/v1.0.0-beta/opencode-mobile.apk',
          label: 'Download Now',
          position: 'right',
        },
        {
          href: 'https://github.com/alvarolorentedev/opencode-mobile',
          label: 'GitHub',
          position: 'right',
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
              label: 'Download Status',
              to: '/docs/getting-started',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenCode Mobile. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.nightOwl,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
