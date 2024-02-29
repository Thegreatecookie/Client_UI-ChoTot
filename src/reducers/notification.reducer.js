const initialState = {
  unreadQuantity: 0,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UNREAD_QUANITY":
      return { ...state, unreadQuantity: action.payload };
    default:
      return state;
  }
};

export default notificationReducer;
