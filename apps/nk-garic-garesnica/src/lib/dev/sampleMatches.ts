// PRIVREMENO — placeholder utakmice za prikaz MatchSection dok HNS nema
// pravih termina (ljetna pauza). Koristi se kao fallback na naslovnici.
// UKLONITI (ili maknuti fallback u page.tsx) prije launcha kad HNS ima podatke.
import type { Match, Team } from "@/types/hns";

const team = (name: string): Team =>
  ({ id: null, name, picture: null }) as unknown as Team;

const base = {
  homeRedCards: null,
  awayRedCards: null,
  minute: null,
  matchOrderNumber: null,
  roundOrder: null,
  matchNumber: null,
  matchDayDescription: null,
  status: null,
  statusDescription: null,
  resultSupplement: null,
  currentMinute: null,
  resultString: null,
  currentPhase: null,
  facility: { name: "Stadion Garešnica" },
  attendance: null,
  showEvents: false,
  allowDetail: true,
  round: null,
  competition: { id: 1, name: "3. NL Središte" },
};

const ms = (d: string) => new Date(d).getTime();

const m05 = {
  ...base,
  id: 5,
  homeTeam: team("Garić Garešnica"),
  awayTeam: team("Moslavina"),
  score: { home: { current: 2 }, away: { current: 1 } },
  liveStatus: "PLAYED",
  kickoffAtUtcMs: ms("2026-09-05T17:00"),
  matchDay: 5,
  teamResult: "W",
  teamSide: "home",
} as unknown as Match;

const m04 = {
  ...base,
  id: 4,
  homeTeam: team("Bilogora"),
  awayTeam: team("Garić Garešnica"),
  score: { home: { current: 1 }, away: { current: 1 } },
  liveStatus: "PLAYED",
  kickoffAtUtcMs: ms("2026-08-29T17:00"),
  matchDay: 4,
  teamResult: "D",
  teamSide: "away",
} as unknown as Match;

const m06 = {
  ...base,
  id: 6,
  homeTeam: team("Garić Garešnica"),
  awayTeam: team("Tomislav"),
  score: { home: {}, away: {} },
  liveStatus: "SCHEDULED",
  kickoffAtUtcMs: ms("2026-09-12T17:00"),
  matchDay: 6,
  teamResult: null,
  teamSide: "home",
} as unknown as Match;

const m07 = {
  ...base,
  id: 7,
  homeTeam: team("Čazma"),
  awayTeam: team("Garić Garešnica"),
  score: { home: {}, away: {} },
  liveStatus: "SCHEDULED",
  kickoffAtUtcMs: ms("2026-09-19T17:30"),
  matchDay: 7,
  teamResult: null,
  teamSide: "away",
} as unknown as Match;

export const SAMPLE_FEATURED: Match = m06;
export const SAMPLE_GRID: Match[] = [m05, m04, m06, m07];
