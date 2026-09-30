'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import type { GitHubStats, Repo } from '@/lib/github'
import { hasCaseStudy } from '@/lib/case-studies'
import { projects, type Project } from '@/lib/projects'
import type { ChangeEvent, FormEvent, KeyboardEvent as ReactKeyboardEvent, PointerEvent, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BatteryFull,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Copy,
  CornerDownLeft,
  Cpu,
  Database,
  Download,
  FileText,
  GitBranch,
  Github,
  Globe,
  History,
  House,
  LayoutGrid,
  Layers3,
  Linkedin,
  Mail,
  MessageCircle,
  Play,
  Rocket,
  Search,
  Send,
  Server,
  ShieldCheck,
  SignalHigh,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Twitter,
  Wifi,
  Workflow,
  X,
  Zap,
} from 'lucide-react'

const emailAddress = 'javiyaraj4@gmail.com'
const resumeUrl = '/resume.pdf'

// Free scheduling link (Cal.com).
const bookingUrl = 'https://cal.com/raj-javiya-qkewzq/30min'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/JAVIYARAJ', icon: Github, tile: '#101114' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/javiyaraj/', icon: Linkedin, tile: '#0a66c2' },
  { label: 'Email', href: `mailto:${emailAddress}?subject=Portfolio Inquiry`, icon: Mail, tile: '#2f5bff' },
  { label: 'X / Twitter', href: 'https://x.com/Rjcoding', icon: Twitter, tile: '#101114' },
]

// Bottom tab bar. Every section on the page maps to one tab so the active
// state stays meaningful while scrolling through the in-between sections.
const tabs = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'projects', label: 'Apps', icon: LayoutGrid },
  { id: 'skills', label: 'Skills', icon: Layers3 },
  { id: 'experience', label: 'Journey', icon: History },
  { id: 'contact', label: 'Contact', icon: MessageCircle },
]

const sectionToTab: Record<string, string> = {
  home: 'home',
  about: 'home',
  projects: 'projects',
  'open-source': 'projects',
  skills: 'skills',
  experience: 'experience',
  achievements: 'experience',
  services: 'contact',
  contact: 'contact',
}

// Everything Spotlight (⌘K) can jump to, besides the apps and actions.
const spotlightSections = [
  { id: 'home', label: 'Home', hint: 'Back to the top', icon: House },
  { id: 'about', label: 'About', hint: 'How I work', icon: Sparkles },
  { id: 'projects', label: 'Apps', hint: 'Everything I’ve shipped', icon: LayoutGrid },
  { id: 'open-source', label: 'Open source', hint: 'GitHub repositories', icon: GitBranch },
  { id: 'skills', label: 'Skills', hint: 'My toolkit', icon: Layers3 },
  { id: 'experience', label: 'Journey', hint: 'Version history of my career', icon: History },
  { id: 'achievements', label: 'Achievements', hint: 'Badges I’ve earned', icon: Trophy },
  { id: 'services', label: 'Services', hint: 'In-app purchases — what you can hire me for', icon: Rocket },
  { id: 'contact', label: 'Contact', hint: 'Send me a message', icon: MessageCircle },
]

const marqueeItems = [
  'Kotlin',
  'Jetpack Compose',
  'Flutter',
  'Dart',
  'BLoC',
  'Riverpod',
  'Hilt',
  'Room',
  'Retrofit',
  'Supabase',
  'Firebase',
  'GraphQL',
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'GitHub Actions',
  'Figma',
]

const heroStats = [
  { value: '4+', label: 'Years building apps' },
  { value: '15+', label: 'Apps shipped' },
  { value: '10K+', label: 'Active users' },
  { value: '4.8★', label: 'App Store rating' },
]

const aboutFeatures = [
  {
    title: 'Smooth performance',
    description: '60fps UIs, tuned with Baseline Profiles and the Android Studio Profiler.',
    icon: Zap,
  },
  {
    title: 'Clean Architecture',
    description: 'MVVM, unidirectional data flow, and feature-first modules that stay easy to change.',
    icon: ShieldCheck,
  },
  {
    title: 'Native & cross-platform',
    description: 'Native Android with Kotlin & Compose, and Flutter for iOS + Android from one codebase.',
    icon: Smartphone,
  },
  {
    title: 'Reliable delivery',
    description: 'Automated CI/CD with Gradle and GitHub Actions, all the way to the stores.',
    icon: Workflow,
  },
]

type SkillLevel = 'Expert' | 'Proficient' | 'Familiar'

type SkillGroup = {
  title: string
  description: string
  icon: LucideIcon
  color: string
  skills: string[]
  level: SkillLevel
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Native Android',
    description: 'Kotlin, Jetpack Compose, and the Android SDK.',
    icon: Smartphone,
    color: '#16a34a',
    level: 'Expert',
    skills: [
      'Kotlin',
      'Jetpack Compose',
      'MVVM',
      'ViewModel & StateFlow',
      'Coroutines',
      'Navigation Compose',
      'WorkManager',
      'LiveData',
      'Android SDK',
      'Java',
    ],
  },
  {
    title: 'Flutter',
    description: 'Cross-platform apps, custom widgets, and platform channels.',
    icon: CircuitBoard,
    color: '#0284c7',
    level: 'Expert',
    skills: ['Flutter', 'Dart', 'BLoC / Cubit', 'Riverpod', 'GetX / Provider', 'Shorebird (OTA)', 'Custom Animations', 'Responsive UI'],
  },
  {
    title: 'Web',
    description: 'Web platforms and admin panels with React, Next.js and Node.js.',
    icon: Globe,
    color: '#0d9488',
    level: 'Proficient',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Vercel'],
  },
  {
    title: 'Architecture',
    description: 'Code that stays easy to test and change as the app grows.',
    icon: Layers3,
    color: '#7c3aed',
    level: 'Expert',
    skills: ['Clean Architecture', 'Feature-first Modules', 'Hilt / Dagger', 'GetIt', 'Repository Pattern', 'SOLID'],
  },
  {
    title: 'Data & APIs',
    description: 'Databases, APIs, offline-first data layers and real-time sync.',
    icon: Database,
    color: '#ea580c',
    level: 'Proficient',
    skills: ['Retrofit', 'Room', 'DataStore', 'GraphQL (Apollo)', 'Firebase', 'Supabase / PostgreSQL', 'MySQL', 'MongoDB', 'Hive / SQLite'],
  },
  {
    title: 'Testing & Delivery',
    description: 'Automated tests, profiling, and CI/CD release pipelines.',
    icon: ShieldCheck,
    color: '#db2777',
    level: 'Proficient',
    skills: [
      'JUnit & Espresso',
      'Compose UI Testing',
      'Flutter Widget Tests',
      'Android Studio Profiler',
      'Baseline Profiles',
      'GitHub Actions & Gradle',
      'Play Store & App Store',
    ],
  },
  {
    title: 'AI & Tools',
    description: 'AI-assisted workflows for faster, higher-quality delivery.',
    icon: Sparkles,
    color: '#4f46e5',
    level: 'Proficient',
    skills: ['Claude', 'Cursor', 'Antigravity', 'Gemini', 'Figma to Compose', 'Git / GitHub'],
  },
]

