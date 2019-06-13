import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR, GET_ADMIN_DATA_SUCCESS
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
  console.log("the Data");
  console.log(data)
  return{
    type: GET_USER_DATA_SUCCESS,
    payload: data
  }
};

export const getAdminDataSuccess = (data) => {
  console.log("the Data");
  console.log(data)
  return{
    type: GET_ADMIN_DATA_SUCCESS,
    payload: data
  }
};
