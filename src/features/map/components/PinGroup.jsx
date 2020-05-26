import React, { Component } from 'react';
import get from 'lodash/get';
import styled from "styled-components";
import { getLvlBasedOnValue } from "../../helpers/aqiCalculation";
import { READINGS } from '../../constants/constants';
import { ClusterIcon } from '../../dashboard/styles/dashboardStyles';
import color_scale from '../data/color_scale';

const CountBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: white;
  font-size: 0.8rem;
`;

class PinGroups extends Component {
  constructor(props) {
    super(props)
  }

  getAqiColorHex = level => {
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
  };

  calculateAverageValue = () => {
    const { cluster, superCluster } = this.props;
    let points = superCluster.getLeaves(cluster.id, Infinity, 0);
    console.log(points);
    points = points.filter(point => get(point, 'properties.props.value') !== null)

    if(points && points.length > 0){
      let sum = 0;
      points.forEach(point=>{
        const value = get(point, 'properties.props.value')
        sum += value || 0;
      })
      return sum / points.length;
    }else {
      return null;
    }

  }

  handleClick = () => {
    const { cluster, superCluster, setViewPort } = this.props;
    const [longitude, latitude] = cluster.geometry.coordinates;

    if(!cluster) return;

    const expansionZoom = Math.min(
      superCluster.getClusterExpansionZoom(cluster.id),
      20
    );
    setViewPort({coords: { latitude, longitude }}, expansionZoom);
  }

  render() {
    const { cluster, schema } = this.props;
    const level = getLvlBasedOnValue( schema[READINGS.pm25], this.calculateAverageValue());
    const fillColor = this.getAqiColorHex(level ? level.toLowerCase() : null);
    const boxy = <ClusterIcon width={60} height={60} id='targetBox' stroke={"#fff"} fill={fillColor} />

    return(
      <div onClick={this.handleClick} style={{position: 'relative'}}>
        <CountBox>
          {cluster.properties.point_count}
        </CountBox>
        {boxy}
      </div>
    )
  }
}

export default PinGroups;