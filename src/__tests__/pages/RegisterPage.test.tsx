import RegisterPage from '../../pages/RegisterPage';
import { afterAll, vi } from 'vitest';
import { RenderWithProviders } from '../providerWrappers/RenderWithProviders';

describe('RegisterPage', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  afterEach(async () => {
    await localStorage.clear();
  });
  it('should get data from localStorage and update dispatch an event', () => {
    // const { store } = RenderWithProviders(<RegisterPage />);
    const { store } = RenderWithProviders(<RegisterPage />);

    expect(store.getState().registerAccount).toBeDefined();
  });
});
