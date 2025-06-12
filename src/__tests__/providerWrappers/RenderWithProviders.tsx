import React, { type PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { type AppStore, type RootState } from '../../store';
import registerReducer from '../../features/account/registerSlice';
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: RootState;
  store?: AppStore;
}
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import i18next from '../../i18n';
import { I18nextProvider } from 'react-i18next';
const rootReducer = combineReducers({
  registerAccount: registerReducer,
});
const setupStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
  });
  return store;
};

export function RenderWithProviders(
  ui: React.ReactElement,
  { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({
    children,
  }: PropsWithChildren<unknown>): React.ReactElement {
    return (
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>{children}</Provider>
      </I18nextProvider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
export type StoreType = ReturnType<typeof setupStore>;
