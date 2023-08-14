/** @type {import('next').NextConfig} */
const config = require('./config/staging.json')

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  basePath: config.basePath
}

module.exports = nextConfig
