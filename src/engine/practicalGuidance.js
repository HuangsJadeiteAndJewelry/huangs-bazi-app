export function buildPracticalGuidance({
  dayMasterStrength,
  usefulGodSuggestion,
  annualOverlay,
  adjustedArchetypes,
  elementBalance,
}) {
  const supportive = usefulGodSuggestion?.supportiveElements || [];
  const caution = usefulGodSuggestion?.cautionElements || [];

  const annualTheme =
    annualOverlay?.dominantTheme ||
    annualOverlay?.theme ||
    "yearly energy adjustment";

  const coreStatus =
    dayMasterStrength?.status ||
    dayMasterStrength?.coreEnergyStatus ||
    "Balanced";

  const dominantArchetype =
    adjustedArchetypes?.[0]?.name ||
    adjustedArchetypes?.[0]?.title ||
    "Core Self";

  const percentages = elementBalance?.percentages || {};

  const strongestElement = getStrongestElement(percentages);
  const weakestElement = getWeakestElement(percentages);

  const scores = calculateLifeThemeScores({
  percentages,
  annualTheme,
  coreStatus,
  supportive,
  caution,
});

  const isHighActivation =
    coreStatus === "Strong" ||
    coreStatus === "Excessive" ||
    annualTheme.toLowerCase().includes("activation");

  const isNeedsSupport =
    coreStatus === "Weak" ||
    coreStatus === "Challenged" ||
    supportive.length > 0;

  return {
    career: buildCareerGuidance({
  annualTheme,
  coreStatus,
  dominantArchetype,
  strongestElement,
  weakestElement,
  isHighActivation,
  isNeedsSupport,
  score: scores.career,
}),

    wealth: buildWealthGuidance({
  annualTheme,
  coreStatus,
  supportive,
  caution,
  strongestElement,
  isHighActivation,
  score: scores.wealth,
}),

    relationship: buildRelationshipGuidance({
  annualTheme,
  coreStatus,
  strongestElement,
  weakestElement,
  isHighActivation,
  isNeedsSupport,
  score: scores.relationship,
}),

    health: buildHealthGuidance({
  annualTheme,
  coreStatus,
  supportive,
  caution,
  strongestElement,
  weakestElement,
  isHighActivation,
  isNeedsSupport,
  score: scores.health,
}),

    supportiveElements: supportive,
    cautionElements: caution,
    method: "engine-v2-practical-guidance",
  };
}

function buildCareerGuidance({
  annualTheme,
  coreStatus,
  dominantArchetype,
  strongestElement,
  weakestElement,
  isHighActivation,
  isNeedsSupport,
  score,
}) {
  if (isHighActivation) {
    return {
      title: "Visibility With Boundaries",
      focus: "Career",
      score,
      status: "High Activation",
      bullets: [
        "More visibility and responsibility may come through this year",
        "Good year to take initiative, but avoid taking on everything alone",
        "Choose projects that build long-term reputation, not just short-term pressure",
        "Create clearer boundaries around workload and response time",
      ],
      explanation: `This year may increase visibility, expectations or pressure at work. Your ${dominantArchetype} side can become more noticeable, but sustainable pacing matters so the year does not become mentally draining.`,
    };
  }

  if (isNeedsSupport) {
    return {
      title: "Build Stability Before Expansion",
      focus: "Career",
      score,
      status: "Steady Growth",
      bullets: [
        "Focus on strengthening your foundation before chasing bigger moves",
        "Work benefits from structure, preparation and reliable support",
        "Avoid comparing your pace with others this year",
        "Choose consistency over sudden overextension",
      ],
      explanation: `This year is better for stabilising your direction and strengthening your working rhythm. If ${weakestElement} energy is weaker, recovery and consistency become more important than forcing fast progress.`,
    };
  }

  return {
    title: "Steady Progress & Clear Direction",
    focus: "Career",
    score,
    status: "Balanced",
    bullets: [
      "Good year to refine your direction and improve your work systems",
      "Progress comes through consistency rather than rushing",
      "Stay visible, but keep your workload realistic",
      "Focus on work that aligns with your long-term identity",
    ],
    explanation: `Your career energy looks relatively balanced this year. The main focus is to use the annual ${annualTheme} influence to refine your direction without overcomplicating your responsibilities.`,
  };
}

