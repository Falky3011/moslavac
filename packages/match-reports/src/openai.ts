import OpenAI from "openai";
import type { MatchFacts } from "./facts";
import type { MatchReportWriter } from "./template";

/**
 * Srednji sloj nove generacije, oko $0.21 po sezoni. Manji `gpt-5.6-luna` je
 * na provjeri padao na podjeli kartona po momčadima. Zamjena modela je ovaj
 * jedan string; vidi ADR 0002.
 */
export const DEFAULT_MODEL = "gpt-5.6-terra";

const INSTRUCTIONS = [
  "Ti si sportski novinar hrvatskog nogometnog kluba.",
  "Napiši kratak izvještaj s odigrane utakmice na hrvatskom jeziku.",
  "",
  "Sadržaj:",
  "- Prvi odlomak: tko je s kim igrao, rezultat, natjecanje i kolo, kad i gdje.",
  "  Ako polje `attendance` postoji, OBAVEZNO navedi broj gledatelja.",
  "- Drugi odlomak: golovi. Svakog strijelca navedi imenom i minutom.",
  "  Ako golova nije bilo, reci to jednom rečenicom.",
  "- Treći odlomak: kartoni.",
  "",
  "Kartoni:",
  "- Crvene kartone navedi imenom i minutom.",
  "- NE spominji ono čega nije bilo. Ako nije bilo crvenih kartona, ne piši",
  "  'crvenih kartona nije bilo' — jednostavno ih preskoči. Isto vrijedi za",
  "  autogolove i za kartone općenito.",
  "- Jedina iznimka: ako nije bilo pogodaka, to reci — to je rezultat.",
  "- Žute kartone NE nabrajaj poimence. Brojeve prepiši iz polja `yellowCards`",
  "  (`ukupno`, `domacin`, `gosti`), npr. 'Sudac je podijelio sedam žutih",
  "  kartona, četiri domaćinu i tri gostima.'",
  "- Ne računaj ništa sam. U toj rečenici ne smije biti drugih brojeva.",
  "",
  "Pravila:",
  "- Piši točno tri odlomka, odvojena praznim retkom.",
  "- Ukupno oko 110 riječi.",
  "- Koristi ISKLJUČIVO činjenice iz JSON-a koji dobiješ.",
  "- Ne izmišljaj igrače, minute, golove, kartone ni brojke.",
  "- Ne ocjenjuj igru i ne objašnjavaj rezultat. Bez fraza tipa",
  "  'dominirali su', 'zasluženo', 'nesretno', 'borbeno'.",
  "- Ton je neutralan i izvještajni, jednak kod pobjede i kod poraza.",
  "- Nazive klubova sklanjaj kroz padeže ispravno.",
  "- Minute piši točno onako kako stoje u polju `display` (npr. 45+2).",
  "- Ne piši ništa o tablici ni o sljedećoj utakmici. To dodaje sustav sam.",
  "- Ne piši naslov i ne koristi markdown.",
].join("\n");

export interface OpenAiWriterOptions {
  apiKey: string;
  model?: string;
  /** Ubrizgava se u testovima; u produkciji se klijent radi iz `apiKey`. */
  client?: Pick<OpenAI, "responses">;
}

/**
 * Model kao pisac. Namjerno ne hvata greške — `withFallback` ih pretvara u
 * pad na šablonu, pa je odluka o rezervi na jednom mjestu.
 */
export const openAiWriter = (opts: OpenAiWriterOptions): MatchReportWriter => {
  const client = opts.client ?? new OpenAI({ apiKey: opts.apiKey });
  // `||`, ne `??`: prazan OPENAI_MATCH_REPORT_MODEL inače ruši svaki poziv.
  const model = opts.model || DEFAULT_MODEL;

  return async (facts: MatchFacts) => {
    const response = await client.responses.create({
      model,
      reasoning: { effort: "low" },
      instructions: INSTRUCTIONS,
      input: JSON.stringify(promptFacts(facts)),
    });

    return splitParagraphs(response.output_text ?? "");
  };
};

/**
 * Model vidi samo ovo. `matchId` i `clubSide` su interni podaci i ne šalju se —
 * u tekstu nemaju što raditi, a mogli bi završiti u njemu.
 */
function promptFacts(facts: MatchFacts) {
  const {
    matchId: _id,
    matchSlug: _slug,
    clubSide: _side,
    kickoffAtUtcMs: _ms,
    yellowCards,
    // Tablicu i sljedećeg protivnika dopisuje `aftermathParagraph`, ne model.
    standing: _standing,
    nextMatch: _next,
    ...rest
  } = facts;

  // Žuti kartoni idu kao gotovi zbrojevi, ne kao popis. Model ih inače mora
  // sam prebrojati po momčadima, a to je aritmetika koju kod već zna — i na
  // kojoj je manji model padao na provjeri.
  const home = yellowCards.filter((e) => e.side === "home").length;
  return {
    ...rest,
    yellowCards: {
      ukupno: yellowCards.length,
      domacin: home,
      gosti: yellowCards.length - home,
    },
  };
}

/** Prazan redak dijeli odlomke. Prazne i rubne razmake bacamo. */
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 0);
}
