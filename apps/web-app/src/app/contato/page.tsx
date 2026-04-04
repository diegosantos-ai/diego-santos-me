export default function ContatoPage() {
  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <header style={{ marginBottom: '6rem', maxWidth: '850px' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            letterSpacing: '-1.5px',
            color: 'var(--text-primary)',
          }}
        >
          Vamos conversar?
        </h1>
        <p
          className="text-muted"
          style={{
            fontSize: '1.25rem',
            lineHeight: '1.7',
            borderLeft: '4px solid var(--accent-bronze)',
            paddingLeft: '2rem',
          }}
        >
          Estou sempre aberto a discussões técnicas sobre engenharia de plataforma, backend
          corporativo e automação estruturada. Escolha o canal que preferir ou acesse minhas
          evidências públicas no GitHub.
        </p>
      </header>

      <section
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1000px',
        }}
      >
        <div className="glass" style={{ padding: '2.5rem' }}>
          <h2
            style={{
              fontSize: '1rem',
              marginBottom: '1.25rem',
              color: 'var(--accent-amber)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 700,
            }}
          >
            LinkedIn
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}
          >
            Conecte-se para conversas profissionais, networking e atualizações sobre a stack Nexo
            360.
          </p>
          <a
            href="https://linkedin.com/in/diego-santos"
            target="_blank"
            rel="noopener"
            style={{
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--accent-amber)',
              letterSpacing: '1px',
            }}
          >
            DIEGO SANTOS IA →
          </a>
        </div>

        <div className="glass" style={{ padding: '2.5rem' }}>
          <h2
            style={{
              fontSize: '1rem',
              marginBottom: '1.25rem',
              color: 'var(--accent-amber)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 700,
            }}
          >
            GitHub
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}
          >
            Explore o código-fonte deste portfólio, meus runbooks de IaC e projetos de IA Aplicada.
          </p>
          <a
            href="https://github.com/diegosantos-ai"
            target="_blank"
            rel="noopener"
            style={{
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--accent-amber)',
              letterSpacing: '1px',
            }}
          >
            DIEGOSANTOS-AI →
          </a>
        </div>

        <div className="glass" style={{ padding: '2.5rem' }}>
          <h2
            style={{
              fontSize: '1rem',
              marginBottom: '1.25rem',
              color: 'var(--accent-amber)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 700,
            }}
          >
            Email Direct
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}
          >
            Para propostas diretas, convites de palestras ou discussões técnicas aprofundadas.
          </p>
          <a
            href="mailto:diego@diegosantos.me"
            style={{
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--accent-amber)',
              letterSpacing: '1px',
            }}
          >
            DIEGO@DIEGOSANTOS.ME →
          </a>
        </div>
      </section>
    </main>
  );
}
