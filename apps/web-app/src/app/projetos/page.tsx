import Link from 'next/link';
import ProjectCard from '../../components/home/ProjectCard';
import { getSortedProjectsMetadata } from '../../lib/markdown';

export const metadata = {
  title: 'Projetos | Diego Santos',
  description:
    'Casos práticos de backend, automação, dados, infraestrutura e operação reproduzível.',
};

export default async function ProjectsPage() {
  const projects = await getSortedProjectsMetadata();
  const featuredProjects = projects.filter((project) => project.featured);
  const additionalProjects = projects.filter((project) => !project.featured);

  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <header style={{ marginBottom: '5rem', maxWidth: '900px' }}>
        <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>
          PORTFÓLIO TÉCNICO
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 7vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: '1.1',
            marginBottom: '1.75rem',
            color: 'var(--accent-deep)',
          }}
        >
          Projetos que conectam arquitetura, automação e operação.
        </h1>
        <p className="lead-bar">
          Esses projetos mostram como transformo desafios de arquitetura, automação e operação em
          soluções mais claras, escaláveis e fáceis de evoluir. Sempre com foco no que gera valor
          técnico e funciona bem no dia a dia.
        </p>
      </header>

      {featuredProjects.length > 0 && (
        <section style={{ marginBottom: additionalProjects.length > 0 ? '6rem' : 0 }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                marginBottom: '1rem',
                color: 'var(--accent-deep)',
              }}
            >
              Casos em Destaque
            </h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
              Uma seleção de cases que combinam backend, infraestrutura, automação e visão de
              sistema.
            </p>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                slug={project.slug}
                tags={project.tags}
              />
            ))}
          </div>
        </section>
      )}

      {additionalProjects.length > 0 && (
        <section style={{ marginTop: '6rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                marginBottom: '1rem',
                color: 'var(--accent-deep)',
              }}
            >
              Outros Projetos
            </h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
              Trabalhos complementares que reforçam a evolução técnica do portfólio.
            </p>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {additionalProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                slug={project.slug}
                tags={project.tags}
              />
            ))}
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <section
          className="glass"
          style={{
            padding: '3rem',
            border: '1px solid var(--border-soft)',
            color: 'var(--text-muted)',
            background: 'var(--bg-warm)',
          }}
        >
          Nenhum projeto publicado foi encontrado no conteúdo versionado.
        </section>
      )}

      <footer
        style={{
          marginTop: '7rem',
          paddingTop: '3rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <Link href="/" className="link-accent">
          ← VOLTAR PARA A HOME
        </Link>
      </footer>
    </main>
  );
}
