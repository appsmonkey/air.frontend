import React, { Fragment } from "react";
import styled from "styled-components";
import {isEmpty} from 'lodash';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Cluster from '../components/Cluster';
import PinGroup from '../components/PinGroup';
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";

import DeckGL, { GeoJsonLayer } from "deck.gl";
import axiosInstance from '../../../core/http/axiosInstance';
import { Layout } from "../../../core/styles/layout";
import MyLocationHOC from "./MyLocationHOC";

import sarajevo_coordinates from "../data/sarajevo_coordinates";
import sarajevo_geojson from "../data/sarajevo_geojson.json";
import color_scale from "../data/color_scale";
import Measurements from "../components/Measurements";
import { BoxIcon, SelectedBoxIcon, MySelectedBoxIcon, MyBoxIcon } from "../../dashboard/styles/dashboardStyles";
import { getSchema } from '../../dashboard/actions/dashboardActionCreators';
import LogoImage from '../assets/logo.png';
import { FormatPM } from '../../helpers/formatStrings';
import { READINGS } from "../../constants/constants";
import {setZonesLoading} from "../actions/mapActionCreators";
import Loader from '../../loader/components/Loader';
import { getLvlBasedOnValue } from "../../helpers/aqiCalculation";
import MeasurementsMobile from "../components/MeasurementsMobile";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const API_URL = process.env.REACT_APP_API_URL;

const PM2_5 = READINGS.pm25;
const PM10 = READINGS.pm10;
const TEMPERATURE = READINGS.temperature;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
`;

const Info = styled.div`
  text-align: center;
  width: 24vw;
  max-width: 550px;
  overflow: auto;
  position: relative;
  height: 100%;
  z-index: 20;
  background: rgba(255, 255, 255, 0.9);
  
 
  @media(max-width: 1060px) {
    width: 40vw;
    max-width: 550px;
  }
  @media(max-width: 680px){
    width: 100%;
    max-width: unset;
    height: 28vh;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  font-family: Galano Classic;
  z-index: 20;
  overflow: hidden;
  border-radius: 100px;
  box-shadow: 1.5px 2.6px 27px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.9);
`;

const Filter = styled.div`
  padding: 5px 15px 5px 30px;
  position:relative;
  font-size: .85rem;
  color:#95979A;
  cursor: pointer;
  border-right: 1px solid #D5D5D5;
  user-select:none;
  ${props => props.active ? `
  background-color: rgba(125, 200, 206, 0.9);
  color: white;
  border-right: 1px solid rgba(255, 255, 255, 0.9);
  ` : `
    &:hover{
      background-color: #eaeaea;
    }
  `}
  &:last-child{
    border-right:none;
  }

  @media(max-width: 360px){
    font-size: .65rem;
  }
`;

const FilterCount = styled.span`
  font-size: .7rem;

  @media(max-width: 360px){
    font-size: .5rem;
  }
`;

const CheckMark = styled.span`
  position:absolute;
  font-size: .9rem;
  left: 10px;
  top: 50%;
  transform: translate(0,-50%);
  ${props => !props.active ? `visibility:hidden;` : ''}

  @media(max-width: 360px){
    font-size: .7rem;
  }
`;

const UIMask = styled.div`
  position:absolute;
  width: calc(-100% - 28vw);
  height:100%;
  left:-28vw;
  transition: all .2s linear;
  display: flex;

  @media(max-width: 680px) {
    display: none;
  }
  
  ${props => props.slideIn ? `
    left: 0;
    width:100%;
  `:`
    @media(max-width: 770px) {
      width: calc(-100% - 62vw);
      left:-62vw;
    }
    @media(max-width: 1060px) {
      width: calc(-100% - 42vw);
      left:-42vw;
    }
  `}
`;

const UIMaskMobile = styled.div`
  position:absolute;
  width: 100%;
  height:calc(-100% - 28vh);
  bottom:-28vh;
  transition: all .2s linear;
  display: none;
  
  @media(max-width: 680px) {
    display: flex;
    flex-direction: column
  }
  
  ${props => props.slideIn ? `
    bottom: 0;
    height: 100%;
  `:`
    
  `}
