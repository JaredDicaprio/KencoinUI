import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR
} from '../../constants/ActionTypes'


export  const getUserData = () => {
  return{
    type: GET_USER_DATA
  }
};

export const getUserDataError = (error) => {
  return{
    type: GET_USER_DATA_ERROR,
    payload: error
  }
};


export const getUserDataSuccess = (data) => {
  return{
    type: GET_USER_DATA_SUCCESS,
    payload: data
  }
};
