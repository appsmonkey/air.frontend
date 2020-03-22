import {
  SHOW_NOTIFICATION,
  CLEAR_NOTIFICATION
} from "../actions/notificationActionTypes";

const initialState = {
  message: "",
  show: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        show: true,
        message: action.payload
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        show: false,
        message: ""
      };
    default:
      return state;
  }
};
