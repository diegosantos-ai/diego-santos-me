import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const webAppRoot = process.cwd();
const repoRoot = path.resolve(webAppRoot, '../..');
const contentRoot = path.join(repoRoot, 'content');
const articlesRoot = path.join(contentRoot, 'articles');
const studyResourcesRoot = path.join(contentRoot, 'study-resources');
const publicStudyAssetsRoot = path.join(webAppRoot, 'public', 'study-assets');

const errors = [];

function listMarkdownFiles(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)
    .sort();
}

function addError(fileName, message) {
  errors.push(`${fileName}: ${message}`);
}

function expectNonEmptyString(data, key, fileName) {
  if (typeof data[key] !== 'string' || !data[key].trim()) {
    addError(fileName, `campo obrigatório ausente ou vazio: ${key}`);
    return '';
  }

  return data[key].trim();
}

function expectStringArray(data, key, fileName) {
  if (!Array.isArray(data[key]) || data[key].length === 0) {
    addError(fileName, `campo obrigatório ausente ou vazio: ${key}`);
    return [];
  }

  const items = data[key].filter((item) => typeof item === 'string' && item.trim());

  if (items.length !== data[key].length) {
    addError(fileName, `campo ${key} precisa conter apenas strings não vazias`);
  }

  return items;
}

function expectBooleanIfPresent(data, key, fileName) {
  if (key in data && typeof data[key] !== 'boolean') {
    addError(fileName, `campo ${key} precisa ser boolean`);
  }
}

function expectIsoDate(value, key, fileName) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    addError(fileName, `campo ${key} precisa seguir YYYY-MM-DD`);
  }
}

function ensureSlugMatchesFile(slug, fileName) {
  const expectedSlug = fileName.replace(/\.md$/, '');

  if (slug !== expectedSlug) {
    addError(fileName, `slug deve bater com o nome do arquivo (${expectedSlug})`);
  }
}

function validateStudyAssetPath(rawUrl, fileName, fieldName) {
  if (typeof rawUrl !== 'string' || !rawUrl.startsWith('/study-assets/')) {
    return;
  }

  const relativePath = rawUrl.replace('/study-assets/', '');
  const assetPath = path.join(publicStudyAssetsRoot, relativePath);

  if (!fs.existsSync(assetPath)) {
    addError(fileName, `${fieldName} aponta para asset inexistente: ${rawUrl}`);
  }
}

function validateArticle(fileName) {
  const fullPath = path.join(articlesRoot, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  const slug = expectNonEmptyString(data, 'slug', fileName);
  expectNonEmptyString(data, 'title', fileName);
  expectNonEmptyString(data, 'excerpt', fileName);
  expectNonEmptyString(data, 'summary', fileName);
  expectNonEmptyString(data, 'author', fileName);
  expectNonEmptyString(data, 'category', fileName);
  expectIsoDate(expectNonEmptyString(data, 'publishedAt', fileName), 'publishedAt', fileName);
  expectNonEmptyString(data, 'readTime', fileName);
  expectStringArray(data, 'tags', fileName);
  expectBooleanIfPresent(data, 'featured', fileName);
  ensureSlugMatchesFile(slug, fileName);
}

function validateStudyResource(fileName) {
  const fullPath = path.join(studyResourcesRoot, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  const slug = expectNonEmptyString(data, 'slug', fileName);
  expectNonEmptyString(data, 'title', fileName);
  expectNonEmptyString(data, 'shortDescription', fileName);
  expectNonEmptyString(data, 'description', fileName);
  expectNonEmptyString(data, 'category', fileName);
  expectNonEmptyString(data, 'artifactType', fileName);
  expectNonEmptyString(data, 'problemSolved', fileName);
  expectIsoDate(expectNonEmptyString(data, 'publishedAt', fileName), 'publishedAt', fileName);
  expectStringArray(data, 'tags', fileName);
  expectBooleanIfPresent(data, 'featured', fileName);
  ensureSlugMatchesFile(slug, fileName);

  const liveUrl = data.liveUrl;
  const downloadUrl = data.downloadUrl;

  if (
    (typeof liveUrl !== 'string' || !liveUrl.trim()) &&
    (typeof downloadUrl !== 'string' || !downloadUrl.trim())
  ) {
    addError(fileName, 'material precisa ter liveUrl ou downloadUrl');
  }

  validateStudyAssetPath(liveUrl, fileName, 'liveUrl');
  validateStudyAssetPath(downloadUrl, fileName, 'downloadUrl');
}

for (const fileName of listMarkdownFiles(articlesRoot)) {
  validateArticle(fileName);
}

for (const fileName of listMarkdownFiles(studyResourcesRoot)) {
  validateStudyResource(fileName);
}

if (errors.length > 0) {
  console.error('Falha na validação editorial:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Validação editorial concluída sem erros.');
