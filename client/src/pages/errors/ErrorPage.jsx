import React from 'react'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { useRouteError } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

const ErrorPage = () => {
  const error = useRouteError();
  let title = 'An error occurd';
  let message = error.status === 500 ? error.data.message : 'Something went wrong';
  return (
    <>
      <NavigationMenu/>
      <MainLayout>

    
         <h1>an error occurd</h1>
         <p>{message}</p>
      
      </MainLayout>
    </>
  )
}

export default ErrorPage