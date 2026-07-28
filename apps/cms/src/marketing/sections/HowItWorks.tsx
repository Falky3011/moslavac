import { Reveal } from '../ui/Reveal'

const FLOW = [
  {
    step: 'Izvor',
    title: 'Službeni podaci natjecanja',
    text: 'Rezultati, poredak i strijelci nastaju tamo gdje se i vode — u sustavu natjecanja.',
  },
  {
    step: 'Obrada',
    title: 'Platforma ih dohvaća i sređuje',
    text: 'Podaci se dohvaćaju automatski, provjeravaju i spremaju u oblik koji stranica prikazuje.',
  },
  {
    step: 'Prikaz',
    title: 'Stranica kluba se osvježi sama',
    text: 'Bez klika iz kluba. Ono što klub unosi su samo novosti, slike i dokumenti.',
  },
]

const STEPS = [
  {
    title: 'Javite se',
    text: 'Kratka poruka ili poziv. Trebamo ime kluba, ligu u kojoj igrate i grb.',
  },
  {
    title: 'Radimo demo',
    text: 'U nekoliko dana dobijete stranicu u bojama kluba, s vašim podacima, na privremenoj adresi.',
  },
  {
    title: 'Objavljujemo',
    text: 'Ako vam odgovara, spajamo domenu i stranica ide uživo. Tek tada kreće naplata.',
  },
]

export function HowItWorks() {
  return (
    <section id="kako-radi" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-pitch">Kako radi</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">
                Podaci putuju do stranice bez vas
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">
                Najveći trošak klupske stranice nije izrada nego održavanje. Stranice propadaju jer
                netko prestane unositi rezultate. Zato je taj dio automatiziran.
              </p>
            </Reveal>
          </div>

          <ol className="relative space-y-px">
            {FLOW.map((item, index) => (
              <Reveal as="li" key={item.step} delay={0.06 * index}>
                <div className="flex gap-6 border-t border-line py-7">
                  <span className="label w-16 shrink-0 pt-1 text-muted">{item.step}</span>
                  <div>
                    <h3 className="display text-[21px]">{item.title}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Put od upita do objave */}
        <div className="mt-24 rounded-card border border-line bg-white p-8 lg:p-12">
          <Reveal>
            <h3 className="display text-[clamp(1.5rem,3vw,2rem)]">Od poruke do objave</h3>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delay={0.06 * index}>
                <div className="relative">
                  <span className="display block text-[42px] leading-none text-line-strong">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="display mt-4 text-[19px]">{step.title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
