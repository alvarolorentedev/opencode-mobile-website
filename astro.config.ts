import { defineConfig } from 'astro/config';
import type { AstroIntegration } from 'astro';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightLinksValidator from 'starlight-links-validator';
import starlightLlmsTxt from 'starlight-llms-txt';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLastmodMap } from './src/lib/sitemap-lastmod';

const SITE = 'https://getopencode.app';
const GA_ID = 'G-WS6H4XMXGG';
const SOCIAL_CARD = `${SITE}/img/opencode-mobile-social-card.jpg`;
const lastmodMap = buildLastmodMap();

/**
 * The llms plugin hardcodes a claim that the generated files are "official
 * documentation". This project is independent, so correct that text and make
 * every internal link absolute for agents that read the generated files
 * outside the website context.
 */
function llmsTxtFixes(): AstroIntegration {
  return {
    name: 'llms-txt-fixes',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const outputFiles = ['llms.txt', 'llms-small.txt', 'llms-full.txt'];
        const topicDir = join(outDir, '_llms-txt');
        const topicFiles = await readdir(topicDir).catch(() => []);
        for (const file of topicFiles) {
          if (file.endsWith('.txt')) outputFiles.push(join('_llms-txt', file));
        }

        for (const relativeFile of outputFiles) {
          const file = join(outDir, relativeFile);
          let contents: string;
          try {
            contents = await readFile(file, 'utf8');
          } catch {
            continue;
          }

          contents = contents.replace(
            /## Notes\n\n- The complete documentation includes all content from the official documentation\n- The content is automatically generated from the same source as the official documentation/,
            `## Notes

- OpenCode Mobile is an independent, community-built project. It is not built by, endorsed by, or affiliated with the OpenCode team.
- These files are generated from the same Markdown source as the public documentation at ${SITE}/docs/.
- Use the GitHub Releases page for the current app version and release history: https://github.com/alvarolorentedev/opencode-mobile/releases.`,
          );

          contents = contents
            .replace(/\]\(\/(?!\/)/g, `](${SITE}/`)
            .replace(/\[Section titled “[^”]*”\]\([^)]*\)/g, '')
            .replace(/\n{3,}/g, '\n\n');
          await writeFile(file, contents, 'utf8');
        }
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  // The testing deployment is served through this hostname. This only affects
  // `astro dev` and `astro preview`; the production build is static.
  server: {
    allowedHosts: ['landing.alvarolorente.dev'],
  },
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
        Header: './src/components/StarlightHeader.astro',
        Head: './src/components/StarlightHead.astro',
        SocialIcons: './src/components/StarlightSocialIcons.astro',
        ThemeProvider: './src/components/StarlightThemeProvider.astro',
        ThemeSelect: './src/components/StarlightThemeSelect.astro',
      },
      customCss: [
        './src/styles/tokens.css',
        './src/styles/nav.css',
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Documentation home', link: '/docs/' },
            { label: 'What is OpenCode Mobile?', link: '/docs/introduction/' },
            { label: 'Download and install', link: '/docs/opencode-android-app/' },
            { label: 'Set up and run a first task', link: '/docs/getting-started/' },
            { label: 'Features and guides', link: '/docs/features/' },
          ],
        },
        {
          label: 'Connect',
          items: [
            {
              label: 'Choose a route',
              items: [
                { label: 'Remote access overview', link: '/docs/remote-access/' },
                {
                  label: 'Use OpenCode from your phone',
                  link: '/docs/guides/use-opencode-from-phone/',
                },
                { label: 'Mobile vs web', link: '/docs/guides/mobile-vs-web/' },
              ],
            },
            {
              label: 'Connection methods',
              items: [
                { label: 'Add or switch connections', link: '/docs/connections/' },
                { label: 'Local network', link: '/docs/guides/local-network/' },
                { label: 'Tailscale', link: '/docs/guides/tailscale/' },
                {
                  label: 'Cloudflare Tunnel',
                  link: '/docs/guides/cloudflare-tunnel/',
                },
                {
                  label: 'Reverse proxy and API prefix',
                  link: '/docs/guides/reverse-proxy/',
                },
                { label: 'SSH forwarding', link: '/docs/guides/ssh-forward/' },
                { label: 'Cloud Link', link: '/docs/cloud-link/' },
              ],
            },
            {
              label: 'Remote access security',
              link: '/docs/guides/remote-access-security/',
            },
          ],
        },
        {
          label: 'Use the app',
          items: [
            { label: 'User manual', link: '/docs/user-manual/' },
            {
              label: 'Everyday work',
              items: [
                { label: 'Tasks and progress', link: '/docs/guides/tasks/' },
                { label: 'Chats and sessions', link: '/docs/guides/sessions/' },
                {
                  label: 'Approvals and changes',
                  link: '/docs/guides/approvals-and-changes/',
                },
                { label: 'Voice', link: '/docs/guides/voice/' },
                { label: 'Session usage', link: '/docs/guides/usage/' },
                { label: 'Notifications', link: '/docs/guides/notifications/' },
              ],
            },
            {
              label: 'Projects and tools',
              items: [
                { label: 'Projects', link: '/docs/guides/projects/' },
                { label: 'Project files', link: '/docs/guides/workspace-files/' },
                { label: 'Terminal', link: '/docs/guides/terminal/' },
                { label: 'Worktrees', link: '/docs/guides/worktrees/' },
              ],
            },
            {
              label: 'Device features',
              items: [
                {
                  label: 'Share from other apps',
                  link: '/docs/guides/share-from-other-apps/',
                },
                {
                  label: 'Quick actions and widgets',
                  link: '/docs/guides/quick-actions-and-widgets/',
                },
                { label: 'Deep links', link: '/docs/guides/deep-links/' },
              ],
            },
          ],
        },
        {
          label: 'Configure',
          items: [
            { label: 'Settings and customization', link: '/docs/guides/settings/' },
            {
              label: 'Providers and models',
              link: '/docs/guides/providers-and-models/',
            },
            {
              label: 'Automatic model routing',
              link: '/docs/guides/auto-model-routing/',
            },
            {
              label: 'Extensions',
              link: '/docs/guides/extensions/',
            },
            {
              label: 'MCP and diagnostics',
              link: '/docs/guides/mcp-and-diagnostics/',
            },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Troubleshooting', link: '/docs/guides/troubleshooting/' },
            { label: 'FAQ', link: '/docs/faq/' },
            { label: 'Releases and compatibility', link: '/docs/changelog/' },
            { label: 'For AI assistants', link: '/docs/for-ai-agents/' },
          ],
        },
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
            'Community-built Android and iOS client for an OpenCode server you run. Covers installation, connections, Cloud Link, chats, projects, terminal, voice, notifications, security, and troubleshooting.',
          details: [
            'OpenCode Mobile is an independent, community-built Android and iOS client for an OpenCode server that you run. It is not built by, endorsed by, or affiliated with the OpenCode team.',
            '',
            '## Canonical facts',
            '',
            '- **What it is:** a mobile client for an OpenCode server; it is not a hosted AI service and does not replace the server.',
            '- **Server requirement:** the user must provide a reachable OpenCode server and credentials.',
            '- **OpenCode contracts:** 2.x (V2) is the current primary target; 1.x (V1) remains supported with manual connections for the core surface.',
            '- **Platforms:** Android through Google Play or direct APK (arm64-v8a only), and iOS through the TestFlight beta.',
            '- **Cost and license:** the app is free and open source under Apache-2.0. Cloud Link is an optional paid managed remote-access service for store installs only; product details are at https://opencodecloud.link/.',
            '- **Current release:** use GitHub Releases for the version and release history: https://github.com/alvarolorentedev/opencode-mobile/releases',
            '',
            '## Install',
            '',
            '- **Android (recommended):** [Google Play](https://play.google.com/store/apps/details?id=app.getopencode)',
            '- **Android (direct APK):** [latest release APK](https://github.com/alvarolorentedev/opencode-mobile/releases/latest/download/opencode-mobile.apk)',
            '- **iOS beta:** [TestFlight](https://testflight.apple.com/join/ddcE5Wzz)',
            '- **Release notes:** [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases)',
            '',
            '## Quick start',
            '',
            '1. Install the app on Android or iOS.',
            '2. On the machine that runs OpenCode 2, run `opencode service start` and `opencode pair`.',
            '3. Scan the QR code or enter the server URL and credentials in the app.',
            '4. Select a project and send a small task.',
            '',
            'Start with the documentation hub at https://getopencode.app/docs/ for the complete setup path.',
          ].join('\n'),
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
              label: 'Source code and releases',
              url: 'https://github.com/alvarolorentedev/opencode-mobile',
              description: 'the open-source mobile client and its release history',
            },
            {
              label: 'OpenCode Cloud Link',
              url: 'https://opencodecloud.link/',
              description: 'connector downloads, platform support, pricing, and Cloud Link documentation',
            },
            {
              label: 'For AI assistants',
              url: 'https://getopencode.app/docs/for-ai-agents/',
              description: 'canonical facts and machine-readable documentation endpoints',
            },
          ],
          promote: [
            'docs',
            'docs/getting-started',
            'docs/introduction',
            'docs/connections',
            'docs/remote-access',
            'docs/cloud-link',
            'docs/user-manual',
          ],
          demote: ['docs/changelog', 'docs/faq'],
          exclude: ['docs/changelog'],
          customSets: [
            {
              label: 'Start here and installation',
              paths: [
                'docs',
                'docs/features',
                'docs/introduction',
                'docs/opencode-android-app',
                'docs/getting-started',
                'docs/connections',
              ],
              description:
                'choose the right path, install the app, connect a server, and complete a first task',
            },
            {
              label: 'Connect and secure',
              paths: [
                'docs/remote-access',
                'docs/cloud-link',
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
                'choose LAN, Tailscale, Cloudflare Tunnel, a reverse proxy, SSH, or Cloud Link and secure the route',
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
                'docs/guides/notifications',
                'docs/guides/projects',
                'docs/guides/workspace-files',
                'docs/guides/terminal',
                'docs/guides/worktrees',
                'docs/guides/share-from-other-apps',
                'docs/guides/quick-actions-and-widgets',
                'docs/guides/deep-links',
              ],
              description:
                'operate chats, approvals, projects, files, terminal, voice, notifications, sharing, widgets, and deep links',
            },
            {
              label: 'Configure, troubleshoot, and reference',
              paths: [
                'docs/guides/settings',
                'docs/guides/providers-and-models',
                'docs/guides/mcp-and-diagnostics',
                'docs/guides/troubleshooting',
                'docs/faq',
                'docs/changelog',
                'docs/for-ai-agents',
              ],
              description:
                'configure the app and server capabilities, fix problems, check compatibility, and find machine-readable documentation',
            },
          ],
        }),
      ],
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#131111' } },
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
    llmsTxtFixes(),
    sitemap({
      serialize(item) {
        const lastmod = lastmodMap.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