const experiences = [
  {
    version: 'v3.0',
    company: 'Esparkbiz',
    role: 'Senior Mobile Developer',
    duration: 'Sep 2023 – Present',
    summary:
      'Building and shipping production apps for Android and iOS with Flutter — and going native with Kotlin and Jetpack Compose when a feature needs the platform.',
    bullets: [
      'Built and shipped production Flutter apps with Clean Architecture, MVVM and feature-first modules — easier to maintain and faster to ship new features.',
      'Brought BLoC/Cubit state management to the team, improving testability and cutting state-related bugs caught in code review.',
      'Built native Android features in Kotlin, Java and Jetpack Compose wherever the app needed platform-specific capabilities.',
      'Turned Figma designs into responsive, pixel-accurate UIs with custom animations that run smoothly on Android and iOS.',
      'Integrated REST and GraphQL APIs, Supabase and Firebase (Auth, Firestore, FCM) behind a repository layer for offline resilience.',
      'Owned App Store and Play Store releases end to end — versioning, staged rollouts and release notes — on GitHub Actions CI/CD.',
      'Led architecture and code-quality reviews, joined client requirement discussions, and mentored two junior developers.',
    ],
  },
  {
    version: 'v2.0',
    company: 'Esparkbiz',
    role: 'Software Developer Intern',
    duration: 'Jan 2023 – Sep 2023',
    summary: 'Built and refactored features across production mobile apps in an Agile team.',
    bullets: [
      'Refactored core features across production apps, improving maintainability by 30%.',
      'Optimized UI rendering and async work, contributing to a 25% lift in user engagement in three months.',
      'Wrote unit and UI tests (JUnit, Compose UI testing, Flutter widget tests).',
    ],
  },
  {
    version: 'v1.0',
    company: 'Freelance',
    role: 'Independent Mobile Developer',
    duration: 'Jun 2021 – Dec 2022',
    summary: 'Built native Android modules and cross-platform app features for clients.',
    bullets: [
      'Built native Android modules and components with Kotlin and Java.',
      'Delivered MVP modules for clients, including native platform-channel bridges.',
      'Adopted Jetpack Compose early to keep UI consistent across platforms.',
    ],
  },
]

const achievements = [
  {
    title: 'GitHub Copilot “Finish-Up-A-Thon”',
    source: 'GitHub & DEV Community',
    label: 'Challenge completion badge',
    image: '/copilot-badge.png',
    imageAlt: 'GitHub Copilot Finish-Up-A-Thon Challenge Completion Badge',
    description:
      'Revived and finished a side project using GitHub Copilot, as part of a global challenge on AI-assisted engineering.',
    highlights: ['AI-assisted engineering', 'Side-project revival', 'Published on DEV'],
    links: [
      { label: 'View on DEV', href: 'https://dev.to/raj_javiya' },
      { label: 'LinkedIn post', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7479166408308711425/' },
    ],
  },
  {
    title: 'DEV Weekend Challenge',
    source: 'DEV Community',
    label: 'Weekend challenge award',
    image: '/dev-weekend-badge.png',
    imageAlt: 'DEV Weekend Challenge Completion Badge',
    description: 'Awarded for completing a DEV Weekend Challenge — planning, building, and shipping in a single weekend.',
    highlights: ['Rapid prototyping', 'Shipped in a weekend', 'Community participant'],
    links: [{ label: 'View on DEV', href: 'https://dev.to/raj_javiya' }],
  },
]

// Shown as App Store "In-App Purchases". Set `price` (e.g. 'From $499') to show it on the button instead of "Get".
type Service = {
  title: string
  description: string
  icon: LucideIcon
  color: string
  deliverables: string[]
  price?: string
}

const services: Service[] = [
  {
    title: 'Flutter app development',
    description:
      'One codebase for iOS and Android — from Figma designs to a store-ready app, or a fast MVP that can grow into the full product.',
    icon: Smartphone,
    color: '#0284c7',
    deliverables: ['iOS & Android from one codebase', 'Clean Architecture + BLoC/Cubit', 'MVP to full product'],
  },
  {
    title: 'Native Android development',
    description:
      'Kotlin and Jetpack Compose apps with MVVM — or native modules when a Flutter app needs platform-specific features.',
    icon: Cpu,
    color: '#16a34a',
    deliverables: ['Kotlin & Jetpack Compose', 'Native modules for Flutter apps', 'Retrofit, Room & FCM'],
  },
  {
    title: 'Web platforms & admin panels',
    description:
      'Dashboards and back-office tools with React and Next.js: billing, stock, reports, and role-based access for your team.',
    icon: Globe,
    color: '#0d9488',
    deliverables: ['Next.js / React', 'Role-based access & audit logs', 'Reports, billing & exports'],
  },
  {
    title: 'Backend & API integration',
    description:
      'Connect your app to REST or GraphQL APIs, Supabase or Firebase — with login, real-time updates and push notifications.',
    icon: Server,
    color: '#ea580c',
    deliverables: ['REST & GraphQL APIs', 'Supabase / Firebase / Node.js', 'Auth, real-time & push (FCM)'],
  },
  {
    title: 'Architecture & code review',
    description:
      'A review of your existing app: structure, state management and performance — with a clear plan to fix what slows your team down.',
    icon: ShieldCheck,
    color: '#7c3aed',
    deliverables: ['Codebase & architecture audit', 'State management refactor', 'Performance fixes'],
  },
  {
    title: 'App Store & Play Store release',
    description:
      'Get your app published and keep releases smooth: store listings, versioning, staged rollouts and automated CI/CD builds.',
    icon: Rocket,
    color: '#db2777',
    deliverables: ['Store submission & review', 'Staged rollouts & versioning', 'CI/CD (GitHub Actions, Codemagic)'],
  },
]

const chatBubbles = [
  'Hey 👋 thanks for stopping by!',
  'Got an app idea, a codebase that needs help, or want a second opinion on architecture?',
  'Send me a message — I usually reply within a day.',
]

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:bg-foreground/85'
const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary'

// Fire a Google Analytics (GA4) event if gtag is available. Safe no-op otherwise.
function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  w.gtag?.('event', action, params)
}

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
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
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
    <div className="max-w-2xl space-y-4">
      <p className="section-kicker">
        <span className="eyebrow-dot" />
        {label}
      </p>
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{description}</p>
      ) : null}
    </div>
  )
}

// Rounded-square app icon: real icon image when we have one, otherwise a tinted tile.
function AppIcon({ project, className }: { project: Project; className: string }) {
  const Icon = project.icon

  if (project.appIcon && project.appIconWide) {
    return (
      <span aria-hidden className={`flex items-center justify-center bg-white p-1.5 ring-1 ring-black/5 ${className}`}>
        <img src={project.appIcon} alt="" className="h-auto w-full object-contain" />
      </span>
    )
  }

  if (project.appIcon) {
    return (
      <span aria-hidden className={`relative block overflow-hidden ring-1 ring-black/5 ${className}`}>
        <NextImage src={project.appIcon} alt="" fill sizes="80px" className="object-cover" />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className={`flex items-center justify-center text-white ${className}`}
      style={{ background: `linear-gradient(145deg, ${project.accent}, ${project.accent}cc)` }}
    >
      <Icon className="h-[46%] w-[46%]" strokeWidth={2} />
    </span>
  )
}

// Tapping a home-screen icon "launches" the app: a quick preview zooms out of the icon, like iOS.
function PhoneAppPreview({ project, origin, onClose }: { project: Project; origin: string; onClose: () => void }) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const shots = project.mockups?.slice(0, project.landscapeMockups ? 1 : 3)
  const facts = [...project.stats, { label: 'Platform', value: project.platform }]

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      opener?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-label={`${project.name} preview`}
      style={{ transformOrigin: origin }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.12, borderRadius: '40%' }}
      animate={{ opacity: 1, scale: 1, borderRadius: '0%' }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.12, borderRadius: '40%' }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 30 }}
      className="absolute inset-0 z-10 flex flex-col overflow-hidden bg-background"
    >
      <div
        className="relative px-5 pb-5 pt-11 text-white"
        style={{ background: `linear-gradient(160deg, ${project.accent}, ${project.accent}c7)` }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-3 top-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white transition hover:bg-black/30"
        >
          <X size={14} />
        </button>
        <AppIcon project={project} className="h-14 w-14 rounded-[1rem] shadow-[0_6px_16px_rgba(0,0,0,0.25)]" />
        <p className="mt-3 text-lg font-bold leading-tight">{project.name}</p>
        <p className="text-[0.72rem] text-white/85">{project.category}</p>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pb-7 pt-4">
        <dl className="grid grid-cols-3 gap-1.5 rounded-2xl bg-card p-2.5 text-center ring-1 ring-black/5">
          {facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dd className="truncate text-[0.8rem] font-bold text-foreground">{fact.value}</dd>
              <dt className="truncate text-[0.55rem] uppercase tracking-[0.08em] text-muted-foreground">{fact.label}</dt>
            </div>
          ))}
        </dl>

        <p className={`text-[0.75rem] leading-5 text-foreground/80 ${shots ? 'line-clamp-3' : 'line-clamp-6'}`}>
          {project.description}
        </p>

        {shots ? (
          <div className="flex gap-1.5 overflow-hidden">
            {shots.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className={
                  project.landscapeMockups
                    ? 'aspect-[16/10] w-full rounded-lg object-cover ring-1 ring-black/5'
                    : 'h-32 w-auto rounded-lg object-cover'
                }
              />
            ))}
          </div>
        ) : null}

        <a
          href={`#app-${project.slug}`}
          onClick={onClose}
          className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground py-2.5 text-[0.75rem] font-semibold text-background transition hover:bg-foreground/85"
        >
          View full listing
          <ArrowRight size={13} />
        </a>
      </div>
    </motion.div>
  )
}

