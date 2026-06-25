import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth.store.js';

import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, user, isAuthenticated, loading, error, clearError } = useAuthStore();


  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  // If already authenticated, redirect away from auth page
  useEffect(() => {
    if (isAuthenticated && user) {
      const isProfileComplete = user?.profile?.profileCompleted;
      let from = location.state?.from?.pathname || (isProfileComplete ? '/home' : '/onboarding/profile');
      
      // Safety: Never redirect back to the auth page itself
      if (from === '/auth' || from === '/auth/callback') {
        from = isProfileComplete ? '/home' : '/onboarding/profile';
      }

      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location.state]);


  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setForm({ username: '', email: '', password: '' });
    clearError();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isLogin 
        ? await login({ email: form.email, password: form.password })
        : await register({ username: form.username, email: form.email, password: form.password });
      
      // Determine where to go
      const isProfileComplete = data.user?.profile?.profileCompleted;
      let from = location.state?.from?.pathname || (isProfileComplete ? '/home' : '/onboarding/profile');
      
      // Safety: Never redirect back to the auth page itself
      if (from === '/auth' || from === '/auth/callback') {
        from = isProfileComplete ? '/home' : '/onboarding/profile';
      }

      navigate(from, { replace: true });
    } catch {
      // error is already set in the store
    }
  };


  return (
    <div className="auth-root">
      {/* Background Elements */}
      <div className="auth-bg-gradient" />
      <div className="auth-glow auth-glow-cyan" />
      <div className="auth-glow auth-glow-purple" />
      
      <div className="auth-container">
        {/* Left Side - Visual/Prestige */}
        <div className="auth-visual">
          <div className="auth-visual-content">
            <div className="lp-logo">
              <span className="lp-logo-text">DevArena</span>
            </div>
            <h2 className="auth-visual-heading">
              Secure Your <span className="lp-gradient-text">Legacy.</span>
            </h2>
            <p className="auth-visual-sub">
              Join the world's most elite competitive programming arena. 
              Battle, solve, and conquer.
            </p>
            
            <div className="auth-stats-grid">
              <div className="auth-stat-item">
                <span className="auth-stat-value">150K+</span>
                <span className="auth-stat-label">DEVS</span>
              </div>
              <div className="auth-stat-divider" />
              <div className="auth-stat-item">
                <span className="auth-stat-value">1M+</span>
                <span className="auth-stat-label">BATTLES</span>
              </div>
            </div>
          </div>
          
          {/* Animated Code Decorative Element */}
          <div className="auth-code-deco">
            <div className="code-line"><span>class</span> <span className="code-cyan">Developer</span> {'{'}</div>
            <div className="code-line indent"><span>level</span>: <span className="code-yellow">"Legend"</span>;</div>
            <div className="code-line indent"><span>status</span>: <span className="code-yellow">"Active"</span>;</div>
            <div className="code-line">{'}'}</div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-side">
          <div className="auth-card glass-card">
            <div className="auth-card-header">
              <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
              <p className="auth-subtitle">
                {isLogin ? 'The arena is waiting for you.' : 'Start your journey to the top.'}
              </p>
            </div>

            {/* API Error Banner */}
            {error && (
              <div className="auth-error-banner" role="alert">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="auth-socials">
              <a
                className="auth-social-btn auth-social-github"
                href={`${import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'}/auth/github`}
              >
                <img src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png" alt="Github" />
                <span>GitHub</span>
              </a>
              <a
                className="auth-social-btn auth-social-google"
                href={`${import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'}/auth/google`}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                <span>Google</span>
              </a>
            </div>

            <div className="auth-divider">
              <span>or continue with email</span>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {!isLogin && (
                <div className="auth-input-group">
                  <label htmlFor="auth-username">USERNAME</label>
                  <div className="auth-input-wrap">
                    <span className="material-symbols-outlined">person</span>
                    <input
                      id="auth-username"
                      type="text"
                      name="username"
                      placeholder="coder_01"
                      value={form.username}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                      disabled={loading}
                    />
                  </div>
                </div>
              )}
              
              <div className="auth-input-group">
                <label htmlFor="auth-email">EMAIL ADDRESS</label>
                <div className="auth-input-wrap">
                  <span className="material-symbols-outlined">mail</span>
                  <input
                    id="auth-email"
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="auth-password">PASSWORD</label>
                  {isLogin && <a href="#" className="auth-forgot">Forgot?</a>}
                </div>
                <div className="auth-input-wrap">
                  <span className="material-symbols-outlined">lock</span>
                  <input
                    id="auth-password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="lp-btn-primary auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner" />
                    {isLogin ? 'Signing In…' : 'Creating Account…'}
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In to Arena' : 'Initialize Account'}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button className="auth-toggle-btn" onClick={toggleAuthMode} type="button">
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
