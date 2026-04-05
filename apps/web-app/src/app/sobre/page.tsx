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
          Engenheiro com base em negócio, operação e tecnologia, hoje focado em construir soluções
          com backend, automação, dados e IA aplicada. Gosto de transformar ideia em sistema útil,
          bem estruturado e pronto para rodar no mundo real.
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
            Minha trajetória começou em contextos onde tecnologia precisava resolver problema de
            verdade, com impacto direto na operação e no negócio. Isso moldou a forma como eu
            construo software: com foco em clareza, aplicação prática e arquitetura que faça sentido
            fora do ambiente de teste.
          </p>
          <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
            Hoje, na Nexo Basis, atuo com projetos de IA e automação, criando soluções que conectam
            backend, dados e agentes para resolver problemas reais de empresas brasileiras.
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
            STACK PRINCIPAL
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
                Linguagens
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
                AWS, Terraform, Docker, GitHub Actions
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
                FastAPI, Spring Boot, RAG,ChromaDB, LLMs
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
          Estou aprofundando minha transição para contextos de engenharia mais maduros, com mais
          ênfase em arquitetura modular, qualidade de software, automação e backend corporativo.
          Tenho interesse especial em ecossistemas Java/Spring e em produtos que exigem
          confiabilidade, observabilidade e evolução contínua.
        </p>
      </section>
    </main>
  );
}
