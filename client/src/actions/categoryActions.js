import axios from "axios";
import { GET_MAINCATEGORY, GET_CATEGORY } from "./types";

//get main category
export const GetLandingMainCategory = () => (dispatch) => {
  axios
    .get("/maincategory")
    .then((res) => {
      dispatch({
        type: GET_MAINCATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_MAINCATEGORY,
        payload: null,
      });
    });
};

//get category by it's main category id
export const GetLandingCategory = (id) => (dispatch) => {
  axios
    .get(`/category/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CATEGORY,
        payload: null,
      });
    });
};
