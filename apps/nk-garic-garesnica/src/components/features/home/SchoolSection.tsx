import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { FadeInView } from "@/components/animations";

type SchoolSectionProps = {
  imageSrc: string;
  email: string | null;
  facebook: string | null;
};

const POINTS = [
  "Za najmlađe uzraste",
  "Treninzi u Garešnici",
  "Vodstvo i oprema kluba",
];

/**
 * Škola nogometa — CTA band: velika prava fotka s klupskog igrališta, preko
 * koje se preklapa zaobljena kartica (naslov + poziv lijevo, checklist + gumbi
 * desno). Gumbi vode na prave kontakte kluba (e-mail, Facebook). Copy je
 * faktičan — bez izmišljenih brojki i termina.
 */
export default function SchoolSection({
  imageSrc,
  email,
  facebook,
}: SchoolSectionProps) {
  return (
    <section className="bg-background px-6 py-16 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-7xl">
        {/* Foto */}
        <div className="overflow-hidden rounded-[2rem]">
          <Image
            src={imageSrc}
            alt="Škola nogometa NK Garić Garešnica"
            width={2048}
            height={1366}
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="h-[300px] w-full object-cover object-[center_30%] sm:h-[400px] lg:h-[520px]"
          />
        </div>

        {/* Preklapajuća kartica */}
        <FadeInView className="relative z-10 mx-3 -mt-20 rounded-[1.75rem] bg-[oklch(0.92_0.045_255)] p-8 shadow-[0_30px_60px_-20px_rgba(0,80,144,0.35)] sm:mx-6 sm:-mt-24 lg:mx-10 lg:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            {/* Lijevo — naslov + poziv */}
            <div className="min-w-0">
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">
                Škola nogometa
              </p>
              <h2 className="font-display text-4xl leading-[0.92] font-black tracking-tight uppercase text-[oklch(0.26_0.07_251)] sm:text-5xl lg:text-6xl">
                Zaigraj
                <br />
                za Garić.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[oklch(0.34_0.05_251)] sm:text-base">
                Škola nogometa NK Garić Garešnica okuplja najmlađe uzraste na
                klupskom igralištu u Garešnici. Dođi na trening i zaigraj.
              </p>
            </div>

            {/* Desno — checklist + gumbi */}
            <div className="min-w-0">
              <p className="text-sm text-[oklch(0.34_0.05_251)]">
                Prijava i sve informacije putem kluba.
              </p>
              <ul className="mt-4 space-y-2.5">
                {POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm font-medium text-[oklch(0.26_0.07_251)]"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check className="size-3 text-white" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {email && (
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent("Škola nogometa")}`}
                    className="inline-flex items-center gap-3 rounded-xl bg-[oklch(0.26_0.07_251)] py-3 pr-3 pl-5 text-sm font-bold text-white transition-transform active:scale-[0.98]"
                  >
                    Prijavi dijete
                    <span className="flex size-7 items-center justify-center rounded-lg bg-primary">
                      <ArrowRight className="size-4" strokeWidth={2.5} />
                    </span>
                  </a>
                )}
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl bg-white/70 px-5 py-3 text-sm font-bold text-[oklch(0.26_0.07_251)] transition-colors hover:bg-white"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
