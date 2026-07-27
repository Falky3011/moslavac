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

function NewsCard({
  article,
  index,
  crestUrl,
}: {
  article: News;
  index: number;
  crestUrl: string | null;
}) {
  const image = article.thumbnailPath ?? article.imagePaths[0] ?? null;
  const num = (index + 1).toString().padStart(2, "0");

  return (
    <article className="group min-w-0">
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
        {image ? (
          <Image
            src={image}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          // Brandirani fallback — plavi gradijent, ghost broj, grb.
          <div className="relative flex h-full items-center justify-center bg-linear-to-br from-primary to-[oklch(0.24_0.07_251)]">
            <span
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "repeating-linear-gradient(50deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 14px)",
              }}
            />
            <span className="absolute left-4 top-3 font-display text-[5rem] font-black leading-none text-white/15">
              {num}
            </span>
            {crestUrl && (
              <Image
                src={crestUrl}
                alt=""
                width={200}
                height={250}
                sizes="200px"
                className="relative h-[52%] w-auto opacity-95 drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-[1.04]"
              />
            )}
          </div>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg leading-snug font-extrabold tracking-tight text-foreground uppercase group-hover:text-primary line-clamp-2">
        {article.title}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
        <span className="rounded-sm bg-primary/10 px-2 py-0.5 font-semibold text-primary">
          IZ KLUBA
        </span>
        <span>{readMinutes(article.content)} MIN</span>
        <span>{formatDateShort(article.date)}</span>
      </div>
    </article>
  );
}

export default function NewsSection({ news, crestUrl }: NewsSectionProps) {
  if (news.length === 0) return null;

  return (
    <section className="bg-background px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <FadeInView>
            <h2 className="font-display text-5xl leading-[0.9] font-black tracking-tight text-foreground uppercase lg:text-7xl">
              Novosti
            </h2>
          </FadeInView>

          <FadeInView delay={0.1} className="flex flex-col items-start gap-4 sm:items-end">
            <p className="max-w-56 font-mono text-xs text-muted-foreground sm:text-right">
              Najnovije iz kluba, sve na jednom mjestu.
            </p>
            {/* Link se veže kad se izgradi ruta /novosti. */}
            <span className="inline-flex items-center gap-3 rounded-full bg-foreground py-2.5 pr-2.5 pl-5 text-background">
              <span className="font-mono text-xs font-bold tracking-wider uppercase">
                Sve vijesti
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-primary">
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </span>
            </span>
          </FadeInView>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article, i) => (
            <FadeInView key={article.id} delay={i * 0.08}>
              <NewsCard article={article} index={i} crestUrl={crestUrl} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
