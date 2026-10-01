# Live App Demos — Implementation Plan

> **Status:** Planned, not started.
> **Goal:** Let visitors run the *real* apps inside the hero phone (and from each App Store listing), instead of only seeing screenshots.

---

## 1. The idea

Today, tapping an app icon on the hero phone opens `PhoneAppPreview` — a static card with stats, a description and screenshots. With this feature, the preview gets a **"Try it live"** button. Tapping it streams the actual Android/iOS build into the phone's screen via [Appetize.io](https://appetize.io), so visitors can tap around the real app without installing anything.

Very few mobile-developer portfolios do this, and it is the strongest proof of work the site can offer.

```
Hero phone ─ tap icon ─▶ PhoneAppPreview ─ "Try it live" ─▶ LiveDemo (Appetize iframe, screen only)
App listing ─────────────── "Try it live" ───────────────▶ same LiveDemo, in a phone-framed modal
```

---

## 2. Prerequisites (outside this repo)

These must be done before the feature can go live. The site code can be built first — it falls back to screenshots until a key exists.

### 2.1 Pick the apps

Start with apps that are fully **our own** — no client permission needed:

| Project | Platform | Priority |
|---|---|---|
| SplitEase (`splitease`) | Flutter + Supabase | **1st** — easiest to seed |
| Pocket Score (`pocket-score`) | Flutter | 2nd |
| ORBIT (`orbit`) | — | 3rd |

Client apps (Dyshez, Goals.com, Smackdab, Krushna Forge Admin) **require written permission** from the client before a runnable build is made public — an uploaded build can be explored and decompiled by anyone.

### 2.2 Add a demo mode to each app

This is the bulk of the work, and what makes the demo impressive instead of a login wall.

- [ ] **Skip auth:** a "Continue as demo" path, or a pre-filled demo account that signs in automatically.
- [ ] **Seed data:** the app must open full — SplitEase with groups and expenses, Pocket Score with matches, etc.
- [ ] **Separate backend:** point the demo build at a dedicated Supabase/Firebase project (or staging). **Never production.** Treat every key in the APK as public.
- [ ] **Reset strategy:** demo data gets messed with by visitors. Add a nightly reset (e.g. a Supabase cron / edge function that truncates and re-seeds), or make the demo read-only.
- [ ] **Emulator check:** Google Sign-In, Maps, and push notifications depend on Play services and may fail on the emulator. Disable or stub them in demo mode.
- [ ] Use a build flavor / `--dart-define=DEMO=true` so demo mode never ships to the stores.

### 2.3 Produce the builds

| Platform | Upload format | Command |
|---|---|---|
| Android (Flutter) | **APK** (not AAB) | `flutter build apk --release --dart-define=DEMO=true` |
| Android (native) | **APK** | `./gradlew assembleDemoRelease` (or a universal APK from an AAB via `bundletool build-apks --mode=universal`) |
| iOS (Flutter) | **Simulator build** — zipped `Runner.app`, not `.ipa` | `flutter build ios --simulator --dart-define=DEMO=true` then zip `build/ios/iphonesimulator/Runner.app` |

The APK must include **x86_64** (cloud emulators). Flutter's default release APK already does.

### 2.4 Appetize.io account

