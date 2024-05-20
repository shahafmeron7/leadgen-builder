import React from 'react'
import LeadgensList from '@/components/LeadgensList'
import { useLoaderData } from 'react-router-dom'
const fetchURL = 'http://localhost:5000/api/leadgens'

const LeadgensPage = () => {
 
  const fetchedLeadgens = useLoaderData();

  return (
    <>
    <h1>All Leadgen</h1>
    <LeadgensList leadgens={fetchedLeadgens}/>
    </>
  )
}

export default LeadgensPage
export async function loader(){

    const response = await fetch(fetchURL);
    if(!response.ok){
      throw json(
        {message:'Could not fetch leadgens.'},
        {status:500}
      )
    }
    return response;


}