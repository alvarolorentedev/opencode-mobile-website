import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightLinksValidator from 'starlight-links-validator';
import starlightLlmsTxt from 'starlight-llms-txt';
import { buildLastmodMap } from './src/lib/sitemap-lastmod';

const SITE = 'https://getopencode.app';
const GA_ID = 'G-WS6H4XMXGG';
const SOCIAL_CARD = `${SITE}/img/opencode-mobile-social-card.jpg`;
const lastmodMap = buildLastmodMap();

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  outDir: './build',
  publicDir: './static',
  integrations: [
    starlight({
      title: 'OpenCode Mobile',
      description:
        'Documentation and downloads for the community-built OpenCode mobile app for Android and iOS.',
      logo: { src: './src/assets/logo.svg', alt: 'OpenCode Mobile logo' },
      favicon: '/img/favicon.ico',
      editLink: {
        baseUrl:
          'https://github.com/alvarolorentedev/opencode-mobile-website/edit/main/src/content/docs/',
      },
      lastUpdated: true,
      pagination: true,
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/alvarolorentedev/opencode-mobile',
        },
      ],
      components: {
        Head: './src/components/StarlightHead.astro',
        SocialIcons: './src/components/StarlightSocialIcons.astro',
      },
      customCss: ['./src/styles/tokens.css', './src/styles/custom.css'],
      sidebar: [
        { label: 'Introduction', link: '/docs/introduction/' },
        {
          label: 'OpenCode Mobile App — Setup and Download',
          link: '/docs/opencode-android-app/',
        },
        { label: 'Getting Started', link: '/docs/getting-started/' },
        { label: 'Features', link: '/docs/features/' },
        {
          label: 'Connect remotely',
          items: [
            { label: 'Remote Access Overview', link: '/docs/remote-access/' },
            {
              label: 'Use OpenCode from Your Phone',
              link: '/docs/guides/use-opencode-from-phone/',
            },
            {
              label: 'Local Network',
              link: '/docs/guides/local-network/',
            },
            {
              label: 'Connect with Tailscale',
              link: '/docs/guides/tailscale/',
            },
            {
              label: 'Connect with Cloudflare Tunnel',
              link: '/docs/guides/cloudflare-tunnel/',
            },
            {
              label: 'Reverse Proxy or API Prefix',
              link: '/docs/guides/reverse-proxy/',
            },
            {
              label: 'SSH Port Forwarding',
              link: '/docs/guides/ssh-forward/',
            },
            {
              label: 'Remote Access Security',
              link: '/docs/guides/remote-access-security/',
            },
            { label: 'Mobile vs Web', link: '/docs/guides/mobile-vs-web/' },
          ],
        },
        {
          label: 'Use the app',
          items: [
            { label: 'User Manual', link: '/docs/user-manual/' },
            { label: 'Start and Monitor Tasks', link: '/docs/guides/tasks/' },
            { label: 'Manage Sessions', link: '/docs/guides/sessions/' },
            {
              label: 'Approvals and Changes',
              link: '/docs/guides/approvals-and-changes/',
            },
            { label: 'Voice Mode', link: '/docs/guides/voice/' },
            { label: 'Session Usage', link: '/docs/guides/usage/' },
            { label: 'Work with Files', link: '/docs/guides/workspace-files/' },
            { label: 'Use the Terminal', link: '/docs/guides/terminal/' },
            { label: 'Manage Worktrees', link: '/docs/guides/worktrees/' },
            {
              label: 'Providers and Models',
              link: '/docs/guides/providers-and-models/',
            },
            {
              label: 'MCP and Diagnostics',
              link: '/docs/guides/mcp-and-diagnostics/',
            },
            {
              label: 'Task Notifications',
              link: '/docs/guides/notifications/',
            },
          ],
        },
        { label: 'Troubleshooting', link: '/docs/guides/troubleshooting/' },
        { label: 'Changelog', link: '/docs/changelog/' },
        { label: 'FAQ', link: '/docs/faq/' },
      ],
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: true,
          // Custom Astro/Starlight pages and the marketing home cannot be
          // validated by the plugin, so links to them are excluded.
          exclude: [
            '/',
            '/about',
            '/about/',
            '/download',
            '/download/',
            '/support',
            '/support/',
            '/security',
            '/security/',
            '/privacy-policy',
            '/privacy-policy/',
            '/terms-and-conditions',
            '/terms-and-conditions/',
          ],
        }),
        starlightLlmsTxt({
          projectName: 'OpenCode Mobile',
          description:
            'Community-built Android and iOS client for an OpenCode server you run. Covers installation, configuration, remote access, security, and troubleshooting.',
          details:
            'OpenCode Mobile is not an official OpenCode product. It connects to a self-hosted OpenCode server. Start with the documentation hub, then follow the getting-started or remote-access material as needed.',
          optionalLinks: [
            {
              label: 'Documentation hub',
              url: 'https://getopencode.app/docs/',
              description: 'task-oriented index of the documentation',
            },
            {
              label: 'Download OpenCode Mobile',
              url: 'https://getopencode.app/download/',
              description: 'Google Play, direct APK, or iOS TestFlight beta',
            },
            {
              label: 'Source code',
              url: 'https://github.com/alvarolorentedev/opencode-mobile',
              description: 'the open-source mobile client',
            },
          ],
          customSets: [
            {
              label: 'Getting started and installation',
              paths: [
                'docs',
                'docs/introduction',
                'docs/opencode-android-app',
                'docs/getting-started',
                'docs/features',
              ],
              description:
                'install the app and complete a first task against your OpenCode server',
            },
            {
              label: 'Remote access and security',
              paths: [
                'docs/remote-access',
                'docs/guides/use-opencode-from-phone',
                'docs/guides/local-network',
                'docs/guides/tailscale',
                'docs/guides/cloudflare-tunnel',
                'docs/guides/reverse-proxy',
                'docs/guides/ssh-forward',
                'docs/guides/remote-access-security',
                'docs/guides/mobile-vs-web',
              ],
              description:
                'connect to a server over LAN, Tailscale, Cloudflare Tunnel, reverse proxy, or SSH and secure it',
            },
            {
              label: 'Using the app',
              paths: [
                'docs/user-manual',
                'docs/guides/tasks',
                'docs/guides/sessions',
                'docs/guides/approvals-and-changes',
                'docs/guides/voice',
                'docs/guides/usage',
                'docs/guides/workspace-files',
                'docs/guides/terminal',
                'docs/guides/worktrees',
                'docs/guides/providers-and-models',
                'docs/guides/mcp-and-diagnostics',
                'docs/guides/notifications',
              ],
              description: 'operate tasks, sessions, files, terminal, providers, and notifications',
            },
            {
              label: 'Troubleshooting and reference',
              paths: [
                'docs/guides/troubleshooting',
                'docs/faq',
                'docs/changelog',
              ],
              description: 'fix connection problems, answer common questions, and check compatibility',
            },
          ],
        }),
      ],
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#131111' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: SOCIAL_CARD },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:alt', content: 'OpenCode Mobile' },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: SOCIAL_CARD },
        },
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
          },
        },
        {
          tag: 'script',
          content:
            `window.dataLayer=window.dataLayer||[];` +
            `function gtag(){dataLayer.push(arguments);}` +
            `gtag('js',new Date());` +
            `gtag('config','${GA_ID}',{anonymize_ip:true});`,
        },
      ],
    }),
    sitemap({
      serialize(item) {
        const lastmod = lastmodMap.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
