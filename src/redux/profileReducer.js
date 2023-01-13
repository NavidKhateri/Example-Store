export const profile = (state = {}, action) => {
  switch (action.type) {
    case "SUCCESSGETPROFILE":
      return { ...state, data: action.payload };

    case "FAILEDGETPROFILE":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
