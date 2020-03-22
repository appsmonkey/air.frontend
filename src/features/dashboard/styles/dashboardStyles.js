import styled, {keyframes} from "styled-components";
import React from 'react';

import { ReactComponent as boxIcon } from "../assets/box.svg";
import { ReactComponent as settingsIcon } from "../assets/settings.svg";
import { ReactComponent as switchIcon } from "../assets/switch.svg";
import { ReactComponent as goodIcon } from "../assets/icons/good.svg";
import { ReactComponent as greatIcon } from "../assets/icons/great.svg";
import { ReactComponent as hazardousIcon } from "../assets/icons/hazardous.svg";
import { ReactComponent as okIcon } from "../assets/icons/ok.svg";
import { ReactComponent as unhealthyIcon } from "../assets/icons/unhealthy.svg";
import { ReactComponent as veryUnhealthyIcon } from "../assets/icons/very_unhealthy.svg";

// Basic boxes
import okPng from "../assets/icons/box_ok.png";
import greatPng from "../assets/icons/box_great.png";
import sensitiveBewarePng from "../assets/icons/box_sensitive_beware.png";
import hazardousPng from "../assets/icons/box_hazardous.png";
import unhealthyPng from "../assets/icons/box_unhealthy.png";
import veryUnhealthyPng from "../assets/icons/box_very_unhealthy.png";
import defaultBoxPng from "../assets/icons/box_default.png";

// Clusters
import cluster_okPng from "../assets/icons/cluster_ok.png";
import cluster_greatPng from "../assets/icons/cluster_great.png";
import cluster_sensitiveBewarePng from "../assets/icons/cluster_sensitive_beware.png";
import cluster_hazardousPng from "../assets/icons/cluster_hazardous.png";
import cluster_unhealthyPng from "../assets/icons/cluster_unhealthy.png";
import cluster_veryUnhealthyPng from "../assets/icons/cluster_very_unhealthy.png";
import cluster_defaultBoxPng from "../assets/icons/cluster_default.png";

// My boxes
import my_okPng from "../assets/icons/my_box_ok.png";
import my_greatPng from "../assets/icons/my_box_great.png";
import my_sensitiveBewarePng from "../assets/icons/my_box_sensitive_beware.png";
import my_hazardousPng from "../assets/icons/my_box_hazardous.png";
import my_unhealthyPng from "../assets/icons/my_box_unhealthy.png";
import my_veryUnhealthyPng from "../assets/icons/my_box_very_unhealthy.png";
import my_defaultBoxPng from "../assets/icons/my_box_default.png";

// Selected boxes
import selected_okPng from "../assets/icons/selected_box_ok.png";
import selected_greatPng from "../assets/icons/selected_box_great.png";
import selected_sensitiveBewarePng from "../assets/icons/selected_box_sensitive_beware.png";
import selected_hazardousPng from "../assets/icons/selected_box_hazardous.png";
import selected_unhealthyPng from "../assets/icons/selected_box_unhealthy.png";
import selected_veryUnhealthyPng from "../assets/icons/selected_box_very_unhealthy.png";
import selected_defaultBoxPng from "../assets/icons/selected_box_default.png";

// My selected boxes
import my_selected_okPng from "../assets/icons/my_selected_box_ok.png";
import my_selected_greatPng from "../assets/icons/my_selected_box_great.png";
import my_selected_sensitiveBewarePng from "../assets/icons/my_selected_box_sensitive_beware.png";
import my_selected_hazardousPng from "../assets/icons/my_selected_box_hazardous.png";
import my_selected_unhealthyPng from "../assets/icons/my_selected_box_unhealthy.png";
import my_selected_veryUnhealthyPng from "../assets/icons/my_selected_box_very_unhealthy.png";
import my_selected_defaultBoxPng from "../assets/icons/my_selected_box_default.png";

import { ReactComponent as greatRibbon } from "../assets/ribbon-great.svg";
import { ReactComponent as okRibbon } from "../assets/ribbon-ok.svg";
import { ReactComponent as sensitiveBewareRibbon } from "../assets/ribbon-sensitive-beware.svg";
import { ReactComponent as unhealthyRibbon } from "../assets/ribbon-unhealthy.svg";
import { ReactComponent as veryUnhealthyRibbon } from "../assets/ribbon-very-unhealthy.svg";
import { ReactComponent as hazardousRibbon } from "../assets/ribbon-hazardous.svg";
import { ReactComponent as temperature } from "../assets/thermometer.svg";
import { ReactComponent as tempFeelsLike } from "../assets/temp-feelslike.svg";
import { ReactComponent as humidity } from "../assets/humidity.svg";
import color_scale from "../../map/data/color_scale";



