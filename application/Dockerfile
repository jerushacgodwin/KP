FROM node:20-alpine

WORKDIR /app

# Copy root configurations
COPY package.json package-lock.json lerna.json tsconfig.base.json ./

# Copy all package.json files to ensure correct installation
COPY packages/server/package.json ./packages/server/
COPY packages/billing/package.json ./packages/billing/
COPY packages/shop/package.json ./packages/shop/
COPY application/package.json ./application/

# Install dependencies
# Add network resilience for slow/flaky connections
RUN npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm ci

# Copy all source code
COPY packages ./packages
COPY application ./application

# Build arguments
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build all packages. This ensures dependencies like @kp/billing are built before application is built.
# The root 'build' script runs 'lerna run build', which executes 'build' script in all workspaces.
RUN npx lerna run build --concurrency 1 --stream

# Set working directory to the application
WORKDIR /app/application

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
