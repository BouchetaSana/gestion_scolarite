FROM node:12.10.0-alpine

WORKDIR /usr/src/app/server/

COPY package*.json /usr/src/app/server/
RUN npm install 

COPY . .

EXPOSE 8000

CMD ["npm", "run","server"]