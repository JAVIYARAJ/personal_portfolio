'use client'

import NextImage from 'next/image'
import type { GitHubStats, Repo } from '@/lib/github'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Apple,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BatteryFull,
  Boxes,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  Github,
  History,
  House,
  LayoutGrid,
  Layers3,
  Linkedin,
  Mail,
  MessageCircle,
  Play,
  Rocket,
  Send,
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

type ProjectLink = {
  label: string
  href: string
  icon: LucideIcon
}

type Project = {
  slug: string
  name: string
  homeLabel: string
  category: string
  type: string
  platform: string
  description: string
  tags: string[]
  stats: { label: string; value: string }[]
  impact: string
  accent: string
  icon: LucideIcon
  links: ProjectLink[]
  appIcon?: string
  appIconWide?: boolean
  mockups?: string[]
}

const shots = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/projects/${dir}/mockup-${i + 1}.webp`)

const projects: Project[] = [
  {
    slug: 'dyshez',
    name: 'Dyshez',
    homeLabel: 'Dyshez',
    category: 'Food delivery',
    type: 'Esparkbiz',
    platform: 'Flutter',
    description:
      'A full-stack food delivery app with a Supabase backend (real-time orders on Postgres) and a custom rewards & loyalty system. Live on both the App Store and Google Play.',
    tags: ['Flutter', 'Dart', 'Supabase (Postgres)', 'Clean Architecture', 'CI/CD', 'Sentry', 'Clarity'],
    stats: [
      { label: 'Users', value: '10K+' },
      { label: 'Rating', value: '4.8★' },
    ],
    impact: 'Drove a 30% increase in repeat orders with modular rewards and real-time ordering.',
    accent: '#d5a24a',
    icon: Smartphone,
    appIcon: '/projects/dyshez/icon.png',
    mockups: shots('dyshez', 5),
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/in/app/dyshez/id6474236767', icon: Apple },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.dyshez.app', icon: Play },
    ],
  },
  {
    slug: 'splitease',
    name: 'SplitEase',
    homeLabel: 'SplitEase',
    category: 'Finance · Group expenses',
    type: 'Personal',
    platform: 'Flutter',
    description:
      'Split expenses with friends and groups. Invite people, track who owes what, and keep everything in sync in real time — with Owner, Admin, and Member roles for fine-grained permissions.',
    tags: ['Flutter', 'Supabase', 'Edge Functions', 'Real-time Sync', 'Custom Animations', 'Clean Architecture', 'GetIt'],
    stats: [
      { label: 'Tracking', value: '+50%' },
      { label: 'Sync', value: 'Real-time' },
    ],
    impact: 'Designed a scalable group system with multi-level role permissions and instant sync.',
    accent: '#d98f6b',
    icon: Layers3,
    appIcon: '/projects/split-ease/icon.png',
    mockups: shots('split-ease', 17),
    links: [],
  },
  {
    slug: 'pocket-score',
    name: 'Pocket Score',
    homeLabel: 'Pocket Score',
    category: 'Sports · Cricket',
    type: 'Personal',
    platform: 'Flutter',
    description:
      'Live cricket scoring for gully matches. Ball-by-ball scoring with animated FOUR/SIX celebrations, squads, coin toss, wickets, and player rankings — and it all works fully offline.',
    tags: ['Flutter', 'Dart', 'Hive', 'Offline-first', 'Custom Animations', 'Clean Architecture'],
    stats: [
      { label: 'Screens', value: '16+' },
      { label: 'Offline', value: '100%' },
    ],
    impact: 'Built the full match lifecycle — setup, live scoring, scorecard — offline, with smooth animated feedback.',
    accent: '#7c6fcf',
    icon: Sparkles,
    appIcon: '/projects/pocket-score/icon.png',
    mockups: shots('pocket-score', 16),
    links: [],
  },
  {
    slug: 'goals',
    name: 'Goals.com',
    homeLabel: 'Goals',
    category: 'CRM · Sales goals',
    type: 'Esparkbiz',
    platform: 'Android',
    description:
      'A high-scale CRM app for goal tracking and incentive management. Built natively with Kotlin and MVVM, with Retrofit caching, Room, and Coroutines/Flow for async work.',
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Coroutines & Flow', 'Retrofit & Room', 'Firebase FCM'],
    stats: [
      { label: 'Processing', value: '−25%' },
      { label: 'Sales', value: '+30%' },
    ],
    impact: 'Cut processing time by 25% through optimized networking and async work, and lifted FCM engagement by 15%.',
    accent: '#8b6d5c',
    icon: Database,
    appIcon: '/projects/goals/icon.svg',
    appIconWide: true,
    links: [{ label: 'Website', href: 'https://www.goals.com/', icon: ExternalLink }],
  },
  {
    slug: 'smackdab',
    name: 'Smackdab',
    homeLabel: 'Smackdab',
    category: 'Sales productivity',
    type: 'Esparkbiz',
    platform: 'Flutter',
    description:
      'A mobile sales tool with a custom calendar, reusable UI components, and adaptive layouts for phones and tablets.',
    tags: ['Flutter', 'Jetpack Compose', 'Custom Calendar', 'Adaptive Layouts', 'Reactive Data Flow'],
    stats: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'Sales', value: '+25%' },
    ],
    impact: 'Raised team efficiency by 40% and overall sales by 25% with a mobile-first, component-driven workflow.',
    accent: '#6d8262',
    icon: Activity,
    appIcon: '/projects/smackdab/icon.svg',
    appIconWide: true,
    links: [],
  },
  {
    slug: 'feature-gate-pro',
    name: 'FeatureGate Pro',
    homeLabel: 'FeatureGate',
    category: 'Flutter SDK · Open source',
    type: 'Open Source',
    platform: 'Flutter',
    description:
      'A production-ready feature flag SDK for Flutter. Its merge engine combines local JSON, Firebase Remote Config, and custom REST APIs — with percentage rollouts and audience targeting.',
    tags: ['Flutter', 'Dart', 'SDK', 'Firebase Remote Config', 'REST API', 'Audience Targeting'],
    stats: [
      { label: 'Package', value: 'pub.dev' },
      { label: 'License', value: 'Open' },
    ],
    impact: 'Built an enterprise-grade flag SDK with a cascading merge engine, targeting, and analytics sampling.',
    accent: '#02569B',
    icon: Boxes,
    links: [{ label: 'pub.dev', href: 'https://pub.dev/packages/feature_gate_pro', icon: ExternalLink }],
  },
  {
    slug: 'orbit',
    name: 'ORBIT',
    homeLabel: 'Orbit',
    category: 'Developer productivity',
    type: 'Personal',
    platform: 'Web',
    description:
      'A self-hosted workspace for developers that replaces six everyday tools: projects, tasks, notes, secrets, time tracking, and dev utilities — in one fast, keyboard-first app.',
    tags: ['React 19', 'Vite', 'Supabase', 'PostgreSQL', 'AES-256', 'Keyboard-first'],
    stats: [
      { label: 'Modules', value: '10+' },
      { label: 'Replaces', value: '6 tools' },
    ],
    impact: 'Combined 6+ tools into one app, with a client-side encrypted secrets vault and a real-time backend.',
    accent: '#5b7fa6',
    icon: Workflow,
    links: [{ label: 'Live site', href: 'https://orbit-sand-alpha.vercel.app/', icon: ExternalLink }],
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
    title: 'Architecture',
    description: 'Code that stays easy to test and change as the app grows.',
    icon: Layers3,
    color: '#7c3aed',
    level: 'Expert',
    skills: ['Clean Architecture', 'Feature-first Modules', 'Hilt / Dagger', 'GetIt', 'Repository Pattern', 'SOLID'],
  },
  {
    title: 'Data & APIs',
    description: 'Offline-first data layers and real-time backend sync.',
    icon: Database,
    color: '#ea580c',
    level: 'Proficient',
    skills: ['Retrofit', 'Room', 'DataStore', 'GraphQL (Apollo)', 'Firebase', 'Supabase / PostgreSQL', 'Hive / SQLite'],
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
    company: 'Esparkbiz',
    role: 'Senior Mobile Developer',
    duration: 'Sep 2023 – Present',
    summary:
      'Building and shipping production apps with Native Android (Kotlin, Jetpack Compose) and Flutter, using Clean Architecture (MVVM).',
    bullets: [
      'Shipped multiple production apps with Clean Architecture and feature-first modules — cutting dev time by 20% with a 95% on-time release rate.',
      'Led the move to reactive state management (StateFlow on Android, BLoC/Cubit in Flutter), making code easier to test and review.',
      'Turned Figma designs into pixel-perfect, responsive 60fps UIs with Jetpack Compose and custom Flutter animations.',
      'Integrated REST/GraphQL, Supabase, and Firebase behind a repository layer for offline resilience.',
      'Set up GitHub Actions CI/CD for linting, tests, and staged production releases.',
    ],
  },
  {
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

type Service = {
  title: string
  description: string
  icon: LucideIcon
  deliverables: string[]
}

const services: Service[] = [
  {
    title: 'App development',
    description: 'Complete mobile apps in Native Android or Flutter — from architecture to store launch.',
    icon: Smartphone,
    deliverables: ['Native Android (Kotlin)', 'Flutter for iOS & Android', 'Store submission'],
  },
  {
    title: 'Architecture & code audits',
    description: 'Clean Architecture setup, state management refactors, and code quality reviews.',
    icon: ShieldCheck,
    deliverables: ['Clean Architecture (MVVM)', 'StateFlow / BLoC review', 'Refactoring plan'],
  },
  {
    title: 'Native integrations',
    description: 'Connect native Android services (Retrofit, Room, FCM) to Flutter via platform channels.',
    icon: Layers3,
    deliverables: ['Platform channels', 'Native Android modules', 'Safe rollout'],
  },
  {
    title: 'MVP in weeks',
    description: 'A production-quality first version that is built to grow into your full product.',
    icon: Rocket,
    deliverables: ['Production MVP', 'Scalable foundation', 'Fast iteration'],
  },
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
      <span aria-hidden className={`relative overflow-hidden ring-1 ring-black/5 ${className}`}>
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

// The hero: a phone home screen where every app icon is a real project.
function HeroPhone() {
  const reduce = useReducedMotion()

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

      <div className="float-slow relative">
        <div className="rounded-[3.1rem] bg-[#101114] p-2.5 shadow-[0_40px_80px_-30px_rgba(16,17,20,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
          <div className="phone-wallpaper relative aspect-[9/18] overflow-hidden rounded-[2.5rem]">
            {/* Status bar */}
            <div className="flex items-center justify-between px-7 pt-3.5 text-[0.72rem] font-semibold text-white">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <SignalHigh size={13} strokeWidth={2.6} />
                <Wifi size={13} strokeWidth={2.6} />
                <BatteryFull size={16} strokeWidth={2} />
              </span>
            </div>
            <div aria-hidden className="absolute left-1/2 top-2.5 h-[1.4rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-black" />

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

            {/* App grid — each icon jumps to that project */}
            <div className="mt-5 grid grid-cols-4 gap-x-2 gap-y-4 px-4">
              {projects.map((project, i) => (
                <motion.a
                  key={project.slug}
                  href={`#app-${project.slug}`}
                  aria-label={`Jump to ${project.name}`}
                  {...pop(i + 1)}
                  whileTap={reduce ? undefined : { scale: 0.88 }}
                  className="group flex flex-col items-center gap-1"
                >
                  <AppIcon
                    project={project}
                    className="h-[3.1rem] w-[3.1rem] rounded-[0.9rem] shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition group-hover:-translate-y-0.5"
                  />
                  <span className="w-full truncate text-center text-[0.6rem] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                    {project.homeLabel}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open resume (PDF)"
                onClick={() => trackEvent('resume_open', { location: 'hero_phone' })}
                {...pop(projects.length + 1)}
                whileTap={reduce ? undefined : { scale: 0.88 }}
                className="group flex flex-col items-center gap-1"
              >
                <span className="flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-[0.9rem] bg-white text-[#101114] shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition group-hover:-translate-y-0.5">
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
            <div aria-hidden className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/80" />
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">Tap an app to jump to it</p>
    </div>
  )
}

