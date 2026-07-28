import type { MetadataRoute } from 'next'
import { BRAND } from '@/marketing/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Admin i API su privatni dio platforme.
      disallow: ['/admin', '/api'],
    },
    sitemap: `${BRAND.url}/sitemap.xml`,
  }
}
