import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  tags: string[];
}

export default function ProjectCard({ title, description, slug, tags }: ProjectCardProps) {
  return (
    <div
      className="glass"
      style={{
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <h3
        style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </h3>
      <p
        className="text-muted"
        style={{
          marginBottom: '2rem',
          fontSize: '1rem',
          lineHeight: '1.6',
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
            color: 'var(--accent-amber)',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
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
                background: 'rgba(229, 149, 0, 0.05)',
                padding: '0.2rem 0.8rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/projetos/${slug}`}
        style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '1px',
          color: 'var(--accent-amber)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: 'auto',
        }}
      >
        VER ESTUDO DE CASO
        <span style={{ fontSize: '1.1rem' }}>→</span>
      </Link>
    </div>
  );
}
