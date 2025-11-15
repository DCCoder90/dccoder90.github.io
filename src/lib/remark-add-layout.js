import { visit } from 'unist-util-visit';
import path from 'path';

export default () => (tree, file) => {
  if (!file.data.astro.frontmatter.layout) {
    // Calculate relative path from file to layout based on file location
    const filePath = file.history[0];
    const postsDir = path.join(process.cwd(), 'src', 'pages', 'posts');
    const projectsDir = path.join(process.cwd(), 'src', 'pages', 'projects');

    // Determine if this is a post or project
    let layoutPath;
    if (filePath.startsWith(projectsDir)) {
      // Use ProjectLayout for project markdown files
      layoutPath = path.join(process.cwd(), 'src', 'layouts', 'ProjectLayout.astro');
    } else if (filePath.startsWith(postsDir)) {
      // Use MarkdownPostLayout for post markdown files
      layoutPath = path.join(process.cwd(), 'src', 'layouts', 'MarkdownPostLayout.astro');
    } else {
      // Default to MarkdownPostLayout if not in either directory
      layoutPath = path.join(process.cwd(), 'src', 'layouts', 'MarkdownPostLayout.astro');
    }

    // Calculate relative path from current file to layout
    const relativePath = path.relative(path.dirname(filePath), layoutPath);

    // Convert Windows paths to Unix-style for Astro
    file.data.astro.frontmatter.layout = relativePath.replace(/\\/g, '/');
  }
};