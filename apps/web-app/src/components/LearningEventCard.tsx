import { LearningEvent } from '@/lib/api';
import Link from 'next/link';

interface LearningEventCardProps {
  event: LearningEvent;
}

export function LearningEventCard({ event }: LearningEventCardProps) {
  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <article className="border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
            <span className="font-mono">{event.repositoryName}</span>
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

          <h2 className="text-base font-medium text-white mb-2 leading-snug">
            <Link href={`/learning/${event.id}`} className="hover:text-gray-300 transition-colors">
              {event.title}
            </Link>
          </h2>

          {event.summary && (
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{event.summary}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <a
          href={event.pullRequestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-colors font-mono"
        >
          #{event.pullRequestNumber}
        </a>
        <a
          href={event.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-colors"
        >
          Ver repositório →
        </a>
      </div>
    </article>
  );
}
