import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { decode } from "jsonwebtoken";

//register user
export const registerUser = (userdata, history) => (dispatch) => {
  axios
    .post("/api/users/register", userdata)
    .then((res) => history.push("/login"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//user login
export const loginUser = (userdata) => (dispatch) => {
  axios
    .post("api/users/login", userdata)
    .then((res) => {
      //save to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //set token to header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// admin login
export const loginAdminUser = (userdata) => (dispatch) => {
  axios
    .post("/admin/login", userdata)
    .then((res) => {
      //save to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //set token to header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//admin User registeration
//register user
export const registerAdminUser = (userdata, history) => (dispatch) => {
  axios
    .post("/admin/register", userdata)
    .then((res) => history.push("/admin/login"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//log user out
export const logOutUser = () => (dispatch) => {
  //remove token from localstorge
  localStorage.removeItem("jwtToken");

  //remove auth token from header
  setAuthToken(false);

  //set current to {} and  will isAuthenticated false
  dispatch(setCurrentUser({}));
};
