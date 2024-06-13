# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy both package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the React project into the container
COPY . .

# Ensure the target directory exists
RUN mkdir -p ../backend/build

# Build the React app for production
RUN npm run build

# Expose the React port
EXPOSE 3000

# Run React server
CMD ["npm", "start"]
