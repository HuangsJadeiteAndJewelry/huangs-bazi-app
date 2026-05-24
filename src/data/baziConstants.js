export const ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"];

export const POLARITIES = {
  YANG: "Yang",
  YIN: "Yin",
};

export const HEAVENLY_STEMS = [
  { index: 0, key: "jia", zh: "甲", name: "Jia", label: "Jia Wood", element: "Wood", polarity: "Yang" },
  { index: 1, key: "yi", zh: "乙", name: "Yi", label: "Yi Wood", element: "Wood", polarity: "Yin" },
  { index: 2, key: "bing", zh: "丙", name: "Bing", label: "Bing Fire", element: "Fire", polarity: "Yang" },
  { index: 3, key: "ding", zh: "丁", name: "Ding", label: "Ding Fire", element: "Fire", polarity: "Yin" },
  { index: 4, key: "wu", zh: "戊", name: "Wu", label: "Wu Earth", element: "Earth", polarity: "Yang" },
  { index: 5, key: "ji", zh: "己", name: "Ji", label: "Ji Earth", element: "Earth", polarity: "Yin" },
  { index: 6, key: "geng", zh: "庚", name: "Geng", label: "Geng Metal", element: "Metal", polarity: "Yang" },
  { index: 7, key: "xin", zh: "辛", name: "Xin", label: "Xin Metal", element: "Metal", polarity: "Yin" },
  { index: 8, key: "ren", zh: "壬", name: "Ren", label: "Ren Water", element: "Water", polarity: "Yang" },
  { index: 9, key: "gui", zh: "癸", name: "Gui", label: "Gui Water", element: "Water", polarity: "Yin" },
];

export const EARTHLY_BRANCHES = [
  { index: 0, key: "zi", zh: "子", animal: "Rat", element: "Water", polarity: "Yang", hiddenStems: ["gui"] },
  { index: 1, key: "chou", zh: "丑", animal: "Ox", element: "Earth", polarity: "Yin", hiddenStems: ["ji", "gui", "xin"] },
  { index: 2, key: "yin", zh: "寅", animal: "Tiger", element: "Wood", polarity: "Yang", hiddenStems: ["jia", "bing", "wu"] },
  { index: 3, key: "mao", zh: "卯", animal: "Rabbit", element: "Wood", polarity: "Yin", hiddenStems: ["yi"] },
  { index: 4, key: "chen", zh: "辰", animal: "Dragon", element: "Earth", polarity: "Yang", hiddenStems: ["wu", "yi", "gui"] },
  { index: 5, key: "si", zh: "巳", animal: "Snake", element: "Fire", polarity: "Yin", hiddenStems: ["bing", "wu", "geng"] },
  { index: 6, key: "wu", zh: "午", animal: "Horse", element: "Fire", polarity: "Yang", hiddenStems: ["ding", "ji"] },
  { index: 7, key: "wei", zh: "未", animal: "Goat", element: "Earth", polarity: "Yin", hiddenStems: ["ji", "ding", "yi"] },
  { index: 8, key: "shen", zh: "申", animal: "Monkey", element: "Metal", polarity: "Yang", hiddenStems: ["geng", "ren", "wu"] },
  { index: 9, key: "you", zh: "酉", animal: "Rooster", element: "Metal", polarity: "Yin", hiddenStems: ["xin"] },
  { index: 10, key: "xu", zh: "戌", animal: "Dog", element: "Earth", polarity: "Yang", hiddenStems: ["wu", "xin", "ding"] },
  { index: 11, key: "hai", zh: "亥", animal: "Pig", element: "Water", polarity: "Yin", hiddenStems: ["ren", "jia"] },
];

export const GENERATES = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood",
};

export const CONTROLS = {
  Wood: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Wood",
};

export const TEN_GODS = [
  "Friend",
  "Rob Wealth",
  "Eating God",
  "Hurting Officer",
  "Direct Wealth",
  "Indirect Wealth",
  "Direct Officer",
  "Seven Killings",
  "Direct Resource",
  "Indirect Resource",
];

export const STEM_WEIGHT = 1;
export const BRANCH_MAIN_ELEMENT_WEIGHT = 1;
export const HIDDEN_STEM_WEIGHT = 0.35;

export const DAY_MASTER_STRENGTH_THRESHOLDS = {
  weakBelow: 0.42,
  strongAbove: 0.58,
};

export function getStem(key) {
  const stem = HEAVENLY_STEMS.find((item) => item.key === key || item.zh === key);
  if (!stem) throw new Error(`Unknown heavenly stem: ${key}`);
  return stem;
}

export function getBranch(key) {
  const branch = EARTHLY_BRANCHES.find((item) => item.key === key || item.zh === key);
  if (!branch) throw new Error(`Unknown earthly branch: ${key}`);
  return branch;
}

export function getStemIndex(key) {
  return getStem(key).index;
}

export function getBranchIndex(key) {
  return getBranch(key).index;
}

export function cycleMod(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}