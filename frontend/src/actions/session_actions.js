import * as AuthUtil from "../util/session_api_util";

import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";


export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser,
  };
};

const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
})


const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const signup = (user) => (dispatch) => {
  debugger
  return AuthUtil.signup(user)
    .then(() => dispatch(receiveUserSignIn()),
    (err) => dispatch(receiveErrors(err.response.data))
  );
};


// need this jwt action for signup as well

export const login = user => dispatch => (
    AuthUtil.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        AuthUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
)



export const logout = () => (dispatch) => {
  // Remove the token from local storage
  localStorage.removeItem("jwtToken");
  // Remove the token from the common axios header
  AuthUtil.setAuthToken(false);
  // Dispatch a logout action
  dispatch(logoutUser());
};




// export const login = (user) => (dispatch) =>
//   AuthUtil.postSession(user).then(
//     (user) => dispatch(receiveCurrentUser(user)),
//     (error) => dispatch(receiveErrors(error.responseJSON))
//   );

// export const logout = () => (dispatch) => {
//   return AuthUtil.deleteSession().then(() => dispatch(logoutCurrentUser()));
// };