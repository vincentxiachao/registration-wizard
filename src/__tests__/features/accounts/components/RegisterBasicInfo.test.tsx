import { RegisterBasicInfo } from '@features/account/components/RegisterBasicInfo';
import { afterAll, vi } from 'vitest';
import { RenderWithProviders } from '../../../providerWrappers/RenderWithProviders';
import { fireEvent, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
describe('RegisterBasicInfo', () => {
  beforeEach(() => {});
  afterAll(() => {
    vi.clearAllMocks();
  });
  afterEach(async () => {
    await localStorage.clear();
  });

  it('should update state when first name input change', () => {
    const { store } = RenderWithProviders(
      <I18nextProvider i18n={i18next}>
        <RegisterBasicInfo />
      </I18nextProvider>
    );
    console.log(store.getState());
    const firstNameInput = screen
      .getByTestId('register-basic-first-name-input')
      .querySelector('input');
    expect(firstNameInput).toBeInTheDocument();
    if (firstNameInput) {
      fireEvent.change(firstNameInput, {
        target: { value: 'test first name' },
      });
    }
    expect(store.getState().registerAccount.registerInfo.firstName).toBe(
      'test first name'
    );
  });
  it('should update state when last name input change', () => {
    const { store } = RenderWithProviders(
      <I18nextProvider i18n={i18next}>
        <RegisterBasicInfo />
      </I18nextProvider>
    );
    const lastNameInput = screen
      .getByTestId('register-basic-last-name-input')
      .querySelector('input');
    expect(lastNameInput).toBeInTheDocument();
    if (lastNameInput) {
      fireEvent.change(lastNameInput, {
        target: { value: 'test last name' },
      });
    }
    expect(store.getState().registerAccount.registerInfo.lastName).toBe(
      'test last name'
    );
  });
});
