const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    config.resolve.alias['@'] = path.join(__dirname)

    return config;
  },
  reactStrictMode: false,
  output: 'standalone',
};

module.exports = nextConfig;