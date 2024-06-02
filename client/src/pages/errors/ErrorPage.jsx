import React from 'react'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import style from '../MainLayout.module.css'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError();
  let title = 'An error occurd';
  let message = error.status === 500 ? error.data.message : 'Something went wrong';
  return (
    <>
      <NavigationMenu/>
      <main className={style.content}>
         <h1>an error occurd</h1>
         <p>{message}</p>
      </main>
    </>
  )
}

export default ErrorPage