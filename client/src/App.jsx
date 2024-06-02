import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from '@/pages/homepage/HomePage';

import AuthForm from '@/pages/auth/AuthForm';
import AuthenticatedRoute from '@/components/routes/AuthenticatedRoute';
import MainLayout from '@/pages/MainLayout';
import LeadgensPage,{loader as fetchLeadgens} from '@/pages/leadgens/LeadgensPage';
import NewLeadgenPage , {createLeadgenAction} from '@/pages/leadgens/NewLeadgenPage';
import ErrorPage from '@/pages/errors/ErrorPage';
import LeadgenDetailPage from '@/pages/leadgens/LeadgenDetailPage';
import LeadgensRootLayout from '@/pages/leadgens/LeadgensRootLayout'
import NestedRootLayout from './pages/roots/NestedRootLayout';
import { leadgensLinks, usersLinks } from './utils/data/links';
import UsersPage ,{loader as fetchUsers} from '@/pages/users/UsersPage'
import UserDetailPage from '@/pages/users/UserDetailPage'
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
          <MainLayout />
        </AuthenticatedRoute>
      ),
      errorElement: <ErrorPage/>,
      children:[
        {
          index:true,
          element:<HomePage/>
        },
        {
          path:'leadgens',
          element: <NestedRootLayout links={leadgensLinks}/>,
          children:[
            {
              index:true,
              element:<LeadgensPage/>,
              loader: fetchLeadgens,
            },
            {
              path:':leadgenId',
              element:<LeadgenDetailPage/>
            },
            {
              
                path:'new',
                element:<NewLeadgenPage/>,
                action: createLeadgenAction
            }
          ]
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
    <RouterProvider router={router} />
  );
};

export default App;
