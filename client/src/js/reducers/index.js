import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import productReducer from './productReducer';
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import commentsReducer from "./commentsReducer";

export default combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
  errors: errorReducer,
  user: userReducer,
  comments: commentsReducer
});
