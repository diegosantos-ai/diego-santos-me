export default function ContatoPage() {
  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <header style={{ marginBottom: '6rem', maxWidth: '850px' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          Contato
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            letterSpacing: '-0.06em',
            color: 'var(--accent-deep)',
          }}
        >
          Vamos conversar?
        </h1>
        <p
          className="lead-bar"
          style={{
            maxWidth: '820px',
          }}
        >
          Estou construindo projetos que misturam backend, automação, dados e IA aplicada. Se quiser
          trocar uma ideia sobre tecnologia, projeto ou alguma oportunidade, só me chamar. Ou, se
          preferir, dá uma passada no meu LinkedIn e no GitHub.
        </p>
      </header>

      <section
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
        }}
      >
        <div
          className="glass interactive-card"
          style={{ padding: '2.2rem', background: 'var(--bg-warm)' }}
        >
          <h2
            style={{
              fontSize: '1rem',
              marginBottom: '1.25rem',
              color: 'var(--accent-deep)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
            }}
          >
            LinkedIn
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}
          >
            Projetos, aprendizados e atualizações da minha trajetória em tecnologia.
          </p>
          <a
            href="https://linkedin.com/in/diego-santos-ia"
            target="_blank"
            rel="noopener"
            style={{
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--accent-deep)',
              letterSpacing: '0.08em',
            }}
          >
            linkedin.com/in/diego-santos-ia →
          </a>
        </div>

        <div className="glass interactive-card" style={{ padding: '2.2rem' }}>
          <h2
            style={{
              fontSize: '1rem',
              marginBottom: '1.25rem',
              color: 'var(--accent-deep)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
            }}
          >
            GitHub
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}
          >
            Código, automações, experimentos e projetos construídos na prática.
          </p>
          <a
            href="https://github.com/diegosantos-ai"
            target="_blank"
            rel="noopener"
            style={{
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--accent-deep)',
              letterSpacing: '0.08em',
            }}
          >
            github.com/diegosantos-ai →
          </a>
        </div>

        <div
          className="glass interactive-card"
          style={{ padding: '2.2rem', background: 'var(--bg-surface-alt)' }}
        >
          <h2
            style={{
              fontSize: '1rem',
              marginBottom: '1.25rem',
              color: 'var(--accent-deep)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
            }}
          >
            Email
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}
          >
            Para contato direto, propostas, oportunidades ou conversas com mais contexto.
          </p>
          <a
            href="mailto:santos.diegoj86@gmail.com"
            style={{
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--accent-deep)',
              letterSpacing: '0.08em',
            }}
          >
            santos.diegoj86@gmail.com →
          </a>
        </div>
      </section>
    </main>
  );
}
