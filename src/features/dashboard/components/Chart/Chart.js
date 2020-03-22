import React from "react";
import PropTypes from "prop-types";
import Gradient from "./Gradient"
import { connect } from "react-redux";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { curveCardinal } from 'd3-shape';

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  AreaSeries,
  LineSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  EdgeIndicator,
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  CurrentCoordinate
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { HoverTooltip, OHLCTooltip, MovingAverageTooltip, MACDTooltip } from "react-stockcharts/lib/tooltip";
// import { ema } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { _leftChartSensors } from '../../constants/filterOptions'
import { READINGS } from "../../../constants/constants";
import Helpers from "../../../helpers/helpers";

const dateFormat = timeFormat("%B %d %Y");
const numberFormat = format(".0f");
const volumeFormat = format(".0s");

const PM1 = READINGS.pm1, PM10 = READINGS.pm10, PM2_5 = READINGS.pm25, TEMP = READINGS.temperature, HUMIDITY = READINGS.humidity;
const LEFT_CHART_SENSORS = _leftChartSensors;

const SENSOR_COLORS = Helpers.getChartSensorColors();

function tooltipContent(ys, schema, filters) {
  return ({ currentItem, xAccessor }) => {
    let yData = [];
    filters.forEach(filter => {
      if(!currentItem[filter.value]) return;

      let data = Helpers.formatSensorData({value: currentItem[filter.value], ...schema[filter.value]}, filter.value);
      if(LEFT_CHART_SENSORS.some(key=>key===filter.value)){
        data.value = numberFormat(data.value);
      }else {
        data.value = numberFormat(data.value);
      }
      if(data && data.value){
        yData.push({
          label: filter.label,
          value: data && data.value + ` ${data.unit}` || '',
          stroke: SENSOR_COLORS[filter.value],
        }); 
      }
    });

    return {
      x: dateFormat(xAccessor(currentItem)),
      y: yData.concat(
          ys.map(each => ({
            label: each.label,
            value: each.value(currentItem),
            stroke: each.stroke
          }))
        )
        .filter(line => line.value)
    };
  };
}


class CandleStickChartWithHoverTooltip extends React.Component {
  // removeRandomValues(data) {
  //   return data.map(item => {
  //     const newItem = { ...item };
  //     const numberOfDeletion = Math.floor(Math.random() * keyValues.length) + 1;
  //     for (let i = 0; i < numberOfDeletion; i += 1) {
  //       const randomKey =
  //         keyValues[Math.floor(Math.random() * keyValues.length)];
  //       newItem[randomKey] = undefined;
  //     }
  //     return newItem;
  //   });
  // }

  generateYExtentsArray = () => {
    const {data: { max: maxValues }, filters, all_chart_filters} = this.props;
    let array = [];
    all_chart_filters.forEach(allFilter=>{
      if(LEFT_CHART_SENSORS.some(el => el === allFilter.value)) return;
      if(filters.findIndex(filter => filter.value === allFilter.value) !== -1 && maxValues[allFilter.value]){
        array.push(this.formatSensorValue(maxValues[allFilter.value], allFilter.value));
      }
    })
    // if(filters.findIndex(filter => filter.value === all_chart_filters[READINGS.pm25].value) !== -1){
    //   array.push(maxValues[PM2_5] || 500);
    // }
    // if(filters.findIndex(filter => filter.value === all_chart_filters[READINGS.pm1].value) !== -1){
    //   array.push(maxValues[PM1] || 500);
    // }
    // if(filters.findIndex(filter => filter.value === all_chart_filters[READINGS.pm10].value) !== -1){
    //   array.push(maxValues[PM10] || 500);
    // }
    return array;
  }

