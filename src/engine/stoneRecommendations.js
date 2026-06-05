const STONE_BY_ELEMENT = {
  Wood: ["Jadeite", "Green Aventurine", "Peridot"],
  Fire: ["Super 7 Quartz", "Garnet", "Sunstone"],
  Earth: ["Citrine", "Yellow Jade", "Tiger Eye"],
  Metal: ["Golden Rutilated Quartz", "Clear Quartz", "Pyrite"],
  Water: ["Aquamarine", "Blue Kyanite", "Labradorite"],
};

const STONE_MEANING = {
  Jadeite: {
    element: "Wood",
    theme: "Growth, renewal and long-term development",
    bestFor: "When the chart needs more direction, flexibility and steady personal growth",
  },
  "Green Aventurine": {
    element: "Wood",
    theme: "Opportunity, openness and gentle progress",
    bestFor: "When the person needs to invite smoother growth without forcing outcomes",
  },
  Peridot: {
    element: "Wood",
    theme: "Fresh momentum and emotional lightness",
    bestFor: "When the chart feels stagnant or overly serious",
  },

  "Super 7 Quartz": {
    element: "Fire",
    theme: "Visibility, confidence and activation",
    bestFor: "When the person needs more courage, expression and forward movement",
  },
  Garnet: {
    element: "Fire",
    theme: "Drive, passion and personal magnetism",
    bestFor: "When motivation is low and the person needs stronger inner fire",
  },
  Sunstone: {
    element: "Fire",
    theme: "Optimism, confidence and warmth",
    bestFor: "When the chart needs more joy, visibility and self-belief",
  },

  Citrine: {
    element: "Earth",
    theme: "Stability, responsibility and grounded confidence",
    bestFor: "When the person needs more structure, steadiness and practical focus",
  },
  "Yellow Jade": {
    element: "Earth",
    theme: "Calm support, patience and emotional grounding",
    bestFor: "When the chart needs more balance, routine and inner stability",
  },
  "Tiger Eye": {
    element: "Earth",
    theme: "Discipline, courage and practical decision-making",
    bestFor: "When the person needs to stay grounded while taking action",
  },

  "Golden Rutilated Quartz": {
    element: "Metal",
    theme: "Clarity, precision and wealth focus",
    bestFor: "When the person needs sharper decisions, discipline and financial direction",
  },
  "Clear Quartz": {
    element: "Metal",
    theme: "Clarity, purification and mental focus",
    bestFor: "When the chart needs cleaner thinking and less emotional noise",
  },
  Pyrite: {
    element: "Metal",
    theme: "Confidence, structure and wealth protection",
    bestFor: "When the person needs stronger boundaries around money and energy",
  },

  Aquamarine: {
    element: "Water",
    theme: "Calm, communication and emotional recovery",
    bestFor: "When the chart needs more softness, flow and stress regulation",
  },
  "Blue Kyanite": {
    element: "Water",
    theme: "Clear communication, emotional alignment and inner calm",
    bestFor: "When the person needs to express themselves without emotional overwhelm",
  },
  Labradorite: {
    element: "Water",
    theme: "Protection, intuition and emotional reset",
    bestFor: "When the person is energetically tired or easily affected by surroundings",
  },
};

const ELEMENT_FOCUS = {
  Wood: "growth, direction and long-term development",
  Fire: "visibility, confidence and emotional expression",
  Earth: "stability, grounding and responsibility management",
  Metal: "clarity, discipline and wealth decision-making",
  Water: "calm, recovery and emotional flow",
};

export function buildStoneRecommendations({
  usefulGodSuggestion,
  personalEnergyProfile,
  annualOverlay,
}) {
  const supportElements = cleanElements(
    usefulGodSuggestion?.supportiveElements ||
      personalEnergyProfile?.supportiveElements ||
      ["Water"]
  );

  const cautionElements = cleanElements(
    usefulGodSuggestion?.cautionElements ||
      personalEnergyProfile?.cautionElements ||
      []
  );

  const primaryElement = supportElements[0] || "Water";

  const recommendedStones = buildRecommendedStoneList({
    supportElements,
    cautionElements,
  });

  const topRecommendation = recommendedStones[0] || "Aquamarine";

  const annualFocus =
    annualOverlay?.dominantTheme ||
    annualOverlay?.theme ||
    `Support ${primaryElement} energy for better ${ELEMENT_FOCUS[primaryElement] || "balance"}`;

  return {
    primaryElement,
    supportElements,
    cautionElements,
    recommendedStones,
    topRecommendation,
    annualFocus,
    explanation: buildStoneExplanation({
      primaryElement,
      supportElements,
      cautionElements,
      topRecommendation,
      annualFocus,
    }),
    stoneDetails: recommendedStones.map((stone) => ({
      name: stone,
      ...(STONE_MEANING[stone] || {
        element: primaryElement,
        theme: "Energetic support and balance",
        bestFor: "General energetic support",
      }),
    })),
    method: "element-based-stone-recommendation-v2",
  };
}

function buildRecommendedStoneList({ supportElements, cautionElements }) {
  const stones = [];

  supportElements.forEach((element) => {
    const elementStones = STONE_BY_ELEMENT[element] || [];
    stones.push(...elementStones);
  });

  const uniqueStones = [...new Set(stones)];

  if (!uniqueStones.length) {
    return ["Aquamarine", "Blue Kyanite", "Labradorite"];
  }

  return uniqueStones.slice(0, 6);
}

function buildStoneExplanation({
  primaryElement,
  supportElements,
  cautionElements,
  topRecommendation,
  annualFocus,
}) {
  const supportText = supportElements.length
    ? supportElements.join(", ")
    : primaryElement;

  const cautionText = cautionElements.length
    ? ` At the same time, avoid over-amplifying ${cautionElements.join(", ")} energy if it already feels excessive.`
    : "";

  return `${topRecommendation} is recommended as the main support because your chart benefits from strengthening ${supportText} energy this year. This supports ${ELEMENT_FOCUS[primaryElement] || "overall energetic balance"}. ${annualFocus}.${cautionText}`;
}

function cleanElements(elements = []) {
  return elements
    .filter(Boolean)
    .map((element) => String(element).trim())
    .filter((element) => STONE_BY_ELEMENT[element]);
}