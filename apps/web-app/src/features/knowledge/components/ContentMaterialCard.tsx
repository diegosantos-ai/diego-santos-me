import type { StudyResourceMetadata } from '../types';
import { isSameOriginAsset } from '../utils';

interface ContentMaterialCardProps {
  material: StudyResourceMetadata;
}

export default function ContentMaterialCard({ material }: ContentMaterialCardProps) {
  const openUrl = material.liveUrl ?? `/aprendizado-aplicado/${material.slug}`;
  const downloadUrl = material.downloadUrl ?? material.liveUrl ?? openUrl;

  return (
    <article className="glass content-library-card">
      <div>
        {material.category && <p className="content-library-category">{material.category}</p>}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1.85rem',
            lineHeight: '1.2',
            letterSpacing: '-0.025em',
            marginBottom: '1rem',
            color: 'var(--accent-deep)',
          }}
        >
          {material.title}
        </h2>
        <p className="text-muted" style={{ fontSize: '1.06rem', lineHeight: '1.85' }}>
          {material.shortDescription || material.description}
        </p>
      </div>

      <div className="content-library-actions">
        <a
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="content-library-open"
        >
          Abrir material
        </a>
        <a
          href={downloadUrl}
          target={isSameOriginAsset(downloadUrl) ? undefined : '_blank'}
          rel={isSameOriginAsset(downloadUrl) ? undefined : 'noopener noreferrer'}
          download={isSameOriginAsset(downloadUrl) ? true : undefined}
          className="content-library-download"
        >
          Baixar
        </a>
      </div>
    </article>
  );
}
