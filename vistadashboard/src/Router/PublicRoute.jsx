import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const isAuthenticated  = useAuthStore(state=> state.isAuthenticated );
  return isAuthenticated ? <Navigate to="/" /> : <Outlet/>;
}
