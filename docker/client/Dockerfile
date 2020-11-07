FROM node:latest

WORKDIR /usr/src/client

COPY client/ ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "serve" ]