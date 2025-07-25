import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
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

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            path: 'home',
            element: <Home />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
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
