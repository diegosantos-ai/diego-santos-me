import { LearningEvent } from '../lib/api';
import Link from 'next/link';

interface LearningEventCardProps {
  event: LearningEvent;
}

export function LearningEventCard({ event }: LearningEventCardProps) {
  const formattedDate = event.createdAt
    ? new Date(event.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <article
      className="glass"
      style={{
        padding: '2.5rem',
        marginBottom: '2rem',
        border: '1px solid var(--border-subtle)',
        transition: 'border-color 0.2s ease',
      }}
    >
      <div
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1.25rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            fontFamily: 'var(--font-geist-mono)',
            color: 'var(--accent-amber)',
            letterSpacing: '0.5px',
          }}
        >
          {event.repositoryName.toUpperCase()}
        </span>
        {event.technicalCategory && (
          <span
            className="badge"
            style={{
              fontSize: '0.6rem',
              background: 'transparent',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            {event.technicalCategory.toUpperCase()}
          </span>
        )}
        {formattedDate && (
          <time
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            {formattedDate}
          </time>
        )}
      </div>

      <h2
        style={{
          fontSize: '1.4rem',
          fontWeight: 700,
          marginBottom: '1.25rem',
          lineHeight: '1.3',
        }}
      >
        <Link href={`/learning/${event.id}`} style={{ color: 'var(--text-primary)' }}>
          {event.title}
        </Link>
      </h2>

      <p
        className="text-muted"
        style={{
          fontSize: '1rem',
          marginBottom: '2.5rem',
          lineHeight: '1.7',
        }}
      >
        {event.summary}
      </p>

      <div className="flex" style={{ gap: '2rem' }}>
        <a
          href={event.pullRequestUrl}
          target="_blank"
          rel="noopener"
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '1px',
            color: 'var(--text-muted)',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          PR #{event.pullRequestNumber}
        </a>
        <a
          href={event.repositoryUrl}
          target="_blank"
          rel="noopener"
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '1px',
            color: 'var(--accent-amber)',
          }}
        >
          ACESSAR REPOSITÓRIO →
        </a>
      </div>
    </article>
  );
}
