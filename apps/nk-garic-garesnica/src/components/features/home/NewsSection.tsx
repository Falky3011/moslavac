import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FadeInView } from "@/components/animations";
import { formatDateShort } from "@/lib/helpers/date";
import type { News } from "@/types/news";

type NewsSectionProps = {
  news: News[];
  /** Grb kluba za fallback pločicu kad članak nema sliku. */
  crestUrl: string | null;
};

/** Vrijeme čitanja iz HTML sadržaja (≈200 riječi/min). */
function readMinutes(html: string): number {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

function NewsImage({
  article,
  crestUrl,
  sizes,
}: {
  article: News;
  crestUrl: string | null;
  sizes: string;
}) {
  const image = article.thumbnailPath ?? article.imagePaths[0] ?? null;

  if (image) {
    return (
      <Image
        src={image}
        alt={article.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  // Brandirani fallback — puna royal ploha s halftone rasterom dresa i grbom.
  return (
    <div className="relative flex h-full items-center justify-center bg-club">
      <span
        aria-hidden
        className="halftone halftone-fade-t absolute inset-0 opacity-60"
        style={{ "--halftone-color": "rgba(255,255,255,0.4)" } as React.CSSProperties}
      />
      {crestUrl && (
        <Image
          src={crestUrl}
          alt=""
          width={200}
          height={250}
          sizes="200px"
          className="relative h-[52%] w-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-[1.04]"
        />
      )}
    </div>
  );
}

function NewsMeta({
  article,
  tone = "muted",
}: {
  article: News;
  /** "muted" za bijelu pozadinu, "light" za tekst preko fotke. */
  tone?: "muted" | "light";
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] ${
        tone === "light" ? "text-white/70" : "text-muted-foreground"
      }`}
    >
      <span
        className={
          tone === "light"
            ? "bg-white/15 px-2 py-0.5 font-semibold text-white"
            : "bg-club/10 px-2 py-0.5 font-semibold text-club"
        }
      >
        IZ KLUBA
      </span>
      <span>{readMinutes(article.content)} MIN</span>
      <span className="tabular-nums">{formatDateShort(article.date)}</span>
    </div>
  );
}

export default function NewsSection({ news, crestUrl }: NewsSectionProps) {
  if (news.length === 0) return null;

  const [lead, ...others] = news;

  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      {/* Halftone raster — isti motiv kroz cijelu stranicu, gornji desni kut. */}
      <div
        aria-hidden
        className="halftone pointer-events-none absolute -right-16 -top-16 hidden h-105 w-105 rotate-18 opacity-[0.07] md:block"
        style={
          {
            "--halftone-size": "15px",
            "--halftone-color": "var(--club)",
            maskImage:
              "radial-gradient(circle at 35% 60%, black 0%, black 22%, transparent 62%)",
          } as React.CSSProperties
        }
      />

      <div className="relative mx-auto w-full max-w-350 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <FadeInView>
            <h2 className="font-display text-6xl uppercase leading-[0.9] tracking-tight text-foreground lg:text-8xl">
              Novosti
            </h2>
          </FadeInView>

          <FadeInView delay={0.1} className="flex flex-col items-start gap-4 sm:items-end">
            <p className="max-w-56 font-mono text-xs text-muted-foreground sm:text-right">
              Najnovije iz kluba, sve na jednom mjestu.
            </p>
            {/* Link se veže kad se izgradi ruta /novosti. */}
            <span className="group inline-flex items-center gap-2.5 bg-foreground px-5 py-3 text-background transition-colors hover:bg-club">
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Sve vijesti
              </span>
              <ArrowUpRight
                className="size-4 text-club transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                strokeWidth={2.5}
              />
            </span>
          </FadeInView>
        </div>

        {/* Asimetrični grid: vodeći članak kao editorijalna naslovnica, ostali kao indeksirani popis. */}
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          <FadeInView className="lg:col-span-7">
            <article className="group relative min-w-0">
              <div className="relative aspect-4/3 overflow-hidden">
                <NewsImage
                  article={lead}
                  crestUrl={crestUrl}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Scrim + naslov kao naslovnica — tekst živi na fotki, ne ispod nje. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.14 0.05 262 / 0.92), oklch(0.14 0.05 262 / 0.15) 55%, transparent 78%)",
                  }}
                />

                <span
                  aria-hidden
                  className="text-stroke absolute right-5 top-4 font-display text-6xl leading-none tracking-tight sm:text-7xl"
                  style={{ "--text-stroke-color": "rgba(255,255,255,0.4)" } as React.CSSProperties}
                >
                  01
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="max-w-2xl font-display text-2xl uppercase leading-[1.05] tracking-wide text-white sm:text-3xl">
                    {lead.title}
                  </h3>
                  <div className="mt-3">
                    <NewsMeta article={lead} tone="light" />
                  </div>
                </div>
              </div>
            </article>
          </FadeInView>

          <div className="divide-y divide-border lg:col-span-5">
            {others.map((article, i) => (
              <FadeInView key={article.id} delay={0.08 + i * 0.08}>
                <article className="group grid min-w-0 grid-cols-[2.75rem_7rem_minmax(0,1fr)] items-center gap-5 py-6 first:pt-0 sm:grid-cols-[3rem_8rem_minmax(0,1fr)]">
                  <span className="font-display text-3xl leading-none tabular-nums text-club/25 transition-colors duration-200 group-hover:text-club">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <div className="relative aspect-square overflow-hidden">
                    <NewsImage
                      article={article}
                      crestUrl={crestUrl}
                      sizes="(max-width: 640px) 30vw, 8rem"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="line-clamp-3 font-display text-lg uppercase leading-[1.1] tracking-wide text-foreground group-hover:text-club sm:text-xl">
                      {article.title}
                    </h3>
                    <div className="mt-3">
                      <NewsMeta article={article} />
                    </div>
                  </div>
                </article>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
