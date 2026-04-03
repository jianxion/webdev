import { combineReducers } from 'redux';

import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;

export type RootReducerState = ReturnType<typeof rootReducer>;