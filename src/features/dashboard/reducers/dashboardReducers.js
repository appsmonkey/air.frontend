import {
  GET_MY_DEVICES_REQUEST,
  GET_MY_DEVICES_SUCCESS,
  GET_MY_DEVICES_FAILURE,
  ADD_NEW_DEVICE_SUCCESS,
  GET_DEVICE_SUCCESS,
  UPDATE_DEVICE_SUCCESS,
  DEVICE_RESET,
  FILTER_DEVICES,
  SEARCH_DEVICES,
  SORT_DEVICES,
  RESET_DEVICES,
  SET_DEVICE_FILTERS,
  SET_CHART_FILTERS,
  GET_PM2_5_PAST_24_HOURS_REQUEST,
  GET_PM2_5_PAST_24_HOURS_SUCCESS,
  GET_PM2_5_PAST_24_HOURS_FAILURE,
  GET_DASHBOARD_CHART_DATA_REQUEST,
  GET_INITIAL_DASHBOARD_CHART_DATA_REQUEST,
  GET_DASHBOARD_CHART_DATA_SUCCESS,
  GET_DASHBOARD_CHART_DATA_FAILURE,
  GET_SCHEMA_REQUEST,
  GET_SCHEMA_SUCCESS,
  GET_SCHEMA_FAILURE,
  CLEAR_MY_DEVICES,
  SET_ALL_CHART_FILTERS_REQUEST,
  SET_ALL_CHART_FILTERS_SUCCESS
} from "../actions/dashboardActionTypes";

import { _chartFilters } from "../constants/filterOptions";

const initialDeviceState = {
  device_id: "",
  type: "",
  coordinates: {
    lat: 0,
    lng: 0
  },
  map_meta: null,
  mine: null,
  model: "",
  name: "",
  timestamp: null,
};

