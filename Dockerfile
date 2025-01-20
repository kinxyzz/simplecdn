# Stage 1: Build
FROM node:18-alpine3.20 AS builder

# Set environment variables to make build lighter
ENV NODE_ENV=production

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile --production=false

# Copy application source code and build
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine3.20

WORKDIR /app

# Copy only the build output and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Expose the application port and define the startup command
EXPOSE 3000
CMD ["npm", "start"]
