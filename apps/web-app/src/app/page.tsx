import Link from 'next/link';
import Hero from '../lib/components/home/Hero';
import CompetenceBlock from '../lib/components/home/CompetenceBlock';
import ProjectCard from '../lib/components/home/ProjectCard';
import LearningTable from '../lib/components/home/LearningTable';
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
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>
              Casos Selecionados
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                fontWeight: 800,
                marginBottom: '1.35rem',
                letterSpacing: '-0.04em',
                color: 'var(--accent-deep)',
              }}
            >
              Projetos em Destaque
            </h2>
            <p
              className="text-muted"
              style={{
                fontSize: '1.15rem',
                maxWidth: '800px',
                lineHeight: '1.8',
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
              padding: '4.5rem 3rem',
              textAlign: 'center',
              borderColor: 'var(--border-soft)',
              background: 'var(--bg-warm)',
            }}
          >
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>
              Direção Profissional
            </p>
            <h2
              style={{
                fontSize: '2.25rem',
                marginBottom: '1.5rem',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--accent-deep)',
              }}
            >
              Maturidade Técnica & Operação
            </h2>
            <p
              className="text-muted"
              style={{
                maxWidth: '850px',
                margin: '0 auto 3rem',
                fontSize: '1.14rem',
                lineHeight: '1.85',
              }}
            >
              Minha trajetória se formou na interseção entre operação, negócio e tecnologia. Hoje,
              meu foco é transformar esse repertório em sistemas cada vez mais robustos, com atenção
              especial a integrações empresariais e engenharia de software com profundidade
              operacional.
            </p>
            <Link href="/sobre" className="link-accent">
              CONHECER TRAJETÓRIA COMPLETA
              <span style={{ fontSize: '1.05rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
