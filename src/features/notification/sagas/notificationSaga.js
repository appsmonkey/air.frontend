import { put, takeLatest, delay } from "redux-saga/effects";
// import { delay } from 'redux-saga';

import {
  SHOW_NOTIFICATION_START,
  SHOW_NOTIFICATION,
  CLEAR_NOTIFICATION
} from "../actions/notificationActionTypes";

function* showNotification(action) {
  try {
    console.log(action.payload);
    yield put({ type: SHOW_NOTIFICATION, payload: action.payload });
    yield delay(10000);
    yield put({ type: CLEAR_NOTIFICATION });

  } catch (error) {
    console.log("er\n", error);
  }
}

const saga = function* () {
  yield takeLatest(SHOW_NOTIFICATION_START, showNotification);
};

export default saga;
