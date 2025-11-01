import { visit } from 'unist-util-visit';

export default () => (tree, file) => {
  if (!file.data.astro.frontmatter.layout) {
    file.data.astro.frontmatter.layout = '../../layouts/MarkdownPostLayout.astro';
  }
};