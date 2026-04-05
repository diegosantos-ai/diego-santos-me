import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <nav
        className="container flex"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4.5rem',
        }}
      >
        <Link href="/" className="site-brand">
          DIEGO SANTOS
        </Link>
        <div className="flex" style={{ gap: '2rem' }}>
          <Link href="/projetos" className="site-nav-link">
            PROJETOS
          </Link>
          <Link href="/sobre" className="site-nav-link">
            SOBRE
          </Link>
          <Link href="/contato" className="site-nav-link">
            CONTATO
          </Link>
        </div>
      </nav>
    </header>
  );
}
