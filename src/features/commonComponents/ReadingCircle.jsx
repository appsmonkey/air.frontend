import React from 'react';
import styled from "styled-components";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import color_scale from "../map/data/color_scale";
import { ReactComponent as GreatIcon } from "../map/assets/great.svg";
import { ReactComponent as OkIcon } from "../map/assets/ok.svg";
import { ReactComponent as GoodIcon } from "../map/assets/good.svg";
import { ReactComponent as UnhealthyIcon } from "../map/assets/unhealthy.svg";
import { ReactComponent as VeryUnhealthyIcon } from "../map/assets/very_unhealthy.svg";
import { ReactComponent as HazardousIcon } from "../map/assets/hazardous.svg";
import altitudeIcon from '../map/assets/altitude@3x.png';
import pm1Icon from '../map/assets/pm@3x.png';
import pressureIcon from '../map/assets/pressure@3x.png';
import tempFeelLikeIcon from '../map/assets/tempfeelslike@3x.png';
import coIcon from '../map/assets/co@3x.png';
import co2Icon from '../map/assets/co2@3x.png';
import gasIcon from '../map/assets/gas@3x.png';
import lightIcon from '../map/assets/light@3x.png';
import luxIcon from '../map/assets/lux@3x.png';
import noiseIcon from '../map/assets/noise@3x.png';
import humidityIcon from '../map/assets/humidity@3x.png';
import soilMoistureIcon from '../map/assets/soilmoisture@3x.png';
import soilTemp from '../map/assets/soiltemp@3x.png';
import temperatureIcon from '../map/assets/temperature@3x.png';
import vocIcon from '../map/assets/voc@3x.png';
import sensorDefaultIcon from '../map/assets/sensor-default@3x.png';

import { RibbonGreat, RibbonOk, RibbonSensitive, RibbonUnhealthy, RibbonVeryUnhealthy, RibbonHazardous, TemperatureIcon, TempFeelsLikeIcon, HumidityIcon, RibbonDefault } from "../dashboard/styles/dashboardStyles";
import GradientSVG from './Gradient';
import { READINGS } from '../constants/constants';


