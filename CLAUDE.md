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

- `NOTION_TOKEN` — Notion internal integration secret
- `NOTION_CONTACT_DATABASE_ID` — Notion database ID for contact submissions

Without these, the contact form returns a 500 (by design, not a crash).

## Architecture

This is a **Next.js 16 / React 19** single-page portfolio. The entire visible site is rendered by one large client component:

**`components/portfolio/portfolio-home.tsx`** — contains all page data (projects, skills, experiences, navigation links) as module-level constants, all section-level components (`Reveal`, `SectionHeader`, `StatCard`, `ProjectCard`, `SkillCard`, `ExperienceCard`), and all interaction state (mobile menu, contact form). This is intentionally a single file; do not split it unless asked.

**`app/api/contact/route.ts`** — Next.js Route Handler. Validates the incoming form payload, silently drops honeypot submissions (`website` field non-empty), then writes to Notion via their REST API.

**`components/portfolio/contact.tsx`** — an older standalone contact section component. It is not imported anywhere currently; `portfolio-home.tsx` contains the live contact section inline.

The remaining files under `components/portfolio/` (`hero.tsx`, `about.tsx`, `navigation.tsx`, etc.) are similarly superseded legacy components. They are not used by the current page.

## Design System

Tailwind CSS v4 (no `tailwind.config.js`; config lives in `app/globals.css` via `@theme inline`). The palette is a warm cream/earth tone — no dark mode despite `.dark {}` being defined (both classes share identical values).

Key utility classes defined in `app/globals.css`:

| Class | Purpose |
|---|---|
| `.shell` | Centered max-width wrapper (1200px) with responsive padding |
| `.section-shell` | Vertical section padding |
| `.surface-card` | Frosted-glass card with subtle shadow |
| `.surface-card-strong` | Stronger variant with more opacity and shadow |
| `.section-kicker` | Small eyebrow label pill |
| `.section-title` | Large serif heading with tight tracking |
| `.eyebrow-dot` | Accent dot used inside `.section-kicker` |
| `.soft-grid` | Faint grid background pattern |

The heading font is a system serif stack (`--font-heading`). Reference it as `font-[family:var(--font-heading)]`.

## Animations

Framer Motion `<motion.div>` with `useReducedMotion()` — all animations are gated so they become instant for users who prefer reduced motion. The pattern in `portfolio-home.tsx` is the `<Reveal>` wrapper component which handles `whileInView` fade-up on scroll. Follow this pattern for any new animated elements.

## Path Alias

`@/*` maps to the repo root (see `tsconfig.json`). Use `@/components/...`, `@/lib/...`, etc.