`;

const MyLocation = styled.div`
  height: 40px;
  width: 40px;
  user-select: none;
  cursor: pointer;
  outline: none;
  background-color: white;
  color: #676767;
  display: flex;
  justify-content:center;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  margin-bottom: 10px;
  transition: all .1s ease;
  ${props => props.disabled ? `
    cursor: not-allowed;
    color: #c1c1c1;
    background-color: white;
  `: `
    &:hover{
      background-color: #dcdcdc;
    }
  `}
  &:active{
    box-shadow: inset 0 0 2px 1px rgba(0,0,0,0.1);
  }
`;

const ZoomInOut = styled.div`
  background-color: white;
  color: #676767;
  user-select: none;
  font-size:2rem;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`;

const ZoomIn = styled.div`
  height: 40px;
  width: 100%;
  cursor: pointer;
  outline: none;
  display: flex;
  border-bottom: 1px solid #D5D5D5;
  justify-content:center;
  align-items: center;
  transition: all .1s ease;
  &:hover{
    background-color: #dcdcdc;
  }
  &:active{
    box-shadow: inset 0 0 2px 1px rgba(0,0,0,0.1);
  }
`;

const ZoomOut = styled.div`
  height: 40px;
  width: 100%;
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content:center;
  align-items: center;
  transition: all .1s ease;
  &:hover{
    background-color: #dcdcdc;
  }
  &:active{
    box-shadow: inset 0 0 2px 1px rgba(0,0,0,0.1);
  }
`;

const NavigationControls = styled.div`
  position:absolute;
  bottom: 20px;
  right: 30px;
`;

const Tooltip = styled.div`
  position: absolute;
  border-radius: 8px;
  background: white;
  margin-left: 20px;
  padding:10px 20px;
  z-index: 10;
  min-width: 20px;
  max-width: 200px;
  min-height: 20px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const TooltipContent = styled.div`
  display:flex;
  flex-direction: column;
  span{
    margin-bottom: 5px;
  }
`;

const TooltipHeader = styled.span`

`;

const LevelText = styled.span`
  color: ${props => props.color || 'black'};
  text-transform: capitalize;
  font-size: .9rem;
`;

const TooltipMeasurements = styled.div`
  display: flex;
  span{
    font-size: .8rem;
    &:not(:last-child){
      margin-right:5px;
    }
  }
`;

const MeasurementLabel = styled.span`
  color: #a9a9a9;
`;

const MeasurementValue = styled.span`
  color: black;
`;

const ExternalLink = styled.a`
  cursor: pointer;
  &:visited{
    color: unset;
  }
`;

const MapLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position:fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0,0,0,0.2);
  pointer-events: none;
  color: white;
