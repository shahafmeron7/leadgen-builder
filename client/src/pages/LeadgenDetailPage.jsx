import React from 'react'
import { useParams,Link } from 'react-router-dom';

const LeadgenDetailPage = () => {
   const params = useParams();

  return (
    <>
      <h1>Leadgen Details</h1>
      <p>id: {params.leadgenId}</p>
      <p>
         <Link to='..' relative='path'>Back</Link>
      </p>
    </>
  )
}

export default LeadgenDetailPage