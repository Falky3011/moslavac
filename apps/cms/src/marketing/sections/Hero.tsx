import { CLUBS, PRICING, formatPrice } from '../config'
import { SitePreview } from '../components/SitePreview'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Travnjak u pozadini — mreža koja blijedi prema dnu. */}
      <div
        aria-hidden
        className="pitch-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-pitch-soft blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-14 px-5 pt-16 pb-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24 lg:pb-32">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/80 px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-pitch" />
              <span className="label text-muted">Za nogometne i sportske klubove</span>
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="display mt-6 text-[clamp(2.6rem,7vw,4.6rem)]">
              Stranica vašeg kluba.
              <br />
              <span className="text-pitch">Rezultati se upisuju sami.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Izrađujemo i održavamo web stranice za sportske klubove. Rezultati, tablica, raspored i
              strijelci povlače se automatski iz službenih izvora, pa nitko u klubu ne mora ništa
              prepisivati. Izrada, hosting i podrška idu u jednoj mjesečnoj pretplati.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/kontakt" size="lg">
                Zatražite besplatan demo
              </ButtonLink>
              <ButtonLink href="/#klubovi" variant="secondary" size="lg">
                Pogledajte stranice klubova
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-5 font-mono text-[12px] text-muted">
              {PRICING.showPrice ? `${formatPrice(PRICING.monthly)}/mjesec · ` : ''}
              demo prije odluke · otkazivanje bilo kada · bez ugovorne obveze
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 border-t border-line pt-6">
              <p className="label text-muted">Već koriste</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {CLUBS.map((club) => (
                  <li key={club.name}>
                    <a
                      href={club.url}
                      target="_blank"
                      rel="noreferrer"
                      className="display text-[15px] text-ink/45 transition-colors hover:text-ink"
                    >
                      {club.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={28}>
          <SitePreview />
        </Reveal>
      </div>
    </section>
  )
}
