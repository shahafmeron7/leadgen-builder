import React from 'react'
import { Link } from 'react-router-dom'

const LeadgensList = ({leadgens}) => {
  return (
    <>
      {leadgens.map((leadgen)=>(
        <li key={leadgen.token}>
          <Link to={`/leadgens/${leadgen.token}`}>{leadgen.title}</Link>
        </li>
      ))}
    </>
  )
}

export default LeadgensList