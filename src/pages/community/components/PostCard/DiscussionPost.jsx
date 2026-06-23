import React from 'react';

export function DiscussionPost({ post }) {
  const { content } = post;

  return (
    <div className="dp-content disc-post">
      <p className="dp-text">
        {content.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      
      {post.metadata?.poll && (
        <div className="pc-poll-preview">
          <p className="pc-poll-title">📊 Community Poll</p>
          <div className="pc-poll-bars">
            {post.metadata.poll.options.map(opt => (
              <div key={opt.label} className="pc-poll-bar-wrap">
                <div className="pc-poll-label">{opt.label}</div>
                <div className="pc-poll-bar">
                  <div 
                    className="pc-poll-fill" 
                    style={{ width: `${opt.percentage}%` }}
                  />
                  <span className="pc-poll-pct">{opt.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
