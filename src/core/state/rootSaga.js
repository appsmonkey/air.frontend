import { all, fork } from "redux-saga/effects";

import authSaga from "../../features/auth/sagas/authSagas";
import notificationSaga from "../../features/notification/sagas/notificationSaga";
import dashboardSaga from "../../features/dashboard/sagas/dashboardSagas";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(dashboardSaga), fork(notificationSaga)]);
}
