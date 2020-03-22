import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import isEmpty from 'lodash/isEmpty';

import { Layout } from "../../../core/styles/layout";
import { _deviceFilters } from "../constants/filterOptions";
import { getMyDevices, resetDevices, setDeviceFilters, sortDevices, getAveragePM25Past24Hours, getSchema } from "../actions/dashboardActionCreators";
import Device from "../components/Device";
import DeviceDesktop from "../components/DeviceDesktop";
import Loader from "../../loader/components/Loader";
import Filters from "./Filters";
import color_scale from "../../map/data/color_scale";
import { ReactComponent as GreatIcon } from "../assets/icons/great.svg";
import { ReactComponent as OkIcon } from "../assets/icons/ok.svg";
import { ReactComponent as GoodIcon } from "../assets/icons/good.svg";
import { ReactComponent as UnhealthyIcon } from "../assets/icons/unhealthy.svg";
import { ReactComponent as VeryUnhealthyIcon } from "../assets/icons/very_unhealthy.svg";
import { ReactComponent as HazardousIcon } from "../assets/icons/hazardous.svg";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FormatPM } from "../../helpers/formatStrings";
import { getLvlBasedOnValue } from "../../helpers/aqiCalculation";
import { READINGS } from "../../constants/constants";
import SplashScreenLoader from "../../loader/components/SpashScreen";
import AirLogo from '../../auth/assets/air-loading-v1.png';

const Main = styled.main`
  
  max-width: 992px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 32px;
`;
const StyledLink = styled(Link)`
  color: inherit;
  :visited {
    color: inherit;
    text-decoration: none;
  }
`;

const Header = styled.header`
  padding: 128px 32px 0 32px;
  width:90%;
  font-size: .9rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 80px;
  @media (max-width: 770px) {
    padding: 128px 0 0 0;
    display: grid;
    grid-template-columns: 1fr;
  }

  @media (max-width: 992px) {
    padding: 128px 0 0 0;
    width: 95%;
  }
`;

const RegionContainer = styled.div`
  padding: 0 20px;
  @media (max-width: 770px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const HeaderText = styled.span`
  color: #98a2a4;
`;

const HeaderRegion = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 1px;
  color: #808080;
  margin: 10px 0;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 770px) {
    display: flex;
    justify-content: space-between;
    border-left: none;
    border-right: none;
    margin-bottom: 20px;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;

const OnlineNumber = styled.span`
  font-size: 2rem;
  font-family: Galano Classic;
  font-weight: bold;
  color: #8eca43;
  margin: 10px 0;
`;

const OfflineNumber = styled.span`
  font-size: 2rem;
  font-family: Galano Classic;
  font-weight: bold;
  color: ${props => props.empty ? 'gray' : '#E44666'};
  margin: 10px 0;
`;

const Title = styled.h3`
  color: #808080;
  font-weight: 500;
  text-align: center;
