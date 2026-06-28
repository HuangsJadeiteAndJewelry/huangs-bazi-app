// Validates Life Palace + Conception Palace.
//
// Conception Palace: checked against a published worked example (month
// pillar Ji-Chou 己丑 -> Conception Palace Geng-Chen 庚辰), plus Wong Lee
// Lee's real reference value.
//
// Life Palace: checked against 3 real Joey Yap reference charts (Joshua,
// Suyin C, Yue Qing Amanda - exact match on both stem and branch). This
// caught a real off-by-one bug: the originally-sourced formula used base
// 14/26, but the correct constants are 13/25 - the two independent written
// sources cited when this was first built had a self-consistent worked
// example that didn't match real reference output.
//
// Wong Lee Lee has no birth time, so Life Palace correctly stays
// unavailable (null) for her - no consistent default-hour rule was found
// that reproduces her reference value, so this isn't guessed at.
//
// Run with: node src/tests/lifePalaceValidationTests.js

import { normalizeInput } from "../engine/dateTime.js";
import { calculatePillars, buildPillar } from "../engine/pillars.js";
import { buildLifePalaceV1, buildConceptionPalaceV1 } from "../engine/lifePalaceV1.js";

let failures = 0;

function check(label, actual, expected) {
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(ok ? `PASS: ${label} = ${actual}` : `FAIL: ${label} expected ${expected}, got ${actual}`);
}

// --- Conception Palace formula check (literature worked example) ---
const monthPillar = buildPillar({ stemKey: "ji", branchKey: "chou" });
const conception = buildConceptionPalaceV1({ pillars: { month: monthPillar } });
check(
  "Conception Palace formula (month 己丑)",
  `${conception.pillar.stem.zh}${conception.pillar.branch.zh}`,
  "庚辰"
);

// --- Real reference charts ---
const PEOPLE = [
  { name: "Joshua", gender: "male", birthDate: "1999-01-26", birthTime: "22:00", birthCountry: "Singapore",
    expectedLifePalace: "Fire Dragon" },
  { name: "Suyin C", gender: "female", birthDate: "1987-12-03", birthTime: "03:45", birthCountry: "Singapore",
    expectedLifePalace: "Water Rabbit" },
  { name: "Yue Qing Amanda", gender: "female", birthDate: "1986-09-07", birthTime: "00:00", birthCountry: "Singapore",
    expectedLifePalace: "Fire Monkey" },
  { name: "Wong Lee Lee", gender: "female", birthDate: "1980-03-06", birthTime: "", birthCountry: "Singapore",
    expectedConception: "Metal Horse" },
];

for (const person of PEOPLE) {
  const normalized = normalizeInput(person);
  const pillars = calculatePillars(normalized);
  const lifePalace = buildLifePalaceV1({ pillars });
  const conceptionPalace = buildConceptionPalaceV1({ pillars });

  if (person.expectedLifePalace) {
    const actual = lifePalace ? `${lifePalace.pillar.stem.element} ${lifePalace.pillar.branch.animal}` : "null";
    check(`${person.name} Life Palace`, actual, person.expectedLifePalace);
  } else {
    const ok = lifePalace === null;
    if (!ok) failures++;
    console.log(
      ok
        ? `PASS: ${person.name} Life Palace correctly null (no birth time)`
        : `FAIL: ${person.name} Life Palace should be null without birth time`
    );
  }

  if (person.expectedConception) {
    const actual = `${conceptionPalace.pillar.stem.element} ${conceptionPalace.pillar.branch.animal}`;
    check(`${person.name} Conception Palace`, actual, person.expectedConception);
  }
}

console.log(failures ? `\n${failures} case(s) FAILED.` : "\nAll Life/Conception Palace cases passed.");
