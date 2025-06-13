import RegisterPage from '../../pages/RegisterPage';
import { afterAll, vi } from 'vitest';
import { RenderWithProviders } from '../providerWrappers/RenderWithProviders';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
describe('RegisterPage', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  afterEach(async () => {
    await localStorage.clear();
  });
  it('should disable next button if firstName is no cached ', () => {
    localStorage.setItem('registerAccount', `{"registerInfo":{}}`);
    const { store } = RenderWithProviders(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId('register-page-next-submit-button');

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(
      store.getState().registerAccount.registerInfo.firstName
    ).toBeUndefined();
  });
  it('should get data from localStorage and restore registerInfo state', () => {
    localStorage.setItem(
      'registerAccount',
      `{"registerInfo":{"email":"vincentxia20625@163.com","firstName":"chao123","lastName":"xia","dateOfBirth":"1988-06-25","country":{"code":"AE","label":"United Arab Emirates","phone":"971"},"gender":{"label":"Female","id":1},"avatar":null},"password":"testPasword","confirmPassword":"testPasword","isLoggedIn":false,"error":null,"duplicateUsername":false,"duplicateEmail":false,"submitSucceed":false}`
    );
    const { store } = RenderWithProviders(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    expect(store.getState().registerAccount.registerInfo.firstName).toBe(
      'chao123'
    );
  });
});
