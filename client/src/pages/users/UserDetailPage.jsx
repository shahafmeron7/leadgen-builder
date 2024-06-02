import React ,{useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetchData from '@/hooks/useFetchData';
import { baseUsersURL } from '@/utils/data/url';
const LeadgenDetailPage = () => {
   const {userId} = useParams();
   const navigate = useNavigate();

   const [deleteError,setDeleteError] = useState()
   const {data,
    isLoading,
    error} = useFetchData(baseUsersURL+userId)
    
   //  const handleDelete = async () => {
   //    try {
   //      console.log(`Attempting to delete leadgen with id: ${userId}`);
   //      const res = await fetch(`${baseAuthURL}${userId}`, { method: 'DELETE' });
   //      console.log('Response:', res);
  
   //      if (!res.ok) {
   //        const errorData = await res.json();
   //        console.error('Error response:', errorData);
   //        throw new Error(errorData.message || 'Failed to delete the leadgen');
   //      }
  
   //      const data = await res.json();
   //      console.log('Delete response:', data.message);
   //      navigate('/leadgens');
   //    } catch (err) {
   //      console.error('Delete error:', err);
   //      setDeleteError(err.message);
   //    }
   //  };
   
   if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <>
      <h1>User Details</h1>
      <p>id: {data._id}</p>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>
        <Link to=".." onClick={() => navigate(-1)}>Back</Link>
      </p>
    </>
  );
}

export default LeadgenDetailPage