// Long-form write-ups shown on /projects/[slug]. Keyed by project slug (see lib/projects.ts).
// Keep numbers here in step with the project's stats and impact line.

export type CaseStudy = {
  role: string
  // What I owned on the project, as short bullet points.
  responsibilities: string[]
  // The situation before: who it is for and what was hard for them.
  problem: string
  // Key product and engineering decisions, in the order they matter.
  approach: { title: string; body: string }[]
  // Hard parts and how they were solved.
  challenges: { title: string; body: string }[]
  results: string[]
}

export const caseStudies: Record<string, CaseStudy> = {
  dyshez: {
    role: 'Flutter developer · Esparkbiz · Top code contributor',
    responsibilities: [
      'Shipped every production release from v1.23 to v1.40 on iOS and Android (Sep 2024 – today)',
      'Dish-first search and a clustered map explorer with Typesense and flutter_map',
      'Social feed with in-app camera, cropping, video trimming and resumable video uploads',
      'Restaurant rewards program with real-time updates over Supabase Realtime',
      'Promos Live booking with Stripe payments, and Dyshez Direct in-app ordering',
      'Release pipeline with Codemagic and Shorebird, plus Sentry, PostHog and Clarity monitoring',
    ],
    problem:
      'Most food apps are built around restaurants. Dyshez is built around dishes: people search for a specific dish, see real photos and videos from other diners, vote on the best version and follow people whose taste they trust. The app then grew into a platform with restaurant rewards, bookable live promos and direct ordering. That meant one app combining social discovery, maps, loyalty, bookings, payments and ordering, with heavy media on weak mobile networks, location-first content, loyalty points users can trust, and frequent releases without regressions.',
    approach: [
      {
        title: 'A hybrid architecture that scales',
        body: 'The app grew to about 775 Dart files and 160k lines of code. It is split into app, core, data, features and shared layers, with 19 feature modules. Dependencies point one way (features → data → core), and UI code never calls Supabase or Dio directly; it always goes through one of 31 repositories.',
      },
      {
        title: 'GetX with per-route bindings',
        body: 'GetX handles state, dependency injection and routing. Each route has its own binding, so controllers are released when a screen closes. A very large Supabase service file was split into domain-specific services and repositories.',
      },
      {
        title: 'Dish-first discovery',
        body: 'Typesense gives instant, typo-tolerant search over dishes and restaurants, with debounced queries to limit backend load. A flutter_map explorer with marker clustering, a live location marker and compass heading keeps dense areas readable, and "list by votes" rankings let the community pick the best dish in each category.',
      },
      {
        title: 'Rewards, promos and ordering',
        body: 'Restaurants run first-visit, base and milestone reward programs, with staff-authorised redemption, a points breakdown and QR visit logging. Promos Live takes users from a time-limited deal to reservation, Stripe payment and confirmation. Dyshez Direct adds multiple carts, scheduled orders, map-picked delivery addresses, order tracking and separate ratings for order, delivery and restaurant.',
      },
      {
        title: 'Platform features',
        body: 'Email OTP, Google and Apple sign-in; push notifications and an in-app notification center; deep links to dishes, restaurants and profiles; referrals; multi-language support generated from one JSON source; in-app update prompts and a maintenance mode. Dev, beta and production flavors keep configuration separate, and secrets come from Doppler instead of the code.',
      },
    ],
    challenges: [
      {
        title: 'Large videos on mobile networks',
        body: 'Uploads used to fail and restart from zero. Videos now upload over the TUS protocol to Cloudflare Stream using signed URLs, so an upload resumes after a network drop.',
      },
      {
        title: 'Maps with hundreds of pins',
        body: 'Restaurants, promos and rewards all depend on location. Marker clustering and debounced map-search queries keep the map responsive in dense areas.',
      },
      {
        title: 'Loyalty state users can trust',
        body: 'Supabase Realtime subscriptions on the rewards, milestone and notification tables update the UI the moment a milestone is reached, with retry logic and careful cleanup so subscriptions do not go stale or leak.',
      },
      {
        title: 'Fast fixes without waiting on store review',
        body: 'Shorebird ships Dart-only hotfixes over the air, while Codemagic builds signed store releases per branch. Sentry, PostHog and Microsoft Clarity make crashes and stuck users visible.',
      },
      {
        title: 'Staying on current platforms',
        body: 'The app moved to Flutter 3.44 and Android target API 36, migrating the packages that broke along the way.',
      },
      {
        title: 'Consistency across a large team',
        body: 'About 10 mobile developers have worked on the app. A written architecture guide, a release log and AI-agent rules that scaffold features in the house style keep the code consistent.',
      },
    ],
    results: [
      'Shipped every production release from v1.23 to v1.40 (Android build 40 → 94)',
      '1,600+ of the project’s 3,800+ commits, the most of any contributor, despite joining a year in',
      'Grew a social food-sharing MVP into a platform with loyalty, bookings, payments and direct ordering',
      'Kept a ~160k-line codebase on current tooling: Flutter 3.44 and Android 16 (API 36)',
    ],
  },

  splitease: {
    role: 'Solo developer · Personal project',
    responsibilities: [
      'Product, UI and UX design across 36 screens',
      'Flutter app with Clean Architecture, flutter_bloc, GetIt and fpdart',
      'Supabase backend: Postgres schema, row-level security and 45 RPC functions',
      'Real-time friend requests with Supabase Realtime',
      'Personal finance features: recurring bills, category budgets and spending analytics',
    ],
    problem:
      'Splitting money is simple for one dinner, but it gets messy over a month of rent, groceries, cabs and trips. People forget who paid, splits are rarely equal, and asking a friend for money is awkward when you are not sure of the exact amount. On top of that, most people track their own spending in a second app. SplitEase keeps a running, accurate balance with every friend and group, lets you settle up in one tap, and tracks personal expenses and budgets in the same place.',
    approach: [
      {
        title: 'Money logic in the database',
        body: 'Every create, update, delete and settle-up runs as one transactional Postgres RPC on Supabase (45 in total). A single expense touches the expense, every participant’s share, attachments and the activity feed, so either all of it is saved or none of it is.',
      },
      {
        title: 'Four ways to split',
        body: 'Expenses can be split equally, by exact amounts, by percentage or by shares, with any member as the payer. A dedicated SplitBloc owns all four modes and keeps the numbers correct as members are added, removed or switched between modes.',
      },
      {
        title: 'Groups, friends and settle-up',
        body: 'Groups have admin and member roles, and people join with an invite code or QR code. Each friend and group has its own dashboard with balances and shared history. Settle-up records a payment in a few taps and warns you before you pay more than you owe.',
      },
      {
        title: 'Personal finance in the same app',
        body: 'Personal expenses, recurring bills with reminders, monthly category budgets and fl_chart analytics with a drill-down into the transactions behind each category, all next to your shared balances.',
      },
      {
        title: 'Clean Architecture, built to extend',
        body: 'About 43k lines of Dart across 12 feature modules, each split into data, domain and presentation. The domain layer is pure Dart, each operation is its own usecase (65 of them), and errors are returned as Either values with fpdart instead of thrown. GetIt wires it together and flutter_bloc drives 33 blocs and cubits.',
      },
    ],
    challenges: [
      {
        title: 'Balances that never go stale',
        body: 'One expense changes the dashboard, the group, the friend page, the activity feed and analytics. A cross-screen refresh bus with ID-scoped flags means only the screens that were affected refetch when you return to them.',
      },
      {
        title: 'Fewer round-trips',
        body: 'Group and friend dashboards each load from a single server-side RPC, and long lists like the activity feed use paginated RPCs with infinite scroll and skeleton loaders.',
      },
      {
        title: 'Friend requests that feel live',
        body: 'A Supabase Realtime subscription, filtered on the server to the current user’s pending requests, shows new requests instantly without polling.',
      },
      {
        title: 'Safe by default',
        body: 'Row-level security limits users to data they are part of, deleted expenses can be restored, and feature flags let unfinished features ship switched off.',
      },
    ],
    results: [
      'Built solo: 12 feature modules, 36 screens, 65 usecases and 45 backend RPCs',
      '~43k lines of Dart since January 2026',
      'Grew from a split tracker into a personal finance app without rewriting earlier features',
      'One Flutter codebase for iOS and Android, with no custom backend server to run',
    ],
  },

  'pocket-score': {
    role: 'Solo developer · Personal project',
    responsibilities: [
      'Product and design across 21 screens, including the "Midnight Studio" dark theme',
      'Ball-by-ball scoring engine built on flutter_bloc',
      'Supabase backend: Postgres schema, row-level security, RPC functions and triggers',
      'Live scores for followers with Supabase Realtime',
      'Player career stats and Batter, Bowler and Impact rankings',
      'CI with GitHub Actions: a release APK on every push to main',
    ],
    problem:
      'Weekend box cricket and gully cricket are usually scored on paper, in a notes app, or not at all. Professional scoring apps are built for league cricket, with rules and setup screens that don’t fit a 6-over game between friends. The scorer is usually also playing, so recording a ball has to take one tap, mistakes have to be undoable, and a match must never be lost if the phone locks or the app is killed. Pocket Score started as an offline-only scorer in April 2026 and was rebuilt in v2 as an online, multi-user app.',
    approach: [
      {
        title: 'One bloc for every cricket rule',
        body: 'ScoreBloc models the full innings: striker, non-striker, bowler, partnership, extras, fall of wickets and the ball-by-ball log. Every rule is an event (RecordBall, ChangeBowler, RetirePlayer, StartSuperOverInnings…), so wides, no-balls with runs off the bat, free hits, run-outs, retirements and last man standing are handled in one place instead of in button handlers.',
      },
      {
        title: 'A guided match flow',
        body: 'Setup → team selection with captains → lineup → match rules → toss → openers → scoring → result. Max overs per bowler and power play overs are set after team selection, so they fit the actual squad size, and tied matches can go to a super over.',
      },
      {
        title: 'Live scores in real time',
        body: 'The scorer’s phone writes the live innings to Supabase after each ball. Everyone else follows on a live score screen that updates instantly through Supabase Realtime, and match lists show a game moving from live to completed without a refresh.',
      },
      {
        title: 'Groups and fair rankings',
        body: 'Players join a group with a 6-character invite code or a QR code. Each group has its own match history and leaderboard, and a ranking calculator combines strike rate, average, recent form, economy and fielding into Batter, Bowler and Impact scores, with a visible breakdown of each rating.',
      },
      {
        title: 'Rules in the database',
        body: 'Screens and blocs never build SQL; they call repositories, which call Postgres RPC functions for group joins, match and stats upserts and account deletion. Row-level security is on every table, so live scores can be public while users can only change their own data.',
      },
    ],
    challenges: [
      {
        title: 'Never losing a match',
        body: 'Match and score state serialise to JSON, and restore events rebuild the exact session from the saved live score after the app is killed or the battery dies.',
      },
      {
        title: 'Exact undo',
        body: 'Each state keeps a history of previous states, so undoing a ball restores the snapshot exactly instead of trying to recalculate backwards.',
      },
      {
        title: 'From offline to online',
        body: 'v1 kept everything on the device. The move to Supabase happened in stages (schema and security first, then RPCs, then realtime) while keeping the same bloc APIs, so the scoring screen never came to depend on the network.',
      },
      {
        title: 'Store account-deletion rules',
        body: 'Account deletion is a soft delete with a 7-day grace period: signing back in cancels it, and data is removed permanently after 7 days.',
      },
    ],
    results: [
      'Took the app from an offline scorer to an online, real-time, multi-user product in about two months',
      'A scoring engine covering extras, free hits, every wicket type, retirements, bowler limits, power plays and super overs',
      '~23k lines of Dart across 21 screens, with row-level security on every table and automated Android builds',
      'Meets both stores’ in-app account deletion requirement',
    ],
  },

  goals: {
    role: 'Android developer · Esparkbiz',
    responsibilities: [
      'Built the native Android app in Kotlin and Jetpack Compose',
      'MVVM architecture with Coroutines and Flow',
      'Networking and caching with Retrofit, OkHttp and Room',
      'Push notifications with Firebase Cloud Messaging',
    ],
    problem:
      'Goals.com is a CRM for goal tracking and incentive management. Sales teams need to see their targets and incentives in real time, on the move. The app works with a lot of data, so slow screens and network waits directly cost the people using it time.',
    approach: [
      {
        title: 'Native Android with Compose and MVVM',
        body: 'The app is built natively in Kotlin with Jetpack Compose for the UI and MVVM to keep screens separate from business logic, giving a fast, modern Android experience.',
      },
      {
        title: 'Faster networking with caching',
        body: 'Retrofit and OkHttp handle the API, with response caching and Room as a local store. Screens show data immediately from the cache and refresh in the background.',
      },
      {
        title: 'Async work with Coroutines and Flow',
        body: 'Long-running work runs in Kotlin Coroutines, and Flow streams updates to the UI, so the app stays responsive while data loads.',
      },
      {
        title: 'Notifications that bring people back',
        body: 'Firebase Cloud Messaging sends timely updates about goals and incentives, and image-loading optimisations keep list screens smooth.',
      },
    ],
    challenges: [
      {
        title: 'Large data on mobile',
        body: 'CRM data grows quickly. Caching, background loading and careful image handling kept screens fast as the data grew.',
      },
    ],
    results: [
      '25% less processing time through optimised networking and async work',
      '15% higher engagement from FCM notifications',
      '30% increase in sales',
    ],
  },

  smackdab: {
    role: 'Flutter developer · Esparkbiz',
    responsibilities: [
      'Built the app in Flutter for phones and tablets',
      'Designed and built a custom calendar module',
      'Created a library of reusable UI components',
      'Adaptive, responsive layouts',
    ],
    problem:
      'Sales teams plan their day around meetings, calls and follow-ups. The tools they used were built for desktops and did not fit how they actually worked — on phones in the field and on tablets in meetings.',
    approach: [
      {
        title: 'A custom calendar',
        body: 'Off-the-shelf calendar widgets did not match the scheduling workflows the team needed, so I built a custom calendar module around how sales people plan their day.',
      },
      {
        title: 'Reusable components',
        body: 'A shared library of UI components meant new screens were assembled from tested pieces, which sped up feature work and kept the design consistent.',
      },
      {
        title: 'Adaptive layouts',
        body: 'The layout adapts to the device: a focused single-column view on phones and a richer multi-panel view on tablets, from the same code.',
      },
      {
        title: 'Reactive data flow',
        body: 'The UI updates from a reactive data flow, so changes to schedules show up across screens without manual refreshes.',
      },
    ],
    challenges: [
      {
        title: 'One app, two form factors',
        body: 'Designing for both phones and tablets meant thinking in modular pieces from the start, so the same components could be arranged differently per screen size.',
      },
    ],
    results: [
      '40% higher team efficiency',
      '25% increase in overall sales',
      'A component library that sped up later feature development',
    ],
  },

  'krushna-forge': {
    role: 'Full-stack developer · Client project',
    responsibilities: [
      'Sole developer, working directly with the business owner',
      'Design and front end in Next.js, React and Tailwind, desktop-first and usable on a phone',
      'Supabase database: 21 tables, 65 functions and 37 migrations',
      'GST bill print that matches the client’s existing printed bills exactly',
      'Security audit and hardening before real data went in',
    ],
    problem:
      'Krushna Forge is a forging job-work unit in Rajkot. It takes job orders from parties, forges the pieces, bills them with GST and collects payment. That work lived in registers, Excel sheets and a separate billing program, so nobody could say at a glance what was in production, what was billed, who owed money or whether the month made a profit. This is live accounting data, so totals had to be exact to the paisa, invoice numbers had to be gapless, and the owner, who is not technical, needed simple screens and plain-language errors.',
    approach: [
      {
        title: 'One flow from order to profit',
        body: 'Order → daily production → GST bill → payment → balance → P&L. Expenses, supplier dues and staff salary feed into the same P&L, and the Home screen shows today’s production, receivables, supplier dues, this month’s P&L and the order pipeline.',
      },
      {
        title: 'Business rules live in Postgres',
        body: 'Every write goes through a database function that checks the input and enforces the rules, and signed-in users have no direct access to tables. The browser cannot skip a rule, which keeps the front end simple and the data trustworthy.',
      },
      {
        title: 'GST bills that match the client’s own',
        body: 'Bills are made from completed orders with CGST/SGST or IGST per line, HSN codes, round-off and amount in words. The print is an SVG drawn at the exact coordinates of the client’s existing A4 PDF bill, with or without letterhead. Checked against a real ₹96,151 bill, it matched exactly.',
      },
      {
        title: 'Payments, balances and ledgers',
        body: 'Payments by cash, UPI, bank or cheque are allocated to specific bills, and leftover money is kept as party credit. Company Balance shows outstanding and advance per party with ageing, and each party ledger has a running balance, CSV export and a WhatsApp reminder.',
      },
      {
        title: 'Year-wise, like accounting software',
        body: 'One company-wide financial year (April–March) scopes every module and report. A staff salary sheet handles weekly offs, overtime and advances, and a read-only audit log records every change in plain language (“Rate: ₹42 → ₹45”) with who made it.',
      },
    ],
    challenges: [
      {
        title: 'Invoice numbers that never skip',
        body: 'A counter per financial year is taken inside the same transaction that creates the bill, so numbers like KF/52 are gapless and never repeat. Each bill also freezes a copy of the seller and party details, so editing the company profile never changes an old bill.',
      },
      {
        title: 'Numbers that always agree',
        body: 'The dashboard, balances and P&L all sum money in SQL from the same helper functions. The app only displays the results, so no two screens can show different totals.',
      },
      {
        title: 'Rules that can’t be broken',
        body: 'Database triggers and unique indexes block over-production, double billing and cancelling a paid bill, not just UI checks.',
      },
      {
        title: 'Two people, one record',
        body: 'Every update sends the version it last saw. A stale write is rejected with a clear “changed on another device” message instead of silently overwriting someone else’s work.',
      },
      {
        title: 'Protecting real business data',
        body: 'Sign-ups are off, every database function checks for a live user, new tables and functions get no access until granted, bill photos sit in a private bucket behind short-lived links, and strict security headers and a CSV formula-injection guard are in place.',
      },
    ],
    results: [
      'One system from order to profit, with 12 connected modules replacing registers and spreadsheets',
      'GST bills identical to the client’s existing ones, with gapless numbering',
      'Production, receivables, supplier dues and monthly profit on one screen',
      'Every change traceable in the audit log',
      '~15.5k lines of TypeScript and ~9.8k lines of SQL, security-audited before real data went in',
    ],
  },

  'feature-gate-pro': {
    role: 'Author & maintainer · Open source',
    responsibilities: [
      'Public API design: one FlagFlow class with typed getters',
      'Merge engine over REST, Firebase Remote Config and local JSON providers',
      'Audience targeting and stable percentage rollouts',
      'Reactive widgets and a drop-in QA debug dashboard',
      'Test suite, docs and 14 releases on pub.dev',
    ],
    problem:
      'Most Flutter apps wire Firebase Remote Config straight into their widgets. That works until the team needs a second source of flags from their own backend, a safe offline default, a flag for one country or app version, a 10% rollout, or a way for QA to test the “off” path without touching production config. Each of these usually ends up as custom code spread through the app, and forcing a Firebase version on every app that installs a package causes version conflicts.',
    approach: [
      {
        title: 'One engine, one clear order',
        body: 'Apps list their providers in priority order. Every flag resolves the same way: runtime override, then each provider in turn, then the cached or registered default, then the caller’s default. If a provider’s targeting rejects the user, the engine moves on to the next provider instead of returning “off”, so a local default can still apply.',
      },
      {
        title: 'Adapters instead of dependencies',
        body: 'Firebase is reached through callbacks the app passes in, so the package depends only on http and shared_preferences. REST, Firebase and local JSON providers share a small FlagProvider interface, so teams can plug in any other source.',
      },
      {
        title: 'Targeting and rollouts from config',
        body: 'Rules live in the flag config, with operators like ==, in and >= over country, platform, app version and custom attributes, so changing an audience needs no new build. A "rollout": 15 value turns the feature on for 15% of users.',
      },
      {
        title: 'Widgets that keep up',
        body: 'FeatureFlagWidget and FeatureFlagBuilder read the value synchronously on first build, with no flicker, then rebuild when the flag changes. A listenToChanges: false option keeps a layout from shifting mid-session.',
      },
      {
        title: 'Built for QA',
        body: 'A drop-in debug screen shows the user context and every flag, and lets a tester force a flag on or off. Overrides live only in memory, so a device can’t get stuck in a strange state after a restart.',
      },
    ],
    challenges: [
      {
        title: 'Stable rollouts without a server',
        body: 'Buckets come from a 32-bit FNV-1a hash of the flag key and user ID, mapped to 1–100. The same user lands in the same bucket on every device, and including the flag key means one user is not in the first 10% of every flag.',
      },
      {
        title: 'Remote Config only returns strings',
        body: 'A parser detects booleans, numbers and JSON, and unwraps a value-plus-metadata object so targeting and rollout rules can sit next to the value.',
      },
      {
        title: 'Networks fail',
        body: 'The REST provider retries with exponential backoff and a timeout, then fails quietly so the next provider takes over. No provider ever throws, and typed getters return a safe default instead of crashing on a bad cast.',
      },
      {
        title: 'Refresh without request storms',
        body: 'A mutex makes simultaneous refresh calls share one fetch. Two post-launch releases fixed widgets not rebuilding after a background refresh for flags that exist only in a remote provider.',
      },
      {
        title: 'Testing time-based code',
        body: 'Refresh timers and retry backoff are tested with fake_async and HTTP with a mock client, so the suite is fast and gives the same result every time.',
      },
    ],
    results: [
      'Published on pub.dev as feature_gate_pro, with 14 releases from 1.0.0 to 1.2.5',
      '~1,400 lines of SDK code and 67 test cases across 14 test files',
      'Only two runtime dependencies: http and shared_preferences',
      'Runs on all six Flutter platforms; MIT licensed and open source',
    ],
  },

  orbit: {
    role: 'Solo developer · Personal project',
    responsibilities: [
      'Product and UI design across 16 modules, with a plain-CSS design system and runtime themes',
      'React 19 + Vite front end, hosted on Vercel',
      'Supabase backend: 120+ migrations of schema, RPC functions, triggers and pg_cron jobs',
      '7 Supabase Edge Functions for Google Calendar, Cloudinary signing, email and the admin API',
      'Browser-side encrypted secrets vault',
      'A separate admin console for users, workspaces and broadcasts',
    ],
    problem:
      'A small dev team usually spreads its work across seven or eight tools: GitHub for code, Vercel for deploys, Google Calendar for meetings, a task board, a notes app, a time tracker and a password manager for API keys. Each switch costs attention, and nothing links a task to its branch, its meetings or the time spent on it. Bringing all of that into one app meant real team permissions enforced by the database, secrets the server can never read, and two-way calendar sync that never loses data.',
    approach: [
      {
        title: 'One workspace, 16 modules',
        body: 'Projects, a Kanban board with custom statuses, subtasks, comments, attachments and time tracking; a calendar with two-way Google sync; GitHub and Vercel hubs; Markdown notes; a learning tracker; a Project Hub for scope, invoices and contracts; and analytics. A task can have its own GitHub branch, logged time and linked notes.',
      },
      {
        title: 'Every read and write through Postgres RPCs',
        body: 'The client never queries tables directly. Each RPC checks workspace membership and role, so the Owner, Admin, Member and Viewer roles and a 20+ key permission matrix (editable from the UI) hold even if someone calls the API directly.',
      },
      {
        title: 'A vault the server can’t read',
        body: 'Secrets are encrypted in the browser with AES-256-GCM, using a key derived from a master password with PBKDF2 at 310,000 iterations. Supabase only stores ciphertext, and an encrypted verifier checks the password without storing it.',
      },
      {
        title: 'Automations in the database',
        body: 'Owners set “when X, then Y” rules: status-change alerts, a time summary when a task is done, and daily nudges for stale tasks. They run from a Postgres trigger, so they fire no matter which screen changed the task.',
      },
      {
        title: 'Keyboard-first, flag-controlled',
        body: 'A ⌘K command palette, shortcuts and global search make the app fast to move around. Firebase Remote Config can turn each module on or off without a redeploy, and every module defaults to on if the fetch fails.',
      },
    ],
    challenges: [
      {
        title: 'Two-way Google Calendar sync',
        body: 'Orbit pushes changes with etag If-Match, retries on a 412 conflict with a fresh etag, recreates events deleted in Google, and pulls Google-side edits back by timestamp. When a token refresh fails, the user gets a “reconnect Google Calendar” notification.',
      },
      {
        title: 'Keeping third-party secrets off the browser',
        body: 'GitHub and Google tokens are stored AES-GCM encrypted and used only inside edge functions, and Cloudinary uploads use server-signed URLs so the API secret never reaches the client.',
      },
      {
        title: 'Reminders with nobody online',
        body: 'A pg_cron job runs every minute and turns due calendar reminders into in-app notifications, even when no one has the app open.',
      },
      {
        title: 'Nudges that don’t nag',
        body: 'A task’s last activity counts edits, comments and logged time, and a nudge log makes sure the same nudge is never sent twice.',
      },
      {
        title: 'Hardening the database',
        body: 'Fixed every function’s search_path, removed anonymous execute rights on security-definer functions, switched functions to invoker where possible, and indexed unindexed foreign keys.',
      },
    ],
    results: [
      'A 16-module team platform built and shipped solo in about a month',
      '~27k lines of React, 120+ database migrations and 7 edge functions',
      'Live at orbit-sand-alpha.vercel.app',
      'Replaces a daily set of tools: task board, calendar, notes, timer, deploy dashboard and password manager',
    ],
  },
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug]
}

export function hasCaseStudy(slug: string) {
  return slug in caseStudies
}
