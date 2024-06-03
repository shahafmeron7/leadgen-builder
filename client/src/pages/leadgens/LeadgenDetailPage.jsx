import React ,{useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetchData from '@/hooks/useFetchData';
import { baseLeadgensURL } from '@/utils/data/url';
const LeadgenDetailPage = () => {
   const {leadgenId} = useParams();
   const navigate = useNavigate();

   const [deleteError,setDeleteError] = useState()
   const {data,
    isLoading,
    error} = useFetchData(baseLeadgensURL+leadgenId)
    
    const handleDelete = async () => {
      try {
        console.log(`Attempting to delete leadgen with id: ${leadgenId}`);
        const token = localStorage.getItem('token'); // Get the token from localStorage

        const res = await fetch(`${baseLeadgensURL}${leadgenId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token, 
          },
        });        console.log('Response:', res);
  
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error response:', errorData);
          throw new Error(errorData.message || 'Failed to delete the leadgen');
        }
  
        const data = await res.json();
        console.log('Delete response:', data.message);
        navigate('/leadgens');
      } catch (err) {
        console.error('Delete error:', err);
        setDeleteError(err.message);
      }
    };
   
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
      <h1>Leadgen Details</h1>
      <p>id: {data.token}</p>
      <p>Title: {data.title}</p>
      <p>Flow Name: {data.flowName}</p>
      <h2>Questions</h2>
      {data.questions.map((question, index) => (
        <div key={index}>
          <p>Question: {question.text}</p>
          <ul>
            {question.answers.map((answer, idx) => (
              <li key={idx}>{answer.text}</li>
            ))}
          </ul>
        </div>
      ))}
      <p>
        <Link to=".." onClick={() => navigate(-1)}>Back</Link>
      </p>
      {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
      <button type='button' onClick={handleDelete}>Delete Leadgen</button>
    </>
  );
}

export default LeadgenDetailPage