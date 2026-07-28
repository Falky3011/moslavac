import { FadeInView } from "@/components/animations";
import { HnsCrest } from "@/components/HnsCrest";
import { formatDateParts, formatDateShort } from "@/lib/helpers/date";
import type { Match, Team } from "@/types/hns";

type MatchSectionProps = {
  /** Istaknuta utakmica — sljedeća, ili (van sezone) posljednja odigrana. */
  featured: Match;
  /** Do 4 utakmice za popis: nedavni rezultati + nadolazeći termini. */
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

/** Ishod iz perspektive Garića → oznaka u retku popisa. */
function outcomeChip(m: Match): { label: string; cls: string } | null {
  if (!isPlayed(m) || !m.teamResult) return null;
  switch (m.teamResult) {
    case "W":
      return { label: "POB", cls: "bg-club text-white" };
    case "D":
      return { label: "NER", cls: "bg-secondary text-secondary-foreground" };
    case "L":
      return { label: "POR", cls: "bg-secondary text-muted-foreground" };
  }
}

/** Redak popisa — rezultat ili nadolazeći termin, hairline umjesto kartice. */
function FixtureRow({
  match,
  highlight,
}: {
  match: Match;
  highlight: boolean;
}) {
  const played = isPlayed(match);
  const chip = outcomeChip(match);
  const hg = goals(match.score.home);
  const ag = goals(match.score.away);
  const time = match.kickoffAtUtcMs
    ? formatDateParts(match.kickoffAtUtcMs).time
    : "--:--";
  const date = match.kickoffAtUtcMs
    ? formatDateShort(match.kickoffAtUtcMs)
    : "";

  return (
    <div
      className={`group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 px-4 py-6 transition-colors duration-200 -mx-4 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] ${
        highlight
          ? "border-l-4 border-club bg-club/5 pl-3.5"
          : "border-l-4 border-transparent hover:bg-secondary/50"
      }`}
    >
      <div className="col-span-2 font-mono text-[11px] text-muted-foreground sm:col-span-1 sm:col-start-1">
        {roundLabel(match)}
        <span className="mt-0.5 block tabular-nums">{date}</span>
      </div>

      <div className="flex min-w-0 items-center gap-3.5">
        <span className="flex shrink-0 -space-x-1.5">
          <HnsCrest
            picture={match.homeTeam?.picture}
            name={match.homeTeam?.name}
            size={30}
            className="size-7 rounded-full bg-background object-contain ring-2 ring-background"
          />
          <HnsCrest
            picture={match.awayTeam?.picture}
            name={match.awayTeam?.name}
            size={30}
            className="size-7 rounded-full bg-background object-contain ring-2 ring-background"
          />
        </span>
        <span className="truncate text-sm font-medium text-foreground/85">
          {match.homeTeam?.name} : {match.awayTeam?.name}
        </span>
      </div>

      <div className="flex items-center justify-end gap-3">
        {chip && (
          <span
            className={`px-1.5 py-0.5 font-mono text-[10px] font-bold ${chip.cls}`}
          >
            {chip.label}
          </span>
        )}
        <span
          className={`font-display text-2xl leading-none tabular-nums ${
            played ? "text-foreground" : "text-club"
          }`}
        >
          {played ? `${hg ?? "-"}:${ag ?? "-"}` : time}
        </span>
      </div>
    </div>
  );
}

export default function MatchSection({
  featured,
  grid,
  isNext,
}: MatchSectionProps) {
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
    <section className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-350 grid-cols-1 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-10 lg:py-24">
        {/* Lijevo — golemi naslov + ulaznica za istaknutu utakmicu. */}
        <div className="lg:col-span-5">
          <FadeInView>
            <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl">
              {isNext ? "Sljedeća" : "Posljednja"}
              <br />
              <span
                className="text-stroke"
                style={{ "--text-stroke-color": "var(--club)" } as React.CSSProperties}
              >
                utakmica
              </span>
            </h2>
          </FadeInView>

          {/* Ulaznica — jedina puna royal ploha u sekciji, s halftone teksturom i
              perforacijom kao stvarna karta za utakmicu. */}
          <FadeInView delay={0.1} className="relative mt-9 overflow-hidden bg-club text-white">
            <span
              aria-hidden
              className="halftone halftone-fade-t pointer-events-none absolute inset-x-0 top-0 h-24 opacity-25"
              style={{ "--halftone-color": "rgba(255,255,255,0.6)" } as React.CSSProperties}
            />

            <div className="relative flex items-center justify-between px-6 pt-6 font-mono text-[11px] tracking-[0.2em] text-white/70">
              <span>{roundLabel(featured)}</span>
              {competition && <span>{competition.toUpperCase()}</span>}
            </div>

            <div className="relative space-y-4 px-6 pt-6">
              <FeaturedTeamRow team={featured.homeTeam} />
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl leading-none tabular-nums sm:text-5xl">
                  {played ? `${hg ?? "-"}:${ag ?? "-"}` : (parts?.time ?? "VS")}
                </span>
                <span className="h-px flex-1 bg-white/20" />
              </div>
              <FeaturedTeamRow team={featured.awayTeam} />
            </div>

            {/* Perforacija — rez ulaznice, punch-hole urezi u rub kartice. */}
            <div className="relative my-7 border-t border-dashed border-white/30">
              <span className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full bg-background" />
              <span className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full bg-background" />
            </div>

            <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 pb-7 font-mono text-xs text-white/70">
              <span className="tabular-nums">
                {parts
                  ? `${parts.weekdayShort} · ${dateShort} · ${parts.time}`
                  : ""}
              </span>
              {venue && <span>{venue.toUpperCase()}</span>}
            </div>

            {/* Link na detalje veže se kad se izgradi ruta rasporeda/utakmice. */}
            <span className="relative flex items-center justify-center gap-2.5 bg-white px-5 py-4 font-mono text-[13px] font-bold uppercase tracking-wider text-club">
              Detalji utakmice +
            </span>
          </FadeInView>
        </div>

        {/* Desno — rezultati i raspored kao popis s hairline linijama. */}
        <div className="mt-14 lg:col-span-7 lg:mt-0">
          <FadeInView delay={0.05}>
            <div className="flex items-end justify-between gap-4 border-b-2 border-foreground pb-4">
              <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-foreground sm:text-4xl">
                Rezultati <span className="text-club">&amp; raspored</span>
              </h3>
              <span className="pb-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
                [ {grid.length.toString().padStart(2, "0")} ]
              </span>
            </div>
          </FadeInView>

          <div className="divide-y divide-border">
            {grid.map((m, i) => (
              <FadeInView key={m.id ?? i} delay={i * 0.06}>
                <FixtureRow match={m} highlight={m.id === featured.id} />
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedTeamRow({ team }: { team: Team | null }) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <HnsCrest
        picture={team?.picture}
        name={team?.name}
        size={56}
        className="size-11 shrink-0 object-contain sm:size-14"
      />
      <span className="min-w-0 font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
        {team?.name ?? "-"}
      </span>
    </div>
  );
}
