import assert from 'node:assert/strict';
import test from 'node:test';

import { faqItemsFromMarkdown } from '../src/lib/faq.mjs';

const markdown = `Intro paragraph.

## Is OpenCode Mobile official?

No. It is a community-built companion.

## How do I connect?

Use [Remote Access](/docs/remote-access/) over Tailscale or Cloudflare.
`;

test('faqItemsFromMarkdown extracts questions and answers', () => {
  const items = faqItemsFromMarkdown(markdown);
  assert.equal(items.length, 2);
  assert.equal(items[0].question, 'Is OpenCode Mobile official?');
  assert.equal(items[0].answer, 'No. It is a community-built companion.');
  assert.match(items[1].answer, /Remote Access over Tailscale/);
});

test('faqItemsFromMarkdown ignores the introduction and empty answers', () => {
  const items = faqItemsFromMarkdown('Intro only.\n\n## Empty question\n\n## Real\n\nAnswer.');
  assert.deepEqual(items, [{ question: 'Real', answer: 'Answer.' }]);
});
