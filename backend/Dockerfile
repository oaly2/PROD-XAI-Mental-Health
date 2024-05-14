# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Define environment variable
ENV NODE_ENV production

# Define the entry point command with the default port
ENTRYPOINT ["node", "server.js", "--port", "8080"]
