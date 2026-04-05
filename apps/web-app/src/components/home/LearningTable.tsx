import { getApiBaseUrl } from '../../lib/api';

interface LearningEvent {
  id: string;
  title: string;
  technicalCategory: string | null;
  createdAt: string;
  summary: string;
}

export default async function LearningTable() {
  let events: LearningEvent[] = [];

  try {
    const res = await fetch(`${getApiBaseUrl()}/learning-events?size=5`, {
      next: { revalidate: 60 }, // Revalida a cada minuto
    });

    if (res.ok) {
      const data = await res.json();
      events = data.content || [];
    }
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
        <div style={{ marginBottom: '4rem' }}>
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
            Registro de decisões, testes e aprendizados técnicos automatizados. O journal técnico é
            alimentado diretamente pelos Pull Requests aprovados na nossa esteira de engenharia.
          </p>
        </div>

        <div
          className="glass"
          style={{
            overflow: 'hidden',
            border: '1px solid var(--border-soft)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                minWidth: '600px',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: 'var(--bg-warm)',
                    borderBottom: '1px solid var(--border-soft)',
                  }}
                >
                  <th
                    style={{
                      padding: '1.25rem 2rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--accent-deep)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    DATA
                  </th>
                  <th
                    style={{
                      padding: '1.25rem 2rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--accent-deep)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    CATEGORIA
                  </th>
                  <th
                    style={{
                      padding: '1.25rem 2rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--accent-deep)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    TÍTULO DO LOG
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr
                      key={event.id}
                      style={{
                        borderBottom: '1px solid var(--border-soft)',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <td
                        style={{
                          padding: '1.25rem 2rem',
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-geist-mono)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {new Date(event.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td style={{ padding: '1.25rem 2rem' }}>
                        <span
                          className="badge"
                          style={{
                            fontSize: '0.6rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {(event.technicalCategory ?? 'sem categoria').toUpperCase()}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '1.25rem 2rem',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {event.title}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        padding: '5rem 2rem',
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                      }}
                    >
                      Nenhum log técnico recente encontrado na API operacional.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
