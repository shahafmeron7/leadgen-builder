import React from 'react'
// import styles from './AppWrapper.module.css'
const AppWrapper = ({children}) => {
  return (
    <div style={{height:"100%"}}>
      {children}
    </div>
  )
}

export default AppWrapper