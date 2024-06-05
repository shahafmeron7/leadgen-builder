import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
const AuthenticatedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthenticatedRoute;
