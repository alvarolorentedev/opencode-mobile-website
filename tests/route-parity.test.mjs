import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const baseline = JSON.parse(
  await readFile(new URL('./baseline-routes.json', import.meta.url), 'utf8'),
);

function outputPath(route) {
  const clean = route.replace(/^\/+|\/+$/g, '');
  return new URL(`../build/${clean ? `${clean}/` : ''}index.html`, import.meta.url);
}

test('every pre-migration route still builds (no SEO regression)', async () => {
  const missing = [];
  for (const route of baseline) {
    try {
      await access(outputPath(route));
    } catch {
      missing.push(route);
    }
  }
  assert.deepEqual(missing, [], `Missing routes: ${missing.join(', ')}`);
});

test('sitemap index, raw markdown, and llms.txt are generated', async () => {
  const expected = [
    '../build/sitemap-index.xml',
    '../build/llms.txt',
    '../build/docs/introduction.md',
  ];
  for (const file of expected) {
    await access(new URL(file, import.meta.url));
  }
});
