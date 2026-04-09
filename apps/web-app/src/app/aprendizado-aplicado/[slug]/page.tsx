import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/lib/components/MarkdownContent';
import StudyResourceActions from '@/features/knowledge/components/StudyResourceActions';
import { getStudyResourceBySlug } from '@/features/knowledge/content.server';
import { formatLongDate } from '@/features/knowledge/utils';

export const revalidate = 60;

export default async function StudyResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = await getStudyResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <article className="container" style={{ padding: '8rem 0 10rem' }}>
      <nav style={{ marginBottom: '4rem' }}>
        <Link href="/aprendizado-aplicado" className="link-accent">
          ← VOLTAR PARA A BIBLIOTECA
        </Link>
      </nav>

      <header style={{ marginBottom: '4rem', maxWidth: '900px' }}>
        <div className="content-meta-row" style={{ marginBottom: '1.4rem' }}>
          <span>{resource.category}</span>
          <span>{resource.artifactType}</span>
          <time>{formatLongDate(resource.publishedAt)}</time>
        </div>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          Aprendizado Aplicado
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.3rem, 6vw, 3.7rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.05em',
            marginBottom: '1.5rem',
            color: 'var(--accent-deep)',
          }}
        >
          {resource.title}
        </h1>
        <p className="lead-bar" style={{ marginBottom: '2rem', maxWidth: '840px' }}>
          {resource.description}
        </p>
        <StudyResourceActions resource={resource} />
      </header>

      {resource.previewImage && (
        <figure className="resource-detail-preview">
          <Image
            src={resource.previewImage}
            alt={`Prévia da interface de ${resource.title}`}
            width={1600}
            height={980}
          />
        </figure>
      )}

      <div className="content-detail-grid">
        <MarkdownContent
          html={resource.contentHtml}
          className="markdown-content"
          style={{
            maxWidth: '780px',
            fontSize: '1.1rem',
            lineHeight: '1.85',
          }}
        />

        <aside className="content-detail-aside">
          <div className="glass" style={{ padding: '1.6rem', marginBottom: '1rem' }}>
            <p className="content-label">Ajuda a resolver</p>
            <p className="text-muted" style={{ lineHeight: '1.75' }}>
              {resource.problemSolved}
            </p>
          </div>

          <div className="glass" style={{ padding: '1.6rem', marginBottom: '1rem' }}>
            <p className="content-label">Uso sugerido</p>
            <p className="text-muted" style={{ lineHeight: '1.75' }}>
              Abra o material no navegador para consultar rápido, baixar quando quiser guardar e
              usar o link de código para ver como o recurso foi montado.
            </p>
          </div>

          <div className="glass" style={{ padding: '1.6rem' }}>
            <p className="content-label">Tags</p>
            <div className="content-tag-row">
              {resource.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <footer
        style={{
          marginTop: '7rem',
          paddingTop: '3rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/aprendizado-aplicado" className="link-accent">
          ← VOLTAR PARA OS MATERIAIS
        </Link>
        <Link href="/conteudos" className="link-accent">
          VER NÚCLEO EDITORIAL
        </Link>
      </footer>
    </article>
  );
}
