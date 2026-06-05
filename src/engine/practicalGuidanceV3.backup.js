export function buildPracticalGuidanceV3({
  dayMasterStrengthV3,
  usefulGodV3,
  elementBalanceV3,
  annualOverlayV3,
  archetypeOverlayV3,
}) {
  const strengthLabel =
    dayMasterStrengthV3?.label ||
    dayMasterStrengthV3?.status ||
    "Balanced";

    const dominantArchetypeKey =
  archetypeOverlayV3?.dominantArchetype?.key || "";

  const dominantArchetypeName =
  archetypeOverlayV3?.dominantArchetype?.publicName || "";

  const isWeak = strengthLabel.toLowerCase().includes("weak");
  const isStrong = strengthLabel.toLowerCase().includes("strong");

  const primaryUseful =
    usefulGodV3?.primaryUsefulElement ||
    usefulGodV3?.favourableElements?.[0] ||
    "";

  const secondaryUseful =
    usefulGodV3?.secondaryUsefulElement ||
    usefulGodV3?.favourableElements?.[1] ||
    "";

  const avoidElements = usefulGodV3?.avoidElements || [];

  const dominantElement =
    elementBalanceV3?.dominantElement?.element || "";

  const weakestElement =
    elementBalanceV3?.weakestElement?.element || "";

  const annualTenGod =
    annualOverlayV3?.annualTenGods?.stemTenGod || "";

  const annualTheme =
    annualOverlayV3?.annualTheme || "Annual Influence";

  const annualElements =
    annualOverlayV3?.amplifiedElements || [];

  const dominantArchetype =
    archetypeOverlayV3?.dominantArchetype?.publicName ||
    "your active self-expression pattern";

  const isOutputYear =
    annualTenGod === "eatingGod" || annualTenGod === "hurtingOfficer";

  const isWealthYear =
    annualTenGod === "directWealth" || annualTenGod === "indirectWealth";

  const isOfficerYear =
    annualTenGod === "directOfficer" || annualTenGod === "sevenKilling";

  const isResourceYear =
    annualTenGod === "directResource" || annualTenGod === "indirectResource";

  return {
    career: buildCareerCard({
      isWeak,
  isStrong,
  isOutputYear,
  isOfficerYear,
  dominantArchetype,
  dominantArchetypeKey,
dominantArchetypeName,
  primaryUseful,
  annualTheme,
    }),

    wealth: buildWealthCard({
      isWeak,
      isStrong,
      isWealthYear,
      primaryUseful,
      secondaryUseful,
      annualTheme,
      dominantArchetypeKey,
dominantArchetypeName,
    }),

    relationship: buildRelationshipCard({
      isWeak,
      isOutputYear,
      annualTenGod,
      dominantArchetype,
      primaryUseful,
      dominantArchetypeKey,
dominantArchetypeName,
    }),

    health: buildHealthCard({
      isWeak,
      isStrong,
      dominantElement,
      weakestElement,
      primaryUseful,
      secondaryUseful,
      annualElements,
      dominantArchetypeKey,
dominantArchetypeName,
    }),

    method: "engine-v3-practical-guidance",
  };
}

