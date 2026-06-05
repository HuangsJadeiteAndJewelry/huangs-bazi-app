import {
  ELEMENTS,
  GENERATES,
  STEM_WEIGHT,
  BRANCH_MAIN_ELEMENT_WEIGHT,
  HIDDEN_STEM_WEIGHT,
  DAY_MASTER_STRENGTH_THRESHOLDS,
} from "../data/baziConstants.js";

import { SEASONAL_ELEMENT_WEIGHT } from "../data/solarTerms.js";

export function calculateRawElementBalance(pillars) {
  const balance = Object.fromEntries(ELEMENTS.map((element) => [element, 0]));

  for (const pillar of Object.values(pillars)) {
    if (!pillar) continue;

    balance[pillar.stem.element] += STEM_WEIGHT;
    balance[pillar.branch.element] += BRANCH_MAIN_ELEMENT_WEIGHT;

    for (const hiddenStem of pillar.branch.hiddenStems) {
      balance[hiddenStem.element] += HIDDEN_STEM_WEIGHT;
    }
  }

  return Object.fromEntries(
    Object.entries(balance).map(([key, value]) => [key, Number(value.toFixed(3))])
  );
}

export function calculateSeasonallyWeightedElementBalance(rawBalance, monthBranchKey) {
  const seasonalWeights = SEASONAL_ELEMENT_WEIGHT[monthBranchKey];

  return Object.fromEntries(
    ELEMENTS.map((element) => [
      element,
      Number((rawBalance[element] * seasonalWeights[element]).toFixed(3)),
    ])
  );
}

export function calculateElementBalance(pillars) {
  const raw = calculateRawElementBalance(pillars);
  const weighted = calculateSeasonallyWeightedElementBalance(raw, pillars.month.branch.key);
  const totalWeighted = Object.values(weighted).reduce((sum, value) => sum + value, 0);

  const percentages = Object.fromEntries(
    ELEMENTS.map((element) => [
      element,
      totalWeighted === 0
        ? 0
        : Number(((weighted[element] / totalWeighted) * 100).toFixed(1)),
    ])
  );

  const sortedElements = [...ELEMENTS].sort((a, b) => weighted[b] - weighted[a]);

  return {
    raw,
    weighted,
    percentages,
    strongest: sortedElements[0],
    weakest: sortedElements[sortedElements.length - 1],
  };
}

export function calculateDayMasterStrength(pillars, elementBalance) {
  const dayMaster = pillars.day.stem;
  const selfElement = dayMaster.element;
  const resourceElement = ELEMENTS.find((element) => GENERATES[element] === selfElement);

  const selfScore = elementBalance.weighted[selfElement] || 0;
  const resourceScore = elementBalance.weighted[resourceElement] || 0;
  const totalScore = Object.values(elementBalance.weighted).reduce((sum, value) => sum + value, 0);
  const strengthRatio = totalScore === 0 ? 0 : (selfScore + resourceScore) / totalScore;

  let category = "Balanced";
  if (strengthRatio < DAY_MASTER_STRENGTH_THRESHOLDS.weakBelow) category = "Weak";
  if (strengthRatio > DAY_MASTER_STRENGTH_THRESHOLDS.strongAbove) category = "Strong";

  return {
  dayMaster: {
    key: dayMaster.key,
    zh: dayMaster.zh,
    label: dayMaster.label,
    element: dayMaster.element,
    polarity: dayMaster.polarity,
    displayName: `${dayMaster.zh} · ${dayMaster.label}`,
  },

  displayName: `${dayMaster.zh} · ${dayMaster.label}`,

  selfElement,
  resourceElement,
  selfScore: Number(selfScore.toFixed(3)),
  resourceScore: Number(resourceScore.toFixed(3)),
  totalScore: Number(totalScore.toFixed(3)),
  strengthRatio: Number(strengthRatio.toFixed(3)),
  category,
};
}