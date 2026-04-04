import { getLearningEvents } from '../../lib/api';
import { LearningEventCard } from '../../components/LearningEventCard';

export const metadata = {
  title: 'Learning in Public | Diego Santos',
  description: 'Registro técnico de pull requests reais — o que foi construído, por que e como.',
};

export default async function LearningPage() {
  let events = null;
  let error = null;

  try {
    events = await getLearningEvents(0, 50);
  } catch (e) {
    error = 'A API técnica está indisponível no momento.';
    console.error(e);
  }

  return (
    <main className="container" style={{ padding: '8rem 0 10rem' }}>
      <header style={{ marginBottom: '6rem', maxWidth: '850px' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            letterSpacing: '-1.5px',
            color: 'var(--text-primary)',
          }}
        >
          Learning in Public
        </h1>
        <p
          className="text-muted"
          style={{
            fontSize: '1.25rem',
            lineHeight: '1.7',
            borderLeft: '4px solid var(--accent-bronze)',
            paddingLeft: '2rem',
          }}
        >
          Registro técnico de pull requests reais dos meus repositórios. Processados automaticamente
          e sumarizados para comunicar decisões técnicas, aprendizados e evolução incremental da
          stack como evidência operacional.
        </p>
      </header>

      {error && (
        <div
          className="glass"
          style={{
            padding: '2rem',
            border: '1px solid var(--border-strong)',
            color: 'var(--accent-amber)',
            marginBottom: '4rem',
          }}
        >
          {error}
        </div>
      )}

      {events && events.content.length === 0 && !error && (
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
          Nenhum log técnico publicado ainda.
        </p>
      )}

      {events && events.content.length > 0 && (
        <div style={{ maxWidth: '850px' }}>
          {events.content.map((event) => (
            <LearningEventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {events && events.totalPages > 1 && (
        <footer
          style={{
            marginTop: '6rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          {events.totalElements} EVENTOS ENCONTRADOS · PÁGINA {events.number + 1} DE{' '}
          {events.totalPages}
        </footer>
      )}
    </main>
  );
}
