import React from 'react';
import { mobile_sarajevo_coordinates, desktop_sarajevo_coordinates} from "../data/sarajevo_coordinates";

const MyLocationHOC = (WrappedComponent, selectData) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        locationGranted: false,
        isMobile: false,
        position: null
      }
    }
    
    componentDidMount() {
      window.addEventListener("resize", this.updateWindowDimensions);
      this.getMyGeoLocation();
    }
    
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions)
    }
  
    updateWindowDimensions = () => {
      const { isMobile } = this.state;

      if(window.innerWidth < 500 && !isMobile){
        this.setState({isMobile: true}, () => this.getMyGeoLocation());
      }else if(window.innerWidth >= 500 && isMobile){
        this.setState({isMobile: false}, () => this.getMyGeoLocation());
      }
    }

    getMyGeoLocation = () => {
      const { isMobile } = this.state;

      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser")
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({ position: position, locationGranted: true });
        }, () => {
          const coords = isMobile ? {latitude: mobile_sarajevo_coordinates.lat, longitude: mobile_sarajevo_coordinates.lng} : {latitude: desktop_sarajevo_coordinates.lat, longitude: desktop_sarajevo_coordinates.lng};
          this.setState({ position: { coords }, locationGranted: true })
          console.log("Unable to find your location");
        })
      }
    }

    render() {
      const { locationGranted, position, isMobile } = this.state;
      return (
        <WrappedComponent locationGranted={locationGranted} myPosition={position} isMobile={isMobile} {...this.props} />
      );
    }
  }
}

export default MyLocationHOC;