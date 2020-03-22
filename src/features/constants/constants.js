export const READINGS = {
  altitude: 'AIR_ALTITUDE',
  aqiRange: 'AIR_AQI_RANGE',
  humidity: 'AIR_HUMIDITY',
  pm1: 'AIR_PM1',
  pm10: 'AIR_PM10',
  pm10_range: 'AIR_PM10_RANGE',
  pm25: 'AIR_PM2P5',
  pm25_range: 'AIR_PM2P5_RANGE',
  pressure: 'AIR_PRESSURE',
  temperature: 'AIR_TEMPERATURE',
  temperatureFeel: 'AIR_TEMPERATURE_FEEL',
  soilTemperature: 'SOIL_TEMPERATURE',
  deviceTemperature: 'DEVICE_TEMPERATURE',
  soilMoisture: 'SOIL_MOISTURE',
  airCo2: 'AIR_CO2',
  airECo2: 'AIR_ECO2',
  airTVOC: 'AIR_TVOC',
  airVOC: 'AIR_VOC',
  batteryPercentage: 'BATTERY_PERCENTAGE',
  batteryVoltage: 'BATTERY_VOLTAGE',
  distance: 'DISTANCE',
  lightIntensity: 'LIGHT_INTENSITY',
  motion: 'MOTION',
  waterLevel: 'WATER_LEVEL_SWITCH'
}

export const CITY_READINGS = {
  pm1: 'AIR_PM1_CITY',
  pm10: 'AIR_PM10_CITY',
  pm25: 'AIR_PM2P5_CITY',
}

export const EXCLUDED_READINGS = [READINGS.aqiRange, READINGS.pm10_range, READINGS.pm25_range];

const formatPressure = (data) => {
  if(!data) return null;
  const newData = {...data};
  newData.value = Math.round( data.value / 100 );
  newData.unit = 'hPa';
  return newData;
}

export const FORMAT_READINGS_DATA = {
  [READINGS.pressure]: formatPressure,
}