interface LearningEvent {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  summary: string;
}

export default async function LearningTable() {
  let events: LearningEvent[] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://portfolio-api-java:8080';
    // No Docker do servidor, o frontend fala com o serviço pela rede interna do docker
    const res = await fetch(`${apiUrl}/api/v1/learning-events?size=5`, {
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
    <section className="section" id="learning">
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            Learning in Public
          </h2>
          <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '700px' }}>
            Registro de decisões, testes e aprendizados técnicos automatizados. O journal técnico é
            alimentado diretamente pelos Pull Requests aprovados na nossa esteira de engenharia.
          </p>
        </div>

        <div
          className="glass"
          style={{
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
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
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <th
                    style={{
                      padding: '1.25rem 2rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--accent-amber)',
                      letterSpacing: '1px',
                    }}
                  >
                    DATA
                  </th>
                  <th
                    style={{
                      padding: '1.25rem 2rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--accent-amber)',
                      letterSpacing: '1px',
                    }}
                  >
                    CATEGORIA
                  </th>
                  <th
                    style={{
                      padding: '1.25rem 2rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--accent-amber)',
                      letterSpacing: '1px',
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
                        borderBottom: '1px solid var(--border-subtle)',
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
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            borderColor: 'var(--border-subtle)',
                          }}
                        >
                          {event.category.toUpperCase()}
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
