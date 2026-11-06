import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readBuild(path) {
  return readFile(new URL(`../build/${path}`, import.meta.url), 'utf8');
}

test('llms.txt leads with canonical facts and install links', async () => {
  const llms = await readBuild('llms.txt');
  assert.match(llms, /## Canonical facts/);
  assert.match(llms, /## Install/);
  assert.match(llms, /## Quick start/);
  assert.match(llms, /not built by, endorsed by, or affiliated/);
  assert.match(
    llms,
    /https:\/\/play\.google\.com\/store\/apps\/details\?id=app\.getopencode/,
  );
  assert.match(llms, /https:\/\/testflight\.apple\.com\/join\/ddcE5Wzz/);
  assert.doesNotMatch(llms, /\]\(\/(?!\/)/);
});

test('homepage FAQ is machine-readable', async () => {
  const html = await readBuild('index.html');
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /Which devices are supported\?/);
  assert.match(html, /"@type":"WebPage"/);
});

test('marketing pages expose the llms.txt alternate and a WebPage entity', async () => {
  const pages = [
    'index.html',
    'download/index.html',
    'about/index.html',
    'support/index.html',
    'security/index.html',
  ];
  for (const page of pages) {
    const html = await readBuild(page);
    assert.match(
      html,
      /rel="alternate"[^>]*type="text\/plain"[^>]*llms\.txt/,
      `${page} is missing the llms.txt alternate`,
    );
    assert.match(
      html,
      /"@type":"WebPage"/,
      `${page} is missing WebPage JSON-LD`,
    );
  }
});

test('the mobile application entity exposes install and license facts', async () => {
  const html = await readBuild('index.html');
  assert.match(html, /"installUrl":"https:\/\/play\.google\.com/);
  assert.match(
    html,
    /"license":"https:\/\/www\.apache\.org\/licenses\/LICENSE-2\.0"/,
  );
});

test('the docs hub has stable raw Markdown aliases', async () => {
  const redirects = await readFile(
    new URL('../static/_redirects', import.meta.url),
    'utf8',
  );
  assert.match(redirects, /^\/docs\/\.md\s+\/docs\.md\s+301$/m);
  assert.match(redirects, /^\/docs\/index\.md\s+\/docs\.md\s+301$/m);

  const hub = await readBuild('docs.md');
  assert.match(hub, /^canonical: "https:\/\/getopencode\.app\/docs\/"/m);
});
