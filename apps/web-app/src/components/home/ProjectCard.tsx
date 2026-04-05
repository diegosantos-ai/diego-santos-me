import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  tags: string[];
}

export default function ProjectCard({ title, description, slug, tags }: ProjectCardProps) {
  return (
    <article
      className="glass interactive-card"
      style={{
        padding: '2.2rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid var(--border-soft)',
      }}
    >
      <p
        className="eyebrow"
        style={{ marginBottom: '1rem', color: 'var(--accent-deep)', opacity: 0.84 }}
      >
        Estudo de caso
      </p>
      <h3
        style={{
          fontSize: '1.45rem',
          marginBottom: '1rem',
          fontWeight: 700,
          color: 'var(--accent-deep)',
          lineHeight: '1.25',
          letterSpacing: '-0.03em',
        }}
      >
        {title}
      </h3>
      <p
        className="text-muted"
        style={{
          marginBottom: '1.8rem',
          fontSize: '1rem',
          lineHeight: '1.75',
          flexGrow: 1,
        }}
      >
        {description}
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--accent-solar)',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          O que esse projeto demonstra
        </p>
        <div className="flex" style={{ flexWrap: 'wrap', gap: '0.6rem' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="badge"
              style={{
                fontSize: '0.65rem',
                padding: '0.22rem 0.72rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link href={`/projetos/${slug}`} className="link-accent" style={{ marginTop: 'auto' }}>
        VER ESTUDO DE CASO
        <span style={{ fontSize: '1.1rem' }}>→</span>
      </Link>
    </article>
  );
}
