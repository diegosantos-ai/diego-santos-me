import Link from 'next/link';

export default function Hero() {
  return (
    <section className="section" style={{ padding: '7rem 0 5.5rem' }}>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: '1.4rem' }}>
          Que bom ter você por aqui!
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.7rem, 8vw, 4.7rem)',
            lineHeight: '1.02',
            marginBottom: '2.2rem',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            maxWidth: '980px',
            color: 'var(--accent-deep)',
          }}
        >
          Engenharia aplicada em
          <br />
          <span className="text-accent">backend, dados e automação</span>
          <br />
          com clareza operacional.
        </h1>
        <p
          className="lead-bar"
          style={{
            marginBottom: '3.2rem',
          }}
        >
          Desenvolvo sistemas e fluxos técnicos com foco em integração, observabilidade, clareza
          arquitetural e execução confiável. Este portfólio reúne estudos de caso, decisões de
          engenharia e aprendizado público com contexto real.
        </p>
        <div className="flex" style={{ gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" className="button-primary">
            VER PROJETOS
          </a>
          <Link href="/conteudos" className="link-accent">
            EXPLORAR CONTEÚDO
            <span style={{ fontSize: '1.05rem' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
