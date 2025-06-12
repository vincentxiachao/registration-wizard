import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import { ErrorPage } from './pages/ErrorPage';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n';
import { store as rootStore } from './store';
import RegisterPage from './pages/RegisterPage';
import { Provider } from 'react-redux';
import { redirect } from 'react-router-dom';

const LazyBasicInfo = lazy(() =>
  import('@features/account/components/RegisterBasicInfo').then(
    ({ RegisterBasicInfo }) => ({ default: RegisterBasicInfo })
  )
);
const LazyDetails = lazy(() =>
  import('@features/account/components/RegisterDetails').then(
    ({ RegisterDetails }) => ({ default: RegisterDetails })
  )
);
const LazyAccount = lazy(() =>
  import('@features/account/components/RegisterAccount').then(
    ({ RegisterAccount }) => ({ default: RegisterAccount })
  )
);
const LazyConfirm = lazy(() =>
  import('@features/account/components/RegisterConfirm').then(
    ({ RegisterConfirm }) => ({ default: RegisterConfirm })
  )
);

const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        Component: Layout,
        errorElement: <ErrorPage />,
        children: [
          { index: true, path: 'home', Component: Home },
          {
            path: 'register',
            Component: RegisterPage,
            children: [
              {
                index: true,
                path: 'basic-info',
                element: (
                  <Suspense fallback={<div>loading...</div>}>
                    <LazyBasicInfo />
                  </Suspense>
                ),
              },
              {
                path: 'details',
                element: (
                  <Suspense fallback={<div>loading...</div>}>
                    <LazyDetails />
                  </Suspense>
                ),
              },
              {
                path: 'account',
                element: (
                  <Suspense fallback={<div>loading...</div>}>
                    <LazyAccount />
                  </Suspense>
                ),
              },
              {
                path: 'confirm',
                element: (
                  <Suspense fallback={<div>loading...</div>}>
                    <LazyConfirm />
                  </Suspense>
                ),
              },
            ],
          },
          { path: '', loader: () => redirect('/home') },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={rootStore}>
        <RouterProvider router={router} />
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
