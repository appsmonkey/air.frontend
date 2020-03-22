import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import color_scale from "../data/color_scale";
import { TemperatureIcon, HumidityIcon } from "../../dashboard/styles/dashboardStyles"
import { ReactComponent as GreatIcon } from "../assets/great.svg";
import { ReactComponent as OkIcon } from "../assets/ok.svg";
import { ReactComponent as GoodIcon } from "../assets/good.svg";
import { ReactComponent as UnhealthyIcon } from "../assets/unhealthy.svg";
import { ReactComponent as VeryUnhealthyIcon } from "../assets/very_unhealthy.svg";
import { ReactComponent as HazardousIcon } from "../assets/hazardous.svg";
import { FormatPM } from '../../helpers/formatStrings';
import altitudeIcon from '../assets/altitude@3x.png';
import pm1Icon from '../assets/pm@3x.png';
import pressureIcon from '../assets/pressure@3x.png';
import tempFeelLikeIcon from '../assets/tempfeelslike@3x.png';
import coIcon from '../assets/co@3x.png';
import co2Icon from '../assets/co2@3x.png';
import gasIcon from '../assets/gas@3x.png';
import lightIcon from '../assets/light@3x.png';
import luxIcon from '../assets/lux@3x.png';
import noiseIcon from '../assets/noise@3x.png';
import humidityIcon from '../assets/humidity@3x.png';
import soilMoistureIcon from '../assets/soilmoisture@3x.png';
import soilTemp from '../assets/soiltemp@3x.png';
import temperatureIcon from '../assets/temperature@3x.png';
import vocIcon from '../assets/voc@3x.png';

import sensorDefaultIcon from '../assets/sensor-default@3x.png';

import {ReactComponent as backIcon} from '../assets/back.svg';
import ReadingCircle from "../../commonComponents/ReadingCircle"
import { READINGS, EXCLUDED_READINGS } from "../../constants/constants";
import Helpers from "../../helpers/helpers";

const PM2_5 = READINGS.pm25;
const PM10 = READINGS.pm10;
const TEMPERATURE = READINGS.temperature;
const HUMIDITY = READINGS.humidity;

const common = `
  margin-right: 10px;
`;

