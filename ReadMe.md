This is my personal website, I built it over the course of about a week using Astro.  It has theme switching, a responsive layout and PWA capabilities.  You are welcome to use it as well, just don't steal the actual content.

## Features

- **Blog Platform**: Hierarchically organized blog posts with markdown support
- **Dark Mode**: Class-based dark mode
- **Progressive Web App**: Installable with offline support via service worker
- **SEO Optimized**: Meta tags for social media (LinkedIn, Twitter, Facebook)
- **Custom Permalinks**: Flexible URL structure
- **Tag System**: Dynamic tag-based filtering and categorization
- **Responsive Design**: Mobile-first design using Tailwind
- **Syntax Highlighting**: Code blocks with syntax highlighting
- **Pagination**: Configurable post pagination on home page

## Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Markdown**: Remark plugins with custom transformations
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or your preferred package manager

### Installation

```bash
git clone https://github.com/dccoder90/dccoder90.github.io.git
cd dccoder90.github.io

npm install
npm run dev
```

## Project Structure

```
├── public/
│   ├── imgs/posts/         # Blog post images organized by date (YYYY/MM/DD/)
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker for offline support
├── src/
│   ├── components/        # Astro components
│   ├── layouts/           # Page layouts
│   │   ├── BaseLayout.astro           # Main site wrapper
│   │   └── MarkdownPostLayout.astro   # Blog post wrapper
│   ├── lib/              
│   │   ├── remark-add-layout.js       # Auto-applies layout to markdown
│   │   ├── remark-add-permalink.js    # Permalink system
│   │   └── remark-image-paths.js      # Image path transformation for blog posts
│   ├── pages/
│   │   ├── posts/         # Blog posts (YYYY/MM/dd-title.md)
│   │   ├── tags/          # Tag pages
│   │   └── [...page].astro # Paginated home page
│   ├── styles/            # Styles
│   └── config.ts          # Site configuration
├── .github/workflows/
│   ├── ci.yml            # CI
│   └── deploy.yml        # GitHub Pages deployment
└── astro.config.mjs      # Astro configuration
```

## Creating Blog Posts

### File Organization

Posts are organized hierarchically by date:
```
src/pages/posts/YYYY/MM/dd-title.md
```

Example: `src/pages/posts/2025/10/31-halloween-post.md`

### Frontmatter

Required and optional fields:

```yaml
---
title: "Your Post Title"              # Required
date: "2025-10-31"                    # Required (YYYY-MM-DD)
tags: ["astro", "web-development"]    # Required
categories: ["tutorials"]             # Optional
description: "SEO-friendly description" # Optional
permalink: "/custom-url/"             # Optional (defaults to /posts/YYYY/MM/dd-title/)
headerimage: "header.jpg"             # Optional
author: "Your Name"                   # Optional (defaults to site config)
---
```

### Images

Place images in: `public/imgs/posts/YYYY/MM/DD/`

Reference in markdown:
```markdown
![Alt text](image.png)
```

The image path will automatically be rewritten to match the post's date.

## Deployment

### Automatic Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

### Manual Deployment

Trigger the deployment workflow manually from the GitHub Actions tab.

### CI/CD Pipeline

- **Pull Requests**: Automatically validated via CI workflow (build only)
- **Main Branch**: Automatically built and deployed to GitHub Pages

## PWA Features

The site functions as a Progressive Web App with:

- **Offline Support**: Cache-first strategy for assets, network-first for pages
- **Installable**: Can be added to home screen on mobile devices
- **Fast Loading**: Caching of visited pages
- **Auto-Updates**: Cache refreshes on new deployments

## Configuration

Global site settings can be modified in `src/config.ts`:

```typescript
export const siteConfig = {
  name: "Your Site Name",
  author: "Your Name",
  postsPerPage: 5,
  // ...
}
```

## Dark Mode

Dark mode is class-based. Apply dark mode styles using Tailwind's `dark:` modifier:

```html
<div class="bg-white dark:bg-gray-900">
  Content
</div>
```

## Future Improvements

I'm debating on adding the following features make the site a little better:

### SEO
- **Sitemap.xml Generation**
- **robots.txt**
- **Breadcrumb Navigation**

### Content
- **Social Share Buttons**
- **Reading Time Estimates**: Auto calculated reading time for each post
- **Related Posts**: Show 3-4 related articles at end of posts based on shared tags
- **RSS Feed Discovery**: Add RSS links and `<link rel="alternate">` tags

### Accessibility
- Skip-to-Content Link
- Image Lazy Loading
- Table of Contents

### Professional Features
- **Code Copy Buttons**: One-click copy for code blocks
- **Author Bio Component**: Author section at end of posts
- **Post Series/Collections**: UI for navigating multi-part content
- **Tags**: Show post counts and weight on tag pages
- **Print Stylesheet**: To allow for cleaner and more professional view for printed content

### Performance
- **Update Image Formats**: Convert to WebP/AVIF with fallbacks to reduce bandwidth

## Contributing

This is a personal portfolio site, but suggestions and bug reports are welcome via GitHub issues.

## License

### Code License (MIT)

The source code in this repository (including all code in `src/`, configuration files, and build scripts) is licensed under the MIT License. You are free to use, modify, and distribute the code for any purpose.

### Content License (All Rights Reserved)

All content in this repository is **NOT licensed** for use and remains the exclusive property of the author. This includes, but is not limited to:

- Blog posts and articles (`src/pages/posts/**/*.md`)
- Images and graphics (`public/imgs/`)
- Project descriptions and information (`src/projects.ts`)
- Resume and personal information
- About me content
- Any other written content, media, or personal information

**You may NOT use or distribute any of the above content without explicit written permission from the author.  Copying and modification may only be done in the context of cloning this repository or forking it to create your own.**

In summary: Feel free to use the code to build your own site, but please create your own content.

## Contact

- Website: [https://dccoder.com](https://dccoder.com)
- GitHub: [@dccoder90](https://github.com/dccoder90)
