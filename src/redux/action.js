import axios from "axios";
import { loading, failed, success } from "../constansts";

export const getData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: loading,
      payload: { data: [], loading: true, error: "" },
    });
    const { data } = await axios("http://kzico.runflare.run/product");
    dispatch({
      type: success,
      payload: { data: [...data], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: failed,
      payload: { data: [], loading: false, error: error.message },
    });
  }
};

export const addToCart = (id) => async (dispattch, getState) => {
  const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);

  dispattch({
    type: "CARTADDITEM",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      qqt: 1,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const getprofile = () => async (dispatch, getState) => {
  try {
    const { data } = await axios("http://kzico.runflare.run/user/profile", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")} `,
      },
    });
    dispatch({
      type: "SUCCESSGETPROFILE",
      payload: { ...data },
    });
  } catch (error) {
    dispatch({
      type: "FAILEDGETPROFILE",
      payload: { ...error },
    });
  }
};

export const removeItem = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVEITEM",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const deletall = (id) => (dispatch, getState) => {
  dispatch({
    type: "DELETEALL",
    payload: [],
  });
};
export const plusProduct = (itemm) => (dispatch, getState) => {
  dispatch({
    type: "PLUSPRODUCT",
    payload: itemm,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const minProduct = (itemm) => (dispatch, getState) => {
  dispatch({
    type: "MINPRODUCT",
    payload: itemm,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
