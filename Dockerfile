# Stage 1: Build
FROM node:18 AS builder

# Tentukan working directory di dalam container build
WORKDIR /app

# Salin package.json dan package-lock.json untuk menginstall dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam build container
COPY . .

# Build TypeScript menjadi JavaScript
RUN npm run build

# Stage 2: Final, hanya dengan folder dist
FROM node:18

# Tentukan working directory di container akhir
WORKDIR /app

# Salin folder dist dari container build sebelumnya ke container final
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install hanya production dependencies
RUN npm install --only=production

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi dari folder dist
CMD ["node", "dist/app.js"]
