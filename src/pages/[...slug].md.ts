import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs');
  return docs.map((entry) => ({
    params: { slug: entry.id },
    props: { body: entry.body ?? '' },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  return new Response((props as { body: string }).body, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
