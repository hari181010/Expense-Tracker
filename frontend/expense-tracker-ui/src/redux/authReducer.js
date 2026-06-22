const initialState = {
  token: null,
  username: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        token: action.data.token,
        username: action.data.username,
      };

    case "CLEAR_AUTH":
      return initialState;

    default:
      return state;
  }
};