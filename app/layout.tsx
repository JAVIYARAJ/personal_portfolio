import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://javiyaraj.dev'),
  title: 'Javiya Raj — Senior Flutter Developer | Cross-Platform Mobile Apps',
  description:
    'Senior Flutter developer with 4+ years experience shipping 15+ production apps. Expert in Flutter, Dart, Kotlin, Clean Architecture & BLoC. Available for freelance.',
  keywords: [
    'Flutter developer',
    'Flutter freelancer',
    'cross-platform mobile developer',
    'Dart developer',
    'Kotlin developer',
    'Clean Architecture',
    'Supabase',
    'BLoC',
    'mobile app development',
    'Javiya Raj',
  ],
  alternates: {
    canonical: 'https://javiyaraj.dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Javiya Raj — Senior Flutter Developer',
    description:
      '4+ years · 15+ production apps · Flutter, Dart, Kotlin, Clean Architecture. Available for freelance.',
    url: 'https://javiyaraj.dev',
    siteName: 'Javiya Raj Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Javiya Raj — Senior Flutter Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Javiya Raj — Senior Flutter Developer',
    description:
      '4+ years · 15+ production apps · Flutter, Dart, Kotlin. Available for freelance.',
    creator: '@Rjcoding',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-background text-foreground antialiased">
        {children}
        <Script id="json-ld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Javiya Raj',
            url: 'https://javiyaraj.dev',
            jobTitle: 'Senior Flutter Developer',
            description:
              'Senior Flutter developer with 4+ years of experience shipping 15+ production-grade cross-platform mobile apps.',
            sameAs: [
              'https://github.com/JAVIYARAJ',
              'https://linkedin.com/in/javiyaraj/',
              'https://x.com/Rjcoding',
            ],
            knowsAbout: ['Flutter', 'Dart', 'Kotlin', 'Clean Architecture', 'Supabase', 'BLoC', 'Android SDK'],
            email: 'javiyaraj4@gmail.com',
          })}
        </Script>
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZC46FF98CN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZC46FF98CN');
          `}
        </Script>
      </body>
    </html>
  )
}
