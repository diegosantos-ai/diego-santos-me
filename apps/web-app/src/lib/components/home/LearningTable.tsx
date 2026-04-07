import Link from 'next/link';
import { getLearningEvents, LearningEvent } from '../../api';

function getReferenceDate(event: LearningEvent): string {
  return event.eventDate ?? event.createdAt;
}

function hasCuratedSummary(event: LearningEvent): boolean {
  const summary = event.summary?.trim() ?? '';
  const title = event.title?.trim() ?? '';

  return summary.length >= 90 && summary !== title;
}

function isEditorialEntry(event: LearningEvent): boolean {
  return !event.pullRequestUrl;
}

function truncateSummary(summary: string): string {
  if (summary.length <= 180) {
    return summary;
  }

  return `${summary.slice(0, 177).trimEnd()}...`;
}

export default async function LearningTable() {
  let events: LearningEvent[] = [];

  try {
    const data = await getLearningEvents(0, 12);
    const curatedEvents = data.content.filter(
      (event) => isEditorialEntry(event) || hasCuratedSummary(event)
    );

    events = curatedEvents.slice(0, 4);
  } catch (e) {
    console.error('Fetch Error: Learning events suppressed. API might be offline.', e);
  }

  return (
    <section
      className="section"
      id="learning"
      style={{
        background: 'var(--bg-surface-alt)',
        borderTop: '1px solid var(--border-soft)',
        borderBottom: '1px solid var(--border-soft)',
      }}
    >
      <div className="container">
        <div
          style={{
            marginBottom: '4rem',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '760px' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>
              Journal Técnico
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.1rem, 4vw, 2.8rem)',
                marginBottom: '1rem',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--accent-deep)',
              }}
            >
              Learning in Public
            </h2>
            <p
              className="text-muted"
              style={{ fontSize: '1.08rem', maxWidth: '760px', lineHeight: '1.8' }}
            >
              Uma vitrine viva de decisões, ajustes e aprendizados recentes. Aqui entram os
              registros que melhor explicam como a stack evolui na prática, com contexto técnico e
              leitura humana.
            </p>
          </div>

          <Link
            href="/learning"
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--accent-deep)',
              textTransform: 'uppercase',
            }}
          >
            Ver journal completo →
          </Link>
        </div>

        {events.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {events.map((event) => (
              <article
                key={event.id}
                className="glass interactive-card"
                style={{
                  padding: '1.8rem',
                  border: '1px solid var(--border-soft)',
                  minHeight: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: 'var(--accent-solar)',
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-geist-mono)',
                    }}
                  >
                    {new Date(getReferenceDate(event)).toLocaleDateString('pt-BR')}
                  </span>
                  <span
                    className="badge"
                    style={{
                      fontSize: '0.58rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {(event.technicalCategory ?? 'engineering').toUpperCase()}
                  </span>
                  {!event.pullRequestUrl && (
                    <span
                      style={{
                        fontSize: '0.58rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                      }}
                    >
                      Curado
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: '1.4',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.9rem',
                    color: 'var(--accent-deep)',
                  }}
                >
                  <Link href={`/learning/${event.id}`} style={{ color: 'inherit' }}>
                    {event.title}
                  </Link>
                </h3>

                <p
                  className="text-muted"
                  style={{
                    marginBottom: '1.5rem',
                    lineHeight: '1.75',
                    fontSize: '0.96rem',
                  }}
                >
                  {truncateSummary(event.summary)}
                </p>

                <Link
                  href={`/learning/${event.id}`}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: 'var(--accent-deep)',
                    textTransform: 'uppercase',
                  }}
                >
                  Ler registro →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div
            className="glass"
            style={{
              padding: '3rem 2rem',
              border: '1px solid var(--border-soft)',
              textAlign: 'center',
              color: 'var(--text-muted)',
            }}
          >
            Nenhum registro curado disponível no momento.
          </div>
        )}
      </div>
    </section>
  );
}