function GalleryModal({
  images,
  startIndex,
  onClose,
  title,
}: {
  images: string[]
  startIndex: number
  onClose: () => void
  title: string
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
        className="relative flex h-[72vh] w-full items-center justify-center px-12 sm:max-w-[360px] sm:px-0"
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
            className="h-full w-auto rounded-[1.5rem] object-contain"
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

      <p className="mt-3 text-sm text-white/50">
        {index + 1} / {images.length}
      </p>
    </motion.div>
  )
}

// App Store–style listing: icon + name, info row, swipeable screenshots, details.
function AppListing({ project }: { project: Project }) {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const [primaryLink, ...otherLinks] = project.links

  const info = [
    ...project.stats,
    { label: 'Platform', value: project.platform },
    { label: 'Built for', value: project.type },
  ]

  return (
    <>
      <AnimatePresence>
        {galleryIndex !== null && project.mockups ? (
          <GalleryModal
            images={project.mockups}
            startIndex={galleryIndex}
            title={project.name}
            onClose={() => setGalleryIndex(null)}
          />
        ) : null}
      </AnimatePresence>

      <article id={`app-${project.slug}`} className="surface-card-strong scroll-mt-24 overflow-hidden">
        <div className="p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 sm:gap-5">
            <AppIcon
              project={project}
              className="h-16 w-16 shrink-0 rounded-[1.1rem] shadow-sm sm:h-20 sm:w-20 sm:rounded-[1.35rem]"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">{project.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground sm:text-base">{project.category}</p>
            </div>
            {primaryLink ? (
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noreferrer"
                className="hidden shrink-0 items-center gap-1.5 rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent transition hover:bg-accent/15 sm:inline-flex"
              >
                {primaryLink.label}
                <ArrowUpRight size={15} />
              </a>
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
              Screenshots
              <span className="ml-2 font-normal text-muted-foreground">· swipe or tap to enlarge</span>
            </p>
            <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 sm:scroll-px-8 sm:px-8">
              {project.mockups.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`Enlarge ${project.name} screenshot ${i + 1}`}
                  className="shrink-0 snap-start transition hover:-translate-y-1"
                >
                  <img
                    src={src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    loading="lazy"
                    className="h-[320px] w-auto rounded-[1.25rem] object-contain sm:h-[400px]"
                  />
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

            {project.links.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {/* On mobile the header pill is hidden, so show every link here. */}
                {[primaryLink, ...otherLinks].map((link, i) => {
                  const LinkIcon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`${btnSecondary} px-4 py-2.5 ${i === 0 ? 'sm:hidden' : ''}`}
                    >
                      <LinkIcon size={15} />
                      {link.label}
                    </a>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </>
  )
}

const skillLevelStyles: Record<SkillLevel, string> = {
  Expert: 'bg-accent/10 text-accent',
  Proficient: 'bg-secondary text-foreground/75',
  Familiar: 'bg-secondary text-muted-foreground',
}

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = group.icon

  return (
    <div className="surface-card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.7rem] text-white"
          style={{ background: group.color }}
        >
          <Icon size={19} />
        </span>
        <h3 className="flex-1 text-lg font-bold tracking-[-0.01em] text-foreground">{group.title}</h3>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${skillLevelStyles[group.level]}`}>
          {group.level}
        </span>
      </div>
      <p className="mt-3 text-[0.95rem] leading-6 text-muted-foreground">{group.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {group.skills.map((skill) => (
          <li key={skill} className="rounded-lg border border-border bg-background px-2.5 py-1 text-[0.85rem] text-foreground/85">
            {skill}
          </li>
        ))}
      </ul>
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

  const chatBubbles = [
    'Hey 👋 thanks for stopping by!',
    'Got an app idea, a codebase that needs help, or want a second opinion on architecture?',
    'Send me a message — I usually reply within a day.',
  ]

  return (
    <div className="relative overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only z-[210] rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="shell flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[0.7rem] bg-foreground text-sm font-bold text-background">
              JR
            </span>
            <span className="leading-tight">
              <span className="block text-[0.95rem] font-bold tracking-[-0.01em] text-foreground">Raj Javiya</span>
              <span className="block text-xs text-muted-foreground">Mobile Developer</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
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
                <h1 className="font-[family:var(--font-heading)] text-[2.6rem] font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-6xl lg:text-[4.1rem]">
                  Hi, I&apos;m Raj.
                  <br />
                  I build <span className="text-gradient">mobile apps</span> people love to use.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                  Senior Mobile Developer working in Native Android (Kotlin, Jetpack Compose) and Flutter. I&apos;ve
                  shipped 15+ production apps since 2021.
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
                    <p className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

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
                description="Native Android and Flutter, plus the architecture, data, and testing skills that make apps reliable."
              />
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group, index) => (
                <Reveal key={group.title} delay={0.04 + index * 0.04}>
                  <SkillCard group={group} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Experience"
                title="My journey so far."
                description="4+ years of building mobile apps — from freelance modules to leading production releases."
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
                        {index === 0 ? (
                          <span className="rounded-md bg-online/10 px-2 py-0.5 text-xs font-semibold text-online">
                            Current
                          </span>
                        ) : null}
                        <span className="ml-auto text-sm text-muted-foreground">{item.duration}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">{item.role}</h3>
                      <p className="font-medium text-muted-foreground">{item.company}</p>
                      <p className="mt-3 text-[0.975rem] leading-7 text-foreground/80">{item.summary}</p>
                      <ul className="mt-4 space-y-2.5">
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
                title="How I can help."
                description="Launching a new app, scaling an existing one, or connecting native modules — here’s what I offer."
              />
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Reveal key={service.title} delay={0.04 + index * 0.04}>
                    <div className="surface-card h-full p-5 sm:p-7">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[0.7rem] bg-accent/10 text-accent">
                        <Icon size={19} />
                      </span>
                      <h3 className="mt-4 text-xl font-bold tracking-[-0.01em] text-foreground">{service.title}</h3>
                      <p className="mt-2 text-[0.975rem] leading-7 text-muted-foreground">{service.description}</p>
                      <ul className="mt-4 space-y-1.5">
                        {service.deliverables.map((d) => (
                          <li key={d} className="flex items-center gap-2 text-[0.95rem] text-foreground/85">
                            <Check size={15} className="text-online" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6 rounded-[1.75rem] bg-foreground p-6 text-background sm:p-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-background/70">
                    <span className="h-2 w-2 rounded-full bg-online" />
                    Available for freelance
                  </p>
                  <h3 className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                    Have an app in mind? Let&apos;s plan it together.
                  </h3>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('book_call_click', { location: 'services' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-background/90"
                  >
                    <CalendarDays size={16} />
                    Book a free call
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-background/25 px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-background/10"
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
                      JR
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-online" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">Raj Javiya</p>
                      <p className="text-xs text-muted-foreground">Usually replies within a day</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2.5 bg-background/60 px-5 py-6">
                    {chatBubbles.map((text, i) => (
                      <motion.p
                        key={text}
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.2 + i * 0.35 }}
                        className="w-fit max-w-[88%] rounded-[1.25rem] rounded-bl-md border border-border bg-card px-4 py-2.5 text-[0.95rem] leading-6 text-foreground"
                      >
                        {text}
                      </motion.p>
                    ))}
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
