const STONES_BY_ELEMENT = {
  Water: [
    {
      name: "Aquamarine",
      element: "Water",
      supportLabel: "Water Support",
      meaning: "Emotional regulation, calm communication and recovery",
      bestFor: "When the chart needs more flow, adaptability and emotional steadiness",
    },
    {
      name: "Blue Topaz",
      element: "Water",
      supportLabel: "Water Support",
      meaning: "Clarity, cooling energy and smoother expression",
      bestFor: "When Fire activation feels too intense or mentally overstimulating",
    },
    {
      name: "Lapis Lazuli",
      element: "Water",
      supportLabel: "Water Support",
      meaning: "Inner wisdom, truth and calmer decision-making",
      bestFor: "When the person needs deeper reflection before acting",
    },
  ],

  Wood: [
    {
      name: "Jadeite",
      element: "Wood",
      supportLabel: "Wood Support",
      meaning: "Growth, renewal and long-term development",
      bestFor: "When the chart needs direction, flexibility and steady personal growth",
    },
    {
      name: "Green Aventurine",
      element: "Wood",
      supportLabel: "Wood Support",
      meaning: "Opportunity, openness and gentle progress",
      bestFor: "When the person needs smoother growth without forcing outcomes",
    },
    {
      name: "Peridot",
      element: "Wood",
      supportLabel: "Wood Support",
      meaning: "Fresh momentum and emotional lightness",
      bestFor: "When the chart feels stagnant or overly serious",
    },
  ],

  Fire: [
    {
      name: "Garnet",
      element: "Fire",
      supportLabel: "Fire Support",
      meaning: "Motivation, warmth and courage",
      bestFor: "When the chart needs confidence, drive and stronger visibility",
    },
    {
      name: "Sunstone",
      element: "Fire",
      supportLabel: "Fire Support",
      meaning: "Optimism, expression and positive momentum",
      bestFor: "When the person needs more joy, presence and external activation",
    },
    {
      name: "Carnelian",
      element: "Fire",
      supportLabel: "Fire Support",
      meaning: "Action, creativity and expressive confidence",
      bestFor: "When the chart needs movement and creative courage",
    },
  ],

  Earth: [
    {
      name: "Citrine",
      element: "Earth",
      supportLabel: "Earth Support",
      meaning: "Stability, responsibility and grounded confidence",
      bestFor: "When the person needs more structure, steadiness and practical focus",
    },
    {
      name: "Yellow Jade",
      element: "Earth",
      supportLabel: "Earth Support",
      meaning: "Calm support, patience and emotional grounding",
      bestFor: "When the chart needs more balance, routine and inner stability",
    },
    {
      name: "Tiger Eye",
      element: "Earth",
      supportLabel: "Earth Support",
      meaning: "Discipline, courage and practical decision-making",
      bestFor: "When the person needs to stay grounded while taking action",
    },
  ],

  Metal: [
    {
      name: "Clear Quartz",
      element: "Metal",
      supportLabel: "Metal Support",
      meaning: "Clarity, refinement and focus",
      bestFor: "When the chart needs cleaner boundaries and sharper decisions",
    },
    {
      name: "White Topaz",
      element: "Metal",
      supportLabel: "Metal Support",
      meaning: "Precision, discipline and mental clarity",
      bestFor: "When the person needs structure without emotional clutter",
    },
    {
      name: "Moonstone",
      element: "Metal",
      supportLabel: "Metal Support",
      meaning: "Soft clarity, intuition and emotional refinement",
      bestFor: "When Metal support is needed in a gentler form",
    },
  ],
};

const ELEMENT_BENEFITS = {
  Wood: "Growth",
  Fire: "Confidence",
  Earth: "Stability",
  Metal: "Clarity",
  Water: "Emotional Balance",
};

const ARCHETYPE_STONE_PERSONALITY = {
  hurtingOfficer: ["Blue Topaz", "Clear Quartz", "Aquamarine"],
  eatingGod: ["Sunstone", "Carnelian", "Jadeite"],
  friend: ["Jadeite", "Aquamarine", "Yellow Jade"],
  robWealth: ["Tiger Eye", "Clear Quartz", "Pyrite"],
  directWealth: ["Citrine", "Tiger Eye", "Golden Rutilated Quartz"],
  indirectWealth: ["Green Aventurine", "Peridot", "Sunstone"],
  directOfficer: ["Clear Quartz", "White Topaz", "Tiger Eye"],
  sevenKilling: ["Garnet", "Tiger Eye", "Clear Quartz"],
  directResource: ["Aquamarine", "Moonstone", "Yellow Jade"],
  indirectResource: ["Lapis Lazuli", "Moonstone", "Labradorite"],
};

