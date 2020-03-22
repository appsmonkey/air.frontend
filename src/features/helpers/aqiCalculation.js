import isEmpty from 'lodash/isEmpty';

export const getLvlBasedOnValue = (sensor, value) => {
  let level = "ok";
  if(!value) return null;
  if (!sensor)
    return level.toLowerCase();

  if(isEmpty(sensor.steps) && sensor.default)
    return sensor.default.toLowerCase();

  sensor.steps.some(step => {
    if (value >= step.from && value < step.to) {
      level = step.result;
      return true;
    }
  })

  return level.toLowerCase();
}