function buildCareerCard({
  isWeak,
  isStrong,
  isOutputYear,
  isOfficerYear,
  dominantArchetype,
  primaryUseful,
  annualTheme,
  dominantArchetypeKey,
dominantArchetypeName,
}) {
        const archetypeCareerOverrides = {
    hurtingOfficer: {
      title: "Visibility & Personal Brand",
      focus: "Career",
      status: "Expression Driven",
      score: 80,
      explanation:
        "Your chart is currently led by The Rebel Voice archetype. Career growth comes from expressing ideas, sharing perspectives and allowing your individuality to be seen rather than staying hidden behind structure.",
      bullets: [
        "Build visibility through communication and content",
        "Share ideas rather than waiting for perfect conditions",
        "Your unique perspective is part of your value",
        "Avoid suppressing creativity to fit expectations",
      ],
    },

    friend: {
      title: "Collaboration & Network Growth",
      focus: "Career",
      status: "People-Oriented Growth",
      score: 75,
      explanation:
        "Your chart is currently led by The Companion archetype. Career growth comes through people, community, teamwork and environments where you can build trust over time.",
      bullets: [
        "Build through collaboration rather than doing everything alone",
        "Choose work environments with supportive people",
        "Strengthen your reputation through consistency and reliability",
        "Avoid comparing your progress too much with peers",
      ],
    },

    eatingGod: {
      title: "Creative Long-Term Building",
      focus: "Career",
      status: "Creative Growth",
      score: 76,
      explanation:
        "Your chart is currently led by The Creator archetype. Career growth comes through creativity, consistency and building work that feels naturally expressive rather than overly forced.",
      bullets: [
        "Build through ideas, taste, content or creative output",
        "Choose work that allows gradual refinement",
        "Let your natural style become part of your career value",
        "Avoid rushing results before the craft becomes stable",
      ],
    },

    directOfficer: {
      title: "Responsibility & Reputation Building",
      focus: "Career",
      status: "Structured Growth",
      score: 78,
      explanation:
        "Your chart is currently led by The Guardian archetype. Career growth comes from responsibility, structure, reliability and being trusted with important standards or systems.",
      bullets: [
        "Build professional credibility through consistency",
        "Respect structure, timelines and accountability",
        "Choose roles where reliability becomes visible",
        "Avoid carrying too much pressure without support",
      ],
    },

    sevenKilling: {
      title: "Leadership Through Action",
      focus: "Career",
      status: "High Pressure Growth",
      score: 79,
      explanation:
        "Your chart is currently led by The Warrior archetype. Career growth comes through courage, decisive action and handling pressure well, but pacing is important so ambition does not become burnout.",
      bullets: [
        "Take action where leadership is needed",
        "Use pressure as motivation, not self-punishment",
        "Choose challenges with clear direction",
        "Avoid proving yourself through constant intensity",
      ],
    },

    indirectWealth: {
      title: "Opportunity Recognition",
      focus: "Career",
      status: "Opportunity Driven",
      score: 77,
      explanation:
        "Your chart is currently led by The Opportunist archetype. Career growth comes through spotting openings, business instinct, networking and recognising where timing creates advantage.",
      bullets: [
        "Stay open to new business or income opportunities",
        "Use flexibility and observation before committing",
        "Build options instead of relying on one path",
        "Avoid chasing every opportunity without filtering",
      ],
    },

    robWealth: {
  title: "Independent Growth & Peer Awareness",
  focus: "Career",
  status: "Self-Directed Growth",
  score: 74,
  explanation:
    "Your chart is currently led by The Challenger archetype. Career growth comes from independence, confidence and learning how to hold your own direction without being overly affected by comparison or peer pressure.",
  bullets: [
    "Build confidence through skill, consistency and visible results",
    "Choose environments where initiative and self-direction are rewarded",
    "Use comparison as feedback, not as pressure",
    "Avoid scattering energy by reacting too quickly to what others are doing",
  ],
},

directResource: {
  title: "Learning & Supportive Growth",
  focus: "Career",
  status: "Knowledge Building",
  score: 73,
  explanation:
    "Your chart is currently led by The Nurturer archetype. Career growth comes from learning, support, guidance and building strong foundations before pursuing bigger visibility.",
  bullets: [
    "Invest in learning, mentorship and skill refinement",
    "Choose environments that support long-term development",
    "Build confidence through preparation and consistency",
    "Avoid hiding behind planning without taking action",
  ],
},

directWealth: {
  title: "Practical Results & Ownership",
  focus: "Career",
  status: "Results Driven",
  score: 77,
  explanation:
    "Your chart is currently led by The Builder archetype. Career growth comes through ownership, practical execution and creating visible outcomes that can be measured over time.",
  bullets: [
    "Focus on practical work that creates visible outcomes",
    "Build systems around money, workflow and delivery",
    "Choose responsibilities that reward consistency",
    "Avoid measuring progress only by speed",
  ],
},

indirectResource: {
  title: "Insight & Strategic Thinking",
  focus: "Career",
  status: "Intuitive Growth",
  score: 74,
  explanation:
    "Your chart is currently led by The Mystic archetype. Career growth comes from insight, research, pattern recognition and seeing possibilities others may miss.",
  bullets: [
    "Use intuition together with practical execution",
    "Choose work involving ideas, analysis or creative strategy",
    "Trust unconventional thinking when supported by evidence",
    "Avoid staying in planning mode without implementation",
  ],
},
  };

  if (archetypeCareerOverrides[dominantArchetypeKey]) {
    return archetypeCareerOverrides[dominantArchetypeKey];
  }
  if (isWeak && isOutputYear) {
    return {
      title: "Express Yourself, But Pace Your Energy",
      focus: "Career",
      status: "High Visibility, Needs Support",
      score: 76,
      explanation:
        `This year can make your ${dominantArchetype} side more visible at work. Ideas, opinions and expression may come through more strongly, but because the Day Master is weaker, pacing matters. Career growth is better when expression is supported by structure, rest and clear priorities.`,
      bullets: [
        "Good year to be seen for your ideas, taste or point of view",
        "Avoid saying yes to every opportunity just because it feels exciting",
        "Use clearer planning before taking on more responsibility",
        `Supportive ${primaryUseful || "restorative"} energy helps you stay steady under pressure`,
      ],
    };
  }

  if (isOfficerYear) {
    return {
      title: "Responsibility & Reputation Building",
      focus: "Career",
      status: "Structured Growth",
      score: 72,
      explanation:
        "This year may bring more responsibility, deadlines or expectations. Career luck improves when you show reliability without overloading yourself.",
      bullets: [
        "Good year to build professional credibility",
        "Respect structure, timelines and accountability",
        "Avoid rebelling against pressure too quickly",
        "Choose sustainable responsibility over short-term proving",
      ],
    };
  }

  return {
    title: "Steady Career Direction",
    focus: "Career",
    status: "Balanced Progress",
    score: 68,
    explanation:
      `Career energy is influenced by the ${annualTheme} pattern this year. Progress comes from refining your direction and choosing work that supports your long-term identity.`,
    bullets: [
      "Focus on consistency rather than sudden expansion",
      "Choose projects that strengthen your reputation",
      "Avoid scattering your energy across too many directions",
      "Keep your work rhythm realistic and repeatable",
    ],
  };
}

