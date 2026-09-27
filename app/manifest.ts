import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Javiya Raj — Senior Mobile Developer',
    short_name: 'Javiya Raj',
    description:
      'Senior Mobile Developer building Flutter and Native Android apps, plus web platforms with React and Next.js.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f5f2',
    theme_color: '#f5f5f2',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
