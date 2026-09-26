/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  output: 'standalone',
  trailingSlash: true,
  distDir: 'build',
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
