import React from "react";
import styled from "styled-components";
import ReactMapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

import belgrade_coordinates from "../data/belgrade_coordinates";
import data from "../data/belgrade_geojson.json";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const LIGHT_THEME = "mapbox://styles/mapbox/streets-v9";
const DARK_THEME = "mapbox://styles/mapbox/dark-v9";

const Header = styled.header`
  margin: 64px 64px 0 64px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: #fff;
  border: 0;
  cursor: pointer;
  height: 36px;
  width: 128px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0;
  :disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 64px;
`;

class Map extends React.Component {
  state = {
    start: performance.now(),
    viewport: {
      latitude: belgrade_coordinates.lat,
      longitude: belgrade_coordinates.lng,
      zoom: 10
    },
    layers: [],
    theme: DARK_THEME
  };

  handleOnLoad = () => {
    const { start } = this.state;
    const end = performance.now();

    console.log("Map load time: ", (end - start) / 1000);
    this.addGeojsonLayer();
  };

  handleOnViewportChange = viewport => this.setState({ viewport });

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  addGeojsonLayer = zones => {
    const layer = new GeoJsonLayer({
      data,
      opacity: 0.2,
      stroked: true,
      filled: true,
      getFillColor: () => [
        this.getRandomInt(0, 255),
        this.getRandomInt(0, 255),
        this.getRandomInt(0, 255)
      ],
      getLineColor: [255, 255, 255]
    });

    this.setState({ layers: [layer] });
  };

  toggleTheme = () => {
    const { theme } = this.state;

    if (theme === LIGHT_THEME) {
      this.setState({ theme: DARK_THEME });
    } else {
      this.setState({ theme: LIGHT_THEME });
    }
  };

  render() {
    const { viewport, layers, theme } = this.state;

    return (
      <>
        <Header>
          <Button onClick={this.toggleTheme}>
            {theme === LIGHT_THEME ? "Dark theme" : "Light theme"}
          </Button>
        </Header>
        <Wrapper>
          <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={this.handleOnViewportChange}
            onLoad={this.handleOnLoad}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle={theme}
          >
            <DeckGL
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              zoom={viewport.zoom}
              layers={layers}
            />
          </ReactMapGL>
        </Wrapper>
      </>
    );
  }
}

export default Map;
