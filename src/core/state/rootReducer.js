import { combineReducers } from "redux";

import auth from "../../features/auth/reducers/authReducers";
import dashboard from "../../features/dashboard/reducers/dashboardReducers";
import notification from "../../features/notification/reducers/notificationReducers";
import map from "../../features/map/reducers/mapReducer";

const rootReducer = combineReducers({
  auth,
  dashboard,
  notification,
  map
});

export default rootReducer;
