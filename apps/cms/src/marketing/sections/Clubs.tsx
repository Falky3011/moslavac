import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { CLUBS } from '../config'
import { Reveal } from '../ui/Reveal'

export function Clubs() {
  return (
    <section id="klubovi" className="border-t border-line bg-paper-2/60">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <p className="label text-pitch">Klubovi</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">
                Stranice koje su već uživo
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              Svaka stranica nosi boje i grb svog kluba. Ista platforma ispod, drugačiji dizajn
              iznad.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {CLUBS.map((club, index) => (
            <Reveal key={club.name} delay={0.05 * index} y={20}>
              <a
                href={club.url}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-card border border-line bg-white transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_50px_-30px_rgba(14,19,17,0.45)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper-2">
                  <Image
                    src={club.image}
                    alt={`Naslovnica stranice ${club.name}`}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div>
                    <h3 className="display text-[20px]">{club.name}</h3>
                    <p className="mt-1 font-mono text-[11px] text-muted">
                      {new URL(club.url).hostname.replace('www.', '')}
                    </p>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
