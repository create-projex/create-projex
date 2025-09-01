import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/config';
import { getPublishedPosts, sortPostsByDate } from '@/utils';

export async function GET(context) {
  const allPosts = await getCollection('blog');
  const publishedPosts = getPublishedPosts(allPosts);
  const sortedPosts = sortPostsByDate(publishedPosts);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: [...post.data.tags, ...post.data.categories],
      author: `${SITE.author.email} (${SITE.author.name})`,
    })),
    customData: `<language>en-us</language>`,
  });
}
