'use client'

import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Apple,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CircuitBoard,
  Copy,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Play,
  Rocket,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Twitter,
  Workflow,
  X,
  Zap,
} from 'lucide-react'

const emailAddress = 'javiyaraj4@gmail.com'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const heroFacts = [
  '15+ Production Apps',
  '3+ Years Experience',
  'Freelance Available',
]

const heroStack = [
  'Flutter',
  'Dart',
  'Clean Architecture',
  'Supabase',
  'Kotlin',
]

const experienceHighlights = [
  '15+ production applications',
  '95% on-time release rate',
  'Native Android foundation',
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/JAVIYARAJ', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/javiyaraj/', icon: Linkedin },
  { label: 'Twitter', href: 'https://x.com/Rjcoding', icon: Twitter },
  { label: 'Email', href: `mailto:${emailAddress}?subject=Portfolio Inquiry`, icon: Mail },
]

const aboutFeatures = [
  {
    title: 'Performance Optimization',
    description: 'Maximizing frame rates and minimizing resource overhead.',
    icon: Zap,
  },
  {
    title: 'Clean Architecture',
    description: 'Separating concerns for maintainable and scalable codebases.',
    icon: ShieldCheck,
  },
  {
    title: 'Cross-Platform Mastery',
    description: 'Seamlessly targets iOS, Android, and Web with zero compromise.',
    icon: Smartphone,
  },
  {
    title: 'CI/CD Automation',
    description: 'Robust deployment pipelines for reliable app deliveries.',
    icon: Workflow,
  },
]

type ImpactStat = {
  value: string
  label: string
  sublabel: string
  icon: LucideIcon
}

const impactStats: ImpactStat[] = [
  {
    value: '15+',
    label: 'DEPLOYED APPS',
    sublabel: 'Production Grade',
    icon: Smartphone,
  },
  {
    value: '40%',
    label: 'DEV VELOCITY',
    sublabel: 'Efficiency Lift',
    icon: Zap,
  },
  {
    value: '99.9%',
    label: 'CRASH-FREE',
    sublabel: 'Stability Index',
    icon: ShieldCheck,
  },
  {
    value: '3+',
    label: 'YEARS EXP',
    sublabel: 'Industrial Tenure',
    icon: Rocket,
  },
]

type ProjectLink = {
  label: string
  href: string
  icon: LucideIcon
}

type Project = {
  name: string
  category: string
  type: string
  description: string
  tags: string[]
  stats: { label: string; value: string }[]
  impact: string
  accent: string
  icon: LucideIcon
  span: string
  links: ProjectLink[]
}

