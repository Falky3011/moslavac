import Image from "next/image";
import { FadeInView } from "@/components/animations";

type HistorySectionProps = {
  founded: number;
  place: string;
  imageSrc: string;
};

/**
 * Povijest / naslijeđe — full-bleed band sa zračnim snimkom 100. obljetnice
 * (klub složen u broj "100" na terenu). Tekst i statovi preko tamnog scrima,
 * a broj na slici ostaje čitljiv. Sadržaj su SAMO provjerene činjenice
 * (godina osnutka, 100+ godina, mjesto, klupske boje) — bez izmišljanja.
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
    <section className="bg-background px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex min-h-140 overflow-hidden rounded-4xl lg:min-h-165">
          <Image
            src={imageSrc}
            alt={`100 godina NK Garić ${place}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover object-[center_35%]"
          />
          {/* Scrim — taman dolje-lijevo, čist gore-desno (gdje je "100"). */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top right, oklch(0.16 0.04 251 / 0.94), oklch(0.16 0.04 251 / 0.55) 42%, transparent 72%)",
            }}
          />

          <FadeInView className="relative z-10 mt-auto w-full p-8 text-white sm:p-10 lg:p-14">
            <p className="mb-4 font-mono text-[11px] font-semibold tracking-[0.34em] text-white/70 uppercase">
              Naša priča
            </p>
            <h2 className="max-w-2xl font-display text-4xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl lg:text-6xl">
              Više od stoljeća nogometa u {placeLocative}.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Od {founded}. godine, kroz generacije igrača i navijača,
              plavo-bijele boje ostaju znak kluba i njegove zajednice.
            </p>

            <dl className="mt-9 grid max-w-2xl grid-cols-3 divide-x divide-white/20 border-t border-white/20 pt-6">
              {stats.map((s) => (
                <div key={s.label} className="px-1 first:pl-0">
                  <dt className="font-display text-2xl leading-none font-black tracking-tight sm:text-3xl">
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
      </div>
    </section>
  );
}
