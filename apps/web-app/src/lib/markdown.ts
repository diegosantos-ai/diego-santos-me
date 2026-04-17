import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const projectDirectoryCandidates = [
  path.join(process.cwd(), 'content/projetos'),
  path.join(process.cwd(), '../../content/projetos'),
];

const projectsDirectory =
  projectDirectoryCandidates.find((directory) => fs.existsSync(directory)) ??
  projectDirectoryCandidates[0];

export interface ProjectMetadata {
  title: string;
  description: string;
  slug: string;
  featured: boolean;
  order: number;
  tags: string[];
  heroImage?: string;
  heroImageAlt?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
}

export interface ProjectData extends ProjectMetadata {
  contentHtml: string;
}

export async function getSortedProjectsMetadata(): Promise<ProjectMetadata[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: data.slug || slug,
        title: data.title || slug,
        description: data.description || '',
        featured: data.featured || false,
        order: data.order || 99,
        tags: data.tags || [],
        heroImage: typeof data.heroImage === 'string' ? data.heroImage : undefined,
        heroImageAlt: typeof data.heroImageAlt === 'string' ? data.heroImageAlt : undefined,
        heroImageWidth: typeof data.heroImageWidth === 'number' ? data.heroImageWidth : undefined,
        heroImageHeight:
          typeof data.heroImageHeight === 'number' ? data.heroImageHeight : undefined,
      } as ProjectMetadata;
    });

  return allProjectsData.sort((a, b) => (a.order > b.order ? 1 : -1));
}

export async function getProjectData(slug: string): Promise<ProjectData | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug: data.slug || slug,
    title: data.title || slug,
    description: data.description || '',
    featured: data.featured || false,
    order: data.order || 99,
    tags: data.tags || [],
    heroImage: typeof data.heroImage === 'string' ? data.heroImage : undefined,
    heroImageAlt: typeof data.heroImageAlt === 'string' ? data.heroImageAlt : undefined,
    heroImageWidth: typeof data.heroImageWidth === 'number' ? data.heroImageWidth : undefined,
    heroImageHeight: typeof data.heroImageHeight === 'number' ? data.heroImageHeight : undefined,
    contentHtml,
  };
}
