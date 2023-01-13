import { loading, failed, success } from "../constansts";
export const products = (
  state = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case loading:
      return payload;
    case success:
      return payload;
    case failed:
      return payload;
    default:
      return state;
  }
};

// export const cart = (state = [{}], { type, payload }) => {
//   switch (type) {
//     case jam:
//     return payload
//     case add:
//       return [...state, payload];
//     default:
//       return state;
//   }
// };
