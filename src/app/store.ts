import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '@features/register/registerSlice';

// 创建 Redux store
export const store = configureStore({
  // 合并多个 reducer
  reducer: {
    registerAccount: registerReducer,
    // 可以添加更多的 reducer
    // anotherReducer: anotherSlice.reducer,
  },
  // 可以配置中间件
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // 可以启用 Redux DevTools 扩展
  devTools: process.env.NODE_ENV !== 'production',
});

// 从 store 中推断出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
