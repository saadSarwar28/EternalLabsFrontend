/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'build',
  images: {
    loader: 'akamai',
    path: '',
  }
}

module.exports = nextConfig
