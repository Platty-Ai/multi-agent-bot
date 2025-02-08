FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Set production environment
ENV NODE_ENV=production

# Expose port (Cloud Run will override with PORT env var)
EXPOSE 3000

# Start command (fixed npm start command)
CMD ["npm", "start"]