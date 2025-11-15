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

// Get all projects at build-time
const allProjects = import.meta.glob('../pages/projects/*.md', { eager: true });

// Build post index - filter out any modules without frontmatter
const postIndex: SearchItem[] = Object.values(allPosts)
  .filter((post: any) => post && post.frontmatter && post.frontmatter.title)
  .map((post: any) => ({
    type: 'post' as const,
    title: post.frontmatter.title,
    description: post.frontmatter.description || '',
    tags: post.frontmatter.tags || [],
    date: post.frontmatter.date,
    url: post.frontmatter.permalink || post.url,
  }));

// Build project index - filter out any modules without frontmatter
const projectIndex: SearchItem[] = Object.values(allProjects)
  .filter((project: any) => project && project.frontmatter && project.frontmatter.title)
  .map((project: any) => ({
    type: 'project' as const,
    title: project.frontmatter.title,
    description: project.frontmatter.description || '',
    tags: project.frontmatter.tags || [],
    date: project.frontmatter.start,
    url: project.frontmatter.permalink || project.url,
  }));

// Export combined search index - Compiled at build-time
export const searchIndex: SearchItem[] = [...postIndex, ...projectIndex];
