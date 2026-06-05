const ELEMENT_CONTROLS = {
  Wood: "Earth",
  Fire: "Metal",
  Earth: "Water",
  Metal: "Wood",
  Water: "Fire",
};

const ELEMENT_GENERATES = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood",
};

function getProducingElement(element) {
  return Object.keys(ELEMENT_GENERATES).find(
    (producer) => ELEMENT_GENERATES[producer] === element
  );
}

function getControlledElement(element) {
  return ELEMENT_CONTROLS[element];
}

function getControllingElement(element) {
  return Object.keys(ELEMENT_CONTROLS).find(
    (controller) => ELEMENT_CONTROLS[controller] === element
  );
}

export function calculateUsefulGodV3(dayMasterStrengthV3) {
  const dayElement = dayMasterStrengthV3?.dayElement;
  const score = dayMasterStrengthV3?.score ?? 0;

  if (!dayElement) {
    return {
      primaryUsefulElement: null,
      secondaryUsefulElement: null,
      avoidElements: [],
      strategy: "Unknown",
      explanation: "Day Master element could not be determined.",
    };
  }

  const resourceElement = getProducingElement(dayElement);
  const outputElement = ELEMENT_GENERATES[dayElement];
  const wealthElement = getControlledElement(dayElement);
  const officerElement = getControllingElement(dayElement);

  if (score < 43) {
    return {
      strengthState: dayMasterStrengthV3.label,
      strategy: "Support the Day Master first",
      primaryUsefulElement: resourceElement,
      secondaryUsefulElement: dayElement,
      favourableElements: [resourceElement, dayElement],
      avoidElements: [wealthElement, officerElement],
      explanation:
        "When the Day Master is weak, the priority is to restore support and stability before adding pressure, wealth pursuit or control elements.",
    };
  }

  if (score <= 58) {
    return {
      strengthState: dayMasterStrengthV3.label,
      strategy: "Maintain balance",
      primaryUsefulElement: outputElement,
      secondaryUsefulElement: wealthElement,
      favourableElements: [outputElement, wealthElement],
      avoidElements: [],
      explanation:
        "When the Day Master is balanced, expression and practical output can be used to move energy productively without overloading the chart.",
    };
  }

  return {
    strengthState: dayMasterStrengthV3.label,
    strategy: "Drain and regulate excess strength",
    primaryUsefulElement: outputElement,
    secondaryUsefulElement: wealthElement,
    favourableElements: [outputElement, wealthElement, officerElement],
    avoidElements: [resourceElement, dayElement],
    explanation:
      "When the Day Master is strong, output, wealth and structure help regulate excess self or resource energy into useful action.",
  };
}