const projects: Project[] = [
  {
    name: 'SPLITEASE',
    category: 'FinTech / Social Expense',
    type: 'Personal',
    description:
      'A comprehensive expense management engine facilitating group orchestration, peer invitations, and automated split synchronization. Features multi-tier role management (Owner, Admin, Member) with granular permission control.',
    tags: [
      'Flutter',
      'Supabase',
      'Edge Functions',
      'Custom Animations',
      'Real-time Sync',
      'Complex Logic',
      'Clean Architecture',
      'Dependency Injection (GetIt)',
    ],
    stats: [
      { label: 'Tracking', value: '+50%' },
      { label: 'Scale', value: 'Real-time' },
    ],
    impact:
      'Architected a scalable group-logic system with multi-tier role permissions and instant synchronization.',
    accent: '#d98f6b',
    icon: Layers3,
    span: 'lg:col-span-7',
    links: [],
  },
  {
    name: 'DYSHEZ',
    category: 'Logistics / Consumer',
    type: 'Esparkbiz',
    description:
      'Developed a scalable food delivery app with an intuitive UX and Supabase-powered backend. Features include real-time order handling and a custom Rewards system.',
    tags: [
      'Flutter',
      'Supabase',
      'Real-time SDK',
      'Clean Architecture',
      'CI/CD',
      'Sentry',
      'Posthog',
      'Clarity (Heatmap)',
    ],
    stats: [
      { label: 'Scale', value: '10K+' },
      { label: 'Rating', value: '4.8' },
    ],
    impact:
      'Engineered a 30% increase in repeat orders via modular loyalty logic.',
    accent: '#d5a24a',
    icon: Smartphone,
    span: 'lg:col-span-5',
    links: [
      {
        label: 'App Store',
        href: 'https://apps.apple.com/in/app/dyshez/id6474236767',
        icon: Apple,
      },
      {
        label: 'Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.dyshez.app',
        icon: Play,
      },
    ],
  },
  {
    name: 'SMACKDAB',
    category: 'Sales / Productivity',
    type: 'Esparkbiz',
    description:
      'A dedicated productivity engine that boosted team efficiency by 40%. Engineered with high-performance custom calendar modules and reactive data flows.',
    tags: [
      'Flutter',
      'Responsive Design',
      'Modular UI',
      'Complex Logic',
      'Reactive Dart',
      'Sales Intelligence',
    ],
    stats: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'Lift', value: '25%' },
    ],
    impact:
      'Transformed sales workflow into a mobile-first intelligent engine.',
    accent: '#6d8262',
    icon: Activity,
    span: 'lg:col-span-5',
    links: [],
  },
  {
    name: 'GOALS.COM',
    category: 'Native Android / CRM',
    type: 'Esparkbiz',
    description:
      'High-scale CRM for goal tracking and incentive management. Reduced processing time by 25% through advanced async optimization and network caching.',
    tags: [
      'Kotlin',
      'MVVM Architecture',
      'Retrofit',
      'Glide',
      'Firebase',
      'Enterprise SDK',
    ],
    stats: [
      { label: 'Speed', value: '+25%' },
      { label: 'Growth', value: '30%' },
    ],
    impact:
      'Optimized network layer resulting in 30% faster data availability.',
    accent: '#8b6d5c',
    icon: Database,
    span: 'lg:col-span-7',
    links: [
      {
        label: 'Website',
        href: 'https://www.goals.com/',
        icon: ExternalLink,
      },
    ],
  },
  {
    name: 'PADDLE',
    category: 'Job Portal / HR Tech',
    type: 'Esparkbiz',
    description:
      'A comprehensive job portal platform for seekers and admins. Optimized recruitment workflows via BLoC state management and robust candidate tracking.',
    tags: [
      'Flutter',
      'Dart',
      'BLoC',
      'Clean Architecture',
      'Dio',
      'Firebase Auth',
      'Push Notifications',
      'Socket.Io',
    ],
    stats: [
      { label: 'Workflows', value: '+30%' },
      { label: 'Engagement', value: '25%' },
    ],
    impact:
      'Reduced bug reports by 20% and improved development speed by 15% through Clean Architecture.',
    accent: '#c76b4f',
    icon: Workflow,
    span: 'lg:col-span-12',
    links: [],
  },
]

type SkillGroup = {
  title: string
  detail: string
  description: string
  icon: LucideIcon
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Framework Core',
    detail: 'Ecosystem',
    description: 'Flutter ecosystem, adaptive UI systems, testing, and modular design for product-grade apps.',
    icon: CircuitBoard,
    skills: [
      'Flutter',
      'Dart',
      'Modular Design',
      'Material UI / Cupertino Widgets',
      'Responsive UI / Adaptive Design',
      'Solid principles',
      'Custom Animation',
      'Unit Testing',
      'Widget Testing',
      'Integration Testing',
    ],
  },
  {
    title: 'Logic Engine',
    detail: 'Enterprise Logic',
    description: 'State management and architectural patterns built for maintainable, reactive application flow.',
    icon: Layers3,
    skills: [
      'BLoC / Cubit',
      'GetX',
      'Riverpod',
      'State Hooks',
      'Reactive Flows',
      'Clean Architecture',
      'Dependency Injection (GetIt)',
    ],
  },
  {
    title: 'Data Systems',
    detail: 'Real-time Persistence',
    description: 'Data storage, backend integration, and synchronization across live mobile environments.',
    icon: Database,
    skills: [
      'Firebase / Supabase',
      'Hive / SQLite',
      'REST / GraphQL',
      'PostgeSQL',
      'GraphQL',
    ],
  },
  {
    title: 'Native Android',
    detail: 'Android Framework',
    description: 'Platform-level Android work for native modules, bridges, background processing, and Compose.',
    icon: Smartphone,
    skills: [
      'Android SDK',
      'Kotlin Core',
      'Jetpack Compose',
      'Platform Bridges',
      'Java Legacy',
      'Background Services / WorkManager',
    ],
  },
  {
    title: 'AI Intelligence',
    detail: 'Advanced Intelligence',
    description: 'AI-assisted tooling and workflow support for faster implementation and decision-making.',
    icon: Sparkles,
    skills: ['Claude', 'Antigravity', 'Cursor', 'Gemini', 'ChatGPT'],
  },
  {
    title: 'Automation & DevOps',
    detail: 'Continuous Delivery',
    description: 'Release automation, OTA delivery, build systems, and store deployment operations.',
    icon: Zap,
    skills: [
      'Shorebird (OTA)',
      'Codemagic',
      'Fastlane',
      'GitHub Actions',
      'Play Store / App Store Deployment',
      'Build Automation & Versioning',
    ],
  },
]

