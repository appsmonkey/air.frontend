import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from 'moment';
import { Layout } from "../../../core/styles/layout"
import { Link, withRouter } from "react-router-dom";
import ReadingCircle from "../../commonComponents/ReadingCircle"
import isEmpty from 'lodash/isEmpty';

import { getMyDevices, setChartFilters, getSchema, getDashboardChartData, getInitialDashboardChartData } from "../actions/dashboardActionCreators";
import Reading from "../components/Reading";
import Chart from "../components/Chart/index";
import dailyPm1 from "../data/dailyPm1";
import dailyPm25 from "../data/dailyPm25";
import cloudsBg from "../assets/launch-bg.png";
import MultiSelect from "../../commonComponents/MultiSelect";
import axiosInstance from '../../../core/http/axiosInstance';
import { _chartFilters } from "../constants/filterOptions";
import { READINGS, EXCLUDED_READINGS } from "../../constants/constants";
import { getLvlBasedOnValue } from "../../helpers/aqiCalculation";
import MapImage from '../assets/city_map.png';
import LinkIcon from '../assets/link icon.png';
import SENSOR_RANGES from '../constants/sensorRange';
import Helpers from "../../helpers/helpers";
import SplashScreenLoader from "../../loader/components/SpashScreen";
import AirLogo from '../../auth/assets/air-loading-v1.png';
import ScrollTo from "../../commonComponents/ScrollTo";

const API_URL = process.env.REACT_APP_API_URL;

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
  color: #808080
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