type IslandMessage = { key: string; icon: ReactNode; text: string }

// Dynamic Island: every few seconds it expands with a short live status, then shrinks back.
// Messages are built after mount (the IST clock would otherwise mismatch the server render).
function useIslandMessage() {
  const [message, setMessage] = useState<IslandMessage | null>(null)

  useEffect(() => {
    const building = projects.find((project) => project.inProgress)
    const istTime = () =>
      new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' }).format(new Date())

    const messages: (() => IslandMessage)[] = [
      ...(building
        ? [
            () => ({
              key: 'building',
              icon: <AppIcon project={building} className="h-4 w-4 shrink-0 rounded-[0.3rem]" />,
              text: `Building ${building.name}`,
            }),
          ]
        : []),
      () => ({
        key: 'time',
        icon: <Globe size={11} className="shrink-0 text-[#7aa2ff]" />,
        text: `${istTime()} IST · replies in a day`,
      }),
      () => ({
        key: 'status',
        icon: <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-online" />,
        text: 'Open to new projects',
      }),
    ]

    let index = 0
    let timer: number
    const show = () => {
      setMessage(messages[index % messages.length]())
      index += 1
      timer = window.setTimeout(() => {
        setMessage(null)
        timer = window.setTimeout(show, 2200)
      }, 3800)
    }
    timer = window.setTimeout(show, 2000)
    return () => window.clearTimeout(timer)
  }, [])

  return message
}

