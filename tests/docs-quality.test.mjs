import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const docsRoot = new URL('../src/content/docs/docs/', import.meta.url);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const url = new URL(entry.name, directory);
    if (entry.isDirectory()) {
      files.push(...(await walk(new URL(`${entry.name}/`, directory))));
    } else if (entry.name.endsWith('.md')) {
      files.push(url);
    }
  }
  return files;
}

function frontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (field) fields[field[1]] = field[2].replace(/^['"]|['"]$/g, '');
  }
  return fields;
}

test('documentation pages have unique titles and useful descriptions', async () => {
  const pages = await walk(docsRoot);
  const titles = new Map();
  for (const page of pages) {
    const markdown = await readFile(page, 'utf8');
    const data = frontmatter(markdown);
    assert.ok(data.title, `${page.pathname} is missing a title`);
    assert.ok(data.description, `${page.pathname} is missing a description`);
    assert.ok(
      data.description.length >= 50 && data.description.length <= 190,
      `${page.pathname} description should be 50-190 characters`,
    );
    const previous = titles.get(data.title);
    assert.equal(previous, undefined, `duplicate title: ${data.title}`);
    titles.set(data.title, page.pathname);
  }
});

test('documentation does not contain known stale claims', async () => {
  const pages = await walk(docsRoot);
  const stale = [
    'OpenCode 2.x (V2) currently does not expose the file-save API',
    'compatible OpenCode 1.x (V1) servers can expose text-file editing',
    'It is a compact line console',
    'does not emulate VT cursor behavior',
    'Workspace → Chats',
    'latest public release is **1.0.34**',
    'on first launch, onboarding guides you through **Welcome**, **Connect**, **Workspace**',
    'Settings → Advanced',
    'Settings → Voice & responses',
    'remembered sessions',
    'eight languages',
    'Load earlier messages',
    'Archive, restore, and share actions currently depend',
    'LSP and formatter diagnostics are V1-only',
    'Reset and the optional start command are available only',
    'Windows uses `28894`',
    'slim interface',
    'paste the pairing link into the app',
    'sessions come from the active server',
    'opencode service set port 4096',
  ];
  for (const page of pages) {
    const markdown = await readFile(page, 'utf8');
    for (const phrase of stale) {
      assert.ok(
        !markdown.includes(phrase),
        `${page.pathname} contains stale claim: ${phrase}`,
      );
    }
  }
});

test('setup docs prioritize the OpenCode 2 shared service and pairing', async () => {
  const setup = await readFile(
    new URL('getting-started.md', docsRoot),
    'utf8',
  );
  assert.match(setup, /opencode service start/);
  assert.match(setup, /opencode service status/);
  assert.match(setup, /opencode pair/);
  assert.match(setup, /opencode serve/);
  assert.match(setup, /OpenCode 2 is the current primary target/);
});

test('setup docs start from the existing OpenCode setup', async () => {
  const setup = await readFile(
    new URL('getting-started.md', docsRoot),
    'utf8',
  );
  for (const path of [
    'I use OpenCode Desktop',
    'I use the TUI or CLI',
    'I already have a reachable OpenCode server',
    'I need to enable remote connectivity',
  ]) {
    assert.ok(setup.includes(path), `getting-started.md is missing "${path}"`);
  }
  assert.match(setup, /Settings → Pairing/);
  assert.match(setup, /opencode pair --url/);
  assert.doesNotMatch(setup, /28894/);
});

test('Tailscale docs lead with the one-command direct route', async () => {
  const guide = await readFile(
    new URL('guides/tailscale.md', docsRoot),
    'utf8',
  );
  const firstCommand = guide.match(/```bash\n([\s\S]*?)```/);
  assert.ok(firstCommand, 'tailscale.md has no bash example');
  assert.match(firstCommand[1], /opencode pair --url http:\/\/<tailscale-ip-or-magicdns>:<port>/);
  assert.match(guide, /Optional: add HTTPS with Tailscale Serve/);
  assert.doesNotMatch(guide, /28894/);
  assert.doesNotMatch(guide, /opencode service set port 4096/);
});

