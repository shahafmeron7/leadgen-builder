import React from 'react'
import UsersList from '@/components/users/UsersList'
import { useLoaderData,json } from 'react-router-dom'
import { baseUsersURL } from '@/utils/data/url'

const UsersPage = () => {
 
  const fetchedUsers = useLoaderData();
  const onDelete = ()=>{

  }
  return (
    <>
    <h1>All Users</h1>
    <UsersList users={fetchedUsers} onDelete={onDelete}/>
    </>
  )
}

export default UsersPage
export async function loader(){

  const token = localStorage.getItem('token'); 
  console.log(token);
  const response = await fetch(baseUsersURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token, 
    },
  });
    if(!response.ok){
      throw json(
        {message:'Could not fetch users.'},
        {status:500}
      )
    }
    return response;


}