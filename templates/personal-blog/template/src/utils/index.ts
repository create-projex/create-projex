import { type CollectionEntry } from 'astro:content';
import { format } from 'date-fns';
import readingTime from 'reading-time';

export type BlogPost = CollectionEntry<'blog'>;

export function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function getReadingTime(content: string): string {
  const stats = readingTime(content);
  return stats.text;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
  });
}

export function getPublishedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(post => !post.data.draft);
}

export function getFeaturedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(post => post.data.featured && !post.data.draft);
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.data.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getAllCategories(posts: BlogPost[]): string[] {
  const categories = new Set<string>();
  posts.forEach(post => {
    post.data.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
}

export function getPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => 
    post.data.tags.includes(tag) && !post.data.draft
  );
}

export function getPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter(post => 
    post.data.categories.includes(category) && !post.data.draft
  );
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
