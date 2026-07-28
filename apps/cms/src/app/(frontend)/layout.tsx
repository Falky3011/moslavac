import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist_Mono, Inter } from 'next/font/google'
import React from 'react'
import { Footer } from '@/marketing/components/Footer'
import { Header } from '@/marketing/components/Header'
import { BRAND } from '@/marketing/config'
import './styles.css'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    'Moderna web stranica za nogometne i sportske klubove. Rezultati, tablica, raspored i strijelci ažuriraju se automatski. Izrada, hosting i podrška u jednoj mjesečnoj pretplati.',
  applicationName: BRAND.name,
  keywords: [
    'web stranica za nogometni klub',
    'stranica za sportski klub',
    'izrada stranice nogometni klub',
    'CMS za klub',
    'rezultati i tablica automatski',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: BRAND.url,
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      'Rezultati, tablica i raspored ažuriraju se sami. Izrada, hosting i podrška u jednoj pretplati.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#fbfaf7',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" className={`${bricolage.variable} ${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Prijeđi na sadržaj
        </a>
        <Header />
        <main id="sadrzaj">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
