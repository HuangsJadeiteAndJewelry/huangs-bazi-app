import { normalizeInput } from "./dateTime.js";
import { calculatePillars } from "./pillars.js";
import { calculateTenGodProfile, calculateTenGodScores } from "./tenGods.js";
import {
  calculateElementBalance,
  calculateDayMasterStrength,
} from "./elementBalance.js";
import { calculateUsefulGodSuggestion } from "./usefulGod.js";
import { mapTenGodScoresToArchetypes } from "../data/archetypes.js";

export const ENGINE_VERSION = "0.2.0-stable-output";

export function buildBaziChart(input) {
  const normalizedInput = normalizeInput(input);
  const pillars = calculatePillars(normalizedInput);

  const tenGodByPillar = calculateTenGodProfile(pillars);
  const tenGodScores = calculateTenGodScores(pillars);
  const archetypes = mapTenGodScoresToArchetypes(tenGodScores);

  const elementBalance = calculateElementBalance(pillars);
  const dayMasterStrength = calculateDayMasterStrength(pillars, elementBalance);
  const usefulGodSuggestion = calculateUsefulGodSuggestion(
    dayMasterStrength,
    elementBalance
  );

  const warnings = [
    "Month pillar uses approximate Jie Qi boundaries. Replace with exact solar-term timestamps before production.",
    "Day pillar uses a fixed reference anchor. Validate against chosen almanac before production lock.",
  ];

  if (input.useBirthTime && !input.birthTime) {
    warnings.push(
      "useBirthTime was true but birthTime was missing. Engine returned three-pillar mode."
    );
  }

  if (normalizedInput.timezone === "UTC") {
    warnings.push("Birth country was not found in timezone map. UTC fallback was used.");
  }

  return {
    engineVersion: ENGINE_VERSION,
    mode: normalizedInput.useBirthTime ? "four-pillar" : "three-pillar",
    input: {
      birthDate: normalizedInput.birthDate,
      birthTime: normalizedInput.birthTime,
      birthCountry: normalizedInput.birthCountry,
      timezone: normalizedInput.timezone,
      useBirthTime: normalizedInput.useBirthTime,
    },
    pillars,
    tenGods: {
      byPillar: tenGodByPillar,
      scores: tenGodScores,
    },
    archetypes,
    elementBalance,
    dayMasterStrength,
    usefulGodSuggestion,
    warnings,
  };
}

export default buildBaziChart;