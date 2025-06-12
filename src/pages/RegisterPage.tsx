import { useEffect, useState } from 'react';
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
} from '@features/account/registerSlice';

import type { AppDispatch } from '../store';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@utils/hooks/useDebounce';
import { Outlet, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
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
  useEffect(() => {
    try {
      const cache = localStorage.getItem('registerAccount');
      if (cache) {
        const cachedState = JSON.parse(cache ? cache : '');
        dispatch(restoreState(cachedState));
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      localStorage.setItem('avatar', '');
      dispatch(resetState());
    };
  }, []);
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
    }
  }, [submissionDone]);
  const stepperToUrlMap = new Map([
    [0, 'basic-info'],
    [1, 'details'],
    [2, 'account'],
    [3, 'confirm'],
  ]);
  useEffect(() => {
    navigate(`/register/${stepperToUrlMap.get(activeStep)}`);
  }, [activeStep]);
  const handleNext = () => {
    dispatch(cacheState());

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
  const getStepTitle = (step: number) => {
    switch (step) {
      case 0:
        return `${t('basicInfo')}`;
      case 1:
        return `${t('moreAboutYou')}`;
      case 2:
        return `${t('accountInfo')}`;
      case 3:
        return `${t('confirmation')}`;
      default:
        return `${t('unknown')}`;
    }
  };

  return (
    <main className='flex h-8/12 flex-col'>
      <Typography variant='h2' className='mb-4 flex items-end justify-between'>
        {getStepTitle(activeStep)}
      </Typography>
      <Box className='!mb-2 flex-1 flex flex-col'>
        {activeStep === steps.length ? (
          <Typography>Register Successfully!</Typography>
        ) : (
          <>
            <Outlet></Outlet>
            {/* {getStepContent(activeStep)} */}
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
}
