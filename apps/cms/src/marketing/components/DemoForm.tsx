import { Mail } from 'lucide-react'
import { DEMO_FORM, LEGAL } from '../config'
import { ButtonLink } from '../ui/Button'

/**
 * Obrazac za upit. Ugrađuje se kao iframe, bez vanjskih skripti, pa nema
 * kolačića trećih strana ni utjecaja na brzinu učitavanja stranice.
 * Dok adresa obrasca nije postavljena, prikazuje se kontakt e-poštom.
 */
export function DemoForm() {
  if (!DEMO_FORM.embedUrl) {
    return (
      <div className="rounded-card border border-dashed border-line-strong bg-white p-8">
        <Mail className="size-5 text-pitch" strokeWidth={1.7} />
        <h2 className="display mt-4 text-[19px]">Pošaljite upit e-poštom</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Obrazac još nije postavljen. Do tada nam pišite izravno.
        </p>
        <ButtonLink href={`mailto:${LEGAL.email}`} className="mt-6">
          {LEGAL.email}
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-card border border-line bg-white">
      <iframe
        src={DEMO_FORM.embedUrl}
        title="Obrazac za upit"
        loading="lazy"
        className="w-full border-0"
        style={{ height: DEMO_FORM.height }}
      />
    </div>
  )
}
