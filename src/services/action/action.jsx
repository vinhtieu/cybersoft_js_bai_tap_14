import axios from "axios";
import { USER_DATA } from "../api";
import { GET_USERS } from "../constant/cases";

export const getUsers = () => {
  return (dispatch) => {
    axios({
      url: USER_DATA,
      method: "GET",
    })
      .then((res) => {
        let action = {
          type: GET_USERS,
          payload: res.data,
        };

        console.log("res.data: ", res.data);

        dispatch(action);
      })
      .catch((err) => {
        throw new Error("Something bad happened.");
      });
  };
};
