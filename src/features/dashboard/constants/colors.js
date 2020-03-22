import { READINGS } from "../../constants/constants";

export const COLOR_PALETTE = [
  { name: 'darkblue', value: "#00008b"},
  { name: 'darkmagenta', value: "#49008b"},
  { name: 'darkorange', value: "#ff8c00"},
  { name: 'darkorchid', value: "#b88acf"},
  { name: 'darksalmon', value: "#e9967a"},
  { name: 'darkviolet', value: "#9e325f"},
  { name: 'khaki', value: "#f0e68c"},
  { name: 'magenta', value: "#0aa5e0"},
  { name: 'maroon', value: "#800000"},
  { name: 'navy', value: "#6e6ebf"},
  { name: 'olive', value: "#808000"},
  { name: 'orange', value: "#ffbd45"},
  { name: 'pink', value: "#ffc0cb"},
  { name: 'violet', value: "#3c98a6"},
  { name: 'red', value: "#da4545"},
  { name: 'silver', value: "#c0c0c0"},
  { name: 'yellow', value: "#b2da11"},
];


// PREDEFINED CHART SENSOR COLORS
export const SENSOR_CHART_COLORS = {
  [READINGS.pm25]: 'black',
  [READINGS.pm1]: '#f553de',
  [READINGS.pm10]: 'purple',
  [READINGS.temperature]: 'green',
  [READINGS.humidity]: 'blue'
}