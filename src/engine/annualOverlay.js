const ELEMENT_CYCLE = ["Wood", "Fire", "Earth", "Metal", "Water"];

function getStrongestElement(elementBalance) {
  const yearly = elementBalance?.yearly || elementBalance?.withAnnual || elementBalance?.natal || {};

  return Object.entries(yearly).sort((a, b) => b[1] - a[1])?.[0]?.[0] || "Fire";
}

function getWeakestElements(elementBalance) {
  const yearly = elementBalance?.yearly || elementBalance?.withAnnual || elementBalance?.natal || {};

  return Object.entries(yearly)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([element]) => element);
}

export function buildAnnualOverlay(selectedYear = 2026, elementBalance = {}) {
  const yearMap = {
    2026: {
      pillar: "丙午",
      stem: "丙",
      branch: "午",
      zodiacAnimal: "Horse",
      zodiacElement: "Fire",
      zodiacDisplayName: "Fire Horse",
      dominantElement: "Fire",
      dominantTheme: "Visibility, momentum and emotional activation",
    },
    2027: {
      pillar: "丁未",
      stem: "丁",
      branch: "未",
      zodiacAnimal: "Goat",
      zodiacElement: "Fire",
      zodiacDisplayName: "Fire Goat",
      dominantElement: "Fire",
      dominantTheme: "Stability, refinement and emotional consolidation",
    },
  };

  const fallback = {
    pillar: "丙午",
    stem: "丙",
    branch: "午",
    zodiacAnimal: "Horse",
    zodiacElement: "Fire",
    zodiacDisplayName: "Fire Horse",
    dominantElement: getStrongestElement(elementBalance),
    dominantTheme: "Annual energy influence and adjustment",
  };

  const yearData = yearMap[selectedYear] || fallback;

  return {
    selectedYear,
    yearPillar: {
      chinese: yearData.pillar,
      stem: yearData.stem,
      branch: yearData.branch,
    },
    zodiac: {
      animal: yearData.zodiacAnimal,
      element: yearData.zodiacElement,
      displayName: yearData.zodiacDisplayName,
    },
    dominantElement: yearData.dominantElement,
    dominantTheme: yearData.dominantTheme,
    amplifiedElements: [yearData.dominantElement],
    weakenedElements: getWeakestElements(elementBalance),
    method: "prototypeAnnualOverlayV2",
  };
}