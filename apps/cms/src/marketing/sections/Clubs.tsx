import { Eye } from 'lucide-react'
import Image from 'next/image'
import { CLUBS } from '../config'
import { MotionPreset } from '../ui/MotionPreset'
import { cn } from '../ui/cn'

export function Clubs() {
  return (
    <section id="klubovi" className="border-t border-white/10 bg-black">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col px-5 sm:px-8">
        <div className="space-y-2.5 py-16">
          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex h-[22px] items-center border border-white/10 px-2 text-[12px] text-white/60">
              Klubovi
            </span>
          </MotionPreset>

          <div className="flex justify-between gap-4 max-md:flex-col">
            <h2 className="display max-w-[420px] text-[clamp(1.6rem,3.4vw,2.4rem)] text-white">
              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.3}
                transition={{ duration: 0.5 }}
              >
                Stranice koje su
              </MotionPreset>
              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.45}
                transition={{ duration: 0.5 }}
              >
                već uživo ⚡
              </MotionPreset>
            </h2>

            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={0.3}
              transition={{ duration: 0.5 }}
            >
              <p className="max-w-xl text-[17px] leading-relaxed text-white/55">
                Svaka stranica nosi boje i grb svog kluba, a ispod je ista platforma. Otvorite ih i
                provjerite jesu li rezultati i tablica ažurni — nitko iz kluba ih ne upisuje.
              </p>
            </MotionPreset>
          </div>
        </div>

        <MotionPreset fade blur delay={0.75} transition={{ duration: 0.5 }}>
          <span className="block h-px w-full bg-white/10" />
        </MotionPreset>

        <div className="grid gap-x-12 gap-y-16 py-16 max-sm:gap-y-8 sm:grid-cols-2">
          {CLUBS.map((club, index) => (
            <MotionPreset
              key={club.name}
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={index * 0.3 + 1.05}
              transition={{ duration: 0.5 }}
              className="group flex flex-col gap-6"
            >
              <a
                href={club.url}
                target="_blank"
                rel="noreferrer"
                className="block lg:h-[374px]"
                tabIndex={-1}
                aria-hidden
              >
                <div
                  className={cn(
                    'relative h-[240px] overflow-hidden rounded-lg border border-white/10 shadow-sm transition-transform duration-300 lg:h-[374px]',
                    index % 2 === 1 ? 'group-hover:rotate-3' : 'group-hover:-rotate-3',
                  )}
                >
                  <Image
                    src={club.image}
                    alt={`Naslovnica stranice ${club.name}`}
                    fill
                    sizes="(min-width: 640px) 560px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </a>

              <div className="flex items-center justify-between gap-4 md:gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[22px] font-semibold text-white">{club.name}</span>
                  <span className="text-[16px] text-white/55">
                    {new URL(club.url).hostname.replace('www.', '')}
                  </span>
                </div>

                <a
                  href={club.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-white/10 px-4 text-[14px] text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black"
                >
                  Pogledajte
                  <Eye className="size-4" strokeWidth={1.8} />
                </a>
              </div>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}
