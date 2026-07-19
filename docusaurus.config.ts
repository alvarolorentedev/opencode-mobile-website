import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenCode Mobile',
  tagline: 'A community-built Android companion for OpenCode.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://getopencode.app',
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
    image: 'img/opencode-mobile-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    metadata: [
      {
        name: 'description',
        content:
          'Start tasks, monitor sessions, use the terminal, and manage OpenCode workspaces from a community-built Android companion.',
      },
      {
        name: 'keywords',
        content:
          'OpenCode Mobile, OpenCode Android, coding agent mobile app, remote developer workflow, mobile terminal',
      },
      {name: 'theme-color', content: '#131111'},
      {
        property: 'og:title',
        content: 'OpenCode Mobile — Android companion for OpenCode',
      },
      {
        property: 'og:description',
        content:
          'Take your OpenCode sessions with you. Start tasks, use the terminal, and manage workspaces from Android.',
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
          href: 'https://github.com/alvarolorentedev/opencode-mobile',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://play.google.com/apps/testing/app.getopencode',
          label: 'Join The Beta',
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
              label: 'Join The Beta',
              href: 'https://play.google.com/apps/testing/app.getopencode',
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
