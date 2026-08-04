# Prashanth Reddy — Personal Website

A personal portfolio site built with Vite + React + React Router, styled with a mix of
NES.css retro components and a modern single-column layout.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and deploys
it to GitHub Pages. GitHub Pages must be set to deploy from "GitHub Actions" in the repo's
Settings → Pages (one-time manual setup).
