# Use node for frontend build
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port (Vite default is 5173, but compose uses 3000)
EXPOSE 3000

# Start dev server (Vite)
# We use --host to allow external access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
