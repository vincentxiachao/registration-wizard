import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../features/account/registerSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
  reducer: {
    registerAccount: registerReducer,
  },
});
export type AppStore = ReturnType<typeof setupStore>;
const rootReducer = {
  registerAccount: registerReducer,
};
//for UT mock store
export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
