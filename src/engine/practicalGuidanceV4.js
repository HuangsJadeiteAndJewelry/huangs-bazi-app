// /engine/practicalGuidanceV4.js

function getPrimarySupportElement(chart = {}) {
  return (
    chart?.energyStrategy?.primarySupportElement ||
    chart?.energyStrategy?.supportiveElements?.[0] ||
    chart?.elements?.supportiveElements?.[0] ||
    null
  );
}

function getCautionElement(chart = {}) {
  return (
    chart?.energyStrategy?.cautionElements?.[0] ||
    chart?.elements?.cautionElements?.[0] ||
    null
  );
}

function buildArea(title, summary, guidance, watchOut, action) {
  return {
    focus: title,
    title,
    status: "Personalised",
    explanation: summary,
    bullets: [guidance, watchOut, action],

    summary,
    guidance,
    watchOut,
    action,

    description: summary,
    advice: guidance,
    caution: watchOut,
    recommendedAction: action,
  };
}

export function buildPracticalGuidanceV4(chart = {}) {
  const support = getPrimarySupportElement(chart);
  const caution = getCautionElement(chart);

  const supportText = support || "your supportive energy";
  const cautionText = caution || "overextended energy";

    const career = buildArea(
  "Career Direction",
  `Your career grows best when you lean into ${supportText} qualities.`,
  "Choose work that helps you feel more regulated, focused, and naturally useful instead of forcing constant output.",
  `Be careful of environments that trigger too much ${cautionText}, as this may make you feel drained or reactive.`,
  "Prioritise roles, projects, or content directions where your natural strengths can be expressed consistently."
);

const wealth = buildArea(
  "Wealth Strategy",
  `Your wealth path improves when your decisions are guided by ${supportText}, not pressure.`,
  "Focus on steady accumulation, clear positioning, and value creation rather than chasing every opportunity.",
  `Avoid making money decisions when ${cautionText} is activated, especially if you feel rushed, anxious, or overly excited.`,
  "Build wealth through repeatable systems, client trust, and offers that feel aligned with your energy."
);

const relationship = buildArea(
  "Relationship Pattern",
  `You feel safest in relationships that bring out your ${supportText} side.`,
  "The right connections should help you feel emotionally steadier, softer, and more honest with yourself.",
  `Be mindful of people or dynamics that amplify ${cautionText}, especially if you feel you must prove, chase, or defend yourself.`,
  "Choose relationships where consistency, emotional safety, and mutual respect are present."
);

const wellness = buildArea(
  "Wellness Focus",
  `Your body and emotions benefit from strengthening ${supportText}.`,
  "Support your daily rhythm with habits that calm your nervous system and reduce unnecessary intensity.",
  `Too much ${cautionText} may show up as restlessness, tension, emotional overload, or difficulty slowing down.`,
  "Use sleep, hydration, movement, and quiet routines as your foundation before adding more productivity."
);

return {
  version: "practical-guidance-v4",

  career,
  wealth,
  relationship,
  wellness,

  guidanceCards: [career, wealth, relationship, wellness],
  cards: [career, wealth, relationship, wellness],
  items: [career, wealth, relationship, wellness],
};
}