// Validates the extended Shen Sha set added in this round (Intelligence
// Star, Solitary/Widow, Monthly Virtue, Heavenly Virtue, Five Ghosts,
// Robbery Sha). The original 3 stars (Peach Blossom, Sky Horse, Noble
// People) are re-checked here too as a regression guard.
//
// Solitary was verified against 3 real Joey Yap reference values and
// caught a real bug: it's keyed by DAY branch, not year branch (the
// grouping table itself was right, just anchored to the wrong pillar).
//
// The remaining new stars (Intelligence Star, Widow, Monthly Virtue,
// Heavenly Virtue, Five Ghosts, Robbery Sha) have no confirmed reference
// value yet - this prints actual values for all 5 benchmark charts instead
// of asserting PASS/FAIL.
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

// Solitary (孤辰) is keyed by DAY branch, not year branch - this was a real
// bug, fixed and verified against 3 real Joey Yap reference values.
const EXPECTED_SOLITARY = {
  "Ma Weini": "Monkey",
  "Suyin C": "Pig",
  "Wong Lee Lee": "Snake",
};

console.log("\n--- Solitary (day-branch-keyed, verified) ---");
for (const person of PILLAR_VALIDATION_DATASET) {
  const expected = EXPECTED_SOLITARY[person.name];
  if (!expected) continue;

  const normalized = normalizeInput({
    birthDate: person.birthDate,
    birthTime: person.birthTime,
    birthCountry: "Singapore",
    gender: person.gender,
  });
  const pillars = calculatePillars(normalized);
  const shenSha = buildShenShaV1({ pillars });
  const solitary = shenSha.stars.find((s) => s.key === "solitary");
  const actual = solitary?.branch?.animal;
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(
    ok
      ? `PASS: ${person.name} Solitary = ${actual}`
      : `FAIL: ${person.name} Solitary expected ${expected}, got ${actual}`
  );
}

console.log("\n--- Remaining new stars (no confirmed reference yet) ---");

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
  ["intelligenceStar", "widow", "monthlyVirtue", "heavenlyVirtue", "fiveGhosts", "robberySha"].forEach(
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
