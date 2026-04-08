import Image from 'next/image';
import Link from 'next/link';
import { authorProfile } from '../config';

export default function ArticleSidebar() {
  return (
    <aside className="glass articles-sidebar">
      <div className="articles-sidebar-media">
        <Image
          src={authorProfile.editorialImage}
          alt={`Retrato editorial de ${authorProfile.name}`}
          width={900}
          height={1260}
        />
      </div>

      <div className="articles-sidebar-body">
        <h2
          style={{
            fontSize: '2rem',
            letterSpacing: '-0.04em',
            color: 'var(--accent-deep)',
            marginBottom: '0.9rem',
          }}
        >
          {authorProfile.name}
        </h2>
        <p className="text-muted" style={{ lineHeight: '1.85', marginBottom: '1.2rem' }}>
          Análises e notas técnicas sobre engenharia, automação, observabilidade, IA aplicada e
          transição técnica para stack corporativa.
        </p>

        <div className="articles-sidebar-links">
          <Link href={authorProfile.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>
          {authorProfile.githubUrl && (
            <Link href={authorProfile.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
