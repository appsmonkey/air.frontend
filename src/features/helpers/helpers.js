import { FORMAT_READINGS_DATA, READINGS, CITY_READINGS } from "../constants/constants"
import moment from 'moment';
import { COLOR_PALETTE, SENSOR_CHART_COLORS } from "../dashboard/constants/colors";

export default class Helpers {
  static formatSensorData = (data, sensor) => {
    if(FORMAT_READINGS_DATA[sensor]){
      return FORMAT_READINGS_DATA[sensor](data);
    }else {
      return data;
    }
  }

  static generateChartFromTimestamp = (timeFilter) => {
    switch(timeFilter){
      case 'live':
        return  moment().subtract(5, 'hours').unix();
      case 'day':
        return  moment().subtract(24, 'hours').unix();
      case 'week':
        return  moment().subtract(7, 'days').unix();
      case 'month':
        return  moment().subtract(30, 'days').unix();
      default:
        return 634265634;
    }
  }

  static trimString = (value = "", length) => {
    if(value.length > length){
      return value.substring(0, length) + "...";
    }else return value;
  }

  static getChartSensorColors = () => {
    let sensorColors = {};
    let colorIndex = 0;
    let ALL_READINGS = {...READINGS, ...CITY_READINGS};

    Object.keys(ALL_READINGS).forEach(key=>{
      if(Object.keys(SENSOR_CHART_COLORS).some(sensor => sensor === ALL_READINGS[key])) {
        // Sensor already have defined color
        return;
      }
      if(colorIndex >= COLOR_PALETTE.length) colorIndex = 0;

      sensorColors[ALL_READINGS[key]] = COLOR_PALETTE[colorIndex].value;
      colorIndex++;
    })

    return {...SENSOR_CHART_COLORS, ...sensorColors};
  }
}