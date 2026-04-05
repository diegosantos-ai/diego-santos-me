import { getProjectData, getSortedProjectsMetadata } from '../../../lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownContent from '../../../components/MarkdownContent';

export async function generateStaticParams() {
  const projects = await getSortedProjectsMetadata();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container" style={{ padding: '8rem 0 10rem' }}>
      <header style={{ marginBottom: '6rem' }}>
        <div className="flex" style={{ flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="badge"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          Estudo de Caso
        </p>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            letterSpacing: '-0.05em',
            lineHeight: '1.2',
            color: 'var(--accent-deep)',
          }}
        >
          {project.title}
        </h1>
        <p className="lead-bar" style={{ maxWidth: '850px' }}>
          {project.description}
        </p>
      </header>

      <MarkdownContent
        html={project.contentHtml}
        className="markdown-content"
        style={{
          maxWidth: '850px',
          fontSize: '1.15rem',
          lineHeight: '1.8',
          color: 'var(--text-primary)',
        }}
      />

      <div
        style={{
          marginTop: '8rem',
          paddingTop: '4rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <Link href="/projetos" className="link-accent">
          ← VOLTAR PARA O PORTFÓLIO
        </Link>
      </div>
    </article>
  );
}
