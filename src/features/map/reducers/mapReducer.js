import {
  SET_ZONES_LOADING,
} from "../actions/mapActionTypes";


const initialState = {
  fetching_zones: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZONES_LOADING:
      return {
        ...state,
        fetching_zones: action.payload
      };
    default:
      return state;
  }
};
