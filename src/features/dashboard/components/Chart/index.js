
import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Chart from './Chart';
import deepClone from 'lodash/cloneDeep';
import { getData } from "./utils";
import Loader from '../../../loader/components/Loader';

const ChartPlaceholder = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items:center;
`;

const ErrorText = styled.span`
  color: #ab3838;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 2px black;
`;

class ChartComponent extends React.Component {
  render() {
    const { fetching, chart_data, chart_filters, all_chart_filters } = this.props;

    if ((!fetching && (chart_data.chart.length === 0 || chart_data.chart.length === 1)) || chart_filters.length === 0) {
      return <ChartPlaceholder><ErrorText>There is no data for the applied filters!</ErrorText></ChartPlaceholder>
    }
    else if (fetching || chart_data.chart.length === 0) {
      return <ChartPlaceholder><Loader /></ChartPlaceholder>
    }
    return (
      <Chart type="svg" data={chart_data} filters={chart_filters} all_chart_filters={all_chart_filters || []} />
    )
  }
}
const mapStateToProps = state => {
  return {
    fetching: state.dashboard.fetching_dashboard_chart_data,
    chart_data: state.dashboard.dashboard_chart_data,
    chart_filters: state.dashboard.applied_chart_filters,
    all_chart_filters: state.dashboard.all_chart_filters
  };
};

export default connect(
  mapStateToProps,
  null
)(ChartComponent);