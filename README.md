# Yashana Polymers — Landing Page

Next.js 14 (App Router) + Tailwind CSS landing page for Yashana Polymers (PC, ABS, PBT).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Structure

- `app/page.jsx` – the full landing page (16 sections)
- `app/layout.jsx` – fonts (Outfit + Barlow Condensed) and SEO metadata
- `app/globals.css` – Tailwind directives
- `public/` – put your real logo here (e.g. `logo.svg`) and swap it into the `Logo` component

Deploys to Vercel with zero config.
