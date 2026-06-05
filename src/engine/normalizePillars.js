function normalizeStem(stem = {}) {
  if (typeof stem === "string") {
    return {
      key: stem,
      label: stem,
      element: null,
      polarity: null,
    };
  }

  return {
    key: stem.key || null,
    label: stem.label || stem.name || null,
    element: stem.element || null,
    polarity: stem.polarity || null,
  };
}

function normalizeBranch(branch = {}) {
  if (typeof branch === "string") {
    return {
      key: branch,
      label: branch,
      element: null,
      hiddenStems: [],
    };
  }

  return {
    key: branch.key || null,
    label: branch.label || branch.name || null,
    element: branch.element || null,
    hiddenStems: Array.isArray(branch.hiddenStems)
      ? branch.hiddenStems.map((hs) =>
          typeof hs === "string"
            ? { key: hs, label: hs, element: null, polarity: null }
            : {
                key: hs.key || null,
                label: hs.label || hs.name || null,
                element: hs.element || null,
                polarity: hs.polarity || null,
              }
        )
      : [],
  };
}

function normalizePillar(pillar = null) {
  if (!pillar) return null;

  const stem = normalizeStem(pillar.stem);
  const branch = normalizeBranch(pillar.branch);

  return {
    stem,
    branch,

    // flattened helpers
    stemKey: stem.key,
    stemLabel: stem.label,
    stemElement: stem.element,
    stemPolarity: stem.polarity,

    branchKey: branch.key,
    branchLabel: branch.label,
    branchElement: branch.element,

    hiddenStems: branch.hiddenStems,
  };
}

export function normalizePillars(pillars = {}) {
  return {
    year: normalizePillar(pillars.year),
    month: normalizePillar(pillars.month),
    day: normalizePillar(pillars.day),
    hour: normalizePillar(pillars.hour),
  };
}