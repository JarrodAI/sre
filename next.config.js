/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-side rendering enabled (no 'output: export')
  webpack(config) {
    // Support for video files
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/videos/",
          outputPath: "static/videos/",
          name: "[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
