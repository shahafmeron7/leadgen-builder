import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import AuthenticatedRoute from '@/components/AuthenticatedRoute';
import MainLayout from '@/pages/MainLayout';
import LeadgensPage,{loader as fetchLeadgens} from '@/pages/LeadgensPage';
import NewLeadgenPage from '@/pages/NewLeadgenPage';
import ErrorPage from '@/pages/ErrorPage';
import LeadgenDetailPage from '@/pages/LeadgenDetailPage';
import LeadgensRootLayout from '@/pages/LeadgensRootLayout'

const App = () => {
  

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
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
          element: <LeadgensRootLayout/>,
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
                element:<NewLeadgenPage/>
            }
          ]
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
