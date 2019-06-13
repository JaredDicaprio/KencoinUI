import {GET_USER_DATA, GET_USER_DATA_SUCCESS, SIGNOUT_USER} from '../../constants/ActionTypes'
import axios from "axios";
import {all, call, fork, put,takeEvery} from "redux-saga/effects";
import {getAdminDataSuccess, getUserDataError, getUserDataSuccess} from "../actions/User";
import {showAuthMessage, userSignOutSuccess} from "../actions";
import FireBaze from "../../constants/config/FireBaze";

var uid = localStorage.getItem('user_id')

const getuserDat = async () =>
  await axios.get("http://127.0.0.1:4000/user/" + uid)
    .then(user => user)
    .catch(error => error);

const getAdminDat = async () =>
  await axios.get("http://127.0.0.1:4000/user/admin")
    .then(user => user)
    .catch(error => error);

const signOutRequest = async () =>
  await  FireBaze.auth().signOut()
    .then(authUser => authUser)
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

function* signOut() {
  console.log("Signing Out");
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      localStorage.removeItem('user_id');
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


export function* requestUserData() {
  yield takeEvery(GET_USER_DATA, getRequestUserData)
}

export function* requestAdminData() {
  yield takeEvery(GET_USER_DATA, getRequestAdminData)
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(requestUserData), fork(signOutUser)])
}


