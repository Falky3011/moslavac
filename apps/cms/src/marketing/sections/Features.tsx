import {
  CalendarDays,
  FileText,
  Handshake,
  Images,
  Newspaper,
  Search,
  Smartphone,
  Trophy,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { cn } from '../ui/cn'

type Feature = {
  icon: LucideIcon
  title: string
  text: string
  className?: string
}

const FEATURES: Feature[] = [
  {
    icon: Newspaper,
    title: 'Novosti i obavijesti',
    text: 'Objava vijesti sa slikama iz uređivača. Bez znanja o web stranicama.',
    className: 'sm:col-span-3',
  },
  {
    icon: CalendarDays,
    title: 'Raspored utakmica',
    text: 'Sve kategorije na jednom mjestu, s datumom, terminom i protivnikom.',
    className: 'sm:col-span-3',
  },
  {
    icon: Users,
    title: 'Momčadi i igrači',
    text: 'Od seniora do prstića — postava, brojevi, pozicije i fotografije.',
    className: 'sm:col-span-2',
  },
  {
    icon: Images,
    title: 'Galerija',
    text: 'Albumi s utakmica i turnira, optimizirani da se brzo učitaju.',
    className: 'sm:col-span-2',
  },
  {
    icon: FileText,
    title: 'Dokumenti kluba',
    text: 'Statut, financijska izvješća i zapisnici, javno dostupni.',
    className: 'sm:col-span-2',
  },
  {
    icon: Handshake,
    title: 'Sponzori u prvom planu',
    text: 'Logotipi s poveznicom na svakoj stranici — vidljivost koju sponzoru možete pokazati.',
    className: 'sm:col-span-3',
  },
  {
    icon: Smartphone,
    title: 'Radi na mobitelu',
    text: 'Stranica se može dodati na početni zaslon i otvara se kao aplikacija.',
    className: 'sm:col-span-3',
  },
]

export function Features() {
  return (
    <section id="znacajke" className="border-t border-line bg-paper-2/60">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <p className="label text-pitch">Što klub dobiva</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">
              Sve što klub treba na webu, u jednom paketu
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              Ne prodajemo predložak koji zatim sami popunjavate. Stranicu postavljamo mi, s grbom i
              bojama vašeg kluba, i dalje je održavamo.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-6">
          {/* Nosiva kartica — razlog zbog kojeg klubovi ostaju. */}
          <Reveal className="sm:col-span-6" y={20}>
            <article className="relative overflow-hidden rounded-card bg-ink p-8 text-white lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-pitch/25 blur-3xl"
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <Trophy className="size-6 text-lime" strokeWidth={1.6} />
                  <h3 className="display mt-5 text-[clamp(1.6rem,3vw,2.3rem)]">
                    Rezultati, tablica i strijelci — bez ijednog unosa
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                    Stranica se spaja na službeni izvor natjecanja i sama povlači odigrane
                    utakmice, poredak u ligi i listu strijelaca. Tajnik kluba ne mora u nedjelju
                    navečer prepisivati rezultate.
                  </p>
                </div>
                <dl className="grid shrink-0 grid-cols-3 gap-6 lg:gap-10">
                  {[
                    ['Rezultati', 'automatski'],
                    ['Tablica', 'automatski'],
                    ['Strijelci', 'automatski'],
                  ].map(([term, value]) => (
                    <div key={term}>
                      <dt className="label text-white/40">{term}</dt>
                      <dd className="mt-2 font-mono text-[13px] text-lime">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </Reveal>

          {FEATURES.map((feature, index) => (
            <Reveal
              key={feature.title}
              className={cn('sm:col-span-2', feature.className)}
              delay={0.04 * index}
            >
              <FeatureCard {...feature} />
            </Reveal>
          ))}

          <Reveal className="sm:col-span-6" delay={0.1}>
            <FeatureCard
              icon={Search}
              title="Klub se pronalazi na Googleu"
              text="Stranica dolazi s mapom stranica, strukturiranim podacima i brzim učitavanjem, pa se ime kluba pojavljuje u pretrazi umjesto tuđih portala."
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, text }: Feature) {
  return (
    <article className="group h-full rounded-card border border-line bg-white p-6 transition-colors duration-300 hover:border-line-strong">
      <span className="flex size-10 items-center justify-center rounded-xl bg-pitch-soft text-pitch transition-colors duration-300 group-hover:bg-pitch group-hover:text-white">
        <Icon className="size-[18px]" strokeWidth={1.7} />
      </span>
      <h3 className="display mt-5 text-[19px]">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted">{text}</p>
    </article>
  )
}
