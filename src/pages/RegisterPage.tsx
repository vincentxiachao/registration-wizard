import { useEffect, useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerNewUser,
  selectIsAccountInfoValid,
  selectIsBasicInfoFilled,
  selectIsDetailsFilled,
} from '@features/account/registerSlice';
import { RegisterBasicInfo } from '@features/account/components/RegisterBasicInfo';
import { RegisterConfirm } from '@features/account/components/RegisterConfirm';

import type { AppDispatch } from '../store';
import { RegisterDetails } from '@features/account/components/RegisterDetails';
import { RegisterAccount } from '@features/account/components/RegisterAccount';

const steps = ['Basic Info', 'Details', 'Account', 'Confirmation'];
export default function RegisterPage() {
  const isBasicInfoFilled = useSelector(selectIsBasicInfoFilled);
  const isDetailsFilled = useSelector(selectIsDetailsFilled);
  const isAccountInfoValid = useSelector(selectIsAccountInfoValid);
  const [disableNext, setDisableNext] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
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
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleSubmit = () => {
    try {
      dispatch(registerNewUser());
    } catch (error) {
      console.log(error);
    }
  };
  const getStepTitle = (step: number) => {
    switch (step) {
      case 0:
        return 'Basic Info';
      case 1:
        return 'More information about yourself';
      case 2:
        return 'Account';
      case 3:
        return 'Confirmation';
      default:
        return 'Unknown step';
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <RegisterBasicInfo />;
      case 1:
        return <RegisterDetails />;
      case 2:
        return <RegisterAccount />;
      case 3:
        return <RegisterConfirm />;
      default:
        return '未知步骤';
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
            {getStepContent(activeStep)}
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box className='flex justify-end !mt-2 flex-0'>
              {activeStep > 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Previous
                </Button>
              )}
              <Button
                variant='contained'
                onClick={activeStep === 3 ? handleSubmit : handleNext}
                disabled={disableNext}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </main>
  );
}
