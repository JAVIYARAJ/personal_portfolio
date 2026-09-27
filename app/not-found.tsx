import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page not found | Javiya Raj',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="section-kicker mb-6">
        <span className="eyebrow-dot" />
        Error 404
      </div>

      <p className="text-gradient font-[family:var(--font-heading)] text-[7rem] font-bold leading-none tracking-[-0.05em] sm:text-[10rem]">
        404
      </p>

      <h1 className="mt-4 font-[family:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
        This screen doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-foreground/85"
        >
          Back to home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
        >
          View apps
        </Link>
      </div>
    </main>
  )
}
