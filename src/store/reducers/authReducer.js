import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

const initialState = {
  token: null,
  userId: null,
  user: null,
  isAuthenticated: false,
  error: null,
  message: "",
  loading: false,
  authResult: null,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccessMessage = (state, action) => {
  return updateObject(state, {
    message: action.message,
    loading: false,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    loading: false,
    error: null,
    userId: action.userId,
    user: action.user,
    isAuthenticated: true,
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    user: null,
    loading: false,
  });
};

const setAuthResult = (state, action) => {
  return updateObject(state, { authResult: action.result });
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_SUCCESS_MESSAGE:
      return authSuccessMessage(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_RESULT:
      return setAuthResult(state, action);
    default:
      return state;
  }
};

export default authReducer;