- [ ] Create an account and upload each build → note the **public key** for each.
- [ ] Check the current plan limits (the free tier has limited monthly streaming minutes and 1 concurrent session).
- [ ] In the app's Appetize settings, set a **short inactivity timeout** (≈ 2–3 min) to save minutes.
- [ ] Keep keys in this repo (they are public by design — they're in the embed URL).

---

## 3. Site implementation

All UI stays in `components/portfolio/portfolio-home.tsx` (single-file by design — see `CLAUDE.md`).

### 3.1 Data — `lib/projects.ts`

Add an optional field to `Project`:

```ts
export type Project = {
  // ...existing fields
  // Runnable build streamed from Appetize.io. Omit to show screenshots only.
  demo?: {
    appetizeKey: string
    platform: 'android' | 'ios'
    // Appetize device id, e.g. 'pixel7' or 'iphone15pro'. Defaults per platform.
    device?: string
  }
}
```

Then on a project:

```ts
demo: { appetizeKey: 'xxxxxxxxxxxxxxxx', platform: 'android' },
```

### 3.2 `LiveDemo` component

A new component in `portfolio-home.tsx`:

- Renders an `<iframe>` pointing at the Appetize embed URL, **screen only** (no device frame — our own phone frame is the frame):
  ```
  https://appetize.io/embed/<appetizeKey>?device=<device>&scale=auto&screenOnly=true&autoplay=true&centered=both
  ```
  > Verify parameter names against the current Appetize docs before implementing — the embed API has changed over time, and a JS SDK (`js.appetize.io/embed.js`) is also available if we need session events.
- Shows a loading state ("Starting SplitEase…" with the app icon + spinner) until the iframe's `load` fires.
- Has a close button and Escape handling — reuse `usePhoneAppFocus(onClose)`.
- `allow="autoplay; clipboard-read; clipboard-write"` on the iframe.
- **Never mount the iframe on page load.** Mount it only after the visitor taps "Try it live" — each mount starts a paid streaming session.

### 3.3 Entry points

1. **`PhoneAppPreview`** — when `project.demo` exists, add a primary **"Try it live"** button above "View full listing". Tapping it swaps the preview content for `<LiveDemo>` filling the phone screen (`absolute inset-0`), same zoom animation pattern (`appZoom`).
2. **`AppListing`** — add a **"Try it live"** button next to "Read the case study". On tap, open a modal containing a phone frame (reuse the hero phone's bezel styles) with `<LiveDemo>` inside. Reuse the `GalleryModal` portal/overlay pattern.
3. **Spotlight (⌘K)** — optional: add a "Try SplitEase live" action for each project with a demo.

### 3.4 Fallbacks

- No `demo` field → no button; screenshots as today.
- Iframe fails or the visitor's session is refused (minutes exhausted, concurrency limit) → show "Live demo is busy right now" with a link to the store listing / screenshots.
- Small screens: the hero phone is already phone-sized, so the stream fits; in the listing modal, cap the phone at the viewport height.

### 3.5 Motion & accessibility

- Follow the existing rules: framer-motion animations gated with `useReducedMotion()`, **no markup branching on it** (use `motion-reduce:` CSS).
- Dialog has `role="dialog"` and an `aria-label` like `"SplitEase live demo"`.
- Return focus to the "Try it live" button on close (handled by `usePhoneAppFocus`).

### 3.6 Analytics

Use the existing `trackEvent` helper:

| Event | When | Params |
|---|---|---|
| `demo_start` | "Try it live" tapped | `{ project, location: 'hero_phone' \| 'listing' \| 'spotlight' }` |
| `demo_loaded` | iframe `load` | `{ project }` |
| `demo_close` | closed | `{ project, seconds }` |
| `demo_error` | fallback shown | `{ project }` |

`seconds` tells us which apps people actually explore and helps forecast Appetize minutes.

### 3.7 Security / headers

- No CSP is set today (`next.config.mjs` has no headers, no `proxy.ts`). If one is added later, it must allow `frame-src https://appetize.io`.
- No secrets in the repo: Appetize **public** keys only. The API token used for uploads stays in the Appetize dashboard / CI secrets.

---

## 4. Optional: automate uploads

Once demos are live, keep them fresh from each app's CI (GitHub Actions):

```yaml
- run: flutter build apk --release --dart-define=DEMO=true
- run: |
    curl -X POST https://api.appetize.io/v1/apps/${{ secrets.APPETIZE_PUBLIC_KEY }} \
      -H "X-API-KEY: ${{ secrets.APPETIZE_API_TOKEN }}" \
      -F "file=@build/app/outputs/flutter-apk/app-release.apk" -F "platform=android"
```

Updating an existing public key keeps the same embed URL, so the portfolio needs no change. (Check the current Appetize upload API before using this.)

---

## 5. Checklist

**Per app (in the app's own repo)**
- [ ] Demo flavor / `DEMO` define
- [ ] Auto sign-in or demo account
- [ ] Seed data + reset job
- [ ] Separate demo backend
- [ ] Emulator-safe (Play-services features stubbed)
- [ ] APK (and optional iOS simulator zip) built
- [ ] Uploaded to Appetize → public key

**Portfolio (this repo)**
- [ ] `demo` field on `Project` + key added in `lib/projects.ts`
- [ ] `LiveDemo` component
- [ ] "Try it live" in `PhoneAppPreview`
- [ ] "Try it live" in `AppListing` (phone-framed modal)
- [ ] Optional Spotlight action
- [ ] Fallback states
- [ ] `trackEvent` analytics
- [ ] Tested on desktop + a real phone, reduced-motion on and off
- [ ] Monitor Appetize minute usage for the first week

---

## 6. Open questions

- Which client apps can we get permission for (Dyshez is the strongest showcase)?
- Is the free Appetize tier enough, or is a paid plan worth it once traffic grows?
- iOS demos too, or Android-only to start? (Android-only is simpler; the hero phone is iOS-styled, but the stream fills only the screen.)
