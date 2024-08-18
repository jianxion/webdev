const initialState = {
    items: [],
    // other cart properties if needed
  };
  
  
  
  function cartReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Logic for adding to cart
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case 'REMOVE_FROM_CART':
        // Logic for removing from cart
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      // Add other cases as needed
      default:
        return state;
    }
  }
  
  export default cartReducer;