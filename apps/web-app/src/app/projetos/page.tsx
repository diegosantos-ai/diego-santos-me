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
        <p
          style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--accent-amber)',
            marginBottom: '1.25rem',
          }}
        >
          Portfólio Técnico
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 7vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            lineHeight: '1.1',
            marginBottom: '1.75rem',
          }}
        >
          Projetos que conectam arquitetura, automação e operação real.
        </h1>
        <p
          className="text-muted"
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.7',
            borderLeft: '4px solid var(--accent-bronze)',
            paddingLeft: '2rem',
          }}
        >
          Esta página reúne os estudos de caso do portfólio. Cada projeto foi selecionado para
          mostrar decisões de engenharia, clareza de implementação e capacidade de operar sistemas
          com previsibilidade.
        </p>
      </header>

      {featuredProjects.length > 0 && (
        <section style={{ marginBottom: additionalProjects.length > 0 ? '6rem' : 0 }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '-0.8px',
                marginBottom: '1rem',
              }}
            >
              Casos em Destaque
            </h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
              Uma seleção dos projetos mais representativos da stack atual.
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
                letterSpacing: '-0.8px',
                marginBottom: '1rem',
              }}
            >
              Outros Projetos
            </h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
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
            border: '1px solid var(--border-strong)',
            color: 'var(--text-muted)',
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
        <Link
          href="/"
          style={{
            fontWeight: 700,
            fontSize: '0.85rem',
            color: 'var(--accent-amber)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          ← VOLTAR PARA A HOME
        </Link>
      </footer>
    </main>
  );
}
