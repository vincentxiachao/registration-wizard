import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post } from '../../utils/apiInterceptor';
import { type RootState } from '../../store';
import daysjs from 'dayjs';
import type { ICountryType } from '@utils/interfaces/countryType';
export const registerNewUser = createAsyncThunk(
  'registerSlice/registerNewUser',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const stateBody = state.registerAccount.registerInfo;
      const submitBody = {
        password: encrypt(state.registerAccount.password),
        ...stateBody,
      };
      const response = await post('registerNewUser', submitBody);
      console.log(response);
      console.log('submission succeed!');
      localStorage.clear();
      localStorage.setItem('avatar', '');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
function encrypt(data: string) {
  return 'fake-encryption' + data;
}
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
const initialState: RegisterState = {
  registerInfo: {
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: daysjs().format('1988-06-25'),
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
};
const registerSlice = createSlice({
  name: 'registerAccount',
  initialState: initialState,
  reducers: {
    fillBasicInfo: (state, action) => {
      switch (action.payload.type) {
        case 'EDIT_FIRST_NAME': {
          state.registerInfo.firstName = action.payload.newValue;
          return state;
        }
        case 'EDIT_LAST_NAME': {
          state.registerInfo.lastName = action.payload.newValue;
          return state;
        }
        case 'EDIT_EMAIL': {
          state.registerInfo.email = action.payload.newValue;
          return state;
        }
        default:
          return state;
      }
    },
    fillDetails: (state, action) => {
      switch (action.payload.type) {
        case 'EDIT_COUNTRY': {
          state.registerInfo.country = action.payload.newValue;
          return state;
        }
        case 'EDIT_GENDER': {
          state.registerInfo.gender = action.payload.newValue;
          return state;
        }
        case 'EDIT_AVATAR': {
          state.registerInfo.avatar = action.payload.newValue;
          return state;
        }
        default:
          return state;
      }
    },
    fillAccount: (state, action) => {
      switch (action.payload.type) {
        case 'EDIT_EMAIL': {
          state.registerInfo.email = action.payload.newValue;
          return state;
        }
        case 'EDIT_PASSWORD': {
          state.password = action.payload.newValue;
          return state;
        }
        case 'EDIT_CONFIRM_PASSWORD': {
          state.confirmPassword = action.payload.newValue;
          return state;
        }
        default:
          return state;
      }
    },
    fillEmail: (state, action) => {
      state.registerInfo.email = action.payload;
      return state;
    },
    fillAvatar: (state, action) => {
      state.registerInfo.avatar = action.payload;
      return state;
    },
    cacheState: (state) => {
      localStorage.setItem('registerAccount', JSON.stringify(state));
      return state;
    },
    restoreState: (state, action) => {
      state = action.payload;
      return state;
    },
    resetState: (state) => {
      state = { ...initialState };

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.fulfilled, (state) => {
      state.submitSucceed = true;
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
  fillBasicInfo,
  fillDetails,
  fillAccount,
  fillAvatar,
  cacheState,
  restoreState,
  resetState,
} = registerSlice.actions;
//selectors
export const selectRegisterState = (state: RootState) => state.registerAccount;
export const selectFirstName = (state: RootState) => {
  return state.registerAccount.registerInfo.firstName;
};
export const selectLastName = (state: RootState) => {
  return state.registerAccount.registerInfo.lastName;
};
export const selectPassword = (state: RootState) =>
  state.registerAccount.password;
export const selectConfirmPassword = (state: RootState) =>
  state.registerAccount.confirmPassword;
export const selectDateOfBirth = (state: RootState) => {
  return state.registerAccount.registerInfo.dateOfBirth;
};
export const selectGender = (state: RootState) => {
  return state.registerAccount.registerInfo.gender;
};
export const selectCountry = (state: RootState) => {
  return state.registerAccount.registerInfo.country;
};
export const selectEmail = (state: RootState) => {
  return state.registerAccount.registerInfo.email;
};
export const selectSubmitSuccess = (state: RootState) => {
  return state.registerAccount.submitSucceed;
};
export const selectIsDateOfBirthValid = (state: RootState) => {
  const { dateOfBirth } = state.registerAccount.registerInfo;
  if (dateOfBirth) {
    const today = new Date().getTime();
    const selectedDate = new Date(dateOfBirth).getTime();
    return selectedDate < today;
  }
};
export const selectInvalidEmail = (state: RootState) => {
  return !validateEmail(state.registerAccount.registerInfo.email);
};
export const selectAccountFilled = (state: RootState) => {
  const { email } = state.registerAccount.registerInfo;
  const { password, confirmPassword } = state.registerAccount;
  if (email && password && confirmPassword && password === confirmPassword) {
    return true;
  }
  return false;
};
export const selectIsBasicInfoFilled = (state: RootState) => {
  const { dateOfBirth, firstName, lastName } =
    state.registerAccount.registerInfo;
  const invalid =
    !dateOfBirth || firstName.length === 0 || lastName.length === 0;
  // return email && username && !invalid;
  return !invalid;
};
export const selectIsPasswordValid = (state: RootState) => {
  const { password, confirmPassword } = state.registerAccount;
  return password && password.length >= 8 && password === confirmPassword;
};
export const selectIsAccountInfoValid = (state: RootState) => {
  const { password, confirmPassword } = state.registerAccount;
  const { email } = state.registerAccount.registerInfo;
  const duplicateEmail = state.registerAccount.duplicateEmail;
  const valid =
    validateEmail(email) &&
    !duplicateEmail &&
    password.length >= 8 &&
    password === confirmPassword;
  return valid;
};

export const selectDuplicateEmail = (state: RootState) => {
  return state.registerAccount.duplicateEmail;
};
export const selectDuplicateUsername = (state: RootState) => {
  return state.registerAccount.duplicateUsername;
};
export const selectIsDetailsFilled = (state: RootState) => {
  const { country, gender } = state.registerAccount.registerInfo;
  return country !== null && gender !== null;
};
export const selectedAvatar = (state: RootState) => {
  return state.registerAccount.registerInfo.avatar;
};
function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
export type RegisterState = {
  registerInfo: {
    email: string;
    firstName: string;
    lastName: string;
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
  submitSucceed: boolean;
};
