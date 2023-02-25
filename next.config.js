/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/linktree",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["github.com", "avatars.githubusercontent.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;

const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  experimental: { esmExternals: true },
});
