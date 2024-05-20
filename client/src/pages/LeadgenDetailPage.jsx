import React from 'react'
import { useParams,Link } from 'react-router-dom';
import useFetchData from '@/hooks/useFetchData';
import { baseURL } from '@/utils/data/url';
const LeadgenDetailPage = () => {
   const {leadgenId} = useParams();
   const {leadgenData,
    isLoading,
    error} = useFetchData(baseURL+leadgenId)
   
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