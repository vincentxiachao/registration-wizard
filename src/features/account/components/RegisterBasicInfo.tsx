import { Box, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store';
import {
  checkDuplicateUsername,
  fillBasicInfo,
  selectBasicInfo,
  selectDateOfBirth,
  selectDuplicateBasicInfo,
  selectDuplicateUsername,
} from '../registerSlice';
import { usePreventDefault } from '@utils/hooks/usePreventDefault';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import type { PickerValue } from 'node_modules/@mui/x-date-pickers/esm/internals/models/value';
export const RegisterBasicInfo = () => {
  const username = useSelector(selectBasicInfo).username;
  const dateOfBirth = useSelector(selectBasicInfo).dateOfBirth;
  const isDuplicateUsername = useSelector(selectDuplicateUsername);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const basicInfo = useSelector(selectBasicInfo);
  const dispatch = useDispatch<AppDispatch>();

  const onUserNameChange = usePreventDefault(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(fillBasicInfo({ ...basicInfo, username: e.target.value }));
    }
  );

  const { t } = useTranslation();
  const onUsernameBlur = () => {
    setUsernameTouched(true);
    dispatch(checkDuplicateUsername());
  };
  const onDateOfBirthChanged = (newVal: PickerValue) => {
    dispatch(
      fillBasicInfo({
        ...basicInfo,
        dateOfBirth: newVal?.format('YYYY-MM-DD'),
      })
    );
  };

  const urlParams = new URLSearchParams(location.search);
  const lang = urlParams.get('lang') || 'zh-cn';

  return (
    <>
      <Box className='flex h-full flex-col content-center justify-center'>
        <Stack className='w-1/2' spacing={2}>
          <TextField
            label={t('username')}
            name='username'
            value={username}
            onChange={(e) => onUserNameChange(e)}
            onBlur={() => onUsernameBlur()}
            margin='normal'
            variant='standard'
            required
            error={(isDuplicateUsername || username === '') && usernameTouched}
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
