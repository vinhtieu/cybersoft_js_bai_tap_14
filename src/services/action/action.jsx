import axios from "axios";
import { USER_DATA } from "../api";
import { GET_USER, FETCH_USERS, SET_USER, RESET_USER } from "../constant/cases";

export const fetchUsers = () => {
  return (dispatch) => {
    axios({
      url: USER_DATA,
      method: "GET",
    })
      .then((res) => {
        let action = {
          type: FETCH_USERS,
          payload: res.data,
        };

        dispatch(action);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

export const getUser = (key, value) => {
  return (dispatch) => {
    let action = {
      type: GET_USER,
      payload: { key, value },
    };

    dispatch(action);
  };
};

export const setUser = (user) => {
  return (dispatch) => {
    let action = {
      type: SET_USER,
      payload: user,
    };

    dispatch(action);
  };
};

export const resetUser = () => {
  return (dispatch) => {
    let action = {
      type: RESET_USER,
    };
    dispatch(action);
  };
};
