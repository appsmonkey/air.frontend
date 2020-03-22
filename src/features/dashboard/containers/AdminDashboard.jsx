import React from "react";
import { Switch, Route } from "react-router-dom";

import MyDevices from "./MyDevices";
import DeviceUpdate from "./DeviceUpdate";
import DeviceDashboard from "./DeviceDashboard";
import PrivateRoute from "../../../core/routing/PrivateRoute";

class AdminDashboard extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <PrivateRoute exact path="/admin" component={MyDevices} />
          <PrivateRoute
            path="/admin/dashboard/devices/update/:id"
            component={DeviceUpdate}
          />
          <Route
            path="/admin/dashboard/devices/:id"
            component={DeviceDashboard}
          />
          <PrivateRoute
            path="/admin/dashboard/devices"
            component={DeviceDashboard}
          />
        </Switch>
      </>
    );
  }
}

export default AdminDashboard;
