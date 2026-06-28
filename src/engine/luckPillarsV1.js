// src/engine/luckPillarsV1.js

import { HEAVENLY_STEMS, EARTHLY_BRANCHES, getStemIndex, getBranchIndex, cycleMod } from "../data/baziConstants.js";
import { buildPillar } from "./pillars.js";
import { calculateTenGod } from "./tenGods.js";
import { getNearestJieTerm } from "../data/solarTerms.js";

const VERSION = "luck-pillars-v1";
const PILLAR_COUNT = 9;
const YEARS_PER_PILLAR = 10;

function isForwardDirection(yearStemPolarity, gender) {
  const isMale = String(gender || "").toLowerCase() === "male";
  const isYangYear = yearStemPolarity === "Yang";

  // Yang year stem + Male, or Yin year stem + Female -> forward.
  // Yin year stem + Male, or Yang year stem + Female -> reverse.
  return isYangYear ? isMale : !isMale;
}

// Day-distance to age: 3 days = 1 year (so 1 day = 4 months).
function dayDistanceToAge(dayDistance) {
  const years = Math.floor(dayDistance / 3);
  let months = Math.round((dayDistance - years * 3) * 4);

  let adjustedYears = years;
  if (months >= 12) {
    adjustedYears += 1;
    months -= 12;
  }

  return {
    years: adjustedYears,
    months,
    decimalYears: Number((dayDistance / 3).toFixed(2)),
  };
}

function addAge(age, yearsToAdd) {
  return { years: age.years + yearsToAdd, months: age.months };
}

export function buildLuckPillarsV1({ pillars, normalizedInput }) {
  if (!pillars?.year || !pillars?.month || !pillars?.day) return null;

  const direction = isForwardDirection(
    pillars.year.stem.polarity,
    normalizedInput?.gender
  )
    ? "forward"
    : "backward";

  const nearest = getNearestJieTerm(
    normalizedInput.year,
    normalizedInput.month,
    normalizedInput.day,
    normalizedInput.hour ?? 0,
    normalizedInput.minute ?? 0,
    direction
  );

  if (!nearest) return null;

  const startingAge = dayDistanceToAge(nearest.dayDistance);

  const monthStemIndex = getStemIndex(pillars.month.stem.key);
  const monthBranchIndex = getBranchIndex(pillars.month.branch.key);
  const step = direction === "forward" ? 1 : -1;

  const luckPillars = [];

  for (let i = 1; i <= PILLAR_COUNT; i++) {
    const stemIndex = cycleMod(monthStemIndex + step * i, 10);
    const branchIndex = cycleMod(monthBranchIndex + step * i, 12);
    const stemKey = HEAVENLY_STEMS[stemIndex].key;
    const branchKey = EARTHLY_BRANCHES[branchIndex].key;

    const pillarStartAge = addAge(startingAge, (i - 1) * YEARS_PER_PILLAR);
    const pillarEndAge = addAge(startingAge, i * YEARS_PER_PILLAR);

    luckPillars.push({
      pillar: buildPillar({ stemKey, branchKey }),
      startAge: { years: pillarStartAge.years, months: pillarStartAge.months },
      endAge: { years: pillarEndAge.years, months: pillarEndAge.months },
      tenGod: calculateTenGod(pillars.day.stem.key, stemKey),
    });
  }

  return {
    version: VERSION,
    direction,
    startingAge,
    pillars: luckPillars,
    debug: {
      direction,
      startingDayDistance: Number(nearest.dayDistance.toFixed(3)),
      jieTermUsed: nearest.term.label,
      jieTermTimestamp: nearest.term.timestamp,
      note: "LuckPillarsV1 reads pillars and useful-god output but does not affect them.",
    },
  };
}

export default buildLuckPillarsV1;
