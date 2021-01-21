import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  errors: errorsReducer,
});
