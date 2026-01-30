FROM node:20-alpine

WORKDIR /app

# Copy root configurations
COPY package.json package-lock.json lerna.json tsconfig.base.json ./

# Copy package.json for the server workspace
COPY packages/server/package.json ./packages/server/

# Copy other potential workspace package.json files if they are needed for dependency tree (even if not directly used by server, npm ci might need them to match lockfile)
# Ideally we copy all package.json files to satisfy workspaces
COPY packages/billing/package.json ./packages/billing/
COPY packages/shop/package.json ./packages/shop/
COPY application/package.json ./application/

# Install dependencies (from root to respect lockfile)
RUN npm ci

# Copy server source code
COPY packages/server ./packages/server

# Build the server
WORKDIR /app/packages/server
RUN npm run build

# Expose the port
EXPOSE 4000

# Start the server
CMD ["node", "dist/index.js"]
