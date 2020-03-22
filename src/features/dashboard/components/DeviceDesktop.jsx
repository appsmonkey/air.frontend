import React from "react";
import styled, {withTheme} from "styled-components";
import { Link } from "react-router-dom";
import { differenceInCalendarDays, formatDistance } from "date-fns";

import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import { BoxIcon } from "../styles/dashboardStyles";
import color_scale from "../../map/data/color_scale";

const TableData = styled.td`
  padding: 12px 6px;
  ${props => props.maxWidth ? `max-width: ${props.maxWidth}px;`:''}
`;

const Name = styled(Link)`
  color: inherit;
  font-weight: 500;
`;

const LogLink = styled(Link)`
  color: #98a2a4;
  font-size: .7rem;
  text-transform: uppercase;
`;

const ArrowDiagonal = styled.span`
  color: inherit;
  transform: rotate(-135deg);
  font-size: .7rem;
`;

const Type = styled.span`
  color: #98a2a4;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Text = styled.span`
  text-transform: uppercase;
  margin: 0 6px;
  font-weight: 500;
  font-size: .8rem;
`;

const LastReading = styled.div`
  display: flex;
  align-items: center;
`;

const LastReadingTime = styled.span`
  color: ${props => props.color};
`;

const Owner = styled.span`
  color: inherit;
`
const TextWrap = styled.div`
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  ${props => props.fontColor ? `color: ${props.fontColor};` : ''}
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

  return (
    <>
      <TableData maxWidth={200}>
        <TextWrap fontColor={props.theme.primary} title={props.name}>
          <Name to={`/dashboard/devices/${props.device_id}`}>{props.name}</Name>
        </TextWrap>
        {/* <LogLink to='/'>Log<ArrowDiagonal className="fas fa-arrow-down"></ArrowDiagonal></LogLink> */}
      </TableData>
      {props.isAdmin && <TableData maxWidth={200}><TextWrap fontColor="#98a2a4" title={props.owner}><Owner>{props.owner}</Owner></TextWrap></TableData>}
      {props.indoor ? (
        <TableData>
          <Type>Indoor</Type>
        </TableData>
      ) : (
          <TableData>
            <Type>Outdoor</Type>
          </TableData>
        )}
      <TableData>
        <LastReading>
          <BoxIcon fill={getAqiColor(props.level)} margin="0 4px 0 0" />
          <LastReadingTime color={daysAgo >= 3 ? "#fc5151" : "#98a2a4"}>
            {props.timestamp &&
              `${formatDistance(new Date(), props.timestamp)} ago` === 'less than a minute ago' ? 'Just now' : `${formatDistance(new Date(), props.timestamp).replace('about ', '')} ago`}
          </LastReadingTime>
        </LastReading>
      </TableData>
      <TableData>
        <StyledLink to={`/dashboard/devices/update/${props.device_id}`}>
          <SettingsIcon stroke="#808080" width={18} height={18} />
          <Text>Manage</Text>
        </StyledLink>
      </TableData>
    </>
  );
};

export default withTheme(Device);
