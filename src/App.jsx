import React, { useMemo, useState } from "react";
import buildBaziChart from "./engine/buildBaziChart";
import { mapChartToUi } from "./data/mapChartToUi";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

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
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">{description}</p>}
    </div>
  );
}

function GenerateProfilePanel({ form, onChange, onGenerate }) {
  return (
    <Card className="rounded-3xl border-zinc-200 bg-white shadow-sm">
      <CardContent className="p-5 md:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-950 md:text-2xl">Generate Your BaZi Energy Profile</h1>
            <p className="text-sm text-zinc-500">A simple personality-style profile based on your birth details.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Name</FieldLabel>
            <TextInput
              value={form.name}
              placeholder="e.g. Amanda"
              onChange={(event) => onChange({ name: event.target.value })}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel>Birth Country</FieldLabel>
            <SelectInput value={form.birthCountry} onChange={(event) => onChange({ birthCountry: event.target.value })}>
              <option value="Singapore">Singapore</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
            </SelectInput>
            <p className="text-xs text-zinc-400">Timezone is selected automatically from birth country.</p>
          </div>

          <div className="space-y-2">
            <FieldLabel>Birth Date</FieldLabel>
            <TextInput
              type="date"
              value={form.birthDate}
              onChange={(event) => onChange({ birthDate: event.target.value })}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel>Birth Time Optional</FieldLabel>
            <TextInput
              type="time"
              value={form.birthTime}
              onChange={(event) => onChange({ birthTime: event.target.value })}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <FieldLabel>Profile Year</FieldLabel>
            <SelectInput value={String(form.selectedYear)} onChange={(event) => onChange({ selectedYear: Number(event.target.value) })}>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </SelectInput>
          </div>
        </div>

        <Button className="mt-5 w-full bg-zinc-950 text-white hover:bg-zinc-800 md:w-auto" onClick={onGenerate}>
          Generate Profile <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function EmotionalEnergyProfile({ profile }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Emotional Energy"
        title={`Emotional Energy Profile for ${profile.selectedYear}`}
        description="A shareable summary of your active emotional patterns for the selected year."
      />
      <Card className="rounded-3xl border-zinc-200 bg-gradient-to-br from-white to-zinc-50 shadow-sm">
        <CardContent className="p-6 md:p-7">
          <h3 className="text-xl font-semibold text-zinc-950">{profile.title}</h3>
          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-700">{profile.summary}</p>
          <div className="mt-5 rounded-2xl bg-zinc-100 p-4">
            <p className="text-sm font-medium leading-6 text-zinc-700">{profile.publicInsight}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function TenPersonalityArchetypes({ archetypes }) {
  return (
    <section>
      <SectionHeader
        eyebrow="10 Archetypes"
        title="Your 10 Personality Archetypes"
        description="A quick MBTI-like view of your strongest emotional and behavioural patterns."
      />
<div className="grid gap-4 md:grid-cols-2">
  {archetypes.map((item, index) => (
    <Card
      key={item.key || item.name || index}
      className="rounded-3xl border-zinc-200 bg-white shadow-sm"
    >
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-zinc-950">{item.name}</h3>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">{item.short}</p>
          </div>
          <span className="text-sm font-semibold text-zinc-950">{item.score}%</span>
        </div>
        <ProgressBar value={item.score} />
        <p className="mt-3 text-sm leading-6 text-zinc-600">{item.description}</p>
      </CardContent>
    </Card>
         ))}
      </div>
    </section>
  );
}

function DominantArchetype({ archetype }) {
  if (!archetype) return null;

  return (
    <section>
      <SectionHeader eyebrow="Strongest Pattern" title="Dominant Archetype" />
      <Card className="rounded-3xl border-zinc-950 bg-zinc-950 text-white shadow-sm">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-zinc-400">Highest active archetype</p>
              <h3 className="mt-2 text-3xl font-semibold">{archetype.name}</h3>
              <p className="mt-1 text-sm font-medium text-zinc-400">{archetype.short}</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300">{archetype.description}</p>
            </div>
            <div className="text-5xl font-semibold">{archetype.score}%</div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function SupportingArchetypes({ archetypes }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Secondary Patterns"
        title="Supporting Archetypes"
        description="These add more nuance to your dominant personality pattern."
      />
      <div className="grid gap-4 md:grid-cols-3">
      {archetypes.map((item, index) => (
          <Card
  key={item.key || item.name || index}
  className="rounded-3xl border-zinc-200 bg-white shadow-sm"
>
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-950">{item.name}</h3>
                  <p className="text-xs text-zinc-400">{item.short}</p>
                </div>
                <span className="text-sm font-semibold">{item.score}%</span>
              </div>
              <p className="text-sm leading-6 text-zinc-600">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EmotionalEnergyBalance({ elements }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Energy Balance"
        title="Emotional Energy Balance"
        description="A simple view of which emotional energies are very active, balanced or need more support."
      />
      <div className="grid gap-4 md:grid-cols-5">
        {elements.map((element) => {
          const Icon = element.icon;
          return (
            <Card key={element.key} className="rounded-3xl border-zinc-200 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100">
                  {Icon ? <Icon className="h-5 w-5 text-zinc-800" /> : null}
                </div>
                <h3 className="font-semibold text-zinc-950">{element.name}</h3>
                <p className="mb-1 text-sm text-zinc-500">{element.label}</p>
                <p className="mb-3 text-xs leading-5 text-zinc-400">{element.publicMeaning}</p>
                <ProgressBar value={element.percentage} />
                <p className="mt-2 text-sm font-semibold text-zinc-950">{element.percentage}%</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function CTASection({ cta }) {
  return (
    <Card className="rounded-3xl border-zinc-950 bg-zinc-950 shadow-sm">
      <CardContent className="p-6 text-white md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Next Step</p>
            <h2 className="text-2xl font-semibold">{cta.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">{cta.body}</p>
          </div>
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100">{cta.buttonLabel}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HuangsBaZiUIFrontend() {
  const [form, setForm] = useState({
    name: "Amanda",
    birthDate: "1996-08-18",
    birthTime: "",
    birthCountry: "Singapore",
    selectedYear: 2026,
  });

  const [submittedInput, setSubmittedInput] = useState(null);

  const chart = useMemo(() => {
  if (!submittedInput) return null;

  return buildBaziChart({
    birthDate: submittedInput.birthDate,
    birthCountry: submittedInput.birthCountry,
    useBirthTime: Boolean(submittedInput.birthTime),
    birthTime: submittedInput.birthTime || undefined,
  });
}, [submittedInput]);

  const uiChart = useMemo(() => {
  if (!chart || !submittedInput) return null;

  return mapChartToUi(chart, submittedInput.selectedYear);
}, [chart, submittedInput]);

const sortedArchetypes = useMemo(() => {
  if (!uiChart) return [];
  return [...uiChart.archetypes].sort((a, b) => b.score - a.score);
}, [uiChart]);

  const dominant = uiChart ? sortedArchetypes[0] : null;
  const supporting = uiChart ? sortedArchetypes.slice(1, 4) : [];

  function updateForm(nextValue) {
    setForm((current) => ({ ...current, ...nextValue }));
  }

  function generateProfile() {
    setSubmittedInput(form);
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-6 text-zinc-950 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <GenerateProfilePanel form={form} onChange={updateForm} onGenerate={generateProfile} />
        </motion.div>

      {uiChart ? (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="space-y-10">
    <EmotionalEnergyProfile profile={uiChart.profile} />
    <TenPersonalityArchetypes archetypes={sortedArchetypes} />
    <DominantArchetype archetype={dominant} />
    <SupportingArchetypes archetypes={supporting} />
    <EmotionalEnergyBalance elements={uiChart.elements} />
    <CTASection cta={uiChart.cta} />
  </motion.div>
) : null}
      </div>
    </main>
  );
}
