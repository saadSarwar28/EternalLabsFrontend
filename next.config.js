/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportTrailingSlash: true,
  distDir: 'build',
  images: {
    loader: 'akamai',
    path: '',
  }
}

module.exports = nextConfig
