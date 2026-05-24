export const TEN_GOD_ARCHETYPES = {
  Friend: {
    key: "friend",
    publicName: "The Companion",
    theme: "connection, belonging, peer support",
  },
  "Rob Wealth": {
    key: "robWealth",
    publicName: "The Challenger",
    theme: "competition, independence, bold self-assertion",
  },
  "Eating God": {
    key: "eatingGod",
    publicName: "The Creator",
    theme: "expression, ease, creativity, enjoyment",
  },
  "Hurting Officer": {
    key: "hurtingOfficer",
    publicName: "The Rebel Voice",
    theme: "individuality, disruption, sharp expression",
  },
  "Direct Wealth": {
    key: "directWealth",
    publicName: "The Builder",
    theme: "stability, ownership, practical results",
  },
  "Indirect Wealth": {
    key: "indirectWealth",
    publicName: "The Opportunist",
    theme: "possibility, business instinct, resourcefulness",
  },
  "Direct Officer": {
    key: "directOfficer",
    publicName: "The Guardian",
    theme: "discipline, responsibility, structure",
  },
  "Seven Killings": {
    key: "sevenKillings",
    publicName: "The Warrior",
    theme: "pressure, ambition, courage, survival instinct",
  },
  "Direct Resource": {
    key: "directResource",
    publicName: "The Nurturer",
    theme: "support, learning, emotional safety",
  },
  "Indirect Resource": {
    key: "indirectResource",
    publicName: "The Mystic",
    theme: "intuition, imagination, unconventional insight",
  },
};

export function mapTenGodScoresToArchetypes(scores) {
  return Object.entries(scores)
    .map(([tenGod, score]) => {
      const archetype = TEN_GOD_ARCHETYPES[tenGod];

      return {
        tenGod,
        score,
        archetypeKey: archetype.key,
        publicName: archetype.publicName,
        theme: archetype.theme,
      };
    })
    .sort((a, b) => b.score - a.score);
}