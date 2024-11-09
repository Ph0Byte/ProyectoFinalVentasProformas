import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isAuthenticated  = useAuthStore(state => state.isAuthenticated );
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />; 
}
