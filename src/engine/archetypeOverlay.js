export function buildArchetypeOverlay({ archetypes, annualOverlay }) {
  if (!Array.isArray(archetypes)) return [];

  const boostedElements = annualOverlay?.amplifiedElements || [];

  return archetypes.map((item) => {
    const boost = boostedElements.some((el) =>
      item.theme?.toLowerCase().includes(el.toLowerCase())
    )
      ? 8
      : 0;

    return {
      ...item,
      annualBoost: boost,
      score: Math.min(100, Math.round((item.score ?? 0) + boost)),
    };
  });
}