FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .
COPY .env.production .env

RUN npm build

ENV NODE_ENV production

EXPOSE 5000
CMD [ "node", "dist/index.js" ]
USER node