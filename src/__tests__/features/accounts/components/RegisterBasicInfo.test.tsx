import { RegisterBasicInfo } from '@features/account/components/RegisterBasicInfo';
import { afterAll, vi } from 'vitest';
import { renderWithProviders } from '../test-utils';
import { fireEvent, screen } from '@testing-library/react';
describe('RegisterBasicInfo', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  afterEach(async () => {
    await localStorage.clear();
  });
  it('should get data from localStorage and update dispatch an event', async () => {
    const { store } = renderWithProviders(<RegisterBasicInfo />);
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    console.log(screen);
    const firsNameInput = screen.getByRole('textbox', { name: 'firstName' });
    expect(firsNameInput).toBeInTheDocument();
    await fireEvent.change(firsNameInput, {
      target: { value: 'test first name' },
    });
    expect(store.getState().registerAccount.registerInfo.firstName).toBe(
      'test first name'
    );
    // expect(store).toBeDefined();
    // expect(dispatchSpy).toHaveBeenCalled();
  });
});
