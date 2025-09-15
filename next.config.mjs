/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fix webpack hashing on Node 20+ / 22 (WasmHash error)
  webpack: (config) => {
    if (!config.output) config.output = {}
    config.output.hashFunction = 'xxhash64'
    return config
  },
}

export default nextConfig
