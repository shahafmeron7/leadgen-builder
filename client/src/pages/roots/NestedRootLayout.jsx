import React from 'react'
import { Outlet } from 'react-router-dom'
import NestedNavigation from '../../components/navigation/NestedNavigation'
const NestedRootLayout = ({links}) => {
  return (
    <>
    <NestedNavigation links={links}/>
    <Outlet/>
    </>
  )
}

export default NestedRootLayout