function findStonesByNames(names = []) {
  const allStones = Object.values(STONES_BY_ELEMENT).flat();

  return names
    .map((name) => allStones.find((stone) => stone.name === name))
    .filter(Boolean);
}

function scoreSupportElements({
  usefulGodV3,
  elementBalanceV3,
  annualOverlayV3,
}) {
  const scores = {
    Wood: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0,
  };

  const primary = usefulGodV3?.primaryUsefulElement;
  const secondary = usefulGodV3?.secondaryUsefulElement;
  const favourable = usefulGodV3?.favourableElements || [];
  const avoid = usefulGodV3?.avoidElements || [];
  const weakest = elementBalanceV3?.weakestElement?.element;
  const dominant = elementBalanceV3?.dominantElement?.element;
  const annualElements = annualOverlayV3?.amplifiedElements || [];

  if (primary) scores[primary] += 40;
  if (secondary) scores[secondary] += 25;

  favourable.forEach((el) => {
    scores[el] += 10;
  });

  if (weakest) scores[weakest] += 12;

  annualElements.forEach((el) => {
    scores[el] += 6;
  });

  if (dominant) scores[dominant] -= 10;

  avoid.forEach((el) => {
    scores[el] -= 30;
  });

  return Object.entries(scores)
    .map(([element, score]) => ({ element, score }))
    .sort((a, b) => b.score - a.score);
}

export function buildStoneRecommendationsV3({
  dayMasterStrengthV3,
  usefulGodV3,
  elementBalanceV3,
  annualOverlayV3,
  archetypeOverlayV3,
}) {
  const elementScores = scoreSupportElements({
  usefulGodV3,
  elementBalanceV3,
  annualOverlayV3,
});

const positiveElements = elementScores.filter((item) => item.score > 0);

const primaryElement = positiveElements[0]?.element || "Water";
const secondaryElement = positiveElements[1]?.element || "";
const tertiaryElement = positiveElements[2]?.element || "";

  const avoidElements = usefulGodV3?.avoidElements || [];

  const strengthLabel =
    dayMasterStrengthV3?.label ||
    dayMasterStrengthV3?.status ||
    usefulGodV3?.strengthState ||
    "";

  const dominantElement =
    elementBalanceV3?.dominantElement?.element || "";

  const weakestElement =
    elementBalanceV3?.weakestElement?.element || "";

  const annualElements =
    annualOverlayV3?.amplifiedElements || [];

  const annualTheme =
    annualOverlayV3?.annualTheme || "annual energy shift";

    const dominantArchetypeKey =
  archetypeOverlayV3?.dominantArchetype?.key || "";

const dominantArchetypeName =
  archetypeOverlayV3?.dominantArchetype?.publicName || "";

  const ARCHETYPE_STONE_BOOSTS = {
  hurtingOfficer: ["Water", "Metal"],
  eatingGod: ["Wood", "Fire"],
  friend: ["Wood", "Water"],
  robWealth: ["Metal", "Earth"],
  directWealth: ["Earth", "Metal"],
  indirectWealth: ["Wood", "Fire"],
  directOfficer: ["Metal", "Earth"],
  sevenKilling: ["Water", "Metal"],
  directResource: ["Water", "Wood"],
  indirectResource: ["Water", "Metal"],
};

const archetypeBoostElements =
  ARCHETYPE_STONE_BOOSTS[dominantArchetypeKey] || [];

  const primaryStones = STONES_BY_ELEMENT[primaryElement] || [];
  const secondaryStones = STONES_BY_ELEMENT[secondaryElement] || [];
const tertiaryStones = STONES_BY_ELEMENT[tertiaryElement] || [];

const archetypeElementStones = archetypeBoostElements.flatMap(
  (element) => STONES_BY_ELEMENT[element] || []
);

const archetypePersonalityStones = findStonesByNames(
  ARCHETYPE_STONE_PERSONALITY[dominantArchetypeKey] || []
);

const archetypeStones = [
  ...archetypeElementStones,
  ...archetypePersonalityStones,
];

const recommendedStoneDetails = [
  ...primaryStones,
  ...secondaryStones,
  ...tertiaryStones,
  ...archetypeStones,
]
  .filter(
    (stone, index, self) =>
      index === self.findIndex((item) => item.name === stone.name)
  )
  .slice(0, 6);

  const topRecommendation =
    recommendedStoneDetails[0]?.name || "Aquamarine";

  return {
  primaryElement,
  secondaryElement,

  supportElements: [
    primaryElement,
    secondaryElement,
    tertiaryElement,
  ].filter(Boolean),

  supportBenefits: [primaryElement, secondaryElement]

    .map((element) => ELEMENT_BENEFITS[element])
    .filter(Boolean),

  energyStrategy: {
    weakestElement,
    dominantElement,
    primarySupport: primaryElement,
    secondarySupport: secondaryElement,
    annualInfluence: annualElements,
    avoidElements,
  },

  elementScores,

  cautionElements: avoidElements,

    topRecommendation,

    recommendedStones: recommendedStoneDetails.map((stone) => stone.name),

    annualFocus: buildAnnualFocus({
      annualTheme,
      annualElements,
      primaryElement,
    }),

    explanation: buildExplanation({
  topRecommendation,
  primaryElement,
  secondaryElement,
  strengthLabel,
  dominantElement,
  weakestElement,
  annualElements,
  avoidElements,
  dominantArchetypeKey,
  dominantArchetypeName,
}),

    stoneDetails: recommendedStoneDetails,

    method: "engine-v4.1-stones-archetype-alignment",
  };
}

