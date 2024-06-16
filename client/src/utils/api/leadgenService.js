import api from "./api";
import {baseLeadgensURL} from '@/utils/data/url'
export const updateLeadgenStatus = async (token) => {
   try {
   const authToken = localStorage.getItem('token'); 
     const response = await api(`${baseLeadgensURL}${token}/status`, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${authToken}`
       }
     });
 
     if (response.ok) {
       return await response.json();
     } else {
       const error = await response.json();
       throw new Error(error.message);
     }
   } catch (error) {
     console.error('Error updating leadgen status:', error);
     throw error;
   }
 };
 