# Backend Architecture Summary

Pilhas sugeridas
- Minima: Nodejs com Fastify, Postgres, Redis, S3 compatível
- Recomendada: TypeScript com NestJS, Postgres com Prisma, Redis para cache e fila, Minio ou AWS S3, Kubernetes, Cloud CDN

Autenticacao
- JWT access tokens com expiracao curta e refresh tokens armazenados em httpOnly secure cookies
- OAuth2 para login social (Google, Apple, Facebook)
- Senhas hash com argon2
- Rate limiting, input validation, CORS e protecao XSS CSRF

Banco de dados
- Principais entidades: user(product), product, productVariant, pendantOption, productImage, cart, cartItem, order, orderItem, payment, inventory, collection, favorite, review, adminUser, auditLog
- Indices principais: products(name gin_trgm_ops), productVariant(sku), inventory(productVariantId), order(createdAt)

Endpoints principais (resumo)
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout
- GET /products
- GET /products/:id
- POST /cart
- PUT /cart/:id
- DELETE /cart/:id
- POST /checkout
- GET /orders
- GET /orders/:id
- POST /webhooks/payments

Upload de imagens
- Upload direto para pre signed URL no S3/Minio
- Worker que processa e gera WebP AVIF e varias resolucoes
- CDN na beira para entregar imagens com cache e invalidacao

Search
- ElasticSearch para busca avançada, sugestoes e autocomplete
- Exemplo de query para sugestao baseado em ngrams e boosting por popularidade

Escalabilidade e observabilidade
- Services stateless, horizontal scaling, read replicas do DB, redis como central session store, fila para tarefas batch
- Logs estruturados, metrics Prometheus, tracing OpenTelemetry, APM para performance

CI CD e testes
- Pipeline: lint, unit, integration, e2e tests, build and deploy to staging, canary deploy to prod
- Backups e politica de rollback automatizada

Entregaveis
- OpenAPI skeleton em `deliverables/openapi.prompts.yaml`
- Prisma schema e scripts de migracao exemplo
- Colecao de exemplos de payloads
