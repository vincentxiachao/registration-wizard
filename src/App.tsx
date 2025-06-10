import { useEffect } from 'react';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationOutlined from '@mui/icons-material/AppRegistrationOutlined';
import { type Navigation } from '@toolpad/core';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const lang = urlParams.get('lang') || 'en';

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  const sideNav: Navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'home', // This will be the segment in the URL, e.g. /hom
      title: `${t('home')}`,
      icon: <DashboardIcon />,
    },
    {
      segment: 'register',
      title: 'Register',
      icon: <AppRegistrationOutlined />,
    },
  ];

  const branding = {
    logo: <img src='./public/logo.png' alt='Payoneer' />,
    title: 'Payoneer assignment',
    homeUrl: '/home',
  };
  return (
    <ReactRouterAppProvider navigation={sideNav} branding={branding}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}

export default App;
