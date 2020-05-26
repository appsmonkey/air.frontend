import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { Layout } from "../../../core/styles/layout"
import { Link, withRouter } from "react-router-dom";
import { differenceInHours, formatDistance } from "date-fns";
import ReadingCircle from "../../commonComponents/ReadingCircle";
import ScrollTo from "../../commonComponents/ScrollTo";

import { getDevice, getMyDevices, setChartFilters, getSchema, getDashboardChartData, getInitialDashboardChartData } from "../actions/dashboardActionCreators";
import { SettingsIcon, SwitchIcon } from "../styles/dashboardStyles";
import MiniMap from "../components/MiniMap";
import Reading from "../components/Reading";
import Chart from "../components/Chart/index";
import dailyPm1 from "../data/dailyPm1";
import dailyPm25 from "../data/dailyPm25";
import cloudsBg from "../assets/launch-bg.png";
import MultiSelect from "../../commonComponents/MultiSelect";
import CustomSelect from "./SwitchFilter";
import { _chartFilters } from "../constants/filterOptions";
import { READINGS, EXCLUDED_READINGS } from "../../constants/constants";
import LinkIcon from '../assets/link icon.png';
import SENSOR_RANGES from "../constants/sensorRange";
import Helpers from "../../helpers/helpers";
import SplashScreenLoader from "../../loader/components/SpashScreen";
import AirLogo from '../../auth/assets/air-loading-v1.png';

const Wrapper = styled.div`
  padding: 128px 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.header`
  display: grid;
  grid-gap: 20px;
  margin-bottom: 40px;
  color: #98a2a4;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const BgWrapper = styled.div`
  margin-bottom: 40px;
  background-size: cover;
  background-position: center;
  max-height: 100%;
  width: auto;
  background-image: url(${cloudsBg});
`;

const Container = styled.div`
  padding: 128px 32px 32px 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.span`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const Name = styled.h1`
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #808080;
`;

const OptionsWrapper = styled.div`
  display: flex;
