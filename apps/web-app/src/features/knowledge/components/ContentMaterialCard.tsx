import type { PublishedStudyMaterial } from '../types';
import { isSameOriginAsset } from '../utils';

interface ContentMaterialCardProps {
  material: PublishedStudyMaterial;
}

export default function ContentMaterialCard({ material }: ContentMaterialCardProps) {
  return (
    <article className="glass content-library-card">
      <div>
        {material.category && <p className="content-library-category">{material.category}</p>}
        <h2
          style={{
            fontSize: '1.85rem',
            lineHeight: '1.2',
            letterSpacing: '-0.04em',
            marginBottom: '1rem',
            color: 'var(--accent-deep)',
          }}
        >
          {material.title}
        </h2>
        <p className="text-muted" style={{ fontSize: '1.06rem', lineHeight: '1.85' }}>
          {material.description}
        </p>
      </div>

      <div className="content-library-actions">
        <a
          href={material.openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="content-library-open"
        >
          Abrir material
        </a>
        <a
          href={material.downloadUrl}
          target={isSameOriginAsset(material.downloadUrl) ? undefined : '_blank'}
          rel={isSameOriginAsset(material.downloadUrl) ? undefined : 'noopener noreferrer'}
          download={isSameOriginAsset(material.downloadUrl) ? true : undefined}
          className="content-library-download"
        >
          Baixar
        </a>
      </div>
    </article>
  );
}
