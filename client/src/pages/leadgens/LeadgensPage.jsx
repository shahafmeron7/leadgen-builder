import React from 'react'
import LeadgensList from '@/components/leadgen/LeadgensList'
import { useLoaderData,json } from 'react-router-dom'
import { baseLeadgensURL } from '../../utils/data/url'

const LeadgensPage = () => {
 
  const fetchedLeadgens = useLoaderData();
  const onDelete = ()=>{

  }
  return (
    <>
    <h1>All Leadgen</h1>
    <LeadgensList leadgens={fetchedLeadgens} onDelete={onDelete}/>
    </>
  )
}

export default LeadgensPage
export async function loader(){

  const token = localStorage.getItem('token'); 
  const response = await fetch(baseLeadgensURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token, 
    },
  });
    if(!response.ok){
      throw json(
        {message:'Could not fetch leadgens.'},
        {status:500}
      )
    }
    return response;


}