"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { RosterEntry, RosterPosition } from "@/types/roster";

const POSITION_LABEL: Record<Exclude<RosterPosition, "trener">, string> = {
  vratar: "Vratar",
  obrambeni: "Obrana",
  vezni: "Vezni red",
  napadac: "Napad",
};

function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { first: "", last: parts[0] };
  const last = parts.pop() as string;
  return { first: parts.join(" "), last };
}

/**
 * Kartica igrača. Igrači nemaju fotografije, pa kartica ostaje tipografska:
 * broj dresa, ime, linija. Sve ostalo je bjelina.
 */
function PlayerCard({ player }: { player: RosterEntry }) {
  const { first, last } = splitName(player.displayName);
  const position =
    player.position !== "trener" ? POSITION_LABEL[player.position] : null;

  return (
    <article className="group relative flex h-80 w-56 shrink-0 snap-start flex-col justify-between overflow-hidden border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-club/40 hover:shadow-[0_16px_44px_-20px_oklch(0.5_0.17_262/0.3)] sm:h-88 sm:w-64">
      {/* Halftone raster s dresa — izranja na hover. */}
      <span
        aria-hidden
        className="halftone halftone-fade-t pointer-events-none absolute inset-x-0 bottom-0 h-2/5 opacity-0 transition-opacity duration-300 group-hover:opacity-25"
      />

      {/* Broj dresa — golemi condensed broj, glavni motiv kartice. */}
      {player.jerseyNumber !== null && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-4 font-display text-[8.5rem] leading-none tabular-nums text-club/10 transition-colors duration-300 group-hover:text-club/20"
        >
          {player.jerseyNumber}
        </span>
      )}

      <div className="relative flex items-start justify-between">
        <span className="font-display text-xl tabular-nums text-club">
          {player.jerseyNumber === null
            ? "-"
            : String(player.jerseyNumber).padStart(2, "0")}
        </span>
        {player.captain && (
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-club uppercase">
            Kapetan
          </span>
        )}
      </div>

      <div className="relative">
        {position && (
          <p className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
            {position}
          </p>
        )}
        <div className="mt-3 h-0.5 w-8 bg-club transition-[width] duration-300 ease-out group-hover:w-14" />
        {first && (
          <p className="mt-4 text-sm text-muted-foreground">{first}</p>
        )}
        <h3 className="mt-1 font-display text-3xl leading-[1.02] tracking-wide text-foreground uppercase">
          {last}
        </h3>
      </div>
    </article>
  );
}

/**
 * Vodoravni slider igrača. Scroll je izvorni (touch i trackpad zadržavaju
 * momentum), gumbi samo pomiču pogled; traka pokazuje dokle se došlo.
 */
export default function PlayersCarousel({
  players,
}: {
  players: RosterEntry[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }, []);

  return (
    <div>
      {/* Okomiti padding je nužan: `overflow-x: auto` kliparo i po Y osi, pa bi
          bez njega podignuta kartica i njena sjena bile odrezane. */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="-my-4 flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-5 pr-4 sm:pr-6 lg:pr-10">
        <div className="h-px flex-1 bg-border">
          <div
            className="h-0.5 bg-club transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Prethodni igrači"
            className="flex size-11 items-center justify-center border border-border text-foreground transition-[transform,background-color,border-color,opacity] duration-150 ease-out hover:border-club/50 hover:bg-secondary active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Sljedeći igrači"
            className="flex size-11 items-center justify-center border border-border text-foreground transition-[transform,background-color,border-color,opacity] duration-150 ease-out hover:border-club/50 hover:bg-secondary active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
