import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';

/**
 * AccessGuard
 * A unified guard for authentication, profile completion, and RBAC.
 */
const AccessGuard = ({ 
  children, 
  requireAuth = false, 
  requireProfileCompletion = false,
  requiredRoles = [],
  requiredPermissions = [],
  requiredSubscription = null
}) => {
  const { user, isAuthenticated, authInitialized } = useAuthStore();
  const location = useLocation();

  if (!authInitialized) {
    return null;
  }

  // 1. Check Authentication
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 2. Check Profile Completion
  const isProfileComplete = user?.profile?.profileCompleted;
  
  if (requireProfileCompletion && isAuthenticated && !isProfileComplete) {
    return <Navigate to="/onboarding/profile" replace />;
  }

  // 3. RBAC - Roles
  if (requiredRoles.length > 0) {
    const hasRole = requiredRoles.some(role => user?.roles?.includes(role));
    if (!hasRole) return <Navigate to="/403" replace />;
  }

  // 4. RBAC - Permissions
  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.every(perf => user?.permissions?.includes(perf));
    if (!hasPermission) return <Navigate to="/403" replace />;
  }

  // 5. Subscription check (Future expansion)
  if (requiredSubscription && user?.subscription !== requiredSubscription) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
};

export default AccessGuard;
