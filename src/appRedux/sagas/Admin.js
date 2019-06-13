import {GET_USER_DATA, GET_USER_DATA_SUCCESS, SIGNOUT_USER} from '../../constants/ActionTypes'
import axios from "axios";
import {all, call, fork, put,takeEvery} from "redux-saga/effects";
import {getAdminDataSuccess, getUserDataError, getUserDataSuccess} from "../actions/User";
import {showAuthMessage, userSignOutSuccess} from "../actions";
import FireBaze from "../../constants/config/FireBaze";

var uid = localStorage.getItem('user_id')


const getAdminDat = async () =>
  await axios.get("http://127.0.0.1:4000/user/admin")
    .then(user => user)
    .catch(error => error);


export function* getRequestAdminData() {
  console.log("we are asking for Data");
  const user = yield call(getAdminDat);
  if (user.message) {
    console.log(user.message);
    yield put(getUserDataError(user.message))
  }else {
    console.log("Success");
    // console.log(user.data);
    yield put(getAdminDataSuccess(user.data))
  }
}

export function* requestAdminData() {
  yield takeEvery(GET_USER_DATA, getRequestAdminData)
}

export default function* rootSaga() {
  yield all([fork(requestAdminData)])
}


