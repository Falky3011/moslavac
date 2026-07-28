import Image from "next/image";
import { FadeInView } from "@/components/animations";

type HistorySectionProps = {
  founded: number;
  place: string;
  imageSrc: string;
};

/**
 * Povijest / naslijeđe — full-bleed tamna traka sa zračnim snimkom 100.
 * obljetnice (klub složen u broj "100" na terenu). Tekst i statovi preko
 * tamnog scrima, broj na slici ostaje čitljiv. Sadržaj su SAMO provjerene
 * činjenice (godina osnutka, 100+ godina, mjesto, klupske boje).
 */
export default function HistorySection({
  founded,
  place,
  imageSrc,
}: HistorySectionProps) {
  const placeLocative = place.replace(/a$/, "i"); // Garešnica → Garešnici
  const stats = [
    { value: String(founded), label: "Godina osnutka" },
    { value: "100+", label: "Godina tradicije" },
    { value: "Plavo-bijeli", label: "Klupske boje" },
  ];

  return (
    <section className="relative flex min-h-140 overflow-hidden bg-navy-deep lg:min-h-170">
      <Image
        src={imageSrc}
        alt={`100 godina NK Garić ${place}`}
        fill
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      {/* Scrim — taman dolje-lijevo, čist gore-desno (gdje je "100"). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, oklch(0.16 0.05 262 / 0.94), oklch(0.16 0.05 262 / 0.55) 42%, transparent 72%)",
        }}
      />
      {/* Halftone rub — motiv dresa uz donji rub trake. */}
      <span
        aria-hidden
        className="halftone halftone-fade-t pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-30"
        style={{ "--halftone-color": "rgba(255,255,255,0.5)" } as React.CSSProperties}
      />

      <div className="relative z-10 mx-auto mt-auto w-full max-w-350 px-4 pb-12 pt-40 text-white sm:px-6 lg:px-10 lg:pb-16">
        <FadeInView>
          <p className="mb-4 font-mono text-[11px] font-semibold tracking-[0.34em] text-white/70 uppercase">
            Naša priča
          </p>
          <h2 className="max-w-3xl font-display text-5xl leading-[0.92] tracking-tight uppercase sm:text-6xl lg:text-7xl">
            Više od stoljeća nogometa u {placeLocative}.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Od {founded}. godine, kroz generacije igrača i navijača,
            plavo-bijele boje ostaju znak kluba i njegove zajednice.
          </p>

          <dl className="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-white/20 border-t border-white/20 pt-6">
            {stats.map((s) => (
              <div key={s.label} className="px-2 first:pl-0">
                <dt className="font-display text-3xl leading-none tracking-tight sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-2 font-mono text-[10px] tracking-wider text-white/60 uppercase sm:text-[11px]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeInView>
      </div>
    </section>
  );
}
