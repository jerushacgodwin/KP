/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is a placeholder config at the root to satisfy Hostinger's Next.js preset validator.
  // The actual Next.js application is located in the /application directory.
  // Hostinger will run 'npm run build' which we've configured to build the /application workspace.
  distDir: 'application/.next',
};

module.exports = nextConfig;
