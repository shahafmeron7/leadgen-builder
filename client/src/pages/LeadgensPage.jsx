import React from 'react'
import { Link } from 'react-router-dom'
const leadgens = [

  {
    id:'1', title: 'leadgen 1'
  },

  {
    id:'2', title: 'leadgen 2'
  },

  {
    id:'3', title: 'leadgen 3'
  }
]
const LeadgensPage = () => {
  return (
    <>
    <h1>All Leadgen</h1>
    <ul>
      {leadgens.map((leadgen)=>(
        <li key={leadgen.id}>
          <Link to={`/leadgens/${leadgen.id}`}>{leadgen.title}</Link>
        </li>
      ))}
    </ul>
    
    </>
  )
}

export default LeadgensPage