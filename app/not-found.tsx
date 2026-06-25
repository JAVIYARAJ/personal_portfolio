import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page not found | Javiya Raj',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="section-kicker mb-8">
        <span className="eyebrow-dot" />
        Error 404
      </div>

      <p className="text-gradient font-[family:var(--font-heading)] text-[7rem] font-semibold leading-none tracking-[-0.06em] sm:text-[10rem]">
        404
      </p>

      <h1 className="mt-4 font-[family:var(--font-heading)] text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
        This page drifted out of orbit.
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full grad-accent-bg px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_34px_rgba(124,92,255,0.34)] transition hover:-translate-y-0.5"
        >
          Back to home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
        >
          View projects
        </Link>
      </div>
    </main>
  )
}
