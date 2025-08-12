import { lazy, Suspense, useEffect, useState, useTransition } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Snackbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  cacheState,
  registerNewUser,
  resetState,
  restoreState,
  selectIsAccountInfoValid,
  selectIsBasicInfoFilled,
  selectIsDetailsFilled,
  selectSubmitSuccess,
} from '@features/register/registerSlice';

import type { AppDispatch } from '../store';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@utils/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const LazyBasicInfo = lazy(() =>
  import('@features/register/components/RegisterBasicInfo').then(
    ({ RegisterBasicInfo }) => ({ default: RegisterBasicInfo })
  )
);
const LazyDetails = lazy(() =>
  import('@features/register/components/RegisterDetails').then(
    ({ RegisterDetails }) => ({ default: RegisterDetails })
  )
);
const LazyAccount = lazy(() =>
  import('@features/register/components/RegisterAccount').then(
    ({ RegisterAccount }) => ({ default: RegisterAccount })
  )
);
const LazyConfirm = lazy(() =>
  import('@features/register/components/RegisterConfirm').then(
    ({ RegisterConfirm }) => ({ default: RegisterConfirm })
  )
);
const RegisterPage = React.memo(function RegisterPage() {
  const { t } = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false); // State to control snackbar visibility
  const isBasicInfoFilled = useSelector(selectIsBasicInfoFilled);
  const isDetailsFilled = useSelector(selectIsDetailsFilled);
  const isAccountInfoValid = useSelector(selectIsAccountInfoValid);
  const submissionDone = useSelector(selectSubmitSuccess);
  const [disableNext, setDisableNext] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [isPending, goNext] = useTransition();
  useEffect(() => {
    try {
      const cache = localStorage.getItem('registerAccount');
      if (cache) {
        const cachedState = JSON.parse(cache);
        dispatch(restoreState(cachedState));
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      localStorage.setItem('avatar', '');
      dispatch(resetState());
    };
  }, [dispatch]);
  useEffect(() => {
    if (
      (isBasicInfoFilled && activeStep === 0) ||
      (isDetailsFilled && activeStep === 1) ||
      (isAccountInfoValid && activeStep === 2) ||
      activeStep === 3
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [isBasicInfoFilled, isDetailsFilled, isAccountInfoValid, activeStep]);
  useEffect(() => {
    if (submissionDone) {
      setShowSnackbar(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    }
  }, [submissionDone]);

  const handleNext = () => {
    goNext(() => {
      dispatch(cacheState());
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    });
  };
  const steps = [
    `${t('basicInfo')}`,
    `${t('details')}`,
    `${t('account')}`,
    `${t('confirmation')}`,
  ];

  const handleSubmit = useDebounce(() => {
    try {
      dispatch(registerNewUser());
    } catch (error) {
      setShowSnackbar(true);
      console.log(error);
    }
  });

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <LazyBasicInfo />;
      case 1:
        return <LazyDetails />;
      case 2:
        return <LazyAccount />;
      case 3:
        return <LazyConfirm />;
      default:
        return '未知步骤';
    }
  };
  return (
    <main className='flex h-8/12 flex-col'>
      <Typography
        variant='h2'
        className='mb-4 flex items-end justify-between'
      ></Typography>
      <Box className='!mb-2 flex-1 flex flex-col'>
        {activeStep === steps.length ? (
          <Typography>Register Successfully!</Typography>
        ) : (
          <>
            <Suspense>{getStepContent(activeStep)}</Suspense>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box className='flex justify-end !mt-2 flex-0'>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  disabled={submissionDone}
                >
                  {t('previous')}
                </Button>
              )}
              <Button
                variant='contained'
                className={isPending ? 'disabled' : ''}
                data-testid='register-page-next-submit-button'
                onClick={activeStep === 3 ? handleSubmit : handleNext}
                disabled={disableNext || submissionDone}
              >
                {activeStep === steps.length - 1
                  ? `${t('submit')}`
                  : `${t('next')}`}
              </Button>
            </Box>
          </>
        )}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={showSnackbar}
          message={`${t('submissionSuccess')}`}
          key={'bottomright'}
          onClose={() => setShowSnackbar(false)}
        />
      </Box>
    </main>
  );
});
export default RegisterPage;
