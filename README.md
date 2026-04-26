# ITIS 3135 React Mirror

This Vite React SPA mirrors the existing ITIS 3135 site and keeps shared navigation and footer visible across all routes.

## What Is Included

- React Router routes for core ITIS pages and assignment pages.
- Shared header and footer components used on every route.
- Legacy HTML content loaded from public assets so visuals and structure stay close to the original static implementation.
- Existing styles, images, and scripts copied into public/legacy/itis3135.
- Hobby and Amanda client project pages kept as direct legacy links (not fully recreated as React routes).
- Footer placeholder link text ITIS3135@Vercel for deployment URL wiring.

## Run Locally

1. Install dependencies:
   npm install
2. Start development server:
   npm run dev
3. Build for production:
   npm run build

## Important Project Files

- src/App.jsx: Route mounting and shared layout.
- src/routes.js: Route map and legacy page/source mapping.
- src/components/LegacyPage.jsx: Loads and rewrites legacy markup, styles, and scripts.
- src/components/SiteHeader.jsx: Shared navbar for the SPA.
- src/components/SiteFooter.jsx: Shared footer including ITIS3135@Vercel placeholder link.

## Vercel Link Placeholder

Update the placeholder link in src/components/SiteFooter.jsx after deployment:

- Current placeholder: https://your-vercel-url.vercel.app
- Replace with your actual Vercel project URL.
