import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { products } from "./reducer";
import { cartReducer } from "./cartReducer";
import { profile } from "./profileReducer";

const reducers = combineReducers({
  allProducts: products,
  cart: cartReducer,
  profile: profile,
});
const cartItemsFromLocal = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// const customtoken = localStorage.getItem("token")
//   ? localStorage.getItem("token")
//   : "";

const initialState = {
  cart: { cartItems: cartItemsFromLocal },
};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
