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
 * Škola nogometa — jedina puna royal ploha na stranici (akcent, motiv dresa):
 * lijevo poziv s checklistom i pravim kontaktima kluba (e-mail, Facebook),
 * desno fotografija s klupskog igrališta preko koje prelazi halftone raster.
 * Copy je faktičan — bez izmišljenih brojki i termina.
 */
export default function SchoolSection({
  imageSrc,
  email,
  facebook,
}: SchoolSectionProps) {
  return (
    <section className="relative overflow-hidden bg-club text-white">
      <div className="mx-auto grid w-full max-w-350 grid-cols-1 lg:grid-cols-12">
        {/* Lijevo — poziv */}
        <FadeInView className="relative z-10 px-4 py-16 sm:px-6 lg:col-span-6 lg:px-10 lg:py-24">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.34em] text-white/70">
            Škola nogometa
          </p>
          <h2 className="font-display text-6xl leading-[0.95] tracking-tight uppercase sm:text-7xl">
            Zaigraj
            <br />
            za Garić.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            Škola nogometa NK Garić Garešnica okuplja najmlađe uzraste na
            klupskom igralištu u Garešnici. Dođi na trening i zaigraj.
          </p>

          <p className="mt-8 text-sm text-white/85">
            Prijava i sve informacije putem kluba.
          </p>
          <ul className="mt-4 space-y-2.5">
            {POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-sm font-medium"
              >
                <span className="flex size-5 shrink-0 items-center justify-center bg-white">
                  <Check className="size-3 text-club" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {email && (
              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Škola nogometa")}`}
                className="inline-flex items-center gap-3 bg-white py-3 pr-3 pl-5 text-sm font-bold text-club transition-transform active:scale-[0.98]"
              >
                Prijavi dijete
                <span className="flex size-7 items-center justify-center bg-club">
                  <ArrowRight className="size-4 text-white" strokeWidth={2.5} />
                </span>
              </a>
            )}
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-white/60 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-club"
              >
                Facebook
              </a>
            )}
          </div>
        </FadeInView>

        {/* Desno — fotografija s igrališta, halftone prijelaz prema plavoj. */}
        <div className="relative min-h-72 lg:col-span-6 lg:min-h-0">
          <Image
            src={imageSrc}
            alt="Škola nogometa NK Garić Garešnica"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_30%]"
          />
          <span
            aria-hidden
            className="halftone halftone-fade-r pointer-events-none absolute inset-y-0 left-0 hidden w-32 lg:block"
            style={{ "--halftone-color": "var(--club)", "--halftone-size": "11px" } as React.CSSProperties}
          />
        </div>
      </div>
    </section>
  );
}
