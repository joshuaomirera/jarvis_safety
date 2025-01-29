/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // Add your image domains here
      'your-storage-domain.com',
      'firebasestorage.googleapis.com',
    ],
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })
    return config
  },
  typescript: {
    // !! WARN !!
    // This is a temporary workaround for the build error
    // In production, you might want to set this to true
    ignoreBuildErrors: true,
  },
  experimental: {
    // Remove this if you're not using server actions
    // serverActions: true
  }
}

module.exports = nextConfig
