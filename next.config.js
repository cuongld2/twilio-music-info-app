/**
 * @type {import('next').NextConfig}
 */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  publicExcludes: ["!resume.pdf"],
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "i.scdn.co",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
