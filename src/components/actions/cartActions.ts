import type { Product } from '../../types';

export const ADD_TO_CART = 'ADD_TO_CART' as const;
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART' as const;
export const CLEAR_CART = 'CLEAR_CART' as const;

export const addToCart = (item: Product) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId: Product['id']) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export type CartAction =
  | ReturnType<typeof addToCart>
  | ReturnType<typeof removeFromCart>
  | ReturnType<typeof clearCart>;