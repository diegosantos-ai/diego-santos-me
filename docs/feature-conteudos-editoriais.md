# Convenção da feature de conteúdos editoriais

Esta feature foi organizada para separar claramente conteúdo, configuração e apresentação.

## Onde fica cada coisa

- `content/articles/*.md`: artigos autorais da coluna técnica.
- `content/study-resources/*.md`: conteúdo detalhado dos materiais já publicados.
- `apps/web-app/src/features/knowledge/study-materials/*.ts`: itens publicados na listagem da página `Conteúdo`.
- `apps/web-app/src/features/knowledge/components/ContentMaterialCard.tsx`: card simples da biblioteca prática.
- `apps/web-app/src/app/conteudos`: página pública enxuta da biblioteca.
- `apps/web-app/src/app/aprendizado-aplicado`: alias redirecionado para `/conteudos`.
- `apps/web-app/src/app/artigos`: página e detalhe dos artigos.
- `apps/web-app/public/study-assets/*`: artefatos públicos dos materiais práticos.
- `apps/web-app/public/images/body-diego.jpg`: retrato editorial da coluna.
- `apps/web-app/public/images/perfil-diego.jpeg`: assinatura dos artigos.

## Convenções principais

- A página `Conteúdo` é propositalmente curta: título, subtítulo e grid de cards.
- Cada card da biblioteca pública mostra apenas título, descrição curta, `Abrir material` e `Baixar`.
- Os materiais publicados da listagem ficam em `src/features/knowledge/study-materials/`, desacoplados do JSX da página.
- Em `Artigos`, a navegação é separada de `Conteúdo` e os textos seguem uma hierarquia simples: `H1` + introdução curta + corpo com `H2/H3` + conclusão.

## Como evoluir

Para adicionar um novo artigo:

1. criar um `.md` em `content/articles/`;
2. preencher frontmatter seguindo os campos dos arquivos existentes;
3. o item passa a aparecer automaticamente em `/artigos` e nos destaques.

Para adicionar um novo recurso:

1. duplicar `apps/web-app/src/features/knowledge/study-materials/material.template.ts`;
2. salvar a cópia com um nome previsível, por exemplo `meu-novo-material.ts`;
3. preencher `id`, `title`, `description`, `openUrl`, `downloadUrl` e `category` se fizer sentido;
4. exportar o novo item em `apps/web-app/src/features/knowledge/study-materials/index.ts`;
5. subir o artefato público correspondente para `apps/web-app/public/study-assets/`;
6. opcionalmente, criar o conteúdo detalhado em `content/study-resources/` se quiser manter uma página dedicada para o material.

## Template

- O template fica em `apps/web-app/src/features/knowledge/study-materials/material.template.ts`.
- Ele é ignorado no Git por uma entrada explícita no `.gitignore`.
