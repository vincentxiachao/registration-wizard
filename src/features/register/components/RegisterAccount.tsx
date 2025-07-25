import { Box, SvgIcon, TextField, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPassword,
  selectConfirmPassword,
  selectEmail,
  checkDuplicateEmail,
  selectDuplicateEmail,
  selectInvalidEmail,
  fillAccount,
} from '../registerSlice';
import type { AppDispatch } from '../../../store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const RegisterAccount = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const password = useSelector(selectPassword);
  const confirmPassword = useSelector(selectConfirmPassword);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const email = useSelector(selectEmail);
  const duplicateEmail = useSelector(selectDuplicateEmail);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State to track password visibility
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false); // State to track password visibility

  useEffect(() => {
    setInvalidPassword(!!password && password.length < 8);
    setNotMatch(password !== confirmPassword);
  }, [password, confirmPassword]);
  const onEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      dispatch(fillAccount({ newValue: e.target.value, type: 'EDIT_EMAIL' }))
    );
  };
  const invalidEmail = useSelector(selectInvalidEmail);

  const onEmailBlur = () => {
    setEmailTouched(true);
    dispatch(checkDuplicateEmail());
  };
  const handleFillPassword = (password: string) => {
    dispatch(fillAccount({ newValue: password, type: 'EDIT_PASSWORD' }));
  };
  const handleFillConfirmPassword = (confirmPassword: string) => {
    dispatch(
      fillAccount({ newValue: confirmPassword, type: 'EDIT_CONFIRM_PASSWORD' })
    );
  };

  return (
    <>
      <Box className='flex h-full flex-col items-center content-center justify-center'>
        <Stack className='w-1/2 ' spacing={2}>
          <TextField
            label='E-mail'
            className='mb-4 '
            name='email'
            type='email'
            value={email}
            onChange={(e) => onEmailChange(e)}
            onBlur={() => onEmailBlur()}
            margin='normal'
            required
            variant='standard'
            helperText={
              invalidEmail && emailTouched
                ? `${t('invalidEmail')}`
                : duplicateEmail
                  ? `${t('emailAlreadyExists')}`
                  : ''
            }
            error={(invalidEmail && emailTouched) || duplicateEmail}
          />
          <div className='flex flex-row items-baseline'>
            <TextField
              label={t('password')}
              name='password'
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleFillPassword(e.target.value)}
              className='mb-4 w-full'
              margin='normal'
              error={invalidPassword}
              variant='standard'
              helperText={invalidPassword ? `${t('passwordTooShort')}` : ''}
            />
            <SvgIcon
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              className='cursor-pointer'
              aria-label={`password visibility, ${passwordVisible ? 'hide password' : 'show password'}`}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </SvgIcon>
          </div>
          <div className='flex flex-row items-baseline'>
            <TextField
              label={t('confirmPassword')}
              name='confirmPassword'
              type={confirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => handleFillConfirmPassword(e.target.value)}
              onBlur={() => {
                setConfirmPasswordTouched(true);
              }}
              className='mb-4 w-full'
              margin='normal'
              variant='standard'
              error={notMatch && confirmPasswordTouched}
              helperText={
                notMatch && confirmPasswordTouched
                  ? `${t('passwordNotMatch')}`
                  : ''
              }
            />
            <SvgIcon
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              className='cursor-pointer'
              aria-label={`password visibility, ${confirmPasswordVisible ? 'hide password' : 'show password'}`}
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )}
            </SvgIcon>
          </div>
        </Stack>
      </Box>
    </>
  );
};
