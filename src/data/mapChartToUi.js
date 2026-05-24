export const mapChartToUi = (chart, selectedYear) => {
  return {
    profile: {
      ...(chart.profile || {}),
      selectedYear,
    },

    archetypes: (chart.archetypes || []).map((item) => ({
      key: item.archetypeKey,
      name: item.publicName,
      short: item.tenGod,
      description: item.theme,
      score: item.score,
    })),

    elements: Object.entries(chart.elementBalance?.percentages || {}).map(
      ([name, percentage]) => ({
        key: name,
        name,
        label: `${percentage}%`,
        publicMeaning: "",
        percentage,
      })
    ),

    cta: chart.cta || {
      label: "Next Step",
      text: "",
    },
  };
};