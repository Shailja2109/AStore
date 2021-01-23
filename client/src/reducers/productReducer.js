import { GET_PRODCUTS, LOADING } from "../actions/types";
const initialeState = {
  product: null,
  products: null,
  loading: null,
};

export default function (state = initialeState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODCUTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
