// src/engine/lifePalaceV1.js

import { HEAVENLY_STEMS, EARTHLY_BRANCHES, getStemIndex, getBranchIndex, cycleMod } from "../data/baziConstants.js";
import { buildPillar, getFiveTigersStem } from "./pillars.js";

// Life Palace (命宮) uses a branch-numbering convention different from this
// codebase's EARTHLY_BRANCHES array (Zi=0...Hai=11): classically Yin=1,
// Mao=2, ... Zi=11, Chou=12. Convert between the two rather than reusing
// getBranchIndex() output directly in the formula below.
function toLifePalaceScheme(codebaseBranchIndex) {
  return cycleMod(codebaseBranchIndex - 2, 12) + 1;
}

function fromLifePalaceScheme(schemeIndex) {
  return cycleMod(schemeIndex + 1, 12);
}

export function buildLifePalaceV1({ pillars }) {
  if (!pillars?.year || !pillars?.month || !pillars?.hour) return null;

  const monthScheme = toLifePalaceScheme(getBranchIndex(pillars.month.branch.key));
  const hourScheme = toLifePalaceScheme(getBranchIndex(pillars.hour.branch.key));

  const sum = monthScheme + hourScheme;
  const base = sum < 14 ? 14 : 26;
  const resultScheme = base - sum;

  const branchIndex = fromLifePalaceScheme(resultScheme);
  const branchKey = EARTHLY_BRANCHES[branchIndex].key;
  const stemKey = getFiveTigersStem(pillars.year.stem.key, branchKey);

  return {
    version: "life-palace-v1",
    pillar: buildPillar({ stemKey, branchKey }),
  };
}

export function buildConceptionPalaceV1({ pillars }) {
  if (!pillars?.month) return null;

  const stemIndex = cycleMod(getStemIndex(pillars.month.stem.key) + 1, 10);
  const branchIndex = cycleMod(getBranchIndex(pillars.month.branch.key) + 3, 12);

  return {
    version: "conception-palace-v1",
    pillar: buildPillar({
      stemKey: HEAVENLY_STEMS[stemIndex].key,
      branchKey: EARTHLY_BRANCHES[branchIndex].key,
    }),
  };
}

export default buildLifePalaceV1;
