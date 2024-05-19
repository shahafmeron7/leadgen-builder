import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import AuthenticatedRoute from '@/components/AuthenticatedRoute';
import MainLayout from '@/pages/MainLayout';
import LeadgensPage from '@/pages/LeadgensPage';
import NewLeadgenPage from '@/pages/NewLeadgenPage';
import ErrorPage from '@/pages/ErrorPage';
import LeadgenDetailPage from '@/pages/LeadgenDetailPage';
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
          path:'',
          element:<HomePage/>
        },
        {
          path:'/leadgens',
          element:<LeadgensPage/>
        },
        {
          path:'/leadgens/:leadgenId',
          element:<LeadgenDetailPage/>
        },
        {
          
            path:'/new-leadgen',
            element:<NewLeadgenPage/>
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
