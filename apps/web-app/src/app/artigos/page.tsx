import ArticleCard from '@/features/knowledge/components/ArticleCard';
import ArticleSidebar from '@/features/knowledge/components/ArticleSidebar';
import { getArticlesMetadata } from '@/features/knowledge/content.server';

export const metadata = {
  title: 'Artigos | Diego Santos',
  description:
    'Coluna técnica autoral para aprofundar raciocínio de engenharia, pesquisa aplicada e direção técnica.',
};

export default async function ArticlesPage() {
  const articles = await getArticlesMetadata();
  const articleTags = Array.from(new Set(articles.flatMap((article) => article.tags))).slice(0, 6);

  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <section className="articles-layout">
        <ArticleSidebar />

        <div>
          <header className="articles-header">
            <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>
              Coluna Assinada
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: '1.06',
                letterSpacing: '-0.05em',
                marginBottom: '1rem',
                color: 'var(--accent-deep)',
              }}
            >
              Artigos
            </h1>
            <p className="text-muted" style={{ fontSize: '1.12rem', lineHeight: '1.85' }}>
              Análises e notas técnicas sobre engenharia, automação, observabilidade, IA aplicada e
              transição técnica para stack corporativa.
            </p>
          </header>

          <div className="articles-toolbar">
            <div className="articles-topics">
              {articleTags.map((tag) => (
                <span key={tag} className="articles-topic-pill">
                  {tag}
                </span>
              ))}
            </div>
            <span className="articles-view-all">Ver tudo</span>
          </div>

          {articles.length > 0 ? (
            <div className="articles-list">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="glass" style={{ padding: '3rem', background: 'var(--bg-warm)' }}>
              Nenhum artigo foi publicado ainda nesta coluna.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