// The hero: a phone home screen where every app icon is a real project.
function HeroPhone() {
  const reduce = useReducedMotion()
  const screenRef = useRef<HTMLDivElement>(null)
  const [launched, setLaunched] = useState<{ project: Project; origin: string } | null>(null)
  const closeApp = useCallback(() => setLaunched(null), [])
  const island = useIslandMessage()

  // Jiggle mode: press and hold an icon, then drag icons onto each other to rearrange them.
  const [jiggle, setJiggle] = useState(false)
  const [order, setOrder] = useState(() => projects.map((project) => project.slug))
  const pressTimer = useRef<number | undefined>(undefined)
  const longPressed = useRef(false)
  const pressPointerType = useRef('')

  useEffect(() => {
    if (!jiggle) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setJiggle(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [jiggle])

  const startPress = (e: PointerEvent<HTMLElement>) => {
    pressPointerType.current = e.pointerType
    if (jiggle) return
    longPressed.current = false
    window.clearTimeout(pressTimer.current)
    pressTimer.current = window.setTimeout(() => {
      longPressed.current = true
      setJiggle(true)
      navigator.vibrate?.(15)
      trackEvent('hero_jiggle_mode')
    }, 500)
  }

  const cancelPress = () => window.clearTimeout(pressTimer.current)

  // Swap the dragged icon with whichever icon it was dropped on.
  const handleDrop = (slug: string, point: { x: number; y: number }) => {
    const target = document
      .elementsFromPoint(point.x - window.scrollX, point.y - window.scrollY)
      .map((el) => (el as HTMLElement).closest<HTMLElement>('[data-app-slug]')?.dataset.appSlug)
      .find((found) => found && found !== slug)
    if (!target) return
    setOrder((current) => {
      const next = [...current]
      const from = next.indexOf(slug)
      const to = next.indexOf(target)
      ;[next[from], next[to]] = [next[to], next[from]]
      return next
    })
  }

  const orderedProjects = order
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project))

  // Zoom the preview out of the tapped icon's position on the screen.
  const launchApp = (project: Project, icon: HTMLElement) => {
    const screen = screenRef.current?.getBoundingClientRect()
    const rect = icon.getBoundingClientRect()
    const origin = screen
      ? `${((rect.left + rect.width / 2 - screen.left) / screen.width) * 100}% ${((rect.top + rect.width / 2 - screen.top) / screen.height) * 100}%`
      : '50% 50%'
    setLaunched({ project, origin })
    trackEvent('hero_app_open', { project: project.slug })
  }

  const pop = (i: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    transition: reduce
      ? { duration: 0 }
      : { delay: 0.35 + i * 0.05, type: 'spring' as const, stiffness: 420, damping: 22 },
  })

  return (
    <div className="relative mx-auto w-full max-w-[18.5rem] sm:max-w-[19.5rem]">
      <div aria-hidden className="absolute -inset-10 rounded-[5rem] bg-accent/15 blur-3xl" />

      <div className="relative">
        <div className={`float-slow relative ${jiggle ? '[animation-play-state:paused]' : ''}`}>
          <div className="rounded-[3.1rem] bg-[#101114] p-2.5 shadow-[0_40px_80px_-30px_rgba(16,17,20,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
            <div
              ref={screenRef}
              onClick={(e) => {
                if (jiggle && !(e.target as HTMLElement).closest('a, button')) setJiggle(false)
              }}
              className="phone-wallpaper relative aspect-[9/18] overflow-hidden rounded-[2.5rem]"
            >
              {/* Status bar */}
              <div
                className={`relative z-20 flex items-center justify-between px-7 pt-3.5 text-[0.72rem] font-semibold text-white transition-opacity duration-300 ${island || jiggle ? 'opacity-0' : ''}`}
              >
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <SignalHigh size={13} strokeWidth={2.6} />
                  <Wifi size={13} strokeWidth={2.6} />
                  <BatteryFull size={16} strokeWidth={2} />
                </span>
              </div>
              <motion.div
                aria-hidden
                initial={false}
                animate={{ width: island ? '14.5rem' : '5.5rem', height: island ? '1.75rem' : '1.4rem' }}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute left-1/2 top-2.5 z-30 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-black text-white"
              >
                <AnimatePresence mode="wait">
                  {island ? (
                    <motion.span
                      key={island.key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : 0.12 }}
                      className="flex min-w-0 items-center gap-1.5 whitespace-nowrap px-3 text-[0.62rem] font-semibold"
                    >
                      {island.icon}
                      <span className="truncate">{island.text}</span>
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.div>

              {jiggle ? (
                <button
                  type="button"
                  onClick={() => setJiggle(false)}
                  className="absolute right-4 top-2.5 z-40 h-[1.4rem] rounded-full bg-white/90 px-3 text-[0.68rem] font-semibold text-[#101114] shadow-sm transition hover:bg-white"
                >
                  Done
                </button>
              ) : null}

              {/* Widget */}
              <motion.div
                {...pop(0)}
                className="mx-4 mt-6 rounded-[1.4rem] bg-white/20 p-3.5 text-white ring-1 ring-white/25 backdrop-blur-md"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/75">Status</p>
                <p className="mt-1 text-[0.95rem] font-semibold leading-tight">Raj Javiya</p>
                <p className="text-[0.72rem] text-white/85">Android & Flutter developer</p>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[0.62rem] font-semibold text-[#101114]">
                  <span className="h-1.5 w-1.5 rounded-full bg-online" />
                  Open to new projects
                </p>
              </motion.div>

              {/* App grid — each icon launches a preview of that project */}
              <div className="mt-5 grid grid-cols-4 gap-x-2 gap-y-4 px-4">
                {orderedProjects.map((project, i) => {
                  const intro = pop(projects.indexOf(project) + 1)
                  return (
                    <motion.a
                      key={project.slug}
                      data-app-slug={project.slug}
                      href={`#app-${project.slug}`}
                      aria-label={`Open ${project.name}`}
                      aria-haspopup="dialog"
                      onClick={(e) => {
                        e.preventDefault()
                        if (jiggle || longPressed.current) {
                          longPressed.current = false
                          return
                        }
                        launchApp(project, e.currentTarget)
                      }}
                      onPointerDown={startPress}
                      onPointerUp={cancelPress}
                      onPointerLeave={cancelPress}
                      onPointerCancel={cancelPress}
                      onContextMenu={(e) => {
                        if (pressPointerType.current === 'touch') e.preventDefault()
                      }}
                      initial={intro.initial}
                      animate={intro.animate}
                      transition={{ ...intro.transition, layout: { type: 'spring', stiffness: 500, damping: 35 } }}
                      layout
                      drag={jiggle}
                      dragSnapToOrigin
                      dragElastic={0.6}
                      onDragEnd={(_, info) => handleDrop(project.slug, info.point)}
                      whileTap={reduce || jiggle ? undefined : { scale: 0.88 }}
                      whileDrag={{ scale: 1.12, zIndex: 10 }}
                      style={{ touchAction: jiggle ? 'none' : undefined }}
                      className="group relative flex select-none flex-col items-center gap-1 [-webkit-touch-callout:none] [-webkit-user-drag:none] [&_img]:pointer-events-none"
                    >
                      <span
                        className={`block ${jiggle ? 'jiggle' : ''}`}
                        style={jiggle ? { animationDelay: `${(i % 3) * -0.09}s` } : undefined}
                      >
                        <AppIcon
                          project={project}
                          className="h-[3.1rem] w-[3.1rem] rounded-[0.9rem] shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition group-hover:-translate-y-0.5"
                        />
                      </span>
                      <span className="w-full truncate text-center text-[0.6rem] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                        {project.homeLabel}
                      </span>
                    </motion.a>
                  )
                })}
                <motion.a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open resume (PDF)"
                  onClick={(e) => {
                    if (jiggle) {
                      e.preventDefault()
                      return
                    }
                    trackEvent('resume_open', { location: 'hero_phone' })
                  }}
                  {...pop(projects.length + 1)}
                  layout
                  whileTap={reduce || jiggle ? undefined : { scale: 0.88 }}
                  className="group flex flex-col items-center gap-1"
                >
                  <span
                    className={`flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-[0.9rem] bg-white text-[#101114] shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition group-hover:-translate-y-0.5 ${jiggle ? 'jiggle' : ''}`}
                    style={jiggle ? { animationDelay: '-0.18s' } : undefined}
                  >
                    <FileText size={22} />
                  </span>
                  <span className="text-[0.6rem] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                    Resume
                  </span>
                </motion.a>
              </div>

              {/* Dock */}
              <div className="absolute inset-x-3 bottom-5 grid grid-cols-4 gap-2 rounded-[1.6rem] bg-white/25 p-2.5 ring-1 ring-white/25 backdrop-blur-md">
                {socialLinks.map((item) => {
                  const Icon = item.icon
                  const external = !item.href.startsWith('mailto:')
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      aria-label={item.label}
                      className="mx-auto flex h-[2.9rem] w-[2.9rem] items-center justify-center rounded-[0.85rem] text-white shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
                      style={{ background: item.tile }}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>

              <AnimatePresence>
                {launched ? (
                  <PhoneAppPreview
                    key={launched.project.slug}
                    project={launched.project}
                    origin={launched.origin}
                    onClose={closeApp}
                  />
                ) : null}
              </AnimatePresence>

              <div
                aria-hidden
                className={`absolute bottom-1.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full transition-colors ${launched ? 'bg-foreground/70' : 'bg-white/80'}`}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        {jiggle ? 'Drag icons to rearrange · tap Done when finished' : 'Tap an app to open it · press and hold to rearrange'}
      </p>
    </div>
  )
}

// Counts a stat like "10K+" or "4.8★" up from zero the first time it scrolls into view.
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(value)

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = match ? parseFloat(match[1]) : null
  const decimals = match?.[1].split('.')[1]?.length ?? 0
  const suffix = match?.[2] ?? ''

  useEffect(() => {
    if (target === null || reduce || !inView) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${v.toFixed(decimals)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, reduce, target, decimals, suffix])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}

type SpotlightItem = {
  id: string
  group: 'Apps' | 'Sections' | 'Actions'
  label: string
  hint: string
  icon: LucideIcon
  project?: Project
  run: () => void
}

const spotlightGroups = ['Apps', 'Sections', 'Actions'] as const

// iOS-style Spotlight search (⌘K or /) over apps, sections and quick actions.
function Spotlight({ items, onClose }: { items: SpotlightItem[]; onClose: () => void }) {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const q = query.trim().toLowerCase()
  const results = q ? items.filter((item) => `${item.label} ${item.hint} ${item.group}`.toLowerCase().includes(q)) : items
  const groups = spotlightGroups
    .map((group) => ({ group, items: results.filter((item) => item.group === group) }))
    .filter((g) => g.items.length > 0)
  const ordered = groups.flatMap((g) => g.items)
  const activeItem = ordered[active]

  // Same focus/scroll handling as the gallery: focus in, lock scroll, restore on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      opener?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active, query])

  const select = (item: SpotlightItem) => {
    onClose()
    // Run after the overlay unmounts so the scroll lock is released first.
    window.setTimeout(item.run, 10)
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, ordered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeItem) {
      e.preventDefault()
      select(activeItem)
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.15 }}
      className="fixed inset-0 z-[999] flex items-start justify-center bg-[#0b0c0f]/40 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_30px_80px_-20px_rgba(16,17,20,0.45)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={18} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="spotlight-results"
            aria-activedescendant={activeItem ? `spotlight-${activeItem.id}` : undefined}
            aria-label="Search apps, sections and actions"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search apps, sections and actions…"
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/70"
          />
          <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground sm:inline">
            esc
          </kbd>
        </div>

        <ul id="spotlight-results" ref={listRef} role="listbox" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
          {groups.length === 0 ? (
            <li className="px-3 py-10 text-center text-sm text-muted-foreground">No results for “{query}”</li>
          ) : (
            groups.map(({ group, items: groupItems }) => (
              <li key={group} role="presentation">
                <p className="px-3 pb-1 pt-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {group}
                </p>
                <ul role="group" aria-label={group}>
                  {groupItems.map((item) => {
                    const index = ordered.indexOf(item)
                    const selected = index === active
                    const Icon = item.icon
                    return (
                      <li
                        key={item.id}
                        id={`spotlight-${item.id}`}
                        role="option"
                        aria-selected={selected}
                        onMouseMove={() => setActive(index)}
                        onClick={() => select(item)}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${selected ? 'bg-accent text-white' : 'text-foreground'}`}
                      >
                        {item.project ? (
                          <AppIcon project={item.project} className="h-8 w-8 shrink-0 rounded-[0.55rem]" />
                        ) : (
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.55rem] ${selected ? 'bg-white/20' : 'bg-secondary'}`}
                          >
                            <Icon size={16} />
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.95rem] font-semibold">{item.label}</span>
                          <span className={`block truncate text-xs ${selected ? 'text-white/75' : 'text-muted-foreground'}`}>
                            {item.hint}
                          </span>
                        </span>
                        {selected ? <CornerDownLeft size={15} className="shrink-0" /> : null}
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>

        <p className="hidden gap-4 border-t border-border px-4 py-2.5 text-xs text-muted-foreground sm:flex">
          <span>↑ ↓ to move</span>
          <span>↵ to open</span>
          <span>esc to close</span>
        </p>
      </motion.div>
    </motion.div>
  )
}

function GalleryModal({
  images,
  startIndex,
  onClose,
  title,
  captions,
  landscape = false,
}: {
  images: string[]
  startIndex: number
  onClose: () => void
  title: string
  captions?: string[]
  landscape?: boolean
}) {
  const [index, setIndex] = useState(startIndex)
  const reduceMotion = useReducedMotion()
  const thumbsRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, images.length])

  // Move focus into the dialog on open, restore it to the opener on close (a11y),
  // and lock page scroll while it is open.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      opener?.focus?.()
    }
  }, [])

  useEffect(() => {
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined
    thumb?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
  }, [index])

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0b0c0f]/90 backdrop-blur-md focus:outline-none"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close screenshots"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
      >
        <X size={20} />
      </button>

      <div
        className={`relative flex w-full items-center justify-center px-12 ${landscape ? 'max-h-[72vh] sm:max-w-5xl sm:px-16' : 'h-[72vh] sm:max-w-[360px] sm:px-0'}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 50) {
            if (diff > 0) next()
            else prev()
          }
        }}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Previous screenshot"
          className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:-left-14"
        >
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${title} screenshot ${index + 1}`}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className={landscape ? 'max-h-[72vh] w-full rounded-xl object-contain' : 'h-full w-auto rounded-[1.5rem] object-contain'}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={next}
          aria-label="Next screenshot"
          className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:-right-14"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={thumbsRef}
        className="no-scrollbar mt-6 flex max-w-full gap-2.5 overflow-x-auto px-4 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show screenshot ${i + 1}`}
            className="shrink-0"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className={`h-14 w-auto rounded-lg object-cover transition ${i === index ? 'opacity-100 ring-2 ring-white' : 'opacity-40 hover:opacity-70'}`}
            />
          </button>
        ))}
      </div>

      <p className="mt-3 px-4 text-center text-sm text-white/50">
        {index + 1} / {images.length}
        {captions?.[index] ? <span className="text-white/85"> · {captions[index]}</span> : null}
      </p>
    </motion.div>
  )
}

