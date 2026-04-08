import Image from 'next/image';
import { authorProfile } from '../config';

export default function AuthorSignature() {
  return (
    <div
      className="glass author-signature"
      style={{
        padding: '1.2rem 1.35rem',
      }}
    >
      <Image
        src={authorProfile.portraitImage}
        alt={`Retrato de ${authorProfile.name}`}
        width={72}
        height={72}
      />
      <div>
        <p
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-solar)',
            marginBottom: '0.45rem',
          }}
        >
          Assinado por
        </p>
        <p
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--accent-deep)',
            marginBottom: '0.25rem',
          }}
        >
          {authorProfile.name}
        </p>
        <p className="text-muted" style={{ lineHeight: '1.65' }}>
          {authorProfile.role}
        </p>
      </div>
    </div>
  );
}
