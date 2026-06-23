import React from 'react';

export function DeveloperPost({ post }) {
  const { content } = post;

  // Simple mention + hashtag highlighter
  const rendered = content.replace(
    /@(\w+)/g,
    '<span class="pc-mention">@$1</span>'
  );

  return (
    <div className="dp-content">
      <p
        className="dp-text"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </div>
  );
}
