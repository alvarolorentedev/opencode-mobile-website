import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'introduction',
    'opencode-android-app',
    'getting-started',
    'features',
    {
      type: 'category',
      label: 'Connect remotely',
      link: {type: 'doc', id: 'remote-access'},
      items: [
        'guides/use-opencode-from-phone',
        'guides/tailscale',
        'guides/cloudflare-tunnel',
        'guides/remote-access-security',
        'guides/mobile-vs-web',
      ],
    },
    {
      type: 'category',
      label: 'Use the app',
      link: {type: 'doc', id: 'user-manual'},
      items: [
        'guides/tasks',
        'guides/sessions',
        'guides/approvals-and-changes',
        'guides/voice',
        'guides/usage',
        'guides/workspace-files',
        'guides/terminal',
        'guides/worktrees',
        'guides/providers-and-models',
        'guides/mcp-and-diagnostics',
        'guides/notifications',
      ],
    },
    'guides/troubleshooting',
    'changelog',
    'faq',
  ],
};

export default sidebars;