  generateYExtentsArrayLeft = () => {
    const {data: { max: maxValues, min: minValues }, filters, all_chart_filters} = this.props;
    let array = [];
    all_chart_filters.forEach(allFilter =>{
      if(!LEFT_CHART_SENSORS.some(el => el === allFilter.value)) return;
      if(filters.findIndex(filter => filter.value === allFilter.value) !== -1){
        if(maxValues && maxValues[allFilter.value]){
          array.push(this.formatSensorValue(maxValues[allFilter.value], allFilter.value));
        }
        if(minValues && minValues[allFilter.value]){
          array.push(this.formatSensorValue(minValues[allFilter.value], allFilter.value));
        }
      }
    })

    return array;
  }

  formatSensorValue = (value, sensor) => {
    let data = Helpers.formatSensorData( { value }, sensor);
    return data.value;
  }

  renderRightSide = () => {
    const {filters} = this.props;

    return filters.map(filter => {
      if(!LEFT_CHART_SENSORS.some(key => filter.value === key) && filter.value !== READINGS.pm25){
        return (
          <>
            <LineSeries interpolation={curveCardinal} yAccessor={d => this.formatSensorValue(d[filter.value], filter.value)} stroke={SENSOR_COLORS[filter.value]} />
            <CurrentCoordinate yAccessor={d => this.formatSensorValue(d[filter.value], filter.value)} fill={SENSOR_COLORS[filter.value]} />
            <EdgeIndicator
              itemType="last"
              orient="right"
              edgeAt="right"
              fontFamily="Sofia Pro"
              yAccessor={d => this.formatSensorValue(d[filter.value], filter.value)}
              fill={SENSOR_COLORS[filter.value]}
              displayFormat={format(".0f")}
            />
          </>
        );
      } else{
        return null;
      }
    });
  }

  renderLeftSide = () => {
    const {filters} = this.props;

    return filters.map(filter => {
      if(LEFT_CHART_SENSORS.some(key => filter.value === key)){
        return (
          <>
            <LineSeries interpolation={curveCardinal} yAccessor={d => this.formatSensorValue(d[filter.value], filter.value)} stroke={SENSOR_COLORS[filter.value]} />
            <CurrentCoordinate yAccessor={d => this.formatSensorValue(d[filter.value], filter.value)} fill={SENSOR_COLORS[filter.value]} />
            <EdgeIndicator
              itemType="first"
              orient="left"
              edgeAt="left"
              fontFamily="Sofia Pro"
              yAccessor={d => this.formatSensorValue(d[filter.value], filter.value)}
              fill={SENSOR_COLORS[filter.value]}
              displayFormat={format(".0f")}
            />
          </>
        );
      } else{
        return null;
      }
    });
  }

  render() {
    let { type, data: { chart: initialData, max: maxValues }, width, ratio, schema, filters } = this.props;
    // remove some of the data to be able to see
    // the tooltip resize
    // initialData = this.removeRandomValues(initialData);
    // const ema20 = ema()
    //   .id(0)
    //   .options({ windowSize: 20 })
    //   .merge((d, c) => {
    //     d.ema20 = c;
    //   })
    //   .accessor(d => d.ema20);

    // const ema50 = ema()
    //   .id(2)
    //   .options({ windowSize: 50 })
    //   .merge((d, c) => {
    //     d.ema50 = c;
    //   })
    //   .accessor(d => d.ema50);

    const margin = { left: width > 500 ? 80 : 60, right: width > 500 ? 80 : 60, top: 30, bottom: 50 };

    //gridlines
    const gridWidth = width - margin.left - margin.right;
    const showGrid = true;
    const yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 }
      : {};

