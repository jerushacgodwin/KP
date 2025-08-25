import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
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
    config.resolve.alias['@kp/billing'] = path.resolve(__dirname, '../billing/src');
    return config;

 
  },
  
  
};

export default nextConfig;
