import React from 'react'
import { Outlet } from 'react-router-dom'
import NestedNavigation from '../../components/navigation/NestedNavigation'
const NestedRootLayout = ({links}) => {
  return (
    <div>
    <NestedNavigation links={links}/>
    <Outlet/>
    </div>
  )
}

export default NestedRootLayout