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

      const token = response.data.token;
      console.log(response);
      console.log('submission succeed!');
      localStorage.setItem('avatar', '');
      localStorage.setItem('access_token', token);
    } catch (error) {
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
const registerSlice = createSlice({
  name: 'registerSlice',
  initialState: {
    registerInfo: {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: daysjs().format('1988-06-25'),
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
    fillBasicInfo: (state, action) => {
      state.registerInfo.email = action.payload.email;
      state.registerInfo.firstName = action.payload.firstName;
      state.registerInfo.lastName = action.payload.lastName;
      state.registerInfo.dateOfBirth = action.payload.dateOfBirth;
      return state;
    },
    fillFirstName: (state, action) => {
      state.registerInfo.firstName = action.payload;
      return state;
    },
    fillLastName: (state, action) => {
      state.registerInfo.lastName = action.payload;
      return state;
    },
    fillDateOfBirth: (state, action) => {
      state.registerInfo.dateOfBirth = action.payload;
      return state;
    },
    fillPassword: (state, action) => {
      state.password = action.payload;
      return state;
    },
    fillConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
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
    cacheState: (state) => {
      localStorage.setItem('registerAccount', JSON.stringify(state));
      return state;
    },
    restoreState: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.fulfilled, (state) => {
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
  fillFirstName,
  fillLastName,
  fillBasicInfo,
  fillPassword,
  fillConfirmPassword,
  fillCountry,
  fillGender,
  fillEmail,
  fillAvatar,
  fillDateOfBirth,
  cacheState,
  restoreState,
} = registerSlice.actions;
//selectors
export const selectRegisterState = (state: registerState) =>
  state.registerAccount;
export const selectFirstName = (state: registerState) => {
  return state.registerAccount.registerInfo.firstName;
};
export const selectLastName = (state: registerState) => {
  return state.registerAccount.registerInfo.lastName;
};
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
export const selectIsDateOfBirthValid = (state: registerState) => {
  const { dateOfBirth } = state.registerAccount.registerInfo;
  if (dateOfBirth) {
    const today = new Date().getTime();
    const selectedDate = new Date(dateOfBirth).getTime();
    return selectedDate < today;
  }
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
  const { dateOfBirth, firstName, lastName } =
    state.registerAccount.registerInfo;
  const invalid =
    !dateOfBirth || firstName.length === 0 || lastName.length === 0;
  // return email && username && !invalid;
  return !invalid;
};
export const selectIsPasswordValid = (state: registerState) => {
  const { password, confirmPassword } = state.registerAccount;
  return password && password.length >= 8 && password === confirmPassword;
};
export const selectIsAccountInfoValid = (state: registerState) => {
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
  };
};
