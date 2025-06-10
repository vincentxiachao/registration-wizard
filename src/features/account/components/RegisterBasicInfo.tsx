import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store';
import {
  fillBasicInfo,
  fillFirstName,
  fillLastName,
  selectRegisterState,
  selectDateOfBirth,
  selectDuplicateUsername,
  selectFirstName,
  selectLastName,
  fillDateOfBirth,
} from '../registerSlice';
import { usePreventDefault } from '@utils/hooks/usePreventDefault';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import type { PickerValue } from 'node_modules/@mui/x-date-pickers/esm/internals/models/value';
export const RegisterBasicInfo = () => {
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const dateOfBirth = useSelector(selectDateOfBirth);
  const isDuplicateUsername = useSelector(selectDuplicateUsername);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const basicInfo = useSelector(selectRegisterState);
  const dispatch = useDispatch<AppDispatch>();

  const onUserNameChange = usePreventDefault(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(fillBasicInfo({ ...basicInfo, username: e.target.value }));
    }
  );

  const { t } = useTranslation();
  const onFirstNameBlur = () => {
    setFirstNameTouched(true);
  };
  const onLastNameBlur = () => {
    setLastNameTouched(true);
  };
  const onFirstNameChanged = (newVal: string) => {
    dispatch(fillFirstName(newVal));
  };
  const onLastNameChanged = (newVal: string) => {
    dispatch(fillLastName(newVal));
  };
  const onDateOfBirthChanged = (newVal: PickerValue) => {
    dispatch(fillDateOfBirth(newVal?.format('YYYY-MM-DD')));
  };

  const urlParams = new URLSearchParams(location.search);
  const lang = urlParams.get('lang') || 'zh-cn';

  return (
    <>
      <Box className='flex h-full flex-col content-center justify-center'>
        <Stack className='w-1/2' spacing={4}>
          <TextField
            label={t('firstName')}
            name='firstName'
            value={firstName}
            onBlur={() => onFirstNameBlur()}
            onChange={(e) => onFirstNameChanged(e.target.value)}
            margin='normal'
            variant='standard'
            required
            error={firstName === '' && firstNameTouched}
            helperText={isDuplicateUsername ? t('duplicateUsername') : ''}
          />
          <TextField
            label={t('lastName')}
            name='lastName'
            value={lastName}
            onBlur={() => onLastNameBlur()}
            onChange={(e) => onLastNameChanged(e.target.value)}
            margin='normal'
            variant='standard'
            required
            error={firstName === '' && firstNameTouched}
            helperText={isDuplicateUsername ? t('duplicateUsername') : ''}
          />
          <div>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={lang}
            >
              <DatePicker
                label={t('dateOfBirth')}
                value={dayjs(dateOfBirth)}
                defaultValue={dayjs('')}
                onChange={(newValue) => onDateOfBirthChanged(newValue)}
              />
            </LocalizationProvider>
          </div>
        </Stack>
      </Box>
    </>
  );
};
