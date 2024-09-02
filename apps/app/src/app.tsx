import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ServicesScreen, SignUpScreen } from './screens';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ServicesScreen />,
  },
  {
    path: '/sign-up',
    element: <SignUpScreen />,
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
