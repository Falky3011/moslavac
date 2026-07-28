import { FadeInView } from "@/components/animations";
import { HnsCrest } from "@/components/HnsCrest";
import type { TeamRanking } from "@/types/hns";

type StandingsSectionProps = {
  rows: TeamRanking[];
  competition: string | null;
};

/** Koliko ekipa s vrha ide na homepage; ostatak poretka ide na svoju stranicu. */
const TOP_COUNT = 5;

const HEAD =
  "py-3.5 font-mono text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase";

function goalDiff(row: TeamRanking): string {
  const diff = row.goalsFor - row.goalsAgainst;
  return diff > 0 ? `+${diff}` : String(diff);
}

function StandingsRow({ row, index }: { row: TeamRanking; index: number }) {
  const me = row.highlight;

  return (
    <tr
      className={
        me
          ? "bg-club/6 shadow-[inset_3px_0_0_var(--club)]"
          : "transition-colors duration-200 hover:bg-secondary/60"
      }
    >
      <td
        className={`py-4 pr-2 pl-4 text-left font-display text-xl tabular-nums ${
          me ? "text-club" : "text-muted-foreground/60"
        }`}
      >
        {row.position ?? index + 1}
      </td>
      <td className="py-4 pr-2">
        <div className="flex min-w-0 items-center gap-3">
          <HnsCrest
            picture={row.team?.picture}
            name={row.team?.name}
            size={28}
            className="size-7 shrink-0 object-contain"
          />
          <span
            className={`truncate ${me ? "font-bold text-club" : "font-medium text-foreground"}`}
          >
            {row.team?.name ?? "-"}
          </span>
        </div>
      </td>
      <td className="hidden px-3 py-4 text-center font-mono text-sm tabular-nums text-muted-foreground sm:table-cell">
        {row.played}
      </td>
      <td className="hidden px-3 py-4 text-center font-mono text-sm tabular-nums text-muted-foreground sm:table-cell">
        {goalDiff(row)}
      </td>
      <td
        className={`py-4 pr-4 pl-3 text-right font-display text-2xl tabular-nums ${
          me ? "text-club" : "text-foreground"
        }`}
      >
        {row.points}
      </td>
    </tr>
  );
}

/**
 * Tablica na homepageu — vrh poretka plus redak Garića kad je izvan vrha.
 * Asimetrični raspored: naslov u lijevoj koloni, tablica u desnoj, bez card
 * okvira — samo hairline linije. Pobjede, neriješeno, porazi i forma idu na
 * stranicu tablice.
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
    <section className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-x-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-24">
        <div className="lg:col-span-4">
          <FadeInView>
            <h2 className="font-display text-6xl uppercase leading-[0.9] tracking-tight text-foreground lg:text-8xl">
              Tablica
            </h2>
            <p className="mt-5 font-mono text-xs text-muted-foreground">
              {competition ?? "Poredak"} · {rows.length} ekipa
            </p>
          </FadeInView>
        </div>

        <FadeInView delay={0.12} className="mt-10 lg:col-span-8 lg:mt-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className={`${HEAD} w-14 pr-2 pl-4 text-left`}>#</th>
                <th className={`${HEAD} pr-2 text-left`}>Klub</th>
                <th className={`${HEAD} hidden w-20 px-3 text-center sm:table-cell`}>
                  Ou
                </th>
                <th className={`${HEAD} hidden w-20 px-3 text-center sm:table-cell`}>
                  +/−
                </th>
                <th className={`${HEAD} w-20 pr-4 pl-3 text-right`}>Bod</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {top.map((row, i) => (
                <StandingsRow
                  key={row.team?.id ?? `${row.position}-${i}`}
                  row={row}
                  index={i}
                />
              ))}

              {hasGap && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-3 pl-4 font-mono text-sm text-muted-foreground"
                  >
                    ···
                  </td>
                </tr>
              )}

              {mine && !mineIsInTop && (
                <StandingsRow row={mine} index={TOP_COUNT} />
              )}
            </tbody>
          </table>
        </FadeInView>
      </div>
    </section>
  );
}
