import { useState, useEffect } from 'react';
import api from '@/utils/api/api.js';

const useFetchData = (URL) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await api(URL, {
          signal,
          headers: {
            'Content-Type': 'application/json',
            // 'x-auth-token': token, 
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }
        const data = await response.json();
        console.log('fetched data:', JSON.stringify(data));
        setData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [URL]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchData;
