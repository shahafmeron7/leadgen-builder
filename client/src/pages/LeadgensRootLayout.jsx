import React from 'react'
import { Outlet } from 'react-router-dom'
import LeadgensNavigation from '@/components/LeadgensNavigation'
const LeadgensRootLayout = () => {
  return (
    <>
    <LeadgensNavigation/>
    

    <Outlet/>
    </>
  )
}

export default LeadgensRootLayout