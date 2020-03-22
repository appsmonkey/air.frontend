import React from "react";
import styled from "styled-components";
import ReactMapGL, { Marker } from "react-map-gl";

import { ReactComponent as Pin } from "../assets/map-pin.svg";
import { BoxIcon, MyBoxIcon } from "../styles/dashboardStyles";
import color_scale from "../../map/data/color_scale";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const StyledPin = styled(Pin)`
  color: #ff3b30;
`;


const MiniMap = props => {
  const { marker, level, mine, active } = props;

  function getAqiColor(level) {
    if(!active) return color_scale.unknown.colorHex;
    
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

  return (
    <ReactMapGL
      latitude={marker.latitude}
      longitude={marker.longitude}
      zoom={11}
      width="100%"
      height="100%"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {marker.longitude !== 0 && marker.latitude !== 0 && (
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
        >
          {mine ?  <MyBoxIcon fill={getAqiColor(level.toLowerCase())} /> : <BoxIcon fill={getAqiColor(level.toLowerCase())} />}
        </Marker>
      )}
    </ReactMapGL>
  );
};

export default MiniMap;
