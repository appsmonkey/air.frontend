import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import Select, { components } from "react-select";
import { Layout } from "../../../core/styles/layout";
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
  color: #30d6e3;
  ${props => props.hide ? `
    display: none;
  ` : ''}
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

const StyledLink = styled(Link)`
  :visited{
    color: unset;
  }
`;
const customStyles = (props) => {
  // custom props for the multiple select component styles
  const { containerWidth, menuWidth, menuPadding, menuOpened } = props;

  return {
    container: (provided, state) => ({
      ...provided,
      width: containerWidth || '135px',
      marginRight: '10px',
    }),
    control: (provided, state) => ({
      ...provided,
      margin: '0',
      outline: 'none',
      border: 'none',
      borderRadius: '4px 4px 0 0',
      boxShadow: menuOpened ? '1.5px 2.6px 8px 0 rgba(0, 0, 0, 0.22)' : 'none',
      background: menuOpened ? 'white' : 'none',
      "&:hover": {
        boxShadow: 'none',
      },
    }),
    input: (provided, state) => ({
      ...provided,
      padding: '0 10px',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#8a8a8a',
    }),
    menuList: base => ({
      ...base,
      padding: menuPadding || '0',
      maxHeight: '350px',
    }),
    menu: (provided, state) => ({
      ...provided,
      width: menuWidth || '100%',
      display: 'inline-block',
      margin: '0px',
      borderRadius: '0 4px 4px 4px',
      boxShadow: '0px 5px 5px 0 rgba(0, 0, 0, 0.22)',
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
      "& ~ .checked": {
        display: state.isSelected ? 'flex' : 'none',
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      display: 'none',
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
    this.state = {
      isOpen: false,
      styles: customStyles({ ...props.styleProps, menuOpened: false } || { menuOpened: false }),
    }
  }

  CustomOption = props => {
    const { data, innerRef, innerProps } = props;
    
    if (data.link) {
      return <ClearFiltersContainer ref={innerRef}>
        <StyledLink to={data.link}>{data.text || 'View all devices'}</StyledLink>
      </ClearFiltersContainer>
    }
    else {
      const optionCheckmark = <OptionAction hide className="checked" center><i className="icon-checkmark"></i> </OptionAction>;
      return (
        <div style={{ position: 'relative', height: 'auto' }}>
          <components.Option {...props} />
          {optionCheckmark}
          <BottomBorder />
        </div >
      );
    }
  };

  render() {
    const { value, onChange, options, placeholder, styleProps } = this.props;
    const { styles } = this.state;

    return (
      <Select
        styles={styles}
        value={value}
        onChange={onChange}
        isSearchable={false}
        components={{ Option: this.CustomOption }}
        options={options}
        onMenuOpen={() => this.setState({ styles: customStyles({ ...styleProps, menuOpened: true }) })}
        onMenuClose={() => this.setState({ styles: customStyles({ ...styleProps, menuOpened: false }) })}
        placeholder={placeholder}
        className="custom-select"
      />
    );
  }
}

MultiSelect.propTypes = {
  value: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default MultiSelect;
