import React from "react";
import styled from "styled-components";

import ReadingCircle from "../../commonComponents/ReadingCircle"

const IconWrapper = styled.div`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  padding: 10px;
`;

const Aqi = styled.span`
  font-size: 1rem;
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Status = styled.span`
  font-size: 1rem;
`;

const Pollutant = styled.span`
  font-size: 0.8rem;
  background-color: #fff;
  border-radius: 3px;
  padding: 4px;
`;

const Reading = ({ level, value, measurement, unit, ...restProps }) => {
  // function getAqiColor(lvl) {
  //   const level = lvl.toLowerCase();

  //   switch (level) {
  //     case color_scale.great.level:
  //       return color_scale.great.colorHex;
  //     case color_scale.ok.level:
  //       return color_scale.ok.colorHex;
  //     case color_scale.sensitive_beware.level:
  //       return color_scale.sensitive_beware.colorHex;
  //     case color_scale.unhealthy.level:
  //       return color_scale.unhealthy.colorHex;
  //     case color_scale.very_unhealthy.level:
  //       return color_scale.very_unhealthy.colorHex;
  //     case color_scale.hazardous.level:
  //       return color_scale.hazardous.colorHex;
  //     default:
  //       return color_scale.unknown.colorHex;
  //   }
  // }

  // function getAqiIcon(lvl) {
  //   const level = lvl.toLowerCase();

  //   switch (level) {
  //     case color_scale.great.level:
  //       return <GreatIcon width="64px" height="64px" />;
  //     case color_scale.ok.level:
  //       return <OkIcon width="64px" height="64px" />;
  //     case color_scale.sensitive_beware.level:
  //       return <GoodIcon width="64px" height="64px" />;
  //     case color_scale.unhealthy.level:
  //       return <UnhealthyIcon width="64px" height="64px" />;
  //     case color_scale.very_unhealthy.level:
  //       return <VeryUnhealthyIcon width="64px" height="64px" />;
  //     case color_scale.hazardous.level:
  //       return <HazardousIcon width="64px" height="64px" />;
  //     default:
  //       return null;
  //   }
  // }

  function parseMeasurementValue(value) {
    return parseInt(value);
  }

  return (
    // <StyledReading bgColor={getAqiColor(props.level)}>
    //   <IconWrapper bgColor={getAqiColor(props.level)}>
    //     {getAqiIcon(props.level)}
    //   </IconWrapper>
    //   <Info>
    //     <Aqi>{parseMeasurementValue(props.value)}</Aqi>
    //     <StatusWrapper>
    //       <Status>{props.level}</Status>
    //       <Pollutant>
    //         {props.measurement} | {props.unit}
    //       </Pollutant>
    //     </StatusWrapper>
    //   </Info>
    // </StyledReading>
    <ReadingCircle
      level={level}
      valueNumber={value}
      headerText={measurement}
      valueUnit={unit}
      iconSize={50}
      colorIcon
      {...restProps}
    />
  );
};

export default Reading;
