
import {
  GET_ADMIN_DATA_ERROR, GET_ADMIN_DATA_SUCCESS, GET_ADMIN_DATA
} from '../../constants/ActionTypes'


const INIT_STATE = {
  loading: true,
};

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_ADMIN_DATA:{
      return{
        ...state,
        loading: true,
      };
    }

    case GET_ADMIN_DATA_SUCCESS:{
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }

    case GET_ADMIN_DATA_ERROR:{
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
