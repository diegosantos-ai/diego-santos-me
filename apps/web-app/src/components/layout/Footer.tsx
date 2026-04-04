export default function Footer() {
  return (
    <footer
      className="section"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 'auto',
        padding: '3rem 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p className="text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
          © {new Date().getFullYear()} DIEGO SANTOS — PLATFORM ENGINEERING & DATA
        </p>
        <div className="flex" style={{ gap: '2rem' }}>
          <a
            href="https://github.com/diegosantos-ai"
            target="_blank"
            rel="noopener"
            style={{ fontSize: '0.75rem', fontWeight: 600 }}
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/diego-santos"
            target="_blank"
            rel="noopener"
            style={{ fontSize: '0.75rem', fontWeight: 600 }}
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
}
