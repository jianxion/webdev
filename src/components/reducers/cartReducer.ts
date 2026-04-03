import type { CartState } from '../../types';

import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  type CartAction,
} from '../actions/cartActions';

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState = initialState, action: CartAction): CartState {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}

export default cartReducer;