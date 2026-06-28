import React, { useState } from 'react';

const SettingsTab = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || '',
    bio: profile?.bio || '',
    githubUsername: profile?.githubUsername || '',
    linkedinUrl: profile?.linkedinUrl || '',
    portfolioUrl: profile?.portfolioUrl || '',
    websiteUrl: profile?.websiteUrl || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card p-8 rounded-3xl space-y-6">
          <h2 className="font-headline-md text-xl text-primary-fixed border-b border-outline-variant/30 pb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant ml-1">Display Name</label>
              <input 
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full bg-surface-container rounded-xl border border-outline-variant px-4 py-3 text-on-surface focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed/20 transition-all outline-none"
                placeholder="Enter display name"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant ml-1">GitHub Username</label>
              <input 
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleChange}
                className="w-full bg-surface-container rounded-xl border border-outline-variant px-4 py-3 text-on-surface focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed/20 transition-all outline-none"
                placeholder="developer-handle"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-caps text-xs text-on-surface-variant ml-1">Bio</label>
            <textarea 
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full bg-surface-container rounded-xl border border-outline-variant px-4 py-3 text-on-surface focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed/20 transition-all outline-none resize-none"
              placeholder="Tell us about your developer journey..."
            />
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl space-y-6">
          <h2 className="font-headline-md text-xl text-primary-fixed border-b border-outline-variant/30 pb-4">Social Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant ml-1">LinkedIn Profile</label>
              <input 
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full bg-surface-container rounded-xl border border-outline-variant px-4 py-3 text-on-surface focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed/20 transition-all outline-none"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant ml-1">Portfolio Website</label>
              <input 
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className="w-full bg-surface-container rounded-xl border border-outline-variant px-4 py-3 text-on-surface focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed/20 transition-all outline-none"
                placeholder="https://yourportfolio.dev"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="px-8 py-4 bg-primary-fixed text-on-primary-fixed rounded-2xl font-headline-sm text-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">save</span>
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsTab;
