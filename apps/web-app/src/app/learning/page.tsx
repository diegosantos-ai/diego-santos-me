import { getLearningEvents } from '../../lib/api';
import { LearningEventCard } from '../../lib/components/LearningEventCard';

export const metadata = {
  title: 'Learning in Public | Diego Santos',
  description:
    'Registro técnico de mudanças, decisões e aprendizados recentes, combinando entradas editoriais e evolução operacional da stack.',
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
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          Evidência Operacional
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            letterSpacing: '-0.06em',
            color: 'var(--accent-deep)',
          }}
        >
          Learning in Public
        </h1>
        <p
          className="lead-bar"
          style={{
            maxWidth: '820px',
          }}
        >
          Registro técnico de mudanças, decisões e aprendizados recentes. Enquanto a esteira de
          automação amadurece, esta seção combina entradas editoriais curadas com eventos
          processados da stack para comunicar evolução incremental com contexto.
        </p>
      </header>

      {error && (
        <div
          className="glass"
          style={{
            padding: '2rem',
            border: '1px solid var(--border-soft)',
            color: 'var(--accent-deep)',
            marginBottom: '4rem',
            background: 'var(--bg-warm)',
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
