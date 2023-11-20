/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/ylkdw7rx/production/**',
      },
    ],
  },
}

module.exports = nextConfig
