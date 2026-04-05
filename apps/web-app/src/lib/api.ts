const API_PATH_PREFIX = '/api/v1';
const DEFAULT_LOCAL_API_ORIGIN = 'http://localhost:8001';

function normalizeApiBaseUrl(rawUrl: string): string {
  const trimmedUrl = rawUrl.replace(/\/$/, '');

  if (trimmedUrl.endsWith(API_PATH_PREFIX)) {
    return trimmedUrl;
  }

  return `${trimmedUrl}${API_PATH_PREFIX}`;
}

export function getApiBaseUrl(): string {
  return normalizeApiBaseUrl(
    process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_LOCAL_API_ORIGIN
  );
}

const API_BASE_URL = getApiBaseUrl();

export interface LearningEvent {
  id: number;
  externalId: string;
  repositoryName: string;
  repositoryUrl: string | null;
  pullRequestNumber: number | null;
  pullRequestUrl: string | null;
  title: string;
  summary: string;
  technicalCategory: string | null;
  eventDate: string | null;
  status: string;
  publishedAt: string | null;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export async function getLearningEvents(page = 0, size = 10): Promise<PageResponse<LearningEvent>> {
  const res = await fetch(
    `${API_BASE_URL}/learning-events?status=PUBLISHED&page=${page}&size=${size}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error(`Falha ao buscar learning events: ${res.status}`);
  }

  return res.json();
}

export async function getLearningEventById(id: number): Promise<LearningEvent> {
  const res = await fetch(`${API_BASE_URL}/learning-events/${id}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Evento não encontrado: ${id}`);
  }

  return res.json();
}
