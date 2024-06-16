import React from 'react';
import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom';
import './App.css';
import HomePage from '@/pages/homepage/HomePage';
import MainLayout from './layouts/MainLayout';
import AuthForm from '@/pages/auth/AuthForm';
import AuthenticatedRoute from '@/components/routes/AuthenticatedRoute';
import ContentLayout from './layouts/ContentLayout';
import LeadgensPage,{loader as fetchLeadgens} from '@/pages/leadgens/LeadgensPage';
import NewLeadgenPage , {createLeadgenAction} from '@/pages/leadgens/NewLeadgenPage';
import ErrorPage from '@/pages/errors/ErrorPage';
import LeadgenDetailPage from '@/pages/leadgens/LeadgenDetailPage';
import NestedRootLayout from './pages/roots/NestedRootLayout';
import { leadgensLinks } from '@/utils/data/links';
import { usersLinks } from '@/utils/data/links';

import UsersPage ,{loader as fetchUsers} from '@/pages/users/UsersPage'
import UserDetailPage from '@/pages/users/UserDetailPage'
import AppWrapper from './layouts/AppWrapper';
import { AuthProvider } from '@/context/AuthContext';

const App = () => {
  

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <AuthForm />,
    },
    {
      path: '/signup',
      element: <AuthForm />,
    },
    {
      path: '/',
      element: (
        <AuthenticatedRoute>
        <AppWrapper>
          <MainLayout />
        </AppWrapper>
        </AuthenticatedRoute>
      ),
      errorElement: <ErrorPage/>,
      children:[
        {
          index:true,
          element:<HomePage/>
        },
        {
          path: 'leadgens',
          element:  <Outlet /> ,
          children: [
            {
              path: 'list',
              element: <LeadgensPage />,
              loader: fetchLeadgens,
            },
            {
              path: 'details/:leadgenId',
              element: <LeadgenDetailPage />,
            },
            {
              path: 'new',
              element: <NewLeadgenPage />,
              action: createLeadgenAction,
            },
          ],
        },
        {
          path:'users',
          element: <NestedRootLayout links={usersLinks}/>,

          children:[
            {
              index:true,
              element:<UsersPage/>,
              loader: fetchUsers,

            },
             {
              path:':userId',
              element:<UserDetailPage/>
            }
          ]
        }
      ]
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
