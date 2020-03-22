import {
  GET_MY_DEVICES_REQUEST,
  ADD_NEW_DEVICE_REQUEST,
  GET_DEVICE_REQUEST,
  UPDATE_DEVICE_REQUEST,
  DEVICE_RESET,
  DELETE_DEVICE_REQUEST,
  FILTER_DEVICES,
  SEARCH_DEVICES,
  SORT_DEVICES,
  RESET_DEVICES,
  SET_DEVICE_FILTERS,
  SET_CHART_FILTERS,
  GET_PM2_5_PAST_24_HOURS_REQUEST,
  GET_DASHBOARD_CHART_DATA_REQUEST,
  GET_INITIAL_DASHBOARD_CHART_DATA_REQUEST,
  GET_SCHEMA_REQUEST,
} from "./dashboardActionTypes";

export const getMyDevices = (payload, meta) => {
  return {
    payload,
    meta,
    type: GET_MY_DEVICES_REQUEST
  };
};

export const addNewDevice = (payload, meta) => {
  return {
    payload,
    meta,
    type: ADD_NEW_DEVICE_REQUEST
  };
};

export const getDevice = (payload, meta) => {
  return {
    payload,
    meta,
    type: GET_DEVICE_REQUEST
  };
};

export const updateDevice = (payload, meta) => {
  return {
    payload,
    meta,
    type: UPDATE_DEVICE_REQUEST
  };
};

export const resetDevice = () => {
  return {
    type: DEVICE_RESET
  };
};

export const deleteDevice = (payload, meta) => {
  return {
    payload,
    meta,
    type: DELETE_DEVICE_REQUEST
  };
};

export const filterDevices = payload => {
  return {
    payload,
    type: FILTER_DEVICES
  };
};

export const searchDevices = payload => {
  return {
    payload,
    type: SEARCH_DEVICES
  };
};

export const sortDevices = payload => {
  return {
    payload,
    type: SORT_DEVICES
  };
}

export const resetDevices = () => {
  return {
    type: RESET_DEVICES
  };
};

export const setDeviceFilters = payload => {
  return {
    payload,
    type: SET_DEVICE_FILTERS
  }
}

export const setChartFilters = payload => {
  return {
    payload,
    type: SET_CHART_FILTERS
  }
}

export const getAveragePM25Past24Hours = payload => {
  return {
    payload,
    type: GET_PM2_5_PAST_24_HOURS_REQUEST
  }
}

export const getInitialDashboardChartData = (payload, meta) => {
  return {
    payload,
    meta,
    type: GET_INITIAL_DASHBOARD_CHART_DATA_REQUEST
  }
}

export const getDashboardChartData = payload => {
  return {
    payload,
    type: GET_DASHBOARD_CHART_DATA_REQUEST
  }
}

export const getSchema = payload => {
  return {
    payload,
    type: GET_SCHEMA_REQUEST,
  }
}