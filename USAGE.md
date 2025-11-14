# Usage Guide

This guide will help you use this repository as a template for your own developer portfolio and blog site.

## Table of Contents

- [Getting Started](#getting-started)
- [Removing Existing Data](#removing-existing-data)
- [Configuration](#configuration)
- [Creating Blog Posts](#creating-blog-posts)
- [Adding Images to Posts](#adding-images-to-posts)
- [Creating Projects](#creating-projects)
- [Adding Images to Projects](#adding-images-to-projects)
- [Tag System](#tag-system)
- [Customization](#customization)
- [Deployment](#deployment)
- [Progressive Web App (PWA)](#progressive-web-app-pwa)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation

1. Clone or fork this repository:
```bash
git clone https://github.com/dccoder90/dccoder90.github.io.git my-portfolio
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:4321`

### Build Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Removing Existing Data

Before making the site your own, you'll want to remove my details:

### 1. Delete Existing Blog Posts

```bash
# Delete all existing posts
rm -rf src/pages/posts/*

# Or on Windows
rmdir /s /q src\pages\posts
mkdir src\pages\posts
```

### 2. Delete Existing Projects

```bash
# Delete all existing projects
rm -rf src/pages/projects/*.md

# Or on Windows
del src\pages\projects\*.md
```

### 3. Remove Post Images

```bash
# Delete existing post images
rm -rf public/imgs/posts/*

# Or on Windows
rmdir /s /q public\imgs\posts
mkdir public\imgs\posts
```

### 4. Remove Project Images

```bash
rm src/assets/projects/*.*
```

## Configuration

### Site Configuration

Edit `src/config.ts` to customize your site:

```typescript
export const siteConfig = {
  author: "Your Name",                    // Your name
  title: "Your Site Title",               // Site title
  description: "Your site description",   // Site description for SEO
  lang: "en",
  ogLocale: "en_US",
  siteUrl: "https://yoursite.com",        // Your site URL
  githubUrl: "https://github.com/yourusername",
  linkedinUrl: "https://linkedin.com/in/yourprofile",
  twitterUrl: "https://twitter.com/yourhandle",  // Optional
  postsPerPage: 5,                        // Blog posts per page
  projectsPerRow: 3,                      // Projects per row in grid
  projectsRowsPerPage: 3,                 // Project rows per page (total = 9)
  menuLinks: [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Blog", path: "/posts" },
    { title: "Projects", path: "/projects" },
  ],
};
```

### PWA Configuration

Edit `public/manifest.json` to customize your PWA:

```json
{
  "name": "Your Site Name",
  "short_name": "YourSite",
  "description": "Your site description",
  "theme_color": "#0969da",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Note:** You'll need to create your own PWA icons at `public/icon-192.png` and `public/icon-512.png`.

### About Page

Edit `src/pages/about.astro` to add your own bio and information.

### Resume Page

Edit `src/pages/resume.astro` to add your resume information, or delete this page if you don't want it.

## Creating Blog Posts

### File Structure

Blog posts are organized hierarchically by date:

```
src/pages/posts/
  └── YYYY/
      └── MM/
          └── dd-title.md
```

Example: `src/pages/posts/2025/01/15-my-first-post.md`

### Post Frontmatter

Create a new markdown file with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-01-15"
tags: ["javascript", "tutorial", "webdev"]
description: "A brief description of your post for SEO and social media"
headerimage: "my-header-image.jpg"  # Optional
author: "Your Name"                  # Optional, defaults to siteConfig.author
permalink: "/custom-url/"            # Optional, defaults to /posts/YYYY/MM/dd-title/
---

Your post content here using standard markdown...
```

### Required Fields

- `title`: The post title
- `date`: Publication date in YYYY-MM-DD format
- `tags`: Array of tags for categorization

### Optional Fields

- `description`: Post description for SEO and social media (recommended)
- `excerpt`: Alternative to description
- `headerimage`: Filename of header image (must be in appropriate image directory)
- `author`: Override the default author
- `permalink`: Custom URL for the post
- `categories`: Array of categories

### URL Structure

By default, posts use URLs matching their file path:
- File: `src/pages/posts/2025/01/15-my-first-post.md`
- URL: `/posts/2025/01/15-my-first-post/`

You can override this with the `permalink` field.

## Adding Images to Posts

### Image Organization

Post images are organized by date in the public folder:

```
public/imgs/posts/
  └── YYYY/
      └── MM/
          └── DD/
              └── your-image.jpg
```

Example: `public/imgs/posts/2025/01/15/screenshot.jpg`

### Using Images in Posts

The site has a remark plugin that automatically rewrites relative image paths based on the post's date.

In your markdown, simply reference the image filename:

```markdown
![Alt text](screenshot.jpg)
```

The plugin will automatically transform this to:
```
/src/assets/posts/2025/01/15/screenshot.jpg
```

### Header Images

To add a header image to a post:

1. Add the image to the appropriate date folder (e.g., `src/assets/posts/2025/01/15/`)
2. Add the `headerimage` field to your frontmatter:

```markdown
---
headerimage: "header.jpg"
---
```

### External Images

You can also use absolute URLs or paths:

```markdown
![Alt text](https://example.com/image.jpg)
![Alt text](/imgs/other/image.jpg)
```

These will not be transformed by the plugin.

## Creating Projects

### File Structure

Projects are markdown files in:

```
src/pages/projects/
  └── ProjectName.md
```

Example: `src/pages/projects/MyAwesomeProject.md`

### Project Frontmatter

```markdown
---
title: "Project Name"
description: "Brief description of the project"
tags: ["C#", "Azure", "API"]
start: "2023-01"
end: "2024-06"              # Use "Present" for ongoing projects
github: "https://github.com/yourusername/project"  # Optional, displays GitHub icon
other: "https://example.com/project"               # Optional, displays external link icon
permalink: "/projects/custom-url/"  # Optional
projectimage: "project-preview.jpg"  # Optional, for grid preview cards
headerimage: "project-header.jpg"    # Optional, for project page header
---

## Overview

Detailed description of your project...

## Technologies Used

- Technology 1
- Technology 2

## Challenges and Solutions

Describe challenges you faced...
```

### Required Fields

- `title`: Project name
- `description`: Brief description
- `tags`: Array of technology tags
- `start`: Start date (YYYY-MM format)

### Optional Fields

- `end`: End date or "Present" for ongoing projects
- `github`: GitHub repository URL (displays GitHub icon on preview cards)
- `other`: External link URL (displays external link icon on preview cards)
- `permalink`: Custom URL
- `projectimage`: Image for preview cards (defaults to placeholder if not provided)
- `headerimage`: Image for project page header (no header image if not provided)

### Date Format

Projects use a year-month format for start/end dates:
- `start: "2023-01"` (January 2023)
- `end: "2024-06"` (June 2024)
- `end: "Present"` (ongoing project)

## Adding Images to Projects

Projects support two types of images:

### 1. Project Image (Preview Card)

This appears in the grid view on the main projects page. If not specified, a default placeholder is used.

**Location:** 
- `src/assets/projects/` 

**Frontmatter:**
```markdown
projectimage: "my-project-preview.jpg"
```

### 2. Header Image (Project Page)

This appears as a banner on the individual project page. It's completely optional.

**Location:** Same as project image

**Frontmatter:**
```markdown
headerimage: "my-project-header.jpg"
```

### Image Guidelines

- **Project Image (Preview):** Recommended size 800x400px
- **Header Image:** Recommended size 1200x630px for best social media sharing
- Supported formats: JPEG, PNG, WebP, SVG, GIF

### Example

```markdown
---
title: "My Awesome Project"
projectimage: "awesome-preview.jpg"
headerimage: "awesome-header.jpg"
---
```

Files should be at:
- `src/assets/projects/awesome-preview.jpg`
- `src/assets/projects/awesome-header.jpg`

## Tag System

### How Tags Work

Tags are automatically extracted from posts and projects to generate dynamic tag pages.

### Tag Pages

- **Blog tags:** `/tags/{tag}` - Shows all posts with that tag
- **Project tags:** `/projects/tags/{tag}` - Shows all projects with that tag

### Using Tags

Add tags to frontmatter as an array:

```markdown
---
tags: ["javascript", "tutorial", "react"]
---
```

Tags are automatically:
- Displayed on post/project cards
- Made clickable to filter content
- Used for SEO and social media metadata

### Tag Naming

- Use lowercase for consistency
- Use hyphens for multi-word tags: `"machine-learning"`
- Be consistent across posts and projects

## Customization

### Colors and Styling

The site uses Tailwind CSS v4. Main color scheme:

- Primary (Light): `#0969da` (blue)
- Primary (Dark): `teal-400`
- These are used throughout for links, accents, and highlights

To change colors, search and replace in the codebase:
- `#0969da` → your light mode color
- `teal-400` → your dark mode color

### Dark Mode

Dark mode uses class-based switching with the pattern:
```html
<div class="bg-white dark:bg-neutral-800">
```

The dark mode toggle is in `src/components/Header.astro`.

### Fonts

Default font is system font stack. To use custom fonts:

1. Add font files to `public/fonts/`
2. Update `src/styles/global.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/yourfont.woff2') format('woff2');
}

body {
  font-family: 'YourFont', sans-serif;
}
```

### Layout Components

- `src/layouts/BaseLayout.astro` - Main site wrapper
- `src/layouts/MarkdownPostLayout.astro` - Blog post layout
- `src/layouts/ProjectLayout.astro` - Project page layout

### Components

- `src/components/Header.astro` - Site header with navigation
- `src/components/Footer.astro` - Site footer
- `src/components/PostPreview.astro` - Blog post card
- `src/components/ProjectPreview.astro` - Project card
- `src/components/Pagination.astro` - Pagination controls

## Deployment

### GitHub Pages (Default)

The repository includes GitHub Actions workflows for automatic deployment.

**Setup:**

1. Go to your GitHub repository settings
2. Navigate to Pages
3. Set Source to "GitHub Actions"
4. Push to `main` branch to trigger deployment

**Workflow Files:**
- `.github/workflows/deploy.yml` - Builds and deploys to GitHub Pages
- `.github/workflows/ci.yml` - Validates builds on pull requests

### Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to `public/`:
```
yourdomain.com
```

2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or A records pointing to GitHub Pages IPs

3. Update `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
});
```

4. Update `src/config.ts`:
```typescript
siteUrl: "https://yourdomain.com",
```

### Other Hosting Providers

This is a static site that can be deployed anywhere:

- **Netlify:** Connect your GitHub repo
- **Vercel:** Connect your GitHub repo
- **Cloudflare Pages:** Connect your GitHub repo
- **Self-hosted:** Upload the `dist/` folder after running `npm run build`

For other providers, you may need to:
1. Disable the GitHub Actions workflows
2. Set up the provider's own CI/CD

## Progressive Web App (PWA)

The site is configured as a PWA with offline support.

### Manifest Configuration

Edit `public/manifest.json` (see [PWA Configuration](#pwa-configuration))

### Service Worker

The service worker (`public/sw.js`) provides:
- Offline-first caching for static assets
- Network-first caching for pages
- Automatic cache updates

**Cache Strategy:**
- Static assets (images, CSS, JS): Cache-first
- Pages: Network-first with cache fallback
- Visited pages are cached for offline access

### Customizing Service Worker

To change cache behavior, edit `public/sw.js`:

```javascript
const CACHE_VERSION = 'your-site-v1';  // Change version name
const RUNTIME_CACHE = 'your-site-runtime-v1';
```

Increment versions when you make significant changes to force cache updates.

### PWA Icons

Create icons at:
- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512)

These should be:
- Square aspect ratio
- Simple, recognizable design
- PNG format with transparency if needed

## Advanced Features

### RSS Feed

The site generates an RSS feed at `/rss.xml`. It's configured in `src/pages/rss.xml.js`.

To customize:
```javascript
export const GET = async ({ site }) => {
  // Edit this file to customize your feed
}
```

### Search (Optional)

The site includes search index generation in `src/lib/searchIndex.ts`. This creates a searchable index of posts and projects.

### Permalinks

Permalinks are automatically added to posts via the `src/lib/remark-add-permalink.js` plugin.

Default format: `/posts/YYYY/MM/dd-title/`

Custom permalinks can be set in frontmatter:
```markdown
permalink: "/my-custom-url/"
```

### Auto-Layout Assignment

The `src/lib/remark-add-layout.js` plugin automatically assigns layouts:
- Posts → `MarkdownPostLayout.astro`
- Projects → `ProjectLayout.astro`

## Troubleshooting

### Build Fails

- Check that all frontmatter is valid YAML
- Ensure all image paths are correct
- Look for syntax errors in markdown files
- Run `npm run build` locally to see detailed errors

### Images Not Showing

- Verify image files exist at the specified paths
- Check file extensions match (case-sensitive on some systems)
- For post images, ensure they're in the correct date folder
- Check browser console for 404 errors

### Tags Not Working

- Ensure tags are arrays: `tags: ["tag1", "tag2"]`
- Not strings: `tags: "tag1, tag2"` ❌
- Rebuild the site to regenerate tag pages

### Dark Mode Issues

- Check that elements use `dark:` variants
- Verify the dark mode toggle is working
- Clear localStorage if switching doesn't work

## Getting Help

- Check the [Astro documentation](https://docs.astro.build)
- Open an issue on GitHub for bugs
- Review existing posts/projects as examples