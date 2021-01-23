import axios from "axios";
import { GET_PRODCUTS, LOADING } from "./types";

// Get all products
export const GetProducts = (id) => (dispatch) => {
  dispatch(setLoading());
  axios
    .get(`/products/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PRODCUTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODCUTS,
        payload: {},
      });
    });
};

//loading
export const setLoading = () => {
  return {
    type: LOADING,
  };
};
