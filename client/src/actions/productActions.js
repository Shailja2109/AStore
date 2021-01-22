import axios from "axios";
import { GET_PRODCUTS } from "./types";

// Get all products
export const GetProducts = (id) => (dispatch) => {
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
        payload: null,
      });
    });
};
