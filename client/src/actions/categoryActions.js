import axios from "axios";
import { GET_MAINCATEGORY, GET_CATEGORY, GET_SUBCATEGORY } from "./types";

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

//get category by it's category id
export const GetLandingCategory = (id) => (dispatch) => {
  axios
    .get(`/category/${id}`)
    .then((res) => {
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

//get category by it's sub category id
export const GetLandingSubCategory = (id) => (dispatch) => {
  axios
    .get(`/subCategory/${id}`)
    .then((res) => {
      dispatch({
        type: GET_SUBCATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_SUBCATEGORY,
        payload: null,
      });
    });
};
