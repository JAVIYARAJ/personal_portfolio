'use client'

import NextImage from 'next/image'
import type { GitHubStats, Repo } from '@/lib/github'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
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
  Copy,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Github,
  Images,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Play,
  Quote,
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
  '4+ Years Experience',
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

const currentlyBuilding = {
  name: 'Orbit',
  description: 'A private, self-hosted operating system for developers — built to replace the 6+ tools developers juggle daily. Manage projects, tasks, notes, secrets, time tracking, email templates, and developer utilities in one fast, keyboard-first interface.',
  status: 'In Progress',
}

const calendlyUrl = 'https://calendly.com/javiyaraj'

type Testimonial = {
  text: string
  name: string
  role: string
  company: string
  initials: string
  accent: string
}

const testimonials: Testimonial[] = [
  {
    text: 'Raj delivered our Flutter app ahead of schedule with remarkable quality. His Clean Architecture approach made the codebase easy to scale and hand off to our internal team.',
    name: 'Dhruv Mehta',
    role: 'Product Manager',
    company: '',
    initials: 'DM',
    accent: '#c76b4f',
  },
  {
    text: 'The modular design patterns Raj implemented cut our feature development time significantly. He has a strong eye for performance and production-grade reliability.',
    name: 'Nikhil Patel',
    role: 'Engineering Lead',
    company: '',
    initials: 'NP',
    accent: '#6d8262',
  },
  {
    text: 'Working with Raj on the CRM platform was a great experience. He proactively caught edge cases, kept releases on time, and the BLoC architecture he chose held up brilliantly.',
    name: 'Ankit Shah',
    role: 'CTO',
    company: '',
    initials: 'AS',
    accent: '#d5a24a',
  },
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
    <div className="surface-card h-full p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-foreground text-background">
          <Icon size={20} />
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {stat.sublabel}
        </span>
      </div>

      <p className="mt-6 font-[family:var(--font-heading)] text-4xl tracking-[-0.05em] text-foreground">
        <AnimatedNumber to={stat.numericValue} suffix={stat.suffix} />
      </p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {stat.label}
      </p>
    </div>
  )
}

function GalleryModal({
  images,
  onClose,
}: {
  images: string[]
  onClose: () => void
}) {
  const [index, setIndex] = useState(0)
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set())
  const reduceMotion = useReducedMotion()
  const thumbsRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const el = thumbsRef.current
    if (!el) return
    const thumb = el.children[index] as HTMLElement
    thumb?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
  }, [index])

  const isLoaded = loadedSet.has(index)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md"
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
              alt={`Screenshot ${index + 1}`}
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
              alt={`Thumb ${i + 1}`}
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

  return (
    <>
    <AnimatePresence>
      {galleryOpen && project.mockups && (
        <GalleryModal images={project.mockups} onClose={() => setGalleryOpen(false)} />
      )}
    </AnimatePresence>
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

      <div className="relative z-10 flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="rounded-full border border-border bg-white/80 px-3 py-1">
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

          <div className={`flex shrink-0 items-center justify-center rounded-[1.4rem] border border-border bg-white/75 text-foreground shadow-[0_18px_40px_rgba(27,30,24,0.08)] ${project.appIconWide ? 'w-24 p-2 sm:w-32 sm:p-3' : 'h-12 w-12 sm:h-14 sm:w-14'}`}>
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
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white"
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
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white"
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
  Expert: 'bg-[rgba(199,107,79,0.12)] text-accent',
  Proficient: 'bg-[rgba(109,130,98,0.15)] text-[#6d8262]',
  Familiar: 'bg-[rgba(109,107,99,0.1)] text-muted-foreground',
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
      <article className="surface-card-strong overflow-hidden">
        {/* Header zone */}
        <div className="relative border-b border-border bg-[rgba(199,107,79,0.045)] px-6 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7">
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
              <span className="rounded-full border border-border bg-white/75 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
              className="rounded-[1.25rem] border border-border bg-white/60 p-5"
            >
              <span className="mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
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
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] bg-foreground">
                <span className="font-[family:var(--font-heading)] text-sm font-bold leading-none text-background">
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
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/80 px-6 py-4 text-sm font-medium text-foreground transition hover:-translate-y-0.5"
              >
                Get in Touch
                <Mail size={16} />
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
              <div className="pointer-events-none absolute right-4 top-3 font-mono text-[5.5rem] font-black leading-none tracking-tighter text-foreground/[0.05]">
                {'</>'}
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

                <div className="rounded-[1.75rem] border border-border bg-white/75 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Currently Building
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(109,130,98,0.14)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#6d8262]">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6d8262]" />
                      {currentlyBuilding.status}
                    </span>
                  </div>
                  <p className="mt-3 font-[family:var(--font-heading)] text-lg tracking-[-0.03em] text-foreground">
                    {currentlyBuilding.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {currentlyBuilding.description}
                  </p>
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
                      { label: 'CRASH-FREE', value: '99.9%' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="min-w-0 rounded-[1.5rem] border border-border bg-white/75 p-3 text-center sm:p-4"
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
                label="Client Voices"
                title="What People Say."
                description="Feedback from product managers, engineering leads, and clients I've shipped with."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((t, index) => (
                <Reveal key={t.name} delay={0.05 + index * 0.06}>
                  <article className="surface-card-strong flex h-full flex-col gap-6 p-7">
                    <Quote
                      size={22}
                      className="shrink-0 text-accent"
                      strokeWidth={1.5}
                    />
                    <p className="flex-1 text-sm leading-7 text-foreground/80">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 border-t border-border pt-5">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-background"
                        style={{ background: t.accent }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          {t.role}{t.company ? ` · ${t.company}` : ''}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
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
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:-translate-y-0.5"
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
                          {repo.language}
                        </p>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                        {repo.description}
                      </p>

                      {repo.private ? (
                        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground select-none">
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

                    {/* <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.5rem] border border-border bg-foreground p-5 transition hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">
                          Book a Call
                        </p>
                        <CalendarDays size={16} className="text-background/60" />
                      </div>
                      <p className="mt-2 text-lg font-semibold text-background">
                        Schedule 30 min
                      </p>
                    </a> */}
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
                        className={`h-14 rounded-2xl border bg-white/80 px-4 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring/20 ${formErrors.name ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground/20'}`}
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
                        className={`h-14 rounded-2xl border bg-white/80 px-4 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring/20 ${formErrors.email ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground/20'}`}
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
                      className={`rounded-[1.5rem] border bg-white/80 px-4 py-4 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring/20 ${formErrors.message ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground/20'}`}
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
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
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
                      className="mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
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
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/75 text-foreground transition hover:-translate-y-0.5"
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
    </div>
  )
}
