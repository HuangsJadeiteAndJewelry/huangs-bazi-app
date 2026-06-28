// Validates the extended Shen Sha set added in this round (Intelligence
// Star, Solitary/Widow, Monthly Virtue, Heavenly Virtue, Five Ghosts,
// Robbery Sha). The original 3 stars (Peach Blossom, Sky Horse, Noble
// People) are re-checked here too as a regression guard.
//
// Only Ma Weini's original 3 stars have a previously-confirmed reference
// value (Peach Blossom = Mao/Rabbit, Sky Horse = Shen/Monkey, Noble People
// includes Wei/Goat). The 6 new stars print actual values for all 5
// benchmark charts instead of asserting PASS/FAIL - cross-check these
// against the Joey Yap reference screenshots before trusting them in the
// live report.
//
// Run with: node src/tests/shenShaExtendedValidationTests.js

import { normalizeInput } from "../engine/dateTime.js";
import { calculatePillars } from "../engine/pillars.js";
import { buildShenShaV1 } from "../engine/shenShaV1.js";
import { PILLAR_VALIDATION_DATASET } from "./pillarValidationDataset.js";

let failures = 0;

const maWeini = PILLAR_VALIDATION_DATASET.find((p) => p.name === "Ma Weini");
const maWeiniNormalized = normalizeInput({
  birthDate: maWeini.birthDate,
  birthTime: maWeini.birthTime,
  birthCountry: "Singapore",
  gender: maWeini.gender,
});
const maWeiniPillars = calculatePillars(maWeiniNormalized);
const maWeiniShenSha = buildShenShaV1({ pillars: maWeiniPillars });

const EXPECTED_MA_WEINI = {
  peachBlossom: "mao",
  skyHorse: "shen",
};

for (const [key, expectedBranch] of Object.entries(EXPECTED_MA_WEINI)) {
  const star = maWeiniShenSha.stars.find((s) => s.key === key);
  const ok = star?.branch?.key === expectedBranch;
  if (!ok) failures++;
  console.log(
    ok
      ? `PASS: Ma Weini ${star.name} = ${star.branch.zh}/${star.branch.animal}`
      : `FAIL: Ma Weini ${key} expected branch ${expectedBranch}, got ${star?.branch?.key}`
  );
}

const nobleStar = maWeiniShenSha.stars.find((s) => s.key === "noblePeople");
const hasWei = nobleStar?.branches?.some((b) => b.key === "wei");
if (!hasWei) failures++;
console.log(
  hasWei
    ? `PASS: Ma Weini Noble People includes Wei/Goat`
    : `FAIL: Ma Weini Noble People does not include Wei/Goat`
);

console.log(`\n${failures ? failures + " case(s) FAILED." : "Regression checks passed."}`);

console.log("\n--- New stars (manual cross-check against reference screenshots) ---");

for (const person of PILLAR_VALIDATION_DATASET) {
  const normalized = normalizeInput({
    birthDate: person.birthDate,
    birthTime: person.birthTime,
    birthCountry: "Singapore",
    gender: person.gender,
  });
  const pillars = calculatePillars(normalized);
  const shenSha = buildShenShaV1({ pillars });

  console.log(`\n${person.name}:`);
  ["intelligenceStar", "solitary", "widow", "monthlyVirtue", "heavenlyVirtue", "fiveGhosts", "robberySha"].forEach(
    (key) => {
      const star = shenSha.stars.find((s) => s.key === key);
      if (!star) return;
      const target = star.branch
        ? `${star.branch.zh}/${star.branch.animal}`
        : star.stem
        ? `${star.stem.zh}/${star.stem.name}`
        : "?";
      console.log(`  ${star.name} (${star.zh}): ${target} | active=${star.active}`);
    }
  );
}
