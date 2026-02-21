# syntax=docker/dockerfile:1.7
FROM node:22-alpine AS base
WORKDIR /app

COPY package.json yarn.lock* ./
RUN corepack enable && if [ -f yarn.lock ]; then yarn install --immutable; else yarn install; fi

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["node", "dist/server.js"]
