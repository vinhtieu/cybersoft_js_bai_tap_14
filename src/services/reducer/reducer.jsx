import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS,
} from "../constant/cases";

const initialState = {
  userList: [],
  user: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_USER:
      return { ...state, ...payload };

    case GET_USERS:
      console.log("payload: ", payload);
      return { ...state, userList: payload };

    case UPDATE_USER:
      return { ...state, ...payload };
    case DELETE_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export { initialState, reducer };
