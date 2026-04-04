import Link from 'next/link';

export default function Hero() {
  return (
    <section className="section" style={{ padding: '8rem 0 5rem' }}>
      <div className="container">
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            lineHeight: '1.1',
            marginBottom: '2rem',
            fontWeight: 800,
            letterSpacing: '-1.5px',
          }}
        >
          Engenharia de Plataforma, <br />
          <span className="text-accent">Dados e Automação</span> <br />
          aplicada a sistemas reais.
        </h1>
        <p
          className="text-muted"
          style={{
            maxWidth: '800px',
            fontSize: '1.25rem',
            lineHeight: '1.6',
            marginBottom: '3.5rem',
          }}
        >
          Construo soluções com foco em backend, integração, dados, observabilidade e operação
          reproduzível. Meu portfólio reúne projetos, decisões e aprendizado público como evidência
          técnica, não como vitrine genérica.
        </p>
        <div className="flex" style={{ gap: '2.5rem', alignItems: 'center' }}>
          <a
            href="#projects"
            className="badge"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            VER PROJETOS
          </a>
          <Link
            href="/learning"
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              borderBottom: '2px solid var(--accent-bronze)',
              paddingBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            EXPLORAR LEARNING IN PUBLIC
          </Link>
        </div>
      </div>
    </section>
  );
}
