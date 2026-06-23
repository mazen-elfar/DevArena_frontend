import React from 'react';

function renderContent(text) {
  const parts = text.split(/(@\w+)/g);
  return parts.map((part, i) => {
    if (part.startsWith('@')) {
      return <span key={i} className="pc-mention">{part}</span>;
    }
    return part;
  });
}

export function DeveloperPost({ post }) {
  const { content } = post;

  return (
    <div className="dp-content">
      <p className="dp-text">
        {renderContent(content)}
      </p>
    </div>
  );
}
