/**
 * ProfileCompletionPage.jsx
 * Minimalist onboarding form for social-auth users who need to
 * finalize their username, major, and region before accessing the arena.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth.store.js';
import apiClient from '../../services/api.client.js';
import './ProfileCompletionPage.css';

const REGIONS = [
  'Africa', 'Asia Pacific', 'Europe', 'Latin America',
  'Middle East', 'North America', 'South Asia',
];

const MAJORS = [
  'Computer Science', 'Software Engineering', 'Data Science',
  'Cybersecurity', 'Electrical Engineering', 'Mathematics',
  'Physics', 'Other',
];

const ProfileCompletionPage = () => {
  const navigate = useNavigate();
  const { user, markProfileComplete } = useAuthStore();

  const [form, setForm] = useState({
    username: user?.username ?? '',
    major: '',
    region: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiClient.patch('/profile/onboarding', form);
      markProfileComplete();
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-root">
      <div className="onboarding-bg-gradient" />
      <div className="onboarding-glow onboarding-glow-cyan" />
      <div className="onboarding-glow onboarding-glow-purple" />

      <div className="onboarding-container">
        <div className="onboarding-card glass-card">
          {/* Header */}
          <div className="onboarding-header">
            <div className="onboarding-avatar">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" />
              ) : (
                <span className="material-symbols-outlined">person</span>
              )}
            </div>
            <h1 className="onboarding-title">One Last Step</h1>
            <p className="onboarding-subtitle">
              Set up your arena profile to begin competing.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="onboarding-error-banner" role="alert">
              <span className="material-symbols-outlined">error</span>
              <span>{error}</span>
            </div>
          )}

          <form className="onboarding-form" onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="onboarding-field">
              <label htmlFor="ob-username">USERNAME</label>
              <div className="onboarding-input-wrap">
                <span className="material-symbols-outlined">person</span>
                <input
                  id="ob-username"
                  type="text"
                  name="username"
                  placeholder="your_handle"
                  value={form.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={50}
                  pattern="[a-zA-Z0-9_]+"
                  disabled={loading}
                />
              </div>
              <span className="onboarding-hint">Letters, numbers, and underscores only.</span>
            </div>

            {/* Major */}
            <div className="onboarding-field">
              <label htmlFor="ob-major">FIELD OF STUDY</label>
              <div className="onboarding-input-wrap onboarding-select-wrap">
                <span className="material-symbols-outlined">school</span>
                <select
                  id="ob-major"
                  name="major"
                  value={form.major}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select your major…</option>
                  {MAJORS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined onboarding-chevron">expand_more</span>
              </div>
            </div>

            {/* Region */}
            <div className="onboarding-field">
              <label htmlFor="ob-region">REGION</label>
              <div className="onboarding-input-wrap onboarding-select-wrap">
                <span className="material-symbols-outlined">public</span>
                <select
                  id="ob-region"
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select your region…</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined onboarding-chevron">expand_more</span>
              </div>
            </div>

            {/* Bio (optional) */}
            <div className="onboarding-field">
              <label htmlFor="ob-bio">BIO <span className="onboarding-optional">(optional)</span></label>
              <textarea
                id="ob-bio"
                name="bio"
                placeholder="Tell the arena something about yourself…"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                maxLength={300}
                disabled={loading}
                className="onboarding-textarea"
              />
            </div>

            <button
              type="submit"
              className="lp-btn-primary onboarding-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="auth-spinner" />
                  Saving Profile…
                </>
              ) : (
                <>
                  Enter the Arena
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionPage;
