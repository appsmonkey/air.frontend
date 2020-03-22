import React, { Component } from 'react';

class GradientSVG extends Component {
  render() {
    let { startColor, endColor, idCSS, rotation, startOffset, endOffset } = this.props;

    let gradientTransform = `rotate(${rotation})`;

    return (
      <svg height={0}>
        <defs>
          <linearGradient id={idCSS} gradientTransform={gradientTransform} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset={startOffset || '0%'} stopColor={endColor} />
            <stop offset={endOffset || '100%'} stopColor={startColor} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}

export default GradientSVG;