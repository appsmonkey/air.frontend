import React from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import { Layout } from "../../core/styles/layout";
import PropTypes from 'prop-types';

const ClearFiltersContainer = styled.div`
  text-align: center;
  margin: 20px 0 10px 0;
  color: rgba(0,162,174,0.9);
  a{
    cursor: pointer;
  }
`;

const OptionAction = styled(Layout)`
  position: absolute;
  right: 20px;
  color: #808080;
  bottom: 0;
  width: 20px;
  height: 100%;
  z-index: -1;
  ${props => props.clearFilter ? `
    display: none;
    font-size:1rem;
  ` : 'color: #30d6e3;'}
`;

const BottomBorder = styled.span`
  position: absolute;
  bottom: 0;
  left:50%;
  transform: translateX(-50%);
  width: 85%;
  height: 1px;
  background: #efefef;
`;

const customStyles = (props) => {
  // custom props for the multiple select component styles
  const { containerWidth, menuWidth, menuPadding } = props;

  return {
    container: (provided, state) => ({
      ...provided,
      width: containerWidth || '200px',
      minHeight: '40px',
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: '4px',
      fontSize: '.9rem',
      fontWeight: '500',
      border: state.isFocused ? '1px solid #95959580' : '1px solid #9595954d',
      boxShadow: 'none',
      outline: 'none',
      height: '100%',
      "&:hover": {
        border: '1px solid #95959580',
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#8a8a8a',
    }),
    menuList: base => ({
      ...base,
      padding: menuPadding || '5px 0 10px 0',
      maxHeight: '400px',
    }),
    menu: (provided, state) => ({
      ...provided,
      width: menuWidth || '100%',
      display: 'inline-block',
      margin: '1px 0 0 0',
      borderRadius: '4px',
      boxShadow: '1.5px 2.6px 8px 0 rgba(0, 0, 0, 0.22)',
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#808080',
      padding: '15px 45px 15px 20px',
      border: 'none',
      cursor: 'pointer',
      background: state.isSelected ? 'none' : 'none',
      // "&:not(:last-child)": {
      //   boxShadow: '0 5px 0 -4px #efefef',
      // },
      "&:hover": {
        background: 'rgba(0, 0, 0, 0.07)',
        boxShadow: 'none',
      },
      "&:hover ~ .checked": {
        display: state.isSelected ? 'none' : 'flex',
      },
      "&:hover ~ .clear": {
        display: state.isSelected ? 'flex' : 'none',
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      "&:hover": {
        color: '#808080',
      },
      color: state.isFocused ? '#808080' : '#808080cc',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, color: '#8a8a8a', opacity, transition };
    }
  };
}

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.styles = customStyles(props.styleProps || {});
  }

  CustomOption = props => {
    const { data, innerRef, innerProps } = props;
    const { setFilters, appliedFilters } = this.props;

    if (data.clearFilter) {
      return <ClearFiltersContainer ref={innerRef}>
        <a onClick={() => setFilters([])}>Clear filters</a>
      </ClearFiltersContainer>
    }
    else {
      const filterIndex = appliedFilters ? appliedFilters.findIndex(el => el.label === data.label) : -1;
      let isSelected = false;
      if (filterIndex !== -1) {
        isSelected = appliedFilters && data.value === appliedFilters[filterIndex].value;
      }
      const optionCheckmark = isSelected ? <OptionAction className="checked" center><i className="icon-checkmark"></i> </OptionAction> : '';
      const optionClear = isSelected ? <OptionAction clearFilter className="clear" center><i className="icon-cancel"></i></OptionAction> : '';
      return (
        <div style={{ position: 'relative', height: 'auto' }}>
          <components.Option {...props} />
          {optionClear}
          {optionCheckmark}
          <BottomBorder />
        </div >
      );
    }
  };

  render() {
    const { value, onChange, options, placeholder } = this.props;

    return (
      <Select
        styles={this.styles}
        value={value}
        onChange={onChange}
        isSearchable={true}
        components={{ Option: this.CustomOption }}
        // defaultMenuIsOpen={true}
        options={options}
        placeholder={placeholder}
      />
    );
  }
}

MultiSelect.propTypes = {
  value: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  appliedFilters: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default MultiSelect;
