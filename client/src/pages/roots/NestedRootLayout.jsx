import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomNavigation from '../../components/navigation/CustomNavigation'
const NestedRootLayout = ({links}) => {
  return (
    <>
    <CustomNavigation links={links}/>
    <Outlet/>
    </>
  )
}

export default NestedRootLayout