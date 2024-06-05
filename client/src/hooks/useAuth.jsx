import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user, token) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
        setUser(JSON.parse(loggedInUser));
      }
    }
  }, []);

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  return {
    user,
    isLoggedIn,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
