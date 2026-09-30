import { GITHUB_URL } from './site';

/**
 * Shared primary navigation, used by both the marketing header (`SiteNav`)
 * and the docs header (`StarlightSocialIcons`) so the two never drift.
 */
export const navLinks = [
  { label: 'Get Started', href: '/docs/getting-started/' },
  { label: 'Docs', href: '/docs/' },
  { label: 'Features', href: '/docs/features/' },
  { label: 'Support', href: '/support/' },
];

export const downloadLink = { label: 'Download', href: '/download/' };

export const githubLink = { label: 'GitHub', href: GITHUB_URL };
