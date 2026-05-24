export const COUNTRY_TIMEZONES = {
  Singapore: "Asia/Singapore",
  Malaysia: "Asia/Kuala_Lumpur",
  Thailand: "Asia/Bangkok",
  Indonesia: "Asia/Jakarta",
  China: "Asia/Shanghai",
  Taiwan: "Asia/Taipei",
  HongKong: "Asia/Hong_Kong",
  Japan: "Asia/Tokyo",
  SouthKorea: "Asia/Seoul",
  Australia: "Australia/Sydney",
  UnitedKingdom: "Europe/London",
  UnitedStates: "America/New_York",
};

export function getTimezoneFromBirthCountry(birthCountry) {
  return COUNTRY_TIMEZONES[birthCountry] || "UTC";
}