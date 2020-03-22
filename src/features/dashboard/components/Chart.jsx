import React from "react";
import { HorizontalGridLines, AreaSeries, FlexibleXYPlot } from "react-vis";
import "react-vis/dist/style.css";

const Chart = props => {
  return (
    <FlexibleXYPlot margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      <HorizontalGridLines />
      <AreaSeries
        data={[
          {
            x: 0,
            y: 10
          },
          {
            x: 1,
            y: 9.225574841458718
          },
          {
            x: 2,
            y: 8.92062621215922
          },
          {
            x: 3,
            y: 8.424739325266218
          },
          {
            x: 4,
            y: 8.127846937737278
          },
          {
            x: 5,
            y: 7.583182719159934
          },
          {
            x: 6,
            y: 8.069092155164077
          },
          {
            x: 7,
            y: 8.074649470324715
          },
          {
            x: 8,
            y: 7.597628494649461
          },
          {
            x: 9,
            y: 8.000627271228977
          },
          {
            x: 10,
            y: 8.078689190230648
          },
          {
            x: 11,
            y: 7.595692212453601
          },
          {
            x: 12,
            y: 7.733776140310388
          },
          {
            x: 13,
            y: 8.041545985937802
          },
          {
            x: 14,
            y: 8.105213905150332
          },
          {
            x: 15,
            y: 8.608780674954769
          },
          {
            x: 16,
            y: 8.122377840313563
          },
          {
            x: 17,
            y: 8.843362581568837
          },
          {
            x: 18,
            y: 8.526457763191067
          },
          {
            x: 19,
            y: 8.691476273729945
          },
          {
            x: 20,
            y: 8.658431388656442
          }
        ]}
        opacity={0.25}
        style={{}}
      />
      <AreaSeries
        data={[
          {
            x: 0,
            y: 10
          },
          {
            x: 1,
            y: 9.816017959167288
          },
          {
            x: 2,
            y: 10.42984747052945
          },
          {
            x: 3,
            y: 10.037735638619727
          },
          {
            x: 4,
            y: 10.333676899282578
          },
          {
            x: 5,
            y: 11.077153805868374
          },
          {
            x: 6,
            y: 10.955161219225952
          },
          {
            x: 7,
            y: 10.691555675159274
          },
          {
            x: 8,
            y: 11.493843788046444
          },
          {
            x: 9,
            y: 11.635736231047899
          },
          {
            x: 10,
            y: 11.041409103739785
          },
          {
            x: 11,
            y: 10.303661643321007
          },
          {
            x: 12,
            y: 10.813528054233402
          },
          {
            x: 13,
            y: 10.994899171830456
          },
          {
            x: 14,
            y: 10.484752865922351
          },
          {
            x: 15,
            y: 9.908985214155885
          },
          {
            x: 16,
            y: 10.566851081185533
          },
          {
            x: 17,
            y: 11.187913052849469
          },
          {
            x: 18,
            y: 11.331594432305122
          },
          {
            x: 19,
            y: 11.788067669478593
          },
          {
            x: 20,
            y: 11.767290722004777
          }
        ]}
        opacity={0.25}
        style={{}}
      />
      <AreaSeries
        data={[
          {
            x: 0,
            y: 10
          },
          {
            x: 1,
            y: 9.563601459058528
          },
          {
            x: 2,
            y: 9.175408784696062
          },
          {
            x: 3,
            y: 8.749375399835522
          },
          {
            x: 4,
            y: 9.227004267795959
          },
          {
            x: 5,
            y: 9.644822932093884
          },
          {
            x: 6,
            y: 9.652645690585626
          },
          {
            x: 7,
            y: 9.480575628059555
          },
          {
            x: 8,
            y: 9.728146581720859
          },
          {
            x: 9,
            y: 9.907870426923859
          },
          {
            x: 10,
            y: 9.19437415929821
          },
          {
            x: 11,
            y: 8.817026697646002
          },
          {
            x: 12,
            y: 9.275064987618038
          },
          {
            x: 13,
            y: 9.276527944514777
          },
          {
            x: 14,
            y: 9.752082325908484
          },
          {
            x: 15,
            y: 9.090186404305086
          },
          {
            x: 16,
            y: 9.909456864985238
          },
          {
            x: 17,
            y: 9.727356151881342
          },
          {
            x: 18,
            y: 9.612278601355069
          },
          {
            x: 19,
            y: 9.586143968415515
          },
          {
            x: 20,
            y: 9.374684950409057
          }
        ]}
        opacity={0.25}
        style={{}}
      />
    </FlexibleXYPlot>
  );
};

export default Chart;
