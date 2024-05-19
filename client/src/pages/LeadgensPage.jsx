import React,{useEffect,useState,useRef} from 'react'
import LeadgensList from '@/components/LeadgensList'

const fetchURL = 'http://localhost:5000/api/leadgens'
const LeadgensPage = () => {
  const [fetchedLeadgens,setFetchedLeadgens] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(false);
  const hasFetched = useRef(false);
  useEffect(() => {
    if(hasFetched.current) return;
    async function fetchLeadgens() {
      setIsLoading(true);
      try {
        const response = await fetch(fetchURL);
        if (!response.ok) {
          throw new Error('Fetching leadgens failed.');
        }
        const resData = await response.json();
        setFetchedLeadgens(resData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
  
   fetchLeadgens();
   hasFetched.current = true;

  }, [])
  

  return (
    <>
    <h1>All Leadgen</h1>
    <div>
    {isLoading && <p>Loading..</p>}
    {error && <p>{error}</p>}
    </div>
    {!isLoading && fetchedLeadgens && <LeadgensList leadgens={fetchedLeadgens}/>}
    </>
  )
}

export default LeadgensPage