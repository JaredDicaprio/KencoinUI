import {RECREATE_USER_WALLET, REQ_USER_WALLET} from '../../constants/ActionTypes';
import {call, take, takeEvery} from "redux-saga/effects";
import {getUserWallet} from "../actions/Register";
import axios from "axios";


const getWallet = async () => {
  await axios.get("http://127.0.0.1:4000/Wallet/create")
    .then(wallet => wallet)
    .catch(error => error);
};

export function* getUWallet() {
  console.log("Creating the wallet");
  const wallet = yield call(getWallet);
  if (wallet.message) {
    console.log(wallet.message)
  } else {
    console.log("Successful");
    yield getUserWallet(wallet)
  }
}

export function* createUserWallet() {
  yield takeEvery(REQ_USER_WALLET, getUWallet)
}


export function* recreateUserWallet() {
  const mnemo =  yield take(RECREATE_USER_WALLET);
  console.log(mnemo)
}
