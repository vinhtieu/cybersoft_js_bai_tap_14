import {
  CREATE_USER,
  FETCH_USERS,
  GET_USER,
  SET_USER,
  RESET_USER,
} from "../constant/cases";

const initialState = {
  userList: [],
  user: {
    username: "",
    email: "",
    password: "",
  },

  isEdit: false,
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

    case SET_USER:
      return {
        ...state,
        user: payload,
        isEdit: true,
      };

    case RESET_USER:
      return {
        ...state,
        user: {
          username: "",
          email: "",
          password: "",
        },
        isEdit: false,
      };

    default:
      return state;
  }
};

export { initialState, userReducer };
