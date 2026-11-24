# Developer Notes

A route-based library for browsing developer notes by subject. Each public collection has its own URL and an in-page README, with search and pagination across the catalog.

## Features

- 65 public note collections organized by subject
- Searchable, filterable topic catalog with pagination
- Individual routes with locally bundled Markdown content
- Original GitHub repository link on each topic page
- Responsive navigation, route loading spinner, and smooth scroll-to-top

## Tech stack

React, Vite, React Router, React Markdown, and React Icons.

## Run locally

Use Node.js 22.13 or newer in the 22.x line, or Node.js 24 or newer.

```bash
npm ci
npm run dev
```

## Deploy

```bash
npm run deploy
```

The site is configured for GitHub Pages at [a2rp.github.io/notes](https://a2rp.github.io/notes/). The build creates a `404.html` fallback so direct topic routes continue to work.

## License

MIT
