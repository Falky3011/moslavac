import { FadeInView } from "@/components/animations";
import type { RosterEntry, RosterPosition } from "@/types/roster";
import PlayersCarousel from "./PlayersCarousel";

type PlayersSectionProps = {
  players: RosterEntry[];
  /** Fotografije iz Cometa, po `personId`; igrač bez fotke dobiva broj dresa. */
  photos: Record<number, string>;
};

/** Redoslijed kartica: vratari → obrana → vezni red → napad. */
const LINE_ORDER: RosterPosition[] = [
  "vratar",
  "obrambeni",
  "vezni",
  "napadac",
];

/**
 * Momčad — vodoravni slider igrača, posloženih po linijama i unutar linije po
 * broju dresa. Podaci dolaze iz Payloada (kolekcija `roster`); trener i ostatak
 * stožera se ne prikazuju.
 */
export default function PlayersSection({
  players,
  photos,
}: PlayersSectionProps) {
  const squad = players
    .filter((p) => p.position !== "trener")
    .sort(
      (a, b) =>
        LINE_ORDER.indexOf(a.position) - LINE_ORDER.indexOf(b.position) ||
        (a.jerseyNumber ?? 99) - (b.jerseyNumber ?? 99),
    );

  if (squad.length === 0) return null;

  return (
    <section className="border-t border-border bg-background py-16 lg:py-24">
      <div className="relative mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-10">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <FadeInView>
            <h2 className="font-display text-6xl leading-[0.9] tracking-tight text-foreground uppercase lg:text-8xl">
              Momčad
            </h2>
          </FadeInView>

          <FadeInView delay={0.1}>
            <p className="max-w-72 text-base leading-relaxed text-muted-foreground sm:text-right">
              {squad.length} igrača u sastavu prve momčadi.
            </p>
          </FadeInView>
        </div>
      </div>

      {/* Slider ide do desnog ruba ekrana; lijevo ostaje poravnat s gridom. */}
      <FadeInView className="mt-12 pl-4 sm:pl-6 lg:pl-[max(2.5rem,calc((100vw-87.5rem)/2+2.5rem))]">
        <PlayersCarousel players={squad} photos={photos} />
      </FadeInView>
    </section>
  );
}
