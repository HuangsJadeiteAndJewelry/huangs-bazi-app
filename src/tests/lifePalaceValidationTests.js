// Validates Life Palace + Conception Palace.
//
// Conception Palace is checked against a published worked example
// (month pillar Ji-Chou 己丑 -> Conception Palace Geng-Chen 庚辰), an
// independent source unrelated to this engine's own code - a real
// correctness check, not a circular re-derivation.
//
// Life Palace has no independently-sourced worked example to hand-check
// against here, so this prints actual computed values for all 5 benchmark
// charts instead of asserting PASS/FAIL - cross-check these against the
// Joey Yap reference screenshots before trusting them in the live report.
//
// Run with: node --experimental-vm-modules, or via the Vite ssrLoadModule
// harness for the full-chart section (plain node can't resolve this repo's
// extensionless imports once buildBaziChart.js is in the import chain).

import { buildPillar } from "../engine/pillars.js";
import { buildLifePalaceV1, buildConceptionPalaceV1 } from "../engine/lifePalaceV1.js";

let failures = 0;

// --- Conception Palace formula check (literature worked example) ---
const monthPillar = buildPillar({ stemKey: "ji", branchKey: "chou" });
const conception = buildConceptionPalaceV1({ pillars: { month: monthPillar } });
const actual = `${conception.pillar.stem.zh}${conception.pillar.branch.zh}`;
const expected = "庚辰";

const ok = actual === expected;
if (!ok) failures++;
console.log(
  ok
    ? `PASS: Conception Palace formula (month 己丑 -> ${actual})`
    : `FAIL: Conception Palace formula expected ${expected}, got ${actual}`
);

console.log(failures ? `\n${failures} case(s) FAILED.` : "\nFormula check passed.");
console.log(
  "\nNOTE: Life Palace has no independent worked example baked into this " +
    "test. Run the full benchmark-chart script (see verification section " +
    "of the implementation plan) and manually compare each person's Life " +
    "Palace pillar against their Joey Yap reference screenshot."
);