`;

const Text = styled.span`
  color: ${props => props.theme.primary};
  font-size: .8rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LastReading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 992px) {
    text-align: left;
    padding: 0 20px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const TimeAgo = styled.span`
  font-weight: 400;
  font-size: 1.5rem;
  color: ${props=>props.color || '#88b862'};
  margin-bottom: 20px;
`;

const TimeDate = styled.span``;

const Location = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 25vh;
  @media (min-width: 992px) {
    min-height: initial;
  }
`;

const LiveReadings = styled.div`
  font-weight: 500;
  margin-bottom: 40px;
`;

const Subtitle = styled.h2`
  font-weight: 500;
  margin-bottom: 20px;
  font-size: 1.2rem;
  text-align: center;
  color: #808080;
`;

const ProgressGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledChart = styled.div`
  height: 25vh;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-left: 100px;

  
  @media (max-width: 1060px) {
    width: 100%;
    margin-left: 0;
    padding: 0 50px;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    margin-left: 0;
    padding: 0 15px;
  }
`;

const TimeFilter = styled.div`
  display: flex;
  bacground-color: white;
  border-radius: 4px;
  border: 1px solid #9595954d;
  min-height: 40px;
  overflow: auto;

  @media (max-width: 576px) {
    justify-content: space-between;
  }
`;

const TimeItem = styled.div`
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #98a2a4;
  min-width: 100px;
  cursor: pointer;

  @media (max-width: 576px) {
    min-width: 70px;
    font-size: 0.9rem;
  }

  ${props => props.active ? `
    color: #808080;
    background-color: #EEFCFC
  ` : `
    &:hover{
      background-color: rgba(0,0,0,0.02);
    }
  `}
`;

const ReadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  @media (min-width: 576px) {
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 33.33%;
  }
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ViewLinkContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  opacity: .8;
  padding: 7px 10px;
  cursor: pointer;
`;

const ViewLink = styled(Link)`
  font-size: .7rem;
  letter-spacing: 2px;
  color: #00a2ae;
  font-family: Galano Classic;
  margin-left: 10px;
`;


const options = Object.keys(_chartFilters).map(key => _chartFilters[key]);

class DeviceDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: dailyPm1,
      timeFilter: 'live',
      fillWait: true,
    };
    this.deviceInterval = null;
    this.chartInterval = null;
  }
  componentDidMount = () => {
    const {timeFilter} = this.state;
    const { match, getMyDevices, schema, getSchema, history, location, setChartFilters, getDevice, getInitialDashboardChartData } = this.props;
    const id = match.params.id;
    if(this.isAdmin() && !id){
      history.push('/admin');
    }
    this.redirectUser();

    let searchQuery = null;
    if(location.search && location.search !== "") {
      searchQuery = new URLSearchParams(location.search);
    }

    if (!schema){
      getSchema();
    }

    getMyDevices();
    getDevice(id)
    this.getDeviceInterval(id);
    getInitialDashboardChartData({
      by: timeFilter,
      from: Helpers.generateChartFromTimestamp(timeFilter),
      device_id: id,
      selectAllFilters: true,
    }, {searchParams: searchQuery});
    this.getChartDataInterval({
      by: timeFilter,
      from: Helpers.generateChartFromTimestamp(timeFilter),
      device_id: id,
    });

    // animate reading circles
    setTimeout(() => this.setState({ fillWait: false }), 500)
  };

  componentDidUpdate(prevProps){
    const {my_devices} = this.props;
    if(!isEmpty(my_devices) && my_devices !== prevProps.my_devices){
      this.redirectUser();
    }
  }

  
  componentWillUnmount(){
    if(this.deviceInterval) clearInterval(this.deviceInterval);
    if(this.chartInterval) clearInterval(this.chartInterval);
  }
  
  redirectUser = () => {
    const { timeFilter } = this.state;
    const { match, location, my_devices, history, getDevice, getInitialDashboardChartData } = this.props;
    const id = match.params.id;

    const filtered_devices = my_devices.filter(el=>el.mine && !el.default_device);
    if(id && this.isLoggedIn()){
      const deviceIndex = filtered_devices.findIndex(device => device.device_id === id);
      const isMyDevice = (deviceIndex > -1);
      if( isMyDevice && match.path !== '/dashboard/devices/:id'){
        console.log("YESS! REDIRECT TO MY DEVICES")
        if(this.isAdmin()){
          history.push(`/dashboard/devices/${id + (location.search || '') + (location.hash || '')}`);
        }
      }else if(!isMyDevice){
        if(this.isAdmin() && match.path !== '/admin/dashboard/devices/:id'){
          history.push(`/admin/dashboard/devices/${id + (location.search || '') + (location.hash || '')}`);
        }else if(!this.isAdmin() && match.path !== '/air/dashboard/devices/:id'){
          history.push(`/air/dashboard/devices/${id + (location.search || '') + (location.hash || '')}`);
        }
      }
    }
    else{
      if(filtered_devices[0] && filtered_devices[0].device_id){
        if(filtered_devices.length > 3 && !this.isAdmin()){
          history.push('/dashboard');
        }else {
          getDevice(filtered_devices[0].device_id);
          this.getDeviceInterval(filtered_devices[0].device_id);
          getInitialDashboardChartData({
            by: timeFilter,
            from: Helpers.generateChartFromTimestamp(timeFilter),
            device_id: filtered_devices[0].device_id,
          });
          this.getChartDataInterval({
            by: timeFilter,
            from: Helpers.generateChartFromTimestamp(timeFilter),
            device_id: filtered_devices[0].device_id,
          });
        }
      }else{
        history.push('/air/dashboard/city/Sarajevo');
      }
    }
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

  showPm1 = () => {
    this.setState({ data: dailyPm1 });
  };

  showPm25 = () => {
    this.setState({ data: dailyPm25 });
  };

  handleChange = device_id => {
    const { timeFilter } = this.state;
    const { history, getDevice, getInitialDashboardChartData } = this.props;

    history.push(`/dashboard/devices/${device_id.value}`);
    getDevice(device_id.value);
    this.getDeviceInterval(device_id.value);

    getInitialDashboardChartData({
      by: timeFilter,
      from: Helpers.generateChartFromTimestamp(timeFilter),
      device_id: device_id.value,
    });
    this.getChartDataInterval({
      by: timeFilter,
      from: Helpers.generateChartFromTimestamp(timeFilter),
      device_id: device_id.value,
    });
  };

  getDeviceInterval = (id) => {
    const { getDevice } = this.props;
    if(id){
      if(this.deviceInterval) clearInterval(this.deviceInterval);
      this.deviceInterval = setInterval(()=>{
        getDevice(id)
      },30000)
    }else{
      if(this.deviceInterval) clearInterval(this.deviceInterval);
    }
  }

  getChartDataInterval = (data) => {
    const { getDashboardChartData } = this.props;
    if(data){
      if(this.chartInterval) clearInterval(this.chartInterval);
      this.chartInterval = setInterval(()=>{
        getDashboardChartData(data);
      },30000)
    }else{
      if(this.chartInterval) clearInterval(this.chartInterval);
    }
  } 

  getOptions = () => {
    const { my_devices } = this.props;
    const filtered_devices = my_devices.filter(el=>!el.default_device);
    if(!isEmpty(filtered_devices)){
      let options = [...filtered_devices.map(device => {
        return { value: device.device_id, label: device.name };
      })];
      options = options.slice(0,5)
      if(filtered_devices.length > 5){
        options.push({link: this.isAdmin() ? '/admin' : '/dashboard', text: `View all ${filtered_devices.length} devices`})
      }
      return options;
    }else{
      return []
    }
  };

  handleFilterChange = option => {
    const { setChartFilters, applied_filters } = this.props;

    const filterIndex = applied_filters.findIndex(el => el.label === option.label);
    const newOptions = [...applied_filters];
    if (filterIndex === -1) {
      newOptions.push(option);
    }
    else {
      newOptions.splice(filterIndex, 1);
    }

    setChartFilters(newOptions);
  };

  handleTimeFilterChange = timeFilter => {
    const {getInitialDashboardChartData, device} = this.props;
    getInitialDashboardChartData({
      by: timeFilter,
      from: Helpers.generateChartFromTimestamp(timeFilter),
      device_id: device.device_id,
    });
    this.getChartDataInterval({
      by: timeFilter,
      from: Helpers.generateChartFromTimestamp(timeFilter),
      device_id: device.device_id,
    })

    this.setState({ timeFilter });
  }

  getTimeAgo = (timestamp) => {
    if(!timestamp) return null;
    return `${formatDistance(new Date(), timestamp)} ago` === 'less than a minute ago' ? 'Just now' : `${formatDistance(new Date(), timestamp).replace('about ', '')} ago`;
  };

  switchLabel = () =>
    <Layout align="center">
      <SwitchIcon margin="0 10px 0 0" ></SwitchIcon>
      <Text>  switch to...</Text>
    </Layout>

  calculateReadingPercentage = (sensor, value) => {
    if(SENSOR_RANGES[sensor]){
      const percentage = parseInt(((value-SENSOR_RANGES[sensor].from) / (SENSOR_RANGES[sensor].to-SENSOR_RANGES[sensor].from))*100);
      return percentage <= SENSOR_RANGES[sensor].minPercentage ? SENSOR_RANGES[sensor].minPercentage : percentage;
    }else {
      return 10;
    }
  }

  renderRestReadings = () => {
    const { device } = this.props;
    const { fillWait } = this.state;

    if(device && !isEmpty(device.map_meta)){
      return Object.keys(device.map_meta).map((sensor, index) => {
        if(sensor === READINGS.pm25 || sensor === READINGS.pm10 || sensor === READINGS.pm1 || sensor === READINGS.humidity || sensor === READINGS.temperature || sensor === READINGS.temperatureFeel || EXCLUDED_READINGS.some(el=>el===sensor)) return null;
        const data = Helpers.formatSensorData(device.map_meta[sensor], sensor);
        return(
          <ReadingContainer key={index}>
            <ReadingCircle
              sensor={sensor}
              valueNumber={data.value}
              headerText={data.measurement}
              valueUnit={data.unit}
              iconSize={50}
              rotation='0'
              trailColor='rgba(3, 210, 226, 0.2)'
              animateOnLoad
              percentage={fillWait ? 0 : this.calculateReadingPercentage(sensor, data.value)}
              colorIcon
            />
          </ReadingContainer>
        )
      })
    }else {
      return null;
    }
  }

  generateMapQuery = device => {
    if(device.mine) return `mine=${device.mine}`;
    return `indoor=${device.indoor}`;
  }

  render() {
    const { device, applied_filters, setChartFilters, location, history, my_devices, fetching_my_devices, all_chart_filters } = this.props;
    const { data, timeFilter, fillWait } = this.state;
    const hoursAgo = device.timestamp ? differenceInHours(new Date(), device.timestamp) : null;

    if(fetching_my_devices) return <SplashScreenLoader><img style={{width: 'auto', height: '300px', marginBottom: '10px'}} src={AirLogo} /></SplashScreenLoader>;
    return (
      <>
        <BgWrapper>
          <Container>
            <Header>
              <Info>
                <InfoTextContainer>
                  <InfoTitle>
                    {device.indoor ? "Indoor Air Device" : "Outdoor Air Device"}
                  </InfoTitle>
                  <Name title={device.name}>{Helpers.trimString(device.name, 30)}</Name>
                </InfoTextContainer>
                <OptionsWrapper>
                  {this.isLoggedIn() && !isEmpty(my_devices) && my_devices.length > 1 &&
                    <CustomSelect
                      styleProps={{ menuWidth: '200px', containerWidth: '130px' }}
                      value={{ value: device.device_id, label: this.switchLabel() }}
                      onChange={this.handleChange}
                      options={this.getOptions()}
                      placeholder="Switch to.."
                    />
                  }
                  {this.isAdmin() || (this.isLoggedIn() && device.mine) ?
                    <StyledLink
                      to={`/dashboard/devices/update/${device.device_id}`}
                    >
                      <SettingsIcon stroke="#8A8A8A" margin="0 4px 0 0" />
                      <Text>Manage device</Text>
                    </StyledLink> 
                  : null}
                </OptionsWrapper>
              </Info>
              <LastReading>
                <Layout direction="column">
                  <InfoTitle>Last reading</InfoTitle>
                  <TimeAgo color={hoursAgo < 2 ? '#88b862' : '#fc5151'}>
                    {this.getTimeAgo(device.timestamp)}
                  </TimeAgo>
                  <TimeDate>
                    {device.timestamp &&
                      moment(device.timestamp).format("h:mma MMM DD Y")}
                  </TimeDate>
                </Layout>
              </LastReading>
              <Location>
                <InfoTitle>Location</InfoTitle>
                {device.location && (
                  <MapContainer>
                    <MiniMap
                      marker={{
                        longitude: device.location.lng,
                        latitude: device.location.lat
                      }}
                      level={device.map_meta && device.map_meta[READINGS.pm25] ? device.map_meta[READINGS.pm25].level : ''}
                      mine={device.mine}
                      active={device.active}
                    />
                    <ViewLinkContainer onClick={() => history.push(`/air/Sarajevo?device_id=${device.device_id}&${this.generateMapQuery(device)}`)}>
                      <img src={LinkIcon} width="20px" height="auto"/>
                      <ViewLink to={`/air/Sarajevo?device_id=${device.device_id}&${this.generateMapQuery(device)}`}>VIEW MAP</ViewLink>
                    </ViewLinkContainer>
                  </MapContainer>
                )}
              </Location>
            </Header>
            <LiveReadings>
              <Subtitle>Live Readings</Subtitle>
              <ProgressGrid>
                {device && device.map_meta && device.map_meta[READINGS.pm1] && (
                  <ReadingContainer>
                    <Reading
                      level={device.map_meta[READINGS.pm1].level}
                      measurement={device.map_meta[READINGS.pm1].measurement}
                      value={device.map_meta[READINGS.pm1].value}
                      unit={device.map_meta[READINGS.pm1].unit}
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.pm1, device.map_meta[READINGS.pm1].value)}
                    />
                  </ReadingContainer>
                )}
                {device && device.map_meta && device.map_meta[READINGS.pm25] && (
                  <ReadingContainer>
                    <Reading
                      level={device.map_meta[READINGS.pm25].level}
                      measurement={device.map_meta[READINGS.pm25].measurement}
                      value={device.map_meta[READINGS.pm25].value}
                      unit={device.map_meta[READINGS.pm25].unit}
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.pm25, device.map_meta[READINGS.pm25].value)}
                    />
                  </ReadingContainer>
                )}
                {device && device.map_meta && device.map_meta[READINGS.pm10] && (
                  <ReadingContainer>
                    <Reading
                      level={device.map_meta[READINGS.pm10].level}
                      measurement={device.map_meta[READINGS.pm10].measurement}
                      value={device.map_meta[READINGS.pm10].value}
                      unit={device.map_meta[READINGS.pm10].unit}
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.pm10, device.map_meta[READINGS.pm10].value)}
                    />
                  </ReadingContainer>
                )}

                {/* testing readings hard coded */}
                {/* <ReadingContainer>

                  <Reading
                    level={"unhealthy"}
                    measurement={"PM 1"}
                    value={80}
                    unit={"μg/m³"}
                  />
                  </ReadingContainer>
                  <ReadingContainer>
                  <Reading
                  level={"sensitive beware"}
                  measurement={"PM 2.5"}
                  value={36}
                  unit={"μg/m³"}
                  />
                  </ReadingContainer>
                  <ReadingContainer>
                  <Reading
                  level={"ok"}
                  measurement={"PM 10"}
                  value={90}
                  unit={"μg/m³"}
                  />
                    </ReadingContainer>                  */}
                     {device && device.map_meta && device.map_meta[READINGS.temperature] && (
                  <ReadingContainer>
                    <ReadingCircle
                      level="temperature"
                      valueNumber={device.map_meta[READINGS.temperature].value}
                      headerText={device.map_meta[READINGS.temperature].measurement}
                      valueUnit={device.map_meta[READINGS.temperature].unit}
                      iconSize={50}
                      rotation='0'
                      trailColor='rgba(3, 210, 226, 0.2)'
                      animateOnLoad
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.temperature, device.map_meta[READINGS.temperature].value)}
                      colorIcon
                    />
                  </ReadingContainer>
                )}
                {device && device.map_meta && device.map_meta[READINGS.temperatureFeel] && (
                  <ReadingContainer>
                    <ReadingCircle
                      level="temp-like"
                      valueNumber={device.map_meta[READINGS.temperatureFeel].value}
                      headerText={device.map_meta[READINGS.temperatureFeel].measurement}
                      valueUnit={device.map_meta[READINGS.temperatureFeel].unit}
                      iconSize={50}
                      rotation='0'
                      trailColor='rgba(3, 210, 226, 0.2)'
                      animateOnLoad
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.temperatureFeel, device.map_meta[READINGS.temperatureFeel].value)}
                      colorIcon
                    />
                  </ReadingContainer>
                )}
                {device && device.map_meta && device.map_meta[READINGS.humidity] && (
                  <ReadingContainer>
                    <ReadingCircle
                      level="humidity"
                      valueNumber={device.map_meta[READINGS.humidity].value}
                      headerText={device.map_meta[READINGS.humidity].measurement}
                      valueUnit={device.map_meta[READINGS.humidity].unit}
                      iconSize={50}
                      rotation='0'
                      trailColor='rgba(3, 210, 226, 0.2)'
                      animateOnLoad
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.humidity, device.map_meta[READINGS.humidity].value)}
                      colorIcon
                    />
                  </ReadingContainer>
                )}
                {this.renderRestReadings()}
              </ProgressGrid>
            </LiveReadings>
          </Container>
        </BgWrapper>
        {/*<ChartWrapper>
          <Subtitle>Compare data</Subtitle>
          <ChartHeader>
            <Button>Hourly</Button>
            <Button>Daily</Button>
          </ChartHeader>
          <StyledVerticalBar>
            <VerticalBar data={data} />
          </StyledVerticalBar>
          <ChartFooter>
            <Button onClick={this.showPm1}>PM 1</Button>
            <Button onClick={this.showPm25}>PM 2.5</Button>
            <Button>PM 10</Button>
          </ChartFooter>
          <StyledChart>
            <Chart />
          </StyledChart>
        </ChartWrapper>*/}
        <ScrollTo identifier="chart-device" delay={500}>
          <ChartWrapper>
            <Subtitle>Compare data</Subtitle>
            <FiltersContainer>
              <MultiSelect
                styleProps={{ containerWidth: '160px', menuWidth: '220px', menuPadding: '0' }}
                value={[{ label: "Display on chart", value: null }, ...applied_filters]}
                onChange={this.handleFilterChange}
                setFilters={setChartFilters}
                appliedFilters={applied_filters}
                options={isEmpty(all_chart_filters) ? options : all_chart_filters}
                placeholder="Display on chart"
              />
              <TimeFilter>
                <TimeItem
                  active={timeFilter === 'live'}
                  onClick={() => this.handleTimeFilterChange('live')}
                >Live</TimeItem>
                <TimeItem
                  active={timeFilter === 'day'}
                  onClick={() => this.handleTimeFilterChange('day')}
                >Day</TimeItem>
                <TimeItem
                  active={timeFilter === 'week'}
                  onClick={() => this.handleTimeFilterChange('week')}
                >Week</TimeItem>
                <TimeItem
                  active={timeFilter === 'month'}
                  onClick={() => this.handleTimeFilterChange('month')}
                >Month</TimeItem>
                <TimeItem
                  active={timeFilter === 'all'}
                  onClick={() => this.handleTimeFilterChange('all')}
                >All</TimeItem>
              </TimeFilter>
            </FiltersContainer>
            <StyledChart style={{ zIndex: 0 }}>
              <Chart />
            </StyledChart>
          </ChartWrapper>
        </ScrollTo>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    device: state.dashboard.device,
    my_devices: state.dashboard.my_devices,
    applied_filters: state.dashboard.applied_chart_filters,
    schema: state.dashboard.schema,
    fetching_my_devices: state.dashboard.fetching_my_devices,
    all_chart_filters: state.dashboard.all_chart_filters,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getDevice, getMyDevices, setChartFilters, getSchema, getDashboardChartData, getInitialDashboardChartData }
  )(DeviceDashboard)
);
