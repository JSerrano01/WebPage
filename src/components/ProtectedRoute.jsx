// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ element: Element, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Element : <Navigate to="/" />}
    />
  );
}

export default ProtectedRoute;