// App Store–style listing: icon + name, info row, swipeable screenshots, details.
function AppListing({ project }: { project: Project }) {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const info = [
    ...project.stats,
    { label: 'Platform', value: project.platform },
    { label: 'Built for', value: project.type },
  ]

  return (
    <>
      {/* Portal to <body>: the Reveal wrapper's transform would otherwise trap the fixed overlay inside this card. */}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {galleryIndex !== null && project.mockups ? (
                <GalleryModal
                  images={project.mockups}
                  startIndex={galleryIndex}
                  title={project.name}
                  captions={project.mockupCaptions}
                  landscape={project.landscapeMockups}
                  onClose={() => setGalleryIndex(null)}
                />
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}

      <article id={`app-${project.slug}`} className="surface-card-strong scroll-mt-24 overflow-hidden">
        <div className="p-5 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:flex-nowrap sm:gap-5">
            <AppIcon
              project={project}
              className="h-16 w-16 shrink-0 rounded-[1.1rem] shadow-sm sm:h-20 sm:w-20 sm:rounded-[1.35rem]"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">{project.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground sm:text-base">{project.category}</p>
              {project.inProgress ? (
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#d97706]/10 px-2.5 py-0.5 text-xs font-semibold text-[#b45309]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                  In development
                </p>
              ) : null}
            </div>
            {/* Store / project links, together in the top-right */}
            {project.links.length > 0 ? (
              <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:shrink-0 sm:justify-end">
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

          {/* Info row */}
          <dl className="mt-6 grid grid-cols-2 gap-y-4 border-y border-border py-4 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-border sm:py-3.5">
            {info.map((item) => (
              <div key={item.label} className="min-w-0 px-2 text-center">
                <dt className="truncate text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1 truncate text-[0.95rem] font-semibold text-foreground sm:text-lg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Screenshots */}
        {project.mockups ? (
          <div className="border-y border-border bg-[#efefea] py-5">
            <p className="px-5 pb-3 text-sm font-semibold text-foreground sm:px-8">
              {project.mockupCaptions ? 'Workflow' : 'Screenshots'}
              <span className="ml-2 font-normal text-muted-foreground">· swipe or tap to enlarge</span>
            </p>
            <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 sm:scroll-px-8 sm:px-8">
              {project.mockups.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`Enlarge ${project.name} screenshot ${i + 1}`}
                  className={`shrink-0 snap-start text-left transition hover:-translate-y-1 ${project.landscapeMockups ? 'w-[82vw] max-w-[34rem] sm:w-[34rem]' : ''}`}
                >
                  <img
                    src={src}
                    alt={project.mockupCaptions?.[i] ?? `${project.name} screenshot ${i + 1}`}
                    loading="lazy"
                    className={
                      project.landscapeMockups
                        ? 'aspect-[16/9] w-full rounded-xl border border-black/5 object-cover shadow-[0_8px_24px_-12px_rgba(16,17,20,0.35)]'
                        : 'h-[320px] w-auto rounded-[1.25rem] object-contain sm:h-[400px]'
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
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Details */}
        <div className={`grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10 ${project.mockups ? '' : 'pt-0 sm:pt-0'}`}>
          <div className="space-y-5">
            <p className="text-[0.975rem] leading-7 text-foreground/80 sm:text-[1.05rem] sm:leading-8">
              {project.description}
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-[0.8rem] font-medium text-foreground/80">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-accent/[0.06] p-4 ring-1 ring-accent/10">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">What I did</p>
              <p className="mt-1.5 text-[0.95rem] leading-7 text-foreground/85">{project.impact}</p>
            </div>
            {hasCaseStudy(project.slug) ? (
              <Link
                href={`/projects/${project.slug}`}
                onClick={() => trackEvent('case_study_open', { project: project.slug })}
                className={`${btnPrimary} w-full`}
              >
                Read the case study
                <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </>
  )
}

const skillLevelBars: Record<SkillLevel, number> = {
  Expert: 4,
  Proficient: 3,
  Familiar: 2,
}

// Proficiency drawn as phone signal bars.
function SignalMeter({ level, color }: { level: SkillLevel; color: string }) {
  const filled = skillLevelBars[level]

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 py-1 pl-2.5 pr-3 text-xs font-semibold text-foreground">
      <span aria-hidden className="flex h-3.5 items-end gap-[2px]">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className="w-[3px] rounded-full"
            style={{ height: `${bar * 25}%`, background: bar <= filled ? color : 'rgba(16,17,20,0.14)' }}
          />
        ))}
      </span>
      {level}
    </span>
  )
}

type SkillCardVariant = 'featured' | 'compact'

function SkillCard({ group, variant }: { group: SkillGroup; variant: SkillCardVariant }) {
  const Icon = group.icon
  const featured = variant === 'featured'

  return (
    <div
      className="group/skill relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(16,17,20,0.25)] sm:p-7"
      style={{ backgroundImage: `linear-gradient(160deg, ${group.color}${featured ? '17' : '0d'} 0%, transparent ${featured ? '60%' : '45%'})` }}
    >
      {/* Oversized watermark icon */}
      <Icon
        aria-hidden
        strokeWidth={1.25}
        className={`pointer-events-none absolute transition duration-500 group-hover/skill:rotate-[-8deg] group-hover/skill:scale-110 ${featured ? '-bottom-10 -right-8 h-48 w-48 sm:h-56 sm:w-56' : '-bottom-6 -right-6 h-32 w-32'}`}
        style={{ color: group.color, opacity: featured ? 0.08 : 0.06 }}
      />

      <div className="relative flex h-full flex-col">
        <div>
          <div className="flex items-start justify-between gap-3">
            <span
              className={`flex shrink-0 items-center justify-center text-white ${featured ? 'h-14 w-14 rounded-[1.1rem]' : 'h-11 w-11 rounded-[0.8rem]'}`}
              style={{ background: group.color, boxShadow: `0 10px 24px -8px ${group.color}99` }}
            >
              <Icon size={featured ? 26 : 20} />
            </span>
            <SignalMeter level={group.level} color={group.color} />
          </div>

          <h3 className={`mt-5 font-bold tracking-[-0.02em] text-foreground ${featured ? 'text-2xl sm:text-[1.75rem]' : 'text-xl'}`}>
            {group.title}
          </h3>
          <p className={`mt-1.5 text-muted-foreground ${featured ? 'text-base leading-7' : 'text-[0.95rem] leading-6'}`}>
            {group.description}
          </p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <li
              key={skill}
              className={`rounded-full border font-medium text-foreground/90 ${featured ? 'px-3.5 py-1.5 text-[0.9rem]' : 'px-3 py-1 text-[0.85rem]'}`}
              style={{ background: `${group.color}0f`, borderColor: `${group.color}2e` }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function PortfolioHome({
  repos = [],
  githubStats = { repoCount: 0 },
}: {
  repos: Repo[]
  githubStats: GitHubStats
}) {
  const reduceMotion = useReducedMotion()
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const [modKey, setModKey] = useState('⌘')
  const closeSpotlight = useCallback(() => setSpotlightOpen(false), [])
  const chatRef = useRef<HTMLDivElement>(null)
  const chatInView = useInView(chatRef, { once: true, amount: 0.5 })
  // All bubbles render on the server; after mount they replay one by one with a typing indicator.
  const [shownBubbles, setShownBubbles] = useState(chatBubbles.length)
  const [typing, setTyping] = useState(false)
  const [sentMessage, setSentMessage] = useState<string | null>(null)
  const [requestedService, setRequestedService] = useState<string | null>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [activeTab, setActiveTab] = useState('home')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  })

  useEffect(() => {
    const observers = Object.keys(sectionToTab).map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(sectionToTab[id])
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  // ⌘K / Ctrl+K toggles Spotlight; "/" opens it when not typing in a field.
  useEffect(() => {
    if (!/Mac|iPhone|iPad/i.test(navigator.userAgent)) setModKey('Ctrl ')
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSpotlightOpen((open) => !open)
        return
      }
      const target = e.target as HTMLElement | null
      if (e.key === '/' && !target?.closest('input, textarea, [contenteditable="true"]')) {
        e.preventDefault()
        setSpotlightOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setShownBubbles(reduceMotion ? chatBubbles.length : 0)
  }, [reduceMotion])

  useEffect(() => {
    if (!chatInView || shownBubbles >= chatBubbles.length) return
    const startTyping = window.setTimeout(() => setTyping(true), 250)
    const showBubble = window.setTimeout(() => {
      setTyping(false)
      setShownBubbles((n) => n + 1)
    }, 1150)
    return () => {
      window.clearTimeout(startTyping)
      window.clearTimeout(showBubble)
    }
  }, [chatInView, shownBubbles])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (name in formErrors) {
      setFormErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  const handleCopyEmail = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return

    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      setCopiedEmail(false)
    }
  }

  const validateForm = () => {
    const errors: typeof formErrors = {}
    if (!formData.name.trim()) errors.name = 'Name is required.'
    if (!formData.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address.'
    }
    if (!formData.message.trim()) errors.message = 'Message is required.'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submitting) return
    if (!validateForm()) return

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

      trackEvent('contact_submit', { location: 'contact_form' })
      setSentMessage(formData.message.trim())
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '', website: '' })
      window.setTimeout(() => setSubmitted(false), 4000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border bg-background px-4 text-[0.95rem] text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:bg-card focus:ring-4 ${
      hasError ? 'border-destructive focus:ring-destructive/10' : 'border-border focus:border-accent focus:ring-accent/10'
    }`

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  const servicePrefix = 'Hi Raj, I’m interested in '

  // "Get" on an in-app purchase: pre-fill the contact message with that service and jump to the form.
  const requestService = (service: Service) => {
    setRequestedService(service.title)
    setFormData((current) => ({
      ...current,
      // Never overwrite a message the visitor wrote themselves.
      message:
        !current.message.trim() || current.message.startsWith(servicePrefix)
          ? `${servicePrefix}${service.title.toLowerCase()}. Here’s a bit about my project:\n\n`
          : current.message,
    }))
    setFormErrors((current) => ({ ...current, message: undefined }))
    trackEvent('service_get_click', { service: service.title })
    jumpTo('contact')
    window.setTimeout(() => messageRef.current?.focus({ preventScroll: true }), reduceMotion ? 0 : 600)
  }

  const openExternal = (href: string) => window.open(href, '_blank', 'noopener,noreferrer')

  const spotlightItems: SpotlightItem[] = [
    ...projects.flatMap((project): SpotlightItem[] => [
      {
        id: `app-${project.slug}`,
        group: 'Apps',
        label: project.name,
        hint: project.category,
        icon: project.icon,
        project,
        run: () => jumpTo(`app-${project.slug}`),
      },
      ...(hasCaseStudy(project.slug)
        ? [
            {
              id: `case-${project.slug}`,
              group: 'Apps' as const,
              label: `${project.name} case study`,
              hint: 'Read the full story',
              icon: FileText,
              run: () => {
                trackEvent('case_study_open', { project: project.slug, location: 'spotlight' })
                router.push(`/projects/${project.slug}`)
              },
            },
          ]
        : []),
    ]),
    ...spotlightSections.map(
      (section): SpotlightItem => ({
        id: `section-${section.id}`,
        group: 'Sections',
        label: section.label,
        hint: section.hint,
        icon: section.icon,
        run: () => jumpTo(section.id),
      })
    ),
    {
      id: 'action-resume',
      group: 'Actions',
      label: 'Open resume',
      hint: 'PDF',
      icon: Download,
      run: () => {
        trackEvent('resume_open', { location: 'spotlight' })
        openExternal(resumeUrl)
      },
    },
    {
      id: 'action-book',
      group: 'Actions',
      label: 'Book a free call',
      hint: '30 minutes on Cal.com',
      icon: CalendarDays,
      run: () => {
        trackEvent('book_call_click', { location: 'spotlight' })
        openExternal(bookingUrl)
      },
    },
    {
      id: 'action-email',
      group: 'Actions',
      label: 'Email me',
      hint: emailAddress,
      icon: Mail,
      run: () => {
        window.location.href = `mailto:${emailAddress}?subject=Portfolio Inquiry`
      },
    },
    ...socialLinks
      .filter((link) => !link.href.startsWith('mailto:'))
      .map(
        (link): SpotlightItem => ({
          id: `action-${link.label}`,
          group: 'Actions',
          label: link.label,
          hint: link.href.replace(/^https:\/\//, ''),
          icon: link.icon,
          run: () => openExternal(link.href),
        })
      ),
  ]

  return (
    <div className="relative overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only z-[210] rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <AnimatePresence>
        {spotlightOpen ? <Spotlight items={spotlightItems} onClose={closeSpotlight} /> : null}
      </AnimatePresence>

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        {/* Scroll progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="grad-accent-bg absolute inset-x-0 -bottom-px h-0.5 origin-left"
        />
        <div className="shell flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[0.7rem] bg-foreground text-sm font-bold text-background">
              RJ
            </span>
            <span className="leading-tight">
              <span className="block text-[0.95rem] font-bold tracking-[-0.01em] text-foreground">Raj Javiya</span>
              <span className="block text-xs text-muted-foreground">Mobile Developer</span>
            </span>
          </a>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSpotlightOpen(true)}
              aria-label="Search the site"
              aria-keyshortcuts="Meta+K Control+K /"
              className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <Search size={16} />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-[0.7rem] font-medium text-muted-foreground md:inline">
                {modKey}K
              </kbd>
            </button>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('resume_open', { location: 'header' })}
              aria-label="Resume (PDF)"
              className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Resume</span>
            </a>
            <a href="#contact" className={`${btnPrimary} h-10 py-0`}>
              Let&apos;s talk
            </a>
          </div>
        </div>
      </header>

      {/* Bottom tab bar — the site's main navigation, like a real app */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 pb-[env(safe-area-inset-bottom)] sm:bottom-5"
      >
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-white/85 p-1.5 shadow-[0_12px_32px_-10px_rgba(16,17,20,0.3)] backdrop-blur-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                aria-current={active ? 'true' : undefined}
                className={`relative flex w-[3.85rem] flex-col items-center gap-0.5 rounded-full py-1.5 text-[0.65rem] font-semibold transition-colors sm:w-auto sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                  active ? 'text-background' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="tab-pill"
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-foreground"
                  />
                ) : null}
                <Icon size={18} className="relative" />
                <span className="relative">{tab.label}</span>
              </a>
            )
          })}
        </div>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section id="home" className="relative pt-28 sm:pt-32">
          <div aria-hidden className="soft-grid pointer-events-none absolute inset-0 -z-10" />
          <div className="shell grid items-center gap-14 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-20">
            <Reveal className="space-y-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-online opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-online" />
                </span>
                Available for freelance
              </p>

              <div className="space-y-5">
                <p className="text-xl font-semibold text-foreground/70 sm:text-2xl">Hi, I&apos;m Raj 👋</p>
                <h1 className="font-[family:var(--font-heading)] text-[2.35rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[3.25rem] lg:text-[3.6rem]">
                  I build <span className="text-gradient">mobile apps</span>
                  <br />
                  and <span className="text-gradient">web platforms</span>.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                  Senior developer working with Kotlin, Flutter, React and Next.js. 15+ production apps shipped since
                  2021.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#projects" className={`${btnPrimary} px-6 py-3.5`}>
                  See my apps
                  <ArrowRight size={16} />
                </a>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('book_call_click', { location: 'hero' })}
                  className={`${btnSecondary} px-6 py-3.5`}
                >
                  <CalendarDays size={16} />
                  Book a free call
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <HeroPhone />
            </Reveal>
          </div>

          {/* Quick stats */}
          <div className="shell pb-8">
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-card px-5 py-5 sm:px-6 sm:py-6">
                    <p className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tech ticker */}
        <div className="marquee border-y border-border bg-card/70 py-4">
          <div className="marquee-track flex">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-label={copy === 0 ? 'Technologies I work with' : undefined}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center"
              >
                {marqueeItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-6 pr-6 text-lg font-semibold tracking-[-0.01em] text-foreground/70 sm:text-xl"
                  >
                    {item}
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* About */}
        <section id="about" className="section-shell">
          <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <SectionHeader
                label="About"
                title="Fast apps, clean code, shipped on time."
                description="I care about apps that feel smooth to use and code that stays easy to change. That means Clean Architecture, careful performance work, and predictable state management."
              />
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {aboutFeatures.map((item, index) => {
                const Icon = item.icon
                return (
                  <Reveal key={item.title} delay={0.05 + index * 0.05}>
                    <div className="surface-card h-full p-5 sm:p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[0.7rem] bg-accent/10 text-accent">
                        <Icon size={19} />
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Apps */}
        <section id="projects" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Apps"
                title="Things I’ve built and shipped."
                description="Production apps on the App Store and Google Play, plus my own products and open-source tools."
              />
            </Reveal>

            <div className="space-y-8">
              {projects.map((project) => (
                <Reveal key={project.slug}>
                  <AppListing project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Open source */}
        <section id="open-source" className="section-shell pt-0 sm:pt-0">
          <div className="shell space-y-8">
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeader
                  label="Open source"
                  title="On GitHub."
                  description="Repositories I’ve starred and built on recently."
                />
                <div className="flex items-center gap-5">
                  <div>
                    <p className="text-3xl font-bold tracking-[-0.03em]">
                      {githubStats.repoCount > 0 ? `${githubStats.repoCount}+` : '—'}
                    </p>
                    <p className="text-sm text-muted-foreground">Repositories</p>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div>
                    <p className="text-3xl font-bold tracking-[-0.03em]">8K+</p>
                    <p className="text-sm text-muted-foreground">Commits</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {repos.length === 0 ? (
              <p className="text-sm text-muted-foreground">No repositories to show right now.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo, index) => {
                  const body = (
                    <>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] bg-foreground text-background">
                          <GitBranch size={17} />
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                          <Star size={14} />
                          {repo.stars}
                        </span>
                      </div>
                      <h3 className="mt-4 break-words text-lg font-bold text-foreground">{repo.name}</h3>
                      {repo.language ? <p className="text-sm text-muted-foreground">{repo.language}</p> : null}
                      <p className="mt-2 line-clamp-3 flex-1 text-[0.95rem] leading-6 text-foreground/75">
                        {repo.description}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        {repo.private ? (
                          <>
                            <ShieldCheck size={14} /> Private
                          </>
                        ) : (
                          <>
                            Open repository <ArrowUpRight size={14} />
                          </>
                        )}
                      </p>
                    </>
                  )

                  return (
                    <Reveal key={repo.name} delay={0.04 + index * 0.04}>
                      {repo.private ? (
                        <div className="surface-card flex h-full flex-col p-5">{body}</div>
                      ) : (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="surface-card flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          {body}
                        </a>
                      )}
                    </Reveal>
                  )
                })}
              </div>
            )}

            <a
              href="https://github.com/JAVIYARAJ"
              target="_blank"
              rel="noreferrer"
              className={btnSecondary}
            >
              <Github size={16} />
              Follow me on GitHub
            </a>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section-shell border-y border-border bg-card/60">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Skills"
                title="My toolkit."
                description="Native Android, Flutter and the web — plus the architecture, data, and testing skills that make products reliable."
              />
            </Reveal>

            {/* Bento: two featured platforms, a row of three, then a row of two */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {skillGroups.map((group, index) => {
                const variant: SkillCardVariant = index < 2 ? 'featured' : 'compact'
                const span =
                  index < 2 || index >= 5
                    ? 'lg:col-span-3'
                    : 'lg:col-span-2'
                // Odd count on the 2-column tablet grid: let the last card fill the row.
                const tabletSpan = index === skillGroups.length - 1 && skillGroups.length % 2 === 1 ? 'sm:col-span-2' : ''
                return (
                  <Reveal key={group.title} delay={0.04 + index * 0.04} className={`${span} ${tabletSpan}`}>
                    <SkillCard group={group} variant={variant} />
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Experience"
                title="Version history."
                description="Release notes from 4+ years of building mobile apps — from freelance modules to leading production releases."
              />
            </Reveal>

            <ol className="relative ml-1.5 max-w-3xl space-y-6 border-l border-border pl-6 sm:pl-10">
              {experiences.map((item, index) => (
                <li key={`${item.company}-${item.role}`} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[29.5px] top-7 h-2.5 w-2.5 rounded-full ring-4 ring-background sm:-left-[45.5px] ${index === 0 ? 'bg-accent' : 'bg-muted-foreground/40'}`}
                  />
                  <Reveal delay={0.04 + index * 0.05}>
                    <article className="surface-card p-5 sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-foreground px-2 py-0.5 font-mono text-xs font-semibold text-background">
                          {item.version}
                        </span>
                        {index === 0 ? (
                          <span className="rounded-md bg-online/10 px-2 py-0.5 text-xs font-semibold text-online">
                            Latest · Current role
                          </span>
                        ) : null}
                        <span className="ml-auto text-sm text-muted-foreground">{item.duration}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">{item.role}</h3>
                      <p className="font-medium text-muted-foreground">{item.company}</p>
                      <p className="mt-3 text-[0.975rem] leading-7 text-foreground/80">{item.summary}</p>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        What&apos;s new
                      </p>
                      <ul className="mt-2.5 space-y-2.5">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-[0.95rem] leading-7 text-foreground/80">
                            <Check size={16} className="mt-1.5 shrink-0 text-accent" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Achievements — as notifications */}
        <section id="achievements" className="section-shell pt-0 sm:pt-0">
          <div className="shell space-y-8">
            <Reveal>
              <SectionHeader label="Achievements" title="Badges I’ve earned." />
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-2">
              {achievements.map((item, index) => (
                <Reveal key={item.title} delay={0.05 + index * 0.05}>
                  <article className="surface-card-strong h-full p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-foreground text-background">
                        <Trophy size={11} />
                      </span>
                      <span className="font-semibold uppercase tracking-[0.08em]">{item.source}</span>
                      <span className="ml-auto">{item.label}</span>
                    </div>

                    <div className="mt-4 flex gap-4 sm:gap-5">
                      <NextImage
                        src={item.image}
                        alt={item.imageAlt}
                        width={112}
                        height={112}
                        className="h-20 w-20 shrink-0 rounded-2xl bg-secondary object-contain p-1 sm:h-28 sm:w-28"
                      />
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold leading-snug text-foreground sm:text-xl">{item.title}</h3>
                        <p className="mt-1.5 text-[0.95rem] leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                    </div>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[0.8rem] font-medium text-foreground/80"
                        >
                          <Check size={12} className="text-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-4">
                      {item.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                        >
                          {link.label}
                          <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section-shell border-t border-border bg-card/60">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Work with me"
                title="In-App Purchases."
                description="Everything you can get from me — from a first MVP to store release. Tap Get and I’ll reply with a plan and a quote within a day."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="surface-card-strong overflow-hidden">
                {/* Store header */}
                <div className="flex flex-wrap items-center gap-4 p-5 sm:p-7">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] bg-foreground text-lg font-bold text-background sm:h-16 sm:w-16 sm:rounded-[1.15rem]">
                    RJ
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-bold tracking-[-0.01em] text-foreground sm:text-xl">Raj Javiya</p>
                    <p className="text-sm text-muted-foreground">Mobile & web development</p>
                  </div>
                  <p className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                    Offers In-App Purchases
                  </p>
                </div>

                <ul className="grid px-5 sm:px-7 lg:grid-cols-2 lg:gap-x-12">
                  {services.map((service) => {
                    const Icon = service.icon
                    const requested = requestedService === service.title
                    return (
                      <li key={service.title} className="flex gap-4 border-t border-border py-5">
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.8rem] text-white"
                          style={{
                            background: `linear-gradient(145deg, ${service.color}, ${service.color}cc)`,
                            boxShadow: `0 8px 18px -8px ${service.color}99`,
                          }}
                        >
                          <Icon size={22} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="pt-0.5 text-[1.05rem] font-bold leading-snug tracking-[-0.01em] text-foreground">
                              {service.title}
                            </h3>
                            <button
                              type="button"
                              onClick={() => requestService(service)}
                              aria-label={`Get ${service.title} — opens the contact form`}
                              className={`inline-flex h-8 shrink-0 items-center gap-1 rounded-full px-4 text-[0.8rem] font-bold uppercase tracking-[0.02em] transition ${
                                requested ? 'bg-online/10 text-online' : 'bg-secondary text-accent hover:bg-accent/10'
                              }`}
                            >
                              {requested ? (
                                <>
                                  <Check size={14} strokeWidth={3} />
                                  Added
                                </>
                              ) : (
                                (service.price ?? 'Get')
                              )}
                            </button>
                          </div>
                          <p className="mt-1 text-[0.925rem] leading-6 text-muted-foreground">{service.description}</p>
                          <p className="mt-2 text-[0.8rem] font-medium leading-5 text-foreground/70">
                            {service.deliverables.join(' · ')}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6 rounded-[1.75rem] bg-foreground p-6 text-background sm:p-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 space-y-2 lg:max-w-[34rem]">
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-background/70">
                    <span className="h-2 w-2 rounded-full bg-online" />
                    Available for freelance
                  </p>
                  <h3 className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                    Have an app or platform in mind? Let&apos;s plan it together.
                  </h3>
                </div>
                {/* Buttons never shrink or wrap; the heading takes the leftover width instead. */}
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('book_call_click', { location: 'services' })}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-background/90"
                  >
                    <CalendarDays size={16} />
                    Book a free call
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-background/25 px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-background/10"
                  >
                    Send a message
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact — as a chat */}
        <section id="contact" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader label="Contact" title="Let’s build something together." />
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Chat thread */}
              <Reveal className="h-full">
                <div className="surface-card-strong flex h-full flex-col overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                      RJ
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-online" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">Raj Javiya</p>
                      <p className="text-xs text-muted-foreground">Usually replies within a day</p>
                    </div>
                  </div>

                  <div ref={chatRef} aria-live="polite" className="min-h-[15rem] flex-1 space-y-2.5 bg-background/60 px-5 py-6">
                    {chatBubbles.slice(0, shownBubbles).map((text) => (
                      <motion.p
                        key={text}
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3 }}
                        className="w-fit max-w-[88%] origin-bottom-left rounded-[1.25rem] rounded-bl-md border border-border bg-card px-4 py-2.5 text-[0.95rem] leading-6 text-foreground"
                      >
                        {text}
                      </motion.p>
                    ))}
                    {typing ? (
                      <p
                        aria-label="Raj is typing"
                        className="flex w-fit items-center gap-1 rounded-[1.25rem] rounded-bl-md border border-border bg-card px-4 py-3.5"
                      >
                        {[0, 1, 2].map((dot) => (
                          <span
                            key={dot}
                            className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground"
                            style={{ animationDelay: `${dot * 0.15}s` }}
                          />
                        ))}
                      </p>
                    ) : null}
                    {sentMessage ? (
                      <div className="flex flex-col items-end gap-1 pt-2">
                        <motion.p
                          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: reduceMotion ? 0 : 0.3 }}
                          className="w-fit max-w-[88%] origin-bottom-right line-clamp-6 whitespace-pre-line break-words rounded-[1.25rem] rounded-br-md bg-accent px-4 py-2.5 text-[0.95rem] leading-6 text-white"
                        >
                          {sentMessage}
                        </motion.p>
                        <span className="pr-1 text-xs font-medium text-muted-foreground">Delivered</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-border p-4">
                    <button type="button" onClick={handleCopyEmail} className={`${btnSecondary} px-3`}>
                      {copiedEmail ? <Check size={15} className="text-online" /> : <Copy size={15} />}
                      {copiedEmail ? 'Copied!' : 'Copy email'}
                    </button>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('book_call_click', { location: 'contact' })}
                      className={`${btnSecondary} px-3`}
                    >
                      <CalendarDays size={15} />
                      Book a call
                    </a>
                    <a href="https://linkedin.com/in/javiyaraj/" target="_blank" rel="noreferrer" className={`${btnSecondary} px-3`}>
                      <Linkedin size={15} />
                      LinkedIn
                    </a>
                    <a href="https://github.com/JAVIYARAJ" target="_blank" rel="noreferrer" className={`${btnSecondary} px-3`}>
                      <Github size={15} />
                      GitHub
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Message composer */}
              <Reveal delay={0.08} className="h-full">
                <form onSubmit={handleSubmit} noValidate className="surface-card-strong relative flex h-full flex-col p-5 sm:p-7">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <p className="text-lg font-bold text-foreground">New message</p>
                    <p className="text-sm text-muted-foreground">
                      To: <span className="font-medium text-foreground">Raj Javiya</span>
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-sm font-semibold text-foreground">
                      Your name
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Jane Smith"
                        aria-invalid={!!formErrors.name}
                        className={`h-12 ${inputClass(formErrors.name)}`}
                      />
                      {formErrors.name ? <span className="text-xs font-medium text-destructive">{formErrors.name}</span> : null}
                    </label>

                    <label className="grid gap-1.5 text-sm font-semibold text-foreground">
                      Email
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        aria-invalid={!!formErrors.email}
                        className={`h-12 ${inputClass(formErrors.email)}`}
                      />
                      {formErrors.email ? <span className="text-xs font-medium text-destructive">{formErrors.email}</span> : null}
                    </label>
                  </div>

                  <label className="mt-4 grid flex-1 gap-1.5 text-sm font-semibold text-foreground">
                    Message
                    <textarea
                      ref={messageRef}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Tell me about your app idea or project…"
                      aria-invalid={!!formErrors.message}
                      className={`h-full min-h-[9rem] resize-y py-3 ${inputClass(formErrors.message)}`}
                    />
                    {formErrors.message ? (
                      <span className="text-xs font-medium text-destructive">{formErrors.message}</span>
                    ) : null}
                  </label>

                  {/* Honeypot */}
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

                  {errorMessage ? (
                    <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {errorMessage}
                    </p>
                  ) : null}

                  {submitted ? (
                    <motion.div
                      role="status"
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 flex items-center gap-3 rounded-xl bg-online/10 px-4 py-3.5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-online text-white">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">Message sent!</p>
                        <p className="text-sm text-muted-foreground">Thanks for reaching out — I&apos;ll reply soon.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Send size={16} />
                      {submitting ? 'Sending…' : 'Send message'}
                    </button>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border pb-32 pt-10 sm:pb-36">
        <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">Raj Javiya</p>
            <p className="text-sm text-muted-foreground">
              Senior Mobile Developer · Android & Flutter · © {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon
              const external = !item.href.startsWith('mailto:')
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-secondary"
                >
                  <Icon size={16} />
                </a>
              )
            })}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
              aria-label="Back to top"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition hover:bg-foreground/85"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
