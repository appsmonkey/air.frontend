import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import MyDevices from "./MyDevices";
import DeviceUpdate from "./DeviceUpdate";
import DeviceDashboard from "./DeviceDashboard";
import PrivateRoute from "../../../core/routing/PrivateRoute";
import { COLOR_PALETTE, SENSOR_CHART_COLORS } from "../constants/colors";


class ColorsPalette extends React.Component {
  render(){
    const predefinedColors = Object.keys(SENSOR_CHART_COLORS).map(key=>({name: key, value: SENSOR_CHART_COLORS[key]}))
    const colors = [...predefinedColors, ...COLOR_PALETTE];
    return (
      <div style={{display: "flex", flexWrap: "wrap", marginTop: "100px"}}>
        {colors.map(color => <div style={{ backgroundColor: color.value, height: "200px", width: "200px", position: "relative" }} >
          <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "white"}}>{color.name}<br />{color.value}</div>
        </div>)}
      </div>
    );
  }
}

class Dashboard extends React.Component {
  isAdmin = () => {
    return localStorage.getItem("isAdmin") == "true";
  };

  isLoggedIn = () => {
    if (localStorage.getItem("id_token") === null) {
      return false;
    }
    return true;
  };

  renderDeviceDashboardRoute = ({location}) => {
    if(!this.isLoggedIn()){
      return <Redirect
        from="/dashboard/devices/:id"
        to={`/air${location.pathname + (location.search || '') + (location.hash || '')}`}
      />;
    }
    return <DeviceDashboard />
  }

  render() {
    return (
      <>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={MyDevices} />
          {this.isAdmin() && 
            <Redirect
              exact
              from="/dashboard/devices/update/:id"
              to="/admin/dashboard/devices/update/:id"
            />
          }
          <PrivateRoute
            path="/dashboard/devices/update/:id"
            component={DeviceUpdate}
          />
          <Route
            path="/dashboard/devices/:id"
            render={this.renderDeviceDashboardRoute}
          />
          <Route
            path="/dashboard/colors"
            component={ColorsPalette}
          />
          <PrivateRoute
            path="/dashboard/devices"
            component={DeviceDashboard}
          />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    my_devices: state.dashboard.my_devices,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
