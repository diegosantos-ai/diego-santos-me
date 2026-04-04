import { getLearningEvents } from '@/lib/api';
import { LearningEventCard } from '@/components/LearningEventCard';

export const metadata = {
  title: 'Learning in Public | Diego Santos',
  description: 'Registro técnico de pull requests reais — o que foi construído, por que e como.',
};

export default async function LearningPage() {
  let events = null;
  let error = null;

  try {
    events = await getLearningEvents(0, 20);
  } catch (e) {
    error = 'API indisponível no momento.';
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-2xl font-semibold text-white mb-3">Learning in Public</h1>
        <p className="text-gray-400 leading-relaxed">
          Registro técnico de pull requests reais dos meus repositórios. Processados automaticamente
          e sumarizados por LLM.
        </p>
      </header>

      {error && <p className="text-red-400 text-sm border border-red-800 rounded p-4">{error}</p>}

      {events && events.content.length === 0 && (
        <p className="text-gray-500 text-sm">Nenhum evento publicado ainda.</p>
      )}

      {events && events.content.length > 0 && (
        <div className="space-y-4">
          {events.content.map((event) => (
            <LearningEventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {events && events.totalPages > 1 && (
        <p className="mt-8 text-sm text-gray-500">
          {events.totalElements} eventos · página {events.number + 1} de {events.totalPages}
        </p>
      )}
    </main>
  );
}
