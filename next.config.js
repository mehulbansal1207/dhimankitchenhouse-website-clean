/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow access from local network during development
  experimental: {
    allowedDevOrigins: ['192.168.29.38']
  }
}

module.exports = nextConfig 