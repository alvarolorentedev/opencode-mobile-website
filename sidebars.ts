import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'introduction',
    'getting-started',
    'features',
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
    'remote-access',
    'faq',
  ],
};

export default sidebars;
