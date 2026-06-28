import React, { useRef } from 'react';

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function validateFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) return "Invalid file type. Accepted: JPEG, PNG, WebP.";
  if (file.size > MAX_SIZE) return "File too large. Maximum size is 10 MB.";
  return null;
}

const ProfileHero = ({ profile, isOwnProfile, onAvatarUpload, onBannerUpload, isUploading, onFollow, onUnfollow, isFollowPending }) => {
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  if (!profile) return null;

  const currentXP = Number(profile.currentXP) || 0;
  const totalXP = Number(profile.totalXP) || 3000;
  const xpPercentage = Math.min((currentXP / (totalXP || 1)) * 100, 100);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) { alert(err); return; }
    onAvatarUpload?.(file);
    e.target.value = "";
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) { alert(err); return; }
    onBannerUpload?.(file);
    e.target.value = "";
  };

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* === BANNER SECTION === */}
      <div style={{
        position: 'relative',
        height: '180px',
        borderRadius: '16px 16px 0 0',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f1729 0%, #111827 40%, #0d1f3c 100%)',
      }}>
        {profile.banner && (
          <img
            src={profile.banner}
            alt="Banner"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
          />
        )}
        {/* Subtle overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(2,4,10,0.1) 0%, rgba(2,4,10,0.7) 100%)'
        }} />

        {/* Decorative grid lines */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Banner upload btn */}
        {isOwnProfile && (
          <>
            <input ref={bannerInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleBannerChange} />
            <button
              onClick={() => bannerInputRef.current?.click()}
              disabled={isUploading}
              title="Change banner"
              style={{
                position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                padding: '8px 14px', borderRadius: '10px',
                background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8', fontSize: '12px', fontFamily: 'inherit', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>photo_camera</span>
              Edit Banner
            </button>
          </>
        )}
      </div>

      {/* === MAIN CARD === */}
      <div style={{
        background: '#0a0f1e',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: 'none',
        borderRadius: '0 0 16px 16px',
        padding: '0 2rem 2rem 2rem',
        position: 'relative',
      }}>
        {/* === AVATAR ROW === */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', marginTop: '-56px' }}>
            <div style={{
              width: '112px', height: '112px', borderRadius: '14px',
              overflow: 'hidden', border: '3px solid #0a0f1e',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.2)',
              position: 'relative',
            }}>
              <img
                src={profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username)}&background=1e293b&color=6366f1&size=112&bold=true`}
                alt={profile.username}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
              {isUploading && (
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid rgba(99,102,241,0.3)', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' }} />
                </div>
              )}
            </div>

            {/* Avatar upload btn */}
            {isOwnProfile && (
              <>
                <input ref={avatarInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarChange} />
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={isUploading}
                  title="Change avatar"
                  style={{
                    position: 'absolute', bottom: '-8px', right: '-8px',
                    width: '28px', height: '28px', borderRadius: '8px',
                    background: '#1e293b', border: '2px solid #0a0f1e',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    transition: 'all 0.2s',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#94a3b8' }}>photo_camera</span>
                </button>
              </>
            )}

            {/* Verified badge */}
            {profile.isVerified && (
              <div style={{
                position: 'absolute', top: '-8px', right: '-8px',
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: '2px solid #0a0f1e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#fff', fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
            <button
              style={{
                padding: '8px 14px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#94a3b8', fontSize: '13px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all 0.2s', fontFamily: 'inherit',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>share</span>
              Share
            </button>

            {isOwnProfile ? (
              <button
                style={{
                  padding: '8px 16px', borderRadius: '10px',
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                  color: '#a5b4fc', fontSize: '13px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.2s', fontFamily: 'inherit', fontWeight: '500',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => profile.isFollowing ? onUnfollow?.() : onFollow?.()}
                disabled={isFollowPending}
                style={{
                  padding: '8px 16px', borderRadius: '10px',
                  background: profile.isFollowing ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.12)',
                  border: profile.isFollowing ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(99,102,241,0.35)',
                  color: profile.isFollowing ? '#f87171' : '#a5b4fc',
                  fontSize: '13px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.2s', fontFamily: 'inherit', fontWeight: '500',
                  opacity: isFollowPending ? 0.5 : 1,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  {profile.isFollowing ? 'person_remove' : 'person_add'}
                </span>
                {profile.isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        {/* === IDENTITY === */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <h1 style={{
              fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9',
              margin: 0, letterSpacing: '-0.02em',
            }}>
              {profile.displayName || profile.username}
            </h1>
            <span style={{
              fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '3px 10px', borderRadius: '6px',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
              color: '#a5b4fc',
            }}>
              {profile.rank?.name || 'Engineer'}
            </span>
            {profile.isVerified && (
              <span style={{
                fontSize: '11px', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '3px 10px', borderRadius: '6px',
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                color: '#34d399',
              }}>
                Verified
              </span>
            )}
          </div>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 12px 0', fontFamily: 'monospace' }}>
            @{profile.username}
          </p>
          {profile.bio && (
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', maxWidth: '560px', margin: 0 }}>
              {profile.bio}
            </p>
          )}
        </div>

        {/* === STATS ROW === */}
        <div style={{
          display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem',
          padding: '1rem 1.25rem',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
        }}>
          {[
            { label: 'Followers', value: profile.followersCount ?? 0 },
            { label: 'Following', value: profile.followingCount ?? 0 },
            { label: 'Level', value: profile.level ?? 1 },
          ].map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: i < 2 ? '1.5rem' : '0' }}>
              <div>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#e2e8f0' }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#475569', fontWeight: '500' }}>{s.label}</p>
              </div>
              {i < 2 && <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.06)', marginLeft: '1.5rem' }} />}
            </div>
          ))}
        </div>

        {/* === XP BAR === */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Level {profile.level} — XP Progress
            </span>
            <span style={{ fontSize: '11px', color: '#475569', fontFamily: 'monospace' }}>
              {currentXP.toLocaleString()} / {totalXP.toLocaleString()}
            </span>
          </div>
          <div style={{
            height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${xpPercentage}%`,
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              borderRadius: '100px',
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
