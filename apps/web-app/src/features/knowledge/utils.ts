function normalizeDateInput(date: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T00:00:00`);
  }

  return new Date(date);
}

export function formatShortDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(normalizeDateInput(date));
}

export function formatLongDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(normalizeDateInput(date));
}

export function isSameOriginAsset(url?: string): boolean {
  return Boolean(url && (url.startsWith('/') || url.startsWith('./')));
}
