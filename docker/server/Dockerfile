FROM node:latest

WORKDIR /usr/src/server

RUN git clone https://github.com/cdp-g2-eq6/CdP-Dev.git . \
    && cd server \
    && npm install

EXPOSE 3000

CMD [ "npm", "start" ]