import type { Metadata } from 'next'
import { Mail, Phone, ShieldCheck } from 'lucide-react'
import { DemoForm } from '@/marketing/components/DemoForm'
import { BRAND, LEGAL } from '@/marketing/config'
import { ButtonLink } from '@/marketing/ui/Button'
import { Reveal } from '@/marketing/ui/Reveal'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: `Zatražite besplatan demo stranice za svoj klub ili nam postavite pitanje o usluzi ${BRAND.name}.`,
  alternates: { canonical: '/kontakt' },
}

const CHECKLIST = [
  'Puni naziv kluba i mjesto',
  'Liga i natjecanje u kojem nastupate',
  'Grb kluba u što boljoj kvaliteti',
  'Ime i broj osobe s kojom se dogovaramo',
]

export default function ContactPage() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid w-full max-w-[1180px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
        <div>
          <Reveal>
            <p className="label text-pitch">Kontakt</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">
              Recite nam za koji klub radimo demo
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted">
              Ispunite obrazac i javljamo se unutar jednog radnog dana. Demo je besplatan i ni na
              što vas ne obvezuje — vidite gotovu stranicu prije nego išta platite.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-card border border-line bg-white p-7">
              <h2 className="display text-[19px]">Što nam poslati</h2>
              <ul className="mt-5 space-y-3">
                {CHECKLIST.map((item, index) => (
                  <li key={item} className="flex gap-3 text-[15px] text-ink/85">
                    <span className="font-mono text-[12px] text-line-strong">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Stripe traži najmanje dva izravna kontakta; obrazac se ne broji. */}
          <Reveal delay={0.2}>
            <div className="mt-6 rounded-card bg-ink p-7 text-white">
              <h2 className="label text-white/40">Izravan kontakt</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${LEGAL.email}`} variant="onDark">
                  <Mail className="size-4" strokeWidth={1.8} />
                  {LEGAL.email}
                </ButtonLink>
                <ButtonLink
                  href={`tel:${LEGAL.phone.replace(/\s/g, '')}`}
                  variant="onDark"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  <Phone className="size-4" strokeWidth={1.8} />
                  {LEGAL.phone}
                </ButtonLink>
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-white/45">
                {LEGAL.entity} · OIB {LEGAL.oib} · {LEGAL.address}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-6 flex gap-4 rounded-card border border-line bg-pitch-soft p-6">
              <ShieldCheck className="size-5 shrink-0 text-pitch" strokeWidth={1.7} />
              <p className="text-[14px] leading-relaxed text-ink/80">
                Već imate stranicu koju nitko ne održava? Preuzimamo postojeći sadržaj i prenosimo
                ga na novu, bez gubitka postojećih poveznica.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={20}>
          <DemoForm />
        </Reveal>
      </div>
    </section>
  )
}
