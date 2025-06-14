import { describe, it, expect } from 'vitest';
import {
  fillAccount,
  fillBasicInfo,
  type RegisterState,
} from '@features/register/registerSlice';
import registerReducer, {
  selectIsPasswordValid,
  selectEmail,
} from '@features/register/registerSlice';

// 初始化状态
const initialState: RegisterState = {
  registerInfo: {
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: null,
    gender: null,
    avatar: null,
  },
  confirmPassword: '',
  password: '',
  isLoggedIn: false,
  error: null,
  duplicateEmail: false,
  duplicateUsername: false,
  submitSucceed: false,
};

// testing reducer
describe('Register Slice Actions', () => {
  it('should update the password', () => {
    const newPassword = 'newPassword123';
    const newState = registerReducer(
      initialState,
      fillAccount({ newValue: newPassword, type: 'EDIT_PASSWORD' })
    );
    expect(newState.password).toBe(newPassword);
  });
  it('should update the confirm password', () => {
    const newConfirmPassword = 'newPassword123';
    const newState = registerReducer(
      initialState,
      fillAccount({
        newValue: newConfirmPassword,
        type: 'EDIT_CONFIRM_PASSWORD',
      })
    );
    expect(newState.confirmPassword).toBe(newConfirmPassword);
  });

  it('should update the email', () => {
    const newEmail = 'test@example.com';
    const newState = registerReducer(
      initialState,
      fillBasicInfo({
        type: 'EDIT_EMAIL',
        newValue: newEmail,
      })
    );
    expect(newState.registerInfo.email).toBe(newEmail);
  });
});

describe('Register Slice Selectors', () => {
  // 测试 selectIsPasswordValid selector
  it('should return true when password is valid', () => {
    const validState: RegisterState = {
      ...initialState,
      password: 'validPassword123',
      confirmPassword: 'validPassword123',
    };
    expect(selectIsPasswordValid({ registerAccount: validState })).toBe(true);
  });

  it('should return false when password is invalid', () => {
    const invalidState: RegisterState = {
      ...initialState,
      password: 'short',
      confirmPassword: 'short',
    };
    expect(selectIsPasswordValid({ registerAccount: invalidState })).toBe(
      false
    );
  });

  // 测试 selectEmail selector
  it('should return the email from the state', () => {
    const email = 'test@example.com';
    const stateWithEmail: RegisterState = {
      ...initialState,
      registerInfo: {
        ...initialState.registerInfo,
        email,
      },
    };
    expect(selectEmail({ registerAccount: stateWithEmail })).toBe(email);
  });
});
