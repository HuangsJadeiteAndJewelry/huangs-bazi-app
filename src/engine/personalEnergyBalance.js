export function buildPersonalEnergyBalance({
  dayMasterStrength,
  usefulGodSuggestion,
}) {
  return {
    coreEnergyStatus:
      dayMasterStrength >= 7
        ? "Supported"
        : dayMasterStrength >= 5
        ? "Balanced"
        : dayMasterStrength >= 3
        ? "Weak"
        : "Challenged",

    seasonalDominantElement:
      usefulGodSuggestion?.seasonalDominantElement || "Earth",

    supportiveElements:
      usefulGodSuggestion?.supportiveElements || ["Metal"],

    cautionElements:
  usefulGodSuggestion?.cautionElements || ["Fire"],

balanceScore: Number(
  (dayMasterStrength.strengthRatio * 10).toFixed(1)
),
};
}