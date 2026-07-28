import { LEGAL } from '../config'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function CtaBand() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 lg:py-28">
        <Reveal y={20}>
          <div className="relative overflow-hidden rounded-card border border-line bg-white p-10 text-center lg:p-16">
            <div
              aria-hidden
              className="pitch-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
            />
            <div className="relative">
              <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,5vw,3.4rem)]">
                Napravimo demo za vaš klub, bez obveze.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
                Pošaljite ime kluba i grb. Vratimo se sa stranicom u vašim bojama koju možete
                pokazati upravi prije bilo kakve odluke.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/kontakt" size="lg">
                  Zatražite demo
                </ButtonLink>
                <ButtonLink href={`mailto:${LEGAL.email}`} variant="secondary" size="lg">
                  {LEGAL.email}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
