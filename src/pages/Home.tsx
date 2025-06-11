import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <Box className='h-full w-full flex items-center justify-center'>
      <Typography variant='h3'>{t('appName')}</Typography>
    </Box>
  );
}
