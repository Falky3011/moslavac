'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'
import { demoFormUrl } from '../config'
import { MotionPreset } from '../ui/MotionPreset'
import { LogoVector } from '../ui/Logo'

export function CtaBand() {
  const [email, setEmail] = useState('')

  // Adresa se prosljeđuje obrascu, isto kao iz heroa.
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(demoFormUrl(email), '_blank', 'noopener')
  }

  return (
    <section id="demo" className="scroll-mt-16 border-t border-white/10 bg-black pb-16 pt-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] pb-32 pt-20 text-center shadow-2xl max-sm:pb-16 max-sm:pt-10">
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6">
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={0.3}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-md border border-white px-2.5 py-0.5 text-[14px] text-white">
                Demo bez obveze
              </span>
            </MotionPreset>

            <MotionPreset
              component="p"
              className="display text-[clamp(1.6rem,4vw,2.5rem)] text-white"
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={0.6}
              transition={{ duration: 0.5 }}
            >
              Napravimo stranicu za vaš klub
            </MotionPreset>

            <MotionPreset
              component="p"
              className="text-balance text-[18px] text-white/80 lg:w-10/12"
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={0.9}
              transition={{ duration: 0.5 }}
            >
              Ostavite adresu i javljamo se s pitanjima o klubu. Demo dobivate u nekoliko dana i
              možete ga pokazati upravi prije bilo kakve odluke.
            </MotionPreset>
          </div>

          <MotionPreset
            className="absolute -left-64 top-0 text-white/10 max-sm:-left-60"
            fade
            slide
            transition={{ duration: 0.8 }}
          >
            <LogoVector className="size-[600px] rotate-[143deg] max-sm:size-[400px]" />
          </MotionPreset>

          <MotionPreset
            className="absolute -right-64 top-0 text-white/10 max-sm:-right-60"
            fade
            slide={{ direction: 'right' }}
            transition={{ duration: 0.8 }}
          >
            <LogoVector className="size-[600px] rotate-[25deg] max-sm:size-[400px]" />
          </MotionPreset>
        </div>

        <MotionPreset fade blur zoom={{ initialScale: 0.95 }} delay={1.2} transition={{ duration: 0.7 }}>
          <form
            onSubmit={submit}
            className="relative mx-auto -mt-9 flex w-fit gap-2.5 rounded-xl border-2 border-white/20 bg-black p-3"
          >
            <label htmlFor="cta-email" className="sr-only">
              Vaša e-pošta
            </label>
            <input
              id="cta-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tajnik@vasklub.hr"
              className="h-11 w-[220px] rounded-md border border-white/15 bg-transparent px-3 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-white/40 sm:w-[260px]"
            />
            <button
              type="submit"
              className="rainbow-button hidden h-11 rounded-full px-6 sm:inline-flex"
            >
              Zatražite demo
            </button>
            <button
              type="submit"
              aria-label="Zatražite demo"
              className="rainbow-button size-11 rounded-full sm:hidden"
            >
              <Send className="size-5" strokeWidth={1.8} />
            </button>
          </form>
        </MotionPreset>
      </div>
    </section>
  )
}
