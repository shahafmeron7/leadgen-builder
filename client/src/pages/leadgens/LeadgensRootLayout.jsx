import React from 'react'
import { Outlet } from 'react-router-dom'
import NestedNavigation from '@/components/navigation/NestedNavigation'
const LeadgensRootLayout = () => {
  return (
    <>
    <NestedNavigation/>
    

    <Outlet/>
    </>
  )
}

export default LeadgensRootLayout