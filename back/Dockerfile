FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ENV NODE_ENV=development

CMD npm run start:dev