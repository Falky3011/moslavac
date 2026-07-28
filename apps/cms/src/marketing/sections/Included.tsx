import { Check } from 'lucide-react'
import Link from 'next/link'
import { PRICING } from '../config'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

/**
 * Ono što klub dobiva za pretplatu, bez iznosa. Iznos se dogovara uz demo, pa
 * ga stranica namjerno ne objavljuje — Stripe traži samo jasnu valutu, opis
 * usluge, kontakt i pravila otkazivanja.
 */
export function Included() {
  return (
    <section id="ukljuceno" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-pitch">Uključeno</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">
                Sve u jednoj mjesečnoj pretplati
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">
                Nema zasebnog troška postavljanja ni skrivenih stavki. Naplata je u eurima (
                {PRICING.currency}), mjesečno ili godišnje, a otkazuje se bilo kada bez naknade.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/kontakt" size="lg">
                  Zatražite ponudu i demo
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[13px] leading-relaxed text-muted">
                Uvjeti su u{' '}
                <Link href="/uvjeti" className="text-pitch underline underline-offset-4">
                  uvjetima korištenja
                </Link>{' '}
                i{' '}
                <Link href="/otkazivanje" className="text-pitch underline underline-offset-4">
                  pravilima otkazivanja
                </Link>
                .
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={20}>
            <ul className="border-t border-line">
              {PRICING.includes.map((item) => (
                <li key={item} className="flex items-start gap-4 border-b border-line py-5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-pitch-soft text-pitch">
                    <Check className="size-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="text-[16px] leading-relaxed">{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-4 py-5">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-pitch-soft text-pitch">
                  <Check className="size-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-[16px] leading-relaxed">
                  Naplata karticom putem Stripea, bez ugovorne obveze
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
