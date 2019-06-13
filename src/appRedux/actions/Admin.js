import {
  GET_ADMIN_DATA,
  GET_ADMIN_DATA_SUCCESS,
  GET_ADMIN_DATA_ERROR,
} from '../../constants/ActionTypes'


export  const getAdminData = () => {
  return{
    type: GET_ADMIN_DATA
  }
};

export const getAdminDataError = (error) => {
  return{
    type: GET_ADMIN_DATA_ERROR,
    payload: error
  }
};


export const getAdminDataSuccess = (data) => {
  console.log("the Data");
  console.log(data);
  return{
    type: GET_ADMIN_DATA_SUCCESS,
    payload: data
  }
};
