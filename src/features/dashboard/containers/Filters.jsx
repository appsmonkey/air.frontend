import React from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import MultiSelect from "../../commonComponents/MultiSelect"
import { Layout } from "../../../core/styles/layout";
import { connect } from "react-redux";
import { _deviceFilters } from "../constants/filterOptions";

import {
  filterDevices,
  searchDevices,
  resetDevices,
  setDeviceFilters
} from "../actions/dashboardActionCreators";
import SearchIcon from "../assets/search-icon-2.png";

const options = [...Object.keys(_deviceFilters).map(key => _deviceFilters[key]), { clearFilter: true }]; // clearFilter adds custom btn on the end of select dropdown

const SearchContainer = styled(Layout)`
  min-height: 40px;
  min-width: 300px;
  border-radius: 4px;
  border: solid 1px #9595954d;
  background-color: hsl(0, 0%, 100%);
  padding: 2px 8px;
  &:focus,
  &:hover{
    border: 1px solid #95959580;
  }
`;
const InputSearch = styled.input`
  outline: 0;
  font-size: .85rem;
  font-weight: 500;
  color: #8a8a8a;
  flex-grow: 1;
  border: none;
  &:focus::-webkit-input-placeholder {
      opacity: 0;
  }
`;

class Filters extends React.Component {
  state = {
    searchValue: ""
  };

  componentWillReceiveProps(nextProps) {
    const { applied_filters, filterDevices } = this.props;
    const { searchValue } = this.state;
  
    if (nextProps.applied_filters !== applied_filters) {
      filterDevices({filters: nextProps.applied_filters, searchText: searchValue});
    }
  }

  handleChange = option => {
    const { setDeviceFilters, applied_filters } = this.props;

    const filterIndex = applied_filters.findIndex(el => el.label === option.label);
    const newOptions = [...applied_filters];
    if (filterIndex === -1) {
      newOptions.push(option);
    }
    else {
      newOptions.splice(filterIndex, 1);
    }

    setDeviceFilters(newOptions);
  };

  handleSearch = e => {
    const { resetDevices, applied_filters, filterDevices } = this.props;
    const value = e.target.value;

    this.setState({ searchValue: value });

    // if (value === "") {
    //   resetDevices();
    // } else {
      filterDevices({filters: applied_filters, searchText: value});
    // }
  };

  render() {
    const { searchValue } = this.state;
    const { applied_filters, setDeviceFilters, isAdmin, isDashboard } = this.props;
    const filterOptions = isAdmin && !isDashboard ? [...options] : options.filter(el=>el !== _deviceFilters.mine);

    return (
      <Layout justify="space-between" marginBottom={20}>
        <MultiSelect
          value={[{ label: "Filter by", value: null }, ...applied_filters]}
          onChange={this.handleChange}
          setFilters={setDeviceFilters}
          appliedFilters={applied_filters}
          options={filterOptions}
          placeholder="Filter by"
        />
        <SearchContainer align='center'>
          <InputSearch
            value={searchValue}
            type="text"
            placeholder="Search devices by name"
            onChange={e => this.handleSearch(e)}
          />
          <img src={SearchIcon} width={25} height={25} alt="search devices" />
        </SearchContainer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    get_my_devices_success: state.dashboard.get_my_devices_success,
    my_devices: state.dashboard.my_devices,
    fetching_my_devices: state.dashboard.fetching_my_devices,
    applied_filters: state.dashboard.applied_device_filters
  };
};

export default connect(
  mapStateToProps,
  { filterDevices, searchDevices, resetDevices, setDeviceFilters }
)(Filters);
