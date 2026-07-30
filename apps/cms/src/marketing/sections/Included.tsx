import { Check, Circle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { DEMO_ANCHOR, PRICING } from '../config'
import { ButtonLink } from '../ui/Button'
import { NumberTicker } from '../ui/NumberTicker'
import { TopoBackdrop } from '../components/TopoBackdrop'
import { cn } from '../ui/cn'

type Plan = {
  icon: ReactElement
  title: string
  description: string
  /** Broj se odmota tickerom; `null` znači da iznos ne objavljujemo. */
  price: number | null
  period: string
  buttonText: string
  buttonHref: string
  features: string[]
  extraFeatures?: string[]
  isPopular?: boolean
}

const PLANS: Plan[] = [
  {
    icon: <RefreshCw className="size-6" strokeWidth={1.7} />,
    title: 'Pretplata',
    description: 'Stranica uživo na vašoj domeni, s održavanjem.',
    price: PRICING.showPrice ? PRICING.monthly : null,
    period: PRICING.showPrice ? '/ mjesec' : 'mjesečno ili godišnje',
    buttonText: 'Zatražite ponudu',
    buttonHref: DEMO_ANCHOR,
    features: [
      'Dizajn crtan za vaš klub, ne gotov predložak',
      'Vlastita domena i SSL certifikat',
      'Hosting i sigurnosne kopije',
      'Pristup CMS-u za novosti, galeriju i dokumente',
    ],
    extraFeatures: [
      'Automatski rezultati, tablica, raspored i strijelci',
      'Ažuriranja i popravci',
      'Podrška e-poštom',
      'Otkazivanje bilo kada, bez naknade',
    ],
    isPopular: true,
  },
]

export function Included() {
  return (
    <section id="ukljuceno" className="relative overflow-hidden border-t border-white/10 bg-black">
      <TopoBackdrop className="pointer-events-none absolute inset-0 size-full" />
      <div className="relative mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-12 space-y-4 text-center sm:mb-16">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] text-white">
            <span className="relative z-10">
              Što je uključeno
              <span
                aria-hidden
                className="absolute bottom-0 left-0 -z-10 h-0.5 w-full bg-gradient-to-r from-white to-transparent"
              />
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-white/55">
            {PRICING.showPrice
              ? `Jedna pretplata pokriva sve, bez obzira na broj kategorija. Naplata je u eurima (${PRICING.currency}), a otkazuje se bilo kada.`
              : `Prvo demo, pa tek onda pretplata. Naplata je u eurima (${PRICING.currency}), a iznos ovisi o veličini kluba i broju kategorija.`}
          </p>
        </div>

        <div className="flex justify-center gap-6 *:h-fit max-sm:flex-col max-sm:items-center">
          {PLANS.map((plan) => (
            <div
              key={plan.title}
              className={cn(
                'w-full max-w-[440px] rounded-xl border border-white/10 p-2 pb-4',
                plan.isPopular && 'bg-white/[0.06]',
              )}
            >
              <div
                className={cn(
                  'flex flex-col gap-6 rounded-xl bg-white/[0.04] p-6',
                  plan.isPopular && 'relative overflow-hidden border border-white/10 bg-black shadow-lg',
                )}
              >
                <div className={cn(plan.isPopular && 'flex items-start justify-between')}>
                  <span
                    className={cn(
                      'flex size-12 items-center justify-center rounded-md shadow-md',
                      plan.isPopular ? 'bg-white text-black' : 'bg-white/[0.06] text-white',
                    )}
                  >
                    {plan.icon}
                  </span>
                  <span className="z-10 rounded-md border border-white/20 px-2 py-1 font-mono text-[11px] text-white/60">
                    {PRICING.currency}
                  </span>
                </div>

                <div className="flex-1 space-y-2.5">
                  <h3 className="text-[22px] font-semibold text-white">{plan.title}</h3>
                  <p className="text-[15px] text-white/60">{plan.description}</p>
                </div>

                <p className="text-[44px] font-bold leading-none text-white">
                  {plan.price === null ? (
                    <span className="text-[32px]">Na upit</span>
                  ) : (
                    <>
                      <NumberTicker value={plan.price} /> €
                    </>
                  )}
                  <span className="ml-1.5 text-[15px] font-normal text-white/55">
                    {plan.period}
                  </span>
                </p>

                {plan.isPopular ? (
                  <Link
                    href={plan.buttonHref}
                    className="rainbow-button h-12 w-full rounded-full text-[15px]"
                  >
                    {plan.buttonText}
                  </Link>
                ) : (
                  <ButtonLink
                    href={plan.buttonHref}
                    size="lg"
                    className="w-full rounded-full border border-white/20 bg-transparent text-white hover:bg-white/10"
                  >
                    {plan.buttonText}
                  </ButtonLink>
                )}
              </div>

              <div className="space-y-6 pt-6">
                <ul className="space-y-1.5 px-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 py-1 text-[15px] text-white/80"
                    >
                      <Check className="mt-1 size-3.5 shrink-0 text-white" strokeWidth={2.4} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.extraFeatures && (
                  <>
                    <span className="block h-px w-full bg-white/10" />
                    <ul className="space-y-1.5 px-4">
                      {plan.extraFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 py-1 text-[15px] text-white/80"
                        >
                          <Circle className="mt-1.5 size-2 shrink-0 fill-white text-white" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] text-white/55">
          Uvjeti su u{' '}
          <Link href="/uvjeti" className="text-white underline underline-offset-4">
            uvjetima korištenja
          </Link>{' '}
          i{' '}
          <Link href="/otkazivanje" className="text-white underline underline-offset-4">
            pravilima otkazivanja
          </Link>
          . Naplata karticom putem Stripea.
        </p>
      </div>
    </section>
  )
}