function buildWealthGuidance({
  annualTheme,
  coreStatus,
  supportive,
  caution,
  strongestElement,
  isHighActivation,
  score,
}) {
  if (isHighActivation) {
    return {
      title: "Opportunity With Control",
      focus: "Wealth",
      score,
      status: "Active",
      bullets: [
        "Opportunities may appear, but avoid impulsive financial decisions",
        "Good year to improve income channels through visibility or initiative",
        "Separate real opportunity from emotional urgency",
        "Plan before making bigger purchases, investments or commitments",
      ],
      explanation: `The year can bring movement around wealth and opportunity, but high activation also increases the risk of acting too quickly. Wealth luck is stronger when decisions are paced and supported by clear planning.`,
    };
  }

  if (supportive.length > 0) {
    return {
      title: "Planning Before Expansion",
      focus: "Wealth",
      score,
      status: "Moderate",
      bullets: [
        "Focus on wealth retention, not only wealth growth",
        "Plan larger financial moves carefully before committing",
        "Build savings, buffers and clearer spending priorities",
        "Use supportive elements to stabilise decision-making and confidence",
      ],
      explanation: `This year supports gradual financial improvement, but the priority is to avoid leaking energy or money through scattered decisions. Supportive elements such as ${formatElements(supportive)} can help restore balance.`,
    };
  }

  return {
    title: "Stable Wealth Management",
    focus: "Wealth",
    score,
    status: "Stable",
    bullets: [
      "Good year to review financial habits and commitments",
      "Avoid making decisions only because of external pressure",
      "Focus on realistic, repeatable income growth",
      "Keep spending aligned with your actual priorities",
    ],
    explanation: `Wealth energy is best handled through steady planning this year. The annual ${annualTheme} influence may bring movement, but careful pacing helps you keep control.`,
  };
}

function buildRelationshipGuidance({
  annualTheme,
  coreStatus,
  strongestElement,
  weakestElement,
  isHighActivation,
  isNeedsSupport,
  score,
}) {
  if (isHighActivation) {
    return {
      title: "Clear Expression, Softer Delivery",
      focus: "Relationship",
      score,
      status: "Sensitive Period",
      bullets: [
        "Emotions may come through more strongly this year",
        "Avoid reacting too quickly during tense conversations",
        "Speak clearly, but leave space for the other person’s perspective",
        "Choose emotional honesty over silent expectation",
      ],
      explanation: `This year can make expression stronger, which is useful for honesty but may also create misunderstandings if emotions move too quickly. A softer delivery helps relationships stay balanced.`,
    };
  }

  if (isNeedsSupport) {
    return {
      title: "Emotional Support & Reassurance",
      focus: "Relationship",
      score,
      status: "Needs Warmth",
      bullets: [
        "Relationships benefit from reassurance and clearer communication",
        "Do not carry everything internally without explaining your needs",
        "Avoid withdrawing when you feel emotionally tired",
        "Prioritise people who feel steady and safe to be around",
      ],
      explanation: `If ${weakestElement} energy is weaker this year, emotional recovery and communication may need more care. Supportive relationships should feel grounding, not draining.`,
    };
  }

  return {
    title: "Balanced Communication",
    focus: "Relationship",
    score,
    status: "Stable",
    bullets: [
      "Good year to communicate more directly and calmly",
      "Focus on mutual understanding instead of guessing",
      "Let relationships develop through consistency",
      "Avoid overthinking every small emotional signal",
    ],
    explanation: `Relationship energy is relatively balanced this year. The focus is on steady communication, emotional clarity and choosing connections that support your overall direction.`,
  };
}

