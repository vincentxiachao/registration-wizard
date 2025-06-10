import { Box, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { useEffect, useState } from 'react';
import i18n from '../i18n';

export default function Layout() {
  const [en, setEn] = useState(true);
  useEffect(() => {
    i18n.changeLanguage(en ? 'en' : 'zh-cn');
  }, [en]); // State to track language selection
  return (
    <DashboardLayout>
      <SvgIcon
        sx={{ color: 'rgba(17, 95, 185, 0.54)' }}
        className='cursor-pointer right-6 top-20 fixed'
        aria-label='change language'
        onClick={() => {
          setEn(!en);
        }}
      >
        <GTranslateIcon />
      </SvgIcon>
      <Box className='h-full grid px-8 py-8'>
        <Outlet />
      </Box>
    </DashboardLayout>
  );
}
