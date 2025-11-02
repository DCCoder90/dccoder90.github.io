import { visit } from 'unist-util-visit';
import path from 'path';

export default () => (tree, file) => {
  const frontmatter = file.data.astro.frontmatter;
  if (!frontmatter.date) return;

  // Parse date string directly to avoid timezone conversion issues
  const [year, month, day] = frontmatter.date.split('-');

  visit(tree, 'image', (node) => {
    if (node.url.startsWith('/') || node.url.includes('://') || node.url.startsWith('../')) {
      return;
    }
    // Public folder files are served from root, so /imgs/... not /public/imgs/...
    node.url = `/imgs/posts/${year}/${month}/${day}/${node.url}`;
  });
};