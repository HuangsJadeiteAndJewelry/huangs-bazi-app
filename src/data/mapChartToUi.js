const pickArray = (...arrays) => {
  return arrays.find((array) => Array.isArray(array) && array.length > 0) || [];
};

const TEN_PROFILE_NAMES = {
  Friend: "The Companion",
  RobWealth: "The Challenger",
  EatingGod: "The Creator",
  HurtingOfficer: "The Rebel Voice",
  DirectWealth: "The Builder",
  IndirectWealth: "The Opportunist",
  DirectOfficer: "The Guardian",
  SevenKillings: "The Warrior",
  DirectResource: "The Nurturer",
  IndirectResource: "The Mystic",

  friend: "The Companion",
  robWealth: "The Challenger",
  eatingGod: "The Creator",
  hurtingOfficer: "The Rebel Voice",
  directWealth: "The Builder",
  indirectWealth: "The Opportunist",
  directOfficer: "The Guardian",
  sevenKillings: "The Warrior",
  directResource: "The Nurturer",
  indirectResource: "The Mystic",
};

const normalizeScore = (value) => {
  const number = Number(value || 0);

  if (!Number.isFinite(number)) return 0;

  // Engine may return decimal scores like 0.35
  if (number > 0 && number <= 1) {
    return number;
  }

  return number;
};

const getRawArchetypeScore = (item) => {
  return normalizeScore(
    item.adjustedScore ??
      item.score ??
      item.percentage ??
      item.value ??
      0
  );
};

const getArchetypeKey = (item) => {
  return (
    item.archetypeKey ||
    item.key ||
    item.type ||
    item.tenGod ||
    item.label ||
    ""
  );
};

export const mapChartToUi = (chart, selectedYear) => {
  const personalEnergy = chart.personalEnergyProfile || {};
  const annual = chart.annualOverlay || {};
  const stones =
  chart.stoneRecommendationsV3 ||
  chart.stoneRecommendations ||
  {};
  const rawGuidance =
  chart.practicalGuidanceV3 ||
  chart.practicalGuidance ||
  {};

const annualScores = chart.annualOverlayV3 || {};

const guidance = {
  ...rawGuidance,

  career: {
    ...(rawGuidance.career || {}),
    score: annualScores?.career?.score,
  },

  wealth: {
    ...(rawGuidance.wealth || {}),
    score: annualScores?.wealth?.score,
  },

  relationship: {
    ...(rawGuidance.relationship || {}),
    score: annualScores?.relationship?.score,
  },

  wellness: {
    ...(rawGuidance.wellness || rawGuidance.health || {}),
    score: annualScores?.wellness?.score,
  },

  health: {
    ...(rawGuidance.health || rawGuidance.wellness || {}),
    score: annualScores?.wellness?.score,
  },
};

  const rawArchetypes = pickArray(
    chart.adjustedArchetypes,
    chart.archetypes,
    chart.tenGodProfiles,
    chart.profiles
  );

  const maxArchetypeScore = Math.max(
    ...rawArchetypes.map((item) => getRawArchetypeScore(item)),
    1
  );

  const archetypes = rawArchetypes
  .map((item) => {
    const profileKey = getArchetypeKey(item);
const rawScore = getRawArchetypeScore(item);

const score = Math.round(
  Math.max(
    0,
    Math.min(
      100,
      Number(item.score ?? item.percentage ?? item.adjustedScore ?? item.displayScore ?? 0)
    )
  )
);

    const publicName =
      item.publicName ||
      item.name ||
      item.label ||
      TEN_PROFILE_NAMES[profileKey] ||
      profileKey ||
      "Archetype";

      return {
  key: profileKey,
  type: item.tenGod || item.type || item.label || profileKey || "Archetype",
  name: publicName,
  label: item.tenGod || item.type || item.label || profileKey || "Archetype",
  description:
    item.description ||
    item.publicMeaning ||
    item.meaning ||
    item.theme ||
    "This archetype reflects one of your active personality patterns.",
  score,
  percentage: score,
  strengths: item.strengths || [],
  stressPattern: item.stressPattern || item.stress || "",
};
    })
    .sort((a, b) => b.score - a.score);

  return {
    profile: {
      ...(chart.profile || {}),
      name: chart?.input?.name?.trim() || "",
      selectedYear,
      summary:
        chart.profile?.summary ||
        "Your elemental balance interacts differently with each annual cycle, influencing emotional expression, mental pressure, motivation and recovery.",
      zodiac: chart.birthZodiac?.zodiacDisplayName || "TEST",
      coreEnergy:
        chart?.dayMasterStrength?.dayMaster?.zh &&
        chart?.dayMasterStrength?.dayMaster?.label
          ? `${chart.dayMasterStrength.dayMaster.zh} · ${chart.dayMasterStrength.dayMaster.label}`
          : chart?.dayMasterStrength?.displayName ||
            chart?.dayMasterStrength?.dayMaster?.displayName ||
            "",
      annualPillar: annual.yearPillar || null,
      annualZodiac: annual.zodiac?.displayName || "",
    },

    archetypes,

    elements: Object.entries(chart.elementBalance?.percentages || {}).map(
      ([name, percentage]) => ({
        key: name,
        name,
        label: `${percentage}%`,
        publicMeaning: "",
        percentage,
      })
    ),

    personalEnergyBalance: {
      coreEnergyStatus: personalEnergy.coreEnergyStatus,
      coreEnergyScore: personalEnergy.coreEnergyScore,
      seasonalDominantElement: personalEnergy.seasonalDominantElement,
      supportiveElements: personalEnergy.supportiveElements || [],
      cautionElements: personalEnergy.cautionElements || [],
      explanation: personalEnergy.explanation || "",
      method: personalEnergy.method,
    },

    practicalGuidance: guidance,
    guidance,

    stoneRecommendations: {
      primaryElement: stones.primaryElement || "",
      supportElements: stones.supportElements || [],
supportBenefits: stones.supportBenefits || [],
energyStrategy: stones.energyStrategy || {},
      cautionElements: stones.cautionElements || [],
      recommendedStones: stones.recommendedStones || [],
      topRecommendation: stones.topRecommendation || "",
      annualFocus: stones.annualFocus || "",
      explanation: stones.explanation || "",
      stoneDetails: stones.stoneDetails || [],
      method: stones.method || "",
    },

    stones: {
      primaryElement: stones.primaryElement || "",
      supportElements: stones.supportElements || [],
supportBenefits: stones.supportBenefits || [],
      cautionElements: stones.cautionElements || [],
      recommendedStones: stones.recommendedStones || [],
      topRecommendation: stones.topRecommendation || "",
      annualFocus: stones.annualFocus || "",
      explanation: stones.explanation || "",
      stoneDetails: stones.stoneDetails || [],
      method: stones.method || "",
    },

    annualOverlay: annual,
    annual,

    cta: chart.cta || {
      label: "Next Step",
      text: "",
    },
  };
};