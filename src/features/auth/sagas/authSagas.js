import { call, put, takeLatest } from "redux-saga/effects";
import isEmpty from 'lodash/isEmpty';
import history from "../../../core/state/history";
import axiosInstance from "../../../core/http/axiosInstance";

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
  FORGOT_PASSWORD_START_REQUEST,
  FORGOT_PASSWORD_START_SUCCESS,
  FORGOT_PASSWORD_START_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOG_OUT,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILURE,
  COMPLETE_SIGNUP_REQUEST,
  COMPLETE_SIGNUP_SUCCESS,
  COMPLETE_SIGNUP_FAILURE,
  LOGIN_USER_WITH_TOKEN,
} from "../actions/authActionTypes";

const API_URL = process.env.REACT_APP_API_URL;

const signup = newUser => {
  return axiosInstance.post(`auth/profile`, newUser);
};

const login = user => {
  return axiosInstance.post(`/auth/login`, user);
};

export const getUserApi = () => {
  return axiosInstance.get(`/profile`);
}

function getException(errorData) {
  return errorData.substr(0, errorData.indexOf(":"));
}

const forgotPasswordStartApi = values => {
  return axiosInstance.post(`auth/password/start`, values);
};

const requestSignupApi = values => {
  return axiosInstance.post(`auth/register`, values);
};

const setNewPasswordApi = values => {
  return axiosInstance.post(`auth/password/end`, values);
};

export async function validateEmailApi(email) {
  if (email === "") {
    return null;
  }
  try {
    const data = await axiosInstance.post("/auth/validate/email", { email: email });
    const exists = data.data.data.exists;
    const confirmed = data.data.data.confirmed;

    if (exists && confirmed) {
      return "Email has already been taken.";
    } else if (exists && !confirmed) {
      return "Email has already been taken, please confirm your account.";
    }
    return null;
  } catch (error) {
    return null;
  }
}

