import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  products: productsReducer,
  auth: authReducer,
  errors: errorReducer
});
