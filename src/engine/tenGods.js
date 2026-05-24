import {
  TEN_GODS,
  GENERATES,
  CONTROLS,
  STEM_WEIGHT,
  HIDDEN_STEM_WEIGHT,
  getStem,
} from "../data/baziConstants.js";

export function getElementRelation(dayMasterElement, otherElement) {
  if (dayMasterElement === otherElement) return "same";
  if (GENERATES[dayMasterElement] === otherElement) return "output";
  if (GENERATES[otherElement] === dayMasterElement) return "resource";
  if (CONTROLS[dayMasterElement] === otherElement) return "wealth";
  if (CONTROLS[otherElement] === dayMasterElement) return "officer";

  throw new Error(
    `Unable to determine element relation: ${dayMasterElement} vs ${otherElement}`
  );
}

export function calculateTenGod(dayStemKey, otherStemKey) {
  const dayStem = getStem(dayStemKey);
  const otherStem = getStem(otherStemKey);

  const relation = getElementRelation(dayStem.element, otherStem.element);
  const samePolarity = dayStem.polarity === otherStem.polarity;

  const map = {
    same: samePolarity ? "Friend" : "Rob Wealth",
    output: samePolarity ? "Eating God" : "Hurting Officer",
    wealth: samePolarity ? "Indirect Wealth" : "Direct Wealth",
    officer: samePolarity ? "Seven Killings" : "Direct Officer",
    resource: samePolarity ? "Indirect Resource" : "Direct Resource",
  };

  return map[relation];
}

export function annotatePillarTenGods(pillar, dayStemKey, isDayPillar = false) {
  if (!pillar) return null;

  return {
    stem: isDayPillar ? "Self" : calculateTenGod(dayStemKey, pillar.stem.key),
    hiddenStems: pillar.branch.hiddenStems.map((hiddenStem) => ({
      stemKey: hiddenStem.key,
      stemZh: hiddenStem.zh,
      tenGod: calculateTenGod(dayStemKey, hiddenStem.key),
    })),
  };
}

export function calculateTenGodProfile(pillars) {
  const dayStemKey = pillars.day.stem.key;

  return {
    year: annotatePillarTenGods(pillars.year, dayStemKey),
    month: annotatePillarTenGods(pillars.month, dayStemKey),
    day: annotatePillarTenGods(pillars.day, dayStemKey, true),
    hour: annotatePillarTenGods(pillars.hour, dayStemKey),
  };
}

export function calculateTenGodScores(pillars) {
  const scores = Object.fromEntries(TEN_GODS.map((tenGod) => [tenGod, 0]));
  const dayStemKey = pillars.day.stem.key;

  for (const [pillarName, pillar] of Object.entries(pillars)) {
    if (!pillar) continue;

    if (pillarName !== "day") {
      const tenGod = calculateTenGod(dayStemKey, pillar.stem.key);
      scores[tenGod] += STEM_WEIGHT;
    }

    for (const hiddenStem of pillar.branch.hiddenStems) {
      const tenGod = calculateTenGod(dayStemKey, hiddenStem.key);
      scores[tenGod] += HIDDEN_STEM_WEIGHT;
    }
  }

  return Object.fromEntries(
    Object.entries(scores).map(([key, value]) => [key, Number(value.toFixed(3))])
  );
}