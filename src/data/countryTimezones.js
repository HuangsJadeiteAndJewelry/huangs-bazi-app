export const COUNTRY_TIMEZONES = {
  Singapore: "Singapore",
  Malaysia: "Malaysia",
  Thailand: "Thailand",
  Indonesia: "Indonesia",
  China: "China",
  Taiwan: "Taiwan",
  "Hong Kong": "Hong Kong",
  Japan: "Japan",
  "South Korea": "South Korea",
  Australia: "Australia",
  "United Kingdom": "Europe",
  "United States": "America",
};

export function getTimezoneFromBirthCountry(birthCountry) {
  return COUNTRY_TIMEZONES[birthCountry] || "UTC";
}