import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Javiya Raj — Senior Flutter Developer',
    short_name: 'Javiya Raj',
    description:
      'Senior Flutter developer shipping production-grade cross-platform mobile apps with Clean Architecture.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08090c',
    theme_color: '#08090c',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
