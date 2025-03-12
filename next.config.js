/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-side rendering enabled (no 'output: export')
  webpack(config) {
    // Support for video files
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name].[hash][ext]'
      }
    });

    return config;
  },
};

module.exports = nextConfig;
