import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '@features/account/registerSlice';
export const store = configureStore({
  reducer: {
    registerAccount: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
