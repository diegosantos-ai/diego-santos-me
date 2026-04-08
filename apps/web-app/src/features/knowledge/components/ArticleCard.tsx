import Image from 'next/image';
import Link from 'next/link';
import { authorProfile } from '../config';
import type { ArticleMetadata } from '../types';
import { formatShortDate } from '../utils';

interface ArticleCardProps {
  article: ArticleMetadata;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article
      className="glass interactive-card article-card-row"
      style={{
        borderColor: article.featured ? 'rgba(201, 137, 47, 0.36)' : 'var(--border-soft)',
      }}
    >
      <div className="article-card-copy">
        <h2
          style={{
            fontSize: 'clamp(1.7rem, 3vw, 2.2rem)',
            lineHeight: '1.25',
            letterSpacing: '-0.04em',
            marginBottom: '1rem',
            color: 'var(--accent-deep)',
          }}
        >
          <Link href={`/artigos/${article.slug}`}>{article.title}</Link>
        </h2>

        <p
          className="text-muted"
          style={{
            fontSize: '1.02rem',
            lineHeight: '1.85',
            marginBottom: '1.4rem',
          }}
        >
          {article.excerpt}
        </p>

        <div className="content-tag-row" style={{ marginBottom: '1rem' }}>
          {article.tags.map((tag) => (
            <span key={tag} className={`badge ${article.featured ? 'badge-warm' : ''}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="article-card-meta">
          <span>{article.category}</span>
          <time>{formatShortDate(article.publishedAt)}</time>
          <span>Leitura: {article.readTime}</span>
        </div>
      </div>

      <div className="article-card-author">
        <Image
          src={authorProfile.portraitImage}
          alt={`Retrato de ${authorProfile.name}`}
          width={96}
          height={96}
        />
        <p>Por {article.author}</p>
        <Link href={`/artigos/${article.slug}`} className="link-accent">
          Ler artigo
          <span style={{ fontSize: '1rem' }}>→</span>
        </Link>
      </div>
    </article>
  );
}
