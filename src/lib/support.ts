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

export const githubSponsorsUrl = httpsUrl(
  process.env.GITHUB_SPONSORS_URL ||
    'https://github.com/sponsors/alvarolorentedev',
);
export const kofiUrl = httpsUrl(
  process.env.KOFI_URL || 'https://ko-fi.com/alvarolorentedev',
);
export const kofiEmbedUrl = kofiWidgetUrl(kofiUrl);
