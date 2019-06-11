import {GET_USER_DATA, GET_USER_DATA_SUCCESS} from '../../constants/ActionTypes'
import axios from "axios";
import {all, call, fork, put,takeEvery} from "redux-saga/effects";
import {getUserDataError, getUserDataSuccess} from "../actions/User";

var uid = localStorage.getItem('user_id')

const getuserDat = async () =>
  await axios.get("http://127.0.0.1:4000/user/" + uid)
    .then(user => user)
    .catch(error => error);

export function* getRequestUserData() {
  console.log("we are asking for Data");
  const user = yield call(getuserDat);
  if (user.message) {
    console.log(user.message);
    yield put(getUserDataError(user.message))
  }else {
    console.log("Success");
    // console.log(user.data);
    yield put(getUserDataSuccess(user.data))
  }

}

export function* requestUserData() {
  yield takeEvery(GET_USER_DATA, getRequestUserData)
}

export default function* rootSaga() {
  yield all([fork(requestUserData)])
}
