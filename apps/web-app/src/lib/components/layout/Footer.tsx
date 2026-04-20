import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <p className="footer-copy">
          © {new Date().getFullYear()} DIEGO SANTOS — PLATFORM ENGINEERING & DATA
        </p>
        <div className="footer-links">
          <Link href="/conteudos">CONTEÚDO</Link>
          <a href="https://github.com/diegosantos-ai" target="_blank" rel="noopener">
            GITHUB
          </a>
          <a href="https://linkedin.com/in/diego-santos-ia" target="_blank" rel="noopener">
            LINKEDIN
          </a>
          <a href="mailto:santos.diegoj86@gmail.com" target="_blank" rel="noopener">
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}
