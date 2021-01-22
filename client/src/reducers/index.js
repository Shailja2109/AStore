import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import errorsReducer from "./errorsReducer";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  errors: errorsReducer,
  products: productReducer,
});
