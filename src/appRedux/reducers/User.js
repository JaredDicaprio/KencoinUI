
import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR
} from '../../constants/ActionTypes'


const INIT_STATE = {
  new_User: false,
  loading: false
};

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_USER_DATA:{
      return{
        ...state,
        loading: true,
      };
    }

    case GET_USER_DATA_SUCCESS:{
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }


    case GET_USER_DATA_ERROR:{
      return {
        ...state,
        loading: false
      }
    }

    default:{
      return state
    }


  }

}
