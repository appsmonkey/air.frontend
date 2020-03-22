import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILURE,
  FORGOT_PASSWORD_START_SUCCESS,
  FORGOT_PASSWORD_START_FAILURE,
} from "../actions/authActionTypes";

const initialState = {
  signup_success: false,
  signup_failure: false,
  forgot_password_success: false,
  forgot_password_failure: false,
  login_success: false,
  login_failure: false,
  social_login_failure: false,
  social_login_success: false,
  new_password_failure: false,
  new_password_success: false,
  userProfile: null,
};

export default (state = initialState, action) => {
  console.log(
    `%c${action.type}`,
    "background: #000; color: #22edfc; padding: 4px"
  );
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup_success: true,
        signup_failure: false
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signup_failure: true,
        signup_success: false
      };
    case FORGOT_PASSWORD_START_SUCCESS:
      return {
        ...state,
        forgot_password_success: true,
        forgot_password_failure: false,
      };
    case FORGOT_PASSWORD_START_FAILURE:
      return {
        ...state,
        forgot_password_success: false,
        forgot_password_failure: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login_success: true,
        login_failure: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        login_failure: true,
        login_success: false
      };
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        social_login_success: true,
        social_login_failure: false
      };
    case SOCIAL_LOGIN_FAILURE:
      return {
        ...state,
        social_login_failure: true,
        social_login_success: false
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload
      }
    case SET_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        new_password_success: true,
        new_password_failure: false
      };
    case SET_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        new_password_failure: true,
        new_password_success: false
      };
    default:
      return state;
  }
};
