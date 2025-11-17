Venux Bijoux - Artefatos gerados automaticamente

Localização dos arquivos gerados:

- design-system/

  - design-tokens.json (tokens em JSON)
  - design-tokens.css (CSS variables para light & dark)
  - components/

    - styles.css (estilos compartilhados)
    - header.html (mockup estrutural do header)
    - product-card.html (mockup estrutural do card de produto)
    - configurator.html (mockup estrutural do configurador)

  - src/components/ (React TSX components)
    - Header.tsx
    - ProductCard.tsx
    - Configurator.tsx
  - **tests**/ (basic unit tests)
    - ProductCard.test.tsx

- backend/
  - openapi.yaml (spec inicial OpenAPI)
  - prisma-schema.prisma (esquema inicial para Prisma + Postgres)
  - postman_collection.json (Postman collection generated from openapi)
  - prisma/seed.ts (example seed script to create sample products)

O que contém cada artefato

- design-tokens.json: tokens de cor, tipografia, espaçamento, bordas, sombras e breakpoints.
- design-tokens.css: variáveis CSS nomeadas em camelCase e mapeamento para modo escuro com [data-theme="dark"].
- components/\*.html: estruturas sem comportamentos (HTML estático) com atributos ARIA e placeholders.
- components/styles.css: estilos base usando as variáveis de token.
- openapi.yaml: endpoints principais (auth, produtos, cart, checkout) - pronto para expandir.
- prisma-schema.prisma: modelo relacional pronto para gerar migrations com Prisma.

Como usar

1. Tokens: importe `design-tokens.css` no seu CSS global ou ajuste a rota para seu build.
2. Mockups: abra `components/*.html` no navegador para ver a estrutura; importe o CSS `components/styles.css` para visual.
3. Backend: configure `DATABASE_URL` e rode `prisma migrate dev` após instalar dependências.

Próximos passos (opcionais que posso gerar agora)

- Gerar arquivos CSS/HTML de componentes completos (Header JS para autocomplete, modal behaviors, slider) — JS vanilla ou React.
- Gerar kit básico Figma Tokens (JSON) e um arquivo de componentes para importação no Figma.
- Gerar collection Postman / Insomnia a partir do `openapi.yaml`.
- Gerar scripts de migração SQL ou seed sample.

Se quiser que eu execute qualquer um dos passos acima agora, diga quais e eu gero os arquivos aqui no repositório.
