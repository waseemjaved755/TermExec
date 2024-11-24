# Use official Node.js image
FROM node:18

# Set working directory for the Node.js backend
WORKDIR /usr/src/app

# Install Node.js dependencies for the backend
COPY package.json .
RUN npm install

# Install Python in the same container
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 python3-pip python3-dev build-essential && \
    rm -rf /var/lib/apt/lists/*

# Set up a basic Python environment
RUN pip install --no-cache-dir numpy pandas flask

# Copy all backend source code
COPY . .

# Expose the backend server port
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