function buildHealthGuidance({
  annualTheme,
  coreStatus,
  supportive,
  caution,
  strongestElement,
  weakestElement,
  isHighActivation,
  isNeedsSupport,
  score,
}) {
  if (isHighActivation) {
    return {
      title: "Rest & Recovery Rhythm",
      focus: "Health",
      score,
      status: "Needs Attention",
      bullets: [
        "Energy may fluctuate more when responsibilities increase",
        "Watch stress, sleep quality and emotional overheating",
        "Build simple recovery habits into your daily routine",
        "Avoid pushing through tiredness for too long",
      ],
      explanation: `This year can create stronger activation, so the body may need more deliberate recovery. Rest, hydration, sleep rhythm and stress regulation become especially important.`,
    };
  }

  if (isNeedsSupport) {
    return {
      title: "Rebuild Energy Reserves",
      focus: "Health",
      score,
      status: "Support Needed",
      bullets: [
        "Focus on restoring energy rather than forcing productivity",
        "Prioritise sleep, digestion, hydration and emotional regulation",
        "Avoid inconsistent routines that drain your baseline energy",
        "Support weaker elements through lifestyle rhythm and environment",
      ],
      explanation: `Your chart may need more support this year, especially if ${weakestElement} energy is low. Health guidance should focus on recovery, stability and reducing unnecessary strain.`,
    };
  }

  return {
    title: "Maintain Daily Balance",
    focus: "Health",
    score,
    status: "Stable",
    bullets: [
      "Keep a steady rhythm for sleep, food and movement",
      "Do not wait until burnout before resting",
      "Maintain emotional balance through simple grounding routines",
      "Small consistent habits matter more than extreme changes",
    ],
    explanation: `Health energy is relatively manageable this year, but balance still needs maintenance. The annual ${annualTheme} influence is easier to handle when your daily rhythm is stable.`,
  };
}

function getStrongestElement(percentages = {}) {
  const entries = Object.entries(percentages);
  if (!entries.length) return "";

  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

function getWeakestElement(percentages = {}) {
  const entries = Object.entries(percentages);
  if (!entries.length) return "";

  return entries.sort((a, b) => a[1] - b[1])[0][0];
}

function formatElements(elements = []) {
  if (!elements.length) return "your supportive elements";
  return elements.join(", ");
}

function calculateLifeThemeScores({
  percentages = {},
  annualTheme = "",
  coreStatus = "Balanced",
  supportive = [],
  caution = [],
}) {
  const wood = Number(percentages.Wood || 0);
  const fire = Number(percentages.Fire || 0);
  const earth = Number(percentages.Earth || 0);
  const metal = Number(percentages.Metal || 0);
  const water = Number(percentages.Water || 0);

  const activationBoost = annualTheme.toLowerCase().includes("visibility") ||
    annualTheme.toLowerCase().includes("activation")
    ? 8
    : 0;

  const weakPenalty = coreStatus === "Weak" || coreStatus === "Challenged" ? -8 : 0;
  const strongBoost = coreStatus === "Strong" || coreStatus === "Excessive" ? 6 : 0;

  const career = clampScore(
    45 + fire * 0.6 + wood * 0.4 + metal * 0.25 + activationBoost + strongBoost
  );

  const wealth = clampScore(
    42 + metal * 0.55 + earth * 0.35 + fire * 0.2 + weakPenalty
  );

  const relationship = clampScore(
    45 + water * 0.45 + wood * 0.35 + fire * 0.2 - metal * 0.15
  );

  const health = clampScore(
    55 + water * 0.35 + earth * 0.35 - fire * 0.25 + weakPenalty
  );

  return {
    career: adjustForSupportAndCaution(career, "Fire", supportive, caution),
    wealth: adjustForSupportAndCaution(wealth, "Metal", supportive, caution),
    relationship: adjustForSupportAndCaution(relationship, "Water", supportive, caution),
    health: adjustForSupportAndCaution(health, "Earth", supportive, caution),
  };
}

function adjustForSupportAndCaution(score, element, supportive = [], caution = []) {
  let adjusted = score;

  if (supportive.includes(element)) adjusted += 5;
  if (caution.includes(element)) adjusted -= 6;

  return clampScore(adjusted);
}

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}