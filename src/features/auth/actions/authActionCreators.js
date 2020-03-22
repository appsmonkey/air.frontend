import { LOGIN_REQUEST, SIGNUP_REQUEST, SOCIAL_LOGIN_REQUEST, FORGOT_PASSWORD_START_REQUEST, GET_USER_PROFILE_REQUEST, LOG_OUT, SET_NEW_PASSWORD_REQUEST, COMPLETE_SIGNUP_REQUEST, LOGIN_USER_WITH_TOKEN } from "./authActionTypes";

export const login = (payload, meta) => {
  return {
    payload,
    meta,
    type: LOGIN_REQUEST
  };
};

export const signup = (payload, meta) => {
  return {
    payload,
    meta,
    type: SIGNUP_REQUEST
  };
};

export const completeSignup = (payload, meta) => {
  return {
    payload,
    meta,
    type: COMPLETE_SIGNUP_REQUEST
  };
};

export const forgotPasswordStart = (payload, meta) => {
  return {
    payload,
    meta,
    type: FORGOT_PASSWORD_START_REQUEST
  };
};

export const setNewPassword = (payload, meta) => {
  return {
    payload,
    meta,
    type: SET_NEW_PASSWORD_REQUEST
  };
};

export const getUserProfile = (payload, meta) => {
  return {
    payload,
    meta,
    type: GET_USER_PROFILE_REQUEST
  };
};

export const logOut = (payload, meta) => {
  return {
    payload,
    meta,
    type: LOG_OUT
  };
};

export const socialLogin = (payload, meta) => {
  return {
    payload,
    meta,
    type: SOCIAL_LOGIN_REQUEST
  };
};

export const loginUserWithToken = payload => {
  return {
    payload,
    type: LOGIN_USER_WITH_TOKEN,
  }
}