const experiences = [
  {
    company: 'Esparkbiz',
    role: 'Flutter Developer',
    duration: 'Sep 2023 - Present',
    summary:
      'Leading scalable cross-platform architecture for 15+ production applications with a focus on long-term maintainability.',
    bullets: [
      'Leading scalable cross-platform architecture for 15+ production applications with a focus on long-term maintainability',
      'Optimized feature delivery pipelines contributing to a 95% on-time release rate across multiple enterprise projects',
      'Implemented refined modular design patterns reducing development time for new features by 20%',
    ],
  },
  {
    company: 'Esparkbiz',
    role: 'Software Developer Intern',
    duration: 'Jan 2023 - Sep 2023',
    summary:
      'Contributed to core feature refactoring that improved codebase maintainability by 30% during high-growth phase.',
    bullets: [
      'Contributed to core feature refactoring that improved codebase maintainability by 30% during high-growth phase',
      'Followed strict Agile methodologies and Git-based workflows, participating in 20+ successful sprint releases',
      'Boosted user engagement by 25% through performance profiling and UI-pixel-perfect optimizations',
    ],
  },
  {
    company: 'Native Systems',
    role: 'Independent Developer',
    duration: 'Jun 2021 - Dec 2022',
    summary:
      'Developed native Android modules and components using Kotlin/Java, establishing a strong platform-level foundation.',
    bullets: [
      'Developed native Android modules and components using Kotlin/Java, establishing a strong platform-level foundation',
      'Built multi-platform MVP modules for freelance clients, mastering the bridge between Flutter and Native environments',
      'Researched and implemented modern UI patterns in Jetpack Compose to streamline cross-platform design consistency',
    ],
  },
]

