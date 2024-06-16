import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { baseAuthURL } from "@/utils/data/url";
import api from '@/utils/api/api.js';
const AuthContext = createContext();
const initialState = {
   user: null,
   isLoggedIn: false,
   isLoginPending: false,
   loginError: null,
 };

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
   const [state, setState] = useState(initialState);
   const setLoginPending = (isLoginPending) => setState({ ...state, isLoginPending });
   const setLoginSuccess = (user, token,refreshToken) => {
     localStorage.setItem('user', JSON.stringify(user));
     localStorage.setItem('token', token);
     localStorage.setItem('refreshToken', refreshToken);

     setState({ ...state, isLoggedIn: true, isLoginPending: false, loginError: null, user });
   };
   const setLoginError = (loginError) => setState({ ...state, isLoggedIn: false, isLoginPending: false, loginError });
   const handleLogout = () => {
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     localStorage.removeItem('refreshToken');

     setState(initialState);
   };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (loggedInUser && token) {
      if (isTokenExpired(token)) {
        handleLogout();
      } else {
        setState((prevState) => ({ ...prevState, isLoggedIn: true, user: JSON.parse(loggedInUser) }));
      }
    }
  }, []);

//   const isLoggedIn = () => {
//     const token = localStorage.getItem('token');
//     return !!token && !isTokenExpired(token);
//   };

  const authenticate = async (endpoint, body) => {
   setLoginPending(true);
   try {
     const response = await api(`${baseAuthURL}${endpoint}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(body),
     });

     const data = await response.json();
     if (response.ok) {
       const user = { name: data.user.name, email: data.user.email };
       setLoginSuccess(user, data.token, data.refreshToken);

     } else {
       setLoginError(data.message || `${endpoint === 'login' ? 'Login' : 'Signup'} failed`);
     }
   } catch (error) {
     setLoginError('An error occurred. Please try again.');
   }
 };

  return (
   <AuthContext.Provider value={{ ...state, authenticate, handleLogout }}>
   {children}
    </AuthContext.Provider>
  );
};
