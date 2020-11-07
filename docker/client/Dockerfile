FROM node:latest

WORKDIR /usr/src/client

RUN git clone https://github.com/cdp-g2-eq6/CdP-Dev.git . \
    && cd client \
    && npm install

EXPOSE 8080

CMD [ "npm", "start" ]