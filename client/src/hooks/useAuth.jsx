import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
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
