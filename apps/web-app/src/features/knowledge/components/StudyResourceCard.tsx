import Image from 'next/image';
import Link from 'next/link';
import type { StudyResourceMetadata } from '../types';
import { formatShortDate } from '../utils';
import StudyResourceActions from './StudyResourceActions';

interface StudyResourceCardProps {
  resource: StudyResourceMetadata;
}

export default function StudyResourceCard({ resource }: StudyResourceCardProps) {
  return (
    <article
      className="glass interactive-card content-card"
      style={{
        padding: '2rem',
        borderTop: '3px solid var(--accent-solar)',
      }}
    >
      {resource.previewImage ? (
        <div className="resource-preview resource-preview-media">
          <Image
            src={resource.previewImage}
            alt={`Prévia da interface de ${resource.title}`}
            width={1200}
            height={760}
          />
        </div>
      ) : (
        <div className="resource-preview">
          <span className="resource-preview-label">{resource.artifactType}</span>
          <p className="resource-preview-theme">{resource.category}</p>
          <p className="resource-preview-problem">{resource.problemSolved}</p>
        </div>
      )}

      <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>
        Aprendizado Aplicado
      </p>

      <h2
        style={{
          fontSize: '1.45rem',
          lineHeight: '1.25',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          color: 'var(--accent-deep)',
        }}
      >
        <Link href={`/aprendizado-aplicado/${resource.slug}`}>{resource.title}</Link>
      </h2>

      <p
        className="text-muted"
        style={{
          fontSize: '1rem',
          lineHeight: '1.75',
          marginBottom: '1.5rem',
        }}
      >
        {resource.shortDescription}
      </p>

      <div className="content-meta-row" style={{ marginBottom: '1.5rem' }}>
        <span>{resource.category}</span>
        <span>{resource.artifactType}</span>
        <time>{formatShortDate(resource.publishedAt)}</time>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p className="content-label">O que este material resolve</p>
        <p className="text-muted" style={{ lineHeight: '1.75' }}>
          {resource.problemSolved}
        </p>
      </div>

      <div className="content-tag-row" style={{ marginBottom: '1.75rem' }}>
        {resource.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>

      <StudyResourceActions resource={resource} />
    </article>
  );
}
