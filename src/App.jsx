import huangsLogo from "./assets/hjj-logo-black.png";
import LeadPopup from "./components/LeadPopup";
import { COUNTRY_TIMEZONES } from "./data/countryTimezones";
import React, { useMemo, useState } from "react";
import buildBaziChart from "./engine/buildBaziChart";
import { mapChartToUi } from "./data/mapChartToUi";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const ARCHETYPE_EMOJIS = {
  "The Friend": "🤝",
  "The Leader": "👑",
  "The Artist": "🎨",
  "The Performer": "🎤",
  "The Director": "💼",
  "The Pioneer": "🚀",
  "The Diplomat": "⚖️",
  "The Warrior": "⚔️",
  "The Analyzer": "📚",
  "The Philosopher": "🌙",
};

const ELEMENT_COLOR = {
  Wood: "#2f855a",
  Fire: "#c2410c",
  Earth: "#a16207",
  Metal: "#64748b",
  Water: "#1d4ed8",
};

const STATUS_COLOR = {
  Supported: "#059669",
  Balanced: "#ca8a04",
  Weak: "#dc2626",
  Challenged: "#ea580c",
};

function Card({ children, className = "" }) {
  return <div className={`border ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function TextInput({ className = "", ...props }) {
  return (
    <input
      className={`h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${className}`}
      {...props}
    />
  );
}

function SelectInput({ className = "", children, ...props }) {
  return (
    <select
      className={`h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

function FieldLabel({ children }) {
  return <label className="text-sm font-medium text-zinc-700">{children}</label>;
}

function ProgressBar({ value }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
      <div className="h-full rounded-full bg-zinc-900" style={{ width: `${safeValue}%` }} />
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-5">
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">{description}</p>}
    </div>
  );
}

function GenerateProfilePanel({ form, onChange, onGenerate }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-md">
      <div className="mb-4 flex items-center gap-2">
  <img
    src={huangsLogo}
    alt="Huangs Logo"
    className="h-12 w-auto opacity-70"
  />

  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-500">
    Birth Details
  </p>
</div>

      <h1 className="text-3xl font-bold text-slate-950">
        Generate Your Bazi (八字) Profile
      </h1>

      <p className="mt-4 text-lg text-stone-500">
        Birth time is used to calculate the Hour Pillar, Hidden Stems and Ten Gods (10 Element Profiles) weighting.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <div>
          <label className="mb-2 block font-semibold text-slate-900">Your Name</label>
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-900">Birth Date</label>
          <input
            type="date"
            className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg"
            value={form.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-900">Birth Time</label>

          <div className="grid-cols-1 md:grid-cols-2 gap-4">
            <select
              disabled={form.birthTimeUnknown}
              className="rounded-2xl border border-slate-200 px-4 py-4 text-lg disabled:bg-slate-100 disabled:text-slate-400"
              value={form.birthHour || "12"}
              onChange={(e) => onChange({ birthHour: e.target.value })}
            >
              {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((hour) => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>

            <select
              disabled={form.birthTimeUnknown}
              className="rounded-2xl border border-slate-200 px-4 py-4 text-lg disabled:bg-slate-100 disabled:text-slate-400"
              value={form.birthMinute || "00"}
              onChange={(e) => onChange({ birthMinute: e.target.value })}
            >
              {Array.from({ length: 60 }, (_, i) => {
                const minute = String(i).padStart(2, "0");
                return <option key={minute} value={minute}>{minute}</option>;
              })}
            </select>

            <select
              disabled={form.birthTimeUnknown}
              className="rounded-2xl border border-slate-200 px-4 py-4 text-lg disabled:bg-slate-100 disabled:text-slate-400"
              value={form.birthPeriod || "AM"}
              onChange={(e) => onChange({ birthPeriod: e.target.value })}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <label className="mt-3 flex items-center gap-3 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={form.birthTimeUnknown || false}
              onChange={(e) => onChange({ birthTimeUnknown: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300"
            />
            Time of Birth Unknown
          </label>

          {form.birthTimeUnknown && (
            <p className="mt-2 text-xs text-orange-700">
              3 Pillars mode: Hour Pillar will be omitted and accuracy may be reduced.
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-900">Gender</label>
          <select
            className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg"
            value={form.gender}
            onChange={(e) => onChange({ gender: e.target.value })}
          >
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-900">Birth Country</label>
          <select
            className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg"
            value={form.birthCountry}
            onChange={(e) => onChange({ birthCountry: e.target.value })}
          >
            {Object.keys(COUNTRY_TIMEZONES).map((country) => (
  <option key={country} value={country}>
    {country}
  </option>
))}
          </select>
          <p className="mt-3 text-sm text-stone-500">
  Timezone: {COUNTRY_TIMEZONES[form.birthCountry] || "Asia/Singapore"}
</p>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-900">Current Energy Year</label>
          <select
            className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg"
            value={form.selectedYear}
            onChange={(e) => onChange({ selectedYear: Number(e.target.value) })}
          >
            <option value={2026}>2026</option>
            <option value={2027} disabled>2027 Coming Soon</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between rounded-3xl border border-yellow-200 bg-yellow-50 p-6">
        <div>
          <h2 className="text-xl font-bold text-orange-900">Bazi Calculation</h2>
          <p className="mt-2 text-orange-800">Find out how your Bazi affects your Wealth, Health, Career and Relationships</p>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          className="rounded-2xl bg-orange-700 px-10 py-4 text-sm font-semibold text-white shadow-md hover:bg-orange-600"
        >
          Click Here
        </button>
      </div>
    </section>
  );
}

function EmotionalEnergyProfile({ profile }) {
  return (
  
<div className="mt-8 rounded-[32px] bg-white px-8 py-8 shadow-md md:px-12 md:py-10">
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px] lg:items-center">

    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
        Your Personalised Profile for {profile.selectedYear}
      </p>

      <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
        {profile.name || "-"}
      </h3>

      <p className="mt-4 text-base font-semibold text-stone-500">
  Chinese Zodiac Sign: {profile.zodiac || "-"}
</p>

      <p className="mt-5 text-2xl md:text-3xl font-medium text-stone-600">
        Daymaster:
        <span className="ml-2 font-semibold text-red-900">
  {profile.coreEnergy || "-"}
</span>
      </p>

      <p className="mt-5 max-w-4xl text-base md:text-lg leading-8 text-stone-500">
  {profile.summary}
</p>
    </div>

    <div className="w-full max-w-[300px] rounded-[26px] bg-red-900 px-10 py-8 text-center text-white shadow-md">
      <p className="text-base font-semibold leading-7">
        Current Energy Influence
      </p>

      <p className="mt-5 text-4xl font-bold tracking-wide">
        丙午
      </p>

      <p className="mt-4 text-2xl md:text-3xl font-semibold">
        Fire Horse
      </p>
    </div>

  </div>
</div>
  );
}

function RecommendedStones({ stones }) {
  const stoneData = stones?.stoneDetails || [];
  const strategy = stones?.energyStrategy || {};

  if (!stones || stoneData.length === 0) return null;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
        Recommended Energy Supports
      </p>

      <h2 className="mt-3 text-3xl font-bold text-slate-950">
        {stones.topRecommendation
          ? `${stones.topRecommendation} is your main support`
          : "Wear these to support you throughout the year"}
      </h2>

      <p className="mt-4 max-w-4xl text-base leading-7 text-stone-600">
        {stones.explanation ||
          "These stones are selected based on the supportive elements your chart benefits from this year."}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
  {strategy.weakestElement && (
    <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
      Restore {strategy.weakestElement}
    </span>
  )}

  {strategy.primarySupport && (
    <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
      Strengthen {strategy.primarySupport}
    </span>
  )}

  {strategy.avoidElements?.length > 0 && (
    <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
      Avoid Excess {strategy.avoidElements.join(", ")}
    </span>
  )}
</div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
  stones.supportBenefits?.length
    ? stones.supportBenefits
    : stones.supportElements || []
).map((benefit) => (
  <span
    key={benefit}
    className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700"
  >
    Supports {benefit}
  </span>
))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {stoneData.map((item) => (
          <div
            key={`${item.rank}-${item.name}`}
            className="rounded-2xl border border-zinc-200 bg-[#FFFDF8] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">💎</div>

            <p className="mt-4 text-sm font-semibold text-stone-500">
              {item.element} Support
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-950">
              {item.name}
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              {item.theme}
            </p>

            <p className="mt-4 text-xs leading-5 text-stone-500">
              {item.bestFor}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function getDisplayScore(item) {
  const raw = item?.percentage ?? item?.score ?? 0;

  if (raw <= 1) {
    return Math.round(raw * 100);
  }

  return Math.round(raw);
}

function DominantArchetype({ archetype }) {
  if (!archetype) return null;

  const item = archetype;
  const rawScore = Number(item.score ?? item.percentage ?? 0);

const displayScore =
  rawScore > 0 && rawScore <= 1
    ? Math.round(rawScore * 100)
    : Math.round(rawScore);

const barScore = Math.min(95, Math.max(8, displayScore));

  return (
    <section>
      <div className="mb-6 inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-orange-800">
        ✨ Dominant Archetype
      </div>

      <div className="rounded-[28px] border border-yellow-300 bg-[#FFFDF7] p-8">
        <div className="grid gap-5 md:gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-500">
              DOMINANT PERSONALITY PATTERN
            </p>

            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.35em] text-orange-700">
              {item.type || "Friend"}
            </p>

            <h2 className="mt-4 text-3xl md:text-3xl font-bold text-slate-950">
              {ARCHETYPE_EMOJIS[item.name] || "✨"} {item.name || "The Friend"}
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
  {item.description || item.publicMeaning || "This is your strongest archetype for the selected year, based on your chart and annual energy influence."}
</p>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-lg font-medium text-stone-600">
                Current Year Activation
              </p>

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
  {getStrengthLabel(displayScore)}
</p>
            </div>

            <div className="h-5 w-full rounded-full bg-stone-100">
              <div
                className="h-5 rounded-full bg-red-900"
                style={{
  width:
    getStrengthLabel(displayScore) === "Very Strong"
      ? "90%"
      : getStrengthLabel(displayScore) === "Strong"
      ? "75%"
      : getStrengthLabel(displayScore) === "Moderate"
      ? "58%"
      : getStrengthLabel(displayScore) === "Subtle"
      ? "38%"
      : "18%",
}}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
              Natural Strengths
            </p>
            <p className="mt-3 text-lg leading-7 text-stone-600">
              Strong networking instincts, Naturally resourceful, Good at connecting people and opportunities
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
              Stress Pattern
            </p>
            <p className="mt-3 text-lg leading-7 text-stone-600">
              May become overly people-pleasing, emotionally insecure or too focused on external validation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function getStrengthLabel(score) {
  if (score >= 80) return "Very Strong";
  if (score >= 65) return "Strong";
  if (score >= 45) return "Moderate";
  if (score >= 25) return "Subtle";
  return "Dormant";
}

function TenPersonalityArchetypes({ archetypes }) {

  const ARCHETYPE_DISPLAY = {
    friend: {
      actualName: "Friend",
      icon: "🤝",
      name: "The Companion",
      theme: "Connection, belonging, peer support",
    },
    robwealth: {
      actualName: "Rob Wealth",
      icon: "👑",
      name: "The Challenger",
      theme: "Independence, competition, self-assertion",
    },
    eatingGod: {
      actualName: "Eating God",
      icon: "🎨",
      name: "The Creator",
      theme: "Creativity, ease, expression, enjoyment",
    },
    hurtingOfficer: {
      actualName: "Hurting Officer",
      icon: "🎤",
      name: "The Rebel Voice",
      theme: "Individuality, sharp expression, disruption",
    },
    directWealth: {
      actualName: "Direct Wealth",
      icon: "💼",
      name: "The Builder",
      theme: "Stability, ownership, practical results",
    },
    indirectWealth: {
      actualName: "Indirect Wealth",
      icon: "🚀",
      name: "The Opportunist",
      theme: "Opportunity, instinct, resourcefulness",
    },
    directOfficer: {
      actualName: "Direct Officer",
      icon: "⚖️",
      name: "The Guardian",
      theme: "Discipline, responsibility, structure",
    },
    sevenKillings: {
      actualName: "Seven Killings",
      icon: "⚔️",
      name: "The Warrior",
      theme: "Pressure, ambition, courage, survival instinct",
    },
    directResource: {
      actualName: "Direct Resource",
      icon: "📚",
      name: "The Nurturer",
      theme: "Support, learning, emotional safety",
    },
    indirectResource: {
      actualName: "Indirect Resource",
      icon: "🌙",
      name: "The Mystic",
      theme: "Intuition, imagination, unconventional insight",
    },
  };

  const displayArchetypes = Object.keys(ARCHETYPE_DISPLAY).map((key) => {
  const engineArchetype = archetypes?.find((item) => item.key === key);
  const score = engineArchetype?.score ?? engineArchetype?.percentage ?? 0;

  return {
    key,
    ...ARCHETYPE_DISPLAY[key],
    score,
    strengthLabel: getStrengthLabel(score),
  };
});

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-md">
      <h2 className="text-xl font-bold text-slate-950">
        Your 10 Personality Archetypes
      </h2>

      <p className="mt-3 text-lg text-stone-500">
        Each archetype below represents a different personality pattern in your chart.
Some are naturally louder, while others may become more active during certain years.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {displayArchetypes.map(({ key, actualName, icon, name, theme, score, strengthLabel }) => (
  <div
    key={key}
    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-red-700">
          {actualName}
        </p>

        <h3 className="text-lg font-bold text-slate-950">
          {icon} {name}
        </h3>

        <p className="mt-2 text-md text-stone-500">
          {theme}
        </p>
      </div>

      <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-700">
  {strengthLabel}
</p>
    </div>

    <div className="mt-5 h-4 w-full rounded-full bg-stone-100">
      <div
  className="h-4 rounded-full bg-red-900"
  style={{
    width:
      strengthLabel === "Very Strong"
        ? "90%"
        : strengthLabel === "Strong"
        ? "75%"
        : strengthLabel === "Moderate"
        ? "58%"
        : strengthLabel === "Subtle"
        ? "38%"
        : "18%",
  }}
/>
    </div>
  </div>
))}
      </div>
    </section>
  );
}

function EmotionalEnergyBalance({ elements }) {
  const elementRows = (elements || []).map((element) => {
  const percentage = Number(element.percentage || 0);

  let label = "Balanced";
  if (percentage >= 25) label = "Strong";
  if (percentage <= 12) label = "Weak";

  const emojiMap = {
    Wood: "🌿",
    Fire: "🔥",
    Earth: "⛰️",
    Metal: "⚔️",
    Water: "💧",
  };

  const annualPercentage = Number(
    element.annualPercentage || element.annual || percentage
  );

  const scaleElementBar = (value) => {
    return Math.min(100, Math.round((Number(value || 0) / 40) * 100));
  };

  const convertToTen = (value) => {
    return Math.min(10, Math.round((Number(value || 0) / 40) * 10));
  };

  return {
    name: element?.name || "",
    emoji: emojiMap[element?.name] || "✨",
    natal: convertToTen(percentage),
    annual: convertToTen(annualPercentage),
    label,
    natalScore: scaleElementBar(percentage),
    annualScore: scaleElementBar(annualPercentage),
  };
});

if (!elementRows.length) return null;
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-md">
  <div className="mb-8 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-bold tracking-[0.18em] text-blue-700 uppercase">
    〰️ Energy Analysis
  </div>

  <h2 className="text-3xl font-bold tracking-tight text-slate-950">
    Your Emotional Energy Balance
  </h2>

  <p className="mt-6 text-lg leading-relaxed text-slate-600">
    <span className="font-bold text-blue-700">What this shows:</span>{" "}
    An overview of how your emotional energy naturally behaves across the Five Elements (五行).
  </p>

  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
    {elementRows.map(({ name, emoji, natal, annual, label, natalScore, annualScore }) => {
      const statusClass =
        label === "Strong"
          ? "bg-green-50 text-green-700"
          : label === "Balanced"
          ? "bg-yellow-50 text-yellow-700"
          : "bg-red-50 text-red-700";

      return (
        <div
          key={name}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-3xl">
              {emoji}
            </div>
            <h3 className="text-xl font-bold text-slate-950">{name}</h3>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm text-slate-600">
                <span>Natal Strength</span>
                <span className="font-bold text-slate-900">{natal}/10</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-red-900"
                  style={{ width: `${natalScore}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm text-slate-600">
                <span>Yearly Influence</span>
                <span className="font-bold text-slate-900">{annual}/10</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-orange-600"
                  style={{ width: `${annualScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className={`mt-6 rounded-xl px-4 py-3 text-base font-bold ${statusClass}`}>
            ● {label}
          </div>
        </div>
      );
    })}
  </div>

  <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-lg leading-relaxed text-slate-700">
    ℹ️ When one element becomes too dominant or too weak, it can influence emotional patterns,
    stress responses, relationships and overall inner balance over time.
  </div>
</section>
  );
}

function SupportingArchetypes({ archetypes }) {
  const items = (archetypes || []).map((item, index) => {
  const rawScore = Number(item.score ?? item.percentage ?? 0);

const displayScore =
  rawScore > 0 && rawScore <= 1
    ? Math.round(rawScore * 100)
    : Math.round(rawScore);

const barScore = Math.min(95, Math.max(8, displayScore));

  return {
  ...item,
  rank: `No. ${index + 2} Pattern`,
  type: item.type || item.key || "",
  name: item.name || item.label || "Supporting Pattern",
  description:
  item.description ||
  item.publicMeaning ||
  "This pattern supports your secondary emotional expression and behavioural style.",
  displayScore,
  barScore,
};
});

  if (!items.length) return null;

  return (
    <section>
      <p className="mt-6 mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
        SUPPORTING PERSONALITY PATTERNS
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
  return (
          <div
            key={item.key || item.type || item.name || index}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-500">
              {item.rank}
            </p>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.35em] text-orange-700">
              {item.type}
            </p>

            <h3 className="mt-5 text-3xl font-bold text-slate-950">
              {ARCHETYPE_EMOJIS[item.name] || "✨"} {item.name}
            </h3>

            <p className="mt-6 min-h-[72px] text-lg leading-8 text-stone-600">
              {item.description}
            </p>

            <div className="mt-8 flex items-center justify-between text-lg">
              <span className="text-stone-600">Activation</span>
              <span className="font-semibold text-slate-950">
                2026: {getStrengthLabel(item.displayScore)}
              </span>
            </div>

            <div className="mt-3 h-4 w-full rounded-full bg-stone-100">
  <div
    className="h-4 rounded-full bg-orange-700"
    style={{
      width:
        getStrengthLabel(item.displayScore) === "Very Strong"
          ? "90%"
          : getStrengthLabel(item.displayScore) === "Strong"
          ? "75%"
          : getStrengthLabel(item.displayScore) === "Moderate"
          ? "58%"
          : getStrengthLabel(item.displayScore) === "Subtle"
          ? "38%"
          : "18%",
    }}
  />
</div>
          </div>
                  );
        })}
      </div>
    </section>
  );
}

const elementTextColor = {
  Wood: "text-green-700",
  Fire: "text-orange-700",
  Earth: "text-yellow-700",
  Metal: "text-slate-500",
  Water: "text-blue-700",
};

const statusTextColor = {
  Supported: "text-green-700",
  Balanced: "text-yellow-700",
  Challenged: "text-orange-700",
  Weak: "text-red-700",
};

function UsefulGodSection({ balance }) {
  const coreEnergyStatus = balance?.coreEnergyStatus || "-";
  const coreEnergyScore = balance?.coreEnergyScore ?? "-";
  const seasonalDominantElement = balance?.seasonalDominantElement || "-";
  const supportiveElements = balance?.supportiveElements || [];
  const cautionElements = balance?.cautionElements || [];

  const explanation =
    balance?.explanation ||
    "Focusing on supportive elements can help you stay emotionally grounded, reduce internal pressure and create more flow in your daily life.";

  const balanceCards = [
    [
      "🧘",
      "Core Energy State",
      coreEnergyStatus,
      coreEnergyScore !== "-" ? `Score: ${coreEnergyScore}/10` : "",
      "Your core energy reflects how supported or challenged your Daymaster feels within the full chart.",
      statusTextColor[coreEnergyStatus] || "text-stone-700",
    ],
    [
      "🌿",
      "Environmental Energy",
      seasonalDominantElement,
      "",
      "The dominant seasonal energy influencing your chart.",
      elementTextColor[seasonalDominantElement] || "text-stone-700",
    ],
    [
      "👍",
      "Supportive Elements",
      supportiveElements.length ? supportiveElements.join(" · ") : "-",
      "",
      "These elements help balance, nourish and support your energy.",
      "text-blue-700",
    ],
    [
      "🛡️",
      "Elements to Balance Carefully",
      cautionElements.length ? cautionElements.join(" · ") : "-",
      "",
      "These elements may create excess pressure or imbalance.",
      "text-orange-700",
    ],
  ];

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-md">
      <div className="mb-8 inline-flex items-center rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold tracking-[0.18em] text-orange-700 uppercase">
        ✨ Energy Guidance
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-slate-950">
        Personal Energy Balance
      </h2>

      <p className="mt-5 text-lg leading-relaxed text-stone-500">
        Discover the energies that support your well-being and those to be mindful of, based on your chart&apos;s unique balance.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {balanceCards.map(([emoji, label, value, score, text, color]) => (
          <div
            key={label}
            className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-3xl">
                {emoji}
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-stone-500">
                  {label}
                </p>

                <h3
  className="mt-4 text-2xl font-bold"
  style={{
    color:
      value === "Supported"
        ? "#059669"
        : value === "Wood"
        ? "#2f855a"
        : value === "Earth, Water"
        ? "#1d4ed8"
        : value === "Wood, Fire"
        ? "#c2410c"
        : "#020617",
  }}
>
  {value}
</h3>

                {score && (
                  <p className="mt-1 text-sm text-stone-500">
                    {score}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-4 text-base leading-relaxed text-stone-600">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-yellow-50 p-6">
        <p className="text-lg font-bold text-slate-950">
          ✨ What this means for you
        </p>

        <p className="mt-4 text-base leading-relaxed text-stone-600">
  {explanation}
</p>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-6 text-base leading-relaxed text-stone-600">
        ℹ️ Your energetic balance was interpreted through seasonal influences, elemental interactions and emotional support patterns within your chart, guided by traditional Bazi principles.
      </div>
    </section>
  );
}

function CTASection({ cta }) {
  return (
    <section className="mt-8 rounded-[28px] border border-yellow-500 bg-slate-950 px-6 py-14 text-center shadow-xl">
      <p className="mb-4 text-sm font-semibold tracking-[0.35em] text-yellow-400">
        WANT THE FULL PICTURE?
      </p>

      <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
        Unlock Your Full Bazi Destiny Blueprint
      </h2>

      <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-slate-300 md:text-xl">
        Your free profile reveals your surface energetic tendencies.

A full consultation goes deeper into your Bazi structure, favourable elements, emotional patterns, career timing, relationship dynamics and long-term life cycles through practitioner-level analysis.
      </p>

      <a
  href="https://www.huangsjadeiteandjewelry.com/collections/singapore-feng-shui-master-services-%E5%BC%80%E5%85%89-kai-guang/products/personal-feng-shui-energy-analysis-gemstone-alignment"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-10 rounded-2xl bg-orange-500 px-10 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-400"
>
  Book Full Reading
</a>
    </section>
  );
}

function LifeGuidanceSection({ guidance }) {
  const guidanceItems = [
    guidance?.career,
    guidance?.wealth,
    guidance?.relationship,
    guidance?.wellness || guidance?.health,
  ].filter(Boolean);

  if (!guidanceItems.length) return null;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-md">
      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        Practical Life Guidance
      </p>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {guidanceItems.map((item) => (
          <div
            key={item.focus}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-700">
              {item.focus}
            </p>

            <h3 className="mt-5 text-2xl font-bold text-slate-950">
              {item.title}
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.status && (
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                  {item.status}
                </span>
              )}

              {typeof displayScore === "number" && (
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
                  Score: {displayScore}
                </span>
              )}
            </div>

            <p className="mt-5 min-h-[96px] text-base leading-7 text-stone-600">
              {item.explanation}
            </p>

            {item.bullets?.length > 0 && (
              <ul className="mt-5 space-y-2">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-6 text-stone-500">
                    • {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HuangsBaZiUIFrontend() {
  const [form, setForm] = useState({
  name: "Amanda",
  birthDate: "1996-08-18",
  birthTime: "",
  gender: "Female",
  birthCountry: "Singapore",
  selectedYear: 2026,
});

  const [submittedInput, setSubmittedInput] = useState(null);

  const [popupOpen, setPopupOpen] = useState(false);

  const chart = useMemo(() => {
  if (!submittedInput) return null;

  const result = buildBaziChart({
    name: submittedInput.name,
    birthDate: submittedInput.birthDate,
    birthTime: submittedInput.birthTime,
    birthCountry: submittedInput.birthCountry,
    selectedYear: submittedInput.selectedYear,
    gender: submittedInput.gender,
  });

  return result;
}, [submittedInput]);

  const uiChart = useMemo(() => {
  if (!chart || !submittedInput) return null;

  return mapChartToUi(chart, submittedInput.selectedYear);
}, [chart, submittedInput]);

  const guidance = uiChart?.guidance || uiChart?.practicalGuidance || {};

const lifeThemeItems = [
  {
    ...(guidance?.career || {}),
    emoji: "💼",
  },
  {
    ...(guidance?.wealth || {}),
    emoji: "💰",
  },
  {
    ...(guidance?.relationship || {}),
    emoji: "❤️",
  },
  {
    ...(guidance?.wellness || guidance?.health || {}),
    emoji: "🌿",
  },
].filter((item) => item.focus);

  function updateForm(nextValue) {
    setForm((current) => ({ ...current, ...nextValue }));
  }

  function generateProfile() {

  const hour12 = Number(form.birthHour);
const minute = form.birthMinute;
const hour24 =
  form.birthPeriod === "PM" && hour12 !== 12
    ? hour12 + 12
    : form.birthPeriod === "AM" && hour12 === 12
    ? 0
    : hour12;

const birthTime =
  form.birthHour && form.birthMinute && form.birthPeriod
    ? `${String(hour24).padStart(2, "0")}:${minute}`
    : "";

setSubmittedInput({
  ...form,
  birthTime,
  useBirthTime: Boolean(birthTime),
});

  setPopupOpen(true);
}

  return (
    <main className="min-h-screen bg-[#F7F3EB]">
      <LeadPopup open={popupOpen} setOpen={setPopupOpen} />
      <div className="mx-auto max-w-[1600px] space-y-5 px-4 py-6 md:px-8 md:pb-6">
 <GenerateProfilePanel
  form={form}
  onChange={updateForm}
  onGenerate={generateProfile}
/>

      {uiChart ? (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="space-y-10">
    <EmotionalEnergyProfile profile={uiChart.profile} />
    <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-md">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-xs font-semibold tracking-[0.28em] text-slate-500 uppercase">
        Your 2026 Life Energy Overview
      </p>

      <h2 className="mt-4 text-3xl md:text-3xl font-bold text-slate-950">
        Your 2026 Life Themes
      </h2>

      <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600">
        Your annual energy is a blend of your natal chart and the energy of the year.
      </p>

      <p className="mt-2 max-w-3xl text-lg leading-9 text-slate-600">
        These 4 key areas show where opportunities flow, and where to pay extra attention.
      </p>
    </div>

    <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-base font-semibold text-slate-900">
      ✦ Current Energy Year:
      <span className="ml-2 text-orange-700">2026</span>
    </div>
  </div>

  <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
  {lifeThemeItems.map((item) => {
  const displayScore = Math.round(
  item.score ?? item.percentage ?? item.intensity ?? item.confidence ?? 75
);
  const barScore = Math.min(95, Math.max(8, displayScore));

  return (
    <div
      key={item.focus}
      className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-50 text-3xl">
          {item.emoji}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-950">
            {item.focus} Energy
          </h3>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            {displayScore}%
          </p>
        </div>
      </div>

      <div className="mt-6 inline-block rounded-xl bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-500">
        {item.status}
      </div>

      <div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-orange-500"
          style={{ width: `${barScore}%` }}
        />
      </div>

      {item.bullets?.length > 0 && (
        <div className="mt-8 border-t border-zinc-200 pt-6">
          <ul className="space-y-4 text-base leading-relaxed text-slate-600">
            {item.bullets.slice(0, 4).map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
      )}
        </div>
  );
})}
</div>

  {/* Insight */}
  <div className="mt-8 rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm">
    <div className="flex items-center gap-10">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-5xl">
        💡
      </div>

      <div>
        <h3 className="text-3xl md:text-3xl font-bold text-orange-700">
          Your 2026 Energy Insight
        </h3>

        <p className="mt-3 max-w-5xl text-sm leading-relaxed text-slate-600">
          Different gemstones, jade and crystals help to balance and align your energy in different ways. Even the colour of your clothing, accessories and home environment can have an impact on your emotional energy throughout the year.
        </p>
      </div>
    </div>
  </div>

</section>

  <p className="mt-0 text-center text-sm text-slate-500">
  </p>

  <RecommendedStones stones={uiChart?.stones || uiChart?.stoneRecommendations} />

{/*
<section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-md">
  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
    Understanding Your Archetypes
  </p>

  <h3 className="mt-3 text-3xl font-bold text-slate-950">
    What Are the Ten Gods (10 Element Profiles)?
  </h3>

  <p className="mt-5 max-w-5xl text-lg leading-8 text-stone-600">
    In Bazi, the Ten Gods (10 Element Profiles) represent different personality
    drives, emotional tendencies and natural behavioural patterns within your
    chart. Some profiles influence how you communicate, lead, create wealth,
    build relationships or handle pressure more strongly than others.
  </p>

  <p className="mt-4 max-w-5xl text-lg leading-8 text-stone-600">
    The sections below show which archetypes are most activated in your energy
    profile for the selected year, helping you better understand your natural
    strengths, emotional patterns and personal growth themes.
  </p>
</section>
*/}

{/* <TenPersonalityArchetypes archetypes={uiChart.archetypes} /> */}

<EmotionalEnergyBalance elements={uiChart?.elements} />
<UsefulGodSection balance={uiChart?.personalEnergyBalance} />
<LifeGuidanceSection guidance={uiChart?.guidance || uiChart?.practicalGuidance} />
<CTASection cta={uiChart.cta} />
  </motion.div>
) : null}
      </div>
    </main>
  );
}
