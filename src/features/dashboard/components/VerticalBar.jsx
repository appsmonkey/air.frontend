import React from "react";
import {
  HorizontalGridLines,
  FlexibleXYPlot,
  VerticalBarSeries,
  YAxis,
  XAxis
} from "react-vis";
import "react-vis/dist/style.css";

import color_scale from "../../map/data/color_scale";

const PALETTE = [
  "#88B862",
  "#F4EA6B",
  "#DF9247",
  "#C34537",
  "#96497F",
  "#804543",
  "#202020"
];

const VerticalBar = props => {
  function getAqiColor(lvl) {
    const level = (lvl || "").toLowerCase();

    switch (level) {
      case color_scale.great.level:
        return 0;
      case color_scale.ok.level:
        return 1;
      case color_scale.sensitive_beware.level:
        return 2;
      case color_scale.unhealthy.level:
        return 3;
      case color_scale.very_unhealthy.level:
        return 4;
      case color_scale.hazardous.level:
        return 5;
      default:
        return 6;
    }
  }

  return (
    <FlexibleXYPlot
      xType="time"
      colorType="category"
      colorDomain={[0, 1, 2]}
      colorRange={PALETTE}
    >
      <HorizontalGridLines />
      <YAxis />
      <XAxis />
      <VerticalBarSeries animation data={props.data} style={{}} />
    </FlexibleXYPlot>
  );
};

export default VerticalBar;
