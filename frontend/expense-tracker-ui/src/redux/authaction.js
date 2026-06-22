export const setAuthAction = (token, username) => (dispatch) => {
  dispatch({
    type: "SET_AUTH",
    data: { token, username },
  });
};

export const clearAuthAction = () => (dispatch) => {
  dispatch({
    type: "CLEAR_AUTH",
  });
};