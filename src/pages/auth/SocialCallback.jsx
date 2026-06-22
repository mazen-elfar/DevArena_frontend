/**
 * SocialCallback.jsx
 * Handles the OAuth redirect: reads the `?code=` query param,
 * exchanges it for real JWT tokens via the store, then routes the
 * user to either /home (complete profile) or /onboarding/profile.
 */

import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth.store.js';


const SocialCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { exchangeSocialCode, loading } = useAuthStore();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error || !code) {
      navigate('/auth?error=oauth_denied', { replace: true });
      return;
    }

    exchangeSocialCode(code)
      .then((data) => {
        // Use the intended destination from location state OR onboarding OR home
        let from = location.state?.from?.pathname || (data.user?.profileCompleted ? '/home' : '/onboarding/profile');
        
        // Safety: Never redirect back to the auth page itself
        if (from === '/auth' || from === '/auth/callback') {
          from = data.user?.profileCompleted ? '/home' : '/onboarding/profile';
        }

        navigate(from, { replace: true });
      })
      .catch(() => {
        navigate('/auth?error=exchange_failed', { replace: true });
      });

  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary, #0a0a0f)',
      color: 'var(--text-primary, #e2e8f0)',
      gap: '1rem',
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '3px solid transparent',
        borderTopColor: 'var(--accent-cyan, #00f5ff)',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ fontSize: '0.95rem', opacity: 0.7 }}>
        {loading ? 'Completing sign-in…' : 'Redirecting…'}
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default SocialCallback;
