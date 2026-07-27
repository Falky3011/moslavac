import { FadeInView } from "@/components/animations";
import { HnsCrest } from "@/components/HnsCrest";
import type { MatchOutcome, TeamRanking } from "@/types/hns";

type StandingsSectionProps = {
  rows: TeamRanking[];
  competition: string | null;
};

// Svjetlija brand-plava — čitljiv accent na tamnoj (navy) pozadini.
const ACCENT = "oklch(0.72 0.13 250)";

const STAT = "px-2 py-3.5 text-center font-mono text-sm text-white/75 tabular-nums";
const HEAD =
  "px-2 py-3 text-center font-mono text-[11px] font-medium uppercase tracking-wider text-white/40";

function FormDots({ form }: { form: MatchOutcome[] }) {
  const last = form.slice(-5);
  return (
    <div className="flex items-center justify-center gap-1">
      {last.map((r, i) => (
        <span
          key={i}
          title={r}
          className="size-2 rounded-[2px]"
          style={{
            backgroundColor:
              r === "W" ? ACCENT : r === "D" ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.1)",
          }}
        />
      ))}
    </div>
  );
}

export default function StandingsSection({ rows, competition }: StandingsSectionProps) {
  if (rows.length === 0) return null;

  return (
    <section className="bg-[oklch(0.16_0.03_251)] px-6 py-16 text-white lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <FadeInView>
            <h2 className="font-display text-5xl leading-[0.9] font-black tracking-tight uppercase lg:text-7xl">
              Tablica
            </h2>
          </FadeInView>
          <FadeInView delay={0.1}>
            <p className="font-mono text-xs tracking-wide text-white/40">
              {competition ? competition.toUpperCase() : "POREDAK"} ·{" "}
              {rows.length.toString().padStart(2, "0")} EKIPA
            </p>
          </FadeInView>
        </div>

        <FadeInView delay={0.15} className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className={`${HEAD} w-12 text-left`}>#</th>
                <th className={`${HEAD} text-left`}>Klub</th>
                <th className={`${HEAD} hidden sm:table-cell`}>OU</th>
                <th className={`${HEAD} hidden sm:table-cell`}>P</th>
                <th className={`${HEAD} hidden sm:table-cell`}>N</th>
                <th className={`${HEAD} hidden sm:table-cell`}>G</th>
                <th className={`${HEAD} hidden md:table-cell`}>Golovi</th>
                <th className={`${HEAD} hidden lg:table-cell`}>Forma</th>
                <th className={HEAD}>Bod</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const me = r.highlight;
                return (
                  <tr
                    key={r.team?.id ?? `${r.position}-${i}`}
                    className={`border-b border-white/5 ${me ? "bg-white/5" : ""}`}
                    style={me ? { boxShadow: `inset 3px 0 0 ${ACCENT}` } : undefined}
                  >
                    <td className="px-2 py-3.5 pl-3 text-left font-mono text-sm text-white/50 tabular-nums">
                      {r.position ?? i + 1}
                    </td>
                    <td className="px-2 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white/95">
                          <HnsCrest
                            picture={r.team?.picture}
                            name={r.team?.name}
                            size={22}
                            className="size-5.5 object-contain"
                          />
                        </span>
                        <span
                          className={`truncate ${me ? "font-bold text-white" : "font-medium text-white/85"}`}
                          style={me ? { color: ACCENT } : undefined}
                        >
                          {r.team?.name ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td className={`${STAT} hidden sm:table-cell`}>{r.played}</td>
                    <td className={`${STAT} hidden sm:table-cell`}>{r.wins}</td>
                    <td className={`${STAT} hidden sm:table-cell`}>{r.draws}</td>
                    <td className={`${STAT} hidden sm:table-cell`}>{r.losses}</td>
                    <td className={`${STAT} hidden md:table-cell`}>
                      {r.goalsFor}:{r.goalsAgainst}
                    </td>
                    <td className={`${STAT} hidden lg:table-cell`}>
                      <FormDots form={r.form} />
                    </td>
                    <td
                      className="px-2 py-3.5 text-center font-display text-lg font-black tabular-nums"
                      style={{ color: me ? ACCENT : "#fff" }}
                    >
                      {r.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </FadeInView>
      </div>
    </section>
  );
}
