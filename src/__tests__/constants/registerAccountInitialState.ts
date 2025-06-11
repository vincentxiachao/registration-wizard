export const initialState = {
  registerAccount: {
    registerInfo: {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      country: null,
      gender: null,
      avatar: null,
    },
    password: '',
    confirmPassword: '',
    isLoggedIn: false,
    error: null,
    duplicateUsername: false,
    duplicateEmail: false,
    submitSucceed: false,
  },
};
