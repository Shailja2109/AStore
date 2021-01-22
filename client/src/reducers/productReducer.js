import { GET_PRODCUTS } from "../actions/types";
const initialeState = {
  product: null,
  products: null,
};

export default function (state = initialeState, action) {
  switch (action.type) {
    case GET_PRODCUTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
