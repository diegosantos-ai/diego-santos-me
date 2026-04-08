import type { AuthorProfile, ContentTrack } from './types';

export const authorProfile: AuthorProfile = {
  name: 'Diego Santos',
  role: 'IA aplicada, backend, automação e operação',
  bio: 'Aprendo com método, transformo estudo em ativo útil e organizo conhecimento técnico com foco em uso real.',
  portraitImage: '/images/perfil-diego.jpeg',
  editorialImage: '/images/body-diego.jpg',
  linkedinUrl: 'https://linkedin.com/in/diego-santos-ia',
  githubUrl: 'https://github.com/diegosantos-ai',
};

// "Aprendizado Aplicado" mantém o tom sóbrio do site e comunica método + utilidade.
// Evita a sensação de pasta de downloads ou de um "lab" genérico desconectado do restante do portfólio.
export const contentTracks: Record<'studyLab' | 'articles' | 'learning', ContentTrack> = {
  studyLab: {
    eyebrow: 'Materiais Práticos',
    title: 'Conteúdo',
    description:
      'Materiais práticos organizados para reduzir atrito no estudo, acelerar revisão e apoiar retomada de contexto técnico.',
    href: '/conteudos',
    hrefLabel: 'Abrir conteúdo',
  },
  articles: {
    eyebrow: 'Coluna Assinada',
    title: 'Coluna Técnica',
    description:
      'Artigos autorais para explicar raciocínio técnico, documentar pesquisa aplicada e aprofundar temas além dos cases.',
    href: '/artigos',
    hrefLabel: 'Ler artigos',
  },
  learning: {
    eyebrow: 'Journal Técnico',
    title: 'Learning in Public',
    description:
      'Registros curados de evolução da stack a partir de trabalho real, com contexto técnico e leitura humana.',
    href: '/learning',
    hrefLabel: 'Ver journal',
  },
};

const GITHUB_REPOSITORY = 'https://github.com/diegosantos-ai/diego-santos-me';
const DEFAULT_BRANCH = 'main';

export function getSourceCodeUrl(sourceCodePath?: string): string | undefined {
  if (!sourceCodePath) {
    return undefined;
  }

  const normalizedPath = sourceCodePath.replace(/^\/+/, '');
  return `${GITHUB_REPOSITORY}/blob/${DEFAULT_BRANCH}/${normalizedPath}`;
}
