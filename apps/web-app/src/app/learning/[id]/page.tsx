import { getLearningEventById } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function LearningEventPage({ params }: Props) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) notFound();

  let event = null;
  try {
    event = await getLearningEventById(id);
  } catch {
    notFound();
  }

  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <nav className="mb-10">
        <Link href="/learning" className="text-sm text-gray-500 hover:text-white transition-colors">
          ← Learning in Public
        </Link>
      </nav>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3 font-mono">
            <span>{event.repositoryName}</span>
            {event.technicalCategory && (
              <>
                <span>·</span>
                <span>{event.technicalCategory}</span>
              </>
            )}
            {formattedDate && (
              <>
                <span>·</span>
                <time dateTime={event.eventDate ?? ''}>{formattedDate}</time>
              </>
            )}
          </div>

          <h1 className="text-xl font-semibold text-white leading-snug">{event.title}</h1>
        </header>

        {event.summary && (
          <section className="mb-8">
            <p className="text-gray-300 leading-relaxed">{event.summary}</p>
          </section>
        )}

        <footer className="border-t border-gray-800 pt-6 flex items-center gap-4 text-sm">
          <a
            href={event.pullRequestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Ver PR #{event.pullRequestNumber} →
          </a>
          <a
            href={event.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Ver repositório
          </a>
        </footer>
      </article>
    </main>
  );
}
