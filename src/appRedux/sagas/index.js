import {all} from "redux-saga/effects";
import userSaga from './User'
import adminSaga from './Admin'
export default function* rootSaga(getState) {
  yield all([
    userSaga(),
    adminSaga()
  ]);
}
