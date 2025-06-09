import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography, IconButton, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ErrorPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Box>
      <IconButton
        disabled
        sx={{
          backgroundColor: theme.palette.error.main,
          '& .MuiSvgIcon-root': { color: 'white', fontSize: '4rem' },
        }}
      >
        <ErrorOutlineIcon />
      </IconButton>

      <Typography variant='body1' align='center'>
        {t('errorPageMsg')}
      </Typography>
      <Button onClick={() => navigate('/home')}>
        <Typography variant='body1'>{t('backToHome')}</Typography>
      </Button>
    </Box>
  );
}
