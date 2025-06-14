import { useEffect } from 'react';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationOutlined from '@mui/icons-material/AppRegistrationOutlined';
import { type Navigation } from '@toolpad/core';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
function App() {
  const { t } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const lang = urlParams.get('lang') || 'en';
    i18n.changeLanguage(lang);
  }, []);

  const sideNav: Navigation = [
    {
      segment: 'home', // This will be the segment in the URL, e.g. /hom
      title: `${t('home')}`,
      icon: <DashboardIcon />,
    },
    {
      segment: 'register',
      title: `${t('register')}`,
      icon: <AppRegistrationOutlined />,
    },
  ];

  const branding = {
    logo: (
      <img
        src='./public/vite.svg'
        className='self-end w-5 h-5'
        alt='Registration Wizard'
      />
    ),
    title: `${t('appName')}`,
    homeUrl: '/home',
  };
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ReactRouterAppProvider navigation={sideNav} branding={branding}>
        <Outlet />
      </ReactRouterAppProvider>
    </ErrorBoundary>
  );
}

export default App;
