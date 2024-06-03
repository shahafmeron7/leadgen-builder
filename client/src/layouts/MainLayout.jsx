import React from 'react'
import styles from './MainLayout.module.css'
 import { Outlet } from 'react-router-dom'

import NavigationMenu from '@/components/navigation/NavigationMenu'
const MainLayout = ({children}) => {
  return (
    <>
  <NavigationMenu/>
    <main className={styles.mainLayout}>
    <Outlet>
      
      {children}

    </Outlet>
    </main>
    </>
  )
}

export default MainLayout