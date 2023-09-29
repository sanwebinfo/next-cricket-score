const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require("@ducanh2912/next-pwa").default({
      dest: "public",
      exclude: [
        ({ asset, compilation }) => {
          if (
            asset.name.startsWith("server/") ||
            asset.name.match(
              /^((app-|^)build-manifest\.json|react-loadable-manifest\.json|live|match)$/
            )
          ) {
            return true
          }
          if (isDev && !asset.name.startsWith("static/runtime/")) {
            return true
          }
          return false
        },
      ],
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};