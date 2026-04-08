import ContentMaterialCard from '@/features/knowledge/components/ContentMaterialCard';
import { publishedStudyMaterials } from '@/features/knowledge/study-materials';

export const metadata = {
  title: 'Conteúdo | Diego Santos',
  description:
    'Materiais práticos organizados para revisão rápida, retomada de contexto e redução de atrito no estudo técnico.',
};

export default function ContentsPage() {
  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <header className="content-library-hero">
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            lineHeight: '1.08',
            letterSpacing: '-0.06em',
            marginBottom: '1.5rem',
            color: 'var(--accent-deep)',
          }}
        >
          Conteúdo
        </h1>
        <p className="content-library-subtitle">
          Materiais práticos que organizo para reduzir atrito no estudo, acelerar revisão e apoiar
          retomada de contexto técnico.
        </p>
      </header>

      <section className="content-library-grid">
        {publishedStudyMaterials.map((material) => (
          <ContentMaterialCard key={material.id} material={material} />
        ))}
      </section>
    </main>
  );
}
