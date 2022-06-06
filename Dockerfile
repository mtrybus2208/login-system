FROM node:16-alpine AS development

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install -g @nestjs/cli

RUN npm install --no-optional && npm cache clean --force

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production && npm cache clean --force

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]