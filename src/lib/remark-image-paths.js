import { visit } from 'unist-util-visit';
import path from 'path';

export default () => (tree, file) => {
  const frontmatter = file.data.astro.frontmatter;
  if (!frontmatter.date) return;

  // Parse date string directly to avoid timezone conversion issues
  const [year, month, day] = frontmatter.date.split('-');

  visit(tree, 'image', (node) => {
    // Skip absolute URLs and already processed paths
    if (node.url.startsWith('/') || node.url.includes('://')) {
      return;
    }

    // Get the markdown file's directory
    const filePath = file.history[0];
    const fileDir = path.dirname(filePath);

    // Find src directory
    const pathParts = filePath.split(path.sep);
    const srcIndex = pathParts.findIndex(part => part === 'src');

    if (srcIndex === -1) {
      console.warn(`Could not find src directory in path: ${filePath}`);
      return;
    }

    // Construct path to the image in src/assets
    const srcDir = pathParts.slice(0, srcIndex + 1).join(path.sep);
    const assetsImagePath = path.join(srcDir, 'assets', 'posts', year, month, day, node.url);

    // Generate relative path from markdown file to image
    const relativePath = path.relative(fileDir, assetsImagePath).replace(/\\/g, '/');

    node.url = relativePath;
  });
};