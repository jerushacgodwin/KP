import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  distDir: '../.next',
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/uploads/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
   transpilePackages: ["@kp/billing", "@kp/server", "@kp/shop"],
  webpack: (config) => {
    config.resolve.alias["@src"] = path.resolve(__dirname, "src");
    return config;

 
  },
  
  
};

export default nextConfig;
