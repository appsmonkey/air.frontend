import { FormatPM } from "../../helpers/formatStrings";
import { READINGS, CITY_READINGS } from "../../constants/constants";

export const _deviceFilters = {
  indoor: { value: 'indoor', label: "Indoor" },
  outdoor: { value: 'outdoor', label: "Outdoor" },
  offline: { value: 'offline', label: "Offline" },
  online: { value: 'online', label: "Online" },
  mine: { value: 'mine', label: 'Mine' },
};

// DEFAULT FILTERS
export const _chartFilters = {
  [READINGS.pm1]: { value: READINGS.pm1, label: "PM 1" },
  [READINGS.pm25]: { value: READINGS.pm25, label: "PM 2.5" },
  [READINGS.pm10]: { value: READINGS.pm10, label: "PM 10" },
  [READINGS.temperature]: { value: READINGS.temperature, label: `Temperature` },
  [READINGS.humidity]: { value: READINGS.humidity, label: `Humidity` },
}

export const _filterOrderSensors = [READINGS.pm1, READINGS.pm25, READINGS.pm10, CITY_READINGS.pm1, CITY_READINGS.pm25, CITY_READINGS.pm10, READINGS.temperature, READINGS.humidity];

export const _leftChartSensors = [READINGS.temperature, READINGS.humidity, READINGS.soilMoisture, READINGS.soilTemperature];