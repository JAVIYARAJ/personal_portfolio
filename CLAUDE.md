# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

There are no tests.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — Resend API key; form submissions are emailed to javiyaraj4@gmail.com

Without this, the contact form returns a 500 (by design, not a crash).

## Architecture

This is a **Next.js 16 / React 19** single-page portfolio. The entire visible site is rendered by one large client component:

**`components/portfolio/portfolio-home.tsx`** — contains all page data (projects, skills, experiences, achievements, services, tabs) as module-level constants, all section-level components (`Reveal`, `SectionHeader`, `AppIcon`, `HeroPhone` + `PhoneAppPreview`, `Spotlight`, `CountUp`, `AppListing`, `GalleryModal`, `SkillCard`), and all interaction state (active tab, contact form). The design uses a "portfolio as a phone" concept: the hero is a phone home screen whose app icons are the projects, tapping a hero icon zooms open an in-phone app preview, ⌘K / `/` opens a Spotlight search, navigation is a floating bottom tab bar, projects render as App Store–style listings, experience as a version history, and contact as a chat with a typing indicator. This is intentionally a single file; do not split it unless asked.

**`lib/projects.ts`** — the `projects` list (shared by the home page and the case-study pages).

**`lib/case-studies.ts`** + **`app/projects/[slug]/page.tsx`** — long-form case study per project, keyed by slug and statically generated at `/projects/<slug>`. A project gets a page (and a "Read the case study" button on its listing, plus a sitemap entry) only when it has an entry in `caseStudies`.

**`app/api/contact/route.ts`** — Next.js Route Handler. Validates the incoming form payload, silently drops honeypot submissions (`website` field non-empty), then sends an email via Resend to javiyaraj4@gmail.com.

**`lib/site.ts`** — the public site URL (`siteUrl`). Metadata, sitemap, robots and the OG image all read it; change it here when moving to a custom domain.

**`app/opengraph-image.tsx`** — the link-preview image. `next/og` only accepts ttf/otf/woff fonts, so Inter is vendored in `assets/fonts/`. Some `icon.png` files under `public/projects/` are really JPEGs; the OG image detects the type from the file bytes.

## Design System

Tailwind CSS v4 (no `tailwind.config.js`; config lives in `app/globals.css` via `@theme inline`). The palette is a light, high-contrast system-UI look (off-white background, near-black ink, system-blue `accent`, green `online`). Light mode only.

Key utility classes defined in `app/globals.css`:

| Class | Purpose |
|---|---|
| `.shell` | Centered max-width wrapper (1120px) with responsive padding |
| `.section-shell` | Vertical section padding |
| `.surface-card` | White card with hairline border |
| `.surface-card-strong` | Card variant with a soft drop shadow |
| `.section-kicker` | Small mono uppercase eyebrow label |
| `.section-title` | Large bold sans heading |
| `.eyebrow-dot` | Accent dot used inside `.section-kicker` |
| `.soft-grid` | Faint dot-grid background pattern |
| `.phone-wallpaper` | Gradient wallpaper for the hero phone screen |
| `.no-scrollbar` | Hides scrollbars on horizontal rails |

The heading and body fonts are the native OS sans stack (SF Pro / Roboto) — no web fonts. The heading stack is `--font-heading`. Reference it as `font-[family:var(--font-heading)]`.

## Animations

Framer Motion `<motion.div>` with `useReducedMotion()` — all animations are gated (never branch rendered markup on `useReducedMotion()`; it is unknown during SSR and causes hydration errors — use CSS `motion-reduce:` instead) so they become instant for users who prefer reduced motion. The pattern in `portfolio-home.tsx` is the `<Reveal>` wrapper component which handles `whileInView` fade-up on scroll. Follow this pattern for any new animated elements.

## Path Alias

`@/*` maps to the repo root (see `tsconfig.json`). Use `@/components/...`, `@/lib/...`, etc.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