const ViewLink = styled(Link)`
  font-size: .7rem;
  letter-spacing: 2px;
  color: #00a2ae;
  font-family: Galano Classic;
  margin-left: 10px;
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
  font-weight: 500;
  font-size: 2.5rem;
  color: #88b862;
  margin-bottom: 20px;
  text-align: center;
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

const options = Object.keys(_chartFilters).map(key => _chartFilters[key]);

class DeviceDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: dailyPm1,
      timeFilter: 'live',
      fillWait: true,
      defaultDevice: null,
      allDevices: [],
      fetchingAllDevices: false,
    }
    this.deviceInterval = null;
    this.chartInterval = null;
  }
  componentDidMount = () => {
    const {timeFilter} = this.state;
    const { match, location, getDevice, getMyDevices, schema, getSchema, setChartFilters, getInitialDashboardChartData } = this.props;
    const id = match.params.city;

    let searchQuery = null;
    if(location.search && location.search !== "") {
      searchQuery = new URLSearchParams(location.search);
    }

    if (!schema)
      getSchema();
    this.getAllDevices();
    this.getDeviceInterval(id);
    // getMyDevices();
    getInitialDashboardChartData({
      by: timeFilter,
      from: Helpers.generateChartFromTimestamp(timeFilter),
      selectAllFilters: true,
    },{ searchParams: searchQuery });

    this.getChartDataInterval({
      by: timeFilter,
      from: Helpers.generateChartFromTimestamp(timeFilter)
    });

    // animate reading circles
    setTimeout(() => this.setState({ fillWait: false }), 500)
  };

  componentWillUnmount(){
    if(this.deviceInterval) clearInterval(this.deviceInterval);
    if(this.chartInterval) clearInterval(this.chartInterval);
  }

  isLoggedIn = () => {
    if (localStorage.getItem("id_token") === null) {
      return false;
    }
    return true;
  };

  showPm1 = () => {
    this.setState({ data: dailyPm1 });
  };

  showPm25 = () => {
    this.setState({ data: dailyPm25 });
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
      const {getInitialDashboardChartData} = this.props;
      getInitialDashboardChartData({
        by: timeFilter,
        from: Helpers.generateChartFromTimestamp(timeFilter)
      });
      this.getChartDataInterval({
        by: timeFilter,
        from: Helpers.generateChartFromTimestamp(timeFilter)
      })

    this.setState({ timeFilter });
  }

  getAllDevices = async () => {
    const config = {
      headers: {
        // Authorization: localStorage.getItem("id_token"),
        AccessToken: localStorage.getItem("access_token")
      }
    };
    this.setState({fetchingAllDevices: true});
    const data = await axiosInstance.get(
      `map?zone_data=${READINGS.pm25}&device_data=${READINGS.pm25}`, config
    );
    const allDevices = data.data.data.devices;
    this.setState({allDevices, fetchingAllDevices: false});
  }

  getDefaultDevice = async (id) => {
    const config = {
      headers: {
        // Authorization: localStorage.getItem("id_token"),
        AccessToken: localStorage.getItem("access_token")
      }
    };

    const data = await axiosInstance.get(
      `device/list?city=${id}`, config
    );
    if(data && data.data){
      const devices = data.data.data;
      const foundIndex = devices.findIndex(el=>el.default_device);
      if(foundIndex > -1){
        this.setState({ defaultDevice: devices[foundIndex] });
      }
    }
  }

  
  getDeviceInterval = (id) => {
    if(id){
      if(this.deviceInterval) clearInterval(this.deviceInterval);
      this.getDefaultDevice(id)
      this.deviceInterval = setInterval(()=>{
        this.getDefaultDevice(id)
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

  calculateReadingPercentage = (sensor, value) => {
    if(SENSOR_RANGES[sensor]){
      const percentage = parseInt(((value-SENSOR_RANGES[sensor].from) / (SENSOR_RANGES[sensor].to-SENSOR_RANGES[sensor].from))*100);
      return percentage < 10 ? 10 : percentage;
    }else {
      return 10;
    }
  }

  renderRestReadings = () => {
    const cityData = this.calculateCityReadings();
    const { fillWait } = this.state;

    if(cityData && !isEmpty(cityData.map_meta)){
      return Object.keys(cityData.map_meta).map((sensor, index) => {
        if(sensor === READINGS.pm25 || sensor === READINGS.pm10 || sensor === READINGS.pm1 || sensor === READINGS.humidity || sensor === READINGS.temperature || sensor === READINGS.temperatureFeel || EXCLUDED_READINGS.some(el=>el===sensor)) return null;
        const data = Helpers.formatSensorData(cityData.map_meta[sensor], sensor);
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

  render() {
    const { applied_filters, setChartFilters, location, history, all_chart_filters } = this.props;
    const { data, timeFilter, fillWait, fetchingAllDevices } = this.state;
    const cityData = this.calculateCityReadings();

    if(isEmpty(cityData) || fetchingAllDevices) return <SplashScreenLoader><img style={{width: 'auto', height: '300px', marginBottom: '10px'}} src={AirLogo} /></SplashScreenLoader>;
    return (
      <>
        <BgWrapper>
          <Container>
            <Header>
              <Info>
                <InfoTextContainer>
                  <InfoTitle>
                    {cityData.indoor ? "Indoor average for:" : "Outdoor average for:"}
                  </InfoTitle>
                  <Name>{cityData.name}</Name>
                  <TimeDate>
                    {cityData.timestamp &&
                      moment(cityData.timestamp * 1000).format("HH:mma MMM DD Y")}
                  </TimeDate>
                </InfoTextContainer>
              </Info>
              <LastReading>
                <Layout direction="column">
                  <InfoTitle>Active outdoor devices</InfoTitle>
                  <TimeAgo>
                    {cityData && cityData.activeCount ? cityData.activeCount : 0}
                  </TimeAgo>
                </Layout>
              </LastReading>
              <Location>
                <InfoTitle>Location</InfoTitle>
                <MapContainer>
                  <img src={MapImage} width="100%" height="100%"/>
                  <ViewLinkContainer onClick={() => history.push('/air/Sarajevo')}>
                    <img src={LinkIcon} width="20px" height="auto"/>
                    <ViewLink to="/air/Sarajevo">VIEW MAP</ViewLink>
                  </ViewLinkContainer>
                </MapContainer>
              </Location>
            </Header>
            <LiveReadings>
              <Subtitle>Live Readings</Subtitle>
              <ProgressGrid>
                {cityData && cityData.map_meta && cityData.map_meta[READINGS.pm1] && (
                  <ReadingContainer>
                    <Reading
                      level={cityData.map_meta[READINGS.pm1].level}
                      measurement={cityData.map_meta[READINGS.pm1].measurement}
                      value={cityData.map_meta[READINGS.pm1].value}
                      unit={cityData.map_meta[READINGS.pm1].unit}
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.pm1, cityData.map_meta[READINGS.pm1].value)}
                    />
                  </ReadingContainer>
                )}
                {cityData && cityData.map_meta && cityData.map_meta[READINGS.pm25] && (
                  <ReadingContainer>
                    <Reading
                      level={cityData.map_meta[READINGS.pm25].level}
                      measurement={cityData.map_meta[READINGS.pm25].measurement}
                      value={cityData.map_meta[READINGS.pm25].value}
                      unit={cityData.map_meta[READINGS.pm25].unit}
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.pm25, cityData.map_meta[READINGS.pm25].value)}
                    />
                  </ReadingContainer>
                )}
                {cityData && cityData.map_meta && cityData.map_meta[READINGS.pm10] && (
                  <ReadingContainer>
                    <Reading
                      level={cityData.map_meta[READINGS.pm10].level}
                      measurement={cityData.map_meta[READINGS.pm10].measurement}
                      value={cityData.map_meta[READINGS.pm10].value}
                      unit={cityData.map_meta[READINGS.pm10].unit}
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.pm10, cityData.map_meta[READINGS.pm10].value)}
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
                   {cityData && cityData.map_meta && cityData.map_meta[READINGS.temperature] && (
                  <ReadingContainer>
                    <ReadingCircle
                      level="temperature"
                      valueNumber={cityData.map_meta[READINGS.temperature].value}
                      headerText={cityData.map_meta[READINGS.temperature].measurement}
                      valueUnit={cityData.map_meta[READINGS.temperature].unit}
                      iconSize={50}
                      rotation='0'
                      trailColor='rgba(3, 210, 226, 0.2)'
                      animateOnLoad
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.temperature, cityData.map_meta[READINGS.temperature].value)}
                      colorIcon
                    />
                  </ReadingContainer>
                )}
                {cityData && cityData.map_meta && cityData.map_meta[READINGS.temperatureFeel] && (
                  <ReadingContainer>
                    <ReadingCircle
                      level="temp-like"
                      valueNumber={cityData.map_meta[READINGS.temperatureFeel].value}
                      headerText={cityData.map_meta[READINGS.temperatureFeel].measurement}
                      valueUnit={cityData.map_meta[READINGS.temperatureFeel].unit}
                      iconSize={50}
                      rotation='0'
                      trailColor='rgba(3, 210, 226, 0.2)'
                      animateOnLoad
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.temperatureFeel, cityData.map_meta[READINGS.temperatureFeel].value)}
                      colorIcon
                    />
                  </ReadingContainer>
                )}
                {cityData && cityData.map_meta && cityData.map_meta[READINGS.humidity] && (
                  <ReadingContainer>
                    <ReadingCircle
                      level="humidity"
                      valueNumber={cityData.map_meta[READINGS.humidity].value}
                      headerText={cityData.map_meta[READINGS.humidity].measurement}
                      valueUnit={cityData.map_meta[READINGS.humidity].unit}
                      iconSize={50}
                      rotation='0'
                      trailColor='rgba(3, 210, 226, 0.2)'
                      animateOnLoad
                      percentage={fillWait ? 0 : this.calculateReadingPercentage(READINGS.humidity, cityData.map_meta[READINGS.humidity].value)}
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
        <ScrollTo identifier="chart-city" delay={500}>
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
    all_chart_filters: state.dashboard.all_chart_filters,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getMyDevices, setChartFilters, getSchema, getDashboardChartData, getInitialDashboardChartData }
  )(DeviceDashboard)
);
