import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/home/Home';
import LandingPage from './pages/landing/LandingPage';
import Community from './pages/community/Community';
import AuthPage from './pages/auth/AuthPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SocialCallback from './pages/auth/SocialCallback';
import ProfileCompletionPage from './pages/onboarding/ProfileCompletionPage';
import useAuthStore from './store/auth.store.js';


function App() {
  const { initializeAuth, authInitialized } = useAuthStore();


  // On every page load: validate the stored token and hydrate user state.
  // This is what keeps the user logged in across page refreshes.
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!authInitialized) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        color: '#e2e8f0',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          width: 50,
          height: 50,
          border: '4px solid rgba(0, 245, 255, 0.1)',
          borderTopColor: '#00f5ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1.5rem'
        }} />
        <p style={{ opacity: 0.6, fontSize: '0.9rem', letterSpacing: '0.1em' }}>INITIALIZING ARENA...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }


  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<SocialCallback />} />

        {/* Protected routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/community" element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } />
        <Route path="/onboarding/profile" element={
          <ProtectedRoute>
            <ProfileCompletionPage />
          </ProtectedRoute>
        } />

        {/* Future protected routes (stubs — add components as they're built) */}
        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
        {/* <Route path="/quests" element={<ProtectedRoute><Quests /></ProtectedRoute>} /> */}
        {/* <Route path="/battles" element={<ProtectedRoute><Battles /></ProtectedRoute>} /> */}
        {/* <Route path="/tournaments" element={<ProtectedRoute><Tournaments /></ProtectedRoute>} /> */}
        {/* <Route path="/leaderboards" element={<ProtectedRoute><Leaderboards /></ProtectedRoute>} /> */}
        {/* <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} /> */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;