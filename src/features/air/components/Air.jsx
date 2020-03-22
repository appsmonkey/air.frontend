import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import CityMap from "../../map/containers/Map";
import CityDashboard from "../../dashboard/containers/CityDashboard";
import WithNavigation from "../../../core/navigation/WithNavigation";
import DeviceDashboard from "../../dashboard/containers/DeviceDashboard";

class Air extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Redirect exact from="/air" to="/air/sarajevo" />
          <Route exact path="/air/sarajevo" component={CityMap} />
          <WithNavigation>
            <Route
              path="/air/dashboard/city/:city"
              component={CityDashboard}
            />
            <Route
              path="/air/dashboard/devices/:id"
              component={DeviceDashboard}
            />
          </WithNavigation>
        </Switch>
      </>
    );
  }
}

export default Air;
