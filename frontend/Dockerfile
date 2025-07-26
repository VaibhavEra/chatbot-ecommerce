# frontend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
