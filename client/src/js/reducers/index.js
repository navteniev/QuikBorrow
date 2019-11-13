import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import productReducer from './productReducer';
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
  errors: errorReducer
});
