import thunk from 'redux-thunk';
import { get, post } from '../../../src/utils/apiInterceptor';
import registerReducer, {
  fillBasicInfo,
  fillFirstName,
  fillLastName,
  fillDateOfBirth,
  fillPassword,
  fillConfirmPassword,
  fillCountry,
  fillGender,
  fillEmail,
  fillAvatar,
} from '../../../src/features/account/registerSlice';
import { setupStore } from '../../../src/store';
jest.mock('../../../src/utils/apiInterceptor');
const mockGet = get as jest.Mock;
const mockPost = post as jest.Mock;

// 初始状态
const initialState = {
  registerInfo: {
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date().toISOString().split('T')[0],
    country: '',
    gender: null,
    avatar: null,
  },
  password: '',
  confirmPassword: '',
  isLoggedIn: false,
  error: null,
  duplicateUsername: false,
  duplicateEmail: false,
};

describe('registerSlice reducers', () => {
  it('should handle fillBasicInfo', () => {
    const action = fillBasicInfo({
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2000-01-01',
    });
    const newState = registerReducer(initialState, action);
    expect(newState.registerInfo.email).toBe('test@example.com');
    expect(newState.registerInfo.firstName).toBe('John');
    expect(newState.registerInfo.lastName).toBe('Doe');
    expect(newState.registerInfo.dateOfBirth).toBe('2000-01-01');
  });

  it('should handle fillFirstName', () => {
    const action = fillFirstName('John');
    const newState = registerReducer(initialState, action);
    expect(newState.registerInfo.firstName).toBe('John');
  });

  it('should handle fillLastName', () => {
    const action = fillLastName('Doe');
    const newState = registerReducer(initialState, action);
    expect(newState.registerInfo.lastName).toBe('Doe');
  });

  it('should handle fillDateOfBirth', () => {
    const action = fillDateOfBirth('2000-01-01');
    const newState = registerReducer(initialState, action);
    expect(newState.registerInfo.dateOfBirth).toBe('2000-01-01');
  });

  it('should handle fillPassword', () => {
    const action = fillPassword('password123');
    const newState = registerReducer(initialState, action);
    expect(newState.password).toBe('password123');
  });

  it('should handle fillConfirmPassword', () => {
    const action = fillConfirmPassword('password123');
    const newState = registerReducer(initialState, action);
    expect(newState.confirmPassword).toBe('password123');
  });

  it('should handle fillCountry', () => {
    const action = fillCountry('USA');
    const newState = registerReducer(initialState, action);
    expect(newState.registerInfo.country).toBe('USA');
  });

  it('should handle fillGender', () => {
    const action = fillGender('male');
    const newState = registerReducer(initialState, action);
    expect(newState.registerInfo.gender).toBe('male');
  });

  it('should handle fillEmail', () => {
    const action = fillEmail('test@example.com');
    const newState = registerReducer(initialState, action);
    expect(newState.registerInfo.email).toBe('test@example.com');
  });

  it('should handle fillAvatar', () => {
    const action = fillAvatar('avatar.png');
    const newState = registerReducer(initialState, action);
    expect(newState.registerInfo.avatar).toBe('avatar.png');
  });
});