const repositories = [
  {
    name: 'split_ease',
    description:
      'A comprehensive expense management engine facilitating group orchestration, peer invitations, and automated split synchronization. Features multi-tier role management (Owner, Admin, Member) with granular permission control.',
    stars: '420',
    url: '#',
    tech: 'FLUTTER / SUPABASE',
  },
  {
    name: 'dart_platform_bridge',
    description:
      'Optimized Method Channel wrapper for seamless biometric and complex native permissions handling.',
    stars: '215',
    url: '#',
    tech: 'DART / KOTLIN',
  },
]

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Architecture', href: '#about' },
      { name: 'Prototypes', href: '#projects' },
      { name: 'Core Engine', href: '#skills' },
      { name: 'Stats', href: '#stats' },
    ],
  },
  {
    title: 'Expertise',
    links: [
      { name: 'Flutter Dev', href: '#top' },
      { name: 'Clean Architecture', href: '#about' },
      { name: 'Cross-Platform', href: '#skills' },
      { name: 'Performance Optimization', href: '#stats' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { name: 'javiyaraj4@gmail.com', href: 'mailto:javiyaraj4@gmail.com?subject=Project Inquiry' },
      { name: 'GitHub', href: 'https://github.com/JAVIYARAJ' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/javiyaraj/' },
    ],
  },
]

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-3xl space-y-5">
      <div className="section-kicker">
        <span className="eyebrow-dot" />
        {label}
      </div>
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p className="text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function StatCard({ stat }: { stat: ImpactStat }) {
  const Icon = stat.icon

  return (
    <div className="surface-card h-full p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-foreground text-background">
          <Icon size={20} />
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {stat.sublabel}
        </span>
      </div>

      <p className="mt-6 font-[family:var(--font-heading)] text-4xl tracking-[-0.05em] text-foreground">
        {stat.value}
      </p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {stat.label}
      </p>
    </div>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const Icon = project.icon

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="surface-card-strong relative h-full overflow-hidden p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at top right, ${project.accent}22 0%, transparent 55%)`,
        }}
      />
      <div className="pointer-events-none absolute right-5 top-5 text-[6.5rem] font-black leading-none text-foreground/[0.04]">
        0{index + 1}
      </div>

      <div className="relative z-10 flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="rounded-full border border-border bg-white/80 px-3 py-1">
                {project.category}
              </span>
              <span>{project.type}</span>
            </div>
            <h3 className="font-[family:var(--font-heading)] text-3xl tracking-[-0.04em] sm:text-4xl">
              {project.name}
            </h3>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.4rem] border border-border bg-white/75 text-foreground shadow-[0_18px_40px_rgba(27,30,24,0.08)]">
            <Icon size={22} />
          </div>
        </div>

        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-white/75 px-3 py-1.5 text-sm text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-border bg-white/78 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Engineering Impact
            </p>
            <p className="mt-2 text-sm leading-7 text-foreground/85">{project.impact}</p>
          </div>

          <div className="grid gap-3">
            {project.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-border bg-white/78 p-4"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {project.links.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-3">
            {project.links.map((link) => {
              const LinkIcon = link.icon

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <LinkIcon size={16} />
                  {link.label}
                  <ArrowUpRight size={14} />
                </a>
              )
            })}
          </div>
        ) : null}
      </div>
    </motion.article>
  )
}

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = group.icon

  return (
    <div className="surface-card h-full p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-foreground text-background">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
              {group.title}
            </h3>
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {group.detail}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
        {group.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-white/75 px-3 py-1.5 text-sm text-foreground/80"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ExperienceCard({
  item,
  delay,
  index,
}: {
  item: (typeof experiences)[number]
  delay: number
  index: number
}) {
  return (
    <Reveal delay={delay}>
      <article className="surface-card-strong relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-y-8 left-6 w-px bg-border sm:left-8" />

        <div className="relative grid gap-6 pl-6 sm:pl-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-accent shadow-[0_0_0_6px_rgba(199,107,79,0.12)]" />
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Stage 0{index + 1}
              </span>
            </div>

            <div className="rounded-[1.35rem] border border-border bg-white/75 p-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {item.duration}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/65">
                {item.company}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-[family:var(--font-heading)] text-2xl tracking-[-0.04em] text-foreground sm:text-3xl">
              {item.role}
            </h3>
            <p className="max-w-3xl text-sm leading-8 text-muted-foreground sm:text-base">
              {item.summary}
            </p>
            <div className="grid gap-3">
              {item.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-border bg-white/75 p-4"
                >
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                    <Check size={12} />
                  </span>
                  <p className="text-sm leading-7 text-foreground/85">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function PortfolioHome() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  })

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleCopyEmail = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }

    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      setCopiedEmail(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submitting) {
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const payload = await response
          .json()
          .catch(() => ({ error: 'Something went wrong. Please try again.' }))

        throw new Error(payload.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        message: '',
        website: '',
      })
      window.setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div id="top" className="relative overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
        <div className="shell">
          <div className="surface-card flex items-center justify-between px-5 py-4 sm:px-6">
            <a
              href="#top"
              className="font-[family:var(--font-heading)] text-2xl tracking-[-0.05em] text-foreground"
            >
              JR
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:-translate-y-0.5"
              >
                Resume.pdf
                <Download size={16} />
              </a>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-foreground md:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[5.25rem] z-40 md:hidden"
          >
            <div className="surface-card-strong p-6">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[1.25rem] border border-border bg-white/75 px-4 py-4 text-sm font-medium text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[1.25rem] bg-foreground px-4 py-4 text-sm font-medium text-background"
                >
                  Resume.pdf
                  <Download size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="pt-28 sm:pt-32">
        <section className="shell grid gap-10 pb-24 pt-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.82fr)] lg:items-center lg:gap-14 lg:pb-32 lg:pt-16">
          <Reveal className="max-w-[40rem] space-y-9">
            <div className="section-kicker">
              <span className="eyebrow-dot" />
              Senior Flutter Developer
            </div>

            <div className="space-y-6">
              <h1 className="font-[family:var(--font-heading)] text-5xl tracking-[-0.075em] text-foreground sm:text-6xl lg:text-[5.5rem] lg:leading-[0.92]">
                JAVIYA RAJ.
              </h1>
              <p className="max-w-xl text-xl font-medium leading-8 text-foreground/82 sm:text-2xl">
                Flutter developer building beautiful cross-platform apps.
              </p>
              <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Developing high-performance, scalable mobile applications using
                Flutter and Dart, leveraging Clean Architecture to ensure
                maintainability and efficiency since 2021.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:-translate-y-0.5"
              >
                Explore My Work
                <ArrowRight size={16} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/80 px-6 py-4 text-sm font-medium text-foreground transition hover:-translate-y-0.5"
              >
                Resume.pdf
                <Download size={16} />
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {heroFacts.map((fact) => (
                <span
                  key={fact}
                  className="rounded-full border border-border bg-white/72 px-4 py-2 text-sm text-foreground/80"
                >
                  {fact}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="surface-card-strong relative overflow-hidden p-6 sm:p-8 lg:ml-auto lg:max-w-[31rem] lg:p-10"
            >
              <div className="soft-grid absolute inset-0 opacity-35" />
              <div className="pointer-events-none absolute right-6 top-4 text-[6rem] font-black leading-none text-foreground/[0.05]">
                FLTR
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="section-kicker bg-white/80">
                    <span className="eyebrow-dot" />
                    Available for freelance
                  </div>
                  <span className="rounded-full bg-foreground px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-background">
                    Since 2021
                  </span>
                </div>

                <div className="rounded-[1.75rem] bg-foreground p-6 text-background shadow-[0_24px_80px_rgba(27,30,24,0.18)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/70">
                    Core Focus
                  </p>
                  <p className="mt-3 font-[family:var(--font-heading)] text-2xl tracking-[-0.04em]">
                    High-performance Flutter apps with clean architecture,
                    scalable delivery, and strong production UX.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-border bg-white/75 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Current Stack
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {heroStack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[rgba(217,143,107,0.12)] px-3 py-1.5 text-sm text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </section>

        <section id="about" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Professional Vision"
                title="Modern Architecture."
                description="I believe in building software that is as beautiful under the hood as it is on the surface. My approach centers on modularity, testability, and deterministic state management."
              />
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutFeatures.map((item, index) => {
                const Icon = item.icon

                return (
                  <Reveal key={item.title} delay={0.08 + index * 0.05}>
                    <div className="surface-card h-full p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-foreground text-background">
                        <Icon size={20} />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="stats" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Verified Metrics"
                title="Impact by Numbers."
                description="Tangible results from architecting high-scale cross-platform systems and modular engineering environments."
              />
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.05 + index * 0.05}>
                  <StatCard stat={stat} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="surface-card-strong p-6 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Engineering Velocity Tier
                    </p>
                    <h3 className="font-[family:var(--font-heading)] text-3xl tracking-[-0.04em] sm:text-4xl">
                      Classified within the top 5% of production-grade architecture systems.
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'RETENTION', value: '99%' },
                      { label: 'SATISFACTION', value: '4.9/5' },
                      { label: 'UPTIME', value: 'INFINITY' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[1.5rem] border border-border bg-white/75 p-3 text-center sm:p-4"
                      >
                        <p className="text-lg font-semibold text-foreground sm:text-xl">{item.value}</p>
                        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground sm:text-[0.72rem] sm:tracking-[0.16em]">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Portfolio Showcase"
                title="Featured Impact."
                description="Real-world applications engineered for performance, used by thousands of active users."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-12">
              {projects.map((project, index) => (
                <Reveal
                  key={project.name}
                  delay={0.05 + index * 0.05}
                  className={project.span}
                >
                  <ProjectCard project={project} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Technical Ecosystem"
                title="Hardware-Level Engineering."
                description="A battle-tested set of technologies designed for performance, stability, and extreme scale."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {skillGroups.map((group, index) => (
                <Reveal key={group.title} delay={0.05 + index * 0.05}>
                  <SkillCard group={group} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Engineering Lifecycle"
                title="Professional Path."
                description="Production Flutter delivery, enterprise execution, and native Android foundations presented in a clearer timeline."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Career Focus
                  </p>
                  <h3 className="font-[family:var(--font-heading)] text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
                    Flutter architecture, enterprise delivery, and native Android foundations.
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {experienceHighlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-white/75 px-4 py-2 text-sm text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="space-y-5">
              {experiences.map((item, index) => (
                <ExperienceCard
                  key={`${item.company}-${item.role}`}
                  item={item}
                  delay={0.08 + index * 0.05}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Recent Repositories"
                title="Digital Foundations."
                description="Curated architectural modules and production-grade repositories designed for scalability."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="surface-card-strong flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <p className="font-[family:var(--font-heading)] text-3xl tracking-[-0.05em] text-foreground">
                      34+
                    </p>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Repositories
                    </p>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div>
                    <p className="font-[family:var(--font-heading)] text-3xl tracking-[-0.05em] text-foreground">
                      8k+
                    </p>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Code Commits
                    </p>
                  </div>
                </div>

                <a
                  href="https://github.com/JAVIYARAJ"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:-translate-y-0.5"
                >
                  Follow my ecosystem on GitHub
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {repositories.map((repo, index) => (
                <Reveal key={repo.name} delay={0.06 + index * 0.05}>
                  <article className="surface-card h-full p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-foreground text-background">
                        <GitBranch size={20} />
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm font-medium text-foreground">
                        <Star size={14} />
                        {repo.stars}
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <h3 className="font-[family:var(--font-heading)] text-3xl tracking-[-0.04em] text-foreground">
                        {repo.name}
                      </h3>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {repo.tech}
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                      {repo.description}
                    </p>

                    {repo.url !== '#' ? (
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-accent"
                      >
                        Open repository
                        <ArrowUpRight size={15} />
                      </a>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Transmission Link"
                title="Let's Build Something Extraordinary."
                description="Whether you have an app idea, need technical consulting, or want to collaborate on open-source, I'm all ears."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal delay={0.05}>
                <div className="surface-card-strong h-full p-8 sm:p-10">
                  <h3 className="font-[family:var(--font-heading)] text-3xl tracking-[-0.04em] sm:text-4xl">
                    Get in Touch.
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    Ready to architect your next high-performance mobile
                    ecosystem. I typically respond within one business cycle.
                  </p>

                  <div className="mt-8 grid gap-4">
                    <a
                      href={`mailto:${emailAddress}?subject=Project Inquiry`}
                      className="rounded-[1.5rem] border border-border bg-white/75 p-5 transition hover:-translate-y-0.5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Direct Communication
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        {emailAddress}
                      </p>
                    </a>

                    <a
                      href="https://linkedin.com/in/javiyaraj/"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.5rem] border border-border bg-white/75 p-5 transition hover:-translate-y-0.5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        LinkedIn
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        linkedin.com/in/javiyaraj
                      </p>
                    </a>

                    <a
                      href="https://github.com/JAVIYARAJ"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.5rem] border border-border bg-white/75 p-5 transition hover:-translate-y-0.5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        GitHub
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        github.com/JAVIYARAJ
                      </p>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:-translate-y-0.5"
                  >
                    {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                    {copiedEmail ? 'Email copied' : 'Copy email'}
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <form onSubmit={handleSubmit} className="surface-card-strong p-8 sm:p-10">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      Full Name
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Javiya Raj"
                        className="h-14 rounded-2xl border border-border bg-white/80 px-4 text-sm text-foreground outline-none transition focus:border-foreground/20 focus:ring-2 focus:ring-ring/20"
                      />
                    </label>

                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      Email Address
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="h-14 rounded-2xl border border-border bg-white/80 px-4 text-sm text-foreground outline-none transition focus:border-foreground/20 focus:ring-2 focus:ring-ring/20"
                      />
                    </label>
                  </div>

                  <label className="mt-5 grid gap-2 text-sm font-medium text-foreground">
                    Project Details
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={7}
                      placeholder="Tell me about your vision..."
                      className="rounded-[1.5rem] border border-border bg-white/80 px-4 py-4 text-sm text-foreground outline-none transition focus:border-foreground/20 focus:ring-2 focus:ring-ring/20"
                    />
                  </label>

                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mt-6 space-y-3">
                    {submitted ? (
                      <p className="rounded-[1.25rem] bg-[rgba(109,130,98,0.14)] px-4 py-3 text-sm text-foreground">
                        Transmission Received!
                      </p>
                    ) : null}

                    {errorMessage ? (
                      <p className="rounded-[1.25rem] bg-[rgba(185,65,36,0.12)] px-4 py-3 text-sm text-foreground">
                        {errorMessage}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || submitted}
                    className="mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Send size={16} />
                    {submitted ? 'Transmission Received!' : submitting ? 'Transmitting...' : 'Submit'}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell pb-12 pt-4">
        <div className="surface-card-strong p-6 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-[family:var(--font-heading)] text-3xl tracking-[-0.05em] text-foreground">
                  JAVIYA RAJ.
                </h3>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Flutter App Architect
                </p>
              </div>

              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Specialized in high-performance cross-platform development since
                2021, with 3+ years of experience engineering scalable mobile
                ecosystems with Clean Architecture.
              </p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/75 text-foreground transition hover:-translate-y-0.5"
                      aria-label={item.label}
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {footerLinks.map((section) => (
                <div key={section.title} className="space-y-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {section.title}
                  </p>
                  <div className="flex flex-col gap-3">
                    {section.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="text-sm text-foreground/80 transition hover:text-foreground"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Developed by Raj Javiya
            </p>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-accent"
            >
              Uplink
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
