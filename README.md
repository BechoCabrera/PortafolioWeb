# Manuel Cabrera — Full Stack Developer

Personal portfolio built with Angular, focused on enterprise-oriented case studies, bilingual content (ES/EN), accessibility, SEO, and a smooth motion system based on GSAP/ScrollTrigger.

## Features

- Angular standalone architecture
- ES/EN language switch
- Responsive layout (desktop to mobile)
- Project case studies with detail routes
- GSAP + ScrollTrigger motion layer
- SEO global + dynamic project SEO
- Accessibility-first semantics and keyboard support
- Interactive media architecture (image, gallery, video, panorama-ready)
- Cloudflare Pages deployment readiness

## Tech Stack

- Angular 20
- TypeScript
- SCSS
- GSAP / ScrollTrigger
- Angular Forms (Reactive Forms)

## Architecture

- `src/app/app.routes.ts`: root routes and lazy feature loading
- `src/app/features/home`: home sections (hero, about, services, stack, experience, projects, contact)
- `src/app/features/projects/project-detail`: case study detail page
- `src/app/core/services/gsap-motion.service.ts`: dynamic GSAP loader and scoped animation cleanup
- `src/app/core/services/motion-preferences.service.ts`: reduced-motion and pointer-capability gating
- `src/app/core/services/seo.service.ts`: global/project SEO metadata management
- `src/app/core/services/contact.service.ts`: contact form mailto adapter (no backend persistence)
- `src/app/core/i18n`: translation dictionaries and keys
- `src/app/data/projects.data.ts`: project catalog and media architecture

## Main Structure

- `public/assets/images/profile`: profile photos
- `public/assets/images/og`: social share image
- `public/assets/images/projects/finca`
- `public/assets/images/projects/inventario`
- `public/assets/images/projects/ecommerce`
- `public/assets/images/projects/rifa`
- `public/assets/video`: project videos
- `public/assets/panorama`: 360 assets
- `public/assets/documents`: CV file location
- `public/_redirects`: SPA routing fallback for static hosting
- `public/robots.txt`
- `public/sitemap.xml`

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

## Build

```bash
npm run build
```

Current Angular output directory:

- `dist/manuel-cabrera-portfolio/browser`

## Tests

```bash
npx ng test --watch=false --browsers=ChromeHeadless
```

## Add a New Project

1. Add a new project entry in `src/app/data/projects.data.ts`.
2. Define slug, titles, descriptions, stack, architecture nodes/connections, and media references.
3. Add translation keys in:

- `src/app/core/i18n/es.ts`
- `src/app/core/i18n/en.ts`
- `src/app/core/i18n/translations.ts`

## Add a Cover or Screenshot

1. Place image files in the corresponding folder under:

- `public/assets/images/projects/finca`
- `public/assets/images/projects/inventario`
- `public/assets/images/projects/ecommerce`
- `public/assets/images/projects/rifa`

2. In `src/app/data/projects.data.ts`, update:

- `cover` for preview image
- `media` with `kind: 'image'` or `kind: 'gallery'`

## Configure Gallery

Use `media` in `src/app/data/projects.data.ts`:

- `kind: 'gallery'`
- `images: [{ src, alt, caption? }]`
- optional `startIndex`

## Add Video

1. Put `.mp4` and optional poster image in `public/assets/video` (or preferred public asset path).
2. Set `media` item with:

- `kind: 'video'`
- `src`
- optional `poster`
- `title`

`video-showcase` uses `preload="none"` and loads source when the user presses play.

## Add Panorama 360

1. Add panorama assets in `public/assets/panorama`.
2. Set `media` item with:

- `kind: 'panorama'`
- `src`
- optional `thumbnail`
- `title`

Panorama view is lazy-rendered with Angular `@defer`.

## Update Translations

Update keys in:

- `src/app/core/i18n/translations.ts`
- `src/app/core/i18n/es.ts`
- `src/app/core/i18n/en.ts`

## Replace CV

The CV download route is:

- `assets/documents/manuel-cabrera-cv.pdf`

To enable the visible CV button, place this file at:

- `public/assets/documents/manuel-cabrera-cv.pdf`

No fake PDF is required in this repository.

## Update Profile Photos

- Hero photo: `public/assets/images/profile/manuel-hero.webp`
- About photo: `public/assets/images/profile/manuel-about.webp`

Recommended: keep modern compressed WebP assets with preserved visual quality.

## SEO Notes

Global SEO tags are initialized in `src/index.html` and managed at runtime by `src/app/core/services/seo.service.ts`.

- Home title: `Manuel Cabrera | Full Stack Developer`
- Project title format: `<ProjectName> | Manuel Cabrera`
- Canonical strategy: runtime origin by default

Optional production override:

- `canonicalBaseUrl` in `src/app/core/services/seo.service.ts`

Leave empty to avoid fake domains before first deploy.

OG image path:

- `public/assets/images/og/manuel-cabrera-og.webp`
- Recommended size: `1200x630`

## Robots and Sitemap

- `public/robots.txt` allows indexing and points to `/sitemap.xml`.
- `public/sitemap.xml` uses `__SITE_URL__` placeholder.

After first Cloudflare deployment, replace `__SITE_URL__` with your real `*.pages.dev` URL (or custom domain when available).

## Cloudflare SPA Routing

`public/_redirects` contains:

```txt
/* /index.html 200
```

This is required so direct reloads on routes like `/projects/finca-app` resolve correctly in static hosting.

## Deploy on Cloudflare Pages

1. Push this repository to GitHub.
2. Open Cloudflare Dashboard.
3. Go to Workers & Pages > Pages.
4. Connect GitHub and authorize repository access.
5. Select this repository.
6. Set Build command: `npm run build`.
7. Set Output directory: `dist/manuel-cabrera-portfolio/browser`.
8. Deploy.
9. Validate SPA direct routes:

- `/`
- `/projects/finca-app`
- `/projects/inventario-app`
- `/projects/ecommerce`
- `/projects/rifa-app`

10. Copy your generated `*.pages.dev` URL.
11. Replace `__SITE_URL__` in `public/sitemap.xml`.
12. If desired, set `canonicalBaseUrl` in `src/app/core/services/seo.service.ts` to the final site URL.
