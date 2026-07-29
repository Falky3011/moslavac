import { FadeInView } from "@/components/animations";
import { HnsCrest } from "@/components/HnsCrest";
import type { TeamRanking } from "@/types/hns";

type StandingsSectionProps = {
  rows: TeamRanking[];
  competition: string | null;
};

/** Koliko ekipa s vrha ide na homepage; ostatak poretka ide na svoju stranicu. */
const TOP_COUNT = 5;

/** Isti raspored stupaca dijele zaglavlje i svaki redak. */
const COLS =
  "grid grid-cols-[2.75rem_1fr_4.5rem] items-center gap-2 sm:grid-cols-[3rem_1fr_4.5rem_4.5rem_5.5rem] sm:gap-3";

/** Ista meka, slojevita sjena kao kod ostalih kartica na naslovnici. */
const CARD_SHADOW =
  "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_36px_-22px_rgba(15,23,42,0.35)]";

function goalDiff(row: TeamRanking): string {
  const diff = row.goalsFor - row.goalsAgainst;
  return diff > 0 ? `+${diff}` : String(diff);
}

/**
 * Redak poretka. Garićev je zaobljeni royal blok umetnut unutar kartice
 * (isti motiv kao "tile" na karticama rezultata) umjesto pune trake preko
 * cijele širine — ostali redci nemaju rubove, samo razmak i hover.
 */
function StandingsRow({ row, index }: { row: TeamRanking; index: number }) {
  const me = row.highlight;

  return (
    <div
      role="row"
      className={`${COLS} rounded-2xl px-3 py-4 transition-colors duration-200 sm:px-4 sm:py-5 ${
        me ? "bg-club text-white" : "hover:bg-secondary/50"
      }`}
    >
      <span
        role="cell"
        className={`font-display text-2xl tabular-nums sm:text-3xl ${
          me ? "text-white" : "text-muted-foreground/50"
        }`}
      >
        {row.position ?? index + 1}
      </span>

      <span role="cell" className="flex min-w-0 items-center gap-3 sm:gap-4">
        <HnsCrest
          picture={row.team?.picture}
          name={row.team?.name}
          size={44}
          className={`size-9 shrink-0 rounded-full object-contain sm:size-11 ${
            me ? "bg-white" : "bg-background"
          }`}
        />
        <span
          className={`truncate text-sm sm:text-lg ${
            me ? "font-bold" : "font-medium text-foreground"
          }`}
        >
          {row.team?.name ?? "-"}
        </span>
      </span>

      <span
        role="cell"
        className={`hidden text-center font-mono text-base tabular-nums sm:block ${
          me ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        {row.played}
      </span>
      <span
        role="cell"
        className={`hidden text-center font-mono text-base tabular-nums sm:block ${
          me ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        {goalDiff(row)}
      </span>

      <span
        role="cell"
        className={`text-right font-display text-3xl tabular-nums sm:text-4xl ${
          me ? "text-white" : "text-foreground"
        }`}
      >
        {row.points}
      </span>
    </div>
  );
}

/**
 * Tablica na homepageu — vrh poretka plus redak Garića kad je izvan vrha, u
 * jednoj mekano osjenčanoj kartici kao i ostatak naslovnice (semafor,
 * rezultati, igrači). Pobjede, neriješeno, porazi i forma idu na stranicu
 * tablice.
 */
export default function StandingsSection({
  rows,
  competition,
}: StandingsSectionProps) {
  if (rows.length === 0) return null;

  const top = rows.slice(0, TOP_COUNT);
  const mine = rows.find((r) => r.highlight) ?? null;
  const mineIsInTop = top.some((r) => r.highlight);
  const hasGap =
    mine !== null && !mineIsInTop && (mine.position ?? 0) > TOP_COUNT + 1;

  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      <div className="relative mx-auto w-full max-w-350 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <FadeInView>
            <h2 className="font-display text-6xl uppercase leading-[0.9] tracking-tight text-foreground lg:text-8xl">
              Tablica
            </h2>
          </FadeInView>
          <FadeInView delay={0.08}>
            <p className="text-base leading-relaxed text-muted-foreground sm:pb-2 sm:text-right">
              {competition ?? "Poredak"} · {rows.length} ekipa
            </p>
          </FadeInView>
        </div>

        <FadeInView delay={0.1}>
          <div
            role="table"
            className={`mt-10 overflow-hidden rounded-[28px] bg-background p-2 sm:mt-14 sm:p-3 ${CARD_SHADOW}`}
          >
            <div
              role="row"
              className={`${COLS} border-b border-border/70 px-3 pb-3 pt-2 sm:px-4`}
            >
              <span
                role="columnheader"
                className="font-mono text-[13px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                #
              </span>
              <span
                role="columnheader"
                className="font-mono text-[13px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                Klub
              </span>
              <span
                role="columnheader"
                className="hidden text-center font-mono text-[13px] font-medium uppercase tracking-widest text-muted-foreground sm:block"
              >
                Ou
              </span>
              <span
                role="columnheader"
                className="hidden text-center font-mono text-[13px] font-medium uppercase tracking-widest text-muted-foreground sm:block"
              >
                +/-
              </span>
              <span
                role="columnheader"
                className="text-right font-mono text-[13px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                Bod
              </span>
            </div>

            <div role="rowgroup" className="space-y-0.5 pt-1">
              {top.map((row, i) => (
                <StandingsRow
                  key={row.team?.id ?? `${row.position}-${i}`}
                  row={row}
                  index={i}
                />
              ))}

              {hasGap && (
                <div className="px-4 py-2 font-mono text-base tracking-[0.3em] text-muted-foreground">
                  ···
                </div>
              )}

              {mine && !mineIsInTop && (
                <StandingsRow row={mine} index={TOP_COUNT} />
              )}
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
