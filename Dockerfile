# Gunakan image Node.js versi yang stabil sebagai dasar
FROM node:18

# Tentukan working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Build TypeScript menjadi JavaScript (jika menggunakan TypeScript)
RUN npm run build

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
