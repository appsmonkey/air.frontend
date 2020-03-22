import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { differenceInCalendarDays, formatDistance } from "date-fns";
import { withRouter } from "react-router-dom";

import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import { BoxIcon } from "../styles/dashboardStyles";
import color_scale from "../../map/data/color_scale";

const StyledDevice = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 6px;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.span`
  color: ${props => props.theme.primary};
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.span`
  text-transform: uppercase;
  margin: 0 6px;
  display: none;
  font-weight: 500;
  font-size: .9rem;
  @media (min-width: 576px) {
    display: inline;
  }
`;

const Owner = styled.span`
  color: rgba(0, 0, 0, 0.8);
`;

const Type = styled.span`
  color: rgba(0, 0, 0, 0.8);
`;

const LastReading = styled.span`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
`;

const LastReadingTime = styled.span`
  color: ${props => props.color};
`;

const Device = props => {
  const daysAgo = props.timestamp
    ? differenceInCalendarDays(new Date(), props.timestamp)
    : null;

  function getAqiColor(level) {
    if(!props.active) return color_scale.unknown.colorHex;
    
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
  const aqiColor = getAqiColor(props.level);

  const handleDeviceClick = e => {
    props.history.push(`/dashboard/devices/${props.device_id}`)
  }

  return (
    <StyledDevice>
      <Header>
        <Name onClick={handleDeviceClick}>Device name: {props.name}</Name>
        <StyledLink to={`/dashboard/devices/update/${props.device_id}`}>
          <SettingsIcon />
          <Text>Manage</Text>
        </StyledLink>
      </Header>
      {props.isAdmin && <Owner>Owner: {props.owner}</Owner>}
      {props.indoor ? <Type>Type: Indoor</Type> : <Type>Type: Outdoor</Type>}
      <LastReading>
        Last reading:
        <BoxIcon fill={aqiColor} margin="0 4px 0 4px" />
        <LastReadingTime color={daysAgo >= 3 ? "#fc5151" : "#000"}>
          {props.timestamp &&
            `${formatDistance(new Date(), props.timestamp)} ago` === 'less than a minute ago' ? 'Just now' : `${formatDistance(new Date(), props.timestamp).replace('about ', '')} ago`}
        </LastReadingTime>
      </LastReading>
    </StyledDevice>
  );
};

export default withRouter(Device);
