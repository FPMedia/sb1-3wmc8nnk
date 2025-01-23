import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../ui/Loader';

export function AuthGuard() {
  console.log('AuthGuard - Rendering');
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log('AuthGuard - Auth state:', { user, loading });

  if (loading) {
    console.log('AuthGuard - Loading');
    return <Loader className="h-96" />;
  }

  if (!user) {
    console.log('AuthGuard - No user, redirecting to auth');
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  console.log('AuthGuard - User authenticated, rendering outlet');
  return <Outlet />;
}