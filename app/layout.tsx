import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#08090c',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://javiyaraj.dev'),
  title: 'Javiya Raj — Senior Mobile Developer | Native Android & Flutter',
  description:
    'Senior Mobile Developer with 4+ years experience shipping 15+ production apps. Expert in Native Android (Kotlin, Jetpack Compose), Flutter, Dart & Clean Architecture. Available for freelance.',
  keywords: [
    'Mobile developer',
    'Android developer',
    'Flutter developer',
    'Kotlin developer',
    'Jetpack Compose',
    'Clean Architecture',
    'MVVM',
    'Dart developer',
    'cross-platform mobile developer',
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
    title: 'Javiya Raj — Senior Mobile Developer (Android & Flutter)',
    description:
      '4+ years · 15+ production apps · Native Android (Kotlin, Compose) & Cross-Platform (Flutter, Dart). Available for freelance.',
    url: 'https://javiyaraj.dev',
    siteName: 'Javiya Raj Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Javiya Raj — Senior Mobile Developer (Android & Flutter)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Javiya Raj — Senior Mobile Developer (Android & Flutter)',
    description:
      '4+ years · 15+ production apps · Native Android (Kotlin/Compose) & Flutter. Available for freelance.',
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
            jobTitle: 'Senior Mobile Developer',
            description:
              'Senior Mobile Developer with 4+ years of experience architecting and shipping 15+ production-grade Native Android and Flutter apps.',
            sameAs: [
              'https://github.com/JAVIYARAJ',
              'https://linkedin.com/in/javiyaraj/',
              'https://x.com/Rjcoding',
            ],
            knowsAbout: [
              'Kotlin',
              'Jetpack Compose',
              'Android SDK',
              'Flutter',
              'Dart',
              'Clean Architecture',
              'MVVM',
              'BLoC',
              'Retrofit',
              'Room',
              'Supabase',
            ],
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
