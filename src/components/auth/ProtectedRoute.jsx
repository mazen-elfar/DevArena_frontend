import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth.store.js';


/**
 * ProtectedRoute — wraps any route that requires authentication.
 * - Loading: shows a full-screen spinner while auth state is being hydrated.
 * - Unauthenticated: redirects to /auth.
 * - Authenticated: renders children.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user, loading, authInitialized } = useAuthStore();
  const location = useLocation();

  // 1. Wait for auth hydration before making any redirect decisions.
  // This prevents the "flash of landing page" or premature redirects.
  if (!authInitialized || loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0a0a0f',
      }}>
        <div style={{
          width: 40,
          height: 40,
          border: '3px solid rgba(0, 212, 255, 0.2)',
          borderTopColor: '#00d4ff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // 2. Guest User Redirect:
  // If not authenticated, send them to /auth and remember where they wanted to go.
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 2.5 Wait for user object:
  // If authenticated but user data is missing (rare hydration case), show loading.
  if (!user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0a0a0f',
      }}>
        <div style={{
          width: 40,
          height: 40,
          border: '3px solid rgba(0, 212, 255, 0.2)',
          borderTopColor: '#00d4ff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    );
  }

  // 3. Profile Completion Lock:
  // If authenticated but profile is not complete, ONLY allow /onboarding/profile.
  const isProfileComplete = user?.profileCompleted;
  const isOnboardingPath = location.pathname === '/onboarding/profile';

  if (!isProfileComplete && !isOnboardingPath) {
    return <Navigate to="/onboarding/profile" replace />;
  }

  // 4. Reverse Profile Lock:
  // If profile is ALREADY complete, prevent accessing the onboarding page.
  if (isProfileComplete && isOnboardingPath) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

