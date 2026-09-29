import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Anvil,
  Apple,
  Boxes,
  Database,
  ExternalLink,
  Layers3,
  Play,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react'

export type ProjectLink = {
  label: string
  href: string
  icon: LucideIcon
}

export type Project = {
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
  // One caption per mockup, shown as numbered workflow steps.
  mockupCaptions?: string[]
  // Desktop/web screenshots (wide) rather than phone screens (tall).
  landscapeMockups?: boolean
  inProgress?: boolean
}

const shots = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/projects/${dir}/mockup-${i + 1}.webp`)

export const projects: Project[] = [
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
    tags: ['Flutter', 'Custom Calendar', 'Adaptive Layouts', 'Reactive Data Flow'],
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
    slug: 'krushna-forge',
    name: 'Krushna Forge Admin',
    homeLabel: 'Krushna',
    category: 'Admin panel · Billing & stock',
    type: 'Client',
    platform: 'Web',
    description:
      'A private admin panel and billing system for a forging company in Rajkot. It brings stock, production, GST billing, payments, purchases, expenses, staff salary, and monthly profit into one app that works in any browser — on a computer or a phone.',
    tags: ['Next.js', 'Role-based Access', 'GST Invoicing', 'Stock Tracking', 'P&L Reports', 'Audit Log', 'Responsive'],
    stats: [
      { label: 'Modules', value: '9' },
      { label: 'User roles', value: '3' },
    ],
    impact:
      'Designed the full system: owner-controlled users and permissions, stock that balances itself (inward − outward − rejection), GST invoices in the client’s own format, and a monthly P&L built automatically.',
    accent: '#d9662c',
    icon: Anvil,
    appIcon: '/projects/krushna-forge/icon.png',
    appIconWide: true,
    inProgress: true,
    landscapeMockups: true,
    mockups: [
      'login',
      'home',
      'orders',
      'order-detail',
      'production',
      'production-days',
      'daily-entry',
      'billing',
      'payments',
      'pl-report',
      'pl-month',
      'pl-year',
      'products',
      'staff',
      'audit-log',
    ].map((name, i) => `/projects/krushna-forge/${String(i + 1).padStart(2, '0')}-${name}.webp`),
    mockupCaptions: [
      'Private login — no public sign-up',
      'Home: today’s work at a glance',
      'Orders from raw material to completion',
      'Order detail with production progress',
      'Daily production for the month',
      'Day-wise earnings and production days',
      'Daily entry: one row per order',
      'GST bills made from completed orders',
      'Payments received against bills',
      'P&L report, built automatically',
      'Month breakdown: turnover, expenses, salary',
      'Month-wise P&L for the financial year',
      'Products with HSN/SAC and GST rate',
      'Staff and monthly salary',
      'Audit log: who changed what, and when',
    ],
    links: [{ label: 'Company website', href: 'https://www.krushnaforge.com/', icon: ExternalLink }],
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

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
