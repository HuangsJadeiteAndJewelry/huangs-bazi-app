import { normalizePillars } from "./normalizePillars.js";

const ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"];

const STEM_WEIGHT = {
  year: 0.8,
  month: 1.3,
  day: 1.0,
  hour: 0.8,
};

const BRANCH_WEIGHT = {
  year: 0.7,
  month: 1.4,
  day: 0.9,
  hour: 0.7,
};

const HIDDEN_STEM_DECAY = [1, 0.55, 0.35];

function addScore(scores, element, amount) {
  if (!element || !Number.isFinite(amount)) return;
  scores[element] = (scores[element] || 0) + amount;
}

function getLevel(percentage) {
  if (percentage >= 30) return "Dominant";
  if (percentage >= 22) return "Strong";
  if (percentage >= 14) return "Present";
  if (percentage >= 7) return "Weak";
  return "Missing";
}

export function calculateElementBalanceV3(pillars) {
  const normalized = normalizePillars(pillars);

  const rawScores = {
    Wood: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0,
  };

  ["year", "month", "day", "hour"].forEach((position) => {
    const pillar = normalized[position];
    if (!pillar) return;

    addScore(rawScores, pillar.stemElement, STEM_WEIGHT[position] || 0.6);
    addScore(rawScores, pillar.branchElement, BRANCH_WEIGHT[position] || 0.6);

    pillar.hiddenStems.forEach((hiddenStem, index) => {
      addScore(
        rawScores,
        hiddenStem.element,
        (BRANCH_WEIGHT[position] || 0.6) *
          (HIDDEN_STEM_DECAY[index] || 0.25)
      );
    });
  });

  const totalRaw = Object.values(rawScores).reduce(
    (sum, value) => sum + value,
    0
  );

  const elements = ELEMENTS.map((element) => {
    const raw = rawScores[element] || 0;
    const percentage =
      totalRaw > 0 ? Math.round((raw / totalRaw) * 100) : 0;

    return {
      element,
      raw: Number(raw.toFixed(2)),
      percentage,
      level: getLevel(percentage),
    };
  });

  const sorted = [...elements].sort((a, b) => b.percentage - a.percentage);

  return {
    totalRaw: Number(totalRaw.toFixed(2)),
    rawScores: Object.fromEntries(
      Object.entries(rawScores).map(([key, value]) => [
        key,
        Number(value.toFixed(2)),
      ])
    ),
    elements,
    dominantElement: sorted[0] || null,
    weakestElement: sorted[sorted.length - 1] || null,
    missingElements: elements
      .filter((item) => item.level === "Missing")
      .map((item) => item.element),
    explanation:
      "Element balance is calculated from visible stems, branch elements, and hidden stems with stronger weighting for the month pillar.",
  };
}