// /src/engine/tenGodCalculator.js

import { normalizePillars } from "./normalizePillars.js";

const ELEMENT_GENERATES = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood",
};

const ELEMENT_CONTROLS = {
  Wood: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Wood",
};

function getProducedElement(element) {
  return ELEMENT_GENERATES[element];
}

function getControlledElement(element) {
  return ELEMENT_CONTROLS[element];
}

function getControllingElement(element) {
  return Object.keys(ELEMENT_CONTROLS).find(
    (controller) => ELEMENT_CONTROLS[controller] === element
  );
}

function getProducingElement(element) {
  return Object.keys(ELEMENT_GENERATES).find(
    (producer) => ELEMENT_GENERATES[producer] === element
  );
}

export function getTenGodKey(dayStem, targetStem) {
  if (!dayStem || !targetStem) return null;

  const dayElement = dayStem.element;
  const targetElement = targetStem.element;
  const dayPolarity = dayStem.polarity;
  const targetPolarity = targetStem.polarity;

  if (!dayElement || !targetElement || !dayPolarity || !targetPolarity) {
    return null;
  }

  const samePolarity = dayPolarity === targetPolarity;

  if (targetElement === dayElement) {
    return samePolarity ? "friend" : "robwealth";
  }

  if (targetElement === getProducedElement(dayElement)) {
    return samePolarity ? "eatingGod" : "hurtingOfficer";
  }

  if (targetElement === getControlledElement(dayElement)) {
    return samePolarity ? "indirectWealth" : "directWealth";
  }

  if (targetElement === getControllingElement(dayElement)) {
    return samePolarity ? "sevenKillings" : "directOfficer";
  }

  if (targetElement === getProducingElement(dayElement)) {
    return samePolarity ? "indirectResource" : "directResource";
  }

  return null;
}

export function calculateTenGods(pillars) {
  const normalized = normalizePillars(pillars);
  const dayStem = normalized?.day?.stem;

  if (!dayStem?.key) {
    return {
      dayStem: null,
      byPillar: {},
      error: "Missing day stem",
    };
  }

  const byPillar = {};

  ["year", "month", "day", "hour"].forEach((position) => {
    const pillar = normalized[position];

    if (!pillar) {
      byPillar[position] = null;
      return;
    }

    const stemTenGod =
      position === "day" ? "self" : getTenGodKey(dayStem, pillar.stem);

    const hiddenStemTenGods = pillar.hiddenStems.map((hiddenStem) => ({
      ...hiddenStem,
      tenGod: getTenGodKey(dayStem, hiddenStem),
    }));

    byPillar[position] = {
      stem: pillar.stem,
      branch: pillar.branch,
      stemTenGod,
      hiddenStemTenGods,
    };
  });

  return {
    dayStem,
    byPillar,
  };
}