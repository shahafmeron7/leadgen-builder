import React from 'react'
import { Link } from 'react-router-dom'

const LeadgensList = ({leadgens}) => {
  return (
    <>
      {leadgens.map((leadgen)=>(
        <div key={leadgen.token}>
        <h2>{leadgen.title}</h2>
        <p>{leadgen.token}</p>
          <Link to={`/leadgens/${leadgen.token}`}>View Leadgen</Link>
        </div>
      ))}
    </>
  )
}

export default LeadgensList