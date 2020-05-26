import { call, put, takeLatest, all } from "redux-saga/effects";

import get from 'lodash/get';
import deepClone from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import axiosInstance from "../../../core/http/axiosInstance";
import chartData from "./tempChartData";
import {
  GET_MY_DEVICES_REQUEST,
  GET_MY_DEVICES_SUCCESS,
  GET_MY_DEVICES_FAILURE,
  ADD_NEW_DEVICE_SUCCESS,
  ADD_NEW_DEVICE_FAILURE,
  ADD_NEW_DEVICE_REQUEST,
  UPDATE_DEVICE_REQUEST,
  UPDATE_DEVICE_SUCCESS,
  UPDATE_DEVICE_FAILURE,
  GET_DEVICE_SUCCESS,
  GET_DEVICE_FAILURE,
  GET_DEVICE_REQUEST,
  DELETE_DEVICE_SUCCESS,
  DELETE_DEVICE_FAILURE,
  DELETE_DEVICE_REQUEST,
  GET_PM2_5_PAST_24_HOURS_REQUEST,
  GET_PM2_5_PAST_24_HOURS_SUCCESS,
  GET_PM2_5_PAST_24_HOURS_FAILURE,
  GET_DASHBOARD_CHART_DATA_REQUEST,
  GET_INITIAL_DASHBOARD_CHART_DATA_REQUEST,
  GET_DASHBOARD_CHART_DATA_SUCCESS,
  GET_DASHBOARD_CHART_DATA_FAILURE,
  GET_SCHEMA_REQUEST,
  GET_SCHEMA_FAILURE,
  GET_SCHEMA_SUCCESS,
  CLEAR_MY_DEVICES,
  SET_ALL_CHART_FILTERS_SUCCESS,
  SET_ALL_CHART_FILTERS_REQUEST,
  SET_CHART_FILTERS,
} from "../actions/dashboardActionTypes";
import { READINGS, EXCLUDED_READINGS } from "../../constants/constants";
import { _chartFilters, _filterOrderSensors } from "../constants/filterOptions";

const API_URL = process.env.REACT_APP_API_URL;

const getMyDevicesApi = () => {
  const config = {
    headers: {
      // Authorization: localStorage.getItem("id_token"),
      AccessToken: localStorage.getItem("access_token"),
    }
  };

  return axiosInstance.get(`device/list${isAdmin() ? '?adminShowAll=true': ''}`, config);
};

const generateQueryParams = (params) => {
  if (params.length === 0)
    return "";
  let query = "?";
  params.forEach((param, index) => {
    query += `${param.name}=${param.value + (index === params.length - 1 ? '' : '&')}`;
  })

  return query;
}

const addNewDeviceApi = newDevice => {
  return axiosInstance.post(`/device/add`, newDevice);
};

const getDeviceApi = token => {
  const config = {
    headers: {
      // Authorization: localStorage.getItem("id_token"),
      AccessToken: localStorage.getItem("access_token"),
    }
  };

  return axiosInstance.get(`device/get?token=${token}`, config);
};

const updateDeviceApi = updatedDevice => {
  return axiosInstance.post(`/device/update`, updatedDevice);
};

const deleteDeviceApi = token => {
  return axiosInstance.delete(`/device/del`, { data: { token: token } });
};

const getChartDeviceDataApi = (endpoint, params) => {
  return axiosInstance.get(`/chart/${endpoint + '/device-compare'+ generateQueryParams(params)}`);
}

const getChartDataApi = (endpoint, params) => {
  return axiosInstance.get(`/chart/${endpoint + generateQueryParams(params)}`);
}

const getSchemaApi = () => {
  return axiosInstance.get('/schema');
}

function* getMyDevices(action) {
  try {
    yield put({ type: CLEAR_MY_DEVICES });

    const data = yield call(getMyDevicesApi);

    yield put({ type: GET_MY_DEVICES_SUCCESS, payload: data.data.data });
  } catch (error) {
    console.log("er\n", error);

    yield put({ type: GET_MY_DEVICES_FAILURE, error });
  }
}

const isAdmin = () => {
  return localStorage.getItem("isAdmin") == "true";
};

function* addNewDevice(action) {
  const {
    setSubmitting,
    history,
    setFieldError,
    showNotification
  } = action.meta;

  try {
    const data = yield call(addNewDeviceApi, action.payload);
    const payload = {
      ...action.payload,
      device_id: data.data.data.token
    };

    yield put({ type: ADD_NEW_DEVICE_SUCCESS, payload });
    setSubmitting(false);
    showNotification(`${action.payload.name} was added successfully`);
    history.push("/dashboard");
  } catch (error) {
    yield put({ type: ADD_NEW_DEVICE_FAILURE, error });
    setSubmitting(false);
    setFieldError("general", "Something went wrong");
  }
}

