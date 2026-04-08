'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/projetos', label: 'PROJETOS' },
    { href: '/conteudos', label: 'CONTEÚDO' },
    { href: '/artigos', label: 'ARTIGOS' },
    { href: '/sobre', label: 'SOBRE' },
    { href: '/contato', label: 'CONTATO' },
  ];

  function isActive(href: string): boolean {
    if (href === '/') {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-header">
      <nav
        className="container flex site-nav"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/" className="site-brand">
          DIEGO SANTOS
        </Link>
        <div className="flex site-nav-links" style={{ gap: '2rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav-link ${isActive(item.href) ? 'site-nav-link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
