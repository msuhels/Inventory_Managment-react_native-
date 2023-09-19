import { SET_USER_DATA, SET_DASHBOARD_DATA } from "../constants/redux_constants";
import axios from '../../api/axios';
import { GET_USER_DETAILS, GET_DASHBOARD_DATA } from '../../api/apiUrl';

export function setUserData(payload) {
  return {
    type: SET_USER_DATA,
    payload,
  };
}

export const getUserData = () => {
  let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
  return async (dispatch, getState) => {
    try {
      let URL = GET_USER_DETAILS(admin._id);
      const response = await axios.get(URL, { headers: { "Authorization": "Bearer " + token } });
      let data = response.data;
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export function setDashboardData(payload) {
  return {
    type: SET_DASHBOARD_DATA,
    payload,
  };
}

export const getDashboardData = (searchObj) => {
  console.log(searchObj);
  let search = searchObj?.search ? searchObj?.search : '';
  let period = searchObj?.period ? searchObj?.period : 'monthly';
  let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
  return async (dispatch, getState) => {
    try {
      let URLS = GET_DASHBOARD_DATA(search, period);
      const response = await axios.get(URLS, { headers: { "Authorization": "Bearer " + token } });
      let data = response.data;
      dispatch(setDashboardData(data));
    } catch (error) {
      console.log(error);
    }
  };
};





