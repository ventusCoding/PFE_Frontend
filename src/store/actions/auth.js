import axios from "axios";
import * as actionTypes from "./actionTypes";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
    user,
  };
};

export const authSuccessMessage = (message) => {
  return {
    type: actionTypes.AUTH_SUCCESS_MESSAGE,
    message,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};
export const logout = () => {
  Cookies.remove("jwt");
  localStorage.removeItem("jwt");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
    };

    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(`/backend/api/v1/users/login`, authData, config)
      .then((res) => {
        Cookies.set("jwt", res.data.token);
        localStorage.setItem("jwt", res.data.token);
    
        let loadedUser = {};
        loadedUser.name = res.data.data.user.name;
        loadedUser.email = res.data.data.user.email;
        loadedUser.photo = res.data.data.user.photo;
        loadedUser.role = res.data.data.user.role;

        dispatch(
          authSuccess(res.data.token, res.data.data.user._id, loadedUser)
        );
      })
      .catch(function (error) {
        dispatch(authFail(error.response.data.message));
      });
  };
};

export const signup = (data) => {
  return (dispatch) => {
    dispatch(authStart());

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passwordConfirm", data.passwordConfirm);
    if (data.photo) {
      formData.append("photo", data.photo[0]);
    }


    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`/backend/api/v1/users/signup`, formData, config)
      .then((res) => {
        dispatch(authSuccessMessage(res.data.message));
      })
      .catch(function (error) {
        console.log("error", error.response);
        dispatch(authFail(error.response.data.message));
      });
  };
};

export const setAuthResult = (result) => {
  return {
    type: actionTypes.SET_AUTH_RESULT,
    result,
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    dispatch(authStart());
    // const token = Cookies.get("jwt");
    const token = localStorage.getItem("jwt");

 

    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(logout());
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .get(`/backend/api/v1/users/${decoded.id}`, config)
          .then((response) => {
            let loadedUser = {};
            loadedUser.name = response.data.data.name;
            loadedUser.email = response.data.data.email;
            loadedUser.photo = response.data.data.photo;
            loadedUser.role = response.data.data.role;

            dispatch(setAuthResult('success'));
            dispatch(authSuccess(token, response.data.data._id, loadedUser));
          })
          .catch((error) => {
            dispatch(setAuthResult('fail'));
            dispatch(logout());
          });
      }
    } else {
      dispatch(setAuthResult('fail'));
      dispatch(logout());
    }
  };
};
