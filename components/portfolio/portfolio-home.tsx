'use client'

import NextImage from 'next/image'
import type { GitHubStats, Repo } from '@/lib/github'
import type { ChangeEvent, FormEvent, KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Apple,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Command,
  Copy,
  CornerDownLeft,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Github,
  Hash,
  Images,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Play,
  Rocket,
  Search,
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
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const heroFacts = [
  '15+ Production Apps',
  '4+ Years Experience',
  'Freelance Available',
]

const marqueeTech = [
  'Flutter',
  'Dart',
  'Kotlin',
  'Clean Architecture',
  'BLoC / Cubit',
  'Riverpod',
  'Supabase',
  'Firebase',
  'PostgreSQL',
  'Jetpack Compose',
  'CI/CD',
  'Shorebird OTA',
  'REST / GraphQL',
  'GetIt',
]

// Only tilted/framed mockups here — Dyshez shots are straight-vertical and would
// look inconsistent in the floating hero device.
const heroShots = [
  '/projects/split-ease/mockup-1.webp',
  '/projects/pocket-score/mockup-1.webp',
  '/projects/split-ease/mockup-3.webp',
  '/projects/pocket-score/mockup-3.webp',
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

// Free scheduling link. Create a free booking page on Cal.com (cal.com/signup)
// or Google Calendar "Appointment schedules" and paste the public URL here.
const bookingUrl = 'https://cal.com/raj-javiya-qkewzq/30min'

type StoreLink = {
  app: string
  sub: string
  rating: string | null
  href: string
  icon: LucideIcon
}

// Real, publicly verifiable listings (no placeholder testimonials).
const storeLinks: StoreLink[] = [
  {
    app: 'Dyshez',
    sub: 'Download on the App Store',
    rating: '4.8',
    href: 'https://apps.apple.com/in/app/dyshez/id6474236767',
    icon: Apple,
  },
  {
    app: 'Dyshez',
    sub: 'Get it on Google Play',
    rating: '4.8',
    href: 'https://play.google.com/store/apps/details?id=com.dyshez.app',
    icon: Play,
  },
  {
    app: 'Goals.com',
    sub: 'Visit the live website',
    rating: null,
    href: 'https://www.goals.com/',
    icon: ExternalLink,
  },
]

const proofPoints = [
  { value: '4.8★', label: 'App Store rating' },
  { value: '10K+', label: 'Active users' },
  { value: '15+', label: 'Apps shipped' },
  { value: '2', label: 'App stores live' },
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

type Service = {
  title: string
  description: string
  icon: LucideIcon
  deliverables: string[]
}

const services: Service[] = [
  {
    title: 'Cross-Platform App Development',
    description:
      'End-to-end Flutter apps for iOS, Android & web — from architecture and UI to App Store / Play Store launch.',
    icon: Smartphone,
    deliverables: ['Production Flutter build', 'Pixel-perfect UI', 'Store submission'],
  },
  {
    title: 'Architecture & Code Review',
    description:
      'Clean Architecture, state management and scalable foundations — plus audits and refactors of existing codebases.',
    icon: ShieldCheck,
    deliverables: ['Clean Architecture', 'State management', 'Codebase audit'],
  },
  {
    title: 'Native → Flutter Migration',
    description:
      'Move legacy Android / iOS apps to a single, maintainable Flutter codebase without losing native performance.',
    icon: Layers3,
    deliverables: ['Migration roadmap', 'Native bridges', 'Zero-downtime rollout'],
  },
  {
    title: 'MVP & Rapid Prototyping',
    description:
      'Validate your idea fast with a production-grade prototype — built to scale into the real product, not thrown away.',
    icon: Rocket,
    deliverables: ['Working MVP', 'Scalable base', 'Fast iteration'],
  },
]

type ImpactStat = {
  numericValue: number
  suffix: string
  label: string
  sublabel: string
  icon: LucideIcon
}

const impactStats: ImpactStat[] = [
  {
    numericValue: 15,
    suffix: '+',
    label: 'DEPLOYED APPS',
    sublabel: 'Production Grade',
    icon: Smartphone,
  },
  {
    numericValue: 40,
    suffix: '%',
    label: 'DEV VELOCITY',
    sublabel: 'Efficiency Lift',
    icon: Zap,
  },
  {
    numericValue: 99.9,
    suffix: '%',
    label: 'CRASH-FREE',
    sublabel: 'Stability Index',
    icon: ShieldCheck,
  },
  {
    numericValue: 4,
    suffix: '+',
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
  appIcon?: string
  appIconWide?: boolean
  mockups?: string[]
  isActive?: boolean
}

const projects: Project[] = [
  {
    name: 'ORBIT',
    category: 'Developer OS / Productivity',
    type: 'Personal',
    description:
      'A private, self-hosted operating system for developers — built to replace the 6+ tools a typical developer juggles daily. Projects, tasks, notes, secrets, time tracking, email templates, and developer utilities — all in one fast, keyboard-first interface.',
    tags: [
      'React 19',
      'Vite',
      'Supabase',
      'PostgreSQL',
      'AES-256 Encryption',
      'Self-hosted',
      'Keyboard-first',
      'Vercel',
    ],
    stats: [
      { label: 'Modules', value: '10+' },
      { label: 'Tools replaced', value: '6+' },
    ],
    impact:
      'Collapsed 6+ developer tools into one self-hosted, keyboard-first OS — with client-side encrypted secrets vault and a real-time Supabase backend.',
    accent: '#5b7fa6',
    icon: Workflow,
    span: 'lg:col-span-12',
    links: [],
    isActive: true,
  },
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
    appIcon: '/projects/split-ease/icon.png',
    mockups: [
      '/projects/split-ease/mockup-1.webp',
      '/projects/split-ease/mockup-2.webp',
      '/projects/split-ease/mockup-3.webp',
      '/projects/split-ease/mockup-4.webp',
      '/projects/split-ease/mockup-5.webp',
      '/projects/split-ease/mockup-6.webp',
      '/projects/split-ease/mockup-7.webp',
      '/projects/split-ease/mockup-8.webp',
      '/projects/split-ease/mockup-9.webp',
      '/projects/split-ease/mockup-10.webp',
      '/projects/split-ease/mockup-11.webp',
      '/projects/split-ease/mockup-12.webp',
      '/projects/split-ease/mockup-13.webp',
      '/projects/split-ease/mockup-14.webp',
      '/projects/split-ease/mockup-15.webp',
      '/projects/split-ease/mockup-16.webp',
      '/projects/split-ease/mockup-17.webp',
    ],
    span: 'lg:col-span-7',
    links: [],
  },
  {
    name: 'POCKET SCORE',
    category: 'Sports / Cricket',
    type: 'Personal',
    description:
      'A real-time cricket scoring app built for gully cricket. Features live ball-by-ball scoring with animated FOUR/SIX celebrations, squad management, match setup with coin toss, wicket tracking, and player rankings — all offline-first.',
    tags: [
      'Flutter',
      'Dart',
      'Hive (Local DB)',
      'Custom Animations',
      'Offline First',
      'Clean Architecture',
      'State Management',
    ],
    stats: [
      { label: 'Screens', value: '16+' },
      { label: 'Offline', value: '100%' },
    ],
    impact:
      'Crafted a full cricket match lifecycle — from squad setup to live scoring to scorecard — entirely offline with smooth animated feedback.',
    accent: '#7c6fcf',
    icon: Sparkles,
    span: 'lg:col-span-5',
    links: [],
    appIcon: '/projects/pocket-score/icon.png',
    mockups: [
      '/projects/pocket-score/mockup-1.webp',
      '/projects/pocket-score/mockup-2.webp',
      '/projects/pocket-score/mockup-3.webp',
      '/projects/pocket-score/mockup-4.webp',
      '/projects/pocket-score/mockup-5.webp',
      '/projects/pocket-score/mockup-6.webp',
      '/projects/pocket-score/mockup-7.webp',
      '/projects/pocket-score/mockup-8.webp',
      '/projects/pocket-score/mockup-9.webp',
      '/projects/pocket-score/mockup-10.webp',
      '/projects/pocket-score/mockup-11.webp',
      '/projects/pocket-score/mockup-12.webp',
      '/projects/pocket-score/mockup-13.webp',
      '/projects/pocket-score/mockup-14.webp',
      '/projects/pocket-score/mockup-15.webp',
      '/projects/pocket-score/mockup-16.webp',
    ],
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
    appIcon: '/projects/dyshez/icon.png',
    mockups: [
      '/projects/dyshez/mockup-1.webp',
      '/projects/dyshez/mockup-2.webp',
      '/projects/dyshez/mockup-3.webp',
      '/projects/dyshez/mockup-4.webp',
      '/projects/dyshez/mockup-5.webp',
    ],
    span: 'lg:col-span-6',
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
    span: 'lg:col-span-6',
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
    appIcon: '/projects/goals/icon.svg',
    appIconWide: true,
    span: 'lg:col-span-12',
    links: [
      {
        label: 'Website',
        href: 'https://www.goals.com/',
        icon: ExternalLink,
      },
    ],
  },
]

type SkillLevel = 'Expert' | 'Proficient' | 'Familiar'

type SkillGroup = {
  title: string
  detail: string
  description: string
  icon: LucideIcon
  skills: string[]
  level: SkillLevel
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Framework Core',
    detail: 'Ecosystem',
    description: 'Flutter ecosystem, adaptive UI systems, testing, and modular design for product-grade apps.',
    icon: CircuitBoard,
    level: 'Expert',
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
    level: 'Expert',
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
    level: 'Proficient',
    skills: [
      'Firebase / Supabase',
      'Hive / SQLite',
      'REST / GraphQL',
      'PostgreSQL',
    ],
  },
  {
    title: 'Native Android',
    detail: 'Android Framework',
    description: 'Platform-level Android work for native modules, bridges, background processing, and Compose.',
    icon: Smartphone,
    level: 'Proficient',
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
    level: 'Familiar',
    skills: ['Claude', 'Antigravity', 'Cursor', 'Gemini', 'ChatGPT'],
  },
  {
    title: 'Automation & DevOps',
    detail: 'Continuous Delivery',
    description: 'Release automation, OTA delivery, build systems, and store deployment operations.',
    icon: Zap,
    level: 'Proficient',
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

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <motion.div
      style={{ scaleX }}
      className="grad-accent-bg fixed inset-x-0 top-0 z-[80] h-0.5 origin-left"
    />
  )
}

type SpotlightProps = {
  children: ReactNode
  className?: string
  glow?: string
  tilt?: boolean
}

// Card wrapper: pointer-following radial glow + subtle 3D tilt. Becomes the card surface.
function Spotlight({ children, className = '', glow = '124,92,255', tilt = true }: SpotlightProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt ? 5 : 0, tilt ? -5 : 0]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [tilt ? -5 : 0, tilt ? 5 : 0]), { stiffness: 150, damping: 18 })
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const background = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(${glow}, 0.16), transparent 60%)`

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group/spot relative overflow-hidden ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      />
      <div className="relative z-[2] flex h-full flex-col">{children}</div>
    </motion.div>
  )
}

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href: string
  target?: string
  rel?: string
}

// Anchor CTA that gently pulls toward the cursor.
function MagneticButton({ children, className = '', href, target, rel }: MagneticButtonProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={reduce ? undefined : { x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduce) return
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

// Hero name: per-letter staggered reveal.
function LetterReveal({ text, className = '' }: { text: string; className?: string }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      aria-label={text}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }}
      className={className}
    >
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{ hidden: { opacity: 0, y: '0.55em' }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Infinite horizontal tech strip.
function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]

  return (
    <div className="marquee-mask overflow-hidden py-1">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-1.5 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm text-foreground/80"
          >
            <span className="grad-accent-bg h-1.5 w-1.5 rounded-full" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// Pointer-following cursor glow + a slow reactive aurora blob behind content.
function AmbientFX() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const gx = useMotionValue(-300)
  const gy = useMotionValue(-300)
  const cursorX = useSpring(gx, { stiffness: 500, damping: 40, mass: 0.4 })
  const cursorY = useSpring(gy, { stiffness: 500, damping: 40, mass: 0.4 })
  const auroraX = useSpring(gx, { stiffness: 40, damping: 25, mass: 1 })
  const auroraY = useSpring(gy, { stiffness: 40, damping: 25, mass: 1 })

  useEffect(() => {
    if (reduce) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      gx.set(e.clientX)
      gy.set(e.clientY)
      setVisible(true)
      const el = e.target as HTMLElement | null
      setActive(!!el?.closest('a, button, [role="button"], input, textarea, label, [data-cursor]'))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    // Hide the native cursor while the custom one is active.
    document.documentElement.classList.add('custom-cursor')
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [reduce, gx, gy])

  if (reduce || !enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        style={{ left: auroraX, top: auroraY, zIndex: -1 }}
        className="pointer-events-none fixed hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        <div
          className="h-[440px] w-[440px] rounded-full opacity-[0.16] blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.9), rgba(34,211,238,0.4) 50%, transparent 70%)' }}
        />
      </motion.div>

      {/* Trailing glow ring */}
      <motion.div
        aria-hidden
        style={{ left: cursorX, top: cursorY }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 2.1 : 1 }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.18, ease: 'easeOut' } }}
        className="pointer-events-none fixed z-[1000] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      >
        <div
          className="h-6 w-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,92,255,0.6), rgba(34,211,238,0.28) 60%, transparent 75%)',
            boxShadow: '0 0 24px 6px rgba(124,92,255,0.35)',
          }}
        />
      </motion.div>

      {/* Precise center dot — follows the pointer exactly so click targeting stays accurate */}
      <motion.div
        aria-hidden
        style={{ left: gx, top: gy }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0 : 1 }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15, ease: 'easeOut' } }}
        className="pointer-events-none fixed z-[1001] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </>
  )
}

// One-time intro loader: name sweeps up behind a mask, a counter fills to 100,
// then the whole curtain lifts to reveal the page. Skipped for reduced motion.
const INTRO_NAME = 'JAVIYA RAJ'

function IntroOverlay() {
  const reduce = useReducedMotion()
  // Start shown so the curtain is painted on first load (no flash of content).
  const [done, setDone] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(2, '0'))
  const width = useTransform(count, (v) => `${v}%`)

  useEffect(() => {
    // Show the loader once per browser session, and never for reduced motion.
    if (reduce || sessionStorage.getItem('intro-seen')) {
      setDone(true)
      return
    }
    sessionStorage.setItem('intro-seen', '1')
    document.body.style.overflow = 'hidden'
    const controls = animate(count, 100, { duration: 1.5, ease: [0.45, 0, 0.1, 1] })
    const t = window.setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ''
    }, 1900)
    return () => {
      controls.stop()
      window.clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [reduce, count])

  if (reduce) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#08090c]"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* soft accent glow behind the name */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[460px] w-[460px] rounded-full opacity-40 blur-[130px]"
            style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.55), rgba(34,211,238,0.18) 55%, transparent 72%)' }}
          />

          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="relative flex flex-col items-center gap-7 px-6"
          >
            {/* role kicker */}
            <motion.span
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient font-mono text-[0.7rem] uppercase tracking-[0.45em]"
            >
              Flutter Engineer
            </motion.span>

            {/* name — per-letter mask rise (decorative; the real page heading lives in the hero) */}
            <div
              aria-hidden
              className="flex font-[family:var(--font-heading)] text-5xl tracking-[-0.05em] text-white sm:text-7xl"
            >
              {Array.from(INTRO_NAME).map((ch, i) => (
                <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '120%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.75, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* progress bar + live counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-1 flex w-60 max-w-[70vw] flex-col gap-2.5"
            >
              <div className="h-px w-full overflow-hidden bg-white/10">
                <motion.div style={{ width }} className="grad-accent-bg h-full" />
              </div>
              <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted-foreground">
                <span>Loading</span>
                <span className="flex items-center text-foreground/80">
                  <motion.span>{rounded}</motion.span>
                  <span className="text-gradient">%</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Tilted phone showcase that cycles through real app screenshots.
function HeroDevice() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setIndex((p) => (p + 1) % heroShots.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduce])

  const currentShot = heroShots[index]
  const shotAlt = currentShot.includes('split-ease')
    ? 'SplitEase — Flutter expense-splitting app screenshot'
    : currentShot.includes('pocket-score')
      ? 'Pocket Score — Flutter cricket scoring app screenshot'
      : 'Flutter cross-platform app screenshot'

  return (
    <div className="relative mx-auto w-full max-w-[20rem] lg:ml-auto lg:mr-0">
      {/* glow behind device */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.35), rgba(34,211,238,0.12) 55%, transparent 70%)' }}
      />

      {/* The mockups are already rendered inside a phone frame, so we float the
          image directly (no extra device frame / tilt) to avoid a phone-in-phone look. */}
      <div className="float-slow relative aspect-[3/5] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <NextImage
              src={currentShot}
              alt={shotAlt}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 80vw, 20rem"
              className="object-contain drop-shadow-[0_30px_55px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* floating chips */}
      <div className="float-slower absolute -left-4 top-20 hidden rounded-2xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 backdrop-blur-xl sm:block">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6d8262] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6d8262]" />
          </span>
          <span className="text-xs font-medium text-foreground">Available for freelance</span>
        </div>
      </div>

      <div className="absolute -right-3 bottom-24 hidden rounded-2xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 backdrop-blur-xl sm:block">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Currently building</p>
        <p className="mt-0.5 font-[family:var(--font-heading)] text-sm tracking-[-0.02em] text-gradient">ORBIT</p>
      </div>
    </div>
  )
}

type PaletteItem = {
  id: string
  label: string
  hint?: string
  group: string
  icon: LucideIcon
  keywords?: string
  run: () => void
}

// ⌘K command palette — jump to sections, copy email, open links/booking/resume.
function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (value: boolean) => void }) {
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items: PaletteItem[] = useMemo(() => {
    const go = (href: string) => {
      onOpenChange(false)
      window.setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
    }
    const openExternal = (url: string) => {
      onOpenChange(false)
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    const nav: PaletteItem[] = navigation.map((n) => ({
      id: `nav-${n.href}`,
      label: n.label,
      hint: 'Jump to section',
      group: 'Navigation',
      icon: Hash,
      keywords: 'section go to navigate',
      run: () => go(n.href),
    }))

    const actions: PaletteItem[] = [
      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: emailAddress,
        group: 'Actions',
        icon: Copy,
        keywords: 'mail contact clipboard',
        run: () => {
          navigator.clipboard?.writeText(emailAddress)
          onOpenChange(false)
        },
      },
      {
        id: 'email',
        label: 'Send an email',
        group: 'Actions',
        icon: Mail,
        keywords: 'mail contact message',
        run: () => {
          onOpenChange(false)
          window.location.href = `mailto:${emailAddress}?subject=Project Inquiry`
        },
      },
      {
        id: 'book',
        label: 'Book a call',
        hint: 'Free 30 min',
        group: 'Actions',
        icon: CalendarDays,
        keywords: 'schedule meeting calendly cal booking',
        run: () => {
          trackEvent('book_call_click', { location: 'command_palette' })
          openExternal(bookingUrl)
        },
      },
      {
        id: 'resume',
        label: 'Download résumé',
        group: 'Actions',
        icon: Download,
        keywords: 'cv pdf resume',
        run: () => {
          trackEvent('resume_click', { location: 'command_palette' })
          openExternal('/resume.pdf')
        },
      },
    ]

    const links: PaletteItem[] = [
      ...socialLinks
        .filter((s) => s.label !== 'Email')
        .map((s) => ({
          id: `link-${s.label}`,
          label: s.label,
          hint: 'Open profile',
          group: 'Links',
          icon: s.icon,
          keywords: 'social profile external',
          run: () => openExternal(s.href),
        })),
      {
        id: 'orbit',
        label: 'Visit ORBIT',
        hint: 'Live project',
        group: 'Links',
        icon: Workflow,
        keywords: 'project developer os live',
        run: () => openExternal('https://orbit-sand-alpha.vercel.app/'),
      },
    ]

    return [...nav, ...actions, ...links]
  }, [onOpenChange])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) =>
      `${it.label} ${it.keywords ?? ''} ${it.hint ?? ''}`.toLowerCase().includes(q)
    )
  }, [items, query])

  // Global ⌘K / Ctrl+K toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  // Reset + focus + scroll-lock while open.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActiveIndex(0)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => inputRef.current?.focus(), 20)
    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      filtered[activeIndex]?.run()
    } else if (e.key === 'Escape') {
      onOpenChange(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmdk"
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
          className="fixed inset-0 z-[300] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card-strong w-full max-w-xl overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4">
              <Search size={18} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or jump to…"
                className="h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden shrink-0 rounded-md border border-white/[0.12] bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.6rem] text-muted-foreground sm:block">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">No results.</p>
              ) : (
                filtered.map((it, i) => {
                  const Icon = it.icon
                  const isActive = i === activeIndex
                  const showGroup = i === 0 || filtered[i - 1].group !== it.group

                  return (
                    <div key={it.id}>
                      {showGroup && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                          {it.group}
                        </p>
                      )}
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => it.run()}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${isActive ? 'bg-white/[0.06] text-foreground' : 'text-foreground/80'}`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${isActive ? 'grad-accent-bg border-transparent text-white' : 'border-white/[0.1] bg-white/[0.04] text-muted-foreground'}`}
                        >
                          <Icon size={15} />
                        </span>
                        <span className="flex-1 truncate">{it.label}</span>
                        {it.hint && (
                          <span className="hidden shrink-0 truncate text-xs text-muted-foreground sm:block">{it.hint}</span>
                        )}
                        {isActive && <CornerDownLeft size={14} className="shrink-0 text-muted-foreground" />}
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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

function AnimatedNumber({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const display = useTransform(count, (v) =>
    to % 1 !== 0 ? v.toFixed(1) : String(Math.round(v))
  )
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) { count.set(to); return }
    const ctrl = animate(count, to, { duration: 1.5, ease: [0.22, 1, 0.36, 1] })
    return () => ctrl.stop()
  }, [inView, to, count, reduceMotion])

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

function StatCard({ stat }: { stat: ImpactStat }) {
  const Icon = stat.icon

  return (
    <Spotlight className="surface-card h-full p-6 sm:p-7" glow="34,211,238">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] grad-accent-bg text-white shadow-[0_10px_30px_rgba(124,92,255,0.32)]">
          <Icon size={20} />
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {stat.sublabel}
        </span>
      </div>

      <p className="mt-6 font-[family:var(--font-heading)] text-4xl tracking-[-0.05em] text-foreground">
        <span className="text-gradient">
          <AnimatedNumber to={stat.numericValue} suffix={stat.suffix} />
        </span>
      </p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {stat.label}
      </p>
    </Spotlight>
  )
}

function GalleryModal({
  images,
  onClose,
  title,
}: {
  images: string[]
  onClose: () => void
  title: string
}) {
  const [index, setIndex] = useState(0)
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set())
  const reduceMotion = useReducedMotion()
  const thumbsRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  const markLoaded = (i: number) => setLoadedSet((prev) => { const s = new Set(prev); s.add(i); return s })

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  // Eagerly preload the first 3 images on mount; preload the rest lazily behind the scenes
  useEffect(() => {
    const preload = (i: number) => {
      if (i >= images.length) return
      const img = new window.Image()
      img.onload = () => markLoaded(i)
      img.src = images[i]
    }
    preload(0); preload(1); preload(2)
    const id = window.setTimeout(() => {
      for (let i = 3; i < images.length; i++) preload(i)
    }, 800)
    return () => window.clearTimeout(id)
  }, [images])

  // Preload adjacent slides when the user navigates
  useEffect(() => {
    const preloadAdjacent = (i: number) => {
      if (!loadedSet.has(i)) {
        const img = new window.Image()
        img.onload = () => markLoaded(i)
        img.src = images[i]
      }
    }
    preloadAdjacent((index + 1) % images.length)
    preloadAdjacent((index - 1 + images.length) % images.length)
  }, [index, images])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Move focus into the dialog on open, restore it to the opener on close (a11y).
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  useEffect(() => {
    const el = thumbsRef.current
    if (!el) return
    const thumb = el.children[index] as HTMLElement
    thumb?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
  }, [index])

  const isLoaded = loadedSet.has(index)

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project screenshots"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md focus:outline-none"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-white transition hover:bg-white/40"
      >
        <X size={20} />
      </button>

      <div
        className="relative flex h-[75vh] w-full items-center justify-center px-12 sm:max-w-[340px] sm:px-0"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
        }}
      >
        <button
          onClick={prev}
          className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:-left-14"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative flex h-full w-full items-center justify-center">
          {/* Spinner shown while the current image hasn't loaded yet */}
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt={`${title} app screenshot ${index + 1}`}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="h-full w-auto rounded-[2rem] object-contain shadow-2xl"
              onLoad={() => markLoaded(index)}
            />
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:-right-14"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={thumbsRef}
        className="mt-6 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button key={i} onClick={() => setIndex(i)} className="shrink-0">
            <img
              src={src}
              alt={`${title} app thumbnail ${i + 1}`}
              className={`h-14 w-auto rounded-xl object-cover transition ${i === index ? 'ring-2 ring-white opacity-100' : 'opacity-40 hover:opacity-70'}`}
            />
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-white/40">
        {index + 1} / {images.length} · Press ← → to navigate, Esc to close
      </p>
    </motion.div>
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
  const [galleryOpen, setGalleryOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), { stiffness: 150, damping: 18 })
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const pointerGlow = useMotionTemplate`radial-gradient(460px circle at ${gx} ${gy}, ${project.accent}38, transparent 60%)`

  return (
    <>
    <AnimatePresence>
      {galleryOpen && project.mockups && (
        <GalleryModal images={project.mockups} title={project.name} onClose={() => setGalleryOpen(false)} />
      )}
    </AnimatePresence>
    <motion.article
      ref={cardRef}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      onMouseMove={(e) => {
        if (reduceMotion) return
        const el = cardRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="surface-card-strong group/proj relative h-full overflow-hidden p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at top right, ${project.accent}22 0%, transparent 55%)`,
        }}
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden
          style={{ background: pointerGlow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/proj:opacity-100"
        />
      )}

      <div className="relative z-10 flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="rounded-full border border-border bg-white/[0.06] px-3 py-1">
                {project.category}
              </span>
              <span>{project.type}</span>
              {project.isActive && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(109,130,98,0.14)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#6d8262]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6d8262]" />
                  In Development
                </span>
              )}
            </div>
            <h3 className="font-[family:var(--font-heading)] text-2xl tracking-[-0.04em] sm:text-3xl lg:text-4xl">
              {project.name}
            </h3>
          </div>

          <div className={`flex shrink-0 items-center justify-center rounded-[1.4rem] border border-border bg-white/[0.05] text-foreground shadow-[0_18px_40px_rgba(0,0,0,0.4)] ${project.appIconWide ? 'w-24 p-2 sm:w-32 sm:p-3' : 'h-12 w-12 sm:h-14 sm:w-14'}`}>
            {project.appIcon ? (
              project.appIconWide ? (
                <img src={project.appIcon} alt={project.name} className="h-auto w-full object-contain" loading="lazy" />
              ) : (
                <NextImage src={project.appIcon} alt={project.name} width={56} height={56} className="h-full w-full rounded-[1.3rem] object-cover" />
              )
            ) : (
              <Icon size={22} />
            )}
          </div>
        </div>

        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-white/[0.05] px-3 py-1.5 text-sm text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-border bg-white/[0.05] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Engineering Impact
            </p>
            <p className="mt-2 text-sm leading-7 text-foreground/85">{project.impact}</p>
          </div>

          <div className="grid gap-3">
            {project.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-border bg-white/[0.05] p-4"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {(project.links.length > 0 || project.mockups) ? (
          <div className="mt-auto flex flex-wrap gap-3">
            {project.links.map((link) => {
              const LinkIcon = link.icon

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
                >
                  <LinkIcon size={16} />
                  {link.label}
                  <ArrowUpRight size={14} />
                </a>
              )
            })}
            {project.mockups && (
              <button
                onClick={() => setGalleryOpen(true)}
                onMouseEnter={() => {
                  project.mockups!.forEach((src) => { const img = new window.Image(); img.src = src })
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                <Images size={16} />
                Screenshots
              </button>
            )}
          </div>
        ) : null}
      </div>
    </motion.article>
    </>
  )
}

