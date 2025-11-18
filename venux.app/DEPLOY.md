# Deploy na Vercel — guia rápido

Este documento explica os passos para publicar a aplicação `venux.app` no Vercel
de forma reprodutível e segura.

Passos resumidos

1. Conectar repositório no Vercel

   - Vá a `https://vercel.com/new` e escolha o repositório GitHub/GitLab/Bitbucket.
   - Escolha o diretório raíz do projeto: `venux.app` (se o Vercel não detectar corretamente,
     escolha manualmente).

2. Variáveis de ambiente (obrigatórias)

   - No painel do projeto (Settings -> Environment Variables) adicione:

     - `NEXT_PUBLIC_API_URL` → URL do backend (ex.: `https://api.sua-app.com/api`)
     - `NEXT_PUBLIC_ENV` → `production`

   - Se você hospedar também o backend no mesmo repositório em outro provider,
     adicione as variáveis backend necessárias lá (ex.: `DATABASE_URL`, `JWT_SECRET`).

3. Comandos de build

   - Build command: `npm run build`
   - Output directory: (deixe em branco — Next encontra `.next` automaticamente)

4. Rewrites / Proxy API

   - Recomendo manter o backend em um serviço separado e definir `NEXT_PUBLIC_API_URL`.
   - O frontend chamará `process.env.NEXT_PUBLIC_API_URL` para consumir a API.

5. Deploy automático com GitHub Actions (opcional)

   - Você pode usar o workflow em `.github/workflows/ci-and-deploy.yml` para rodar
     testes e, se quiser, disparar deploy no Vercel automaticamente.
   - Para deploy automático via action você precisa definir os segredos no GitHub:
     - `VERCEL_TOKEN` — token de deploy da Vercel
     - `VERCEL_ORG_ID` — opcional (geralmente não necessário para a action)
     - `VERCEL_PROJECT_ID` — opcional

6. Verificação pós-deploy
   - Após o deploy, abra o domínio fornecido pelo Vercel e verifique as rotas públicas.
   - Teste fluxos que usam a API (login, listagem de produtos). Se qualquer request
     falhar, verifique `NEXT_PUBLIC_API_URL` e as configurações CORS do backend.

Notas técnicas

- Se desejar mover o backend Express para serverless dentro do Next (API routes),
  eu posso ajudar a migrar os endpoints. Porém, para produção normalmente é
  mais estável manter o backend em um serviço próprio (com pool de DB).

Se quiser, eu configuro o workflow de CI/CD e um exemplo de `vercel` CLI script.
