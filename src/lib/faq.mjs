function stripMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function faqItemsFromMarkdown(markdown) {
  const items = [];
  let question = null;
  let answer = [];

  for (const line of markdown.split('\n')) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      if (question) items.push({ question, answer: stripMarkdown(answer.join(' ')) });
      question = stripMarkdown(h2[1]);
      answer = [];
      continue;
    }
    if (/^#{1,6}\s/.test(line)) continue;
    if (question && line.trim()) answer.push(line.trim());
  }
  if (question) items.push({ question, answer: stripMarkdown(answer.join(' ')) });

  return items.filter((item) => item.answer.length > 0);
}
