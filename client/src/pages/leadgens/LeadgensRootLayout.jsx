import React from 'react'
import { Outlet } from 'react-router-dom'
import LeadgensNavigation from '@/components/navigation/LeadgensNavigation'
const LeadgensRootLayout = () => {
  return (
    <>
    <LeadgensNavigation/>
    

    <Outlet/>
    </>
  )
}

export default LeadgensRootLayout