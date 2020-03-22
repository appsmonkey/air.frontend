import React, { Component } from 'react';
import { getLvlBasedOnValue } from '../../../helpers/aqiCalculation';
import { READINGS } from '../../../constants/constants';

const PM2_5 = READINGS.pm25;
class GradientSVG extends Component {
  generateStops = (lvl) => {
    switch (lvl) {
      case 'great':
        return <>
          <stop offset="0%" stopColor={'#FBF388'} />
          <stop offset="100%" stopColor={'#BDE295'} />
        </>
      case 'ok':
        return <>
          <stop offset="0%" stopColor={'#FBF388'} />
          <stop offset="100%" stopColor={'#BDE295'} />
        </>
      case 'sensitive beware':
        return <>
          <stop offset="0%" stopColor={'#F8C97C'} />
          <stop offset="50%" stopColor={'#FBF388'} />
          <stop offset="100%" stopColor={'#BDE295'} />
        </>
      case 'unhealthy':
        return <>
          <stop offset="0%" stopColor={'#FAA68E'} />
          <stop offset="33%" stopColor={'#F8C97C'} />
          <stop offset="66%" stopColor={'#FBF388'} />
          <stop offset="100%" stopColor={'#BDE295'} />
        </>
      case 'very unhealthy':
        return <>
          <stop offset="0%" stopColor={'#E87AC3'} />
          <stop offset="25%" stopColor={'#FAA68E'} />
          <stop offset="50%" stopColor={'#F8C97C'} />
          <stop offset="75%" stopColor={'#FBF388'} />
          <stop offset="100%" stopColor={'#BDE295'} />
        </>
      case 'hazardous':
        return <>
          <stop offset="0%" stopColor={'#DA7483'} />
          <stop offset="20%" stopColor={'#E87AC3'} />
          <stop offset="40%" stopColor={'#FAA68E'} />
          <stop offset="60%" stopColor={'#F8C97C'} />
          <stop offset="80%" stopColor={'#FBF388'} />
          <stop offset="100%" stopColor={'#BDE295'} />
        </>
      default:
        return <>
          <stop offset="0%" stopColor={'#DA7483'} />
          <stop offset="20%" stopColor={'#E87AC3'} />
          <stop offset="40%" stopColor={'#FAA68E'} />
          <stop offset="60%" stopColor={'#F8C97C'} />
          <stop offset="80%" stopColor={'#FBF388'} />
          <stop offset="100%" stopColor={'#BDE295'} />
        </>
    }
  }

  renderStops = () => {
    const { startColor, endColor, schema, maxValue } = this.props;
    let stops = <stop offset="100%" stopColor={'#DA7483'} />; // default green
    if (schema && schema[PM2_5]) {
      const lvl = getLvlBasedOnValue(schema[PM2_5], maxValue);
      stops = this.generateStops(lvl);
    }
    return stops;
  }

  render() {
    const { idCSS, rotation } = this.props;
    // console.log(schema && schema[PM2_5] ? schema[PM2_5].steps : 'no steps for pm 2.5');
    const gradientTransform = `rotate(${rotation})`;


    return (
      <svg
        width="300px"
        height="300px"
        x="0px"
        y="0px"
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={idCSS} gradientTransform={gradientTransform} gradientUnits="userSpaceOnUse">
            {this.renderStops()}
          </linearGradient>
        </defs>
      </svg>
    );
  }
}

export default GradientSVG;