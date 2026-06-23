import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/auth.store.js';
import router from './router';

function App() {
  const { initializeAuth, authInitialized } = useAuthStore();

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

  return <RouterProvider router={router} />;
}

export default App;