export const SOLAR_MONTH_BOUNDARIES_APPROX = [
  { startCode: 204, branch: "yin", label: "Li Chun approx" },
  { startCode: 306, branch: "mao", label: "Jing Zhe approx" },
  { startCode: 405, branch: "chen", label: "Qing Ming approx" },
  { startCode: 506, branch: "si", label: "Li Xia approx" },
  { startCode: 606, branch: "wu", label: "Mang Zhong approx" },
  { startCode: 707, branch: "wei", label: "Xiao Shu approx" },
  { startCode: 808, branch: "shen", label: "Li Qiu approx" },
  { startCode: 908, branch: "you", label: "Bai Lu approx" },
  { startCode: 1008, branch: "xu", label: "Han Lu approx" },
  { startCode: 1107, branch: "hai", label: "Li Dong approx" },
  { startCode: 1207, branch: "zi", label: "Da Xue approx" },
  { startCode: 106, branch: "chou", label: "Xiao Han approx" },
];

export const SEASONAL_ELEMENT_WEIGHT = {
  yin: { Wood: 1.4, Fire: 1.1, Earth: 0.9, Metal: 0.7, Water: 0.9 },
  mao: { Wood: 1.5, Fire: 1.1, Earth: 0.8, Metal: 0.7, Water: 0.8 },
  chen: { Wood: 1.1, Fire: 0.9, Earth: 1.3, Metal: 0.8, Water: 0.9 },
  si: { Wood: 0.9, Fire: 1.4, Earth: 1.1, Metal: 0.8, Water: 0.7 },
  wu: { Wood: 0.8, Fire: 1.5, Earth: 1.2, Metal: 0.7, Water: 0.6 },
  wei: { Wood: 0.9, Fire: 1.1, Earth: 1.4, Metal: 0.8, Water: 0.7 },
  shen: { Wood: 0.7, Fire: 0.8, Earth: 1.0, Metal: 1.4, Water: 1.1 },
  you: { Wood: 0.6, Fire: 0.7, Earth: 0.9, Metal: 1.5, Water: 1.0 },
  xu: { Wood: 0.7, Fire: 0.9, Earth: 1.4, Metal: 1.1, Water: 0.8 },
  hai: { Wood: 1.1, Fire: 0.7, Earth: 0.8, Metal: 0.9, Water: 1.4 },
  zi: { Wood: 1.0, Fire: 0.6, Earth: 0.7, Metal: 0.9, Water: 1.5 },
  chou: { Wood: 0.8, Fire: 0.7, Earth: 1.3, Metal: 0.9, Water: 1.1 },
};

export function getSolarYearApprox(year, month, day) {
  const beforeLiChun = month < 2 || (month === 2 && day < 4);
  return beforeLiChun ? year - 1 : year;
}

export function getSolarMonthBranchApprox(month, day) {
  const dateCode = month * 100 + day;

  if (dateCode < 106) return "zi";
  if (dateCode >= 106 && dateCode < 204) return "chou";

  let selectedBranch = "chou";

  for (const boundary of SOLAR_MONTH_BOUNDARIES_APPROX) {
    if (boundary.startCode >= 204 && dateCode >= boundary.startCode) {
      selectedBranch = boundary.branch;
    }
  }

  return selectedBranch;
}