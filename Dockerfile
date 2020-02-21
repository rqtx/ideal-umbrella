FROM node:10

WORKDIR /usr/src/app

COPY ./src/package*.json ./

RUN npm install

COPY ./src/. ./

CMD [ "node", "app.js" ]