const GreatIconWrapper = styled(GreatIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
  ${common}
`;

const OkIconWrapper = styled(OkIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
  ${common}
`;

const GoodIconWrapper = styled(GoodIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
  ${common}
`;

const UnhealthyIconWrapper = styled(UnhealthyIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
  ${common}
`;

const VeryUnhealthyIconWrapper = styled(VeryUnhealthyIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
  ${common}
`;

const HazardousIconWrapper = styled(HazardousIcon)`
  fill: ${props => props.fill};
  height: ${props => (props.height ? props.height : "24px")};
  width: ${props => (props.width ? props.width : "24px")};
  ${common}
`;

const MeasurementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
`;

const Name = styled.h1`
  font-size: 1.2rem;
  font-weight: normal;
  color: #808080;
  font-family: Galano Classic;
`;

const Level = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: #fff;
  padding: 10px;
  margin-top: 10px;
  text-transform: capitalize;
  background-color: ${props => props.color};
`;

const Measurement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const MeasurementLevelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-right: 8px;
`;

const MeasurementLevel = styled.span`
  color: ${props => props.color};
  text-transform: capitalize;
`;

const MeasurementValue = styled.span`
  margin-left: auto;
  margin-right: 4px;
  font-size: 1.2rem;
  color: ${props => (props.color ? props.color : "#808080")};
`;

const MeasurementUnit = styled.span`
  color: #CECECB;
  font-size: .85rem;
`;

const ArrowRight = styled.span`
  transform: rotate(90deg);
  margin-left: 10px;
  color: #E9E9E3;
`;

const NameWrapper = styled.div`
  position: relative;
  padding: 0 30px;
  width: 100%;
  margin-bottom: 10px;
`;

const BackButton = styled(backIcon)`
  position: absolute;
  left: 5px;
  top: 0.2rem;
  fill: #939393;
  width: 20px;
  height: auto;
  cursor: pointer;
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

const Info = props => {
  const { info, history } = props;

  function getAqiColor(lvl) {
    const level = (lvl || "").toLowerCase();

    switch (level) {
      case color_scale.great.level:
        return color_scale.great.colorHex;
      case color_scale.ok.level:
        return color_scale.ok.colorHex;
      case color_scale.sensitive_beware.level:
        return color_scale.sensitive_beware.colorHex;
      case color_scale.unhealthy.level:
        return color_scale.unhealthy.colorHex;
      case color_scale.very_unhealthy.level:
        return color_scale.very_unhealthy.colorHex;
      case color_scale.hazardous.level:
        return color_scale.hazardous.colorHex;
      default:
        return color_scale.unknown.colorHex;
    }
  }

  function getAqiIcon(lvl) {
    const level = (lvl || "").toLowerCase();

    switch (level) {
      case color_scale.great.level:
        return <GreatIconWrapper width="28px" height="28px" fill={getAqiColor(level)} />;
      case color_scale.ok.level:
        return <OkIconWrapper width="28px" height="28px" fill={getAqiColor(level)} />;
      case color_scale.sensitive_beware.level:
        return <GoodIconWrapper width="28px" height="28px" fill={getAqiColor(level)} />;
      case color_scale.unhealthy.level:
        return <UnhealthyIconWrapper width="28px" height="28px" fill={getAqiColor(level)} />;
      case color_scale.very_unhealthy.level:
        return <VeryUnhealthyIconWrapper width="28px" height="28px" fill={getAqiColor(level)} />;
      case color_scale.hazardous.level:
        return <HazardousIconWrapper width="28px" height="28px" fill={getAqiColor(level)} />;
      default:
        return null;
    }
  }

  function parseMeasurementValue(value) {
    if(value === -1) return 0;
    return value;
  }

  function handleMeasurementClick(sensor) {
    if(info.default_device || !info.device_id)
      history.push({
        pathname: '/air/dashboard/city/Sarajevo',
        search: sensor ? `${sensor}=true`: '',
        hash: sensor ? '#chart-city': ''
      });
    else{
      history.push({
        pathname: `/dashboard/devices/${info.device_id}`,
        search: sensor ? `${sensor}=true`: '',
        hash: sensor ? '#chart-device': ''
      })
    }
  }

  function renderRestMeasurement() {
    return Object.keys(info.map_meta).map((sensor, index)=>{
      if(sensor === PM2_5 || sensor === PM10 || sensor === TEMPERATURE || sensor === HUMIDITY || EXCLUDED_READINGS.some(el=>el===sensor)) return null;
      const data = Helpers.formatSensorData(info.map_meta[sensor], sensor);

      return data && data.measurement ? (<MeasurementWrapper key={index}>
        <Measurement onClick={()=>handleMeasurementClick(sensor)}>
          <img src={SENSOR_ICONS[sensor] || sensorDefaultIcon} style={{margin: "0 10px 0 0"}} width="24px" />
          <span>{data.measurement}</span>
          <MeasurementValue>
            {parseMeasurementValue(data.value)}
          </MeasurementValue>
          <MeasurementUnit>{data.unit}</MeasurementUnit>
          <ArrowRight className="fas fa-chevron-up"></ArrowRight>
        </Measurement>
      </MeasurementWrapper>) : null;
    })
  }
  let circleProps = { level: info.map_meta[PM2_5].level || color_scale.default.level };
  if(!info.active){
    circleProps.customDefaultText  = "DEVICE IS OFFLINE";
  }

  return (
    <>
      <MeasurementWrapper>
        <Header>
          <NameWrapper>
            {props.showBackArrow && <BackButton onClick={props.handleBackClick}/>}
            <Name onClick={()=>handleMeasurementClick()}>{info.name}</Name>
          </NameWrapper>
          <ReadingCircle
            {...circleProps}
            handleClick={()=>handleMeasurementClick()}
            trailColor="#f0f0f0"
            valueNumber=""
          />
        </Header>
        {info.map_meta[PM10] && info.map_meta[PM10].measurement ? (
          <Measurement onClick={()=>handleMeasurementClick(READINGS.pm25)}>
            {getAqiIcon(info.map_meta[PM2_5].level)}
            <MeasurementLevelWrapper>
              {FormatPM(info.map_meta[PM2_5].measurement)}
              <MeasurementLevel color={getAqiColor(info.map_meta[PM2_5].level)}>
                {info.map_meta[PM2_5].level}
              </MeasurementLevel>
            </MeasurementLevelWrapper>
            <MeasurementValue color={getAqiColor(info.map_meta[PM2_5].level)}>
              {parseMeasurementValue(info.map_meta[PM2_5].value)}
            </MeasurementValue>
            <MeasurementUnit>{info.map_meta[PM2_5].unit}</MeasurementUnit>
            <ArrowRight className="fas fa-chevron-up"></ArrowRight>
          </Measurement>
        ) : null}
      </MeasurementWrapper>
      {info.map_meta[PM10] && info.map_meta[PM10].measurement ? (
        <MeasurementWrapper>
          <Measurement onClick={()=>handleMeasurementClick(READINGS.pm10)}>
            {getAqiIcon(info.map_meta[PM10].level)}
            <MeasurementLevelWrapper>
              {FormatPM(info.map_meta[PM10].measurement)}
              <MeasurementLevel color={getAqiColor(info.map_meta[PM10].level)}>
                {info.map_meta[PM10].level}
              </MeasurementLevel>
            </MeasurementLevelWrapper>
            <MeasurementValue color={getAqiColor(info.map_meta[PM10].level)}>
              {parseMeasurementValue(info.map_meta[PM10].value)}
            </MeasurementValue>
            <MeasurementUnit>{info.map_meta[PM10].unit}</MeasurementUnit>
            <ArrowRight className="fas fa-chevron-up"></ArrowRight>
          </Measurement>
        </MeasurementWrapper>
      ) : null}
      {info.map_meta[TEMPERATURE] && info.map_meta[TEMPERATURE].measurement ? (
        <MeasurementWrapper>
          <Measurement onClick={()=>handleMeasurementClick(READINGS.temperature)}>
            <TemperatureIcon margin="0 10px 0 0" width="24px" height="24px"></TemperatureIcon>
            <span>{info.map_meta[TEMPERATURE].measurement}</span>
            <MeasurementValue>
              {parseMeasurementValue(info.map_meta[TEMPERATURE].value)}
            </MeasurementValue>
            <MeasurementUnit>{info.map_meta[TEMPERATURE].unit}</MeasurementUnit>
            <ArrowRight className="fas fa-chevron-up"></ArrowRight>
          </Measurement>
        </MeasurementWrapper>
      ) : null}
      {info.map_meta[HUMIDITY] && info.map_meta[HUMIDITY].measurement ? (
        <MeasurementWrapper>
          <Measurement onClick={()=>handleMeasurementClick(READINGS.humidity)}>
            <HumidityIcon margin="0 10px 0 0" width="24px" height="24px"></HumidityIcon>
            <span>{info.map_meta[HUMIDITY].measurement}</span>
            <MeasurementValue>
              {parseMeasurementValue(info.map_meta[HUMIDITY].value)}
            </MeasurementValue>
            <MeasurementUnit>{info.map_meta[HUMIDITY].unit}</MeasurementUnit>
            <ArrowRight className="fas fa-chevron-up"></ArrowRight>
          </Measurement>
        </MeasurementWrapper>
      ) : null}
      {renderRestMeasurement()}
    </>
  );
};

export default withRouter(Info);
