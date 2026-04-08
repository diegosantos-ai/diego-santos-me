import Link from 'next/link';

interface ContentTrackCardProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  hrefLabel: string;
  featuredTitle?: string;
  featuredMeta?: string;
}

export default function ContentTrackCard({
  eyebrow,
  title,
  description,
  href,
  hrefLabel,
  featuredTitle,
  featuredMeta,
}: ContentTrackCardProps) {
  return (
    <article
      className="glass interactive-card content-card"
      style={{
        padding: '2rem',
        height: '100%',
      }}
    >
      <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>
        {eyebrow}
      </p>
      <h2
        style={{
          fontSize: '1.55rem',
          lineHeight: '1.25',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          color: 'var(--accent-deep)',
        }}
      >
        {title}
      </h2>
      <p
        className="text-muted"
        style={{
          lineHeight: '1.8',
          marginBottom: featuredTitle ? '1.5rem' : '2rem',
        }}
      >
        {description}
      </p>

      {featuredTitle && (
        <div className="content-inline-highlight">
          <p className="content-label">Em destaque agora</p>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              lineHeight: '1.6',
              color: 'var(--accent-deep)',
              marginBottom: featuredMeta ? '0.35rem' : 0,
            }}
          >
            {featuredTitle}
          </p>
          {featuredMeta && (
            <p className="text-muted" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
              {featuredMeta}
            </p>
          )}
        </div>
      )}

      <Link href={href} className="link-accent" style={{ marginTop: 'auto' }}>
        {hrefLabel.toUpperCase()}
        <span style={{ fontSize: '1rem' }}>→</span>
      </Link>
    </article>
  );
}
