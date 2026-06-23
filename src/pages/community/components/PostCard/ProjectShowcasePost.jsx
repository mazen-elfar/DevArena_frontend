import React from 'react';

export function ProjectShowcasePost({ post }) {
  const { content, metadata } = post;
  const { project } = metadata || {};

  return (
    <div className="sp-wrapper">
      <div className="sp-project-card">
        {project?.coverImage ? (
          <div className="sp-cover-wrap">
            <img src={project.coverImage} alt={project.title} className="sp-cover" />
          </div>
        ) : (
          <div className="sp-cover-placeholder">
            <span className="material-symbols-outlined sp-placeholder-icon">deployed_code</span>
          </div>
        )}

        <div className="sp-details">
          <h3 className="sp-title">{project?.title}</h3>
          <p className="sp-desc">{project?.description}</p>

          <div className="sp-tags-row">
            {project?.technologies?.map(tech => (
              <span key={tech} className="sp-tech-tag">{tech}</span>
            ))}
          </div>

          <div className="sp-links-row">
            {project?.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="sp-link-btn">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>code</span>
                GitHub
                {project.stars !== undefined && <span className="sp-link-meta">★ {project.stars}</span>}
              </a>
            )}
            {project?.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="sp-link-btn sp-link-btn--primary">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>launch</span>
                Live Demo
              </a>
            )}
          </div>
        </div>

        {content && <p className="sp-content">{content}</p>}
      </div>
    </div>
  );
}
