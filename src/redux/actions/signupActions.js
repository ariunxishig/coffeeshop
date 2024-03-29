import axios from "axios";
// import { loginUserSuccess } from "./loginActions";
export const signupUser = (email, password) => {
  return function(dispatch) {
    dispatch(signupUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKg53IUL8f7w3Ia9mFT2ttRkfCTS-cMEE",
        data
      )
      .then(result => {
        // LocalStorage ruu hadgalna
        const token = result.data.idToken;
        const userId = result.data.localId;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        dispatch(signupUserSuccess(token, userId));
      })
      .catch(err => {
        dispatch(signupUserError(err));
      });
  };
};

export const signupUserStart = () => {
  return {
    type: "SIGNUP_USER_START"
  };
};

export const signupUserSuccess = (token, userId) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    token,
    userId
  };
};

export const signupUserError = error => {
  return {
    type: "SIGNUP_USER_ERROR",
    error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT"
  };
};

export const autoLogoutAfterMillisec = ms => {
  return function(dispatch) {
    // avtomat logout
    setTimeout(() => {
      dispatch(logout());
    }, ms);
  };
};
