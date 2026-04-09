import { getLearningEventById } from '../../../lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LearningEventPage({ params }: Props) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);

  if (isNaN(id)) notFound();

  let event = null;
  try {
    event = await getLearningEventById(id);
  } catch {
    notFound();
  }

  const referenceDate = event.eventDate ?? event.createdAt;
  const formattedDate = referenceDate
    ? new Date(referenceDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <nav style={{ marginBottom: '5rem' }}>
        <Link href="/learning" className="link-accent" style={{ color: 'var(--text-secondary)' }}>
          ← VOLTAR PARA O JOURNAL
        </Link>
      </nav>

      <article style={{ maxWidth: '850px' }}>
        <header style={{ marginBottom: '5rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              marginBottom: '2.5rem',
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
              {(event.repositoryName ?? 'registro editorial').toUpperCase()}
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

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: '1.2',
              letterSpacing: '-0.05em',
              color: 'var(--accent-deep)',
            }}
          >
            {event.title}
          </h1>
        </header>

        {event.summary && (
          <section
            className="glass"
            style={{
              padding: '3rem 2.5rem',
              fontSize: '1.18rem',
              lineHeight: '1.8',
              marginBottom: '6rem',
              borderLeft: '4px solid var(--accent-bronze)',
              background: 'var(--bg-warm)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-soft)',
            }}
          >
            {event.summary}
          </section>
        )}

        <footer
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '4rem',
            display: 'flex',
            gap: '3rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {event.pullRequestUrl && event.pullRequestNumber ? (
            <a
              href={event.pullRequestUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--accent-deep)',
              }}
            >
              VER PR #{event.pullRequestNumber} NO GITHUB
            </a>
          ) : (
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--text-secondary)',
              }}
            >
              REGISTRO EDITORIAL
            </span>
          )}
          {event.repositoryUrl && (
            <a
              href={event.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '1px',
                color: 'var(--text-muted)',
              }}
            >
              ACESSAR REPOSITÓRIO →
            </a>
          )}
        </footer>
      </article>
    </main>
  );
}
