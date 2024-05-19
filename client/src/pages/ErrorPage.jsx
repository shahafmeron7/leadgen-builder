import React from 'react'
import NavigationMenu from '@/components/NavigationMenu'
import style from './MainLayout.module.css'

const ErrorPage = () => {
  return (
    <>
      <NavigationMenu/>
      <main className={style.content}>
         <h1>an error occurd</h1>
         <p>could not find this page</p>
      </main>
    </>
  )
}

export default ErrorPage