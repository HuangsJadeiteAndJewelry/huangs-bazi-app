import { ELEMENTS, GENERATES, CONTROLS } from "../data/baziConstants.js";

function getElementThatControls(element) {
  return ELEMENTS.find((candidate) => CONTROLS[candidate] === element);
}

function getElementThatGenerates(element) {
  return ELEMENTS.find((candidate) => GENERATES[candidate] === element);
}

export function calculateUsefulGodSuggestion(dayMasterStrength, elementBalance) {
  const { selfElement, resourceElement, category } = dayMasterStrength;

  const outputElement = GENERATES[selfElement];
  const wealthElement = CONTROLS[selfElement];
  const officerElement = getElementThatControls(selfElement);

  let usefulElements = [];
  let avoidElements = [];

  if (category === "Strong") {
    usefulElements = [outputElement, wealthElement, officerElement];
    avoidElements = [selfElement, resourceElement];
  }

  if (category === "Weak") {
    usefulElements = [selfElement, resourceElement];
    avoidElements = [outputElement, wealthElement, officerElement];
  }

  if (category === "Balanced") {
    const weakestElements = Object.entries(elementBalance.percentages)
      .sort((a, b) => a[1] - b[1])
      .map(([element]) => element);

    usefulElements = weakestElements.slice(0, 2);
    avoidElements = [];
  }

  return {
    method: "simple-prototype",
    usefulElements: [...new Set(usefulElements)].filter(Boolean),
    avoidElements: [...new Set(avoidElements)].filter(Boolean),
    note: "Prototype useful element suggestion only. Final Yong Shen logic should be reviewed manually before production use.",
  };
}