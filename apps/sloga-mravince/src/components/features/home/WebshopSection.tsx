import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { FadeInView } from "@/components/animations";

/**
 * Klupski webshop — jedan CTA prema JAKO trgovini, ništa više.
 * Od `lg` tekst leži preko fotografije (inače je sekcija predugačka: naslov,
 * pa 700px slike, pa gumb). Ispod `lg` širine nema za preklop pa tekst stoji
 * iznad slike. Crveni gumb u oba slučaja prelazi preko donjeg ruba — to
 * preklapanje je jedini nosivi potez sekcije.
 */
export default function WebshopSection({ url }: { url: string }) {
  return (
    <section className="w-full bg-chalk py-16 text-ink-deep md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative">
          {/* Tekst. Na fotografiji ne hvata klikove — oni idu na sloj ispod. */}
          <div className="lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:p-12 xl:p-14">
            <FadeInView>
              <span
                aria-hidden
                className="block h-1 w-10 bg-club-red lg:bg-white"
              />

              <h2 className="mt-7 flex flex-col gap-1 font-display uppercase leading-[1.06] tracking-normal sm:gap-2 lg:text-white lg:drop-shadow-[0_4px_30px_rgba(0,0,0,0.65)]">
                <span className="block pt-[0.12em] text-5xl sm:text-6xl">
                  Klupski
                </span>{" "}
                <span className="block pt-[0.12em] text-5xl text-club-red sm:text-6xl lg:text-white">
                  Webshop
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-white/80">
                Novi klupski artikli i posebno složeni paketi za djecu dostupni
                su na JAKO webshopu.
              </p>

              {/* Odredište stoji napisano — link vodi na tuđu trgovinu */}
              <p className="mt-5 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-ink-deep/45 lg:text-white/55">
                Trgovina · jako.hr
              </p>
            </FadeInView>
          </div>

          <FadeInView delay={0.1} className="mt-10 lg:mt-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden
              tabIndex={-1}
              className="group/foto relative block aspect-square w-full overflow-hidden bg-ink-deep clip-corner sm:aspect-16/10 lg:aspect-16/9"
            >
              <Image
                src="/webshop-foto.jpg"
                alt="Mladi igrači HNK Sloga Mravince u novoj klupskoj opremi"
                fill
                sizes="(min-width: 1200px) 72rem, 100vw"
                className="object-cover object-[center_38%] transition-transform duration-700 ease-out group-hover/foto:scale-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay"
              />
              {/* Scrim odozgo nosi tekst, i to tek od lg kad tekst dođe na sliku */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 hidden h-3/4 bg-linear-to-b from-black/80 via-black/45 to-transparent lg:block"
              />
              {/* Blaga crnina uz donji rub — gumb mora imati na čemu stajati */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/45 to-transparent"
              />
            </a>
          </FadeInView>

          <div className="absolute -bottom-7 left-6 z-20 flex sm:left-10 md:left-14">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 whitespace-nowrap bg-club-red px-8 py-5 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl shadow-black/25 transition-colors duration-300 hover:bg-ink-deep sm:px-9"
            >
              <ShoppingBag aria-hidden className="size-4.5 shrink-0" />
              Kupi opremu
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
              <span className="sr-only">(otvara se u novoj kartici)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