`;

const AnalyiticsContainer = styled.div`
  display: flex;
  padding: 0 0 0 20px;

  @media (max-width: 770px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
`;

const ValueHeading = styled.span`
  color: #98a2a4;
  font-size: .8rem;
`;

const ValueContent = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 0 10px;
`;

const PMContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
`;

const PMNumber = styled.span`
  color: ${props => props.color};
  font-family: Galano Classic;
  font-weight: 500;
  font-size: 1.8rem;
  font-weight: bold;
`;

const PMUnit = styled.span`
  color: #b0b0b0;
  font-size: .7rem;
`;

const GraphWrapper = styled.div`
  flex-grow: 1;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 770px) {
    width: 100%;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

// const StyledLink = styled(Link)`
//   background-color: ${props => props.theme.primary};
//   color: #fff;
//   border: 0;
//   cursor: pointer;
//   height: 36px;
//   border-radius: 2px;
//   font-size: 0.8rem;
//   padding: 0 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const ListIsEmpty = styled.p`
  font-size: 1rem;
  text-align: center;
  margin: 20px 0;
`;

const StyledInlineLink = styled(Link)`
  color: ${props => props.theme.primary};
`;

const MyDevices = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 770px) {
    display: none;
  }
`;

const MyDevicesDesktop = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: none;
  @media (min-width: 770px) {
    display: table;
  }
`;

const TableHead = styled.thead`
  text-align: left;
  color: #98a2a4;
  text-transform: uppercase;
`;

const TableRowHead = styled.tr`
  background-color: #f2f2f2;
  font-family: Galano Classic;
  font-size: 0.8rem;
  font-weight: 500;
`;

const TableRowHeadData = styled.td`
  cursor: pointer;
  padding: 12px 12px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const LinkContainer = styled.div`
  display: flex;
  color: ${props => props.theme.primary};
  align-items: center;
  cursor: pointer;
  &:hover a{
    text-decoration: underline;
  }
  ${props => props.hide ? 'visibility: hidden;' : ''}
`;

const ViewLink = styled.a`
  color: ${props => props.theme.primary};
  font-size: .7rem;
  font-weight: 500;
  font-family: Galano Classic;
  text-align: center;
  margin-right: 2px;
  text-transform: uppercase;
`;

const ChartLink = styled(Link)`
  color: ${props => props.theme.primary};
  font-size: .7rem;
  font-weight: 500;
  font-family: Galano Classic;
  text-align: center;
  margin-right: 2px;
  text-transform: uppercase;
`;

const ArrowDiagonal = styled.span`
  color: inherit;
  transform: rotate(-135deg);
  font-size: .7rem;
`;

const ArrowDown = styled.span`
  color: inherit;
  font-size: .7rem;
`;

const ArrowDesc = styled.span`
  color: inherit;
  margin-left: 10px;
  font-size: .9rem;
  transform: rotate(180deg);
`;

const ArrowAsc = styled.span`
  color: inherit;
  margin-left: 10px;
  font-size: .9rem;
  ${props => props.hidden ? 'visibility: hidden' : ''}
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableSort: {
        sortBy: 'timestamp',
        asc: false
      }
    };
  }

  componentDidMount = () => {
    const { getMyDevices, getAveragePM25Past24Hours, getSchema, setDeviceFilters } = this.props;
    const fromDate = moment().subtract(24, "hours").unix();

    setDeviceFilters([])
    getAveragePM25Past24Hours({ from: fromDate, sensor: READINGS.pm25 });
    getMyDevices();
    getSchema();
  };

  componentDidUpdate(prevProps){
    const { getDevice, my_devices, history } = this.props;

    if(!this.isAdmin() && !isEmpty(my_devices) && my_devices !== prevProps.my_devices){
      const filtered_devices = my_devices.filter(el=>el.mine && !el.default_device);
      if(filtered_devices[0] && filtered_devices[0].device_id){
        if(filtered_devices.length <= 3){
          history.push(`/dashboard/devices/${filtered_devices[0].device_id}`)
        }
      }else{
        history.push('/air/dashboard/city/Sarajevo');
      }
    }
  }

  componentWillUnmount = () => {
    const { resetDevices } = this.props;

    resetDevices();
  };

  getOfflineDevices = (devices) => {
    let offline = 0;

    devices.forEach(device => {
      if (!device.active) {
        offline++;
      }
    });

    return offline;
  };

  isAdmin = () => {
    return localStorage.getItem("isAdmin") == "true";
  };
  
  isLoggedIn = () => {
    if (localStorage.getItem("id_token") === null) {
      return false;
    }
    return true;
  };

  getOnlineDevices = (devices) => {
    let online = 0;

    devices.forEach(device => {
      if (device.active) {
        online++;
      }
    });

    return online;
  };

  getAveragePM2_5 = () => {
    const { chart_data } = this.props;
    if (chart_data.length === 0)
      return 0;
    let sum = 0;

    chart_data.forEach(point => {
      sum += point.value;
    });

    return parseInt(sum / chart_data.length);
  };

  getPM2_5Level = (value) => {
    const { schema } = this.props;
    if (schema)
      return getLvlBasedOnValue(schema[READINGS.pm25], value)
    else
      return "ok";
  }

  handleOfflineClick = () => {
    const { setDeviceFilters } = this.props;
    // set filters and focus on table view
    setDeviceFilters([_deviceFilters.offline]);
  }

  getAqiColor = (lvl) => {
    if(!lvl) return;
    const level = lvl.toLowerCase();

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

  getAqiIcon = (lvl) => {
    if(!lvl) return null;
    const level = lvl.toLowerCase();

    switch (level) {
      case color_scale.great.level:
        return <GreatIcon width={24} fill={this.getAqiColor(level)} />;
      case color_scale.ok.level:
        return <OkIcon width={24} fill={this.getAqiColor(level)} />;
      case color_scale.sensitive_beware.level:
        return <GoodIcon width={24} fill={this.getAqiColor(level)} />;
      case color_scale.unhealthy.level:
        return <UnhealthyIcon width={24} fill={this.getAqiColor(level)} />;
      case color_scale.very_unhealthy.level:
        return <VeryUnhealthyIcon width={24} fill={this.getAqiColor(level)} />;
      case color_scale.hazardous.level:
        return <HazardousIcon width={24} fill={this.getAqiColor(level)} />;
      default:
        return null;
    }
  }

  handleTableSort = (fieldName) => {
    const { tableSort } = this.state;
    const { sortDevices } = this.props;

    let sort = { sortBy: fieldName, asc: tableSort.sortBy === fieldName ? !tableSort.asc : false };
    this.setState({ tableSort: sort });
    sortDevices({ fieldName, asc: sort.asc })
  }

  sortArrow = (fieldName) => {
    const { tableSort } = this.state;
    if (tableSort && tableSort.sortBy === fieldName) {
      return tableSort.asc ? <ArrowAsc className="fas fa-chevron-up"></ArrowAsc> : <ArrowDesc className="fas fa-chevron-up"></ArrowDesc>;
    }
    return <ArrowAsc hidden className="fas fa-chevron-up"></ArrowAsc>;
  }

  render() {
    const { filtered_my_devices, fetching_my_devices, chart_data, location, history } = this.props;
    const filtered_devices = location.pathname == '/dashboard' && this.isAdmin() ? filtered_my_devices.filter(d=>d.mine) : filtered_my_devices;

    const countOnline = this.getOnlineDevices(filtered_devices);
    const countOffline = this.getOfflineDevices(filtered_devices);
    const averagePM2_5Value = this.getAveragePM2_5();
    const pm2_5Level = this.getPM2_5Level(averagePM2_5Value);

    if(fetching_my_devices) return <SplashScreenLoader><img style={{width: 'auto', height: '300px', marginBottom: '10px'}} src={AirLogo} /></SplashScreenLoader>;
    return (
      <>
        <Header>
          <RegionContainer>
            <HeaderText>Air devices region</HeaderText>
            <HeaderRegion><StyledLink to="/air/dashboard/city/Sarajevo">Sarajevo</StyledLink></HeaderRegion>
          </RegionContainer>
          <StatusContainer>
            <StatusWrapper>
              <HeaderText>Online</HeaderText>
              <OnlineNumber>{countOnline}</OnlineNumber>
              <HeaderText>of {filtered_devices.length}</HeaderText>
            </StatusWrapper>
            <StatusWrapper>
              <HeaderText>Offline</HeaderText>
              <OfflineNumber empty={countOffline === 0}>{countOffline}</OfflineNumber>
              <LinkContainer hide={countOffline === 0} onClick={this.handleOfflineClick}>
                <ViewLink href="#device-list">View</ViewLink>
                <ArrowDown className="fas fa-arrow-down"></ArrowDown>
              </LinkContainer>
            </StatusWrapper>
          </StatusContainer>
          <AnalyiticsContainer>
            <ValueWrapper onClick={()=>history.push('/air/dashboard/city/Sarajevo')}>
              <ValueHeading>{FormatPM("PM 2.5")} past 24 hours</ValueHeading>
              <ValueContent>
                {this.getAqiIcon(pm2_5Level)}
                <PMContainer>
                  <PMNumber color={this.getAqiColor(pm2_5Level)}>{averagePM2_5Value}</PMNumber>
                  <PMUnit>μg/m3</PMUnit>
                </PMContainer>
              </ValueContent>
            </ValueWrapper>
            <GraphWrapper>
              <Sparklines height={40} min={0} data={chart_data.map(dataPoint => dataPoint.value)}>
                <SparklinesLine style={{ fillOpacity: "0.5" }} color={this.getAqiColor(pm2_5Level)} />
              </Sparklines>
              <LinkContainer>
                <ChartLink to="/air/dashboard/city/Sarajevo#chart-city">Chart</ChartLink>
                <ArrowDiagonal className="fas fa-arrow-down"></ArrowDiagonal>
              </LinkContainer>
            </GraphWrapper>
          </AnalyiticsContainer>
        </Header>
        <Main>
          <Title id="device-list">{this.isAdmin() ? 'All devices' : 'All My Devices'}</Title>
          <Filters isAdmin={this.isAdmin()} isDashboard={location.pathname == '/dashboard'} />
          <MyDevices>
            {filtered_devices.map(device => {
              return (
                <Device
                  key={device.device_id}
                  device_id={device.device_id}
                  name={device.name}
                  active={device.active}
                  indoor={device.indoor}
                  owner={device.owner}
                  timestamp={device.timestamp * 1000}
                  level={
                    (device.map_meta &&
                      device.map_meta[READINGS.pm25] &&
                      device.map_meta[READINGS.pm25].level.toLowerCase()) ||
                    "unknown"
                  }
                  isAdmin={this.isAdmin()}
                />
              );
            })}
          </MyDevices>
          <MyDevicesDesktop>
            <TableHead>
              <TableRowHead>
                <TableRowHeadData onClick={() => this.handleTableSort("name")}><Layout align="center">Device name {this.sortArrow("name")}</Layout></TableRowHeadData>
                {this.isAdmin() && <TableRowHeadData onClick={() => this.handleTableSort("owner")}><Layout align="center">Owner {this.sortArrow("owner")}</Layout></TableRowHeadData>}
                <TableRowHeadData onClick={() => this.handleTableSort("indoor")}><Layout align="center">Type {this.sortArrow("indoor")}</Layout></TableRowHeadData>
                <TableRowHeadData onClick={() => this.handleTableSort("timestamp")}><Layout align="center">Last reading {this.sortArrow("timestamp")}</Layout></TableRowHeadData>
                <TableRowHeadData />
              </TableRowHead>
            </TableHead>
            <TableBody>
              {filtered_devices.map(device => {
                return (
                  <TableRow key={device.device_id}>
                    <DeviceDesktop
                      device_id={device.device_id}
                      name={device.name}
                      active={device.active}
                      indoor={device.indoor}
                      owner={device.owner}
                      timestamp={device.timestamp * 1000}
                      level={
                        (device.map_meta &&
                          device.map_meta[READINGS.pm25] &&
                          device.map_meta[READINGS.pm25].level.toLowerCase()) ||
                        "unknown"
                      }
                      isAdmin={this.isAdmin()}
                    />
                  </TableRow>
                );
              })}
            </TableBody>
          </MyDevicesDesktop>
          {fetching_my_devices ? <Loader /> : null}
          {!fetching_my_devices && filtered_devices.length === 0 && (
            <ListIsEmpty>
              You don't have any devices
            </ListIsEmpty>
          )}
        </Main>
      </>
    );
  }
}

const mapStateToProps = state => {
  const filteredDevices = state.dashboard.filtered_my_devices.filter(device => !device.default_device);
  return {
    filtered_my_devices: filteredDevices,
    my_devices: state.dashboard.my_devices,
    fetching_my_devices: state.dashboard.fetching_my_devices,
    fetching_chart_data: state.dashboard.fetching_average_pm_2_5,
    chart_data: state.dashboard.past_24_hours_chart_data,
    schema: state.dashboard.schema,
  };
};

export default connect(
  mapStateToProps,
  { getMyDevices, resetDevices, setDeviceFilters, sortDevices, getAveragePM25Past24Hours, getSchema }
)(Dashboard);
