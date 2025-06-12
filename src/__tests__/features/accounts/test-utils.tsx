import React, { type PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { type AppStore, rootReducer, type RootState } from '../../../store';
import registerReducer from '../../../features/account/registerSlice';
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: RootState;
  store?: AppStore;
}
import { initialState } from '../../constants/registerAccountInitialState';
import { configureStore } from '@reduxjs/toolkit';
const setupStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: { registerAccount: registerReducer } as any,
    preloadedState: preloadedState,
  });
  return store;
};

export function renderWithProviders(
  ui: React.ReactElement,
  { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): React.ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
