import { projects } from '../projects';

// Type definition for search items
export interface SearchItem {
  type: 'post' | 'project';
  title: string;
  description: string;
  tags: string[];
  date: string;
  url: string;
}

// Get all posts at build-time
const allPosts = import.meta.glob('../pages/posts/**/*.md', { eager: true });

// Build post index
const postIndex: SearchItem[] = Object.values(allPosts).map((post: any) => ({
  type: 'post' as const,
  title: post.frontmatter.title,
  description: post.frontmatter.description || '',
  tags: post.frontmatter.tags || [],
  date: post.frontmatter.date,
  url: post.frontmatter.permalink || post.url,
}));

// Build project index
const projectIndex: SearchItem[] = projects.map(project => ({
  type: 'project' as const,
  title: project.name,
  description: project.description,
  tags: project.tags,
  date: project.startDate,
  url: project.link || '/projects',
}));

// Export combined search index - Compiled at build-time
export const searchIndex: SearchItem[] = [...postIndex, ...projectIndex];
