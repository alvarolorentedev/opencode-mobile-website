import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pages = ['/', '/privacy-policy/', '/terms-and-conditions/'];

async function pageText(route) {
  const clean = route.replace(/^\/+|\/+$/g, '');
  const path = `../build/${clean ? `${clean}/` : ''}index.html`;
  return readFile(new URL(path, import.meta.url), 'utf8');
}

test('landing and legal pages say the project is not affiliated with OpenCode', async () => {
  for (const route of pages) {
    const html = await pageText(route);
    assert.match(
      html,
      /not built by[^<]*OpenCode team[^<]*not affiliated/i,
      `${route} is missing the affiliation disclaimer`,
    );
  }
});

test('the landing hero carries its own affiliation note', async () => {
  const html = await pageText('/');
  assert.match(html, /affiliationNote/, 'landing hero is missing the affiliation note');
  assert.match(html, /Independent project[^<]*OpenCode team/);
});

test('every page footer carries the affiliation disclaimer', async () => {
  for (const route of pages) {
    const html = await pageText(route);
    assert.match(html, /site-footer__disclaimer/, `${route} footer is missing the disclaimer`);
  }
});
