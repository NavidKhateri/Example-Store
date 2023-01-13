export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CARTADDITEM":
      const item = action.payload;

      const mahsolemojod = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (mahsolemojod) {
        return {
          ...state,
          cartItems: state.cartItems.map((ii) =>
            ii.product === mahsolemojod.product ? item : ii
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case "REMOVEITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case "PLUSPRODUCT":
      // let tempcart = state.cartItems.filter((item) => item.product === action.payload.product ? { ...item, qqt: item.qqt + 1 }: item )
      let news = state.cartItems.map((i) =>
        i.product === action.payload.product ? { ...i, qqt: i.qqt + 1 } : i
      );
      return {
        ...state,
        cartItems: news,
      };
    case "MINPRODUCT":
      // let tempcart = state.cartItems.filter((item) => item.product === action.payload.product ? { ...item, qqt: item.qqt + 1 }: item )
      let newss = state.cartItems.map((i) =>
        i.product === action.payload.product
          ? { ...i, qqt: i.qqt < 2 ? 1 : i.qqt - 1 }
          : i
      );
      return {
        ...state,
        cartItems: newss,
      };
    case "DELETEALL":
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};
