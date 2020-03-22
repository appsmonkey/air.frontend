import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./state/store";
import history from "./state/history";
import theme from "./styles/theme";
import PrivateRoute from "./routing/PrivateRoute";
import Homepage from "../features/homepage/components/Homepage";
import Air from "../features/air/components/Air";
import MapBelgrade from "../features/map/containers/MapBelgrade";
import ScrollToTop from "../features/ScrollToTop";
import SignUp from "../features/auth/containers/StartRegistration";
import Login from "../features/auth/containers/Login";
import ForgotPassword from "../features/auth/containers/ForgotPassword";
import ResetPassword from "../features/auth/containers/ResetPassword";
import CompleteRegistration from "../features/auth/containers/CompleteRegistration";
import Dashboard from "../features/dashboard/containers/Dashboard";
import WithNavigation from "./navigation/WithNavigation";

import 'mapbox-gl/dist/mapbox-gl.css';
import AdminDashboard from "../features/dashboard/containers/AdminDashboard";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <ScrollToTop>
              <Switch>
                <Route path="/air" component={Air} />
                <WithNavigation>
                  <Route path="/" exact render={() => { 
                      window.location.href = 'https://cityos.io/air'; 
                      return null;
                  }} />
                  <Route path="/belgrade" component={MapBelgrade} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route path="/reset-password" component={ResetPassword} />
                  <Route path="/complete-registration" component={CompleteRegistration} />
                  <Route path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/admin" component={AdminDashboard} />
                </WithNavigation>
              </Switch>
            </ScrollToTop>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
