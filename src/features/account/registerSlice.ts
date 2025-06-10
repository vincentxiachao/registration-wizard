import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post } from '../../utils/apiInterceptor';
import type { IregisterInfo } from '../../utils/interfaces/account';
import { type RootState } from '../../store';
import daysjs from 'dayjs';
import type { ICountryType } from '@utils/interfaces/countryType';
export const registerNewUser = createAsyncThunk(
  'registerSlice/registerNewUser',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const registerInfo = {
      role: state.registerAccount.registerInfo.role,
      email: state.registerAccount.registerInfo.email,
      username: state.registerAccount.registerInfo.username,
      selectDateOfBirth: state.registerAccount.registerInfo.dateOfBirth,
      password: state.registerAccount.password,
      confirmPassword: state.registerAccount.confirmPassword,
    };
    return post('registerNewUser', registerInfo);
  }
);
export const checkDuplicateUsername = createAsyncThunk(
  'checkDuplicateUsername',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const username = state.registerAccount.registerInfo.username;
    return get('checkDuplicateUsername', {
      username: username.trim().toLowerCase(),
    });
  }
);
export const checkDuplicateEmail = createAsyncThunk(
  'checkDuplicateEmail',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const email = state.registerAccount.registerInfo.email;
    return get('checkDuplicateEmail', {
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
      dateOfBirth: daysjs().format('YYYY-MM-DD'),
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
  },
  reducers: {
    selectRole: (state, action) => {
      state.registerInfo.role = action.payload;
      return state;
    },
    fillBasicInfo: (state, action) => {
      state.registerInfo.email = action.payload.email;
      state.registerInfo.username = action.payload.username;
      state.registerInfo.dateOfBirth = action.payload.dateOfBirth;
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
    fillCountry: (state, action) => {
      state.registerInfo.country = action.payload;
      return state;
    },
    fillGender: (state, action) => {
      state.registerInfo.gender = action.payload;
      return state;
    },
    fillEmail: (state, action) => {
      state.registerInfo.email = action.payload;
      return state;
    },
    fillAvatar: (state, action) => {
      state.registerInfo.avatar = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.fulfilled, (state, action) => {
      state.registerInfo = action.payload;
      state.isLoggedIn = true;
      return state;
    });
    builder.addCase(checkDuplicateUsername.fulfilled, (state, action) => {
      state.duplicateUsername =
        Array.isArray(action.payload) && action.payload.length > 0;
      return state;
    });
    builder.addCase(checkDuplicateEmail.fulfilled, (state, action) => {
      state.duplicateEmail =
        Array.isArray(action.payload) && action.payload.length > 0;
      return state;
    });
  },
});
//reducers
export default registerSlice.reducer;
//actions
export const {
  selectRole,
  fillBasicInfo,
  fillPassword,
  fillConfirmPassword,
  fillCountry,
  fillGender,
  fillEmail,
  fillAvatar,
} = registerSlice.actions;
//selectors
export const selectBasicInfo = (state: registerState) =>
  state.registerAccount.registerInfo;
export const selectPassword = (state: registerState) =>
  state.registerAccount.password;
export const selectConfirmPassword = (state: registerState) =>
  state.registerAccount.confirmPassword;
export const selectDateOfBirth = (state: registerState) => {
  return state.registerAccount.registerInfo.dateOfBirth;
};
export const seletGender = (state: registerState) => {
  return state.registerAccount.registerInfo.gender;
};
export const selectCountry = (state: registerState) => {
  return state.registerAccount.registerInfo.country;
};
export const selectEmail = (state: registerState) => {
  return state.registerAccount.registerInfo.email;
};
export const selectInvalidEmail = (state: registerState) => {
  return !validateEmail(state.registerAccount.registerInfo.email);
};
export const selectAccountFilled = (state: registerState) => {
  const { email } = state.registerAccount.registerInfo;
  const { password, confirmPassword } = state.registerAccount;
  if (email && password && confirmPassword && password === confirmPassword) {
    return true;
  }
  return false;
};
export const selectIsBasicInfoFilled = (state: registerState) => {
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { dateOfBirth, username } = state.registerAccount.registerInfo;
  const { duplicateUsername } = state.registerAccount;
  // const invalid = !emailRegex.test(email);
  const invalid =
    !dateOfBirth || !username || username.length < 3 || duplicateUsername;
  // return email && username && !invalid;
  return !invalid;
};
export const selectIsPasswordValid = (state: registerState) => {
  const { password, confirmPassword } = state.registerAccount;
  return password && password.length >= 8 && password === confirmPassword;
};
export const selectDuplicateBasicInfo = (state: registerState) => {
  return state.registerAccount.duplicateBasicInfo;
};
export const selectDuplicateEmail = (state: registerState) => {
  return state.registerAccount.duplicateEmail;
};
export const selectDuplicateUsername = (state: registerState) => {
  return state.registerAccount.duplicateUsername;
};
export const selectIsDetailsFilled = (state: registerState) => {
  const { country, gender } = state.registerAccount.registerInfo;
  return country !== null && gender !== null;
};
export const selectedAvatar = (state: registerState) => {
  return state.registerAccount.registerInfo.avatar;
};
function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
type registerState = {
  registerAccount: {
    registerInfo: {
      role: string;
      email: string;
      username: string;
      dateOfBirth: string;
      country: ICountryType | null;
      gender: { label: string; id: number } | null;
      avatar: {
        id: string;
        name: string;
        type: string;
        size: number;
        lastModified: number;
      } | null;
    };
    confirmPassword: string;
    password: string;
    isLoggedIn: boolean;
    error: null;
    duplicateEmail: boolean;
    duplicateUsername: boolean;
  };
};
