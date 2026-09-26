/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
