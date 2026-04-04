export default function SobrePage() {
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
          Sobre Diego Santos
        </h1>
        <p
          className="text-muted"
          style={{
            fontSize: '1.3rem',
            lineHeight: '1.7',
            borderLeft: '4px solid var(--accent-bronze)',
            paddingLeft: '2rem',
          }}
        >
          Engenheiro com trajetória construída na interseção entre negócio, operação e tecnologia.
          Focado em transformar IA Generativa e Automação em sistemas reais, reproduzíveis e
          rastreáveis.
        </p>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '5rem',
          maxWidth: '1000px',
          marginBottom: '8rem',
        }}
      >
        <div style={{ order: 1 }}>
          <h2
            style={{
              fontSize: '1.25rem',
              marginBottom: '1.75rem',
              color: 'var(--accent-amber)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 700,
            }}
          >
            Trajetória
          </h2>
          <p
            className="text-muted"
            style={{ lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.05rem' }}
          >
            Minha base profissional foi moldada por anos em operações e gestão, o que me deu uma
            visão pragmática sobre como a tecnologia deve servir ao negócio. Essa experiência
            reflete diretamente na minha forma de escrever código: orientado a resultados,
            documentado e operável.
          </p>
          <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
            Atualmente na Nexo Basis, atuo na linha de frente da Engenharia de IA, construindo
            plataformas multi-agente que resolvem problemas reais de PMEs brasileiras, utilizando
            stacks modernas de Backend (Python/Java), Dados e IA.
          </p>
        </div>

        <div className="glass" style={{ padding: '2.5rem', order: 2 }}>
          <h2
            style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              color: 'var(--accent-amber)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 700,
            }}
          >
            Technical Toolchain
          </h2>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <li>
              <strong
                style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  color: 'var(--accent-bronze)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                Languages
              </strong>
              <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                Python, Java, SQL, TypeScript, Shell
              </span>
            </li>
            <li>
              <strong
                style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  color: 'var(--accent-bronze)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                Cloud & Infra
              </strong>
              <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                AWS, Terraform, Docker, CI/CD Actions
              </span>
            </li>
            <li>
              <strong
                style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  color: 'var(--accent-bronze)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                Backend & AI
              </strong>
              <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                FastAPI, Spring Boot, RAG (ChromaDB), LLMs
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section style={{ maxWidth: '850px' }}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '2.5rem',
            letterSpacing: '-0.5px',
          }}
        >
          O que eu busco agora
        </h2>
        <p className="text-muted" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          Estou direcionando meu repertório para contextos corporativos de maior maturidade técnica,
          onde a qualidade do software, a arquitetura modular e a disciplina de engenharia são
          pilares da entrega. Tenho interesse especial em ecossistemas Java/Spring e soluções
          empresa-escala que demandam alta confiabilidade, observabilidade e governança baseada em
          dados.
        </p>
      </section>
    </main>
  );
}
