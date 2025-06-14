import { Box, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store';
import {
  selectDateOfBirth,
  selectDuplicateUsername,
  selectFirstName,
  selectLastName,
  selectIsDateOfBirthValid,
  fillBasicInfo,
} from '../registerSlice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import type { PickerValue } from 'node_modules/@mui/x-date-pickers/esm/internals/models/value';
export const RegisterBasicInfo = () => {
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const dateOfBirth = useSelector(selectDateOfBirth);
  const isDuplicateUsername = useSelector(selectDuplicateUsername);
  const isDateValid = useSelector(selectIsDateOfBirthValid);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();
  const onFirstNameBlur = () => {
    setFirstNameTouched(true);
  };
  const onLastNameBlur = () => {
    setLastNameTouched(true);
  };
  const onFirstNameChanged = (newVal: string) => {
    dispatch(fillBasicInfo({ newValue: newVal, type: 'EDIT_FIRST_NAME' }));
  };
  const onLastNameChanged = (newVal: string) => {
    dispatch(fillBasicInfo({ newValue: newVal, type: 'EDIT_LAST_NAME' }));
  };
  const onDateOfBirthChanged = (newVal: PickerValue) => {
    dispatch(
      fillBasicInfo({
        newValue: newVal?.format('YYYY-MM-DD'),
        type: 'EDIT_DATE_OF_BIRTH',
      })
    );
  };

  const lang = useTranslation().i18n.language;

  return (
    <>
      <Box className='flex h-full flex-col content-center justify-center'>
        <Stack className='w-full items-center' spacing={10}>
          <TextField
            className='w-1/2'
            label={t('firstName')}
            name='firstName'
            value={firstName}
            onBlur={() => onFirstNameBlur()}
            onChange={(e) => onFirstNameChanged(e.target.value)}
            margin='normal'
            variant='standard'
            required
            data-testid='register-basic-first-name-input'
            error={firstName === '' && firstNameTouched}
            helperText={isDuplicateUsername ? t('duplicateUsername') : ''}
          />
          <TextField
            className='w-1/2'
            label={t('lastName')}
            name='lastName'
            value={lastName}
            onBlur={() => onLastNameBlur()}
            onChange={(e) => onLastNameChanged(e.target.value)}
            margin='normal'
            variant='standard'
            data-testid='register-basic-last-name-input'
            required
            error={lastName === '' && lastNameTouched}
            helperText={isDuplicateUsername ? t('duplicateUsername') : ''}
          />
          <div className='w-1/2'>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={lang}
            >
              <DatePicker
                className='w-10/14'
                label={t('dateOfBirth')}
                value={dayjs(dateOfBirth)}
                defaultValue={dayjs('')}
                onChange={(newValue) => onDateOfBirthChanged(newValue)}
              />
              {isDateValid ? (
                ''
              ) : (
                <Typography variant='subtitle1' sx={{ color: '#ff0000e6' }}>
                  {t('invalidDate')}
                </Typography>
              )}
            </LocalizationProvider>
          </div>
        </Stack>
      </Box>
    </>
  );
};
