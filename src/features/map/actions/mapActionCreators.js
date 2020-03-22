import {
  SET_ZONES_LOADING,
} from "./mapActionTypes";

export const setZonesLoading = (payload) => {
  return {
    payload,
    type: SET_ZONES_LOADING
  };
};