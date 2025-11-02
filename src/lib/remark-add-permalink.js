import path from 'path';

/**
 * Default pattern: /posts/YYYY/MM/DD-filename/
 */
export default () => (tree, file) => {
  const frontmatter = file.data.astro.frontmatter;

  // If permalink is already defined, use it
  if (frontmatter.permalink) {
    return;
  }


  const filePath = file.history[0];
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  const relativePath = path.relative(pagesDir, filePath);
  const normalizedPath = relativePath.replace(/\\/g, '/');
  const pathWithoutExt = normalizedPath.replace(/\.md$/, '');

  // Example: posts/2015/04/06-decoding-fan-remote-rf-signal
  // Becomes: /posts/2015/04/06-decoding-fan-remote-rf-signal/
  const permalink = `/${pathWithoutExt}/`;

  frontmatter.permalink = permalink;
};
