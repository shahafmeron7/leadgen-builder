import React from 'react'
import { Link } from 'react-router-dom'

const UsersList = ({users}) => {
  return (
    <>
      {users.map((user)=>(
        <div key={user._id}>
        <h2>{user.title}</h2>
      
          <Link to={`/users/${user._id}`}>{user.name}</Link>
        </div>
      ))}
    </>
  )
}

export default UsersList