function buildWealthCard({
  isWeak,
  isStrong,
  isWealthYear,
  dominantArchetype,
  dominantArchetypeKey,
  primaryUseful,
  secondaryUseful,
  annualTheme,
}) {

  const archetypeWealthOverrides = {
  hurtingOfficer: {
    title: "Monetising Ideas & Visibility",
    focus: "Wealth",
    status: "Audience Growth",
    score: 80,
    explanation:
      "Your chart is currently led by The Rebel Voice archetype. Wealth grows through visibility, communication, content, influence and sharing ideas.",
    bullets: [
      "Build income through expertise and visibility",
      "Turn knowledge into products or services",
      "Focus on audience trust before monetisation",
      "Avoid chasing attention without strategy",
    ],
  },

  friend: {
    title: "Wealth Through Partnerships",
    focus: "Wealth",
    status: "Collaborative Growth",
    score: 75,
    explanation:
      "Your chart is currently led by The Companion archetype. Wealth grows through relationships, networks, referrals and strategic collaboration.",
    bullets: [
      "Build strong professional relationships",
      "Seek mutually beneficial collaborations",
      "Grow through community and referrals",
      "Avoid comparing your success with others",
    ],
  },

  robWealth: {
    title: "Financial Boundaries & Resource Control",
    focus: "Wealth",
    status: "Protect Resources",
    score: 72,
    explanation:
      "Your chart is currently led by The Challenger archetype. Wealth grows when you manage competition, comparison and shared resources with clearer boundaries.",
    bullets: [
      "Track where money, time and energy are leaking",
      "Avoid spending to keep up with others",
      "Use competition as motivation, not pressure",
      "Protect your resources before expanding",
    ],
  },

  eatingGod: {
    title: "Sustainable Wealth Through Craft",
    focus: "Wealth",
    status: "Slow Compounding",
    score: 76,
    explanation:
      "Your chart is currently led by The Creator archetype. Wealth grows through consistency, skill, taste, content quality and long-term refinement.",
    bullets: [
      "Build income from skills that improve over time",
      "Let quality and consistency become your advantage",
      "Create offers that feel natural and sustainable",
      "Avoid rushing monetisation before the craft is stable",
    ],
  },

  directWealth: {
    title: "Asset Building & Ownership",
    focus: "Wealth",
    status: "Practical Accumulation",
    score: 78,
    explanation:
      "Your chart is currently led by The Builder archetype. Wealth grows through ownership, systems, practical results and steady accumulation.",
    bullets: [
      "Focus on predictable income and measurable results",
      "Build systems around saving, pricing and delivery",
      "Choose practical assets over short-term excitement",
      "Avoid being overly rigid with money decisions",
    ],
  },

  indirectWealth: {
    title: "Opportunity & Multiple Income Streams",
    focus: "Wealth",
    status: "Opportunity Driven",
    score: 77,
    explanation:
      "Your chart is currently led by The Opportunist archetype. Wealth grows through flexibility, timing, business instinct and spotting openings.",
    bullets: [
      "Stay open to new income channels",
      "Test opportunities before committing too heavily",
      "Build options instead of relying on one path",
      "Avoid chasing every opportunity without filtering",
    ],
  },

  directOfficer: {
    title: "Structured Wealth Accumulation",
    focus: "Wealth",
    status: "Discipline Builds Wealth",
    score: 76,
    explanation:
      "Your chart is currently led by The Guardian archetype. Wealth grows through discipline, structure, credibility and responsible long-term planning.",
    bullets: [
      "Use structure to strengthen savings and income flow",
      "Build credibility before asking for bigger rewards",
      "Choose steady accumulation over risky shortcuts",
      "Avoid becoming too fearful or overly restricted",
    ],
  },

  sevenKilling: {
    title: "Calculated Risk & Strategic Growth",
    focus: "Wealth",
    status: "High Pressure Potential",
    score: 77,
    explanation:
      "Your chart is currently led by The Warrior archetype. Wealth grows through courage, decisive action and calculated risk, but only when pressure is managed well.",
    bullets: [
      "Take risks only when the downside is clear",
      "Use pressure to sharpen strategy, not create panic",
      "Build wealth through decisive but measured action",
      "Avoid impulsive moves just to prove yourself",
    ],
  },

  directResource: {
    title: "Knowledge-Based Wealth",
    focus: "Wealth",
    status: "Expertise Builds Value",
    score: 73,
    explanation:
      "Your chart is currently led by The Nurturer archetype. Wealth grows through knowledge, support, education, guidance and building trusted expertise.",
    bullets: [
      "Invest in skills, training and professional knowledge",
      "Turn learning into practical services or guidance",
      "Build trust before scaling income",
      "Avoid staying in preparation mode for too long",
    ],
  },

  indirectResource: {
    title: "Insight-Led Opportunities",
    focus: "Wealth",
    status: "Strategic Intuition",
    score: 74,
    explanation:
      "Your chart is currently led by The Mystic archetype. Wealth grows through insight, research, intuition, pattern recognition and unconventional ideas.",
    bullets: [
      "Use research and intuition together",
      "Look for opportunities others may overlook",
      "Turn ideas into clear practical steps",
      "Avoid staying too abstract without execution",
    ],
  },
};
    
    if (archetypeWealthOverrides[dominantArchetypeKey]) {
  return archetypeWealthOverrides[dominantArchetypeKey];
}
  if (isWeak) {
    return {
      title: "Stabilise Before Expanding Wealth",
      focus: "Wealth",
      status: "Plan Carefully",
      score: 64,
      explanation:
        "When the Day Master is weaker, wealth opportunities should be handled with more pacing. The priority is not only making money, but keeping enough energy, clarity and support to manage money well.",
      bullets: [
        "Avoid impulsive purchases, investments or commitments",
        "Strengthen savings, buffers and predictable income first",
        "Do not chase opportunity from emotional urgency",
        `Supportive ${primaryUseful || "resource"} and ${secondaryUseful || "stabilising"} energy helps decision-making`,
      ],
    };
  }

  if (isWealthYear) {
    return {
      title: "Opportunity With Better Control",
      focus: "Wealth",
      status: "Active",
      score: 78,
      explanation:
        "This year can open more movement around income, business or material goals. The key is to act with strategy instead of speed.",
      bullets: [
        "Good year to improve income channels",
        "Separate real opportunity from short-term excitement",
        "Plan before making bigger financial moves",
        "Focus on wealth systems, not only one-off gains",
      ],
    };
  }

  return {
    title: "Practical Wealth Management",
    focus: "Wealth",
    status: "Stable",
    score: 66,
    explanation:
      `The ${annualTheme} influence supports a more practical approach to wealth. Money decisions are better when they are paced, planned and aligned with your actual priorities.`,
    bullets: [
      "Review spending habits and recurring commitments",
      "Build financial clarity before expansion",
      "Avoid comparing your pace with others",
      "Keep wealth decisions grounded and realistic",
    ],
  };
}

