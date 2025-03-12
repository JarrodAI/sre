import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to enable server-side rendering
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

export default nextConfig;
