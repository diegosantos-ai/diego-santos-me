import { LearningEvent } from '../lib/api';
import Link from 'next/link';

interface LearningEventCardProps {
  event: LearningEvent;
}

export function LearningEventCard({ event }: LearningEventCardProps) {
  const referenceDate = event.eventDate ?? event.createdAt;
  const formattedDate = referenceDate
    ? new Date(referenceDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <article
      className="glass interactive-card"
      style={{
        padding: '2.2rem',
        marginBottom: '2rem',
        border: '1px solid var(--border-soft)',
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
            color: 'var(--accent-solar)',
            letterSpacing: '0.08em',
          }}
        >
          {event.repositoryName.toUpperCase()}
        </span>
        {event.technicalCategory && (
          <span
            className="badge"
            style={{
              fontSize: '0.6rem',
              color: 'var(--text-secondary)',
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
          fontSize: '1.35rem',
          fontWeight: 700,
          marginBottom: '1.25rem',
          lineHeight: '1.35',
          letterSpacing: '-0.03em',
        }}
      >
        <Link href={`/learning/${event.id}`} style={{ color: 'var(--accent-deep)' }}>
          {event.title}
        </Link>
      </h2>

      <p
        className="text-muted"
        style={{
          fontSize: '1rem',
          marginBottom: '2.3rem',
          lineHeight: '1.8',
        }}
      >
        {event.summary}
      </p>

      <div className="flex" style={{ gap: '2rem', flexWrap: 'wrap' }}>
        {event.pullRequestUrl && event.pullRequestNumber ? (
          <a
            href={event.pullRequestUrl}
            target="_blank"
            rel="noopener"
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'var(--text-secondary)',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            PR #{event.pullRequestNumber}
          </a>
        ) : (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'var(--text-secondary)',
            }}
          >
            ENTRADA EDITORIAL
          </span>
        )}
        {event.repositoryUrl && (
          <a
            href={event.repositoryUrl}
            target="_blank"
            rel="noopener"
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'var(--accent-deep)',
            }}
          >
            ACESSAR REPOSITÓRIO →
          </a>
        )}
      </div>
    </article>
  );
}
