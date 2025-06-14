import { Step, StepLabel, Box, Button } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import { useTranslation } from 'react-i18next';

export type RegisterFooterProps = {
  steps: string[];
  activeStep: number;
  disableNext: boolean;
  submissionDone: boolean;
  testIdPrefix: string;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
};
export const RegisterFooter = ({
  steps,
  activeStep,
  disableNext,
  submissionDone,
  handleBack,
  handleNext,
  handleSubmit,
  testIdPrefix,
}: RegisterFooterProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        className='flex justify-end !mt-2 flex-0'
        data-testid={`${testIdPrefix}-button-container`}
      >
        {activeStep > 0 && (
          <Button
            data-testid={`${testIdPrefix}-previous-button`}
            onClick={handleBack}
            sx={{ mr: 1 }}
            disabled={submissionDone}
          >
            {t('previous')}
          </Button>
        )}
        <Button
          variant='contained'
          data-testid={`${testIdPrefix}-next-submit-button`}
          onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          disabled={disableNext || submissionDone}
        >
          {activeStep === steps.length - 1 ? `${t('submit')}` : `${t('next')}`}
        </Button>
        {/* <MyButton
          variant='contained'
          data-testid={`${testIdPrefix}-next-submit-button`}
          onClick={activeStep === 3 ? handleSubmit : handleNext}
          disabled={disableNext || submissionDone}
        >
          {activeStep === steps.length - 1 ? `${t('submit')}` : `${t('next')}`}
        </MyButton> */}
      </Box>
    </>
  );
};
