// Validates the generated solar term timestamps (src/data/solarTermTimestamps.js)
// against published Li Chun dates, and sanity-checks that consecutive Jie
// terms within a year are always ~29.5-31.5 days apart (the sun's seasonal
// speed variation - faster near January perihelion, slower near July
// aphelion). Run with: node src/tests/solarTermValidationTests.js

import { SOLAR_TERM_TIMESTAMPS_BY_YEAR } from "../data/solarTermTimestamps.js";

// Published Li Chun (立春) dates - well-documented, widely cited.
const EXPECTED_LI_CHUN_DATES = {
  2023: "2023-02-04",
  2024: "2024-02-04",
  2025: "2025-02-03",
  2026: "2026-02-04",
};

let failures = 0;

for (const [year, expectedDate] of Object.entries(EXPECTED_LI_CHUN_DATES)) {
  const liChun = SOLAR_TERM_TIMESTAMPS_BY_YEAR[year]?.find((t) => t.branch === "yin");
  const t = liChun?.timestamp;
  const actualDate = t
    ? `${t.year}-${String(t.month).padStart(2, "0")}-${String(t.day).padStart(2, "0")}`
    : null;

  const ok = actualDate === expectedDate;
  if (!ok) failures++;

  console.log(
    ok
      ? `PASS: Li Chun ${year} = ${actualDate}`
      : `FAIL: Li Chun ${year} expected ${expectedDate}, got ${actualDate}`
  );
}

const terms2026 = SOLAR_TERM_TIMESTAMPS_BY_YEAR[2026];
for (let i = 1; i < terms2026.length; i++) {
  const prev = terms2026[i - 1].timestamp;
  const cur = terms2026[i].timestamp;
  const prevMs = Date.UTC(prev.year, prev.month - 1, prev.day, prev.hour, prev.minute);
  const curMs = Date.UTC(cur.year, cur.month - 1, cur.day, cur.hour, cur.minute);
  const days = (curMs - prevMs) / 86400000;

  const ok = days >= 29 && days <= 32;
  if (!ok) failures++;

  console.log(
    ok
      ? `PASS: ${terms2026[i - 1].label} -> ${terms2026[i].label} = ${days.toFixed(2)} days`
      : `FAIL: ${terms2026[i - 1].label} -> ${terms2026[i].label} = ${days.toFixed(2)} days (expected 29-32)`
  );
}

console.log(failures ? `\n${failures} case(s) FAILED.` : "\nAll solar term cases passed.");
