import React, { PropsWithChildren } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '@demo-A/app-modules';

import { ServicesScreen, SignUpScreen, ProfileScreen } from './screens';

const AuthenticatedOnly: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const auth = useAuth();
  if (!auth.profile && auth.isProfileLoading) return null;
  if (!auth.profile) return <Navigate to="/sign-up" />;
  return children;
};

const NotAuthenticatedOnly: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const auth = useAuth();
  if (auth.profile) return <Navigate to="/" />;
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ServicesScreen />,
  },
  {
    path: '/sign-up',
    element: (
      <NotAuthenticatedOnly>
        <SignUpScreen />
      </NotAuthenticatedOnly>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthenticatedOnly>
        <ProfileScreen />
      </AuthenticatedOnly>
    ),
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
