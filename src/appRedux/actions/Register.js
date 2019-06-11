import {
  REGISTER_USER_DETAILS,
  REGISTER_USER_PHOTO,
  REQ_USER_WALLET,
  SUCCESS_USER_WALLET_READY,
  UPLOAD_USER_DATA,
  INIT_USER_REGISTER_UPLOAD,
  RECREATE_USER_WALLET
} from '../../constants/ActionTypes';


export  const getUserDetails = (details) => {
  console.log("From the actions")
  console.log(details["name"]);
  return{
    type: REGISTER_USER_DETAILS,
    payload: details
  }
};

export const getUserPhotos = (photos) => {
  return{
    type: REGISTER_USER_PHOTO,
    payload: photos
  }
};

export const ReQuestUserWallet = () => {
  return{
    type: REQ_USER_WALLET
  }
};

export const RecreateUserWallet = (mnemo) => {
  return{
    type: RECREATE_USER_WALLET,
    payload: mnemo
  }
};

export const getUserWallet = (wallet) => {
  return{
    type: SUCCESS_USER_WALLET_READY,
    payload: wallet
  }
};

export const uploadUserData = (Data) => {
  return{
    type: UPLOAD_USER_DATA,
    payload: Data
  }
};

export const initDataUpload = () => {
  return{
    type: INIT_USER_REGISTER_UPLOAD,
  }
};