const skillLevelStyles: Record<SkillLevel, string> = {
  Expert: 'bg-[rgba(124,92,255,0.16)] text-[#b9a6ff] border border-[rgba(124,92,255,0.3)]',
  Proficient: 'bg-[rgba(34,211,238,0.14)] text-[#7fe3f2] border border-[rgba(34,211,238,0.28)]',
  Familiar: 'bg-white/[0.06] text-muted-foreground border border-white/[0.1]',
}

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = group.icon

  return (
    <Spotlight className="surface-card h-full p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] grad-accent-bg text-white shadow-[0_10px_30px_rgba(124,92,255,0.32)]">
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
        <span className={`mt-1 shrink-0 rounded-full px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${skillLevelStyles[group.level]}`}>
          {group.level}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
        {group.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-white/[0.05] px-3 py-1.5 text-sm text-foreground/80"
          >
            {skill}
          </span>
        ))}
      </div>
    </Spotlight>
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
      <article className="surface-card-strong overflow-hidden">
        {/* Header zone */}
        <div className="relative border-b border-border bg-[rgba(124,92,255,0.07)] px-6 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7">
          <div className="pointer-events-none absolute bottom-4 right-6 font-[family:var(--font-heading)] text-[5.5rem] font-black leading-none tracking-tighter text-foreground/[0.045] sm:right-8 sm:text-[8rem]">
            0{index + 1}
          </div>

          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-background">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Stage 0{index + 1}
              </span>
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {item.duration}
              </span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-[family:var(--font-heading)] text-3xl tracking-[-0.05em] text-foreground sm:text-4xl">
                {item.role}
              </h3>
              <span className="rounded-full border border-border bg-white/[0.05] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {item.company}
              </span>
            </div>
          </div>
        </div>

        {/* Bullet grid */}
        <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
          {item.bullets.map((bullet) => (
            <div
              key={bullet}
              className="rounded-[1.25rem] border border-border bg-white/[0.04] p-5"
            >
              <span className="mb-4 flex h-7 w-7 items-center justify-center rounded-full grad-accent-bg text-white">
                <Check size={13} />
              </span>
              <p className="text-sm leading-7 text-foreground/80">{bullet}</p>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
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
  const [orbitBannerDismissed, setOrbitBannerDismissed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [showChip, setShowChip] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setShowChip(true), 3000)
    return () => window.clearTimeout(id)
  }, [])
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
    const sectionIds = navigation.map((n) => n.href.replace('#', ''))
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

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

      <a
        href="#main-content"
        className="sr-only z-[210] rounded-full grad-accent-bg px-5 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <IntroOverlay />
      <AmbientFX />
      <ScrollProgress />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      {/* ORBIT Launch Banner */}
      <AnimatePresence>
        {!orbitBannerDismissed && (
          <motion.div
            key="orbit-banner"
            initial={reduceMotion ? { opacity: 1 } : { y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: -60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-[60] h-[60px] overflow-hidden"
            style={{ background: 'linear-gradient(100deg, #12304f 0%, #1e4d80 35%, #2563a8 60%, #1a3e6a 100%)' }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-[30%]"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)' }}
              animate={{ x: ['-100%', '450%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
            />

            {/* ── Desktop layout (sm+): single row ── */}
            <div className="relative hidden h-full items-center justify-center gap-3 px-12 sm:flex">
              <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                New
              </span>
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
              </span>
              <p className="text-sm font-medium text-white/85">
                <span className="font-bold text-white">ORBIT v1 is live</span>
                <span className="mx-2 opacity-30">—</span>
                Self-hosted dev OS: manage projects, tasks, notes &amp; encrypted secrets in one keyboard-first app.
              </p>
              <a
                href="https://orbit-sand-alpha.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/25"
              >
                Visit Now <ArrowUpRight size={11} />
              </a>
              <button
                type="button"
                aria-label="Dismiss banner"
                onClick={() => setOrbitBannerDismissed(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* ── Mobile layout: two-row stack ── */}
            <div className="relative flex h-full flex-col items-start justify-center gap-0.5 pl-4 pr-10 sm:hidden">
              {/* Row 1: title + badge + dot */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
                </span>
                <span className="text-sm font-bold text-white leading-tight">ORBIT v1 is live</span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  New
                </span>
              </div>
              {/* Row 2: description + CTA */}
              <div className="flex items-center gap-2">
                <p className="text-[11px] leading-tight text-white/70">
                  Self-hosted dev workspace — projects, tasks, notes &amp; secrets vault.
                </p>
                <a
                  href="https://orbit-sand-alpha.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white transition hover:bg-white/25"
                >
                  Visit <ArrowUpRight size={9} />
                </a>
              </div>
              {/* Dismiss */}
              <button
                type="button"
                aria-label="Dismiss banner"
                onClick={() => setOrbitBannerDismissed(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`fixed inset-x-0 z-50 px-4 py-4 sm:px-6 transition-[top] duration-300 ${orbitBannerDismissed ? 'top-0' : 'top-[60px]'}`}>
        <div className="shell">
          <div className="surface-card flex items-center justify-between px-5 py-4 sm:px-6">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] grad-accent-bg shadow-[0_6px_18px_rgba(124,92,255,0.4)]">
                <span className="font-[family:var(--font-heading)] text-sm font-bold leading-none text-white">
                  JR
                </span>
              </span>
              <span className="hidden font-[family:var(--font-heading)] text-lg tracking-[-0.04em] text-foreground sm:block">
                Javiya Raj
              </span>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition hover:text-foreground ${activeSection === item.href.replace('#', '') ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {item.label}
                  {activeSection === item.href.replace('#', '') && (
                    <span className="mt-0.5 block h-0.5 w-full rounded-full bg-accent" />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Open command menu"
                onClick={() => setPaletteOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
              >
                <Search size={15} />
                <span className="hidden lg:inline">Search</span>
                <kbd className="hidden items-center gap-0.5 rounded border border-white/[0.12] bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.62rem] lg:inline-flex">
                  <Command size={9} />K
                </kbd>
              </button>

              <div className="hidden md:flex">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('resume_click', { location: 'header' })}
                  className="inline-flex items-center gap-2 rounded-full grad-accent-bg px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,92,255,0.3)] transition hover:-translate-y-0.5"
                >
                  Resume.pdf
                  <Download size={16} />
                </a>
              </div>

              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/[0.05] text-foreground md:hidden"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
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
            className={`fixed inset-x-4 z-40 md:hidden ${orbitBannerDismissed ? 'top-[5.25rem]' : 'top-[calc(5.25rem+60px)]'}`}
          >
            <div className="surface-card-strong p-6">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[1.25rem] border border-border bg-white/[0.05] px-4 py-4 text-sm font-medium text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackEvent('resume_click', { location: 'mobile_menu' })
                    setMenuOpen(false)
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-[1.25rem] grad-accent-bg px-4 py-4 text-sm font-medium text-white"
                >
                  Resume.pdf
                  <Download size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="main-content" className={`transition-[padding] duration-300 ${orbitBannerDismissed ? 'pt-28 sm:pt-32' : 'pt-[calc(7rem+60px)] sm:pt-[calc(8rem+60px)]'}`}>
        <section className="shell grid gap-10 pb-24 pt-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.82fr)] lg:items-center lg:gap-14 lg:pb-32 lg:pt-16">
          <Reveal className="max-w-[40rem] space-y-9">
            <div className="section-kicker">
              <span className="eyebrow-dot" />
              Senior Flutter Developer
            </div>

            <div className="space-y-6">
              <h1 className="font-[family:var(--font-heading)] text-5xl tracking-[-0.075em] text-foreground sm:text-6xl lg:text-[5.5rem] lg:leading-[0.92]">
                <LetterReveal text="JAVIYA RAJ." className="text-gradient" />
                <span className="sr-only"> — Senior Flutter Developer</span>
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
              <MagneticButton
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full grad-accent-bg px-6 py-4 text-sm font-medium text-white shadow-[0_12px_34px_rgba(124,92,255,0.34)] transition hover:shadow-[0_16px_44px_rgba(124,92,255,0.5)]"
              >
                Explore My Work
                <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-6 py-4 text-sm font-medium text-foreground transition hover:border-white/25 hover:bg-white/[0.1]"
              >
                Get in Touch
                <Mail size={16} />
              </MagneticButton>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {heroFacts.map((fact) => (
                <span
                  key={fact}
                  className="rounded-full border border-border bg-white/[0.05] px-4 py-2 text-sm text-foreground/80"
                >
                  {fact}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <HeroDevice />
          </Reveal>
        </section>

        <div className="relative border-y border-white/[0.06] bg-white/[0.015] py-5">
          <Marquee items={marqueeTech} />
        </div>

        <section id="about" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Professional Vision"
                title="Clean Flutter Architecture."
                description="I believe in building software that is as beautiful under the hood as it is on the surface. My approach centers on modularity, testability, and deterministic state management."
              />
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutFeatures.map((item, index) => {
                const Icon = item.icon

                return (
                  <Reveal key={item.title} delay={0.08 + index * 0.05}>
                    <div className="surface-card h-full p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] grad-accent-bg text-white shadow-[0_10px_30px_rgba(124,92,255,0.32)]">
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
                      { label: 'CRASH-FREE', value: '99.9%' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="min-w-0 rounded-[1.5rem] border border-border bg-white/[0.05] p-3 text-center sm:p-4"
                      >
                        <p className="truncate text-base font-semibold text-foreground sm:text-xl">{item.value}</p>
                        <p className="mt-1 truncate text-[0.55rem] font-semibold uppercase tracking-[0.04em] text-muted-foreground sm:text-[0.72rem] sm:tracking-[0.16em]">
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
                title="Featured Flutter Projects."
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
                title="Flutter & Cross-Platform Skills."
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
                      className="rounded-full border border-border bg-white/[0.05] px-4 py-2 text-sm text-foreground/80"
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
                label="Proof of Work"
                title="Shipped to Real Users."
                description="Not just prototypes — apps live on the App Store and Google Play, used by thousands in production."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal>
                <Spotlight className="surface-card-strong h-full p-8 sm:p-10" glow="34,211,238">
                  <div className="section-kicker">
                    <span className="eyebrow-dot" />
                    Live in production
                  </div>
                  <h3 className="mt-5 font-[family:var(--font-heading)] text-2xl tracking-[-0.04em] text-foreground sm:text-3xl">
                    Production-grade apps trusted on the stores and inside enterprise teams at Esparkbiz.
                  </h3>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {proofPoints.map((p) => (
                      <div key={p.label} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-5">
                        <p className="text-gradient font-[family:var(--font-heading)] text-3xl tracking-[-0.04em]">
                          {p.value}
                        </p>
                        <p className="mt-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {p.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Spotlight>
              </Reveal>

              <div className="grid gap-4">
                {storeLinks.map((store, index) => {
                  const Icon = store.icon

                  return (
                    <Reveal key={`${store.app}-${store.sub}`} delay={0.05 + index * 0.06} className="h-full">
                      <a
                        href={store.href}
                        target="_blank"
                        rel="noreferrer"
                        className="surface-card group flex h-full items-center gap-4 p-5 transition hover:-translate-y-0.5 sm:p-6"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] border border-white/[0.1] bg-white/[0.05] text-foreground">
                          <Icon size={22} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            {store.sub}
                          </p>
                          <p className="mt-0.5 truncate text-lg font-semibold text-foreground">{store.app}</p>
                        </div>
                        {store.rating ? (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 text-sm font-semibold text-foreground">
                            <Star size={13} className="text-accent" />
                            {store.rating}
                          </span>
                        ) : (
                          <ArrowUpRight size={18} className="shrink-0 text-muted-foreground transition group-hover:text-foreground" />
                        )}
                      </a>
                    </Reveal>
                  )
                })}
              </div>
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
                      {githubStats.repoCount > 0 ? `${githubStats.repoCount}+` : '—'}
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
                  className="inline-flex items-center gap-2 rounded-full grad-accent-bg px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,92,255,0.3)] transition hover:-translate-y-0.5"
                >
                  Follow my ecosystem on GitHub
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {repos.length === 0 ? (
                <p className="col-span-2 text-sm text-muted-foreground">
                  No repositories found.
                </p>
              ) : (
                repos.map((repo, index) => (
                  <Reveal key={repo.name} delay={0.06 + index * 0.05}>
                    <article className="surface-card h-full p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] grad-accent-bg text-white shadow-[0_10px_30px_rgba(124,92,255,0.32)]">
                          <GitBranch size={20} />
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-foreground">
                          <Star size={14} />
                          {repo.stars}
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <h3 className="font-[family:var(--font-heading)] text-3xl tracking-[-0.04em] text-foreground">
                          {repo.name}
                        </h3>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {repo.language}
                        </p>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                        {repo.description}
                      </p>

                      {repo.private ? (
                        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground select-none">
                          <ShieldCheck size={13} />
                          Private
                        </span>
                      ) : (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-accent"
                        >
                          Open repository
                          <ArrowUpRight size={15} />
                        </a>
                      )}
                    </article>
                  </Reveal>
                ))
              )}
            </div>
          </div>
        </section>

        <section id="services" className="section-shell">
          <div className="shell space-y-10">
            <Reveal>
              <SectionHeader
                label="Work With Me"
                title="Flutter Development Services."
                description="Whether you're launching a new product, scaling an existing one, or untangling a legacy codebase — here's where I plug in."
              />
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon

                return (
                  <Reveal key={service.title} delay={0.05 + index * 0.05}>
                    <Spotlight className="surface-card h-full p-6 sm:p-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] grad-accent-bg text-white shadow-[0_10px_30px_rgba(124,92,255,0.32)]">
                        <Icon size={20} />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                        {service.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.deliverables.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 text-xs text-foreground/80"
                          >
                            <Check size={12} className="text-accent" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </Spotlight>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="surface-card-strong flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="space-y-2">
                  <div className="section-kicker">
                    <span className="eyebrow-dot" />
                    Available for freelance
                  </div>
                  <h3 className="font-[family:var(--font-heading)] text-2xl tracking-[-0.04em] text-foreground sm:text-3xl">
                    Have a project in mind? Let&apos;s scope it together.
                  </h3>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('book_call_click', { location: 'services' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full grad-accent-bg px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_34px_rgba(124,92,255,0.3)] transition hover:-translate-y-0.5"
                  >
                    <CalendarDays size={16} />
                    Book a call
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
                  >
                    Send a message
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
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
              <Reveal delay={0.05} className="h-full">
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
                      className="rounded-[1.5rem] border border-border bg-white/[0.05] p-5 transition hover:-translate-y-0.5"
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
                      className="rounded-[1.5rem] border border-border bg-white/[0.05] p-5 transition hover:-translate-y-0.5"
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
                      className="rounded-[1.5rem] border border-border bg-white/[0.05] p-5 transition hover:-translate-y-0.5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        GitHub
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        github.com/JAVIYARAJ
                      </p>
                    </a>

                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('book_call_click', { location: 'contact' })}
                      className="grad-accent-bg rounded-[1.5rem] p-5 shadow-[0_18px_50px_rgba(124,92,255,0.3)] transition hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                          Book a Call
                        </p>
                        <CalendarDays size={16} className="text-white/70" />
                      </div>
                      <p className="mt-2 text-lg font-semibold text-white">
                        Schedule a free 30 min
                      </p>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="mt-8 inline-flex items-center gap-2 rounded-full grad-accent-bg px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,92,255,0.3)] transition hover:-translate-y-0.5"
                  >
                    {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                    {copiedEmail ? 'Email copied' : 'Copy email'}
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="h-full">
                <form onSubmit={handleSubmit} className="surface-card-strong h-full p-8 sm:p-10">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      Full Name
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => { handleInputChange(e); if (formErrors.name) setFormErrors((p) => ({ ...p, name: undefined })) }}
                        placeholder="Javiya Raj"
                        className={`h-14 rounded-2xl border bg-white/[0.06] px-4 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring/20 ${formErrors.name ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground/20'}`}
                      />
                      {formErrors.name && <span className="text-xs text-destructive">{formErrors.name}</span>}
                    </label>

                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      Email Address
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => { handleInputChange(e); if (formErrors.email) setFormErrors((p) => ({ ...p, email: undefined })) }}
                        placeholder="your@email.com"
                        className={`h-14 rounded-2xl border bg-white/[0.06] px-4 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring/20 ${formErrors.email ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground/20'}`}
                      />
                      {formErrors.email && <span className="text-xs text-destructive">{formErrors.email}</span>}
                    </label>
                  </div>

                  <label className="mt-5 grid gap-2 text-sm font-medium text-foreground">
                    Project Details
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => { handleInputChange(e); if (formErrors.message) setFormErrors((p) => ({ ...p, message: undefined })) }}
                      rows={7}
                      placeholder="Tell me about your vision..."
                      className={`rounded-[1.5rem] border bg-white/[0.06] px-4 py-4 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring/20 ${formErrors.message ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground/20'}`}
                    />
                    {formErrors.message && <span className="text-xs text-destructive">{formErrors.message}</span>}
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

                  {errorMessage ? (
                    <p className="mt-6 rounded-[1.25rem] bg-[rgba(185,65,36,0.12)] px-4 py-3 text-sm text-foreground">
                      {errorMessage}
                    </p>
                  ) : null}

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-[1.25rem] bg-[rgba(109,130,98,0.14)] px-6 py-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full grad-accent-bg text-white">
                          <Check size={16} strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Message sent!</p>
                          <p className="text-sm text-muted-foreground">
                            Thanks for reaching out — I&apos;ll get back to you soon.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-full grad-accent-bg px-6 text-sm font-medium text-white shadow-[0_12px_34px_rgba(124,92,255,0.34)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Send size={16} />
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  )}
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
                2021, with 4+ years of experience engineering scalable mobile
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
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/[0.05] text-foreground transition hover:-translate-y-0.5"
                      aria-label={item.label}
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
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
                        className="break-words text-sm text-foreground/80 transition hover:text-foreground"
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

      <AnimatePresence>
        {showChip && activeSection !== 'contact' && (
          <motion.a
            href="#contact"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full border border-border bg-white/[0.07] px-5 py-3 text-sm font-medium text-foreground shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#6d8262]" />
            Available for Freelance
            <ArrowRight size={14} />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}
