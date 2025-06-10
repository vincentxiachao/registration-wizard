import { Box, TextField, Typography } from '@mui/material';
import { selectBasicInfo } from '../registerSlice';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export const RegisterConfirm = () => {
  const basicInfo = useSelector(selectBasicInfo);
  const { t } = useTranslation();
  return (
    <>
      <Box className='flex h-full flex-col content-center justify-center'>
        {Object.entries(basicInfo).map(([key, value]) => (
          <Typography variant='h5' className='mb-4'>
            {t(key)}: {value}
          </Typography>
        ))}
      </Box>
    </>
  );
};
