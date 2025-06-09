import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post } from '../../utils/apiInterceptor';
import { type RootState } from '../../store';

export const registerNewUser = createAsyncThunk(
  'registerSlice/registerNewUser',
  async (_, { getState }) => {
    const state = getState() as RootState; // 假设 RootState 是从 store 导出的类型
    const registerInfo = {
      role: state.registerAccount.registerInfo.role,
      email: state.registerAccount.registerInfo.email,
      username: state.registerAccount.registerInfo.username,
      nickName: state.registerAccount.registerInfo.nickName,
      password: state.registerAccount.password,
      confirmPassword: state.registerAccount.confirmPassword,
    };
    return post('registerNewUser', registerInfo);
  }
);
export const checkDuplicateRegisterInfo = createAsyncThunk(
  'checkDuplicateRegisterInfo',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const username = state.registerAccount.registerInfo.username;
    const email = state.registerAccount.registerInfo.email;
    return get('checkDuplicateUsername', {
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
    });
  }
);
const registerSlice = createSlice({
  name: 'registerSlice',
  initialState: {
    registerInfo: {
      role: null,
      email: '',
      username: '',
      nickName: '',
    },
    password: '',
    confirmPassword: '',
    isLoggedIn: false,
    error: null,
    duplicateBasicInfo: false,
  },
  reducers: {
    selectRole: (state, action) => {
      state.registerInfo.role = action.payload;
      return state;
    },
    fillBasicInfo: (state, action) => {
      state.registerInfo.email = action.payload.email;
      state.registerInfo.username = action.payload.username;
      state.registerInfo.nickName = action.payload.nickName;
      return state;
    },
    fillPassword: (state, action) => {
      state.password = action.payload.password;
      return state;
    },
    fillConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload.confirmPassword;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.fulfilled, (state, action) => {
      state.registerInfo = action.payload;
      state.isLoggedIn = true;
      return state;
    });
    builder.addCase(checkDuplicateRegisterInfo.fulfilled, (state, action) => {
      state.duplicateBasicInfo =
        Array.isArray(action.payload) && action.payload.length > 0;
      return state;
    });
  },
});
//reducers
export default registerSlice.reducer;
//actions
export const { selectRole, fillBasicInfo, fillPassword, fillConfirmPassword } =
  registerSlice.actions;
//selectors
export const selectSelectedRole = (state: registerState) =>
  state.registerAccount.registerInfo.role;
export const selectIsRoleSelected = (state: registerState) =>
  state.registerAccount.registerInfo.role !== null;
export const selectBasicInfo = (state: registerState) =>
  state.registerAccount.registerInfo;
export const selectPassword = (state: registerState) =>
  state.registerAccount.password;
export const selectConfirmPassword = (state: registerState) =>
  state.registerAccount.confirmPassword;
export const selectAllRrequiredBasicInfoFilled = (state: registerState) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { email, username } = state.registerAccount.registerInfo;
  const invalid = !emailRegex.test(email);
  return email && username && !invalid;
};
export const selectIsPasswordValid = (state: registerState) => {
  const { password, confirmPassword } = state.registerAccount;
  return password && password.length >= 8 && password === confirmPassword;
};
export const selectDuplicateBasicInfo = (state: registerState) => {
  return state.registerAccount.duplicateBasicInfo;
};

type registerState = {
  registerAccount: {
    registerInfo: {
      role: string;
      email: string;
      username: string;
      nickName?: string;
    };
    confirmPassword: string;
    password: string;
    isLoggedIn: boolean;
    error: null;
    duplicateBasicInfo: boolean;
  };
};
