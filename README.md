# sparky-resume-site

A modern resume-style website built with **Next.js (App Router) + TypeScript + Tailwind**, designed to deploy cleanly on **Vercel**.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Customize content

Edit:

- `src/config/site.ts` (name, headline, experience, education, skills, links)
- Add images in `public/images/` and reference them in `src/config/site.ts`

### Projects from GitHub

Projects are fetched from GitHub’s public API at runtime (server-side) and revalidated hourly.

Pinned/featured projects are controlled by:

- `site.github.featuredRepoNames` in `src/config/site.ts`

## Deploy on Vercel (GitHub)

1. Push this repo to GitHub.
2. In Vercel, **Add New Project** → import your GitHub repo.
3. Build settings:
   - Framework preset: **Next.js**
   - Build command: `next build`
   - Output: `.next` (auto)

### Set your public URL

Update `site.url` in `src/config/site.ts` after you deploy (e.g., `https://yourname.vercel.app`).

## SOLID-ish structure (why it’s easy to extend)

- `src/config/` → content (what you say)
- `src/core/` → domain types + interfaces (what the app *is*)
- `src/services/` → implementations (how data is fetched)
- `src/features/` → page sections (how content is rendered)
- `src/components/` → reusable UI building blocks
