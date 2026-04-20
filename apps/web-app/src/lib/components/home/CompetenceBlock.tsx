export default function CompetenceBlock() {
  const competences = [
    {
      title: 'Automação e integrações',
      description:
        'Crio fluxos entre APIs, serviços e dados para reduzir retrabalho, aumentar rastreabilidade e dar mais consistência à operação.',
    },
    {
      title: 'Backend e Arquitetura',
      description:
        'Projeto serviços e estruturas de domínio com foco em manutenção, testabilidade e evolução incremental.',
    },
    {
      title: 'Operação como Engenharia',
      description:
        'Deploy, configuração, containers, CI/CD e recuperação fazem parte da solução desde o início.',
    },
    {
      title: 'Aprendizado com evidência',
      description:
        'Registro decisões, testes, erros e melhorias para mostrar evolução técnica com base em trabalho real.',
    },
  ];

  return (
    <section
      className="section"
      style={{
        background: 'var(--bg-surface-alt)',
        borderTop: '1px solid var(--border-soft)',
        borderBottom: '1px solid var(--border-soft)',
        padding: '6rem 0',
      }}
    >
      <div className="container">
        <div style={{ marginBottom: '3.5rem', maxWidth: '780px' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>
            Como Eu Construo
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
              color: 'var(--accent-deep)',
            }}
          >
            Blocos de competência pensados para sustentar sistemas reais.
          </h2>
          <p className="text-muted" style={{ fontSize: '1.08rem', lineHeight: '1.8' }}>
            O foco não está em empilhar ferramentas, mas em combinar integração, arquitetura,
            operação e aprendizado contínuo de forma coerente.
          </p>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}
        >
          {competences.map((c, i) => (
            <div
              key={i}
              className="glass interactive-card"
              style={{
                padding: '2rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                borderTop: '3px solid var(--accent-solar)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                  color: 'var(--accent-deep)',
                  fontSize: '1.12rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {c.title}
              </h3>
              <p
                className="text-muted"
                style={{
                  fontSize: '0.98rem',
                  lineHeight: '1.75',
                }}
              >
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