function* getDevice(action) {
  try {
    const data = yield call(getDeviceApi, action.payload);

    yield put({ type: GET_DEVICE_SUCCESS, payload: data.data.data });
  } catch (error) {
    yield put({ type: GET_DEVICE_FAILURE, error });
  }
}

function* updateDevice(action) {
  const {
    setSubmitting,
    history,
    setFieldError,
    showNotification
  } = action.meta;

  try {
    // device_id prop is needed for reducer mapping
    const payload = {
      ...action.payload,
      device_id: action.payload.token
    };

    yield call(updateDeviceApi, {...action.payload});
    yield put({ type: UPDATE_DEVICE_SUCCESS, payload });
    setSubmitting(false);
    yield history.goBack();
    showNotification(`${action.payload.name} was updated successfully`);
  } catch (error) {
    yield put({ type: UPDATE_DEVICE_FAILURE, error });
    setSubmitting(false);
    setFieldError("general", "Something went wrong");
  }
}

function* deleteDevice(action) {
  const { showNotification } = action.meta;
  const { history } = action.meta;

  try {
    const payload = {
      ...action.payload,
      device_id: action.payload.token
    };

    yield call(deleteDeviceApi, action.payload.token);
    yield put({ type: DELETE_DEVICE_SUCCESS, payload });
    history.push("/dashboard/devices");
    showNotification(`${action.payload.name} was deleted successfully`);
  } catch (error) {
    yield put({ type: DELETE_DEVICE_FAILURE, error });
  }
}

function* getAveragePMChartData(action) {
  try {
    const data = yield call(() => getChartDataApi("day/all", [
      { name: 'from', value: action.payload.from || Date.now() },
      { name: 'sensor', value: action.payload.sensor || READINGS.pm25 }
    ]));

    yield put({ type: GET_PM2_5_PAST_24_HOURS_SUCCESS, payload: data.data.data });
  } catch (error) {
    console.log("er\n", error);

    yield put({ type: GET_PM2_5_PAST_24_HOURS_FAILURE, error });
  }
}

const _citySensors = [
  READINGS.airCo2,
  READINGS.airECo2,
  READINGS.humidity,
  READINGS.pm1,
  READINGS.pm10,
  READINGS.pm25,
  READINGS.temperature,
  READINGS.airTVOC,
  READINGS.airVOC
]

const _deviceSensors = [
  READINGS.airCo2,
  READINGS.airECo2,
  READINGS.humidity,
  READINGS.pm1,
  READINGS.pm10,
  READINGS.pm25,
  READINGS.temperature,
  READINGS.airTVOC,
  READINGS.airVOC,
  READINGS.lightIntensity,
  READINGS.soilMoisture,
  READINGS.soilTemperature
]

const generateSensorQuery = (sensors) => {
  let query = ""
  sensors.forEach((s, index) => {
    if (sensors.length - 1 === index)
      query += s;
    else
      query += s + ',';
  })
  return query;
}

const reorderSensors = filters => {
  let orderedFilters = [];
  let restFilters = deepClone(filters);

  _filterOrderSensors.forEach(sensor=>{
    const index = restFilters.findIndex(filter => filter.value === sensor);
    if(index > -1){
      orderedFilters.push(restFilters[index]);
      restFilters.splice(index,1);
    }
  })

  return [...orderedFilters, ...restFilters];
}

function* setChartFilterArray(action) {
  try {
    const data = yield call(getSchemaApi);
    const schema = get(data, 'data.data');
    let newFilterArray = [];
    action.payload.sensors.forEach(sensor=>{
      const defaultFilterKeys = Object.keys(_chartFilters);
      const sensorIndex = defaultFilterKeys.findIndex( key => key === sensor );

      if(sensorIndex > -1){
        // Sensor already exists in default filters no need to generate filter
        newFilterArray.push(_chartFilters[defaultFilterKeys[sensorIndex]]);
      }
      else if(schema[sensor] && schema[sensor].name){
        newFilterArray.push({ value: sensor, label: schema[sensor].name })
      }
    })

    newFilterArray = reorderSensors(newFilterArray);
    yield put({type: SET_ALL_CHART_FILTERS_SUCCESS, payload: newFilterArray});

    if(action.payload.searchParams !== null && typeof(action.payload.searchParams) !== 'undefined') {
      let initialChartFilters = [];
      newFilterArray.forEach(filter => {
        if(action.payload.searchParams.get(filter.value)){
          initialChartFilters.push(filter);
        }
      })
      if(!isEmpty(initialChartFilters)) yield put({type: SET_CHART_FILTERS, payload: initialChartFilters});
      else yield put({type: SET_CHART_FILTERS, payload: newFilterArray});
    }else if(action.payload.selectAll){
      yield put({type: SET_CHART_FILTERS, payload: newFilterArray});
    }

  } catch (error) {
    console.log("er\n", error);
  }
}

