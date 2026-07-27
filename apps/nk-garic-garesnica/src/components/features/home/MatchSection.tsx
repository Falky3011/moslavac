import { FadeInView } from "@/components/animations";
import { HnsCrest } from "@/components/HnsCrest";
import { formatDateParts, formatDateShort } from "@/lib/helpers/date";
import type { Match, Team } from "@/types/hns";

type MatchSectionProps = {
  /** Istaknuta utakmica — sljedeća, ili (van sezone) posljednja odigrana. */
  featured: Match;
  /** Do 4 utakmice za grid: nedavni rezultati + nadolazeći termini. */
  grid: Match[];
  /** true kad je istaknuta utakmica nadolazeća (postoji sljedeća). */
  isNext: boolean;
};

/** Golovi za prikaz — završena utakmica koristi `current`, pa `regular`. */
function goals(side: Match["score"]["home"]): number | null {
  return side.current ?? side.regular;
}

function isPlayed(m: Match): boolean {
  return m.liveStatus === "PLAYED";
}

function roundLabel(m: Match): string {
  if (m.matchDay != null) return `KOLO ${m.matchDay}`;
  return m.round ?? "";
}

/** Ishod iz perspektive Garića → chip na kartici. */
function outcomeChip(m: Match): { label: string; cls: string } | null {
  if (!isPlayed(m) || !m.teamResult) return null;
  switch (m.teamResult) {
    case "W":
      return { label: "POB", cls: "bg-primary text-primary-foreground" };
    case "D":
      return { label: "NER", cls: "bg-white/15 text-white/80" };
    case "L":
      return { label: "POR", cls: "bg-white/[0.06] text-white/45" };
  }
}

function CrestChip({ team }: { team: Team | null }) {
  return (
    <span className="flex size-9 items-center justify-center rounded-md bg-white/95">
      <HnsCrest
        picture={team?.picture}
        name={team?.name}
        size={28}
        className="size-7 object-contain"
      />
    </span>
  );
}

/** Jedna kartica u gridu (rezultat ili nadolazeći termin). */
function FixtureCard({ match, highlight }: { match: Match; highlight: boolean }) {
  const played = isPlayed(match);
  const chip = outcomeChip(match);
  const hg = goals(match.score.home);
  const ag = goals(match.score.away);
  const time = match.kickoffAtUtcMs
    ? formatDateParts(match.kickoffAtUtcMs).time
    : "--:--";
  const date = match.kickoffAtUtcMs ? formatDateShort(match.kickoffAtUtcMs) : "";

  return (
    <div
      className={`relative flex min-h-40 min-w-0 flex-col justify-between border p-4 ${
        highlight
          ? "border-primary/70 bg-white/3"
          : "border-white/10 bg-white/2"
      }`}
    >
      {chip && (
        <span
          className={`absolute right-3 top-3 rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold ${chip.cls}`}
        >
          {chip.label}
        </span>
      )}

      <div className={`font-mono text-[11px] ${highlight ? "text-primary" : "text-white/50"}`}>
        {roundLabel(match)} · {date}
      </div>

      <div className="my-4 flex min-w-0 items-center gap-2.5">
        <CrestChip team={match.homeTeam} />
        <CrestChip team={match.awayTeam} />
        <span
          className={`ml-auto font-display font-black ${
            played ? "text-xl text-white" : "font-mono text-lg text-primary"
          }`}
        >
          {played ? `${hg ?? "-"}:${ag ?? "-"}` : time}
        </span>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="line-clamp-2 text-xs leading-snug text-white/65">
          {match.homeTeam?.name} — {match.awayTeam?.name}
        </span>
        <span className="font-mono text-base leading-none text-white/30">+</span>
      </div>
    </div>
  );
}

export default function MatchSection({ featured, grid, isNext }: MatchSectionProps) {
  const played = isPlayed(featured);
  const parts = featured.kickoffAtUtcMs
    ? formatDateParts(featured.kickoffAtUtcMs)
    : null;
  const dateShort = featured.kickoffAtUtcMs
    ? formatDateShort(featured.kickoffAtUtcMs)
    : "";
  const competition = featured.competition?.name ?? "";
  const venue = featured.facility?.name ?? null;
  const hg = goals(featured.score.home);
  const ag = goals(featured.score.away);

  return (
    <section className="bg-background px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-4xl shadow-[0_30px_60px_-30px_rgba(0,80,144,0.28)] lg:grid-cols-2">
        {/* Lijevo — svijetlo: istaknuta utakmica */}
        <div className="flex min-w-0 flex-col bg-secondary p-8 text-foreground lg:p-12">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-wide text-muted-foreground">
            <span>MATCHDAY</span>
            <span>{competition.toUpperCase()}</span>
          </div>

          <div className="flex flex-1 flex-col justify-center pt-12 lg:pt-8">
            <FadeInView direction="up">
              <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight lg:text-6xl">
                {isNext ? "Sljedeća" : "Posljednja"}
                <br />
                <span className="text-primary">utakmica</span>
              </h2>
            </FadeInView>

            <FadeInView delay={0.1} className="mt-6 border-t-2 border-foreground pt-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
                <TeamBlock team={featured.homeTeam} />
                <span className="font-mono text-3xl font-bold text-muted-foreground/60">
                  {played ? `${hg ?? "-"}:${ag ?? "-"}` : "VS"}
                </span>
                <TeamBlock team={featured.awayTeam} />
              </div>

              <div className="mt-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>
                  {parts
                    ? `${parts.weekdayShort} · ${dateShort} · ${parts.time}`
                    : ""}
                </span>
                {venue && <span className="text-right">{venue.toUpperCase()}</span>}
              </div>

              {/* Link na detalje veže se kad se izgradi ruta rasporeda/utakmice. */}
              <span className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-lg bg-foreground px-5 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-background">
                Detalji utakmice <span className="text-primary">+</span>
              </span>
            </FadeInView>
          </div>
        </div>

        {/* Desno — tamno: rezultati i raspored */}
        <div className="min-w-0 bg-[oklch(0.16_0.03_251)] p-8 text-white lg:p-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px] tracking-wide text-white/50">
            <span>REZULTATI &amp; RASPORED</span>
            <span>[ {grid.length.toString().padStart(2, "0")} ]</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {grid.map((m, i) => (
              <FadeInView key={m.id ?? i} delay={i * 0.06}>
                <FixtureCard match={m} highlight={m.id === featured.id} />
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamBlock({ team }: { team: Team | null }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-3 text-center">
      <HnsCrest
        picture={team?.picture}
        name={team?.name}
        size={80}
        className="size-16 object-contain md:size-20"
      />
      <span className="max-w-full font-display text-sm font-extrabold uppercase leading-tight wrap-break-word">
        {team?.name ?? "—"}
      </span>
    </div>
  );
}
