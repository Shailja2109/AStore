import { GET_MAINCATEGORY, GET_CATEGORY } from "../actions/types";
const initialeState = {
  MainCategories: null,
  categories: null,
};

export default function (state = initialeState, action) {
  switch (action.type) {
    case GET_MAINCATEGORY:
      return {
        ...state,
        MainCategories: action.payload,
      };

    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}