`;

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start: performance.now(),
      info: null,
      hoveredInfo: null,
      viewport: {
        latitude: sarajevo_coordinates.lat,
        longitude: sarajevo_coordinates.lng,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 11
      },
      layers: [],
      allDevices: [],
      devices: [],
      zones: [],
      sensor: PM2_5,
      activeFilter: 'outdoor',
      defaultDevice: null,
      deviceCount: {
        mine: 0,
        indoor: 0,
        outdoor: 0,
      },
      map: null,
      hoverDisabled: false,
    };
  
    this.mapRef = null;
    this.sensorInterval = null;
  }
 
  componentDidMount = () => {
    const { sensor } = this.state;
    const { getSchema, location } = this.props;
    let device_id = undefined;

    if(location.search && location.search !== "") {
      const query = new URLSearchParams(location.search);
      device_id = query.get('device_id');
      const indoor = query.get('indoor');
      const mine = query.get('mine');
      if(mine !== undefined && mine == 'true') this.setState({activeFilter: 'mine'}, () => {
        this.getSensor(sensor, device_id);
        this.getSensorInterval(sensor, device_id);
      })
      else if(indoor !== undefined) this.setState({activeFilter: indoor == 'true' ? 'indoor' : 'outdoor'},() => {
        this.getSensor(sensor, device_id);
        this.getSensorInterval(sensor, device_id);
      })
      else {
        this.getSensor(sensor, device_id);
        this.getSensorInterval(sensor, device_id);
        
      }
    }else {
      this.getSensor(sensor, device_id);
        this.getSensorInterval(sensor, device_id);
    }
    getSchema();
    this.getDefaultDevice();
    this.setViewPort({ coords: {latitude: sarajevo_coordinates.lat, longitude: sarajevo_coordinates.lng }});
  };

  componentWillReceiveProps(nextProps) {
    const { myPosition, location } = this.props;
    if(nextProps.location.search && nextProps.location.search !== ""){
      const query = new URLSearchParams(nextProps.location.search);
      const device_id = query.get('device_id');
      if(device_id) return;
    }
    if (nextProps.myPosition && nextProps.myPosition != myPosition) {
      this.setViewPort(nextProps.myPosition)
    }
  }

  componentWillUnmount(){
    if(this.sensorInterval) clearInterval(this.sensorInterval);
  }

  isLoggedIn = () => {
    if (localStorage.getItem("id_token") === null) {
      return false;
    }
    return true;
  };

  isAdmin = () => {
    return localStorage.getItem("isAdmin") == "true";
  };

  setViewPort = ({coords}, zoom = 12) => {
    const viewport = { latitude: coords.latitude, longitude: coords.longitude, zoom, transitionDuration: 2000, transitionInterpolator: new FlyToInterpolator(), };
    this.setState({ viewport });
  }

  zoomIn = () => {
    const { viewport } = this.state;
    if (viewport.zoom > 19)
      return;
    const newViewport = { ...viewport, transitionDuration: 500, zoom: viewport.zoom + 1 }
    this.setState({ viewport: newViewport });
  }

  zoomOut = () => {
    const { viewport } = this.state;
    if (viewport.zoom < 1)
      return;
    const newViewport = { ...viewport, transitionDuration: 500, zoom: viewport.zoom - 1 }
    this.setState({ viewport: newViewport });
  }

  getSensorInterval = ( sensor, device_id ) => {
    if(this.sensorInterval) clearInterval(this.sensorInterval);
    this.sensorInterval = setInterval(() => {
      this.getSensor(sensor, device_id, false);
    }, 30000)
  }

  getSensor = async (sensor, device_id, initialRequest = true) => {
    const {setZonesLoading} = this.props;
    const { activeFilter, info, defaultDevice } = this.state;
    const config = {
      headers: {
        // Authorization: localStorage.getItem("id_token"),
        AccessToken: localStorage.getItem("access_token")
      }
    };
    if (initialRequest) setZonesLoading(true);
    const allSensors = Object.keys(READINGS).map(key=>READINGS[key]);
    let deviceSensorsParam = "";
    allSensors.forEach(el=>deviceSensorsParam+=`,${el}`);
    deviceSensorsParam = deviceSensorsParam.substr(1);

    const data = await axiosInstance.get(
      `map?zone_data=${sensor},${READINGS.pm10}&device_data=${deviceSensorsParam}&filter=${activeFilter}`,
      config
    );

    const allData = await axiosInstance.get(
      `map?zone_data=${sensor},${READINGS.pm10}&device_data=${deviceSensorsParam}`,
      config
    );
    if(initialRequest) setZonesLoading(false);

    const zones = data.data.data.zones;
    let devicesFiltered = data.data.data.devices;
    const allDevices = allData.data.data.devices;

    if(initialRequest && device_id !== undefined && device_id){
      const index = allDevices.findIndex(el=> el.device_id === device_id);
      if(index > -1){
        const { location } = allDevices[index];
        
        if(location && location.lat && location.lng){
          this.setViewPort({coords: { latitude: location.lat, longitude: location.lng }}, 18);
          this.handleMarkerOnClick(allDevices[index]);
        }
      }
    }

    if(!initialRequest){
      if(info){
        const index = allDevices.findIndex(el=>el.device_id===info.device_id)
        if(index > -1){
          this.handleMarkerOnClick(allDevices[index])
        }
      }else if(defaultDevice){
        this.getDefaultDevice();
      }
    }
    devicesFiltered = allDevices.filter((device) => this.filterDevices(device, activeFilter || ''));
    this.addGeojsonLayer(zones);
    this.setState({ devices: devicesFiltered, allDevices }, () => this.countDevices());
    this.setState({ zones });
  };

  countDevices = () => {
    const { allDevices } = this.state;

    const mine = allDevices.filter(device => device.mine && device.city === "Sarajevo").length;
    const indoor = allDevices.filter(device => device.indoor && device.city === "Sarajevo").length;
    const outdoor = allDevices.filter(device => !device.indoor && device.city === "Sarajevo").length;
    const deviceCount = { mine, indoor, outdoor };
    this.setState({ deviceCount });
  }

  handleOnLoad = () => {
    const { start } = this.state;
    const end = performance.now();
    setTimeout(()=>{
      if(this.mapRef)
        this.setState({ map: this.mapRef.getMap() })
    },500)
    
    console.log("Map load time: ", (end - start) / 1000);
  };

  handleMarkerOnClick = info => {
    if(!info.active){
      Object.keys(info.map_meta).map(key=>{
        info.map_meta[key] = {level: "", value: 0, measurement: "", unit: ""}
      })
    }
    this.setState({ info });
  };

  handleMarkerHover = info => {
    const {hoverDisabled} = this.state;
    if(hoverDisabled) return;
    // show tooltip
    this.setState({ hoveredInfo: info })
  }

  renderMarker = device => {
    const { info } = this.state;
    if(!device.active){
      Object.keys(device.map_meta).map(key=>{
        device.map_meta[key] = {level: "", value: 0, measurement: "", unit: ""}
      })
    }
    const fillColor = device.active ? this.getAqiColorHex(
      device.map_meta &&
      device.map_meta[READINGS.pm25] &&
      device.map_meta[READINGS.pm25].level.toLowerCase()
    ) : color_scale.unknown.colorHex;
    const value = device.map_meta && device.map_meta[READINGS.pm25] && device.map_meta[READINGS.pm25].value ? device.map_meta[READINGS.pm25].value : null;
    const isSelected = info && info.device_id == device.device_id;
    let boxy = null;
    if(isSelected){
      if(device.mine) boxy = <MySelectedBoxIcon width={60} height={60} absolute={1} id='targetBox' stroke={"#fff"} fill={fillColor} />
      else boxy = <SelectedBoxIcon width={60} height={60} absolute={1} id='targetBox' stroke={"#fff"} fill={fillColor} />
    }else{
      if(device.mine) boxy = <MyBoxIcon width={60} height={60} absolute={1} id='targetBox' stroke={"#fff"} fill={fillColor} />
      else boxy = <BoxIcon width={60} height={60} absolute={1} id='targetBox' stroke={"#fff"} fill={fillColor} />
    }

    return (
      <Marker
        key={`marker-${device.device_id}`}
        longitude={device.location.lng}
        latitude={device.location.lat}
        value={device.active ? value : null}
      >
        <div
          onClick={() => this.handleMarkerOnClick(device)}
          onMouseOver={() => this.handleMarkerHover(device)}
          onMouseLeave={() => this.setState({ hoveredInfo: null })}
          style={{position: 'relative'}}
        >
          {boxy}
        </div>
      </Marker>
    );
  };

  handleOnViewportChange = viewport => this.setState({ viewport });

  handleFilterChange = filter => {
    const { allDevices, activeFilter,sensor } = this.state;
    filter = activeFilter == filter ? '' : filter;
    const devicesFiltered = allDevices.filter((device) => this.filterDevices(device, filter));
    this.setState({ activeFilter: filter, devices: devicesFiltered },()=>this.getSensor(sensor));
  }

  filterDevices = (device, activeFilter) => {
    // determine if device will be included in array or not
    if(!device.active){
      if(this.isAdmin() || (this.isLoggedIn() && device.mine)) {}
      else{
        return false;
      }
    }
    let included = true;
    switch (activeFilter) {
      case 'outdoor':
        included = !device.indoor;
        break;
      case 'indoor':
        included = device.indoor;
        break;
      case 'mine':
        included = device.mine;
        break;
      default:
        included = true;
        break;
    }
    return included;
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  getAqiColor = level => {
    switch (level) {
      case color_scale.great.level:
        return color_scale.great.color;
      case color_scale.ok.level:
        return color_scale.ok.color;
      case color_scale.sensitive_beware.level:
        return color_scale.sensitive_beware.color;
      case color_scale.unhealthy.level:
        return color_scale.unhealthy.color;
      case color_scale.very_unhealthy.level:
        return color_scale.very_unhealthy.color;
      case color_scale.hazardous.level:
        return color_scale.hazardous.color;
      default:
        return color_scale.unknown.color;
    }
  };

  getAqiColorHex = level => {
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
  };

  getColor = (name, zones) => {
    const zone = zones.find(zone => {
      return zone.zone_name.trim() === name.trim();
    });
    if (zone && !isEmpty(zone.data) && zone.data[0]) {
      const pm25 = zone.data.find(el => el.sensor_id === READINGS.pm25);
      if(pm25) return this.getAqiColor((pm25.level || "").toLowerCase());
    }
    return color_scale.unknown.color;
  };

  getZone = name => {
    const { zones, sensor } = this.state;
    const zone = zones.find(zone => {
      return zone.zone_name.trim() === name.trim();
    });

    if (zone && !isEmpty(zone.data) && zone.data[0]) {
      const pm25 = zone.data.find(el => el.sensor_id === READINGS.pm25);
      const pm10 = zone.data.find(el => el.sensor_id === READINGS.pm10);
      let map_meta = {};
      if(pm25) {
        map_meta[READINGS.pm25] = pm25;
      }
      if(pm10) {
        map_meta[READINGS.pm10] = pm10;
      }
      const info = {
        mine: null,
        name: name,
        map_meta
      };

      return info;
    } else {
      return null;
    }
  };

  // handleZoneClick = name => {
  //   const info = this.getZone(name);

  //   this.setState({ info })
  // }

  handleZoneHover = (name) => {
    const {hoverDisabled} = this.state;
    if(hoverDisabled) return;

    const info = this.getZone(name);

    this.setState({ hoveredInfo: info });
  }

  addGeojsonLayer = zones => {
    const geojsonLayer = new GeoJsonLayer({
      id: `geojson-${Date.now()}`,
      data: sarajevo_geojson,
      stroked: true,
      filled: true,
      getFillColor: f => [...this.getColor(f.properties.name, zones), this.getColor(f.properties.name, zones) !== color_scale.unknown.color ? 120 : 80],
      getLineColor: f => [...this.getColor(f.properties.name, zones), this.getColor(f.properties.name, zones) !== color_scale.unknown.color ? 220 : 150],
      getLineWidth: 10,
      pickable: true,
      updateTriggers: {
        getFillColor: [[...color_scale.unknown.color,80],[...color_scale.great.color,120],[...color_scale.ok.color,120],[...color_scale.unhealthy.color,120],[...color_scale.very_unhealthy.color,120],[...color_scale.hazardous.color,120]],
        getLineColor: [[...color_scale.unknown.color,220],[...color_scale.great.color,220],[...color_scale.ok.color,220],[...color_scale.unhealthy.color,220],[...color_scale.very_unhealthy.color,220],[...color_scale.hazardous.color,220]]
      },
      // onClick: f => this.handleZoneClick(f.object.properties.name),
      onHover: f => {
        if(f.object){
          this.handleZoneHover(f.object ? f.object.properties.name : '')
        }else {
          this.setState({hoveredInfo: null})
        }
      },
    });

    this.setState({ layers: [geojsonLayer] });
  };

  handleMouseMove = (e) => {
    this.refs.tooltipRef.style.left = e.pageX + 'px';
    this.refs.tooltipRef.style.top = e.pageY + 'px';
  }

  getDefaultDevice = async () => {
    const config = {
      headers: {
        // Authorization: localStorage.getItem("id_token"),
        AccessToken: localStorage.getItem("access_token")
      }
    };
    const data = await axiosInstance.get(
      `device/list?city=Sarajevo`,
      config
    );
    if(data && data.data){
      const devices = data.data.data;
      const foundIndex = devices.findIndex(el=>el.default_device);
      if(foundIndex > -1){
        this.setState({ defaultDevice: devices[foundIndex] });
      }
    }
  }

  calculateCityReadings = () => {
    const {schema} = this.props;
    const {defaultDevice} = this.state;

    if(!isEmpty(schema) && !isEmpty(defaultDevice)){
      let cityReadings = {...defaultDevice};
      if(!isEmpty(defaultDevice.latest)){
        Object.keys(defaultDevice.latest).forEach(sensor => {
          const value = defaultDevice.latest[sensor];
          if(schema[sensor] && schema[sensor].name){
            cityReadings.map_meta[sensor] = {
              unit: schema[sensor].unit,
              measurement: schema[sensor].name,
              value: value,
              level: getLvlBasedOnValue(schema[sensor], value)
            };
          }
        })
      }
      return cityReadings;
    }
    return null;
  }

  getLevelText = info => {
    if(!info.active && info.device_id) return "Device is offline";
    else if(info.map_meta[PM2_5].level === "") return "No PM data";
    else return info.map_meta[PM2_5].level;
  }

  handleOverlayMouseEnter = () => {
    this.setState({hoverDisabled: true});
  }

  handleOverlayMouseLeave = () => {
    this.setState({hoverDisabled: false});
  }

  render() {
    const { fetching_zones, schema } = this.props;
    const { viewport, info, layers, devices, activeFilter, hoveredInfo, deviceCount, map, hoverDisabled } = this.state;
    const cityReadings = this.calculateCityReadings();

    return (
      <Wrapper onMouseMove={this.handleMouseMove}>
        <Tooltip show={!hoverDisabled && hoveredInfo} ref="tooltipRef">
          {hoveredInfo ?
            <TooltipContent>
              <TooltipHeader> {hoveredInfo.name}</TooltipHeader>
              <LevelText color={this.getAqiColorHex((hoveredInfo.map_meta[PM2_5].level || "").toLowerCase())}>{this.getLevelText(hoveredInfo)}</LevelText>
              <TooltipMeasurements>
                <MeasurementLabel>{hoveredInfo.map_meta[PM2_5] && hoveredInfo.map_meta[PM2_5].measurement && hoveredInfo.map_meta[PM2_5].measurement !== "" ? FormatPM(hoveredInfo.map_meta[PM2_5].measurement) : FormatPM('PM2.5')}</MeasurementLabel>
                <MeasurementValue>{hoveredInfo.map_meta[PM2_5] ? (parseInt(hoveredInfo.map_meta[PM2_5].value) === -1 ? 0 : parseInt(hoveredInfo.map_meta[PM2_5].value)) : ''}</MeasurementValue>
                <MeasurementLabel>{hoveredInfo.map_meta[PM10] && hoveredInfo.map_meta[PM2_5].measurement && hoveredInfo.map_meta[PM2_5].measurement !== "" ? FormatPM(hoveredInfo.map_meta[PM10].measurement) : FormatPM('PM10')}</MeasurementLabel>
                <MeasurementValue>{hoveredInfo.map_meta[PM10] ? (parseInt(hoveredInfo.map_meta[PM10].value) === -1 ? 0 : parseInt(hoveredInfo.map_meta[PM10].value)) : ''}</MeasurementValue>
              </TooltipMeasurements>
            </TooltipContent>
            : ''}
        </Tooltip>
        <UIMask slideIn={info || cityReadings}>
          <Info onMouseEnter={this.handleOverlayMouseEnter} onMouseLeave={this.handleOverlayMouseLeave}>
            <ExternalLink href="https://cityos.io/air">
              <img src={LogoImage} alt="cityos logo" width={260} />
            </ExternalLink>
            {info || cityReadings ? <Measurements showBackArrow={!isEmpty(info)} handleBackClick={()=>this.setState({info: null})} info={info || cityReadings} /> : <p>Please select boxy</p>}
          </Info>
          <Layout style={{overflow:'hidden'}} justify='center' align="flex-start" grow={1}>
            <FilterWrapper onMouseEnter={this.handleOverlayMouseEnter} onMouseLeave={this.handleOverlayMouseLeave}>
              <Filter onClick={() => this.handleFilterChange('outdoor')} active={activeFilter === 'outdoor'}>
                <CheckMark active={activeFilter === 'outdoor'} className="icon-checkmark"></CheckMark>
                <span> Outdoor <FilterCount>({deviceCount.outdoor})</FilterCount></span>
              </Filter>
              <Filter onClick={() => this.handleFilterChange('indoor')} active={activeFilter === 'indoor'}>
                <CheckMark active={activeFilter === 'indoor'} className="icon-checkmark"></CheckMark>
                <span> Indoor <FilterCount>({deviceCount.indoor})</FilterCount></span>
              </Filter>
              <Filter onClick={() => this.handleFilterChange('mine')} active={activeFilter === 'mine'}>
                <CheckMark active={activeFilter === 'mine'} className="icon-checkmark"></CheckMark>
                <span> Mine <FilterCount>({deviceCount.mine})</FilterCount></span>
              </Filter>
            </FilterWrapper>
          </Layout>
        </UIMask>
        <UIMaskMobile slideIn={info || cityReadings}>
          <Layout style={{overflow:'hidden'}} justify='center' align="flex-start" grow={1}>
            <FilterWrapper onMouseEnter={this.handleOverlayMouseEnter} onMouseLeave={this.handleOverlayMouseLeave}>
              <Filter onClick={() => this.handleFilterChange('outdoor')} active={activeFilter === 'outdoor'}>
                <CheckMark active={activeFilter === 'outdoor'} className="icon-checkmark"></CheckMark>
                <span> Outdoor <FilterCount>({deviceCount.outdoor})</FilterCount></span>
              </Filter>
              <Filter onClick={() => this.handleFilterChange('indoor')} active={activeFilter === 'indoor'}>
                <CheckMark active={activeFilter === 'indoor'} className="icon-checkmark"></CheckMark>
                <span> Indoor <FilterCount>({deviceCount.indoor})</FilterCount></span>
              </Filter>
              <Filter onClick={() => this.handleFilterChange('mine')} active={activeFilter === 'mine'}>
                <CheckMark active={activeFilter === 'mine'} className="icon-checkmark"></CheckMark>
                <span> Mine <FilterCount>({deviceCount.mine})</FilterCount></span>
              </Filter>
            </FilterWrapper>
          </Layout>
          <Info onMouseEnter={this.handleOverlayMouseEnter} onMouseLeave={this.handleOverlayMouseLeave}>
            {info || cityReadings ? <MeasurementsMobile showBackArrow={!isEmpty(info)} handleBackClick={()=>this.setState({info: null})} info={info || cityReadings} /> : <p>Please select boxy</p>}
          </Info>
        </UIMaskMobile>
       
        <ReactMapGL
          {...viewport}
          ref={ref => (this.mapRef = ref)}
          width="100%"
          height="100%"
          onViewportChange={this.handleOnViewportChange}
          onLoad={this.handleOnLoad}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {fetching_zones ? <MapLoaderContainer>
              <Loader />  Loading data...
            </MapLoaderContainer>
            : <Fragment>
              <DeckGL
                {...viewport}
                layers={layers}
                id='targetMap'
              />
              {map && (
                <Cluster
                  map={map}
                  radius={40}
                  extent={512}
                  nodeSize={64}
                  generateId={true}
                  element={clusterProps => (
                    <PinGroup onViewportChange={this.handleOnViewportChange} setViewPort={this.setViewPort} {...clusterProps} map={map} schema={schema} />
                  )}
                >
                  {devices.map(device => this.renderMarker(device))}
                </Cluster>
              )}
            </Fragment>
          }
          {/* <span>This item has been hovered: {hoveredInfo ? hoveredInfo.name : ''}</span> */}
        </ReactMapGL>
        
        <NavigationControls>
          <MyLocation 
            onClick={() => {
              if(this.props.locationGranted) this.setViewPort(this.props.myPosition)
            }}
            disabled={!this.props.locationGranted}
          >
            <i className="fas fa-map-marker-alt"></i>
          </MyLocation>
          <ZoomInOut>
            <ZoomIn onClick={this.zoomIn}>+</ZoomIn>
            <ZoomOut onClick={this.zoomOut}>-</ZoomOut>
          </ZoomInOut>
        </NavigationControls>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching_zones: state.map.fetching_zones,
    schema: state.dashboard.schema,
  };
};

export default connect(
  mapStateToProps,
  { setZonesLoading, getSchema }
)(MyLocationHOC(withRouter(Map)));