const initialState = {
  get_my_devices_success: false,
  get_my_devices_failure: false,
  my_devices: [],
  filtered_my_devices: [],
  applied_device_filters: [],
  past_24_hours_chart_data: [],
  dashboard_chart_data: { max: {}, chart: [] },
  fetching_average_pm_2_5: false,
  fetching_dashboard_chart_data: false,
  applied_chart_filters: Object.keys(_chartFilters).map(key => _chartFilters[key]),
  all_chart_filters: Object.keys(_chartFilters).map(key => _chartFilters[key]),
  fetching_my_devices: false,
  device: initialDeviceState,
  schema: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_DEVICES_REQUEST:
      return {
        ...state,
        fetching_my_devices: true
      };
    case GET_MY_DEVICES_SUCCESS:
      return {
        ...state,
        get_my_devices_success: true,
        get_my_devices_failure: false,
        fetching_my_devices: false,
        my_devices: action.payload,
        filtered_my_devices: action.payload
      };
    case CLEAR_MY_DEVICES:
      return {
        ...state,
        my_devices: [],
        filtered_my_devices: []
      };
    case GET_MY_DEVICES_FAILURE:
      return {
        ...state,
        get_my_devices_failure: true,
        get_my_devices_success: false,
        fetching_my_devices: false
      };
    case ADD_NEW_DEVICE_SUCCESS:
      return {
        ...state,
        my_devices: [action.payload, ...state.my_devices]
      };
    case GET_DEVICE_SUCCESS:
      return {
        ...state,
        device: {
          ...action.payload,
          timestamp:
            action.payload.timestamp === 0
              ? null
              : action.payload.timestamp * 1000,
          type: action.payload.indoor ? "indoor" : "outdoor"
        }
      };
    case DEVICE_RESET:
      return {
        ...state,
        device: initialDeviceState
      };
    case FILTER_DEVICES:
      return {
        ...state,
        filtered_my_devices: action.payload.filters && action.payload.filters.length !== 0 ? state.my_devices.filter(device => {
          let isExcluded = false;
          if(action.payload.filters.findIndex(el=>el.value==='indoor') > -1 && action.payload.filters.findIndex(el=>el.value==='outdoor') > -1){
            action.payload.filters = action.payload.filters.filter(filter => filter.value !== 'indoor' && filter.value !== 'outdoor');
          }
          if(action.payload.filters.findIndex(el=>el.value==='offline') > -1 && action.payload.filters.findIndex(el=>el.value==='online') > -1){
            action.payload.filters = action.payload.filters.filter(filter => filter.value !== 'offline' && filter.value !== 'online');
          }

          action.payload.filters.some(filter => {
            switch (filter.value) {
              case 'indoor':
                isExcluded = !device.indoor;
                break;
              case 'outdoor':
                isExcluded = device.indoor;
                break;
              case 'offline':
                isExcluded = device.active;
                break;
              case 'online':
                isExcluded = !device.active;
                break;
              case 'mine':
                isExcluded = !device.mine;
                break;
              default:
                isExcluded = false;
                break;
            }
            // return true breaks the some loop as soon as it hits it (any filter which not apply to that device)
            return isExcluded;
          })
          return !isExcluded && device.name.toLowerCase().includes(action.payload.searchText.toLowerCase());
        }) : state.my_devices.filter(device => device.name.toLowerCase().includes(action.payload.searchText.toLowerCase()))
      };
    case SEARCH_DEVICES:
      return {
        ...state,
        filtered_my_devices: state.my_devices.filter(device => {
          return device.name
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        })
      };
    case RESET_DEVICES: {
      return {
        ...state,
        filtered_my_devices: state.my_devices
      };
    }
    case SORT_DEVICES: {
      return {
        ...state,
        filtered_my_devices: state.filtered_my_devices.sort((a, b) => {
          if (a[action.payload.fieldName] > b[action.payload.fieldName]) {
            return action.payload.asc ? 1 : -1;
          } else if (b[action.payload.fieldName] > a[action.payload.fieldName]) {
            return action.payload.asc ? -1 : 1;
          } else {
            return 0;
          }
        })
      }
    }
    case SET_DEVICE_FILTERS: {
      return {
        ...state,
        applied_device_filters: action.payload,
      }
    }
    case SET_CHART_FILTERS: {
      return {
        ...state,
        applied_chart_filters: action.payload,
      }
    }
    case GET_PM2_5_PAST_24_HOURS_REQUEST:
      return {
        ...state,
        fetching_average_pm_2_5: true
      };
    case GET_PM2_5_PAST_24_HOURS_SUCCESS:
      return {
        ...state,
        fetching_average_pm_2_5: false,
        past_24_hours_chart_data: action.payload
      };
    case GET_PM2_5_PAST_24_HOURS_FAILURE:
      return {
        ...state,
        fetching_average_pm_2_5: false
      };
    case GET_DASHBOARD_CHART_DATA_REQUEST:
      return {
        ...state,
        // dashboard_chart_data: { chart: [], max: {} },
      };
    case GET_INITIAL_DASHBOARD_CHART_DATA_REQUEST:
      return {
        ...state,
        fetching_dashboard_chart_data: true,
        dashboard_chart_data: { chart: [], max: {} },
      };
    case GET_DASHBOARD_CHART_DATA_SUCCESS:
      return {
        ...state,
        fetching_dashboard_chart_data: false,
        dashboard_chart_data: action.payload
      };
    case GET_DASHBOARD_CHART_DATA_FAILURE:
      return {
        ...state,
        fetching_dashboard_chart_data: false
      };
    case GET_SCHEMA_REQUEST:
      return {
        ...state,
        fetching_schema: true,
      }
    case GET_SCHEMA_SUCCESS:
      return {
        ...state,
        schema: action.payload,
        fetching_schema: false,
      }
    case GET_SCHEMA_FAILURE:
      return {
        ...state,
        fetching_schema: false,
      }
    case SET_ALL_CHART_FILTERS_REQUEST:
      return {
        ...state,
        all_chart_filters: Object.keys(_chartFilters).map(key => _chartFilters[key]),
      }
    case SET_ALL_CHART_FILTERS_SUCCESS:
      return {
        ...state,
        all_chart_filters: action.payload
      }
    default:
      return state;
  }
};
