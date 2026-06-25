import React, { useState, useEffect } from 'react';
import useCommunityStore from '../../community.store';
import * as communityService from '../../../../services/community.service';

function Comment({ comment, postId, parentId, level = 0, onCommentAdded }) {
  const { addComment } = useCommunityStore();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleReply() {
    if (!replyContent.trim() || submitting) return;
    setSubmitting(true);
    try {
      const result = await addComment(postId, replyContent, comment.id);
      onCommentAdded(result, comment.id);
      setReplyContent('');
      setIsReplying(false);
    } catch (err) {
      console.error('Failed to reply:', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`cs-comment-item level-${level}`}>
      <div className="cs-comment-header">
        <img src={comment.author?.avatar || '/default-avatar.png'} alt="" className="cs-comment-avatar" />
        <div className="cs-comment-meta">
          <span className="cs-comment-author">{comment.author?.displayName || comment.author?.username}</span>
          <span className="cs-comment-time">just now</span>
        </div>
      </div>
      <div className="cs-comment-body">
        <p className="cs-comment-text">{comment.content}</p>
        <div className="cs-comment-footer">
          <button className="cs-comment-action">Like</button>
          <button className="cs-comment-action" onClick={() => setIsReplying(!isReplying)}>Reply</button>
        </div>

        {isReplying && (
          <div className="cs-reply-input-wrap">
            <textarea
              className="cs-reply-textarea"
              placeholder={`Reply to ${comment.author?.username || 'user'}...`}
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              autoFocus
            />
            <div className="cs-reply-btns">
              <button className="cs-btn-cancel" onClick={() => setIsReplying(false)}>Cancel</button>
              <button className="cs-btn-submit" onClick={handleReply} disabled={!replyContent.trim() || submitting}>
                {submitting ? '...' : 'Reply'}
              </button>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="cs-replies-list">
            {comment.replies.map(reply => (
              <Comment
                key={reply.id}
                comment={reply}
                postId={postId}
                parentId={comment.id}
                level={level + 1}
                onCommentAdded={onCommentAdded}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CommentsSection({ postId }) {
  const { expandedComments, addComment } = useCommunityStore();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (expandedComments[postId]) {
      loadComments();
    }
  }, [expandedComments[postId], postId]);

  async function loadComments() {
    setIsLoading(true);
    try {
      const data = await communityService.getComments(postId);
      // Group replies under parents
      const topLevel = data.filter(c => !c.parentId);
      const replies = data.filter(c => c.parentId);
      
      const structured = topLevel.map(c => ({
        ...c,
        replies: replies.filter(r => r.parentId === c.id)
      }));
      
      setComments(structured);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNestedCommentAdded(newComment, parentId) {
    if (!parentId) {
      setComments(prev => [{ ...newComment, replies: [] }, ...prev]);
    } else {
      setComments(prev => prev.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [...(c.replies || []), newComment] };
        }
        return c;
      }));
    }
  }

  async function handleSubmit() {
    if (!newComment.trim() || submitting) return;
    setSubmitting(true);
    try {
      const result = await addComment(postId, newComment);
      handleNestedCommentAdded(result, null);
      setNewComment('');
    } catch (err) {
      console.error('Failed to comment:', err);
    } finally {
      setSubmitting(false);
    }
  }

  if (!expandedComments[postId]) return null;

  return (
    <div className="cs-section-wrap">
      <div className="cs-input-wrap">
        <textarea
          className="cs-textarea"
          placeholder="Write a comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button
          className="cs-submit-btn"
          onClick={handleSubmit}
          disabled={!newComment.trim() || submitting}
        >
          {submitting ? '...' : 'Comment'}
        </button>
      </div>

      <div className="cs-list">
        {isLoading ? (
          <div className="cs-loading skeleton-pulse" style={{ height: 60 }} />
        ) : comments.length === 0 ? (
          <div className="cs-empty">No comments yet. Be the first to reply!</div>
        ) : (
          comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
              onCommentAdded={handleNestedCommentAdded}
            />
          ))
        )}
      </div>
    </div>
  );
}

