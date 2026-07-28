import type { MetadataRoute } from 'next'
import { BRAND } from '@/marketing/config'

const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/kontakt', priority: 0.8 },
  { path: '/uvjeti', priority: 0.3 },
  { path: '/privatnost', priority: 0.3 },
  { path: '/otkazivanje', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BRAND.url}${route.path}`,
    changeFrequency: 'monthly',
    priority: route.priority,
  }))
}
