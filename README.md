# Developer Notes

A route-based React library for practical developer references. It brings Algorithms Core Notes and Android Notes together, with each collection and its chapters kept locally in the app.

## Features

- Algorithms Core Notes with ten focused sections
- Android Notes with all 17 original Markdown chapters
- Local chapter content, linked navigation, and original repository links
- Responsive layouts, route loading spinner, and smooth scroll-to-top

## Tech stack

React, Vite, React Router, React Markdown, remark-gfm, and React Icons.

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

The site is configured for GitHub Pages at [a2rp.github.io/notes](https://a2rp.github.io/notes/). The build creates a `404.html` fallback so direct chapter routes continue to work.

## License

MIT
