import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { authorProfile, getSourceCodeUrl } from './config';
import type { Article, ArticleMetadata, StudyResource, StudyResourceMetadata } from './types';

const contentDirectory = path.join(process.cwd(), '../../content');
const articlesDirectory = path.join(contentDirectory, 'articles');
const studyResourcesDirectory = path.join(contentDirectory, 'study-resources');

type Frontmatter = Record<string, unknown>;

function getMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory).filter((fileName) => fileName.endsWith('.md'));
}

function getFileFrontmatter(
  directory: string,
  fileName: string
): { data: Frontmatter; content: string } {
  const fullPath = path.join(directory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function sortByFeaturedThenDate<T extends { featured: boolean; publishedAt: string }>(
  items: T[]
): T[] {
  return items.sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
}

function estimateReadTime(markdownContent: string): string {
  const totalWords = markdownContent.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(totalWords / 180));
  return `${minutes} min`;
}

async function renderMarkdown(markdownContent: string): Promise<string> {
  const processedContent = await remark().use(html).process(markdownContent);
  return processedContent.toString();
}

function mapStudyResourceMetadata(fileName: string, data: Frontmatter): StudyResourceMetadata {
  const slug = asString(data.slug, fileName.replace(/\.md$/, ''));

  return {
    slug,
    title: asString(data.title, slug),
    shortDescription: asString(data.shortDescription),
    description: asString(data.description),
    category: asString(data.category, 'Estudo'),
    tags: asStringArray(data.tags),
    artifactType: asString(data.artifactType, 'Material'),
    problemSolved: asString(data.problemSolved),
    previewImage: asOptionalString(data.previewImage),
    sourceCodeUrl: getSourceCodeUrl(asOptionalString(data.sourceCodePath)),
    liveUrl: asOptionalString(data.liveUrl),
    downloadUrl: asOptionalString(data.downloadUrl),
    featured: asBoolean(data.featured),
    publishedAt: asString(data.publishedAt, '1970-01-01'),
  };
}

function mapArticleMetadata(
  fileName: string,
  data: Frontmatter,
  markdownContent: string
): ArticleMetadata {
  const slug = asString(data.slug, fileName.replace(/\.md$/, ''));

  return {
    slug,
    title: asString(data.title, slug),
    excerpt: asString(data.excerpt),
    summary: asString(data.summary),
    coverImage: asOptionalString(data.coverImage),
    author: asString(data.author, authorProfile.name),
    tags: asStringArray(data.tags),
    category: asString(data.category, 'Artigo'),
    publishedAt: asString(data.publishedAt, '1970-01-01'),
    readTime: asString(data.readTime, estimateReadTime(markdownContent)),
    featured: asBoolean(data.featured),
  };
}

export async function getStudyResourcesMetadata(): Promise<StudyResourceMetadata[]> {
  const resources = getMarkdownFiles(studyResourcesDirectory).map((fileName) => {
    const { data } = getFileFrontmatter(studyResourcesDirectory, fileName);
    return mapStudyResourceMetadata(fileName, data);
  });

  return sortByFeaturedThenDate(resources);
}

export async function getStudyResourceBySlug(slug: string): Promise<StudyResource | null> {
  const fullPath = path.join(studyResourcesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

  return {
    ...mapStudyResourceMetadata(`${slug}.md`, data),
    contentHtml: await renderMarkdown(content),
  };
}

export async function getFeaturedStudyResources(limit = 2): Promise<StudyResourceMetadata[]> {
  const resources = await getStudyResourcesMetadata();
  const featuredResources = resources.filter((resource) => resource.featured);
  return (featuredResources.length > 0 ? featuredResources : resources).slice(0, limit);
}

export async function getArticlesMetadata(): Promise<ArticleMetadata[]> {
  const articles = getMarkdownFiles(articlesDirectory).map((fileName) => {
    const { data, content } = getFileFrontmatter(articlesDirectory, fileName);
    return mapArticleMetadata(fileName, data, content);
  });

  return sortByFeaturedThenDate(articles);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

  return {
    ...mapArticleMetadata(`${slug}.md`, data, content),
    contentHtml: await renderMarkdown(content),
  };
}

export async function getFeaturedArticles(limit = 2): Promise<ArticleMetadata[]> {
  const articles = await getArticlesMetadata();
  const featuredArticles = articles.filter((article) => article.featured);
  return (featuredArticles.length > 0 ? featuredArticles : articles).slice(0, limit);
}
