import { READINGS } from "../../constants/constants";

export default {
  [READINGS.altitude]: {from: 0, to: 1000, minPercentage: 10},
  [READINGS.aqiRange]: {from: 0, to: 500, minPercentage: 10},
  [READINGS.humidity]: {from: 0, to: 100, minPercentage: 10},
  [READINGS.pm1]: {from: 0, to: 500, minPercentage: 10},
  [READINGS.pm10]: {from: 0, to: 500, minPercentage: 10},
  [READINGS.pm10_range]: {from: 0, to: 500, minPercentage: 10},
  [READINGS.pm25]: {from: 0, to: 500, minPercentage: 10},
  [READINGS.pm25_range]: {from: 0, to: 500, minPercentage: 10},
  [READINGS.pressure]: {from: 300, to: 1100, minPercentage: 10},
  [READINGS.temperature]: {from: 0, to: 40, minPercentage: 10},
  [READINGS.temperatureFeel]: {from: 0, to: 40, minPercentage: 10},
  [READINGS.soilTemperature]: { from: 0, to: 40, minPercentage: 10 },
  [READINGS.deviceTemperature]: { from: 0, to: 80, minPercentage: 10 },
  [READINGS.soilMoisture]: { from: 0, to: 100, minPercentage: 10 },
  [READINGS.airCo2]: { from: 400, to: 1500, minPercentage: 10 },
  [READINGS.airECo2]: { from: 400, to: 1500, minPercentage: 10 },
  [READINGS.airTVOC]: { from: 0, to: 700, minPercentage: 10 },
  [READINGS.airVOC]: { from: 0, to: 700, minPercentage: 10 },
  [READINGS.batteryPercentage]: { from: 0, to: 100, minPercentage: 0 },
  [READINGS.batteryVoltage]: { from: 0, to: 4.2, minPercentage: 0 },
  [READINGS.distance]: { from: 0, to: 200, minPercentage: 10 },
  [READINGS.lightIntensity]: { from: 0, to: 65535, minPercentage: 0 },
  [READINGS.motion]: { from: 0, to: 1, minPercentage: 0 },
  [READINGS.waterLevel]: { from: 0, to: 1, minPercentage: 0 },
}