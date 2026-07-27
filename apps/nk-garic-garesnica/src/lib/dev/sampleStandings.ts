// PRIVREMENO — placeholder tablica dok HNS nema poretka (ljetna pauza).
// Fallback na naslovnici. Ukloniti prije launcha.
import type { MatchOutcome, Team, TeamRanking } from "@/types/hns";

const team = (name: string): Team =>
  ({ id: null, name, picture: null }) as unknown as Team;

type Row = {
  pos: number;
  name: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  form: MatchOutcome[];
  me?: boolean;
};

const rows: Row[] = [
  { pos: 1, name: "Moslavina", p: 6, w: 5, d: 1, l: 0, gf: 14, ga: 4, form: ["W", "W", "D", "W", "W"] },
  { pos: 2, name: "Bilogora", p: 6, w: 4, d: 1, l: 1, gf: 11, ga: 6, form: ["W", "L", "W", "D", "W"] },
  { pos: 3, name: "Garić Garešnica", p: 6, w: 3, d: 2, l: 1, gf: 10, ga: 7, form: ["W", "D", "L", "W", "W"], me: true },
  { pos: 4, name: "Tomislav", p: 6, w: 3, d: 1, l: 2, gf: 9, ga: 8, form: ["L", "W", "W", "L", "D"] },
  { pos: 5, name: "Čazma", p: 6, w: 2, d: 2, l: 2, gf: 8, ga: 8, form: ["D", "D", "W", "L", "W"] },
  { pos: 6, name: "Sloga", p: 6, w: 2, d: 1, l: 3, gf: 7, ga: 9, form: ["L", "W", "L", "D", "L"] },
  { pos: 7, name: "Grbavac", p: 6, w: 1, d: 3, l: 2, gf: 6, ga: 9, form: ["D", "L", "D", "W", "D"] },
  { pos: 8, name: "Hrvatski Sokol", p: 6, w: 1, d: 1, l: 4, gf: 5, ga: 12, form: ["L", "L", "D", "L", "W"] },
  { pos: 9, name: "Trnovitica", p: 6, w: 1, d: 1, l: 4, gf: 4, ga: 11, form: ["L", "D", "L", "L", "L"] },
  { pos: 10, name: "Velika Mlinska", p: 6, w: 0, d: 3, l: 3, gf: 3, ga: 10, form: ["D", "L", "L", "D", "D"] },
];

export const SAMPLE_STANDINGS: TeamRanking[] = rows.map(
  (r) =>
    ({
      team: team(r.name),
      played: r.p,
      wins: r.w,
      draws: r.d,
      losses: r.l,
      goalsFor: r.gf,
      goalsAgainst: r.ga,
      points: r.w * 3 + r.d,
      position: r.pos,
      form: r.form,
      highlight: r.me ?? false,
    }) as unknown as TeamRanking,
);
