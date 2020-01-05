# Create image based on the official Node image from dockerhub
FROM node:latest

WORKDIR /usr/src/app/client
# Copy dependency definitions
COPY package.json /usr/src/app/client/
# Install dependecies
RUN npm install
# Get all the code needed to run the app
COPY . .
# Expose the port the app runs in
EXPOSE 3000
# Serve the app
CMD ["npm", "start"]