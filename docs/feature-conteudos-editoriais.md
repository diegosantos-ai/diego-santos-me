# Convenção da feature de conteúdos editoriais

Esta feature foi organizada para separar claramente conteúdo, configuração e apresentação.

## Onde fica cada coisa

- `content/articles/*.md`: artigos autorais da coluna técnica.
- `content/study-resources/*.md`: conteúdo detalhado dos materiais já publicados.
- `apps/web-app/public/study-assets/*`: artefatos públicos dos materiais práticos.
- `apps/web-app/src/features/knowledge/components/ContentMaterialCard.tsx`: card simples da biblioteca prática.
- `apps/web-app/src/app/conteudos`: página pública enxuta da biblioteca.
- `apps/web-app/src/app/aprendizado-aplicado`: alias redirecionado para `/conteudos`.
- `apps/web-app/src/app/artigos`: página e detalhe dos artigos.
- `apps/web-app/public/images/body-diego.jpg`: retrato editorial da coluna.
- `apps/web-app/public/images/perfil-diego.jpeg`: assinatura dos artigos.
- `.github/workflows/editorial-content.yml`: validação e publicação leve do conteúdo editorial.

## Convenções principais

- A página `Conteúdo` é propositalmente curta: título, subtítulo e grid de cards.
- Cada card da biblioteca pública mostra apenas título, descrição curta, `Abrir material` e `Baixar`.
- A listagem pública de materiais passa a ser lida diretamente dos arquivos em `content/study-resources/`.
- Em `Artigos`, a navegação é separada de `Conteúdo` e o texto pode ser corrido, sem subcategorias, desde que mantenha clareza, progressão e boa leitura.
- Em produção, `content/` e `study-assets/` são montados como volume no `web-app`, sem depender da imagem para atualizar texto ou material baixável.

## Como evoluir

Para adicionar um novo artigo:

1. criar um novo `.md` em `content/articles/` ou usar localmente o caminho ignorado `content/articles/article.template.md`;
2. preencher frontmatter seguindo os campos dos arquivos existentes;
3. ajustar o corpo no formato que melhor servir ao texto, com prioridade para clareza, ritmo e unidade;
4. o item passa a aparecer automaticamente em `/artigos` e nos destaques depois do fluxo editorial.

Para adicionar um novo recurso:

1. criar um novo `.md` em `content/study-resources/` ou usar localmente o caminho ignorado `content/study-resources/material.template.md`;
2. preencher frontmatter e as seções do material;
3. subir o arquivo público correspondente para `apps/web-app/public/study-assets/`;
4. o card passa a aparecer automaticamente em `/conteudos` depois do fluxo editorial.

## Fluxo de publicação

- Mudança de código, layout, componentes ou infraestrutura continua no CI/CD completo.
- Mudança apenas em `content/**` ou `apps/web-app/public/study-assets/**` entra no workflow editorial leve.
- O workflow editorial valida frontmatter, checa formatação e sincroniza o conteúdo para `~/portfolio-deploy/runtime-content/` na VPS.
- Como o `web-app` monta essa pasta em runtime, artigos e materiais podem ser publicados sem rebuild completo da imagem.
- Em produção, se o volume editorial estiver vazio por algum motivo, o `web-app` usa o conteúdo empacotado na imagem como fallback para evitar páginas vazias.

## Templates

- Os caminhos reservados para templates locais são:
- `content/articles/article.template.md`
- `content/study-resources/material.template.md`
- Ambos ficam ignorados no Git por entradas explícitas no `.gitignore`.
