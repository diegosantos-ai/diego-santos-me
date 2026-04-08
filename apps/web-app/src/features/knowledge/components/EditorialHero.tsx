import Image from 'next/image';
import Link from 'next/link';
import { authorProfile } from '../config';
import type { ArticleMetadata } from '../types';

interface EditorialHeroProps {
  featuredArticle?: ArticleMetadata;
}

export default function EditorialHero({ featuredArticle }: EditorialHeroProps) {
  return (
    <section className="editorial-hero">
      <div className="glass editorial-hero-copy">
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          Coluna Assinada
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            lineHeight: '1.08',
            letterSpacing: '-0.05em',
            marginBottom: '1.5rem',
            color: 'var(--accent-deep)',
          }}
        >
          Artigos para explicar raciocínio técnico, contexto e direção de engenharia.
        </h1>
        <p className="lead-bar" style={{ marginBottom: '2.4rem', maxWidth: '760px' }}>
          Esta coluna reúne textos autorais sobre engenharia aplicada, observabilidade, automação,
          IA em uso real e a ponte deliberada entre a stack que já opero e o ecossistema corporativo
          que quero aprofundar.
        </p>

        <div className="editorial-bullets">
          <span>engenharia aplicada com contexto e operação</span>
          <span>aprendizado técnico transformado em material reaproveitável</span>
          <span>ponte consciente entre backend, automação, IA e stack Java</span>
        </div>

        {featuredArticle && (
          <div className="content-inline-highlight" style={{ marginTop: '2rem' }}>
            <p className="content-label">Artigo em destaque</p>
            <p
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                lineHeight: '1.6',
                color: 'var(--accent-deep)',
                marginBottom: '0.45rem',
              }}
            >
              {featuredArticle.title}
            </p>
            <p className="text-muted" style={{ lineHeight: '1.7', marginBottom: '1.2rem' }}>
              {featuredArticle.excerpt}
            </p>
            <Link href={`/artigos/${featuredArticle.slug}`} className="button-primary">
              LER ARTIGO EM DESTAQUE
            </Link>
          </div>
        )}
      </div>

      <div className="glass editorial-portrait-shell">
        <div className="editorial-portrait-media">
          <Image
            src={authorProfile.editorialImage}
            alt={`Retrato editorial de ${authorProfile.name}`}
            fill
            sizes="(max-width: 960px) 100vw, 36vw"
          />
        </div>
        <div className="editorial-portrait-caption">
          <p
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-solar)',
              marginBottom: '0.5rem',
            }}
          >
            Diego Santos
          </p>
          <p style={{ color: 'var(--text-inverse)', lineHeight: '1.7' }}>
            Autoria com presença visual, sem competir com o conteúdo.
          </p>
        </div>
      </div>
    </section>
  );
}
