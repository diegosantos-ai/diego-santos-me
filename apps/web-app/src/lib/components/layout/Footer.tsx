import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <p className="text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
          © {new Date().getFullYear()} DIEGO SANTOS — PLATFORM ENGINEERING & DATA
        </p>
        <div className="flex" style={{ gap: '2rem' }}>
          <Link href="/conteudos" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
            CONTEÚDO
          </Link>
          <a
            href="https://github.com/diegosantos-ai"
            target="_blank"
            rel="noopener"
            style={{ fontSize: '0.75rem', fontWeight: 600 }}
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/diego-santos-ia"
            target="_blank"
            rel="noopener"
            style={{ fontSize: '0.75rem', fontWeight: 600 }}
          >
            LINKEDIN
          </a>
          <a
            href="mailto:santos.diegoj86@gmail.com"
            target="_blank"
            rel="noopener"
            style={{ fontSize: '0.75rem', fontWeight: 600 }}
          >
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}