test('FAQ covers onboarding, Desktop, and multiple-server questions', async () => {
  const faq = await readFile(new URL('faq.md', docsRoot), 'utf8');
  for (const question of [
    'Can I continue a conversation started in Desktop or the TUI?',
    'Can I pair directly from OpenCode Desktop?',
    'Why do I not see all the servers configured in Desktop?',
    'Do I need to keep Desktop or the TUI running?',
    'Do I need Cloud Link to use OpenCode Mobile remotely?',
    'Why does my pairing link expire?',
    'How do I renew an expired authenticated session?',
    'Can I use Tailscale without Tailscale Serve?',
    'Can I connect to multiple OpenCode servers?',
  ]) {
    assert.ok(faq.includes(`## ${question}`), `faq.md is missing "${question}"`);
  }
});

test('new documentation entry points exist and are linked from the hub', async () => {
  const required = [
    'connections.md',
    'cloud-link.md',
    'for-ai-agents.md',
    'guides/desktop-and-tui.md',
    'guides/multiple-servers.md',
    'guides/projects.md',
    'guides/settings.md',
    'guides/extensions.md',
    'guides/auto-model-routing.md',
    'guides/share-from-other-apps.md',
    'guides/quick-actions-and-widgets.md',
    'guides/deep-links.md',
  ];
  for (const file of required) {
    await readFile(new URL(file, docsRoot), 'utf8');
  }

  const index = await readFile(new URL('index.md', docsRoot), 'utf8');
  for (const link of [
    '/docs/connections/',
    '/docs/cloud-link/',
    '/docs/for-ai-agents/',
    '/docs/guides/desktop-and-tui/',
    '/docs/guides/multiple-servers/',
    '/docs/guides/settings/',
    '/docs/guides/extensions/',
    '/docs/guides/auto-model-routing/',
  ]) {
    assert.ok(index.includes(link), `documentation hub is missing ${link}`);
  }
});

test('Cloud Link docs reference the product website', async () => {
  for (const file of ['cloud-link.md', 'getting-started.md', 'connections.md', 'remote-access.md', 'faq.md']) {
    const contents = await readFile(new URL(file, docsRoot), 'utf8');
    assert.match(
      contents,
      /https:\/\/opencodecloud\.link\//,
      `${file} is missing a reference to the Cloud Link website`,
    );
  }
});

test('generated llms files use absolute links and corrected project notes', async () => {
  const llms = await readFile(new URL('../build/llms.txt', import.meta.url), 'utf8');
  assert.doesNotMatch(llms, /official documentation/i);
  assert.match(llms, /independent, community-built project/i);
  assert.match(
    llms,
    /https:\/\/getopencode\.app\/docs\/for-ai-agents\//,
  );

  for (const file of ['llms-full.txt', 'llms-small.txt']) {
    const contents = await readFile(
      new URL(`../build/${file}`, import.meta.url),
      'utf8',
    );
    assert.doesNotMatch(contents, /\]\(\/(?!\/)/);
    assert.doesNotMatch(contents, /Section titled/);
  }
});

test('raw Markdown includes canonical frontmatter and is marked noindex', async () => {
  const markdown = await readFile(
    new URL('../build/docs/getting-started.md', import.meta.url),
    'utf8',
  );
  assert.match(markdown, /^---\n/);
  assert.match(markdown, /^canonical: "https:\/\/getopencode\.app\/docs\/getting-started\/"/m);
  assert.match(markdown, /^lastUpdated: "2026-11-24"/m);

  const headers = await readFile(
    new URL('../static/_headers', import.meta.url),
    'utf8',
  );
  assert.match(headers, /\/\*\.md[\s\S]*X-Robots-Tag: noindex/);
});

test('sitemap contains the new documentation routes', async () => {
  const sitemap = await readFile(
    new URL('../build/sitemap-0.xml', import.meta.url),
    'utf8',
  );
  for (const route of [
    'https://getopencode.app/docs/connections/',
    'https://getopencode.app/docs/cloud-link/',
    'https://getopencode.app/docs/for-ai-agents/',
    'https://getopencode.app/docs/guides/desktop-and-tui/',
    'https://getopencode.app/docs/guides/multiple-servers/',
    'https://getopencode.app/docs/guides/settings/',
  ]) {
    assert.ok(sitemap.includes(route), `sitemap is missing ${route}`);
  }
});
