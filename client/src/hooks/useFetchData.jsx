import {useState,useEffect} from 'react'

const useFetchData = (URL) => {
   const [data,setData] = useState(null);
   const [isLoading, setisLoading] = useState(true);
   const [error,setError] = useState(null);
useEffect(() => {
  const featchData = async ()=>{
   try {
      const response = await fetch(URL);
      if(!response.ok){
         throw new Error ('Failed to fetch data.');
      }
      const data = await response.json();
      setData(data);
   } catch (error) {
      setError(error.message)
   } finally{
      setisLoading(false);
   }
  }

  featchData();
}, [])

  return {
   leadgenData,
   isLoading,
   error
  }
}

export default useFetchData