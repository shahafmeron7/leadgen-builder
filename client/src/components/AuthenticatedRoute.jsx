import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/auth/auth';

const AuthenticatedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthenticatedRoute;