export const RibbonGreat = styled(greatRibbon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
`;

export const RibbonOk = styled(okRibbon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
`;

export const RibbonSensitive = styled(sensitiveBewareRibbon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
`;

export const RibbonUnhealthy = styled(unhealthyRibbon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
`;

export const RibbonVeryUnhealthy = styled(veryUnhealthyRibbon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
`;

export const RibbonHazardous = styled(hazardousRibbon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
`;

export const RibbonDefault = styled(hazardousRibbon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  #Rectangle{
    fill: #aaa;
  }
  path{
    fill: #aaa;
  }
`;

const getBoxyIcon = (colorHex, rest) => {
  switch (colorHex) {
    case color_scale.great.colorHex:
      return <BoxPng src={greatPng} alt={color_scale.great.level} {...rest} />;
    case color_scale.ok.colorHex:
      return <BoxPng src={okPng} alt={color_scale.ok.level} {...rest} />;
    case color_scale.sensitive_beware.colorHex:
      return <BoxPng src={sensitiveBewarePng} alt={color_scale.sensitive_beware.level} {...rest} />;
    case color_scale.unhealthy.colorHex:
      return <BoxPng src={unhealthyPng} alt={color_scale.unhealthy.level} {...rest} />;
    case color_scale.very_unhealthy.colorHex:
      return <BoxPng src={veryUnhealthyPng} alt={color_scale.very_unhealthy.level} {...rest} />;
    case color_scale.hazardous.colorHex:
      return <BoxPng src={hazardousPng} alt={color_scale.hazardous.level} {...rest} />;
    default:
      return <BoxPng src={defaultBoxPng} alt="" {...rest} />;
  }
}

const getClusterIcon = (colorHex, rest) => {
  switch (colorHex) {
    case color_scale.great.colorHex:
      return <BoxPng src={cluster_greatPng} alt={color_scale.great.level} {...rest} />;
    case color_scale.ok.colorHex:
      return <BoxPng src={cluster_okPng} alt={color_scale.ok.level} {...rest} />;
    case color_scale.sensitive_beware.colorHex:
      return <BoxPng src={cluster_sensitiveBewarePng} alt={color_scale.sensitive_beware.level} {...rest} />;
    case color_scale.unhealthy.colorHex:
      return <BoxPng src={cluster_unhealthyPng} alt={color_scale.unhealthy.level} {...rest} />;
    case color_scale.very_unhealthy.colorHex:
      return <BoxPng src={cluster_veryUnhealthyPng} alt={color_scale.very_unhealthy.level} {...rest} />;
    case color_scale.hazardous.colorHex:
      return <BoxPng src={cluster_hazardousPng} alt={color_scale.hazardous.level} {...rest} />;
    default:
      return <BoxPng src={cluster_defaultBoxPng} alt="" {...rest} />;
  }
}

const getMyBoxyIcon = (colorHex, rest) => {
  switch (colorHex) {
    case color_scale.great.colorHex:
      return <BoxPng src={my_greatPng} alt={color_scale.great.level} {...rest} />;
    case color_scale.ok.colorHex:
      return <BoxPng src={my_okPng} alt={color_scale.ok.level} {...rest} />;
    case color_scale.sensitive_beware.colorHex:
      return <BoxPng src={my_sensitiveBewarePng} alt={color_scale.sensitive_beware.level} {...rest} />;
    case color_scale.unhealthy.colorHex:
      return <BoxPng src={my_unhealthyPng} alt={color_scale.unhealthy.level} {...rest} />;
    case color_scale.very_unhealthy.colorHex:
      return <BoxPng src={my_veryUnhealthyPng} alt={color_scale.very_unhealthy.level} {...rest} />;
    case color_scale.hazardous.colorHex:
      return <BoxPng src={my_hazardousPng} alt={color_scale.hazardous.level} {...rest} />;
    default:
      return <BoxPng src={my_defaultBoxPng} alt="" {...rest} />;
  }
}

const getSelectedBoxyIcon = (colorHex, rest) => {
  switch (colorHex) {
    case color_scale.great.colorHex:
      return <BoxPng selectedDevice={1} src={selected_greatPng} alt={color_scale.great.level} {...rest} />;
    case color_scale.ok.colorHex:
      return <BoxPng selectedDevice={1} src={selected_okPng} alt={color_scale.ok.level} {...rest} />;
    case color_scale.sensitive_beware.colorHex:
      return <BoxPng selectedDevice={1} src={selected_sensitiveBewarePng} alt={color_scale.sensitive_beware.level} {...rest} />;
    case color_scale.unhealthy.colorHex:
      return <BoxPng selectedDevice={1} src={selected_unhealthyPng} alt={color_scale.unhealthy.level} {...rest} />;
    case color_scale.very_unhealthy.colorHex:
      return <BoxPng selectedDevice={1} src={selected_veryUnhealthyPng} alt={color_scale.very_unhealthy.level} {...rest} />;
    case color_scale.hazardous.colorHex:
      return <BoxPng selectedDevice={1} src={selected_hazardousPng} alt={color_scale.hazardous.level} {...rest} />;
    default:
      return <BoxPng selectedDevice={1} src={selected_defaultBoxPng} alt="" {...rest} />;
  }
}

const getMySelectedBoxyIcon = (colorHex, rest) => {
  switch (colorHex) {
    case color_scale.great.colorHex:
      return <BoxPng selectedDevice={1} src={my_selected_greatPng} alt={color_scale.great.level} {...rest} />;
    case color_scale.ok.colorHex:
      return <BoxPng selectedDevice={1} src={my_selected_okPng} alt={color_scale.ok.level} {...rest} />;
    case color_scale.sensitive_beware.colorHex:
      return <BoxPng selectedDevice={1} src={my_selected_sensitiveBewarePng} alt={color_scale.sensitive_beware.level} {...rest} />;
    case color_scale.unhealthy.colorHex:
      return <BoxPng selectedDevice={1} src={my_selected_unhealthyPng} alt={color_scale.unhealthy.level} {...rest} />;
    case color_scale.very_unhealthy.colorHex:
      return <BoxPng selectedDevice={1} src={my_selected_veryUnhealthyPng} alt={color_scale.very_unhealthy.level} {...rest} />;
    case color_scale.hazardous.colorHex:
      return <BoxPng selectedDevice={1} src={my_selected_hazardousPng} alt={color_scale.hazardous.level} {...rest} />;
    default:
      return <BoxPng selectedDevice={1} src={my_selected_defaultBoxPng} alt="" {...rest} />;
  }
}

const animateBoxySelected = (height) => keyframes`
  0% {
    top: ${height ? -height/2 + 'px' : "-20px"};
  }
  100% {
    top: ${height ? -height + 'px' : "-40px"};
  }
`

const BoxPng = styled.img`
  margin: ${props => props.margin};
  width: ${props => props.width || "40px"};
  height: ${props => props.height || "40px"};
  animation: ${props => props.selectedDevice ? animateBoxySelected(props.height) : ''} .2s ease-in-out 0s 1 normal forwards;
  ${props => props.absolute ? `
    position: absolute;
    left: ${props.width ? -props.width/2 + 'px' : "-20px"};
    top: ${props.height ? -props.height/2 + 'px' : "-20px"};
  ` : ''}
`;

export const BoxIcon = ({fill, ...rest}) => {
  return (
    getBoxyIcon(fill, rest)
  )
}

export const ClusterIcon = ({fill, ...rest}) => {
  return (
    getClusterIcon(fill, rest)
  )
}

export const MyBoxIcon = ({fill, ...rest}) => {
  return (
    getMyBoxyIcon(fill, rest)
  )
}

export const SelectedBoxIcon = ({fill, ...rest}) => {
  return (
    getSelectedBoxyIcon(fill, rest)
  )
}

export const MySelectedBoxIcon = ({fill, ...rest}) => {
  return (
    getMySelectedBoxyIcon(fill, rest)
  )
}

// export const BoxIcon = styled(boxIcon)`
//   fill: ${props => props.fill};
//   stroke: ${props => props.stroke};
//   margin: ${props => props.margin};
//   width: ${props => props.width || "20px"};
//   height: ${props => props.height || "20px"};
//   ${props => props.absolute ? `
//     position: absolute;
//     left: 50%;
//     transform: translateX(-50%);
//     top: 1px;
//   ` : ''}
//   filter:drop-shadow( 0 0 3px rgb(255, 255, 255));
//   -webkit-filter:drop-shadow( 0 0 3px rgb(255, 255, 255));
// `;

export const SettingsIcon = styled(settingsIcon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const SwitchIcon = styled(switchIcon)`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const GoodIcon = styled(goodIcon)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const GreatIcon = styled(greatIcon)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const HazardousIcon = styled(hazardousIcon)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const OkIcon = styled(okIcon)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const UnhealthyIcon = styled(unhealthyIcon)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const VeryUnhealthyIcon = styled(veryUnhealthyIcon)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const TemperatureIcon = styled(temperature)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const TempFeelsLikeIcon = styled(tempFeelsLike)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;

export const HumidityIcon = styled(humidity)`
  fill: ${props => props.fill};
  margin: ${props => props.margin};
  width: ${props => props.width || "20px"};
  height: ${props => props.height || "20px"};
  ${props => props.maxHeight ? `max-height: ${props.maxHeight};` : ''}
`;