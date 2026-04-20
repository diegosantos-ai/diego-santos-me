import Link from 'next/link';
import { contentTracks } from '../config';
import type { ArticleMetadata, StudyResourceMetadata } from '../types';
import ContentTrackCard from './ContentTrackCard';

interface KnowledgeHighlightsProps {
  featuredArticle?: ArticleMetadata;
  featuredResource?: StudyResourceMetadata;
}

export default function KnowledgeHighlights({
  featuredArticle,
  featuredResource,
}: KnowledgeHighlightsProps) {
  return (
    <section className="section" style={{ padding: '6.5rem 0' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>
              Núcleo Editorial
            </p>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.9rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                marginBottom: '1.2rem',
                color: 'var(--accent-deep)',
              }}
            >
              Conteúdo útil para quem visita. Posicionamento mais claro para quem avalia.
            </h2>
            <p className="text-muted" style={{ fontSize: '1.08rem', lineHeight: '1.85' }}>
              Além dos cases, o portfólio agora abre espaço para materiais de consulta rápida e
              artigos autorais. A ideia é transformar estudo, pesquisa e execução em ativos públicos
              com utilidade prática.
            </p>
          </div>

          <Link href="/conteudos" className="link-accent">
            Ver núcleo completo
            <span style={{ fontSize: '1.05rem' }}>→</span>
          </Link>
        </div>

        <div className="knowledge-track-grid">
          <ContentTrackCard
            eyebrow={contentTracks.studyLab.eyebrow}
            title={contentTracks.studyLab.title}
            description={contentTracks.studyLab.description}
            href={contentTracks.studyLab.href}
            hrefLabel={contentTracks.studyLab.hrefLabel}
            featuredTitle={featuredResource?.title}
            featuredMeta={featuredResource?.shortDescription}
          />
          <ContentTrackCard
            eyebrow={contentTracks.articles.eyebrow}
            title={contentTracks.articles.title}
            description={contentTracks.articles.description}
            href={contentTracks.articles.href}
            hrefLabel={contentTracks.articles.hrefLabel}
            featuredTitle={featuredArticle?.title}
            featuredMeta={featuredArticle?.excerpt}
          />
        </div>

        <div className="glass content-bridge-note">
          <p className="content-label">Também segue ativo</p>
          <p style={{ color: 'var(--accent-deep)', lineHeight: '1.75' }}>
            O <Link href="/learning">Learning in Public</Link> continua como evidência operacional
            viva. A nova camada editorial complementa esse journal com biblioteca curada e textos de
            aprofundamento.
          </p>
        </div>
      </div>
    </section>
  );
}
