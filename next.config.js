/**
 * Next.js config (JS) to explicitly set Turbopack root to the app folder.
 * Using JS avoids needing the `next` types at the repo root.
 */
module.exports = {
    turbopack: {
        root: "./venus-bijoux.app",
    },
};
