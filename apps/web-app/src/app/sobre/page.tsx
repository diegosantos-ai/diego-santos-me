const academicBackground = [
  {
    institution: 'Anhanguera Educacional',
    degree: 'Pós-graduação Lato Sensu em Ciência de Dados e Inteligência Artificial',
    period: '2025 – 2026',
  },
  {
    institution: 'Pontifícia Universidade Católica do Paraná (PUCPR)',
    degree: 'Pós-graduação Lato Sensu em Liderança Ágil: Pessoas, Projetos e Inovação',
    period: '2024 – 2025',
  },
  {
    institution: 'Centro Universitário FAG',
    degree: 'CST em Análise e Desenvolvimento de Sistemas',
    period: '2022 – 2024',
  },
  {
    institution: 'Centro Universitário FAG',
    degree: 'Bacharelado em Administração',
    period: '2019 – 2022',
  },
  {
    institution: 'Univel',
    degree: 'MBA em Gestão Empresarial',
    period: '2018 – 2020',
  },
];

const professionalExperience = [
  {
    company: 'Nexo Basis',
    role: 'Engenheiro de IA e Automação',
    period: 'dez/2025 – atual',
    location: 'Francisco Beltrão, PR',
    summary:
      'Atuação direta no desenho e na operacionalização de soluções com backend, dados, automação e IA aplicada. É a experiência que mais conecta portfólio e prática real: arquitetura modular, integração com LLMs, observabilidade, governança técnica e entrega em contexto de negócio.',
  },
  {
    company: 'Aché Laboratórios Farmacêuticos',
    role: 'Propagandista Consultor',
    period: 'jan/2023 – nov/2025',
    summary:
      'Reforçou uma forma de atuar orientada por evidência, leitura de contexto e comunicação consultiva. Consolidou repertório em análise de indicadores, validação de hipóteses e tomada de decisão com foco em resultado.',
  },
  {
    company: 'iFood',
    role: 'Business Sales Executive Sênior',
    period: 'fev/2021 – set/2022',
    summary:
      'Aprofundou a capacidade de identificar gargalos operacionais, priorizar demandas e traduzir dor real em ação estruturada. Essa camada ajuda a sustentar hoje uma engenharia mais conectada à operação do cliente.',
  },
  {
    company: 'Atacadão',
    role: 'Gerente Admnistrativo',
    period: 'jan/2017 – fev/2021',
    summary:
      'Construiu base forte em supervisão operacional, gestão de times, processos e ambientes com alta responsabilidade. Foi um ciclo importante para desenvolver disciplina de execução, controle e visão sistêmica da rotina.',
  },
  {
    company: 'Fachini Machinery',
    role: 'Gerente Comercial',
    period: 'fev/2015 – jan/2017',
    location: 'Libertyville, Illinois, Estados Unidos',
    summary:
      'Experiência ligada à construção de operação, adaptação ao mercado e leitura prática de proposta de valor. Fortaleceu a habilidade de conectar problema, contexto e solução, algo que hoje aparece no desenho dos projetos do portfólio.',
  },
];

export default function SobrePage() {
  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <header style={{ marginBottom: '6rem', maxWidth: '850px' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          Sobre
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            letterSpacing: '-0.06em',
            color: 'var(--accent-deep)',
          }}
        >
          Sobre Diego Santos
        </h1>
        <p className="lead-bar" style={{ maxWidth: '820px' }}>
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

      <section style={{ maxWidth: '1000px', marginBottom: '8rem' }}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            letterSpacing: '-0.5px',
          }}
        >
          Formação Acadêmica
        </h2>
        <p
          className="text-muted"
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            maxWidth: '820px',
            marginBottom: '3rem',
          }}
        >
          Minha trajetória acadêmica foi construída de forma progressiva, conectando gestão,
          tecnologia, liderança e dados. Essa base sustenta a forma como eu penso arquitetura,
          operação e evolução técnica em contextos reais.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {academicBackground.map((item) => (
            <article
              key={`${item.institution}-${item.degree}`}
              className="glass interactive-card"
              style={{ padding: '2rem' }}
            >
              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--accent-solar)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                {item.institution}
              </p>
              <h3
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.5',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)',
                }}
              >
                {item.degree}
              </h3>
              <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                {item.period}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: '1000px', marginBottom: '8rem' }}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            letterSpacing: '-0.5px',
          }}
        >
          Experiência Profissional
        </h2>
        <p
          className="text-muted"
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            maxWidth: '820px',
            marginBottom: '3rem',
          }}
        >
          Minha experiência profissional foi consolidando repertório em operação, indicadores,
          liderança, comunicação consultiva e tomada de decisão. Hoje, essa bagagem ajuda a dar mais
          contexto e utilidade aos projetos que construo no portfólio.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {professionalExperience.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="glass interactive-card"
              style={{ padding: '2rem' }}
            >
              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--accent-solar)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                {item.company}
              </p>
              <h3
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.5',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)',
                }}
              >
                {item.role}
              </h3>
              <p
                className="text-muted"
                style={{ fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1rem' }}
              >
                {item.period}
                {item.location ? ` • ${item.location}` : ''}
              </p>
              <p className="text-muted" style={{ fontSize: '0.98rem', lineHeight: '1.75' }}>
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: '850px' }}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '2.5rem',
            letterSpacing: '-0.04em',
            color: 'var(--accent-deep)',
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
