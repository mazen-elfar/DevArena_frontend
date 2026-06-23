import React, { useState } from 'react';
import useCommunityStore from '../../community.store';

function Comment({ comment, postId, parentId, level = 0 }) {
  const { addComment } = useCommunityStore();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  async function handleReply() {
    if (!replyContent.trim()) return;
    // In real implementation, addComment would be a store action
    console.log('Replying to', comment.id, replyContent);
    setReplyContent('');
    setIsReplying(false);
  }

  return (
    <div className={`cs-comment-item level-${level}`}>
      <div className="cs-comment-header">
        <img src={comment.author?.avatar} alt="" className="cs-comment-avatar" />
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
              placeholder={`Reply to ${comment.author?.username}...`}
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              autoFocus
            />
            <div className="cs-reply-btns">
              <button className="cs-btn-cancel" onClick={() => setIsReplying(false)}>Cancel</button>
              <button className="cs-btn-submit" onClick={handleReply} disabled={!replyContent.trim()}>Reply</button>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="cs-replies-list" style={{ marginLeft: 20 }}>
            {comment.replies.map(reply => (
              <Comment
                key={reply.id}
                comment={reply}
                postId={postId}
                parentId={comment.id}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CommentsSection({ postId }) {
  const { 
    expandedComments, 
    // Note: We'll expand this later to fetch comments if needed
    feed
  } = useCommunityStore();
  
  const [newComment, setNewComment] = useState('');

  if (!expandedComments[postId]) return null;

  async function handleSubmit() {
    if (!newComment.trim()) return;
    console.log('Submitting top-level comment', newComment);
    setNewComment('');
  }

  // Find post in feed to show existing comments (for mock demo)
  const post = feed.find(p => p.id === postId);
  const postComments = post?.comments || [];

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
          disabled={!newComment.trim()}
        >
          Comment
        </button>
      </div>

      <div className="cs-list">
        {postComments.length === 0 ? (
          <div className="cs-empty">No comments yet. Be the first to reply!</div>
        ) : (
          postComments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
            />
          ))
        )}
      </div>
    </div>
  );
}
