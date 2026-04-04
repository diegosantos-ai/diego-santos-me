import Link from 'next/link';

export default function Header() {
  return (
    <header
      className="glass"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
        background: 'rgba(2, 4, 15, 0.8)',
      }}
    >
      <nav
        className="container flex"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4.5rem',
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 700,
            letterSpacing: '1px',
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
          }}
        >
          DIEGO SANTOS
        </Link>
        <div className="flex" style={{ gap: '2.5rem' }}>
          <Link
            href="/projetos"
            style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}
          >
            PROJETOS
          </Link>
          <Link
            href="/sobre"
            style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}
          >
            SOBRE
          </Link>
          <Link
            href="/contato"
            style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}
          >
            CONTATO
          </Link>
        </div>
      </nav>
    </header>
  );
}