function* signupUser(action) {
  const { setSubmitting } = action.meta;
  const { setFieldError } = action.meta;
  const { history } = action.meta;

  try {
    const { email, password, gender, token, cognito_id, first_name, last_name, birthday } = action.payload;
    const data = yield call(signup, { user_name: email, password, token, cognito_id, user_profile: { first_name, last_name, birthday, gender } });
    const { id_token } = data.data.data;
    const { refresh_token } = data.data.data;
    const { access_token } = data.data.data;

    localStorage.setItem("id_token", id_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("access_token", access_token);
    yield put({ type: GET_USER_PROFILE_REQUEST, payload: {withRedirect: true}, setSubmitting });

    yield put({ type: COMPLETE_SIGNUP_SUCCESS, payload: data.data });
  } catch (error) {
    const errorData = error.data.errors[0]["error-data"];
    const exception = getException(errorData);

    switch (exception) {
      case "UsernameExistsException":
        setFieldError("email", "Email has already been taken.");
        break;
      default:
        setFieldError("general", "Something went wrong");
    }

    yield put({ type: COMPLETE_SIGNUP_FAILURE, error });
    setSubmitting(false);
  }
}

function* loginUserWithToken(action) {
  const { id_token, access_token } = action.payload;

  localStorage.setItem("id_token", id_token);
  localStorage.setItem("access_token", access_token);
  yield put({ type: GET_USER_PROFILE_REQUEST, payload: {withRedirect: false} });

  yield put({ type: LOGIN_SUCCESS });
}

function* loginUser(action) {
  const { setSubmitting } = action.meta;
  const { setStatus } = action.meta;
  const { history } = action.meta;

  try {
    const { email, password } = action.payload;
    const data = yield call(login, { email, password });
    const { id_token } = data.data.data;
    const { refresh_token } = data.data.data;
    const { access_token } = data.data.data;

    localStorage.setItem("id_token", id_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("access_token", access_token);
    yield put({ type: GET_USER_PROFILE_REQUEST, payload: {withRedirect: true, setSubmitting} });

    yield put({ type: LOGIN_SUCCESS, payload: data.data });
  } catch (error) {
    const errorData = error.data.errors[0]["error-data"];
    const errorMessage = error.data.errors[0]["error-message"];
    const exception = getException(errorData);

    switch (exception) {
      case "UserNotFoundException":
      case "NotAuthorizedException":
        setStatus("The email and password you entered did not match our records. Please double-check and try again.");
        break;
      case "SocialAccountLoginMethodException":
        setStatus(errorMessage);
        break;
      case "LoginUsernameExistsException":
        setStatus(errorMessage);
        break;
      case "SocialUserPasswordResetException":
        setStatus(errorMessage);
        break;
      default:
        setStatus("general", "Something went wrong");
        break;
    }

    yield put({ type: LOGIN_FAILURE, error });
    setSubmitting(false);
  }
}

function* socialLogin(action) {
  const { email, token, id, type } = action.payload;
  const { history, setSubmitting, setStatus } = action.meta;
  try {
    setSubmitting(true);
    const data = yield call(login, { email, password: null, social: { id, token, type } });
    const { id_token } = data.data.data;
    const { refresh_token } = data.data.data;
    const { access_token } = data.data.data;

    localStorage.setItem("id_token", id_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("access_token", access_token);
    yield put({ type: GET_USER_PROFILE_REQUEST, payload: {withRedirect: true} });
    yield put({ type: SOCIAL_LOGIN_SUCCESS, payload: data.data });
    setSubmitting(false);
  } catch (error) {
    console.log("er\n", error);
    
    const errorData = error.data.errors[0]["error-data"];
    const errorMessage = error.data.errors[0]["error-message"];
    const exception = getException(errorData);
    
    switch (exception) {
      case "LoginUsernameExistsException":
        setStatus(errorMessage);
        break;
      default:
        setStatus("Something went wrong");
        break;
    }
      
    yield put({ type: LOGIN_FAILURE, error });
    yield put({ type: SOCIAL_LOGIN_FAILURE, error });
    setSubmitting(false);
  }
}

function* forgotPasswordStart(action) {
  const { setSubmitting } = action.meta;
  const { setFieldError } = action.meta;
  const { history } = action.meta;

  try {
    const { email } = action.payload;
    const data = yield call(forgotPasswordStartApi, { email });
    yield put({ type: FORGOT_PASSWORD_START_SUCCESS, payload: data.data });
    
    setSubmitting(false);
  } catch (error) {
    console.log(error);
    const errorData = error.data.errors[0]["error-data"];
    const errorMessage = error.data.errors[0]["error-message"];
    const exception = getException(errorData);

    console.log(exception);
    switch (exception) {
      case "UserNotFoundException":
      case "NotAuthorizedException":
        setFieldError(
          "general",
          errorMessage
        );
        break;
      case "SocialAccountLoginMethodException":
        setFieldError(
          "general",
          errorMessage
        );
        break;
      case "SocialUserPasswordResetException":
        setFieldError(
          "general",
          errorMessage
        );
        break;
      default:
        console.log("SOMETHING WENT WRONG")
        setFieldError("general", "Something went wrong");
    }

    setSubmitting(false);
    yield put({ type: FORGOT_PASSWORD_START_FAILURE, error });
  }
}

function* setNewPassword(action) {
  const { setSubmitting } = action.meta;
  const { setFieldError } = action.meta;
  const { history } = action.meta;

  try {
    const { email, token, password, cognito_id } = action.payload;
    const data = yield call(setNewPasswordApi, { password, email, token, cognito_id });
    setSubmitting(false);
    history.push('/login');

    yield put({ type: SET_NEW_PASSWORD_SUCCESS, payload: data.data });
  } catch (error) {
    // const errorData = error.errors[0]["error-data"];
    // const exception = getException(errorData);

    // switch (exception) {
    //   case "UsernameExistsException":
    //     setFieldError("email", "Email has already been taken.");
    //     break;
    //   case "InvalidPasswordException":
    //     setFieldError("newPassword", "Email has already been taken.");
    //   case "InvalidPasswordException":
    //   default:
    //     setFieldError("general", "Something went wrong");
    // }
    setFieldError("general", "Something went wrong");
    setSubmitting(false);
    yield put({ type: SET_NEW_PASSWORD_FAILURE, error });
  }
}

function* requestSignup(action) {
  const { setSubmitting } = action.meta;
  const { setFieldError } = action.meta;

  try {
    const { email } = action.payload;
    const data = yield call(requestSignupApi, { email });
    setSubmitting(false);

    yield put({ type: SIGNUP_SUCCESS, payload: data.data });
  } catch (error) {
    // const errorData = error.errors[0]["error-data"];
    // const exception = getException(errorData);

    // switch (exception) {
    //   case "UsernameExistsException":
    //     setFieldError("email", "Email has already been taken.");
    //     break;
    //   default:
    //     setFieldError("general", "Something went wrong");
    // }
    setFieldError("general", "Something went wrong");

    setSubmitting(false);
    yield put({ type: SIGNUP_FAILURE, error });
  }
}


function* getProfile(action) {
  try {
    const data = yield call(getUserApi);
    yield put({ type: GET_USER_PROFILE_SUCCESS, payload: data.data });
    if(action.payload && action.payload.withRedirect){
      const user = data.data;
      if(user && !isEmpty(user.user_groups) && !isEmpty(user.user_groups.Groups)){
        const foundIndex = user.user_groups.Groups.findIndex(el=>el.GroupName==="AdminGroup");
        if(foundIndex>-1) {
          localStorage.setItem('isAdmin', true);
          return history.push('/admin');
        }
      }
      return history.push('/dashboard/devices');
    }
    if(action.payload && action.payload.setSubmitting){
      action.payload.setSubmitting(false);
    }
  } catch (error) {
    // yield put({ type: GET_USER_PROFILE_FAILURE, error });
  }
}

function* logOut(action) {
  try {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem('isAdmin');
    // yield put({ type: GET_USER_PROFILE_SUCCESS, payload: null });
    history.push('/login');
  } catch (error) {
    // yield put({ type: GET_USER_PROFILE_FAILURE, error });
  }
}

const saga = function* () {
  yield takeLatest(LOGIN_REQUEST, loginUser);
  yield takeLatest(COMPLETE_SIGNUP_REQUEST, signupUser);
  yield takeLatest(SIGNUP_REQUEST, requestSignup);
  yield takeLatest(SOCIAL_LOGIN_REQUEST, socialLogin);
  yield takeLatest(FORGOT_PASSWORD_START_REQUEST, forgotPasswordStart);
  yield takeLatest(SET_NEW_PASSWORD_REQUEST, setNewPassword);
  yield takeLatest(GET_USER_PROFILE_REQUEST, getProfile);
  yield takeLatest(LOG_OUT, logOut);
  yield takeLatest(LOGIN_USER_WITH_TOKEN, loginUserWithToken);
};

export default saga;
