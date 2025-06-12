import RegisterPage from '../../pages/RegisterPage';
import { afterAll, vi } from 'vitest';
import { renderWithProviders } from '../features/accounts/test-utils';
import { useDispatch } from 'react-redux';

describe('RegisterPage', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  afterEach(async () => {
    await localStorage.clear();
  });
  it('should get data from localStorage and update dispatch an event', () => {
    const { store } = renderWithProviders(<RegisterPage />);

    expect(store.getState().registerAccount).toBeDefined();
  });
});
