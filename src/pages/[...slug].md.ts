import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

function canonicalFor(id: string) {
  return id === 'docs' ? `${SITE}/docs/` : `${SITE}/${id}/`;
}

function dateValue(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  return undefined;
}

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs');
  return docs.map((entry) => {
    const canonical = canonicalFor(entry.id);
    const lastUpdated = dateValue(entry.data.lastUpdated);
    const frontmatter = [
      '---',
      `title: ${JSON.stringify(entry.data.title)}`,
      `description: ${JSON.stringify(entry.data.description)}`,
      `canonical: ${JSON.stringify(canonical)}`,
      ...(lastUpdated ? [`lastUpdated: ${JSON.stringify(lastUpdated)}`] : []),
      '---',
      '',
    ].join('\n');

    return {
      params: { slug: entry.id },
      props: {
        body: `${frontmatter}${entry.body ?? ''}`,
        canonical,
      },
    };
  });
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { body, canonical } = props as {
    body: string;
    canonical: string;
  };
  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'link': `<${canonical}>; rel="canonical"`,
      'x-robots-tag': 'noindex',
    },
  });
};
