/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
}

module.exports = nextConfig
