import {
  INIT_USER_REGISTER_UPLOAD,
  REGISTER_USER_DETAILS,
  REGISTER_USER_PHOTO,
  REQ_USER_WALLET,
  SUCCESS_USER_WALLET_READY,
  UPLOAD_USER_DATA
} from '../../constants/ActionTypes';


const INIT_STATE = {
  loading: false
};

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case REGISTER_USER_DETAILS: {
      return {
        ...state,
        ...action.payload
      }
        ;
    }

    case REGISTER_USER_PHOTO: {
      return {
        ...state,
        ...action.payload
      }
    }


    case SUCCESS_USER_WALLET_READY: {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }

    case REQ_USER_WALLET: {
      return {
        ...state,
        loading: true
      }
    }

    case INIT_USER_REGISTER_UPLOAD: {
      return {
        ...state,
        loading: true
      }
    }

    case UPLOAD_USER_DATA: {
      return {
        ...state,
        loading: false
      }
    }

    default: {
      return state
    }


  }

}
