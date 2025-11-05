// Avoid importing `next` types from the repository root so the editor
// / TypeScript server doesn't require the `next` package to be installed
// at the monorepo root. Keep this file minimal and type-free.

const nextConfig = {
  // Point Turbopack/Next to the actual app folder when the repo root
  // contains other files (like an extra lockfile). This prevents
  // Next from inferring the wrong workspace root during CI/deploy.
  turbopack: {
    // relative to repository root
    root: "./venus-bijoux.app",
  },
};

export default nextConfig;
