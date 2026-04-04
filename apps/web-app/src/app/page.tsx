import Link from 'next/link';
import Hero from '../components/home/Hero';
import CompetenceBlock from '../components/home/CompetenceBlock';
import ProjectCard from '../components/home/ProjectCard';
import LearningTable from '../components/home/LearningTable';
import { getSortedProjectsMetadata } from '../lib/markdown';

export default async function Home() {
  const allProjects = await getSortedProjectsMetadata();
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <CompetenceBlock />

      <section className="section" id="projects" style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '4.5rem' }}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                marginBottom: '1.5rem',
                letterSpacing: '-1px',
              }}
            >
              Projetos em Destaque
            </h2>
            <p
              className="text-muted"
              style={{
                fontSize: '1.15rem',
                maxWidth: '800px',
                lineHeight: '1.6',
              }}
            >
              Projetos selecionados para demonstrar arquitetura, automação, dados, operação e
              evolução incremental. Cada case foi pensado para mostrar como decisões técnicas se
              traduzem em sistemas mais claros, reproduzíveis e confiáveis dentro do pipeline de
              engenharia.
            </p>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3rem',
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
        </div>
      </section>

      <LearningTable />

      <section className="section" style={{ padding: '7rem 0 10rem' }}>
        <div className="container">
          <div
            className="glass"
            style={{
              padding: '5rem 3rem',
              textAlign: 'center',
              borderColor: 'var(--border-strong)',
              background: 'rgba(229, 149, 0, 0.02)',
            }}
          >
            <h2
              style={{
                fontSize: '2.25rem',
                marginBottom: '1.75rem',
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}
            >
              Maturidade Técnica & Operação
            </h2>
            <p
              className="text-muted"
              style={{
                maxWidth: '850px',
                margin: '0 auto 3rem',
                fontSize: '1.2rem',
                lineHeight: '1.7',
              }}
            >
              Minha trajetória se formou na interseção entre operação, negócio e tecnologia. Hoje,
              meu foco é transformar esse repertório em sistemas cada vez mais robustos, com atenção
              especial a integrações empresariais e engenharia de software com profundidade
              operacional.
            </p>
            <Link
              href="/sobre"
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                borderBottom: '2px solid var(--accent-bronze)',
                paddingBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              CONHECER TRAJETÓRIA COMPLETA
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
