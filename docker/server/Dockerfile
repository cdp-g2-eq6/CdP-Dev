FROM node:latest

WORKDIR /usr/src/server

COPY server/ ./

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait && npm install

EXPOSE 3000

CMD /wait && npm start