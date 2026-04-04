import { getProjectData, getSortedProjectsMetadata } from '../../../lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'rgba(229, 149, 0, 0.05)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            letterSpacing: '-1px',
            lineHeight: '1.2',
          }}
        >
          {project.title}
        </h1>
        <p
          className="text-muted"
          style={{
            fontSize: '1.3rem',
            maxWidth: '850px',
            lineHeight: '1.6',
            borderLeft: '4px solid var(--accent-bronze)',
            paddingLeft: '2rem',
          }}
        >
          {project.description}
        </p>
      </header>

      <div
        className="markdown-content"
        style={{
          maxWidth: '850px',
          fontSize: '1.15rem',
          lineHeight: '1.8',
          color: 'var(--text-primary)',
        }}
        dangerouslySetInnerHTML={{ __html: project.contentHtml }}
      />

      <div
        style={{
          marginTop: '8rem',
          paddingTop: '4rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <Link
          href="/#projects"
          style={{
            fontWeight: 700,
            fontSize: '0.85rem',
            color: 'var(--accent-amber)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          ← VOLTAR PARA O PORTFÓLIO
        </Link>
      </div>
    </article>
  );
}
