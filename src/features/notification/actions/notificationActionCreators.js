import {
  SHOW_NOTIFICATION_START,
  CLEAR_NOTIFICATION
} from "./notificationActionTypes";

export const showNotification = payload => {
  return {
    payload,
    type: SHOW_NOTIFICATION_START
  };
};

export const clearNotification = payload => {
  return {
    payload,
    type: CLEAR_NOTIFICATION
  };
};
