import axios from "axios";

import history from "../state/history";
import store from '../state/store';
import { getUserProfile, logOut, loginUserWithToken } from "../../features/auth/actions/authActionCreators";

const API_URL = process.env.REACT_APP_API_URL;

let instance = axios.create({
  baseURL: API_URL
});

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem("id_token");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    console.log(error);
    if (error && error.response && error.response.status === 401) {
      const refresh_token = localStorage.getItem("refresh_token");

      return axios
        .post(`${API_URL}/auth/refresh`, { refresh_token: refresh_token })
        .then(res => {
          const id_token = res.data.data.id_token;
          const access_token = res.data.data.access_token;

          error.response.config.headers["Authorization"] = id_token;
          error.response.config.headers["AccessToken"] = access_token;
          store.dispatch(loginUserWithToken({id_token, access_token}));
          return axios(error.response.config);
        })
        .catch(error => {
          store.dispatch(logOut())
          history.push("/login");
          return Promise.reject(error.response);
        });
    }
    return Promise.reject(error.response);
  }
);

export default instance;
