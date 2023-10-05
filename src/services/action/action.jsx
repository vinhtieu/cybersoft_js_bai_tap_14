import axios from "axios";
import { USER_DATA } from "../api";
import { GET_USER, FETCH_USERS, CREATE_USER } from "../constant/cases";

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
