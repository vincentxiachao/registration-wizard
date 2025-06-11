import { Box, IconButton, SvgIcon } from '@mui/material';
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
      <IconButton
        aria-label='change language'
        className='cursor-pointer right-5 top-20 w-9 h-9 !absolute'
        size='large'
        onClick={() => {
          setEn(!en);
        }}
      >
        <SvgIcon
          sx={{ color: 'rgba(66,165,245)' }}
          aria-label='change language'
        >
          <GTranslateIcon />
        </SvgIcon>
      </IconButton>

      <Box className='h-full grid px-8 py-8'>
        <Outlet />
      </Box>
    </DashboardLayout>
  );
}
