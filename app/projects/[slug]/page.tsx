import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { getCaseStudy } from '@/lib/case-studies'
import { getProject, projects, type Project } from '@/lib/projects'

// Only the known projects exist; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return projects.filter((project) => getCaseStudy(project.slug)).map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const title = `${project.name} case study — Javiya Raj`
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description: project.description, url: `/projects/${project.slug}`, type: 'article' },
    twitter: { title, description: project.description },
  }
}

function ProjectIcon({ project }: { project: Project }) {
  const Icon = project.icon
  const base = 'h-16 w-16 shrink-0 rounded-[1.1rem] shadow-sm ring-1 ring-black/5 sm:h-20 sm:w-20 sm:rounded-[1.35rem]'

  if (project.appIcon) {
    return (
      <span aria-hidden className={`flex items-center justify-center overflow-hidden bg-white ${project.appIconWide ? 'p-1.5' : ''} ${base}`}>
        <img src={project.appIcon} alt="" className={project.appIconWide ? 'h-auto w-full object-contain' : 'h-full w-full object-cover'} />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className={`flex items-center justify-center text-white ${base}`}
      style={{ background: `linear-gradient(145deg, ${project.accent}, ${project.accent}cc)` }}
    >
      <Icon className="h-[46%] w-[46%]" strokeWidth={2} />
    </span>
  )
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="space-y-5">
      <div className="space-y-3">
        <p className="section-kicker">
          <span className="eyebrow-dot" />
          {label}
        </p>
        <h2 id={`${id}-title`} className="font-[family:var(--font-heading)] text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  const study = getCaseStudy(slug)
  if (!project || !study) notFound()

  const withStudies = projects.filter((p) => getCaseStudy(p.slug))
  const next = withStudies[(withStudies.findIndex((p) => p.slug === slug) + 1) % withStudies.length]

  const facts = [
    { label: 'Role', value: study.role },
    { label: 'Platform', value: project.platform },
    { label: 'Built for', value: project.type },
    ...project.stats,
  ]

  return (
    <main className="pb-24">
      {/* Top bar */}
      <nav className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="shell flex h-14 items-center justify-between gap-4">
          <Link
            href={`/#app-${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-accent-2"
          >
            <ArrowLeft size={16} />
            All apps
          </Link>
          <p className="truncate text-sm font-semibold text-foreground">{project.name}</p>
        </div>
      </nav>

      {/* Header */}
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: project.accent }}
        />
        <div className="shell relative pb-10 pt-12 sm:pb-14 sm:pt-16">
          <p className="section-kicker">
            <span className="eyebrow-dot" />
            Case study
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
            <ProjectIcon project={project} />
            <div className="min-w-0">
              <h1 className="font-[family:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
                {project.name}
              </h1>
              <p className="mt-1 text-base text-muted-foreground sm:text-lg">{project.category}</p>
            </div>
          </div>
          {project.inProgress ? (
            <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#d97706]/10 px-2.5 py-0.5 text-xs font-semibold text-[#b45309]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
              In development
            </p>
          ) : null}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/80 sm:text-xl sm:leading-9">{project.description}</p>
          {project.links.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {project.links.map((link) => {
                const LinkIcon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent transition hover:bg-accent/15"
                  >
                    <LinkIcon size={15} />
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                )
              })}
            </div>
          ) : null}
        </div>
      </header>

      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        {/* At a glance — first on mobile, sticky sidebar on desktop */}
        <aside className="lg:order-2">
          <div className="surface-card space-y-5 p-5 lg:sticky lg:top-20">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">At a glance</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-1">
              {facts.map((fact) => (
                <div key={fact.label} className={fact.label === 'Role' ? 'col-span-2 lg:col-span-1' : ''}>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-0.5 text-[0.95rem] font-semibold text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-border pt-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">Tech stack</p>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tech stack">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.78rem] font-medium text-foreground/80">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <article className="min-w-0 space-y-16 lg:order-1">
          <Section id="problem" label="The problem" title="Why it needed building">
            <p className="text-[1.05rem] leading-8 text-foreground/80">{study.problem}</p>
          </Section>

          <Section id="role" label="My role" title="What I owned">
            <ul className="space-y-3">
              {study.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-[1.05rem] leading-7 text-foreground/80">
                  <Check size={18} className="mt-1 shrink-0 text-online" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="approach" label="The approach" title="Key decisions">
            <ol className="space-y-4">
              {study.approach.map((step, i) => (
                <li key={step.title} className="surface-card flex gap-4 p-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 leading-7 text-foreground/75">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {project.mockups ? (
            <Section id="screens" label="The product" title={project.mockupCaptions ? 'Workflow' : 'Screens'}>
              <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0">
                {project.mockups.map((src, i) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name} screenshot ${i + 1} full size`}
                    className={`shrink-0 snap-start ${project.landscapeMockups ? 'w-[82vw] max-w-[34rem]' : ''}`}
                  >
                    <img
                      src={src}
                      alt={project.mockupCaptions?.[i] ?? `${project.name} screenshot ${i + 1}`}
                      loading="lazy"
                      className={
                        project.landscapeMockups
                          ? 'aspect-[16/9] w-full rounded-xl border border-black/5 object-cover shadow-[0_8px_24px_-12px_rgba(16,17,20,0.35)]'
                          : 'h-[360px] w-auto rounded-[1.25rem] object-contain sm:h-[440px]'
                      }
                    />
                    {project.mockupCaptions?.[i] ? (
                      <p className="mt-2.5 flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[0.65rem] font-bold text-background">
                          {i + 1}
                        </span>
                        {project.mockupCaptions[i]}
                      </p>
                    ) : null}
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Swipe to see more · tap a screen to open it full size</p>
            </Section>
          ) : null}

          <Section id="challenges" label="Challenges" title="The hard parts">
            <div className="grid gap-4 sm:grid-cols-2">
              {study.challenges.map((challenge) => (
                <div key={challenge.title} className="surface-card p-5">
                  <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                  <p className="mt-1.5 leading-7 text-foreground/75">{challenge.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="results" label="Results" title="What it achieved">
            <ul className="space-y-3 rounded-2xl bg-accent/[0.06] p-5 ring-1 ring-accent/10 sm:p-6">
              {study.results.map((result) => (
                <li key={result} className="flex gap-3 text-[1.05rem] leading-7 text-foreground/85">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {result}
                </li>
              ))}
            </ul>
          </Section>

          {/* Footer: contact + next case study */}
          <div className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
            <Link href="/#contact" className="surface-card group p-5 transition hover:bg-secondary/60">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Have a project like this?</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-foreground">
                Get in touch
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </p>
            </Link>
            {next && next.slug !== project.slug ? (
              <Link href={`/projects/${next.slug}`} className="surface-card group p-5 transition hover:bg-secondary/60">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Next case study</p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-foreground">
                  {next.name}
                  <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                </p>
              </Link>
            ) : null}
          </div>
        </article>
      </div>
    </main>
  )
}
