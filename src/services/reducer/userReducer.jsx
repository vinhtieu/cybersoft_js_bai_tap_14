import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
  GET_USER,
} from "../constant/cases";

const initialState = {
  userList: [],
  user: {
    username: "",
    email: "",
    password: "",
  },
};

const userReducer = (state = initialState, { type, payload }) => {
  let list;
  switch (type) {
    case CREATE_USER:
      list = [...state.userList];
      list.push({ ...state.user });
      return {
        ...state,
        userList: list,
        user: {
          username: "",
          email: "",
          password: "",
        },
      };

    case FETCH_USERS:
      return { ...state, userList: payload };
    case GET_USER:
      const { key, value } = payload;
      const newProps = { ...state.user, [key]: value };
      return { ...state, user: newProps };

    case UPDATE_USER:
      return { ...state, ...payload };
    case DELETE_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export { initialState, userReducer };
