import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
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

            <div className="hero-metrics">
              <div className="hero-metric">
                <span className="hero-metric-value">7</span>
                <span className="hero-metric-label">/ estudos de caso</span>
              </div>
              <div className="hero-metric">
                <span className="hero-metric-value">22+</span>
                <span className="hero-metric-label">/ registros · Learning</span>
              </div>
              <div className="hero-metric">
                <span className="hero-metric-value">Ativo</span>
                <span className="hero-metric-label">/ journal técnico</span>
              </div>
            </div>

            <div
              className="flex"
              style={{ gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <a href="#projects" className="button-primary">
                Ver projetos
              </a>
              <Link href="/conteudos" className="link-accent">
                Explorar conteúdo
                <span style={{ fontSize: '1.05rem' }}>→</span>
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="arch-panel">
              <div className="arch-panel-header">
                <span className="arch-panel-title">Stack de observabilidade</span>
                <span className="arch-status-live">
                  <span className="live-dot"></span> live
                </span>
              </div>
              <div className="arch-panel-body">
                <div className="arch-panel-row">
                  <div className="arch-panel-item">
                    <span className="arch-panel-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                        <path d="M21 3v5h-5"></path>
                      </svg>
                    </span>
                    <div>
                      <div className="arch-panel-name">Prometheus</div>
                      <div className="arch-panel-meta">Metrics / 15s scrape</div>
                    </div>
                  </div>
                  <span className="arch-panel-pill ok">ok</span>
                </div>
                <div className="arch-panel-row">
                  <div className="arch-panel-item">
                    <span className="arch-panel-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </span>
                    <div>
                      <div className="arch-panel-name">Loki</div>
                      <div className="arch-panel-meta">Logs / Promtail</div>
                    </div>
                  </div>
                  <span className="arch-panel-pill ok">ok</span>
                </div>
                <div className="arch-panel-row">
                  <div className="arch-panel-item">
                    <span className="arch-panel-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </span>
                    <div>
                      <div className="arch-panel-name">Grafana</div>
                      <div className="arch-panel-meta">Dashboards / exp</div>
                    </div>
                  </div>
                  <span className="arch-panel-pill ok">ok</span>
                </div>
                <div className="arch-panel-row">
                  <div className="arch-panel-item">
                    <span className="arch-panel-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="12 22.08 12 12"></polyline>
                        <polyline points="3.27 6.96 12 12"></polyline>
                        <polyline points="20.73 6.96 12 12"></polyline>
                      </svg>
                    </span>
                    <div>
                      <div className="arch-panel-name">Terraform</div>
                      <div className="arch-panel-meta">IaC / OVH Cloud</div>
                    </div>
                  </div>
                  <span className="arch-panel-pill ok">ok</span>
                </div>
              </div>
              <div className="arch-panel-footer">
                <span>sys: live</span>
                <span>net: ovh</span>
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