function buildRelationshipCard({
  isWeak,
  isOutputYear,
  annualTenGod,
  dominantArchetype,
  primaryUseful,
  dominantArchetypeKey,
  dominantArchetypeName,
}) {
  const archetypeRelationshipOverrides = {
    hurtingOfficer: {
      title: "Clear Expression, Softer Delivery",
      focus: "Relationship",
      status: "Emotionally Expressive",
      score: 72,
      explanation:
        "Your chart is currently led by The Rebel Voice archetype. Relationships improve when honesty is balanced with patience and emotional awareness.",
      bullets: [
        "Speak honestly without reacting too quickly",
        "Let the other person have space to respond",
        "Do not assume silence means rejection",
        "Use calming energy before emotionally important conversations",
      ],
    },

    friend: {
      title: "Shared Experiences & Emotional Safety",
      focus: "Relationship",
      status: "Connection Through Friendship",
      score: 75,
      explanation:
        "Your chart is currently led by The Companion archetype. Relationships grow through trust, shared experiences and emotional reliability.",
      bullets: [
        "Build friendship before forcing deeper commitment",
        "Create consistency through repeated actions",
        "Value emotional reliability over intensity",
        "Avoid comparing your relationship to others",
      ],
    },
    robWealth: {
  title: "Independence With Emotional Boundaries",
  focus: "Relationship",
  status: "Needs Space & Clarity",
  score: 70,
  explanation:
    "Your chart is currently led by The Challenger archetype. Relationships improve when independence is respected and comparison, insecurity or power struggles are kept in check.",
  bullets: [
    "Be honest about your need for space",
    "Avoid testing the other person through jealousy or comparison",
    "Choose people who respect your independence",
    "Turn conflict into clearer boundaries, not competition",
  ],
},

eatingGod: {
  title: "Comfort, Warmth & Emotional Presence",
  focus: "Relationship",
  status: "Gentle Connection",
  score: 74,
  explanation:
    "Your chart is currently led by The Creator archetype. Relationships grow through comfort, warmth, presence and small acts of care.",
  bullets: [
    "Show affection through consistent small gestures",
    "Let comfort build naturally over time",
    "Choose people who appreciate your softer side",
    "Avoid becoming passive when something needs to be said",
  ],
},

directWealth: {
  title: "Stable Commitment & Practical Care",
  focus: "Relationship",
  status: "Steady Support",
  score: 73,
  explanation:
    "Your chart is currently led by The Builder archetype. Relationships improve when love is shown through reliability, responsibility and practical care.",
  bullets: [
    "Build trust through consistent actions",
    "Clarify expectations around time, money and commitment",
    "Show care in practical ways",
    "Avoid treating relationship like a task list",
  ],
},

indirectWealth: {
  title: "Freedom, Excitement & Emotional Honesty",
  focus: "Relationship",
  status: "Flexible Connection",
  score: 72,
  explanation:
    "Your chart is currently led by The Opportunist archetype. Relationships grow when there is freedom, curiosity and honest communication about changing needs.",
  bullets: [
    "Keep the connection fresh without creating instability",
    "Be honest when your needs change",
    "Choose people who give both freedom and consistency",
    "Avoid chasing excitement at the cost of emotional safety",
  ],
},

directOfficer: {
  title: "Trust Through Consistency",
  focus: "Relationship",
  status: "Secure Structure",
  score: 74,
  explanation:
    "Your chart is currently led by The Guardian archetype. Relationships improve through consistency, respect, reliability and clear emotional expectations.",
  bullets: [
    "Choose people whose actions match their words",
    "Let trust build through repeated consistency",
    "Communicate expectations clearly",
    "Avoid becoming too guarded or overly serious",
  ],
},

sevenKilling: {
  title: "Intensity With Emotional Safety",
  focus: "Relationship",
  status: "High Intensity",
  score: 71,
  explanation:
    "Your chart is currently led by The Warrior archetype. Relationships can feel intense, passionate or pressure-filled, so emotional safety and pacing matter.",
  bullets: [
    "Slow down before reacting in conflict",
    "Choose emotional safety over intensity alone",
    "Avoid turning vulnerability into defensiveness",
    "Let trust grow through calm consistency",
  ],
},

directResource: {
  title: "Nurturing Support & Reassurance",
  focus: "Relationship",
  status: "Emotional Support",
  score: 73,
  explanation:
    "Your chart is currently led by The Nurturer archetype. Relationships grow through reassurance, patience, emotional support and feeling safe enough to soften.",
  bullets: [
    "Choose people who feel emotionally safe",
    "Ask for reassurance instead of silently overthinking",
    "Let support flow both ways",
    "Avoid becoming too dependent on external comfort",
  ],
},

indirectResource: {
  title: "Emotional Understanding & Intuition",
  focus: "Relationship",
  status: "Intuitive Bonding",
  score: 72,
  explanation:
    "Your chart is currently led by The Mystic archetype. Relationships improve when intuition is balanced with clear communication instead of silent guessing.",
  bullets: [
    "Use intuition, but confirm instead of assuming",
    "Share your inner world in simple words",
    "Choose people who respect your emotional sensitivity",
    "Avoid disappearing into overthinking or fantasy",
  ],
},
  };

  if (archetypeRelationshipOverrides[dominantArchetypeKey]) {
    return archetypeRelationshipOverrides[dominantArchetypeKey];
  }

  if (isOutputYear) {
    return {
      title: "Clear Expression, Softer Delivery",
      focus: "Relationship",
      status: "Emotionally Expressive",
      score: 72,
      explanation:
        `This year strengthens expression, so your ${dominantArchetype} side may become more direct. This can help honesty, but it may also create misunderstandings if emotions move faster than reflection.`,
      bullets: [
        "Speak honestly, but avoid reacting too quickly",
        "Let the other person have space to respond",
        "Do not assume silence means rejection",
        `Use ${primaryUseful || "supportive"} energy to slow down before emotionally important conversations`,
      ],
    };
  }

  if (isWeak) {
    return {
      title: "Reassurance & Emotional Safety",
      focus: "Relationship",
      status: "Needs Warmth",
      score: 68,
      explanation:
        "When the Day Master is weaker, relationships should feel supportive rather than draining. Emotional security, reassurance and steady communication matter more this year.",
      bullets: [
        "Choose people who feel calm and consistent",
        "Avoid carrying every feeling internally",
        "Communicate needs before resentment builds",
        "Do not over-give just to keep connection stable",
      ],
    };
  }

  return {
    title: "Balanced Communication",
    focus: "Relationship",
    status: "Stable",
    score: 66,
    explanation:
      "Relationship energy is best handled through steady communication, emotional clarity and consistency this year.",
    bullets: [
      "Avoid guessing too much from small signals",
      "Let connection develop through repeated actions",
      "Speak clearly without forcing outcomes",
      "Prioritise emotional steadiness over intensity",
    ],
  };
}

