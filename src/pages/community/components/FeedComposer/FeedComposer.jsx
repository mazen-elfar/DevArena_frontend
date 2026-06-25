import React, { useState, useRef, useEffect } from 'react';
import useCommunityStore from '../../community.store';
import './FeedComposer.css';

const COMPOSER_TYPES = [
  { id: 'developer', label: 'Post Update', icon: '✍️', placeholder: 'What are you building today?' },
  { id: 'showcase', label: 'Share Project', icon: '🛠️', placeholder: 'Tell us about your project...' },
  { id: 'discussion', label: 'Ask Question', icon: '💬', placeholder: 'Start a technical discussion...' },
  { id: 'achievement', label: 'Share Achievement', icon: '🏆', placeholder: 'Share a milestone or achievement...' },
  { id: 'victory', label: 'Battle Result', icon: '⚔️', placeholder: 'How did your battle go?' },
];

const TECH_TAGS = ['React', 'TypeScript', 'Rust', 'Node.js', 'Python', 'AI', 'System Design', 'Open Source', 'Career', 'DevOps'];

export function FeedComposer({ currentUser }) {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { composerType, setComposerType, submitPost } = useCommunityStore();
  const textareaRef = useRef(null);

  const activeType = COMPOSER_TYPES.find(t => t.id === composerType) || COMPOSER_TYPES[0];

  function handleFocus() {
    setExpanded(true);
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  function toggleTag(tag) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit() {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    try {
      await submitPost({
        content,
        type: composerType
      });
      setContent('');
      setSelectedTags([]);
      setExpanded(false);
    } catch (err) {
      console.error('Failed to submit post:', err);
      // Optional: Add toast notification here
    } finally {
      setSubmitting(false);
    }
  }

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setExpanded(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={`fc-composer ${expanded ? 'expanded' : ''}`}>
      {/* Type Tabs */}
      {expanded && (
        <div className="fc-type-tabs">
          {COMPOSER_TYPES.map(type => (
            <button
              key={type.id}
              className={`fc-type-tab ${composerType === type.id ? 'active' : ''}`}
              onClick={() => setComposerType(type.id)}
            >
              <span className="fc-type-tab-icon">{type.icon}</span>
              <span className="fc-type-tab-label">{type.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Input Row */}
      <div className="fc-input-row">
        {/* Avatar */}
        <div className="fc-avatar-wrap">
          {currentUser?.avatar ? (
            <img src={currentUser.avatar} alt="" className="fc-avatar" />
          ) : (
            <div className="fc-avatar-placeholder">
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#00f0ff' }}>person</span>
            </div>
          )}
        </div>

        {/* Textarea / Collapsed trigger */}
        {expanded ? (
          <textarea
            ref={textareaRef}
            className="fc-textarea"
            placeholder={activeType.placeholder}
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            autoFocus
          />
        ) : (
          <button className="fc-collapsed-trigger" onClick={handleFocus}>
            <span className="fc-collapsed-placeholder">{activeType.placeholder}</span>
          </button>
        )}
      </div>

      {/* Expanded Controls */}
      {expanded && (
        <>
          {/* Tag Pills */}
          <div className="fc-tags-row">
            {TECH_TAGS.map(tag => (
              <button
                key={tag}
                className={`fc-tag-pill ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="fc-footer">
            <div className="fc-attach-actions">
              <button className="fc-attach-btn" title="Add image">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>image</span>
              </button>
              <button className="fc-attach-btn" title="Add code snippet">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>code</span>
              </button>
              <button className="fc-attach-btn" title="Add link">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>link</span>
              </button>
              <button className="fc-attach-btn" title="Public post">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>public</span>
              </button>
            </div>

            <div className="fc-submit-area">
              <span className="fc-char-count" style={{ color: content.length > 900 ? '#ef4444' : undefined }}>
                {content.length}/1000
              </span>
              <button className="fc-cancel-btn" onClick={() => { setExpanded(false); setContent(''); }}>
                Cancel
              </button>
              <button
                className="fc-submit-btn"
                onClick={handleSubmit}
                disabled={!content.trim() || submitting}
              >
                {submitting ? (
                  <span className="fc-spinner" />
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                    Publish
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