    // const calculatedData = ema50(ema20(initialData));
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => new Date(d.date*1000)
    );

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
    );
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];
    return (
      <ChartCanvas
        height={400}
        width={width}
        ratio={ratio}
        margin={margin}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        clamp={true}
      >
        <Gradient schema={schema} maxValue={maxValues[PM2_5] || 500} startColor='blue' endColor="green" rotation={90} idCSS="area-gradient"></Gradient>


        <Chart
          id={1}
          yExtents={[
            d => [0, ...this.generateYExtentsArray()],
            // ema20.accessor(),
            // ema50.accessor()
          ]}
          padding={{ top: 10, bottom: 20 }}
        >

          <XAxis axisAt="bottom" orient="bottom" tickStroke="#a3b7bc" ticks={width / 200} />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            tickStroke="#54757f"
            fontFamily="Sofia Pro"
            tickStrokeOpacity={0}
            {...yGrid}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            fill="#c2f4f4"
            rectWidth={190}
            fontSize={13}
            fontFamily="Sofia Pro"
            stroke="#276477"
            strokeWidth={2}
            opacity={0.95}
            textFill="#276477"
            displayFormat={timeFormat("%I:%M %p %B %d %Y")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            fill="#c2f4f4"
            fontSize={13}
            fontFamily="Sofia Pro"
            stroke="#b7e7e7"
            opacity={0.95}
            textFill="#276477"
            displayFormat={format("d")}
          />

          {filters.findIndex(filter =>  filter.value === READINGS.pm25) !== -1 ? <AreaSeries
            yAccessor={d => d[PM2_5]}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            interpolation={curveCardinal}
          // opacity={0.15}
          /> : null}
         
          {this.renderRightSide()}

          {/* <LineSeries interpolation={curveCardinal} yAccessor={ema20.accessor()} stroke={ema20.stroke()} />
          <LineSeries interpolation={curveCardinal} yAccessor={ema50.accessor()} stroke={ema50.stroke()} />

          <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
          <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} /> */}




          {/* <EdgeIndicator itemType="last" orient="right" edgeAt="right"
            yAccessor={d => d[PM10]} fill={d => d[PM10] > d[PM1] ? "#6BA583" : "#FF0000"} /> */}
          {/* <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={[
              {
                yAccessor: ema20.accessor(),
                type: ema20.type(),
                stroke: ema20.stroke(),
                windowSize: ema20.options().windowSize,
              },
              {
                yAccessor: ema50.accessor(),
                type: ema50.type(),
                stroke: ema50.stroke(),
                windowSize: ema50.options().windowSize,
              },
            ]} */}
          {/* /> */}


        </Chart>
        <Chart
          id={3}
          yExtents={[d => this.generateYExtentsArrayLeft()]}
          padding={{ top: 10, bottom: 20 }}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format(".2s")}
            tickStroke="#54757f"
            fontFamily="Sofia Pro"
            tickStrokeOpacity={0}
          />
          
          {this.renderLeftSide()}

          <HoverTooltip
            // yAccessor={ema50.accessor()}
            tooltipContent={tooltipContent([], schema, filters)}
            fontSize={14}
            fontFamily={"Sofia Pro"}
            // bgOpacity={0.9}
            bgFill={"transparent"}
            fill="rgba(255, 255, 255)"
            stroke="rgba(0, 0, 0,0.2)"
          // fontFill={"black"}
          />
        </Chart>
        <CrossHairCursor
          stroke="#368090"
          opacity={0.5}
          strokeDasharray="ShortDot"
        />

        {/* <Chart
          id={2}
          yExtents={[d => d[PM2_5]]}
          height={150}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format(".2s")}
            tickStroke="#54757f"
            fontFamily="Sofia Pro"
            tickStrokeOpacity={0}
          />

          <AreaSeries
            yAccessor={d => d[PM2_5]}
            stroke="#ffcc00"
            fill="#ffcc00"
            opacity="0.15"
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            fill="#c2f4f4"
            fontSize="13"
            fontFamily="Sofia Pro"
            stroke="#b7e7e7"
            opacity="0.95"
            textFill="#276477"
            displayFormat={format(".4s")}
          />
        </Chart> */}

      </ChartCanvas>
    );
  }
}

CandleStickChartWithHoverTooltip.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChartWithHoverTooltip.defaultProps = {
  type: "svg"
};
CandleStickChartWithHoverTooltip = fitWidth(CandleStickChartWithHoverTooltip);

const mapStateToProps = state => {
  return {
    schema: state.dashboard.schema,
  };
};


export default connect(mapStateToProps, null)(CandleStickChartWithHoverTooltip);
