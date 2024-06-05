import React from 'react'
import LeadgensList from '@/components/leadgen/LeadgensList'
import { useLoaderData,redirect,json, Outlet } from 'react-router-dom'
import { baseLeadgensURL } from '../../utils/data/url'
import ContentLayout from '@/layouts/ContentLayout'

const LeadgensPage = () => {

  const fetchedLeadgens = useLoaderData();
  const onDelete = ()=>{

  }
  return (
    <ContentLayout pageName="All Leadgens">
    <LeadgensList leadgens={fetchedLeadgens} onDelete={onDelete}/>
    <Outlet/>
    </ContentLayout>
  )
}

export default LeadgensPage
export async function loader(){

  const token = localStorage.getItem('token'); 
  if(!token) return redirect('/login')
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