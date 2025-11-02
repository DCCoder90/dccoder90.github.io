import rss from '@astrojs/rss';
import { siteConfig } from '../config';

export async function GET(context) {
  const posts = import.meta.glob('./posts/**/*.md', { eager: true });

  const sortedPosts = Object.values(posts)
    .map(post => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description || post.frontmatter.excerpt || '',
      pubDate: new Date(post.frontmatter.date),
      link: post.frontmatter.permalink || post.url,
    }))
    .sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: `${siteConfig.name} | Blog`,
    description: `${siteConfig.name} blog posts and articles.`,
    site: context.site,
    items: sortedPosts,
    customData: `<language>en-us</language>`,
  });
}