const GreatIconWrapper = styled(GreatIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
`;

const OkIconWrapper = styled(OkIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
`;

const GoodIconWrapper = styled(GoodIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
`;

const UnhealthyIconWrapper = styled(UnhealthyIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
`;

const VeryUnhealthyIconWrapper = styled(VeryUnhealthyIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
`;

const HazardousIconWrapper = styled(HazardousIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
`;

const Text = styled.p`
  text-transfrom: uppercase;
  margin-bottom: 10px;
  font-size: .9rem;
  color: ${props => props.color || 'inherit'};
`;

const ValueNumber = styled.span`
  font-size: 1.2rem;
  margin-top: 10px;
  color: ${props => props.color || 'black'}
`;
const ValueUnit = styled.span`
  color: #b0b0b0;
  font-size: .8rem;
`;

const SENSOR_ICONS = {
  [READINGS.altitude]: altitudeIcon,
  [READINGS.pm1]: pm1Icon,
  [READINGS.pressure]: pressureIcon,
  [READINGS.temperatureFeel]: tempFeelLikeIcon,
  [READINGS.airCo2]: co2Icon,
  [READINGS.lightIntensity]: lightIcon,
  [READINGS.humidity]: humidityIcon,
  [READINGS.soilMoisture]: soilMoistureIcon,
  [READINGS.soilTemperature]: soilTemp,
  [READINGS.temperature]: temperatureIcon,
  [READINGS.airVOC]: vocIcon,
}

const ReadingCircle = ({ level, sensor, headerText, valueNumber, valueUnit, iconSize, colorIcon, trailColor, rotation, percentage, customDefaultText, handleClick }) => {

  const getAqiColor = (type, isGradient) => {
    if(sensor) return isGradient ? 'url(#blueGradient)' : '#A7A7A7';

    switch ((level || "").toLowerCase()) {
      case color_scale.great.level:
        return color_scale.great[type];
      case color_scale.ok.level:
        return color_scale.ok[type];
      case color_scale.sensitive_beware.level:
        return color_scale.sensitive_beware[type];
      case color_scale.unhealthy.level:
        return color_scale.unhealthy[type];
      case color_scale.very_unhealthy.level:
        return color_scale.very_unhealthy[type];
      case color_scale.hazardous.level:
        return color_scale.hazardous[type];
      case 'temperature':
      case 'temp-like':
      case 'humidity':
        return isGradient ? 'url(#blueGradient)' : '#A7A7A7';
      default:
        return color_scale.default[type];
    }
  }

  const getAqiRibbon = () => {
    if(sensor) return null;

    switch ((level || "").toLowerCase()) {
      case color_scale.great.level:
        return (
          <RibbonGreat style={{ position: 'absolute', bottom: '2px' }} width={"174px"} height={"46px"} />
        );
      case color_scale.ok.level:
        return (
          <RibbonOk style={{ position: 'absolute', bottom: '2px' }} width={"174px"} height={"46px"} />
        );
      case color_scale.sensitive_beware.level:
        return (
          <RibbonSensitive style={{ position: 'absolute', bottom: '2px' }} width={"174px"} height={"46px"} />
        );
      case color_scale.unhealthy.level:
        return (
          <RibbonUnhealthy style={{ position: 'absolute', bottom: '2px' }} width={"174px"} height={"46px"} />
        );
      case color_scale.very_unhealthy.level:
        return (
          <RibbonVeryUnhealthy style={{ position: 'absolute', bottom: '2px' }} width={"174px"} height={"46px"} />
        );
      case color_scale.hazardous.level:
        return (
          <RibbonHazardous style={{ position: 'absolute', bottom: '2px' }} width={"174px"} height={"46px"} />
        );
      case color_scale.default.level:
        return (
          <RibbonDefault style={{ position: 'absolute', bottom: '2px' }} width={"174px"} height={"46px"} />
        );
      default:
        return null;
    }
  }
  const getAqiPercentage = () => {
    if(sensor) return 80;

    switch ((level || "").toLowerCase()) {
      case color_scale.great.level:
        return 20;
      case color_scale.ok.level:
        return 35;
      case color_scale.sensitive_beware.level:
        return 45
      case color_scale.unhealthy.level:
        return 60;
      case color_scale.very_unhealthy.level:
        return 80;
      case color_scale.hazardous.level:
        return 100;
      default:
        return 100;
    }
  }

  const getAqiHeaderIcon = () => {
    if(sensor){
      return <img src={SENSOR_ICONS[sensor] || sensorDefaultIcon} width={iconSize + 'px'} />;
    }

    switch ((level || "").toLowerCase()) {
      case color_scale.great.level:
        return (
          <GreatIconWrapper fill={colorIcon ? getAqiColor('colorHex') : "#505050"} height={iconSize + "px"} width={iconSize + "px"} />
        );
      case color_scale.ok.level:
        return (
          <OkIconWrapper fill={colorIcon ? getAqiColor('colorHex') : "#505050"} height={iconSize + "px"} width={iconSize + "px"} />
        );
      case color_scale.sensitive_beware.level:
        return (
          <GoodIconWrapper fill={colorIcon ? getAqiColor('colorHex') : "#505050"} height={iconSize + "px"} width={iconSize + "px"} />
        );
      case color_scale.unhealthy.level:
        return (
          <UnhealthyIconWrapper
            fill={colorIcon ? getAqiColor('colorHex') : "#505050"}
            height={iconSize + "px"}
            width={iconSize + "px"}
          />
        );
      case color_scale.very_unhealthy.level:
        return (
          <VeryUnhealthyIconWrapper
            fill={colorIcon ? getAqiColor('colorHex') : "#505050"}
            height={iconSize + "px"}
            width={iconSize + "px"}
          />
        );
      case color_scale.hazardous.level:
        return (
          <HazardousIconWrapper
            fill={colorIcon ? getAqiColor('colorHex') : "#505050"}
            height={iconSize + "px"}
            width={iconSize + "px"}
          />
        );
      case 'temperature':
        return (
          <TemperatureIcon
            height={iconSize + "px"}
            width={iconSize + "px"}
          />
        );
      case 'temp-like':
        return (
          <TempFeelsLikeIcon
            height={iconSize + "px"}
            width={iconSize + "px"}
          />
        );
      case 'humidity':
        return (
          <HumidityIcon
            height={iconSize + "px"}
            width={iconSize + "px"}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div onClick={handleClick}>
      <CircularProgressbarWithChildren
        value={percentage || percentage === 0 ? percentage : getAqiPercentage()}
        styles={{
          // Customize the root svg element
          root: {
            width: '200px',
          },
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: `${getAqiColor('ringColor', true)}`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',
            // Customize transition animation
            transition: 'stroke-dashoffset 0.5s ease 0s',
            // Rotate the path
            transform: `rotate(${rotation}turn)`,
            transformOrigin: 'center center',
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: trailColor || `${getAqiColor('colorHex')}3d`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Rotate the trail
            transform: 'rotate(1turn)',
            transformOrigin: 'center center',
          },
          // Customize the text
          text: {
            // Text color
            fill: '#f88',
            // Text size
            fontSize: '16px',
          }
        }}
        strokeWidth={12}>
        {/* <GradientSVG startColor='red' endColor='blue' rotation={0} endOffset='40%' idCSS="blueGradient"></GradientSVG> */}
        <GradientSVG startColor='#ADE7EB' endColor='#28D6E3' rotation={0} endOffset='40%' idCSS="blueGradient"></GradientSVG>
        <Text color="#bbb">{headerText}</Text>
        {getAqiHeaderIcon()}
        <ValueNumber color={getAqiColor('colorHex')}>{valueNumber === null || typeof valueNumber === 'undefined' ? 0 : valueNumber === "" ? "" : valueNumber}<ValueUnit>{valueUnit || ''}</ValueUnit></ValueNumber>
        {getAqiRibbon()}
        {sensor === null && level !== 'temperature' && level !== 'temp-like' && level !== 'humidity' ? <p style={{ position: 'absolute', bottom: '12px', color: 'white', textTransform:  level === color_scale.default.level ? 'unset' : 'uppercase', fontSize: level === color_scale.default.level ? '9px' : '14px' }}>{level === color_scale.default.level ? customDefaultText || 'No PM2.5 and PM10 data' : level}</p> : ''}
      </CircularProgressbarWithChildren>
    </div>
  );
}

ReadingCircle.defaultProps = {
  level: 'ok',
  sensor: null,
  headerText: '',
  valueNumber: null,
  valueUnit: '',
  iconSize: 90,
  rotation: '-0.5',
  colorIcon: false,
  trailColor: null,
  percentage: null,
}

export default ReadingCircle;