import React from "react";
import styled from "styled-components";
import eq from 'lodash/eq';
import ReactMapGL, { Marker } from "react-map-gl";
import Geocode from "react-geocode";
 
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import MarkerIcon from "../assets/marker.png";
import sarajevo_coordinates from "../../map/data/sarajevo_coordinates";

import "../styles/custom-geocoder.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

Geocode.setApiKey(GOOGLE_MAPS_KEY);

const Wrapper = styled.div`
  display: grid;
  height: 50vh;
  position: relative;
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  z-index: 1;
  margin-left: 10px;
  margin-top: 10px;
  width: 33%;
`;

const SearchBarInput = styled.input`
  padding: 6px 15px;
  font-size: 15px;
  width: 100%;
  height: 36px;
  border: 0;
  margin: 0;
  color: rgba(0,0,0,.75);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  box-shadow: 0 0 10px 2px rgba(0,0,0,.1);
  background-color: hsla(0,0%,100%,.8)!important;
  outline: none;
`;

const SearchBarSuggestionsWrapper = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const SuggestionContainer = styled.div`
  padding: 4px 8px;
  background-color: #ffffff;
  cursor: pointer;
  ${props=>props.active?`
    background-color: #fafafa;
  `:''}
`;

const SuggestionMainText = styled.p`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 1px;
`;

const SuggestionSecondaryText = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.8rem;
  color: #808080;
`;

const StyledPin = styled.img`
  transform: translateY(-50%);
`;

class DeviceNewMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start: performance.now(),
      viewport: {
        latitude: sarajevo_coordinates.lat,
        longitude: sarajevo_coordinates.lng,
        zoom: 11
      },
      address: ''
    };

    this.mapRef = React.createRef();
  }

  handleChange = address => {
    this.setState({ address });
  };

  componentDidUpdate(prevProps){
    const {viewport} = this.state;
    const {marker} = this.props;
    
    if(marker && !eq(marker, prevProps.marker)){
      this.handleOnViewportChange({ ...viewport, ...marker, transitionDuration: 1000 })
    }
  }
 
  /*
    calculate the intersection of two arrays - return result as a `Set` object
    and use the `size` method of the `Set` to determine if we made a match when
    testing the arrays..
  */
  intersect = (a,b) => {
    return new Set( a.filter( v => ~b.indexOf( v ) ) );
  };

  gettowncity = ( addcomp ) => {
    if( typeof( addcomp )=='object' && addcomp instanceof Array ){

        let order=[ 'sublocality_level_1', 'neighborhood', 'locality', 'postal_town' ];

        for( let i=0; i < addcomp.length; i++ ){
            let obj=addcomp[ i ];
            let types=obj.types;
            if( this.intersect( order, types ).size > 0 )return obj;
        }
    }
    return false;
  };

  handleSelect = address => {
    const {setFieldValue} = this.props;

    geocodeByAddress(address)
      .then(results => {
        const city = this.gettowncity(results[0].address_components);
        if(city.long_name || city.short_name){
          setFieldValue("city", city.long_name || city.short_name);
        }
        return getLatLng(results[0]);
      })
      .then(this.onResult)
      .catch(error => console.error('Error', error));
  };

  handleOnLoad = () => {
    const { start } = this.state;
    const end = performance.now();

    console.log("Map load time: ", (end - start) / 1000);
  };

  handleOnViewportChange = viewport => this.setState({ viewport });

  setCityFromLatLng = ( lat, lng ) => {
    const {setFieldValue} = this.props;

    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].address_components;
        const city = this.gettowncity(address)
        if(city.long_name || city.short_name){
          setFieldValue("city", city.long_name || city.short_name);
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  onMarkerDragEnd = event => {
    const { setFieldValue } = this.props;

    setFieldValue("coordinates", {
      lng: event.lngLat[0],
      lat: event.lngLat[1]
    });
    this.setCityFromLatLng(event.lngLat[1], event.lngLat[0] );
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  onResult = ({lat, lng}) => {
    const {setFieldValue} = this.props;

    setFieldValue("coordinates", {
      lng,
      lat
    });
  }

  render() {
    const { viewport } = this.state;
    const { marker } = this.props;
     
    return (
      <Wrapper>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          onError={this.handleError}
          debounce={500}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <SearchBarWrapper>
              <SearchBarInput
                {...getInputProps({
                  placeholder: 'Search location ...',
                })}
              />
              <SearchBarSuggestionsWrapper>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <SuggestionContainer
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      active={suggestion.active}
                      title={suggestion.description}
                    >
                      <SuggestionMainText>
                        {suggestion.formattedSuggestion.mainText}
                      </SuggestionMainText>{' '}
                      <SuggestionSecondaryText>
                        {suggestion.formattedSuggestion.secondaryText}
                      </SuggestionSecondaryText>
                    </SuggestionContainer>
                  );
                })}
              </SearchBarSuggestionsWrapper>
            </SearchBarWrapper>
          )}
        </PlacesAutocomplete>
        <ReactMapGL
          {...viewport}
          ref={this.mapRef}
          width="100%"
          height="100%"
          onViewportChange={this.handleOnViewportChange}
          onLoad={this.handleOnLoad}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {marker.longitude !== 0 && marker.latitude !== 0 && (
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetTop={-20}
              offsetLeft={-10}
              draggable
              onDragEnd={this.onMarkerDragEnd}
            >
              <StyledPin src={MarkerIcon} draggable="false" width="20px" height="auto"/>
            </Marker>
          )}
        </ReactMapGL>
      </Wrapper>
    );
  }
}

export default DeviceNewMap;
