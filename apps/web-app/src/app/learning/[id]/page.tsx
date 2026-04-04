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

  const formattedDate = event.createdAt
    ? new Date(event.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <nav style={{ marginBottom: '5rem' }}>
        <Link
          href="/learning"
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
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
                color: 'var(--accent-amber)',
                letterSpacing: '1px',
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

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: '1.2',
              letterSpacing: '-1px',
              color: 'var(--text-primary)',
            }}
          >
            {event.title}
          </h1>
        </header>

        {event.summary && (
          <section
            className="glass"
            style={{
              padding: '4rem 3rem',
              fontSize: '1.25rem',
              lineHeight: '1.8',
              marginBottom: '6rem',
              borderLeft: '5px solid var(--accent-bronze)',
              background: 'rgba(229, 149, 0, 0.02)',
              color: 'var(--text-primary)',
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
          }}
        >
          <a
            href={event.pullRequestUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'var(--accent-amber)',
              textDecoration: 'underline',
              textUnderlineOffset: '6px',
            }}
          >
            VER PR #{event.pullRequestNumber} NO GITHUB
          </a>
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
        </footer>
      </article>
    </main>
  );
}
