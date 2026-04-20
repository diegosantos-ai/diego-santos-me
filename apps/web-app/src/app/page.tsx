import Link from 'next/link';
import KnowledgeHighlights from '@/features/knowledge/components/KnowledgeHighlights';
import {
  getFeaturedArticles,
  getFeaturedStudyResources,
} from '@/features/knowledge/content.server';
import Hero from '../lib/components/home/Hero';
import CompetenceBlock from '../lib/components/home/CompetenceBlock';
import ProjectCard from '../lib/components/home/ProjectCard';
import LearningTable from '../lib/components/home/LearningTable';
import { getSortedProjectsMetadata } from '../lib/markdown';

export const revalidate = 300;

export default async function Home() {
  const [allProjects, featuredArticles, featuredResources] = await Promise.all([
    getSortedProjectsMetadata(),
    getFeaturedArticles(1),
    getFeaturedStudyResources(1),
  ]);
  const featuredProjects = allProjects.filter((p) => p.featured);
  const featuredArticle = featuredArticles[0];
  const featuredResource = featuredResources[0];

  const projectKpis: Record<string, Array<{ label: string; value: string }>> = {
    nexo360: [
      { label: 'Arquitetura', value: 'Hexagonal' },
      { label: 'Modelo', value: 'Multi-tenant' },
      { label: 'Domínio', value: 'PMEs' },
    ],
    'dev-workspace': [
      { label: 'Abordagem', value: 'Declarativa' },
      { label: 'Escopo', value: 'Multi-OS' },
      { label: 'Entrega', value: 'Make targets' },
    ],
    iac: [
      { label: 'Cloud', value: 'AWS' },
      { label: 'IaC', value: 'Terraform' },
      { label: 'CI/CD', value: 'GH Actions' },
    ],
    chat: [
      { label: 'Arquitetura', value: 'RAG' },
      { label: 'Audiência', value: 'Setor público' },
      { label: 'Foco', value: 'Governança' },
    ],
    observabilidade: [
      { label: 'Stack', value: '3 camadas' },
      { label: 'Provisioning', value: 'IaC' },
      { label: 'Escopo', value: 'End-to-end' },
    ],
    portifolio: [
      { label: 'Stack', value: 'Next + Java' },
      { label: 'Entrega', value: 'CI/CD' },
      { label: 'Foco', value: 'Produto real' },
    ],
    'mini-erp': [
      { label: 'Arquitetura', value: 'Monólito modular' },
      { label: 'Auth', value: 'JWT' },
      { label: 'Migrations', value: 'Flyway' },
    ],
  };

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
                kpis={projectKpis[project.slug]}
              />
            ))}
          </div>
        </div>
      </section>

      <KnowledgeHighlights featuredArticle={featuredArticle} featuredResource={featuredResource} />

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
              Conhecer trajetória completa
              <span style={{ fontSize: '1.05rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