function buildAnnualFocus({
  annualTheme,
  annualElements,
  primaryElement,
}) {
  const elementsText = annualElements.length
    ? annualElements.join(" and ")
    : "the annual energy";

  if (annualElements.includes("Fire")) {
    return `This year carries stronger Fire activation, increasing visibility, momentum and emotional intensity. ${primaryElement} support helps keep that energy balanced and sustainable.`;
  }

  if (annualElements.includes("Metal")) {
    return `This year carries stronger Metal influence, increasing discipline, pressure and decision-making. ${primaryElement} support helps prevent the energy from becoming overly rigid.`;
  }

  if (annualElements.includes("Earth")) {
    return `This year carries stronger Earth influence, increasing responsibility, stability needs and practical pressure. ${primaryElement} support helps maintain flexibility and flow.`;
  }

  if (annualElements.includes("Water")) {
    return `This year carries stronger Water influence, increasing reflection, intuition and emotional processing. ${primaryElement} support helps keep the emotional flow steady.`;
  }

  if (annualElements.includes("Wood")) {
    return `This year carries stronger Wood influence, increasing growth, change and expansion. ${primaryElement} support helps growth remain sustainable rather than scattered.`;
  }

  return `This year carries a ${annualTheme} pattern, so ${primaryElement} support helps balance ${elementsText}.`;
}

function buildExplanation({
  topRecommendation,
  primaryElement,
  secondaryElement,
  strengthLabel,
  dominantElement,
  weakestElement,
  annualElements,
  avoidElements,
  dominantArchetypeKey,
  dominantArchetypeName,
}) {
  const parts = [];

  parts.push(
    `${topRecommendation} is recommended as the main support because your chart benefits from strengthening ${primaryElement}${
      secondaryElement ? ` and ${secondaryElement}` : ""
    } energy.`
  );

if (dominantArchetypeName) {
  parts.push(
    `Because your dominant archetype is ${dominantArchetypeName}, this recommendation also supports how you naturally make decisions, express yourself and create opportunities.`
  );
}

  if (strengthLabel.toLowerCase().includes("weak")) {
    parts.push(
      `Because the Day Master is weaker, the priority is to restore support before adding more pressure, output or wealth pursuit.`
    );
  }

  if (dominantElement && weakestElement) {
    parts.push(
      `Your current balance shows stronger ${dominantElement} energy and weaker ${weakestElement} energy, so the recommendation focuses on restoring balance rather than simply adding more intensity.`
    );
  }

  if (annualElements.length) {
    parts.push(
      `The annual cycle also amplifies ${annualElements.join(
        " and "
      )}, so your stone support should help regulate that influence.`
    );
  }

  if (avoidElements.length) {
    parts.push(
      `At the same time, avoid over-amplifying ${avoidElements.join(
        " and "
      )} energy if it already feels excessive.`
    );
  }

  if (dominantArchetypeName) {
  parts.push(
    `Because your dominant archetype is ${dominantArchetypeName}, the recommendation also prioritises stones that support how you naturally make decisions, build relationships and create opportunities.`
  );
}

  return parts.join(" ");
}