function* getInitialDashboardChartData(action) {
  try {
    let data = null;
    if(action.payload.device_id){

      data = yield call(() => getChartDeviceDataApi(`${action.payload.by || 'all'}`, [
        { name: 'from', value: action.payload.from || Date.now() },
        { name: 'sensor', value: action.payload.sensor || generateSensorQuery(_deviceSensors) },
        { name: 'token', value: action.payload.device_id }
      ]));
    }
    else{
      data = yield call(() => getChartDataApi(`${action.payload.by || 'all'}/all`, [
        { name: 'from', value: action.payload.from || Date.now() },
        { name: 'sensor', value: action.payload.sensor || generateSensorQuery(_citySensors) }
      ]));
    }

    data = get(data, 'data.data') || chartData;
    if(data.chart && !isEmpty(data.chart)) data.chart = data.chart.reverse();
    if(data.max && !isEmpty(data.max)){
      const sensors = Object.keys(data.max).map(key=>key);
      yield put({ type: SET_ALL_CHART_FILTERS_REQUEST, payload: { sensors, selectAll: action.payload.selectAllFilters || false, searchParams: action.meta && action.meta.searchParams || null } });
    }else {
      yield put({ type: SET_ALL_CHART_FILTERS_REQUEST, payload: { sensors: [], selectAll: action.payload.selectAllFilters || false, searchParams: action.meta && action.meta.searchParams || null } });
    }

    yield put({ type: GET_DASHBOARD_CHART_DATA_SUCCESS, payload: data });
  } catch (error) {
    console.log("er\n", error);

    yield put({ type: GET_DASHBOARD_CHART_DATA_FAILURE, error });
  }
}

function* getDashboardChartData(action) {
  try {
    let data = null;
    if(action.payload.device_id){

      data = yield call(() => getChartDeviceDataApi(`${action.payload.by || 'all'}`, [
        { name: 'from', value: action.payload.from || Date.now() },
        { name: 'sensor', value: action.payload.sensor || generateSensorQuery(_deviceSensors) },
        { name: 'token', value: action.payload.device_id }
      ]));
    }
    else{
      data = yield call(() => getChartDataApi(`${action.payload.by || 'all'}/all`, [
        { name: 'from', value: action.payload.from || Date.now() },
        { name: 'sensor', value: action.payload.sensor || generateSensorQuery(_citySensors) }
      ]));
    }

    data = get(data, 'data.data') || chartData;
    if(data.chart && !isEmpty(data.chart)) data.chart = data.chart.reverse();

    yield put({ type: GET_DASHBOARD_CHART_DATA_SUCCESS, payload: data });
  } catch (error) {
    console.log("er\n", error);

    yield put({ type: GET_DASHBOARD_CHART_DATA_FAILURE, error });
  }
}

function* getSchema(action) {
  try {
    const data = yield call(getSchemaApi);

    yield put({ type: GET_SCHEMA_SUCCESS, payload: data.data.data });
  } catch (error) {
    console.log("er\n", error);

    yield put({ type: GET_SCHEMA_FAILURE, error });
  }
}

const saga = function* () {
  yield takeLatest(GET_MY_DEVICES_REQUEST, getMyDevices);
  yield takeLatest(ADD_NEW_DEVICE_REQUEST, addNewDevice);
  yield takeLatest(GET_DEVICE_REQUEST, getDevice);
  yield takeLatest(UPDATE_DEVICE_REQUEST, updateDevice);
  yield takeLatest(DELETE_DEVICE_REQUEST, deleteDevice);
  yield takeLatest(GET_PM2_5_PAST_24_HOURS_REQUEST, getAveragePMChartData);
  yield takeLatest(GET_DASHBOARD_CHART_DATA_REQUEST, getDashboardChartData);
  yield takeLatest(GET_INITIAL_DASHBOARD_CHART_DATA_REQUEST, getInitialDashboardChartData);
  yield takeLatest(GET_SCHEMA_REQUEST, getSchema);
  yield takeLatest(SET_ALL_CHART_FILTERS_REQUEST, setChartFilterArray);
};

export default saga;
