# CI/CD & Deployment — Venux Bijoux

Example GitHub Actions pipeline

1. PR workflow (pull_request):

- checkout
- setup-node
- install (npm ci)
- lint
- test: unit
- build
- run integration smoke tests
- run accessibility check (axe)

2. main branch (push):

- run full test suite
- build Docker image
- push image to registry
- deploy to staging (k8s or cloud provider)
- run smoke e2e tests
- manual approval -> deploy to production

Infra recommendations

- Use Infrastructure as Code (Terraform) to provision resources
- Use image tagging and immutable releases
- Use health checks and readiness probes on containers

Rollback & backups

- Keep previous image tags available for quick rollback
- Automate DB backups and keep retention policy (30 days / weekly monthly snapshots)

Secrets

- Store secrets in provider vault (AWS Secrets Manager / HashiVault / GitHub Secrets)
