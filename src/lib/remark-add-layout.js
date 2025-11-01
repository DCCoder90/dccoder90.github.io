import { visit } from 'unist-util-visit';
import path from 'path';

export default () => (tree, file) => {
  if (!file.data.astro.frontmatter.layout) {
    // Calculate relative path from file to layout based on file depth
    const filePath = file.history[0];
    const postsDir = path.join(process.cwd(), 'src', 'pages', 'posts');
    const layoutPath = path.join(process.cwd(), 'src', 'layouts', 'MarkdownPostLayout.astro');

    // Calculate relative path from current file to layout
    const relativePath = path.relative(path.dirname(filePath), layoutPath);

    // Convert Windows paths to Unix-style for Astro
    file.data.astro.frontmatter.layout = relativePath.replace(/\\/g, '/');
  }
};