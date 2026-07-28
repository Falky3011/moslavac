import Link from 'next/link'
import { ADMIN_PATH, BRAND, CLUBS, LEGAL } from '../config'
import { LogoMark } from '../ui/Logo'

const columns = [
  {
    title: 'Platforma',
    links: [
      { label: 'Što dobivate', href: '/#znacajke' },
      { label: 'Kako radi', href: '/#kako-radi' },
      { label: 'Što je uključeno', href: '/#ukljuceno' },
      { label: 'Česta pitanja', href: '/#pitanja' },
    ],
  },
  {
    title: 'Pravno',
    links: [
      { label: 'Uvjeti korištenja', href: '/uvjeti' },
      { label: 'Politika privatnosti', href: '/privatnost' },
      { label: 'Otkazivanje i povrat', href: '/otkazivanje' },
    ],
  },
  {
    title: 'Kontakt',
    links: [
      { label: 'Kontaktirajte nas', href: '/kontakt' },
      { label: LEGAL.email, href: `mailto:${LEGAL.email}` },
      { label: 'Prijava za klub', href: ADMIN_PATH },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white/70">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <LogoMark className="text-white/12" />
              <span className="display text-[19px]">{BRAND.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {BRAND.tagline}. Rezultati, tablica i raspored ažuriraju se automatski iz službenih
              izvora.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CLUBS.map((club) => (
                <a
                  key={club.name}
                  href={club.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 transition-colors hover:border-white/40 hover:text-white"
                >
                  {club.name}
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="label text-white/40">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Podaci o pružatelju usluge — Stripe ih traži na javnoj stranici. */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {LEGAL.entity} · OIB {LEGAL.oib} · {LEGAL.address}
          </p>
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  )
}
