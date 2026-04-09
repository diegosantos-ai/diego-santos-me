import Link from 'next/link';
import { notFound } from 'next/navigation';
import AuthorSignature from '@/features/knowledge/components/AuthorSignature';
import { getArticleBySlug } from '@/features/knowledge/content.server';
import { formatLongDate } from '@/features/knowledge/utils';
import MarkdownContent from '@/lib/components/MarkdownContent';

export const revalidate = 60;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="container" style={{ padding: '8rem 0 10rem' }}>
      <nav style={{ marginBottom: '4rem' }}>
        <Link href="/artigos" className="link-accent">
          ← VOLTAR PARA OS ARTIGOS
        </Link>
      </nav>

      <header style={{ marginBottom: '4rem', maxWidth: '900px' }}>
        <div className="content-meta-row" style={{ marginBottom: '1.4rem' }}>
          <span>{article.category}</span>
          <time>{formatLongDate(article.publishedAt)}</time>
          <span>{article.readTime}</span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
            lineHeight: '1.08',
            letterSpacing: '-0.05em',
            marginBottom: '1.5rem',
            color: 'var(--accent-deep)',
          }}
        >
          {article.title}
        </h1>
        <p className="lead-bar" style={{ marginBottom: '2rem', maxWidth: '840px' }}>
          {article.summary}
        </p>
        <AuthorSignature />
        <div className="content-tag-row" style={{ marginTop: '1.5rem' }}>
          {article.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <MarkdownContent
        html={article.contentHtml}
        className="markdown-content article-markdown"
        style={{
          maxWidth: '820px',
          fontSize: '1.12rem',
          lineHeight: '1.9',
        }}
      />

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
        <Link href="/artigos" className="link-accent">
          ← VOLTAR PARA A COLUNA
        </Link>
        <Link href="/conteudos" className="link-accent">
          VER NÚCLEO EDITORIAL
        </Link>
      </footer>
    </article>
  );
}
