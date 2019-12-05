FROM node:13.2.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

RUN ls ./dist/

EXPOSE 3000
CMD [ "yarn", "server" ]