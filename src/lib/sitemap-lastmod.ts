import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function explicitDate(file: string): string | undefined {
  try {
    const raw = readFileSync(file, 'utf8');
    const block = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!block) return undefined;
    return (
      block[1].match(/^lastUpdated:\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ??
      block[1].match(/^\s*date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1]
    );
  } catch {
    return undefined;
  }
}

function gitDate(file: string): string | undefined {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${file}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined;
  } catch {
    return undefined;
  }
}

function mtimeDate(file: string): string | undefined {
  try {
    return statSync(file).mtime.toISOString().slice(0, 10);
  } catch {
    return undefined;
  }
}

function fileDate(file: string): string | undefined {
  return explicitDate(file) ?? gitDate(file) ?? mtimeDate(file);
}

/**
 * Maps every content/page URL to a modification date: the explicit
 * `lastUpdated` (or legacy `last_update.date`) frontmatter value when present,
 * otherwise the file's last git commit date, otherwise its filesystem mtime.
 */
export function buildLastmodMap(): Map<string, string> {
  const map = new Map<string, string>();
  const docsRoot = 'src/content/docs/docs';

  for (const file of walk(docsRoot)) {
    if (!file.endsWith('.md')) continue;
    let rel = file.slice(docsRoot.length + 1).replace(/\.md$/, '');
    if (rel === 'index') rel = '';
    const url = `/docs/${rel ? `${rel}/` : ''}`.replace(/\/+/g, '/');
    const date = fileDate(file);
    if (date) map.set(url, date);
  }

  for (const file of walk('src/pages')) {
    const base = file.split('/').pop() ?? '';
    if (base.includes('.module.') || base.endsWith('.ts')) continue;
    const name = base.replace(/\.(md|astro)$/, '');
    if (name === '404') continue;
    const url = name === 'index' ? '/' : `/${name}/`;
    const date = fileDate(file);
    if (date) map.set(url, date);
  }

  return map;
}

