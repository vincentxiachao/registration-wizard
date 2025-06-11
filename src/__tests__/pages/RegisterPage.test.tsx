import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RegisterPage from '../../pages/RegisterPage';
import { combineReducers } from '@reduxjs/toolkit';
import registerReducer from '@features/account/registerSlice';
const rootReducer = combineReducers({ registerAccount: registerReducer });
import type { ReactElement } from 'react';
import { initialState } from '../../__tests__/constants/initialState';

const mockStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

const renderWithRedux = (component: ReactElement) => {
  return render(<Provider store={mockStore}>{component}</Provider>);
};

describe('RegisterPage', () => {
  it('renders the button with the correct label', () => {
    renderWithRedux(<RegisterPage />);
    expect(screen.getByText('firstName')).toBeInTheDocument();
  });
});
