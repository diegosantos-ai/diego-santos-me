export default function CompetenceBlock() {
  const competences = [
    {
      title: 'Automação e integrações',
      description:
        'Desenho e implemento fluxos entre sistemas, APIs e dados com foco em confiabilidade, rastreabilidade e redução de trabalho manual.',
    },
    {
      title: 'Backend e dados',
      description:
        'Construo serviços, pipelines e estruturas de persistência pensando em clareza de domínio, manutenção e evolução.',
    },
    {
      title: 'Operação e reprodutibilidade',
      description:
        'Trato infraestrutura, deploy, containers, CI/CD e configuração como parte do produto, não como detalhe secundário.',
    },
    {
      title: 'Observabilidade e aprendizado',
      description:
        'Documento decisões, testes, erros e melhorias para transformar execução em evidência técnica pública.',
    },
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
      <div
        className="container grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}
      >
        {competences.map((c, i) => (
          <div
            key={i}
            className="glass"
            style={{
              padding: '2.5rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <h3
              style={{
                marginBottom: '1.25rem',
                color: 'var(--accent-amber)',
                fontSize: '1.15rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {c.title}
            </h3>
            <p
              className="text-muted"
              style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: 'var(--text-muted)',
              }}
            >
              {c.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
