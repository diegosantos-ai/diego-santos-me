export interface StudyResourceMetadata {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  tags: string[];
  artifactType: string;
  problemSolved: string;
  previewImage?: string;
  sourceCodeUrl?: string;
  liveUrl?: string;
  downloadUrl?: string;
  featured: boolean;
  publishedAt: string;
}

export interface StudyResource extends StudyResourceMetadata {
  contentHtml: string;
}

export interface PublishedStudyMaterial {
  id: string;
  title: string;
  description: string;
  openUrl: string;
  downloadUrl: string;
  category?: string;
}

export interface ArticleMetadata {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  coverImage?: string;
  author: string;
  tags: string[];
  category: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

export interface Article extends ArticleMetadata {
  contentHtml: string;
}

export interface AuthorProfile {
  name: string;
  role: string;
  bio: string;
  portraitImage: string;
  editorialImage: string;
  linkedinUrl: string;
  githubUrl?: string;
}

export interface ContentTrack {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  hrefLabel: string;
}
