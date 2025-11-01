---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'How to build a blog with Astro'
date: 2025-10-31
author: 'DCCoder'
description: 'A step-by-step guide to building a blog with Astro.'
headerimage: 'pexels-simon73-1183099.jpg'
tags:
  - 'astro'
  - 'blog'
  - 'tailwindcss'
---

## Introduction

Astro is a modern static site builder that allows you to build faster websites with less client-side JavaScript. In this tutorial, we will learn how to build a blog with Astro from scratch.

## Prerequisites

Before we start, make sure you have the following installed on your machine:

- Node.js (v16 or higher)
- npm

## Step 1: Create a new Astro project

To create a new Astro project, open your terminal and run the following command:

```bash
npm create astro@latest
```

This will create a new Astro project in a directory of your choice.

## Step 2: Create a new blog post

To create a new blog post, create a new Markdown file in the `src/pages/posts` directory. The file name should be in the format `YYYY-MM-DD-title.md`.

## Step 3: Create a new layout

To create a new layout for your blog posts, create a new file in the `src/layouts` directory called `MarkdownPostLayout.astro`.

## Step 4: Display the blog posts

To display the blog posts on the home page, you need to fetch the Markdown files and loop through them.

## Conclusion

In this tutorial, we learned how to build a blog with Astro. We covered how to create a new project, create a new blog post, create a new layout, and display the blog posts on the home page.
