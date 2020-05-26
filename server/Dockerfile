FROM node:12.10.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --quiet

COPY . ./

EXPOSE 8000

CMD ["npm", "run","server"]