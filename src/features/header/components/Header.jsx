import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import isEmpty from 'lodash/isEmpty';
import { Link, NavLink } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

import axiosInstance from '../../../core/http/axiosInstance';
import logoImage from "../assets/cityos-logo.png";
import { ReactComponent as XIcon } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import {logOut} from '../../auth/actions/authActionCreators';
import Notification from "../../notification/containers/Notification";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(to bottom, rgba(0,13,54,0.94) 0%, rgba(0,13,54,0.94) 34%, rgba(0,11,53,0.8) 51%, rgba(0,11,53,0) 100%);
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  color: #fff;
`;

const LogoLink = styled(Link)`
  margin: 0 1rem;
`;

const Logo = styled.img`
  height: 32px;
  display: block;
`;

const Links = styled.div`
  display: none;
  @media (min-width: 949px) {
    display: block;
  }
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 1rem;
  @media (min-width: 949px) {
    margin: 0 1rem;
  }
  &.active {
    color: ${props => props.theme.primary};
  }
`;

const ExternalLink = styled.a`
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 1rem;
  @media (min-width: 949px) {
    margin: 0 1rem;
  }
  &:visited{
    color: #fff;
  }
`;

const NavBtn = styled.div`
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  padding: 6px 12px;
  font-size: 1rem;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: ${props => (props.marginbottom ? "1rem" : "0")};
  @media (min-width: 949px) {
    margin: 0 1rem;
  }
`;

const AuthBtn = styled(Link)`
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  padding: 6px 12px;
  font-size: 1rem;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: ${props => (props.marginbottom ? "1rem" : "0")};
  @media (min-width: 949px) {
    margin: 0 1rem;
  }
`;

const MenuIconWrapper = styled.div`
  margin: 0 1rem;
  cursor: pointer;
  @media (min-width: 949px) {
    display: none;
  }
`;

const NavMobile = styled.nav`
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  z-index: 1;
  @media (min-width: 949px) {
    display: none;
  }
`;

class Header extends React.Component {
  state = {
    isOpen: false,
    fetching_my_devices: false,
    my_devices: []
  };
  componentDidMount() {
    this.getMyDevices();
  }

  componentDidUpdate(prevProps){
    const {user} = this.props;
    if(user!==null && user !== prevProps.user){
      this.getMyDevices();
    }
  }

  isLoggedIn = () => {
    if (localStorage.getItem("id_token") === null) {
      return false;
    }
    return true;
  };

  isAdmin = () => {
    return localStorage.getItem("isAdmin") == "true";
  };

  logOut = () => {
    const {logOut, history} = this.props;
    logOut();
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  closeMenu = () => {
    this.setState({ isOpen: false });
  };

  isMyDevicesRendered = () => {
    const {fetching_my_devices, my_devices} = this.state;

    if(!this.isLoggedIn()) return false;
    if(this.isAdmin()) return true;

    const filtered_devices = my_devices.filter(el=>el.mine && !el.default_device);
    if(!fetching_my_devices && !isEmpty(filtered_devices)){
      return true;
    }

    return false;
  }

  getMyDevices = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("id_token"),
        AccessToken: localStorage.getItem("access_token"),
      }
    };
  
    this.setState({fetching_my_devices: true})
    try{
      const data = await axiosInstance.get(`device/list${this.isAdmin() ? '?adminShowAll=true': ''}`, config);
      const my_devices =  data.data.data;
      this.setState({fetching_my_devices: false, my_devices});
    }catch(e){
      console.log(e);
      this.setState({fetching_my_devices: false, my_devices: []});
    }
  }

  render() {
    const { isOpen } = this.state;
    return (
      <>
        <Notification />
        <StyledHeader>
          <Nav>
            <MenuIconWrapper onClick={this.toggleMenu}>
              {isOpen ? <XIcon /> : <MenuIcon />}
            </MenuIconWrapper>
            <LogoLink to="/">
              <Logo src={logoImage} alt="logo" />
            </LogoLink>
            <Links>
              <ExternalLink href="https://cityos.io/air">Home</ExternalLink>
              <ExternalLink href="https://cityos.io/air#about">Boxy</ExternalLink>
              <StyledLink to="/air">Map</StyledLink>
              <ExternalLink href="https://cityos.io/air#app">Download</ExternalLink>
              <ExternalLink href="https://cityos-air.readme.io/docs">Docs</ExternalLink>
              {this.isMyDevicesRendered() && <StyledLink to="/dashboard">My devices</StyledLink>}
              {this.isAdmin() && <StyledLink to="/admin">Admin</StyledLink>}
            </Links>
            <Links>
              {this.isLoggedIn() ? (
                <NavBtn onClick={this.logOut}>
                  Logout
                </NavBtn>
              ) : (
                  <>
                    <AuthBtn to="/login">Login</AuthBtn>
                  </>
                )}
            </Links>
          </Nav>
        </StyledHeader>
        {isOpen ? (
          <OutsideClickHandler onOutsideClick={this.closeMenu}>
            <NavMobile>
              <ExternalLink href="https://cityos.io/air">
                Home
              </ExternalLink>
              <ExternalLink href="https://cityos.io/air#about">
                Boxy
              </ExternalLink>
              <StyledLink to="/air">Map</StyledLink>
              <ExternalLink href="https://cityos.io/air#app">Download</ExternalLink>
              <ExternalLink href="https://cityos-air.readme.io/docs">Docs</ExternalLink>
              {this.isMyDevicesRendered() ? (
                <StyledLink to="/dashboard" onClick={this.closeMenu}>
                  My devices
                </StyledLink>
              ) : null}
              {this.isAdmin() && <StyledLink to="/admin">Admin</StyledLink>}

              {this.isLoggedIn() ? (
                <NavBtn
                  onClick={() => {
                    this.logOut();
                    this.closeMenu();
                  }}
                >
                  Logout
                </NavBtn>
              ) : (
                  <>
                    <AuthBtn
                      to="/login"
                      marginbottom="true"
                      onClick={this.closeMenu}
                    >
                      Login
                  </AuthBtn>
                  </>
                )}
            </NavMobile>
          </OutsideClickHandler>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.userProfile
});

export default connect(
  mapStateToProps,
  {logOut},
  null,
  { pure: false }
)(Header);