function buildHealthCard({
  isWeak,
  isStrong,
  dominantElement,
  weakestElement,
  primaryUseful,
  secondaryUseful,
  annualElements,
  dominantArchetypeKey,
  dominantArchetypeName,
}) {
  const archetypeHealthOverrides = {
  hurtingOfficer: {
    title: "Nervous System & Expression Balance",
    focus: "Health",
    status: "Regulate Expression",
    score: 66,
    explanation:
      "Your chart is currently led by The Rebel Voice archetype. Health improves when strong expression is balanced with rest, emotional regulation and nervous system recovery.",
    bullets: [
      "Avoid holding tension in the body after conflict",
      "Use movement, breathing or journaling to discharge emotion",
      "Protect sleep when communication demands increase",
      "Slow down before emotional intensity becomes physical stress",
    ],
  },

  friend: {
    title: "Emotional Co-Regulation",
    focus: "Health",
    status: "Supportive Rhythm",
    score: 66,
    explanation:
      "Your chart is currently led by The Companion archetype. Health improves when your environment, relationships and daily rhythm feel emotionally steady.",
    bullets: [
      "Spend time with people who calm your system",
      "Avoid absorbing other people's stress too deeply",
      "Create routines that support emotional steadiness",
      "Balance social energy with private recovery time",
    ],
  },

  eatingGod: {
  title: "Creative Recovery & Sustainable Rhythm",
  focus: "Health",
  status: "Protect Energy Flow",
  score: 74,
  explanation:
    "Your chart is currently led by The Creator archetype. Health improves when creativity, enjoyment and self-expression are balanced with consistency and recovery.",
  bullets: [
    "Build routines that feel enjoyable and sustainable",
    "Use creative hobbies to recharge emotionally",
    "Avoid burnout from turning every passion into work",
    "Protect recovery before productivity drops",
  ],
},

directOfficer: {
  title: "Structure, Discipline & Physical Stability",
  focus: "Health",
  status: "Stable Routine",
  score: 76,
  explanation:
    "Your chart is currently led by The Guardian archetype. Health improves through structure, routine, discipline and consistency rather than sudden changes.",
  bullets: [
    "Maintain regular sleep and meal schedules",
    "Build sustainable habits instead of extreme programs",
    "Use structure to reduce mental stress",
    "Avoid carrying responsibility without recovery",
  ],
},

sevenKilling: {
  title: "Pressure Management & Controlled Intensity",
  focus: "Health",
  status: "Regulate Stress",
  score: 75,
  explanation:
    "Your chart is currently led by The Warrior archetype. Health improves when ambition and intensity are balanced with recovery and nervous system regulation.",
  bullets: [
    "Use exercise to release excess pressure",
    "Watch for stress accumulation during busy periods",
    "Avoid treating rest as weakness",
    "Balance achievement with recovery",
  ],
},

indirectWealth: {
  title: "Adaptability Without Overextension",
  focus: "Health",
  status: "Manage Energy Leaks",
  score: 73,
  explanation:
    "Your chart is currently led by The Opportunist archetype. Health improves when flexibility is balanced with boundaries and energy conservation.",
  bullets: [
    "Avoid overcommitting to every opportunity",
    "Protect energy before expanding responsibilities",
    "Leave space between commitments",
    "Balance exploration with recovery",
  ],
},

directWealth: {
  title: "Physical Resources & Sustainable Output",
  focus: "Health",
  status: "Protect Vitality",
  score: 74,
  explanation:
    "Your chart is currently led by The Builder archetype. Health improves when physical resources, recovery and consistency are prioritised.",
  bullets: [
    "Respect physical limits before exhaustion appears",
    "Build routines that support long-term stamina",
    "Avoid sacrificing health for short-term results",
    "Focus on consistency over intensity",
  ],
},

directResource: {
  title: "Restoration, Learning & Inner Recovery",
  focus: "Health",
  status: "Recovery Focus",
  score: 75,
  explanation:
    "Your chart is currently led by The Nurturer archetype. Health improves when rest, support and emotional recovery are given adequate space.",
  bullets: [
    "Prioritise sleep and nervous system recovery",
    "Accept support when needed",
    "Create emotionally safe environments",
    "Avoid excessive worrying and overthinking",
  ],
},

indirectResource: {
  title: "Mental Clarity & Emotional Processing",
  focus: "Health",
  status: "Mind-Body Balance",
  score: 74,
  explanation:
    "Your chart is currently led by The Mystic archetype. Health improves when mental stimulation is balanced with grounding and practical routines.",
  bullets: [
    "Create time for reflection and processing",
    "Ground ideas through physical activity",
    "Avoid staying trapped in mental loops",
    "Balance intuition with daily structure",
  ],
},

robWealth: {
  title: "Self-Worth & Emotional Boundaries",
  focus: "Health",
  status: "Protect Personal Energy",
  score: 73,
  explanation:
    "Your chart is currently led by The Challenger archetype. Health improves when comparison, competition and external pressure are managed constructively.",
  bullets: [
    "Avoid measuring your worth against others",
    "Use competition as motivation, not stress",
    "Protect emotional boundaries",
    "Build confidence through personal progress",
  ],
},
};

if (archetypeHealthOverrides[dominantArchetypeKey]) {
  return archetypeHealthOverrides[dominantArchetypeKey];
}

  if (isWeak) {
    return {
      title: "Restore Energy Before Pushing Harder",
      focus: "Health",
      status: "Recovery Priority",
      score: 62,
      explanation:
        `Your chart shows weaker core energy, so recovery becomes important. With ${dominantElement || "dominant"} energy stronger and ${weakestElement || "weaker"} energy lower, the body may need more rhythm, hydration, rest and emotional regulation.`,
      bullets: [
        "Prioritise sleep quality, hydration and consistent meals",
        "Avoid pushing through tiredness for too long",
        "Create simple routines that rebuild baseline energy",
        `Supportive ${primaryUseful || "restorative"} and ${secondaryUseful || "balancing"} energy should be protected`,
      ],
    };
  }

  if (isStrong) {
    return {
      title: "Regulate Excess Activation",
      focus: "Health",
      status: "Watch Overheating",
      score: 66,
      explanation:
        "When core energy is strong, the issue is less about weakness and more about regulation. Overwork, impatience or emotional heat may build if there is no release.",
      bullets: [
        "Avoid overloading your schedule",
        "Use movement to discharge excess stress",
        "Watch sleep, inflammation and emotional intensity",
        "Balance ambition with recovery",
      ],
    };
  }

  return {
    title: "Maintain Daily Balance",
    focus: "Health",
    status: "Stable",
    score: 68,
    explanation:
      "Health energy is manageable when daily rhythm is stable. Small habits matter more than extreme changes.",
    bullets: [
      "Keep sleep, food and movement consistent",
      "Rest before burnout becomes obvious",
      "Use grounding routines when mentally busy",
      "Avoid sudden lifestyle extremes",
    ],
  };
}